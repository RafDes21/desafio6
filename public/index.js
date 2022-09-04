const socket = io.connect();

function render(data) {
  const html = data
    .map((elem, index) => {
      return `<div>
            <strong class="text-primary">${elem.author}</strong>
            <span style="color: brown;">${elem.time}</span><em class="text-success">${elem.text}</em> </div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}
function addMessage(e) {
  let dato = new Date();
  let time = `[${dato.toLocaleDateString()} ${dato.toLocaleTimeString()}]: `;
  const mensaje = {
    author: document.getElementById("email").value,
    text: document.getElementById("mensaje").value,
    time: time,
  };

  socket.emit("new-message", mensaje);
  return false;
}

socket.on("messages", function (data) {
  render(data);
});
