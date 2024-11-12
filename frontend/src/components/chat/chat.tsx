import React, { useState, useRef } from "react";
import styled from "styled-components";
import DiceRoll from "../dice_roll/dice_roll";

const Container = styled.div`
  flex: 0;
  margin: 5px;
  z-index: 1;
`;

const Component = styled.div`
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

const Form = styled.form`
  display: flex;
  gap: 5px;
`;

const Input = styled.input`
  flex: 1;
  color: #bebebe;
  padding: 5px 10px;
  background: rgba(77, 77, 77, 0.584);
`;

// const BtnShow = styled(StyledButton)`
//  position: absolute;
//  top: 0;
//  left: calc(100% - 160px);
//  width: 160px;
//  margin: 5px 0;
//  z-index: 1;
// `;

const Button = styled.button`
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

const Messages = styled.div``;

const Message = styled.div`
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
  // const [chatHide, setChatHide] = useState(false);

  //  const handleChatHide = () => setChatHide(!chatHide);

  const connect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.current = new WebSocket("ws://87.228.10.233/websocket/");

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
    <Container>
      <DiceRoll />
      {/* <BtnShow onClick={handleChatHide}> */}
      {/* <span>{chatHide ? "Показать" : "Скрыть"}</span> */}
      {/* </BtnShow> */}
      <Component
      // hidden={chatHide}
      >
        {!connected ? (
          <Form>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Введите ваше имя"
            />
            <Button onClick={connect}>Войти</Button>
          </Form>
        ) : (
          <div>
            <Messages>
              {messages
                // .sort((a:any, b:any) => b - a)
                .slice()
                .reverse()
                .map((msg) => (
                  <Message key={msg.id}>
                    {msg.event === "connection" ? (
                      <div style={{ background: "#bebebe" }}>
                        Пользователь {msg.username} подключился
                      </div>
                    ) : (
                      <div style={{ color: "#bebebe" }}>
                        {msg.username}: {msg.message}
                      </div>
                    )}
                  </Message>
                ))}
            </Messages>
            <Form>
              <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введите сообщение"
              />
              <Button onClick={sendMessage}>Отправить</Button>
            </Form>
          </div>
        )}
      </Component>
    </Container>
  );
};

export default Chat;
