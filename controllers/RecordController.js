const { ShuttleRecord, Driver, Subscription } = require("../models");

class RecordController {
  static async newRecordPickup(req, res, next) {
    try {
      const { driverId } = req.body
      const driver = await Driver.findOne({
        include: [ Subscription ],
        where: {
          id: driverId
        }
      })
      if (!driver.Subscription) throw { name: 'subscribeNoneActive' }

      const { id } = driver.Subscription
      
      const data = await ShuttleRecord.create({
        status: 'Departed',
        type: 'Pick up',
        driverPickupAt: new Date(),
        SubscriptionId: id
      })
      res.status(201).json({ data })
    } catch (err) {
      next(err)
    }
  }

  static async updateStatusPickup(req, res, next) {
    try {
      const { id } = req.params
      
      const data = await ShuttleRecord.findByPk(id)
      if (data.type !== 'Pick up') {
        throw { name: 'Type not match'}
      }

      await ShuttleRecord.update({
        status: 'On the way'
      }, { where: { id } })
      res.status(201).json({ message: `data status change to On the way`})
    } catch (err) {
      next(err)
    }
  }

  static async updateArivePickup(req, res, next) {
    try {
      const { id } = req.params

      const data = await ShuttleRecord.findByPk(id)
      if (data.type !== 'Pick up') {
        throw { name: 'Type not match'}
      }
      
      await ShuttleRecord.update({
        status: 'Arived',
        driverArriveAt: new Date()
      }, { where: { id } })
      res.status(201).json({ message: `data arrival has been updated with: ${new Date()}`})
    } catch (err) {
      next(err)
    }
  }

  
  static async newRecordDeliver(req, res, next) {
    try {
      const { driverId } = req.body
      const driver = await Driver.findOne({
        include: [ Subscription ],
        where: {
          id: driverId
        }
      })
      if (!driver.Subscription) throw { name: 'subscribeNoneActive' }

      const { id } = driver.Subscription
      
      const data = await ShuttleRecord.create({
        status: 'Departed',
        type: 'Deliver',
        driverPickupAt: new Date(),
        SubscriptionId: id
      })
      res.status(201).json({ data })
    } catch (err) {
      next(err)
    }
  }

  static async updateStatusDeliver(req, res, next) {
    try {
      const { id } = req.params
      
      const data = await ShuttleRecord.findByPk(id)
      if (data.type !== 'Deliver') {
        throw { name: 'Type not match'}
      }

      await ShuttleRecord.update({
        status: 'On the way'
      }, { where: { id } })
      res.status(201).json({ message: `data status change to On the way`})
    } catch (err) {
      next(err)
    }
  }
  
  static async updateAriveDeliver(req, res, next) {
    try {
      const { id } = req.params
      
      const data = await ShuttleRecord.findByPk(id)
      if (data.type !== 'Deliver') {
        throw { name: 'Type not match'}
      }
      
      await ShuttleRecord.update({
        status: 'Arived',
        driverArriveAt: new Date()
      }, { where: { id } })
      res.status(201).json({ message: `data arrival has been updated with: ${new Date()}`})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = RecordController;