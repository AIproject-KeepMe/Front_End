import { React, useState, useEffect } from 'react';


function Page2() {
  const [websocket, setWebsocket] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    if (!websocket) {
      return;
    }

    const onMessage = (msg) => {
      const data = msg.data;
      const newData = JSON.parse(data);
      const newMessages = [...messages, newData];
      console.log("newMessages", newMessages)

      setMessages(newMessages);
    };

    websocket.onmessage = onMessage;

    return () => {
      // websocket.close();
    };
  }, [websocket, messages]);

  const start = () => {
    const newWebSocket = new WebSocket('ws://10.125.121.171:8081/ws/health');
    console.log("start");
    setWebsocket(newWebSocket);
  };


  return (
    <div>
      <button type="button" onClick={start}>
        시작
      </button>
      <h3>마지막 데이터{messages.length > 0 && (
        <div>
          <p>
            {`이름 ${messages[messages.length - 1].name},
            심박수 ${messages[messages.length - 1].heartRate},
            체온 ${messages[messages.length - 1].temperature},
           동기화 시간 ${messages[messages.length - 1].recordTime}`}
          </p>
        </div>
      )}</h3>
      <div className="col">
        {messages.map((a, index) => (
          <div key={index}>
            <p>{`${index} 이름: ${a.name} 상태:${a.status} 체온: ${a.temperature} 심박수: ${a.heartRate}  산호포화도 :${a.o2} 동기화시간: ${a.recordTime}`}</p>
          </div>
        ))}
      </div>
    </div >
  );
}

export default Page2;