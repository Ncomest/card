import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchApi } from "../../helper/fetchApi";
import { IoMdPerson } from "react-icons/io";
import { MdLockPerson } from "react-icons/md";

const ComponentStyle = styled.div`
  position: relative;
  background: url("/image/misc/bckgndAuth.jpg") center/cover no-repeat;
  height: 100vh;
  display: flex;
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
  border: 2px solid #bebebe;
  border-radius: 12px;

  &::before {
    content: "";
    position: absolute;
    border-radius: 12px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    background-color: rgba(87, 86, 86, 0.3);
    z-index: -1;
  }
`;

const FormStyle = styled.form`
  position: relative;
  border-radius: 12px;
  padding: 100px 50px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
`;

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
  color: #bebebe;
  font-size: 20px;
`;

const InputContainerStyle = styled.div`
  display: inline-flex;
  align-items: center;
`;

const InputStyle = styled.input`
  background-color: #eaeaea;
  border-radius: 0 5px 5px 0;
  padding: 5px 10px;
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

const ButtonStyle = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  font-weight: 800px;
  position: relative;
  background-color: #eaeaea;

  & span {
    transition: all 0.3s;
  }

  &:hover {
    background-color: #c6c6c6;
    letter-spacing: 0.4rem;
  }
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
                  color: "#eaeaea",
                  border: "2px solid #eaeaea",
                  height: "100%",
                  boxSizing: "content-box",
                  borderRadius: "5px 0 0 5px",
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
                  color: "#eaeaea",
                  border: "2px solid #eaeaea",
                  borderRadius: "5px 0 0 5px",
                  height: "100%",
                  boxSizing: "content-box",
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
          <ButtonStyle>
            <span>Войти</span>
          </ButtonStyle>
          <div style={{ display: "flex", gap: "10px", color: "#bebebe" }}>
            <div>Логин:</div>
            <div>Viewer</div>
            <div>Пароль:</div>
            <div>viewer</div>
          </div>
        </FormStyle>
      </FormWrapperStyle>
    </ComponentStyle>
  );
};

export default Login;
