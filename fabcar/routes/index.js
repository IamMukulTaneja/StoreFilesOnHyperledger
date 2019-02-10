const app =module.exports= require('express')();
const query = require('../functions/queryPath');
const invoke = require('../functions/invokePath');
const fs = require('fs');
const crypto = require("crypto-js");
const path = require('path');
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");

app.use(fileUpload());

var secretKey = randomString.generate();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Connection Established, Please choose a service!' });
});

app.get('/query/:key/:aesKey/:iv', (req, res) => {
   query.query(req.params.key).then(function(result) {
   //var newResponse = Buffer.from(result.response, 'hex').toString('utf-8') 
     var bytes  = crypto.AES.decrypt(result.response, req.params.aesKey,{iv: req.params.iv});
     var plaintext = JSON.parse(bytes.toString(crypto.enc.Utf8));
     var data =  Buffer.from(plaintext.data,'utf-8');
     console.log(data);
     var object = {
        name: plaintext.name,
        mimetype: plaintext.mimetype,
        data : data
     }
     console.log(object);
   }).catch(err => res.status(500).json({ message: err.message }));
});

app.get('/invoke',  (req, res) => {
    res.render("FileUpload");
 });
 app.post('/invoke',  (req, res) => {
    let trialFile = req.files.trialFile;
    console.log(trialFile.data);
    let stringifyFile = JSON.stringify(trialFile);
    var hash = crypto.SHA1(stringifyFile);
    var data =  Buffer.from(trialFile.data).toString("hex");
    console.log(data);
    var object = {
      name: trialFile.name,
      mimetype: trialFile.mimetype,
      data: Buffer.from(trialFile.data).toString("hex")
    };
    var ciphertext = crypto.AES.encrypt(JSON.stringify(object),secretKey);
      invoke.invoke(hash.toString(),ciphertext.toString()).then(function(result) {
         res.status(200).json({
            result: result,
            key: secretKey,
            iv: ciphertext.iv.toString(),
            hash: hash.toString()
         });
     }).catch(err => res.json({ message: err.message }));
    
 });
