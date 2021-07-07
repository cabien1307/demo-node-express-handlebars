const Course = require('../models/Courses')
const { multipleMongooseObject } = require('../../utils/mongoose')

class SiteController {
    // [GET] /
    index(req, res, next) {
        //res.render('home');

        Course.find({})
            .then(courses => {

                res.render('home', {
                    courses: multipleMongooseObject(courses)
                })
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController;