//Função querySelector
const qS = (el) => document.querySelector(el);

//Variáveis de controle de interface
let voteFor = qS("#upside--text span"); //Selecionando o texto "Seu voto para".
let office = qS("#upside--office span"); // Selecionando o cargo do candidato.
let voteBox = qS("#upside--number-container"); //Selecionando o local de números.
let information = qS("#upside--information"); //Selecionando as informações dos candidatos.
let candidatesImg = qS("#upside--right"); // Selecionando imagem dos candidatos.
let instructions = qS("#part-down"); //Selecionando instruções da tela da parte de baixo.

//Variáveis de ambiente
//Variável para saber qual etapa está
let currentStage = 0;

//Variável para saber qual é o número que está sendo digitado
let typedNumber = "";

//Variável para habilitar botão branco
let white = false;

//Funções

//Função para começar as etapas
const startStage = () => {
  let stage = etapas[currentStage]; //Estágio inicial

  //Criando o número de caixas correspondente ao número dos candidatos
  let numberHtml = "";
  typedNumber = "";
  white = false;
  for (let i = 0; i < stage.numbers; i++) {
    //Condição
    i === 0
      ? //Box com a class pisca sendo criada
        (numberHtml += '<div id="number-item" class="pisca"></div>')
      : //Box sem a class pisca
        (numberHtml += '<div id="number-item"></div>');
  }

  //Removendo itens da tela
  voteFor.style.display = "none";
  office.innerHTML = stage.title; //Adicionando cargo
  voteBox.innerHTML = numberHtml; //Preenchendo com a quantidade de caixas certa
  information.innerHTML = "";
  candidatesImg.innerHTML = "";
  instructions.style.display = "none";
};

//Função para atualizar a interface
const updateInterface = () => {
  let stage = etapas[currentStage]; //Pegando a etapa atual novamente

  //Variável que vai filtrar o número de cada candidato
  let candidato = stage.candidates.filter((item) => {
    if (item.number === typedNumber) {
      // se o número digitado pelo eleitor dor igual ao número do candidato ele retorna true e um array com o candidato
      return true;
    } else {
      //Caso não for igual ao número de nenhum candidato ele retornará false e um array vazio
      return false;
    }
  });

  if (candidato.length > 0) {
    candidato = candidato[0];
    //adicionando os itens na tela
    voteFor.style.display = "block"; //Voto para. Aparece na tela
    information.innerHTML = `Nome: ${candidato.name} <br> Partido: ${candidato.party}<br>`; // Informações do candidato aparecem na tela
    instructions.style.display = "block"; // Instruções de botões aparece na tela

    //Aparecer na tela a foto do candidato
    let photosHtml = "";
    for (let i in candidato.photo) {
      if (candidato.photo[i].small) {
        photosHtml += `<div id="upside--right-image" class="small"><img src="${candidato.photo[i].url}" alt="" />${candidato.photo[i].legend}</div>`;
      } else {
        photosHtml += `<div id="upside--right-image"><img src="${candidato.photo[i].url}" alt="" />${candidato.photo[i].legend}</div>`;
      }
    }

    candidatesImg.innerHTML = photosHtml;
  } else {
    voteFor.style.display = "block";
    information.innerHTML = `<div class="alert--big pisca">VOTO NULO</div>`; // Voto NULO aparece na tela
    instructions.style.display = "block"; // Instruções de botões aparece na tela
    candidatesImg.innerHTML = "";
  }
};

//Função para os botões do teclado
const clickBtn = (n) => {
  let numFlashes = qS(".pisca"); //Procurando um box que estiver piscando

  if (numFlashes != null) {
    numFlashes.innerHTML = n;
    typedNumber = `${typedNumber}${n}`;

    numFlashes.classList.remove("pisca"); //Tirando a class pisca quando um número é digitado

    //Condição
    numFlashes.nextElementSibling !== null
      ? //Entrando no próximo box e adicionando a class pisca
        numFlashes.nextElementSibling.classList.add("pisca")
      : updateInterface();
  }
};

//Função para o botão branco
const whiteBtn = () => {
  if (typedNumber === "") {
    white = true;
    voteFor.style.display = "block"; //Mostrando "SEU VOTO PARA"
    instructions.style.display = "block"; // Mostrando as instruções
    voteBox.innerHTML = ""; // Tirando as box de números
    information.innerHTML = `<div class="alert--big pisca" style='font-size:40px'>VOTO EM BRANCO</div>`; // Digitando na tela
  } else {
    alert(
      "Para votar em branco, aperte no botão corrigir e depois em BRANCO novamente"
    );
  }
};

//Função para o botão corrigir
const correctBtn = () => {
  startStage();
};

//Função para o botão confirma
const confirmBtn = () => {
  let stage = etapas[currentStage];

  let voteConfirmed = false;

  if (white === true) {
    voteConfirmed = true;
    console.log("Confirmando voto em branco");
  } else if (typedNumber.length === stage.numbers) {
    voteConfirmed = true;
    console.log("confirmando como" + typedNumber);
  }

  if (voteConfirmed) {
    currentStage++;
    if (etapas[currentStage] !== undefined) {
      startStage();
    } else {
      console.log("FIM!");
    }
  }
};

startStage();
