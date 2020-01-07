const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'florashopoffice@gmail.com',
        pass: process.env.PASS_EMAIL
    }
});
const mailOptions1 = {
    from: 'Flora Shop',
    to: '',
    subject: 'Wellcome to FloraShop!!',
    text: ''
}; 
const mailOptions2 = {
  from: 'florashopoffice@gmail.com',
  to: '',
  subject: 'Reset password FloraShop!!',
  text: ''
}; 
const code=Math.floor(Math.random() * 10000) + 1000;
/*transporter.sendMail(mailOptions1, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
/*function getRandomCode(){
    return Math.floor(Math.random() * 10000) + 1000;
}*/



