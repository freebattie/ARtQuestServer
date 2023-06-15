import nodemailer from "nodemailer";

export const sendPromoMail = async (email) => {
  console.log("sendPromoMail()");

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    tls: {
      // must provide server name, otherwise TLS certificate check will fail
      servername: process.env.MAIL_SERVER_NAME,
    },
    auth: {
      user: process.env.MAIL_USER_USERNAME, // generated ethereal user
      pass: process.env.MAIL_USER_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Munch" <user@nerland.io>', // sender address
    to: `${email}`, // list of receivers
    subject:
      "🎨 New Adventures in ARtQuest: Explore 'Hjertebank' by Marianne Bratteli & Easter Eggstravaganza! 🐰🥚", // Subject line
    html: `<html>
    <body>
    <p style="font-family: Arial; font-size: 18px;">Dear ${email},</p>

    <p style="font-family: Arial; font-size: 18px;">Spring into the season of renewal with ARtQuest! This Easter, we're bringing an extra special quest your way - the Easter Eggstravaganza. Help the Easter Bunny find all his scattered eggs across the entire Munch collection from April 1st to April 30th, 2023. Exclusive Easter-themed rewards and rare pieces from our collection await you!</p>

    <p style="font-family: Arial; font-size: 18px;">But that's not all. We're also proud to introduce our latest exhibition: <strong>'Hjertebank'</strong> by <strong>Marianne Bratteli</strong>! 🖼️ This quest will allow you to uncover hidden artifacts, earn digital representations of the 'Hjertebank' collection, and provide you the thrill of replaying the quest for the more elusive pieces.</p>

    <h3 style="font-family: Arial; font-size: 20px;">Upcoming Quests:</h3>

    <ul style="font-family: Arial; font-size: 18px;">
        <li><strong>'Hjertebank' Quest:</strong> Discover the heartfelt intricacies of Marianne Bratteli's work. This quest will be active from June 15th to July 31st, 2023.</li>
        <li><strong>Easter Eggstravaganza:</strong> A seasonal special! Join the Easter Bunny in a hunt across the entire Munch collection. Active from April 1st to April 30th, 2023.</li>
    </ul>
    
        <h3 style="font-family: Arial; font-size: 20px;">What's New?</h3>
    
        <p style="font-family: Arial; font-size: 18px;">To enhance your gameplay experience, we've implemented the following updates:</p>
    
        <ol style="font-family: Arial; font-size: 18px;">
            <li><strong>Improved AR Visualization:</strong> Experience an even more immersive and visually engaging environment with our latest AR technology updates.</li>
            <li><strong>New Quest Log:</strong> Keep track of your ongoing and completed quests more effectively with our new, user-friendly Quest Log.</li>
            <li><strong>Enhanced Interaction:</strong> You can now interact more with the environment and objects, making your questing experience more dynamic and real.</li>
            <li><strong>Social Sharing:</strong> Share your progress, finds, and rare pieces with friends on social media directly from the app!</li>
        </ol>
    
        <p style="font-family: Arial; font-size: 18px;">Every quest you undertake brings you closer to the heart of each exhibition, revealing unique stories and interpretations of art. Don't forget to download the latest update to begin your new adventures. We can't wait to see you there!</p>
    
        <p style="font-family: Arial; font-size: 18px;">Happy questing,</p>
    
        <p style="font-family: Arial; font-size: 18px;">The ARtQuest Team 🎨🔍</p>
    </body>
    </html>`, // plain text body
  });
  console.log("Message sent: %s", info.messageId);
};
