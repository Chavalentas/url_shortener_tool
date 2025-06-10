const dbService = require("../services/database.service.js");
const loggerService = require("../services/logging.service.js");
const urlValidatingService = require("../services/url-validator.service.js");
const idGeneratorService = require("../services/id-generator.service.js");
const urlConfig = require('../config/url-key.config.json');
const dbConfig = require('../config/database.config.js');

//POST '/newurl'
const storeUrlRequest = async(req, res) => {
    try
    {    
        if (req.body.newUrl === undefined || req.body.newUrl === null || req.body.newUrl === ''){
            throw new Error('The property req.body.newUrl was not defined or was null!');
        }

        let isValidUrl = urlValidatingService.isValidUrl(req.body.newUrl);

        if (!isValidUrl){
            res.status(404).json({message : 'Invalid URL detected!'});
            return;
        }

        let keys = await dbService.getKeys(dbConfig.urlHashName);
        let newUrlKey = idGeneratorService.generateIdExcept(keys, urlConfig.keyLength);
        dbService.storeNewUrl(dbConfig.urlHashName, newUrlKey, req.body.newUrl).then(() => {
            res.status(201).json({urlKey: newUrlKey, url: req.body.newUrl});
        }).catch((err) => {
            res.status(500).json({message : 'The store URL operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The store URL operation failed: ' + e.message});
    }
};

//GET '/:urlKey'
const getUrlRequest = async(req, res) => {
    try
    {  
        if (req.params.urlKey === undefined || req.params.urlKey === null || req.params.urlKey === ''){
            throw new Error('The property req.params.url was not defined or was null!');
        }

        let exists = await dbService.doesKeyExist(dbConfig.urlHashName, req.params.urlKey);

        if (!exists){
            res.status(404).json({message : 'Invalid URL key detected!'});
            return;
        }

        let url = await dbService.getUrl(dbConfig.urlHashName, req.params.urlKey);
        res.status(200).json({url: url});
    } catch (e){
        res.status(500).json({message : 'The get URL operation failed: ' + e.message});
    }
};

//export controller functions
module.exports = {
    storeUrlRequest,
    getUrlRequest
};