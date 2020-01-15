// a nifty middleware function for protecting routes

const jwt = require('jsonwebtoken');

module.exports = function auth(req,res,next){   
    const token = req.header('auth-token');
    if(!token) return res.redirect('http://localhost:3000/login');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err){
        res.status(400).send('Invalid Token');
    }
}