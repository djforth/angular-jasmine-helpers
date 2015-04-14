require('babel/polyfill')
_ = require('lodash')

DateCreator = require('../lib/date_creator.coffee')

describe 'DateCreator', ->

  creator = null

  beforeEach ->
    creator = new DateCreator()

  it 'should create date object', ->
    expect(creator.date).toEqual(new Date(2014, 0, 1, 9))

  it 'should set month and day_date', ->
    expect(creator.month).toEqual(0)
    expect(creator.day_date).toEqual(1)

  it 'should set correct details if date passed', ->
    dc = new DateCreator("2015-05-12 09:00")

    expect(dc.date).toEqual(new Date(2015, 4, 12, 9))
    expect(dc.month).toEqual(4)
    expect(dc.day_date).toEqual(12)

  describe 'format content', ->

    it 'should return correct date time str', ->
      expect(creator.create_dateTime()).toEqual("2014-01-01 09:00")

    it 'should return increment time by 1 hour', ->
      expect(creator.create_dateTimeLater()).toEqual("2014-01-01 10:00")

    it 'should return correct date time str', ->
      expect(creator.create_date()).toEqual("2014-01-01")

    it 'should return correct date time str', ->
      expect(creator.create_time()).toEqual("09:00")

    it 'should return increment time by 1 hour', ->
      expect(creator.create_timeLater()).toEqual("10:00")


  describe 'incrementTime', ->

    it 'should increment the time to next time', ->
      creator.incrementTime()
      date = creator.date;
      expect(date).toEqual(new Date(2014, 0, 1, 13))

    it 'should set to next day if time is last setting', ->
      creator.time = 2
      creator.incrementTime()

      expect(creator.time).toEqual(0)
      expect(creator.date_day).toEqual(2)

      date = creator.date;
      expect(date).toEqual(new Date(2014, 0, 2, 9))

    it 'should set to next month if time is last setting and day on last of month', ->
      creator.time = 2
      creator.date_day = 31
      creator.incrementTime()

      expect(creator.time).toEqual(0)
      expect(creator.date_day).toEqual(1)
      expect(creator.month).toEqual(1)

      date = creator.date;
      expect(date).toEqual(new Date(2014, 1, 1, 9))


  describe 'incrementDate', ->

    it 'should set to next day', ->

      creator.incrementDate()

      expect(creator.date_day).toEqual(2)

      date = creator.date;
      expect(date).toEqual(new Date(2014, 0, 2, 9))

    it 'should set to next month if day on last of month', ->
      # creator.time = 2
      creator.date_day = 31
      creator.incrementDate()

      # expect(creator.time).toEqual(0)
      expect(creator.date_day).toEqual(1)
      expect(creator.month).toEqual(1)

      date = creator.date;
      expect(date).toEqual(new Date(2014, 1, 1, 9))






