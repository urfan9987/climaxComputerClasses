

const AdminsetCookie = (res, token) => {
    res.cookie('adminToken', token, {
        httpOnly: true, // Prevent access to cookies via JavaScript
        secure: process.env.JWT_SECREt === 'production', // Use HTTPS in production
        sameSite: 'Strict', // Prevent cross-site request forgery (CSRF)
        path: '/', // Make cookie accessible across the entire domain
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiry in milliseconds (1 day)
    });
    console.log("Token successfully injected in cookies");
};

module.exports = AdminsetCookie;