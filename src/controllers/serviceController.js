const { Service } = require('../database')

exports.get =  async (request, response) => {
  try {
    const params = request?.query ?? {};

    const services = await Service.find({...params, deletedAt: null });

    response.status(200).json({ services });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar os serviços' });
  }
};

exports.getById = async (request, response) => {
  try {
    const { _id } = request.params;

    const service = await Service.findOne({ _id, deletedAt: null });

    if (!service) {
      return response.status(404).json({ message: 'Serviço não encontrado' });
    }

    response.status(200).json({ service });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar o serviço' });
  }
};


exports.post = async (request, response) => {
  try {
    const service = request.body;

    const newService = new Service({...service, createdAt: new Date(), updatedAt: new Date()});
    await newService.save();

    response.status(201).json({ message: 'Serviço criado com sucesso', service: newService });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar o serviço' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;

    const service = await Service.findOne({ _id, deletedAt: null });

    if (!service) {
      return response.status(404).json({ message: 'Serviço não encontrado' });
    }
    service = {...service, ...request.service, updatedAt: new Date()};
    await service.save();

    response.status(200).json({ message: 'Serviço atualizado com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar o serviço' });
  }
};

exports.delete = async (request, response) => {
  const { _id } = request.params
  try {
    const service = await Service.findOne({ _id, deletedAt: null });

    if (!service) {
      return response.status(404).json({ message: 'Serviço não encontrado' });
    }

    service.deletedAt = new Date();
    await service.save();

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir o serviço' });
  }
}

