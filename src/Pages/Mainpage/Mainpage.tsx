import AddAssetForm from "../../Components/AddAssetForm/AddAssetForm";
import AssetTree from "../../Components/AssetTree/AssetTree";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Mainpage.css";

const Mainpage = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="app-container">
          <h1 className="page-title">Asset Hierarchy</h1>
        <AddAssetForm onAssetAdded={() => window.location.reload()} />
        <div className="tree-section">
          <AssetTree />
        </div>
      </div>
      <div className="analytics-section">
            <h1>Total Assets : </h1>
      </div>
    </div>
  );
};

export default Mainpage;
