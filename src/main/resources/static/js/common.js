 
var clientBrowserName = null; 
if($.browser.msie){
	clientBrowserName = "Explorer";
} else if($.browser.mozilla){
	clientBrowserName = "FireFox";
} else if($.browser.opera){
	clientBrowserName = "Opera";
} else if($.browser.safari){
	var safariOr = ( $.browser.safari && /chrome/.test(navigator.userAgent.toLowerCase()) ) ? false : true;
	if(safariOr){
		clientBrowserName = "safari";
	}else{
		clientBrowserName = "chrome";
	}
} else{
	clientBrowserName = "etc";
}

var clientBrowserVersion = $.browser.version.slice(0,1);

(function($){
	$.pageScriptLoad = function(scriptURLVal) {
		if(scriptURLVal != ""){
			$.holdReady(true);
			$.ajax({
				url:scriptURLVal,
				dataType:"script",
				cache:false,
				async:false,
				complete:function(jqXHR, textStatus) {
					//alert(textStatus);
					$.holdReady(false);
				}
			});
			/*$.ajaxSetup({cache : false});
			$.getScript(scriptURLVal, function(){
				$.holdReady(false);
			});*/
		}
		/*$.ajax({url:scriptURLVal, dataType:"script", cache:false, async:true});
//		if (url != "") {
//			$.holdReady(true);
//			$.ajaxSetup({cache : true});
//			$.getScript(url, function() {
//				$.holdReady(false);
//			});
//			$.ajaxSetup({cache : false});
//		}*/
	}
})(jQuery);

/***************************** VALUE CHECK UTIL *********************************/
(function($){
	/******************************************************************************
	*	Set Cookie
	*	사용방법 : $.setCookie("Cookie Name", Value, Day);
	*	@return :
	*******************************************************************************/
    $.setCookie = function(name, value, expiredays){
    	var todayDate = new Date(); 
    	todayDate.setDate( todayDate.getDate() + expiredays ); 
    	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    },
    /******************************************************************************
	*	Get Cookie
	*	사용방법 : $.getCookie("Cookie Name"});
	*	@return :
	*******************************************************************************/
    $.getCookie = function(name){
    	var Found = false; 
    	var start, end; 
    	var i = 0;

    	while(i <= document.cookie.length) { 
    		start = i; 
    		end = start + name.length; 
    		    
    		if(document.cookie.substring(start, end) == name) { 
    		   Found = true; 
    		   break; 
    		} 
    		i++; 
    	} 
    		    
    	if(Found == true) { 
    		start = end + 1; 
    		end = document.cookie.indexOf(";", start); 
    		if(end < start) 
    			end = document.cookie.length; 
    		return document.cookie.substring(start, end); 
    	} 
    	return "";	  
    }
    
	/******************************************************************************
	*	NULL 체크
	*	사용방법 : $.isEmpty("") or $.isEmpty($("#").val())
	*	@return : true(NULL)
	*******************************************************************************/
	$.isEmpty = function(str){
		if(str == null || str.replace(/ /gi,"") == ""){
			return true;
		}
		return false;
	},
	
	/******************************************************************************
	*	String length
	*	@return : int
	*******************************************************************************/
	$.getByteLen = function(str){
		var byteLength = 0;
		for (var inx = 0; inx < str.length; inx++) {
	        var oneChar = escape(str.charAt(inx));
	        if ( oneChar.length == 1 ) {
	            byteLength ++;
	        } else if (oneChar.indexOf("%u") != -1) {
	            byteLength += 3;
	        } else if (oneChar.indexOf("%") != -1) {
	            byteLength += oneChar.length/3;
	        }
	    }
	    return byteLength;
	},
	
	/******************************************************************************
	*	Email 형식 체크
	*	사용방법 : $.mailFrm("") or $.mailFrm($("#").val())
	*	@return : true(맞는 형식) | false(잘못된 형식)
	*******************************************************************************/
	$.mailFrm = function(str){
		return ($.trim(str).match(/^[_\-\.0-9a-zA-Z]{2,}@[-.0-9a-zA-z]{2,}\.[a-zA-Z]{2,8}$/)) ? true : false;
	},
	
	/******************************************************************************
	*	숫자만 체크
	*	사용방법 : $.isNumber("") or $.isNumber($("#").val())
	*	@return : true(맞는 형식) | false(잘못된 형식)
	*******************************************************************************/
	$.isNumber = function(str){
		return ($.trim(str).match(/^[0-9]+$/)) ? true : false;
	},
	
	/******************************************************************************
	*	실수 숫자 체크
	*	사용방법 : $.isFloat("") or $.isFloat($("#").val())
	*	@return : true(맞는 형식) | false(잘못된 형식)
	*******************************************************************************/
	$.isFloat = function(str){
		return ($.trim(str).match(/^([0-9]|[0-9]\.[0-9])+$/)) ? true : false;
	},
	
	/******************************************************************************
	*	음수, 양수를 포함하는 정수만 체크
	*	사용방법 : $.isInteger("") or $.isInteger($("#").val())
	*	@return : true(맞는 형식) | false(잘못된 형식)
	*******************************************************************************/
	$.isInteger = function(str){
		return ($.trim(str).match(/^([-]{0,1}[1-9](\d*))$|^[0]$/)) ? true : false;
	},	
	
	/******************************************************************************
	*	Booking Number 형식을 체크 한다.
	*	사용방법 : $.isInteger("") or $.isInteger($("#").val())
	*	@return : true(맞는 형식) | false(잘못된 형식)
	*******************************************************************************/
	$.isBkgNo = function(str){
		return ($.trim(str).match(/^[0-9a-z]{3}([0-9a-hj-np-z]{6,8})[0-9]{2}$/i)) ? true : false;
	},		
	
	/******************************************************************************
	*	숫자 이외에는 다 뺀다.
	*	사용방법 : $.onlyNum("") or $.onlyNum($("#").val())
	*	@return : 숫자
	*******************************************************************************/
	$.onlyNum = function(str){
		return $.trim(str).replace(/[^0-9]/g,"");
	},
	
	/******************************************************************************
	*	영문과숫자만 체크
	*	사용방법 : $.engNum("") or $.engNum($("#").val())
	*	@return : true(맞는 형식) | false(잘못된 형식)
	*******************************************************************************/
	$.engNum = function(str){
		return ($.trim(str).match(/^[0-9a-zA-Z]+$/)) ? true : false;
	},
	
	/******************************************************************************
	*	세자리수에 콤마 추가
	*	사용방법 : $.commaSet("") or $.commaSet($("#").val())
	*	@return : 12,345,678
	*******************************************************************************/
	$.commaSet = function(n){
		var reg = /(^[+-]?\d+)(\d{3})/;
		n += '';
	    while (reg.test(n))
	    	n = n.replace(reg, '$1' + ',' + '$2');
		return n;
	},
	
	/******************************************************************************
	*	소수점 자리 체크 : ex) .xxx 만 허용 
	*	사용방법 : $.thCommaNoMoreSet(obj , 3)
	*	@return : 숫자
	*******************************************************************************/
	$.thCommaNoMoreSet = function(obj , len){
		var str = $("#"+obj).val();
		if(str.indexOf(".") > -1)
		{
			$("#"+obj).val(str.split(".")[0]+"."+str.split(".")[1].substr(0,len));
		}
		
	},	
	
	/******************************************************************************
	*	Input String Valid Check
	*	사용방법 : $("#text1").chkValidText("message", {chkMd:"label",minLen:4,maxLen:8});
	*	@return :
	*******************************************************************************/
	$.fn.chkValidText = function(msg, options){
		var settings = {
			chkMd : "default", // default:Browser Dialog, dialog:JqueryUI, label:Field Label
			empty : true, // Check NULL
			minLen : 0, // Value Length
			maxLen : 0, // Value Length
			lang : "en", //Language
			dialogOpt : {modal:false,use:"warn"}, //alertDialog Option
			initVal : true //오류 시 초기화 여부
		};
		settings = $.extend(settings, options);
		var chk = true;
		if(settings.empty){
			if($.isEmpty(this.val())){
				chk = false;
			}
		}
		
		var strLen = 0;
		var val = $(this).val();
		if(settings.lang == "en"){
			strLen = $.getByteLen(val);
		}else{
			strLen = Math.ceil($.getByteLen(val) / 3);
		}
		if(settings.minLen > 0 && settings.minLen > strLen){
			chk = false;
		}
		if(settings.maxLen > 0 && strLen > settings.maxLen){
			chk = false;
		}
		
		if(!chk){
			if(settings.chkMd == "dialog"){
				$.alertDialog(msg, settings.dialogOpt);
			}else if(settings.chkMd == "label"){	
				$.labelDialog(msg, this);
			}else{
				alert(msg);
			}
			
			if(settings.initVal){
				$(this).val("");
			}
		}else{
			$.labelDialogRemove(this);	
		}
		return chk;
	},
	

	/******************************************************************************
	*	Input String Valid Check
	*	사용방법 : $("#text1").chkValidMultiText({"empty":"필수 값 입니다.",short:"{t} 짧게 입력되었습니다.",long:"{t} 많이 입력되었습니다."}, {chkMd:"label",minLen:4,maxLen:8});
	*	@return :
	*******************************************************************************/
	$.fn.chkValidMultiText = function(msgs, options){
		var messages = {
			empty:""
			,short:""
			,long:""
		};
		messages = $.extend(messages, msgs);
		
		var settings = {
			chkMd : "default", // default:Browser Dialog, dialog:JqueryUI, label:Field Label
			empty : true, // Check NULL
			minLen : 0, // Value Length
			maxLen : 0, // Value Length
			lang : "en", //Language
			dialogOpt : {modal:false,use:"warn"}, //alertDialog Option
			initVal : true //오류 시 초기화 여부
		};
		settings = $.extend(settings, options);

		var msg = "";
		var chk = true;
		if(settings.empty){
			if($.isEmpty(this.val())){
				chk = false;
				msg = messages.empty;
			}
		}
		
		var strLen = 0;
		var val = $(this).val();
		if(settings.lang == "en"){
			strLen = $.getByteLen(val);
		}else{
			strLen = Math.ceil($.getByteLen(val) / 3);
		}
		
		if(settings.minLen > 0 && settings.minLen > strLen){
			chk = false;
			settings.initVal = false;
			msg = messages.short;
		}
		if(settings.maxLen > 0 && strLen > settings.maxLen){
			chk = false;
			settings.initVal = false;
			msg = messages.long;
		}
		
		if(!chk){
			if(settings.chkMd == "dialog"){
				$.alertDialog(msg, settings.dialogOpt);
			}else if(settings.chkMd == "label"){	
				$.labelDialog(msg, this);
			}else{
				alert(msg);
			}
			
			if(settings.initVal){
				$(this).val("");
			}
		}else{
			$.labelDialogRemove(this);	
		}
		return chk;
	},
	
	
	/******************************************************************************
	 *	Input String Valid Check
	 *	사용방법 : $("#text1").chkValidLengthText({short:"{t} 짧게 입력되었습니다.",long:"{t} 많이 입력되었습니다."}, {chkMd:"label",minLen:4,maxLen:8});
	 *	@return :
	 *******************************************************************************/
	$.fn.chkValidLengthText = function(msgs, options){
		var messages = {
			short:""
			,long:""
		};
		messages = $.extend(messages, msgs);
		
		var settings = {
				chkMd : "default", // default:Browser Dialog, dialog:JqueryUI, label:Field Label
				minLen : 0, // Value Length
				maxLen : 0, // Value Length
				lang : "en", //Language
				dialogOpt : {modal:false,use:"warn"}, //alertDialog Option
				initVal : true //오류 시 초기화 여부
		};
		settings = $.extend(settings, options);
		
		var msg = "";
		var chk = true;
		
		var strLen = 0;
		var val = $(this).val();
		if(settings.lang == "en"){
			strLen = $.getByteLen(val);
		}else{
			strLen = Math.ceil($.getByteLen(val) / 3);
		}
		
		if(settings.minLen > 0 && settings.minLen > strLen){
			chk = false;
			settings.initVal = false;
			msg = messages.short;
		}
		if(settings.maxLen > 0 && strLen > settings.maxLen){
			chk = false;
			settings.initVal = false;
			msg = messages.long;
		}
		
		if(!chk){
			if(settings.chkMd == "dialog"){
				$.alertDialog(msg, settings.dialogOpt);
			}else if(settings.chkMd == "label"){	
				$.labelDialog(msg, this);
			}else{
				alert(msg);
			}
			
			if(settings.initVal){
				$(this).val("");
			}
		}else{
			$.labelDialogRemove(this);	
		}
		return chk;
	},
	
	/******************************************************************************
	*	Input Number Valid Check
	*	사용방법 : $("#text1").chkValidNumber("message", {chkMd:"label",minLen:4,maxLen:8});
	*	@return :
	*******************************************************************************/
	$.fn.chkValidNumber = function(msg, options){
		var settings = {
			chkMd : "default", // default:Browser Dialog, dialog:JqueryUI, label:Field Label
			empty : true, // Check NULL
			minLen : 0, // Value Length
			maxLen : 0, // Value Length
			dialogOpt : {modal:false,use:"warn"}, //alertDialog Option
			initVal : false //오류 시 초기화 여부
		};
		settings = $.extend(settings, options);
		var chk = true;
		if(settings.empty){
			if($.isEmpty(this.val())){
				chk = false;
			}
		}
		
		chk = $.isNumber(this.val());
		
		if(settings.minLen > 0 && settings.minLen > $.getByteLen(this.val())){
			chk = false;
		}
		if(settings.maxLen > 0 && $.getByteLen(this.val()) > settings.maxLen){
			chk = false;
		}
		
		if(!chk){
			if(settings.chkMd == "dialog"){
				$.alertDialog(msg, settings.dialogOpt);
			}else if(settings.chkMd == "label"){	
				$.labelDialog(msg, this);
			}else{
				alert(msg);
			}
			
			if(settings.initVal){
				$(this).val("");
			}
		}else{
			$.labelDialogRemove(this);	
		}
		return chk;
	},
	
	/******************************************************************************
	*	Input Number & English Valid Check
	*	사용방법 : $("#text1").chkValidNumEn("message", {chkMd:"label",minLen:4,maxLen:8});
	*	@return :
	*******************************************************************************/
	$.fn.chkValidNumEn = function(msg, options){
		var settings = {
			chkMd : "default", // default:Browser Dialog, dialog:JqueryUI, label:Field Label
			empty : true, // Check NULL
			minLen : 0, // Value Length
			maxLen : 0, // Value Length
			dialogOpt : {modal:false,use:"warn"}, //alertDialog Option
			initVal : true //오류 시 초기화 여부
		};
		settings = $.extend(settings, options);
		var chk = true;
		if(settings.empty){
			if($.isEmpty(this.val())){
				chk = false;
			}
		}
		
		chk = $.engNum(this.val());
		
		if(settings.minLen > 0 && settings.minLen > $.getByteLen(this.val())){
			chk = false;
		}
		if(settings.maxLen > 0 && $.getByteLen(this.val()) > settings.maxLen){
			chk = false;
		}
		
		if(!chk){
			if(settings.chkMd == "dialog"){
				$.alertDialog(msg, settings.dialogOpt);
			}else if(settings.chkMd == "label"){	
				$.labelDialog(msg, this);
			}else{
				alert(msg);
			}
			
			if(settings.initVal){
				$(this).val("");
			}
		}else{
			$.labelDialogRemove(this);	
		}
		return chk;
	},
	
	/******************************************************************************
	*	Input Email Valid Check
	*	사용방법 : $("#text4").chkValidEmail("gggg", {chkMd:"label"});
	*	@return :
	*******************************************************************************/
	$.fn.chkValidEmail = function(msg, options){
		var settings = {
			chkMd : "default", // default:Browser Dialog, dialog:JqueryUI, label:Field Label
			empty : true, // Check NULL
			dialogOpt : {modal:false,use:"warn"}, //alertDialog Option
			initVal : true //오류 시 초기화 여부
		};
		settings = $.extend(settings, options);
		var chk = true;
		if(settings.empty){
			if($.isEmpty(this.val())){
				chk = false;
			}
		}
		
		chk = $.mailFrm(this.val());
		
		if(!chk){
			if(settings.chkMd == "dialog"){
				$.alertDialog(msg, settings.dialogOpt);
			}else if(settings.chkMd == "label"){	
				$.labelDialog(msg, this);
			}else{
				alert(msg);
			}
			
			if(settings.initVal){
				$(this).val("");
			}
		}else{
			$.labelDialogRemove(this);	
		}
		return chk;
	},
	
	/******************************************************************************
	*	Input CHeckbox or Radio Check Y N
	*	사용방법 : $.chkRadio_Checkbox(checkField, msg, options);
	*	@return :
	*******************************************************************************/
	$.chkRadio_Checkbox = function(checkField, msg, options){
		var settings = {	
			chkMd : "default", // default:Browser Dialog, dialog:JqueryUI
			dialogOpt : {modal:false,use:"warn"} //alertDialog Option
		};
		settings = $.extend(settings, options);	
		var chk = true;
		var chkLen = 0;
		$("input[name="+checkField+"]").each(function(){
			if($(this).is(":checked")){
				chkLen = chkLen + 1;
			}
		});
		
		if(chkLen < 1){
			chk = false;
			if(settings.chkMd == "dialog"){
				$.alertDialog(msg, settings.dialogOpt);
			}else{
				alert(msg);
			}
		}
		
		return chk;
		
	}
	
})(jQuery);

