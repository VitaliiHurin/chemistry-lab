const express = require('express');
const router = express.Router();

const { users, compounds, elements } = require('../models');

const config = require('../config/config');
const RPC = require('../services/rpcWrapper');
const rpc = new RPC(config.clients);

router.get('/', (req, res) => { res.status(200).json({ message: 'OK' }); });

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await users.findOne({ login, password});

  res.status(200).json({ userId: user.id });
})

router.get('/get-balance', async (req, res) => {
  const { userId } = req.query - 1;
  const balance = await rpc.call(config.clients[userId], 'eth_getBalance', [config.clients[userId].coinbase, 'latest']);
  res.status(200).json({ balance: parseInt(balance.result, 16) });
})

router.post('/buy-pack', (req, res) => {
  const { userId } = req.query;
  // buy pack
  res.status(200).json({ transactionStatus: 'created' });
})

router.get('/get-collection', async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await users.findOne({
      where: {
        id: userId
      },
      include: [{
        model: elements,
        as: 'element'
      },{
        model: compounds,
        as: 'compound'
      }]
    });
    res.status(200).json({
      elements: user.dataValues.element,
      compounds: user.dataValues.compound,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    })
  }
})

module.exports = router;
