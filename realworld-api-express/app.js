// 0. 加载 Express
const express = require("express");
const https = require("https");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/error-handle")
require('./model')


const PORT = process.env.PORT || 80

// 1. 调用 express() 得到一个 app
//    类似于 http.createServer()
const app = express();
app.use(express.static('./public'))
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
    });

app.use('/api',router);
app.use(morgan('dev'))


//挂载统一处理服务段错误中间件
app.use(errorHandler())


// 3. 监听端口号，启动 Web 服务
app.listen(PORT, () => console.log(`serve is run at http://localhost:${PORT} !`));
const httpsOption = {
    key : fs.readFileSync("./https/private.pem"),
    cert : fs.readFileSync("./https/file.crt"),
    passphrase: '123456'
    }
    https.createServer(httpsOption, app).listen(443);
