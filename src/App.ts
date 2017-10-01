import * as express from 'express'
//import electricGame from './electric-game';
import HalmaGame from './HalmaGame';

class App {
  public express;
  // public session;

  protected level : number;
  protected dateStart : Date;
  protected size : string;
  protected games = new Map < string,
  HalmaGame > ();

  constructor() {
    this.express = express();
    let session = require('express-session');

    this
      .express
      .use(express.static(__dirname + '/../public'));

    this
      .express
      .use(session({secret: 'secret-key234234', resave: false, saveUninitialized: true}));

    this.mountRoutes();
  }

  private mountRoutes() : void {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.render('pages/index', {games: this.games});
    });

    router.get('/start', (req, res) => {
      let session = req.session;
      var key = Math
        .random()
        .toString(36)
        .substring(2, 8);
      console.log(key);
      let newGame = new HalmaGame(16);
      this
        .games
        .set(key, newGame);
      // save session
      session.player_id = 1; // first player

      res.end(key);
    });

    router.get(/^\/(\w{6})\/join$/, (req, res) => {
      let key = req.params[0];
      let session = req.session;
      
      if (this.games.has(key)) {
        session.player_id = 2; // second player
        res.redirect('/' + key);
      } else {
        console.log('game not found');
        res.end(JSON.stringify('games not found'));
      }
    });

    router.get(/^\/(\w{6})$/, (req, res) => {
      let key = req.params[0];
      // console.log('key='+key); for (const entry of this.games.entries())
      // console.log(entry[0], entry[1]);

      if (this.games.has(key)) {
        res.render('pages/game');
      } else {
        res.render('pages/404');
      }
    });

    // game/ID/move/N - move=N game/ID -> info
    router.get(/^\/game\/(\w{6})\/(state|move)?\/(\d+)?$/, (req, res) => { // /^\/(game|page)\/(.+?)\/(info|move)?\/?(\d+)?/
      this.routeGame(req, res);
    });

    this
      .express
      .use('/', router);
  }

  protected routeGame(req, res) {
    let key = req.params[0];
    let action = req.params[1];
    let value = req.params[2];
    let session = req.session;

    if (this.games.has(key)) {
      let game = this
        .games
        .get(key);
      if (action == 'move') {
        game.move(session.player_id, value, 2);
      }

      let info = game.getInfo(session.player_id);
      // info['canMove'] = session.player_id;
      /*for (const entry of this.games.entries()) {
        console.log(entry[0], entry[1]);
      }*/

      res.end(JSON.stringify(info));
    } else {
      console.log('game not found');
      res.end(JSON.stringify('games not found'));
    }
  }
}

export default new App().express
