const dbConfig = require("../config/database.config.js");
const loggingService = require("../services/logging.service.js")
const redis = require("redis");

const initialize = async function(){
    return new Promise((resolve, reject) => {
        let client = redis.createClient({
            socket:{
                host: dbConfig.host,
                port: dbConfig.port
            }
        });
        
        client.connect().then((conn) => {
            conn.disconnect();
            resolve();
        })
    });
}

const getKeys = async function(hashName){
    return new Promise((resolve, reject) => {
        let client = redis.createClient({
            socket:{
                host: dbConfig.host,
                port: dbConfig.port
            }
        });
        
        client.connect().then((conn) => {
            conn.hKeys(hashName).then((keys) => {
                resolve(keys);
            }, (err) => {
                loggingService.logError(err);
                conn.disconnect();
                reject(err);
            })
        })
    });
}

const doesKeyExist = async function(hashName, urlKey){
    return new Promise((resolve, reject) => {
        let client = redis.createClient({
            socket:{
                host: dbConfig.host,
                port: dbConfig.port
            }
        });

        client.connect().then((conn) => {
            conn.hExists(hashName, urlKey).then((indicator) => {
                if (indicator == 0){
                    conn.disconnect();
                    resolve(false);
                    return;
                }

                resolve(true);
            }, (err) => {
                loggingService.logError(err);
                conn.disconnect();
                reject(err);
            })
        }, (err) => {
            loggingService.logError(err);
            conn.disconnect();
            reject(err);
        })
    });
}

const getUrl = async function(hashName, urlKey){
    return new Promise((resolve, reject) => {
        let client = redis.createClient({
            socket:{
                host: dbConfig.host,
                port: dbConfig.port
            }
        });
        
        client.connect().then((conn) => {
            doesKeyExist(hashName, urlKey).then((indicator) => {
                if (indicator == false){
                    conn.disconnect();
                    reject("The URL key does not exist!")
                    return;
                }

                conn.hGet(hashName, urlKey).then((url) => {
                    conn.disconnect();
                    resolve(url);
                }, (err) => {
                    loggingService.logError(err);
                    conn.disconnect();
                    reject(err);
                })
            }, (err) => {
                loggingService.logError(err);
                conn.disconnect();
                reject(err);
            })
        })
    })
}

const storeNewUrl = async function(hashName, urlKey, urlValue){
    return new Promise((resolve, reject) => {
        let client = redis.createClient({
            socket:{
                host: dbConfig.host,
                port: dbConfig.port
            }
        });

        
        client.connect().then((conn) => {
            doesKeyExist(hashName, urlKey).then((indicator) => {
                if (indicator == true){
                    conn.disconnect();
                    reject("The URL key already exists!")
                    return;
                }

                conn.hSet(hashName, urlKey, urlValue).then((val) => {
                    conn.disconnect();
                    resolve();
                }, (err) => {
                    conn.disconnect();
                    loggingService.logError(err);
                    reject(err);
                })
            }, (err) => {
                loggingService.logError(err);
                conn.disconnect();
                reject(err);
            })
        })
    })
}

module.exports = {
    initialize,
    getUrl,
    storeNewUrl,
    getKeys,
    doesKeyExist
}