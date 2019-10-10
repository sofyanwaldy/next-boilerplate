const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// const middleware = require('./middleware/counter')
const routes = require('./routes')
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()
  // server.use(async (req, res, next) => {
  //   req.mid = 'midleware is run'
  //   // middleware(req)
  //   next()
  // })
  server.use(handler)
  // server.get('/:slug', (req, res) => {
  //   return app.render(req, res, '/slug', { slug: req.params.slug })
  // })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})