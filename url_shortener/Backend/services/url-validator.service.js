const isValidUrl = function(urlToTest) {
    if (typeof urlToTest !== 'string'){
        throw new TypeError("Invalid URL type detected!");
    }

    if (urlToTest.length == 0){
        return false;
    }

    let reg = RegExp("(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]");
    return reg.test(urlToTest);
}
  

module.exports = {
    isValidUrl
}