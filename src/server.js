import express from 'express';
import driverRouter from "./driver/router/driverRouter";
const app = express();
let bodyParser = require('body-parser')
const port = 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});
app.use('/api/driver', driverRouter)

app.listen(port, () =>
    console.log(`Example app listening on port  ${port}!`),
);
