import { useState } from "react";
import "./AssetNode.css";
import { MdDelete } from "react-icons/md";
import { MdOutlineRestorePage } from "react-icons/md";
import { useNodeService } from "../../api/nodeService";

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
  is_deleted: boolean;
}
interface AssetNodeProps {
  node: Node;
  fetchTree: () => void;
  isDeletedView?: boolean;
  onSelect?: (nodeId: number) => void; // new
}

const ROOT_NODE_ID = 1;

const AssetNode: React.FC<AssetNodeProps> = ({
  node,
  fetchTree,
  isDeletedView = false,
  onSelect,
}) => {
  const { deleteNode, restoreNode } = useNodeService();
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
      await deleteNode(nodeId);
      await fetchTree();
    } catch (err) {
      console.error(err);
      alert("Failed to delete node");
    }
  }

  async function handleRestoreNode(nodeId: number) {
    if (
      !window.confirm(
        "Are you sure you want to restore this node and its children?"
      )
    )
      return;
    try {
      await restoreNode(nodeId);
      await fetchTree();
    } catch (err) {
      console.error(err);
      alert("Failed to restore node");
    }
  }

  return (
    <div className="asset-node">
      <div
        className={`node-header ${hasChildren ? "clickable" : ""}`}
        onClick={() => {
          hasChildren && setExpanded(!expanded);
          onSelect && onSelect(node.node_id); // notify parent
        }}
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
          <span className="node-count">
            ({node.children_count || node.children?.length || 0})
          </span>
        </div>

        {node.node_id !== ROOT_NODE_ID && !isDeletedView && (
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
        {isDeletedView && (
          <div className="node-actions">
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleRestoreNode(node.node_id);
              }}
            >
              <MdOutlineRestorePage />
            </button>
          </div>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="node-children">
          {node.children.map((child) => (
            <AssetNode
              key={child.node_id}
              node={child}
              fetchTree={fetchTree}
              isDeletedView={isDeletedView}
              onSelect={onSelect} // forward callback
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetNode;