/***************************** POPUP UTIL *********************************/
(function($){
	$.popupLayer = function(options) {
		var wrapWidth = 0, wrapHeight = 0, wrapLeft = 0, wrapTop = 0, left = 0, top = 0;
		settings = {
				left : 0,
				top : 0,
				width : 350,
				height : 450,
				type : "load", //iframe, load(HTML Load)
				modal : true,
				outLine : "shadow", //shadow, border
				color : "#000000",
				outLineSize : 10,
				draggable : false,
				scroll : true,
				open : function(){}
				
		};
		
		settings = $.extend(settings, options);
		if(settings.modal == true){
			wrapWidth = $(document).width();
			wrapHeight = $(document).height();
			if(settings.left < 1){
				left = ($(document).width()-settings.width)/2;
			}else{
				left = settings.left;
			}	
			if(settings.top < 1){
				top = ($(document).height()-settings.height)/2;
			}else{
				top = settings.top;
			}
		}else{
			wrapWidth = settings.width;
			wrapHeight = settings.height;
			if(settings.left < 1){
				wrapLeft = ($(document).width()-settings.width)/2;
			}else{
				wrapLeft = settings.left;
			}
			if(settings.top < 1){
				wrapTop = ($(document).height()-settings.height)/2;
			}else{
				wrapTop = settings.top;
			}	
		}
		
		var outLine = "";
		if(settings.outLine == "shadow"){
			outLine = "filter:Alpha(opacity=20); opacity:0.2;-moz-opacity:0.2;";
		}
		//var margin = settings.outLineSize / 2;
		//var marginOpt = "margin-top:"+margin+"px;margin-left:"+margin+"px;margin-right:"+margin+"px;margin-bottom:"+margin+"px;";
		
		var tags = "";
		
		var widthPop = settings.type == "iframe" ? settings.width : settings.width-settings.outLineSize;

		
		tags = "<div id='popupWrap' data-layerPopup>"
		+	"<button type='button' class='btn_popup_close ir'>Popup close</button>"
		+		"<div class='jui-popup-layerin' style='top:"+top+"px; left:"+left+"px; width:"+widthPop+"px;height:"+(settings.height-(settings.outLineSize+10))+"px;'></div>"
		+ "</div>";
		
		$(tags).appendTo("body");
//		if(settings.draggable == true){
//			if(settings.modal == true){
//				$(".jui-popup-layerin").prev().draggable({ 
//					cursor: 'move', 
//					drag: function(){
//						var pos = $(this).position();
//						var cssOpt = {'top':pos.top,'left':pos.left};
//						$(".jui-popup-layerin").css(cssOpt);
//					}
//				});
//				
//			}else{
//				$(".jui-popup-layerin").parent("div").draggable({
//					cursor: 'move', 
//					drag: function(){
//						//var pos = $(this).position();
//						//var cssOpt = {'top':pos.top,'left':pos.left};
//						//$(".jui-popup-layerin").css(cssOpt);
//					}	
//				});
//			}	
//		}
		
		
		var inW = $(".jui-popup-layerin").innerWidth();
		var inH = $(".jui-popup-layerin").innerHeight();
		
		
		if(settings.type == "load"){
			$(".jui-popup-layerin").append("<div id='popCon' class='jui-layer-cont'></div>");
		}else if(settings.type == "iframe"){
			var scrollOpt = "";												
			if(settings.scroll == false){ scrollOpt = "scrolling='no'";}
			//$(".jui-popup-layerin").append("<iframe id='popCon' name='popCon' frameborder='0' style='position:relative;width:"+(inW-2)+"px;height:"+(inH-2)+"px;border:1px solid #a0a0a0;'></iframe>");
			$(".jui-popup-layerin").append("<iframe id='popCon' name='popCon' frameborder='0' style='position:relative;width:100%;height:100%;'></iframe>");
			$(".jui-popup-layerin").parent().addClass("iframePopup");
		}
		settings.open($("#popupWrap"), $("#popCon"));
		
		
		//var orgWidth = parseInt($(this).find(".popup_contents").css("min-width"))+50;
		//var orgHeight = parseInt($(this).find(".popup_contents").css("min-height"))+114;
		
		$("#popupWrap").css({
			marginLeft:-($("#popupWrap").outerWidth()/2),
			marginTop:-($("#popupWrap").outerHeight()/2)
		});
		$(".popup_mask").show();
		
		return $("#popupWrap");
	};
	/******************************************************************************
	*	Popup Window Open
	*	사용방법 : $.popupWin("./test.html", "test", {width:500, height:600});
	*	@return :
	*******************************************************************************/
    $.popupWin = function(url, popupId, options, postData){
		var pop = "";
    	var left = 0,
    		top = 0,
    		settings = {
    			width : 300,
    			height : 400,
				scrollbars : 0,
				menubar : "no",
				toolbar : "no",
				status : "no",
				resizable : "yes",
				location : "no",
				left : 0,
				top : 0,
				type:"get"
		};
    	settings = $.extend(settings, options);
    	if(options){
	    	if(options.width){
	    		settings.height = options.width;
	    	}
	    	if(options.height){
	    		settings.height = options.height;
	    	}
	    	if(options.scrollbars){
	    		settings.scrollbars = options.height;
	    	}
    	}
    	
    	// window outerHeight (Frame + contents)
    	
    	if(window.opener == undefined) {
    		var wOuterHeight = window.outerHeight != undefined ? window.outerHeight : document.body.scrollHeight;
    	} else {
    		var wOuterHeight = screen.height-180;
    	}
    	
    	
    	
    	// 사용자 높이보다 팝업의 height 옵션값이 더 클 경우 재 조정
		if(wOuterHeight < settings.height && window.opener == undefined) {
			settings.height = $(document.body).innerHeight() - 100;
			
		} else if (wOuterHeight < settings.height && window.opener != undefined) {
			// window popup 에서 또 다른 window popup 뜨는 경우
			settings.height = screen.height-180;
			
		}
		
		
		//브라우저별로 상이한 window open popup height 통일을 위해 분기
		if($.browser.safari && navigator.vendor.toLowerCase().indexOf("apple") > -1){
			if(navigator.appVersion.toLowerCase().indexOf("window") > -1){
				settings.height -= 57;
				
			} else if(navigator.appVersion.toLowerCase().indexOf("mac") > -1 ) {
				settings.height += 47;
			}
		}
    	
		// window left , top (screen)
    	var screenLeft	= window.screenX != undefined ?	window.screenX : window.screenLeft;
	    var screenTop	= window.screenY != undefined ?	window.screenY : window.screenTop - 78;//IE8 이하의 경우 툴바높이 추가
		
	    // window outerWidth (Frame + contents)
		var winWidth	= window.outerWidth		!= undefined ? window.outerWidth :  document.documentElement.clientWidth + 20;
		
		left = screenLeft + (winWidth/2) - ((settings.width /2) + 10);
		top  = screenTop  + (wOuterHeight/2) - (settings.height/2);
		
		var addOpt = "titlebar='yes'"
		+ ", width=" + settings.width
		+ ", height=" + settings.height
		+ ", scrollbars=" + settings.scrollbars
		+ ", menubar=" + settings.menubar
		+ ", toolbar=" + settings.toolbar
		+ ", status=" + settings.status
		+ ", directories=no"
		+ ", resizable=" + settings.resizable
		+ ", location=" + settings.location
		+ ", left=" + left
		+ ", top=" + top;
		
		if( settings.type == "post" || settings.type == "POST" ) {
			pop = window.open( "", popupId, addOpt );
			
			var tmp = "";
			
			$.each(
				postData,
				function( idx, val ) {
					tmp += "<input type='text' id='"+ idx +"'name='"+ idx +"' value='"+ val +"' />";
				}
			);
			
			var tmpFrm =
				$( "<form />" ).attr(
					{
						'id':'tmpFrm',
						'name':'tmpFrm',
						'action':url,
						'target':popupId,
						'method':settings.type
					}
				).append( tmp );
			
			$( "body" ).append( tmpFrm );
			
			tmpFrm.submit();
			
			$( "#tmpFrm" ).remove();
		} else {
			pop = window.open(url, popupId, addOpt);
		}
		
		pop.focus();
		return pop;
    }
})(jQuery);

/***************************** DIALOG UTIL *********************************/
(function($){
	/******************************************************************************
	*	Message Converting Util
	*	사용방법 : $.msgConvert(As is Message, Value);
	*	@return : Converted Message
	*******************************************************************************/
	$.msgConvert = function(msg, str){
		var convertMsg = "";
		convertMsg = msg.replace("\{t\}", str);
		convertMsg = convertMsg.replace("\{n\}", str);
		return convertMsg;
	},
	
	/******************************************************************************
	*	Message Converting Util
	*	사용방법 : $.msgConvert2(As is Message, str,str2);
	*	@return : Converted Message
	*******************************************************************************/
	$.msgConvert2 = function(msg, str, str2){
		var convertMsg = "";
		convertMsg = msg.replace("\{t\}", str);
		convertMsg = convertMsg.replace("\{n\}", str2);
		return convertMsg;
	},
	
	/******************************************************************************
	*	Label Dialog create
	*	사용방법 : $.labelDialog(message, element);
	*	@return :
	*******************************************************************************/
	$.labelDialog = function(msg, element){
		var labelId = $(element).attr('id')+"_err";
		var alertDiv = "<div id=\""+labelId+"\" class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .6em;\">"
					+ "<p><span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: .3em;\"></span>"
					+ "<strong>Alert:</strong>" + msg + "</p>"
					+ "</div>";
		$.labelDialogRemove(element);
		$(element).removeClass("ui-state-error")
				.addClass("ui-state-error");
		$(alertDiv).insertAfter(element)
				.css("position", "relative");
	},
	
	/******************************************************************************
	*	Label Dialog Remove
	*	사용방법 : $.labelDialog(element);
	*	@return :
	*******************************************************************************/
	$.labelDialogRemove = function(element){
		var labelId = $(element).attr('id')+"_err";
		$(element).removeClass("ui-state-error");
		$("#"+labelId).remove();
	},
	
	/******************************************************************************
	*	Alert Dialog 
	*	사용방법 : $.alertDialog(message, options);
	*	@return :
	*******************************************************************************/
	$.alertDialog = function(msg, options){
		// 이미 다이얼로그 열려있는 상황에선 다시 안열리게끔 return
		// 로그인 시 열리지 않는 문제로 주석처리 - 수정 (Gabin KIM)
		if($(".ui-dialog").is(":visible")) {
			return;
		}
		
		// progress layer hide
		$(".popup_mask").removeClass("progress").show();
		
		var dialogStyle = "<div id=\"dialog-modal\" title=\"Dialog Message\">"
			  + msg
			  + "</div>";
			  
		var settings = {
				modal : true,
				use : "warn", //warn:경고, noti:알림
				wSize : 300, //Width Size
				hSize : 140, //Height Size
				btnView : true, //Button View
				btnTit : "Close", //Button Title
				titView : true, //Title View여부
				modalTit : "",
				zIndex : 1000,
				focus : "",
				close : function(){
					$(".popup_mask").hide();
				}
		};
		
		settings = $.extend(settings, options);
		
		var btns = [];
		if(settings.btnView){
			btns = [{
				text: settings.btnTit,
			    click: function() { 
			    	try{
			    		jQuery(this).dialog("close");	
			    	}catch(e){
			    	}
			    }
			}];
		}
		
		var setOpt = {};
		if(settings.focus == ''){
			setOpt = {title: settings.modalTit,
				width: settings.wSize,
				height: settings.hSize,
				modal: settings.modal,
				buttons: btns,
				zIndex: settings.zIndex,
				resizable: false,
				close: function(event, ui) {
					$(".popup_mask").hide();
					settings.close();
				}
			};
		} else {
			setOpt = {title: settings.modalTit,
				width: settings.wSize,
				height: settings.hSize,
				modal: settings.modal,
				buttons: btns,
				zIndex: settings.zIndex,
				resizable: false,
				close: function(event, ui) {
					$(".popup_mask").hide();
					$("#"+settings.focus).focus();
					settings.close();
				}
			};
		}
		
		$("#dialog:ui-dialog").dialog("destroy");
		$(dialogStyle).prependTo("body")
					.css("overflow-x", "hidden")
					.css("word-break", "break-all")
					.css("word-wrap", "break-word")
					.css("white-space", "pre-wrap")
					.css("white-space", "-moz-pre-wrap")
					.css("white-space", "-pre-wrap")
					.css("white-space", "-o-pre-wrap");
		$("#dialog-modal").hide();
		$("#dialog-modal").dialog(setOpt);
		
		//IE-8 에서 스크롤생성 문제 
		$('.ui-widget-overlay').attr('style', 'z-index: 0;');
		if(!settings.titView){
			$(".ui-dialog-titlebar").hide();
		}
		
		//ff에서  반투명 layer가 전체에 덮히지 않는 버그 해결 
		$(window).trigger("resize");
	},
	
	/******************************************************************************
	*	Confirm Dialog 
	*	사용방법 : $.confirmDialog(message, options);
	*	@return :
	*******************************************************************************/
	$.confirmDialog = function(msg, options){
		var result = false;
		var dialogStyle = "<div id=\"dialog-confirm\" title=\"Confirm Message\">"
			  + msg
			  + "</div>";
			  
		var settings = {
				modal : true,
				wSize : 300, //Width Size
				hSize : 140, //Height Size
				btnConfirm : "Confirm", //Button Title
				btnCancel : "Cancel", //Button Title
				titView : true, //Title View여부
				modalTit : "",
				zIndex : 1000,
				confirm : function(){},
				cancel : function(){}
		};
		
		settings = $.extend(settings, options);
		
		var btns = [
			{
				text: settings.btnConfirm,
				click: function() { 
					$(this).dialog("close"); 
					settings.confirm();
					result = true;
				}
			},        
			{
				text: settings.btnCancel,
				click: function() { 
					$(this).dialog("close"); 
					settings.cancel();
				}
			}
		];
		
		
		$("#dialog:ui-dialog").dialog("destroy");
		
		if( $("#dialog-confirm").length > 0 ){
			$("#dialog-confirm").remove();
		}
		
		$(dialogStyle).prependTo("body")
					.css("overflow-x", "hidden")
					.css("word-break", "break-all")
					.css("word-wrap", "break-word")
					.css("white-space", "pre-wrap")
					.css("white-space", "-moz-pre-wrap")
					.css("white-space", "-pre-wrap")
					.css("white-space", "-o-pre-wrap");
		$("#dialog-confirm").hide();
		$("#dialog-confirm").dialog({
			title: settings.modalTit,
			width: settings.wSize,
			height: settings.hSize,
			modal: settings.modal,
			zIndex: settings.zIndex,
			buttons: btns,
			resizable: false
		});
		
		if(!settings.titView){
			$(".ui-dialog-titlebar").hide();
		}
		return result;
	}

})(jQuery);

