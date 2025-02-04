const express = require('express');
const userControler = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(userControler.getAllUsers).post(userControler.createUser);

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser);

module.exports = router;
