const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

const { users, compounds, elements, userElements, userCompounds } = require('../models');
const { addElements, deleteElements } = require('../services/userElementsService');

const config = require('../config/config');
const RPC = require('../services/rpcWrapper');
const rpc = new RPC(config.clients);

router.get('/', (req, res) => { res.status(200).json({ message: 'OK' }); });

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await users.findOne({ where: { login, password } });

  res.status(200).json({ userId: user.id });
})

router.get('/get-balance', async (req, res) => {
  try {
    const { userId } = req.query;
    const balance = await rpc.call(config.clients[userId], 'eth_getBalance', [config.clients[userId].coinbase, 'latest']);
    res.status(200).json({ balance: parseInt(balance.result, 16) });
  } catch(err) {
    res.status(500).json({ message: err });
  }
})

router.post('/buy-pack', async (req, res) => {
  try {
    const { userId } = req.query;
    const price = 1 * 10 ** 18;
    const txHash = await rpc.call(
      config.clients[userId],
      'eth_sendTransaction',
      [{from: config.clients[userId].coinbase, to: config.admin.coinbase, value: `0x${price.toString(16)}`}]
    );

    // console.log(txHash);

    const checkTx = async (txHash) => {
      const status = await rpc.call(
        config.clients[userId],
        'eth_getTransactionReceipt',
        [txHash.result]
      );
      if (!status.result) {
        setTimeout(checkTx, 100, txHash);
        return;
      }
      const max = 14;
      const n = Math.floor(Math.random() * (max + 1));
      const pack = config.packs[n];
      // console.log('pack', n, pack);
      await addElements(userId, pack);
      res.status(201).json({ newElements: pack });
    };
    checkTx(txHash);
    
  } catch(err) {
    res.status(500).json({ message: err });
  }
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

router.post('/create-compound', async (req, res) => {
  try {
    const { userId } = req.query;
    const { propose } = req.body;

    // { "Na": 1, "Cl": 1}
    const user = await users.findOne({
      where: {
        id: userId
      }
    });

    Object.keys(propose).forEach(async (symbol) => {
      const el = await elements.findOne({ where: { symbol } });
      const usersElements = await userElements.findOne({ where: { userId, elementId: el.id } });
      if (!userElements && userElements.length === 0) {
        return res.status(400).json({ message: "You dont have element"});
      } else if (userElements && usersElements.dataValues.count < propose[symbol]) {
        return res.status(400).json({ message: "You dont have enough elements"});
      }
    });

    const compound = await compounds.findOne({ where: { elementsObject: propose } })
    if (!compound) {
      return res.status(404).json({ message: 'Compound not found' });
    }

    let sum = 0;
    Object.keys(propose).forEach(async (symbol) => {
      const { number } = await elements.findOne({ where: { symbol } });
      sum += number * propose[symbol];
    });

    const price = sum * 10 ** 19;
    const txHash = await rpc.call(
      config.clients[userId],
      'eth_sendTransaction',
      [{from: config.clients[userId].coinbase, to: config.admin.coinbase, value: `0x${price.toString(16)}`}]
    );

    const checkTx = async (txHash) => {
      const status = await rpc.call(
        config.clients[userId],
        'eth_getTransactionReceipt',
        [txHash.result]
      );
      if (!status.result) {
        setTimeout(checkTx, 100, txHash);
        return;
      }

      try {
        console.log('Before');
        await deleteElements(userId, Object.keys(compound.dataValues.elementsObject));
        console.log('After');
      } catch (err) {
        res.status(404).json({ message: err });
      }
      
      const compoundId = compound.dataValues.id;

      const getUserCompound = await userCompounds.findOne({ where: { userId, compoundId } }, { type: sequelize.QueryTypes.SELECT });
      if (!getUserCompound) {
        await userCompounds.create({ userId, compoundId, count: 1 });
      } else {
        await getUserCompound.update({ count: getUserCompound.dataValues.count + 1 });
      }

      console.log('sum', sum);
      user.update({ experience: +user.dataValues.experience + sum * 10 });

      res.status(201).json({ message: 'OK' });
    };
    checkTx(txHash);
    
  } catch(err) {
    res.status(500).json({ message: err });
  }
})


module.exports = router;
