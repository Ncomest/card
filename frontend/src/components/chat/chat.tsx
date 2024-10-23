import { useState, useRef } from "react";
import styled from "styled-components";
import { site } from "../../site_state";

const Component = styled.div`
 height: 300px;
 margin: 20px;
 padding: 20px;
 border-radius: 5px;
 border: 3px solid pink;
 background-color: wheat;
 overflow-y: scroll;
 scrollbar-width: 5px;
`;

const Form = styled.form``;

const Input = styled.input`
 padding: 5px 10px;
 margin-right: 5px;
`;

const Button = styled.button`
 border: 1px solid;
 background-color: transparent;
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

const Message = styled.p`
 padding: 10px;
 border: 1px solid;
 margin: 5px 0;
`;

const Chat = () => {
 const [messages, setMessages] = useState<any>([]);
 const [value, setValue] = useState("");
 const socket = useRef<any>();
 const [connected, setConnected] = useState(false);
 const [username, setUsername] = useState("");




 function connect(e: any) {
  e.preventDefault();
  socket.current = new WebSocket("ws://87.228.10.233:4001");

  socket.current.onopen = () => {
   setConnected(true);
   const message = {
    event: "connection",
    username,
    id: Date.now(),
   };
   socket.current.send(JSON.stringify(message));
   console.log("подключание установлено");
  };
  socket.current.onmessage = (event: any) => {
   const message = JSON.parse(event.data);
   setMessages((prev: any) => [message, ...prev]);
  };
  socket.current.onclose = () => {
   console.log(`socket closed`);
  };
  socket.current.onerror = () => {
   console.log(`socket closed an error`);
  };
 }

 const sendMessage = (e: any) => {
  e.preventDefault();

  const message = {
   event: "message",
   message: value,
   username,
   id: Date.now(),
  };

  socket.current.send(JSON.stringify(message));
  setValue("");
 };

 if (!connected) {
  return (
   <Component>
    <Form>
     <Input
      value={username}
      onChange={(e) => setUsername(e.target.value)}
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
    <Form>
     <Input
      type="text"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
       setValue(e.target.value)
      }
     />
     <Button onClick={sendMessage}>send</Button>
    </Form>
    <Messages>
     {messages.map((msg: any) => (
      <Message key={msg.id}>
       {msg.event === "connection" ? (
        <div style={{ background: "green" }}>
         Пользователь {msg.username} подключился
        </div>
       ) : (
        <div>
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
