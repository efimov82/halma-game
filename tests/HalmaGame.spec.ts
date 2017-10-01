import * as supertest from 'supertest'
import HalmaGame from '../src/HalmaGame'

// TODO tests for game
describe('App', () => {
  it('works', () =>
    supertest(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
  )
})
