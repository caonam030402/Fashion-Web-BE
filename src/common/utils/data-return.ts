type dataType<T> = T;

export const successResponse = <T>(message: string, data: dataType<T>) => {
  return {
    message: message,
    data: data,
  };
};
