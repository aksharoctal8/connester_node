import express from 'express';
import db from './App/Database/db.js';
import router from './App/Controller/_router.js';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import passport from './App/Middlware/passport-stagy.js';  // Ensure correct path to passport configuration file
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
// app.use(cookieParser());
db();
// app.use(session({
//     name: "Akshar",
//     secret: "ak",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 100
//     }
// }));
// app.use(passport.initialize());
// app.use(passport.session());
router(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.error("Server Error:", error);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
