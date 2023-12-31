const { Feedback } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get = async (request, response) => {
  try {
    const params = request?.query ?? {};

    const feedbacks = await Feedback.find({ ...params, deletedAt: null }).populate('createdBy');
    response.status(200).json({ feedbacks });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar os feedbacks' });
  }
};

exports.getPaginate = async (request, response) => {
  try {
    const paginate = JSON.parse(request.query.paginate ?? '{}');

    const currentPage = paginate.currentPage || 1;
    const itemsPerPage = paginate.itemsPerPage || 10;
    const skip = (currentPage - 1) * itemsPerPage;

    const sort = request.query?.sort ? JSON.parse(request.query?.sort) : { key: 'createdAt', order: -1 };
    let sorted = {}
    sorted[sort.key] = sort.order

    delete request.query.paginate
    delete request.query.sort

    const params = request.query ?? {};

    const totalItems = await Feedback.countDocuments({ ...params, deletedAt: null });

    const feedbacks = await Feedback.find({ ...params, deletedAt: null }).skip(skip).sort(sorted)
      .limit(itemsPerPage).populate('createdBy');

    response.status(200).json({
      feedbacks, paginate: {
        currentPage, itemsPerPage, totalItems
      }, sort
    });
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
    const value = getDefaultDataWhenCreate(request);

    const newFeedback = new Feedback({
      ...feedback, ...value
    });

    await newFeedback.save();

    response.status(201).json({ message: 'Feedback criado com sucesso', feedback: newFeedback });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar o feedback' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;
    let feedback = await Feedback.findOne({ _id, deletedAt: null });

    if (!feedback) {
      return response.status(404).json({ message: 'Feedback não encontrado' });
    }

    const value = getDefaultDataWhenUpdate(request);

    await Feedback.findOneAndUpdate({ _id }, { $set: { ...request.body, ...value } });

    response.status(200).json({ message: 'Feedback atualizado com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar o feedback' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { _id } = request.params
    const value = getDefaultDataWhenDelete(request);

    let feedback = await Feedback.findOne({ _id, deletedAt: null });

    if (!feedback) {
      return response.status(404).json({ message: 'Feedback não encontrado' });
    }

    await Feedback.findOneAndUpdate({ _id }, { $set: { ...value } });

    return response.status(200).send({ message: 'Feedback removido com sucesso' });
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir o feedback' });
  }
}

