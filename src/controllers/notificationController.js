const { Notification, ObjectId } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get =  async (request, response) => {
  try {
    const params = request?.query ?? {};
    const notifications = await Notification.find({...params, deletedAt: null });

    response.status(200).json({ notifications });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar as notificações' });
  }
};

exports.getById = async (request, response) => {
  try {
    const { _id } = request.params;
    const notification = await Notification.findOne({ _id, deletedAt: null });

    if (!notification) {
      return response.status(404).json({ message: 'Notificação não encontrada' });
    }

    response.status(200).json({ notification });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar a notificação' });
  }
};

exports.post = async (request, response) => {
  try {
    const value = getDefaultDataWhenCreate(request);
    const notification = request.body;

    const newNotification = new Notification({...notification,
    ...value});
    await newNotification.save();

    response.status(201).json({ message: 'Notificação criada com sucesso', notification: newNotification });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar a notificação' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;
    const notification = await Notification.findOne({ _id, deletedAt: null });

    if (!notification) {
      return response.status(404).json({ message: 'Notificação não encontrada' });
    }

    const value = getDefaultDataWhenUpdate(request);

    await Notification.findOneAndUpdate({ _id }, { $set: { ...request.body, ...value } });


    response.status(200).json({ message: 'Notificação atualizada com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar a notificação' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { _id } = request.params
    let notification = await Notification.findOne({ _id, deletedAt: null });
    const value = getDefaultDataWhenDelete(request);

    if (!notification) {
      return response.status(404).json({ message: 'Notificação não encontrada' });
    }

    await Notification.findOneAndUpdate({ _id }, { $set: { ...value } });

    return response.status(200).send({ message: 'Notificação removida com sucesso' });
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a notificação' });
  }
}

exports.read = async (request, response) => {
  try {
    const { _id } = request.params;
    let notification = await Notification.findOne({ _id, deletedAt: null });
    const value = getDefaultDataWhenUpdate(request);

    if (!notification) {
      return response.status(404).json({ message: 'Notificação não encontrada' });
    }

    if (notification.readAt) {
      return response.status(400).json({ message: 'Notificação já foi lida' });
    }

    notification = new Notification({...notification, ...value});
    await notification.save();

    response.status(200).json({ message: 'Notificação atualizada com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar a notificação' });
  }
};

exports.readAll = async (request, response) => {
  try {
    const { _id } = request.user;
    const user = await User.findById(_id);
    const value = getDefaultDataWhenUpdate(request);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    await Notification.updateMany({ user: userId }, { $set: { readAt: new Date(), ...value } });

    await notification.save();
    response.status(200).json({ message: 'Notificações atualizadas com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar as notificações' });
  }
};

