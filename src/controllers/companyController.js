const { Company } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get = async (request, response) => {
  try {
    const params = request?.query ?? {};

    const companys = await Company.find({...params, deletedAt: null });

    response.status(200).json({ companys });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar as empresas' });
  }
};

exports.getById = async (request, response) => {
  try {
    const { _id } = request.params;

    const company = await Company.findOne({ _id, deletedAt: null });

    if (!company) {
      return response.status(404).json({ message: 'Empresa não encontrada' });
    }

    response.status(200).json({ company });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar uma empresa' });
  }
};

exports.post = async (request, response) => {
  try {
    const value = getDefaultDataWhenCreate(request);
    const company = request.body;

    const newCompany = new Company({...company, ...value});
    await newCompany.save();

    response.status(201).json({ message: 'Empresa criada com sucesso', company: newCompany });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao criar a empresa' });
  }
};

exports.put =  async (request, response) => {
  try {
    const { _id } = request.params;
    let company = await Company.findOne({ _id, deletedAt: null });

    if (!company) {
      return response.status(404).json({ message: 'Empresa não encontrada' });
    }
    const value = getDefaultDataWhenUpdate(request);
    const params = request.body;

    company = new Company({...company, ...params,  ...value});
    await company.save();

    response.status(200).json({ message: 'Empresa atualizada com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar a Empresa' });
  }
};

exports.delete =  async (request, response) => {
  try {
    const { _id } = request.params
    const value = getDefaultDataWhenDelete(request);
    let company = await Company.findOne({ _id, deletedAt: null });

    if (!company) {
      return response.status(404).json({ message: 'Empresa não encontrada' });
    }

    company = new Company({ ...company, ...value});
    await company.save();

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a empresa' });
  }
}

