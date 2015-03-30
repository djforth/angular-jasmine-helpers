var DateCreator, DateFormatter, _, dateFmt;

_ = require('lodash');

DateFormatter = require("date-formatter");

dateFmt = new DateFormatter();

DateCreator = (function() {
  DateCreator.prototype.month_list = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  DateCreator.prototype.time_list = [9, 13, 19];

  DateCreator.prototype.month = 1;

  DateCreator.prototype.date_day = 1;

  DateCreator.prototype.time = 0;

  DateCreator.prototype.display = {};

  function DateCreator() {
    this.date_day = 1;
    dateFmt = new DateFormatter();
    this.display.time = dateFmt.fixTime(this.time_list[this.time]);
    this.display.date = dateFmt.fixTime(this.date_day);
    this.display.month = dateFmt.fixTime(this.month);
  }

  DateCreator.prototype.create_dateTime = function() {
    return "2014-" + this.display.month + "-" + this.display.date + " " + this.display.time + ":00";
  };

  DateCreator.prototype.create_dateTimeLater = function() {
    var time;
    dateFmt = new DateFormatter();
    time = dateFmt.fixTime(this.time_list[this.time] + 1);
    return "2014-" + this.display.month + "-" + this.display.date + " " + time + ":00";
  };

  DateCreator.prototype.create_date = function() {
    return "2014-" + this.display.month + "-" + this.display.date;
  };

  DateCreator.prototype.create_date_obj = function(str) {
    dateFmt = new DateFormatter(str);
    return dateFmt.getDate();
  };

  DateCreator.prototype.create_datetime_obj = function(str) {
    dateFmt = new DateFormatter(str);
    return dateFmt.getDate();
  };

  DateCreator.prototype.incrementTime = function() {
    this.time++;
    if (this.time === 3) {
      this.date_day++;
      this.time = 0;
    }
    if (this.day >= this.month_list[this.month - 1]) {
      this.month++;
      this.date_day = 1;
    }
    dateFmt = new DateFormatter();
    this.display.time = dateFmt.fixTime(this.time_list[this.time]);
    this.display.date = dateFmt.fixTime(this.date_day);
    return this.display.month = dateFmt.fixTime(this.month);
  };

  DateCreator.prototype.incrementDate = function() {
    this.day++;
    if (this.day >= this.month_list[this.month - 1]) {
      this.month++;
      this.day = 1;
    }
    dateFmt = new DateFormatter();
    this.display.date = dateFmt.fixTime(this.day);
    return this.display.month = dateFmt.fixTime(this.month);
  };

  return DateCreator;

})();

module.exports = DateCreator;