/***************************** CODE ITEM UTIL *********************************/
(function($){
	$.fn.dataAutocmplete = function(options){
		var self = this;
		var settings = {
				url : "",
				paramData : {},
				textField : "",		// DB Search Field(Element Label Title)
				valueField : "",	// DB Search Field(Element Value)
				minLength : 2,
				select : function(){},
				open : function(){},
				close : function(){},
				focus : function(){},
				change : function(){}
		};
		settings = $.extend(true,settings, options);
		
		self.autocomplete({
			source: function( request, response ) {
				settings.paramData[self.attr("id")] = request.term;
				var selfVal = self.attr("value");
				$.ajax({
					url : settings.url,
					dataType : "json",
					data : settings.paramData,
					success: function(data) {
						if(data.count>0){
							
							response( $.map( data.list, function( item ) {
								return {
									label: 	item[settings.textField],
									value: 	item[settings.textField],
									code:	item[settings.valueField]
								}
							}));
						}else{
							response(null);
							$(self.selector).val(selfVal);
						}
					}
				});
			},
			minLength : settings.minLength,
			select: function( event, ui ) {
				settings.select(event, ui.item);
				event.stopImmediatePropagation();
			},
			open: function() {
				settings.open();
			},
			close: function() {
				settings.close();
			},
			focus: function() {
				settings.focus();
			} ,
			change: function() {
				settings.change();
			} 			
			
		});
	},
	/******************************************************************************
	*	Code Item Create Element Util 
	*	사용방법 : $(selector).codeItemUtil(Selected Value, option);
	*	@return :
	*******************************************************************************/
	$.fn.codeItemUtil = function(chkParam, options){ 
		var element = $(this).attr("id"), self = this;
		var settings = {
				url : "", 			// request URL
				paramData : {}, 	// request Parameter
				type : "select",	// Element Type 
				firstName : "All",
				firstValue : "",
				firstView : true,
				exceptValue : "",
				textField : "",		// DB Search Field(Element Label Title)
				valueField : "",	// DB Search Field(Element Value)
				minLength : 1,		// Autocomplete Type Search Word MinLength
				fieldId : "",		// Element Name and ID
				loadcomplete : function(){},
				loadcompSelect : function(){},
				selectViewWidth : 600,
				selectViewHeight : 200
			};
			settings = $.extend(settings, options);
			
			function idxOf(arr, str){
				var rslt = -1;
				for(var i=0; i < arr.length; i++){
					if(arr[i] == str){
						rslt = i;
					}
				}
				return rslt;
			}
			var except = [];
			if(settings.exceptValue != ""){
				except = settings.exceptValue.split(",");
			}
			var creatTag = "";
			$.ajax({
				url:settings.url,
				dataType:"json",
				data:settings.paramData,
				//async:false,
				success:function(data){
					if(data.count>0){
						if(settings.type == "select" && settings.firstView){
							if(chkParam == settings.firstValue){
								$("<option />", {value:settings.firstValue, text:settings.firstName}).appendTo("#"+element).attr("selected", true);
							}else{
								$("<option />", {value:settings.firstValue, text:settings.firstName}).appendTo("#"+element);
							}
						}
						var queryObj = [];
						$.each(data.list, function(index, item){
							var txt = "", val = "";
							$.each(item, function(key, value){
								if(key == settings.valueField){val = value;}
								if(key == settings.textField){txt = value;}
							});
							if(idxOf(except, val) == -1){//creatTag
								if(settings.type == "selectLayer"){
									creatTag += "<tr><th>"+val+"</th><td>"+txt+"</td></tr>";
									// creatTag += "<tr><th>"+val+"</th><td>"+val+"</td></tr>"; -> creatTag += "<tr><th>"+val+"</th><td>"+txt+"</td></tr>";
									// 2011-11-21 정채운
								}
								if(settings.type == "select"){
									if(chkParam == val){
										$("<option />", {value:val, text:txt}).appendTo("#"+element).attr("selected", true);
									}else{
										$("<option />", {value:val, text:txt}).appendTo("#"+element);
									}
								}
								if(settings.type == "checkbox" || settings.type == "radio"){
									if(settings.type == "checkbox"){
										var input = "<input type='checkbox' id='"+settings.fieldId+"["+index+"]' name='"+settings.fieldId+"' value='"+val+"'/> <label style='margin-right:10px;' for='"+settings.fieldId+"["+index+"]'>"+txt+"</label>";
									}
									else{
										var input = "<input type='radio' id='"+settings.fieldId+"_"+index+"' name='"+settings.fieldId+"' value='"+val+"'/> <label style='margin-right:10px;' for='"+settings.fieldId+"_"+index+"'>"+txt+"</label>";
									}
									$(input).appendTo("#"+element);
									if(chkParam == val){
										$("#"+settings.fieldId+"_"+index).attr("checked", true);
									}
								}
								if(settings.type == "autocomplete"){
									queryObj[index] = {label:txt, value:val};
								}
							}	
						});
						if(settings.type == "autocomplete"){
							$("#"+element).autocomplete({
								minLength: settings.minLength,
								source: queryObj,
								focus: function( event, ui ) {
									$("#"+element).val( ui.item.label );
									return false;
								},
								select: function( event, ui ) {
									$("#"+element).val( ui.item.label );
									$("#"+settings.fieldId).val( ui.item.value );
									settings.loadcompSelect(ui.item.value);
									return false;
								}
							});
						}
					}	//if(data != null){
				},	//function(data){
				complete:function(){
					var selectVal = "";
					if(settings.type == "select"){
						if($("#"+element+" option:selected").val() == ""){
							selectVal = $("#"+element+" option:eq(0)").val();
						}else{
							selectVal = $("#"+element+" option:selected").val();
						}
						if($("#"+element+" option").length < 1){
							$("<option />", {value:settings.firstValue, text:settings.firstName}).appendTo("#"+element);
						}
					}
					if(settings.type == "selectLayer"){
						self.wrap("<div id='codewrap_"+element+"' />");
						var values = settings.firstName;
						if(chkParam !== "") values = chkParam;
						var height = 0;
						if(clientBrowserName === "Explorer"){
							height = self.innerHeight() + 2;
						}else if(clientBrowserName === "FireFox"){
							height = self.innerHeight() - 1;
						}else if(clientBrowserName === "Opera"){
							height = self.innerHeight();
						}else if(clientBrowserName === "safari"){
							height = self.innerHeight() - 4;
						}else if(clientBrowserName === "chrome"){
							height = self.innerHeight() - 2;
						}else{
							height = self.innerHeight();
						}
						var btn = $("<div style='position:relative;float:left;left:-1;width:16px;height:"+height+"px;background:url(images/img/common/toolbar.expand.gif) center center no-repeat;' />")
								.css("border", "1px solid #d9d9d9")
								.css("cursor","pointer");
						var input = $("<input type='text' id='"+element+"' name='"+element+"' value='"+values+"' readOnly style='position:relative; float:left;width:"+(self.width()-16)+"px;' />")
								.css("border", "1px solid #d9d9d9")
								.css("cursor","pointer");
						self.remove();
						$("#codewrap_"+element).append(input).append(btn)
						.hover(
							function(){
								$(this).find("input").css("border", "1px solid #316AC5");
								$(this).find("div").css("border", "1px solid #316AC5");
							},
							function(){
								$(this).find("input").css("border", "1px solid #d9d9d9");
								$(this).find("div").css("border", "1px solid #d9d9d9");
							}
						)
						.click(function(event){
							if($("#codeLayer_"+element).length < 1){
								var nTag = $("<table style='width:100%;'>"
											+"<colgroup><col style='width:12%;' /><col style='width:88%;' /></colgroup>"
											+"<tbody>"+creatTag+"</tbody></table>");
								var thCss = {"padding":"7px 16px","background":"#f2f5fa","border-bottom":"1px solid #ccc","text-align":"center","color":"#3f6499","font-weight":"normal","cursor":"pointer"};
								var tdCss = {"padding":"7px 18px 7px 12px","border-bottom":"1px solid #ccc","cursor":"pointer"};
								var position = $(this).position(), top=0, left=0;
								left = position.left;
								top =  position.top + $(this).find("input").outerHeight()+1;
								var srch = $("<div id='codeLayer_"+element+"' style='top:"+top+"px;left:"+left+"px;width:"+settings.selectViewWidth+"px;height:"+settings.selectViewHeight+"px;position:absolute; border:1px solid #ccc; overflow-y:scroll; overflow-x:hidden; background:#fff; z-index:1000' />")
											.append(nTag);
								$("body").append(srch);
								$("#codeLayer_"+element+" table > tbody > tr > th").css(thCss);
								$("#codeLayer_"+element+" table > tbody > tr > td").css(tdCss);
								$("#codeLayer_"+element+" table > tbody > tr").click(function(){
									$("#"+element).val($(this).children("th").text());
									$("#codeLayer_"+element).remove();
									$("#"+element).focus();
								});
							}else{
								$("#codeLayer_"+element).remove();
							}
						});
					}
					settings.loadcomplete(selectVal);
				}
			});
			/*$.getJSON(
					settings.url,
					settings.paramData,
					function(data){
						if(data.count>0){
							if(settings.type == "select" && settings.firstView){
								if(chkParam == settings.firstValue){
									$("<option />", {value:settings.firstValue, text:settings.firstName}).appendTo("#"+element).attr("selected", true);
								}else{
									$("<option />", {value:settings.firstValue, text:settings.firstName}).appendTo("#"+element);
								}
							}
							var queryObj = [];
							$.each(data.list, function(index, item){
								var txt = "", val = "";
								$.each(item, function(key, value){
									if(key == settings.valueField){val = value;}
									if(key == settings.textField){txt = value;}
								});
								if(idxOf(except, val) == -1){//creatTag
									if(settings.type == "selectLayer"){
										creatTag += "<tr><th>"+val+"</th><td>"+txt+"</td></tr>";
										// creatTag += "<tr><th>"+val+"</th><td>"+val+"</td></tr>"; -> creatTag += "<tr><th>"+val+"</th><td>"+txt+"</td></tr>";
										// 2011-11-21 정채운
									}
									if(settings.type == "select"){
										if(chkParam == val){
											$("<option />", {value:val, text:txt}).appendTo("#"+element).attr("selected", true);
										}else{
											$("<option />", {value:val, text:txt}).appendTo("#"+element);
										}
									}
									if(settings.type == "checkbox" || settings.type == "radio"){
										if(settings.type == "checkbox"){
											var input = "<input type='checkbox' id='"+settings.fieldId+"["+index+"]' name='"+settings.fieldId+"' value='"+val+"'/> <label style='margin-right:10px;' for='"+settings.fieldId+"["+index+"]'>"+txt+"</label>";
										}
										else{
											var input = "<input type='radio' id='"+settings.fieldId+"_"+index+"' name='"+settings.fieldId+"' value='"+val+"'/> <label style='margin-right:10px;' for='"+settings.fieldId+"_"+index+"'>"+txt+"</label>";
										}
										$(input).appendTo("#"+element);
										if(chkParam == val){
											$("#"+settings.fieldId+"_"+index).attr("checked", true);
										}
									}
									if(settings.type == "autocomplete"){
										queryObj[index] = {label:txt, value:val};
									}
								}	
							});
							if(settings.type == "autocomplete"){
								$("#"+element).autocomplete({
									minLength: settings.minLength,
									source: queryObj,
									focus: function( event, ui ) {
										$("#"+element).val( ui.item.label );
										return false;
									},
									select: function( event, ui ) {
										$("#"+element).val( ui.item.label );
										$("#"+settings.fieldId).val( ui.item.value );
										settings.loadcompSelect(ui.item.value);
										return false;
									}
								});
							}
						}	//if(data != null){
					}	//function(data){
			)		//$.getJSON(
			.complete(function(){
				var selectVal = "";
				if(settings.type == "select"){
					if($("#"+element+" option:selected").val() == ""){
						selectVal = $("#"+element+" option:eq(0)").val();
					}else{
						selectVal = $("#"+element+" option:selected").val();
					}
					if($("#"+element+" option").length < 1){
						$("<option />", {value:settings.firstValue, text:settings.firstName}).appendTo("#"+element);
					}
				}
				if(settings.type == "selectLayer"){
					self.wrap("<div id='codewrap_"+element+"' />");
					var values = settings.firstName;
					if(chkParam !== "") values = chkParam;
					var height = 0;
					if(clientBrowserName === "Explorer"){
						height = self.innerHeight() + 2;
					}else if(clientBrowserName === "FireFox"){
						height = self.innerHeight() - 1;
					}else if(clientBrowserName === "Opera"){
						height = self.innerHeight();
					}else if(clientBrowserName === "safari"){
						height = self.innerHeight() - 4;
					}else if(clientBrowserName === "chrome"){
						height = self.innerHeight() - 2;
					}else{
						height = self.innerHeight();
					}
					var btn = $("<div style='position:relative;float:left;left:-1;width:16px;height:"+height+"px;background:url(images/img/common/toolbar.expand.gif) center center no-repeat;' />")
							.css("border", "1px solid #d9d9d9")
							.css("cursor","pointer");
					var input = $("<input type='text' id='"+element+"' name='"+element+"' value='"+values+"' readOnly style='position:relative; float:left;width:"+(self.width()-16)+"px;' />")
							.css("border", "1px solid #d9d9d9")
							.css("cursor","pointer");
					self.remove();
					$("#codewrap_"+element).append(input).append(btn)
					.hover(
						function(){
							$(this).find("input").css("border", "1px solid #316AC5");
							$(this).find("div").css("border", "1px solid #316AC5");
						},
						function(){
							$(this).find("input").css("border", "1px solid #d9d9d9");
							$(this).find("div").css("border", "1px solid #d9d9d9");
						}
					)
					.click(function(event){
						if($("#codeLayer_"+element).length < 1){
							var nTag = $("<table style='width:100%;'>"
										+"<colgroup><col style='width:12%;' /><col style='width:88%;' /></colgroup>"
										+"<tbody>"+creatTag+"</tbody></table>");
							var thCss = {"padding":"7px 16px","background":"#f2f5fa","border-bottom":"1px solid #ccc","text-align":"center","color":"#3f6499","font-weight":"normal","cursor":"pointer"};
							var tdCss = {"padding":"7px 18px 7px 12px","border-bottom":"1px solid #ccc","cursor":"pointer"};
							var position = $(this).position(), top=0, left=0;
							left = position.left;
							top =  position.top + $(this).find("input").outerHeight()+1;
							var srch = $("<div id='codeLayer_"+element+"' style='top:"+top+"px;left:"+left+"px;width:"+settings.selectViewWidth+"px;height:"+settings.selectViewHeight+"px;position:absolute; border:1px solid #ccc; overflow-y:scroll; overflow-x:hidden; background:#fff; z-index:1000' />")
										.append(nTag);
							$("body").append(srch);
							$("#codeLayer_"+element+" table > tbody > tr > th").css(thCss);
							$("#codeLayer_"+element+" table > tbody > tr > td").css(tdCss);
							$("#codeLayer_"+element+" table > tbody > tr").click(function(){
								$("#"+element).val($(this).children("th").text());
								$("#codeLayer_"+element).remove();
								$("#"+element).focus();
							});
						}else{
							$("#codeLayer_"+element).remove();
						}
					});
				}
				settings.loadcomplete(selectVal);
			});*/
			return this;
	}
})(jQuery);

/***************************** ETC UTIL *********************************/
(function($){
	$.blockingClick = function(options){
		var settings = {
				elementId : ""
		};
		settings = $.extend(settings, options);
		var elmArr = settings.elementId.split(",");
		for(var i=0; i < elmArr.length; i++){
			$("#"+elmArr[i]).live("click", function(){
				$("#blockingClick").css("display", "block");
				return false;
			});
		}
	},
	
	$.blockingClickClear = function(options){
		var settings = {
				id : "blockingClick"
		};
		settings = $.extend(settings, options);
		
		if($("#"+settings.id).css("display") == "block"){
			$("#"+settings.id).css("display", "none");
		}
	},

	/******************************************************************************
	*	Multi Check Box Checked All True or False 
	*	사용방법 : $(element).multiChkUtil(checkbox ID);
	*	@return :
	*******************************************************************************/
	$.fn.multiChkUtil = function(id){
		if($(this).is(":checked")){
			$("input[name="+id+"]").each(function(){
					$(this).attr("checked", "checked");
			});
		}else{
			$("input[name="+id+"]").each(function(){
				$(this).removeAttr("checked");
			});
		}
	},
	
	/******************************************************************************
	*	Multi Check Box Checked Value
	*	사용방법 : $.multiChkValue("chk", {type:"Array"});
	*	@return :
	*******************************************************************************/
	$.multiChkValue = function(id, options){
		
		var settings = {
				type : "String" // Return Value (String or Array)
		};
		settings = $.extend(settings, options);
		
		var i=0;
		var values = "", valArr = [];
		$("input[name="+id+"]").each(function(){
			if($(this).is(":checked")){
				values = values + $(this).val() + ",";
				valArr[i] = $(this).val();
				i = i+1;
			}
		});
		if(values != "" && i > 0){
			values = values.substring(0, values.length - 1);
		}
		if(settings.type == "String")
			return values;
		else
			return valArr;
	},
	
	/******************************************************************************
	*	Submit Progress
	*	사용방법 : $.fn.submitProgress(options);
	*	@return : 
	*******************************************************************************/
	$.bigProgress = function(options){
		//var progressStyle = "<div id=\"progress-modal\" title=\"Progress Message\" style=\"width:100%;background: white;\">"
		//	  + "<img src='images/img/common/loading_02.gif' border='0' title='Progress' style='float:right;margin-top:5px;margin-right:17px;'>"
		//	  + "</div>";
/*
		var settings = {
				modal : true,
				width : 290, //Width Size
				height : 90
		};
		
		settings = $.extend(settings, options);
		
		$("#dialog:ui-dialog").dialog("destroy");
		//$(progressStyle).prependTo("body");
		$("#progress-modal").hide();
		$("#progress-modal").dialog({
			width: settings.width,
			height: settings.height,
			modal: settings.modal,
			draggable: false,
			resizable: false,
			zIndex:9999
		});
		$(".ui-dialog-titlebar").hide();
*/
	},
	
	/******************************************************************************
	*	Tab Addition
	*	사용방법 : $(select).createTabs(options);
	*	@return :
	*******************************************************************************/
	$.fn.createTabs = function(options){
		var self = this,
			btnAdd = '';
		var settings = {
				onIndex : 0,
				maxLen : 4, // Max Tab
				btnAdd : true,
				btnDel : true,
				body : false,
				add : function(){}, // Tab Add for Event
				remove : function(){} //Tab Remove for Event
		};
		settings = $.extend(settings, options);
		
		if(settings.btnAdd == true){
			btnAdd = "<li id='"+self.attr('id')+"Li' class='jui-tab-add'><a href='#"+self.attr('id')+"TabAdd' title='Add Tab' class='jui-tab-icon'><span>Add Tab</span></a></li>";
			$(btnAdd).appendTo(self);
		}
		
		$.reloadBody = function(idx){
			if(settings.body == false){
				$("table[id^='"+self.attr('id')+"']").each(function(index){
					if(index != idx){$(this).hide();}
					else{$(this).show();}
				});
			}else{
				$("div[id^='"+self.attr('id')+"']").each(function(index){
					if(index != idx){$(this).hide();}
					else{$(this).show();}
				});
			}
		};
		
		$.reloadTab = function(idx){
			$("#"+self.attr('id')+" li").each(function(index){
				if(settings.btnDel == true && ($("#"+self.attr('id')+" li").length - 1) > index){
					$("<a href='#"+self.attr('id')+"Del-"+index+"' title='Delete Tab' class='jui-tab-icon'><span>Delete Tab</span></a>").appendTo(this);
					if(idx == index){
						$(this).addClass('jui-tab-on');
					}
					$(this).removeTab(index);
						
				}
				$(this).selectedTab(index);
				
			});
			$.reloadBody(idx);
			return this;
		};
		
		$.fn.selectedTab = function(idx){
			var inelt = this;
			$("a[href|='#"+self.attr('id')+"']", this).live('click', function(e){
				inelt.addClass('jui-tab-on');
				e.preventDefault();
				$("#"+self.attr('id')+" li").each(function(index){
					if(idx != index){$(this).removeClass('jui-tab-on')}
				});
				$.reloadBody(idx);
			});
			
			return this;
		};
		
		$.fn.removeTab = function(idx){
			var inelt = this;
			var on = 0;
			
			$("a[href*='#"+self.attr('id')+"Del']", this).live('click', function(e){
				e.preventDefault();
				if(($("#"+self.attr('id')+" li").length - 1) > 1){
					settings.remove(idx);
					if(inelt.attr('class') == "jui-tab-on"){
						on = 1;
					}
					inelt.remove();
					if(on == 1){$("#"+self.attr('id')+" li:eq(0)").addClass('jui-tab-on');}
				}
			});
			return this;
		};
		
		
		$("#"+self.attr('id')+"Li").live('click', function(e){
			e.preventDefault();
			var len = $("#"+self.attr('id')+" li").length - 1;
			if(len >= settings.maxLen){return false;}
			var li = "<li><a href='#"+self.attr('id')+"-"+len+"' title='New Tab"+len+"'>New Tab</a></li>";
			if(settings.btnDel == true){
				li = "<li><a href='#"+self.attr('id')+"-"+len+"' title='New Tab"+len+"'>New Tab</a><a href='#"+self.attr('id')+"Del-"+len+"' title='Delete Tab' class='jui-tab-icon'><span>Delete Tab</span></a></li>";
			}
			settings.add(len);
			$.reloadBody(len);

			var $curr = $(this).before(li).prev();
			$curr.find("a[href*='#"+self.attr('id')+"-']").click(function(e){
				e.preventDefault();
				$("#"+self.attr('id')+" li").each(function(index){
					if(len == index){$(this).addClass('jui-tab-on');}
					else{$(this).removeClass('jui-tab-on');}
				});
				$.reloadBody(len);
			});
			$curr.find("a[href*='#"+self.attr('id')+"Del']").click(function(e){
				e.preventDefault();
				var on = 0;
				if(($("#"+self.attr('id')+" li").length - 1) > 1){
					settings.remove(len);
					if($curr.attr('class') == "jui-tab-on"){
						on = 1;
					}
					$curr.remove();
					if(on == 1){
						$("#"+self.attr('id')+" li:eq(0)").addClass('jui-tab-on');
						$.reloadBody(0);
					}
				}
			});
			
			
			$("#"+self.attr('id')+" li").each(function(index){
				
				if(len == index){
					$(this).addClass('jui-tab-on');
				}else{
					$(this).removeClass('jui-tab-on');
				}
				
			});
			
		});
		
		$.reloadTab(0);
		
		return this;
	}
})(jQuery);

(function($){
	
	$.fn.createButton = function(options){
		
		var settings = {
				disabled : false, // button disabled
				id : "", // element ID
				name : "button", // Button Name
				use : "default", // Button Use (default:'', save:gear, del:trash, register:pencil, update:wrench, user-define:?)
				icon : null
		};
		settings = $.extend(settings, options);
		var use = "";
		if(settings.use == "save") // 저장
			use = "gear";
		else if(settings.use == "del") // 삭제
			use = "trash";
		else if(settings.use == "download") // 다운로드
			use = "disk";
		else if(settings.use == "split") // Split
			use = "triangle-1-s";
		else
			use = settings.icon;
		
		$("<button type='button'></button>").appendTo($(this))
							.text(settings.name)
							.attr("id", settings.id)
							.css("margin-right", "5px");
		
		if(settings.use == "default"){
			$("#"+settings.id).button();
		}else{
			$("#"+settings.id).button({
				icons: {
	                primary: "ui-icon-"+use
	            },
	            disabled : settings.disabled
			});
		}
	},
	
	$.dbHandleButton = function(element, btn){
		$.each(btn, function(key, value){
			var options = {
					use : key,
					id : "",
					name : "",
					disabled : false
			};
			options = $.extend(options, value);
			$(element).createButton(options);
		});
	}
	
})(jQuery);

