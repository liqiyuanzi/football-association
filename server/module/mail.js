module.exports = (req,res)=>{
    let userName = req.body.phoneNumber;
    let userPwd = req.body.password;
    let mailAddress = req.body.mailAddress;
    let getUrl = 'http://127.0.0.1:3000/bindMailBox';
    getUrl = getUrl + '?userName='+userName + '&&userPwd='+userPwd+ '&&Emial='+mailAddress;

    const nodemailer  = require('nodemailer');
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: '18201135929@163.com',
            pass: 'qi19931210'
        }
    });
    let mailOptions = {
        from: '18201135929@163.com', // sender address
        to: mailAddress, // list of receivers
        subject: '中国足协教练员培训管理系统确认邮件', // Subject line
        text: 'Helloxxxxx world ?', // plain text body
        html: '<div style="height:400px;width:400px;margin:auto">\
                <h3>亲爱的用户,您好：</h3>\
                <p>欢迎来到中国足协教练员培训管理邮箱验证中心</p>\
                <p>这是来自欢迎国足协教练员培训管理邮箱验证中心的验证邮件，用来验证您的注册真实有效。</p>\
                <p>请点击以下链接完成邮箱绑定</p>\
                <a href='+getUrl+'>'+getUrl+'</a>\
            </div>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            setResponse(res,401,"sendError");
        }else{
            res.write(mailAddress);
            res.end();
        }
    });
}