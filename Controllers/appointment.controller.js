const nodemailer = require('nodemailer');

async function sendByEmail(email,user,date){

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: `Your OTP for Signin `,
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
                <style>
                    body{
                        font-family: "Poppins",'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        color:white;
                    }
                    .outer{
                        background-color: teal;
                        color: white;
                        max-width: 500px;
                        margin: auto;
                        border-radius: 8px;
                        padding: 40px;
                    }
                    .outer > *{
                        width: max-content;
                    }
                    p{
                        font-size: 24px;
                    }
                    .otp{
                        font-size: 32px;
                        font-weight: 700;
                        padding: 8px 12px;
                        margin: 6px ;
                        border: 1px solid lightgray;
                        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    }
                    *{
                        color:white;
                    }
                </style>
            </head>
            <body>
                    <div class="outer">
                        <p>Welcome</p>
                        <span>We Delight to see you</span>
                        <br>
                        <span>Your OTP for VenomCode is </span>
                        <div class="otp">${otp}</div>
                        <span>Do not Share your OTP</span>
                        <br>
                        <span>Regards : Coding Squad</span>
                    </div>    
            </body>
            </html>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        console.log(error.message, "While send email");
    }
}










module.exports = {  sendByEmail, generateOtp };