const LogoutUser = (req,res)=>{
    res.clearCookie('token')
    res.redirect('/')
    return res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = LogoutUser;