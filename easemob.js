!function(window,undefined){"use strict";var message,iframe,iframeId,curChannel,curUser,initdata,eTitle=document.title,iframePosition={x:0,y:0},shadow=document.createElement("div"),newTitle="-新消息提醒  ",titleST=0,getConfig=function(key){var that;if(key){for(var scripts=document.scripts,s=0,l=scripts.length;l>s;s++)if(scripts[s].src&&0<scripts[s].src.indexOf(key)){that=scripts[s].src;break}}else that=location.href;var obj={};if(!that)return{str:"",json:obj,domain:""};var tmp,idx=that.indexOf("?"),sIdx=that.indexOf("//")>-1?that.indexOf("//"):0,domain=that.slice(sIdx,that.indexOf("/",sIdx+2)),arr=that.slice(idx+1).split("&");obj.src=that.slice(0,idx);for(var i=0,l=arr.length;l>i;i++)tmp=arr[i].split("="),obj[tmp[0]]=tmp.length>1?tmp[1]:"";return{str:that,json:obj,domain:domain+"/"}},config=getConfig("easemob.js");config.json.hide="false"==config.json.hide?!1:config.json.hide;var open=function(){message.listenToIframe(function(msg){var user,channel,group;if(msg.indexOf("setuser")>-1&&(user=msg.split("@").length>0?msg.split("@")[1]:"",msg=msg.split("@").length>0?msg.split("@")[0]:""),msg.indexOf("setchannel")>-1&&(channel=msg.split("@").length>0?msg.split("@")[1]:"",msg=msg.split("@").length>0?msg.split("@")[0]:""),msg.indexOf("setgroupuser")>-1){var idx=msg.indexOf("@emgroupuser@");user=msg.slice(13,idx),group=unescape(msg.slice(idx+13)),msg="setgroupuser"}switch(msg){case"msgPrompt":var p,tArr=(eTitle+newTitle).split("");clearInterval(titleST),titleST=setInterval(function(){p=tArr.shift(),document.title=p+Array.prototype.join.call(tArr,""),tArr.push(p)},360),notify("//kefu.easemob.com/webim/resources/avatar2.png","提醒","您有1条新消息");break;case"recoveryTitle":clearInterval(titleST),document.title=eTitle;break;case"showChat":iframe.style.width="400px",iframe.style.height="500px",0==iframePosition.x&&0==iframePosition.y?iframe.style.right="10px":(iframe.style.right=iframePosition.x+"px",iframe.style.bottom=iframePosition.y+"px"),iframe.style.cssText+="box-shadow: 0 4px 8px rgba(0,0,0,.2);border-radius: 4px;*border: 1px solid #ccc;border: 1px solid #ccc\\9;";break;case"minChat":iframe.style.boxShadow="none",iframe.style.borderRadius="4px;",iframe.style.right="-5px",iframe.style.bottom="10px",iframe.style.border="none",config.json.hide?(iframe.style.width="0",iframe.style.height="0"):(iframe.style.height="37px",iframe.style.width="102px");break;case"setuser":Emc.setcookie("emKefuUser",user);break;case"setgroupuser":Emc.setcookie(group,user);break;case"setchannel":Emc.setcookie("emKefuChannel",channel);break;case"dragready":shadow.style.display="block",iframe.style.display="none",EasemobWidget.utils.on(document,"mousemove",_move)}}),window.easemobIM=function(group){if(EasemobWidget.utils.isMobile){var i=document.getElementById(iframeId),a=window.event.srcElement||window.event.target;group?(a.setAttribute("href",i.getAttribute("src")+"&emgroup="+escape(group)),a.setAttribute("target","_blank")):(a.setAttribute("href",i.getAttribute("src")),a.setAttribute("target","_blank"))}else if(group){var groupUser=Emc.getcookie(group);message.sendToIframe("emgroup@"+groupUser+"@emgroupuser@"+escape(group))}else message.sendToIframe("imclick")}},appendIframe=function(){if(iframe=/MSIE (6|7|8)/.test(navigator.userAgent)?document.createElement('<iframe name="'+(new Date).getTime()+'">'):document.createElement("iframe"),iframeId="EasemobIframe"+(new Date).getTime(),iframe.id=iframeId,iframe.name=(new Date).getTime(),iframe.frameBorder=0,iframe.allowTransparency="true",iframe.style.cssText="            z-index:16777269;            overflow:hidden;            position:fixed;            bottom:10px;            right:-5px;            border:none;            width:400px;            height:0;            display:none;            transition:all .01s;",shadow.style.cssText="            display:none;            cursor:move;            z-index:16777270;            position:fixed;            bottom:10px;            right:-5px;            border:none;            width:400px;            height:500px;            background-color:rgb(200,200,200);            background-color:rgba(0,0,0,.1);",initdata="initdata:"+config.domain+"webim/im.html?tenantId="+config.json.tenantId+(config.json.hide?"&hide=true":"")+(config.json.color?"&color="+config.json.color:"")+(config.json.preview?"&preview="+config.json.preview:"")+(curChannel?"&c="+curChannel:"")+(curUser?"&u="+curUser:"")+"&time="+(new Date).getTime(),iframe.src=config.domain+"webim/im.html?tenantId="+config.json.tenantId,config.json.hide||(iframe.style.height="37px",iframe.style.width="100px"),EasemobWidget.utils.isMobile&&(iframe.style.cssText+="left:0;bottom:0",iframe.style.width="100%"),config.json&&config.json.preview){var curDom=document.getElementById(config.json.previewid);curDom?curDom.appendChild(iframe):document.body.appendChild(iframe)}else document.body.appendChild(shadow),document.body.appendChild(iframe);iframe.readyState?iframe.onreadystatechange=function(){("loaded"==iframe.readyState||"complete"==iframe.readyState)&&(this.style.display="block",message=new EmMessage(iframeId),open(),message.sendToIframe(initdata))}:iframe.onload=function(){this.style.display="block",message=new EmMessage(iframeId),open(),message.sendToIframe(initdata)}},script=document.createElement("script");script.src=config.domain+"webim/easemob.utils.js",(document.head||document.getElementsByTagName("head")[0]).appendChild(script),script.readyState?script.onreadystatechange=function(){("loaded"==script.readyState||"complete"==script.readyState)&&(curUser=Emc.getcookie("emKefuUser"),curChannel=Emc.getcookie("emKefuChannel"),appendIframe(),EasemobWidget.utils.on(shadow,"mouseup",_moveend))}:script.onload=function(){curUser=Emc.getcookie("emKefuUser"),curChannel=Emc.getcookie("emKefuChannel"),appendIframe(),EasemobWidget.utils.on(shadow,"mouseup",_moveend)};var _st=0,_move=function(e){var _x=(window.event||e,document.body.clientWidth-e.clientX),_y=document.body.clientHeight-e.clientY;shadow.style.right=_x+"px",shadow.style.bottom=_y+"px",iframePosition={x:_x,y:_y},clearTimeout(_st),_st=setTimeout(_moveend,700)},_moveend=function(){EasemobWidget.utils.remove(document,"mousemove",_move),iframe.style.right=iframePosition.x+"px",iframe.style.bottom=iframePosition.y+"px",shadow.style.display="none",iframe.style.display="block"},notify=function(img,title,content){img=img||"",title=title||"",content=content||"";try{if(window.Notification)if("granted"===Notification.permission){new Notification(title,{icon:img,body:content})}else Notification.requestPermission()}catch(e){}}}(window,void 0);