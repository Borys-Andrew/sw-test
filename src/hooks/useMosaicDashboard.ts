import { useEffect, useState } from "react";
import {
  MosaicNode,
  MosaicParent,
  MosaicPath,
  MosaicUpdate,
  getLeaves,
  getNodeAtPath,
  updateTree,
} from "react-mosaic-component";

import { fetchCompanies } from "@/api";
import { Company } from "@/types";

export const useDashboard = () => {
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

  useEffect(() => {
    fetchCompanies().then((data) => {
      setCompanies(data);
      setLoading(false);

      const tickers = data.slice(0, 3).map((c) => c.ticker);
      const initial = buildLayout(tickers);
      setLayout(initial);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (!layout) return;

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
    if (!node || !layout) return;

    if (path.length === 0) {
      setLayout(null);
      return;
    }

    const parentPath = path.slice(0, -1);
    const parent = getNodeAtPath(layout, parentPath) as MosaicParent<string>;

    const sibling = parent.first === node ? parent.second : parent.first;

    const update: MosaicUpdate<string> = {
      path: parentPath,
      spec: { $set: sibling },
    };

    const newLayout = updateTree(layout, [update]) as MosaicNode<string>;
    setLayout(newLayout);
  };

  const isLoading = loading || !layout;

  return {
    isLoading,
    layout,
    setLayout,
    companyMap,
    addWindow,
    removeWindow,
  };
};
