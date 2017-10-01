/**
 * Main class with game logic
 *
 * @description https://ru.wikipedia.org/wiki/%D0%A5%D0%B0%D0%BB%D0%BC%D0%B0
 * @author Danil Efimov <efimov@gmail.com>
 * @version 0.1
 */
class HalmaGame {
  static readonly ST_FREE = 0;
  static readonly ST_P1 = 1;
  static readonly ST_P2 = 2;

  protected playerIdMove = 1;
  protected countMoves = 0;
  protected matrix : Map < string,
  number >;

  // 16×16 = 19, 10x10 = 15, 8x8 = 10
  constructor(protected size : number = 16) {
    this.matrix = new Map < string,
    number > ();
    for (let i = 1; i <= this.size * this.size; i++) {
      this
        .matrix
        .set(i.toString(), HalmaGame.ST_FREE);
    }
    this.fill();
  }

  public getInfo(playerId : number) {
    // let time = Date.now() - this.timeStart;

    return {
      matrix: [...this.matrix],
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

  public getMatrix() : Map < string, number > {
    return this.matrix;
  }

  protected canMove(playerId : number, from : number, to : number) : boolean {
    let res = false;

    return res;
  }

  protected applyMove(playerId : number, from : number, to : number) {
    this
      .matrix
      .set(from.toString(), HalmaGame.ST_FREE);
    this
      .matrix
      .set(to.toString(), playerId); // TODO use ST_*
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
          this.matrix[num.toString(),
            HalmaGame.ST_P1];
        });

        player2.forEach(num => {
          this.matrix[num.toString(),
            HalmaGame.ST_P2];
        });
        break;
        //TODO 10, 8
    }
  }
}

export default HalmaGame;