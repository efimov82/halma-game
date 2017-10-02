import * as mocha from 'mocha';
let chai = require("chai");
chai.should();


import * as supertest from 'supertest';
import HalmaGame from '../src/HalmaGame';

const size = 16;
let user1 = 1;
let user2 = 2;

describe('HalmaGame', () => {
  
  it('init', () => {
    let game = new HalmaGame(size);
    let info = game.getInfo(1);
    info.matrix.size.should.equal(16 * 16);
    
    info.matrix.get(1).should.equal(1);
    info.canMove.should.equal(true);
  })

  it('move to busy cell', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 65, 66);
    let info = game.getInfo(user1);

    info.canMove.should.equal(true, 'after fail move canMove eq true');
    info.countMoves.should.eq(0, 'countMoves should be 0');
  })

  it('move cell from other player', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 192, 176);
    let info = game.getInfo(user1);

    info.matrix.get(192).should.equal(user2, 'after move cell 65 should be equal 0');
    info.matrix.get(176).should.equal(0, 'after move cell 85 should be equal 1');
    info.canMove.should.equal(true, 'after fail move canMove eq true');
    info.countMoves.should.eq(0, 'countMoves should be 0');
  })

  //// LEFT Column ////////////////////////////
  it('move to one cell in left col', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 65, 81);
    let info = game.getInfo(user1);
    
    info.matrix.get(65).should.equal(0, 'after move cell 65 should be equal 0');
    info.matrix.get(81).should.equal(1, 'after move cell 85 should be equal 1');
    info.canMove.should.equal(false, 'after move canMove eq false');
    info.countMoves.should.eq(1);
  })

  it('move with single jump in left col', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 49, 81);
    let info = game.getInfo(user1);

    info.matrix.get(49).should.equal(0, 'after move cell 49 should be equal 0');
    info.matrix.get(81).should.equal(1, 'after move cell 81 should be equal 1');
    info.canMove.should.equal(false, 'after success move canMove should be eq false');
    info.countMoves.should.eq(1, 'countMoves should be 1');
  })

//// RIGHT Column ////////////////////////////
  it('move to one cell in right col', () => {
    let game = new HalmaGame(size);
    // first move
    game.move(user1, 49, 81);

    let res = game.move(user2, 192, 176);
    let info = game.getInfo(user2);
    
    info.matrix.get(192).should.equal(0, 'after move cell 192 should be equal 0');
    info.matrix.get(176).should.equal(user2, 'after move cell 176 should be equal 1');
    info.canMove.should.equal(false, 'after move canMove eq false');
    info.countMoves.should.eq(2);
  })

  it('move with single just in right col', () => {
    let game = new HalmaGame(size);
    // first move
    game.move(user1, 49, 81);

    let res = game.move(user2, 208, 176);
    let info = game.getInfo(user2);
    
    info.matrix.get(208).should.equal(0, 'after move cell 192 should be equal 0');
    info.matrix.get(176).should.equal(user2, 'after move cell 176 should be equal 1');
    info.canMove.should.equal(false, 'after move canMove eq false');
    info.countMoves.should.eq(2);
  })

  it('move to one cell in first line', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 5, 6);
    let info = game.getInfo(user1);

    info.matrix.get(5).should.equal(0, 'after move cell 5 should be equal 0');
    info.matrix.get(6).should.equal(1, 'after move cell 6 should be equal 1');
    info.canMove.should.equal(false, 'after success move canMove should be eq false');
    info.countMoves.should.eq(1, 'countMoves should be 1');
  })

  it('move single jump in first line', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 4, 6);
    let info = game.getInfo(user1);

    info.matrix.get(4).should.equal(0, 'after move cell 4 should be equal 0');
    info.matrix.get(6).should.equal(1, 'after move cell 6 should be equal 1');
    info.canMove.should.equal(false, 'after success move canMove should be eq false');
    info.countMoves.should.eq(1, 'countMoves should be 1');
  })

  it('move to one cell in last line', () => {
    let game = new HalmaGame(size);
    // first move
    game.move(user1, 49, 81);

    let res = game.move(user2, 252, 251);
    let info = game.getInfo(user2);
    
    info.matrix.get(252).should.equal(0, 'after move cell 252 should be equal 0');
    info.matrix.get(251).should.equal(user2, 'after move cell 251 should be equal 1');
    info.canMove.should.equal(false, 'after move canMove eq false');
  })

  it('move single jump in last line', () => {
    let game = new HalmaGame(size);
    // first move
    game.move(user1, 49, 81);

    let res = game.move(user2, 253, 251);
    let info = game.getInfo(user2);
    
    info.matrix.get(253).should.equal(0, 'after move cell 253 should be equal 0');
    info.matrix.get(251).should.equal(user2, 'after move cell 251 should be equal 1');
    info.canMove.should.equal(false, 'after move canMove eq false');
  })

