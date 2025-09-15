import "./App.css";
import { BrowserRouter, Outlet } from "react-router-dom";

import Explore from "./pages/Explore";

import Home from "./pages/Home";
function App() {
  return (
    <>
      <Outlet />
      {/* match the exact routes */}
    </>
  );
}

export default App;
