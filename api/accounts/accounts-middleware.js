const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  // trim whitespace
  // budgtet must be able to be turned into number
  // budget not negative or over 1 million


  const { name, budget } = req.body;




}

exports.checkAccountNameUnique = async (req, res, next) => {
  const accounts = await Accounts.getAll();
  const { name } = req.body;

  const dupeCheck = await accounts.forEach(ele => {
    if (ele.name === name.trim()) {
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