/***************************** FCK Editor *********************************/
(function($){
	/******************************************************************************
	*	FCK Editor Creator
	*	사용방법 : $(selector).fckEditor(options);
	*	@return :
	*******************************************************************************/
	$.fn.fckEditor = function(options){
		var settings = {
			skin : 'silver', //default:'', silver:'silver', office2003:'office2003'
			basePath : '',
			language : 'en',
			height : 280
		};
		settings = $.extend(settings, options);
		if(settings.basePath == ''){
			alert("please basePath Option !");
			return false;
		}
		var createId = $(this).attr("id");
		var oFCKeditor = new FCKeditor(createId);
		oFCKeditor.BasePath = settings.basePath;
		oFCKeditor.Height = settings.height;
		oFCKeditor.Config["EnterMode"]			= "br";
		oFCKeditor.Config["ShiftEnterMode"]		= "p";
		oFCKeditor.Config["AutoDetectLanguage"] = false;
		oFCKeditor.Config["DefaultLanguage"]    = settings.language;
		
		if(settings.skin != ''){
			var sSkinPath = settings.basePath+'editor/skins/' + settings.skin + '/';
			oFCKeditor.Config['SkinPath'] = sSkinPath;
			
			switch ( settings.skin )
			{
				case 'office2003' :
					oFCKeditor.Config['PreloadImages'] =
						sSkinPath + 'images/toolbar.start.gif' + ';' +
						sSkinPath + 'images/toolbar.end.gif' + ';' +
						sSkinPath + 'images/toolbar.bg.gif' + ';' +
						sSkinPath + 'images/toolbar.buttonarrow.gif' ;
					break ;

				case 'silver' :
					oFCKeditor.Config['PreloadImages'] =
						sSkinPath + 'images/toolbar.start.gif' + ';' +
						sSkinPath + 'images/toolbar.end.gif' + ';' +
						sSkinPath + 'images/toolbar.buttonbg.gif' + ';' +
						sSkinPath + 'images/toolbar.buttonarrow.gif' ;
					break ;
			}
		}

		oFCKeditor.ReplaceTextarea();
		var xEditor = createId+"___Frame"; 
		return xEditor;
	};
	
	/******************************************************************************
	*	FCK Editor Instance
	*	사용방법 : $.getFCKEditHtml(FCK ID);
	*	@return :
	*******************************************************************************/
	$.getFCKEditHtml = function(fckId){
		var XHTML = "";
		var iLen = $("#"+fckId).contents().find("#xEditingArea iframe").length;
		var Instance = $("#"+fckId).contents().find("#xEditingArea iframe");
		
		if(iLen > 0){XHTML =  $("#"+fckId).contents().find("#xEditingArea iframe").contents().find("body").html();}
		else{XHTML =  $("#"+fckId).contents().find("#xEditingArea textarea").val();}
		
		return {getXHTML:XHTML, getInstance:Instance};
	}

})(jQuery);
/***************************** FILE UTIL *********************************/
(function($){
	$.fileDownloads = function(options){
		var settings = {
				url : "",
				key : "",
				fileLink:"",
				downloadFileName:"",
				downloadLocation:""
		};
		settings = $.extend(settings, options);
		if($("div#fileDownIfm").length < 1){
			$("body").append("<div id='fileDownIfm' style='position:absolute;top:-1000px;left:-1000px;' />");	
			var iframe = $("<iframe name='tmpDownIfm' id='tmpDownIfm' src='about:none' />");
			$('div#fileDownIfm').append( iframe );
		}
		var url = settings.url;
		if( settings.url == "" && settings.fileLink != "" ){
			url = "/ecom/downloadFile.jsp?downLoadName="+settings.fileLink;
		}
		var tmpFrm = $("<form />").attr({'id':'tempDownFrm', 'name':'tempDownFrm', 'action': url, 'method':'POST', 'target':'tmpDownIfm'})
			.append("<input type='hidden' name='key' id='key' value='"+settings.key+"' />");
		if(settings.downloadLocation ){
			tmpFrm.append("<input type='hidden' name='downloadLocation' id='downloadLocation' value='"+settings.downloadLocation+"' />");
			tmpFrm.append("<input type='hidden' name='downloadFileName' id='downloadLocation' value='"+settings.downloadFileName+"' />");
		}
		$("body").append(tmpFrm);
		tmpFrm.submit();
	},
	
	$.fn.fileUploads = function(options){
		var self = this,
			selfId = self.attr("id");
		var settings = {
			url : "",
			module : "COM", //com, tmp
			fileName : "",
			fileKey : "",
			fileSize : 5000000,
			buttonText : "Find",
			buttonClass : "btn_table",
			icon : "images/common/icon-",
			delText : "Del",
			delImage : "images/common/bg-btn_del_on.gif",
			delMsg : "Are you sure you want to delete?",
			errorMsg : "File Uploaded Error",		
			progressImage : "",
			imageButtonOnly : false,
			buttonImage : ""
		};
		settings = $.extend(settings, options);
		self.wrap("<div id='fileInput_"+selfId+"' style='position:relative'/>");
		$("#fileInput_"+selfId).after("<ul class='file_list'/>");
		var w = self.width(),
			h = self.outerHeight();
			if(h < 18){h=20;}	
		var fakeDiv = $("<div />").css({'width':w,'height':h})	
					.append("<input type='text' id='fake_"+selfId+"' name='fake_"+selfId+"' style='width: 124px' readonly />")
					.append("<button id='send_"+selfId+"' class='"+settings.buttonClass+"' style='cursor: none;padding:0pt 20px' />");
		self.before(fakeDiv);
		if(!settings.imageButtonOnly){
			$("#send_"+selfId).text(settings.buttonText);
		}else{
					
		}	
		$("#fake_"+selfId).css("width",(w-($("#send_"+selfId).outerWidth(true)+10))+"px");	
		
		var cssOpt = {'filter':'alpha(opacity=0)','opacity':'0', '-moz-opacity':'0'};
		self.css(cssOpt);
		
		if($("#fileIfm").length < 1){
			$("body").append("<div id='fileIfm' style='position:absolute;top:-1000px;left:-1000px;' />");
		}	
		if($("#tmpIfrm_"+selfId).length < 1){	
			var iframe = $("<iframe name='tmpIfrm_"+selfId+"' id='tmpIfrm_"+selfId+"' src='about:none' />");
			$('div#fileIfm').append( iframe );
		}
		
		$("#send_"+selfId).click(function(){
			//$("#"+selfId).trigger("click");
			return false;
		});
		$("body").delegate("#"+selfId, 'click', function(event){
			var $inSelf = $(event.target);
			
			$inSelf.one("change", function(){
				
				var file = $(this).val(),
					fs = 0;
				file = file.replace(/\\/g, "/");
				//alert($(this)[0].files[0].size);
				var fileNm = file.substring((file.lastIndexOf("/")+1));
				
				$("#fake_"+selfId).val($(this).val());
				$("#send_"+selfId).hide();
				$("#fake_"+selfId).parent("div").css("background", "url('images/ui-anim_basic_16x16.gif') right center no-repeat");
				
				var frmPrvOpt = {};
				frmPrvOpt.action = $inSelf.parents("form").attr("action");
				frmPrvOpt.method = $inSelf.parents("form").attr("method");
				var v = $inSelf.parents("form").attr("target");
				if(typeof v == 'undefined'){
					frmPrvOpt.target = "_self";
				}else{
					frmPrvOpt.target = self.parents("form").attr("target");
				}
					
				var sUrl = settings.url+"?module="+settings.module;
				var frmOpt = {'action':sUrl,				
							'MAX_FILE_SIZE':settings.fileSize,
							'encoding':'multipart/form-data',
							'enctype':'multipart/form-data',
							'method':'POST',
							'target':"tmpIfrm_"+selfId};
				$inSelf.parents("form").attr(frmOpt);
				$inSelf.parents("form").append("<input type='hidden' name='f_cmd' value='1' />");
				$inSelf.parents("form").submit();
				$("#tmpIfrm_"+selfId).load(function(){
					var rsltBody = $("#tmpIfrm_"+selfId).contents().find("body").text();
					var obj = jQuery.parseJSON(rsltBody);
					
					
					
					if(obj.RESULT == "OK"){
						var fk = obj.fileKey;
						fk = fk.replace("[","");
						fk = fk.replace("]","");
						
						icon = "attachedfile";
						
						
						// 디자이너 요청으로 인하여 하나의 이미지로 통일 (2015.01.09 Gabin KIM)
						
					/*  
					   var idx = fk.lastIndexOf("."),
							type = fk.substring(idx+1),
							icon = "text";
							type = type.toLowerCase();
						if(type == "doc" || type == "docx"){
							icon = "word";
						}else if(type == "xls" || type == "xlsx"){
							icon = "excel";
						}else if(type == "gif" || type == "jpg" || type == "jpeg" || type == "png"){
							icon = "jpg";
						}else if(type == "hwp"){
							icon = "ko";
						}else if(type == "pdf"){
							icon = "pdf";
						}else if(type == "ppt"){
							icon = "ppt";
						}else if(type == "zip"){
							icon = "file";
						}
					*/
						
						var fileNames = $("#"+settings.fileName).val(),
						fileKeys =  $("#"+settings.fileKey).val();
						var newLi = $("<li id='"+fk+"' />").css("background", "url('"+settings.icon+icon+".gif') left center no-repeat")
									.css("padding-left", "20px")
									.text(fileNm)
									.append("<a href='#' title='"+settings.delText+"'><img src='"+settings.delImage+"' alt='"+settings.delText+"' style='vertical-align:middle;margin-left:5px;'></a>")
									.click(function(event){
										var cSelf = $(this);
										event.preventDefault();
										$.confirmDialog(settings.delMsg+" ("+$(this).text()+")", {
											confirm : function(){
												var delParam = {delFile:cSelf.attr("id"),module:settings.module};
												$.post("FileDelete.do",delParam);
												
												var fnArr = fileNames.split(","),
												fkArr = fileKeys.split(","),
												len = fkArr.length,
												nfna = "",
												nfka = "";
												for(var i=0; i < len; i++){
													if(cSelf.attr("id") != fkArr[i]){
														if(len > (i+1)){
															nfna = nfna+fnArr[i]+",";
															nfka = nfka+fkArr[i]+",";
														}else{
															nfna = nfna+fnArr[i];
															nfka = nfka+fkArr[i];
														}
													}
												}
												$("#"+settings.fileName).val(nfna);
												$("#"+settings.fileKey).val(nfka);
												cSelf.remove();
												
												if($("#fileInput_"+selfId).next("ul").children().length == 0) {
													$("#fileInput_"+selfId).next("ul").hide();
													$("#fileInput_"+selfId).css("padding-top",0);
												}
											}
										});
										
									});
						$("#fileInput_"+selfId).css("padding-top","5px").next("ul").append(newLi).show();
						
						if(fileKeys != ""){
							$("#"+settings.fileName).val(fileNames+","+fileNm);
							$("#"+settings.fileKey).val(fileKeys+","+fk);
						}else{
							$("#"+settings.fileName).val(fileNm);
							$("#"+settings.fileKey).val(fk);
						}
						if( settings.uploadComplete){
							settings.uploadComplete.call();
						}						
					}else{
						$.alertDialog(settings.errorMsg, {
							close : function(){
								$(".popup_mask").hide();
								$("#fake_"+selfId).parent("div").css("background", "");
								$("#fake_"+selfId).val("");
								$("#send_"+selfId).show();
								$("#tmpIfrm_"+selfId).remove();	
								var iframe = $("<iframe name='tmpIfrm_"+selfId+"' id='tmpIfrm_"+selfId+"' src='about:none' />");
								$('div#fileIfm').append( iframe );
								$inSelf.parents("form").attr(frmPrvOpt);
								if($.browser.msie){
									$inSelf.replaceWith($inSelf.clone(true));
								}else{
									$inSelf.val("");
								}
							}
						});
					}
					$("#fake_"+selfId).parent("div").css("background", "");
					$("#fake_"+selfId).val("");
					$("#send_"+selfId).show();
					$("#tmpIfrm_"+selfId).remove();	
					var iframe = $("<iframe name='tmpIfrm_"+selfId+"' id='tmpIfrm_"+selfId+"' src='about:none' />");
					$('div#fileIfm').append( iframe );
					$inSelf.parents("form").attr(frmPrvOpt);
					
					if($.browser.msie){
						$inSelf.replaceWith($inSelf.clone(true));
						
					}else{
						$inSelf.val("");
					}
				});
					
			});
			
			//alert(event.type);
		});
	},
	$.replaceAll=function(str, orgVal, newVal){
		return str.split(orgVal).join(newVal);
	},
	$.fn.fileExcelUploads = function(options){
		var self = this,
			selfId = self.attr("id");

		var settings = {
			url : "",
			module : "EXL", //com, tmp
			fileName : "",
			fileKey : "",
			fileSize : 5000000,
			buttonText : "Find",
			buttonClass : "btn_table",
			icon : "images/common/icon-",
			delText : "Del",
			delImage : "images/common/bg-btn_del_on.gif",
			delMsg : "Are you sure you want to delete?",
			errorMsg : "File Uploaded Error",		
			progressImage : "",
			imageButtonOnly : false,
			buttonImage : "",
			startRowIdx : ""
		};
		settings = $.extend(settings, options);
		self.wrap("<div id='fileInput_"+selfId+"' style='position:relative'/>");
		$("#fileInput_"+selfId).after("<ul class='file_list'/>");
		var w = self.width(),
			h = self.outerHeight();
			if(h < 18){h=20;}	
		var fakeDiv = $("<div />").css({'width':w,'height':h})	
					.append("<input type='text' id='fake_"+selfId+"' name='fake_"+selfId+"' style='width: 124px' class='"+settings.inputClass+"' readOnly />")
					.append("<button id='send_"+selfId+"' class='"+settings.buttonClass+"' style='cursor: none;padding:0pt 20px' />");
		self.before(fakeDiv);
		if(!settings.imageButtonOnly){
			$("#send_"+selfId).text(settings.buttonText);
		}else{
					
		}	
		$("#fake_"+selfId).css("width",(w-($("#send_"+selfId).outerWidth(true)+10))+"px");	
		
		var cssOpt = {'filter':'alpha(opacity=0)','opacity':'0', '-moz-opacity':'0'};
		self.css(cssOpt);
		
		if($("#fileIfm").length < 1){
			$("body").append("<div id='fileIfm' style='position:absolute;top:-1000px;left:-1000px;' />");
		}	
		if($("#tmpIfrm_"+selfId).length < 1){	
			var iframe = $("<iframe name='tmpIfrm_"+selfId+"' id='tmpIfrm_"+selfId+"' src='about:none' />");
			$('div#fileIfm').append( iframe );
		}
		
		$("#send_"+selfId).click(function(){
			//$("#"+selfId).trigger("click");
			return false;
		});
		$("body").delegate("#"+selfId, 'click', function(event){
			var $inSelf = $(event.target);
			
			$inSelf.one("change", function(){
				//check the file whether the selected file's ext is '.xlst' or not
				var fileVal = $("#"+selfId).val();
				fileVal = fileVal.slice(fileVal.indexOf(".") + 1).toLowerCase();
				
				if(fileVal != 'xls' && fileVal != 'xlsx'){
					alert("The file extension, '.xlsx' or '.xls' can be uploaded.\nPlease select the Excel file.");
					return false;
				}
				
				var file = $(this).val(),
					fs = 0;
				file = file.replace(/\\/g, "/");
				//alert($(this)[0].files[0].size);
				var fileNm = file.substring((file.lastIndexOf("/")+1));
				
				$("#fake_"+selfId).val($(this).val());
				$("#send_"+selfId).hide();
				$("#fake_"+selfId).parent("div").css("background", "url('images/ui-anim_basic_16x16.gif') right center no-repeat");
				
				var frmPrvOpt = {};
				frmPrvOpt.action = $inSelf.parents("form").attr("action");
				frmPrvOpt.method = $inSelf.parents("form").attr("method");
				var v = $inSelf.parents("form").attr("target");
				if(typeof v == 'undefined'){
					frmPrvOpt.target = "_self";
				}else{
					frmPrvOpt.target = self.parents("form").attr("target");
				}
				
				var sUrl = settings.url+"?module="+settings.module+"&startRowIdx="+settings.startRowIdx;
				var frmOpt = {'action':sUrl,				
							'MAX_FILE_SIZE':settings.fileSize,
							'encoding':'multipart/form-data',
							'enctype':'multipart/form-data',
							'method':'POST',
							'target':"tmpIfrm_"+selfId};
				$inSelf.parents("form").attr(frmOpt);
				$inSelf.parents("form").append("<input type='hidden' name='f_cmd' value='1' />");
				$inSelf.parents("form").submit();
				$("#tmpIfrm_"+selfId).load(function(){
					var rsltBody = $("#tmpIfrm_"+selfId).contents().find("body").text();
					var obj = jQuery.parseJSON(rsltBody);
					
					if(obj.errorMsg){
						
						alert(obj.errorMsg);
						$("#fake_"+selfId).parent("div").css("background", "");
						$("#fake_"+selfId).val("");
						$("#send_"+selfId).show();
						$("#tmpIfrm_"+selfId).remove();	
						var iframe = $("<iframe name='tmpIfrm_"+selfId+"' id='tmpIfrm_"+selfId+"' src='about:none' />");
						$('div#fileIfm').append( iframe );
						$inSelf.parents("form").attr(frmPrvOpt);
						
						if($.browser.msie){
							$inSelf.replaceWith($inSelf.clone(true));
							
						}else{
							$inSelf.val("");
						}
						return false;
					}else{
						
						if(obj.RESULT == "OK"){
							var fk = obj.fileKey;
							fk = fk.replace("[","");
							fk = fk.replace("]","");
							
							var lj=obj.listJson;
							
							lj=$.replaceAll(lj, '"','');	//replace double quot to blank
							lj=$.replaceAll(lj,"'",'"');	//replace single quot to double quote 
							lj=$.replaceAll(lj, "@squot@","'");	//replace @squot@ to single quote
							lj=$.replaceAll(lj, "@dquot@",'\\"');	//replace @squot@ to \"
							
							var idx = fk.lastIndexOf("."),
								type = fk.substring(idx+1),
								icon = "attachedfile";
								type = type.toLowerCase();
							
								
							var fileNames = $("#"+settings.fileName).val(),
							fileKeys =  $("#"+settings.fileKey).val();
							var newLi = $("<li id='"+fk+"' />").css("background", "url('"+settings.icon+icon+".gif') left center no-repeat")
										.css("padding-left", "20px")
										.text(fileNm)
										.append("<a href='#' title='"+settings.delText+"'><img src='"+settings.delImage+"' alt='"+settings.delText+"' style='vertical-align:middle;margin-left:5px;'></a>")
										.click(function(event){
											var cSelf = $(this);
											event.preventDefault();
											$.confirmDialog(settings.delMsg+" ("+$(this).text()+")", {
												confirm : function(){
													var delParam = {delFile:cSelf.attr("id"),module:settings.module};
													$.post("FileDelete.do",delParam);
													
													var fnArr = fileNames.split(","),
													fkArr = fileKeys.split(","),
													len = fkArr.length,
													nfna = "",
													nfka = "";
													for(var i=0; i < len; i++){
														if(cSelf.attr("id") != fkArr[i]){
															if(len > (i+1)){
																nfna = nfna+fnArr[i]+",";
																nfka = nfka+fkArr[i]+",";
															}else{
																nfna = nfna+fnArr[i];
																nfka = nfka+fkArr[i];
															}
														}
													}
													$("#"+settings.fileName).val(nfna);
													$("#"+settings.fileKey).val(nfka);
													cSelf.remove();
													
													if($("#fileInput_"+selfId).next("ul").children().length == 0) {
														$("#fileInput_"+selfId).next("ul").hide();
														$("#fileInput_"+selfId).css("padding-top",0);
													}
												}
											});
											
										});
							
							$("#fileInput_"+selfId).css("padding-top","5px").next("ul").append(newLi);
							if(fileKeys != ""){
								$("#"+settings.fileName).val(fileNames+","+fileNm);
								$("#"+settings.fileKey).val(fileKeys+","+fk);
								$("#"+settings.listJson).val(lj);
							}else{
								$("#"+settings.fileName).val(fileNm);
								$("#"+settings.fileKey).val(fk);
								$("#"+settings.listJson).val(lj);
							}
							
							if( settings.uploadComplete){
								settings.uploadComplete.call();
							}						
						}else{
							$.alertDialog(settings.errorMsg, {
								close : function(){
									$(".popup_mask").hide();
									$("#fake_"+selfId).parent("div").css("background", "");
									$("#fake_"+selfId).val("");
									$("#send_"+selfId).show();
									$("#tmpIfrm_"+selfId).remove();	
									var iframe = $("<iframe name='tmpIfrm_"+selfId+"' id='tmpIfrm_"+selfId+"' src='about:none' />");
									$('div#fileIfm').append( iframe );
									$inSelf.parents("form").attr(frmPrvOpt);
									if($.browser.msie){
										$inSelf.replaceWith($inSelf.clone(true));
									}else{
										$inSelf.val("");
									}
								}
							});
						}
						$("#fake_"+selfId).parent("div").css("background", "");
						$("#fake_"+selfId).val("");
						$("#send_"+selfId).show();
						$("#tmpIfrm_"+selfId).remove();	
						var iframe = $("<iframe name='tmpIfrm_"+selfId+"' id='tmpIfrm_"+selfId+"' src='about:none' />");
						$('div#fileIfm').append( iframe );
						$inSelf.parents("form").attr(frmPrvOpt);
						
						if($.browser.msie){
							$inSelf.replaceWith($inSelf.clone(true));
							
						}else{
							$inSelf.val("");
						}
					}
				});
					
			});
			
			//alert(event.type);
		});
	},
	
	$.fn.downloadJsonForExcel = function(options){
		var self = this,
			excelData = "<table border='1' cellpadding='0' cellspacing='0'>";
		var settings = {
				dataType : "db", //db or grid
				url : "",
				paramData : {},
				excelColumn : {},
				dataColumn : [],
				alignColumn : [],
				startIndex : 0,
				downloadName : "",
				combinedColumn : [],//형식 : 대상컬럼_병합컬럼_(생략가능 : 감쌀 괄호, 구분자 _, e.g : {_}, [_] )] example : ["a-b-[-]", "c-d-(-)"]
				addTxtColor:[],	// 형식 : 대상컬럼_값_시작태그_종료태그 example : ["a_C_<font color='red'>_</font>","b_D_<font color='blue'>_</font>"]
				footerHtml : ""
		};
		settings = $.extend(settings, options);
		
		var title =settings.excelColumn, th = "", colspan = "", rowspan = "";
		
		var combinedColumn = settings.combinedColumn;
		
		$.each(title.titleColumn, function(index, item){
			var f="", r="", c="", e="";
			if(item.colSpan > 0){
				c = "colspan='"+item.colSpan+"'";
			}
			if(item.rowSpan > 0){
				r = "rowspan='"+item.rowSpan+"'";
			}
			if(item.line){
				if(item.line.indexOf("S")!=-1){
					f = "<tr>";
				}
				if(item.line.indexOf("E")!=-1){
					e = "</tr>";
				}
			}
			
			th = f+"<th "+c+" "+r+">"+item.columnName+"</th>"+e;
			excelData += th;
		});
		$(".popup_mask").addClass("progress");
		setTimeout(function(){
			if(settings.dataType == "db"){
				$.getJSON(
						settings.url,
						settings.paramData,
						function(data){
							if(data.count>0){
								
								$.each(data.list, function(index, item){
									var dataStr = "<tr>";
									for(var i=0; i < settings.dataColumn.length; i++){
										$.each(item, function(key, value){
											if(settings.dataColumn[i] == key){
												var startTag="";
												var endTag="";
												
												var alignText = "";
												if(  settings.alignColumn && settings.alignColumn[i] && settings.alignColumn[i] != ""  ){
													alignText =  "class=\""+settings.alignColumn[i]+"\"";
												}
												if(combinedColumn && combinedColumn.length>0){
													for(var j=0;j<combinedColumn.length;j++){
														if(combinedColumn[j]){
															var combinedCol = combinedColumn[j].split("_");
															if(combinedCol[0]==key){
																var tgtCol = combinedCol[1];
																var comVal = item[tgtCol];
																var addTxtColorColumn = settings.addTxtColorColumn;
																if(addTxtColorColumn && addTxtColorColumn.length>0){
																	for(var k=0;k<addTxtColorColumn.length;k++){
																		var splitVals=addTxtColorColumn[k].split("_");
																		if(splitVals[0]==tgtCol){
																			if(comVal==splitVals[1]){
																				startTag=splitVals[2];
																				endTag=splitVals[3];
																			}else{
																				startTag="";
																				endTag="";
																			}
																			break;
																		}
																	}
																}
																var tmpVal = "";
																if(combinedCol[2] && combinedCol[3]){
																	tmpVal = combinedCol[2]+comVal+combinedCol[3]+" "+value;
																}else{
																	tmpVal = comVal+" "+value;
																}
																value = tmpVal;
																break;
															}
														}else{
															continue;
														}
													}
												}else{
													var addTxtColorColumn = settings.addTxtColorColumn;
													if(addTxtColorColumn && addTxtColorColumn.length>0){
														for(var k=0;k<addTxtColorColumn.length;k++){
															var splitVals=addTxtColorColumn[k].split("_");
															if(splitVals[0]==key){
																if(value==splitVals[1]){
																	startTag=splitVals[2];
																	endTag=splitVals[3];
																}else{
																	startTag="";
																	endTag="";
																}
																break;
															}
														}
													}
												}
												dataStr = dataStr+"<td "+ alignText +" >"+startTag+value+endTag+"</td>"; 											
											}
										});
									}
									dataStr = dataStr+"</tr>";
									excelData += dataStr;
								});
							}else{
								
							}
							excelData += "</table>";
							
							var footerHtml = settings.footerHtml;
							if(footerHtml){
								excelData+="<table border='0' cellpadding='0' cellspacing='0'>";
								excelData+="<tr><td colspan='"+(settings.dataColumn.length?settings.dataColumn.length:1)+"'>&nbsp;</td></tr>";
								excelData+="<tr><td colspan='"+(settings.dataColumn.length?settings.dataColumn.length:1)+"'>"+footerHtml+"</td></tr>";
								excelData+="</table>";
							}
						}
				)
				.complete(function(){
					if($("div#fileDownIfm").length < 1){
						$("body").append("<div id='fileDownIfm' style='position:absolute;top:-1000px;left:-1000px;'/>");	
						var iframe = $("<iframe name='tmpDownIfm' id='tmpDownIfm' src='about:none' />");
						$('div#fileDownIfm').append( iframe );
					}
					var tmpFrm = $("<form />").attr({'id':'tempDownFrm', 'name':'tempDownFrm', 'action':'excelDownload.jsp', 'method':'POST', 'target':'tmpDownIfm'})
					.append("<input type='hidden' name='excelData' id='excelData' />")
					.append("<input type='hidden' name='downLoadName' id='downLoadName' />");
					$("body").append(tmpFrm);
					$("#excelData").val(excelData);
					$("#downLoadName").val(settings.downloadName);
					$("#tempDownFrm").submit();
					$.blockingClickClear();	
					$(".popup_mask").removeClass("progress");
				});
			} else if(settings.dataType == "grid"){
				if($("#"+settings.target+" tr").length > 1){
					$("#"+settings.target+" tr").each(function(index){
						if(index > 0){
							var dataStr = "<tr>";
							$(this).children("td").each(function(idx){
								if(settings.dataColumn.length > 0){
									for(var i=0; i < settings.dataColumn.length; i++){
										if($(this).attr("aria-describedby") == settings.target+"_"+settings.dataColumn[i]){
											var alignText = "";
											if(  settings.alignColumn && settings.alignColumn[i] && settings.alignColumn[i] != ""  ){
												alignText =  "class=\""+settings.alignColumn[i]+"\"";
											} 										
											dataStr = dataStr+"<td "+ alignText +" >"+($(this).attr("title")?$(this).attr("title"):"")+"</td>";
											
										}
									}
								}else{
									if($(this).attr("aria-describedby") != settings.target+"_cb"){
										dataStr = dataStr+"<td>"+$(this).attr("title")+"</td>";
									}
								}	
							});
							dataStr = dataStr+"</tr>";
							excelData += dataStr;
						}
					});
					excelData += "</table>";
					var footerHtml = settings.footerHtml;
					if(footerHtml){
						excelData+="<table border='0' cellpadding='0' cellspacing='0'>";
						excelData+="<tr><td colspan='"+(settings.dataColumn.length?settings.dataColumn.length:1)+"'>&nbsp;</td></tr>";
						excelData+="<tr><td colspan='"+(settings.dataColumn.length?settings.dataColumn.length:1)+"'>"+footerHtml+"</td></tr>";
						excelData+="</table>";
					}
					if($("div#fileDownIfm").length < 1){
						$("body").append("<div id='fileDownIfm' style='position:absolute;top:-1000px;left:-1000px;'/>");	
						var iframe = $("<iframe name='tmpDownIfm' id='tmpDownIfm' src='about:none' />");
						$('div#fileDownIfm').append( iframe );
					}
					var tmpFrm = $("<form />").attr({'id':'tempDownFrm', 'name':'tempDownFrm', 'action':'excelDownload.jsp', 'method':'POST', 'target':'tmpDownIfm'})
					.append("<input type='hidden' name='excelData' id='excelData' />")
					.append("<input type='hidden' name='downLoadName' id='downLoadName' />");
					$("body").append(tmpFrm);
					//console.log(excelData);
					$("#excelData").val(excelData);
					$("#downLoadName").val(settings.downloadName);
					$("#tempDownFrm").submit();
					$.blockingClickClear();	
					$(".popup_mask").removeClass("progress");
				}
			} else if(settings.dataType == "paging"){
				setAllDataForDownload(settings.paramData, settings.url, (!settings.dataScope?1000:settings.dataScope));
				
				var dataList = excelDownDataList;
				if(dataList.length>0){
					for(var i=0;i<dataList.length;i++){
						var dataObj = dataList[i];
						var dataStr = "\t<tr>";
						//Column setting
						for(var j=0; j < settings.dataColumn.length; j++){
							for(var key in dataObj ){
								if(settings.dataColumn[j] == key){
									var value=dataObj[key];
									var startTag="";
									var endTag="";
									
									var alignText = "";
									if(  settings.alignColumn && settings.alignColumn[j] && settings.alignColumn[j] != ""  ){
										alignText =  "class=\""+settings.alignColumn[j]+"\"";
									}
									if(combinedColumn && combinedColumn.length>0){
										for(var k=0;k<combinedColumn.length;k++){
											if(combinedColumn[k]){
												var combinedCol = combinedColumn[k].split("_");
												if(combinedCol[0]==key){
													var tgtCol = combinedCol[1];
													var comVal = item[tgtCol];
													var addTxtColorColumn = settings.addTxtColorColumn;
													if(addTxtColorColumn && addTxtColorColumn.length>0){
														for(var l=0;l<addTxtColorColumn.length;l++){
															var splitVals=addTxtColorColumn[l].split("_");
															if(splitVals[0]==tgtCol){
																if(comVal==splitVals[1]){
																	startTag=splitVals[2];
																	endTag=splitVals[3];
																}else{
																	startTag="";
																	endTag="";
																}
																break;
															}
														}
													}
													var tmpVal = "";
													if(combinedCol[2] && combinedCol[3]){
														tmpVal = combinedCol[2]+comVal+combinedCol[3]+" "+value;
													}else{
														tmpVal = comVal+" "+value;
													}
													value = tmpVal;
													break;
												}
											}else{
												continue;
											}
										}
									}else{
										var addTxtColorColumn = settings.addTxtColorColumn;
										if(addTxtColorColumn && addTxtColorColumn.length>0){
											for(var k=0;k<addTxtColorColumn.length;k++){
												var splitVals=addTxtColorColumn[k].split("_");
												if(splitVals[0]==key){
													if(value==splitVals[1]){
														startTag=splitVals[2];
														endTag=splitVals[3];
													}else{
														startTag="";
														endTag="";
													}
													break;
												}
											}
										}
									}
									dataStr = dataStr+"\t\t<td "+ alignText +" >"+startTag+value+endTag+"</td>\n"; 		
									break;
								}
							}
						}
						
						dataStr = dataStr+"\t</tr>\n";
						excelData += dataStr;
					}
				}else{
					$.alertDialog("There is no data.");
					return false;
				}
				excelData += "</table>";
				var footerHtml = settings.footerHtml;
				if(footerHtml){
					excelData+="<table border='0' cellpadding='0' cellspacing='0'>\n";
					excelData+="\t<tr>\n";
					excelData+="\t\t<td colspan='"+(settings.dataColumn.length?settings.dataColumn.length:1)+"'>&nbsp;</td>\n";
					excelData+="\t</tr>\n";
					excelData+="\t\t<tr>\n";
					excelData+="\t\t<td colspan='"+(settings.dataColumn.length?settings.dataColumn.length:1)+"'>"+footerHtml+"</td>\n";
					excelData+="\t</tr>\n";
					excelData+="</table>\n";
				}
				if($("div#fileDownIfm").length < 1){
					$("body").append("<div id='fileDownIfm' style='position:absolute;top:-1000px;left:-1000px;'/>");
					var iframe = $("<iframe name='tmpDownIfm' id='tmpDownIfm' src='about:none' />");
					$('div#fileDownIfm').append( iframe );
				}
				var tmpFrm = $("<form />").attr({'id':'tempDownFrm', 'name':'tempDownFrm', 'action':'excelDownload.jsp', 'method':'POST', 'target':'tmpDownIfm'})
				.append("<input type='hidden' name='excelData' id='excelData' />")
				.append("<input type='hidden' name='downLoadName' id='downLoadName' />");
				$("body").append(tmpFrm);
				$("#excelData").val(excelData);
				$("#downLoadName").val(settings.downloadName);
				$("#tempDownFrm").submit();
				$(".popup_mask").removeClass("progress");
				$.blockingClickClear();	
			}else if(settings.dataType == "local"){
				var data=settings.localData;
				if(data.count>0){
					
					$.each(data.list, function(index, item){
						var dataStr = "<tr>";
						for(var i=0; i < settings.dataColumn.length; i++){
							$.each(item, function(key, value){
								if(settings.dataColumn[i] == key){
									var startTag="";
									var endTag="";
									
									var alignText = "";
									if(  settings.alignColumn && settings.alignColumn[i] && settings.alignColumn[i] != ""  ){
										alignText =  "class=\""+settings.alignColumn[i]+"\"";
									}
									if(combinedColumn && combinedColumn.length>0){
										for(var j=0;j<combinedColumn.length;j++){
											if(combinedColumn[j]){
												var combinedCol = combinedColumn[j].split("_");
												if(combinedCol[0]==key){
													var tgtCol = combinedCol[1];
													var comVal = item[tgtCol];
													var addTxtColorColumn = settings.addTxtColorColumn;
													if(addTxtColorColumn && addTxtColorColumn.length>0){
														for(var k=0;k<addTxtColorColumn.length;k++){
															var splitVals=addTxtColorColumn[k].split("_");
															if(splitVals[0]==tgtCol){
																if(comVal==splitVals[1]){
																	startTag=splitVals[2];
																	endTag=splitVals[3];
																}else{
																	startTag="";
																	endTag="";
																}
																break;
															}
														}
													}
													var tmpVal = "";
													if(combinedCol[2] && combinedCol[3]){
														tmpVal = combinedCol[2]+comVal+combinedCol[3]+" "+value;
													}else{
														tmpVal = comVal+" "+value;
													}
													value = tmpVal;
													break;
												}
											}else{
												continue;
											}
										}
									}else{
										var addTxtColorColumn = settings.addTxtColorColumn;
										if(addTxtColorColumn && addTxtColorColumn.length>0){
											for(var k=0;k<addTxtColorColumn.length;k++){
												var splitVals=addTxtColorColumn[k].split("_");
												if(splitVals[0]==key){
													if(value==splitVals[1]){
														startTag=splitVals[2];
														endTag=splitVals[3];
													}else{
														startTag="";
														endTag="";
													}
													break;
												}
											}
										}
									}
									dataStr = dataStr+"<td "+ alignText +" >"+startTag+value+endTag+"</td>"; 											
								}
							});
						}
						dataStr = dataStr+"</tr>";
						excelData += dataStr;
					});
				}else{
					
				}
				excelData += "</table>";
				
				setTimeout(function(){
					var footerHtml = settings.footerHtml;
					if(footerHtml){
						excelData+="<table border='0' cellpadding='0' cellspacing='0'>";
						excelData+="<tr><td colspan='"+(settings.dataColumn.length?settings.dataColumn.length:1)+"'>&nbsp;</td></tr>";
						excelData+="<tr><td colspan='"+(settings.dataColumn.length?settings.dataColumn.length:1)+"'>"+footerHtml+"</td></tr>";
						excelData+="</table>";
					}
					
					if($("div#fileDownIfm").length < 1){
						$("body").append("<div id='fileDownIfm' style='position:absolute;top:-1000px;left:-1000px;'/>");	
						var iframe = $("<iframe name='tmpDownIfm' id='tmpDownIfm' src='about:none' />");
						$('div#fileDownIfm').append( iframe );
					}
					var tmpFrm = $("<form />").attr({'id':'tempDownFrm', 'name':'tempDownFrm', 'action':'excelDownload.jsp', 'method':'POST', 'target':'tmpDownIfm'})
					.append("<input type='hidden' name='excelData' id='excelData' />")
					.append("<input type='hidden' name='downLoadName' id='downLoadName' />");
					$("body").append(tmpFrm);
					$("#excelData").val(excelData);
					$("#downLoadName").val(settings.downloadName);
					$("#tempDownFrm").submit();
					$.blockingClickClear();	
					$(".popup_mask").removeClass("progress");
				},500);
			}
		},1);
	}
})(jQuery);




