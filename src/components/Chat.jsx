import React from 'react';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    let dat = new Date();
    let Hours =  String(dat.getHours());
    let Minutes =  String(dat.getMinutes());

    userName = userName + " " + Hours + ':' + Minutes; // Формируем строку с подписью к сообщению

    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,

    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue('');
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999); //Скролим вниз, чтобы видеть актуальные сообщения
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        <p>Ссылка для присоедениения: <b>{window.location.href}</b></p>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          )
          )
          }
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{message.userName }</span>

              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button onClick={onSendMessage} type="button" className="btn ">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
