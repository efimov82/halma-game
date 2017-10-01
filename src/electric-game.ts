class electricGame {
  protected level : number;
  protected timeStart : number;
  protected size : number;
  protected count: number = 0;
  protected playerIdMove = 1;
  protected matrix : Map < string, number >;
  // const ST_FREE: 1;

  constructor(level : number, size : number = 5) {
    this.level = level;
    this.size = size;
    this.timeStart = Date.now();

    this.init();
  }

  public getInfo(playerId: number) {
    let time = Date.now() - this.timeStart;
    
    return {matrix: [...this.matrix], 
      level: this.level, 
      time: time, 
      countMoves: this.count,
      canMove: this.playerIdMove == playerId}; // playerIdMove: this.playerIdMove
  }

  public move(playerId: number, num: string, val: number) {
    if (this.playerIdMove === playerId) {
      this.matrix.set(num, val);
      this.count++;
      this.playerIdMove = (this.playerIdMove == 1) ? 2 : 1; 
    }
  }

  public getLevel() : number {return this.level;}
  public getMatrix() : Map < string,number > {
    return this.matrix;
  }

  protected init() {
    this.matrix = new Map< string, number >();
    for (let i = 1; i <= this.size * this.size; i++) {
      this.matrix.set(i.toString(), 0);
    }
  }
}

export default electricGame;
