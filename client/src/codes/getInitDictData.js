import * as actions from "actions/action"
import * as courseActions from 'actions/course';
import common from './common'
const getInitDictData = {
	getData:()=>{
		actions.getSqlData(
			[
				{Key: "City", Path: "dicts/city.txt"},
				{Key: "Gender", Path: "dicts/gender.txt"},
				{Key: "Province", Path: "dicts/province.txt"},
				{Key: "Type", Path: "dicts/type.txt"},
				{Key: "Level", Path: "dicts/level.txt"},
				{Key: "Organization", Path: "dicts/organization.txt"}
			],{},"reduceDictData",(data)=>{
				courseActions.setOrganizationCode(data.Organization[0].code);
				actions.getSqlData([{ Key: "UserInfo", Path: "user/user.txt" }],{'userID':common.getCookie().userID},"reduceUserInfo")
			}
		);
	}	
}

export default getInitDictData
