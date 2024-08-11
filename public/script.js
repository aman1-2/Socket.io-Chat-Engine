var socket = io();

const msgList = document.getElementById("msg_list");
const msg = document.getElementById("msg");
const btn = document.getElementById("send_msg");

btn.onclick = function generateMessage() {
    socket.emit("Send_Msg", {
        msg: msg.value
    });
}

socket.on("Rcvd_Msg",(data) => {
    let li = document.createElement('li');
    li.innerText = data.msg;
    msgList.appendChild(li);
});