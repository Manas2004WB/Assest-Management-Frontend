import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/deleted-nodes">Deleted Nodes</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
