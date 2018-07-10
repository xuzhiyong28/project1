/*! jQuery Validation Plugin - v1.10.0 - 9/7/2012
* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2012 Jörn Zaefferer; Licensed MIT, GPL */

/*!
 * jQuery Validation Plugin 1.10.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
 
jQuery.validator.addMethod("zip", function(value, element) {
	   if($(element).attr("maxlength")==undefined){
		   $(element).attr({"maxlength":"6"});	
	    }
		return this.optional(element) || /^[0-9]\d{5}$/.test(value);
	},jQuery.validator.messages.zip
);

jQuery.validator.addMethod("phone", function(value, element) {
	 if($(element).attr("maxlength")==undefined){
		   $(element).attr({"maxlength":"20"});	
	   }
   return this.optional(element) || /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
}, jQuery.validator.messages.phone);

jQuery.validator.addMethod("telephone", function(value, element) {
    return this.optional(element) || /^(\d{3,4}-?)?\d{7,8}(-?\d{1,4})?$/.test(value);
}, jQuery.validator.messages.telephone);

jQuery.validator.addMethod("landline", function(value, element) {
	return this.optional(element) || /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);
}, jQuery.validator.messages.landline);

jQuery.validator.addMethod("fax", function(value, element) {
    return this.optional(element) || /^(\d{3,4}-?)?\d{7,8}$/.test(value);
}, jQuery.validator.messages.fax);

jQuery.validator.addMethod("namejy", function(value, element) {
	var re = /^[\u4e00-\u9fa5a-z．·（）—1-9\s]+$/gi;//只能输入汉字和英文字母
	var ifpass = re.test(value) && (value.replace(/(^\s*)/g,"").length == value.length) && (value.replace(/(\s*$)/g,"").length == value.length);
	return this.optional(element)||ifpass;
}, "格式错误");
jQuery.validator.addMethod("Ennamejy", function(value, element) {
	var re = /^[a-zA-Z．·\s]+$/gi;//只能输入英文字母
	return this.optional(element)||re.test(value);
}, "格式错误");



jQuery.validator.addMethod("idcard", function(value, element) {
	//return this.optional(element) || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{2}[\dxX]$/.test(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[\dxX]$/.test(value);
	var obj=CIF2_Valid_SFZ(value);
	var flag=false;
	if(obj.code==0){
		flag=true;
	}
	//jQuery.validator.messages.idcard=obj.msg;
	return this.optional(element) || flag;
}, jQuery.validator.messages.idcard);

jQuery.validator.addMethod("idcard2", function(value, element) {
	//return this.optional(element) || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{2}[\dxX]$/.test(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[\dxX]$/.test(value);
	//jQuery.validator.messages.idcard=obj.msg;
	var obj=CIF2_Valid_SFZ_2(value);
	var flag=false;
	if(obj.code==0){
		flag=true;
	}
	//jQuery.validator.messages.idcard=obj.msg;
	return this.optional(element) || flag;
}, "请输入合法的身份证号码");


//判断数量是否是整手
jQuery.validator.addMethod("ifnumberzs",function(value, element){
	var flag=false;
	if(value%100==0){
		flag=true;
	}
	return this.optional(element) || flag;
},"必须输入整手数量");



jQuery.validator.addMethod("idCsrqCheck", function (value, element, param) {
	var csrqInId = value.substring(6, 14);
	return this.optional(element) || (csrqInId == param);
}, "出生日期与证件上的日期不匹配");



//未成年人判断
jQuery.validator.addMethod("ageCheck",function(value,element,param) {
	return this.optional(element) || ageCheck(value,param);
}, jQuery.validator.messages.ageCheck);

function ageCheck(value,param){
	var result=true;
	if((! param instanceof Array)||param.length!=2)
		return false;
   var mp=/^\d{4}\d{2}\d{2}$/; 
   var matchArray = value.match(mp); 
   if (matchArray==null) {
	   jQuery.validator.messages.ageCheck="日期格式错误";
	   return false;
   } 
   if(param[0]-value<=0){
		jQuery.validator.messages.ageCheck="不能大于当前时间";
		return false;
  }
   
   var iaMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 
   var year, month, day,p_year,p_month,p_day;      
   year = value.substring(0,4);
   month =Number(value.substring(4,6));
   day=Number(value.substring(6,8));
   p_year=param[0].substring(0,4);
   p_month=Number(param[0].substring(4,6));
   p_day=Number(param[0].substring(6,8));
   if (year < 1900 || year > 3000) return false; 
   if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1]=29; 
   if (month < 1 || month > 12) return false; 
   if (day < 1 || day > iaMonthDays[month - 1]) return false; 
   if(p_year-year<param[1]){ //未满18周岁
	   result=false;
   }else if(p_year-year==param[1]){ //刚好18 判断月份跟天数
	   if(p_month<month)
		   result=false;
	   else if(p_month==month){
		   if(p_day<day)
			   result=false;
	   }
   }
   if(result==false)
	   jQuery.validator.messages.ageCheck="代理人年龄必须大于18周岁";//"对应年龄不满"+param[1]+"周岁"
   return result;
}




jQuery.validator.addMethod("lettersanddigits", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9]*$/.test(value);
}, jQuery.validator.messages.idcard);

jQuery.validator.addMethod("charlength", function(value, element,param) {
	return this.optional(element) || value.length==param;
}, jQuery.validator.messages.charlength);
jQuery.validator.addMethod("dateformat", function(value, element) {
	return this.optional(element) || ("长期" == value || /(^(?:(?!0000)[0-9]{4}(?:(?:0[1-9]|1[0-2])(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(?:29|30)|(?:0[13578]|1[02])31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)0229)$)/.test(value));
}, jQuery.validator.messages.dateformat);
jQuery.validator.addMethod("minlength_CN", function(value, element, param) {
	var iMinLen = Number(param);
	var iLen = value.replace(/[^\x00-\xff]/g, "%%").length;
	return this.optional(element) || (iLen >= iMinLen);
}, jQuery.validator.messages.minlength_CN);
jQuery.validator.addMethod("maxlength_CN", function(value, element, param) {
	var iMaxLen = Number(param);
	var iLen = value.replace(/[^\x00-\xff]/g, "%%").length;
	return this.optional(element) || (iLen <= iMaxLen);
}, jQuery.validator.messages.maxlength_CN);
jQuery.validator.addMethod("agecheck", function(value, element, param) {//param[0]=18年前的今天(yyyymmdd) param[1]=开户最小年龄参数
	var flag=/^\d{8}$/.test(value);
	if(flag){//合法日期后判断是否大于18周岁
		if(value-param[0]<=0){
			flag=true;
		}else{
			flag=false;
		}
	}
	return this.optional(element) || flag;
}, jQuery.validator.messages.agecheck);
jQuery.validator.addMethod("zjbhcheck", function(value, element, param) {// param 证件类别参数检测
	var flag =true;
	if(param==4){//4 港澳居民来往大陆通行证  M+8位数字 或 H+8位数字
		flag=/^H\d{8}$/.test(value)||/^M\d{8}$/.test(value);
	}else if(param==15){//15 台湾居民来往大陆通行证  8位数字 或
		flag=/^\d{8}$/.test(value);
	}else if(param==74){
		//74 香港居民来往内地通行证  H+8位数字 
		flag=/^H\d{8}$/.test(value);
	}else if(param==75){
		//75 澳门居民来往内地通行证  M+8位数字
		flag=/^M\d{8}$/.test(value);
	}else if(param == 58){
		//组织机构代码
		flag = validOrgCode(value);
	}else if(param == 8) { 
		//柜台营业执照校验
		flag = validYyzz(value);
	}
	return this.optional(element) || flag;
}, jQuery.validator.messages.zjbhcheck);
//基金公司账户规则校验
jQuery.validator.addMethod("jjgsjy", function(value, element, param) {
	// param 上海A=0 上海基金公司=1，深圳A=2 深圳基金公司 =3  上海B股 =4  深圳B股=5
	var flag =true;
	if(param==0){//上海A
		flag=/^(A|B|D|E)\d{9}$/.test(value);
	}else if(param==1){//上海基金公司
		flag=/^F\d{9}$/.test(value);
	}else if(param==2){//深圳A
		flag=/^(0|4)\d{9}$/.test(value);
	}else if(param==3){//深圳基金公司
		flag=/^(001\d{7})|(05\d{8})$/.test(value);
	}else if(param==4){//上海B股
		flag=/^C\d{9}$/.test(value);
	}else if(param==5){//深圳B股
		flag=/^(2|4)\d{9}$/.test(value);
	}
	var iLen = value.replace(/[^\x00-\xff]/g, "%%").length;
	return this.optional(element) || flag&&iLen==10;
}, jQuery.validator.messages.idcard);
jQuery.validator.addMethod("htxybh", function(value, element, param) {//param=10 表示最大长度等于10
	 //^[A-Za-z0-9]+$匹配由数字和26个英文字母组成的字符串
	var flag=false;
	if(param!=0){//如果param=0表示不控制长度
		flag=50-value.length>=0&&value.length==param&&/^[A-Za-z0-9]+$/.test(value);
	}else{
		flag=50-value.length>=0&&/^[A-Za-z0-9]+$/.test(value);
	}
	return this.optional(element) || flag;
}, jQuery.validator.messages.htxybh);

jQuery.validator.addMethod("zfmmlength", function(value, element) {
	return this.optional(element) || value.length == 8;
}, "密码长度需要8个字符！！");

jQuery.validator.addMethod("zfmmreg", function(value, element) {
	return this.optional(element) || (/^[A-Za-z0-9]+$/.test(value) && !/^[A-Za-z]+$/.test(value) && !/^[0-9]+$/.test(value));
}, "密码必须是字母和数字的组合！");

jQuery.validator.addMethod("address", function(value, element) {
	// 地址检查
	var checkRet = ((value.indexOf("省") > 0 || value.indexOf("区") > 0 || value.indexOf("市") > 0 || value.indexOf("县") > 0) &&
					value.replace(/[^\x00-\xff]/g, "%%").length >= 16);
	return this.optional(element) || checkRet;
},jQuery.validator.messages.address);

/**
 * 有效期验证规则，不支持[长期]。
 */
