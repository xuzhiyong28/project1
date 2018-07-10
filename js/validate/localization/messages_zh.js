jQuery.extend(jQuery.validator.messages, {
		//数据格式校验
		zip:"不是合法的邮编格式",
		address:"格式为xx省(区)xx市xx，且不少于8个汉字",
		telephone:"不是合法的电话格式",
		phone:"不是合法的手机格式",
		fax:"不是合法的传真格式",
		email:"不是合法的电子邮箱格式",
		url:"不是合法的网址格式",
		creditcard:"不是合法的信用卡号",
		date:"不是合法的日期格式",
		idcard:"不是合法的身份证号码",
		ValidZjbhByZjlb:"不是合法的证件编号",
		ValidZjbhByZdzjlb:"不是合法的证件编号",
		ValidGghByJys:"不是合法的证券账号",
		ValidGghByZdzhlb:"不是合法的证券账号",
		ymtzhJY:"不是合法的一码通号",
		ValidKhwtfs:"客户委托方式尚未修改",
		ValidKhfwfs:"客户服务方式尚未修改",
		ValidKhywkz:"客户业务控制尚未修改",
		ValidKhzqywkz:"证券账户业务控制尚未修改",
		//非空与长度控制
		required:"不能为空",
		rdBytype:"不能为空",
		number:"不是有效的数值",
		digits:"不是有效的整数",
		passwordjy:"必须是{0}位数字",
		equalTo:"两次输入不一致",
		noequalTo:"两次输入必须不一致",
		agecheck:"必须年满{1}周岁",
		maxlength_CN:"长度不可超过{0}位(汉字计为2位)",
		minlength_CN:"长度不可少于{0}位(汉字计为2位)",
		maxlength:jQuery.validator.format("长度不可超过{0}位"),
		minlength:jQuery.validator.format("长度不可少于{0}位"),
		rangelength:jQuery.validator.format("长度必须界于{0}和{1}之间"),
		range:jQuery.validator.format("必须界于{0}和{1}之间"),
		ltOrEqual:"不可超过{1}",	//(<={1})
		gtOrEqual:"不可小于{1}",	//(>={1})
		//日期格式
		ltNowDate:"必须小于当前日期",			//(<当天)
		ltOrEqualNowDate:"不可超过当前日期",	//(<=当天)
		gtNowDate:"必须大于当前日期",			//(>当天)
		gtOrEqualNowDate:"不可小于当前日期",	//(>=当天)
		dateYXQ:"不可小于当前日期",				//(>=当天)
		//No use
		remote:"请修正该字段",
		dateISO:"请输入合法的日期 (ISO).",
		accept:"请输入拥有合法后缀名的字符串",
		max:jQuery.validator.format("不可大于{0}"),
		min:jQuery.validator.format("不可小于{0}"),
		lettersanddigits:"请输入数字或字母",
		charlength:"必须输入{0}位字符",
		jjgsjy:"请输入合法的账户",
		htxybh:"请输入合法合同编号",
		notequal:"不能与当前开户人相同",
		orgCodeCheck:"组织机构代码格式不正确",
		gt:"请输入大于{0}的数",
		equal:"不可以大于{1}",
		requiredOne:"与{1}至少填写一项",
		zjbhcheck:"不是合法的证件编号",
		//Temp
		yzbm:"邮政编码必须是6位数字",
		dateformat:"请输入合法的日期(yyyymmdd)",
		dateYXQ:"日期已过期或不合法",
		dateFmt:"日期不合法",
		landline:"请输入合法的固定电话(区号+'-'+电话号码)",
		website:"格式错误"
});