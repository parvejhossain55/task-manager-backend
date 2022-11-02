const nodemailer = require("nodemailer");

const SendEmailUtility = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
            user: 'dorisrivera.30.26.0.222@gmail.com',
            pass: 'BwKspVZmfEj0Xd1O'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: "Task Manager <me@parvejhossain.com>",
        to: to,
        subject: subject,
        text: text,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
