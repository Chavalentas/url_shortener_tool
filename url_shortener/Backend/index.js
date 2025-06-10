const backendConfig = require('./config/backend.config.json');
const dbConfig = require("./config/database.config.js")
const dbService = require('./services/database.service.js');
const urlRoutes = require('./routes/urls.route.js');
const loggerService = require('./services/logging.service.js')
const idGenerator = require("./services/id-generator.service.js")
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/urls', urlRoutes);
dbService.initialize().then(() => {
    const listener = app.listen(process.env.PORT || backendConfig.port, () => {
        loggerService.logInfo('The app is listening on port ' + listener.address().port);
    });
}, (error) => {
    throw error;
});