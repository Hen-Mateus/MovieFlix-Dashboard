const express = require('express');
const router = express.Router();

const generosController = require('../controllers/generosController')

router.get('/', generosController.generos_list);

router.get('/:id', generosController.generos_detail);

router.post('/create', generosController.generos_create);

router.put('/update/:id', generosController.generos_update);

router.delete('/delete', generosController.generos_delete);

module.exports = router;