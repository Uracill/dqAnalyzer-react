import React, { useState, useEffect } from 'react'

import ScenarioExplorerTree from './ScenarioExplorerTree';
import ScenarioExplorerHeader from './ScenarioExplorerHeader';
import ResizeBar from '../ResizeBar';

export default function ScenarioExplorer(props) {

    // Resize States
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(300); // Initial width of the sidebar

    // Pressing the + pens an input field.
    const [inputOpen, setInputOpen] = useState(false);

    const handleAddClick = () => {
        setInputOpen(true);
    }

    return (
        <>
            <div className="py-4 px-4 prose overflow-scroll" style={{ width: `${sidebarWidth}px`, cursor: isResizing ? 'col-resize' : 'default', }}>
                <ScenarioExplorerHeader handleAddClick={handleAddClick} />
                <ScenarioExplorerTree inputOpen={inputOpen} setInputOpen={setInputOpen} onEditScenarioTestClick={props.onEditScenarioTestClick}/>
            </div >
            <ResizeBar setSidebarWidth={setSidebarWidth} setIsResizing={setIsResizing} isResizing={isResizing} />
        </>
    )
}
