import { useEffect, useState } from "react";
import { site } from "../../site_state";
import { Navigate, Outlet } from "react-router-dom";

const AuthCheck = () => {
  const [auth, setAuth] = useState<boolean | null>(null);

  const apiUrl = site;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(apiUrl + "/api/auth/v1/check", {
          method: "GET",
          credentials: "include",
        });

        // response.ok ? setAuth(true) : setAuth(false);
        if (response.ok) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error("Ошибка авторизации", error);
        setAuth(false);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth === null) return <div>Spiner</div>;

  return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default AuthCheck;
