export class CelPhone {
    private readonly value: string;
  
    private constructor(phone: string) {
      const cleanedPhone = CelPhone.cleanPhone(phone);
  
      if (!CelPhone.isValidPhone(cleanedPhone)) {
        throw new Error("Invalid phone number format. It must be a Brazilian mobile number with nine digits after DDD.");
      }
      
      this.value = cleanedPhone;
    }
  
    public static create(phone: string): CelPhone {
      return new CelPhone(phone);
    }
  
    public getValue(): string {
      return this.value;
    }
  
    public getFormatted(): string {
      return CelPhone.formatPhone(this.value);
    }
  
    // Remove todos os caracteres que não sejam números
    private static cleanPhone(phone: string): string {
      return phone.replace(/\D/g, "");
    }
  
    // Valida o telefone limpo (apenas números) para celular brasileiro com nove dígitos
    private static isValidPhone(phone: string): boolean {
      // Expressão regular para validar o formato "+55" seguido de DDD (2 dígitos) e número de celular (9 dígitos)
      const phoneRegex = /^55\d{2}9\d{8}$/;
      return phoneRegex.test(phone);
    }
  
    // Formata o telefone para o padrão "+55 (99) 99999-9999"
    private static formatPhone(phone: string): string {
      const ddd = phone.slice(2, 4);
      const firstPart = phone.slice(4, 9);
      const secondPart = phone.slice(9);
  
      return `+55 (${ddd}) ${firstPart}-${secondPart}`;
    }
  }