import { CelPhone } from '../shared/CelPhone';
import { Email } from '../shared/Email';

export class User {
  public id_user: string | undefined;
  public name: string | null;
  public email: Email;
  public celPhone: CelPhone;
  public birth_date: Date;
  public password: string;
  public readonly createAt?: Date;
  public readonly updateAt?: Date;
  constructor(
    id: string | undefined,
    name: string | null,
    email: Email,
    celPhone: CelPhone,
    birth_date: Date,
    password: string,
    createAt?: Date,
    updateAt?: Date,
  ) {
    this.id_user = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.celPhone = celPhone;
    this.birth_date = birth_date;
    this.updateAt = updateAt;
    this.createAt = createAt;
  }

  public toJSON() {
    return {
      id: this.id_user,
      name: this.name,
      password: this.password,
      email: this.email,
      phone: this.celPhone.getFormatted(),
      birth_date: this.birth_date,
    };
  }
}
