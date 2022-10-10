const RecordController = require('../controllers/RecordController')
const record = require('express').Router()


// New
record.post('/pickup', RecordController.newRecordPickup)
record.post('/deliver', RecordController.newRecordDeliver)
// Update Status
record.patch('/pickup/status/:id', RecordController.updateStatusPickup)
record.patch('/deliver/status/:id', RecordController.updateStatusDeliver)
// Update Type
record.patch('/pickup/arrive/:id', RecordController.updateArivePickup)
record.patch('/deliver/arrive/:id', RecordController.updateAriveDeliver)

module.exports = record