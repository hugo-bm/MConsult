import { PrismaClient } from "@prisma/client";

class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {
    // Impede a criação de novas instâncias fora da classe
  }

  // Método para acessar a instância única do Prisma
  private static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
      console.log("Prisma Client inicializado.");
    }
    return PrismaSingleton.instance;
  }

  // Método para conectar manualmente (opcional, Prisma se conecta automaticamente ao primeiro uso)
  public static async connect(): Promise<void> {
    const prisma = PrismaSingleton.getInstance();
    await prisma.$connect();
    console.log("Prisma Client conectado ao banco de dados.");
  }

  public static  get prismaInstance (): PrismaClient {
    return PrismaSingleton.getInstance();   
  }

  // Método para desconectar
  public static async disconnect(): Promise<void> {
    if (PrismaSingleton.instance) {
      await PrismaSingleton.instance.$disconnect();
      console.log("Prisma Client desconectado.");
    }
  }
}

export { PrismaSingleton };