const { Router } = require('express');
const router = Router();

const categories = require('../controllers/categories');
router.get('/categories/', categories.get);
router.get('/categories/:id', categories.getById);
router.post('/categories/', categories.post);
router.put('/categories/:id', categories.put);
router.delete('/categories/:id', categories.remove);

module.exports = router;