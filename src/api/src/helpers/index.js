export const successResponse = (req, res, data = {}, code = 200) =>
  res.status(code).json({
    ...data,
  });

export const errorResponse = (req, res, error) =>
  res.status(error.code).json({
    message: error.message,
    details: error.details,
  });
