// Ponto de entrada do módulo para as rotas (Server Components).
// Client components de outros módulos devem importar caminhos específicos,
// nunca este barrel (ele carrega loaders server-only).
export * from './domain';
export * from './presentation';
