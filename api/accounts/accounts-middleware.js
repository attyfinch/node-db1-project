const Accounts = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {

  const { name, budget } = req.body;
  try {
    /* 
    this was very tricky to solve.
    The first bit of budget logic couldn't be framed as !budget, b/c that would trigger
    an error for a NaN value, which is what CodeGrade was setup to look for in terms of parsing
    the int. If you try to parseInt on a non integer you get NaN.

    Async didn't impact the outcome here.
    */

    if (!name || budget === undefined) {
      res.status(400).json({message: "name and budget are required"})
    } else if (name.trim().length > 100 || name.trim().length < 3) {
      res.status(400).json({message: "name of account must be between 3 and 100"})
    } else if (isNaN(parseInt(budget)) === true) {
      res.status(400).json({message: "budget of account must be a number"})
    } else if (parseInt(budget) < 0 || parseInt(budget) > 1000000) {
      res.status(400).json({message: "budget of account is too large or too small"})
    } else {
      next();  
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const accounts = await Accounts.getAll();
  const { name } = req.body;

  const dupeCheck = await accounts.forEach(ele => {
    if (ele.name === name) {
      res.status(400).json({message: "that name is taken"})
    }
  });
  next();
}

exports.checkAccountId = async (req, res, next) => {
  const id = await Accounts.getById(req.params.id);
  
  if (!id) {
    res.status(404).json({message: "account not found"})
  }
  next();
}
