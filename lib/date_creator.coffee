
_ = require 'lodash'

DateFormatter = require("date-formatter")
# dateFmt       = new DateFormatter()

class DateCreator
  month_list:[31,28,31,30,31,30,31,31,30,31,30,31]
  time_list:[9,13,19]
  month:0
  date_day:1
  time:0


  constructor:(start_date="2014-01-01 09:00")->
    # date = new Date()
    @dateFmt = new DateFormatter(start_date)
    @date_day = 1
    # console.log @dateFmt
    @date     = @dateFmt.getDate()
    @month    = @date.getMonth()
    @day_date = @date.getDate()
    # @display.time = dateFmt.fixTime(@time_list[@time])
    # @display.date = dateFmt.fixTime(@date_day)
    # @display.month = dateFmt.fixTime(@month)

  create_date:()->

    return @dateFmt.formatDate("%Y-%m-%d")

  create_dateTime:()->
    return @dateFmt.formatDate("%Y-%m-%d %H:%M")

  create_dateTimeLater:()->
    # @date = @dateFmt.getDate()
    @date.setHours(@date.getHours()+1)
    @dateFmt = new DateFormatter(@date)
    return @dateFmt.formatDate("%Y-%m-%d %H:%M")


  create_date_obj:(str)->
    @dateFmt = new DateFormatter(str)
    return @dateFmt.getDate()

  create_time:()->
    return @dateFmt.formatDate("%H:%M")

  create_timeLater:()->
    # @date = @dateFmt.getDate()
    @date.setHours(@date.getHours()+1)
    @dateFmt = new DateFormatter(@date)
    return @dateFmt.formatDate("%H:%M")



  incrementTime:()->
    year = @date.getFullYear()

    @time++

    if @time == 3
      @date_day++
      @time = 0

    if @date_day >= @month_list[@month]
      @month++
      @date_day = 1

    @dateFmt = new DateFormatter(year, @month, @date_day, @time_list[@time])

    @date = @dateFmt.getDate()

  incrementDate:()->
    year = @date.getFullYear()
    @date_day++

    if @date_day >= @month_list[@month]
      @month++
      @date_day = 1

    @dateFmt = new DateFormatter(year, @month, @date_day, @time_list[@time])

    @date = @dateFmt.getDate()



module.exports = DateCreator