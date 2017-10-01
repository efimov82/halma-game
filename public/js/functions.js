const audio = new Audio('/sounds/click.wav');
let currentMode = 'move';
// const
const LS_OFF = 1;
const LS_ON = 2;
const LS_OFF_FREEZED = 5;
const LS_ON_FREEZED = 6;
// dificults
const DIFFICULTYS = {
  1: 'EASY',
  2: 'NORMAL',
  3: 'HARD'
};

$(function () {
  window.gameCounter = new flipCounter('flip-counter', {
    value: 0,
    auto: false
  });
  doRequest('state');

  setInterval(() => {
    const time = parseInt($('#timePlay').text()) + 1;
    $('#timePlay').text(time);
    $('#timePlaySpan').text(secondsToHms(time));
  }, 1000);

  setMode(currentMode);

  $('[data-toggle="tooltip"]').tooltip();
});

/*
gameRef.once('value').then(function(snapshot) {
  //var email = snapshot.val().email;

  console.log('val='+snapshot.val());
});*/

function doMove (gameCounter, number) {
  doRequest(currentMode, number);
}

function setMode (mode) {
  currentMode = mode;

  var ids = ['btnModeNormal', 'btnModeFreeze', 'btnModeVline', 'btnModeGline', 'btnModeCross'];
  ids.map(value => {
    $("#" + value).prop('disabled', false);
    $("#" + value).removeClass('btn-warning');
  });

  if (mode == 'move') {
    $("#btnModeNormal").addClass('btn-warning');
  }

  if (mode == 'freeze') {
    //$("#btnModeFreeze").prop('disabled', true);
    $("#btnModeFreeze").addClass('btn-warning');
  }

  if (mode == 'vline') {
    $("#btnModeVline").addClass('btn-warning');
  }

  if (mode == 'gline') {
    $("#btnModeGline").addClass('btn-warning');
  }

  if (mode == 'cross') {
    $("#btnModeCross").addClass('btn-warning');
  }
}

function doRequest (action, value = '', key2 = '') {
  let key = window
    .location
    .href
    .split('/');
  $.ajax({
    url: '/game/' + key.slice(-1).pop() + '/' + action + '/' + value
  }).done((responce) => {
    // console.log('responce='+responce);
    const data = JSON.parse(responce);
    console.log(data);
    renderGameField(data.matrix);
    renderGameInfo(data);

    if (window.gameCounter.getValue() !== data.countMoves) {
      gameCounter.add(1);
      audio.play();
    }
    window
      .gameCounter
      .setValue(data.countMoves);

    if (data.status == 'finished') {
      $('#player_name').val(data.player_name);
      $('#modalSave').modal('show');
    }
  });
}

function renderGameField (data) {
  data.map((val) => {
    // clear cell
    // console.log(val[1]);
    const cellId = '#cell-' + val[0];
    $(cellId).removeClass('lightOn');
    $(cellId).removeClass('lightOnFreezed');
    $(cellId).removeClass('lightOffFreezed');

    if (val[1] == LS_ON) {
      $(cellId).addClass('lightOn');
    } else if (val[1] == LS_ON_FREEZED) {
      $("#cell-" + val).addClass('lightOnFreezed');
    } else if (val[1] == LS_OFF_FREEZED) {
      $("#cell-" + val).addClass('lightOffFreezed');
    }
  });
}

/**
 *
 * @param {array} data [difficulty, status, timeStart, countFreezes]
 * @returns {void}
 */
function renderGameInfo (data) {
  $('#difficultyLevel').text(DIFFICULTYS[data.difficulty]);
  $('#countFreeze').text(data.countFreezes);
  $('#timePlay').text(data.timePlay);
  $('#canMove').text(data.canMove);
}

function saveWinner () {
  var name = $('#player_name').val();
  doRequest('save', name);
  document.location = '/top.php';
}

function secondsToHms (d) {
  d = Number(d);

  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor(d % 3600 % 60);

  return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
}
