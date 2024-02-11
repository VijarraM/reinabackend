export const buildSuccessfulResponse = (message: string, data: any = null) => {
  return {
    statusCode: 200,
    message: message,
    data: data,
  };
};
