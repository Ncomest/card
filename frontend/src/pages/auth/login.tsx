import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { site } from "../../site_state";

const Component = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b0b0b;
`;

const Form = styled.form`
  border: 1px solid #bebebe;
  border-radius: 10px;
  padding: 100px 50px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #bebebe;
  font-size: 20px;
`;

const Input = styled.input`
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

const Button = styled.button`
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

  const apiUrl = site;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    console.log({ username, password });

    try {
      const response = await fetch(apiUrl + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        // const data = await response.json();
        // localStorage.setItem("token", data.token);
        // console.log(data, "data");
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Неверный логин или пароль");
      }
    } catch (error) {
      setError("Произошла ошибка, попробуйте снова");
    }
  };

  return (
    <Component>
      <Form onSubmit={handleSubmit}>
        <Label>
          Логин:
          <Input
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
            placeholder="Введите логин"
          />
        </Label>
        <Label>
          Пароль:
          <Input
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </Label>
        <Button>Войти</Button>
      </Form>
    </Component>
  );
};

export default Login;
