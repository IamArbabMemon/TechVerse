const express = require('express');
const userAccountRouter = express.Router();
const {getUserAccountDetails} = require('../controllers/userAccountController');

userAccountRouter.get('/getAccountDetails/:accountNumber',getUserAccountDetails);

module.exports = {
    userAccountRouter
}