jQuery.validator.addMethod("expiryDate", function (value, element, param) {
	// param 服务器当天时间YYYYMMDD
	return this.optional(element) || checkYXQ(value,param);
},jQuery.validator.messages.dateYXQ);
jQuery.validator.addMethod("dateYXQ", function(value, element, param) {
	// param 服务器当天时间YYYYMMDD
	return this.optional(element) || ("长期" == value|| checkYXQ(value,param));
},jQuery.validator.messages.dateYXQ);
jQuery.validator.addMethod("ltNowDate", function(value, element, param) {
	// param 服务器当天时间YYYYMMDD
	return this.optional(element) || ltNowDate(value,param);
},jQuery.validator.messages.ltNowDate);
jQuery.validator.addMethod("ltOrEqualNowDate", function(value, element, param) {
	// param 服务器当天时间YYYYMMDD
	return this.optional(element) || ltOrEqualNowDate(value,param);
},jQuery.validator.messages.ltOrEqualNowDate);
jQuery.validator.addMethod("gtNowDate", function(value, element, param) {
	// param 服务器当天时间YYYYMMDD
	return this.optional(element) || gtNowDate(value,element,param);
},jQuery.validator.messages.gtNowDate);
jQuery.validator.addMethod("gtOrEqualNowDate", function(value, element, param) {
	// param 服务器当天时间YYYYMMDD
	return this.optional(element) || gtOrEqualNowDate(value,element,param);
},jQuery.validator.messages.gtOrEqualNowDate);

jQuery.validator.addMethod("ymtzhJY",function(value, element, param){
	return this.optional(element) ||(/^[1][8-9][0-9]{10}$/.test(value));//判断一码通格式18或者19开头 后面10位数
},jQuery.validator.messages.ymtzhJY);

jQuery.validator.addMethod("gtNumber", function(value, element, param) {
	return this.optional(element) || gtNumber(value,param);
},"必须小于可用值");

//上海交易所股东号判断
jQuery.validator.addMethod("ValidGghByJys", function(value, element, param) {
	return this.optional(element) || ValidGghByJys(value,element,param);
},jQuery.validator.messages.ValidGghByJys);
jQuery.validator.addMethod("ValidGghByJysId", function(value, element, param) {
	return this.optional(element) || ValidGghByJysId(value,element,param);
},jQuery.validator.messages.ValidGghByJys);

//成本价格的判断
jQuery.validator.addMethod("ValidNumberId", function(value, element, param) {
	return this.optional(element) || ValidNumberId(value,element,param);
},"输入的数值不正确");

jQuery.validator.addMethod("ValidNumberIdCanZero", function(value, element, param) {
	return this.optional(element) || ValidNumberIdCanZero(value,element,param);
},"输入的数值不正确");


//根据交易所判断股东号

//根据账户类别判断股东号
jQuery.validator.addMethod("ValidGghByZdzhlb", function(value, element, param) {
	return this.optional(element) || ValidGghByZdzhlb(value,element,param);
},jQuery.validator.messages.ValidGghByJys);



jQuery.validator.addMethod("rdBytype", function (value,element,param) {
	return rdBytype(value,element,param);
}, jQuery.validator.messages.rdBytype);

