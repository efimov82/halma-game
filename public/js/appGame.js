

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBhBcdpgel1KSeHT1GloeC88Lm1xP-ntPk',
  authDomain: 'electric-game.firebaseapp.com',
  databaseURL: 'https://electric-game.firebaseio.com',
  projectId: 'electric-game',
  storageBucket: 'electric-game.appspot.com',
  messagingSenderId: '378243821019'
};

firebase.initializeApp(config);

var db = firebase.database();
var locate = window.location.href.split('/');
var key = locate[locate.length - 1];
//console.log(key);
var gameRef = db.ref('games/' + key);

gameRef.on('value', function(snapshot) {
  let data = snapshot.val();

  console.log(data.matrix);
  //console.log(JSON.parse('{"1":2, "3":2}'));
  
  renderGameField(data.matrix); // {1:2, 3:2}
});

