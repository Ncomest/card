import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WDiceRoll } from "@/widgets/w-dice_roll";
import { subscribeWs, sendWs } from "@/shared/api";

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
  background-color: var(--secondary-color);
  overflow-y: scroll;
  scrollbar-color: #bebebe #000;
  scrollbar-width: thin;

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

type TMessage = {
  event: string;
  message: string;
  username: string;
  id: number;
};

const Chat = () => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [value, setValue] = useState("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribeMessage = subscribeWs<TMessage>("message", (message) => {
      setMessages((prev) => [message, ...prev]);
    });

    const unsubscribeConnection = subscribeWs<TMessage>(
      "connection",
      (message) => {
        setMessages((prev) => [message, ...prev]);
      },
    );

    return () => {
      unsubscribeMessage();
      unsubscribeConnection();
    };
  }, []);

  const connect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setConnected(true);
    const message: TMessage = {
      event: "connection",
      username,
      id: Date.now(),
      message: "",
    };
    sendWs(message);
  };

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message: TMessage = {
      event: "message",
      message: value,
      username,
      id: Date.now(),
    };
    sendWs(message);
    setValue("");
  };

  return (
    <ContainerStyle>
      <WDiceRoll />
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
