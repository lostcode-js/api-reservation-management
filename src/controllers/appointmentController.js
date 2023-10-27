const { Appointment, ObjectId } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

exports.get =  async (request, response) => {
  try {
    const params = request?.query ?? {};
    const appointments = await Appointment.find({...params, deletedAt: null });

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

    const newAppointment = new Appointment({...appointment, ...value});
    await newAppointment.save();

    response.status(201).json({ message: 'Reserva criada com sucesso', appointment: newAppointment });
  } catch (error) {
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
    const params = request.body;

    appointment = new Appointment({...appointment, ...params, ...value});
    await appointment.save();

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

    appointment = new Appointment({ ...appointment, ...value});
    await appointment.save();

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a reserva' });
  }
}

