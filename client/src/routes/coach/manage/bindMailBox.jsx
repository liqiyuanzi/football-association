module.exports = {
  path: 'bindMailBox',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("../../../containers/manage/bindMailBox"))
    })
  }
}