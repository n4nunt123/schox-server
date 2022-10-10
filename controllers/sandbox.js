const moment = require('moment')
const business = require('moment-business');
const m = moment();
const x = business.addWeekDays(moment(), 7).get('date')

console.log(new Date(business.addWeekDays(moment(), 7)))