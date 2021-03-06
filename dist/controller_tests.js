var _, checkValues;

_ = require('lodash');

exports.checkBreadcrumbs = function(crumbs, txt, path) {
  expect(crumbs.addPage).toHaveBeenCalled();
  return expect(crumbs.addPage).toHaveBeenCalledWith(txt, path);
};

checkValues = function(scope, defaults) {
  return _.forIn(defaults, function(value, key) {
    if (_.isNull(value)) {
      return expect(scope[key]).toBeNull();
    } else if (_.isUndefined(value)) {
      return expect(scope[key]).toBeUndefined();
    } else if (_.isBoolean(value)) {
      if (value) {
        return expect(scope[key]).toBeTruthy();
      } else {
        return expect(scope[key]).toBeFalsy();
      }
    } else if (_.isArray(value) && _.isEmpty(value)) {
      return expect(scope[key]).toEqual([]);
    } else {
      return expect(scope[key]).toEqual(value);
    }
  });
};

exports.checkValues = checkValues;

exports.promiseData = function(setUp, mockdata, results) {
  return describe('sets up data once loaded from fcty', function() {
    var deferred, promise, scope;
    scope = promise = deferred = null;
    beforeEach(function() {
      var setup_obj;
      setup_obj = setUp();
      scope = setup_obj.scope;
      deferred = setup_obj.deferred;
      deferred.resolve(mockdata);
      return scope.$apply();
    });
    return it('should set the correct values', function() {
      return checkValues(scope, results);
    });
  });
};

exports.promiseError = function(setUp, error_msg, results) {
  var deferred, promise, scope;
  scope = promise = deferred = null;
  return describe('sets up data once loaded from fcty', function() {
    scope = promise = null;
    beforeEach(function() {
      var setup_obj;
      setup_obj = setUp();
      scope = setup_obj.scope;
      deferred = setup_obj.deferred;
      deferred.reject(error_msg);
      return scope.$apply();
    });
    return it('should set the correct values', function() {
      return checkValues(scope, results);
    });
  });
};
