const { Service } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get =  async (request, response) => {
  try {
    const params = request?.query ?? {};

    const services = await Service.find({...params, deletedAt: null }).populate('createdBy');

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
    const value = getDefaultDataWhenCreate(request);
    const service = request.body;

    const newService = new Service({...service, ...value});
    await newService.save();

    response.status(201).json({ message: 'Serviço criado com sucesso', service: newService });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar o serviço' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;
    let value = getDefaultDataWhenUpdate(request);

    const service = await Service.findOne({ _id, deletedAt: null });
    const params = request.body;


    if (!service) {
      return response.status(404).json({ message: 'Serviço não encontrado' });
    }
    service = new Service({...service, ...params, ...value});
    await service.save();

    response.status(200).json({ message: 'Serviço atualizado com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar o serviço' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { _id } = request.params
    const value = getDefaultDataWhenDelete(request);

    let service = await Service.findOne({ _id, deletedAt: null });

    if (!service) {
      return response.status(404).json({ message: 'Serviço não encontrado' });
    }

    service = new Service({ ...service, ...value});
    await service.save();

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir o serviço' });
  }
}

