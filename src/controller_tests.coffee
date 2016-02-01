
_ = require 'lodash'

exports.checkBreadcrumbs = (crumbs, txt, path)->
  expect(crumbs.addPage).toHaveBeenCalled()
  expect(crumbs.addPage).toHaveBeenCalledWith(txt, path)

checkValues = (scope,defaults)->
  _.forIn defaults, (value, key)->
    if _.isNull(value)
      expect(scope[key]).toBeNull()
    else if _.isUndefined(value)
      expect(scope[key]).toBeUndefined()
    else if _.isBoolean(value)
      if value
        expect(scope[key]).toBeTruthy()
      else
        expect(scope[key]).toBeFalsy()
    else if _.isArray(value) and _.isEmpty(value)
      expect(scope[key]).toEqual([])
    else
      expect(scope[key]).toEqual(value)

exports.checkValues = checkValues

exports.promiseData = (setUp, mockdata, results)->

  describe 'sets up data once loaded from fcty', ->
    scope =   promise = deferred = null
    beforeEach ->
      setup_obj = setUp()
      scope     = setup_obj.scope
      deferred  = setup_obj.deferred

      deferred.resolve(mockdata)
      scope.$apply()

    it 'should set the correct values', ->
      checkValues(scope, results)

exports.promiseError = (setUp, error_msg, results)->
  scope =   promise = deferred = null
  describe 'sets up data once loaded from fcty', ->
    scope =   promise = null
    beforeEach ->
      setup_obj = setUp()
      scope     = setup_obj.scope
      deferred  = setup_obj.deferred

      deferred.reject(error_msg)
      scope.$apply()

    it 'should set the correct values', ->
      checkValues(scope, results)


