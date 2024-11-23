import bcrypt from 'bcrypt';
import { IHashService } from '../../domain/services/IHashService';
import appConfig from '../../config/environment';

export class HashServiceBcrypt implements IHashService {
  private salt: number;
  private static _instance: HashServiceBcrypt;

  private constructor() {
    this.salt =  appConfig.salt_crypto;
  }

  public static get instance(): HashServiceBcrypt {
    if (!this._instance) {
        this._instance = new HashServiceBcrypt();
      }
      return this._instance;
    }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
