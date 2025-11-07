import { useEffect, useState } from "react";
import axios from "axios";
import AssetNode from "./AssetNode";
import "./App.css";

interface Node {
  node_id: number;
  node_name: string;
  children?: Node[];
}

function App() {
  const [treeData, setTreeData] = useState<Node[]>([]);
  const [newAssetName, setNewAssetName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentOptions, setParentOptions] = useState<{node_id:number, node_name:string}[]>([]);
  // ✅ Fetch tree
  async function fetchTree() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/nodes/tree");
      setTreeData(res.data);
    } catch (err) {
      console.error("Error fetching tree:", err);
    }
  }

  // ✅ Add new asset
  async function addAsset() {
    if (!newAssetName || parentName === null) {
      alert("Please provide both parent ID and node name");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/nodes", {
        parent_name: parentName,
        node_name: newAssetName,
      });

      setNewAssetName("");
      setParentName("");

      // Refresh tree after adding
      await fetchTree();
    } catch (err) {
      console.error("Error adding asset:", err);
    }
  }

  useEffect(() => {
    fetchTree();
  }, []);

  async function fetchParentOptions(query: string) {
  if (!query) return setParentOptions([]);
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/nodes/search?q=${query}`);
    setParentOptions(res.data);
  } catch (err) {
    console.error(err);
  }
}

  return (
    <div className="app-container">
  <h1 className="page-title">Asset Hierarchy</h1>

  <div className="add-asset-form">
    <input
      type="text"
      placeholder="Parent Name"
      value={parentName ?? ""}
      onChange={(e) => {
        setParentName(e.target.value),
        fetchParentOptions(e.target.value);
      }}
    />
    {parentOptions.length > 0 && (
  <ul className="dropdown">
    {parentOptions.map((opt) => (
      <li key={opt.node_id} onClick={() => {
        setParentName(opt.node_name);
        // setSelectedParentId(opt.node_id); // store ID for API
        setParentOptions([]);
      }}>
        {opt.node_name}
      </li>
    ))}
  </ul>
)}
    <input
      type="text"
      placeholder="Asset Name"
      value={newAssetName}
      onChange={(e) => setNewAssetName(e.target.value)}
    />
    <button onClick={addAsset}>Add Asset</button>
  </div>

  <div className="tree-section">
    <div className="tree-container">
      {treeData.map((node) => (
        <AssetNode key={node.node_id} node={node} />
      ))}
    </div>
  </div>
</div>

  );
}

export default App;
