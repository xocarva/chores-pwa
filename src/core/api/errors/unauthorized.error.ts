class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message = 'Non autorizado') {
    super(message);
    this.statusCode = 401;
  }
}

export default UnauthorizedError;
