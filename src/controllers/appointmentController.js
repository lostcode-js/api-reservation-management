const { Appointment, ObjectId } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get =  async (request, response) => {
  try {
    const params = request?.query ?? {};
    const appointments = await Appointment.find({...params, deletedAt: null }).populate('services').populate('createdBy').populate('employee').populate('customer');

    response.status(200).json({ appointments });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar as reservas' });
  }
};

exports.getById = async (request, response) => {
  try {
    const { _id } = request.params;
    const appointment = await Appointment.findOne({ _id, deletedAt: null });

    if (!appointment) {
      return response.status(404).json({ message: 'Reserva não encontrada' });
    }

    response.status(200).json({ appointment });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar a reserva' });
  }
};

exports.post = async (request, response) => {
  try {
    const appointment = request.body;
    const value = getDefaultDataWhenCreate(request);

    console.log({appointment})

    const newAppointment = new Appointment({...appointment, ...value});
    console.log({newAppointment})
    await newAppointment.save();

    response.status(201).json({ message: 'Reserva criada com sucesso', appointment: newAppointment });
  } catch (error) {
    console.log({error})

    response.status(500).json({ message: 'Ocorreu um erro ao criar a reserva' });
  }
};

exports.put = async (request, response) => {
  try {
    const { _id } = request.params;
    let appointment = await Appointment.findOne({ _id, deletedAt: null });

    if (!appointment) {
      return response.status(404).json({ message: 'Reserva não encontrada' });
    }

    const value = getDefaultDataWhenUpdate(request);

    await Appointment.findOneAndUpdate({ _id }, { $set: { ...request.body, ...value } });

    response.status(200).json({ message: 'Reserva atualizada com sucesso' });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar a reserva' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { _id } = request.params
    const appointment = await Appointment.findOne({ _id, deletedAt: null });

    if (!appointment) {
      return response.status(404).json({ message: 'Reserva não encontrada' });
    }
    const value = getDefaultDataWhenDelete(request);

    await Appointment.findOneAndUpdate({ _id }, { $set: { ...value } });

    return response.status(200).send({ message: 'Reserva removida com sucesso' });
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a reserva' });
  }
}

