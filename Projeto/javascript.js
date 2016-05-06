var myVar=0;
function toggleFooter(id) { 
  if(document.getElementById(id).style.height == "4.5%") {
    document.getElementById("reticencias").src="downarrow.png";
    document.getElementById(id).style.height = "12.5%";
    myVar = setTimeout(auxiliar,5000);
  }

  else {
    document.getElementById("reticencias").src="uparrow.png";
    document.getElementById(id).style.height = "4.5%";
    clearTimeout(myVar);
  }
}

function auxiliar() {
  toggleFooter("rodape");
}

function changeDiv(id1,id2)
{
   d1 = document.getElementById(id1);
   d2 = document.getElementById(id2);
   if( id1 == "bebidas" )
   {
      d2.style.display = "none";
      d1.style.display = "block";
      changeText(id1);
   }
   else
   {
      d1.style.display = "block";
      d2.style.display = "none";
      changeText(id1);
   }
}


function changeText(id) {
	if(id == "bebidas") {
		document.getElementById('beb').style.background = "#006df0";
    document.getElementById('com').style.background = "#333";
	}
	else {
		document.getElementById('com').style.background = "#006df0";
    document.getElementById('beb').style.background = "#333";
	}
}

var valor = 0;
var d = document;
var lista_pro = []; /*guarda os pedidos atuais*/
function addItem(idTabela,pedido,preço) {
  lista_pro.push(pedido);
  var newRow = d.createElement('tr');
  newRow.insertCell(0).innerHTML = 1;
  newRow.insertCell(1).innerHTML = pedido;
  newRow.insertCell(2).innerHTML = 'X';
  d.getElementById(idTabela).appendChild(newRow);
  valor += parseFloat(preço);
  total('header_produtos1', valor);
  return false;  
}


function deleteList(idTabela) {
  var tab = document.getElementById(idTabela);
  var row_numb = tab.rows.length; 
  valor = 0 ;
  sessionStorage.setItem('valor_prod',0);
  total('header_produtos1', valor); 
  for ( var i = 0; i < row_numb; ) {
    tab.deleteRow(i);
  } 

}

/*divs dos produtos a funcionar com procura*/
function Search(id) { 
  var options = {
    valueNames: [ 'name', 'price', 'description' , 'artist']
  };
  if (id == "bebidas") {
    var userList = new List('bebidas', options);
  }
  else {
    var userList = new List('comida', options);
  }
}

/*divs dos produtos a funcionar com procura*/

function confirmationMsg(idTabela) {
  if(sessionStorage.getItem("num_pedidos") != null && sessionStorage.getItem("num_pedidos") != "") {
    var num = parseInt(sessionStorage.getItem("num_pedidos")) + lista_pro.length;
    sessionStorage.setItem("num_pedidos", num);
    var int = Math.floor(num/5);
    if(sessionStorage.getItem("inteiro") < int) {
      var inteiro = int + 1;
      alert("Agora os seus likes valem por "+inteiro);
    } 
    sessionStorage.setItem("inteiro", int);
  }
  else {
    sessionStorage.setItem("num_pedidos", lista_pro.length);
    var int = Math.floor(lista_pro.length/5);
    if(sessionStorage.getItem("inteiro") == null && int >= 1) {
      var inteiro = int + 1;
      alert("Agora os seus likes valem por "+inteiro);
    }
    sessionStorage.setItem("inteiro", int);
  }
  
  var tab = document.getElementById(idTabela);
  var row_numb = tab.rows.length;
  if (row_numb > 0) {
    alert('Pedido efetuado com sucesso!');
    location.href="historico.html";
    storeArray();
    deleteList(idTabela);
  }
}

function deleteMsg(idTabela) {
  var tab = document.getElementById(idTabela);
  var row_numb = tab.rows.length;
  if (row_numb > 0) {
    if (confirm('Tem a certeza que deseja eliminar o pedido?')) {
      emptyArray();
      deleteList(idTabela);
    }  
  } 
}

function emptyArray() {
  while(lista_pro.length > 0) {
    lista_pro.pop();
  }
}

var cnt = 0;
var lista_pro_t;
function storeArray() {
  var aux = sessionStorage.getItem('lista_hist');
  if(aux != null) {
    list = JSON.parse(aux);
    lista_pro_t = list.concat(lista_pro);
    sessionStorage.setItem(cnt,  JSON.stringify(lista_pro));
    sessionStorage.setItem("lista_hist",  JSON.stringify(lista_pro_t));
    emptyArray();  
  }
  else {
    lista_pro_t = lista_pro;
    sessionStorage.setItem(cnt,  JSON.stringify(lista_pro));
    sessionStorage.setItem("lista_hist",  JSON.stringify(lista_pro_t));
    emptyArray();
  }
}

