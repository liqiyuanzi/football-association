module.exports = {
  path: 'register',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("../../containers/register/register"))
    })
  },
   getChildRoutes(location,callback) {
    require.ensure([],function(require){
      callback(null,[
		require('./firstStep.jsx'),
		require('./registerLogin.jsx')
      ])
    })
  }
}