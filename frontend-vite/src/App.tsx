import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import AuthCheck from "./pages/auth/auth_check";
import Home from "./pages/home/home";
import { CreateDeckPage } from "./pages/create_deck/create_deck_page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route element={<AuthCheck />}>
          <Route path="/create_deck" element={<CreateDeckPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
