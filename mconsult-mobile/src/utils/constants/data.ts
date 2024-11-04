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

const medical_services = [
    {
        id_service: 1,
        service: "Rhinoplastia",
        desc: "É uma cirurgia de pequeno porte que remodela a estrutura nasal, tanto óssea quanto a parte cartilaginosa, procurada por grande parte da população para melhorar a estrutura do nariz e a para as pessoas que possuem dificuldade para quanto a respiração. Mesmo sendo de pequeno porte se faz necessário o uso de centro cirúrgico e anestesia.",
        price: 3200,
    },
    {
        id_service: 2,
        service: "Lipoaspiração",
        desc: "É uma cirurgia plástica que remove o excesso de gordura localizada em determinadas áreas do corpo, como o abdômen, as coxas, os braços e as costas.",
        price: 520,
    },
    {
        id_service: 3,
        service: "Mamoplastia",
        desc: "É um procedimento cirúrgico que altera o formato, o tamanho ou a aparência das mamas. É uma das cirurgias plásticas mais realizadas no mundo e no Brasil. \nA mamoplastia pode ser realizada por motivos estéticos ou médicos, com o objetivo de:\nMelhorar a autoestima e a qualidade de vida \nTornar as mamas mais harmoniosas e proporcionais ao restante do corpo \nReconstruir a mama após a mastectomia ou lesão",
        price: 520,
    },

]

const opening_hours = [
    "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", 
    , "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00"
  ]

export {doctors, appointments, medical_services, opening_hours}