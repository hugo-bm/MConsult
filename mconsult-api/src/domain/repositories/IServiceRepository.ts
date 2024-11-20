import { Service } from "../enitites/Service";

export interface IServiceRepository{
    findAll(): Promise<Service[] |null>;
    findOne(id: number): Promise<Service |null>;
    create(service: Service): Promise<void>;
    update(service: Service): Promise<void>;
    delete(id: number): Promise<void>;
}