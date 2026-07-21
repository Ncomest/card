import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchApi } from "../../shared/api/fetchApi";
import Spinner from "../../shared/ui/spinner/spinner";

const AuthCheck: React.FC = () => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await fetchApi({
          API_URI: "/api/auth/v1/check",
          bearer: true,
        });

        if (data) setAuth(true);
        else setAuth(false);
      } catch (error) {
        console.error("Ошибка авторизации", error);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return <Spinner />;

  return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default AuthCheck;
