import "./App.css";
import DeletedNodes from "./Pages/DeletedNodes/DeletedNodes";
import Login from "./Pages/Loginpage/Login";
import Mainpage from "./Pages/Mainpage/Mainpage";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/main-page" element={<Mainpage/>}/>
    <Route path="/deleted-nodes" element={<DeletedNodes/>}/>
   </Routes>
  );
}

export default App;
