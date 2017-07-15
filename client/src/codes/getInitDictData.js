import * as actions from "actions/action"
import common from './common'
const getInitDictData = {
	getData:()=>{
		actions.getSqlData(
			[
				{Key: "City", Path: "dicts/city.txt"},
				{Key: "Gender", Path: "dicts/gender.txt"},
				{Key: "Province", Path: "dicts/province.txt"},
				{Key: "Type", Path: "dicts/type.txt"}
			],{},"reduceDictData",()=>{
				actions.getSqlData([{ Key: "UserInfo", Path: "user/user.txt" }],{'userID':common.getCookie().userID},"reduceUserInfo")
			}
		);
	}	
}

export default getInitDictData
