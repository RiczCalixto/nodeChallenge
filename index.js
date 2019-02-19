const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const middleware = (req, res, next) => {
  const { userAge } = req.query
  if (!userAge) {
    return res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.get('/major', middleware, (req, res) => {
  const { userAge } = req.query
  return res.render('major', { userAge })
})

app.get('/minor', middleware, (req, res) => {
  const { userAge } = req.query
  return res.render('minor', { userAge })
})

app.post('/check', (req, res) => {
  const { userAge } = req.body
  if (userAge >= 18) {
    return res.redirect(`/major?userAge=${userAge}`)
  }
  return res.redirect(`/minor?userAge=${userAge}`)
})

app.listen(3000)
