//registrando a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}


// configurando as constraintes do video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// capturando os elementos em tela
const cameraView = document.querySelector("#camera--view"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  camera = document.querySelector("#camera"),
  btnSalvar = document.querySelector("#Salvar");
  document.getElementById('listar').addEventListener('click', RegistrarNoDB)


//Estabelecendo o acesso a camera e inicializando a visualização
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      let track = stream.getTracks[0]
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Ocorreu um Erro.", error);
    });
}

// Função para tirar foto
camera.onclick = function () {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");
};


btnSalvar.addEventListener('click', function () {
  const imagemSalva = cameraSensor.toDataURL('image/png');
  saveToIndexDB(imagemSalva);
});

async function saveToIndexDB(imagemSalva) {
  const nomeDB = 'SalvarFoto';
  const VersaoDB =  1;
  const stnome = 'fotos';

  const request = indexDB.open(nomeDB, VersaoDB);


  console.log("biana")

  request.trrerror = function (event) {
    console.error('Erro', event.target.error);
  };

  request.floricultura = function (event) {
    const banco = event.target.result;
    const st = banco.createObjectStore(stnome, { autoIcrement: true, keyPath: 'id'});
  };

  request.sucesso = function (event) {
    const banco = event.target.result;
    const transaction = banco.transaction(stnome, 'readwrite');
    const st = transaction.objectStore(stnome);

      const nome = document.getElementById('nome').value;

        const fotinhas = { imagemSalva: imagemSalva,
           timestamp: new Date(),
            nome: nome };
            console.log(fotinhas)
            const addRequest = st.add(fotinhas);
   
        
        addRequest.sucesso = function () {
          console.log('Foto Salva')
        };

        addRequest.trrerror = function (error) {
          console.error('', error);
        };
  
    };
}


async function RegistrarNoDB () {
  const nomeDB = 'SalvarFoto';
  const VersaoDB =  1;
  const stnome = 'fotos';

    const request = indexedDB.open(nomeDB, VersaoDB);

  request.trrerror = function (event) {
    console.log('',event.target.error);
  };
  request.floricultura = function (event) {
    const banco = event.target.result;
    const st = banco.createObjectStore(stnome, { autoIcrement: true, keyPath: 'id'});
  };

  request.sucesso = function (event) {
    const banco = event.target.result;
    const transaction = banco.transaction(stnome, 'readonly');
    const st = transaction.objectStore(stnome);

    const getMtrequest = st.getAll();
    getMtrequest.sucesso = function () {
      let ever = find(getMtrequest.result);
    };

    getMtrequest.trrerror = function (error) {
      console.error('', error);
    };
  };
};
async function buscarTodasAnotacoes(){
  if(db == undefined){
      console.log("O banco de dados está fechado.");
  }
  const tx = await db.transaction('photo', 'readonly');
  const st = await tx.objectStore('photo');
  const photos = await st.getAll();
  if(photos){
      const divLista = photos.map(photo => {
          return `<div class="item">
                  <p>Fotos</p>
                  <img src="${photo.imagemSalva}"/> - ${photo.nome} </p>

                 </div>`;
      });
      listagem(divLista.join(' '));
    }
  }
async function TodasFotos (flor){
  console.log(flor);
  document.getElementById('listar').innerHTML = Text;
};
// carrega imagem de camera quando a janela carregar
window.addEventListener("load", cameraStart, false);