const { RoofProduct, RoofItem } = require('../model/createRoof');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createRoof = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields must be required
        const { name, description ,location} = fields;
        if (!name || !description||!location ) {
            return res.status(400).json({
                error: 'All fields are required'
            });

        }
        if (!files.photo) {
            return res.status(400).json({
                error: 'All fields are required including Image'
            });

        }


        let product = new RoofProduct(fields);
        // 1kb=1000
        // 1mb=1000000

        if (files.photo) {
            if (files.photo.size > 9000000) {
                return res.status(400).json({
                    error: 'Image should be less than 9mb in size'
                });

            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });

    });

};

// uafdjafk 

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};