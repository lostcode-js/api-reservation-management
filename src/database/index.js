    const mongoose     = require('mongoose')
    const {Schema}     = mongoose
    const {ObjectId}   = Schema.Types
    const ip = 'localhost'

    const schemas = {
    token: new Schema({
        user: {type: ObjectId, ref: 'user'},
        ip: String,
        value: String,
        active: Boolean,
        navigator: String,
        lastActivity: Date,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    }),
    company: new Schema({
        name: String,
        email: String,
        phone: String,
        about: String,
        picture: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    }),
    user: new Schema({
        employer: {type: ObjectId, ref: 'company'},
        name: String,
        email: String,
        phone: String,
        about: String,
        picture: String,
        password: String,
        type: String,
        services: [{type: ObjectId, ref: 'service'}],
        verifiedAt: Boolean,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    }),
    appointments: new Schema({
        employee: {type: ObjectId, ref: 'user'},
        generator: {type: ObjectId, ref: 'user'}, 
        customer: {type: ObjectId, ref: 'user'}, 
        date: Date,
        startTime: Date,
        endTime: Date,
        type: String,
        services: [{type: ObjectId, ref: 'service'}],
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    }),
    availability: new Schema({
        employee: {type: ObjectId, ref: 'user'},
        generator: {type: ObjectId, ref: 'user'}, 
        date: Date,
        dayOfWeek: Number,
        startTime: Date,
        endTime: Date, 
        type: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    }),
    notification: new Schema({
        user: {type: ObjectId, ref: 'user'},
        generator: {type: ObjectId, ref: 'user'}, 
        message: String,
        readAt: Date,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    }),
    feedback: new Schema({
        user: {type: ObjectId, ref: 'user'},
        note: Number,
        message: String,
        readAt: Date,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    }),
    service: new Schema({
        description: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    }),
    }

    const User           = mongoose.model('user', schemas.user)
    const Token          = mongoose.model('token', schemas.token)
    const Company        = mongoose.model('company', schemas.company)
    const Appointment   = mongoose.model('appointments', schemas.appointments)
    const Availability   = mongoose.model('availability', schemas.availability)
    const Notification   = mongoose.model('notification', schemas.notification)
    const Feedback       = mongoose.model('feedback', schemas.feedback)
    const Service        = mongoose.model('service', schemas.service)

    module.exports       = {
    ObjectId: mongoose.Types.ObjectId, User, Token, Company, Appointment, Availability, Feedback, Notification, Service,
    init() {
        return new Promise((resolve, reject) => {
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        return mongoose.connect(`mongodb+srv://kult_teste:zzq8KAIJBBp8QNZu@cluster0.2gl76vu.mongodb.net/kult?retryWrites=true&w=majority`, options, err =>
            err ? reject(err) : resolve()
        )
        /*return mongoose.connect(`mongodb://${ip}/kult`, options, err =>
            err ? reject(err) : resolve()
        )*/
        })
    },
    stop() {
        return mongoose.connection.close()
    }
    }
