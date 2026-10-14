
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const pontos = require("./data/trip.json");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(
  "/fotos",
  express.static(
    path.join(__dirname, "data/fotos"),
  ),
);

function sortear(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

app.get("/api/turisticos/aleatorio", (req, res) => {
  const PontosBuscarTu = Object.values(pontos).flat();
  const item = sortear(PontosBuscarTu);
  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${item}`,
  });
});

app.get("/api/turisticos/:lugar", (req, res) => {
  const lugar = req.params.lugar.toLocaleLowerCase();
  if (!pontos[lugar]) {
    res.status(404).json({
      status: "error",
      message: `Ponto turístico "${lugar}" não encontrado`,
    });
    return;
  }
  const item = sortear(pontos[lugar]);
  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${item}`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📂 Coloque as fotos manualmente em: data/fotos/`);
});
