
require 'angular'
require 'angular-mocks'
_ = require 'lodash'

exports.promise = (fcty, mockdata)->

  angular.mock.inject ($q, $rootScope)->
      data = null
      deferred = $q.defer()

      promise = deferred.promise;
      spyOn(fcty, 'getData').and.returnValue(promise)


      fcty.getData().then (value)->
        data = value;

      expect(data).toBeNull()

      deferred.resolve(mockdata)
      $rootScope.$apply();

      expect(data).toBeDefined()
      expect(data).toEqual(mockdata)

  null

exports.promiseId = (fcty, mockdata, id)->


  angular.mock.inject ($q, $rootScope)->
      data = null
      deferred = $q.defer()

      promise = deferred.promise;
      spyOn(fcty, 'getData').and.returnValue(promise)


      fcty.getData(id).then (value)->
        data = value;

      expect(data).toBeNull()

      deferred.resolve(mockdata)
      $rootScope.$apply()

      expect(fcty.getData).toHaveBeenCalledWith(id)
      expect(data).toBeDefined()
      expect(data).toEqual(mockdata)

  null

exports.httpCall = (fcty, url, mockdata)->
  angular.mock.inject ($httpBackend, $rootScope)->

    $httpBackend.expect("GET", url).respond(mockdata);
    data = null
    fcty.getData().then (value)->
      data = value;


    expect(data).toBeNull()

    $rootScope.$apply()
    $httpBackend.flush()

    $httpBackend.expectGET(url)

    expect(data).toBeDefined()
    expect(data).toEqual(mockdata)

exports.httpCallId = (fcty, url, mockdata, id)->
  angular.mock.inject ($httpBackend, $rootScope)->

    $httpBackend.expect("GET", url).respond(mockdata);
    data = null
    fcty.getData(id).then (value)->
      data = value;

    expect(data).toBeNull()

    $rootScope.$apply()
    $httpBackend.flush()

    $httpBackend.expectGET(url)

    expect(data).toBeDefined()
    expect(data).toEqual(mockdata)

exports.setFlushData = (setUp, mockdata, empty)->

  describe 'should set and flush data', ->
    fcty = null
    beforeEach ->
      empty = [] if _.isUndefined(empty)
      fcty = setUp()
      fcty.setData(mockdata)

    it 'should add data', ->
      expect(fcty.data()).toEqual(mockdata)

    it 'should flush data', ->
      fcty.flush()
      expect(fcty.data()).toEqual(empty)

exports.testPromises = (setUp, mockdata, error_msg, response=null)->
  describe 'Promise Calls', ->
    deferred = rootScope = promise = fcty = null
    beforeEach ->
      fcty = setUp()
      fcty.setData(mockdata)
      angular.mock.inject ($q, $rootScope)->
        rootScope = $rootScope


    it 'should return promise data if data already set', ->
      data = null
      fcty.getData().then (value)->
        data = value;

      expect(data).toBeNull()
      rootScope.$apply()

      expect(data).toBeDefined()
      if _.isNull(response)
        expect(data).toEqual(mockdata)
      else
        expect(data).toEqual(response)

    xit "should reject the promise and respond with error", ->
      # httpBackend.expect("GET", url).respond(500)

      error = data = null
      fcty.getData().then (value)->
        data = value
      , (e)->
        error = e

      expect(error).toBeNull()
      deferred.reject(error_msg)
      rootScope.$apply()

      expect(error).toBeDefined()
      expect(error).toEqual(error_msg)

  null


exports.testHTTPRequest = (setUp, url, mockdata, error_msg, response=null)->
  #http://tech.pro/tutorial/1515/you-got-http-in-my-angularjs-unit-tests
  describe 'HTTP Calls', ->
    httpBackend = rootScope = fcty = null
    beforeEach ->
      fcty = setUp()

      angular.mock.inject ($httpBackend, $rootScope)->
        httpBackend = $httpBackend
        rootScope   = $rootScope



    it 'should call the correct api', ->

      httpBackend.expect("GET", url).respond(mockdata);

      data = null
      fcty.getData().then (value)->
        data = value;

      rootScope.$apply()
      httpBackend.flush()

      httpBackend.expectGET(url)

      expect(data).toBeDefined()
      if _.isNull(response)
        expect(data).toEqual(mockdata)
      else
        expect(data).toEqual(response)

    it "should reject the promise and respond with error", ->
      httpBackend.expect("GET", url).respond(500)

      error = data = null
      fcty.getData().then (value)->
        data = value
      , (e)->
        error = e

      rootScope.$apply()
      httpBackend.flush()

      httpBackend.expectGET(url)

      expect(error).toBeDefined()
      expect(error).toEqual(error_msg)


exports.testHTTPRequestParam = (setUp, url, param, mockdata, response=null)->

  describe 'HTTP Calls', ->
    httpBackend = rootScope = fcty = null
    beforeEach ->
      fcty = setUp()

      angular.mock.inject ($httpBackend, $rootScope)->
        httpBackend = $httpBackend
        rootScope   = $rootScope



    it 'should call the correct api + param', ->

      httpBackend.expect("GET", url).respond(mockdata);

      data = null
      fcty.getData(param).then (value)->
        data = value;

      rootScope.$apply()
      httpBackend.flush()

      httpBackend.expectGET(url)

      expect(data).toBeDefined()
      if _.isNull(response)
        expect(data).toEqual(mockdata)
      else
        expect(data).toEqual(response)