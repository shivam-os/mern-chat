export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    data: err.data || null,
    // stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
