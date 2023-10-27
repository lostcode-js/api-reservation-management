require('dotenv').config()

const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const defaultColumns = {
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    createdBy: { type: ObjectId, ref: 'user' },
    updatedBy: { type: ObjectId, ref: 'user' },
    deletedBy: { type: ObjectId, ref: 'user' }
}

const schemas = {
    token: new Schema({
        user: { type: ObjectId, ref: 'user' },
        ip: String,
        value: String,
        active: Boolean,
        navigator: String,
        lastActivity: Date,
        ...defaultColumns
    }),
    company: new Schema({
        name: String,
        email: String,
        phone: String,
        about: String,
        picture: String,
        ...defaultColumns
    }),
    user: new Schema({
        employer: { type: ObjectId, ref: 'company' },
        name: String,
        email: String,
        phone: String,
        about: String,
        picture: String,
        password: String,
        type: {
            type: String,
            enum : ['user','admin','employee'],
            default: 'user' 
        },
        services: [{ type: ObjectId, ref: 'service' }],
        verifiedAt: Date,
        ...defaultColumns
    }),
    appointments: new Schema({
        employee: { type: ObjectId, ref: 'user' },
        customer: { type: ObjectId, ref: 'user' },
        date: Date,
        startTime: Date,
        endTime: Date,
        services: [{ type: ObjectId, ref: 'service' }],
        ...defaultColumns
    }),
    availability: new Schema({
        company: { type: ObjectId, ref: 'company' },
        employee: { type: ObjectId, ref: 'user' },
        date: Date,
        dayOfWeek: Number,
        startTime: Date,
        endTime: Date,
        type: {
            type: String,
            enum : ['available','unavailable'],
            default: 'available' 
        },
        ...defaultColumns
    }),
    notification: new Schema({
        user: { type: ObjectId, ref: 'user' },
        message: String,
        readAt: Date,
        ...defaultColumns
    }),
    feedback: new Schema({
        note: Number,
        message: String,
        readAt: Date,
        ...defaultColumns
    }),
    service: new Schema({
        description: String,
        price: Number,
        ...defaultColumns
    }),
}

const User = mongoose.model('user', schemas.user)
const Token = mongoose.model('token', schemas.token)
const Company = mongoose.model('company', schemas.company)
const Appointment = mongoose.model('appointment', schemas.appointments)
const Availability = mongoose.model('availability', schemas.availability)
const Notification = mongoose.model('notification', schemas.notification)
const Feedback = mongoose.model('feedback', schemas.feedback)
const Service = mongoose.model('service', schemas.service)

module.exports = {
    ObjectId: mongoose.Types.ObjectId, User, Token, Company, Appointment, Availability, Feedback, Notification, Service,
    initDatabase() {
        return new Promise((resolve, reject) => {
            try {
                const options = {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
                mongoose.connect(process.env.DATABASE_URL, options)
                console.log('Conexão com Banco de Dados com Sucesso');
                return resolve();
            } catch(error) {
                console.log('Conexão com Banco de Dados Falhou');
                return reject(error)
            }
        })
    },
    stop() {
        return mongoose.connection.close()
    }
}
