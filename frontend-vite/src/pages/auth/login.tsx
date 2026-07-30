import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchApi } from "../../shared/api/fetchApi";
import { IoMdPerson } from "react-icons/io";
import { MdLockPerson } from "react-icons/md";
import { Button } from "@/shared/ui/button";

const ComponentStyle = styled.div`
  position: relative;
  background: url("/image/misc/bckgndAuth.jpg") center/cover no-repeat;
  height: 100vh;
  /* display: flex; */
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
`;

const FormWrapperStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #b8860b;
  border-radius: 16px;
  animation: glowPulse 3s ease-in-out infinite;

  &::before {
    content: "";
    position: absolute;
    border-radius: 16px;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(
      135deg,
      #b8860b,
      #8b6914,
      #4a3c0a,
      #6b4e0a,
      #b8860b
    );
    background-size: 300% 300%;
    animation: wornGoldBorder 5s ease infinite;
    z-index: -1;
    filter: blur(1.5px);
  }

  &::after {
    content: "";
    position: absolute;
    border-radius: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(12px);
    background-color: rgba(15, 15, 18, 0.88);
    border: 1px solid rgba(184, 134, 11, 0.25);
    z-index: -1;
  }

  @keyframes wornGoldBorder {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes glowPulse {
    0%,
    100% {
      box-shadow:
        0 0 8px rgba(184, 134, 11, 0.3),
        0 0 20px rgba(80, 60, 10, 0.2),
        inset 0 0 8px rgba(184, 134, 11, 0.1);
    }
    50% {
      box-shadow:
        0 0 18px rgba(184, 134, 11, 0.6),
        0 0 35px rgba(80, 60, 10, 0.4),
        inset 0 0 18px rgba(184, 134, 11, 0.25);
    }
  }
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 100px;
  min-width: 250px;
`;

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
  color: #bebebe;
  font-size: 30px;
`;

const InputContainerStyle = styled.div`
  display: inline-flex;
  align-items: center;
`;

const InputStyle = styled.input`
  background-color: #eaeaea;
  color: black;
  border-radius: 5px;
  padding: 5px 5px 5px 40px;
  font-size: 18px;
  letter-spacing: 0.2rem;
  width: 100%;
  outline: none;
  border: none;
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
      <FormWrapperStyle>
        <FormStyle onSubmit={handleSubmit}>
          {error && <PStyle>{error}</PStyle>}
          <LabelStyle>
            Логин:
            <InputContainerStyle>
              <IoMdPerson
                style={{
                  color: "#7a7a7a",
                  borderRight: "1px solid #000",
                  position: "absolute",
                  padding: "2px",
                }}
                size={32}
              />
              <InputStyle
                type="text"
                onChange={(e: any) => setUsername(e.target.value)}
                placeholder="Введите логин"
              />
            </InputContainerStyle>
          </LabelStyle>
          <LabelStyle>
            Пароль:
            <InputContainerStyle>
              <MdLockPerson
                style={{
                  color: "#7a7a7a",
                  borderRight: "1px solid #000",
                  position: "absolute",
                  padding: "2px",
                }}
                size={32}
              />
              <InputStyle
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </InputContainerStyle>
          </LabelStyle>
          <Button type="system" size="xxl">
            Войти
          </Button>
        </FormStyle>
      </FormWrapperStyle>
    </ComponentStyle>
  );
};

export default Login;
