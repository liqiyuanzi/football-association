module.exports = {
  path: 'firstStep',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/register/firstStep.jsx'))
    })
  }
}