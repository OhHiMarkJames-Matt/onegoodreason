const router = require('express').Router();
const { User, GoodVibe  } = require('../../models');

router.get('/', async (req, res) => {
    // find all goodVibes
    // be sure to include its associated Good Vibes
    try {
      const goodVibesData = await GoodVibe.findAll({}, {
        include: [{ model: User, attributes: ["user_id", "username", "email"] }],
      });
      res.status(200).json(goodVibesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    // find one goodVibes by its `id` value
    // be sure to include its associated Good Vibes
    try {
      const goodVibesData = await GoodVibe.findByPk(req.params.id, {
        include: [{ model: User, attributes: ["user_id", "username", "email"] }],
      });
  
      if (!goodVibesData) {
        res.status(404).json({ message: 'No good vibes found with this id!' });
        return;
      }
      
      res.status(200).json(goodVibesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post('/', async (req, res) => {
    // create a new goodVibes
    try {
      const goodVibe = await GoodVibe.create(req.body);
      if (goodVibe) {
        const updatedUser = await User.findOneAndUpdate({
        _id: req.body.id
        }, {
            $push: {
                goodVibes:goodVibe
            }
        })
        if (updatedUser) return updatedUser
      }
      res.status(200).json(goodVibe);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.put('/:id', async (req, res) => {
    // update a goodVibes by its `id` value
    GoodVibe.updateOne(
      {
        reason: req.body.reason,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedGoodVibes) => {
        res.json(updatedGoodVibes);
      })
      .catch((err) => res.json(err));
  });
  
  router.delete('/:id', async (req, res) => {
    // delete a goodVibes by its `id` value
    try {
      const goodVibesData = await GoodVibe.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!goodVibesData) {
        res.status(404).json({ message: 'No goodVibes found with this id!' });
        return;
      }
  
      res.status(200).json(goodVibesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;