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
  lista_pro.push(preço);
  alert(lista_pro);
  var newRow = d.createElement('tr');
  newRow.insertCell(0).innerHTML = "-";
  newRow.insertCell(1).innerHTML = 1;
  newRow.insertCell(2).innerHTML = "+";
  newRow.insertCell(3).innerHTML = pedido;
  newRow.insertCell(4).innerHTML = 'X';
  d.getElementById(idTabela).appendChild(newRow);
  valor += parseFloat(preço);
  total('header_produtos1', valor);
  return false;  
}


/*function deleteRow(row) {
  var i = row.parentNode.parentNode.rowIndex;
  document.getElementById('lista_produtos1').deleteRow(i);
}*/


function deleteRow(row) {
  document.getElementById("lista_produtos1").deleteRow(0);
}

function deleteList(idTabela) {
  var tab = document.getElementById(idTabela);
  var row_numb = tab.rows.length; 
  valor = 0 ;
  alert("ola");
  total('header_produtos1', valor); 
  for ( var i = 0; i < row_numb; ) {
    tab.deleteRow(i);
  } 

}

/*divs dos produtos a funcionar com procura*/
function Search(id) { 
  var options = {
    valueNames: [ 'name', 'type', 'price', 'description' ]
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
    alert('Pedido efetuado com sucesso');
    /*location.href="index.html";*/
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
    alert(lista_pro);
  }
}
var cnt = 0;
function storeArray() {
  cnt++;
  alert('cnt: '+cnt);
  sessionStorage.setItem(cnt,  JSON.stringify(lista_pro));
  emptyArray();
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
/*function hist(id) {
  alert(sessionStorage.getItem(id));
}*/

/*(function($) {
  AddTableRow = function() {

    var newRow = $("<tr>");
    var cols = "";

    cols += '<td>&nbsp;</td>';
    cols += '<td>&nbsp;</td>';
    cols += '<td>&nbsp;</td>';
    cols += '<td>';
    cols += '<button onclick="RemoveTableRow(this)" type="button">Remover</button>';
    cols += '</td>';

    newRow.append(cols);
    $("#products-table").append(newRow);

    return false;
  };
})(jQuery);*/

/*function seeHist(idTabela) {
  var qtd = 0;
  var len = sessionStorage.length;
  alert(len);
  for (i=0; i<len;++i) {
    var pedido = sessionStorage.key(i);
    if  (pedido == "Café") {
      qtd = sessionStorage.getItem(pedido);
      addHist(idTabela, parseInt(qtd), pedido, qtd);
    }
    else if (pedido == "Coca-Cola" || pedido == "Ice Tea") {
      var aux = sessionStorage.getItem(pedido);*/ /*guarda o valor*/
      /*qtd = (parseFloat(aux)/1.50);
      addHist(idTabela, qtd, pedido, parseFloat(aux));
    }
    else {
      var aux = sessionStorage.getItem(pedido);*/ /*guarda o valor*/
      /*qtd = (parseFloat(aux)/2);
      addHist(idTabela, qtd, pedido, parseFloat(aux));
    }
  }
}*/

function seeHist(idTabela) {
  var qtd = 0;
  var len = sessionStorage.length;
  alert(len);
  for (i=0; i<len;++i) {
    var key = alert(sessionStorage.key(i));
    alert(sessionStorage.getItem(key));
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


function addStorage(pedido, preço) {
  var preço_p = sessionStorage.getItem(pedido);
  var preço_p1 = 0;
  var preço_p2 = 0;
  var len = sessionStorage.length;
  /*alert("storage: "+ produto);*/
  /*alert(sessionStorage.getItem(pedido));*/
  if (preço_p == null) {
    sessionStorage.setItem(pedido, preço);
    alert("primeiro do tipo " + pedido);
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
        alert(key + val);   
    } 
} 
/*session storage*/

function end() {
  alert("S");
  setTimeout(function(){location.href="index.html"} , 3000);
}



