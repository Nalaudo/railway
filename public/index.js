const socket = io();

socket.on("arr-producto", (data) => {
    const html = data.reduce(
        (html, item) => '<tr><td style="width: 15%">' + item.title + '</td><td style="width: 15%">$' + item.price + '</td><td style="width: 15%"><img style="max-height: 5vh" src="' + item.thumbnail + '" /></td></tr>' + html, ""
    );
    document.getElementById("table-products").innerHTML = html;
});

socket.on("arr-chat", (data) => {
    let html = "Chat"
    Object.keys(data).forEach(key => {
        const item = data[key]
        html += '<p style="padding: 16px 0px; margin: 0px"><span style="font-weight: bold; color: blue">' + item.author.id + '</span><span style="color: brown"> ' + item.author.date + ': </span><span style="font-style: italic; color: green" >' + item.text + '</span><img  style="border-radius: 50%; max-height: 5vh" src="' + item.author.avatar + '" /></p>'
    });
    document.getElementById("div-msg").innerHTML = html;
});

function agregar() {
    const title = document.getElementById("in-title").value;
    const rawPrice = document.getElementById("in-price").value;
    const thumbnail = document.getElementById("in-thumbnail").value;
    const price = +rawPrice
    console.log(price)
    console.log({ title, price, thumbnail })
    socket.emit("data-productos", { title, price, thumbnail });
    return false;
}

function enviar() {
    try {
        const id = document.getElementById("in-id").value;
        const nombre = document.getElementById("in-nombre").value;
        const apellido = document.getElementById("in-apellido").value;
        const edad = document.getElementById("in-edad").value;
        const alias = document.getElementById("in-alias").value;
        const avatar = document.getElementById("in-avatar").value;
        const dateNow = new Date()
        const [day, month, year] = [dateNow.getDate(), dateNow.getMonth() + 1, dateNow.getFullYear()];
        const [hour, minutes, seconds] = [dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds()];
        const date = day + '/' + month + '/' + year + ', ' + hour + ':' + minutes + ':' + seconds
        const text = document.getElementById("in-text").value;
        socket.emit("data-chat", { author: { id, nombre, apellido, edad, alias, avatar, date }, text });
        return false;
    } catch (error) {
        console.log(error)
        throw error
    }

}