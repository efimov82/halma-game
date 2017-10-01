import app from './App'

const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
