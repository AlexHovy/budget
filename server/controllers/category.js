const Category = require('../models/Category');

const get = async (req, res) => {
  await Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(404).json({ error: 'No Categories found' }));
}

const getById = async (req, res) => {
  await Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.status(404).json({ error: 'No Category found' }));
}

const post = async (req, res) => {
  await Category.create(req.body)
    .then(category => res.json({ msg: 'Category added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this category' }));
}

const put = async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, req.body)
    .then(category => res.json({ msg: 'Updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to update the category' }));
}

const remove = async (req, res) => {
  await Category.findByIdAndRemove(req.params.id, req.body)
    .then(category => res.json({ mgs: 'Category entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a category' }));
}

module.exports = {
  get,
  getById,
  post,
  put,
  remove
};