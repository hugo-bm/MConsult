import { Appointment } from '../../domain/enitites/Appointment';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMinutes,
  format,
  isBefore,
} from 'date-fns';

export class GetMonthlyAvailability {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(
    doctorId: string,
    serviceDuration: number,
    month: number,
    year: number,
  ) {
    const monthStart = startOfMonth(new Date(year, month - 1));
    const monthEnd = endOfMonth(new Date(year, month - 1));
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const appointments = await this.appointmentRepository.findAllbyDoctor(
      doctorId,
      monthStart,
      monthEnd,
    );

    const availability: Record<string, string[]> = {};

    for (const day of daysInMonth) {
      //const dayOfWeek = day.getDay();
      const dailySchedule = [ // make static momentarily until calendar scheduling functions are implemented
        {
          day_of_week: 1, // Segunda-feira
          start_time: '08:00', // Horário de início
          end_time: '12:00', // Horário de fim
        },
        {
          day_of_week: 1, // Segunda-feira
          start_time: '13:00', // Horário de início
          end_time: '16:00', // Horário de fim
        },
      ];

      const dayKey = format(day, 'yyyy-MM-dd');
      const dailyAppointments: Appointment[] | null = appointments != null ? appointments.filter(
        (appt) => format(appt.booking_date, 'yyyy-MM-dd') === dayKey,
      ): null;

      const availableTimes: string[] = [];

      for (const schedule of dailySchedule) {
        let startTime = new Date(`${dayKey}T${schedule.start_time}`);
        const endTime = new Date(`${dayKey}T${schedule.end_time}`);

        while (isBefore(startTime, endTime)) {
          const nextSlot = addMinutes(startTime, serviceDuration);
          const isOccupied = dailyAppointments?dailyAppointments.some(
            (appt) => startTime.getTime() === appt.booking_date.getTime()
          ): false;

          if (!isOccupied) {
            availableTimes.push(format(startTime, "HH:mm"));
          }

          startTime = nextSlot;
        }
      }
      availability[dayKey] = availableTimes;
    }
    return availability;
  }
}
