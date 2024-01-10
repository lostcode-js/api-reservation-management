const jwt = require('jsonwebtoken')
require('dotenv').config()

const { MailtrapClient } = require("mailtrap");

const TOKEN = "bae8d3bcc5d959dcbe010307dfe9542d";
const ENDPOINT = "https://send.api.mailtrap.io/";
const TENANT = "www.dripbr.com";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
    email: "noreply@api.dripbr.com",
    name: "Drip Br",
};

const JWT_SECRET = '0ee4dc1540b617912a23b150eef0a4fe073ca99a'

const recoveryEmail = (email, token, request) => {
    const url = `https://${TENANT}/password/${token}`
    try {
        const recipients = [
            {
                email,
            }
        ];

        client
            .send({
                from: sender,
                to: recipients,
                subject: 'DRIP BR - Recuperação de senha',
                html: `
                <!doctype html>
                <html>
                  <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  </head>
                  <body style="font-family: sans-serif;">
                    <div style="display: block; margin: auto; max-width: 600px; padding: 20px;" class="main">
                      <h1 style="font-size: 35px; font-weight: bold; margin-top: 20px; margin-bottom: 29px; text-align: center;">Obrigado por se registar no Drip Br.</h1>

                      <hr>

                      <p style="margin-bottom: 8px;">Clique no link para recuperar a sua senha.</p>

                      <div style="padding: 16px 20px; font-size: 16px; font-weight: 600; background-color: #009c3b; color: white; margin-bottom: 8px">
                        <a href="${url}">RECUPERAR SENHA</a>
                      </div>

                      <p>Tenha um ótimo dia na Drip Br.</p>
                    </div>
                    <style>
                      .main { background-color: white; }
                      a:hover { border-left-width: 1em; min-height: 2em; }
                    </style>
                  </body>
                </html>
                `
            })

    } catch (error) {
        console.log(error);
    }
}

const doAppointmentEmail = ({ email, customer, appointment }) => {
    try {
        const url = `https://${TENANT}/`
        const recipients = [
            {
                email,
            }
        ];

        client
            .send({
                from: sender,
                to: recipients,
                subject: 'DRIP BR - Uma reserva foi criada',
                html: `
                <!doctype html>
                <html>
                  <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  </head>
                  <body style="font-family: sans-serif;">
                    <div style="display: block; margin: auto; max-width: 600px; padding: 20px;" class="main">
                      <h1 style="font-size: 35px; font-weight: bold; margin-top: 20px; margin-bottom: 29px; text-align: center;">Uma reserva foi criada!</h1>

                      <p style="font-size: 18px; text-align: center; margin-bottom: 20px">Olá, Ficamos felizes em informar que uma reserva foi criada pelo(a) ${customer.email} para
                      ${appointment}.</p>

                      <hr>

                      <p style="margin-bottom: 8px;">Por favor, confira no nosso sistema todas as informações.</p>

                      <div style="padding: 16px 20px; font-size: 16px; font-weight: 600; background-color: #009c3b; color: white; margin-bottom: 8px">
                        <a href="${url}">VER RESERVA</a>
                      </div>

                      <p>Tenha um ótimo dia na Drip Br.</p>
                    </div>
                    <style>
                      .main { background-color: white; }
                      a:hover { border-left-width: 1em; min-height: 2em; }
                    </style>
                  </body>
                </html>
                `
            })

    } catch (error) {
        console.log(error);
    }

}

const verificationEmail = (email, token, request) => {
    const url = `https://${TENANT}/confirm/${token}`

    try {
        const recipients = [
            {
                email,
            }
        ];

        client
            .send({
                from: sender,
                to: recipients,
                subject: 'DRIP BR - Confirme o seu email',
                html: `
                <!doctype html>
                <html>
                  <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  </head>
                  <body style="font-family: sans-serif;">
                    <div style="display: block; margin: auto; max-width: 600px; padding: 20px;" class="main">
                      <h1 style="font-size: 35px; font-weight: bold; margin-top: 20px; margin-bottom: 29px; text-align: center;">Obrigado por se registar no Drip Br.</h1>

                      <hr>

                      <p style="margin-bottom: 8px;">Clique no link para confirmar o seu email.</p>

                      <div style="padding: 16px 20px; font-size: 16px; font-weight: 600; background-color: #009c3b; color: white; margin-bottom: 8px">
                        <a href="${url}">CONFIRMAR EMAIL</a>
                      </div>

                      <p>Tenha um ótimo dia na Drip Br.</p>
                    </div>
                    <style>
                      .main { background-color: white; }
                      a:hover { border-left-width: 1em; min-height: 2em; }
                    </style>
                  </body>
                </html>
                `
            })

    } catch (error) {
        console.log(error);
    }
}

const sendJWTToken = async (email, messageBuilder, request) => {
    const token = jwt.sign(
        {
            email: email
        },
        process.env.JWT_SECRET ?? JWT_SECRET,
        {
            expiresIn: '1d'
        })

    messageBuilder(email, Buffer.from(token).toString('base64'), request)
}

const sendRecovery = (request, email) => {
    return sendJWTToken(email, recoveryEmail, request)
}

const sendVerification = (request, email) => {
    return sendJWTToken(email, verificationEmail, request)
}

const verifyEmail = token => {
    try {
        return jwt.verify(Buffer.from(token, 'base64').toString('ascii'), process.env.JWT_SECRET ?? JWT_SECRET)
    }
    catch (e) {
        return null
    }
}

module.exports = {
    sendVerification, verifyEmail,
    sendRecovery,
    doAppointmentEmail
}
