const router = require('express').Router();
const { User, GoodVibe } = require('../../models');

router.get('/', async (req, res) => {
    // find all users
    // be sure to include its associated Good Vibes
    try {
      const userData = await User.findAll({}, {
        include: [{ model: GoodVibe, attributes: ["GoodVibe_reason", "GoodVibe_id"] }],
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    // find one user by its `id` value
    // be sure to include its associated Good Vibes
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [{ model: GoodVibe, attributes: ["GoodVibe_reason", "GoodVibe_id"] }],
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post('/', async (req, res) => {
    // create a new user
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.put('/:id', async (req, res) => {
    // update a user by its `id` value
    User.updateOne(
      {
        user_name: req.body.user_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => res.json(err));
  });
  
  router.delete('/:id', async (req, res) => {
    // delete a user by its `id` value
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;