const express = require('express');
const router = express.Router();
const user_controller=require('../controllers/user');


router.get('/register',user_controller.get_register );
router.post('/register',user_controller.post_register );

router.get('/login',user_controller.get_login );
router.post('/login',user_controller.post_login );

router.get('/logout',user_controller.get_logout );

module.exports = router;

