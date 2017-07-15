module.exports = {
  path: 'nav',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("../../containers/nav"))
    })
  },
   getChildRoutes(location,callback) {
    require.ensure([],function(require){
      callback(null,[
		require('./home/index.jsx'),
		require('./manage/index.jsx')
      ])
    })
  }
}