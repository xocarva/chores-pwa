import CustomError from './custom.error';

class GenericError extends CustomError {
  statusCode: number;

  constructor(message = 'Algo foi mal') {
    super(message);
    this.statusCode = 500;
  }
}

export default GenericError;
