/**
 * Main class with game logic
 *
 * @description https://ru.wikipedia.org/wiki/%D0%A5%D0%B0%D0%BB%D0%BC%D0%B0
 * @author Danil Efimov <efimov82@gmail.com>
 * @version 0.2
 */
class HalmaGame {
  static readonly ST_FREE = 0;
  static readonly ST_P1 = 1;
  static readonly ST_P2 = 2;

  protected playerIdMove = 1;
  protected players = [];
  protected countMoves = 0;
  protected matrix : Map < number,
  number >;

  // 16×16 = 19, 10x10 = 15, 8x8 = 10
  constructor(protected size : number) {
    this.matrix = new Map < number,
    number > ();
    for (let i = 1; i <= this.size * this.size; i++) {
      this
        .matrix
        .set(i, HalmaGame.ST_FREE);
    }
    this.fill();
  }

  public getInfo(playerId : number) {
    // let time = Date.now() - this.timeStart;

    return {
      matrix: this.matrix,
      size: this.size,
      countMoves: this.countMoves,
      canMove: this.playerIdMove == playerId
    };
  }

  public move(playerId : number, from : number, to : number) : boolean {
    if(this.playerIdMove !== playerId) {
      return false;
    }

    if (!this.canMove(playerId, from, to)) {
      return false;
    }

    let path = this.applyMove(playerId, from, to);
    this.countMoves++;
    this.playerIdMove = (this.playerIdMove == 1)
      ? 2
      : 1;
    return true;
  }

  public getMatrix() : Map < number,
  number > {
    return this.matrix;
  }

  protected canMove(playerId : number, from : number, to : number) : boolean {
    if(this.matrix.get(from) !== playerId) 
      return false;
    
    if (this.matrix.get(to) !== HalmaGame.ST_FREE) 
      return false;
    
    let availableCells1 = this.getAvailableCellsNear(from);
    //console.log(availableCells1);
    let availableCells2 = this.getAllAvailableCellsForJump(from, []);
    //console.log(availableCells2);

    return (availableCells1.indexOf(to) !== -1) || (availableCells2.indexOf(to) !== -1);
  }


  public getAllAvailableCellsForJump(num : number, exclude : Array < number >, debug: boolean = false) : Array < number > {
    let jumps = this.getAvailableCellsJump(num);
    if (debug)
      console.log('getAllAvailableCellsForJump('+num+', ['+exclude+'])');

    let unic_jumps = jumps.filter( item => exclude.indexOf(item) === -1);
    if (unic_jumps.length == 0)
      return [];

    if (debug)
      console.log('unic=['+unic_jumps+']');

    let exc2 = jumps.concat(exclude);
    exc2.push(num);
    let res = unic_jumps;
    unic_jumps.forEach( (cell, index) => {
      if (debug) console.log('res before=['+res+']');
      
      res = res.concat(this.getAllAvailableCellsForJump(cell, exc2, debug));

      if (debug) console.log('res after=['+res+']');
    });

    if (debug) {
      console.log('res('+num+')=['+res+']');
      console.log('-----------------------');
    }
    return this.uniqueArray(res);
  }


  protected getAvailableCellsJump(num : number) : Array < number > {
    let res = [];
    if (this.isItCorner(num)) {
      res = this.getCellsForCorner(num, true);
    } else if (this.isItLeftCol(num)) {
      res = this.getCellsForLeftCol(num, true);
    } else if (this.isItRightCol(num)) {
      res = this.getCellsForRightCol(num, true);
    } else if (this.isItFirsLine(num)) {
      res = this.getCellsForFirstLine(num, true);
    } else if (this.isItLastLine(num)) {
      res = this.getCellsForLastLine(num, true);
    } else {
      res = this.getCellsForMiddle(num, true);
    }

    return res;
  }