/****************************** Appended by MSSONG *****************************/ 

/******************************************************************************
*	dynamicTextarea plugin
*	사용방법 : 	$("#blNo").dynamicTextarea();
*   설정 가능 option :
			initTextareaHeight : 22,
			singleLineTextareaHeight : 20,
			maxLine : 10,
			textareaLine : 1,
			errMsg : "",
			width : -1,
			//style 설정 
			backgroundImage : "url(images/img/common/textline.gif)",
			backgroundPosition:"0 -1",
			padding:"0px",
			margin:"0px 0",
			fontSize:"11px",
			lineHeight:"15pt",
			height:"22px",
			overflow:"hidden"
*	@return :
*******************************************************************************/
;(function($){
	$.fn.dynamicTextarea = function(options){
		
		var opts = $.extend($.fn.dynamicTextarea.settings, options);
		return this.each(function(){
			setStyle(this, opts);
			$(this).keyup(		function( e ) {
					changeTextareaHeight( this ,opts);
				});
			$(this).blur(		function( e ) {
				var tmp = $( this ).val();
				$( this ).val( tmp.toUpperCase() );
			}); 	 				
			$(this).change(		function( e ) {
				changeTextareaHeight( this ,opts);
			}); 	
			var tmp = $(this);
			setTimeout(function() {
				    	tmp.trigger('keyup');
				 }, 100);

			 
		});
	}
	
	function setStyle($obj,opts){
		var areaObj = $($obj);
		if( opts.width !=-1 ){
			areaObj.css('width',opts.width);
		}
		
		if(opts.backgroundImage){
			setStyleCss(areaObj, 'background-image',opts.backgroundImage);
		}
		if(opts.backgroundPosition){
			setStyleCss(areaObj, "background-position", opts.backgroundPosition);
		}
		if(opts.padding){
			setStyleCss(areaObj, "padding", opts.padding); 
		}
		if(opts.margin){
			setStyleCss(areaObj, "margin", opts.margin);
		}
		if(opts.fontSize){
			setStyleCss(areaObj, "font-size", opts.fontSize);
		}
		if(opts.lineHeight){
			setStyleCss(areaObj, "line-height", opts.lineHeight);
		}
		if(opts.height){
			setStyleCss(areaObj, "height", opts.height);
		}
		if(opts.overflow){
			setStyleCss(areaObj, "overflow", opts.overflow);
		}
	}
	
	function setStyleCss(areaObj, attr, val){
		if(val){
			areaObj.css(attr, val);
		}
	}
	
	function changeTextareaHeight($obj,opts){
		var areaObj = $($obj);
		var value = areaObj.val();
		var currLineArray = value.split('\n');
		var currLine = currLineArray.length;
	 	var bOverflow = false;
		var areaData = "";
		// MAX LINE 수를 넘어가면 오류를 만들고 MAX개의 LINE만 보여준다.
		if( currLine > opts.maxLine ){
			bOverflow = true;
	 		//넘어가는 데이터 삭제
			for(var idx = 0 ; idx < opts.maxLine ; idx++){
				if(idx != 0 ){
					areaData +="\n";
				}
				areaData += currLineArray[idx];
				
			}
			
		} else if (currLine > 1) {
			$($obj).addClass("lineAdd");
		} else if(currLine <= 1) {
			$($obj).removeClass("lineAdd");
		}
		
		if( opts.textAreaLine != currLine ){
			if( bOverflow ){
				currLine = opts.maxLine;
				areaObj.val(areaData);
			}
			areaObj.height(opts.initTextareaHeight+(currLine-1)*opts.singleLineTextareaHeight) ;		
			opts.textAreaLine = currLine;
			
		} 
		
		
		if( bOverflow){
			alert(opts.errMsg );
		}
		 		
	}
		
	$.fn.dynamicTextarea.settings  = {	
			//최초 Textarea 높이
			initTextareaHeight : 25,
			//Line 당 Textarea 높이
			singleLineTextareaHeight : 23,
			//Max Line 수
			maxLine : 10,
			// 초기 시작 Line 수
			textareaLine : 1,
			//maxLine을 넘겼을때 에러 내용
			errMsg : "",
			//textarea의 width, 설정하지 않으면 jsp에서 설정된 크기를 그대로 유지함
			width : -1
			//open : function(){}
	};
})(jQuery);



