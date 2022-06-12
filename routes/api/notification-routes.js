const router = require('express').Router();
const { Notification, User, } = require('../../models');
const adminChecker = require("../controllers/adminController")
// The `/api/notification` endpoint

router.get('/', async (req, res) => { // Finds all Notification and includes associated category and tag data
  try {
    const d = await Notification.findAll({
      include: [
        {
          model: User,
        },
      ]
    })
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => { // Finds a single Notification by its ID and includes associated category and tag data
  try {
    const d = await Notification.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
        },

      ]
    })
    if (!d) {
      res.status(404).json({message: "Couldn't find that Notification ID!"});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/',adminChecker, async(req, res) => {
  
  try {
    const p = await Notification.create(req.body);
    res.status(200).json(p);
  } catch (error) {
    res.status(500).json(error);
    console.log(error)

  }
});

router.put('/:id',adminChecker, (req, res) => { // Updates Notification data
    Notification.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((notifiaction) => {
      res.status(200).json(notifiaction);
    
    })  
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id',adminChecker, async (req, res) => { // delete one Notification by its `id` value
  try {
    const d = await Notification.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a Notification with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
  
});

module.exports = router;
