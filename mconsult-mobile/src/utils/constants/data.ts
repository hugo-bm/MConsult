const doctors = [
    {
        id_doctor: 1,
        name: "Dr. Armando Da Silva Pinto",
        specialty: "Urologia",
        icon: "M",
    },
    {
        id_doctor: 2,
        name: "Dra. Isadora Pinto",
        specialty: "Cardiologista",
        icon: "F",
    },
    {
        id_doctor: 3,
        name: "Dr. Marcio Carvalho",
        specialty: "Endocrinologista",
        icon: "M",
    },
]

const appointments = [
    {
        id_appointment: 1,
        service: "Consulta",
        doctor: "Dr. Armando Da Silva Pinto",
        specialty: "Urologia",
        booking_date: "2024-10-30",
        booking_hour: "10:30"
    },
    {
        id_appointment: 2,
        service: "Consulta",
        doctor: "Dr. Armando Da Silva Pinto",
        specialty: "Urologia",
        booking_date: "2024-11-01",
        booking_hour: "10:30"
    },
    {
        id_appointment: 3,
        service: "Consulta",
        doctor: "Dra. Isadora Pinto",
        specialty: "Cardiologista",
        booking_date: "2024-10-30",
        booking_hour: "10:30"
    }
]

export {doctors, appointments}