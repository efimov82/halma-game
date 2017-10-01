import * as mocha from 'mocha';
let chai = require("chai");
chai.should();


import * as supertest from 'supertest';
import HalmaGame from '../src/HalmaGame';

const size = 16;
let user1 = 1;

describe('HalmaGame', () => {
  
  it('init', () => {
    let game = new HalmaGame(size);
    let info = game.getInfo(1);
    info.matrix.size.should.equal(16 * 16);
    // correct init
    //console.log(info.matrix);
    
    info.matrix.get(1).should.equal(1);
    info.canMove.should.equal(true);
  })

  it('move to one cell', () => {
    let game = new HalmaGame(size);
    let res = game.move(user1, 65, 81);
    let info = game.getInfo(user1);
    

    res.should.eq(true);
    info.matrix.get(81).should.equal(1);
  })
});
