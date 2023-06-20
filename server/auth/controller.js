const bcrypt = require('bcrypt');
const util = require('util');
const con = require('../config/db')


const signUp = async(req, res) => {
    try {
      const query = util.promisify(con.query).bind(con);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      const sql = 'INSERT INTO users (email, full_name, password, isAdmin) VALUES (?, ?, ?, ?)';
      await query(sql, [req.body.email, req.body.full_name, hashedPassword, false]);
      
      console.log('User added successfully.');
    } catch (error) {
      console.error('Error adding user:', error);
    } 
    res.redirect('/')
}

const signIn = async (req, res) => {
    // const email = req.body.email
    // const password = req.body.password

    // try {
    //   const query = util.promisify(con.query).bind(con);
    //   const sql = 'SELECT * FROM users WHERE email = ?';
    //   const result = await query(sql, [email]);
  
    //   if (result.length === 0) {
    //     return res.status(401).send('Неверный адрес электронной почты или пароль');
    //   }
  
    //   const user = result[0];
    //   const passwordMatch = await bcrypt.compare(password, user.password);
  
    //   if (!passwordMatch) {
    //     return res.status(401).send('Неверный адрес электронной почты или пароль');
    //   }
    //   const { id } = result[0];
      const query = util.promisify(con.query).bind(con);
      const sql = 'SELECT * FROM users WHERE email = ?';
      const result = await query(sql, [req.body.email]);
      let id = result[0].id
      res.redirect(`/profile/${id}`)
    // } catch (error) {
    //   console.error('Ошибка при входе:', error);
    //   res.status(500).send('Внутренняя ошибка сервера');
    // }
  };
  
const signOut = (req,res) => {
    req.logout(function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
}

  module.exports = {signUp, signIn, signOut}