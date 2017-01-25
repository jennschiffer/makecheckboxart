(function(){
  // set these items:
  const rowCount = 10;
  const columnCount = 10;
  const initialDrawingJSONString = '[{"x":"4","y":"8"},{"x":"5","y":"1"}]';
  
  // edit the rest of this code ~*at your own risk*~
  const canvas = document.getElementById('grid');
  const jsonTextarea = document.getElementById('json');
  const checkboxesArray = JSON.parse(initialDrawingJSONString) || [];
  
  const onCanvasClick = function(e) {
    var e = window.e || e;
    if (e.target.tagName !== 'INPUT') {
      return;
    }
    
    const posArr = e.target.getAttribute('data-position').split('_');
    if (e.target.checked) {
      checkboxesArray.push({
        x: posArr[0],
        y: posArr[1],
      });
    } else {
      const removeIndex = checkboxesArray.indexOf({
        x: posArr[0],
        y: posArr[1],
      });
      checkboxesArray.splice(removeIndex, 1);
    }
    console.log(JSON.stringify(checkboxesArray))
    jsonTextarea.value = JSON.stringify(checkboxesArray);
  }
  
  const initGrid = function(rows, cols){
    for (let i = 0; i < rows; i++) {
      const newRow = document.createElement('div');
      for (let j = 0; j < cols; j++) {
        const newCheck = document.createElement('input');
        newCheck.setAttribute('type', 'checkbox');
        newCheck.setAttribute('data-position', `${i}_${j}`)
        checkboxesArray.forEach(({x, y}) => {
          if ( x == i && y == j ) {
            newCheck.checked = true;
          }
        });
        newRow.appendChild(newCheck);
      }
      canvas.appendChild(newRow);
    }
  }
  
  initGrid(rowCount, columnCount);
  jsonTextarea.value = initialDrawingJSONString || ''

  // listen for clicks 2 draw
  if (canvas.addEventListener) {
    canvas.addEventListener('click', onCanvasClick, false);
  }
  else {
    canvas.attachEvent('onclick', onCanvasClick);
  }
})()