function rdBytype(value,element,param){
	var elecment_type=element.type;
	var data_label=$(element).attr("data_label");
	if(elecment_type=='checkbox'){
        var element_name = $(element).attr('name');
        var $obj=$(":checkbox[name='"+element_name+"']:checked");
        if($obj.length==0){
            jQuery.validator.messages.rdBytype=data_label+"不能为空";
            return false;
        }
	}else if(elecment_type=='text'||elecment_type=='password'){
		if($.trim(value).length <= 0){
			jQuery.validator.messages.rdBytype=data_label+"不能为空";
			return false;
		}
	}else if(elecment_type=='radio'){
		var element_name = $(element).attr('name');
		var $obj=$(":radio[name='"+element_name+"']:checked");
		 if($obj.length==0){
			 jQuery.validator.messages.rdBytype=(data_label==undefined?'':data_label)+"不能为空";
			 return false;
		 }
		return true;
	}else if( element.nodeName.toLowerCase() === "select"){
		var $obj=$(element);
		if($obj.val()=='' || $obj.val() == null ){
			jQuery.validator.messages.rdBytype=(data_label==undefined?'':data_label)+"不能为空";
			return false;
		}
	}
	return true;
}



jQuery.validator.addMethod("dateFmt", function(value, element, param) {
	// param 服务器当天时间YYYYMMDD
	return this.optional(element) || datafmt(value,param);
},jQuery.validator.messages.dateFmt);


//网址判断
jQuery.validator.addMethod("website",function(value, element, param){
	 var regExp=/^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/;
	 return this.optional(element) || value.match(regExp);
},jQuery.validator.messages.website);


//地址填写判断
jQuery.validator.addMethod("addressCheck",function(value, element, param){
		return this.optional(element)||(value.indexOf("省") > 0 || value.indexOf("区") > 0 || value.indexOf("市") > 0) &&
	       value.replace(/[^\x00-\xff]/g, "%%").length >= 16;
},jQuery.validator.messages.address);



jQuery.validator.addMethod("notequal", function(value, element, param) {
	// param 当前需要比较的值
	return this.optional(element) || (param != value || value.length==0 || param.length==0);
},jQuery.validator.messages.notequal);

/*
 * 验证小于等于某个表单元素。
 * 入参(param)为两元素的数组：0位置为元素的选择器；1位置为元素的label文本提示。
 */
jQuery.validator.addMethod("ltOrEqual", function (value, element, param) {
	if (Object.prototype.toString.apply(param) !== '[object Array]') { // param只能是数组。
		return false;
	}
	
	if (param.length != 2) { // param数组长度一定要为2。
		return false;
	}
	var $target = $(param[0]);
	
	var	elementMc = $target.prev("span").text().replace("：","").replace("*","");
	param[1] = (elementMc !="" ? elementMc : param[1]); //判断显示的值
	
	
	var maxValue = $target.val()||unformatMoney($target.text());
	$target.unbind(".ltOrEqual").bind("keyup.ltOrEqual", function() {
		$(element).valid();
	});
	
	return this.optional(element) || (parseFloat(value) <= parseFloat(maxValue));
}, jQuery.validator.messages.ltOrEqual);

/*
 * 验证等于某个表单元素。
 * 入参(param)为两元素的数组：0位置为元素的选择器；1位置为元素的label文本提示。
 */
jQuery.validator.addMethod("equal", function (value, element, param) {
	if (Object.prototype.toString.apply(param) !== '[object Array]') { // param只能是数组。
		return false;
	}
	
	if (param.length != 2) { // param数组长度一定要为2。
		return false;
	}
	
	var $target = $(param[0]);
	var maxValue = $target.val();
	
	return this.optional(element) || (parseFloat(value) == parseFloat(maxValue));
}, jQuery.validator.messages.equal);

/*
 * 验证大于等于某个表单元素。
 * 入参(param)为两元素的数组：0位置为元素的选择器；1位置为元素的label文本提示。
 */
jQuery.validator.addMethod("gtOrEqual", function (value, element, param) {
	if (Object.prototype.toString.apply(param) !== '[object Array]') { // param只能是数组。
		return false;
	}
	
	if (param.length != 2) { // param数组长度一定要为2。
		return false;
	}
	
	var $target = $(param[0]);
	var maxValue = $target.val()||unformatMoney($target.text());
	
	return this.optional(element) || (parseFloat(value) >= parseFloat(maxValue));
}, jQuery.validator.messages.gtOrEqual);

/*
 * 验证是否大于某个数。
 */
jQuery.validator.addMethod("gt", function (value, element, param) {
	return this.optional(element) || (parseFloat(value) > parseFloat(param));
}, jQuery.validator.messages.gt);

/**
 * 可以为空的日期验证方法，若日期有输入，则需要继续使用datafmt进行验证。
 */
jQuery.validator.addMethod("nullableDate", function (value, element, param) {
	if (value == '' || value == '0') {
		return true;
	}
	
	return this.optional(element) || datafmt(value, param);
}, jQuery.validator.messages.dateFmt);

/**
 * 可以为空的有效日期验证方法，若日期有输入，则需要继续使用checkYXQ进行验证。
 */
jQuery.validator.addMethod("nullableDateYXQ", function(value, element, param) {
	if (value == '' || value == '0' || value == '长期') {
		return true;
	}
	return this.optional(element) || checkYXQ(value, param);
}, jQuery.validator.messages.dateYXQ);

//邮政编码
jQuery.validator.addMethod("yzbm", function(value, element, param) {
	// param 服务器当天时间YYYYMMDD
	return this.optional(element) || /^\d{6}$/.test(value);;
},jQuery.validator.messages.yzbm);


/*
 * 密码校验
 */
jQuery.validator.addMethod("passwordjy",function(value, element, param){
	value = value.toString();
	param = Number(param) || 6;
	if(value.length != param || !(/^\d+$/.test(value))){
		return false;
	}else{
		return this.optional(element) || true;
	}
},jQuery.validator.messages.passwordjy);



