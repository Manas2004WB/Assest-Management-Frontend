import { useState } from "react";
import axios from "axios";
import "./AddAssetForm.css";

interface AddAssetFormProps {
  onAssetAdded: () => void;
}

const AddAssetForm = ({ onAssetAdded }: AddAssetFormProps) => {
  const [newAssetName, setNewAssetName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentOptions, setParentOptions] = useState<
    { node_id: number; node_name: string }[]
  >([]);

  async function fetchParentOptions(query: string) {
    if (!query.trim()) {
      setParentOptions([]);
      return;
    }
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/nodes/search?q=${query}`
      );
      setParentOptions(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addAsset() {
    if (!newAssetName || !parentName) {
      alert("Please provide both parent name and asset name");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/nodes", {
        parent_name: parentName,
        node_name: newAssetName,
      });

      setNewAssetName("");
      setParentName("");
      setParentOptions([]);
      onAssetAdded();
    } catch (err) {
      console.error("Error adding asset:", err);
    }
  }

  return (
    <div className="add-asset-form">
      <div className="parent-name-input">
        <input
          type="text"
          placeholder="Parent Name"
          value={parentName ?? ""}
          onChange={(e) => {
            setParentName(e.target.value);
            fetchParentOptions(e.target.value);
          }}
        />
        {parentOptions.length > 0 && (
          <ul className="dropdown">
            {parentOptions.map((opt) => (
              <li
                key={opt.node_id}
                onMouseDown={() => {
                  setParentName(opt.node_name);
                  setParentOptions([]);
                }}
              >
                {opt.node_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        placeholder="Asset Name"
        value={newAssetName}
        onChange={(e) => setNewAssetName(e.target.value)}
      />
      <button onClick={addAsset}>Add Asset</button>
    </div>
  );
};

export default AddAssetForm;
