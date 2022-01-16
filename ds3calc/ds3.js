function level(lv) {
  let x = lv + 1
  return Math.floor( 0.02 * x **3 + 3.06 * x **2 + 105.6 * x - 895 );
}

function levelMap(start, end) {
  let results = new Map();
  /*  The level formula is innacurate at levels < 12, 
  
  */
  let earlyGame = [0, 673, 689, 706, 723, 740, 757, 775, 793, 811, 829, 847]

  for (let i = start; i < end; i++) {
    if (i < 12 ) {
      results.set(i, earlyGame[i]);
    } else {
      results.set(i, level(i));
    }
  }
  
  return results;
}

function addRow(c1, c2, table) {  
  let newRow = table.insertRow(-1);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  
  cell1.innerHTML = c1;
  cell2.innerHTML = c2;
}

function tableWipe(table) {  
  while ( table.rows.length > 1) {
  	table.deleteRow(-1);
  }
}

function tableGen() {
  var start = Number(document.getElementById("startLvl").value);
  var end   = Number(document.getElementById("goalLvl").value);
  
  var tableRef = document.getElementById('daTable');
  
  if ( start && end && start >= 1 && start < end && end <= 802 ) {
    tableRef.style.display = 'table';
  	tableWipe(tableRef);
    
    var values = levelMap(start, end);
    var total = 0;

    for (let [id, value] of values) {
      total = total + value;
      addRow(id + "<span>→</span>" + (id+1), value.toLocaleString(), tableRef);
    }
    
    addRow("Total Souls", total.toLocaleString(), tableRef);
  }  
}

document.querySelectorAll('.textBox').forEach(item => {
  item.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {tableGen();}
	})
})