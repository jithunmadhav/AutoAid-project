
const nodemailer = require("nodemailer");
module.exports={
 
  signupMail:(email,name)=> {
      return new Promise((resolve, reject)=>{
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from:process.env.EMAIL,
        to: email,
        subject: " Welcome to Autocare - Application Confirmation",
        html: `   <h3> Dear ${name} ,<h3>
                  <p>

                  Thank you for signing up for the mechanic position in our Autocare application. We are excited to have you on board and look forward to working with you.<br>
                  
                  As a mechanic, you will be responsible for providing high-quality service to our clients and ensuring that their vehicles are well-maintained. Your expertise and experience will be valuable assets to our team.<br>
                  
                  Please note that we are currently reviewing your application and will contact you within the next few days regarding next steps. In the meantime, if you have any questions or concerns, please do not hesitate to contact us.<br>
                  
                  Once again, thank you for choosing Autocare. We are confident that you will be a great addition to our team and we look forward to working with you.<br>
                  
                  Best regards,<br><br>
                  
            
                  
                  Autocare Team
                  
                  
                  
                  
                  
                  </p>
                   
                   
                 `
    };
    transporter.sendMail(mailOptions,(err,res)=>{
        if(err){
            console.log(err);
        }
        else {
    
        }
    });
      })
      
  },  applicationMail:(email,name)=> {
    return new Promise((resolve, reject)=>{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });
  var mailOptions = {
      from:process.env.EMAIL,
      to: email,
      subject: "Application status",
      html: `   <h1> Dear ${name} <h1>
                <h2>We are excited to inform you that your application for the mechanic position at AutoCare has been approved. Congratulations and welcome aboard!</h2>
                 
                 
               `
  };
  transporter.sendMail(mailOptions,(err,res)=>{
      if(err){
          console.log(err);
      }
      else {
  
      }
  });
    })
    
}
}
// module.exports.applicationMail('jithunmadhavct@gmail.com','jithun').then((result) => {
//     console.log("success");
// }).catch((err) => {
//     console.log("failed");
// });