function getArray() {
  var storedData = sessionStorage.getItem(cnt);
  if (storedData) {
    list = JSON.parse(storedData);
  }

}

function total(id,valor) {
  if (valor == 0) {
    document.getElementById(id).innerHTML = "Total: 0€";
  }
  document.getElementById(id).innerHTML = "Total:" + valor +"€";
}


/*session storage*/
function seeProd() {
  var prod_hist = sessionStorage.getItem(0);

  if (prod_hist) {
    list = JSON.parse(prod_hist);
    var len = list.length;
    for(i=0; i < len ; i++) {
      if (list[i] =="Café" || list[i] =="Amendoins" || list[i] =="Tremoços") {
        addHist('prodtab', 1, list[i], "1.00€");
      }
      else if(list[i] =="Cachorro_Quente" || list[i] =="Bifana" || list[i] =="Prego_no_Pão") {
        addHist('prodtab', 1, list[i], "4.00€");
      }
      else if (list[i] =="Hamburger") {
        addHist('prodtab', 1, list[i], "6.00€");
      }
      else if (list[i] =="Cheeseburger") {
        addHist('prodtab', 1, list[i], "6.50€");
      }
      else if (list[i] =="Coca-Cola" || list[i] =="Ice-Tea") {
        addHist('prodtab', 1, list[i], "1.50€");
      }
      else {
        addHist('prodtab', 1, list[i], "2.00€");
      }
    }
  }
  
}

function seeHist() {
  var prod_hist = sessionStorage.getItem('lista_hist');

  if (prod_hist) {
    list = JSON.parse(prod_hist);
    var len = list.length;
    for(i=0; i < len ; i++) {
      if (list[i] =="Café" || list[i] =="Amendoins" || list[i] =="Tremoços") {
        addHist('historicotab', 1, list[i], "1.00€");
      }
      else if(list[i] =="Cachorro_Quente" || list[i] =="Bifana" || list[i] =="Prego_no_Pão") {
        addHist('historicotab', 1, list[i], "4.00€");
      }
      else if (list[i] =="Hamburger") {
        addHist('historicotab', 1, list[i], "6.00€");
      }
      else if (list[i] =="Cheeseburger") {
        addHist('historicotab', 1, list[i], "6.50€");
      }
      else if (list[i] =="Coca-Cola" || list[i] =="Ice-Tea") {
        addHist('historicotab', 1, list[i], "1.50€");
      }
      else {
        addHist('historicotab', 1, list[i], "2.00€");
      }
    }
  }
  
}
var valor1 = 0;
function addHist(idTabela, qtd, pedido, preço) {
  var newRow = d.createElement('tr');
  newRow.insertCell(0).innerHTML = qtd;
  newRow.insertCell(1).innerHTML = pedido;
  newRow.insertCell(2).innerHTML = preço;
  d.getElementById(idTabela).appendChild(newRow);
  if(idTabela == "historicotab") {
	  valor1 += parseFloat(preço);
	  total('historico_par', valor1);
	}

}


function addStorage(pedido, preço) {
  var preço_p = sessionStorage.getItem(pedido);
  var preço_p1 = 0;
  var preço_p2 = 0;
  var len = sessionStorage.length;
  if (preço_p == null) {
    sessionStorage.setItem(pedido, preço);
  }
  else {
    for (var i = 0; i < len; ++i) {  
      key = sessionStorage.key(i);
      if (key == pedido) {
        preço_p1 = parseFloat(preço);
        preço_p2 = parseFloat(preço_p);
        preço_p2 += preço_p1;
        sessionStorage.setItem(pedido, preço_p2); //saves to the database, key/value
      } 
    }
  }
}

function deleteAllStorage(){ 
  location.reload(); 
  sessionStorage.clear();
}


function listAllItems(){  
    for (i=0; i<sessionStorage.length; i++)  
    {   
        key = sessionStorage.key(i);  
        val = sessionStorage.getItem(key);  
    } 
} 
/*session storage*/

function end() {
  setTimeout(function() { deleteAllStorage(); location.href = "index.html"; }, 10000);
}


var rowCount = 1;
var rowQtd = 1; 


