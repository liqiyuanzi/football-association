module.exports = {
  path: 'registerLogin',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/register/registerLogin.jsx'))
    })
  }
}