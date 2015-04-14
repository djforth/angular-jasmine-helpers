var DateCreator, DateFormatter, _;

_ = require('lodash');

DateFormatter = require("date-formatter");

DateCreator = (function() {
  DateCreator.prototype.month_list = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  DateCreator.prototype.time_list = [9, 13, 19];

  DateCreator.prototype.month = 0;

  DateCreator.prototype.date_day = 1;

  DateCreator.prototype.time = 0;

  function DateCreator(start_date) {
    if (start_date == null) {
      start_date = "2014-01-01 09:00";
    }
    this.dateFmt = new DateFormatter(start_date);
    this.date_day = 1;
    this.date = this.dateFmt.getDate();
    this.month = this.date.getMonth();
    this.day_date = this.date.getDate();
  }

  DateCreator.prototype.create_date = function() {
    return this.dateFmt.formatDate("%Y-%m-%d");
  };

  DateCreator.prototype.create_dateTime = function() {
    return this.dateFmt.formatDate("%Y-%m-%d %H:%M");
  };

  DateCreator.prototype.create_dateTimeLater = function() {
    this.date.setHours(this.date.getHours() + 1);
    this.dateFmt = new DateFormatter(this.date);
    return this.dateFmt.formatDate("%Y-%m-%d %H:%M");
  };

  DateCreator.prototype.create_date_obj = function(str) {
    this.dateFmt = new DateFormatter(str);
    return this.dateFmt.getDate();
  };

  DateCreator.prototype.create_time = function() {
    return this.dateFmt.formatDate("%H:%M");
  };

  DateCreator.prototype.create_timeLater = function() {
    this.date.setHours(this.date.getHours() + 1);
    this.dateFmt = new DateFormatter(this.date);
    return this.dateFmt.formatDate("%H:%M");
  };

  DateCreator.prototype.incrementTime = function() {
    var year;
    year = this.date.getFullYear();
    this.time++;
    if (this.time === 3) {
      this.date_day++;
      this.time = 0;
    }
    if (this.date_day >= this.month_list[this.month]) {
      this.month++;
      this.date_day = 1;
    }
    this.dateFmt = new DateFormatter(year, this.month, this.date_day, this.time_list[this.time]);
    return this.date = this.dateFmt.getDate();
  };

  DateCreator.prototype.incrementDate = function() {
    var year;
    year = this.date.getFullYear();
    this.date_day++;
    if (this.date_day >= this.month_list[this.month]) {
      this.month++;
      this.date_day = 1;
    }
    this.dateFmt = new DateFormatter(year, this.month, this.date_day, this.time_list[this.time]);
    return this.date = this.dateFmt.getDate();
  };

  return DateCreator;

})();

module.exports = DateCreator;
