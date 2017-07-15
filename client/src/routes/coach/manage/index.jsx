
module.exports = {
  path: 'manage',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("../../../containers/manage/manage"))
    })
  },
   getChildRoutes(location,callback) {
    require.ensure([],function(require){
      callback(null,[
		require('./accountSecurity.jsx'),
		require('./bindMailBox.jsx'),
		require('./help.jsx'),
		require('./operationNote.jsx'),
		require('./userInfomation.jsx')
      ])
    })
  }
}