var valor2 = 0; /*valor do pedido*/
function addMoreRows(idTabela, pedido,preço) { 
  valor2 = sessionStorage.getItem('valor_prod');
  if(valor2 > 0) {
    var valor3 = parseFloat(valor2); 
  }
  else{
    var valor3 = 0;
  }
  var valor1 = 0;
  lista_pro.push(pedido);

  document.getElementById("confirmar").style.backgroundColor = "green";
  document.getElementById("cancelar").style.backgroundColor = "red";

  var aux =document.getElementById(pedido+'qtd');
  if(aux != null) {
    var atual = document.getElementById(pedido+'qtd').innerHTML;
    document.getElementById(pedido+'qtd').innerHTML = parseFloat(atual)+1;
    valor1 += parseFloat(preço);
    valor3 += valor1;
    var valor_prod = sessionStorage.setItem('valor_prod', valor3);
    total('header_produtos1', valor3);
  }
  else {
    if(pedido == "Água"){
      rowCount = 1;
    }
    if(pedido == "Coca-Cola"){
      rowCount = 2;
    }
    if(pedido == "Ice-Tea"){
      rowCount = 3;
    }
    if(pedido == "Café"){
      rowCount = 4;
    }
    if(pedido == "Absinto"){
      rowCount = 5;
    }
    if(pedido == "Vodka_Laranja"){
      rowCount = 6;
    }
    if(pedido == "Vodka_Limão"){
      rowCount = 7;
    }
    if(pedido == "Vodka_Cola"){
      rowCount = 8;
    }
    if(pedido == "Rum"){
      rowCount = 9;
    }
    if(pedido == "Somersby_de_Maçã"){
      rowCount = 10;
    }
    if(pedido == "Somersby_Frutos_Vermelhos"){
      rowCount = 11;
    }
    if(pedido == "Tequila"){
      rowCount = 12;
    }
    if(pedido == "Whisky"){
      rowCount = 13;
    }
    if(pedido == "Whisky_Cola"){
      rowCount = 14;
    }
    if(pedido == "Vinho_Branco"){
      rowCount = 15;
    }
    if(pedido == "Vinho_Tinto"){
      rowCount = 16;
    }
    if(pedido == "Hamburger"){
      rowCount = 17;
    }
    if(pedido == "Cheeseburger"){
      rowCount = 18;
    }
    if(pedido == "Cachorro_Quente"){
      rowCount = 19;
    }
    if(pedido == "Bifana"){
      rowCount = 20;
    }
    if(pedido == "Torradas"){
      rowCount = 21;
    }
    if(pedido == "Prego_no_Pão"){
      rowCount = 22;
    }
    if(pedido == "Amendoins"){
      rowCount = 23;
    }
    if(pedido == "Tremoços"){
      rowCount = 24;
    }
    if(pedido == "Lays_Originais"){
      rowCount = 25;
    }
    if(pedido == "Tiras_de_Milho"){
      rowCount = 26;
    }

    var recRow = '<tr id="'+pedido+'"><td><a href="javascript:void(0);" onclick="decrementItem('+rowCount+');" style="color: red;">-</a></td><td id="'+pedido+'qtd">'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+rowCount+');" style="color: red;">X</a></td></tr>'; 
    jQuery('#lista_produtos1').prepend(recRow); /*adiciona no inicio da lista*/
    valor1 += parseFloat(preço);
    valor3 += valor1;
    var valor_prod = sessionStorage.setItem('valor_prod', valor3);
    total('header_produtos1', valor3);
  }

}



function removeRow(removeNum) { 
  decode(removeNum);
  var a_eliminar = 0;
  for(i=0;i<lista_pro.length;) {
    if(lista_pro[i] == rowCount) {
      lista_pro.splice(i, 1);
      if (rowCount =="Café" || rowCount =="Amendoins" || rowCount =="Tremoços") {
        a_eliminar += 1.00;
      }
      else if(rowCount =="Cachorro_Quente" || rowCount =="Bifana" || rowCount =="Prego_no_Pão") {
        a_eliminar += 4.00;
      }
      else if (rowCount =="Hamburger") {
        a_eliminar += 6.00;
      }
      else if (rowCount =="Cheeseburger") {
        a_eliminar += 6.50;
      }
      else if (rowCount =="Coca-Cola" || rowCount =="Ice-Tea") {
        a_eliminar += 1.50;
      }
      else {
        a_eliminar += 2.00;
      }
    }
    else{
      i++;
    }
  }
  valor2 = sessionStorage.getItem('valor_prod');
  totalNeg('header_produtos1', a_eliminar, valor2); 
  jQuery('#'+rowCount).remove();
  if(lista_pro.length == 0) {
    document.getElementById("confirmar").style.backgroundColor = "grey";
    document.getElementById("cancelar").style.backgroundColor = "grey";
  } 
} 


function totalNeg(id,valor, total) {
  if (valor == 0) {
    document.getElementById(id).innerHTML = "Total: 0€";
  }
  var aux = parseFloat(total)-parseFloat(valor);
  sessionStorage.setItem('valor_prod', aux);
  document.getElementById(id).innerHTML = "Total:" + aux +"€";
}


function refresh() {
  total('header_produtos1', 0);
  sessionStorage.setItem('valor_prod',0);
}

