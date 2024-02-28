import CustomError from './custom.error';

class ForbiddenError extends CustomError {
  statusCode: number;

  constructor(message = 'Acceso denegado') {
    super(message);
    this.statusCode = 403;
  }
}

export default ForbiddenError;
