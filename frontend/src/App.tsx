import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/auth/login";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthCheck from "./pages/auth/auth_check";
import { CreateDeckPage } from "./pages/create_deck/create_deck_page";
import { GlobalStyles } from "./style/global.style";

const App: React.FC = () => {
  return (
    <>
    <GlobalStyles/>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route element={<AuthCheck />}>
          <Route path="/" element={<Home />} />
          <Route path="/create_deck" element={<CreateDeckPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