function changePage(id) {
  if(id != 'menu') {
    if(lista_pro.length > 0) {  
      if(confirm('Tem a certeza que deseja mudar de página? Ao sair perderá o pedido atual.')) {
        sessionStorage.setItem('valor_prod',0);
        if(id == 'home') {
	      location.href = "index.html";
	    }
	    else if(id == 'musica') {
	      location.href = "musica.html";
	    }
	    else if(id == 'historico') {
	      location.href = "historico.html";
	    }
      }
    }
    else {
		if(id == 'home') {
	      location.href = "index.html";
	    }
	    else if(id == 'musica') {
	      location.href = "musica.html";
	    }
	    else if(id == 'historico') {
	      location.href = "historico.html";
	    }
    }
  }
}


function decrementItem(removeNum) { 
  decode(removeNum);
  var a_eliminar = 0;
  for(i=0;i<lista_pro.length;) {
    if(lista_pro[i] == rowCount) {
      lista_pro.splice(i, 1);
      if (rowCount =="Café" || rowCount =="Amendoins" || rowCount =="Tremoços") {
        a_eliminar += 1.00;
        break;
      }
      else if(rowCount =="Cachorro_Quente" || rowCount =="Bifana" || rowCount =="Prego_no_Pão") {
        a_eliminar += 4.00;
        break;
      }
      else if (rowCount =="Hamburger") {
        a_eliminar += 6.00;
        break;
      }
      else if (rowCount =="Cheeseburger") {
        a_eliminar += 6.50;
        break;
      }
      else if (rowCount =="Coca-Cola" || rowCount =="Ice-Tea") {
        a_eliminar += 1.50;
        break;
      }
      else {
        a_eliminar += 2.00;
        break;
      }
    }
    else{
      i++;
    }
  }
  var atual = document.getElementById(rowCount+'qtd').innerHTML;
  if(atual > 1) {
    document.getElementById(rowCount+'qtd').innerHTML = parseFloat(atual)-1;
  }
  else {
    jQuery('#'+rowCount).remove();
  }
  valor2 = sessionStorage.getItem('valor_prod');
  totalNeg('header_produtos1', a_eliminar, valor2); 
  if(lista_pro.length == 0) {
    document.getElementById("confirmar").style.backgroundColor = "grey";
    document.getElementById("cancelar").style.backgroundColor = "grey";
  } 
}



function decode(removeNum) {
  if(removeNum == 1){
    rowCount = "Água";
  }
  if(removeNum == 2){
    rowCount = "Coca-Cola";
  }
  if(removeNum == 3){
    rowCount = "Ice-Tea";
  }
  if(removeNum == 4){
    rowCount = "Café";
  }
  if(removeNum == 5){
    rowCount = "Absinto";
  }
  if(removeNum == 6){
    rowCount = "Vodka_Laranja";
  }
  if(removeNum == 7){
    rowCount = "Vodka_Limão";
  }
  if(removeNum == 8){
    rowCount = "Vodka_Cola";
  }
  if(removeNum == 9){
    rowCount = "Rum";
  }
  if(removeNum == 10){
    rowCount = "Somersby_de_Maçã";
  }
  if(removeNum == 11){
    rowCount = "Somersby_Frutos_Vermelhos";
  }
  if(removeNum == 12){
    rowCount = "Tequila";
  }
  if(removeNum == 13){
    rowCount = "Whisky";
  }
  if(removeNum == 14){
    rowCount = "Whisky_Cola";
  }
  if(removeNum == 15){
    rowCount = "Vinho_Branco";
  }
  if(removeNum == 16){
    rowCount = "Vinho_Tinto";
  }
  if(removeNum == 17){
    rowCount = "Hamburger";
  }
  if(removeNum == 18){
    rowCount = "Cheeseburger";
  }
  if(removeNum == 19){
    rowCount = "Cachorro_Quente";
  }
  if(removeNum == 20){
    rowCount = "Bifana";
  }
  if(removeNum == 21){
    rowCount = "Torradas";
  }
  if(removeNum == 22){
    rowCount = "Prego_no_Pão";
  }
  if(removeNum == 23){
    rowCount = "Amendoins";
  }
  if(removeNum == 24){
    rowCount = "Tremoços";
  }
  if(removeNum == 25){
    rowCount = "Lays_Originais";
  }
  if(removeNum == 26){
    rowCount = "Tiras_de_Milho";
  }
}


function seeImage() {
  for(i=1;i<17;i++) {
    var image=document.getElementById(i);
    if(sessionStorage.getItem(i) == null || sessionStorage.getItem(i) == "add.png") {
      image.src = "add.png";
    }
    else {
      image.src = "check.png";
    }
  }
}


