module.exports = {
  path: 'userInfomation',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("../../../containers/manage/userInfomation"))
    })
  }
}