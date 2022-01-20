const User = require('../model/user');
const braintree = require('braintree');
const { response } = require('express');
require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox, // Production
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});



exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};




exports.processPayment = (req, res) => {
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amountFromTheClient = req.body.amount;
    // charge
    const newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
              }
        },
        (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );
};
