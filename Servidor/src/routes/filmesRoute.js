const express = require('express');
const router = express.Router();

const filmesController = require('../controllers/filmesController')

router.get('/', filmesController.filme_list);

router.get('/:id',filmesController.filme_detail);

router.post('/create', filmesController.filme_create);

router.put('/update/:id', filmesController.filme_update);

router.delete('/delete', filmesController.filme_delete);

module.exports = router;