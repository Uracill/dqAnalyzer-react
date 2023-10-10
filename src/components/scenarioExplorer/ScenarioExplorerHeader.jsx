import React from 'react'
import AddIcon from '@mui/icons-material/Add';
export default function ScenarioExplorerHeader({ handleAddClick }) {
    return (
        <div className="flex items-center justify-between mb-2">
            <span >Scenario Explorer</span>
            <button onClick={handleAddClick}><AddIcon /></button>
        </div>
    )
}
