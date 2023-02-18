const sendBtn = document.querySelector('#send');
const geoBtn = document.querySelector('#geo');
const textInput = document.querySelector('#inpt');
let chat = document.querySelector('.chat');

const ws = new WebSocket('wss://echo-ws-service.herokuapp.com');

function newMgs (content, inMsg) {
    let msg = document.createElement('div');
    msg.className = 'message';

    msg.innerHTML = content;
    if (inMsg) {
        msg.classList.add('in');
    } else {
        msg.classList.add('out');
    }
    chat.append(msg);
    chat.scrollTop = chat.scrollHeight;
}

function sendMsg() {
    let text = textInput.value;
    if (text.trim()) {
        newMgs(text, false);
    }
    textInput.value = null;
    ws.send(text);
}

function getGeo() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { coords } = pos;
            newMgs(`<a href="https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}" target="_blank" style="color:white">Геолокация</a>`, false);
            ws.send(`${pos}`);
        }, () => {
            newMgs('Не удается обработать данные геолокации. Возможно, вы не дали браузеру разрешение на отслеживание вашего местоположения', false);
        }, {enableHighAccuracy: true});
    } else {
        newMgs('Ваш браузер не поддерживает отслеживание местоположения', false);
    }
}

sendBtn.addEventListener('click', sendMsg);
geoBtn.addEventListener('click', getGeo);
document.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        sendMsg();
    }
})

ws.onopen = () => {
    console.log('Connection Established');
}

ws.onmessage = (event) => {
    if (event.data.trim() && !(event.data === '[object GeolocationPosition]')) {
        newMgs(event.data, true);
    }
};


