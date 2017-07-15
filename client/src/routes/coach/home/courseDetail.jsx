module.exports = {
  path: 'courseDetail',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../containers/home/courseDetail'))
    })
  }
}