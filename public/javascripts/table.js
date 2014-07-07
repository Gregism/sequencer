var Sequencer = Sequencer || {};

Sequencer.Table = (function(){
  var tableRows = 1,
      tableSteps = 8;

  function buildTable(rows, steps){
    var stepHtml, 
        rowHtml;

    if(steps && steps!== tableSteps){
      tableSteps = steps;
    }

    if(rows && rows!== tableRows){
      tableRows = rows;
    }

    stepHtml = createRow();

    for (var i = 0; i < tableRows; i++) {
      rowHtml += '<tr>';
      rowHtml += stepHtml;
      rowHtml += '</tr>';
    }

    $('[data-bind-rows]').val(tableRows);
    $('[data-bind-steps]').val(tableSteps);

    return rowHtml;
  }

  function createRow(){
    var stepHtml;
    for (var i = 0; i < tableSteps; i++) {
      stepHtml += '<td />';
    }

    return stepHtml;
  }

  function addRow(target){
    tableRows++;
    $(target).find('tbody').append('<tr>' + createRow()+ '</tr>');
    $('[data-bind-rows]').val(tableRows);
  }

  function deleteRow(target){
    if($(target).find('tr').length > 1){
      tableRows--;
      $(target).find('tr').last().remove();
      $('[data-bind-rows]').val(tableRows);
    }
  }

  function addStep(target){
    tableSteps++;
    $(target).find('tr').append('<td />');
    $('[data-bind-steps]').val(tableSteps);
  }

  function deleteStep(target){
    if(tableSteps > 1) {
      tableSteps--;
      $.each($(target).find('tr'), function(){
          $(this).find('td').last().remove();
      });
      $('[data-bind-steps]').val(tableSteps);
    }
  }

  function inputRows(target, newVal){
    var i, len = Math.abs(newVal-tableRows);

    if(newVal === tableRows) return false;
    if(newVal-tableRows>0) addSub = addRow;
    if(newVal-tableRows<0) addSub = deleteRow;


    for(i = 0; i < len; i++){
      addSub(target);
    }
  }

  function inputSteps(target, newVal){
    var i, len = Math.abs(newVal-tableSteps);

    if(newVal === tableRows) return false;
    if(newVal-tableSteps>0) addSub = addStep;
    if(newVal-tableSteps<0) addSub = deleteStep;


    for(i = 0; i < len; i++){
      addSub(target);
    }
  }

  return{
    buildTable: buildTable,
    addRow: addRow,
    deleteRow: deleteRow,
    addStep: addStep,
    deleteStep: deleteStep,
    inputRows: inputRows,
    inputSteps: inputSteps
  };
}());