import {User}  from "../enitites/User"
import { Email } from "../shared/Email";

export interface IUserRepository {
    findById(id: string): Promise<User |null>;
    findByEmail(email: Email): Promise<User |null>;
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}