/////////////// Corners //////////////////////////////
  it('move single in first corner', () => {
  })

  it('single jump in first corner', () => {
  })
  // second corner
  it('move single in second corner', () => {
  })

  it('single jump in second corner', () => {
  })

  // third corner
  it('move single in third corner', () => {
  })

  it('single jump in third corner', () => {
  })

  // fourth corner
  it('move single in fourth corner', () => {
  })

  it('single jump in fourth corner', () => {
  })
  

//// Moves in the MIDDLE ////////////////////////////
  it('move in middle', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 36, 52);
    let info = game.getInfo(user1);

    info.matrix.get(36).should.equal(0, 'after move cell 36 should be equal 0');
    info.matrix.get(52).should.equal(user1, 'after move cell 52 should be equal 1');
    info.canMove.should.equal(false, 'after success move canMove should be eq false');
    info.countMoves.should.eq(1, 'countMoves should be 1');
  })

  it('single jump in middle down', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 20, 52);
    let info = game.getInfo(user1);

    info.matrix.get(20).should.equal(0, 'after move cell 20 should be equal 0');
    info.matrix.get(52).should.equal(user1, 'after move cell 52 should be equal 1');
    info.canMove.should.equal(false, 'after success move canMove should be eq false');
    info.countMoves.should.eq(1, 'countMoves should be 0');
  })

  it('single jump in middle to right', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 50, 52);
    let info = game.getInfo(user1);

    info.matrix.get(50).should.equal(0, 'after move cell 20 should be equal 0');
    info.matrix.get(52).should.equal(user1, 'after move cell 52 should be equal 1');
    info.canMove.should.equal(false, 'after success move canMove should be eq false');
    info.countMoves.should.eq(1, 'countMoves should be 0');
  })

  it('single jump in middle to up', () => {
    let game = new HalmaGame(size);
    // first
    game.move(user1, 50, 52);
    let res = game.move(user2, 222, 190);
    let info = game.getInfo(user2);

    info.matrix.get(222).should.equal(0, 'after move cell 222 should be equal 0');
    info.matrix.get(190).should.equal(user2, 'after move cell 190 should be equal 1');
    info.canMove.should.equal(false, 'after success move canMove should be eq false');
  })

  it('single jump in middle to left', () => {
    let game = new HalmaGame(size);
    // first
    game.move(user1, 50, 52);
    let res = game.move(user2, 207, 205);
    let info = game.getInfo(user2);

    info.matrix.get(207).should.equal(0, 'after move cell 222 should be equal 0');
    info.matrix.get(205).should.equal(user2, 'after move cell 190 should be equal 1');
    info.canMove.should.equal(false, 'after success move canMove should be eq false');
  })

//////// JUMPS getAllAvailableCellsForJump() //////////////////////////////////////
  it('list jumps in first line ', () => {
    let game = new HalmaGame(size);
    game.move(user1, 35, 67);
    game.move(user2, 222, 220);
    game.move(user1, 67, 83);
    
    let expectJumps = [35, 37, 67, 99];
    let matrix = game.getMatrix();

    let jumps = game.getAllAvailableCellsForJump(3, []);
    jumps.should.eql(expectJumps, 'list jumps for 3 cell not eq [35, 37, 67, 99]');
  });

  it('jump in middel cell near the edge of the field', () => {
    let game = new HalmaGame(size);
    game.move(user1, 35, 67);
    game.move(user2, 222, 220);
    game.move(user1, 67, 83);
    
    let expectJumps = [35, 37, 67, 99];
    let jumps = game.getAllAvailableCellsForJump(3, []).sort();
    jumps.should.eql(expectJumps);
  });

  it('jump many variants', () => {
    let game = new HalmaGame(size);
    game.move(user1, 35, 67);
    game.move(user2, 222, 220);
    game.move(user1, 67, 83);
    game.move(user2, 254, 190);
    game.move(user1, 65, 81);
    game.move(user2, 208, 176);

    let expectJumps = [35, 37, 65, 67, 97, 99];
    let jumps = game.getAllAvailableCellsForJump(33, []).sort();
    jumps.should.eql(expectJumps);
  });

});
