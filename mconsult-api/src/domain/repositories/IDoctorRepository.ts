import { Doctor } from "../enitites/Doctor";

export interface IDoctorRepository{
    findById(id: string): Promise<Doctor |null>;
    findAll(): Promise<Doctor[] |null>;
    create(doctor: Doctor): Promise<void>;
    update(doctor: Doctor): Promise<Doctor | null>;
    delete(id: string): Promise<void>;
}