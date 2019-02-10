'use strict';

//const user = require('../models/user');
// var user = "mukul";
// var helloworld = "hello_world";
const invoke = require('../invoke');

exports.invoke = (key, value) => {
    return new Promise((resolve, reject) => {
        invoke.write({key: key, value: value })

        .then((response) => {
            return resolve({ response })
        })
        .catch(err => {

            return reject({ status: 500, message: 'Internal Server Error !' });
        })
    })
};