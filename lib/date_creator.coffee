
_ = require 'lodash'

DateFormatter = require("date-formatter")
dateFmt       = new DateFormatter()

class DateCreator
  month_list:[31,28,31,30,31,30,31,31,30,31,30,31]
  time_list:[9,13,19]
  month:1
  date_day:1
  time:0
  display:{}

  constructor:()->
    @date_day = 1
    dateFmt = new DateFormatter()

    @display.time = dateFmt.fixTime(@time_list[@time])
    @display.date = dateFmt.fixTime(@date_day)
    @display.month = dateFmt.fixTime(@month)


  create_dateTime:()->
    "2014-#{@display.month}-#{@display.date} #{@display.time}:00"


  create_dateTimeLater:()->
    dateFmt = new DateFormatter()
    time = dateFmt.fixTime(@time_list[@time] + 1)
    "2014-#{@display.month}-#{@display.date} #{time}:00"

  create_date:()->
    "2014-#{@display.month}-#{@display.date}"

  create_date_obj:(str)->
    dateFmt = new DateFormatter(str)
    return dateFmt.getDate()

  create_datetime_obj:(str)->
    dateFmt = new DateFormatter(str)
    return dateFmt.getDate()

  incrementTime:()->
    @time++

    if @time == 3
      @date_day++
      @time = 0

    if @day >= @month_list[@month-1]
      @month++
      @date_day = 1

    dateFmt = new DateFormatter()
    @display.time  = dateFmt.fixTime(@time_list[@time])
    @display.date  = dateFmt.fixTime(@date_day)
    @display.month = dateFmt.fixTime(@month)

  incrementDate:()->
    @day++

    if @day >= @month_list[@month-1]
      @month++
      @day = 1

    dateFmt = new DateFormatter()
    @display.date  = dateFmt.fixTime(@day)
    @display.month = dateFmt.fixTime(@month)



module.exports = DateCreator