const { User } = require('../database')
const { requireAuth } = require('../util/auth.js')

exports.get = ('/', requireAuth, async (request, response) => {
  const params = request?.query ?? {};

  try {
    const users = await User.find({...params, deletedAt: null });

    response.status(200).json({ users });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar os usuários' });
  }
});

exports.getById = ('/:_id', requireAuth, async (request, response) => {
  const { _id } = request.params;

  try {
    const user = await User.findOne({ _id, deletedAt: null });

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    response.status(200).json({ user });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar o usuário' });
  }
});


exports.post = ('/', requireAuth, async (request, response) => {
  const user = request.body;

  try {
    const newUser = new User(user);
    await newUser.save();

    response.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar o usuário' });
  }
});

exports.put = ('/:_id', requireAuth, async (request, response) => {
  const { _id } = request.params;

  try {
    const user = await User.findOne({ _id, deletedAt: null });

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }
    user = {...user, ...request.user};
    await user.save();

    response.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário' });
  }
});

exports.delete = ('/:_id', requireAuth, async (request, response) => {
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
})

