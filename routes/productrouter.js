const express = require('express');
const { getProducts , getProductById , createProduct , updateProduct , deleteProduct } = require('../controller/productcontroller');
const router = express.Router();
const authmiddlewares = require('../middlewares/authmiddlewares');
const authRole = require('../middlewares/roleauth');


router.get('/products' , getProducts);
router.get('/products/:slug' , getProductById);
router.post('/products/create' ,  authmiddlewares , authRole ,createProduct);
router.put('/products/update' ,  authmiddlewares , authRole ,updateProduct);
router.post('/products/delete' ,  authmiddlewares , authRole ,deleteProduct);







module.exports = router;



