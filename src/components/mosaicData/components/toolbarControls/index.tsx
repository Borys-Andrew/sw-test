import React from "react";

import { PanelBottom, PanelLeft, X } from "lucide-react";

type ToolbarControlsType = {
  onDelete?: () => void;
  onLeftAdd?: () => void;
  onBottomAdd?: () => void;
};
export const ToolbarControls = ({
  onDelete,
  onBottomAdd,
  onLeftAdd,
}: ToolbarControlsType) => {
  return [
    <button
      className="flex items-center justify-center cursor-pointer hover:bg-green-400 ml-1 p-1 rounded-[4px]"
      onClick={onLeftAdd}
    >
      <PanelLeft />
    </button>,
    <button
      className="flex items-center justify-center cursor-pointer hover:bg-green-400 ml-1 p-1 rounded-[4px]"
      onClick={onBottomAdd}
    >
      <PanelBottom />
    </button>,
    <button
      className="flex items-center justify-center text-red-500 cursor-pointer hover:bg-green-400 ml-1 p-1 rounded-[4px]"
      onClick={onDelete}
    >
      <X />
    </button>,
  ];
};
