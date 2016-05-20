var page = require('./page');
setTimeout(function(){
	page.loadPage('p1');console.log("开始跳转P1","");
}, 2000);

setTimeout(function(){
	page.loadPage('p2');
}, 7000);
