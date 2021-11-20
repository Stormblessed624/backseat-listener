const router = require('express').Router();
const thoughtRoutes = require('./thought');
const usersRoutes = require('./users');



router.use('/thought', thoughtRoutes);
router.use('/users', usersRoutes);


module.exports = router;