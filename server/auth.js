const dotenv = require('dotenv').config();
const passport = require('passport');
const { User } = require('../database/index.js');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_API_KEY, BASE_URL } = process.env;

// console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: BASE_URL,
  passReqToCallback: true
},
(request, accessToken, refreshToken, profile, done) => {
  // console.log('GOOGLE PROFILE', profile); // pull profile.given_name MISSING birthday and sign
  User.findOrCreate({
    where: {
      googleId: profile.id,
      name: profile.given_name
    }
  })
    .then((user, created) => {
      // console.log('Find Or Create Google Acct --> DB: Success', created, user);
      done(null, user);
    })
    .catch(err => {
      console.error('error FindOrCreate Google Auth', err);
    });
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