/**
* 证件编号验证,判断指定证件类别的证件编号格式是否正确
* zjbh: 证件编号
* zjlb: 证件类别
* 返回值: true 证件编号合法,false 证件编号不合法
* 例：
     var ret = ValidZjbhByZjlb("350101198102100052",0);
*/
jQuery.validator.addMethod("ValidZjbhByZjlb",function(value,element,param){
	
	var flag =false;
	var zjlb = "";
	var $zjlbID = null;
	var special = ""; //这个变量有值以为的需要对这个校验增加额外的处理逻辑
	
	//传入的param可以是String或者是Array 使用Array是为了能进行额外处理
	if(Object.prototype.toString.apply(param) == "[object Array]"){
		zjlb = $(param[0]).val();
		$zjlbID = $(param[0]);
		special = param[1];
	}
	else if (Object.prototype.toString.apply(param) == "[object String]"){
		zjlb=$(param).length>0 ? $(param).val() : param;
		$zjlbID = $(param);
	}
	
	if($zjlbID.length>0){
		$(param).unbind(".ValidZjbhByZjlb").bind("blur.ValidZjbhByZjlb", function() {
			$(element).valid();
		});
	}
	
	if (zjlb==0){//身份证校验
		var obj=CIF2_Valid_SFZ_2(value);
		if(obj.code==0){
			flag=true;
		}
	}else if(zjlb==4){//4 港澳居民来往大陆通行证  M+8位数字 或 H+8位数字
		if(special != "" && special == "special_20002"){
			flag=/^[Hh]\d{8}$/.test(value) || /^[Mm]\d{8}$/.test(value) || /^[Hh]\d{10}$/.test(value) || /^[Mm]\d{10}$/.test(value) ;
		}else{
			flag=/^[Hh]\d{8}$/.test(value) || /^[Mm]\d{8}$/.test(value) ;
		}
		if(flag==true)
			$(element).val(value.toUpperCase());
	
	}else if(zjlb==15){//15 台湾居民来往大陆通行证  8位数字 
		if(special != "" && special == "special_20002"){
			flag=/^\d{8}$/.test(value) || /^\d{10}$/.test(value);
		}else{
			flag=/^\d{8}$/.test(value) ;
		}
		
	}else if(zjlb == 7){
		//组织机构代码
		flag = validOrgCode(value);
	}else flag=true;
	return this.optional(element) || flag;
	
},jQuery.validator.ValidZjbhByZjlb);

/**
* 证件编号验证,判断指定中登证件类别的证件编号格式是否正确
* zjbh:   证件编号
* zdzjlb: 中登证件类别
* 返回值: true 证件编号合法,false 证件编号不合法
* 例：
     var ret = ValidZjbhByZdzjlb("350101198102100052",1);
*/

jQuery.validator.addMethod("ValidZjbhByZdzjlb",function(value,element,param){
	var flag =false;
	var zjlb=$(param).val();
	if($(param).length>0){
		$(param).unbind(".ValidZjbhByZdzjlb").bind("blur.ValidZjbhByZdzjlb", function() {
			$(element).valid();
		});
	}
	if(zjlb==1){//1:身份证校验
		var obj=CIF2_Valid_SFZ_2(value);
		if($(element).attr("maxlength")!="18"){//设置长度
			$(element).attr({"maxlength":"18"});	
		}
		if(obj.code==0){
			flag=true;
		}
	}else if (zjlb==7){//7:港澳居民来往大陆通行证  M+8位数字 或 H+8位数字 9
		if($(element).attr("maxlength")!="9"){//设置长度
			$(element).attr({"maxlength":"9"});	
		}
		flag=/^[Hh]\d{8}$/.test(value)||/^[Mm]\d{8}$/.test(value);
		if(flag==true)$(element).val(value.toUpperCase());
	}else if (zjlb==8){//8:台湾居民来往大陆通行证  8位数字  8
		if($(element).attr("maxlength")!="8"){//设置长度
			$(element).attr({"maxlength":"8"});	
		}
		flag=/^\d{8}$/.test(value);
	}else if (zjlb==12){//12:组织机构代码证的校验逻辑
		flag = validOrgCode(value);
	}else{
		if($(element).attr("maxlength")!="40"){//设置长度
			$(element).attr({"maxlength":"40"});	
		}
		 flag=true;
	}
	
	return this.optional(element)||flag;
	
	
},jQuery.validator.ValidZjbhByZdzjlb);

jQuery.validator.addMethod("requiredOne", function(value, element, param) {
    if(!$(element).data("bindFlag")) {
        $(element).data("bindFlag", true);
        $(element).on("keyup blur", function () {
            $(param[0]).valid();
        });
    }

	//return this.optional(element) || ($.trim(value) != "" || $.trim($(param[0]).val()) != "");
	return ($.trim(value) != "" || $.trim($(param[0]).val()) != "");
},jQuery.validator.messages.requiredOne);


/* 证券代码输入框校验
 * param的值包括两个 1.jys 2.回调函数  2|zqdmCallback 
 */
jQuery.validator.messages.zqdmJy="";
jQuery.validator.addMethod("zqdmJy", function(value, element, param) {
	var zqdmArray = $("#"+$(element).prop('id')).data("zqdmArray") || [];
	var jys="",paramType;
	if($("#"+param[0]).length>0){
		paramType = $("#"+param[0]).prop('tagName');
		if(paramType=='SELECT'){
			$("#"+param[0]).unbind(".zqdmJy").bind("change.zqdmJy", function() {
				if(param[2]&&(param[2]=='50202'||param[2]=='40203'||param[2]=='40204'||param[2]=='40101'||param[2]=='50161' || param[2]=='50122' || param[2]=='50125' || param[2]=='50123' || param[2]=='50111' || param[2]=='50421' || param[2]=='50121')){ //对于限售股转托管证券临时冻结，切换了select必须把缓存清理掉重新处理
					$("#"+$(element).prop('id')).data("zqdmArray",[]);
					zqdmArray = [];
				}
				$(element).valid();
			});
			//根据第三个参数对不同的业务代码进行处理
			if(param[2]&&( param[2]=='50202' || param[2]=='40203' || param[2]=='40204' || param[2]=='40101' || param[2]=='50161' || param[2]=='50122' || param[2]=='50125' || param[2]=='50123' || param[2]=='50111' || param[2]=='50421' || param[2]=='50121')){
				jys = $("#"+param[0]+" option:selected").val().split(";")[0];
			}
				
		}
	}else
		jys = param[0];
	
	//这是处理找到后的在前端处理的逻辑
	var callback = param[1] || ""; 
	//这是额外的判断空代表不必处理(当ajax查询到了数据，但是需要继续判断的处理函数--例如'债券正回购委托'需要判断是否是返回的证券类别是否是22)
	var validCallback = param[3] || "" ; 
	if(!param instanceof Array){
		jQuery.validator.messages.zqdmJy="校验参数出错!";
		return false;
	}
	value = value+""; //转字符串
	var pass = true;
	if(value.length<6){
		eval(callback+"(true)");
		jQuery.validator.messages.zqdmJy="输入的长度不能少于6位";
		return false;
	}
	for(var i =0,len=zqdmArray.length;i<len;i++){
		if(zqdmArray[i][value]){
			if(callback){
				eval(callback+"('"+JSON.stringify(zqdmArray[i][value])+"')");
			}
			return this.optional(element)||true;
		}
	}
	$.ajax({
		 url:"/common/queryZqdmcs",
		 async: false, 
		 type:"post",
		 dataType:"json",
		 data:{jys:jys,zqdm:value},
		 beforeSend:function(){
			//zqdmselectindex =  layer.msg('数据查找中，请稍后....',{icon:16,time:20000}); 
		 },
		 success:function(ret){
			if(ret.code<0){
				jQuery.validator.messages.zqdmJy = "不存在";
				eval(callback+"(true)"); //调用true表示去掉赋值
				pass = false;
			}
			if(ret.code>0&&ret.count>0){
				
				if(validCallback != ''){ //需要额外判断
					pass = eval(validCallback+"('"+JSON.stringify(ret.records[0])+"')");
					if(pass){
						var zqdmObj = {};
						zqdmObj[value] = ret.records[0];
						zqdmArray.push(zqdmObj);
						$("#"+$(element).prop('id')).data("zqdmArray",zqdmArray);
						if(callback){
							eval(callback+"('"+JSON.stringify(ret.records[0])+"')");
						}
						
					}else{
						if(param[2] == '50122'){
							jQuery.validator.messages.zqdmJy = "不是国债回购类型";
						}
							
					}
				}else{
					
					var zqdmObj = {};
					zqdmObj[value] = ret.records[0];
					zqdmArray.push(zqdmObj);
					$("#"+$(element).prop('id')).data("zqdmArray",zqdmArray);
					if(callback){
						eval(callback+"('"+JSON.stringify(ret.records[0])+"')");
					}
				}
				
			}
		 },
		 complete:function(){
			 //layer.close(zqdmselectindex);
		 }
	 });
	if(pass)
		return this.optional(element)||true;
	else
		return false;
},jQuery.validator.messages.zqdmJy);
//默认回调方法
function zqdmCallback(){
	var target = arguments[0] || {};
	if(typeof target == 'boolean'){
		$("#zqmc").text('');
		return ;
	}
	try{
		var zqdmObj = JSON.parse(target) || {};	
		$("#zqmc").text(zqdmObj['zqmc']!=undefined?zqdmObj['zqmc']:"");
	}catch(e){}
}

