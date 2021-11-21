const router = require('express').Router();
const thoughtRoutes = require('./thought');
const usersRoutes = require('./user');



router.use('/thought', thoughtRoutes);
router.use('/users', usersRoutes);


module.exports = router;