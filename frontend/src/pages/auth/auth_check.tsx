import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchApi } from "../../helper/fetchApi";

const AuthCheck: React.FC = () => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await fetchApi({
          API_URI: "/api/auth/v1/check",
          bearer: true,
        });
        data ? setAuth(true) : setAuth(false);
      } catch (error) {
        console.error("Ошибка авторизации", error);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return <div>Spiner</div>;

  return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default AuthCheck;
