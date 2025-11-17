import { useEffect, useState } from "react";
import AssetNode from "../../Components/AssetNode/AssetNode";
import "./DeletedNodes.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNodeService } from "../../api/nodeService";

interface DeletedTree {
  node_id: number;
  node_name: string;
  children_count: number;
  children?: DeletedTree[];
  attributes?: { department?: string; status?: string };
  is_deleted: boolean;
}
const DeletedNodes = () => {
  const [deletedTrees, setDeletedTrees] = useState<DeletedTree[]>([]);
  const { getDeletedTrees } = useNodeService();
  useEffect(() => {
    fetchDeletedTrees();
  }, []);

  const fetchDeletedTrees = async () => {
    try {
      const res = await getDeletedTrees();
      setDeletedTrees(res);
    } catch (err) {
      console.error("Failed to load deleted trees:", err);
    }
  };

  return (
    <div className="layout">
      <Sidebar/>
      <div className="app-container">
      <h1 className="page-title">Deleted Asset Hierarchies</h1>

      <div className="deleted-tree-section">
        {deletedTrees.length === 0 ? (
          <p>No deleted nodes found.</p>
        ) : (
          deletedTrees.map((tree) => (
            <div key={tree.node_id} className="deleted-card">
              <div className="deleted-card-header">
                <h2>{tree.node_name}</h2>
              </div>
              <div className="deleted-card-body">
                <AssetNode node={tree} fetchTree={fetchDeletedTrees} isDeletedView />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default DeletedNodes;