function changeImage(id) {
  /*alert(document.getElementById(id));*/
  var image = document.getElementById(id);
  if(image != null) {
    if (image.src.match("add")) {
        image.src = "check.png";
        sessionStorage.setItem(id, "check.png");
    } 
    else {
      image.src = "add.png";
      sessionStorage.setItem(id, "add.png");
    }
  }
  /*else {
    alert("era null");
  }*/
}



function addToPlay(idTabela, musica, artista, tempo, gostos) {
  encode(musica);
  embelezaMusica(musica);
  if(gostos == 0) { 
	 var recRow = '<li id="'+musica+'" class="icones_bebidas"><table><tr><td id="'+musica+'like" class="likes">'+gostos+'</td><td style="width:15%;"><a href="javascript:void(0);" onclick="like('+rowCount+');"><img src="like_preto.png" id="'+musica+'img" class="add"/></a></td><td style="width:45%;" class="name">'+song+'</td><td style="width:25%;" class="artist">'+artista+'</td><td style="width:15%;" class="time">'+tempo+'</td></tr></table></li>'; 
  }
  else if(gostos >= 1) {
    var recRow = '<li id="'+musica+'" class="icones_bebidas"><table><tr><td id="'+musica+'like" class="likes">'+gostos+'</td><td style="width:15%;"><a href="javascript:void(0);" onclick="like('+rowCount+');"><img src="like_azul.png" id="'+musica+'img" class="add"/></a></td><td style="width:45%;" class="name">'+song+'</td><td style="width:25%;" class="artist">'+artista+'</td><td style="width:15%;" class="time">'+tempo+'</td></tr></table></li>';
  }
  else if(gostos == "a_tocar" ) {
    var recRow = '<li id="'+musica+'" class="icones_bebidas"><table><tr><td style="width:15%;"><img src="coluna_preta.png" id="'+musica+'img" class="add"/></td><td style="width:45%;" class="name">'+song+'</td><td style="width:25%;" class="artist">'+artista+'</td><td style="width:15%;" class="time">'+tempo+'</td></tr></table></li>';
  }
  jQuery("#"+idTabela).append(recRow); 
    
}

function addSong(musica, artista,tempo,id){
  var size = sessionStorage.length;
  for(i=0;i<size;i++) {
    if(sessionStorage.key(i) == musica) {
      alert("Música já existente na playlist");
      return;
    }
  }

  changeImage(id);

  var music = [artista, tempo, 0];
  sessionStorage.setItem(musica, JSON.stringify(music));
  if(sessionStorage.getItem("playing") == null || JSON.parse(sessionStorage.getItem("playing"))[0] == "Música 1" ) {
    embelezaMusica(musica);
    sessionStorage.setItem("playing",JSON.stringify([song,artista,tempo,musica]));
    sessionStorage.setItem("lista_rep",JSON.stringify([musica]));
    sessionStorage.setItem("checks",JSON.stringify([id]));
    addToPlay('play',musica,artista,tempo,'a_tocar');
    var tempo_actual = new Date();
    var horas = tempo_actual.getHours();
    var minutos = tempo_actual.getMinutes();
    var segundos = tempo_actual.getSeconds();
    var conta = parseInt(segundos)+ 30;
    if(conta >= 60) {
      segundos = conta - 60;
      if(minutos < 59) {
        minutos += 1;
      }
      else{
        minutos = 0;
        if(horas < 23) {
          horas += 1;
        }
        else{
          horas =0;
        }
      }
    }
    else {
      segundos += 30;
    }
    sessionStorage.setItem("tempo",JSON.stringify([horas, minutos, segundos]));
    songPlaying();
    return;
  }
  if(sessionStorage.getItem("lista_rep") != null) {
    var aux = JSON.parse(sessionStorage.getItem("lista_rep"));
    aux.push(musica);
    sessionStorage.setItem("lista_rep",JSON.stringify(aux));
    addToPlay('play',musica,artista,tempo,0);
  }
  if(sessionStorage.getItem("checks") != null) {
    var aux = JSON.parse(sessionStorage.getItem("checks"));
    aux.push(id);
    sessionStorage.setItem("checks",JSON.stringify(aux));
  }
}

function seeSong() {
  var nome1 = 0;
  var aux = sessionStorage.getItem("playing");
  if(aux != null) {
    var aux1 = JSON.parse(aux);
    var nome1 = aux1[3];  /*vai buscar o id da musica*/
    var artista = aux1[1];
    var tempo = aux1[2];
    addToPlay('play',nome1,artista,tempo,'a_tocar');
  }
  var size = sessionStorage.length;
  for(i=0;i<size;i++) {
    if(sessionStorage.key(i) != "valor_prod" && sessionStorage.key(i) != "0" && sessionStorage.key(i) != "lista_hist" && sessionStorage.key(i) != "playing" && sessionStorage.key(i) != "lista_rep" && sessionStorage.key(i) != nome1) {
      var nome = sessionStorage.key(i);
      var related = JSON.parse(sessionStorage.getItem(nome));
      var artista = related[0];
      var tempo = related[1];
      var gostos = related[2];
      addToPlay('play',nome,artista,tempo,gostos);
      
    }

  }
  
}


