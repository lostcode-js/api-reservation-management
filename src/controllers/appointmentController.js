const { Appointment, ObjectId, User, Notification } = require('../database')
const { getDefaultDataWhenCreate, getDefaultDataWhenUpdate, getDefaultDataWhenDelete } = require('../utils/util.js')

function formatData(data) {
  const dateObj = new Date(data);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
}

exports.get = async (request, response) => {
  try {
    const params = request?.query ?? {};
    const appointments = await Appointment.find({ ...params, deletedAt: null }).populate('services').populate('createdBy').populate('employee').populate('customer');

    response.status(200).json({ appointments });
  } catch (error) {
    response.status(500).json({ message: 'Ocorreu um erro ao buscar as reservas' });
  }
};

exports.getPaginate = async (request, response) => {
  try {
    const paginate = JSON.parse(request.query.paginate ?? '{}');

    const currentPage = paginate.currentPage || 1;
    const itemsPerPage = paginate.itemsPerPage || 10;
    const skip = (currentPage - 1) * itemsPerPage;

    const sort = request.query?.sort ? JSON.parse(request.query?.sort) : { key: 'date', order: -1 };
    let sorted = {}
    sorted[sort.key] = sort.order

    delete request.query.paginate
    delete request.query.sort

    const params = request.query ?? {};

    const totalItems = await Appointment.countDocuments({ ...params, deletedAt: null });

    const appointments = await Appointment.find({ ...params, deletedAt: null }).sort(sorted)
      .skip(skip).populate('services').populate('createdBy').populate('employee').populate('customer');

    response.status(200).json({
      appointments, paginate: {
        currentPage, itemsPerPage, totalItems
      }, sort
    });
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

    const newAppointment = new Appointment({ ...appointment, ...value });
    await newAppointment.save();

    const newNotification = new Notification({ user: appointment.employee, message: `Uma reserva foi criada para a data ${formatData(appointment.date)} - ${appointment.startTime}`, ...value });

    await newNotification.save();

    const users = await User.find({ type: 'admin', deletedAt: null });

    await users.map(async item => {
      const newNotification = new Notification({ user: item._id, message: `Uma reserva foi criada para a data ${formatData(appointment.date)} - ${appointment.startTime}`, createdAt: new Date(), ...value });

      await newNotification.save();
    })

    response.status(201).json({ message: 'Reserva criada com sucesso', appointment: newAppointment });
  } catch (error) {
    console.log({ error })

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

    const users = await User.find({ type: 'admin', deletedAt: null });

    await users.map(async item => {
      const newNotification = new Notification({ user: item._id, message: `Uma reserva foi atualizada para a data ${formatData(request.body.date)} - ${request.body.startTime}`, createdAt: new Date(), ...value });

      await newNotification.save();
    })

    response.status(200).json({ message: 'Reserva atualizada com sucesso' });
  } catch (error) {
    console.log({ error })
    response.status(500).json({ message: 'Ocorreu um erro ao atualizar a reserva' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { _id } = request.params
    const appointment = await Appointment.findOne({ _id, deletedAt: null }).populate('customer');

    if (!appointment) {
      return response.status(404).json({ message: 'Reserva não encontrada' });
    }
    const value = getDefaultDataWhenDelete(request);

    await Appointment.findOneAndUpdate({ _id }, { $set: { ...value } });

    const users = await User.find({ type: 'admin', deletedAt: null });

    await users.map(async item => {
      const newNotification = new Notification({ user: item._id, message: `Uma reserva foi cancelada do cliente com email ${appointment.customer?.email}`, createdAt: new Date(), ...value });

      await newNotification.save();
    })

    return response.status(200).send({ message: 'Reserva removida com sucesso' });
  } catch (error) {
    return response.status(500).json({ message: 'Ocorreu um erro ao excluir a reserva' });
  }
}

