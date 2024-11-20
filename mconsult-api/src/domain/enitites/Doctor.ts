import { DoctorService } from './DoctorService';

export class Doctor {
  public id_doctor: string | undefined;
  public name: string;
  public userName: string;
  public specialty: string;
  public icon: string;
  public password: string;
  public readonly createAt?: Date;
  public readonly updateAt?: Date;

  public Doctor_Service: DoctorService[] | undefined;
  constructor(
    id: string | undefined,
    name: string,
    userName: string,
    specialty: string,
    icon: string,
    password: string,
    services: DoctorService[] | undefined,
    createAt?: Date,
    updateAt?: Date,
  ) {
    this.id_doctor = id;
    this.name = name;
    this.userName = userName;
    this.password = password;
    this.specialty = specialty;
    this.icon = icon;
    this.Doctor_Service = services;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }

  public toJSON() {
    return {
      id: this.id_doctor,
      name: this.name,
      password: this.password,
      specialty: this.specialty,
      icon: this.icon,
      services: this.Doctor_Service ? this.Doctor_Service: [],
      createAt: this.createAt,
      updateAt: this.updateAt,
    };
  }
}