/**
 * 作用于销户菜单复选框的选择
 * */
jQuery.validator.messages.ValidxhCheck="";
jQuery.validator.addMethod("ValidxhCheck",function(value, element, param){
	var name = $(element).attr('name');
	var length = $("input[name='"+name+"']:checked").length;
	if(length==0){
		jQuery.validator.messages.ValidxhCheck=param!=''?param:'请至少选择一条数据';
		return false;
	}
	return this.optional(element)||true;
},jQuery.validator.messages.ValidxhCheck);






function checkYXQ(value,param){
	if(param-value>0){
		return false;
	}
	var mp=/^\d{4}\d{2}\d{2}$/; 
   var matchArray = value.match(mp); 
   if (matchArray==null) return false; 
   var iaMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 

   var year, month, day;      
   year = value.substring(0,4);
   month = value.substring(4,6);
   day=value.substring(6,8);
   if (year < 1900 || year > 3000) return false; 
   if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1]=29; 
   if (month < 1 || month > 12) return false; 
   if (day < 1 || day > iaMonthDays[month - 1]) return false; 
   return true; 
}
/**
 * 必须小于当前日期
 * @param value
 * @param param
 * @returns {Boolean}
 */
function ltNowDate(value,param){
  if(param-value<=0){
		return false;
  }
   var mp=/^\d{4}\d{2}\d{2}$/; 
   var matchArray = value.match(mp); 
   if (matchArray==null) return false; 
   var iaMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 

   var year, month, day;      
   year = value.substring(0,4);
   month = value.substring(4,6);
   day=value.substring(6,8);
   if (year < 1900 || year > 3000) return false; 
   if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1]=29; 
   if (month < 1 || month > 12) return false; 
   if (day < 1 || day > iaMonthDays[month - 1]) return false; 
   return true; 
}

/**
 * 不可超过当前日期
 * @param value
 * @param param
 * @returns {Boolean}
 */
function ltOrEqualNowDate(value,param){
  if(param-value<0){
		return false;
  }
   var mp=/^\d{4}\d{2}\d{2}$/; 
   var matchArray = value.match(mp); 
   if (matchArray==null) return false; 
   var iaMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 

   var year, month, day;      
   year = value.substring(0,4);
   month = value.substring(4,6);
   day=value.substring(6,8);
   if (year < 1900 || year > 3000) return false; 
   if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1]=29; 
   if (month < 1 || month > 12) return false; 
   if (day < 1 || day > iaMonthDays[month - 1]) return false; 
   return true; 
}

//判断两个值的大小
function gtNumber(value,param){
	var $va2 = $(param);
	if(value.indexOf(",")>=0){
		value=value.replace(/\,/g,"");		
	}
	var value2=$va2.val();
	if(value2.indexOf(",")>=0){
		value2=value2.replace(/\,/g,"");		
	}
	value=Number(value);
	value2=Number(value2);
	if(value-value2>0)return false;
	return true;
}

/**
 * 股东号验证,判断指定市场的股东号格式是否正确
 * gdh: 股东号
 * jys: 交易所
 * 返回值: true 股东号合法,false 股东号不合法
 * 例：
var ret = ValidGghByJys("A000111222",1);
*/
function ValidGghByJysId(value,element,param){
	var $param = $(param[0]);
	var jys=$param.val();
	var gdh=value;
	 $param.unbind(".ValidGghByJys").bind("blur.ValidGghByJys", function() {
		$(element).valid();
	 });
	var mapRegEx = {
	        //上海A股	股东账号长度是10为，第一位是字母“A，B，D”，后9位数字
	        //上海信用账号长度是10为，第一位是字母“E”，后9位数字
	        //上海基金账号长度是10为，第一位是字母“F”，后9位数字
	        "1": /^[ABDEFabdef][0-9]{9}$/,
	        //深圳A股	股东账号长度是10为，第一位是字母“0”或“4” ，后9位数字
	        //深圳基金账号长度是10为，前缀: 001  05
	        "2": /(^[04][0-9]{9}$)|(^[0][0][1][0-9]{7}$)|(^[0][5][0-9]{8}$)/,
	        //上海B股	股东账号长度是10为，第一位是字母“C” ，后9位数字
	        "3": /^[Cc][0-9]{9}$/,
	        //深圳B股	股东账号长度是10为，第一位是字母“2”或“4” ，后9位数字
	        "4": /^[24][0-9]{9}$/,
	        //特转A	股东账号长度是10为，第一位是字母“0”或“4” ，后9位数字
	        "5": /^[04][0-9]{9}$/,
	        //特转B	股东账号长度是10为，第一位是字母“2”或“4” ，后9位数字
	        "6": /^[24][0-9]{9}$/
	    };
	    if (jys && (jys in mapRegEx)) {
	        // 有指定交易所
	    	if(mapRegEx[jys].test(gdh)){//指定的jys存在且符合要求后-->对字母进行替换
	    		$(element).val(value.toUpperCase());
	    		return true;
	    	}
	        return false;
	    } else {
	        // 没有指定交易所
	        var bRet = false;
	        for(var n in mapRegEx) {
	            if(mapRegEx[n].test(gdh)) {
	                bRet = true;
	                break;
	            }
	        }
	        return bRet;
	    }
	return false;
}

