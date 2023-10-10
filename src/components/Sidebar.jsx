import React, { useRef, useState, useEffect } from "react";
import RqaExplorer from "./rqaExplorer/RqaExplorer";
import "../language/icon/icons.css";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import {
  useEdges,
  useOnSelectionChange,
  useReactFlow,
  useStore,
} from "reactflow";
import { MarkerType } from "reactflow";
import "../language/icon/icons.css";
import ViewportChangeLogger from "../utils/hideComponentOnViewportClick";
import LoadtestSpecifier from "./loadtest/LoadtestSpecifier";
import {element} from "prop-types";
import CloudQueueIcon from  "@mui/icons-material/CloudQueue";
import CloudOffIcon from  "@mui/icons-material/CloudOff";
import ContentPasteSearchIcon from  "@mui/icons-material/ContentPasteSearch";
import ScenarioTestController from "./scenariotest/ScenarioTestController.jsx";
import ScenarioExplorer from "./scenarioExplorer/ScenarioExplorer";


export default function Sidebar({ domain, loadtestSpecs, rqas, nodes, edges }) {
  const [edgeSelected, setEgdeSelected] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [rqaExplorerShow, setRqaExplorerShow] = useState();
  const [loadTestShow, setLoadTestShow] = useState();
  const [rqaPlayShow, setRqaPlayShow] = useState(false);
  const reactFlowInstance = useReactFlow();
  const loadtestRef = useRef(null);

  const [scenarioMode, setScenarioMode] = useState(true);
  const [scenarioExplorerShow, setScenarioExplorerShow] = useState();
  const [scenarioTestShow, setScenarioTestShow] = useState();
  const [editScenarioTestShow, setEditScenarioTestShow] = useState();
  const [editRqa, setEditRqa] = useState(null);

  ViewportChangeLogger(loadtestRef, setLoadTestShow);

  const selectionChange = useOnSelectionChange({
    onChange: ({ edges }) => {
      if (edges[0]) {
        setSelectedEdge(edges[0]);

        let relatedEdgesArray = reactFlowInstance
            .getEdges()
            .filter((edge) => edge.name == edges[0].name);
        let unrelatedEdgesArray = reactFlowInstance
            .getEdges()
            .filter((edge) => edge.name != edges[0].name);

        let newEdgeArray = [];

        unrelatedEdgesArray.forEach((edge) => {
          edge.animated = false;
          edge.style = {};
          edge.markerStart = {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
          };
        });

        relatedEdgesArray.forEach((edge) => {
          edge.selected = true;
          edge.animated = true;
          edge.style = {
            stroke: "#570FF2",
          };
          edge.markerStart = {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#570FF2",
          };
        });

        newEdgeArray = newEdgeArray.concat(
            unrelatedEdgesArray,
            relatedEdgesArray
        );
        reactFlowInstance.setEdges(newEdgeArray);
      } else {
        setSelectedEdge();
        let updatedEdgesArray = reactFlowInstance.getEdges();
        updatedEdgesArray.forEach((edge) => {
          edge.animated = false;
          edge.style = {};
        });
        reactFlowInstance.setEdges(updatedEdgesArray);
      }
    },
  });

  const onChangeModeClick = () => {
    setScenarioMode((prevState) => !prevState);

    // Hide all possible windows when changing the mode
    setScenarioExplorerShow(false);
    setScenarioTestShow(false);
    setRqaExplorerShow(false);
    setLoadTestShow(false);
  };

  const onScenarioExplorerClick = () => {
    setScenarioExplorerShow((prevState) => !prevState);
  };

  const onEditScenarioTestClick = (rqa) => {
    setEditRqa(rqa);
    setEditScenarioTestShow((prevState) => !prevState);
  };

  const onScenarioTestClick = () => {
    setScenarioTestShow((prevState) => !prevState);
  };

  const onRqaExplorerClick = () => {
    setRqaExplorerShow((prevState) => !prevState);
  };

  const onLoadtestClick = () => {
    setLoadTestShow((prevState) => !prevState);
  };

  if(scenarioMode) {
    return (
        <div className="sidebar">
          <div className="taskbar-container">
            <button className="change-mode" onClick={onChangeModeClick}>
              <div>
                <CloudQueueIcon/>
              </div>
            </button>
            <button onClick={onScenarioExplorerClick}>
              <div><EqualizerIcon/></div>
            </button>
            <button onClick={onScenarioTestClick}>
              <div><ContentPasteSearchIcon/></div>
            </button>
          </div>

          {scenarioExplorerShow ? <ScenarioExplorer selectedEdge={selectedEdge} edges={edges} onEditScenarioTestClick={onEditScenarioTestClick}/> : null}
          {scenarioTestShow ? <div> <ScenarioTestController selectedEdge={selectedEdge} nodes={nodes} edges={edges} setScenarioExplorerShow={setScenarioExplorerShow} setScenarioTestShow={setScenarioTestShow}/> </div> : null}
          {editScenarioTestShow ? <div> <EditScenarioTestMenu edges={edges} rqa={editRqa} setScenarioExplorerShow={setScenarioExplorerShow} setScenarioTestShow={setScenarioTestShow}/> </div> : null}

        </div>
    );
  }
  else {
    return (
        <div className="sidebar">
          <div className="taskbar-container">
            <button className="change-mode" onClick={onChangeModeClick}>
              <div>
                <CloudOffIcon/>
              </div>
            </button>
            <button onClick={onRqaExplorerClick}>
              <div>
                <EqualizerIcon />
              </div>
            </button>
            <button onClick={onLoadtestClick}>
              <div className="icon-domain-story-loadtest"></div>
            </button>
            <button>
              <div className="icon-domain-story-monitoring"></div>
            </button>
            <button>
              <div className="icon-domain-story-chaosexperiment"></div>
            </button>
          </div>
          {loadTestShow && (
              <div ref={loadtestRef}>
                <LoadtestSpecifier
                    domain={domain}
                    loadtestSpecs={loadtestSpecs}
                    selectedEdge={selectedEdge}
                    rqas={rqas}
                />
              </div>
          )}
          {rqaExplorerShow ? (
              <RqaExplorer loadtestSpecifier={setLoadTestShow} />
          ) : null}
        </div>
    );
  }
}
