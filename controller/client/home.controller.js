module.exports.homeClientPage = (req, res) => {
    res.render("client/pages/home/index.pug",{
        title:"Home Page"
    });
}