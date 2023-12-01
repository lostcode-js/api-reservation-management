const { Company } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get = async (request, response) => {
  try {
    const params = request?.query ?? {};

    const companys = await Company.find({...params, deletedAt: null }).populate('createdBy');

    response.status(200).json({ companys });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar as empresas' });
  }
};

exports.getPaginate = async (request, response) => {
  try {
    const paginate = JSON.parse(request.query.paginate ?? '{}');

    const currentPage = paginate.currentPage || 1;
    const itemsPerPage = paginate.itemsPerPage || 10;
    const skip = (currentPage - 1) * itemsPerPage;

    delete request.query.paginate

    const params = request.query ?? {};

    const totalItems = await Company.countDocuments({ ...params, deletedAt: null });

    const companys = await Company.find({...params, deletedAt: null }).skip(skip)
    .limit(itemsPerPage).populate('createdBy');

    response.status(200).json({ companys, paginate: {
      currentPage, itemsPerPage, totalItems
    } });
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

    await Company.findOneAndUpdate({ _id }, { $set: { ...request.body, ...value } });

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

    await Company.findOneAndUpdate({ _id }, { $set: { ...value } });

    return response.status(200).send({ message: 'Empresa removida com sucesso' });
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a empresa' });
  }
}

