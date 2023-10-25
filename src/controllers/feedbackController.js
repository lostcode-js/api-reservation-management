const { Feedback } = require('../database')

exports.get = async (request, response) => {
  try {
    const params = request?.query ?? {};

    const feedbacks = await Feedback.find({ ...params, deletedAt: null });

    response.status(200).json({ feedbacks });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar os feedbacks' });
  }
};

exports.getById = async (request, response) => {
  try {
    const { _id } = request.params;

    const feedback = await Feedback.findOne({ _id, deletedAt: null });

    if (!feedback) {
      return response.status(404).json({ message: 'Feedback não encontrado' });
    }

    response.status(200).json({ feedback });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar o feedback' });
  }
};


exports.post = async (request, response) => {

  try {
    const feedback = request.body;
    const user = request.user;

    const newFeedback = new Feedback({
      ...feedback, createdAt: new Date(),
      updatedAt: new Date(), user: ObjectId(user._id)
    });
    await newFeedback.save();

    response.status(201).json({ message: 'Feedback criado com sucesso', feedback: newFeedback });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar o feedback' });
  }
};

exports.put = async (request, response) => {
  const { _id } = request.params;

  try {
    const feedback = await Feedback.findOne({ _id, deletedAt: null });

    if (!feedback) {
      return response.status(404).json({ message: 'Feedback não encontrado' });
    }
    feedback = {
      ...feedback, ...request.feedback, updatedAt: new Date(),
    };
    await feedback.save();

    response.status(200).json({ message: 'Feedback atualizado com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar o feedback' });
  }
};

exports.delete = async (request, response) => {
  const { _id } = request.params
  try {
    const feedback = await Feedback.findOne({ _id, deletedAt: null });

    if (!feedback) {
      return response.status(404).json({ message: 'Feedback não encontrado' });
    }

    feedback.deletedAt = new Date();
    await feedback.save();

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir o feedback' });
  }
}

