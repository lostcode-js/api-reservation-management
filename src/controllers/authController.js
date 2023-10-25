const { User, Token } = require('../database')
const { sha256, generateRandomString } = require('../util/util.js')
const {sendVerification, verifyEmail, sendRecovery} = require('../util/email.js')

exports.login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const navigator = request.headers['user-agent'];
    const hashedPassword = sha256(password);

    const user = await User.findOne({ email, password: hashedPassword, deletedAt: null });

    if (!user) {
      throw new Error('Email ou senha incorretos');
    }

    const tokenValue = generateRandomString(40);

    const token = new Token({
      user,
      value: tokenValue,
      navigator,
      active: true,
      ip: request.ip,
      lastActivity: new Date(),
    });

    await token.save();

    response.status(200).json({ user, token: tokenValue });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

exports.signup = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const navigator = request.headers['user-agent'];

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const newUser = new User({
      name: name?.trim(),
      email: email?.trim(),
      password: sha256(password),
      about: '',
      isVerified: false,
      createdAt: new Date(),
    });

    await newUser.save();

    const tokenValue = generateRandomString(40);

    await sendVerification(request, email);

    const token = new Token({
      user: newUser,
      value: tokenValue,
      navigator,
      active: true,
      ip: request.ip,
      lastActivity: new Date(),
    });

    await token.save();

    response.status(200).json({ user: newUser, token: tokenValue });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

exports.sendVerification = async (request, response) => {
  try {
    const email = request.params.email;

    await sendVerification(request, email);

    response.status(200).json({ message: 'Email de verificação enviado com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao enviar o email de verificação' });
  }
};

exports.verify =  async (request, response) => {
  try {
    const { token } = request.body;
    const info = verifyEmail(token);

    if (info) {
      await User.updateOne({ email: info.email }, { $set: { isVerified: true } });
      response.status(200).json({ message: 'Email verificado com sucesso' });
    } 

    throw new Error('Token inválido ou expirado');
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
}

exports.recoveryPassword = async (request, response) => {
  try {
    const { email } = request.params;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Conta não existe');
    }

    await sendRecovery(request, email);

    response.status(200).json({ message: 'Email de recuperação de senha enviado com sucesso' });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

exports.changePassword = async (request, response) => {
  try {
    const { old, token, password } = request.body;

    if (old && request.user) {
      if (sha256(old) !== request.user.password) {
        throw new Error('Senha antiga incorreta');
      }

      request.user.password = sha256(password);
      await request.user.save();

      response.status(200).json({ message: 'Senha alterada com sucesso' });
    } else {
      const info = verifyEmail(token);

      if (!info) {
        throw new Error('Token inválido ou expirado');
      }

      await User.updateOne({ email: info.email }, { $set: { isVerified: true, password: sha256(password) } });
      response.status(200).json({ message: 'Senha alterada com sucesso' });
    }
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};