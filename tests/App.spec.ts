import * as supertest from 'supertest'
import app from '../src/App'

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');


/*describe('App', () => {
  it('works', () =>
    supertest(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
  )
})*/  
