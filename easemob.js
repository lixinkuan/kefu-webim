!function(window,undefined){var message,iframe,iframeId,curChannel,curUser,https="https:",getConfig=function(key){var that;if(key){for(var scripts=document.scripts,s=0,l=scripts.length;l>s;s++)if(scripts[s].src&&0<scripts[s].src.indexOf(key)){that=scripts[s].src;break}}else that=location.href;var obj={};if(!that)return{str:"",json:obj,domain:""};var tmp,idx=that.indexOf("?"),sIdx=that.indexOf("//")>-1?that.indexOf("//"):0,domain=that.slice(sIdx,that.indexOf("/",sIdx+2)),arr=that.slice(idx+1).split("&");obj.src=that.slice(0,idx);for(var i=0,l=arr.length;l>i;i++)tmp=arr[i].split("="),obj[tmp[0]]=tmp.length>1?tmp[1]:"";return{str:that,json:obj,domain:domain+"/"}},config=getConfig("easemob.js");config.json.hide="false"==config.json.hide?!1:config.json.hide;var open=function(){message.listenToIframe(function(msg){var user,channel;switch(msg.indexOf("setuser")>-1&&(user=msg.split("@").length>0?msg.split("@")[1]:"",msg=msg.split("@").length>0?msg.split("@")[0]:""),msg.indexOf("setchannel")>-1&&(channel=msg.split("@").length>0?msg.split("@")[1]:"",msg=msg.split("@").length>0?msg.split("@")[0]:""),msg){case"showChat":iframe.style.width="400px",iframe.style.height="500px",iframe.style.right="10px",iframe.style.cssText+="box-shadow: 0 4px 8px rgba(0,0,0,.2);border-radius: 4px;";break;case"minChat":iframe.style.boxShadow="none",iframe.style.borderRadius="4px;",iframe.style.right="-5px",config.json.hide?(iframe.style.width="0",iframe.style.height="0"):(iframe.style.height="37px",iframe.style.width="102px");break;case"setuser":Emc.setcookie("emKefuUser",user);break;case"setchannel":Emc.setcookie("emKefuChannel",channel)}}),window.easemobIM=function(){if(EasemobWidget.utils.isMobile){var i=document.getElementById(iframeId),a=window.event.srcElement||window.event.target;a.setAttribute("href",i.getAttribute("src")),a.setAttribute("target","_blank")}else message.sendToIframe("imclick")}},appendIframe=function(){if(iframe=document.createElement("iframe"),iframeId="EasemobIframe"+(new Date).getTime(),iframe.id=iframeId,iframe.name=(new Date).getTime(),iframe.frameBorder=0,iframe.style.cssText="            z-index:16777270;            overflow:hidden;            position:fixed;            bottom:10px;            right:-5px;            border:none;            width:400px;            height:0;            display:none;            transition:all .01s;",iframe.src=https+config.domain+"webim/im.html?tenantId="+config.json.tenantId+(config.json.hide?"&hide=true":"")+(config.json.color?"&color="+config.json.color:"")+(config.json.preview?"&preview="+config.json.preview:"")+(curChannel?"&c="+curChannel:"")+(curUser?"&u="+curUser:"")+"&v="+(new Date).getTime(),config.json.hide||(iframe.style.height="37px",iframe.style.width="100px"),EasemobWidget.utils.isMobile&&(iframe.style.cssText+="left:0;bottom:0",iframe.style.width="100%"),config.json&&config.json.preview){var curDom=document.getElementById(config.json.previewid);curDom?curDom.appendChild(iframe):document.body.appendChild(iframe)}else document.body.appendChild(iframe);iframe.readyState?iframe.onreadystatechange=function(){("loaded"==iframe.readyState||"complete"==iframe.readyState)&&(this.style.display="block",message=new EmMessage(iframeId),open())}:iframe.onload=function(){this.style.display="block",message=new EmMessage(iframeId),open()}},script=document.createElement("script");script.src=https+config.domain+"webim/easemob.utils.js",(document.head||document.getElementsByTagName("head")[0]).appendChild(script),script.readyState?script.onreadystatechange=function(){("loaded"==script.readyState||"complete"==script.readyState)&&(curUser=Emc.getcookie("emKefuUser"),curChannel=Emc.getcookie("emKefuChannel"),appendIframe())}:script.onload=function(){curUser=Emc.getcookie("emKefuUser"),curChannel=Emc.getcookie("emKefuChannel"),appendIframe()}}(window,void 0);