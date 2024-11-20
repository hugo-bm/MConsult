export class Email {
    private readonly value: string;
  
    private constructor(email: string) {
      if (!Email.isValidEmail(email)) {
        throw new Error("Invalid email format.");
      }
      this.value = email;
    }
  
    public static create(email: string): Email {
      return new Email(email);
    }
  
    public getValue(): string {
      return this.value;
    }
  
    // Método de validação de formato de e-mail
    private static isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }