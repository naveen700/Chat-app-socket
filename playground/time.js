// timestamp is measured from  the certain moment from history refered to as unix epic which is on jan 1st 1970 00:00:00 utc (time zone independent)
// -1000 is the timestamp refers to the  1 sec before the unix epic means 1969 dec 31 and 1000  is after 1 sec
// the jan 1 1970
// normal date in js gives the  0 index based months and also returns the  number only  
// var month =  new Date().getUTCMonth();
// console.log(month+1);
var moment = require('moment');

var date = moment();
console.log(date.format('mm hh a'));
// format method is very handy



var someTimeStamp = moment().valueOf(); //returns timestamp in millisec sice unix epic
console.log(someTimeStamp);



