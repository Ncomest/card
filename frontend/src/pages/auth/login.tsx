import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchApi } from "../../helper/fetchApi";

const ComponentStyle = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b0b0b;
`;

const FormStyle = styled.form`
  position: relative;
  border: 1px solid #bebebe;
  border-radius: 10px;
  padding: 100px 50px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
  color: #bebebe;
  font-size: 20px;
`;

const InputStyle = styled.input`
  background-color: #eaeaea;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 18px;
  letter-spacing: 0.2rem;
  &::placeholder {
    letter-spacing: 0.1rem;
    font-size: 16px;
  }
`;

const PStyle = styled.p`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background-color: red;
  padding: 5px;
`;

const ButtonStyle = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  margin: 20px 0;
  background-color: #dbdb61;
  &:hover {
    background-color: #ffff00;
  }
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  font-weight: 800px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    console.log({ username, password });

    try {
      const data = await fetchApi({
        API_URI: "/api/auth/v1/login",
        method: "POST",
        body: { username: username, password: password },
      });

      if (data) {
        console.log("data", data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/");
      } else {
        const errorData = await data;
        setError(errorData.message || "Неверный логин или пароль");
      }
    } catch (error) {
      setError("Произошла ошибка, попробуйте снова");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <ComponentStyle>
      <FormStyle onSubmit={handleSubmit}>
        {error && <PStyle>{error}</PStyle>}
        <LabelStyle>
          Логин:
          <InputStyle
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
            placeholder="Введите логин"
          />
        </LabelStyle>
        <LabelStyle>
          Пароль:
          <InputStyle
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </LabelStyle>
        <ButtonStyle>Войти</ButtonStyle>
      </FormStyle>
    </ComponentStyle>
  );
};

export default Login;
