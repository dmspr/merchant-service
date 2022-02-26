const express = require('express');
const indexRouter = require('./app/routes')
const merchantRouter = require('./app/routes/merchantRoutes')
const productRouter = require('./app/routes/productRoutes')
const app = express()
const port = 3000

app.use(express.json())
app.use('/', indexRouter)
app.use('/', merchantRouter)
app.use('/', productRouter)

app.listen(port, () => {
    console.log(`server running at port ${port}`)
})

