const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const debug = require('debug')('app:adminRouter');
const adminRouter = express.Router();
const { MongoClient } = require('mongodb');

const products = require('../data/newProducts.json');

adminRouter.route('/').get((req, res) => {
    //const url ='mongodb+srv://dbUser:P@ssw0rd@nodeexpresswebapp.vdeeu.mongodb.net/?retryWrites=true&w=majority';
    //const url ='mongodb+srv://dbUser:admin@cluster0.z72qg.mongodb.net/?retryWrites=true&w=majority';
    const url ='mongodb+srv://dbUser:dbUser@nodeexpresswebapp.cjz8n.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'NodeExpressWebApp';
    //const dbName = 'Cluster0';
    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('Connected to mongodb');

            const db= client.db(dbName);

            const response = await db.collection('products').insertMany(products);
            res.json(response);
        }
        catch(error){
            debug(error.stack);
        }
    }())

})

module.exports = adminRouter;