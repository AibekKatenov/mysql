const express = require('express')
const router = express.Router()
const con = require('../config/db')
const util = require('util');

router.get('/', (req, res) => {
    res.render('index', {user: req.user ? req.user : {}})
})

router.get('/register', (req, res) => {
    res.render('register', {user: {}})
})
router.get('/login', (req, res) => {
    res.render('login', {user: {}})
})

router.get('/profile/:id', async(req, res) => {
    con.query('SELECT * FROM films', (err, filmResults) => {
        if (err) {
          console.error('Error retrieving films:', err);
          return res.status(500).send('Internal Server Error');
        }
    res.render('profile', {user: req.user ? req.user : {}, films: filmResults})
})})

router.get('/new', (req, res) => {
    res.render('newFilm', {user: req.user ? req.user : {}})
})

module.exports = router