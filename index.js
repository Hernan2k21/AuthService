const express = require("express"); 
const {port} = require('./config/app.config')['server']
const {logError, sendError, notFound} = require('./src/Middlewares')
const setupLogger = require('./src/Helpers/setupLogger')
const initDatabase = require('./src/Helpers/database')
const {initRedis}= require('./src/Helpers/redis')
const app = express(); 

app.use(
    express.json({
        limit: '50mb',
    })
);

setupLogger(app)
const routes = require('./src/Routes');

app.get("/health", async (req, res) => { 
    res.status(200).send('ok')
}); 

app.use('/v1', routes)
app.use(logError)
app.use(sendError)
app.use(notFound)

 initDatabase()
 initRedis()
app.listen(port, () => { 
    console.log(`Auth API is listening on port ${port}`); 
});