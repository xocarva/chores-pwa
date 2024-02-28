import CustomError from './custom.error';

class NotFoundError extends CustomError {
  statusCode: number;

  constructor(message = 'Non se atopou o recurso') {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
