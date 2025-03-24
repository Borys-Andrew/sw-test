import React from "react";

import { PanelBottom, PanelLeft, PanelRight, X } from "lucide-react";

interface MosaicControlsProps {
  onAddLeft: () => void;
  onAddRight: () => void;
  onAddBottom: () => void;
  onRemove: () => void;
}

export const MosaicControls = ({
  onAddLeft,
  onAddRight,
  onAddBottom,
  onRemove,
}: MosaicControlsProps) => {
  return [
    <button
      key="left"
      onClick={onAddLeft}
      className="hover:bg-green-200 p-1 rounded"
    >
      <PanelLeft />
    </button>,
    <button
      key="right"
      onClick={onAddRight}
      className="hover:bg-green-200 p-1 rounded"
    >
      <PanelRight />
    </button>,
    <button
      key="bottom"
      onClick={onAddBottom}
      className="hover:bg-green-200 p-1 rounded"
    >
      <PanelBottom />
    </button>,
    <button
      key="remove"
      onClick={onRemove}
      className="hover:bg-red-200 text-red-500 p-1 rounded"
    >
      <X />
    </button>,
  ];
};
