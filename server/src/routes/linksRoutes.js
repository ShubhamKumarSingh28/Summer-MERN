const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const linksController = require('../controller/linkController');

router.get('/r/:id', linksController.redirect);

// Authenticated routes
router.use(authMiddleware);

router.post('/', linksController.create);
router.get('/', linksController.getAll);
router.get('/:id', linksController.getById);
router.put('/:id', linksController.update);
router.delete('/:id', linksController.delete);

module.exports = router;
