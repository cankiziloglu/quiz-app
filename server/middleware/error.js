function error(err, req, res, next) {
  if (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  } else {
    next();
  }
}

module.exports = error;
