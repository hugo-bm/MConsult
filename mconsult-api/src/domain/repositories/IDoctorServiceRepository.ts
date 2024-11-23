import { DoctorService } from "../enitites/DoctorService"

export interface IDoctorServiceRepository{
    //findAll(service_id: number): Promise<DoctorService[] | null>
    findOne(doctor_service_id: number): Promise<DoctorService | null>
    addDoctorService(service_id: number, doctor_id: string, price: number): Promise<void>
    updatePriceService(service_id: number, price: number): Promise<void>
    removeDoctorService(service_id: number): Promise<void>
}