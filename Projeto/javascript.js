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

var cnt = 0;
var d = document;
function addItem(idTabela,pedido) {
  var newRow = d.createElement('tr');
  newRow.insertCell(0).innerHTML = "-";
  newRow.insertCell(1).innerHTML = 1;
  newRow.insertCell(2).innerHTML = "+";
  newRow.insertCell(3).innerHTML = pedido;
  newRow.insertCell(4).innerHTML = 'X';
  d.getElementById(idTabela).appendChild(newRow);
  /*cnt**;*/
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
  for ( var i = 0; i < row_numb; ) {
    tab.deleteRow(i);
  }  

}

/*tentativa de meter os divs dos produtos a funcionar com procura*/
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

/*tentativa de meter os divs dos produtos a funcionar com procura*/

function confirmationMsg(idTabela) {
  var tab = document.getElementById(idTabela);
  var row_numb = tab.rows.length;
  if (row_numb > 0) {
    alert('Pedido efetuado com sucesso');
    deleteList(idTabela);
  }
}

function deleteMsg(idTabela) {
  var tab = document.getElementById(idTabela);
  var row_numb = tab.rows.length;
  if (row_numb > 0) {
    if (confirm('Tem a certeza que deseja eliminar o pedido?')) {
      deleteList(idTabela);
    }  
  } 
}
