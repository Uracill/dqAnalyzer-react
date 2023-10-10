import React, { useEffect } from 'react'
import ExpandableScenarioNode from './ScenarioExplorerNode.jsx';
import { useState } from 'react';
import axios from 'axios';

export default function ScenarioTree(props) {

    const [rqas, setRqas] = useState([])

    const [menuState, setMenuState] = useState({});

    useEffect(() => {
        axios.get(`https://64bbef8f7b33a35a4446d353.mockapi.io/dqualizer/scenarios/v1/scenarios`).then((response) => {
            setRqas(response.data);
        })
    }, []);

    const editRqa = (rqa) => {
        props.onEditScenarioTestClick(rqa);
    }
    return (
        <>
            {rqas.map((rqa) => {
                return <>
                    <ExpandableScenarioNode key={rqa.id} data={rqa.id} rqa={rqa} expanded={menuState[rqa.id]} level={1} expandFunction={() => editRqa(rqa)}/>
                </>
            })}
            {props.inputOpen && <ExpandableScenarioNode setRqas={setRqas} setMenuState={setMenuState} setInputOpen={props.setInputOpen} />}
        </>
    )
}
