// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../Model/User.js';

// passport.use(new GoogleStrategy({
//     clientID:Process.env.GOOGLE_CLIENT_ID,
//     clientSecret:Process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback",
//     scope: ['profile', 'email']
//   },
//   async function(accessToken, refreshToken, profile, cb) {
//     try {
//       let existingUser = await User.findOne({ email: profile.emails[0].value });
//       if (existingUser) {
//         return cb(null, existingUser);
//       } else {
//         let newUser = {
//           email: profile.emails[0].value,
//           name: profile.displayName,
//           password:null
//         };
//         let user = await User.create(newUser);
//         return cb(null, user);
//       }
//     } catch (err) {
//       console.error('Error during authentication:', err);
//       return cb(err, false);
//     }
//   }
// ));


// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });



// export default passport;
