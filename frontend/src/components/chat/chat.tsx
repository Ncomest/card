import React, { useState, useRef } from "react";
import styled from "styled-components";
import DiceRoll from "../dice_roll/dice_roll";
import { site } from "../../site_state";

const ContainerStyle = styled.div`
  flex: 0;
  margin: 5px;
  z-index: 1;
`;

const ComponentStyle = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 3px solid #bebebe;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  scrollbar-color: #bebebe #000;
  scrollbar-width: thin;
  /* display: ${({ hidden }) => (hidden ? "none" : "block")}; */

  @media (max-width: 1024px) {
    height: 200px;
  }
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const FormStyle = styled.form`
  display: flex;
  gap: 5px;
`;

const InputStyle = styled.input`
  flex: 1;
  color: #bebebe;
  padding: 5px 10px;
  background: rgba(77, 77, 77, 0.584);
`;

const ButtonStyle = styled.button`
  border: 1px solid;
  background-color: #242424ab;
  color: #bebebe;
  padding: 5px 10px;
  &:hover {
    background-color: #626262c3;
    color: white;
  }
  &:active {
    background-color: #526941;
  }
`;

const MessagesStyle = styled.div``;

const MessageStyle = styled.div`
  padding: 10px;
  border: 1px solid #bebebe;
  margin: 5px 0;
`;

interface IMessage {
  event: string;
  message: string;
  username: string;
  id: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [value, setValue] = useState("");
  const socket = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  const connect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.current = new WebSocket(site + "/websocket/");

    socket.current.onopen = () => {
      setConnected(true);
      const message = { event: "connection", username, id: Date.now() };
      socket.current?.send(JSON.stringify(message));
      console.log("Подключение установлено");
    };

    socket.current.onmessage = (event: MessageEvent) => {
      const message: IMessage = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => {
      console.log("socket closed");
      setConnected(false);
    };

    socket.current.onerror = () => {
      console.log("Socket closed due to an error");
    };
  };

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = {
      event: "message",
      message: value,
      username,
      id: Date.now(),
    };
    socket.current?.send(JSON.stringify(message));
    setValue("");
  };

  return (
    <ContainerStyle>
      <DiceRoll />
      <ComponentStyle>
        {!connected ? (
          <FormStyle>
            <InputStyle
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Введите ваше имя"
            />
            <ButtonStyle onClick={connect}>Войти</ButtonStyle>
          </FormStyle>
        ) : (
          <div>
            <MessagesStyle>
              {messages
                // .sort((a:any, b:any) => b - a)
                .slice()
                .reverse()
                .map((msg) => (
                  <MessageStyle key={msg.id}>
                    {msg.event === "connection" ? (
                      <div style={{ background: "#bebebe" }}>
                        Пользователь {msg.username} подключился
                      </div>
                    ) : (
                      <div style={{ color: "#bebebe" }}>
                        {msg.username}: {msg.message}
                      </div>
                    )}
                  </MessageStyle>
                ))}
            </MessagesStyle>
            <FormStyle>
              <InputStyle
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введите сообщение"
              />
              <ButtonStyle onClick={sendMessage}>Отправить</ButtonStyle>
            </FormStyle>
          </div>
        )}
      </ComponentStyle>
    </ContainerStyle>
  );
};

export default Chat;
