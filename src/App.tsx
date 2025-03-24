import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Mosaic,
  MosaicNode,
  MosaicParent,
  MosaicPath,
  MosaicUpdate,
  MosaicWindow,
  getLeaves,
  getNodeAtPath,
  updateTree,
} from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";

import { PanelBottom, PanelLeft, PanelRight, X } from "lucide-react";

import { fetchCompanies } from "./api";
import CompanyInfo from "./components/companyInfo";
import { Company } from "./types";

const App: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<MosaicNode<string> | null>(null);

  const buildLayout = (tickers: string[]): MosaicNode<string> => {
    if (tickers.length === 1) return tickers[0];
    return {
      direction: "row",
      first: buildLayout(tickers.slice(0, 1)),
      second: {
        direction: "column",
        first: buildLayout(tickers.slice(1, 2)),
        second: buildLayout(tickers.slice(2, 3)),
      },
    };
  };

  // Fetch компанії один раз
  useEffect(() => {
    fetchCompanies().then((data) => {
      setCompanies(data);
      setLoading(false);

      // Стартовий layout без localStorage
      const tickers = data.slice(0, 3).map((c) => c.ticker);
      const initial = buildLayout(tickers);
      setLayout(initial);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !layout)
    return <div className="p-4 text-center">Loading...</div>;

  const companyMap = companies.reduce<Record<string, Company>>(
    (acc, company) => {
      acc[company.ticker] = company;
      return acc;
    },
    {},
  );

  const usedTickers = getLeaves(layout);

  const getNextAvailableTicker = (): string | null => {
    const available = companies.find((c) => !usedTickers.includes(c.ticker));
    return available ? available.ticker : null;
  };

  const addWindow = (
    path: MosaicPath,
    direction: "row" | "column",
    position: "first" | "second",
  ) => {
    const newTicker = getNextAvailableTicker();
    if (!newTicker) return;

    const existing = getNodeAtPath(layout, path);
    if (!existing) return;

    const newBranch: MosaicParent<string> = {
      direction,
      first: position === "first" ? newTicker : existing,
      second: position === "second" ? newTicker : existing,
    };

    const update: MosaicUpdate<string> = {
      path,
      spec: { $set: newBranch },
    };

    const newLayout = updateTree(layout, [update]) as MosaicNode<string>;
    setLayout(newLayout);
  };

  const removeWindow = (path: MosaicPath) => {
    const node = getNodeAtPath(layout, path);
    if (!node) return;

    // If the node is the root, reset the layout to null
    if (path.length === 0) {
      setLayout(null);
      return;
    }

    // Get the parent node and its path
    const parentPath = path.slice(0, -1);
    const parent = getNodeAtPath(layout, parentPath) as MosaicParent<string>;

    // Determine which child to keep (the one that isn't being removed)
    const sibling = parent.first === node ? parent.second : parent.first;

    // Update the layout tree
    const update: MosaicUpdate<string> = {
      path: parentPath,
      spec: { $set: sibling },
    };

    const newLayout = updateTree(layout, [update]) as MosaicNode<string>;
    setLayout(newLayout);
  };

  return (
    <div className="h-screen">
      <DndProvider backend={HTML5Backend}>
        <Mosaic<string>
          value={layout}
          onChange={setLayout}
          renderTile={(id, path) => (
            <MosaicWindow<string>
              title={companyMap[id].ticker}
              path={path}
              toolbarControls={[
                <button
                  key="left"
                  onClick={() => addWindow(path, "row", "first")}
                  className="hover:bg-green-200 p-1 rounded"
                >
                  <PanelLeft />
                </button>,
                <button
                  key="right"
                  onClick={() => addWindow(path, "row", "second")}
                  className="hover:bg-green-200 p-1 rounded"
                >
                  <PanelRight />
                </button>,
                <button
                  key="bottom"
                  onClick={() => addWindow(path, "column", "second")}
                  className="hover:bg-green-200 p-1 rounded"
                >
                  <PanelBottom />
                </button>,
                <button
                  key="remove"
                  onClick={() => removeWindow(path)}
                  className="hover:bg-red-200 text-red-500 p-1 rounded"
                >
                  <X />
                </button>,
              ]}
            >
              <CompanyInfo company={companyMap[id]} />
            </MosaicWindow>
          )}
        />
      </DndProvider>
    </div>
  );
};

export default App;
