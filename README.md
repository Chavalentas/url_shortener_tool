# url_shortener_tool
Represents a simple tool for shortening URLs. <br/>
Everyone has sometimes encountered the problem of having to type in long URLs. <br/>
This tool generates a shortened version of the URL. <br/>
You can create a file where you store all the shortened URLs. <br/>
The underlying database is a Redis key-value store. <br/>


## Used technologies
![React](https://shields.io/badge/react-black?logo=react&style=for-the-badge) ![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge) ![Axios](https://img.shields.io/badge/axios-green?style=for-the-badge&logo=axios)
 ![HTML](https://img.shields.io/badge/html-%23d4b655?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/css-orange?style=for-the-badge&logo=css3) ![Node.js](https://img.shields.io/badge/node.js-lightblue?style=for-the-badge&logo=node.js) ![Express](https://img.shields.io/badge/express-%2317191a?style=for-the-badge&logo=express) ![JavaScript](https://img.shields.io/badge/javascript-yellow?style=for-the-badge&logo=javascript)
![Redis](https://img.shields.io/badge/redis-%23abb9cf?style=for-the-badge&logo=redis)
</br>
Following technology stack was used:
* **Frontend**: React
* **Backend**: Node.js (with Express)
* **Database**: Redis (official Docker image: https://hub.docker.com/_/redis)

## Guide
* Start your Redis instance (either standalone or using Docker)
* Start the [backend](./url_shortener/Backend) application (configure all necessary information [here](./url_shortener/Backend/config))
* Start the [frontend](./url_shortener/Frontend) application (configure all necessary information [here](./url_shortener/Frontend/url_shortener_frontend/src/config))
* Generate a shortened URL and paste in a new window
![Step1](./img/step1.png)