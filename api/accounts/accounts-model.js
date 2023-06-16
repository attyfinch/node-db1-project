const db = require('../../data/db-config')

const getAll = async () => {
  const accounts = await db('accounts').select('id', 'name', 'budget');
  return accounts;
}

const getById = async id => {
  const account = await db('accounts').where('id', id).first();
  return account;
}

const create = async account => {
  const [newAccountId] = await db('accounts').insert(account);
  return newAccountId;
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id);
  const updatedAccount = await getById(id);
  return updatedAccount;
}

const deleteById = async id => {
  const account = await getById(id);
  await db('accounts').del().where('id', id);
  return account;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
