import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Logout from "./pages/logout";
import ReduceStock from "./pages/reduceStock";
import NewStock from "./pages/newStock";
import ViewStock from "./pages/viewStock";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/viewstock" element={<ViewStock />} />
          <Route path="/newstock" element={<NewStock />} />
          <Route path="/reducestock" element={<ReduceStock />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
