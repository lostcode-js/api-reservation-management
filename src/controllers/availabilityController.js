const { Availability, Appointment, User } = require('../database')
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
    await newAvailability.save();

    response.status(201).json({ message: 'Disponibilidade criada com sucesso', availability: newAvailability });
  } catch (error) {
    console.log({ error })

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

const getNextTwoMonths = (today = new Date()) => {
  const days = [];

  const limit = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());

  for (let data = new Date(today); data <= limit; data.setDate(data.getDate() + 1)) {
    days.push(new Date(data));
  }

  return days
}

function calculateIntervalBetweenHours(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  const diffInMinutes = endTotalMinutes - startTotalMinutes;
  const diffInHours = diffInMinutes / 60;

  return diffInHours;
}

function calculateEndTime(appointment) {
  const { startTime, services } = appointment;

  const totalTime = services.reduce((total, service) => total + service.time, 0);

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const startTotalMinutes = startHour * 60 + startMinute;

  const endTotalMinutes = startTotalMinutes + totalTime;

  const endHour = Math.floor(endTotalMinutes / 60);
  const endMinute = endTotalMinutes % 60;
  const endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

  return endTime;
}

const isSameDate = (firstDate, secondDate) => {
  const isSameDay = firstDate.getUTCDate() === secondDate.getUTCDate()
  const isSameMonth = firstDate.getUTCMonth() === secondDate.getUTCMonth()
  const isSameYear = firstDate.getUTCFullYear() === secondDate.getUTCFullYear()

  return isSameDay && isSameMonth && isSameYear
}

exports.getDaysAvailabilityOfEmployee = async (request, response) => {
  try {
    const { _id } = request.params;

    const days = getNextTwoMonths();

    const user = await User.findOne({ _id, deletedAt: null });

    const availabilitiesCompany = (await Availability.find({ company: user.employer, type: 'available', deletedAt: null }))

    const unavailableCompany = (await Availability.find({ company: user.employer, type: 'unavailable', deletedAt: null }))

    const unavailableEmployee = await Availability.find({ employee: user._id, type: 'unavailable', deletedAt: null });

    const appointmentEmployee = await Appointment.find({ employee: user._id, deletedAt: null }).populate('services');

    let availableDays = days.filter(day => {
      const dayOfWeek = day.getUTCDay()

      const unavailable = unavailableCompany
        .filter(item => parseInt(item.dayOfWeek) === parseInt(dayOfWeek) || isSameDate(new Date(item.date), day));

      const employee = unavailableEmployee
        .filter(item => parseInt(item.dayOfWeek) === parseInt(dayOfWeek) || isSameDate(new Date(item.date), day));

      const appointment = appointmentEmployee
        .filter(item => isSameDate(new Date(item.date), day));

      if (unavailable.length || employee.length || appointment.length) {
        var timeAvailable = 0;

        availabilitiesCompany
          .filter(item => parseInt(item.dayOfWeek) === parseInt(dayOfWeek) || isSameDate(new Date(item.date), day))
          .forEach(item => {
            timeAvailable += calculateIntervalBetweenHours(item.startTime, item.endTime)
          });

        unavailable
          .forEach(item => {
            timeAvailable -= calculateIntervalBetweenHours(item.startTime, item.endTime)
          });

        employee
          .forEach(item => {
            timeAvailable -= calculateIntervalBetweenHours(item.startTime, item.endTime)
          });

        appointment
          .forEach(item => {
            timeAvailable -= calculateIntervalBetweenHours(item.startTime, calculateEndTime(item))
          });

        return timeAvailable < 0;
      }

      return false
    })

    availableDays = [...availableDays, ...days.filter(day => {
      const dayOfWeek = day.getUTCDay()

      return !availabilitiesCompany
        .filter(item => parseInt(item.dayOfWeek) === parseInt(dayOfWeek) || isSameDate(new Date(item.date), day)).length;
    })]

    response.status(200).json({ days: availableDays });
  } catch (error) {
    console.log({ error })
    response.status(500).json({ message: 'Ocorreu um erro ao buscar os dias' });
  }
};

function generate30MinuteIntervals() {
  const intervals = [];
  const intervalInMinutes = 30;

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += intervalInMinutes) {
      const formattedHour = String(hour).padStart(2, '0');
      const formattedMinute = String(minute).padStart(2, '0');
      const interval = `${formattedHour}:${formattedMinute}`;
      intervals.push(interval);
    }
  }

  return intervals;
}

function isTimeInMiddle(startTime, endTime, targetTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const [targetHour, targetMinute] = targetTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  const targetTotalMinutes = targetHour * 60 + targetMinute;

  return targetTotalMinutes >= startTotalMinutes && targetTotalMinutes < endTotalMinutes;
}

exports.getHoursAvailabilityOfEmployee = async (request, response) => {
  try {
    const { _id } = request.params;
    const params = request?.query ?? {};

    const date = new Date(JSON.parse(params.date));
    let hours = generate30MinuteIntervals();

    const user = await User.findOne({ _id, deletedAt: null });



    let availabilitiesCompany = await Availability.find({ company: user.employer, type: 'available', deletedAt: null })


    availabilitiesCompany = availabilitiesCompany.filter(item => {
      const dayOfWeek = item.dayOfWeek
      return date.getUTCDay() === dayOfWeek || isSameDate(new Date(item.date), date)
    })

    hours = hours.filter(hour => {
      return availabilitiesCompany.filter(item => isTimeInMiddle(item.startTime, item.endTime, hour)).length
    })

    let unavailableCompany = (await Availability.find({ company: user.employer, type: 'unavailable', deletedAt: null })).map(item => ({ date: item.date, dayOfWeek: item.dayOfWeek, startTime: item.startTime, endTime: item.endTime }));

    unavailableCompany = unavailableCompany.filter(item => {
      const dayOfWeek = item.dayOfWeek

      return date.getUTCDay() === dayOfWeek || isSameDate(new Date(item.date), date)
    })

    hours = hours.filter(hour => {
      return !unavailableCompany.filter(item => isTimeInMiddle(item.startTime, item.endTime, hour)).length
    })

    let unavailableEmployee = await Availability.find({ employee: user._id, type: 'unavailable', deletedAt: null });

    unavailableEmployee = unavailableEmployee.filter(item => {
      const dayOfWeek = item.dayOfWeek

      return date.getUTCDay() === dayOfWeek || isSameDate(new Date(item.date), date)
    })

    hours = hours.filter(hour => {
      return !unavailableEmployee.filter(item => isTimeInMiddle(item.startTime, item.endTime, hour)).length
    })

    let appointmentEmployee = await Appointment.find({ employee: user._id, deletedAt: null }).populate('services');

    appointmentEmployee = appointmentEmployee.filter(item => {
      return isSameDate(new Date(item.date), date)
    })

    hours = hours.filter(hour => {
      return !appointmentEmployee.filter(item => isTimeInMiddle(item.startTime, calculateEndTime(item), hour)).length
    })

    response.status(200).json({ hours });
  } catch (error) {
    console.log({ error })
    response.status(500).json({ message: 'Ocorreu um erro ao buscar as horas' });
  }
};