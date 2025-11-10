import { useEffect, useState } from "react";
import axios from "axios";
import AssetNode from "../AssetNode/AssetNode";

interface Node {
  node_id: number;
  node_name: string;
  children?: Node[];
}

const AssetTree = () => {
  const [treeData, setTreeData] = useState<Node[]>([]);

  async function fetchTree() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/nodes/tree");
      setTreeData(res.data);
    } catch (err) {
      console.error("Error fetching tree:", err);
    }
  }

  useEffect(() => {
    fetchTree();
  }, []);

  return (
    <div className="tree-container">
      {treeData.map((node) => (
        <AssetNode key={node.node_id} node={node} fetchTree={fetchTree}/>
      ))}
    </div>
  );
};

export default AssetTree;
