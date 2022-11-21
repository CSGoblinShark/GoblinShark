const express = require('express');

const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/signin', usersController.getUser, (req, res) => 
  res.status(200).json(res.locals.userData)
);

router.get('/getAll', usersController.getAll, (req, res) => {
  res.status(200).json(res.locals.users)
})

router.post('/signup', usersController.createUser, (req, res) => {
  res.status(200).json(res.locals.userData)
})

router.post('/verification', usersController.verification, (req, res) => {
  res.status(200).json(res.locals.code);
})

router.get('/checkVerification', usersController.checkVerification, (req, res) => {
  res.status(200).json(res.locals.match);
})

module.exports = router;
