const nodemailer = require("nodemailer");

const SendEmailUtility = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
            user: "sneathmoczygembarny.r.a.3.5.77@gmail.com",
            pass: "CyLrEwS06KNh9vPQ",
        },
        tls: {
            rejectUnauthorized: false,
        },
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
