const router = require('express').Router()
const Accounts = require('./accounts-model');
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.status(202).json(accounts)
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    res.status(202).json(account);
  } catch (err) {
    next(err);
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const name = req.body.name.trim();
  const budget = req.body.budget;

  if (isNaN(parseInt(budget)) === true) {
    res.status(400).json({message: "budget of account must be a number"})
  }

  try {
    const newAccountId = await Accounts.create({name, budget});
    const pullNewAccount = await Accounts.getById(newAccountId);
    res.status(201).json(pullNewAccount)
  } catch (err) {
    next(err);
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Accounts.deleteById(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something broke"
  })
})

module.exports = router;
