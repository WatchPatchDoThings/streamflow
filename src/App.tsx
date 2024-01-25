import { memo, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  useNodes,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { BaseModule } from "./nodes/twitch";

import styles from "./App.module.css";
import "./App.global.css"

const nodeTypes = { selectorNode: BaseModule };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const starting_nodes = [
      {
        id: "2",
        type: "selectorNode",
        data: {},
        style: { border: "1px solid #777", padding: 10 },
        position: { x: 300, y: 50 },
        className: "node--custom",
      },
    ];

    setNodes(starting_nodes);
  }, []);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds),
      ),
    [],
  );

  return (
    <div className={styles.container}>
      <ReactFlowProvider>
        <ReactFlow
          proOptions={{ hideAttribution: true }}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}

function Sidebar() {
  // This hook will only work if the component it's used in is a child of a
  // <ReactFlowProvider />.
  const nodes = useNodes();

  return (
    <aside>
      {nodes.map((node) => (
        <div key={node.id}>
          Node {node.id} - x: {node.position.x.toFixed(2)}, y:{" "}
          {node.position.y.toFixed(2)}
        </div>
      ))}
    </aside>
  );
}

export default memo(App);
