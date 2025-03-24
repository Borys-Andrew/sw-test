import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-mosaic-component/react-mosaic-component.css";

import { Loader } from "./components/loader";
import { MosaicLayout } from "./components/mosaicLayout";
import { useDashboard } from "./hooks";

const App: React.FC = () => {
  const { isLoading, layout, setLayout, companyMap, addWindow, removeWindow } =
    useDashboard();

  return (
    <div className="h-screen">
      {isLoading && <Loader />}
      <DndProvider backend={HTML5Backend}>
        <MosaicLayout
          layout={layout}
          companyMap={companyMap}
          onChange={setLayout}
          onAddWindow={addWindow}
          onRemoveWindow={removeWindow}
        />
      </DndProvider>
    </div>
  );
};

export default App;
