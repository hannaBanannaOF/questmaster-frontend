export interface User {
  username: string;
  name?: string;
  surname?: string;
}

/** Como o usuário é chamado na interface: nome, senão username. */
export function getDisplayName(user: User): string {
  return user.name || user.username;
}
