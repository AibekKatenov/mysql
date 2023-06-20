const passport = require('passport')
const con = require('./db')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')


passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      con.query(sql, [email], async (err, rows) => {
        if (err) {
          return done(err);
        }

        if (!rows.length) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user.id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  con.query(sql, [id], (err, rows) => {
    if (err) {
      return done(err);
    }

    if (!rows.length) {
      return done(null, false);
    }

    const user = rows[0];
    return done(null, user);
  });
});