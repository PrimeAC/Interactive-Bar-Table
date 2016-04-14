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


/*function deleteRow(row) {
  var i = row.parentNode.parentNode.rowIndex;
  document.getElementById('lista_produtos1').deleteRow(i);
}*/


/*function deleteRow(row) {
  document.getElementById("lista_produtos1").deleteRow(0);
}*/

function deleteList(idTabela) {
  var tab = document.getElementById(idTabela);
  var row_numb = tab.rows.length; 
  valor = 0 ;
  /*alert("ola");*/
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
    /*alert(lista_pro);*/
  }
}
var cnt = 0;
var lista_pro_t;
function storeArray() {
  var aux = sessionStorage.getItem('lista_hist');
  alert("aux "+aux);
  if(aux != null) {
    list = JSON.parse(aux);
    lista_pro_t = list.concat(lista_pro);
    alert('cnt: '+cnt);
    sessionStorage.setItem(cnt,  JSON.stringify(lista_pro));
    sessionStorage.setItem("lista_hist",  JSON.stringify(lista_pro_t));
    emptyArray();  
  }
  else {
    lista_pro_t = lista_pro;
    alert("inicio da lista_pro_t");
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

function seeHist() {
  var prod_hist = sessionStorage.getItem('lista_hist');
  if (prod_hist) {
    list = JSON.parse(prod_hist);
    var len = list.length;
    alert('len: ' +len);
    for(i=0; i < len ; i++) {
      alert(list[i]);
      if (list[i] =="Café" || list[i] =="Amendioins" || list[i] =="Tremoços") {
        addHist('historicotab1', 1, list[i], "1.00€");
      }
      else if(list[i] =="Cachorro Quente" || list[i] =="Bifana" || list[i] =="Prego no Pão") {
        addHist('historicotab1', 1, list[i], "4.00€");
      }
      else if (list[i] =="Hamburger") {
        addHist('historicotab1', 1, list[i], "6.00€");
      }
      else if (list[i] =="Cheeseburger") {
        addHist('historicotab1', 1, list[i], "6.50€");
      }
      else if (list[i] =="Coca-Cola" || list[i] =="Ice Tea") {
        addHist('historicotab1', 1, list[i], "1.50€");
      }
      else {
        addHist('historicotab1', 1, list[i], "2.00€");
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
  var valor1 = 0;
  lista_pro.push(pedido);
  alert(lista_pro.length);
  /*alert(lista_pro + lista_pro.length);*/ 
 /* for(i=0;i<lista_pro.length;i++) {
    if(lista_pro[i] == pedido) {
      quantidade++;
      flag = 1;*/
      var aux =document.getElementById(pedido+'qtd');
      alert("aux "+aux);
      if(aux != null) {
        var atual = document.getElementById(pedido+'qtd').innerHTML;
        alert(atual+'atual');
        document.getElementById(pedido+'qtd').innerHTML = parseFloat(atual)+1;
        valor1 += parseFloat(preço);
        valor2 += valor1;
        total('header_produtos1', valor2);
      }
      else {
        /*rowCount = pedido;
        alert('rowCount '+rowCount);*/
        var recRow = '<tr id="'+pedido+'"><td id="'+pedido+'qtd">'+rowQtd+'</td><td>'+pedido+'</td><td><a href="javascript:void(0);" onclick="removeRow('+pedido+');">X</a></td></tr>'; 
        jQuery('#lista_produtos1').append(recRow); 
        valor1 += parseFloat(preço);
        valor2 += valor1;
        total('header_produtos1', valor2);
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
  alert("remover "+removeNum);
  var aux = document.getElementById(removeNum);
  alert(aux);
  for(i=0;i<lista_pro.length;i++) {
    if(lista_pro[i] == removeNum) {
      lista_pro.splice(i, 1);
    }
  } 
  jQuery('#'+removeNum).remove(); 
} 
