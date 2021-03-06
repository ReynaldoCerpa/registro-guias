import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AdminHome from "./pages/AdminHome/AdminHome";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
{/*         <Route exact path="/" element={<Home/>} /> */}
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/AdminHome" element={<AdminHome/>} />
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
