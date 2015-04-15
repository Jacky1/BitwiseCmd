/*! BitwiseCmd 2015-04-15 */
"use strict";window.core={},function(){window.core.is={plainObject:function(a){return"object"==typeof a&&a instanceof Object},aFunction:function(a){return"function"==typeof a},string:function(a){return"string"==typeof a},regex:function(a){return"object"==typeof a&&this.constructedFrom(RegExp)},constructedFrom:function(a,b){return a instanceof b},htmlElement:function(a){return a instanceof HtmlElement},array:function(a){return a instanceof Array},number:function(a){return"number"==typeof a&&!isNaN(a)}}}(),function(){function a(a,b){return"string"==typeof a?a+" "+b:b}var b=window.core.is;window.core.should={beNumber:function(c,d){this.check(b.number(c),c+" is not a number"),this.check(isFinite(c),a(d,"is an infinite number"))},bePositiveInteger:function(b,c){this.beNumber(b),this.check(b>=0,a(c,"should be positive integer"))},notBeNull:function(b,c){this.check(null!=b,a(c,"is null or undefined"))},beString:function(a,b){this.check("string"==typeof a,"should be a string")},check:function(a,b){if(a!==!0)throw new Error(b)}}}(),function(a){function b(a){this.store=a||{},this.resolutionStack=[]}function c(a){if(e(this.resolutionStack,a))throw new Error("Failed to resolve service: "+a+". Circular reference: "+this.resolutionStack.join(" < "));this.resolutionStack.unshift(a);var b=this.store[a];if(null==b)throw new Error(a+" component is not registered");return null==b.resolved&&b.createInstance(),this.resolutionStack.shift(),b.resolved}function d(a){this.def=a,this.resolved=null}function e(a,b){for(var c=a.length;c-->0;)if(a[c]===b)return!0;return!1}var f=a.is;b.prototype.register=function(a,b){var c;return null!=this.store[a]&&console.warn("Previous registration for [%1] has been replaced",a),c=b instanceof d?b:new d(b),c.name=a,this.store[a]=c,c},b.prototype.resolve=function(a){return c.call(this,a)},b.prototype.clone=function(){var a={};for(var c in this.store)a[c]=this.store[c];return new b(a)},d.prototype.createInstance=function(){var a=this.def;this.resolved="function"==typeof a?a():a,f.aFunction(this.onFirstTimeResolve)&&this.onFirstTimeResolve(this.resolved)},b.Registration=d,a.Container=b}(window.core),function(){function a(a){this.models={},this.di=a,this.runList=[],this.compositionList=[]}function b(a){a.forEach(function(a){a()})}a.prototype.get=function(a){return this.di.resolve(a)},a.prototype.set=function(a,b){this.di.register(a,b)},a.prototype.run=function(a){this.runList.push(a)},a.prototype.compose=function(a){this.compositionList.push(a)},a.prototype.initialize=function(){b(this.compositionList),b(this.runList)},window.core.AppShell=a}(),function(core){function normalize(a){return a.replace(/(\r|\n)+/g,"").replace("'","\\'")}function replaceToken(a,b){if(0==a.indexOf("each")){var c=/([\w\.]+)\sin\s([\w\.]+)/g,d=c.exec(a),e=d[1],f=d[2];return"var "+e+"_list = "+f+".slice(), "+e+";\r\nwhile(("+e+"="+e+"_list.splice(0,1)[0])!==undefined)\r\n{"}return"/"==a?"}":"		html.push("+a+");"}var html={},should=core.should;html.element=function(a,b){var c=document.createElement("div");return c.innerHTML=html.template(a,b),c.children[0]},html.template=function(a,b){should.beString(a,"template");var c,d=/(?:{([^}]+)})/g;return c=null==b?a:a.replace(d,function(a,c){return html.escapeHtml(b[c])})},html.compileTemplate=function(template){var regex=/(?:{([^}]+)})/g,sb=[];sb.push("(function() {"),sb.push("return function (m) { "),sb.push("	var html = [];");for(var m,index=0;null!==(m=regex.exec(template));)m.index>index&&sb.push("		html.push('"+normalize(template.substr(index,m.index-index))+"');"),sb.push(replaceToken(m[1])),index=m.index+m[0].length;return index<template.length-1&&sb.push("		html.push('"+normalize(template.substr(index,template.length-index))+"');"),sb.push("	return html.join('');"),sb.push("}"),sb.push("})()"),eval(sb.join("\r\n"))},html.escapeHtml=function(a){return null==a?a:("string"!=typeof a&&(a=a.toString()),a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"))},core.html=html}(window.core),function(a){function b(){this.$store={},this.$executionHandlers=[]}var c=a.is;b.create=function(a){var c=new b;for(var d in a)a.hasOwnProperty(d)&&(Object.defineProperty(c,d,{get:b.createGetter(d),set:b.createSetter(d)}),c[d]=a[d]);return Object.seal(c)},b.createGetter=function(a,b){return function(){return this.$store[a]}},b.createSetter=function(a,b){return function(b){this.$store[a]=b,this.notifyPropertyChanged(a,b)}},b.prototype.observe=function(a,b){var d;if(c.aFunction(a))d=a;else{if(!c.string(a)||!c.aFunction(b))return void console.warn("Unsupported set of arguments: ",arguments);d=function(c,d){c===a&&b(d)}}var e=this.$executionHandlers,f=e.push(d);return function(){e.splice(1,f)}},b.prototype.notifyPropertyChanged=function(a,b){this.$executionHandlers.forEach(function(c){c(a,b)})},b.prototype.store=function(){return this.$store},b.prototype.keys=function(){return Object.keys(this.$store)},a.ObservableObject=b}(window.core),function(a){var b=new a.Container,c=new a.AppShell(b);c.set("cmdConfig",a.ObservableObject.create({emphasizeBytes:!0,theme:"dark"})),c.debugMode=!1,c.bootstrap=function(a){this.rootViewElement=a,this.set("rootView",a),this.initialize()},window.app=c}(window.core),function(a,b){function c(a){a.attachView=function(b){this.viewElement=b,"function"==typeof a.onViewAttached&&a.onViewAttached(b)},a.detachView=function(){this.viewElement=null,"function"==typeof a.onViewDetached&&a.onViewDetached(viewElement)}}function d(b){for(var c,d,e,f=b.querySelectorAll("[data-controller]"),g=0,h=f.length;h>g;g++)e=f[g],c=e.getAttribute("data-controller"),d=a.controller(c),null!=d?(d.attachView(e),"function"==typeof d.detachView&&e.addEventListener("DOMNodeRemoved",function(a){e===a.target&&d.detachView()})):console.warn(c+" controller wasn't found")}var e=b.should;a.controller=function(a,d){if(e.beString(a,"name"),null==d)return this.get(a);var f=new b.Container.Registration(d);f.onFirstTimeResolve=function(a){c(a)},this.set(a,f)},a.run(function(){d(a.get("rootView"),a.di)})}(window.app,window.core),function(a){function b(a,b){this.html=a,this.isCompiled=b===!0}function c(c){var d=c.querySelectorAll("[data-template]"),e=a.templates;Array.prototype.forEach.call(d,function(c){var d=c.getAttribute("data-template");if(e[d]instanceof b)return void console.warn(d+" templates already registered");var f=new b(c.innerHTML);e[d]=f,c.hasAttribute("data-compiled")&&(f.process=a.get("html").compileTemplate(f.html),f.isCompiled=!0)})}b.prototype.render=function(b){return this.isCompiled?a.get("html").element(this.process(b)):a.get("html").element(this.html,b)},a.templates=[],a.template=function(a){var b=this.templates[a];if(null==b)throw new Error(a+" template is not found");return b},a.run(function(){c(a.get("rootView"))})}(window.app),function(a,b){function c(a){return d(a)+"ViewBuilder"}function d(a){var b=a.toString();return b.substr(8,b.indexOf("(")-8).trim()}a.modelView=function(b,d){var e=c(b);a.di.register(e,d)},a.buildViewFor=function(a){var b=c(a.constructor),d=this.di.resolve(b);return d.renderView(a)}}(window.app,window.is),app.set("calc",function(){var should=app.get("should");return{numberOfBits:function(a){return 0>a?32:(should.bePositiveInteger(a),Math.floor(Math.log(a)/Math.log(2))+1)},maxNumberOfBits:function(a){for(var b,c=[],d=0;d<a.length;d++)b=a[d],c.push(this.numberOfBits(b));return Math.max.apply(null,c)},calcExpression:function(expr){return eval(expr.string)}}}),app.set("expression",function(){function a(a){var b=new app.models.BitwiseOperation;return b.operand1=new f(a[1]),b.operand2=new f(a[3]),b.sign=a[2],b.string=a.input,b}function b(a){var b=new app.models.BitwiseOperation;return b.operand1=new f(a[2]),b.sign=a[1],b.string=a.input,b}function c(a){var b=[];return a.split(" ").forEach(function(a){a.trim().length>0&&b.push(new f(a.trim()))}),new app.models.BitwiseNumbers(b)}function d(a){switch(a){case"bin":return 2;case"hex":return 16;case"dec":return 10}}function e(a){return 0==a.indexOf("-")?"-0x"+a.substr(1):"0x"+a}function f(a){this.input=a,this.value=parseInt(a),this.hex=e(this.value.toString(16)),this.dec=this.value.toString(10),this.bin=(this.value>>>0).toString(2),this.kind=this.input.indexOf("0x")>-1?"hex":"dec",this.other="dec"==this.kind?this.hex:this.dec}var g=/^(-?(?:\d+|0x[\d,a-f]+))\s*(<<|>>|>>>|\||\&|\^)\s*(-?(?:\d+|0x[\d,a-f]+))$/,h=/^(-?(?:\d+|0x[\d,a-f]+)\s?)+$/,i=/^(~)(-?(?:\d+|0x[\d,a-f]+))$/;return{canParse:function(a){return g.test(a)||h.test(a)||i.test(a)},parse:function(d){var e=d.replace(/^\s+|\s+$/,""),f=g.exec(e);return null!=f?a(f):(f=i.exec(e),null!=f?b(f):(f=h.exec(d),null!=f?c(d):void 0))},parseOperand:function(a){return new f(a)},createOperand:function(a,b){var c=a.toString(d(b));return"hex"==b&&(c=e(c)),new f(c)}}}),app.set("formatter",function(){function a(a){switch(a){case"bin":return 2;case"hex":return 16;case"dec":return 10}}app.get("should"),app.get("is");return{formatString:function(b,c){c=c||"bin";var d=b.toString(a(c));return d},padLeft:function(a,b,c){var d=Array.prototype.slice.call(a),c=c||"0";if(null==b)return a;for(;b>d.length;)d.unshift(c);return d.join("")}}}),app.set("cmd",function(){function a(a,b){var c=new app.models.ErrorResult(b);g.display(new app.models.DisplayResult(a,c))}function b(a,b){var c=b.handle(a);if(null!=c){var d=new app.models.DisplayResult(a,c);g.display(d)}}function c(a,b){return f.plainObject(a)?a:f.string(a)?{canHandle:function(b){return b===a},handle:b}:null}function d(a){var b=0;for(b;b<e.length;b++)if(e[b].canHandle(a))return e[b]}var e=[],f=app.get("is"),g=app.controller("cmdController");return{execute:function(c){var e=c.trim().toLowerCase(),f=d(e);if(null!=f)if(app.debugMode)b(e,f);else try{b(e,f)}catch(g){a(e,"Error: "+g)}else a(e,"Unsupported expression: "+e.trim())},commands:function(a){for(var b in a)a.hasOwnProperty(b)&&this.command(b,a[b])},command:function(a,b){var d=c(a,b);return null==d?void console.warn("unexpected set of arguments: ",Array.prototype.splice.call(arguments)):f.aFunction(d.canHandle)?f.aFunction(d.handle)?void e.push(d):void console.warn('handler is missing "handle" function. registration denied.'):void console.warn('handler is missing "canHandle" function. registration denied.')},clear:function(){g.clear()}}}),app.run(function(){function a(a){var b=a.parentNode.parentNode;if(b.parentNode.firstChild!=b){var c=b.parentNode;c.removeChild(b),c.insertBefore(b,c.firstChild)}}{var b=app.get("cmd"),c=app.get("cmdConfig");app.get("rootView")}b.commands({help:function(){var b=document.querySelector(".result .helpResultTpl");return null!=b?void a(b):new app.models.ViewResult("helpResultTpl")},clear:function(){b.clear()},em:function(){c.emphasizeBytes=!c.emphasizeBytes},dark:function(){c.theme="dark"},light:function(){c.theme="light"},about:function(){var b=document.querySelector(".result .aboutTpl");return null!=b?void a(b):new app.models.ViewResult("aboutTpl")},"-debug":function(){app.debugMode=!0},"-notrack":function(){}}),b.command({canHandle:function(a){return app.get("expression").canParse(a)},handle:function(a){return app.get("expression").parse(a)}})}),app.controller("expressionInputCtrl",function(){var a=app.get("cmd");return{onViewAttached:function(){var b=this;b.history=[],b.historyIndex=0,this.viewElement.focus(),this.viewElement.addEventListener("keyup",function(c){var d=c.target;13==c.keyCode&&0!=d.value.trim().length&&(a.execute(d.value),b.history.unshift(d.value),b.historyIndex=0,d.value="")}),this.viewElement.addEventListener("keydown",function(a){return 38==a.keyCode?(b.history.length>b.historyIndex&&(a.target.value=b.history[b.historyIndex++]),void a.preventDefault()):void(40==a.keyCode&&(b.historyIndex>0&&(a.target.value=b.history[--b.historyIndex]),a.preventDefault()))})}}}),app.controller("cmdController",function(){app.get("html"),app.get("rootView");return{clear:function(){this.viewElement.innerHTML=""},display:function(a){var b=app.buildViewFor(a),c=this.viewElement;0==c.childNodes.length?c.appendChild(b):c.insertBefore(b,c.childNodes[0])}}}),app.controller("configPanelCtrl",{onViewAttached:function(){var a=this,b=app.get("cmdConfig");a.update(b),b.observe(function(){a.update(b)})},update:function(a){var b=this.viewElement.querySelector("#emphasizeBytes");a.emphasizeBytes?b.classList.add("on"):b.classList.remove("on")}}),app.compose(function(){function a(a){var b=e.maxNumberOfBits(a);if(g.emphasizeBytes&&b%8!=0){if(8>b)return 8;var c=b-b%8;return c+8}return b}function b(a){var b=a.querySelectorAll(".bin");return Array.prototype.forEach.call(b,function(a){var b=a.textContent;a.innerHTML=b.replace(/(\d{8})/g,'<span class="byte">$1</span>').replace(/0/g,'<span class="zero">0</span>').replace(/1/g,'<span class="one">1</span>')}),a}function c(a){for(var b=0;b<a.length;b++)if(null!=a[b]&&"hex"==a[b].kind)return"hex";return"dec"}var d=app.get("formatter"),e=app.get("calc"),f=app.get("html"),g=app.get("cmdConfig"),h=app.get("expression");String.prototype.padLeft=function(a,b){return d.padLeft(this,a,b)},app.modelView(app.models.BitwiseOperation,function(){function d(a){switch(a.sign){case"<<":case">>":case">>>":return"shiftExpressionView";case"~":return"notExpressionView";default:return"binaryExpressionView"}}return{renderView:function(f){var g=h.createOperand(e.calcExpression(f),c([f.operand1,f.operand2])),i=a([f.operand1.value,null!=f.operand2?f.operand2.value:0,g.value]),j=Object.create(f);j.bitsSize=i,j.result=g;var k=d(j),l=app.template(k);return b(l.render(j))}}}),app.modelView(app.models.BitwiseNumbers,{renderView:function(c){return c.bitsSize=a(c.numbers),b(app.template("numbersList").render(c))}}),app.modelView(app.models.ViewResult,{renderView:function(a){var b=app.template(a.template);return b.render()}}),app.modelView(app.models.ErrorResult,{renderView:function(a){return f.element('<div class="error">{message}</div>',a)}}),app.modelView(app.models.DisplayResult,{renderView:function(a){var b=app.template("resultView").render(a),c=app.buildViewFor(a.content);return b.querySelector(".content").appendChild(c),b}})}),function(app){function BitwiseOperation(){}function BitwiseNumbers(a){this.operands=a;var b=this.numbers=[];a.forEach(function(a){b.push(a.value)})}function ErrorResult(a){this.message=a}function ViewResult(a){this.template=a}function DisplayResult(a,b){this.input=a,this.inputHash=app.get("hash").encodeHash(a),this.content=b}BitwiseOperation.prototype.calculate=function(){return eval(this.string)},app.models.BitwiseOperation=BitwiseOperation,app.models.BitwiseNumbers=BitwiseNumbers,app.models.ErrorResult=ErrorResult,app.models.ViewResult=ViewResult,app.models.DisplayResult=DisplayResult}(window.app),app.run(function(){var a=app.get("rootView"),b=app.get("cmdConfig");b.observe("theme",function(b){var c="dark"==b?"light":"dark";a.classList.contains(b)||(a.classList.remove(c),a.classList.add(b))})}),app.run(function(){function a(){localStorage.setItem(d,JSON.stringify(c.store()))}function b(){var a,b=localStorage.getItem(d);if(core.is.string(b)){a=JSON.parse(b);for(var e in a)c[e]=a[e]}}var c=app.get("cmdConfig"),d="cmdConfig";b(),c.observe(function(b,c){a()})}),app.run(function(){var a=app.get("rootView").querySelectorAll("[data-cmd]");Array.prototype.forEach.call(a,function(a){a.addEventListener("click",function(a){app.get("cmd").execute(a.target.getAttribute("data-cmd"))})})}),function(a,b){a.set("html",b.html),a.set("is",b.is),a.set("should",b.should),a.set("bindr",b.bindr),a.set("hash",function(){function a(a){var b=[];return a.indexOf("||")?a.split("||").forEach(function(a){a.length>0&&b.push(a)}):b.push(a),b}return{encodeHash:function(a){return encodeURI(a.trim().replace(/\s/g,","))},decodeHash:function(a){return decodeURI(a).replace(/^\#/,"").replace(/,/g," ")},getArgs:function(c){b.should.beString(c,"hashValue");var d=this.decodeHash(c),e={commands:[]};return a(d).forEach(function(a){return/^\-[a-zA-Z]+$/.test(a)?void(e[a.substr(1)]=!0):void e.commands.push(a)}),Object.freeze(e)}}}),a.set("hashArgs",function(){return a.get("hash").getArgs(window.location.hash)})}(window.app,window.core);