const passport = require('passport');
const User = require('../models/user');

exports.get_register = function (req, res) {
    const messages = req.flash('error');
    dataForm = {
        username: '',
        gender: '',
        age: '',
        country: '',
        email: '',
        phone: '',
        password: ''
    }
    res.render('register', {
        messages: messages,
        hasErrors: messages.length > 0,
        dataForm: dataForm,
        title1: '', title2: '', title3: '', title4: '', title5: '', title6: '', title7: 'selected', user: req.user
    });
}
exports.post_register = passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/users/register',
    failureFlash: true
})

exports.get_login = function (req, res) {
    const messages = req.flash('error');
    res.render('login', {
        messages: messages,
        hasErrors: messages.length > 0,
        title1: '', title2: '', title3: '', title4: '', title5: '', title6: '', title7: 'selected', user: req.user
    });
}
exports.post_login = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
})

exports.get_logout = function (req, res) {
    req.logout();
    res.redirect('/');
}

exports.get_profile = function (req, res) {
    res.render('profile', {
        title1: '', title2: '', title3: '', title4: '', title5: '', title6: '', title7: 'selected',
        user: req.user
    })
}

exports.patch_profile = async (req, res) => {
    try {
        const updatedUser = await User.updateOne({ "_id": req.user._id },
            {
                $set:
                {
                    username: req.body.username,
                    gender: req.body.gender,
                    age: req.body.age,
                    country: req.body.country,
                    email: req.body.email,
                    phone: req.body.phone
                }
            }
        );     
        const userUp=await User.findById( req.user._id);
        res.render('profile', {
            title1: '', title2: '', title3: '', title4: '', title5: '', title6: '', title7: 'selected',
            user: userUp
        });
    } catch (err) {
        res.json({ message: err });
    }
}