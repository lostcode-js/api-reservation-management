const { User } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get =  async (request, response) => {
  try {
    const params = request.query ?? {};

    const users = await User.find({...params, deletedAt: null });

    response.status(200).json({ users });
  } catch (error) {
    console.log(error)
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
    const value = getDefaultDataWhenCreate(request);
    const user = request.body;

    const newUser = new User({...user, ...value});
    await newUser.save();

    response.status(201).json({ message: 'Usuário criado com sucesso', user: newUser, user });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar o usuário' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;
    let user = await User.findOne({ _id, deletedAt: null });

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const value = getDefaultDataWhenUpdate(request);

    await User.findOneAndUpdate({ _id }, { $set: { ...request.body, ...value } });

    response.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário' });
  }
};

exports.delete = async (request, response) => {
  try { 
    const { _id } = request.params
    const value = getDefaultDataWhenDelete(request);
  
    let user = await User.findOne({ _id, deletedAt: null });

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    await User.findOneAndUpdate({ _id }, { $set: { ...value } });

    return response.status(200).send({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir o usuário' });
  }
}