/******************************************************************************
*	multi combo plugin
*	사용방법 : 	 
var cfg = {
		keyField: 'vslSlanCd',
		displayField: 'vslSlanNm',
		multiSelect: false,
		width: 350,
		boxWidth: 350,
		cols : [{
			field: 'vslSlanCd', width: '30%'
		},{
			field: 'vslSlanNm', width: '70%'
		}],
		data: {},
		onSelect : function(me,dd,ds){
			alert(dd)
			//alert(ds[0].vslSlanCd);
			//alert(ds[0].vslSlanNm);
		}
	};
	var cb1 = $('#combo1').multiCombo(cfg);//.mac('combo', cfg1);

	var param = {
			f_cmd:cmd,
			pagerows:"",
			intg_cd_id:cdID,
			hpg_lang_tp_cd:lang,
			pol_cd:polCd,
			pod_cd:podCd
		};
	cb1.loadDataUrl(
			url,
			param
	);
	
	$('#get2').click(function(){
		alert($('#combo1').getSelected());
	});
	$('#set2').click(function(){
		$('#combo1').select(2);
	});	
*	@return :
*******************************************************************************/
;(function($){
	
	var $magicCombo;
	$.fn.multiCombo = function(options){
		var opts = $.extend($.fn.multiCombo.settings, options);
		return this.each(function(){
				$(this).addClass("magic_combo");
				$magicCombo = $(this).mac('combo', opts);
     			$magicCombo.close();
			}
		)
	}
	$.fn.loadDataArray = function (arr){
			$magicCombo.loadData(arr);
	}
	$.fn.loadDataUrl = function (url,param){
		$.ajax({
			url:url,
			dataType:"json",
			data:param,
			async:false,
			success:function(data){
				$magicCombo.loadData(data.list);
			},
			complete:function(){
				
			}
		});
		/*
		$.getJSON(
				url,
				param,
				function(data){
					$magicCombo.loadData(data.list);
				}
		);
		*/
	}
	$.fn.open = function (){
		$magicCombo.open();
	}
	$.fn.close = function (){
		$magicCombo.close();
	}   
	$.fn.select = function (dd){
		$magicCombo.select(dd);
	} 
	$.fn.getSelected = function (){
		if( $magicCombo.selected && $magicCombo.selected[0])
			return $magicCombo.selected;
		else
			return "";
	} 
	$.fn.clearSelect = function (){
		$magicCombo.select([]);
	} 
	
	$.fn.getSelectedData = function(idx){
		var rData = new Array(2);
		var tmp =[];
		if( idx ){
			tmp = $magicCombo.getSelectedData(idx);		
		}else{
			tmp = $magicCombo.getSelectedData();

		}
		if( tmp ){
			rData[0] = tmp[$magicCombo.multiCombo.settings.keyField]
  			rData[1] = tmp[$magicCombo.multiCombo.settings.displayField]
  			               
		}
		return rData;
	}
	
	$.fn.multiCombo.settings  = {	
			keyField: 'vslSlanCd',
			displayField: 'vslSlanNm',
			multiSelect: false,
			width: 350,
			boxWidth: 350,
			cols : [{
				field: 'code', width: '30%'
			},{
				field: 'name', width: '70%'
			}],
			data: {},
			onSelect : function ( me, dd, sd){
			},
			onLoad : function(me,dd){
				//clear select;
				me.clearSelect();
			}				
			
	};
})(jQuery);



/******************************************************************************
*	Create Datepicker 
*	사용방법 : $(element).juiDatepicker(option);
*	@return :
*******************************************************************************/
var CALANDER_OVER = false;
;(function($){
	
	$("#ui-datepicker-div")
	.live( "mouseenter" , function() {
		CALANDER_OVER = true;
	})
	.live("mouseleave",function() {
		CALANDER_OVER = false;
	});
	
	var $datePicker;
	$.fn.juiDatepicker = function(options){
		var self = this;
		//무조건 영문으로 표시
		options.lang="en";
		var settings = {
				img : "", // Button Image
				lang : "en", // Language 
				opt : {dateFormat:"yy-mm-dd"} // Datepicker option
		};
		settings = $.extend(settings, options);
		
		if(settings.lang == "en"){
			settings.lang = "";
		}else if(settings.lang == "zh"){
			settings.lang = "zh-CN";
		}
		//$("ui-datepicker")
		return this.each(function(i){
			$(this).after("<button type='button' class='btn_calendar'>Show calendar(datepicker)</button>")
			.next("button")
			.addClass("ui-datepicker-trigger");
			$datePicker = $(this).datepicker(settings.opt)
			.datepicker("option", $.datepicker.regional[ settings.lang ])
			.datepicker("option", "dateFormat",settings.opt.dateFormat);
			$(this).next("button").click(function(){
				$(this).prev("input").trigger('focus');
			});
			
			$(this).keypress(function(e){
				var value = $.onlyNum($(this).val());
				if(value.length >= 8){
					return false;
				}
								
			});
			$(this).focusout(function(){
				var val = $.onlyNum($(this).val());
				if(val.length > 6 ){
					val = val.substr(0,4)+"-"+val.substr(4,2)+"-"+val.substr(6);
				}
				if(val.length > 4 && val.length < 7){
					val = val.substr(0,4)+"-"+val.substr(4,2);
				}
				$(this).val(val);
			});
			
			
			var maskPatternArr = new Array(3);
			var maskPattern = "";//"9999-~9-*9";
			var dateFormat = settings.opt.dateFormat;
			
			maskPatternArr['yy'] = '9999';
			maskPatternArr['mm'] = '~9';
			maskPatternArr['dd'] = '*9';
			
			var arrFormat = dateFormat.split('-');
			for(var i=0 ; i < arrFormat.length ; i++ ){
				if( i != 0 )
					maskPattern  +=  "-";
				maskPattern  += maskPatternArr[arrFormat[i]]
			}
 
			
			$.mask.definitions['~']='[01]';
			$.mask.definitions['*']='[0123]';
			$(this).mask(maskPattern ,
						{	onBlurFunc: function(){ // 검색 완료후 validate check
											var date = this.val();
											date = date.replace(/-|_/g,"");
											if( date.length == ""){
												return;
											}
						                    var year  = date.substring(0,4);
						                    var month = date.substring(4,6);
						                    var day   = date.substring(6,8);
						                    var startIndex = 0;
						                    var errorMessageArr = ['YYYY','MM','DD'];
						        			for(var i=0 ; i < arrFormat.length ; i++ ){
						        				if( arrFormat[i] == "yy"){
						        					year = date.substring(startIndex, startIndex+4);
						        					startIndex += 4;
						        					errorMessageArr[i] = "YYYY";
						        				}else if( arrFormat[i] == "mm"){
						        					month = date.substring(startIndex,startIndex+2);
						        					startIndex += 2;
						        					errorMessageArr[i] = "MM";
						        				}else if( arrFormat[i] == "dd"){
						        					day = date.substring(startIndex,startIndex+2);
						        					startIndex += 2;		
						        					errorMessageArr[i] = "DD";
						        				}
						        			}
											 if(($.comParseInt(year) < 1900)  || !$.comIsMonth( month ) || !$.comIsDay( year,month ,day)){
												 if( CALANDER_OVER == false ){
													 $.alertDialog("Please enter a valid date format. ( "+(errorMessageArr.join("-"))+" )",{focus:$(this).attr("id")})
												 }
											 }
										}
						}
			);			
			
		});
	}
	$.fn.doOperation = function (param){
		$(this).datepicker( param );
	}

})(jQuery);





/** UTILS **/
(function($){
	

	/**
	 * 문자열을 10진수로 변환하여 리턴한다.
	 * @param {string,object} obj   필수,문자열 또는 HTML태그(Object)
	 * @return number,문자열을 10진수로 변환한 값
	 * @see String#parseInt
	 */
	$.comParseInt = function(sVal){
	    try {
	        return parseInt(sVal, 10);
	    } catch(err) { alert("1-"+err.message); }
		
	};


	/**
	 * 입력된 문자열이 월로 가능한지 확인한다. 월의 범위는 1월~12월까지 가능하다. <br>
	 * <br><b>Example :</b>
	 * <pre>
	 *     ret = ComIsMonth("01") //결과 : true
	 *     ret = ComIsMonth(11)   //결과 : true
	 *     ret = ComIsMonth("gg") //결과 : false
	 * </pre>
	 * @param {string,object} sMonth   필수,월문자열 또는 HTML태그(Object)
	 * @returns bool <br>
	 *          true  : 월로 사용 가능한 경우<br>
	 *          false : 월로 사용 불가능한 경우
	 * @see #ComIsDate
	 * @see #ComIsDay
	 * @see #ComIsDay2
	 */
	 $.comIsMonth = function(sMonth) {
	    try {

	        if (sMonth.length > 2) return false;
	        month = $.comParseInt(sMonth);
	        return ((month > 0) && (month <= 12))
	    } catch(err) { alert("2-"+err.message); }
	};


	/**
	 * 년,월,일을 인자로 받아 해당 "일"이 일로 가능한지 확인한다. 일의 범위는 년월에 따라 다르지만 대략 1일~31일까지 가능하다.<br>
	 * <br><b>Example :</b>
	 * <pre>
	 *     ret = ComIsDay("2008", "11", "30")  //결과 : true
	 *     ret = ComIsDay("2008", "11", "31")  //결과 : false
	 *     ret = ComIsDay("year", "mon", "31") //결과 : false
	 * </pre>
	 * @param {string} sYear   필수,년 문자열
	 * @param {string} sMonth  필수,월 문자열
	 * @param {string} sDay    필수,일 문자열
	 * @returns bool <br>
	 *          true  : 일로 사용 가능한 경우<br>
	 *          false : 일로 사용 불가능한 경우
	 * @see #ComIsDate
	 * @see #ComIsMonth
	 * @see #ComIsDay2
	 * @see #ComGetLastDay
	 */
	$.comIsDay = function (sYear, sMonth, sDay) {
	    try {
	        if (sDay.length > 2) return false;
	        year  = $.comParseInt(sYear);
	        month = $.comParseInt(sMonth);
	        day   = $.comParseInt(sDay);
	        return ((day > 0) && (day <= $.comGetLastDay(year, month)));
	    } catch(err) { alert("3-"+err.message); }
	}	;
	
    /**
     * 년,월을 인자로 받아 해당 년월의 마지막 일자를 리턴한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     ret = ComGetLastDay(2008, 2)  //결과 : 29
     *     ret = ComGetLastDay(2008, 11) //결과 : 30
     *     ret = ComGetLastDay(2008, 12) //결과 : 31
     *     ret = ComGetLastDay(2008, 13) //결과 : 0
     * </pre>

     * @param {number} iYear   년
     * @param {number} iMonth  월
     * @returns number, 해당 년,월의 마지막 일자<br>
     *          0 : 인자값 월이 1월~12월 사이가 아닌 경우
     * @see #ComIsDay
     * @see #ComIsDay2
     */
    $.comGetLastDay = function(iYear, iMonth) {
        try {
            if (!$.comIsMonth(iMonth)) return 0;

            switch(iMonth){
                case 2:
                    if ((iYear%4==0) && ((iYear/4)%200!=0))   return 29;
                    else    return 28;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                default:
                    return 31;
            }
        } catch(err) { alert(err.message); }
    }
    
    /**
    * jqGrid에서 print할때 생기는 오류를 방지하고, 버튼을 안보이게 하며 Print한다. <br>
    * <br><b>Example :</b>
    * <pre>
    *     $.comPrint();
    * </pre>
    * @param {boolean} bButton true 일경우 버튼을 같이 Print한다. ( default : false )
    */
   $.comPrint = function(bButton) {
		var devObj = $(".ui-jqgrid-bdiv");
		$.each(devObj,function(idx,obj){
			$(obj).removeClass();
        });
		var btnObj = "";
		if(!bButton){
			//모든 버튼을 숨긴다.
			btnObj = $("button:visible");
			$.each(btnObj,function(idx,obj){
				$(btnObj[idx]).hide();
	        });
			
			$("h3.jui-h3:first").hide();
			
		}
		
		window.print();
		setTimeout(function () { window.close(); }, 100);
		
		$.each(devObj,function(idx,obj){
			$(obj).addClass("ui-jqgrid-bdiv");
        });
		if(!bButton){
			//숨긴 버튼을 다시 보이게 한다.
			$.each(btnObj,function(idx,obj){
				$(btnObj[idx]).show();
	        });
			$("h3.jui-h3:first").show();
			
		}
				
    }
    
    /**
    * 화면의 html을 이용해서 popup에서 print를 진행한다. <br>
    * <br><b>Example :</b>
    * <pre>
    *     $.comPopupPrint(html);
    * </pre>
    * @param {String} printName print 영역을 감싼 div의 id이름
    * @param {object} options popup option  
    */
   $.comPopupPrint = function() {
	   var printName,options,titNm, isTitImg;
	   if(arguments.length==3){
		   printName=arguments[0];
		   options=arguments[1];
		   titNm==arguments[2];
	   }else if(arguments.length==4){
		   printName=arguments[0];
		   options=arguments[1];
		   titNm=arguments[2];
		   isTitImg=arguments[3];
	   }else if(arguments.length==2){
		   printName=arguments[0];
		   options=arguments[1];
	   }else if(arguments.length==1){
		   printName=arguments[0];
	   }
	   
		var url = "/ecom/CUP_HOM_8040.do?printBodyName="+printName;
		if(!$.isEmpty(titNm)){
			url += "&titNm="+titNm; 
		}
		if(isTitImg){
			url += "&isTitImg="+isTitImg; 
		}
		var popupId = "PRINT";
		
		var settings = {
				width : 300,
				height : 400,
				scrollbars : "no",
				menubar : "no",
				toolbar : "no",
				status : "no",
				resizable : "yes",
				location : "no",
				left : 0,
				top : 0
		};
		settings = $.extend(settings, options);
		
		$.popupWin(url, popupId, settings);
    }
    
	/******************************************************************************
	*	NULL 체크해서 null이면 ""를 return한다.
	*	사용방법 : $.comNullToEmptyStr("") or $.comNullToEmptyStr($("#").val())
	*	@return : "" 또는 str
	*******************************************************************************/
	$.comNullToEmptyStr = function(str){
		if(str == undefined || str == "null" || str == null || str.replace(/ /gi,"") == ""){
			return "";
		}
		return str;
	}   
    
    /**
    * jqGrid의  loadComplete에서 호출해서 조회된데이터가 없으면 No Data를 표시한다.. <br>
    * <br><b>Example :</b>
    * <pre>
    *     $.jqGridLoadComplete(this);
    * </pre>
    * @param {String} gridName grid의 이름 또는 grid object
    */    
   $.jqGridLoadComplete = function(gridName){
	   var $gridObj;
	   if(typeof gridName == 'string' ){
		   $gridObj= $("#"+gridName)[0];
	   }else{
		   $gridObj = gridName;
	   }
  	   var noDataRow = $("#noDataBlankRow",$($gridObj));
   	   if ( !noDataRow.attr("id") && $($gridObj).getGridParam("records")==0) {	   
	        var colLength = $($gridObj).getGridParam("colNames").length ;
			var row = "<TD style=\"TEXT-ALIGN: center \" title=\"No data was found\" role=gridcell aria-describedby=mainGrid_cgoTp colspan=\""+colLength+"\">No data was found</TD>";
			row = "<tr id=\"noDataBlankRow\" role=\"row\" tabindex=\"-1\" class=\"ui-widget-content jqgrow ui-row-ltr\">" + row+"</tr>";
			$("table:first",$gridObj.grid.bDiv).append(row);
	   }
   	   $($gridObj).trigger("scroll");

   }
    
    /**
    * jqGrid의  No Data Message가 있을경우 삭제 시켜 준다. <br>
    * <br><b>Example :</b>
    * <pre>
    *     $.jqGridLoadComplete(this);
    * </pre>
    * @param {String} gridName grid의 이름 또는 grid object
    */    
   $.jqGridDeleteNoDataMsg = function(gridName){
	   var $gridObj;
	   if(typeof gridName == 'string' ){
		   $gridObj= $("#"+gridName)[0];
	   }else{
		   $gridObj = gridName;
	   }
 	   if ($($gridObj).getGridParam("records")==0) {
  			var obj = $("#"+$($gridObj).attr("id")+" #noDataBlankRow");
  			if( obj ){
  				obj.remove();
  			}
 			 
	   }
   }    
   	
    
    /**
    * File Upload Popup <br>
    * <br><b>Example :</b>
    * <pre>
    *      			
		*  	var callbackFunction = function(resultObj){
		*  		if(resultObj.button == "OK" ){
		*  			//upload 후 OK를 했기 때문에 정상 진행
		*  			alert(resultObj.fileKey+"--"+resultObj.fileName);
		*  		}else{
		*  			//upload 후 ok를 누르지 않고 cancel 했음
		*  		}
		*  		
		*  	}      
		*    $.openUploadPopup("TMP", callbackFunction)
		*
    * </pre>
    * @param {String} moduleName file upload 할때의 module name EX) TMP, COM
    * @param {function} callbackFunction upload 완료 후 호출되는 call back function
    */    
   $.openUploadPopup = function(moduleName, callbackFunction){
	    var paramObj = new Object();   
	    paramObj.moduleName = moduleName;
	    var url = "CUP_HOM_8050.do";     
	    var style ="dialogWidth:400px;dialogHeight:180px;status:no;resizable:no;help:no;"; // 사이즈등 style을 선언      
	    var modal = window.showModalDialog(url, paramObj ,style ); 
	    try{
	    	// 3개의 값이 있음
			//returnObj.fileName 
			//returnObj.fileKey 
			//returnObj.button
	    	callbackFunction.call(this,modal);   	   
	    }catch(e){  }
   }         
   	   
    	//특정 URL로 이동시켜 준다.
	$.comGoURL = function(url, options ){
			var appendedParams = "";// "추가 파라메터를 input으로 만들어 append한다.";
		for(var itm in options ){				
			appendedParams += "<input type=hidden name='"+itm+"' value='"+options[itm]+"'>";
		}
		var frmOpt = {'action':url, target:'_self', 'method':'POST'};
		$("#frm > input[name='ctgId']").val(COMMONUSEVALUE1);
		$("#frm > input[name='sessLocale']").val(CONFIGVALUE1);
		$("#frm").attr(frmOpt).append(appendedParams).submit();
		$.bigProgress();			
	}
    
    /**
	    * jqgrid에서 session이 끊겼을때 호출되는 공통 메소드 <br>
	    * <br><b>Example :</b>
	    * <pre>
	    * </pre>
	    * @param {Ojbect} error ajax로 호출후 return된 데이터
	    */    
	   $.errorSessionDisconnected = function(error){
	    	var pathname  = window.location.pathname
	    	var isEService = (pathname.match(/CUP_HOM_3[0-9]{3}/)) ? true : false;
	    	
	    	//"readyState":4,"status":200,"statusText":"parsererror"
	    	var errorSessionDisconnectedClose = function(){
	    		//redirect main page
		    	if(  isEService ){ //Eservice
		    		$.comGoURL("/ecom/CUP_HOM_3000.do");
		    	}else{ //Contents
		    		$.comGoURL("/ecom/CUP_HOM_1001.do");
		    	}	
	    	}
	    	
   	
	    	var errorText = error.responseText;
	    	$.alertDialog(DISCONNECTEDSESSIONMESSAGE, {close : errorSessionDisconnectedClose} );
	    	  
	   }     
	    /**
	    * jqgrid에서 session이 끊겼을때 호출되는 공통 메소드 <br>
	    * <br><b>Example :</b>
	    * <pre>
	    * </pre>
	    * @param {Ojbect} data json형태의 데이터
	    */    
	   $.errorServerMessage = function(data,options){
			var returnValue = false;
			var settings = {
				close : function(){}
			};
			settings = $.extend(true,settings, options);			
	    	var errorServerMessageClose = function(){
	    		if( settings.close ){
	    			settings.close.call();
	    		}
	    	}
			if(data){
 				if( data.TRANS_RESULT_KEY == "F"){
					var errorMessage = data.Message;
					if(errorMessage ){
						var arrErrMsg = errorMessage.split("<||>");
						if(arrErrMsg ){
							for( var idx = 0 ; idx < arrErrMsg.length ; idx++ ){
								if( arrErrMsg[idx].indexOf( "# Error Message :" >= 0 )){ 
									var errStr = arrErrMsg[2];
									var arrErrStr = errStr.split(":");
									if( arrErrStr ){
 								    	$.alertDialog(arrErrStr[arrErrStr.length-1] , {close : errorServerMessageClose} );
										 returnValue = true;
									}
									break;
								}
							}
						}
					}
				}
			}
			return returnValue;
	   }
})(jQuery);

