import { useState } from "react";
import "./AssetNode.css";
import { MdDelete } from "react-icons/md";
import axios from "axios";
interface NodeAttributes {
  department?: string;
  status?: string;
}

interface Node {
  node_id: number;
  node_name: string;
  children_count: number;
  children?: Node[];
  attributes?: NodeAttributes;
}

interface AssetNodeProps {
  node: Node;
  fetchTree: () => void;
}

const AssetNode: React.FC<AssetNodeProps> = ({ node, fetchTree }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  async function handleDelete(nodeId: number) {
    if (
      !window.confirm(
        "Are you sure you want to delete this node and its children?"
      )
    )
      return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/nodes/${nodeId}`);
      await fetchTree();
    } catch (err) {
      console.error(err);
      alert("Failed to delete node");
    }
  }
  return (
    <div className="asset-node">
      <div
        className={`node-header ${hasChildren ? "clickable" : ""}`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <div className="node-info">
          {hasChildren && (
            <button
              className="toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              {expanded ? "−" : "+"}
            </button>
          )}
          <span className="node-name">{node.node_name}</span>
          <span className="node-count">({node.children_count})</span>
        </div>

        {node.node_id !== 1 && (
          <div className="node-actions">
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(node.node_id);
              }}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="node-children">
          {node.children!.map((child) => (
            <AssetNode key={child.node_id} node={child} fetchTree={fetchTree} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetNode;
