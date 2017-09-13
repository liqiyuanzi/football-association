import {
	GET_ADMIN_CHART_DATA
} from 'actions/actiontype';
import Config from "codes/config";
import common from 'codes/common';
/*��ʼ����*/
const initState = {
	adminChartData:"",
};
/*�ۺ�coach�γ���Ϣ*/
const setAdminChartData = (data) =>{
	data.adminChartData = {};
	data.adminChartData['coach'] = [];
	data.adminChartData['teacher'] = [];
	common.setRelation(data.selectProvince,data.selectCoach,'code','organization','coach');
	common.setRelation(data.selectProvince,data.selectTeacher,'code','organization','teacher');
	for(var i = 0;i < data.selectProvince.length;i ++){
		data.adminChartData['coach'][i] = {};
		data.adminChartData['teacher'][i]  ={};
		if(data.selectProvince[i].coach){
			data.adminChartData['coach'][i].name = data.selectProvince[i].shortCaption;
			data.adminChartData['coach'][i].value =  data.selectProvince[i].coach.length;
		}
		if(data.selectProvince[i].teacher){
			data.adminChartData['teacher'][i].name = data.selectProvince[i].shortCaption;
			data.adminChartData['teacher'][i].value = data.selectProvince[i].teacher.length;
		}
	}
}
/*��ȡ����*/
const login = (state=initState,action) => {
	switch(action.type){
		case GET_ADMIN_CHART_DATA:
			setAdminChartData(action.data);
			return Object.assign({}, state, {
				adminChartData:action.data.adminChartData ? action.data.adminChartData : "" 
			});
		default:
		  return state;
	}	
}
export default login;
