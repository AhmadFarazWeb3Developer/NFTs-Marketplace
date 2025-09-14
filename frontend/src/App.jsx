import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Explore from "./pages/Explore";

import Home from "./pages/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Home />
        <Explore />
      </BrowserRouter>
    </>
  );
}

export default App;