function like(linha) {
  var num = sessionStorage.getItem("num_pedidos");
  decodeMusic(linha);
  var image = document.getElementById(rowCount+'img'); 
  getFileNameFromPath(image.src);
  if(ary[ary.length - 1] == "like_preto.png") { 
    image.src = "like_azul.png";
    var related = JSON.parse(sessionStorage.getItem(rowCount)); 
    var gostos = related[2];
    gostos +=( Math.floor(num/5) + 1);      /*de cinco em 5 produtos comprados pelo cliente os seu likes incrementam 1*/
    sessionStorage.setItem(rowCount,JSON.stringify([related[0],related[1],gostos]));
    upLine(rowCount);
  }
  else {
  	image.src = "like_preto.png";
    var related = JSON.parse(sessionStorage.getItem(rowCount)); 
    var gostos = related[2];
    gostos -=( Math.floor(num/5) + 1);     /*de cinco em 5 produtos comprados pelo cliente os seu dislikes incrementam 1*/
    if(gostos < 0) {
      gostos = 0;
    }
    sessionStorage.setItem(rowCount,JSON.stringify([related[0],related[1],gostos]));
    downLine(rowCount);
  }
  document.getElementById(rowCount+"like").innerHTML = gostos;
}

function getFileNameFromPath(path) {
  ary = path.split("/");
  return ary[ary.length - 1];
}

function upLine(idLinha) {
  var max = 0;
  var flag = 0;
  var pos_like = 0;
  var pos_inserir = 0;   /*guarda a posiçao onde o elemento que foi feito like sera inserido*/
  var aux = JSON.parse(sessionStorage.getItem("lista_rep"));
  var id = JSON.parse(sessionStorage.getItem("checks"));
  for(i=1;i<aux.length;i++) {
    if(aux[i] == idLinha) {
      pos_like = i;    /*posiçao onde foi feito o like*/
    }
  }
  var a_mudar = JSON.parse(sessionStorage.getItem(aux[pos_like]));  //string guardada com a key do nome da musica em que foi feito like
  for(i=pos_like-1; i>=1; i--) {
    var related = JSON.parse(sessionStorage.getItem(aux[i]));  //string guardada com a key do nome da musica
    if(a_mudar[2] > related[2]) {
      pos_inserir = i;
    }
    
  }
  /*chamar uma funçao que altere as posiçoes*/
  var nova = [];  /*lista que vai guardar as novas posiçoes*/
  var nova1 = []; /*lista que vai guardar as novas posiçoes de ids*/
  var related = JSON.parse(sessionStorage.getItem(aux[pos_like-1]));  //string guardada com a key do nome da musica anterior
  if(pos_like >1 && a_mudar[2] > related[2]) {
    for (i = 0; i < aux.length; i++) {
      if(i < pos_inserir) {
        nova[i] = aux[i];
        nova1[i]=id[i];
      }
      else if(i == pos_inserir) {
        nova[i] = aux[pos_like];
        nova1[i] = id[pos_like];
      }
      else {
        if(i <= pos_like ) {
          nova[i] = aux[i-1];
          nova1[i] = id[i-1];
        }
        else {
          nova[i] = aux[i];
          nova1[i] = id[i];
        }
      }
    }
  sessionStorage.setItem("lista_rep",JSON.stringify(nova));
  sessionStorage.setItem("checks",JSON.stringify(nova1));
  refreshPlaylist();
  }
}

