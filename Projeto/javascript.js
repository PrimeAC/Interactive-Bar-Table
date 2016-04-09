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

/*function addItem(id) {
	d = document.getElementById(id);
	for(int i=0; i<num_linhhas;i++){

	}
}*/
var cnt = 0;
var d = document;
function addItem(idTabela,pedido)
{
	var newRow = d.createElement('tr');
	newRow.insertCell(0).innerHTML = "+";
	newRow.insertCell(1).innerHTML = 1;
	newRow.insertCell(2).innerHTML = "-";
	newRow.insertCell(3).innerHTML = pedido;
	newRow.insertCell(4).innerHTML = 'X';
	d.getElementById(idTabela).appendChild(newRow);
  /*cnt**;*/
	return false;
}


/*function deleteRow(row)
{
  var i = row.parentNode.parentNode.rowIndex;
  document.getElementById('lista_produtos').deleteRow(i);
}*/

/*function deleteList(idTabela) {
  var objTR = idTabela.parentNode.parentNode;
  var objTable = objTR.parentNode;
  var indexTr = objTR.rowIndex;
  objTable.deleteRow(indexTr);
}*/



/*tentativa de meter os divs dos produtos a funcionar com procura*/
function Search() { 
  var options = {
    valueNames: [ 'name', 'type', 'price' ]
  };

  var userList = new List('bebidas', options);
}

/*tentativa de meter os divs dos produtos a funcionar com procura*/