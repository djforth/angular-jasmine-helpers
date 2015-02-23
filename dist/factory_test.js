var _;

require('angular');

require('angular-mocks');

_ = require('lodash');

exports.promise = function(fcty, mockdata) {
  angular.mock.inject(function($q, $rootScope) {
    var data, deferred, promise;
    data = null;
    deferred = $q.defer();
    promise = deferred.promise;
    spyOn(fcty, 'getData').and.returnValue(promise);
    fcty.getData().then(function(value) {
      return data = value;
    });
    expect(data).toBeNull();
    deferred.resolve(mockdata);
    $rootScope.$apply();
    expect(data).toBeDefined();
    return expect(data).toEqual(mockdata);
  });
  return null;
};

exports.promiseId = function(fcty, mockdata, id) {
  angular.mock.inject(function($q, $rootScope) {
    var data, deferred, promise;
    data = null;
    deferred = $q.defer();
    promise = deferred.promise;
    spyOn(fcty, 'getData').and.returnValue(promise);
    fcty.getData(id).then(function(value) {
      return data = value;
    });
    expect(data).toBeNull();
    deferred.resolve(mockdata);
    $rootScope.$apply();
    expect(fcty.getData).toHaveBeenCalledWith(id);
    expect(data).toBeDefined();
    return expect(data).toEqual(mockdata);
  });
  return null;
};

exports.httpCall = function(fcty, url, mockdata) {
  return angular.mock.inject(function($httpBackend, $rootScope) {
    var data;
    $httpBackend.expect("GET", url).respond(mockdata);
    data = null;
    fcty.getData().then(function(value) {
      return data = value;
    });
    expect(data).toBeNull();
    $rootScope.$apply();
    $httpBackend.flush();
    $httpBackend.expectGET(url);
    expect(data).toBeDefined();
    return expect(data).toEqual(mockdata);
  });
};

exports.httpCallId = function(fcty, url, mockdata, id) {
  return angular.mock.inject(function($httpBackend, $rootScope) {
    var data;
    $httpBackend.expect("GET", url).respond(mockdata);
    data = null;
    fcty.getData(id).then(function(value) {
      return data = value;
    });
    expect(data).toBeNull();
    $rootScope.$apply();
    $httpBackend.flush();
    $httpBackend.expectGET(url);
    expect(data).toBeDefined();
    return expect(data).toEqual(mockdata);
  });
};

exports.setFlushData = function(setUp, mockdata, empty) {
  return describe('should set and flush data', function() {
    var fcty;
    fcty = null;
    beforeEach(function() {
      if (_.isUndefined(empty)) {
        empty = [];
      }
      fcty = setUp();
      return fcty.setData(mockdata);
    });
    it('should add data', function() {
      return expect(fcty.data()).toEqual(mockdata);
    });
    return it('should flush data', function() {
      fcty.flush();
      return expect(fcty.data()).toEqual(empty);
    });
  });
};

exports.testPromises = function(setUp, mockdata, error_msg, response) {
  if (response == null) {
    response = null;
  }
  describe('Promise Calls', function() {
    var deferred, fcty, promise, rootScope;
    deferred = rootScope = promise = fcty = null;
    beforeEach(function() {
      fcty = setUp();
      fcty.setData(mockdata);
      return angular.mock.inject(function($q, $rootScope) {
        return rootScope = $rootScope;
      });
    });
    it('should return promise data if data already set', function() {
      var data;
      data = null;
      fcty.getData().then(function(value) {
        return data = value;
      });
      expect(data).toBeNull();
      rootScope.$apply();
      expect(data).toBeDefined();
      if (_.isNull(response)) {
        return expect(data).toEqual(mockdata);
      } else {
        return expect(data).toEqual(response);
      }
    });
    return xit("should reject the promise and respond with error", function() {
      var data, error;
      error = data = null;
      fcty.getData().then(function(value) {
        return data = value;
      }, function(e) {
        return error = e;
      });
      expect(error).toBeNull();
      deferred.reject(error_msg);
      rootScope.$apply();
      expect(error).toBeDefined();
      return expect(error).toEqual(error_msg);
    });
  });
  return null;
};

exports.testHTTPRequest = function(setUp, url, mockdata, error_msg, response) {
  if (response == null) {
    response = null;
  }
  return describe('HTTP Calls', function() {
    var fcty, httpBackend, rootScope;
    httpBackend = rootScope = fcty = null;
    beforeEach(function() {
      fcty = setUp();
      return angular.mock.inject(function($httpBackend, $rootScope) {
        httpBackend = $httpBackend;
        return rootScope = $rootScope;
      });
    });
    it('should call the correct api', function() {
      var data;
      httpBackend.expect("GET", url).respond(mockdata);
      data = null;
      fcty.getData().then(function(value) {
        return data = value;
      });
      rootScope.$apply();
      httpBackend.flush();
      httpBackend.expectGET(url);
      expect(data).toBeDefined();
      if (_.isNull(response)) {
        return expect(data).toEqual(mockdata);
      } else {
        return expect(data).toEqual(response);
      }
    });
    return it("should reject the promise and respond with error", function() {
      var data, error;
      httpBackend.expect("GET", url).respond(500);
      error = data = null;
      fcty.getData().then(function(value) {
        return data = value;
      }, function(e) {
        return error = e;
      });
      rootScope.$apply();
      httpBackend.flush();
      httpBackend.expectGET(url);
      expect(error).toBeDefined();
      return expect(error).toEqual(error_msg);
    });
  });
};

exports.testHTTPRequestParam = function(setUp, url, param, mockdata, response) {
  if (response == null) {
    response = null;
  }
  return describe('HTTP Calls', function() {
    var fcty, httpBackend, rootScope;
    httpBackend = rootScope = fcty = null;
    beforeEach(function() {
      fcty = setUp();
      return angular.mock.inject(function($httpBackend, $rootScope) {
        httpBackend = $httpBackend;
        return rootScope = $rootScope;
      });
    });
    return it('should call the correct api + param', function() {
      var data;
      httpBackend.expect("GET", url).respond(mockdata);
      data = null;
      fcty.getData(param).then(function(value) {
        return data = value;
      });
      rootScope.$apply();
      httpBackend.flush();
      httpBackend.expectGET(url);
      expect(data).toBeDefined();
      if (_.isNull(response)) {
        return expect(data).toEqual(mockdata);
      } else {
        return expect(data).toEqual(response);
      }
    });
  });
};
