const errHandler = (errMsg, status) => {
  const error = new Error(errMsg);
  error.statusCode = status;
  throw error;
};

export default errHandler;
