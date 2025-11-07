import "./App.css";
import axios from "axios";
import Tree from "react-d3-tree";
import { useEffect, useState } from "react";
import { useCenteredTree } from "./helper/useCenteredTree";

interface NodeAttributes {
  department?: string;
}

interface NodeDatum {
  name: string;
  attributes?: NodeAttributes;
  children?: NodeDatum[];
}

interface RenderProps {
  nodeDatum: NodeDatum;
  toggleNode: () => void;
}

const renderRectSvgNode = ({ nodeDatum, toggleNode }: RenderProps) => {
  const width = 220;
  const height = 90;

  return (
    <g transform={`translate(-${width / 2}, -${height / 2})`}>
      <foreignObject width={width} height={height}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          onClick={toggleNode}
          className="w-full h-full rounded-2xl shadow-lg border border-slate-700 
                     bg-gradient-to-br from-slate-800 to-slate-900 
                     text-white flex flex-col justify-center items-center 
                     hover:scale-105 hover:shadow-blue-500/30 
                     transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-xl">🏭</span>
            <h3 className="text-base font-semibold tracking-wide">
              {nodeDatum.name}
            </h3>
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

function App() {
  const [tree, setTree] = useState<NodeDatum[]>([]);
  const [translate, containerRef] = useCenteredTree();
  async function fetchData() {
    try {
      const response = await axios.get<any[]>(
        "http://127.0.0.1:8000/api/nodes/tree"
      );
      const mapToTreeFormat = (node: any): NodeDatum => {
        const children =
          Array.isArray(node.children) && node.children.length > 0
            ? node.children.map(mapToTreeFormat)
            : undefined;
        return {
          name: node.node_name,
          attributes: node.department
            ? { department: node.department }
            : undefined,
          ...(children ? { children } : {}),
        };
      };

      const formattedTree = (response.data || []).map(mapToTreeFormat);
      setTree(formattedTree);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Asset Hierarchy</h1>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(160deg, #0f172a, #1e293b)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
        ref={containerRef as any}
      >
        {tree.length > 0 ? (
          <Tree
            data={tree}
            translate={translate}
            renderCustomNodeElement={renderRectSvgNode}
            orientation="vertical"
            separation={{ siblings: 1.8, nonSiblings: 2.2 }}
            nodeSize={{ x: 280, y: 200 }}
            pathFunc="diagonal"
            zoomable
          />
        ) : (
          <div>Loading tree…</div>
        )}
      </div>
    </div>
  );
}

export default App;
