const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:'465',
        service: 'gmail',
        auth: {
            
            user: 'abdulhameed000650@gmail.com',
            pass: 'czcgopicavglviha',
        },
    });
    const mailOption = {
        from: "abdulhameed000650@gmail.com",
        to: options.email,
        subject: options.subject,
        html:options.message,
    }
    await transporter.sendMail(mailOption);
};
module.exports = sendEmail;