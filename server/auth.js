const dotenv = require('dotenv').config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_API_KEY } = process.env;

console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


// passport.use(new GoogleStrategy({
//     clientID:     GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://yourdomain:3000/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, (err, user) => {
//       return done(err, user);
//     });
//   }
// ));