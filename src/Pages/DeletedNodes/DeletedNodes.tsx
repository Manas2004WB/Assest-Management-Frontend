import AssetTree from "../../Components/AssetTree/AssetTree";
import "./DeletedNodes.css";

const DeletedNodes = () => {
  return (
    <div className="app-container">
      <h1 className="page-title">Asset Hierarchy(Deleted)</h1>
      <div className="tree-section">
        <AssetTree/>
      </div>
    </div>
  );
};

export default DeletedNodes;