function downLine(idLinha) {
  var max = 0;
  var flag = 0;
  var pos_like = 0;
  var pos_inserir = 0;   /*guarda a posiçao onde o elemento que foi feito like sera inserido*/
  var aux = JSON.parse(sessionStorage.getItem("lista_rep"));
  var id = JSON.parse(sessionStorage.getItem("checks"));
  for(i=1;i<aux.length;i++) {
    if(aux[i] == idLinha) {
      pos_like = i;    /*posiçao onde foi feito o dislike*/
    }
  }
  var a_mudar = JSON.parse(sessionStorage.getItem(aux[pos_like]));  //string guardada com a key do nome da musica em que foi feito like
  for(i=pos_like+1; i<aux.length; i++) {
    var related = JSON.parse(sessionStorage.getItem(aux[i]));  //string guardada com a key do nome da musica
    if(a_mudar[2] < related[2]) {
      pos_inserir = i;
    }
    
  }
  /*chamar uma funçao que altere as posiçoes*/
  var nova = [];  /*lista que vai guardar as novas posiçoes*/
  var nova1 = [];  /*lista que vai guardar as novas posiçoes de ids*/
  var related = JSON.parse(sessionStorage.getItem(aux[pos_like+1]));  //string guardada com a key do nome da proxima musica
  if(pos_like < aux.length-1 && a_mudar[2] < related[2]) {
    for (i = 0; i < aux.length; i++) {
      if(i < pos_like) {
        nova[i] = aux[i];
        nova1[i] = id[i];
      }
      else if(i == pos_inserir) {
        nova[i] = aux[pos_like];
        nova1[i] = id[pos_like];
      }
      else {
        if(i <= pos_inserir ) {
          nova[i] = aux[i+1];
          nova1[i] = id[i+1];
        }
        else {
          nova[i] = aux[i];
          nova1[i] = id[i];
        }
      }
    }
  sessionStorage.setItem("lista_rep",JSON.stringify(nova));
  sessionStorage.setItem("checks",JSON.stringify(nova1));
  refreshPlaylist();
  }
}

function refreshPlaylist() {
  var lista = JSON.parse(sessionStorage.getItem('lista_rep'));
  if(lista != null && lista != "") {
    for(i=0;i<lista.length;i++) {
      jQuery('#'+lista[i]).remove();
    }
    for(i=0;i<lista.length;i++) {
      var related = JSON.parse(sessionStorage.getItem(lista[i]));
      var artista = related[0];
      var tempo = related[1];
      var gostos = related[2];
      if(i>0) {
        addToPlay('play',lista[i],artista,tempo,gostos);
      }
      else {
        addToPlay('play',lista[i],artista,tempo,'a_tocar');
      }
    }
  }
}

function newSongPlaying() {
  var aux = JSON.parse(sessionStorage.getItem('lista_rep'));
  var a_tocar = JSON.parse(sessionStorage.getItem('playing'));
  var id = JSON.parse(sessionStorage.getItem('checks'));
  for(i=0;i<sessionStorage.length;i++){
    if(aux[0] == sessionStorage.key(i)) {
      sessionStorage.removeItem(aux[0]);  /*apaga a musica do storage*/
    }
  }
  for(i=0;i<sessionStorage.length;i++){
    if(id[0] == sessionStorage.key(i)) {
      changeImage(id[0]);
      sessionStorage.removeItem(id[0]);  /*apaga a id do storage*/
    }
  }
  jQuery('#'+aux[0]).remove();  /*elimina o primeiro elemento da playlist*/
  aux.splice(0, 1);  /*elimina o elemento na posiçao zero da lista de reproduçao*/
  id.splice(0, 1);
  sessionStorage.setItem('lista_rep', JSON.stringify(aux));
  sessionStorage.setItem('checks', JSON.stringify(id));
  if(aux != null && aux != "") {  
    var related = JSON.parse(sessionStorage.getItem(aux[0]));
    embelezaMusica(aux[0]);
    sessionStorage.setItem('playing', JSON.stringify([song, related[0], related[1], aux[0]]));
    refreshPlaylist();
    songPlaying();
    var tempo_actual = new Date();
    var horas = tempo_actual.getHours();
    var minutos = tempo_actual.getMinutes();
    var segundos = tempo_actual.getSeconds();
    var conta = parseInt(segundos)+ 30;
    if(conta >= 60) {
      segundos = conta - 60;
      if(minutos < 59) {
        minutos += 1;
      }
      else{
        minutos = 0;
        if(horas < 23) {
          horas += 1;
        }
        else{
          horas =0;
        }
      }
    }
    else {
      segundos += 30;
    }
    sessionStorage.setItem("tempo",JSON.stringify([horas, minutos, segundos]));
  }
  else {
    sessionStorage.setItem('playing', JSON.stringify(["Música 1", "Artista 1", "Tempo 1", "Música 1"]));
    songPlaying();
  }
}


