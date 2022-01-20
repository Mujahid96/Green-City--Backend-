const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
//  import routes 
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
const createRoofRoutes = require('./routes/createRoof');
// ssl 
// const SSLCommerzPayment = require('sslcommerz')

//  app
const app = express();

//  db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        // useCreateIndex: true

    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));

// ssl 
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//  routes midlleware 

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);
app.use("/api", createRoofRoutes);

// ssl 
// app.use("/api", async (req, res, next) => {

//     const data = {
//         total_amount: 100,
//         currency: 'EUR',
//         tran_id: 'REF123',
//         success_url: `${API}//ssl-payment-success`,
//         fail_url: `${API}//ssl-payment-failure`,
//         cancel_url: `${API}//ssl-payment-cancel`,
//         ipn_url: `${API}//ssl-payment-ipn`,
//         shipping_method: 'Courier',
//         product_name: 'Computer.',
//         product_category: 'Electronic',
//         product_profile: 'general',
//         cus_name: 'Customer Name',
//         cus_email: 'cust@yahoo.com',
//         cus_add1: 'Dhaka',
//         cus_add2: 'Dhaka',
//         cus_city: 'Dhaka',
//         cus_state: 'Dhaka',
//         cus_postcode: '1000',
//         cus_country: 'Bangladesh',
//         cus_phone: '01711111111',
//         cus_fax: '01711111111',
//         ship_name: 'Customer Name',
//         ship_add1: 'Dhaka',
//         ship_add2: 'Dhaka',
//         ship_city: 'Dhaka',
//         ship_state: 'Dhaka',
//         ship_postcode: 1000,
//         ship_country: 'Bangladesh',
//         multi_card_name: 'mastercard',
//         value_a: 'ref001_A',
//         value_b: 'ref002_B',
//         value_c: 'ref003_C',
//         value_d: 'ref004_D'
//     };
//     const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.PASSWORD, false) //true for live default false for sandbox
//     sslcommer.init(data).then(data => {
//         //process the response that got from sslcommerz 
//         //https://developer.sslcommerz.com/doc/v4/#returned-parameters
//         if(data?.GatewayPageURL){
//             return res.status(200).redirect(data?.GatewayPageURL)
//         }
//         else{
//             return res.status(400).json({
//                 message:'SSL session was no successful'
//             })
//         }
   
//     });

// });

// app.post('/ssl-payment-success', async(req,res,next)=>{
//     return res.status(200).json({
//         data:req.body
//     });
// })
// app.post('/ssl-payment-failure', async(req,res,next)=>{
//     return res.status(400).json({
//         data:req.body
//     });
// })
// app.post('/ssl-payment-cancel', async(req,res,next)=>{
//     return res.status(200).json({
//         data:req.body
//     });
// })
// app.post('/ssl-payment-ipn', async(req,res,next)=>{
//     return res.status(200).json({
//         data:req.body
//     });
// })



// ssl end 

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`app is runnig ${port}`);
});


