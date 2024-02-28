import CustomError from './custom.error';

class UnprocessableContentError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 422;
  }
}

export default UnprocessableContentError;
