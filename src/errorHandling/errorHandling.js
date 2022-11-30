function errorHandle(error, res) {
  if (error.name == "ValidationError") {
    return res.status(400).send({ status: false, message: error.message });
  }
  if (error.code == 11000) {
    return res.status(400).send({
      status: false,

      message: `Duplicate value provided at ${Object.keys(
        error.keyValue
      )}: ${Object.values(error.keyValue)}`,
    });
  }
  if (error.name == "CastError") {
    return res.status(400).send({ status: false, message: error.message });
  }
  return res.status(500).send({ status: false, message: error.message });
}
module.exports = errorHandle;
