const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcrypt-nodejs');
const User = require("../models/user");


passport.use('register', new LocalStrategy({   //
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    // ...validator
    req.checkBody("username", "Username is required").notEmpty().isLength({ min: 3 });
    req.checkBody("gender", "Gender is required").notEmpty();
    req.checkBody("age", "Age is required").notEmpty();
    req.checkBody("country", "Country is required").notEmpty();
    req.checkBody("email", "Email address invalid, please check again.").isEmail();
    req.checkBody("phone", "Phone is required").notEmpty();
    req.checkBody("password", "Password is required min length is 6").notEmpty().isLength({ min: 6 });
    req.checkBody('confirm', 'Password confirm is the not same, please check again.').equals(req.body.password);
    //req.checkBody('confirmCode', 'Confirm code is incorrect, please check again.').equals(code);
    const errors = req.validationErrors();
    if (errors) {
        const messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'username': username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            console.log('username exitsed')
            req.flash('dataForm', dataForm)
            return done(null, false, {
                message: 'Username used, please enter another username.'
            })
        }
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.gender = req.body.gender;
        newUser.age = req.body.age;
        newUser.country = req.body.country;
        newUser.email = req.body.email;
        newUser.phone = req.body.phone;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            } else {
                return done(null, newUser);
            }
        })
    })
}));

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    User.findOne({
        'username': username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            console.log('tài khoản không tồn tại')
            return done(null, false, {
                message: 'This account does not exist, please check again.'
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            console.log('mật khẩu không đúng')
            return done(null, false, {
                message: 'Password incorrect, please check again.'
            });
        }
        return done(null, user);
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});