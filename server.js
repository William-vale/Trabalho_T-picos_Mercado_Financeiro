const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((req, res) => {

    let arquivo = req.url === "/"
        ? "index.html"
        : req.url;

    let caminho = path.join(__dirname, arquivo);

    let extensao =
        path.extname(caminho);

    let tipo = "text/html";

    if (extensao === ".css") {
        tipo = "text/css";
    }

    if (extensao === ".js") {
        tipo = "application/javascript";
    }

    fs.readFile(caminho, (erro, conteudo) => {

        if (erro) {
            res.writeHead(404);
            return res.end("Arquivo nao encontrado");
        }

        res.writeHead(200, {
            "Content-Type": tipo
        });

        res.end(conteudo);
    });

}).listen(3000, () => {

    console.log("Servidor iniciado");
    console.log("http://localhost:3000");

});
``



