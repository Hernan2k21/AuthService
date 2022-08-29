const morgan = require("morgan");

const setupLogger = (app) => {
    app.use(morgan('combined'));
}

module.exports = setupLogger