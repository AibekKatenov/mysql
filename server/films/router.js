const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const createFilm = require('./controller')

router.post('/api/films/new',upload.single('image'), createFilm)


module.exports = router