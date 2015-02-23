var _;

require('angular');

require('angular-mocks');

_ = require('lodash');

module.exports = function(setUp, url, id, current, params) {
  if (params == null) {
    params = null;
  }
  return describe('check states', function() {
    var rootScope, state;
    rootScope = state = null;
    beforeEach(function() {
      var test_obj;
      test_obj = setUp();
      state = test_obj.state;
      rootScope = test_obj.rootScope;
      if (_.isNull(params)) {
        state.go(id);
        return rootScope.$digest();
      } else {
        state.go(id, params);
        return rootScope.$digest();
      }
    });
    it('should go to correct path', function() {
      return expect(state.href(id)).toEqual(url);
    });
    return it('should set the correct state values', function() {
      return _.forIn(current, function(value, key) {
        return expect(state.current[key]).toEqual(value);
      });
    });
  });
};
