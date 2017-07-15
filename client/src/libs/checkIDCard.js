var IDCardObj = {
        IDCard: "",
        vt: "",
        addresscode: "",
        address: "",
        sex: "",
        birthday: "",
        IsChecked: true
    };
var checkIDCard = function (idCard) {
	if (!IDCardObj.IsChecked)
		return true;
	IDCardObj.vt = "";
	//是否输入
	var id = idCard;
	var id_length = id.length;
	if (id_length == 0) {
		IDCardObj.vt = "请输入身份证号码";
		return false;
	}
	//长度校验
	if (id_length < 18) {
		IDCardObj.vt = "身份证号码不满18位";
		return false;
	}
	if (id_length > 18) {
		IDCardObj.vt = "身份证号码超出18位";
		return false;
	}
	//判断是否纯数字
	if (isNaN(idCard) && idCard.indexOf("X") < 0 && idCard.indexOf("x") < 0) {
		IDCardObj.vt = ("含有非法字符!");
		return false;
	}
	//地区校验
	getAddress(idCard);
	if (IDCardObj.vt) {
		return false;
	}
	//日期校验
	if (id_length == 18) {
		var yyyy = id.toString().substring(6, 10);
		if (yyyy > 2200 || yyyy < 1900) {
			IDCardObj.vt = ("输入身份证号,年度非法！");
			return false;
		}
		var mm = id.toString().substring(10, 12);
		if (mm > 12 || mm <= 0) {
			IDCardObj.vt = ("输入身份证号,月份非法！");
			return false;
		}
		var dd = id.toString().substring(12, 14);
		if (dd > 31 || dd <= 0) {
			IDCardObj.vt = ("输入身份证号,日期非法！");
			return false;
		}
		if ("13579".indexOf(id.toString().substring(16, 17)) == -1) {
			IDCardObj.sex = "女";
		} else {
			IDCardObj.sex = "男";
		}
		//校验位校验
		if (!isChinaIDCard(idCard)) {
			return false;
		}
		IDCardObj.birthday = yyyy + "-" + mm + "-" + dd;
	}
	IDCardObj.vt = "";
	return true;
}
//第18位校验码校验
function isChinaIDCard(StrNo) {
	StrNo = StrNo.toString();
	var a, b, c;
	a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1)) * 9 + parseInt(StrNo.substr(2, 1)) * 10;
	a = a + parseInt(StrNo.substr(3, 1)) * 5 + parseInt(StrNo.substr(4, 1)) * 8 + parseInt(StrNo.substr(5, 1)) * 4;
	a = a + parseInt(StrNo.substr(6, 1)) * 2 + parseInt(StrNo.substr(7, 1)) * 1 + parseInt(StrNo.substr(8, 1)) * 6;
	a = a + parseInt(StrNo.substr(9, 1)) * 3 + parseInt(StrNo.substr(10, 1)) * 7 + parseInt(StrNo.substr(11, 1)) * 9;
	a = a + parseInt(StrNo.substr(12, 1)) * 10 + parseInt(StrNo.substr(13, 1)) * 5 + parseInt(StrNo.substr(14, 1)) * 8;
	a = a + parseInt(StrNo.substr(15, 1)) * 4 + parseInt(StrNo.substr(16, 1)) * 2;
	b = a % 11;
	if (b == 2)
		//最后一位为校验位
	{
		c = StrNo.substr(17, 1).toUpperCase(); //转为大写X
	}
	else {
		c = parseInt(StrNo.substr(17, 1));
	}
	switch (b) {
		case 0:
			if (c != 1) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:1");
				return false;
			}
			break;
		case 1:
			if (c != 0) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:0");
				return false;
			}
			break;
		case 2:
			if (c != "X") {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:X");
				return false;
			}
			break;
		case 3:
			if (c != 9) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:9");
				return false;
			}
			break;
		case 4:
			if (c != 8) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:8");
				return false;
			}
			break;
		case 5:
			if (c != 7) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:7");
				return false;
			}
			break;
		case 6:
			if (c != 6) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:6");
				return false;
			}
			break;
		case 7:
			if (c != 5) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:5");
				return false;
			}
			break;
		case 8:
			if (c != 4) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:4");
				return false;
			}
			break;
		case 9:
			if (c != 3) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:3");
				return false;
			}
			break;
		case 10:
			if (c != 2) {
				IDCardObj.vt = ("身份证号码校验位错:最后一位应该为:2");
				return false
			}
	}
	return true;
}
function getAddress(idCard) {
	var p = "",
	c = "";
	var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
	if (area[parseInt(idCard.toString().substr(0, 2))] == null) {
		IDCardObj.vt = ('身份证地区非法!')
		return false;
	}
	else
		p = area[parseInt(idCard.toString().substr(0, 2))];
	var citycode = idCard.toString().substring(0, 4) + "00";
	var ind1 = CityStr.indexOf(citycode, 0);
	if (ind1 > -1) {
		ind1 += 7;
		var ind2 = CityStr.indexOf(",", ind1);
		c = CityStr.substring(ind1, ind2);
	}
	IDCardObj.address = p + c;
	IDCardObj.addresscode = citycode;
}
var CityStr =
	"33,110100,市辖区,2,0,0,Shixiaqu,2;\
	34,110200,县,2,0,0,Xian,2;\
	35,120100,市辖区,3,0,0,Shixiaqu,2;\
	36,120200,县,3,0,0,Xian,2;\
	37,130100,石家庄市,4,0,0,Shijiazhuang Shi,SJW;\
	38,130200,唐山市,4,0,0,Tangshan Shi,TGS;\
	39,130300,秦皇岛市,4,0,0,Qinhuangdao Shi,SHP;\
	40,130400,邯郸市,4,0,0,Handan Shi,HDS;\
	41,130500,邢台市,4,0,0,Xingtai Shi,XTS;\
	42,130600,保定市,4,0,0,Baoding Shi,BDS;\
	43,130700,张家口市,4,0,0,Zhangjiakou Shi,ZJK;\
	44,130800,承德市,4,0,0,Chengde Shi,CDS;\
	45,130900,沧州市,4,0,0,Cangzhou Shi,CGZ;\
	46,131000,廊坊市,4,0,0,Langfang Shi,LFS;\
	47,131100,衡水市,4,0,0,Hengshui Shi,HGS;\
	48,140100,太原市,5,0,0,Taiyuan Shi,TYN;\
	49,140200,大同市,5,0,0,Datong Shi,DTG;\
	50,140300,阳泉市,5,0,0,Yangquan Shi,YQS;\
	51,140400,长治市,5,0,0,Changzhi Shi,CZS;\
	52,140500,晋城市,5,0,0,Jincheng Shi,JCG;\
	53,140600,朔州市,5,0,0,Shuozhou Shi,SZJ;\
	54,140700,晋中市,5,0,0,Jinzhong Shi,2;\
	55,140800,运城市,5,0,0,Yuncheng Shi,2;\
	56,140900,忻州市,5,0,0,Xinzhou Shi,2;\
	57,141000,临汾市,5,0,0,Linfen Shi,2;\
	58,141100,吕梁市,5,0,0,Lvliang Shi,2;\
	59,150100,呼和浩特市,6,0,0,Hohhot Shi,Hhht;\
	60,150200,包头市,6,0,0,Baotou Shi,BTS;\
	61,150300,乌海市,6,0,0,Wuhai Shi,WHM;\
	62,150400,赤峰市,6,0,0,Chifeng (Ulanhad)Shi,CFS;\
	63,150500,通辽市,6,0,0,Tongliao Shi,2;\
	64,150600,鄂尔多斯市,6,0,0,Eerduosi Shi,2;\
	65,150700,呼伦贝尔市,6,0,0,Hulunbeier Shi,2;\
	66,150800,巴彦淖尔市,6,0,0,Bayannaoer Shi,2;\
	67,150900,乌兰察布市,6,0,0,Wulanchabu Shi,2;\
	68,152200,兴安盟,6,0,0,Hinggan Meng,HIN;\
	69,152500,锡林郭勒盟,6,0,0,Xilin Gol Meng,XGO;\
	70,152900,阿拉善盟,6,0,0,Alxa Meng,ALM;\
	71,210100,沈阳市,7,0,0,Shenyang Shi,SHE;\
	72,210200,大连市,7,0,0,Dalian Shi,DLC;\
	73,210300,鞍山市,7,0,0,AnShan Shi,ASN;\
	74,210400,抚顺市,7,0,0,Fushun Shi,FSN;\
	75,210500,本溪市,7,0,0,Benxi Shi,BXS;\
	76,210600,丹东市,7,0,0,Dandong Shi,DDG;\
	77,210700,锦州市,7,0,0,Jinzhou Shi,JNZ;\
	78,210800,营口市,7,0,0,Yingkou Shi,YIK;\
	79,210900,阜新市,7,0,0,Fuxin Shi,FXS;\
	80,211000,辽阳市,7,0,0,Liaoyang Shi,LYL;\
	81,211100,盘锦市,7,0,0,Panjin Shi,PJS;\
	82,211200,铁岭市,7,0,0,Tieling Shi,TLS;\
	83,211300,朝阳市,7,0,0,Chaoyang Shi,CYS;\
	84,211400,葫芦岛市,7,0,0,Huludao Shi,HLD;\
	85,220100,长春市,8,0,0,Changchun Shi,CGQ;\
	86,220200,吉林市,8,0,0,Jilin Shi,JLS;\
	87,220300,四平市,8,0,0,Siping Shi,SPS;\
	88,220400,辽源市,8,0,0,Liaoyuan Shi,LYH;\
	89,220500,通化市,8,0,0,Tonghua Shi,THS;\
	90,220600,白山市,8,0,0,Baishan Shi,BSN;\
	91,220700,松原市,8,0,0,Songyuan Shi,SYU;\
	92,220800,白城市,8,0,0,Baicheng Shi,BCS;\
	93,222400,延边朝鲜族自治州,8,0,0,Yanbian Chosenzu Zizhizhou,YBZ;\
	94,230100,哈尔滨市,9,0,0,Harbin Shi,HRB;\
	95,230200,齐齐哈尔市,9,0,0,Qiqihar Shi,NDG;\
	96,230300,鸡西市,9,0,0,Jixi Shi,JXI;\
	97,230400,鹤岗市,9,0,0,Hegang Shi,HEG;\
	98,230500,双鸭山市,9,0,0,Shuangyashan Shi,SYS;\
	99,230600,大庆市,9,0,0,Daqing Shi,DQG;\
	100,230700,伊春市,9,0,0,Yichun Shi,YCH;\
	101,230800,佳木斯市,9,0,0,Jiamusi Shi,JMU;\
	102,230900,七台河市,9,0,0,Qitaihe Shi,QTH;\
	103,231000,牡丹江市,9,0,0,Mudanjiang Shi,MDG;\
	104,231100,黑河市,9,0,0,Heihe Shi,HEK;\
	105,231200,绥化市,9,0,0,Suihua Shi,2;\
	106,232700,大兴安岭地区,9,0,0,Da Hinggan Ling Diqu,DHL;\
	107,310100,市辖区,10,0,0,Shixiaqu,2;\
	108,310200,县,10,0,0,Xian,2;\
	109,320100,南京市,11,0,0,Nanjing Shi,NKG;\
	110,320200,无锡市,11,0,0,Wuxi Shi,WUX;\
	111,320300,徐州市,11,0,0,Xuzhou Shi,XUZ;\
	112,320400,常州市,11,0,0,Changzhou Shi,CZX;\
	113,320500,苏州市,11,0,0,Suzhou Shi,SZH;\
	114,320600,南通市,11,0,0,Nantong Shi,NTG;\
	115,320700,连云港市,11,0,0,Lianyungang Shi,LYG;\
	116,320800,淮安市,11,0,0,Huai,an Xian,2;\
	117,320900,盐城市,11,0,0,Yancheng Shi,YCK;\
	118,321000,扬州市,11,0,0,Yangzhou Shi,YZH;\
	119,321100,镇江市,11,0,0,Zhenjiang Shi,ZHE;\
	120,321200,泰州市,11,0,0,Taizhou Shi,TZS;\
	121,321300,宿迁市,11,0,0,Suqian Shi,SUQ;\
	122,330100,杭州市,12,0,0,Hangzhou Shi,HGH;\
	123,330200,宁波市,12,0,0,Ningbo Shi,NGB;\
	124,330300,温州市,12,0,0,Wenzhou Shi,WNZ;\
	125,330400,嘉兴市,12,0,0,Jiaxing Shi,JIX;\
	126,330500,湖州市,12,0,0,Huzhou Shi,HZH;\
	127,330600,绍兴市,12,0,0,Shaoxing Shi,SXG;\
	128,330700,金华市,12,0,0,Jinhua Shi,JHA;\
	129,330800,衢州市,12,0,0,Quzhou Shi,QUZ;\
	130,330900,舟山市,12,0,0,Zhoushan Shi,ZOS;\
	131,331000,台州市,12,0,0,Taizhou Shi,TZZ;\
	132,331100,丽水市,12,0,0,Lishui Shi,2;\
	133,340100,合肥市,13,0,0,Hefei Shi,HFE;\
	134,340200,芜湖市,13,0,0,Wuhu Shi,WHI;\
	135,340300,蚌埠市,13,0,0,Bengbu Shi,BBU;\
	136,340400,淮南市,13,0,0,Huainan Shi,HNS;\
	137,340500,马鞍山市,13,0,0,Ma,anshan Shi,MAA;\
	138,340600,淮北市,13,0,0,Huaibei Shi,HBE;\
	139,340700,铜陵市,13,0,0,Tongling Shi,TOL;\
	140,340800,安庆市,13,0,0,Anqing Shi,AQG;\
	141,341000,黄山市,13,0,0,Huangshan Shi,HSN;\
	142,341100,滁州市,13,0,0,Chuzhou Shi,CUZ;\
	143,341200,阜阳市,13,0,0,Fuyang Shi,FYS;\
	144,341300,宿州市,13,0,0,Suzhou Shi,SUZ;\
	145,341400,巢湖市,13,0,0,Chaohu Shi,2;\
	146,341500,六安市,13,0,0,Liu,an Shi,2;\
	147,341600,亳州市,13,0,0,Bozhou Shi,2;\
	148,341700,池州市,13,0,0,Chizhou Shi,2;\
	149,341800,宣城市,13,0,0,Xuancheng Shi,2;\
	150,350100,福州市,14,0,0,Fuzhou Shi,FOC;\
	151,350200,厦门市,14,0,0,Xiamen Shi,XMN;\
	152,350300,莆田市,14,0,0,Putian Shi,PUT;\
	153,350400,三明市,14,0,0,Sanming Shi,SMS;\
	154,350500,泉州市,14,0,0,Quanzhou Shi,QZJ;\
	155,350600,漳州市,14,0,0,Zhangzhou Shi,ZZU;\
	156,350700,南平市,14,0,0,Nanping Shi,NPS;\
	157,350800,龙岩市,14,0,0,Longyan Shi,LYF;\
	158,350900,宁德市,14,0,0,Ningde Shi,2;\
	159,360100,南昌市,15,0,0,Nanchang Shi,KHN;\
	160,360200,景德镇市,15,0,0,Jingdezhen Shi,JDZ;\
	161,360300,萍乡市,15,0,0,Pingxiang Shi,PXS;\
	162,360400,九江市,15,0,0,Jiujiang Shi,JIU;\
	163,360500,新余市,15,0,0,Xinyu Shi,XYU;\
	164,360600,鹰潭市,15,0,0,Yingtan Shi,2;\
	165,360700,赣州市,15,0,0,Ganzhou Shi,GZH;\
	166,360800,吉安市,15,0,0,Ji,an Shi,2;\
	167,360900,宜春市,15,0,0,Yichun Shi,2;\
	168,361000,抚州市,15,0,0,Wuzhou Shi,2;\
	169,361100,上饶市,15,0,0,Shangrao Shi,2;\
	170,370100,济南市,16,0,0,Jinan Shi,TNA;\
	171,370200,青岛市,16,0,0,Qingdao Shi,TAO;\
	172,370300,淄博市,16,0,0,Zibo Shi,ZBO;\
	173,370400,枣庄市,16,0,0,Zaozhuang Shi,ZZG;\
	174,370500,东营市,16,0,0,Dongying Shi,DYG;\
	175,370600,烟台市,16,0,0,Yantai Shi,YNT;\
	176,370700,潍坊市,16,0,0,Weifang Shi,WEF;\
	177,370800,济宁市,16,0,0,Jining Shi,JNG;\
	178,370900,泰安市,16,0,0,Tai,an Shi,TAI;\
	179,371000,威海市,16,0,0,Weihai Shi,WEH;\
	180,371100,日照市,16,0,0,Rizhao Shi,RZH;\
	181,371200,莱芜市,16,0,0,Laiwu Shi,LWS;\
	182,371300,临沂市,16,0,0,Linyi Shi,LYI;\
	183,371400,德州市,16,0,0,Dezhou Shi,DZS;\
	184,371500,聊城市,16,0,0,Liaocheng Shi,LCH;\
	185,371600,滨州市,16,0,0,Binzhou Shi,2;\
	186,371700,菏泽市,16,3,0,Heze Shi,HZ;\
	187,410100,郑州市,17,0,0,Zhengzhou Shi,CGO;\
	188,410200,开封市,17,0,0,Kaifeng Shi,KFS;\
	189,410300,洛阳市,17,0,0,Luoyang Shi,LYA;\
	190,410400,平顶山市,17,0,0,Pingdingshan Shi,PDS;\
	191,410500,安阳市,17,0,0,Anyang Shi,AYS;\
	192,410600,鹤壁市,17,0,0,Hebi Shi,HBS;\
	193,410700,新乡市,17,0,0,Xinxiang Shi,XXS;\
	194,410800,焦作市,17,0,0,Jiaozuo Shi,JZY;\
	195,410900,濮阳市,17,0,0,Puyang Shi,PYS;\
	196,411000,许昌市,17,0,0,Xuchang Shi,XCS;\
	197,411100,漯河市,17,0,0,Luohe Shi,LHS;\
	198,411200,三门峡市,17,0,0,Sanmenxia Shi,SMX;\
	199,411300,南阳市,17,0,0,Nanyang Shi,NYS;\
	200,411400,商丘市,17,0,0,Shangqiu Shi,SQS;\
	201,411500,信阳市,17,0,0,Xinyang Shi,XYG;\
	202,411600,周口市,17,0,0,Zhoukou Shi,2;\
	203,411700,驻马店市,17,0,0,Zhumadian Shi,2;\
	204,420100,武汉市,18,0,0,Wuhan Shi,WUH;\
	205,420200,黄石市,18,0,0,Huangshi Shi,HIS;\
	206,420300,十堰市,18,0,0,Shiyan Shi,SYE;\
	207,420500,宜昌市,18,0,0,Yichang Shi,YCO;\
	208,420600,襄樊市,18,0,0,Xiangfan Shi,XFN;\
	209,420700,鄂州市,18,0,0,Ezhou Shi,EZS;\
	210,420800,荆门市,18,0,0,Jingmen Shi,JMS;\
	211,420900,孝感市,18,0,0,Xiaogan Shi,XGE;\
	212,421000,荆州市,18,0,0,Jingzhou Shi,JGZ;\
	213,421100,黄冈市,18,0,0,Huanggang Shi,HE;\
	214,421200,咸宁市,18,0,0,Xianning Xian,XNS;\
	215,421300,随州市,18,0,0,Suizhou Shi,2;\
	216,422800,恩施土家族苗族自治州,18,0,0,Enshi Tujiazu Miaozu Zizhizhou,ESH;\
	217,429000,省直辖县级行政区划,18,0,0,shengzhixiaxianjixingzhengquhua,2;\
	218,430100,长沙市,19,0,0,Changsha Shi,CSX;\
	219,430200,株洲市,19,0,0,Zhuzhou Shi,ZZS;\
	220,430300,湘潭市,19,0,0,Xiangtan Shi,XGT;\
	221,430400,衡阳市,19,0,0,Hengyang Shi,HNY;\
	222,430500,邵阳市,19,0,0,Shaoyang Shi,SYR;\
	223,430600,岳阳市,19,0,0,Yueyang Shi,YYG;\
	224,430700,常德市,19,0,0,Changde Shi,CDE;\
	225,430800,张家界市,19,0,0,Zhangjiajie Shi,ZJJ;\
	226,430900,益阳市,19,0,0,Yiyang Shi,YYS;\
	227,431000,郴州市,19,0,0,Chenzhou Shi,CNZ;\
	228,431100,永州市,19,0,0,Yongzhou Shi,YZS;\
	229,431200,怀化市,19,0,0,Huaihua Shi,HHS;\
	230,431300,娄底市,19,0,0,Loudi Shi,2;\
	231,433100,湘西土家族苗族自治州,19,0,0,Xiangxi Tujiazu Miaozu Zizhizhou,XXZ;\
	232,440100,广州市,20,0,0,Guangzhou Shi,CAN;\
	233,440200,韶关市,20,0,0,Shaoguan Shi,HSC;\
	234,440300,深圳市,20,0,0,Shenzhen Shi,SZX;\
	235,440400,珠海市,20,0,0,Zhuhai Shi,ZUH;\
	236,440500,汕头市,20,0,0,Shantou Shi,SWA;\
	237,440600,佛山市,20,0,0,Foshan Shi,FOS;\
	238,440700,江门市,20,0,0,Jiangmen Shi,JMN;\
	239,440800,湛江市,20,0,0,Zhanjiang Shi,ZHA;\
	240,440900,茂名市,20,0,0,Maoming Shi,MMI;\
	241,441200,肇庆市,20,0,0,Zhaoqing Shi,ZQG;\
	242,441300,惠州市,20,0,0,Huizhou Shi,HUI;\
	243,441400,梅州市,20,0,0,Meizhou Shi,MXZ;\
	244,441500,汕尾市,20,0,0,Shanwei Shi,SWE;\
	245,441600,河源市,20,0,0,Heyuan Shi,HEY;\
	246,441700,阳江市,20,0,0,Yangjiang Shi,YJI;\
	247,441800,清远市,20,0,0,Qingyuan Shi,QYN;\
	248,441900,东莞市,20,0,0,Dongguan Shi,DGG;\
	249,442000,中山市,20,0,0,Zhongshan Shi,ZSN;\
	250,445100,潮州市,20,0,0,Chaozhou Shi,CZY;\
	251,445200,揭阳市,20,0,0,Jieyang Shi,JIY;\
	252,445300,云浮市,20,0,0,Yunfu Shi,YFS;\
	253,450100,南宁市,21,0,0,Nanning Shi,NNG;\
	254,450200,柳州市,21,0,0,Liuzhou Shi,LZH;\
	255,450300,桂林市,21,0,0,Guilin Shi,KWL;\
	256,450400,梧州市,21,0,0,Wuzhou Shi,WUZ;\
	257,450500,北海市,21,0,0,Beihai Shi,BHY;\
	258,450600,防城港市,21,0,0,Fangchenggang Shi,FAN;\
	259,450700,钦州市,21,0,0,Qinzhou Shi,QZH;\
	260,450800,贵港市,21,0,0,Guigang Shi,GUG;\
	261,450900,玉林市,21,0,0,Yulin Shi,YUL;\
	262,451000,百色市,21,0,0,Baise Shi,2;\
	263,451100,贺州市,21,0,0,Hezhou Shi,2;\
	264,451200,河池市,21,0,0,Hechi Shi,2;\
	265,451300,来宾市,21,0,0,Laibin Shi,2;\
	266,451400,崇左市,21,0,0,Chongzuo Shi,2;\
	267,460100,海口市,22,0,0,Haikou Shi,HAK;\
	268,460200,三亚市,22,0,0,Sanya Shi,SYX;\
	269,469000,省直辖县级行政区划,22,0,0,shengzhixiaxianjixingzhengquhua,2;\
	270,500100,市辖区,23,0,0,Shixiaqu,2;\
	271,500200,县,23,0,0,Xian,2;\
	273,510100,成都市,24,0,0,Chengdu Shi,CTU;\
	274,510300,自贡市,24,0,0,Zigong Shi,ZGS;\
	275,510400,攀枝花市,24,0,0,Panzhihua Shi,PZH;\
	276,510500,泸州市,24,0,0,Luzhou Shi,LUZ;\
	277,510600,德阳市,24,0,0,Deyang Shi,DEY;\
	278,510700,绵阳市,24,0,0,Mianyang Shi,MYG;\
	279,510800,广元市,24,0,0,Guangyuan Shi,GYC;\
	280,510900,遂宁市,24,0,0,Suining Shi,SNS;\
	281,511000,内江市,24,0,0,Neijiang Shi,NJS;\
	282,511100,乐山市,24,0,0,Leshan Shi,LES;\
	283,511300,南充市,24,0,0,Nanchong Shi,NCO;\
	284,511400,眉山市,24,0,0,Meishan Shi,2;\
	285,511500,宜宾市,24,0,0,Yibin Shi,YBS;\
	286,511600,广安市,24,0,0,Guang,an Shi,GAC;\
	287,511700,达州市,24,0,0,Dazhou Shi,2;\
	288,511800,雅安市,24,0,0,Ya,an Shi,2;\
	289,511900,巴中市,24,0,0,Bazhong Shi,2;\
	290,512000,资阳市,24,0,0,Ziyang Shi,2;\
	291,513200,阿坝藏族羌族自治州,24,0,0,Aba(Ngawa) Zangzu Qiangzu Zizhizhou,ABA;\
	292,513300,甘孜藏族自治州,24,0,0,Garze Zangzu Zizhizhou,GAZ;\
	293,513400,凉山彝族自治州,24,0,0,Liangshan Yizu Zizhizhou,LSY;\
	294,520100,贵阳市,25,0,0,Guiyang Shi,KWE;\
	295,520200,六盘水市,25,0,0,Liupanshui Shi,LPS;\
	296,520300,遵义市,25,0,0,Zunyi Shi,ZNY;\
	297,520400,安顺市,25,0,0,Anshun Xian,2;\
	298,522200,铜仁地区,25,0,0,Tongren Diqu,TRD;\
	299,522300,黔西南布依族苗族自治州,25,0,0,Qianxinan Buyeizu Zizhizhou,QXZ;\
	300,522400,毕节地区,25,0,0,Bijie Diqu,BJD;\
	301,522600,黔东南苗族侗族自治州,25,0,0,Qiandongnan Miaozu Dongzu Zizhizhou,QND;\
	302,522700,黔南布依族苗族自治州,25,0,0,Qiannan Buyeizu Miaozu Zizhizhou,QNZ;\
	303,530100,昆明市,26,0,0,Kunming Shi,KMG;\
	304,530300,曲靖市,26,0,0,Qujing Shi,QJS;\
	305,530400,玉溪市,26,0,0,Yuxi Shi,YXS;\
	306,530500,保山市,26,0,0,Baoshan Shi,2;\
	307,530600,昭通市,26,0,0,Zhaotong Shi,2;\
	308,530700,丽江市,26,0,0,Lijiang Shi,2;\
	309,530800,普洱市,26,0,0,Simao Shi,2;\
	310,530900,临沧市,26,0,0,Lincang Shi,2;\
	311,532300,楚雄彝族自治州,26,0,0,Chuxiong Yizu Zizhizhou,CXD;\
	312,532500,红河哈尼族彝族自治州,26,0,0,Honghe Hanizu Yizu Zizhizhou,HHZ;\
	313,532600,文山壮族苗族自治州,26,0,0,Wenshan Zhuangzu Miaozu Zizhizhou,WSZ;\
	314,532800,西双版纳傣族自治州,26,0,0,Xishuangbanna Daizu Zizhizhou,XSB;\
	315,532900,大理白族自治州,26,0,0,Dali Baizu Zizhizhou,DLZ;\
	316,533100,德宏傣族景颇族自治州,26,0,0,Dehong Daizu Jingpozu Zizhizhou,DHG;\
	317,533300,怒江傈僳族自治州,26,0,0,Nujiang Lisuzu Zizhizhou,NUJ;\
	318,533400,迪庆藏族自治州,26,0,0,Deqen Zangzu Zizhizhou,DEZ;\
	319,540100,拉萨市,27,0,0,Lhasa Shi,LXA;\
	320,542100,昌都地区,27,0,0,Qamdo Diqu,QAD;\
	321,542200,山南地区,27,0,0,Shannan Diqu,SND;\
	322,542300,日喀则地区,27,0,0,Xigaze Diqu,XID;\
	323,542400,那曲地区,27,0,0,Nagqu Diqu,NAD;\
	324,542500,阿里地区,27,0,0,Ngari Diqu,NGD;\
	325,542600,林芝地区,27,0,0,Nyingchi Diqu,NYD;\
	326,610100,西安市,28,0,0,Xi,an Shi,SIA;\
	327,610200,铜川市,28,0,0,Tongchuan Shi,TCN;\
	328,610300,宝鸡市,28,0,0,Baoji Shi,BJI;\
	329,610400,咸阳市,28,0,0,Xianyang Shi,XYS;\
	330,610500,渭南市,28,0,0,Weinan Shi,WNA;\
	331,610600,延安市,28,0,0,Yan,an Shi,YNA;\
	332,610700,汉中市,28,0,0,Hanzhong Shi,HZJ;\
	333,610800,榆林市,28,0,0,Yulin Shi,2;\
	334,610900,安康市,28,0,0,Ankang Shi,2;\
	335,611000,商洛市,28,0,0,Shangluo Shi,2;\
	336,620100,兰州市,29,0,0,Lanzhou Shi,LHW;\
	337,620200,嘉峪关市,29,0,0,Jiayuguan Shi,JYG;\
	338,620300,金昌市,29,0,0,Jinchang Shi,JCS;\
	339,620400,白银市,29,0,0,Baiyin Shi,BYS;\
	340,620500,天水市,29,0,0,Tianshui Shi,TSU;\
	341,620600,武威市,29,0,0,Wuwei Shi,2;\
	342,620700,张掖市,29,0,0,Zhangye Shi,2;\
	343,620800,平凉市,29,0,0,Pingliang Shi,2;\
	344,620900,酒泉市,29,0,0,Jiuquan Shi,2;\
	345,621000,庆阳市,29,0,0,Qingyang Shi,2;\
	346,621100,定西市,29,0,0,Dingxi Shi,2;\
	347,621200,陇南市,29,0,0,Longnan Shi,2;\
	348,622900,临夏回族自治州,29,0,0,Linxia Huizu Zizhizhou,LXH;\
	349,623000,甘南藏族自治州,29,0,0,Gannan Zangzu Zizhizhou,GNZ;\
	350,630100,西宁市,30,0,0,Xining Shi,XNN;\
	351,632100,海东地区,30,0,0,Haidong Diqu,HDD;\
	352,632200,海北藏族自治州,30,0,0,Haibei Zangzu Zizhizhou,HBZ;\
	353,632300,黄南藏族自治州,30,0,0,Huangnan Zangzu Zizhizhou,HNZ;\
	354,632500,海南藏族自治州,30,0,0,Hainan Zangzu Zizhizhou,HNN;\
	355,632600,果洛藏族自治州,30,0,0,Golog Zangzu Zizhizhou,GOL;\
	356,632700,玉树藏族自治州,30,0,0,Yushu Zangzu Zizhizhou,YSZ;\
	357,632800,海西蒙古族藏族自治州,30,0,0,Haixi Mongolzu Zangzu Zizhizhou,HXZ;\
	358,640100,银川市,31,0,0,Yinchuan Shi,INC;\
	359,640200,石嘴山市,31,0,0,Shizuishan Shi,SZS;\
	360,640300,吴忠市,31,0,0,Wuzhong Shi,WZS;\
	361,640400,固原市,31,0,0,Guyuan Shi,2;\
	362,640500,中卫市,31,0,0,Zhongwei Shi,2;\
	363,650100,乌鲁木齐市,32,0,0,Urumqi Shi,URC;\
	364,650200,克拉玛依市,32,0,0,Karamay Shi,KAR;\
	365,652100,吐鲁番地区,32,0,0,Turpan Diqu,TUD;\
	366,652200,哈密地区,32,0,0,Hami(kumul) Diqu,HMD;\
	367,652300,昌吉回族自治州,32,0,0,Changji Huizu Zizhizhou,CJZ;\
	368,652700,博尔塔拉蒙古自治州,32,0,0,Bortala Monglo Zizhizhou,BOR;\
	369,652800,巴音郭楞蒙古自治州,32,0,0,bayinguolengmengguzizhizhou,2;\
	370,652900,阿克苏地区,32,0,0,Aksu Diqu,AKD;\
	371,653000,克孜勒苏柯尔克孜自治州,32,0,0,Kizilsu Kirgiz Zizhizhou,KIZ;\
	372,653100,喀什地区,32,0,0,Kashi(Kaxgar) Diqu,KSI;\
	373,653200,和田地区,32,0,0,Hotan Diqu,HOD;\
	374,654000,伊犁哈萨克自治州,32,0,0,Ili Kazak Zizhizhou,ILD;\
	375,654200,塔城地区,32,0,0,Tacheng(Qoqek) Diqu,TCD;\
	376,654300,阿勒泰地区,32,0,0,Altay Diqu,ALD;\
	377,659000,自治区直辖县级行政区划,32,0,0,zizhiquzhixiaxianjixingzhengquhua,2";
module.exports = checkIDCard;	