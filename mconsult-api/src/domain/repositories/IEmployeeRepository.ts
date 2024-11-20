import { Employee } from "../enitites/Employee";

export interface IEmployeeRepository{
    findById(id: string): Promise<Employee |null>;
    findAll(): Promise<Employee[] |null>;
    create(employee: Employee): Promise<void>;
    update(employee: Employee): Promise<void>;
    delete(id: string): Promise<void>;
}