  public getAvailableCellsNear(num : number) : Array < number > {
    let res = [];
    if (this.isItCorner(num)) {
      res = this.getCellsForCorner(num, false);
    } else if (this.isItLeftCol(num)) {
      res = this.getCellsForLeftCol(num, false);
    } else if (this.isItRightCol(num)) {
      res = this.getCellsForRightCol(num, false);
    } else if (this.isItFirsLine(num)) {
      res = this.getCellsForFirstLine(num, false);
    } else if (this.isItLastLine(num)) {
      res = this.getCellsForLastLine(num, false);
    } else {
      res = this.getCellsForMiddle(num, false);
    }

    return res;
  }

  protected getCellsForCorner(num : number, jump : boolean) : Array < number > {
    let res = [];
    let r,
      r2,
      d,
      d2: number;
    if (num == 1) { // left up
      r = num + 1;
      r2 = num + 2;
      d = num + this.size;
      d2 = num + this.size * 2;

    } else if (num == this.size) { // right up
      r = num - 1;
      r2 = num - 2;
      d = num + this.size;
      d2 = num + this.size * 2;

    } else if (num == this.size * this.size) { // right down
      r = num - 1;
      r2 = num - 2;
      d = num - this.size;
      d2 = num - this.size * 2;

    } else { // left down
      r = num + 1;
      r2 = num + 2;
      d = num - this.size;
      d2 = num - this.size * 2;
    }

    // check free
    if (!jump) {
      if (this.matrix.get(r) == HalmaGame.ST_FREE) {
        res.push(r);
      }
    } else {
      if (this.matrix.get(r) !== HalmaGame.ST_FREE && (this.matrix.get(r2) == HalmaGame.ST_FREE)) {
        res.push(r2);
      }
    }

    if (!jump) {
      if (this.matrix.get(d) == HalmaGame.ST_FREE) {
        res.push(d);
      }
    } else {
      if ((this.matrix.get(d) !== HalmaGame.ST_FREE) && (this.matrix.get(d2) == HalmaGame.ST_FREE)) {
        res.push(d2);
      }
    }

    return res;
  }

  protected getCellsForLeftCol(num : number, jump : boolean) : Array < number > {
    let n = num + 1;
    let n2 = num + 2;
    let u = num - this.size;
    let u2 = num - this.size * 2;
    let d = num + this.size;
    let d2 = num + this.size * 2;

    return this._getResForCellInCol(n, n2, u, u2, d, d2, jump);
  }

  /**
   * Get cell around cell in Left-Right col. Check for free and with jump if need
   * 
   * @param n next cell
   * @param n2 nex with jump
   * @param u up cell
   * @param u2 up with jump
   * @param d down cell
   * @param d2 down cell with jump
   * @param jump need to jump
   */
  protected _getResForCellInCol(n: number, n2: number, u: number, u2: number, d: number, d2: number, jump : boolean)  : Array < number > {
    let res = new Array < number > ();
    if (!jump) {
      if (this.matrix.get(n) == HalmaGame.ST_FREE) {
        res.push(n);
      }
      if (this.matrix.get(u) == HalmaGame.ST_FREE) {
        res.push(u);
      }
      if (this.matrix.get(d) == HalmaGame.ST_FREE) {
        res.push(d);
      }
    } else {
      if (this.matrix.get(n) !== HalmaGame.ST_FREE && (this.matrix.get(n2) == HalmaGame.ST_FREE)) {
        res.push(n2);
      }
      if (this.matrix.get(u) !== HalmaGame.ST_FREE && (this.matrix.get(u2) == HalmaGame.ST_FREE)) {
        res.push(u2);
      }
      if (this.matrix.get(d) !== HalmaGame.ST_FREE && (this.matrix.get(d2) == HalmaGame.ST_FREE)) {
        res.push(d2);
      }
    }
    return res;
  }

  protected getCellsForRightCol(num : number, jump : boolean) : Array < number > {
    let n = num - 1;
    let n2 = num - 2;
    let u = num - this.size;
    let u2 = num - this.size * 2;
    let d = num + this.size;
    let d2 = num + this.size * 2;

    return this._getResForCellInCol(n, n2, u, u2, d, d2, jump);
  }

