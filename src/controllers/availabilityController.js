const { Availability } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get = async (request, response) => {
  try {
    const params = request?.query ?? {};
    const availabilities = await Availability.find({ ...params, deletedAt: null }).populate('company').populate('employee').populate('createdBy');

    response.status(200).json({ availabilities });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar as disponibilidades' });
  }
};

exports.getById = async (request, response) => {
  try {
    const { _id } = request.params;
    const availability = await Availability.findOne({ _id, deletedAt: null });

    if (!availability) {
      return response.status(404).json({ message: 'Disponibilidade não encontrada' });
    }

    response.status(200).json({ availability });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar a disponibilidade' });
  }
};

exports.post = async (request, response) => {
  try {
    const value = getDefaultDataWhenCreate(request);

    const availability = request.body;
    const newAvailability = new Availability({
      ...availability,
      ...value
    });
    console.log({newAvailability})
    await newAvailability.save();

    response.status(201).json({ message: 'Disponibilidade criada com sucesso', availability: newAvailability });
  } catch (error) {
    console.log({error})

    response.status(500).json({ message: 'Ocorreu um erro ao criar a disponibilidade' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;
    let availability = await Availability.findOne({ _id, deletedAt: null });

    if (!availability) {
      return response.status(404).json({ message: 'Disponibilidade não encontrada' });
    }

    const value = getDefaultDataWhenUpdate(request);
    await Availability.findOneAndUpdate({ _id }, { $set: { ...request.body, ...value } });

    response.status(200).json({ message: 'Disponibilidade atualizada com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar a disponibilidade' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { _id } = request.params
    let availability = await Availability.findOne({ _id, deletedAt: null });
    const value = getDefaultDataWhenDelete(request);

    if (!availability) {
      return response.status(404).json({ message: 'Disponibilidade não encontrada' });
    }
    await Availability.findOneAndUpdate({ _id }, { $set: { ...value } });

    return response.status(200).send({ message: 'Disponibilidade removida com sucesso' });
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a disponibilidade' });
  }
}

