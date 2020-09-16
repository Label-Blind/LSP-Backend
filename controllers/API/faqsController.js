const FaqsModel = require('../../models/faqModel');
const FaqCategoryModel = require('../../models/faq_categoryModel');
var config = require('../../config');

module.exports = {
    category: (req, res) => {
        FaqCategoryModel.find({}, function (err, cat) {
            if (err) {
                res.status(500).json({ "status": false, "message": error });
            }
            res.status(200).json({
                "status": true,
                "category": cat,
                "message": "FAQs category found successfully"
            });
        })
    },
    faqs: (req, res) => {
        FaqsModel.find({ category: req.body.category }, function (error, faqs) {
            if (error) {
                res.status(500).json({ "status": false, "message": error });
            }
            var Allfaqs = [];
            faqs.forEach(faq => {
                Allfaqs.push({
                    title: faq.question,
                    content: faq.answer,
                })
            })
            var arr = [{
                title: req.body.category,
                rows: Allfaqs
            }]
            res.status(200).json({
                "status": true,
                "faqs": arr,
                "message": "FAQs found successfully"
            });
        });
    }
}