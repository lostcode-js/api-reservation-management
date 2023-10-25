const { User } = require('../database')

exports.get =  async (request, response) => {
  try {
    const params = request?.query ?? {};

    const users = await User.find({...params, deletedAt: null });

    response.status(200).json({ users });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar os usuários' });
  }
};

exports.getById = async (request, response) => {
  try {
    const { _id } = request.params;

    const user = await User.findOne({ _id, deletedAt: null });

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    response.status(200).json({ user });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar o usuário' });
  }
};


exports.post = async (request, response) => {
  try {
    const user = request.body;

    const newUser = new User({...user, createAt: new Date(), updatedAt: new Date()});
    await newUser.save();

    response.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar o usuário' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;
    const user = await User.findOne({ _id, deletedAt: null });

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }
    user = {...user, ...request.user, updatedAt: new Date()};
    await user.save();

    response.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário' });
  }
};

exports.delete = async (request, response) => {
  const { _id } = request.params
  try {
    const user = await User.findOne({ _id, deletedAt: null });

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.deletedAt = new Date();
    await user.save();

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir o usuário' });
  }
}