(function($){
	
	$.comModifyProfile=function(reloadYn){
		/*var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    var langVal=$("#sessLocale").val();
	    if(langVal==''){
	    	langVal='en';
	    }
	    $("#sessLocale").val(langVal);
	    $("#frm").attr("action", "CUP_HOM_1030.do").attr("target","_self").attr("method","POST");*/

	    if(CONFIGVALUE2==''){
	    	CONFIGVALUE2='en';
	    }
	    $("#frm").attr("action", "CUP_HOM_1030.do?sessLocale="+CONFIGVALUE2).attr("target","_self").attr("method","POST");
	    document.forms.frm.submit();
	    //$.popupWin(ctxPath+"/CUP_HOM_1030.do?sessLocale="+langVal+"&reloadYn="+reloadYn, "popModifyProfile", {width:982, height:884, top:1, scrollbars:1}, {});
	};
	
	$.comAddUserPop=function(){
		var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    var langVal=$("#sessLocale").val();
	    if(langVal==''){
	    	langVal='en';
	    }
	    var height=600;
	    /*if(langVal=='ko'){
	    	height=884;
	    }else{
	    	height=580;
	    }*/
	    $.popupWin(ctxPath+"/CUP_HOM_1020.do?sessLocale="+langVal, "popAddUser", {width:980, height:height, top:1, scrollbars:1}, {});
	};
	
	$.comHelpPop=function(){
		var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    var langVal=$("#sessLocale").val();
	    if(langVal==''){
	    	langVal='en';
	    }
	    var height=400;
	    /*if(langVal=='ko'){
	    	height=884;
	    }else{
	    	height=580;
	    }*/
	    $.popupWin(ctxPath+"/CUP_HOM_1020.do?sessLocale="+langVal+"&staticUrl=/ecom/staticpage/help/cont_track/about.html", "popAddUser", {width:600, height:height, top:1, scrollbars:1}, {});
	};
	
	$.getPopHgtByBrwsrBoChrome = function(popHeight){
		   
		if($.browser.msie){	//IE
			popHeight-=30;
		}else if($.browser.mozilla){ //FF
			popHeight+=40;
		}else if($.browser.safari){
			var agt = navigator.userAgent.toLowerCase();
			if(agt.indexOf("chrome")==-1){	//Safari
				popHeight-=60;
			}
		}
		
		return popHeight;
	}
	
	/**
     * Form 데이터를 Object로 변환하는 함수
     * argument 없을 경우 underScore로 사용하며
     * argument가 false일경우 이름 그대로 사용
     */
	$.fn.serializeObject = function(){
		var isUnder=true;
 		if(arguments.length==1){
 			isUnder=arguments[0];
 		}
 		
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	    	var name=this.name;
	    	var convName=this.name;
	    	if(isUnder){
	    		convName=getCamelToUnderScoreVar(name);
	    	}
	        if (o[convName] || o[convName] == '') {
	            if (!o[convName].push) {
	                o[convName] = [o[convName]];
	            }
	            o[convName].push(this.value || '');
	        } else {
	            o[convName] = this.value || '';
	        }
	    });
	    return o;
	};
	
	$.fn.checkByteLengthById=function(limitLength, fieldNm){
		
		if(!$(this).val() || $(this).val().length<=0){
			return true;
		}
		if(!fieldNm){
			fieldNm = "selected field";
		}
		var $selObj = $(this);
		
		var len = $.getByteLen($(this).val());
		var oldVal = ["{n}","{t}"];
		var newVal = [];
		newVal[0]=limitLength+"";
		newVal[1]=fieldNm;
		var msg = replaceAllVals(CHECK_BYTE_MSG, oldVal, newVal);
		
		if(len>limitLength){
			$.alertDialog(msg, {close:function(){
				if(!$selObj.is(":disabled")){
					$selObj.focus();
				}
			}});
			return false;
		}
		
		return true;
		
	}
})(jQuery);

/******************************************************************************
*	validPhone 입력란에 전화번호 입력 check 
*	사용방법 : $("phone").validPhone();
*	@return :
*******************************************************************************/
( function( $ ) {
	$.fn.validPhone = function( validOption ){
		var $this = $(this);
		
		var regexp = /[^0-9-"("")""\[""\]""~""_""\,""\.""<"">"]/gi;
		function reqPhone( val ){
			return !regexp.test(val);
		}
		
		//tag의 key이벤트에 valid처리 하는 로직을 넣는다.
		$this
		.keydown(function(e){
			var $tag = $(this);
			var val = $.trim(''+ $tag.val() );
			var isPhoneChar = reqPhone( val );
			
			if( isPhoneChar ){
				return true;
			}else {
				if( this.selectionStart ){
					if( isPhoneChar == false ){
						var start = this.selectionStart,
				        end = this.selectionEnd;
						$tag.val(val.replace(regexp, ''));//숫자가 아니면 삭제함
						this.setSelectionRange(start, end);
					}
				} else if( e.preventDefault ){
					e.preventDefault();
				} else  {
					e.returnValue = false;
				}
				return false;
			}	
		}).keyup(function(e){
			var $tag = $(this);
			var val = $.trim(''+ $tag.val() );
			var isPhoneChar = reqPhone( val );
			if( isPhoneChar ){
				return true;
			}else {
				if( this.selectionStart ){
					if( isPhoneChar == false ){
						var start = this.selectionStart,
				        end = this.selectionEnd;
						$tag.val(val.replace(regexp, ''));//숫자가 아니면 삭제함
						this.setSelectionRange(start, end);
					}
				} else if( e.preventDefault ){
					e.preventDefault();
				} else  {
					e.returnValue = false;
				}
				return false;
			}
		}).change(function(){
			var $tag = $(this);
			var val = $.trim(''+ $tag.val() );
			var isPhoneChar = reqPhone( val );
			if( isPhoneChar == false ){
				if( this.selectionStart ){
					if( isPhoneChar == false ){
						var start = this.selectionStart,
				        end = this.selectionEnd;
						$tag.val(val.replace(regexp, ''));//숫자가 아니면 삭제함
						this.setSelectionRange(start, end);
					}
				} 
				return false;
			}
			return false;
		});
	}
	
	$(document).delegate("#aNewSignUp", "click", function(){
		$.comAddUserPop();
		return false;
	});
} ) ( jQuery );

/**
 * 날짜 비교 함수 
 * @param compar
 * @param operator
 * @param reference
 * @returns {Boolean}
 */
function getDateComparison(compar, operator, reference){
	var now = new Date(); 
	var referenceDate = null;
	if(reference == null || reference == undefined){
		referenceDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	}
	else{
		referenceDate = new Date(reference);
	}
		
	var comparDate = new Date(compar);
	if (eval(referenceDate.getTime() + operator + comparDate.getTime())){
	    return false;
	}
	return true;
}
//
//$(document).ajaxStart(function(event,xhr,options) {
//	.log(event,xhr,options);
//	$(".popup_mask").show();
//	$(".popup_mask").addClass("progress")
//}).ajaxStop(function() {
//	$(".popup_mask").hide();
//	$(".popup_mask").removeClass("progress");
//});

/**
 * 
 * @param url
 * @param paeameters
 * @returns
 */
function ComHttpSync(url, paeameters) {
	var jsonData;
	$.ajax({
		type : "POST",
		url : url,
		async : false,
		dataType : "json",
		data : paeameters,
		success : function(data) {
			jsonData = data;
		},
		error : function(xhr) {
			
		}
	});
	return jsonData;
}

/**
 * 
 * @param url
 * @param paeameters
 * @param callbackfunction
 * @param callbackErrorfunction
 */
function ComSearchAsync(url, paeameters, callbackfunction, callbackErrorfunction){
	$.ajax({
	    type: "POST",
	    url: url,
	    async: true,
	    dataType: "json",
	    data: paeameters,
	    success: function(data){
	    	if(callbackfunction != undefined && callbackfunction != null)
	    		callbackfunction(data);
	    },
	    error: function(xhr){ 
	    	if(callbackErrorfunction != undefined)
	    		callbackErrorfunction(xhr);
	    	else
	    		alert("error html= " + xhr.statusText);
	    }
	});
}

function ComComboData(comboId, result, resultId, resultvalue, mainTextVal , setValue) {
	var mainText = null;
	var selected = "";
	try{
		$("#" + comboId).html('');
		if(undefined != mainTextVal && null != mainTextVal) mainText = mainTextVal;
		if(mainText != null && mainText != "")
			$("#" + comboId).html('<option value="" >' + mainText + '</option>');
			
		$.each(result, function(index, json) {
			if(result[index] != null && result[index] != undefined){
				if( setValue == eval("result[" + index + "]." + resultvalue)) selected ="selected";
				else selected = "";
				$("#" + comboId).append("<option value='"+ eval("result[" + index + "]." + resultvalue) + "' "+selected+">" + eval("result[" + index + "]." + resultId) + "</option>");
			}
	    });
	}catch (e) { }
}

var captchaArrayTime = null;
var captchaCheckLength;
var captchaTime;
var callbackfunction;
var tagetURL;
var captchaData = new Array();

/**
 * 
 * @param captchaParam
 */
function captchaParamData(paramData){
	var param = paramData.split("&");
	for (var i = 0; i < param.length; i++) {
		var datas = param[i].split("=");
		captchaData[datas[0]] = decodeURIComponent(datas[1].replace(/\+/g, '%20'));
	}
}

/**
 * 
 * @param time 체크할 시간
 * @param checkLength	시간안에 실행
 */
function captchaOption(time, checkLength, eventObj, callbackfunction, tagetURL){
	this.captchaTime = time*1000;
	this.captchaCheckLength = checkLength;
	this.callbackfunction = callbackfunction;
	this.tagetURL = tagetURL;
	$("#" + eventObj).click(function(){
		captchaCheck();
	});
	
	
}

function captchaCheck(){
	var startDate = new Date(); 
	if(captchaArrayTime == null){
		captchaArrayTime = new Array();
	}
	captchaArrayTime[captchaArrayTime.length] = startDate;
	
	if(captchaCheckLength == undefined || captchaTime == undefined) return;
	
	if(CONFIGVALUE3 == "" && captchaArrayTime.length > captchaCheckLength){
		var end = new Date();
		var checkDate = captchaArrayTime[captchaArrayTime.length-captchaCheckLength];
		var diff = end - checkDate;
		/* 레이어 팝업 호출 */
		if(diff < captchaTime){
			$("#captchaParam").val($("#frm").serialize()+"&tagetURL=" + tagetURL);
			$("#frm").attr("action","CUP_HOM_9100.do");
			$("#frm").attr("method","post");
			$("#frm").submit();
			return;
		}
	}
	
	callbackfunction();
}

/**
 * 
 */
function captchaSubmit(){
	var requestData = ComHttpSync('captcha.do', 'Request=captcha-check&captcha-value=' + $("#captchaText").val().toUpperCase());
	if(requestData.check == true){
//		captchaClose();
//		callbackfunction();
//		captchaArrayTime = null;
	}else{
		$("#errorCaptcha").show().parent().addClass("mar_top_12");
		$("#captchaText").val("");
	}
	return requestData.check;
}

/**
 * 
 */
function captchaClose(){
	$("#captchaDIV,.popup_mask").hide();
	refreshCaptcha();
}


/**
 * 
 */
function refreshCaptcha(){
	$("#errorCaptcha").hide();
	$("#captchaImg").attr("src","");
	$("#captchaImg").attr("src","captcha.do?Request=captcha");
	$("#captchaText").val("");
}

function getCtxPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
}

var pdfFile;
var pdf_file;

function pdfOpen(rdFileKey){
	$(".popup_mask").removeClass("progress");
	ComDownLoad('FileDownload', 'key=' + rdFileKey);
	//ComDownLoad('http://192.168.75.39:9110/ecom/FileDownload', 'key=' + rdFileKey);
}

/**
 * 
 * @returns {Boolean}
 */
function getPdfViewer(){
	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
	var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
	
	/* O B/L 화면일 경우 크롬 플러그인에 따라 pdfview를 호출*/
	var pdfViewer = true;
	if(getNavigatorPlugin('Chrome PDF Viewer') == undefined) pdfViewer = false;
	if(!isChrome)  pdfViewer = false;
	return pdfViewer;
}

function getURLParameters(paramName){
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0) {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i<arrURLParams.length; i++){
            var sParam =  arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i=0; i<arrURLParams.length; i++){
            if (arrParamNames[i] == paramName){
                //alert("Parameter:" + arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return undefined;
    }
}


/**
 * RD 파일 첨부 메일
 * @param url
 * @param paramData
 */
function rdFilePdfMail(url, paramData, fileKey){
	do{
		comFileUploadInfo(fileKey)
		pausecomp(2000);
	}while (pdf_file == undefined)
		
	var resultData = ComHttpSync(url, paramData);
	$("#pdf_plagin_DIV,.popup_mask").hide();
	if(resultData.TRANS_RESULT_KEY == "S"){
		$.alertDialog( "Send mail success", { zIndex:3999 });
	}
}

/**
 * 파일키로 현재 파일이 만들어졌는지 체크
 * @param fileKey
 */
function comFileUploadInfo(fileKey){
	var resultData = ComHttpSync('CommonCodeGS.do', 'f_cmd=2&file_sav_id=' + fileKey);
	if(resultData.TRANS_RESULT_KEY == "S"){
		pdf_file = resultData.list[0].fileUpldNm;
	}
}

/**
 * 잠시 중단
 * @param millis
 */
function pausecomp(millis){
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
}

/**
 * 
 * @param hideObj
 * @returns
 */
function bookingRequsetViewOpenFlg(hideObj){
	var openFlg = null;
	var setLocale = CONFIGVALUE2;
	if(CONFIGVALUE2 == "ko") setLocale = "KR";
	else if(CONFIGVALUE2 == "zh") setLocale = "CN";
	var resultData =  ComHttpSync('MenuGS.do', {f_cmd:SEARCH, hpg_lang_tp_cd:setLocale, pgm_id:'CUP_HOM_3201'});
	if(resultData.TRANS_RESULT_KEY == "S"){
		if(resultData.count > 0){
			if(resultData.list[0].useFlg == "N"){
				openFlg = resultData.list[0].useFlg;
				if(hideObj != undefined && hideObj != null){
					for (var i = 0; i < hideObj.length; i++) {
						$("#" + hideObj[i]).hide();
					}
				}
			}else{
				openFlg = resultData.list[0].useFlg;
			}
		}
	}
	return openFlg;
}

/**
 * 
 * @param gridName
 * @returns
 */
function ComSelectData(gridName){
	var ret;
	var id = $(gridName).getGridParam('selrow');
	if(id){
		ret = $(gridName).getRowData(id);
	}else{
		alert("Please Choose A Row");
	}
	return ret;
}

function getBrowserName() {
	return this.name = this.name || function() {
		var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";
		if (userAgent.indexOf("chrome") > -1) {
			return "chrome";
		} else if (userAgent.indexOf("safari") > -1) {
			return "safari";
		} else if (userAgent.indexOf("msie") > -1
				|| navigator.appVersion.indexOf('Trident/') > 0) {
			return "ie";
		} else if (userAgent.indexOf("firefox") > -1) {
			return "firefox";
		} else {
			// return "ie";
			return userAgent;
		}
	}();
}

function getActiveXObject(name) {
	try {
		return new ActiveXObject(name);
	} catch (e) {
	}
}

function getNavigatorPlugin(name) {
	for (key in navigator.plugins) {
		var plugin = navigator.plugins[key];
		if (plugin.name == name)
			return plugin;
	}
}

function getPDFPlugin() {
	return this.plugin = this.plugin || function() {
		if (getBrowserName() == 'ie') {
			return getActiveXObject('AcroPDF.PDF') || getActiveXObject('PDF.PdfCtrl');
		} else {
			return getNavigatorPlugin('Adobe Acrobat') || getNavigatorPlugin('Chrome PDF Viewer') || getNavigatorPlugin('WebKit built-in PDF');
		}
	}();
}

function getAcrobatVersion() {
	try {
		var plugin = getPDFPlugin();

		if (getBrowserName() == 'ie') {
			var versions = plugin.GetVersions().split(',');
			var latest = versions[0].split('=');
			return parseFloat(latest[1]);
		}

		if (plugin.version)
			return parseInt(plugin.version);
		return plugin.name
	} catch (e) {
		return null;
	}
}

