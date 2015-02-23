require 'angular'
require 'angular-mocks'
_ = require 'lodash'

module.exports = (setUp, url, id, current, params=null)->

  describe 'check states', ->
    rootScope = state = null
    beforeEach ->
      test_obj = setUp()
      state     = test_obj.state
      rootScope = test_obj.rootScope

      if _.isNull(params)
        state.go(id)
        rootScope.$digest()
      else
        state.go(id, params)
        rootScope.$digest()

    it 'should go to correct path', ->
      expect(state.href(id)).toEqual(url)

    it 'should set the correct state values', ->

      _.forIn current, (value, key)->
        expect(state.current[key]).toEqual(value)


