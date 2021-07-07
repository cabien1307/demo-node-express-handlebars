const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');



mongoose.plugin(slug);

const CourseSchema = new Schema({
    name: { type: String, maxLength: 255, require: true },
    description: { type: String, maxLength: 600 },
    img: { type: String },
    videoID: { type: String, require: true },
    level: { type: String },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    }
}, { timestamps: true });

// Custom query 
CourseSchema.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this;
}


// Add plugin
CourseSchema.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Course', CourseSchema)