function ComGridAction(gridName, jsonData, callBack){
	$(gridName).clearGridData();
	$("#totCnt").text( 0 );
	if(jsonData == undefined || jsonData == null || jsonData.count == 0 || !jsonData.list || !jsonData.list.length){
		$.jqGridLoadComplete($(gridName)[0]);
		return;
	}  
	for ( var i = 0 ; i <= jsonData.list.length ; i++ ) {
		$(gridName).addRowData(i+1,jsonData.list[i]);
	}
	
	$("#totCnt").text(jsonData.count);
	
	if ( callBack != undefined ) {
		callBack(gridName);
	}
}

/**
 * 
 * @param gridName
 * @param rowid
 * @param iCol
 * @returns
 */
function ComGetCellData(gridName, rowid, iCol){
	return $(gridName).getCell(rowid, iCol);
}

/**
 * 
 * @param gridName
 * @param rowid
 * @param iCol
 * @param value
 */
function ComCellSetData(gridName, rowid, iCol, value){
	$(gridName).setCell(rowid, iCol, value);
//	$(gridName).jqGrid('setCell',rowid,iCol,value);
}

/**
 * 
 * @param gridName
 * @returns
 */
function ComGridLength(gridName){
	return $(gridName).jqGrid('getRowData').length;
}

/**
 * 
 * @param gridName
 * @returns
 */
function ComSelectRowID(gridName){
	return $(gridName).getGridParam('selrow');
}

/**
 * 
 * @param gridName
 */
function ComAllRowSave(gridName){
	var rows = $(gridName).getDataIDs();
	for ( var i = 0; i < rows.length; i++) {
		ComRowSave(gridName, rows[i]);
	}
}

/**
 * 
 * @param gridName
 * @param rowId
 */
function ComRowSave(gridName, rowId){
	$(gridName).saveRow(rowId, false, 'clientArray');
}

/**
 * 
 * @param gridName
 * @param index
 * @returns
 */
function ComRowData(gridName, index){
	return $(gridName).jqGrid('getRowData')[index];
}

/**
 * 
 * @param gridName
 * @param index
 * @returns
 */
function ComSetRowData(gridName, index, rowData){
	$(gridName).setRowData(index, rowData);
}

/**
 * 
 * @param gridName
 * @param prefix
 * @returns {String}
 */
function ComGridData(gridName, prefix){

	if ( prefix == undefined ) {prefix = "";}

	var rows = $(gridName).jqGrid('getRowData');
	var gridData = "";
	var paras = new Array();

	for ( var i = 0 ; i < rows.length ; i++ ) {
		paras.push($.param(rows[i]));
	}

	for ( var int = 0; int < paras.length; int++) {
		gridData = gridData + paras[int] + "&";
	}
	
	var arrParams = gridData.substring(0, gridData.length -1).split("&");
	var result = "";

	for ( var i = 0 ; i < arrParams.length ; i++ ) {
		var p = arrParams[i];
		var arrP = p.split("=");
		if(result.length > 0) result += "&"
		result += prefix + camelToUnderscore(arrP[0]) + "=" + arrP[1];
	}

	return result;
}

/**
 * tag camel name -> underscore 변환
 * @param c
 * @returns
 */
function camelToUnderscore(c){
	var r = $.trim(c);
	r = r.replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2').replace(/([a-z])([A-Z])/g,"$1_$2");
	return r.toLowerCase();
}

/**
 * 
 * @param url
 * @param paeameters
 */
function ComDownLoad(url, paeameters){
	 // url과 data를 입력받음
   if( url && paeameters ){ 
       // data 는  string 또는 array/object 를 파라미터로 받는다.
   		paeameters = typeof paeameters == 'string' ? paeameters : jQuery.param(paeameters);
       // 파라미터를 form의  input으로 만든다.
       var inputs = '';
       $.each(paeameters.split('&'), function(){ 
           var pair = this.split('=');
           inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
       });
       // request를 보낸다.
       $('<form action="'+ url +'" method="post">'+inputs+'</form>').appendTo('body').submit().remove();
   }
}

/**
 * 로그인 체크 후 로그인 필요한 화면은 메세지 보여줌.
 */
function ComLoginCheckMessage(title){
//	var loginCkMeg = "In order to utilize \"" + title + "\" function, please sign into NYK eCommerce site. If you don't have an account with us, please sign up from our homepage.";
	var dialogStyle = "<div id=\"dialog-confirm\" title=\"" + title + "\">" + $.msgConvert(ESW00144, title) + "</div>";
	var settings = { modal : true, wSize : 300, hSize : 170, btnConfirm : "OK", titView : true, zIndex : 1000, confirm : function(){$(this).dialog("close")} };
	settings = $.extend(settings, null);
	var btns = [{text: settings.btnConfirm, click: function() {$(this).dialog("close"); settings.confirm();	}}];

	if( $("#dialog-confirm").length > 0 ){
		$("#dialog-confirm").remove();
	}
	
	$(dialogStyle).prependTo("body").css("overflow-x", "hidden").css("word-break", "break-all").css("word-wrap", "break-word")
									.css("white-space", "pre-wrap").css("white-space", "-moz-pre-wrap").css("white-space", "-pre-wrap")
									.css("white-space", "-o-pre-wrap");
	$("#dialog-confirm").dialog({
		title: settings.modalTit,
		width: settings.wSize,
		height: settings.hSize,
		modal: settings.modal,
		zIndex: settings.zIndex,
		buttons: btns,
		resizable: false
	});
}

/**
 * 
 * @param url
 * @param param
 */
function ComGotoPage(url, param){
	var params = param.split("|");
	if(params[0] == "Y" && USER_LOGIN == "N"){
		var title = "";
		var menuId = params[1].split("_")[1];
		switch(menuId){
			case "100001":
				title = params[2];
	        break;
			case "100002":
				title = params[2];
		        break;
		    case "100003":
		    	title = params[2];
		        break;
		    case "100004":
		    	title = params[4];
		        break;
		    case "100005":
		    	title = params[2];
		        break;
		    case "100006":
		    	title = params[5];
		        break;
		    case "100007":
		    	title = params[2];
		        break;
		    case "100008":
		    	title = params[4];
		        break;  
		}
		ComLoginCheckMessage(title);
	}else{
		location.href = url;
	}
}

function openPopupForSelectCustCd(fncNm, paramNm){
	var nm = "popSelectCustomerCode";
	var left = 0;
	var top = 0;
	var width=750;
	var height=475;
	var url="CUP_HOM_8080.do";
	
	//브라우저별로 상이한 window open popup height 통일을 위해 분기
	if($.browser.safari && navigator.vendor.toLowerCase().indexOf("apple") > -1){
		if(navigator.appVersion.toLowerCase().indexOf("window") > -1){
			height-= 57;
			
		} else if(navigator.appVersion.toLowerCase().indexOf("mac") > -1 ) {
			height+= 47;
		}
	}
	
    // window outerWidth (Frame + contents)

	var screenHeight = window.screen.height/2;
	var screenWidth = window.screen.width/2;

	left = (screenWidth-(width/2));
	top  = (screenHeight-(height/2));

	var addOpt = "titlebar='yes'"
	+ ", width=" + width
	+ ", height=" + height
	+ ", scrollbars=0"
	+ ", menubar=no"
	+ ", toolbar=no"
	+ ", status=no"
	+ ", directories=no"
	+ ", resizable=yes"
	+ ", location=no" 
	+ ", left="+left
	+ ", top="+top;
	var win = window.open("", nm, addOpt);
	
	if($("#tmpPopFrm").length<=0){
		$("body").append("<form method='post' name='tmpPopFrm' id='tmpPopFrm'></form>");
	}else{
		$("#tmpPopFrm").html("");
	}
	
	var html = "";
	html+="<input type='hidden' name='fncNm' id='fncNm' value='"+fncNm+"'/>"
	$("input[name='"+paramNm+"']").each(function(idx){
		html+="<input type='hidden' name='"+paramNm+"' id='"+paramNm+"_"+idx+"' value='"+$(this).val()+"'/>";
	});
	$("#tmpPopFrm").html(html);
	
	$("#tmpPopFrm").attr("action", url);
	$("#tmpPopFrm").attr("target", nm);
	$("#tmpPopFrm").submit();
	win.focus();
	
	$("#tmpPopFrm").remove();
}

var excelDownDataList=[];
function setAllDataForDownload(paramData, url, scope){
	if($("#excelDownTmpFrm").length<=0){
		$("body").append("<form id='excelDownTmpFrm'>").append("</form>")
	}
	if($("#downloadCurPage").length<=0){
		$("#excelDownTmpFrm").append("<input type='hidden' name='downloadCurPage' id='downloadCurPage'/>")
	}
	if($("#totalPage").length<=0){
		$("#excelDownTmpFrm").append("<input type='hidden' name='totalPage' id='totalPage'/>")
	}
	if($("#totalRow").length<=0){
		$("#excelDownTmpFrm").append("<input type='hidden' name='totalRow' id='totalRow'/>")
	}
	
	var downCurPage=$("#downloadCurPage").val();
	if(!$.trim(downCurPage)){
		downCurPage="1";
		excelDownDataList=[];
	}

	paramData.cur_page=downCurPage;
	paramData.total_row=$("#totalRow").val();
	paramData.scope=scope;

	
	$.ajax({
		url:url,
		dataType:"json",
		type:"POST",
		data:paramData,
		async:false,
		success:function(data){
			if(data.TRANS_RESULT_KEY=="S"){
				if(!$("#totalRow").val()){
					$("#totalRow").val(data.totalRow);
				}
				if(!$("#totalPage").val()){
					$("#totalPage").val(data.totalPage);
				}
				var totalPage = parseInt($("#totalPage").val(),10);
				if(data.count>0){
					for(var i=0;i<data.list.length;i++){
						excelDownDataList.push(data.list[i]);
					}
					var dPage=parseInt(downCurPage,10)+1;
					$("#downloadCurPage").val(dPage);
					if(totalPage>=dPage){
						setAllDataForDownload(paramData, url, scope);
					}else{
						$("#excelDownTmpFrm").remove();
					}
				}else{
					$("#excelDownTmpFrm").remove();
				}
			}
		}
	});
}

function getCamelToUnderScoreVar(varNm){
	return varNm.replace(/([A-Z])/g, function(varNm){return "_"+varNm.toLowerCase();});
}

function replaceAllVals(str, arrOld, arrNew) {
	if(!str) return str;
	var strVal = str;
	if( typeof arrOld === 'string')  {
		strVal = strVal.split(arrOld).join(arrNew+"");
	}else{
		if(arrOld && arrOld.length && arrNew && arrNew.length && arrOld.length==arrNew.length){
			for(var i=0;i<arrOld.length;i++){
				strVal = strVal.split(arrOld[i]).join(arrNew[i]);
			}
		}
	}
	return strVal;
}

function checkByteLengthByParamObj(paramObj){
	if(!paramObj.val || paramObj.val.length<=0){
		return true;
	}
	if(!paramObj.fieldNm){
		paramObj.fieldNm = "selected field";
	}
	
	var alertObj = {};
	
	alertObj.close = function(){
		if(paramObj.focusId){
			if(!$("#"+paramObj.focusId).is(":disabled")){
				$("#"+paramObj.focusId).focus();
			}
		}
	};
	
	if(paramObj.hSize || paramObj.vSize){
		if(paramObj.hSize){
			alertObj.hSize=paramObj.hSize;
		}
		
		if(paramObj.wSize){
			alertObj.wSize=paramObj.wSize;
		}
	}
		
	var len = $.getByteLen(paramObj.val);
	var oldVal = ["{n}","{t}"];
	var newVal = [];
	newVal[0]=paramObj.limitLength+"";
	newVal[1]=paramObj.fieldNm;
	
	var msg = replaceAllVals(CHECK_BYTE_MSG, oldVal, newVal);
	
	if(len>paramObj.limitLength){
		
		$.alertDialog(msg, alertObj);
		return false;
	}
	
	return true;
}

function getMsgForPwdValid(idVal, psVal){
	var msgObj = {};
	if(!psVal.length || psVal.length<8){
		msgObj.errorMsg="Password length must be eight or more characters.";
		msgObj.wSize=330;
		return msgObj;
	}
	
	if(psVal==idVal){
		msgObj.errorMsg="Password cannot be same with User ID.";
		return msgObj;
	}
	
	var chkNum = psVal.search(/[0-9]/g);
	
	var chkStr = psVal.search(/[a-z]/g);
	var chkStr1 = psVal.search(/[A-Z]/g);
	var chkStr2 = psVal.search(/[\~\!@#\$\^\(\)_\{\}|:<>?\]\[\/\"\',.;=-]/g);
	var appliedCnt = 0;
	
	if(chkNum > -1){
		appliedCnt++;
	}
	if(chkStr > -1){
		appliedCnt++;
	}
	if(chkStr1 > -1){
		appliedCnt++;
	}
	if(chkStr2 > -1){
		appliedCnt++;
	}
	
	if(appliedCnt<3){
		var msg="Password must contain at least 1 character from 3 of the 4 character groups(below)\n\n";
		msg+="  - Upper Case(A, B, C, D, E to Z)\n";
		msg+="  - Lower Case(a, b, c, d, e to z)\n";
		msg+="  - Numerals (0 to 9)\n";
		msg+="  - Non alphanumeric (~ ! @ # $ ^ & * ( ) _ + { } | : \" < > ? / . , ' ; ] [ = -)\n";

		msgObj.errorMsg = msg;
		msgObj.wSize=470;
		msgObj.hSize=210;
	}
	
	//if(/(\w)\1\1\1/.test(psVal)){
	//	alert('Password cannot be inputted.');
	//	return false;
	//} 
	return msgObj;
	
}

function checkPwdHis(paramObj){
	
	var isValid=true;
	
	$.ajax({
		url : paramObj.url,
		type : "POST",
		dataType : "json",
		data : {
			 f_cmd:paramObj.f_cmd,
			 usr_id : paramObj.usr_id,
			 usr_pwd : paramObj.usr_pwd,
			 usr_tp_cd : paramObj.usr_tp_cd
		},
		async:false,
		success:function(data){
			if(data.TRANS_RESULT_KEY=="S"){
				if(data.count>0){
					isValid =  false;
				}
			}
		}
	});
	
	return isValid;
}

/**
 * 한글, 영문, 숫자, 키보드 특수문자, 엔터값(\n)만 허용
 */
function removeBannedSpecialChar(srcCharValue) {
	if(!srcCharValue){
		return srcCharValue;
	}
	var returnVal = srcCharValue;
	var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 `~!@#$%^&*()\[\]\{\}\\_+-=:;\/|<>?\"\'\n)]/gi;   // 특수문자 제거
	if(pattern.test(srcCharValue)){
		returnVal = srcCharValue.replace(pattern,"");
    }
	
	return returnVal;
}

function addDisclaimerTag(idVal){
	
	if($("#"+idVal).css("display")=='none'){
		$("#"+idVal).show();
	}
	
	var html="";
	html+='<font style="color: blue; font-style: italic; font-size: 10px;">\n';
	html+='	* Important Notice:\n';
	html+='</font>\n';
	html+='<br/>\n';
	html+='<p style="font-size:10px;">\n';
	html+='	<font style ="color: blue; font-style: italic;">\n';
	html+='		Terminals/Ports indicated under THE Alliance services are not fixed and subject to change.\n';
	html+='	</font>\n';
	html+='	<br/>\n';
	html+='	Please note ports shown are <font color="red">assumed</font> and <u>do not</u> represent final product:\n';
	html+='</p>\n';
	html+='<br/>\n';
	html+='<div class="divTable" style="width:100%">\n';
	html+='  <div class="divHeading">\n';
	html+='      <div class="divCell" style="width:50%">\n';
	html+='          Ports indicated as\n';
	html+='      </div>\n';
	html+='      <div class="divCell" style="width:50%">\n';
	html+='          Refers to\n';
	html+='      </div>\n';
	html+='  </div>\n';
	html+='  <div class="divRow">\n';
	html+='      <div class="divCell">\n';
	html+='          Hong Kong, Yantian, Shekou, Da Chan Bay, Nansha\n';
	html+='      </div>\n';
	html+='      <div class="divCell">\n';
	html+='        South China / Hong Kong Hub<font color="red"> - Ports are not confirmed</font>\n';
	html+='      </div>\n';
	html+='  </div>\n';
	html+='  <div class="divRow">\n';
	html+='      <div class="divCell">\n';
	html+='          Port Said, Damietta, Piraeus\n';
	html+='      </div>\n';
	html+='      <div class="divCell">\n';
	html+='          East Mediterranean Hub<font color="red"> - Ports are not confirmed</font>\n';
	html+='      </div>\n';
	html+='  </div>\n';
	html+='  <div class="divRow">\n';
	html+='      <div class="divCell">\n'; 
	html+='          Singapore, Port Kelang\n';
	html+='      </div>\n';
	html+='      <div class="divCell">\n';
	html+='          South East Asia Hub<font color="red"> - Ports are not confirmed</font>\n';
	html+='      </div>\n';
	html+='  </div>\n';
	html+='  <div class="divRow">\n';
	html+='      <div class="divCell">\n';
	html+='          Khor Fakan, Jebel Ali, Abu Dhabi\n';
	html+='      </div>\n';
	html+='      <div class="divCell">\n';
	html+='          Arabian Gulf Hub<font color="red"> - Ports are not confirmed</font>\n';
	html+='      </div>\n';
	html+='  </div>\n';
	html+='  <div class="divRow">\n';
	html+='      <div class="divCell">\n';
	html+='          Felixstowe, Southampton, London Gateway\n';
	html+='      </div>\n';
	html+='      <div class="divCell">\n';
	html+='         	UK Ports<font color="red"> - Ports are not confirmed</font>\n';
	html+='      </div>\n';
	html+='  </div>\n';
	html+='</div>\n';
	html+='<br/>\n';
	html+='<p style="font-size:10px;">\n';
	html+='	Users are kindly reminded to refer to our <a href="javascript:void(0);" onclick="openLTUPop()">Legal Terms of Use</a> \n';
	html+='	for all information contained in NYK website(s).\n';
	html+='</p>\n';

	$("#"+idVal).html(html);
	
	$(".divTable").css("display", "table");

	$(".divTitle").css("display","table-caption");
	$(".divTitle").css("text-align","center");
	$(".divTitle").css("font-weight","bold");
	$(".divTitle").css("font-size","larger");

	$(".divHeading").css("display","table-row");
	$(".divHeading").css("font-weight","bold");
	$(".divHeading").css("text-align","center");
	$(".divHeading").css("vertical-align","middle");
	$(".divHeading").css("background-color","#999");
	$(".divHeading").css("height","15px");

	$(".divRow").css("display","table-row");
	$(".divRow").css("height","15px");
	$(".divRow").css("vertical-align","middle");

	$(".divCell").css("display","table-cell");
	$(".divCell").css("border","solid");
	$(".divCell").css("border-width","thin");
	$(".divCell").css("padding-left","5px");
	$(".divCell").css("padding-right","5px");
	$(".divCell").css("font-size","10px");
	        
	return;
}

function openLTUPop(){
	$.popupWin( "/ecom/commonLTUPop.jsp", "commonLTUPop", { width:780, height:550 } );
}