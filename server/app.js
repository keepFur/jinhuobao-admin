var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var ejs = require('ejs')

var indexRouter = require('./routes/index')
var userRouter = require('./routes/user')
var blogRouter = require('./routes/blog')
var groupRouter = require('./routes/group')
var todoRouter = require('./routes/todo')
var materialRouter = require('./routes/material')
var homeRouter = require('./routes/home')

var noticeRouter = require('./routes/notice')
var orderRouter = require('./routes/order')
var goodsRouter = require('./routes/goods')
var storeRouter = require('./routes/store')
var storeTypeRouter = require('./routes/store_type')
var goodsTypeRouter = require('./routes/goods_type')
var discountRouter = require('./routes/discount')
var promoteRouter = require('./routes/promote')
var incomeRouter = require('./routes/income')
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'static'))
app.engine('html', ejs.__express)
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: false, limit: '100mb' }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'static')))

app.use('/', indexRouter)
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)
app.use('/api/group', groupRouter)
app.use('/api/todo', todoRouter)
app.use('/api/material', materialRouter)
app.use('/api/home', homeRouter)

app.use('/api/notice', noticeRouter)
app.use('/api/order', orderRouter)
app.use('/api/goods', goodsRouter)
app.use('/api/store', storeRouter)
app.use('/api/storeType', storeTypeRouter)
app.use('/api/goodstype', goodsTypeRouter)
app.use('/api/discount', discountRouter)
app.use('/api/promote', promoteRouter)
app.use('/api/income', incomeRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
