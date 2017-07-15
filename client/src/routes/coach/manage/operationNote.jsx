module.exports = {
  path: 'operationNote',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("../../../containers/manage/operationNote"))
    })
  }
}