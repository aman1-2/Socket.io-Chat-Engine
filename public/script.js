var socket = io();

const msgList = document.getElementById("msg_list");
const msg = document.getElementById("msg");
const btn = document.getElementById("send_msg");
const user = document.getElementById("user");

btn.onclick = function generateMessage() {
    socket.emit("Send_Msg", {
        user: user,
        msg: msg.value
    });
}

socket.on("Rcvd_Msg",(data) => {
    let li = document.createElement('li');
    li.innerText = data.msg;
    msgList.appendChild(li);
});