/**
 * 股东号验证,判断指定中登账户类别的股东号格式是否正确
 * gdh: 股东号
 * zdzhlb: 中登账户类别
 * 返回值: true 股东号合法,false 股东号不合法
 * 例：
	var ret = ValidGghByZdzhlb("A000111222",11);
*/
function ValidGghByZdzhlb(value,element,param){
    var gdh = value;
    var $param = $(param[0]);
    if($param.size() > 0) {
        var zdzhlb = $param.val();
        $param.unbind(".ValidGghByZdzhlb").bind("blur.ValidGghByZdzhlb", function () {
            $(element).valid();
        });
    } else {
        zdzhlb = param[0];
    }
	if($(element).attr("maxlength")==undefined){
		   $(element).attr({"maxlength":"10"});	
	}
	
	var mapRegEx = {
	        //11-沪市A股账户    股东账号长度是10位，第一位是字母“A，B，D”，后9位数字
	        "11": /^[ABDabd][0-9]{9}$/,
	        //12-沪市B股账户    股东账号长度是10位，第一位是字母“C”，后9位数字
	        "12": /^[Cc][0-9]{9}$/,
	        //13-沪市封闭式基金账户 股东账号长度是10位，第一位是字母“F”，后9位数字
	        "13": /^[Ff][0-9]{9}$/,
	        //14-沪市A股信用证券账户,股东账号长度是10位，第一位是字母“E”，后9位数字
	        "14": /^[Ee][0-9]{9}$/,
	        //15-沪市衍生品合约账户(同11-沪市A股账户) 后3位为888
	        "15": /^[ABDabd][0-9]{9}888$/,
	        //21-深市A股账户,股东账号是10位数字，第一位是数字“0”或“4”，后9位数字，并且不以“001”、“05”、“06”开头
	        "21": /^[04][0-9]{9}$/,// 一个正则表达式书写复杂，在后面代码有特殊处理（注意修改这边无效）
	        //22-深市B股账户,股东账号是10位数字，第一位是数字“2”或“4”，后9位数字
	        "22": /^[24][0-9]{9}$/,
	        //23-深市封闭式基金账户 股东账号是10位数字，并以“001”或“05”开头
	        "23": /(^[0][0][1][0-9]{7}$)|(^[0][5][0-9]{8}$)/,
	        //24-深市A股信用证券账户    股东账号是10位数字，并以“06”开头
	        "24": /^[0][6][0-9]{8}$/
	        //31-全国中小企业股份转让系统账户
	        //"31":/^[0-9,a-z,A-Z]+$/,
	        //99-其他
	        //"99":/^[0-9,a-z,A-Z]+$/
	    };
	var bRet = false;
	if (zdzhlb && (zdzhlb in mapRegEx)) {
        // 有指定中登账户类别
        if ("21" == zdzhlb) {
            // 21-深市A股账户,股东账号是10位数字，第一位是数字“0”或“4”，后9位数字，并且不以“001”、“05”、“06”开头
            bRet = /^[04][0-9]{9}$/.test(gdh) && !(/(^001)|(^05)|(^06)/.test(gdh));
        } else {
        	if(mapRegEx[zdzhlb].test(gdh)&&zdzhlb!='31'&&zdzhlb!='99'){//切换大写
        		$(element).val(value.toUpperCase());
        		bRet=true;
        	}else bRet=false;
            //bRet = mapRegEx[zdzhlb].test(gdh);
        }
    } else{
        // 没有指定中登账户类别
        for(var n in mapRegEx) {
            if(mapRegEx[n].test(gdh)) {
                bRet = true;
                break;
            }
        }
    }
	return bRet;
}

/**
 * 股东号验证,判断指定市场的股东号格式是否正确
 * gdh: 股东号
 * jys: 交易所
 * 返回值: true 股东号合法,false 股东号不合法
 * 例：
	var ret = ValidGghByJys("A000111222",1);
*/
function ValidGghByJys(value,element,param){
	var jys=param[0].split(";");
	/*if($(element).attr("maxlength")==undefined){//设置长度
		$(element).attr({"maxlength":"20"});	
	}*/
	
	var bRet = false;
	var mapRegEx = {
	        //上海A股	股东账号长度是10为，第一位是字母“A，B，D”，后9位数字
	        //上海信用账号长度是10为，第一位是字母“E”，后9位数字
	        //上海基金账号长度是10为，第一位是字母“F”，后9位数字
	        "1": /^[ABDEF][0-9]{9}$/,
	        //深圳A股	股东账号长度是10为，第一位是字母“0”或“4” ，后9位数字
	        //深圳基金账号长度是10为，前缀: 001  05
	        "2": /(^[04][0-9]{9}$)|(^[0][0][1][0-9]{7}$)|(^[0][5][0-9]{8}$)/,
	        //上海B股	股东账号长度是10为，第一位是字母“C” ，后9位数字
	        "3": /^[C][0-9]{9}$/,
	        //深圳B股	股东账号长度是10为，第一位是字母“2”或“4” ，后9位数字
	        "4": /^[24][0-9]{9}$/,
	        //特转A	股东账号长度是10为，第一位是字母“0”或“4” ，后9位数字
	        "5": /^[04][0-9]{9}$/,
	        //特转B	股东账号长度是10为，第一位是字母“2”或“4” ，后9位数字
	        "6": /^[24][0-9]{9}$/
	    };
	for(var i=0;i<jys.length;i++){
		var jc=jys[i];
		if(jc && (jc in mapRegEx)){
			if(jc=='1'||jc=='2'||jc=='3'||jc=='4'||jc=='5'||jc=='6'){
				if($(element).attr("maxlength")==undefined){//设置长度
				   $(element).attr({"maxlength":"10"});	
			     }
			}
			bRet=mapRegEx[jc].test(value);
			if(bRet)
			break;
		}else{
			for(var n in mapRegEx){
				 if(mapRegEx[n].test(value)) {
					 bRet=true;
					 break;
				 }
			}
		}
	}
	return bRet;
}

