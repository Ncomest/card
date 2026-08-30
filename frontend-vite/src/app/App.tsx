import { Routes, Route, Navigate } from "react-router-dom";
import { Login, AuthCheck } from "@/pages/auth";
import { Home } from "@/pages/home";
import { CreateDeckPage } from "@/pages/create-deck";

function App() {
  return (
    <>
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
