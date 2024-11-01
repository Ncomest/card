import React, { useState, useRef } from "react";
import styled from "styled-components";
import { StyledButton } from "../../style/global.style";

const Component = styled.div`
 position: fixed;
 bottom: 36px;
 right: -8px;
 width: 400px;
 height: 300px;
 margin: 20px;
 padding: 20px;
 border-radius: 5px;
 border: 3px solid #bebebe;
 background-color: rgba(0, 0, 0, 0.5);
 overflow-y: scroll;
 scrollbar-color: #bebebe #000;
 scrollbar-width: thin;
`;

const Form = styled.form``;

const Input = styled.input`
 color: #bebebe;
 padding: 5px 10px;
 margin-right: 5px;
 background: rgba(77, 77, 77, 0.584);
`;

const BtnShow = styled(StyledButton)`
 position: fixed;
 bottom: 0;
 right: 0;
`;

const Button = styled.button`
 border: 1px solid;
 background-color: #4f4f4f;
 color: #bebebe;
 padding: 5px 10px;
 &:hover {
  background-color: #9a7f7f;
  color: white;
 }
 &:active {
  background-color: #5e4545;
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
 const [messages, setMessages] = useState<any>([]);
 const [value, setValue] = useState("");
 const socket = useRef<WebSocket | null>(null);
 const [connected, setConnected] = useState(false);
 const [username, setUsername] = useState("");
 const [chatHide, setChatHide] = useState(false);

 const handleChatHide = (): void => {
  setChatHide(!chatHide);
 };

 const connect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();

  socket.current = new WebSocket("ws://87.228.10.233/websocket/");

  socket.current.onopen = () => {
   setConnected(true);

   const message = {
    event: "connection",
    username,
    id: Date.now(),
   };

   socket.current?.send(JSON.stringify(message));
   console.log("Подключение установлено");
  };

  socket.current.onmessage = (event: MessageEvent) => {
   console.log(event.data, "event data");
   const message: IMessage = JSON.parse(event.data);
   setMessages((prev: string) => [message, ...prev]);
  };

  socket.current.onclose = () => {
   console.log(`socket closed`);
   //  setConnected(false);
  };

  socket.current.onerror = () => {
   console.log(`socket closed an error`);
   //  setConnected(false);
  };
 };

 const sendMessage = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
 ) => {
  event.preventDefault();

  const message = {
   event: "message",
   message: value,
   username,
   id: Date.now(),
  };

  socket.current?.send(JSON.stringify(message));
  setValue("");
 };

 if (!connected) {
  return (
   <Component>
    {chatHide ? (
     <BtnShow onClick={handleChatHide}>
      <span>Показать</span>
     </BtnShow>
    ) : (
     <BtnShow onClick={handleChatHide}>
      <span>Скрыть</span>
     </BtnShow>
    )}
    <Form>
     <Input
      value={username}
      onChange={(event) => setUsername(event.target.value)}
      type="text"
      placeholder="Введите ваше имя"
     />
     <Button onClick={connect}>Войти</Button>
    </Form>
   </Component>
  );
 }

 return (
  <Component>
   <div>
    {chatHide ? (
     <BtnShow onClick={handleChatHide}>
      <span>Показать</span>
     </BtnShow>
    ) : (
     <BtnShow onClick={handleChatHide}>
      <span>Скрыть</span>
     </BtnShow>
    )}

    <Form>
     <Input
      type="text"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
       setValue(e.target.value)
      }
     />
     <Button onClick={sendMessage}>Отправить</Button>
    </Form>
    <Messages>
     {messages.map((msg: IMessage) => (
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
   </div>
  </Component>
 );
};

export default Chat;
