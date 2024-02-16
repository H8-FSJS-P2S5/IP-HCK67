const express = require('express');
const router = express.Router();
const Controller = require("../controllers");
const midtransClient = require('midtrans-client');
// const AuthController = require('../controllers/AuthController');
// const {verifyToken} = require('../helpers/jwt')
// const {User} = require('../models/');
// const authentication = require('../middlewares/authentication');
// const authorizationAdminOnly = require('../middlewares/authorization');
// const errHandler = require('../middlewares/errHandler');



router.post('/midtrans-token', async (req, res)=>{
    try {

// Create Snap API instance
let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'SB-Mid-server-B0XSopusguJx5uFisEEeKso9'
    });

let parameter = {
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 100000
    },
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        // "first_name": "budi",
        // "last_name": "pratama",
        "email": "budi.pra@example.com",
        // "phone": "08111222333"
    }
};

const midTransToken = await snap.createTransaction(parameter)
    // .then((transaction)=>{
    //     // transaction token
    //     let transactionToken = transaction.token;
    //     console.log('transactionToken:',transactionToken);
    // })
console.log(midTransToken)
res.status(201).json(midTransToken)
//res.send(midTransToken)


    } catch (error) {
        console.log(error)
    }
})


router.get('/', Controller.getHello)
// router.post('/add-user', AuthController.addUser)
// router.post('/login', AuthController.login)

//router.use(authentication) //use this or add manually

// router.get('/articles',Controller.getAllArticles)
// router.get('/articles/:id', authentication, Controller.getArticleById)
// router.post('/articles/', authentication, Controller.createArticle)
// router.delete('/articles/:id', authentication, authorizationAdminOnly, Controller.deleteArticleById)
// router.put('/articles/:id', authentication, Controller.updateArticleById)




//router.use(errHandler)
//console.log(process.env)

module.exports = router