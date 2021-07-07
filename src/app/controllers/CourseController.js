const Course = require('../models/Courses');
const { mongoosetoObject } = require('../../utils/mongoose')


class CourseController {

    // [GET] /Course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongoosetoObject(course)
                })
            })
            .catch(next)
    }

    // [GET] /Course/Create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(error => {
                console.log(error);
            })
    }

    // [POST] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongoosetoObject(course)
            }))
            .catch(next)

    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const data = req.body;
        data.updatedAt = Date.now();
        Course.updateOne({ _id: req.params.id }, data)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)

    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    deleteForce(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /course/handle-form-actions
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.coursesIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({ message: "Action invalid !" })
        }
    }
}

module.exports = new CourseController;