var Sequencer = Sequencer || {};

Sequencer.Main = (function(){
  var grid,
    note = 8,
    bpm = 100,
    timing = (1000 * 60/(bpm*2)),
    timer = false,
    hihat = document.getElementById('hihat');

  //event handler
  $('#plus_row').on("click",function(){Sequencer.Table.addRow($('table'));});
  $('#minus_row').on("click",function(){Sequencer.Table.deleteRow($('table'));});

  $('#plus_step').on("click",function(){Sequencer.Table.addStep($('table'));});
  $('#minus_step').on("click",function(){Sequencer.Table.deleteStep($('table'));});

  $('table').on("click", 'td', function(){$(this).toggleClass('selected');});

  $(document).on("change", "[data-bind-rows]", function(){
    Sequencer.Table.inputRows($('table'),$("[data-bind-rows]").val());
  });

  $(document).on("change", "[data-bind-steps]", function(){
    Sequencer.Table.inputSteps($('table'),$("[data-bind-steps]").val());
  });

  function timerRun(){
    if( !timer ) {
        timer = setInterval(goNextCell, timing);
    }else{
        clearInterval(timer);
        timer = false;       
    }
  }

  $('table').html(Sequencer.Table.buildTable(4, 8));

  function reset(){
    $('table tr, table td').removeAttr('data-current');
    $('table').find('tr:first-child').attr('data-current', true);
    //$('table').find('tr:first-child').find('td:first-child').attr('data-selected', true);
}

function goNextCell(){
    var $targRowLast = $('tr[data-current] td:last-of-type'),
      $targCell = $('td[data-current]');
    
  if(!$targCell.length){
      $('table').find('tr:first-child').find('td:first-child').attr('data-current', true);
  }
  
  if($targRowLast.attr('data-current')){
      goNextRow();
  }

  if($targCell.hasClass('selected')){
    hihat.currentTime = 0;
    hihat.play();
  }

  $targCell.removeAttr('data-current');
  $targCell.next().attr('data-current', true);
}

function goNextRow(){
    var $targRowLast = $('tr:last-of-type'),
        $targRowOld = $('tr[data-current]');
    
   if($targRowLast.attr('data-current')){ 
       $targRowOld.removeAttr('data-current');
       $('tr').first().attr('data-current', true);
   }else{
       $targRowOld.removeAttr('data-current');
       $targRowOld.next().attr('data-current', true);   
   }
    
  $('tr[data-current] td').first().attr('data-current', true);
}

$('#pause').click(timerRun);
$('#reset').click(reset);

reset();
}());