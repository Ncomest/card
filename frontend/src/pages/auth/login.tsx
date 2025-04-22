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

const ButtonStyle = styled.button`
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
  rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
  #D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;


&:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, 
  rgba(45, 35, 66, 0.4) 0 2px 4px, 
  rgba(45, 35, 66, 0.3) 0 7px 13px -3px, 
  #D6D6E7 0 -3px 0 inset;
}

&:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, 
  rgba(45, 35, 66, 0.3) 0 7px 13px -3px, 
  #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

&:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
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
                  color: "#7a7a7a",
                  borderRight: "1px solid #000",
                  position: "absolute",
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
          {/* <div style={{ display: "flex", gap: "10px", color: "#bebebe" }}>
            <div>Логин:</div>
            <div>Viewer</div>
            <div>Пароль:</div>
            <div>viewer</div>
          </div> */}
        </FormStyle>
      </FormWrapperStyle>
    </ComponentStyle>
  );
};

export default Login;
