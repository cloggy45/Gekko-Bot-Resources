'use strict'

const Helper = require('../gekko/helper.js')
const expect = require('chai').expect

describe('Helper module', () => {
  describe('"up"', () => {
    it('should export a function', () => {
      expect(Helper.up).to.be.a('function')
    })
  })
})