import { CelPhone } from '../shared/CelPhone';
import { Email } from '../shared/Email';
import { getRoleKeyByValue, isValidRole, Role } from '../shared/Role';

export class Employee {
  public id_employee: string | undefined;
  public name: string | null;
  public email: Email;
  public userName: string;
  public celPhone: CelPhone;
  public password: string;
  public role: Role;
  public readonly createAt?: Date;
  public readonly updateAt?: Date;
  constructor(
    id: string | undefined,
    name: string | null,
    userName: string,
    email: Email,
    celPhone: CelPhone,
    password: string,
    role: string,
    createAt?: Date,
    updateAt?: Date,
  ) {
    this.id_employee = id;
    this.name = name;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.celPhone = celPhone;
    if (isValidRole(role)) {
      this.role = Role[role as keyof typeof Role];
    } else {
      throw new Error('Invalid role!');
    }
    this.updateAt = updateAt;
    this.createAt = createAt;
  }
  public get roleValue() {
    return getRoleKeyByValue(this.role)!;
  }

  public set roleValue(value: string) {
    if (isValidRole(value)) {
      this.role = Role[value as keyof typeof Role];
    } else {
      throw new Error('Invalid role!');
    }
  }

  public toJSON() {
    return {
      id: this.id_employee,
      name: this.name,
      user_name: this.userName,
      password: this.password,
      email: this.email,
      phone: this.celPhone.getFormatted(),
      role: this.role,
    };
  }
}
