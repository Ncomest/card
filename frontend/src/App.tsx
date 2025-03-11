import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/auth/login";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthCheck from "./pages/auth/auth_check";
import { CreateDeckPage } from "./pages/create_deck/create_deck_page";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/create_deck" element={<CreateDeckPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route element={<AuthCheck />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
