const dashboard = async (req, res) => {
    if (!req.session.userData) {
        return res.redirect('/login');
    }

    res.render('dashboard', { user: req.session.userData });
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

module.exports = { dashboard, logout }