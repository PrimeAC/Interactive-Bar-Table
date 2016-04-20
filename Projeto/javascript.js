function toggleFooter(id) { 
  if(document.getElementById(id).style.height == "4.5%") {
    document.getElementById(id).style.height = "12.5%";
  }

  else {
    document.getElementById(id).style.height = "4.5%";
  }
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
  /*lista_pro.push(preço);*/
  alert(lista_pro);
  var newRow = d.createElement('tr');
  /*newRow.insertCell(0).innerHTML = "-";*/
  newRow.insertCell(0).innerHTML = 1;
  /*newRow.insertCell(2).innerHTML = "+";*/
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
  /*alert("ola");*/
  total('header_produtos1', valor); 
  for ( var i = 0; i < row_numb; ) {
    tab.deleteRow(i);
  } 

}

/*divs dos produtos a funcionar com procura*/
function Search(id) { 
  var options = {
    valueNames: [ 'name', 'type', 'price', 'description' , 'artist']
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
  alert("sadsf "+cnt);
  var storedData = sessionStorage.getItem(cnt);
  if (storedData) {
    alert("enter");
    list = JSON.parse(storedData);
    alert('list: '+list);
  }

}

function total(id,valor) {
  if (valor == 0) {
    document.getElementById(id).innerHTML = "Total: 0€";
  }
  document.getElementById(id).innerHTML = "Total:" + valor +"€";
}


/*session storage*/


function seeHist() {
  var prod_hist = sessionStorage.getItem('lista_hist');
  if (prod_hist) {
    list = JSON.parse(prod_hist);
    var len = list.length;
    for(i=0; i < len ; i++) {
      if (list[i] =="Café" || list[i] =="Amendioins" || list[i] =="Tremoços") {
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
  valor1 += parseFloat(preço);
  total('historico_par', valor1);
  return false;
}

/*function seeHist() {
  valor2 = sessionStorage.getItem('lista_hist');
  if(valor2 > 0) {
    var valor3 = parseFloat(valor2); 
  }
  else{
    var valor3 = 0;
  }
  alert('val '+valor3);
  var valor1 = 0;
  if (prod_hist) {
    list = JSON.parse(prod_hist);
    var len = list.length;
    for(i=0; i < len ; i++) {

      var aux =document.getElementById(pedido+'qtd');
      alert("aux "+aux);
      if(aux != null) {
        var atual = document.getElementById(pedido+'qtd').innerHTML;
        document.getElementById(pedido+'qtd').innerHTML = parseFloat(atual)+1;
        valor1 += parseFloat(preço);
        valor3 += valor1;
        var valor_prod = sessionStorage.setItem('valor_prod', valor3);
        total('header_produtos1', valor3);
      }
    }
      else {

        var recRow = '<tr id="'+pedido+'"><td id="'+pedido+'qtd">'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+rowCount+');">X</a></td></tr>'; 
        jQuery('#lista_produtos1').append(recRow); 
        valor1 += parseFloat(preço);
        valor3 += valor1;
        var valor_prod = sessionStorage.setItem('valor_prod', valor3);
        total('header_produtos1', valor3);
      }
  
}

function addHist(idTabela, pedido,preço) { 
  
  valor2 = sessionStorage.getItem('lista_hist');
  if (valor2) {
    list = JSON.parse(prod_hist);
    var len = list.length;
    for(i=0; i < len ; i++) {
      if(valor2 > 0) {
        var valor3 = parseFloat(valor2); 
      }
      else{
        var valor3 = 0;
      }

      alert('val '+valor3);
      var valor1 = 0;
      var aux =document.getElementById(pedido+'qtd');
      alert("aux "+aux);

      if(aux != null) {
        var atual = document.getElementById(pedido+'qtd').innerHTML;
        document.getElementById(pedido+'qtd').innerHTML = parseFloat(atual)+1;
        valor1 += parseFloat(preço);
        valor3 += valor1;
        var valor_prod = sessionStorage.setItem('valor_prod', valor3);
        total('header_produtos1', valor3);
      }
      else {

        var recRow = '<tr id="'+pedido+'"><td id="'+pedido+'qtd">'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+rowCount+');">X</a></td></tr>'; 
        jQuery('#lista_produtos1').append(recRow); 
        valor1 += parseFloat(preço);
        valor3 += valor1;
        var valor_prod = sessionStorage.setItem('valor_prod', valor3);
        total('header_produtos1', valor3);
      }
    }
  }
}*/


function addStorage(pedido, preço) {
  var preço_p = sessionStorage.getItem(pedido);
  var preço_p1 = 0;
  var preço_p2 = 0;
  var len = sessionStorage.length;
  /*alert("storage: "+ produto);*/
  /*alert(sessionStorage.getItem(pedido));*/
  if (preço_p == null) {
    sessionStorage.setItem(pedido, preço);
    /*alert("len: " + len);*/
  }
  else {
    /*alert("else");*/
    /*alert("len: " + len);*/
    for (var i = 0; i < len; ++i) {  
      key = sessionStorage.key(i);
      /*alert("key: " + key);*/ 
      if (key == pedido) {
        preço_p1 = parseFloat(preço);
        /*alert("preço_p1: " + preço_p1);*/
        preço_p2 = parseFloat(preço_p);
        /*alert("preço_p2: " + preço_p2);*/
        preço_p2 += preço_p1;
        /*alert("preço_p2: " + preço_p2);*/
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
  alert("entrei");
  location.href="index.html";
  deleteAllStorage();
}












var rowCount = 1;
var rowQtd = 1; 
/*function addMoreRows(idTabela, pedido,preço) { 
  alert('rowCount0: '+rowCount);
  alert('rowQtd '+rowQtd);
  if(lista_pro.length != 0) {
    for(i=0;i<lista_pro.length;i++) {
      if(lista_pro[i] == pedido) {
        rowQtd++;
        alert('rowQtd '+rowQtd);
        alert('rowCount2: '+rowCount);
        var recRow = '<tr id="rowCount'+rowCount+'"><td>'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+rowCount+');">Delete</a></td></tr>'; 
        alert("Y");
        jQuery("#rowQtd").html("as");
        alert("X");
      }
      else {
        rowCount ++;
        alert('rowCount1: '+rowCount);
        var recRow = '<tr id="rowCount'+rowCount+'"><td>'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+rowCount+');">Delete</a></td></tr>'; 
        jQuery('#lista_produtos1').append(recRow); 
      }
    }
  }
  else {
    lista_pro.push(pedido);
    alert(lista_pro);
    alert('primeiro');
    rowCount ++;
    var recRow = '<tr id="rowCount'+rowCount+'"><td>'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+rowCount+');">Delete</a></td></tr>'; 
    jQuery('#lista_produtos1').append(recRow);
  } 
}

function removeRow(removeNum) {
alert("remover "+removeNum);
  jQuery('#rowCount'+removeNum).remove(); 
} */

var valor2 = 0; /*valor do pedido*/
function addMoreRows(idTabela, pedido,preço) { 
  /*var quantidade = 0;*/
  /*var flag = 0;*/
  valor2 = sessionStorage.getItem('valor_prod');
  if(valor2 > 0) {
    var valor3 = parseFloat(valor2); 
  }
  else{
    var valor3 = 0;
  }
  var valor1 = 0;
  lista_pro.push(pedido);
  /*alert(lista_pro + lista_pro.length);*/ 
 /* for(i=0;i<lista_pro.length;i++) {
    if(lista_pro[i] == pedido) {
      quantidade++;
      flag = 1;*/
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

        var recRow = '<tr id="'+pedido+'"><td><a href="javascript:void(0);" onclick="decrementItem('+rowCount+');">-</a></td><td id="'+pedido+'qtd">'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+rowCount+');">X</a></td></tr>'; 
        jQuery('#lista_produtos1').append(recRow); 
        valor1 += parseFloat(preço);
        valor3 += valor1;
        var valor_prod = sessionStorage.setItem('valor_prod', valor3);
        total('header_produtos1', valor3);
      }
      
    /*}
  }*/
  /*if(flag == 0) {
    alert('primeiro do tipo');
    rowCount = pedido;
    var recRow = '<tr id="'+pedido+'"><td id="'+pedido+'qtd">'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+rowCount+');">X</a></td></tr>'; 
    jQuery('#lista_produtos1').append(recRow); 
    valor1 += parseFloat(preço);
    valor2 += valor1;
    total('header_produtos1', valor2);
  } */
}



function removeRow(removeNum) { 
  decode(removeNum);
  var a_eliminar = 0;
  for(i=0;i<lista_pro.length;) {
    if(lista_pro[i] == rowCount) {
      lista_pro.splice(i, 1);
      if (rowCount =="Café" || rowCount =="Amendioins" || rowCount =="Tremoços") {
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
      if (rowCount =="Café" || rowCount =="Amendioins" || rowCount =="Tremoços") {
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


function addToPlay(idTabela, musica, artista, tempo) {
	var recRow = '<li id="'+musica+'" class="icones_bebidas"><table><tr><td id="'+musica+'qtd" style="width:15%;"><a href="javascript:void(0);" onclick="Like('+rowCount+');"><img src="like_azul.png" class="add"/></a></td><td style="width:45%;" class="name">'+musica+'</td><td style="width:25%;" class="artist">'+artista+'</td><td style="width:15%;">'+tempo+'</td></tr></table></li>'; 
    jQuery("#"+idTabela).append(recRow); 
    
}