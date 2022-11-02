const nodemailer = require("nodemailer");

const SendEmailUtility = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "google",
        auth: {
            type: "OAuth2",
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: process.env.OAUTH_ACCESS_TOKEN
        },
    });

    let mailOptions = {
        from: "Task Manager <parvejhossain958@gmail.com>",
        to: to,
        subject: subject,
        text: text,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
