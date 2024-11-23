import appConfig from "./environment";

export const jwtConfig = {
    secret: appConfig.jwtSecret, // Use uma chave secreta segura
    expiresIn: appConfig.jwtExpiresIn,              // Tempo de expiração do token
  };