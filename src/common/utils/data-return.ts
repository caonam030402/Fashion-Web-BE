import { HttpException, HttpStatus } from '@nestjs/common';

type dataType<T> = T;

export const successResponse = <T>(message: string, data: dataType<T>) => {
  return {
    message: message,
    data: data,
  };
};

export const errorResponse = <T>(status: HttpStatus, message: string) => {
  throw new HttpException(
    {
      status: status,
      message: [message],
    },
    status,
  );
};
