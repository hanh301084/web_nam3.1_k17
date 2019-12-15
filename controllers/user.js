const passport = require('passport');

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