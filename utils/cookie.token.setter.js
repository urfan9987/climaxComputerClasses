// const setCookie = (res,token)=>{
//     res.cookie('token',token)
//     console.log("token is sucessfully injected in cookies")
// }

// module.exports = setCookie;



const setCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true, // Prevent access to cookies via JavaScript
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'Strict', // Prevent cross-site request forgery (CSRF)
        path: '/', // Make cookie accessible across the entire domain
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiry in milliseconds (1 day)
    });
    console.log("Token successfully injected in cookies");
};

module.exports = setCookie;