  protected getCellsForFirstLine(num : number, jump : boolean) : Array < number > {
    let n = num + 1;
    let n2 = num + 2;
    let prev = num - 1;
    let prev2 = num - 2;
    let d = num + this.size;
    let d2 = num + this.size * 2;

    return this._getResForCellInCol(n, n2, prev, prev2, d, d2, jump);

  }

  protected getCellsForLastLine(num : number, jump : boolean) : Array < number > {
    let n = num + 1;
    let n2 = num + 2;
    let prev = num - 1;
    let prev2 = num - 2;
    let d = num - this.size;
    let d2 = num - this.size * 2;

    return this._getResForCellInCol(n, n2, prev, prev2, d, d2, jump);
  }

  protected getCellsForMiddle(num : number, jump : boolean) : Array < number > {
    let next = num + 1;
    let next2 = num + 2;
    let prev = num - 1;
    let prev2 = num - 2;
    let up = num - this.size;
    let up2 = num - this.size * 2;
    let down = num + this.size;
    let down2 = num + this.size * 2;

    let res = new Array < number > ();
    if (!jump) {
      if (this.matrix.get(next) == HalmaGame.ST_FREE) {
        res.push(next);
      }
      if (this.matrix.get(prev) == HalmaGame.ST_FREE) {
        res.push(prev);
      }
      if (this.matrix.get(down) == HalmaGame.ST_FREE) {
        res.push(down);
      }
      if (this.matrix.get(up) == HalmaGame.ST_FREE) {
        res.push(up);
      }
    } else {
      if (this.matrix.get(next) !== HalmaGame.ST_FREE && (this.matrix.get(next2) == HalmaGame.ST_FREE)) {
        res.push(next2);
      }
      if (this.matrix.get(up) !== HalmaGame.ST_FREE && (this.matrix.get(up2) == HalmaGame.ST_FREE)) {
        res.push(up2);
      }
      if (this.matrix.get(down) !== HalmaGame.ST_FREE && (this.matrix.get(down2) == HalmaGame.ST_FREE)) {
        res.push(down2);
      }
      if (this.matrix.get(prev) !== HalmaGame.ST_FREE && (this.matrix.get(prev2) == HalmaGame.ST_FREE)) {
        res.push(prev2);
      }
    }
    return res;
  }

  protected isItCorner(num : number) : boolean {
    let arr = [
      1,
      this.size,
      (this.size * this.size) - this.size + 1,
      this.size * this.size
    ];
    return arr.indexOf(num) !== -1;
  }

  protected isItLeftCol(num : number) : boolean {
    return num % this.size == 1;
  }

  protected isItRightCol(num : number) : boolean {
    return num % this.size == 0;
  }

  protected isItFirsLine(num : number) : boolean {
    return num < this.size;
  }

  protected isItLastLine(num : number) : boolean {
    return num >= (this.size * (this.size - 1));
  }

  protected applyMove(playerId : number, from : number, to : number) {
    this
      .matrix
      .set(from, HalmaGame.ST_FREE);
    this
      .matrix
      .set(to, playerId);
  }

  protected fill() {
    switch (this.size) {
      case 16:
        let player1 = [
          1,
          2,
          3,
          4,
          5,
          17,
          18,
          19,
          20,
          21,
          33,
          34,
          35,
          36,
          49,
          50,
          51,
          65,
          66
        ];
        let player2 = [
          191,
          192,
          206,
          207,
          208,
          221,
          222,
          223,
          224,
          236,
          237,
          238,
          239,
          240,
          252,
          253,
          254,
          255,
          256
        ];
        player1.forEach(num => {
          this
            .matrix
            .set(num, HalmaGame.ST_P1);
        });

        player2.forEach(num => {
          this
            .matrix
            .set(num, HalmaGame.ST_P2);
        });
        break;
        //TODO 10, 8
    }
  }

  /**
   * get unique values
   * 
   * @param a 
   */

  protected uniqueArray(a) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    return a.filter(onlyUnique);
  }
}

export default HalmaGame;