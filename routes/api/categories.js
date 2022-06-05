const express = require('express');
const router = express.Router();

const Category = require('../../models/Category');

router.get('/', (req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(404).json({ error: 'No Categories found' }));
});

router.get('/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.status(404).json({ error: 'No Category found' }));
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then(category => res.json({ msg: 'Category added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this category' }));
});

router.put('/:id', (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body)
    .then(category => res.json({ msg: 'Updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to update the category' }));
});

router.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, req.body)
    .then(category => res.json({ mgs: 'Category entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a category' }));
});

module.exports = router;