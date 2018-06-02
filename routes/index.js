const express = require('express');

const router = express.Router();

router.get('/', (req, res) => { res.status(200).json({ message: 'OK' }); });

router.get('/get-balance', (req, res) => {
  const { userId } = req.query;
  // get user balance
  res.status(200).json({ balance: 12 });
})

router.post('/buy-pack', (req, res) => {
  const { userId } = req.query;
  // buy pack
  res.status(200).json({ transactionStatus: 'created' });
})

router.get('get-collection', (req, res) => {
  const { userId } = req.query;
  // get collection from DB
  res.status(200).json({
    elements: [
      {
        name: 'Sodium',
        symbol: 'Na',
        atomicMass: '23',
        description: `Sodium is a chemical element with symbol Na (from Latin natrium) and atomic number 11.
          It is a soft, silvery-white, highly reactive metal.`
      }
    ],
    compounds: [
      {
        name: 'Sodium chloride',
        description: `Sodium Chloride is a metal halide composed of sodium and chloride with sodium and 
        chloride replacement capabilities. When depleted in the body, sodium must be replaced in order to 
        maintain intracellular osmolarity, nerve conduction, muscle contraction and normal renal function.`
      }
    ]
  })
})

module.exports = router;
