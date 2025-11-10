import AddAssetForm from "../../Components/AddAssetForm/AddAssetForm";
import AssetTree from "../../Components/AssetTree/AssetTree";
import "./Mainpage.css";

const Mainpage = () => {
  return (
    <div className="app-container">
      <h1 className="page-title">Asset Hierarchy</h1>
      <AddAssetForm onAssetAdded={() => window.location.reload()} />
      <div className="tree-section">
        <AssetTree />
      </div>
    </div>
  );
};

export default Mainpage;
