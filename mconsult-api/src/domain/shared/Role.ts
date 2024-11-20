export enum Role {
    employee = "EMP",
    admin = "ADM",
    manager = "MNG",
    viewer = "VWE"
}

// Método de validação
export function isValidRole(role: string): boolean {
  return Object.values(Role).includes(role as Role);
}

export function getRoleKeyByValue(value: string): string | undefined {
  const enumType = Role
  const entry = Object.entries(enumType).find(([_, v]) => v === value);
  return entry ? entry[0] : undefined;
}