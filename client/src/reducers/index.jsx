/*将所有的reducer方法注册到reducer节点上*/
import {combineReducers} from 'redux';
/*登录模块*/
import loginModule from './loginModule.jsx';
/*注册模块*/
import registerModule from './registerModule.jsx';
/*用户信息*/
import userInfo from './userInfo.jsx';
/*课程信息模块*/
import courseModule from './courseModule.jsx';
const reducer = combineReducers({
  loginModule,registerModule,userInfo,courseModule
});
export default reducer
