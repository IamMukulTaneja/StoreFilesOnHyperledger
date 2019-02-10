'use strict';

//const user = require('../models/user');
// var user = "mukul";
// var helloworld = "hello_world";
const query = require('../query');

exports.query = (key) => {
    return new Promise((resolve, reject) => {
        query.read({key: key })

        .then((response) => {
           // console.log("Response is    "  + response);
            return resolve({ response })
        })



        .catch(err => {

            if (err.code == 11000) {

                return reject({ status: 409, message: 'cant fetch !' });

            } else {
                conslole.log("error occurred" + err);

                return reject({ status: 500, message: 'Internal Server Error !' });
            }
        })
    })
};