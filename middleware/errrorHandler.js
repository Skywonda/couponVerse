module.exports = async (err, req, res, next) => {
  console.log('afahf')
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || err.msg || "An error occured!",
  };
  console.log(err);
  return res.status(customError.statusCode).json({ msg: customError.message });
};