/**
 * 日期必须大于某个值
 * gtNowDate:['<%=Today%>']
 * gtNowDate:['<%=Today%>','#ksrq']
 * */

function gtNowDate(value,element,param){
	var ret;
	if(value=="长期"){
		return true;
	}
	if(param.length==1){//只有传入一个参数
		ret=$(param[0]);
		if(ret.length>0){
			ret.unbind(".gtNowDate").bind("blur.gtNowDate", function() {
				$(element).valid();
			});
			ret=$(param[0]).val();
		} else {
            ret=param[0];
        }
		jQuery.validator.messages.gtNowDate="必须大于当前日期";
		if(ret-value>=0)return false;
	}else if(param.length>=2){//传入三个参数,最后一个为名称
		var flag=0;
		var iFlag=-1;
		for(var i=0;i<2;i++){
			iFlag=-1;
			ret=$(param[i]);
			if(ret.length>0){
				ret.unbind(".gtNowDate").bind("blur.gtNowDate", function() {
					$(element).valid();
				});
				ret=$(param[i]).val();
			} else {
				ret=param[i];
			}
			if(ret-value>=0 && i==0){
				iFlag=i;
				flag++;
			}
			if(ret-value>0 && i==1){
				iFlag=i;
				flag++;
			}
		}
		if(flag==1){
			if(iFlag==0){
				jQuery.validator.messages.gtNowDate="必须大于当前日期";
				return false;
			}
			if(iFlag==1){
				if(!param[2]){
					jQuery.validator.messages.gtNowDate="不可小于起始日期";
				}else{
					jQuery.validator.messages.gtNowDate="不可小于"+param[2];
				}
			}
			return false;
		}
		if(flag==2){
			if(param[1]-param[0]>=0){
				if(!param[2]){
					jQuery.validator.messages.gtNowDate="不可小于起始日期";
				}else{
					jQuery.validator.messages.gtNowDate="不可小于"+param[2];
				}
			}else{
				jQuery.validator.messages.gtNowDate="必须大于当前日期";
			}
			return false;
		}
	}
	//if(param-value>0){
	//	return false;
	//}
  /* value=("长期"==value)? "30001231":value;
   var mp=/^\d{4}\d{2}\d{2}$/; 
   var matchArray = value.match(mp); 
   if (matchArray==null) return false; 
   var iaMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 

   var year, month, day;      
   year = value.substring(0,4);
   month = value.substring(4,6);
   day=value.substring(6,8);
   if (year < 1900 || year > 3000) return false; 
   if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1]=29; 
   if (month < 1 || month > 12) return false; 
   if (day < 1 || day > iaMonthDays[month - 1]) return false; */
   return true; 
}

/**
 * 日期必须大等于某个值
 * gtOrEqualNowDate:['<%=Today%>']
 * gtOrEqualNowDate:['<%=Today%>','#ksrq']
 * */

function gtOrEqualNowDate(value,element,param){
	var ret;
	if(value=="长期"){
		return true;
	}
	if(param.length==1){//只有传入一个参数
		ret=$(param[0]);
		if(ret.length>0){
			ret.unbind(".gtOrEqualNowDate").bind("blur.gtOrEqualNowDate", function() {
				$(element).valid();
			});
			ret=$(param[0]).val();
		} else {
            ret=param[0];
        }
		jQuery.validator.messages.gtOrEqualNowDate="不可小于当前日期";
		if(ret-value>0)return false;
	}else if(param.length>=2){//传入三个参数,最后一个为名称
		var flag=0;
		var iFlag=-1;
		for(var i=0;i<2;i++){
			iFlag=-1;
			ret=$(param[i]);
			if(ret.length>0){
				ret.unbind(".gtOrEqualNowDate").bind("blur.gtOrEqualNowDate", function() {
					$(element).valid();
				});
				ret=$(param[i]).val();
			} else {
				ret=param[i];
			}
			if(ret-value>0){
				iFlag=i;
				flag++;
			}
		}
		if(flag==1){
			if(iFlag==0){
				jQuery.validator.messages.gtOrEqualNowDate="不可小于当前日期";
				return false;
			}
			if(iFlag==1){
				if(!param[2]){
					jQuery.validator.messages.gtOrEqualNowDate="不可小于起始日期";
				}else{
					jQuery.validator.messages.gtOrEqualNowDate="不可小于"+param[2];
				}
			}
			return false;
		}
		if(flag==2){
			if(param[1]-param[0]>=0){
				if(!param[2]){
					jQuery.validator.messages.gtNowDate="不可小于起始日期";
				}else{
					jQuery.validator.messages.gtNowDate="不可小于"+param[2];
				}
			}else{
				jQuery.validator.messages.gtNowDate="不可小于当前日期";
			}
			return false;
		}
	}
   return true; 
}



function datafmt(value,param){
   var mp=/^\d{4}\d{2}\d{2}$/; 
   var matchArray = value.match(mp); 
   if (matchArray==null) return false; 
   var iaMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 

   var year, month, day;      
   year = value.substring(0,4);
   month = value.substring(4,6);
   day=value.substring(6,8);
   if (year < 1900 || year > 3000) return false; 
   if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1]=29; 
   if (month < 1 || month > 12) return false; 
   if (day < 1 || day > iaMonthDays[month - 1]) return false; 
   return true; 
}

function validOrgCode(orgCode){
	var reg = /([0-9A-Z]){8}-[0-9|X]$/;
    if (!reg.test(orgCode)) {
        return false;
    }
    //机构代码
    var ws = [3, 7, 9, 10, 5, 8, 4, 2];
    var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var sum = 0;
    for (var i = 0; i < 8; i++) {
        sum += str.indexOf(orgCode.charAt(i)) * ws[i];
    }
    var c9 = 11 - (sum % 11);
    if (c9 == 10) {
        c9 = 'X';
    } else if (c9 == 11) {
        c9 = 0;
    }
    if (c9 != orgCode.charAt(9)) {
        return false;
    } 
    return true;
}

