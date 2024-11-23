export interface IHashService {
  /**
   * Gera o hash de uma string (ex.: senha).
   * @param value A string a ser hasheada.
   * @returns Uma string com o hash gerado.
   */
  hash(value: string): Promise<string>;

  /**
   * Compara uma string com um hash.
   * @param value A string de entrada (ex.: senha).
   * @param hashedValue O hash armazenado.
   * @returns Um booleano indicando se a string corresponde ao hash.
   */
  compare(value: string, hashedValue: string): Promise<boolean>;
}
