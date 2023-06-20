const fs = require('fs')
const path = require('path')
const con = require('../config/db')


const createFilm = async (req, res) => {
    if (
      req.file &&
      req.body.titlerus.length > 2 &&
      req.body.titleeng.length > 2 &&
      req.body.year > 0 &&
      req.body.time > 2
    ) {
      const imagePath = `/images/films/${req.file.filename}`;

      const filmData = {
        title_rus: req.body.titlerus,
        title_eng: req.body.titleeng,
        year: req.body.year,
        time: req.body.time,
        video: req.body.video || '',
        country_id: req.body.country,
        genre_id: req.body.genre,
        image: imagePath,
        author_id: req.user._id
      };
      const sql = 'INSERT INTO films SET ?';
      con.query(sql, filmData, (err, result) => {
        if (err) {
          console.error('Error saving film:', err);
          return res.redirect('/new?error=1');
        }
        
        res.redirect(`/profile/${req.user._id}`);
      });
    } else {
      res.redirect('/new?error=2');
    }
    
    console.log(req.body);
  };

  module.exports = createFilm