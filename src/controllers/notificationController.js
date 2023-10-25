const { Notification, ObjectId } = require('../database')

exports.get =  async (request, response) => {
  const params = request?.query ?? {};
  try {
    const notifications = await Notification.find({...params, deletedAt: null });

    response.status(200).json({ notifications });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar as notificações' });
  }
};

exports.getById = async (request, response) => {
  const { _id } = request.params;

  try {
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
    const notification = request.body;
    const user = request.user;

    const newNotification = new Notification({...notification,
    createdAt: new Date(),
    updatedAt: new Date(),
    generator: ObjectId(user._id)});
    await newNotification.save();

    response.status(201).json({ message: 'Notificação criad com sucesso', notification: newNotification });
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
    notification = {...notification, ...request.notification, updatedAt: new Date()};
    await notification.save();

    response.status(200).json({ message: 'Notificação atualizada com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar a notificação' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { _id } = request.params
    const notification = await Notification.findOne({ _id, deletedAt: null });

    if (!notification) {
      return response.status(404).json({ message: 'Notificação não encontrada' });
    }

    notification.deletedAt = new Date();
    notification.updatedAt = new Date();
    await notification.save();

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a notificação' });
  }
}

exports.read = async (request, response) => {
  try {
    const { _id } = request.params;
    const notification = await Notification.findOne({ _id, deletedAt: null });

    if (!notification) {
      return response.status(404).json({ message: 'Notificação não encontrada' });
    }

    if (notification.readAt) {
      return response.status(400).json({ message: 'Notificação já foi lida' });
    }

    notification = {...notification, updatedAt: new Date(), readAt: new Date()};
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

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    await Notification.updateMany({ user: userId }, { $set: { updatedAt: new Date(), readAt: new Date() } });

    await notification.save();
    response.status(200).json({ message: 'Notificações atualizadas com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar as notificações' });
  }
};

