
export class DoctorService {
    public id_doctor_service: number   
    public id_doctor: string
    public id_service: number
    public price: number
    constructor (
        id_doc_service: number,
        id_doctor: string,
        id_service: number,
        price: number
    ) {
        this.id_doctor_service = id_doc_service;
        this.id_service = id_service;
        this.id_doctor = id_doctor;
        this.price = price;
    }
}