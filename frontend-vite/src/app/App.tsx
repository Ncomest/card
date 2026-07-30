import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login";
import AuthCheck from "../pages/auth/auth_check";
import Home from "../pages/home/home";
import { CreateDeckPage } from "../pages/create_deck/create_deck_page";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route element={<AuthCheck />}>
          <Route path="/" element={<Home />} />
          <Route path="/create_deck" element={<CreateDeckPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

