import CustomError from './custom.error';

class ConflictError extends CustomError {
  statusCode: number;

  constructor(message = 'Houbo un conflito') {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;
