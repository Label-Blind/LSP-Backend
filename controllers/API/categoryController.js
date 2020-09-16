const categoryModel = require('../../models/categoryModel');

module.exports = {
    getAllCategory: (req, res) => {
        categoryModel.find({}, function (error, category) {
            if (error) {
                res.status(500).json({ "status": false, "message": error });
            }
            else if (!category) {
                res.status(500).json({ "status": false, "message": "Categories page Not Found" });
            }
            else {
                res.status(200).json({ "status": true, "category": category, "message": "Categories found successfully" });
            }
        })
    },
    getCategory: (req, res) => {
        categoryModel.find({ parent: "/" }, function (error, category) {
            if (error) {
                res.status(500).json({ "status": false, "message": error });
            }
            else if (!category) {
                res.status(500).json({ "status": false, "message": "Categories page Not Found" });
            }
            else {
                res.status(200).json({ "status": true, "category": category, "message": "Categories found successfully" });
            }
        })
    },
    getSubCategory: (req, res) => {
        categoryModel.find({ parent: req.body.category }, function (error, category) {
            if (error) {
                res.status(500).json({ "status": false, "message": error });
            }
            else if (!category) {
                res.status(500).json({ "status": false, "message": "Categories page Not Found" });
            }
            else {
                // var string = req.body.category;
                // str = string.replace("/", "");
                categoryModel.findOne({ category: req.body.category }, function (err, cat) {
                    res.status(200).json({
                        "status": true,
                        "code": cat.code,
                        "category": category,
                        "message": "Categories found successfully"
                    });
                })
            }
        })
    },
    getCategoryFromCode: (req, res) => {
        categoryModel.findOne({ code: req.body.code }, function (error, category) {
            if (error) {
                res.status(500).json({ "status": false, "message": error });
            }
            else if (!category) {
                res.status(500).json({ "status": false, "message": "Categories Not Found" });
            }
            else {
                res.status(200).json({
                    "status": true,
                    "category": category,
                    "message": "Categories found successfully"
                });
            }
        })
    }
}