//身份验证函数(15位或18身份证)
function Valid_SFZ_ALL(v) {
    var id_length = v.length;
    var sex;
    var birthday;
    var dd;
    var mm;
    var yyyy;
    
    if(/^[1]{1,}$/.test(v)) {// 解决旧验证代码对于，15 个 1 会验证通过的bug
        return false;
    }
    
    if (id_length == 0) {
        return false;
    }

    if (id_length != 18 && id_length != 15) {
       return false;
    }
    
    if (id_length == 15) {
        yyyy = '19' + v.substring(6, 8);
        if (yyyy > 2200 || yyyy < 1800) {
        	return false;
        }
        mm = v.substring(8, 10);
        if (mm > 12 || mm <= 0) {
            //  alert("输入身份证号,月份非法！");
            //   return false;
            return false;
        }

        dd = v.substring(10, 12);
        if (dd > 31 || dd <= 0) {
        	//日期非法
            return false;
        }
         birthday = yyyy + "-" + mm + "-" + dd;
         if(!Check_Date(birthday,'YYYY-MM-DD')){
			return false;
		}
    }

    if (id_length == 18) {
    	if (v.indexOf("x") > 0) {
    		return false;
    	}
    	
        if (v.indexOf("X") > 0 && v.indexOf("X") != 17) {
            // alert("身份证中\"X\"输入位置不正确！");
            // return false;
            return false;
        }
        yyyy = v.substring(6, 10);
        if (yyyy > 2200 || yyyy < 1800) {
            //alert("输入身份证号,年度非法！");
            // return false;
            return false;
        }
        mm = v.substring(10, 12);
        if (mm > 12 || mm <= 0) {
            //  alert("输入身份证号,月份非法！");
            //   return false;
            return false;
        }

        dd = v.substring(12, 14);
        if (dd > 31 || dd <= 0) {
            return false;
        }

        if (v.charAt(17) == "x" || v.charAt(17) == "X")
        {
            if ("x" != CIF2_GetVerifyBit(v) && "X" != CIF2_GetVerifyBit(v)) {
            	return false;
            }

        } else {
            if (v.charAt(17) != CIF2_GetVerifyBit(v)) {
                return false;
            }
        }
    }
    return true;
}

function validYyzz(yyzz){
	var reg = /^[0-9]{15}$/;
	if (!reg.test(yyzz)) {
		return false;
	}
    //营业执照
	var sum = 0;
    var s = [];
    var p = [];
    var a = [];
    var m = 10;
    p[0] = m;
    for (var i = 0; i < yyzz.length; i++) {
        a[i] = parseInt(yyzz.substring(i, i + 1), m);
        s[i] = (p[i] % (m + 1)) + a[i];
        if (0 == s[i] % m) {
            p[i + 1] = 10 * 2;
        } else {
            p[i + 1] = (s[i] % m) * 2;
        }
    }
    if (1 == (s[14] % m)) {
        return true;
    } else {
        return false;
    }
}


/**
 * 根据输入的整数和小数的长度进行判断value的有效性
 * 返回值: true 数值合法,false 数值不合法
 * 例：
   var ret = ValidNumberId("12.323","5;3");
*/
function ValidNumberId(value,element,param){
    var spl=param.split(";");
    //value=value.replace(/^0/g,"");
    //$(element).val(value);
    if(spl.length==1){// 正整数情况
    	var maxlength=Number(spl[0]);
    	if($(element).attr("maxlength")==undefined){//设置长度
			$(element).attr({"maxlength":maxlength});	
		}
    	if(/^\d+$/.test(value)&&value>0){//判断是不是整数
    	   $(element).val(Number(value));
    	   return true;
    	}else{
    		$(element).val(value.replace(".",""));
    		return false;
    	}
    	
    }else if(spl.length==2){
    		var zzs=Number(spl[0])-Number(spl[1]);//整数
    		var xs=Number(spl[1]);//小数可允许的长度
    		var maxlength=Number(spl[0])+1;
    		eval("var reg=/^\\d{1," + zzs + "}(\\.\\d{1," + xs + "})?$/g");//var reg=/^\d{0,4}(\.\d{0,2})?$/g
    		if($(element).attr("maxlength")==undefined){//设置长度
				$(element).attr({"maxlength":maxlength});	
			}
    		if(!reg.test(value)||value<=0){//不符合
    			if(/^(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)&&value.indexOf(".")>0&&value.substring(value.indexOf(".")+1,100).length>xs){//如果输入的小数大于规定的值
    				var head=value.split(".")[0];//正数
					var bottom=value.split(".")[1].substring(0,xs);//小数
					$(element).val(Number(head+"."+bottom));
    			}
    			/*if(value.indexOf('.')==-1){
    				$(element).val("");
    			}*/
    			return false;
    		}else{//如果符合,此时value是数值格式
    			 if(value.length>1&&value.indexOf('0')==0&&value.indexOf(".")>=0){ //测试 可去掉 当输入0123.123类型的去掉前面的0
    				 $(element).val(Number(value));
    			 }
    			 if(value.length>1&&value.indexOf('0')==0&&value.indexOf(".")==-1){//测试 可去掉
    				 $(element).val(Number(value));
    			 }
    			return true;
    		}
    }else{//错误情况
    	
    }
	return false;
}


/**
 * 同上(ValidNumberId) 区别是 可以等于0
 * */
function ValidNumberIdCanZero(value,element,param){
    var spl=param.split(";");
    //value=value.replace(/^0/g,"");
    //$(element).val(value);
    if(spl.length==1){// 正整数情况
    	var maxlength=Number(spl[0]);
    	if($(element).attr("maxlength")==undefined){//设置长度
			$(element).attr({"maxlength":maxlength});	
		}
    	if(/^\d+$/.test(value)&&value>=0){//判断是不是整数
    	   $(element).val(Number(value));
    	   return true;
    	}else{
    		$(element).val(value.replace(".",""));
    		return false;
    	}
    	
    }else if(spl.length==2){
    		var zzs=Number(spl[0])-Number(spl[1]);//整数允许的部分
    		var xs=Number(spl[1]);//小数可允许的长度
    		var maxlength=Number(spl[0])+1;
    		eval("var reg=/^\\d{1," + zzs + "}(\\.\\d{1," + xs + "})?$/g");//var reg=/^\d{0,4}(\.\d{0,2})?$/g
    		if($(element).attr("maxlength")==undefined){//设置长度
				$(element).attr({"maxlength":maxlength});	
			}
    		if(!reg.test(value)||value<0){//不符合
    			if(/^(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)&&value.indexOf(".")>0&&value.substring(value.indexOf(".")+1,100).length>xs){//如果输入的小数大于规定的值
    				var head=value.split(".")[0];//正数
					var bottom=value.split(".")[1].substring(0,xs);//小数
					$(element).val(Number(head+"."+bottom));
    			}
    			return false;
    		}else{//如果符合,此时value是数值格式
    			 /*if(value.length>1&&value.indexOf('0')==0&&value.indexOf(".")>=0){ //测试 可去掉 当输入0123.123类型的去掉前面的0
    				 $(element).val(Number(value));
    			 }*/
    			 if(value.length>1&&value.indexOf('0')==0&&value.indexOf(".")==-1){//测试 可去掉
    				 $(element).val(Number(value));
    			 }
    			return true;
    		}
    }else{//错误情况
    	
    }
	return false;
}
