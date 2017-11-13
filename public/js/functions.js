const audio = new Audio('/sounds/click.wav');
let currentMode = 'move';
// const cell states
const CS_FREE = 1;
const CS_P1 = 2;
const CS_P2 = 3;


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

});


function doRequest(action, value = '', key2 = '') {
  let key = window.location.href.split('/');
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

function renderGameField(data) {
  data.map((val) => {
    // clear cell
    const cellId = '#cell-' + val[0];
    $(cellId).removeClass('p1');
    $(cellId).removeClass('p2');
    
    if (val[1] == CS_P1) {
      $(cellId).addClass('p1');
    } else if (val[1] == CS_P2) {
      $("#cell-" + val).addClass('p2');
    }
  });
}


function secondsToHms(d) {
  d = Number(d);

  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor(d % 3600 % 60);

  return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
}
