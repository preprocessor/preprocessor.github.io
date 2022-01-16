function level(lv) {
  let x = lv + 1
  /* The level formula wants the target level, but our math gives the current level, so we +1 *
   * I got this math from the wiki but some levels seem to be off by a few souls              */
  return Math.floor( 0.02 * x **3 + 3.06 * x **2 + 105.6 * x - 895 );
}

function levelMap(start, end) {
  let results = new Map();
  /* * * * * * * * * * * * * * * * * * * * * * * * * *
   * The level formula is innacurate at levels < 12, *
   * so instead we put lvs 1-12 into an array and    *
   * loop through those when < 12                    *
   * * * * * * * * * * * * * * * * * * * * * * * * * */
  let earlyGame = [0, 673, 689, 706, 723, 740, 757, 775, 793, 811, 829, 847]
                /* └─array indexes start at [0] but our loop counts from 1 *
                 *   so we insert a 0 at the start to shift the index up 1 */
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
  let newRow = table.insertRow(-1), // create a new row at the end of the table
      cell1 = newRow.insertCell(0),
      cell2 = newRow.insertCell(1); // insert the cells into the row

  cell1.innerHTML = c1;
  cell2.innerHTML = c2;             // populate the cells
}

function tableWipe(table) {
  while ( table.rows.length > 1) {
    table.deleteRow(-1);
  }
}

function tableGen() {
  // using parseInt() removes decimals and returns NaN if given a string
  var start = parseInt(document.getElementById("startLvl").value),
      end   = parseInt(document.getElementById("goalLvl").value),
      tableRef = document.getElementById('daTable');

  if ( start && end && start >= 1 && start < end && end <= 802 ) { // makes sure that inputs exist and make sense
    tableRef.style.display = 'table';                              // unhide the table on first run
    tableWipe(tableRef);                                           // clear the table if its populated

    let values = levelMap(start, end),
        total = 0;

    for (let [id, value] of values) {
      total += value;
      addRow(id + "<span>→</span>" + (id+1), value.toLocaleString(), tableRef);
    }

    addRow("Total Souls", total.toLocaleString(), tableRef);
  }
}

function enterSubmit () {
  document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {tableGen();}
    })
  })
}