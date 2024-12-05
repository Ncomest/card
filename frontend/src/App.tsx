import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/auth/login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthCheck from "./pages/auth/auth_check";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Login />} />
          <Route path="/" element={<Home />} />
        <Route element={<AuthCheck />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
