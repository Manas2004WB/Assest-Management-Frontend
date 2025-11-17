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
}

const AssetNode: React.FC<AssetNodeProps> = ({
  node,
  fetchTree,
  isDeletedView = false,
}) => {
  const { deleteNode,restoreNode } = useNodeService(); 
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  //Done
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
  //Done
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
          <span className="node-count">
            ({node.children_count || node.children?.length || 0})
          </span>
        </div>

        {node.node_id !== 1 && !isDeletedView && (
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
          {node.children!.map((child) =>
            isDeletedView ? (
              <AssetNode
                key={child.node_id}
                node={child}
                fetchTree={fetchTree}
                isDeletedView
              />
            ) : (
              <AssetNode
                key={child.node_id}
                node={child}
                fetchTree={fetchTree}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AssetNode;
