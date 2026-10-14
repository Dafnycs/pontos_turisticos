

const tripImage = document.getElementById("tripImage");
const tripName = document.getElementById("tripName");
const turiscBtn = document.getElementById("turiscBtn");
const busca = document.getElementById("busca");
const tripInput = document.getElementById("tripInput");
const tripArea = document.querySelector(".trip-area");
const API = "http://localhost:3000/api/turisticos";


async function buscarPontos(url){
  tripArea.classList.add("loading");
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Resposta da API:", data)
    if (data.status === "error"){
      tripName.textContent = data.message;
      tripImage.src = "";
      return;
    }
    tripImage.src = data.message;
   console.log("URL DA IMAGEM:", data.message);
    console.log("ELEMENTO HTML:", tripImage); //AJUDA DO GPT
    const partes = data.message.split("/")

    const ponto = partes[4]
    tripName.textContent =
      ponto.charAt(0).toUpperCase() + ponto.slice(1);

  } catch (erro){
    console.error(erro);
    tripName.textContent =
      " servidor offline - rode: node server.js"
    tripImage.src = "";

  } finally {
    tripArea.classList.remove("loading")
  }
}

function pontoAleatorio(){
  buscarPontos(`${API}/aleatorio`);
}
function buscarPorNome(){
  const ponto = tripInput.value.trim().toLowerCase();
  if (!ponto) {
    alert ("Digite um ponto turístico!")
    return;
  }
  buscarPontos(`${API}/${ponto}`)
}

turiscBtn.addEventListener("click", pontoAleatorio);
busca.addEventListener("click", buscarPorNome);
tripImage.addEventListener("click", pontoAleatorio);
tripInput.addEventListener("keypress", (event) =>{
  if (event.key === "Enter"){
    buscarPorNome();
  }
})
pontoAleatorio();
