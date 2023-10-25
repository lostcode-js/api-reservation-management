const { Availability } = require('../database')

exports.get = async (request, response) => {
  try {
    const params = request?.query ?? {};
    const availabilities = await Availability.find({ ...params, deletedAt: null });

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
    const user = request.user;
    const availability = request.body;
    const newAvailability = new Availability({
      ...availability,
      createdAt: new Date(),
      updatedAt: new Date(),
      generator: ObjectId(user._id)
    });
    await newAvailability.save();

    response.status(201).json({ message: 'Disponibilidade criada com sucesso', availability: newAvailability });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar a disponibilidade' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;
    const availability = await Availability.findOne({ _id, deletedAt: null });

    if (!availability) {
      return response.status(404).json({ message: 'Disponibilidade não encontrada' });
    }
    availability = { ...availability, ...request.availability, updatedAt: new Date(), };
    await availability.save();

    response.status(200).json({ message: 'Disponibilidade atualizada com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar a disponibilidade' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { _id } = request.params
    const availability = await Availability.findOne({ _id, deletedAt: null });

    if (!availability) {
      return response.status(404).json({ message: 'Disponibilidade não encontrada' });
    }

    availability.deletedAt = new Date();
    await availability.save();

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a disponibilidade' });
  }
}