function encode(musica) {
  if(musica == "7_Years"){
    rowCount = 1;
  }
  if(musica == "Makeup"){
    rowCount = 2;
  }
  if(musica == "Faded"){
    rowCount = 3;
  }
  if(musica == "Amnesia"){
    rowCount = 4;
  }
  if(musica == "Lonely"){
    rowCount = 5;
  }
  if(musica == "That_s_How_You_Know"){
    rowCount = 6;
  }
  if(musica == "Hollow"){
    rowCount = 7;
  }
  if(musica == "Rock_Botom"){
    rowCount = 8;
  }
  if(musica == "We_Belong_Together"){
    rowCount = 9;
  }
  if(musica == "Take_On_Me"){
    rowCount = 10;
  }
  if(musica == "She_Will_Be_Loved"){
    rowCount = 11;
  }
  if(musica == "Thousand_Miles"){
    rowCount = 12;
  }
  if(musica == "The_Scientist"){
    rowCount = 13;
  }
  if(musica == "Big_Girls_Don_t_Cry"){
    rowCount = 14;
  }
  if(musica == "Just_The_Way_You_Are"){
    rowCount = 15;
  }
  if(musica == "Animals"){
    rowCount = 16;
  }
}

var song="";
function embelezaMusica(musica) {  /*tira os _ e mete espaços para ficar mais bonito a imprimir*/
  if(musica == "7_Years"){
    song = "7 Years";
    return;
  }
  if(musica == "That_s_How_You_Know"){
    song = "That's How You Know";
    return;
  }
  if(musica == "Rock_Botom"){
    song = "Rock Botom";
    return;
  }
  if(musica == "We_Belong_Together"){
    song = "We Belong Together";
    return;
  }
  if(musica == "Take_On_Me"){
    song = "Take On Me";
    return;
  }
  if(musica == "She_Will_Be_Loved"){
    song = "She Will Be Loved";
    return;
  }
  if(musica == "Thousand_Miles"){
    song = "Thousand Miles";
    return;
  }
  if(musica == "The_Scientist"){
    song = "The Scientist";
    return;
  }
  if(musica == "Big_Girls_Don_t_Cry"){
    song = "Big Girls Don't Cry";
    return;
  }
  if(musica == "Just_The_Way_You_Are"){
    song = "Just The Way You Are";
    return;
  }
  else {
    song = musica;
  }
}


function decodeMusic(musica) {
  if(musica == 1){
    rowCount = "7_Years";
  }
  if(musica == 2){
    rowCount = "Makeup";
  }
  if(musica == 3){
    rowCount = "Faded";
  }
  if(musica == 4){
    rowCount = "Amnesia";
  }
  if(musica == 5){
    rowCount = "Lonely";
  }
  if(musica == 6){
    rowCount = "That_s_How_You_Know";
  }
  if(musica == 7){
    rowCount = "Hollow";
  }
  if(musica == 8){
    rowCount = "Rock_Botom";
  }
  if(musica == 9){
    rowCount = "We_Belong_Together";
  }
  if(musica == 10){
    rowCount = "Take_On_Me";
  }
  if(musica == 11){
    rowCount = "She_Will_Be_Loved";
  }
  if(musica == 12){
    rowCount = "Thousand_Miles";
  }
  if(musica == 13){
    rowCount = "The_Scientist";
  }
  if(musica == 14){
    rowCount = "Big_Girls_Don_t_Cry";
  }
  if(musica == 15){
    rowCount = "Just_The_Way_You_Are";
  }
  if(musica == 16){
    rowCount = "Animals";
  }
}

function songPlaying() {
  var aux = sessionStorage.getItem("playing");
  if(aux != null) {
    var aux2 = JSON.parse(aux);
    document.getElementById("rod_musica").innerHTML = aux2[0];
    document.getElementById("rod_artista").innerHTML = aux2[1];
    document.getElementById("rod_tempo").innerHTML = aux2[2];
  }
}


function seeTime() {
  var tempo_fim = JSON.parse(sessionStorage.getItem("tempo"));
  if(tempo_fim != null) {
    var time = new Date();
    var horas = time.getHours();
    var minutos = time.getMinutes();
    var segundos = time.getSeconds();
    if(horas >= tempo_fim[0] && minutos >= tempo_fim[1] && segundos >= tempo_fim[2]) {
      newSongPlaying();
    }
  }
  setTimeout(seeTime,1000);  /*verifica as horas de segundo em segundo*/
}

function payment() {
  if(sessionStorage.getItem("lista_hist") != null && sessionStorage.getItem("lista_hist") != "") {  
    if (confirm('Tem a certeza que deseja efetuar o pagamento?')) {
      location.href = "pagamento.html";
    }
  }
}

function productsMissingToLike() {
  var aux = sessionStorage.getItem("num_pedidos");
  if(aux != null) {
    for(i=aux; i <= aux+5; i++) {
      if(i > aux && i%5 == 0) {
        var conta1 = i - aux;
        alert("Faltam-lhe "+conta1+" produtos para os seus likes valerem mais 1");
        return;
      }
    }
  }
}


function seePay() {
  if(sessionStorage.getItem("lista_hist") != null && sessionStorage.getItem("lista_hist") != "") {
    document.getElementById("pagamento").style.backgroundColor = "#006df0";
  }
}