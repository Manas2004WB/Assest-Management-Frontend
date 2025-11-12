import "./App.css";
import DeletedNodes from "./Pages/DeletedNodes/DeletedNodes";
import Mainpage from "./Pages/Mainpage/Mainpage";
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
   <Routes>
    <Route path="/" element={<Mainpage/>}/>
    <Route path="/deleted-nodes" element={<DeletedNodes/>}/>
   </Routes>
  );
}

export default App;
