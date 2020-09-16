const cmsModel = require('../../models/cmsModel');

module.exports = {
    getCms: (req, res) => {
        console.log(req.params)
        let slug= req.params.slug;
        cmsModel.findOne({slug:slug}, function (error, cms) {
            if (error) {
                res.status(500).json({ "status": false, "message": error });
            }
            else if(!cms){
                res.status(500).json({ "status": false, "message": "Cms page Not Found" });
            }
            else{
                res.status(200).json({ "status": true, "cms": cms, "message": "cms found successfully" });
            }
        })
    }
}