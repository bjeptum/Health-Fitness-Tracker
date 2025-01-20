const express = require('express');
const mockWorkoutPlans = require('../utils/mockData');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(mockWorkoutPlans);
});

module.exports = router;
