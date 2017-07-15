module.exports = {
  path: 'accountSecurity',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("../../../containers/manage/accountSecurity"))
    })
  }
}