import { useEffect, useState } from "react";
import AddAssetForm from "../../Components/AddAssetForm/AddAssetForm";
import AssetTree from "../../Components/AssetTree/AssetTree";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Mainpage.css";
import axios from "axios";

interface Node {
  node_id: number;
  node_name: string;
  children?: Node[];
  children_count: number;
  is_deleted: boolean;
}

const Mainpage = () => {
  const [totalAssets, setTotalAssets] = useState(0);
  const [maxDepth,setMaxDepth] = useState(0)
  const [treeData, setTreeData] = useState<Node[]>([]);

  const getMaxDepth = (node: Node): number => {
  if (!node.children || node.children.length === 0) {
    return 1;
  }
  const childDepths = node.children.map((child) => getMaxDepth(child));
  return 1 + Math.max(...childDepths);
};

  const fetchTree = async () => {
    try {
      const res = await axios.get<Node[]>("http://127.0.0.1:8000/api/nodes/tree");
      const nodes = res.data || [];
      setTreeData(nodes);
      const total = nodes.reduce((sum, node) => sum + (node.children_count || 0), 0);
      setTotalAssets(total);

    const depths = nodes.map((node) => getMaxDepth(node));
    const maxDepth = Math.max(...depths, 0);
    setMaxDepth(maxDepth)
    } catch (err) {
      console.error("Error fetching tree:", err);
    }
  };
  useEffect(() => {
    fetchTree();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="app-container">
        <h1 className="page-title">Asset Hierarchy</h1>
        <AddAssetForm onAssetAdded={() => window.location.reload()} />
        <div className="tree-section">
          <AssetTree treeData={treeData} fetchTree={fetchTree} />
        </div>
      </div>
      <div className="analytics-section">
        <h1>Total Assets: <span>{totalAssets}</span></h1>
        <h1>Maximum Depth: <span>{maxDepth}</span></h1>
      </div>
    </div>
  );
};

export default Mainpage;
