module.exports = {
  path: 'homeIndex',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../containers/home/homeIndex'))
    })
  }
}