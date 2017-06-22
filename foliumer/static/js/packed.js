document.addEventListener('DOMContentLoaded',function(e){var page_id=document.querySelector('input[name="page_id"]');if(typeof page_id!='undefined'){if(page_id!=null){window.page_id=page_id.value;setup_editables();}}});function insert_spinner(dom){dom.innerHTML='<div class="spinner"></div>';}
var wpost=function(url,data,callback){var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(xhr.readyState==XMLHttpRequest.DONE){callback(xhr.responseText);}}
xhr.open('POST',url,true);xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");xhr.send(JSON.stringify(data));};var wget=function(url,callback){var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(xhr.readyState==XMLHttpRequest.DONE){callback(xhr.responseText);}}
xhr.open('GET',url,true);xhr.send(null);};function save_page(){var obj={};obj['page_id']=window.page_id;var editables=document.querySelectorAll('.admin-editable');obj['editables']=[];for(var i=0;i<editables.length;i++){var editable={"editable_id":editables[i].getAttribute('data-editable-id'),"text":editables[i].innerHTML};obj['editables'].push(editable);}
wpost('/save/',JSON.stringify(obj),function(data){console.log(data);});}
function setup_editables(){if(typeof window.editor=='undefined')
window.editor={};wget('/pagedata/'+window.page_id,function(pagedata){window.page=JSON.parse(pagedata);var editables=document.querySelectorAll('.admin-editable');for(var i=0;i<editables.length;i++){var editable=editables[i];if(!editable.hasAttribute('data-editable-id')){editable.setAttribute('data-editable-id',window.page_id+'_'+i);}else{if(window.page['editables']!=null){for(var ii=0;ii<window.page['editables'].length;ii++){if(window.page['editables'][ii]['editable_id']==editable.getAttribute('data-editable-id'))
editable.innerHTML=window['page']['editables'][ii]['text'];}}}}
window.editor=new MediumEditor('.admin-editable',{});});}
document.addEventListener('DOMContentLoaded',function(e){var main_menu=document.getElementById('main-menu');if(typeof main_menu=='undefined')
return;if(main_menu==null)
return;var main_menu_height=parseInt(getComputedStyle(main_menu).height.replace('px',''));main_menu.style.top=-main_menu_height+'px';var main_menu_button=main_menu.querySelector('.drop-menu-button');main_menu_button.addEventListener('click',function(e){var tmp_data={'dy':0,'menu':main_menu,'menu_height':main_menu_height};var drop=true;if(parseInt(tmp_data['menu'].style.top.replace('px',''))<0){drop=true;}else{drop=false;}
var inter=setInterval(function(){if(drop)
tmp_data['dy']+=0.1;else
tmp_data['dy']-=0.1;if(tmp_data['dy']>0){if(tmp_data['dy']-0.001<0){tmp_data['dy']=0.001;}else{tmp_data['dy']-=0.001;}}
if(tmp_data['dy']<0){if(tmp_data['dy']+0.001>0){tmp_data['dy']=0.001;}else{tmp_data['dy']+=0.001;}}
var next_top=parseInt(tmp_data['menu'].style.top.replace('px',''))+tmp_data['dy'];if(next_top>=0&&drop){next_top=0;clearInterval(inter);}
if(!drop&&next_top<=-tmp_data['menu_height']){next_top=-tmp_data['menu_height'];clearInterval(inter);}
tmp_data['menu'].style.top=next_top+'px';},0,tmp_data);});});