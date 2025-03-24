import React from "react";
import {
  Mosaic,
  MosaicNode,
  MosaicPath,
  MosaicWindow,
} from "react-mosaic-component";

import { Company } from "@/types";

import CompanyInfo from "../companyInfo";
import { MosaicControls } from "../mosaicControls";

interface MosaicLayoutProps {
  layout: MosaicNode<string> | null;
  companyMap: Record<string, Company>;
  onChange: (newLayout: MosaicNode<string> | null) => void;
  onAddWindow: (
    path: MosaicPath,
    direction: "row" | "column",
    position: "first" | "second",
  ) => void;
  onRemoveWindow: (path: MosaicPath) => void;
}

export const MosaicLayout = ({
  layout,
  companyMap,
  onChange,
  onAddWindow,
  onRemoveWindow,
}: MosaicLayoutProps) => {
  if (!layout) return null;

  return (
    <Mosaic<string>
      value={layout}
      onChange={onChange}
      renderTile={(id, path) => (
        <MosaicWindow<string>
          title={companyMap[id].ticker}
          path={path}
          toolbarControls={
            <MosaicControls
              onAddLeft={() => onAddWindow(path, "row", "first")}
              onAddRight={() => onAddWindow(path, "row", "second")}
              onAddBottom={() => onAddWindow(path, "column", "second")}
              onRemove={() => onRemoveWindow(path)}
            />
          }
        >
          <CompanyInfo company={companyMap[id]} />
        </MosaicWindow>
      )}
    />
  );
};
