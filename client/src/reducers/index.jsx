/*�����е�reducer����ע�ᵽreducer�ڵ���*/
import {combineReducers} from 'redux';
/*��¼ģ��*/
import loginModule from './loginModule.jsx';
/*ע��ģ��*/
import registerModule from './registerModule.jsx';
/*�û���Ϣ*/
import userInfo from './userInfo.jsx';
/*�γ���Ϣģ��*/
import courseModule from './courseModule.jsx';
const reducer = combineReducers({
  loginModule,registerModule,userInfo,courseModule
});
export default reducer
