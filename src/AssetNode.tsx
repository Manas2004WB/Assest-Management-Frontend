import { useState } from "react";
import "./App.css"; 

interface NodeAttributes {
  department?: string;
  status?: string;
}

interface Node {
  node_id: number;
  node_name: string;
  children?: Node[];
  attributes?: NodeAttributes;
}

interface AssetNodeProps {
  node: Node;
}

const AssetNode: React.FC<AssetNodeProps> = ({ node }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="asset-node">
      <div
        className={`node-header ${hasChildren ? "clickable" : ""}`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
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
        <div className="node-content">
          <span className="node-name">{node.node_name}</span>
        </div>
      </div>

      {/* Optional metadata
      {node.attributes?.department && (
        <div className="node-department">{node.attributes.department}</div>
      )}
      {node.attributes?.status && (
        <div
          className={`node-status ${
            node.attributes.status === "Active" ? "active" : "inactive"
          }`}
        >
          {node.attributes.status}
        </div>
      )} */}

      {/* Children */}
      {hasChildren && expanded && (
        <div className="node-children">
          {node.children!.map((child) => (
            <AssetNode key={child.node_id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetNode;
