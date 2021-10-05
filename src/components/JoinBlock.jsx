import React from 'react';
import axios from 'axios';

function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
    const obj = {
        roomId,
        userName,
    };

    const onE = () => {


    }

  const onEnter = async () => {

      let url = new URL(window.location.href);
      let roomId = url.searchParams.get('roomId') ; // Номер команты берётся из URL
      console.log('Начало ' + url.searchParams.get('roomId'))
      let url_origin = window.location.origin;

      if (roomId=='' || roomId == null) {
          console.log('Генерация ')
          roomId = Math.floor(Math.random() * (9999 + 1)) //Генерация нового ID комнаты, в случае, если его нет в ссылке

          console.log(roomId)

      };


      setRoomId(String(roomId));

      console.log(window.location)
      window.history.replaceState(null, null, url_origin + '?'+'roomId='+String(roomId)); //Обновление URL

      console.log(url.searchParams.get('roomId'))



    if (!userName) {
      return alert('Не введено имя пользователя');
    }
    setLoading(true);


    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="join-block">

      <input
        type="text"
        placeholder="User Name"
        id = "UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)
        }
      />
      <button disabled={isLoading} onClick={onEnter} className="btn btn-success">
        {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
      </button>
    </div>
  );

}

export default JoinBlock;
