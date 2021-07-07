const Course = require('../models/Courses')
const { multipleMongooseObject } = require('../../utils/mongoose')

class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({}).sortable(req);


        // res.json(res.locals._sort)

        Promise.all([Course.countDocumentsDeleted(), courseQuery])
            .then(([deleteCount, courses]) =>
                res.render('me/stored_courses', {
                    deleteCount,
                    courses: multipleMongooseObject(courses)
                })
            )
            .catch(next)
    }

    // [GET] /me/stored/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash_courses', { courses: multipleMongooseObject(courses) }))
            .catch(next)

    }
}

module.exports = new MeController;