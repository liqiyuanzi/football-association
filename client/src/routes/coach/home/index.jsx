module.exports = {
  path: 'home',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("../../../containers/home/home"))
    })
  },
   getChildRoutes(location,callback) {
    require.ensure([],function(require){
      callback(null,[
		require('./homeIndex.jsx'),
		require('./courseDetail.jsx')
      ])
    })
  }
}