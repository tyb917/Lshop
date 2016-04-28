/**
 * Allows you to add data-method="METHOD to links to automatically inject a form
 * with the method on click
 *
 * Example: <a href="{{route('customers.destroy', $customer->id)}}"
 * data-method="delete" name="delete_item">Delete</a>
 *
 * Injects a form with that's fired on click of the link with a DELETE request.
 * Good because you don't have to dirty your HTML with delete forms everywhere.
 */
function addDeleteForms() {
    $('[data-method="delete"]').append(function () {
        if (! $(this).find('form').length > 0)
            return "\n" +
                "<form action='" + $(this).attr('href') + "' method='POST' name='delete_item' style='display:none'>\n" +
                "   <input type='hidden' name='_method' value='" + $(this).attr('data-method') + "'>\n" +
                "   <input type='hidden' name='_token' value='" + $('meta[name="_token"]').attr('content') + "'>\n" +
                "</form>\n"
        else
            return "";
    })
        .removeAttr('href')
        .attr('style', 'cursor:pointer;')
        .attr('onclick', '$(this).find("form").submit();');
}

function Ueditor(){
    /*实例化编辑器*/
    UE.delEditor('editor');
    var ue = UE.getEditor('editor',{
        initialFrameHeight:350,//设置编辑器高度
        scaleEnabled:true
    });
    ue.ready(function() {
        ue.execCommand('serverparam', '_token', '{{ csrf_token() }}');//此处为支持laravel5 csrf ,根据实际情况修改,目的就是设置 _token 值.
    });
}

/**
 * Place any jQuery/helper plugins in here.
 */
$(function(){
    /**
     * Place the CSRF token as a header on all pages for access in AJAX requests
     */
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });

    /**
     * Add the data-method="delete" forms to all delete links
     */
    addDeleteForms();

    /**
     * Generic confirm form delete using Sweet Alert
     */
    $('body').on('submit', 'form[name=delete_item]', function(e){
        e.preventDefault();
        var form = this;

        sal({
            title: "警告",
            text: "你确定你要删除这个项目吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认删除",
            cancelButtonText: "返回",
            closeOnConfirm: true
        }, function(confirmed) {
            if (confirmed)
                form.submit();
        });
    });

    /**
     * Bind all bootstrap tooltips
     */
    $("[data-toggle=\"tooltip\"]").tooltip();

    /**
     * Bind all bootstrap popovers
     */
    $("[data-toggle=\"popover\"]").popover();

    /**
     * This closes the popover when its clicked away from
     */
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
});
/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(f){function A(a,b,d){var c=a[0],g=/er/.test(d)?_indeterminate:/bl/.test(d)?n:k,e=d==_update?{checked:c[k],disabled:c[n],indeterminate:"true"==a.attr(_indeterminate)||"false"==a.attr(_determinate)}:c[g];if(/^(ch|di|in)/.test(d)&&!e)x(a,g);else if(/^(un|en|de)/.test(d)&&e)q(a,g);else if(d==_update)for(var f in e)e[f]?x(a,f,!0):q(a,f,!0);else if(!b||"toggle"==d){if(!b)a[_callback]("ifClicked");e?c[_type]!==r&&q(a,g):x(a,g)}}function x(a,b,d){var c=a[0],g=a.parent(),e=b==k,u=b==_indeterminate,
v=b==n,s=u?_determinate:e?y:"enabled",F=l(a,s+t(c[_type])),B=l(a,b+t(c[_type]));if(!0!==c[b]){if(!d&&b==k&&c[_type]==r&&c.name){var w=a.closest("form"),p='input[name="'+c.name+'"]',p=w.length?w.find(p):f(p);p.each(function(){this!==c&&f(this).data(m)&&q(f(this),b)})}u?(c[b]=!0,c[k]&&q(a,k,"force")):(d||(c[b]=!0),e&&c[_indeterminate]&&q(a,_indeterminate,!1));D(a,e,b,d)}c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"default");g[_add](B||l(a,b)||"");g.attr("role")&&!u&&g.attr("aria-"+(v?n:k),"true");
g[_remove](F||l(a,s)||"")}function q(a,b,d){var c=a[0],g=a.parent(),e=b==k,f=b==_indeterminate,m=b==n,s=f?_determinate:e?y:"enabled",q=l(a,s+t(c[_type])),r=l(a,b+t(c[_type]));if(!1!==c[b]){if(f||!d||"force"==d)c[b]=!1;D(a,e,s,d)}!c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"pointer");g[_remove](r||l(a,b)||"");g.attr("role")&&!f&&g.attr("aria-"+(m?n:k),"false");g[_add](q||l(a,s)||"")}function E(a,b){if(a.data(m)){a.parent().html(a.attr("style",a.data(m).s||""));if(b)a[_callback](b);a.off(".i").unwrap();
f(_label+'[for="'+a[0].id+'"]').add(a.closest(_label)).off(".i")}}function l(a,b,f){if(a.data(m))return a.data(m).o[b+(f?"":"Class")]}function t(a){return a.charAt(0).toUpperCase()+a.slice(1)}function D(a,b,f,c){if(!c){if(b)a[_callback]("ifToggled");a[_callback]("ifChanged")[_callback]("if"+t(f))}}var m="iCheck",C=m+"-helper",r="radio",k="checked",y="un"+k,n="disabled";_determinate="determinate";_indeterminate="in"+_determinate;_update="update";_type="type";_click="click";_touch="touchbegin.i touchend.i";
_add="addClass";_remove="removeClass";_callback="trigger";_label="label";_cursor="cursor";_mobile=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);f.fn[m]=function(a,b){var d='input[type="checkbox"], input[type="'+r+'"]',c=f(),g=function(a){a.each(function(){var a=f(this);c=a.is(d)?c.add(a):c.add(a.find(d))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a=a.toLowerCase(),g(this),c.each(function(){var c=
f(this);"destroy"==a?E(c,"ifDestroyed"):A(c,!0,a);f.isFunction(b)&&b()});if("object"!=typeof a&&a)return this;var e=f.extend({checkedClass:k,disabledClass:n,indeterminateClass:_indeterminate,labelHover:!0},a),l=e.handle,v=e.hoverClass||"hover",s=e.focusClass||"focus",t=e.activeClass||"active",B=!!e.labelHover,w=e.labelHoverClass||"hover",p=(""+e.increaseArea).replace("%","")|0;if("checkbox"==l||l==r)d='input[type="'+l+'"]';-50>p&&(p=-50);g(this);return c.each(function(){var a=f(this);E(a);var c=this,
b=c.id,g=-p+"%",d=100+2*p+"%",d={position:"absolute",top:g,left:g,display:"block",width:d,height:d,margin:0,padding:0,background:"#fff",border:0,opacity:0},g=_mobile?{position:"absolute",visibility:"hidden"}:p?d:{position:"absolute",opacity:0},l="checkbox"==c[_type]?e.checkboxClass||"icheckbox":e.radioClass||"i"+r,z=f(_label+'[for="'+b+'"]').add(a.closest(_label)),u=!!e.aria,y=m+"-"+Math.random().toString(36).substr(2,6),h='<div class="'+l+'" '+(u?'role="'+c[_type]+'" ':"");u&&z.each(function(){h+=
'aria-labelledby="';this.id?h+=this.id:(this.id=y,h+=y);h+='"'});h=a.wrap(h+"/>")[_callback]("ifCreated").parent().append(e.insert);d=f('<ins class="'+C+'"/>').css(d).appendTo(h);a.data(m,{o:e,s:a.attr("style")}).css(g);e.inheritClass&&h[_add](c.className||"");e.inheritID&&b&&h.attr("id",m+"-"+b);"static"==h.css("position")&&h.css("position","relative");A(a,!0,_update);if(z.length)z.on(_click+".i mouseover.i mouseout.i "+_touch,function(b){var d=b[_type],e=f(this);if(!c[n]){if(d==_click){if(f(b.target).is("a"))return;
A(a,!1,!0)}else B&&(/ut|nd/.test(d)?(h[_remove](v),e[_remove](w)):(h[_add](v),e[_add](w)));if(_mobile)b.stopPropagation();else return!1}});a.on(_click+".i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var d=b[_type];b=b.keyCode;if(d==_click)return!1;if("keydown"==d&&32==b)return c[_type]==r&&c[k]||(c[k]?q(a,k):x(a,k)),!1;if("keyup"==d&&c[_type]==r)!c[k]&&x(a,k);else if(/us|ur/.test(d))h["blur"==d?_remove:_add](s)});d.on(_click+" mousedown mouseup mouseover mouseout "+_touch,function(b){var d=
b[_type],e=/wn|up/.test(d)?t:v;if(!c[n]){if(d==_click)A(a,!1,!0);else{if(/wn|er|in/.test(d))h[_add](e);else h[_remove](e+" "+t);if(z.length&&B&&e==v)z[/ut|nd/.test(d)?_remove:_add](w)}if(_mobile)b.stopPropagation();else return!1}})})}})(window.jQuery||window.Zepto);

!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return f({type:O.error,iconClass:g().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=g()),v=e("#"+t.containerId),v.length?v:(n&&(v=c(t)),v)}function i(e,t,n){return f({type:O.info,iconClass:g().iconClasses.info,message:e,optionsOverride:n,title:t})}function o(e){w=e}function s(e,t,n){return f({type:O.success,iconClass:g().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return f({type:O.warning,iconClass:g().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e){var t=g();v||n(t),l(e,t)||u(t)}function d(t){var i=g();return v||n(i),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function u(t){for(var n=v.children(),i=n.length-1;i>=0;i--)l(e(n[i]),t)}function l(t,n){return t&&0===e(":focus",t).length?(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0):!1}function c(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass).attr("aria-live","polite").attr("role","alert"),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:'<button type="button">&times;</button>',newestOnTop:!0,preventDuplicates:!1,progressBar:!1}}function m(e){w&&w(e)}function f(t){function i(t){return!e(":focus",l).length||t?(clearTimeout(O.intervalId),l[r.hideMethod]({duration:r.hideDuration,easing:r.hideEasing,complete:function(){h(l),r.onHidden&&"hidden"!==b.state&&r.onHidden(),b.state="hidden",b.endTime=new Date,m(b)}})):void 0}function o(){(r.timeOut>0||r.extendedTimeOut>0)&&(u=setTimeout(i,r.extendedTimeOut),O.maxHideTime=parseFloat(r.extendedTimeOut),O.hideEta=(new Date).getTime()+O.maxHideTime)}function s(){clearTimeout(u),O.hideEta=0,l.stop(!0,!0)[r.showMethod]({duration:r.showDuration,easing:r.showEasing})}function a(){var e=(O.hideEta-(new Date).getTime())/O.maxHideTime*100;f.width(e+"%")}var r=g(),d=t.iconClass||r.iconClass;if("undefined"!=typeof t.optionsOverride&&(r=e.extend(r,t.optionsOverride),d=t.optionsOverride.iconClass||d),r.preventDuplicates){if(t.message===C)return;C=t.message}T++,v=n(r,!0);var u=null,l=e("<div/>"),c=e("<div/>"),p=e("<div/>"),f=e("<div/>"),w=e(r.closeHtml),O={intervalId:null,hideEta:null,maxHideTime:null},b={toastId:T,state:"visible",startTime:new Date,options:r,map:t};return t.iconClass&&l.addClass(r.toastClass).addClass(d),t.title&&(c.append(t.title).addClass(r.titleClass),l.append(c)),t.message&&(p.append(t.message).addClass(r.messageClass),l.append(p)),r.closeButton&&(w.addClass("toast-close-button").attr("role","button"),l.prepend(w)),r.progressBar&&(f.addClass("toast-progress"),l.prepend(f)),l.hide(),r.newestOnTop?v.prepend(l):v.append(l),l[r.showMethod]({duration:r.showDuration,easing:r.showEasing,complete:r.onShown}),r.timeOut>0&&(u=setTimeout(i,r.timeOut),O.maxHideTime=parseFloat(r.timeOut),O.hideEta=(new Date).getTime()+O.maxHideTime,r.progressBar&&(O.intervalId=setInterval(a,10))),l.hover(s,o),!r.onclick&&r.tapToDismiss&&l.click(i),r.closeButton&&w&&w.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),i(!0)}),r.onclick&&l.click(function(){r.onclick(),i()}),m(b),r.debug&&console&&console.log(b),l}function g(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&(v.remove(),C=void 0))}var v,w,C,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:d,error:t,getContainer:n,info:i,options:{},subscribe:o,success:s,version:"2.1.0",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});
//# sourceMappingURL=/toastr.js.map
/*! Select2 4.0.2 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice;this.listeners=this.listeners||{},a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")});var f=e.filter("[aria-selected=true]");f.length>0?f.first().trigger("mouseenter"):e.first().trigger("mouseenter")})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&d.setClasses()}),b.on("unselect",function(){b.isOpen()&&d.setClasses()}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-b+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b class="fa fa-angle-down"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple"))return a.selected=!1,
c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},j,l),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){e.trigger("results:message",{message:"errorLoading"})});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&""!==a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");void 0!==f&&(this.createTag=f);var g=d.get("insertTag");if(void 0!==g&&(this.insertTag=g),b.call(this,c,d),a.isArray(e))for(var h=0;h<e.length;h++){var i=e[h],j=this._normalizeItem(i),k=this.option(j);this.$element.append(k)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(a,b,c){function d(a){e.trigger("select",{data:a})}var e=this;b.term=b.term||"";var f=this.tokenizer(b,this.options,d);f.term!==b.term&&(this.$search.length&&(this.$search.val(f.term),this.$search.focus()),b.term=f.term),a.call(this,b,c)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=this.$container.offset();f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom},m=this.$dropdownParent;"static"===m.css("position")&&(m=m.offsetParent());var n=m.offset();l.top-=n.top,l.left-=n.left,c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(){d._handleSelectOnClose()})},a.prototype._handleSelectOnClose=function(){var a=this.getHighlightedResults();if(!(a.length<1)){var b=a.data("data");null!=b.element&&b.element.selected||null==b.element&&b.selected||this.trigger("select",{data:b})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend(!0,{},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b=b.replace(/(:|\.|\[|\]|,)/g,""),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this._sync=c.bind(this._syncAttributes,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._sync);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._sync)}),this._observer.observe(this.$element[0],{attributes:!0,subtree:!1})):this.$element[0].addEventListener&&this.$element[0].addEventListener("DOMAttrModified",b._sync,!1)},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._sync),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&this.$element[0].removeEventListener("DOMAttrModified",this._sync,!1),this._sync=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d;return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2.");var e=Array.prototype.slice.call(arguments,1);d=c[b].apply(c,e)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});
!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){var s=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),h=o("./modules/default-params"),b=s(h),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?b["default"][e]:t[e]}var a=arguments[0];if(d.addClass(t.body,"stop-scrolling"),p.resetInput(),a===n)return f.logStr("SweetAlert expects at least 1 attribute!"),!1;var r=f.extend({},b["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return f.logStr('Missing "title" argument!'),!1;r.title=a.title;for(var s in b["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":b["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return f.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}w["default"](r),p.fixVerticalPosition(),p.openModal(arguments[1]);for(var u=p.getModal(),v=u.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return m.handleButton(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<h.length;S++){var x=h[S];v[C][x]=g}p.getOverlay().onclick=g,l=e.onkeydown;var k=function(e){return y["default"](e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");f.extend(b["default"],e)},u.close=c.close=function(){var o=p.getModal();d.fadeOut(p.getOverlay(),5),d.fadeOut(o,5),d.removeClass(o,"showSweetAlert"),d.addClass(o,"hideSweetAlert"),d.removeClass(o,"visible");var a=o.querySelector(".sa-icon.sa-success");d.removeClass(a,"animate"),d.removeClass(a.querySelector(".sa-tip"),"animateSuccessTip"),d.removeClass(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");d.removeClass(r,"animateErrorIcon"),d.removeClass(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return d.removeClass(s,"pulseWarning"),d.removeClass(s.querySelector(".sa-body"),"pulseWarningIns"),d.removeClass(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");d.removeClass(o,e)},300),d.removeClass(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=p.getModal(),n=t.querySelector(".sa-input-error");d.addClass(n,"show");var o=t.querySelector(".sa-error-container");d.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=p.getModal(),n=t.querySelector(".sa-input-error");d.removeClass(n,"show");var o=t.querySelector(".sa-error-container");d.removeClass(o,"show")},u.disableButtons=c.disableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},u.enableButtons=c.enableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:f.logStr("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var b=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":b.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},b=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=b},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},b=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=b,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],b=y[1];h&&b?(m=h,v=b):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
/*!
 DataTables 1.10.9
 ©2008-2015 SpryMedia Ltd - datatables.net/license
 */
(function (Fa, T, k) {
    var S = function (h) {
        function X(a) {
            var b, c, d = {};
            h.each(a, function (e) {
                if ((b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " "))c = e.replace(b[0], b[2].toLowerCase()), d[c] = e, "o" === b[1] && X(a[e])
            });
            a._hungarianMap = d
        }

        function I(a, b, c) {
            a._hungarianMap || X(a);
            var d;
            h.each(b, function (e) {
                d = a._hungarianMap[e];
                if (d !== k && (c || b[d] === k))"o" === d.charAt(0) ? (b[d] || (b[d] = {}), h.extend(!0, b[d], b[e]), I(a[d], b[d], c)) : b[d] = b[e]
            })
        }

        function S(a) {
            var b = m.defaults.oLanguage, c = a.sZeroRecords;
            !a.sEmptyTable && (c && "No data available in table" === b.sEmptyTable) && F(a, a, "sZeroRecords", "sEmptyTable");
            !a.sLoadingRecords && (c && "Loading..." === b.sLoadingRecords) && F(a, a, "sZeroRecords", "sLoadingRecords");
            a.sInfoThousands && (a.sThousands = a.sInfoThousands);
            (a = a.sDecimal) && cb(a)
        }

        function db(a) {
            A(a, "ordering", "bSort");
            A(a, "orderMulti", "bSortMulti");
            A(a, "orderClasses", "bSortClasses");
            A(a, "orderCellsTop", "bSortCellsTop");
            A(a, "order", "aaSorting");
            A(a, "orderFixed", "aaSortingFixed");
            A(a, "paging", "bPaginate");
            A(a, "pagingType", "sPaginationType");
            A(a, "pageLength", "iDisplayLength");
            A(a, "searching", "bFilter");
            "boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" : "");
            if (a = a.aoSearchCols)for (var b = 0, c = a.length; b < c; b++)a[b] && I(m.models.oSearch, a[b])
        }

        function eb(a) {
            A(a, "orderable", "bSortable");
            A(a, "orderData", "aDataSort");
            A(a, "orderSequence", "asSorting");
            A(a, "orderDataType", "sortDataType");
            var b = a.aDataSort;
            b && !h.isArray(b) && (a.aDataSort = [b])
        }

        function fb(a) {
            if (!m.__browser) {
                var b = {};
                m.__browser = b;
                var c =
                    h("<div/>").css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: 1,
                        width: 1,
                        overflow: "hidden"
                    }).append(h("<div/>").css({
                        position: "absolute",
                        top: 1,
                        left: 1,
                        width: 100,
                        overflow: "scroll"
                    }).append(h("<div/>").css({
                        width: "100%",
                        height: 10
                    }))).appendTo("body"), d = c.children(), e = d.children();
                b.barWidth = d[0].offsetWidth - d[0].clientWidth;
                b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth;
                b.bScrollbarLeft = 1 !== Math.round(e.offset().left);
                b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1;
                c.remove()
            }
            h.extend(a.oBrowser,
                m.__browser);
            a.oScroll.iBarWidth = m.__browser.barWidth
        }

        function gb(a, b, c, d, e, f) {
            var g, i = !1;
            c !== k && (g = c, i = !0);
            for (; d !== e;)a.hasOwnProperty(d) && (g = i ? b(g, a[d], d, a) : a[d], i = !0, d += f);
            return g
        }

        function Ga(a, b) {
            var c = m.defaults.column, d = a.aoColumns.length, c = h.extend({}, m.models.oColumn, c, {
                nTh: b ? b : T.createElement("th"),
                sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
                aDataSort: c.aDataSort ? c.aDataSort : [d],
                mData: c.mData ? c.mData : d,
                idx: d
            });
            a.aoColumns.push(c);
            c = a.aoPreSearchCols;
            c[d] = h.extend({}, m.models.oSearch, c[d]);
            la(a, d, h(b).data())
        }

        function la(a, b, c) {
            var b = a.aoColumns[b], d = a.oClasses, e = h(b.nTh);
            if (!b.sWidthOrig) {
                b.sWidthOrig = e.attr("width") || null;
                var f = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
                f && (b.sWidthOrig = f[1])
            }
            c !== k && null !== c && (eb(c), I(m.defaults.column, c), c.mDataProp !== k && !c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), h.extend(b, c), F(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== k && (b.aDataSort = [c.iDataSort]), F(b, c, "aDataSort"));
            var g = b.mData, i = P(g), j = b.mRender ? P(b.mRender) : null, c = function (a) {
                return "string" === typeof a && -1 !== a.indexOf("@")
            };
            b._bAttrSrc = h.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter));
            b.fnGetData = function (a, b, c) {
                var d = i(a, b, k, c);
                return j && b ? j(d, b, a, c) : d
            };
            b.fnSetData = function (a, b, c) {
                return Q(g)(a, b, c)
            };
            "number" !== typeof g && (a._rowReadObject = !0);
            a.oFeatures.bSort || (b.bSortable = !1, e.addClass(d.sSortableNone));
            a = -1 !== h.inArray("asc", b.asSorting);
            c = -1 !== h.inArray("desc", b.asSorting);
            !b.bSortable || !a && !c ?
                (b.sSortingClass = d.sSortableNone, b.sSortingClassJUI = "") : a && !c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI = d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI)
        }

        function Y(a) {
            if (!1 !== a.oFeatures.bAutoWidth) {
                var b = a.aoColumns;
                Ha(a);
                for (var c = 0, d = b.length; c < d; c++)b[c].nTh.style.width = b[c].sWidth
            }
            b = a.oScroll;
            ("" !== b.sY || "" !== b.sX) && Z(a);
            w(a, null, "column-sizing", [a])
        }

        function $(a, b) {
            var c =
                aa(a, "bVisible");
            return "number" === typeof c[b] ? c[b] : null
        }

        function ba(a, b) {
            var c = aa(a, "bVisible"), c = h.inArray(b, c);
            return -1 !== c ? c : null
        }

        function ca(a) {
            return aa(a, "bVisible").length
        }

        function aa(a, b) {
            var c = [];
            h.map(a.aoColumns, function (a, e) {
                a[b] && c.push(e)
            });
            return c
        }

        function Ia(a) {
            var b = a.aoColumns, c = a.aoData, d = m.ext.type.detect, e, f, g, i, j, h, l, r, q;
            e = 0;
            for (f = b.length; e < f; e++)if (l = b[e], q = [], !l.sType && l._sManualType)l.sType = l._sManualType; else if (!l.sType) {
                g = 0;
                for (i = d.length; g < i; g++) {
                    j = 0;
                    for (h = c.length; j <
                    h; j++) {
                        q[j] === k && (q[j] = B(a, j, e, "type"));
                        r = d[g](q[j], a);
                        if (!r && g !== d.length - 1)break;
                        if ("html" === r)break
                    }
                    if (r) {
                        l.sType = r;
                        break
                    }
                }
                l.sType || (l.sType = "string")
            }
        }

        function hb(a, b, c, d) {
            var e, f, g, i, j, n, l = a.aoColumns;
            if (b)for (e = b.length - 1; 0 <= e; e--) {
                n = b[e];
                var r = n.targets !== k ? n.targets : n.aTargets;
                h.isArray(r) || (r = [r]);
                f = 0;
                for (g = r.length; f < g; f++)if ("number" === typeof r[f] && 0 <= r[f]) {
                    for (; l.length <= r[f];)Ga(a);
                    d(r[f], n)
                } else if ("number" === typeof r[f] && 0 > r[f])d(l.length + r[f], n); else if ("string" === typeof r[f]) {
                    i = 0;
                    for (j = l.length; i < j; i++)("_all" == r[f] || h(l[i].nTh).hasClass(r[f])) && d(i, n)
                }
            }
            if (c) {
                e = 0;
                for (a = c.length; e < a; e++)d(e, c[e])
            }
        }

        function L(a, b, c, d) {
            var e = a.aoData.length, f = h.extend(!0, {}, m.models.oRow, {src: c ? "dom" : "data", idx: e});
            f._aData = b;
            a.aoData.push(f);
            for (var g = a.aoColumns, i = 0, j = g.length; i < j; i++)g[i].sType = null;
            a.aiDisplayMaster.push(e);
            b = a.rowIdFn(b);
            b !== k && (a.aIds[b] = f);
            (c || !a.oFeatures.bDeferRender) && Ja(a, e, c, d);
            return e
        }

        function ma(a, b) {
            var c;
            b instanceof h || (b = h(b));
            return b.map(function (b, e) {
                c =
                    Ka(a, e);
                return L(a, c.data, e, c.cells)
            })
        }

        function B(a, b, c, d) {
            var e = a.iDraw, f = a.aoColumns[c], g = a.aoData[b]._aData, i = f.sDefaultContent, c = f.fnGetData(g, d, {
                settings: a,
                row: b,
                col: c
            });
            if (c === k)return a.iDrawError != e && null === i && (J(a, 0, "Requested unknown parameter " + ("function" == typeof f.mData ? "{function}" : "'" + f.mData + "'") + " for row " + b, 4), a.iDrawError = e), i;
            if ((c === g || null === c) && null !== i)c = i; else if ("function" === typeof c)return c.call(g);
            return null === c && "display" == d ? "" : c
        }

        function ib(a, b, c, d) {
            a.aoColumns[c].fnSetData(a.aoData[b]._aData,
                d, {settings: a, row: b, col: c})
        }

        function La(a) {
            return h.map(a.match(/(\\.|[^\.])+/g) || [""], function (a) {
                return a.replace(/\\./g, ".")
            })
        }

        function P(a) {
            if (h.isPlainObject(a)) {
                var b = {};
                h.each(a, function (a, c) {
                    c && (b[a] = P(c))
                });
                return function (a, c, f, g) {
                    var i = b[c] || b._;
                    return i !== k ? i(a, c, f, g) : a
                }
            }
            if (null === a)return function (a) {
                return a
            };
            if ("function" === typeof a)return function (b, c, f, g) {
                return a(b, c, f, g)
            };
            if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
                var c = function (a, b,
                                  f) {
                    var g, i;
                    if ("" !== f) {
                        i = La(f);
                        for (var j = 0, n = i.length; j < n; j++) {
                            f = i[j].match(da);
                            g = i[j].match(U);
                            if (f) {
                                i[j] = i[j].replace(da, "");
                                "" !== i[j] && (a = a[i[j]]);
                                g = [];
                                i.splice(0, j + 1);
                                i = i.join(".");
                                if (h.isArray(a)) {
                                    j = 0;
                                    for (n = a.length; j < n; j++)g.push(c(a[j], b, i))
                                }
                                a = f[0].substring(1, f[0].length - 1);
                                a = "" === a ? g : g.join(a);
                                break
                            } else if (g) {
                                i[j] = i[j].replace(U, "");
                                a = a[i[j]]();
                                continue
                            }
                            if (null === a || a[i[j]] === k)return k;
                            a = a[i[j]]
                        }
                    }
                    return a
                };
                return function (b, e) {
                    return c(b, e, a)
                }
            }
            return function (b) {
                return b[a]
            }
        }

        function Q(a) {
            if (h.isPlainObject(a))return Q(a._);
            if (null === a)return function () {
            };
            if ("function" === typeof a)return function (b, d, e) {
                a(b, "set", d, e)
            };
            if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
                var b = function (a, d, e) {
                    var e = La(e), f;
                    f = e[e.length - 1];
                    for (var g, i, j = 0, n = e.length - 1; j < n; j++) {
                        g = e[j].match(da);
                        i = e[j].match(U);
                        if (g) {
                            e[j] = e[j].replace(da, "");
                            a[e[j]] = [];
                            f = e.slice();
                            f.splice(0, j + 1);
                            g = f.join(".");
                            if (h.isArray(d)) {
                                i = 0;
                                for (n = d.length; i < n; i++)f = {}, b(f, d[i], g), a[e[j]].push(f)
                            } else a[e[j]] = d;
                            return
                        }
                        i && (e[j] = e[j].replace(U,
                            ""), a = a[e[j]](d));
                        if (null === a[e[j]] || a[e[j]] === k)a[e[j]] = {};
                        a = a[e[j]]
                    }
                    if (f.match(U))a[f.replace(U, "")](d); else a[f.replace(da, "")] = d
                };
                return function (c, d) {
                    return b(c, d, a)
                }
            }
            return function (b, d) {
                b[a] = d
            }
        }

        function Ma(a) {
            return D(a.aoData, "_aData")
        }

        function na(a) {
            a.aoData.length = 0;
            a.aiDisplayMaster.length = 0;
            a.aiDisplay.length = 0;
            a.aIds = {}
        }

        function oa(a, b, c) {
            for (var d = -1, e = 0, f = a.length; e < f; e++)a[e] == b ? d = e : a[e] > b && a[e]--;
            -1 != d && c === k && a.splice(d, 1)
        }

        function ea(a, b, c, d) {
            var e = a.aoData[b], f, g = function (c, d) {
                for (; c.childNodes.length;)c.removeChild(c.firstChild);
                c.innerHTML = B(a, b, d, "display")
            };
            if ("dom" === c || (!c || "auto" === c) && "dom" === e.src)e._aData = Ka(a, e, d, d === k ? k : e._aData).data; else {
                var i = e.anCells;
                if (i)if (d !== k)g(i[d], d); else {
                    c = 0;
                    for (f = i.length; c < f; c++)g(i[c], c)
                }
            }
            e._aSortData = null;
            e._aFilterData = null;
            g = a.aoColumns;
            if (d !== k)g[d].sType = null; else {
                c = 0;
                for (f = g.length; c < f; c++)g[c].sType = null;
                Na(a, e)
            }
        }

        function Ka(a, b, c, d) {
            var e = [], f = b.firstChild, g, i, j = 0, n, l = a.aoColumns, r = a._rowReadObject, d = d !== k ? d : r ? {} : [], q = function (a, b) {
                if ("string" === typeof a) {
                    var c = a.indexOf("@");
                    -1 !== c && (c = a.substring(c + 1), Q(a)(d, b.getAttribute(c)))
                }
            }, jb = function (a) {
                if (c === k || c === j)i = l[j], n = h.trim(a.innerHTML), i && i._bAttrSrc ? (Q(i.mData._)(d, n), q(i.mData.sort, a), q(i.mData.type, a), q(i.mData.filter, a)) : r ? (i._setter || (i._setter = Q(i.mData)), i._setter(d, n)) : d[j] = n;
                j++
            };
            if (f)for (; f;) {
                g = f.nodeName.toUpperCase();
                if ("TD" == g || "TH" == g)jb(f), e.push(f);
                f = f.nextSibling
            } else {
                e = b.anCells;
                g = 0;
                for (var o = e.length; g < o; g++)jb(e[g])
            }
            if (b = f ? b : b.nTr)(b = b.getAttribute("id")) && Q(a.rowId)(d, b);
            return {data: d, cells: e}
        }

        function Ja(a, b, c, d) {
            var e = a.aoData[b], f = e._aData, g = [], i, j, h, l, r;
            if (null === e.nTr) {
                i = c || T.createElement("tr");
                e.nTr = i;
                e.anCells = g;
                i._DT_RowIndex = b;
                Na(a, e);
                l = 0;
                for (r = a.aoColumns.length; l < r; l++) {
                    h = a.aoColumns[l];
                    j = c ? d[l] : T.createElement(h.sCellType);
                    g.push(j);
                    if (!c || h.mRender || h.mData !== l)j.innerHTML = B(a, b, l, "display");
                    h.sClass && (j.className += " " + h.sClass);
                    h.bVisible && !c ? i.appendChild(j) : !h.bVisible && c && j.parentNode.removeChild(j);
                    h.fnCreatedCell && h.fnCreatedCell.call(a.oInstance, j, B(a, b, l), f, b, l)
                }
                w(a,
                    "aoRowCreatedCallback", null, [i, f, b])
            }
            e.nTr.setAttribute("role", "row")
        }

        function Na(a, b) {
            var c = b.nTr, d = b._aData;
            if (c) {
                var e = a.rowIdFn(d);
                e && (c.id = e);
                d.DT_RowClass && (e = d.DT_RowClass.split(" "), b.__rowc = b.__rowc ? pa(b.__rowc.concat(e)) : e, h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
                d.DT_RowAttr && h(c).attr(d.DT_RowAttr);
                d.DT_RowData && h(c).data(d.DT_RowData)
            }
        }

        function kb(a) {
            var b, c, d, e, f, g = a.nTHead, i = a.nTFoot, j = 0 === h("th, td", g).length, n = a.oClasses, l = a.aoColumns;
            j && (e = h("<tr/>").appendTo(g));
            b = 0;
            for (c = l.length; b < c; b++)f = l[b], d = h(f.nTh).addClass(f.sClass), j && d.appendTo(e), a.oFeatures.bSort && (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Oa(a, f.nTh, b))), f.sTitle != d[0].innerHTML && d.html(f.sTitle), Pa(a, "header")(a, d, f, n);
            j && fa(a.aoHeader, g);
            h(g).find(">tr").attr("role", "row");
            h(g).find(">tr>th, >tr>td").addClass(n.sHeaderTH);
            h(i).find(">tr>th, >tr>td").addClass(n.sFooterTH);
            if (null !== i) {
                a = a.aoFooter[0];
                b = 0;
                for (c = a.length; b <
                c; b++)f = l[b], f.nTf = a[b].cell, f.sClass && h(f.nTf).addClass(f.sClass)
            }
        }

        function ga(a, b, c) {
            var d, e, f, g = [], i = [], j = a.aoColumns.length, n;
            if (b) {
                c === k && (c = !1);
                d = 0;
                for (e = b.length; d < e; d++) {
                    g[d] = b[d].slice();
                    g[d].nTr = b[d].nTr;
                    for (f = j - 1; 0 <= f; f--)!a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
                    i.push([])
                }
                d = 0;
                for (e = g.length; d < e; d++) {
                    if (a = g[d].nTr)for (; f = a.firstChild;)a.removeChild(f);
                    f = 0;
                    for (b = g[d].length; f < b; f++)if (n = j = 1, i[d][f] === k) {
                        a.appendChild(g[d][f].cell);
                        for (i[d][f] = 1; g[d + j] !== k && g[d][f].cell == g[d + j][f].cell;)i[d +
                        j][f] = 1, j++;
                        for (; g[d][f + n] !== k && g[d][f].cell == g[d][f + n].cell;) {
                            for (c = 0; c < j; c++)i[d + c][f + n] = 1;
                            n++
                        }
                        h(g[d][f].cell).attr("rowspan", j).attr("colspan", n)
                    }
                }
            }
        }

        function M(a) {
            var b = w(a, "aoPreDrawCallback", "preDraw", [a]);
            if (-1 !== h.inArray(!1, b))C(a, !1); else {
                var b = [], c = 0, d = a.asStripeClasses, e = d.length, f = a.oLanguage, g = a.iInitDisplayStart, i = "ssp" == y(a), j = a.aiDisplay;
                a.bDrawing = !0;
                g !== k && -1 !== g && (a._iDisplayStart = i ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart = -1);
                var g = a._iDisplayStart, n = a.fnDisplayEnd();
                if (a.bDeferLoading)a.bDeferLoading = !1, a.iDraw++, C(a, !1); else if (i) {
                    if (!a.bDestroying && !lb(a))return
                } else a.iDraw++;
                if (0 !== j.length) {
                    f = i ? a.aoData.length : n;
                    for (i = i ? 0 : g; i < f; i++) {
                        var l = j[i], r = a.aoData[l];
                        null === r.nTr && Ja(a, l);
                        l = r.nTr;
                        if (0 !== e) {
                            var q = d[c % e];
                            r._sRowStripe != q && (h(l).removeClass(r._sRowStripe).addClass(q), r._sRowStripe = q)
                        }
                        w(a, "aoRowCallback", null, [l, r._aData, c, i]);
                        b.push(l);
                        c++
                    }
                } else c = f.sZeroRecords, 1 == a.iDraw && "ajax" == y(a) ? c = f.sLoadingRecords : f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable),
                    b[0] = h("<tr/>", {"class": e ? d[0] : ""}).append(h("<td />", {
                        valign: "top",
                        colSpan: ca(a),
                        "class": a.oClasses.sRowEmpty
                    }).html(c))[0];
                w(a, "aoHeaderCallback", "header", [h(a.nTHead).children("tr")[0], Ma(a), g, n, j]);
                w(a, "aoFooterCallback", "footer", [h(a.nTFoot).children("tr")[0], Ma(a), g, n, j]);
                d = h(a.nTBody);
                d.children().detach();
                d.append(h(b));
                w(a, "aoDrawCallback", "draw", [a]);
                a.bSorted = !1;
                a.bFiltered = !1;
                a.bDrawing = !1
            }
        }

        function R(a, b) {
            var c = a.oFeatures, d = c.bFilter;
            c.bSort && mb(a);
            d ? ha(a, a.oPreviousSearch) : a.aiDisplay =
                a.aiDisplayMaster.slice();
            !0 !== b && (a._iDisplayStart = 0);
            a._drawHold = b;
            M(a);
            a._drawHold = !1
        }

        function nb(a) {
            var b = a.oClasses, c = h(a.nTable), c = h("<div/>").insertBefore(c), d = a.oFeatures, e = h("<div/>", {
                id: a.sTableId + "_wrapper",
                "class": b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter)
            });
            a.nHolding = c[0];
            a.nTableWrapper = e[0];
            a.nTableReinsertBefore = a.nTable.nextSibling;
            for (var f = a.sDom.split(""), g, i, j, n, l, r, q = 0; q < f.length; q++) {
                g = null;
                i = f[q];
                if ("<" == i) {
                    j = h("<div/>")[0];
                    n = f[q + 1];
                    if ("'" == n || '"' == n) {
                        l = "";
                        for (r = 2; f[q + r] != n;)l +=
                            f[q + r], r++;
                        "H" == l ? l = b.sJUIHeader : "F" == l && (l = b.sJUIFooter);
                        -1 != l.indexOf(".") ? (n = l.split("."), j.id = n[0].substr(1, n[0].length - 1), j.className = n[1]) : "#" == l.charAt(0) ? j.id = l.substr(1, l.length - 1) : j.className = l;
                        q += r
                    }
                    e.append(j);
                    e = h(j)
                } else if (">" == i)e = e.parent(); else if ("l" == i && d.bPaginate && d.bLengthChange)g = ob(a); else if ("f" == i && d.bFilter)g = pb(a); else if ("r" == i && d.bProcessing)g = qb(a); else if ("t" == i)g = rb(a); else if ("i" == i && d.bInfo)g = sb(a); else if ("p" == i && d.bPaginate)g = tb(a); else if (0 !== m.ext.feature.length) {
                    j =
                        m.ext.feature;
                    r = 0;
                    for (n = j.length; r < n; r++)if (i == j[r].cFeature) {
                        g = j[r].fnInit(a);
                        break
                    }
                }
                g && (j = a.aanFeatures, j[i] || (j[i] = []), j[i].push(g), e.append(g))
            }
            c.replaceWith(e);
            a.nHolding = null
        }

        function fa(a, b) {
            var c = h(b).children("tr"), d, e, f, g, i, j, n, l, r, q;
            a.splice(0, a.length);
            f = 0;
            for (j = c.length; f < j; f++)a.push([]);
            f = 0;
            for (j = c.length; f < j; f++) {
                d = c[f];
                for (e = d.firstChild; e;) {
                    if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase()) {
                        l = 1 * e.getAttribute("colspan");
                        r = 1 * e.getAttribute("rowspan");
                        l = !l || 0 === l ||
                        1 === l ? 1 : l;
                        r = !r || 0 === r || 1 === r ? 1 : r;
                        g = 0;
                        for (i = a[f]; i[g];)g++;
                        n = g;
                        q = 1 === l ? !0 : !1;
                        for (i = 0; i < l; i++)for (g = 0; g < r; g++)a[f + g][n + i] = {
                            cell: e,
                            unique: q
                        }, a[f + g].nTr = d
                    }
                    e = e.nextSibling
                }
            }
        }

        function qa(a, b, c) {
            var d = [];
            c || (c = a.aoHeader, b && (c = [], fa(c, b)));
            for (var b = 0, e = c.length; b < e; b++)for (var f = 0, g = c[b].length; f < g; f++)if (c[b][f].unique && (!d[f] || !a.bSortCellsTop))d[f] = c[b][f].cell;
            return d
        }

        function ra(a, b, c) {
            w(a, "aoServerParams", "serverParams", [b]);
            if (b && h.isArray(b)) {
                var d = {}, e = /(.*?)\[\]$/;
                h.each(b, function (a, b) {
                    var c =
                        b.name.match(e);
                    c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value
                });
                b = d
            }
            var f, g = a.ajax, i = a.oInstance, j = function (b) {
                w(a, null, "xhr", [a, b, a.jqXHR]);
                c(b)
            };
            if (h.isPlainObject(g) && g.data) {
                f = g.data;
                var n = h.isFunction(f) ? f(b, a) : f, b = h.isFunction(f) && n ? n : h.extend(!0, b, n);
                delete g.data
            }
            n = {
                data: b, success: function (b) {
                    var c = b.error || b.sError;
                    c && J(a, 0, c);
                    a.json = b;
                    j(b)
                }, dataType: "json", cache: !1, type: a.sServerMethod, error: function (b, c) {
                    var d = w(a, null, "xhr", [a, null, a.jqXHR]);
                    -1 === h.inArray(!0, d) && ("parsererror" ==
                    c ? J(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && J(a, 0, "Ajax error", 7));
                    C(a, !1)
                }
            };
            a.oAjaxData = b;
            w(a, null, "preXhr", [a, b]);
            a.fnServerData ? a.fnServerData.call(i, a.sAjaxSource, h.map(b, function (a, b) {
                return {name: b, value: a}
            }), j, a) : a.sAjaxSource || "string" === typeof g ? a.jqXHR = h.ajax(h.extend(n, {url: g || a.sAjaxSource})) : h.isFunction(g) ? a.jqXHR = g.call(i, b, j, a) : (a.jqXHR = h.ajax(h.extend(n, g)), g.data = f)
        }

        function lb(a) {
            return a.bAjaxDataGet ? (a.iDraw++, C(a, !0), ra(a, ub(a), function (b) {
                vb(a, b)
            }), !1) : !0
        }

        function ub(a) {
            var b =
                a.aoColumns, c = b.length, d = a.oFeatures, e = a.oPreviousSearch, f = a.aoPreSearchCols, g, i = [], j, n, l, r = V(a);
            g = a._iDisplayStart;
            j = !1 !== d.bPaginate ? a._iDisplayLength : -1;
            var q = function (a, b) {
                i.push({name: a, value: b})
            };
            q("sEcho", a.iDraw);
            q("iColumns", c);
            q("sColumns", D(b, "sName").join(","));
            q("iDisplayStart", g);
            q("iDisplayLength", j);
            var k = {
                draw: a.iDraw,
                columns: [],
                order: [],
                start: g,
                length: j,
                search: {value: e.sSearch, regex: e.bRegex}
            };
            for (g = 0; g < c; g++)n = b[g], l = f[g], j = "function" == typeof n.mData ? "function" : n.mData, k.columns.push({
                data: j,
                name: n.sName,
                searchable: n.bSearchable,
                orderable: n.bSortable,
                search: {value: l.sSearch, regex: l.bRegex}
            }), q("mDataProp_" + g, j), d.bFilter && (q("sSearch_" + g, l.sSearch), q("bRegex_" + g, l.bRegex), q("bSearchable_" + g, n.bSearchable)), d.bSort && q("bSortable_" + g, n.bSortable);
            d.bFilter && (q("sSearch", e.sSearch), q("bRegex", e.bRegex));
            d.bSort && (h.each(r, function (a, b) {
                k.order.push({column: b.col, dir: b.dir});
                q("iSortCol_" + a, b.col);
                q("sSortDir_" + a, b.dir)
            }), q("iSortingCols", r.length));
            b = m.ext.legacy.ajax;
            return null === b ? a.sAjaxSource ?
                i : k : b ? i : k
        }

        function vb(a, b) {
            var c = sa(a, b), d = b.sEcho !== k ? b.sEcho : b.draw, e = b.iTotalRecords !== k ? b.iTotalRecords : b.recordsTotal, f = b.iTotalDisplayRecords !== k ? b.iTotalDisplayRecords : b.recordsFiltered;
            if (d) {
                if (1 * d < a.iDraw)return;
                a.iDraw = 1 * d
            }
            na(a);
            a._iRecordsTotal = parseInt(e, 10);
            a._iRecordsDisplay = parseInt(f, 10);
            d = 0;
            for (e = c.length; d < e; d++)L(a, c[d]);
            a.aiDisplay = a.aiDisplayMaster.slice();
            a.bAjaxDataGet = !1;
            M(a);
            a._bInitComplete || ta(a, b);
            a.bAjaxDataGet = !0;
            C(a, !1)
        }

        function sa(a, b) {
            var c = h.isPlainObject(a.ajax) &&
            a.ajax.dataSrc !== k ? a.ajax.dataSrc : a.sAjaxDataProp;
            return "data" === c ? b.aaData || b[c] : "" !== c ? P(c)(b) : b
        }

        function pb(a) {
            var b = a.oClasses, c = a.sTableId, d = a.oLanguage, e = a.oPreviousSearch, f = a.aanFeatures, g = '<input type="search" class="' + b.sFilterInput + '"/>', i = d.sSearch, i = i.match(/_INPUT_/) ? i.replace("_INPUT_", g) : i + g, b = h("<div/>", {
                id: !f.f ? c + "_filter" : null,
                "class": b.sFilter
            }).append(h("<label/>").append(i)), f = function () {
                var b = !this.value ? "" : this.value;
                b != e.sSearch && (ha(a, {
                    sSearch: b, bRegex: e.bRegex, bSmart: e.bSmart,
                    bCaseInsensitive: e.bCaseInsensitive
                }), a._iDisplayStart = 0, M(a))
            }, g = null !== a.searchDelay ? a.searchDelay : "ssp" === y(a) ? 400 : 0, j = h("input", b).val(e.sSearch).attr("placeholder", d.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", g ? ua(f, g) : f).bind("keypress.DT", function (a) {
                if (13 == a.keyCode)return !1
            }).attr("aria-controls", c);
            h(a.nTable).on("search.dt.DT", function (b, c) {
                if (a === c)try {
                    j[0] !== T.activeElement && j.val(e.sSearch)
                } catch (d) {
                }
            });
            return b[0]
        }

        function ha(a, b, c) {
            var d = a.oPreviousSearch,
                e = a.aoPreSearchCols, f = function (a) {
                    d.sSearch = a.sSearch;
                    d.bRegex = a.bRegex;
                    d.bSmart = a.bSmart;
                    d.bCaseInsensitive = a.bCaseInsensitive
                };
            Ia(a);
            if ("ssp" != y(a)) {
                wb(a, b.sSearch, c, b.bEscapeRegex !== k ? !b.bEscapeRegex : b.bRegex, b.bSmart, b.bCaseInsensitive);
                f(b);
                for (b = 0; b < e.length; b++)xb(a, e[b].sSearch, b, e[b].bEscapeRegex !== k ? !e[b].bEscapeRegex : e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
                yb(a)
            } else f(b);
            a.bFiltered = !0;
            w(a, null, "search", [a])
        }

        function yb(a) {
            for (var b = m.ext.search, c = a.aiDisplay, d, e, f = 0, g = b.length; f <
            g; f++) {
                for (var i = [], j = 0, n = c.length; j < n; j++)e = c[j], d = a.aoData[e], b[f](a, d._aFilterData, e, d._aData, j) && i.push(e);
                c.length = 0;
                h.merge(c, i)
            }
        }

        function xb(a, b, c, d, e, f) {
            if ("" !== b)for (var g = a.aiDisplay, d = Qa(b, d, e, f), e = g.length - 1; 0 <= e; e--)b = a.aoData[g[e]]._aFilterData[c], d.test(b) || g.splice(e, 1)
        }

        function wb(a, b, c, d, e, f) {
            var d = Qa(b, d, e, f), e = a.oPreviousSearch.sSearch, f = a.aiDisplayMaster, g;
            0 !== m.ext.search.length && (c = !0);
            g = zb(a);
            if (0 >= b.length)a.aiDisplay = f.slice(); else {
                if (g || c || e.length > b.length || 0 !== b.indexOf(e) ||
                    a.bSorted)a.aiDisplay = f.slice();
                b = a.aiDisplay;
                for (c = b.length - 1; 0 <= c; c--)d.test(a.aoData[b[c]]._sFilterRow) || b.splice(c, 1)
            }
        }

        function Qa(a, b, c, d) {
            a = b ? a : va(a);
            c && (a = "^(?=.*?" + h.map(a.match(/"[^"]+"|[^ ]+/g) || [""], function (a) {
                    if ('"' === a.charAt(0))var b = a.match(/^"(.*)"$/), a = b ? b[1] : a;
                    return a.replace('"', "")
                }).join(")(?=.*?") + ").*$");
            return RegExp(a, d ? "i" : "")
        }

        function va(a) {
            return a.replace(Yb, "\\$1")
        }

        function zb(a) {
            var b = a.aoColumns, c, d, e, f, g, i, j, h, l = m.ext.type.search;
            c = !1;
            d = 0;
            for (f = a.aoData.length; d <
            f; d++)if (h = a.aoData[d], !h._aFilterData) {
                i = [];
                e = 0;
                for (g = b.length; e < g; e++)c = b[e], c.bSearchable ? (j = B(a, d, e, "filter"), l[c.sType] && (j = l[c.sType](j)), null === j && (j = ""), "string" !== typeof j && j.toString && (j = j.toString())) : j = "", j.indexOf && -1 !== j.indexOf("&") && (wa.innerHTML = j, j = Zb ? wa.textContent : wa.innerText), j.replace && (j = j.replace(/[\r\n]/g, "")), i.push(j);
                h._aFilterData = i;
                h._sFilterRow = i.join("  ");
                c = !0
            }
            return c
        }

        function Ab(a) {
            return {search: a.sSearch, smart: a.bSmart, regex: a.bRegex, caseInsensitive: a.bCaseInsensitive}
        }

        function Bb(a) {
            return {sSearch: a.search, bSmart: a.smart, bRegex: a.regex, bCaseInsensitive: a.caseInsensitive}
        }

        function sb(a) {
            var b = a.sTableId, c = a.aanFeatures.i, d = h("<div/>", {
                "class": a.oClasses.sInfo,
                id: !c ? b + "_info" : null
            });
            c || (a.aoDrawCallback.push({
                fn: Cb,
                sName: "information"
            }), d.attr("role", "status").attr("aria-live", "polite"), h(a.nTable).attr("aria-describedby", b + "_info"));
            return d[0]
        }

        function Cb(a) {
            var b = a.aanFeatures.i;
            if (0 !== b.length) {
                var c = a.oLanguage, d = a._iDisplayStart + 1, e = a.fnDisplayEnd(), f = a.fnRecordsTotal(),
                    g = a.fnRecordsDisplay(), i = g ? c.sInfo : c.sInfoEmpty;
                g !== f && (i += " " + c.sInfoFiltered);
                i += c.sInfoPostFix;
                i = Db(a, i);
                c = c.fnInfoCallback;
                null !== c && (i = c.call(a.oInstance, a, d, e, f, g, i));
                h(b).html(i)
            }
        }

        function Db(a, b) {
            var c = a.fnFormatNumber, d = a._iDisplayStart + 1, e = a._iDisplayLength, f = a.fnRecordsDisplay(), g = -1 === e;
            return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d /
                e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)))
        }

        function ia(a) {
            var b, c, d = a.iInitDisplayStart, e = a.aoColumns, f;
            c = a.oFeatures;
            var g = a.bDeferLoading;
            if (a.bInitialised) {
                nb(a);
                kb(a);
                ga(a, a.aoHeader);
                ga(a, a.aoFooter);
                C(a, !0);
                c.bAutoWidth && Ha(a);
                b = 0;
                for (c = e.length; b < c; b++)f = e[b], f.sWidth && (f.nTh.style.width = u(f.sWidth));
                w(a, null, "preInit", [a]);
                R(a);
                e = y(a);
                if ("ssp" != e || g)"ajax" == e ? ra(a, [], function (c) {
                    var f = sa(a, c);
                    for (b = 0; b < f.length; b++)L(a, f[b]);
                    a.iInitDisplayStart = d;
                    R(a);
                    C(a, !1);
                    ta(a, c)
                }, a) : (C(a, !1),
                    ta(a))
            } else setTimeout(function () {
                ia(a)
            }, 200)
        }

        function ta(a, b) {
            a._bInitComplete = !0;
            (b || a.oInit.aaData) && Y(a);
            w(a, "aoInitComplete", "init", [a, b])
        }

        function Ra(a, b) {
            var c = parseInt(b, 10);
            a._iDisplayLength = c;
            Sa(a);
            w(a, null, "length", [a, c])
        }

        function ob(a) {
            for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, e = h.isArray(d[0]), f = e ? d[0] : d, d = e ? d[1] : d, e = h("<select/>", {
                name: c + "_length",
                "aria-controls": c,
                "class": b.sLengthSelect
            }), g = 0, i = f.length; g < i; g++)e[0][g] = new Option(d[g], f[g]);
            var j = h("<div><label/></div>").addClass(b.sLength);
            a.aanFeatures.l || (j[0].id = c + "_length");
            j.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML));
            h("select", j).val(a._iDisplayLength).bind("change.DT", function () {
                Ra(a, h(this).val());
                M(a)
            });
            h(a.nTable).bind("length.dt.DT", function (b, c, d) {
                a === c && h("select", j).val(d)
            });
            return j[0]
        }

        function tb(a) {
            var b = a.sPaginationType, c = m.ext.pager[b], d = "function" === typeof c, e = function (a) {
                M(a)
            }, b = h("<div/>").addClass(a.oClasses.sPaging + b)[0], f = a.aanFeatures;
            d || c.fnInit(a, b, e);
            f.p || (b.id = a.sTableId +
                "_paginate", a.aoDrawCallback.push({
                fn: function (a) {
                    if (d) {
                        var b = a._iDisplayStart, j = a._iDisplayLength, h = a.fnRecordsDisplay(), l = -1 === j, b = l ? 0 : Math.ceil(b / j), j = l ? 1 : Math.ceil(h / j), h = c(b, j), k, l = 0;
                        for (k = f.p.length; l < k; l++)Pa(a, "pageButton")(a, f.p[l], l, h, b, j)
                    } else c.fnUpdate(a, e)
                }, sName: "pagination"
            }));
            return b
        }

        function Ta(a, b, c) {
            var d = a._iDisplayStart, e = a._iDisplayLength, f = a.fnRecordsDisplay();
            0 === f || -1 === e ? d = 0 : "number" === typeof b ? (d = b * e, d > f && (d = 0)) : "first" == b ? d = 0 : "previous" == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : "next" ==
            b ? d + e < f && (d += e) : "last" == b ? d = Math.floor((f - 1) / e) * e : J(a, 0, "Unknown paging action: " + b, 5);
            b = a._iDisplayStart !== d;
            a._iDisplayStart = d;
            b && (w(a, null, "page", [a]), c && M(a));
            return b
        }

        function qb(a) {
            return h("<div/>", {
                id: !a.aanFeatures.r ? a.sTableId + "_processing" : null,
                "class": a.oClasses.sProcessing
            }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]
        }

        function C(a, b) {
            a.oFeatures.bProcessing && h(a.aanFeatures.r).css("display", b ? "block" : "none");
            w(a, null, "processing", [a, b])
        }

        function rb(a) {
            var b = h(a.nTable);
            b.attr("role",
                "grid");
            var c = a.oScroll;
            if ("" === c.sX && "" === c.sY)return a.nTable;
            var d = c.sX, e = c.sY, f = a.oClasses, g = b.children("caption"), i = g.length ? g[0]._captionSide : null, j = h(b[0].cloneNode(!1)), n = h(b[0].cloneNode(!1)), l = b.children("tfoot");
            c.sX && "100%" === b.attr("width") && b.removeAttr("width");
            l.length || (l = null);
            j = h("<div/>", {"class": f.sScrollWrapper}).append(h("<div/>", {"class": f.sScrollHead}).css({
                overflow: "hidden",
                position: "relative",
                border: 0,
                width: d ? !d ? null : u(d) : "100%"
            }).append(h("<div/>", {"class": f.sScrollHeadInner}).css({
                "box-sizing": "content-box",
                width: c.sXInner || "100%"
            }).append(j.removeAttr("id").css("margin-left", 0).append("top" === i ? g : null).append(b.children("thead"))))).append(h("<div/>", {"class": f.sScrollBody}).css({
                position: "relative",
                overflow: "auto",
                width: !d ? null : u(d)
            }).append(b));
            l && j.append(h("<div/>", {"class": f.sScrollFoot}).css({
                overflow: "hidden",
                border: 0,
                width: d ? !d ? null : u(d) : "100%"
            }).append(h("<div/>", {"class": f.sScrollFootInner}).append(n.removeAttr("id").css("margin-left", 0).append("bottom" === i ? g : null).append(b.children("tfoot")))));
            var b = j.children(), k = b[0], f = b[1], q = l ? b[2] : null;
            if (d)h(f).on("scroll.DT", function () {
                var a = this.scrollLeft;
                k.scrollLeft = a;
                l && (q.scrollLeft = a)
            });
            h(f).css(e && c.bCollapse ? "max-height" : "height", e);
            a.nScrollHead = k;
            a.nScrollBody = f;
            a.nScrollFoot = q;
            a.aoDrawCallback.push({fn: Z, sName: "scrolling"});
            return j[0]
        }

        function Z(a) {
            var b = a.oScroll, c = b.sX, d = b.sXInner, e = b.sY, b = b.iBarWidth, f = h(a.nScrollHead), g = f[0].style, i = f.children("div"), j = i[0].style, n = i.children("table"), i = a.nScrollBody, l = h(i), k = i.style, q = h(a.nScrollFoot).children("div"),
                m = q.children("table"), o = h(a.nTHead), E = h(a.nTable), p = E[0], t = p.style, N = a.nTFoot ? h(a.nTFoot) : null, Eb = a.oBrowser, w = Eb.bScrollOversize, s, v, O, x, y = [], z = [], A = [], B, C = function (a) {
                    a = a.style;
                    a.paddingTop = "0";
                    a.paddingBottom = "0";
                    a.borderTopWidth = "0";
                    a.borderBottomWidth = "0";
                    a.height = 0
                };
            E.children("thead, tfoot").remove();
            x = o.clone().prependTo(E);
            o = o.find("tr");
            v = x.find("tr");
            x.find("th, td").removeAttr("tabindex");
            N && (O = N.clone().prependTo(E), s = N.find("tr"), O = O.find("tr"));
            c || (k.width = "100%", f[0].style.width = "100%");
            h.each(qa(a, x), function (b, c) {
                B = $(a, b);
                c.style.width = a.aoColumns[B].sWidth
            });
            N && H(function (a) {
                a.style.width = ""
            }, O);
            f = E.outerWidth();
            if ("" === c) {
                t.width = "100%";
                if (w && (E.find("tbody").height() > i.offsetHeight || "scroll" == l.css("overflow-y")))t.width = u(E.outerWidth() - b);
                f = E.outerWidth()
            } else"" !== d && (t.width = u(d), f = E.outerWidth());
            H(C, v);
            H(function (a) {
                A.push(a.innerHTML);
                y.push(u(h(a).css("width")))
            }, v);
            H(function (a, b) {
                a.style.width = y[b]
            }, o);
            h(v).height(0);
            N && (H(C, O), H(function (a) {
                    z.push(u(h(a).css("width")))
                },
                O), H(function (a, b) {
                a.style.width = z[b]
            }, s), h(O).height(0));
            H(function (a, b) {
                a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + A[b] + "</div>";
                a.style.width = y[b]
            }, v);
            N && H(function (a, b) {
                a.innerHTML = "";
                a.style.width = z[b]
            }, O);
            if (E.outerWidth() < f) {
                s = i.scrollHeight > i.offsetHeight || "scroll" == l.css("overflow-y") ? f + b : f;
                if (w && (i.scrollHeight > i.offsetHeight || "scroll" == l.css("overflow-y")))t.width = u(s - b);
                ("" === c || "" !== d) && J(a, 1, "Possible column misalignment", 6)
            } else s = "100%";
            k.width =
                u(s);
            g.width = u(s);
            N && (a.nScrollFoot.style.width = u(s));
            !e && w && (k.height = u(p.offsetHeight + b));
            c = E.outerWidth();
            n[0].style.width = u(c);
            j.width = u(c);
            d = E.height() > i.clientHeight || "scroll" == l.css("overflow-y");
            e = "padding" + (Eb.bScrollbarLeft ? "Left" : "Right");
            j[e] = d ? b + "px" : "0px";
            N && (m[0].style.width = u(c), q[0].style.width = u(c), q[0].style[e] = d ? b + "px" : "0px");
            l.scroll();
            if ((a.bSorted || a.bFiltered) && !a._drawHold)i.scrollTop = 0
        }

        function H(a, b, c) {
            for (var d = 0, e = 0, f = b.length, g, i; e < f;) {
                g = b[e].firstChild;
                for (i = c ? c[e].firstChild :
                    null; g;)1 === g.nodeType && (c ? a(g, i, d) : a(g, d), d++), g = g.nextSibling, i = c ? i.nextSibling : null;
                e++
            }
        }

        function Ha(a) {
            var b = a.nTable, c = a.aoColumns, d = a.oScroll, e = d.sY, f = d.sX, g = d.sXInner, i = c.length, j = aa(a, "bVisible"), n = h("th", a.nTHead), l = b.getAttribute("width"), k = b.parentNode, q = !1, m, o, p;
            p = a.oBrowser;
            d = p.bScrollOversize;
            (m = b.style.width) && -1 !== m.indexOf("%") && (l = m);
            for (m = 0; m < j.length; m++)o = c[j[m]], null !== o.sWidth && (o.sWidth = Fb(o.sWidthOrig, k), q = !0);
            if (d || !q && !f && !e && i == ca(a) && i == n.length)for (m = 0; m < i; m++) {
                if (j =
                        $(a, m))c[j].sWidth = u(n.eq(m).width())
            } else {
                i = h(b).clone().css("visibility", "hidden").removeAttr("id");
                i.find("tbody tr").remove();
                var t = h("<tr/>").appendTo(i.find("tbody"));
                i.find("thead, tfoot").remove();
                i.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());
                i.find("tfoot th, tfoot td").css("width", "");
                n = qa(a, i.find("thead")[0]);
                for (m = 0; m < j.length; m++)o = c[j[m]], n[m].style.width = null !== o.sWidthOrig && "" !== o.sWidthOrig ? u(o.sWidthOrig) : "";
                if (a.aoData.length)for (m = 0; m < j.length; m++)q = j[m], o = c[q], h(Gb(a,
                    q)).clone(!1).append(o.sContentPadding).appendTo(t);
                q = h("<div/>").css(f || e ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    right: 0,
                    overflow: "hidden"
                } : {}).append(i).appendTo(k);
                f && g ? i.width(g) : f ? (i.css("width", "auto"), i.width() < k.clientWidth && i.width(k.clientWidth)) : e ? i.width(k.clientWidth) : l && i.width(l);
                if (f) {
                    for (m = g = 0; m < j.length; m++)o = c[j[m]], e = p.bBounding ? n[m].getBoundingClientRect().width : h(n[m]).outerWidth(), g += null === o.sWidthOrig ? e : parseInt(o.sWidth, 10) + e - h(n[m]).width();
                    i.width(u(g));
                    b.style.width =
                        u(g)
                }
                for (m = 0; m < j.length; m++)if (o = c[j[m]], p = h(n[m]).width())o.sWidth = u(p);
                b.style.width = u(i.css("width"));
                q.remove()
            }
            l && (b.style.width = u(l));
            if ((l || f) && !a._reszEvt)b = function () {
                h(Fa).bind("resize.DT-" + a.sInstance, ua(function () {
                    Y(a)
                }))
            }, d ? setTimeout(b, 1E3) : b(), a._reszEvt = !0
        }

        function ua(a, b) {
            var c = b !== k ? b : 200, d, e;
            return function () {
                var b = this, g = +new Date, i = arguments;
                d && g < d + c ? (clearTimeout(e), e = setTimeout(function () {
                    d = k;
                    a.apply(b, i)
                }, c)) : (d = g, a.apply(b, i))
            }
        }

        function Fb(a, b) {
            if (!a)return 0;
            var c = h("<div/>").css("width",
                u(a)).appendTo(b || T.body), d = c[0].offsetWidth;
            c.remove();
            return d
        }

        function Gb(a, b) {
            var c = Hb(a, b);
            if (0 > c)return null;
            var d = a.aoData[c];
            return !d.nTr ? h("<td/>").html(B(a, c, b, "display"))[0] : d.anCells[b]
        }

        function Hb(a, b) {
            for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; f < g; f++)c = B(a, f, b, "display") + "", c = c.replace($b, ""), c.length > d && (d = c.length, e = f);
            return e
        }

        function u(a) {
            return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a
        }

        function V(a) {
            var b, c, d = [], e = a.aoColumns, f, g, i, j;
            b = a.aaSortingFixed;
            c = h.isPlainObject(b);
            var n = [];
            f = function (a) {
                a.length && !h.isArray(a[0]) ? n.push(a) : h.merge(n, a)
            };
            h.isArray(b) && f(b);
            c && b.pre && f(b.pre);
            f(a.aaSorting);
            c && b.post && f(b.post);
            for (a = 0; a < n.length; a++) {
                j = n[a][0];
                f = e[j].aDataSort;
                b = 0;
                for (c = f.length; b < c; b++)g = f[b], i = e[g].sType || "string", n[a]._idx === k && (n[a]._idx = h.inArray(n[a][1], e[g].asSorting)), d.push({
                    src: j,
                    col: g,
                    dir: n[a][1],
                    index: n[a]._idx,
                    type: i,
                    formatter: m.ext.type.order[i + "-pre"]
                })
            }
            return d
        }

        function mb(a) {
            var b, c, d = [], e = m.ext.type.order, f = a.aoData, g =
                0, i, j = a.aiDisplayMaster, h;
            Ia(a);
            h = V(a);
            b = 0;
            for (c = h.length; b < c; b++)i = h[b], i.formatter && g++, Ib(a, i.col);
            if ("ssp" != y(a) && 0 !== h.length) {
                b = 0;
                for (c = j.length; b < c; b++)d[j[b]] = b;
                g === h.length ? j.sort(function (a, b) {
                    var c, e, g, i, j = h.length, k = f[a]._aSortData, m = f[b]._aSortData;
                    for (g = 0; g < j; g++)if (i = h[g], c = k[i.col], e = m[i.col], c = c < e ? -1 : c > e ? 1 : 0, 0 !== c)return "asc" === i.dir ? c : -c;
                    c = d[a];
                    e = d[b];
                    return c < e ? -1 : c > e ? 1 : 0
                }) : j.sort(function (a, b) {
                    var c, g, i, j, k = h.length, m = f[a]._aSortData, p = f[b]._aSortData;
                    for (i = 0; i < k; i++)if (j = h[i],
                            c = m[j.col], g = p[j.col], j = e[j.type + "-" + j.dir] || e["string-" + j.dir], c = j(c, g), 0 !== c)return c;
                    c = d[a];
                    g = d[b];
                    return c < g ? -1 : c > g ? 1 : 0
                })
            }
            a.bSorted = !0
        }

        function Jb(a) {
            for (var b, c, d = a.aoColumns, e = V(a), a = a.oLanguage.oAria, f = 0, g = d.length; f < g; f++) {
                c = d[f];
                var i = c.asSorting;
                b = c.sTitle.replace(/<.*?>/g, "");
                var j = c.nTh;
                j.removeAttribute("aria-sort");
                c.bSortable && (0 < e.length && e[0].col == f ? (j.setAttribute("aria-sort", "asc" == e[0].dir ? "ascending" : "descending"), c = i[e[0].index + 1] || i[0]) : c = i[0], b += "asc" === c ? a.sSortAscending :
                    a.sSortDescending);
                j.setAttribute("aria-label", b)
            }
        }

        function Ua(a, b, c, d) {
            var e = a.aaSorting, f = a.aoColumns[b].asSorting, g = function (a, b) {
                var c = a._idx;
                c === k && (c = h.inArray(a[1], f));
                return c + 1 < f.length ? c + 1 : b ? null : 0
            };
            "number" === typeof e[0] && (e = a.aaSorting = [e]);
            c && a.oFeatures.bSortMulti ? (c = h.inArray(b, D(e, "0")), -1 !== c ? (b = g(e[c], !0), null === b && 1 === e.length && (b = 0), null === b ? e.splice(c, 1) : (e[c][1] = f[b], e[c]._idx = b)) : (e.push([b, f[0], 0]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == b ? (b = g(e[0]), e.length = 1, e[0][1] = f[b],
                e[0]._idx = b) : (e.length = 0, e.push([b, f[0]]), e[0]._idx = 0);
            R(a);
            "function" == typeof d && d(a)
        }

        function Oa(a, b, c, d) {
            var e = a.aoColumns[c];
            Va(b, {}, function (b) {
                !1 !== e.bSortable && (a.oFeatures.bProcessing ? (C(a, !0), setTimeout(function () {
                    Ua(a, c, b.shiftKey, d);
                    "ssp" !== y(a) && C(a, !1)
                }, 0)) : Ua(a, c, b.shiftKey, d))
            })
        }

        function xa(a) {
            var b = a.aLastSort, c = a.oClasses.sSortColumn, d = V(a), e = a.oFeatures, f, g;
            if (e.bSort && e.bSortClasses) {
                e = 0;
                for (f = b.length; e < f; e++)g = b[e].src, h(D(a.aoData, "anCells", g)).removeClass(c + (2 > e ? e + 1 : 3));
                e = 0;
                for (f = d.length; e < f; e++)g = d[e].src, h(D(a.aoData, "anCells", g)).addClass(c + (2 > e ? e + 1 : 3))
            }
            a.aLastSort = d
        }

        function Ib(a, b) {
            var c = a.aoColumns[b], d = m.ext.order[c.sSortDataType], e;
            d && (e = d.call(a.oInstance, a, b, ba(a, b)));
            for (var f, g = m.ext.type.order[c.sType + "-pre"], i = 0, h = a.aoData.length; i < h; i++)if (c = a.aoData[i], c._aSortData || (c._aSortData = []), !c._aSortData[b] || d)f = d ? e[i] : B(a, i, b, "sort"), c._aSortData[b] = g ? g(f) : f
        }

        function ya(a) {
            if (a.oFeatures.bStateSave && !a.bDestroying) {
                var b = {
                    time: +new Date,
                    start: a._iDisplayStart,
                    length: a._iDisplayLength,
                    order: h.extend(!0, [], a.aaSorting),
                    search: Ab(a.oPreviousSearch),
                    columns: h.map(a.aoColumns, function (b, d) {
                        return {visible: b.bVisible, search: Ab(a.aoPreSearchCols[d])}
                    })
                };
                w(a, "aoStateSaveParams", "stateSaveParams", [a, b]);
                a.oSavedState = b;
                a.fnStateSaveCallback.call(a.oInstance, a, b)
            }
        }

        function Kb(a) {
            var b, c, d = a.aoColumns;
            if (a.oFeatures.bStateSave) {
                var e = a.fnStateLoadCallback.call(a.oInstance, a);
                if (e && e.time && (b = w(a, "aoStateLoadParams", "stateLoadParams", [a, e]), -1 === h.inArray(!1, b) && (b =
                        a.iStateDuration, !(0 < b && e.time < +new Date - 1E3 * b) && d.length === e.columns.length))) {
                    a.oLoadedState = h.extend(!0, {}, e);
                    e.start !== k && (a._iDisplayStart = e.start, a.iInitDisplayStart = e.start);
                    e.length !== k && (a._iDisplayLength = e.length);
                    e.order !== k && (a.aaSorting = [], h.each(e.order, function (b, c) {
                        a.aaSorting.push(c[0] >= d.length ? [0, c[1]] : c)
                    }));
                    e.search !== k && h.extend(a.oPreviousSearch, Bb(e.search));
                    b = 0;
                    for (c = e.columns.length; b < c; b++) {
                        var f = e.columns[b];
                        f.visible !== k && (d[b].bVisible = f.visible);
                        f.search !== k && h.extend(a.aoPreSearchCols[b],
                            Bb(f.search))
                    }
                    w(a, "aoStateLoaded", "stateLoaded", [a, e])
                }
            }
        }

        function za(a) {
            var b = m.settings, a = h.inArray(a, D(b, "nTable"));
            return -1 !== a ? b[a] : null
        }

        function J(a, b, c, d) {
            c = "DataTables warning: " + (a ? "table id=" + a.sTableId + " - " : "") + c;
            d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d);
            if (b)Fa.console && console.log && console.log(c); else if (b = m.ext, b = b.sErrMode || b.errMode, a && w(a, null, "error", [a, d, c]), "alert" == b)alert(c); else {
                if ("throw" == b)throw Error(c);
                "function" == typeof b &&
                b(a, d, c)
            }
        }

        function F(a, b, c, d) {
            h.isArray(c) ? h.each(c, function (c, d) {
                h.isArray(d) ? F(a, b, d[0], d[1]) : F(a, b, d)
            }) : (d === k && (d = c), b[c] !== k && (a[d] = b[c]))
        }

        function Lb(a, b, c) {
            var d, e;
            for (e in b)b.hasOwnProperty(e) && (d = b[e], h.isPlainObject(d) ? (h.isPlainObject(a[e]) || (a[e] = {}), h.extend(!0, a[e], d)) : a[e] = c && "data" !== e && "aaData" !== e && h.isArray(d) ? d.slice() : d);
            return a
        }

        function Va(a, b, c) {
            h(a).bind("click.DT", b, function (b) {
                a.blur();
                c(b)
            }).bind("keypress.DT", b, function (a) {
                13 === a.which && (a.preventDefault(), c(a))
            }).bind("selectstart.DT",
                function () {
                    return !1
                })
        }

        function z(a, b, c, d) {
            c && a[b].push({fn: c, sName: d})
        }

        function w(a, b, c, d) {
            var e = [];
            b && (e = h.map(a[b].slice().reverse(), function (b) {
                return b.fn.apply(a.oInstance, d)
            }));
            null !== c && (b = h.Event(c + ".dt"), h(a.nTable).trigger(b, d), e.push(b.result));
            return e
        }

        function Sa(a) {
            var b = a._iDisplayStart, c = a.fnDisplayEnd(), d = a._iDisplayLength;
            b >= c && (b = c - d);
            b -= b % d;
            if (-1 === d || 0 > b)b = 0;
            a._iDisplayStart = b
        }

        function Pa(a, b) {
            var c = a.renderer, d = m.ext.renderer[b];
            return h.isPlainObject(c) && c[b] ? d[c[b]] || d._ : "string" === typeof c ? d[c] || d._ : d._
        }

        function y(a) {
            return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom"
        }

        function Aa(a, b) {
            var c = [], c = Mb.numbers_length, d = Math.floor(c / 2);
            b <= c ? c = W(0, b) : a <= d ? (c = W(0, c - 2), c.push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - d ? c = W(b - (c - 2), b) : (c = W(a - d + 2, a + d - 1), c.push("ellipsis"), c.push(b - 1)), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0));
            c.DT_el = "span";
            return c
        }

        function cb(a) {
            h.each({
                num: function (b) {
                    return Ba(b, a)
                }, "num-fmt": function (b) {
                    return Ba(b, a, Wa)
                }, "html-num": function (b) {
                    return Ba(b,
                        a, Ca)
                }, "html-num-fmt": function (b) {
                    return Ba(b, a, Ca, Wa)
                }
            }, function (b, c) {
                v.type.order[b + a + "-pre"] = c;
                b.match(/^html\-/) && (v.type.search[b + a] = v.type.search.html)
            })
        }

        function Nb(a) {
            return function () {
                var b = [za(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                return m.ext.internal[a].apply(this, b)
            }
        }

        var m, v, t, p, s, Xa = {}, Ob = /[\r\n]/g, Ca = /<.*?>/g, ac = /^[\w\+\-]/, bc = /[\w\+\-]$/, Yb = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"), Wa = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,
            K = function (a) {
                return !a || !0 === a || "-" === a ? !0 : !1
            }, Pb = function (a) {
                var b = parseInt(a, 10);
                return !isNaN(b) && isFinite(a) ? b : null
            }, Qb = function (a, b) {
                Xa[b] || (Xa[b] = RegExp(va(b), "g"));
                return "string" === typeof a && "." !== b ? a.replace(/\./g, "").replace(Xa[b], ".") : a
            }, Ya = function (a, b, c) {
                var d = "string" === typeof a;
                if (K(a))return !0;
                b && d && (a = Qb(a, b));
                c && d && (a = a.replace(Wa, ""));
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, Rb = function (a, b, c) {
                return K(a) ? !0 : !(K(a) || "string" === typeof a) ? null : Ya(a.replace(Ca, ""), b, c) ? !0 : null
            }, D = function (a,
                             b, c) {
                var d = [], e = 0, f = a.length;
                if (c !== k)for (; e < f; e++)a[e] && a[e][b] && d.push(a[e][b][c]); else for (; e < f; e++)a[e] && d.push(a[e][b]);
                return d
            }, ja = function (a, b, c, d) {
                var e = [], f = 0, g = b.length;
                if (d !== k)for (; f < g; f++)a[b[f]][c] && e.push(a[b[f]][c][d]); else for (; f < g; f++)e.push(a[b[f]][c]);
                return e
            }, W = function (a, b) {
                var c = [], d;
                b === k ? (b = 0, d = a) : (d = b, b = a);
                for (var e = b; e < d; e++)c.push(e);
                return c
            }, Sb = function (a) {
                for (var b = [], c = 0, d = a.length; c < d; c++)a[c] && b.push(a[c]);
                return b
            }, pa = function (a) {
                var b = [], c, d, e = a.length, f, g = 0;
                d = 0;
                a:for (; d < e; d++) {
                    c = a[d];
                    for (f = 0; f < g; f++)if (b[f] === c)continue a;
                    b.push(c);
                    g++
                }
                return b
            }, A = function (a, b, c) {
                a[b] !== k && (a[c] = a[b])
            }, da = /\[.*?\]$/, U = /\(\)$/, wa = h("<div>")[0], Zb = wa.textContent !== k, $b = /<.*?>/g;
        m = function (a) {
            this.$ = function (a, b) {
                return this.api(!0).$(a, b)
            };
            this._ = function (a, b) {
                return this.api(!0).rows(a, b).data()
            };
            this.api = function (a) {
                return a ? new t(za(this[v.iApiIndex])) : new t(this)
            };
            this.fnAddData = function (a, b) {
                var c = this.api(!0), d = h.isArray(a) && (h.isArray(a[0]) || h.isPlainObject(a[0])) ?
                    c.rows.add(a) : c.row.add(a);
                (b === k || b) && c.draw();
                return d.flatten().toArray()
            };
            this.fnAdjustColumnSizing = function (a) {
                var b = this.api(!0).columns.adjust(), c = b.settings()[0], d = c.oScroll;
                a === k || a ? b.draw(!1) : ("" !== d.sX || "" !== d.sY) && Z(c)
            };
            this.fnClearTable = function (a) {
                var b = this.api(!0).clear();
                (a === k || a) && b.draw()
            };
            this.fnClose = function (a) {
                this.api(!0).row(a).child.hide()
            };
            this.fnDeleteRow = function (a, b, c) {
                var d = this.api(!0), a = d.rows(a), e = a.settings()[0], h = e.aoData[a[0][0]];
                a.remove();
                b && b.call(this, e, h);
                (c === k || c) && d.draw();
                return h
            };
            this.fnDestroy = function (a) {
                this.api(!0).destroy(a)
            };
            this.fnDraw = function (a) {
                this.api(!0).draw(a)
            };
            this.fnFilter = function (a, b, c, d, e, h) {
                e = this.api(!0);
                null === b || b === k ? e.search(a, c, d, h) : e.column(b).search(a, c, d, h);
                e.draw()
            };
            this.fnGetData = function (a, b) {
                var c = this.api(!0);
                if (a !== k) {
                    var d = a.nodeName ? a.nodeName.toLowerCase() : "";
                    return b !== k || "td" == d || "th" == d ? c.cell(a, b).data() : c.row(a).data() || null
                }
                return c.data().toArray()
            };
            this.fnGetNodes = function (a) {
                var b = this.api(!0);
                return a !== k ? b.row(a).node() : b.rows().nodes().flatten().toArray()
            };
            this.fnGetPosition = function (a) {
                var b = this.api(!0), c = a.nodeName.toUpperCase();
                return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? (a = b.cell(a).index(), [a.row, a.columnVisible, a.column]) : null
            };
            this.fnIsOpen = function (a) {
                return this.api(!0).row(a).child.isShown()
            };
            this.fnOpen = function (a, b, c) {
                return this.api(!0).row(a).child(b, c).show().child()[0]
            };
            this.fnPageChange = function (a, b) {
                var c = this.api(!0).page(a);
                (b === k || b) && c.draw(!1)
            };
            this.fnSetColumnVis =
                function (a, b, c) {
                    a = this.api(!0).column(a).visible(b);
                    (c === k || c) && a.columns.adjust().draw()
                };
            this.fnSettings = function () {
                return za(this[v.iApiIndex])
            };
            this.fnSort = function (a) {
                this.api(!0).order(a).draw()
            };
            this.fnSortListener = function (a, b, c) {
                this.api(!0).order.listener(a, b, c)
            };
            this.fnUpdate = function (a, b, c, d, e) {
                var h = this.api(!0);
                c === k || null === c ? h.row(b).data(a) : h.cell(b, c).data(a);
                (e === k || e) && h.columns.adjust();
                (d === k || d) && h.draw();
                return 0
            };
            this.fnVersionCheck = v.fnVersionCheck;
            var b = this, c = a === k, d = this.length;
            c && (a = {});
            this.oApi = this.internal = v.internal;
            for (var e in m.ext.internal)e && (this[e] = Nb(e));
            this.each(function () {
                var e = {}, e = 1 < d ? Lb(e, a, !0) : a, g = 0, i, j = this.getAttribute("id"), n = !1, l = m.defaults, r = h(this);
                if ("table" != this.nodeName.toLowerCase())J(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2); else {
                    db(l);
                    eb(l.column);
                    I(l, l, !0);
                    I(l.column, l.column, !0);
                    I(l, h.extend(e, r.data()));
                    var q = m.settings, g = 0;
                    for (i = q.length; g < i; g++) {
                        var p = q[g];
                        if (p.nTable == this || p.nTHead.parentNode == this || p.nTFoot &&
                            p.nTFoot.parentNode == this) {
                            g = e.bRetrieve !== k ? e.bRetrieve : l.bRetrieve;
                            if (c || g)return p.oInstance;
                            if (e.bDestroy !== k ? e.bDestroy : l.bDestroy) {
                                p.oInstance.fnDestroy();
                                break
                            } else {
                                J(p, 0, "Cannot reinitialise DataTable", 3);
                                return
                            }
                        }
                        if (p.sTableId == this.id) {
                            q.splice(g, 1);
                            break
                        }
                    }
                    if (null === j || "" === j)this.id = j = "DataTables_Table_" + m.ext._unique++;
                    var o = h.extend(!0, {}, m.models.oSettings, {
                        sDestroyWidth: r[0].style.width,
                        sInstance: j,
                        sTableId: j
                    });
                    o.nTable = this;
                    o.oApi = b.internal;
                    o.oInit = e;
                    q.push(o);
                    o.oInstance = 1 === b.length ?
                        b : r.dataTable();
                    db(e);
                    e.oLanguage && S(e.oLanguage);
                    e.aLengthMenu && !e.iDisplayLength && (e.iDisplayLength = h.isArray(e.aLengthMenu[0]) ? e.aLengthMenu[0][0] : e.aLengthMenu[0]);
                    e = Lb(h.extend(!0, {}, l), e);
                    F(o.oFeatures, e, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));
                    F(o, e, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp",
                        "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"], ["bJQueryUI", "bJUI"]]);
                    F(o.oScroll, e, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]);
                    F(o.oLanguage, e, "fnInfoCallback");
                    z(o, "aoDrawCallback", e.fnDrawCallback, "user");
                    z(o, "aoServerParams",
                        e.fnServerParams, "user");
                    z(o, "aoStateSaveParams", e.fnStateSaveParams, "user");
                    z(o, "aoStateLoadParams", e.fnStateLoadParams, "user");
                    z(o, "aoStateLoaded", e.fnStateLoaded, "user");
                    z(o, "aoRowCallback", e.fnRowCallback, "user");
                    z(o, "aoRowCreatedCallback", e.fnCreatedRow, "user");
                    z(o, "aoHeaderCallback", e.fnHeaderCallback, "user");
                    z(o, "aoFooterCallback", e.fnFooterCallback, "user");
                    z(o, "aoInitComplete", e.fnInitComplete, "user");
                    z(o, "aoPreDrawCallback", e.fnPreDrawCallback, "user");
                    o.rowIdFn = P(e.rowId);
                    fb(o);
                    j = o.oClasses;
                    e.bJQueryUI ? (h.extend(j, m.ext.oJUIClasses, e.oClasses), e.sDom === l.sDom && "lfrtip" === l.sDom && (o.sDom = '<"H"lfr>t<"F"ip>'), o.renderer) ? h.isPlainObject(o.renderer) && !o.renderer.header && (o.renderer.header = "jqueryui") : o.renderer = "jqueryui" : h.extend(j, m.ext.classes, e.oClasses);
                    r.addClass(j.sTable);
                    o.iInitDisplayStart === k && (o.iInitDisplayStart = e.iDisplayStart, o._iDisplayStart = e.iDisplayStart);
                    null !== e.iDeferLoading && (o.bDeferLoading = !0, g = h.isArray(e.iDeferLoading), o._iRecordsDisplay = g ? e.iDeferLoading[0] : e.iDeferLoading,
                        o._iRecordsTotal = g ? e.iDeferLoading[1] : e.iDeferLoading);
                    var t = o.oLanguage;
                    h.extend(!0, t, e.oLanguage);
                    "" !== t.sUrl && (h.ajax({
                        dataType: "json", url: t.sUrl, success: function (a) {
                            S(a);
                            I(l.oLanguage, a);
                            h.extend(true, t, a);
                            ia(o)
                        }, error: function () {
                            ia(o)
                        }
                    }), n = !0);
                    null === e.asStripeClasses && (o.asStripeClasses = [j.sStripeOdd, j.sStripeEven]);
                    var g = o.asStripeClasses, s = r.children("tbody").find("tr").eq(0);
                    -1 !== h.inArray(!0, h.map(g, function (a) {
                        return s.hasClass(a)
                    })) && (h("tbody tr", this).removeClass(g.join(" ")), o.asDestroyStripes =
                        g.slice());
                    q = [];
                    g = this.getElementsByTagName("thead");
                    0 !== g.length && (fa(o.aoHeader, g[0]), q = qa(o));
                    if (null === e.aoColumns) {
                        p = [];
                        g = 0;
                        for (i = q.length; g < i; g++)p.push(null)
                    } else p = e.aoColumns;
                    g = 0;
                    for (i = p.length; g < i; g++)Ga(o, q ? q[g] : null);
                    hb(o, e.aoColumnDefs, p, function (a, b) {
                        la(o, a, b)
                    });
                    if (s.length) {
                        var u = function (a, b) {
                            return a.getAttribute("data-" + b) !== null ? b : null
                        };
                        h(s[0]).children("th, td").each(function (a, b) {
                            var c = o.aoColumns[a];
                            if (c.mData === a) {
                                var d = u(b, "sort") || u(b, "order"), e = u(b, "filter") || u(b, "search");
                                if (d !== null || e !== null) {
                                    c.mData = {
                                        _: a + ".display",
                                        sort: d !== null ? a + ".@data-" + d : k,
                                        type: d !== null ? a + ".@data-" + d : k,
                                        filter: e !== null ? a + ".@data-" + e : k
                                    };
                                    la(o, a)
                                }
                            }
                        })
                    }
                    var v = o.oFeatures;
                    e.bStateSave && (v.bStateSave = !0, Kb(o, e), z(o, "aoDrawCallback", ya, "state_save"));
                    if (e.aaSorting === k) {
                        q = o.aaSorting;
                        g = 0;
                        for (i = q.length; g < i; g++)q[g][1] = o.aoColumns[g].asSorting[0]
                    }
                    xa(o);
                    v.bSort && z(o, "aoDrawCallback", function () {
                        if (o.bSorted) {
                            var a = V(o), b = {};
                            h.each(a, function (a, c) {
                                b[c.src] = c.dir
                            });
                            w(o, null, "order", [o, a, b]);
                            Jb(o)
                        }
                    });
                    z(o,
                        "aoDrawCallback", function () {
                            (o.bSorted || y(o) === "ssp" || v.bDeferRender) && xa(o)
                        }, "sc");
                    g = r.children("caption").each(function () {
                        this._captionSide = r.css("caption-side")
                    });
                    i = r.children("thead");
                    0 === i.length && (i = h("<thead/>").appendTo(this));
                    o.nTHead = i[0];
                    i = r.children("tbody");
                    0 === i.length && (i = h("<tbody/>").appendTo(this));
                    o.nTBody = i[0];
                    i = r.children("tfoot");
                    if (0 === i.length && 0 < g.length && ("" !== o.oScroll.sX || "" !== o.oScroll.sY))i = h("<tfoot/>").appendTo(this);
                    0 === i.length || 0 === i.children().length ? r.addClass(j.sNoFooter) :
                    0 < i.length && (o.nTFoot = i[0], fa(o.aoFooter, o.nTFoot));
                    if (e.aaData)for (g = 0; g < e.aaData.length; g++)L(o, e.aaData[g]); else(o.bDeferLoading || "dom" == y(o)) && ma(o, h(o.nTBody).children("tr"));
                    o.aiDisplay = o.aiDisplayMaster.slice();
                    o.bInitialised = !0;
                    !1 === n && ia(o)
                }
            });
            b = null;
            return this
        };
        var Tb = [], x = Array.prototype, cc = function (a) {
            var b, c, d = m.settings, e = h.map(d, function (a) {
                return a.nTable
            });
            if (a) {
                if (a.nTable && a.oApi)return [a];
                if (a.nodeName && "table" === a.nodeName.toLowerCase())return b = h.inArray(a, e), -1 !== b ? [d[b]] :
                    null;
                if (a && "function" === typeof a.settings)return a.settings().toArray();
                "string" === typeof a ? c = h(a) : a instanceof h && (c = a)
            } else return [];
            if (c)return c.map(function () {
                b = h.inArray(this, e);
                return -1 !== b ? d[b] : null
            }).toArray()
        };
        t = function (a, b) {
            if (!(this instanceof t))return new t(a, b);
            var c = [], d = function (a) {
                (a = cc(a)) && (c = c.concat(a))
            };
            if (h.isArray(a))for (var e = 0, f = a.length; e < f; e++)d(a[e]); else d(a);
            this.context = pa(c);
            b && h.merge(this, b);
            this.selector = {rows: null, cols: null, opts: null};
            t.extend(this, this, Tb)
        };
        m.Api = t;
        h.extend(t.prototype, {
            any: function () {
                return 0 !== this.count()
            },
            concat: x.concat,
            context: [],
            count: function () {
                return this.flatten().length
            },
            each: function (a) {
                for (var b = 0, c = this.length; b < c; b++)a.call(this, this[b], b, this);
                return this
            },
            eq: function (a) {
                var b = this.context;
                return b.length > a ? new t(b[a], this[a]) : null
            },
            filter: function (a) {
                var b = [];
                if (x.filter)b = x.filter.call(this, a, this); else for (var c = 0, d = this.length; c < d; c++)a.call(this, this[c], c, this) && b.push(this[c]);
                return new t(this.context, b)
            },
            flatten: function () {
                var a =
                    [];
                return new t(this.context, a.concat.apply(a, this.toArray()))
            },
            join: x.join,
            indexOf: x.indexOf || function (a, b) {
                for (var c = b || 0, d = this.length; c < d; c++)if (this[c] === a)return c;
                return -1
            },
            iterator: function (a, b, c, d) {
                var e = [], f, g, h, j, n, l = this.context, m, q, p = this.selector;
                "string" === typeof a && (d = c, c = b, b = a, a = !1);
                g = 0;
                for (h = l.length; g < h; g++) {
                    var o = new t(l[g]);
                    if ("table" === b)f = c.call(o, l[g], g), f !== k && e.push(f); else if ("columns" === b || "rows" === b)f = c.call(o, l[g], this[g], g), f !== k && e.push(f); else if ("column" === b || "column-rows" ===
                        b || "row" === b || "cell" === b) {
                        q = this[g];
                        "column-rows" === b && (m = Da(l[g], p.opts));
                        j = 0;
                        for (n = q.length; j < n; j++)f = q[j], f = "cell" === b ? c.call(o, l[g], f.row, f.column, g, j) : c.call(o, l[g], f, g, j, m), f !== k && e.push(f)
                    }
                }
                return e.length || d ? (a = new t(l, a ? e.concat.apply([], e) : e), b = a.selector, b.rows = p.rows, b.cols = p.cols, b.opts = p.opts, a) : this
            },
            lastIndexOf: x.lastIndexOf || function (a, b) {
                return this.indexOf.apply(this.toArray.reverse(), arguments)
            },
            length: 0,
            map: function (a) {
                var b = [];
                if (x.map)b = x.map.call(this, a, this); else for (var c =
                    0, d = this.length; c < d; c++)b.push(a.call(this, this[c], c));
                return new t(this.context, b)
            },
            pluck: function (a) {
                return this.map(function (b) {
                    return b[a]
                })
            },
            pop: x.pop,
            push: x.push,
            reduce: x.reduce || function (a, b) {
                return gb(this, a, b, 0, this.length, 1)
            },
            reduceRight: x.reduceRight || function (a, b) {
                return gb(this, a, b, this.length - 1, -1, -1)
            },
            reverse: x.reverse,
            selector: null,
            shift: x.shift,
            sort: x.sort,
            splice: x.splice,
            toArray: function () {
                return x.slice.call(this)
            },
            to$: function () {
                return h(this)
            },
            toJQuery: function () {
                return h(this)
            },
            unique: function () {
                return new t(this.context, pa(this))
            },
            unshift: x.unshift
        });
        t.extend = function (a, b, c) {
            if (c.length && b && (b instanceof t || b.__dt_wrapper)) {
                var d, e, f, g = function (a, b, c) {
                    return function () {
                        var d = b.apply(a, arguments);
                        t.extend(d, d, c.methodExt);
                        return d
                    }
                };
                d = 0;
                for (e = c.length; d < e; d++)f = c[d], b[f.name] = "function" === typeof f.val ? g(a, f.val, f) : h.isPlainObject(f.val) ? {} : f.val, b[f.name].__dt_wrapper = !0, t.extend(a, b[f.name], f.propExt)
            }
        };
        t.register = p = function (a, b) {
            if (h.isArray(a))for (var c = 0, d = a.length; c <
            d; c++)t.register(a[c], b); else for (var e = a.split("."), f = Tb, g, i, c = 0, d = e.length; c < d; c++) {
                g = (i = -1 !== e[c].indexOf("()")) ? e[c].replace("()", "") : e[c];
                var j;
                a:{
                    j = 0;
                    for (var n = f.length; j < n; j++)if (f[j].name === g) {
                        j = f[j];
                        break a
                    }
                    j = null
                }
                j || (j = {name: g, val: {}, methodExt: [], propExt: []}, f.push(j));
                c === d - 1 ? j.val = b : f = i ? j.methodExt : j.propExt
            }
        };
        t.registerPlural = s = function (a, b, c) {
            t.register(a, c);
            t.register(b, function () {
                var a = c.apply(this, arguments);
                return a === this ? this : a instanceof t ? a.length ? h.isArray(a[0]) ? new t(a.context,
                    a[0]) : a[0] : k : a
            })
        };
        p("tables()", function (a) {
            var b;
            if (a) {
                b = t;
                var c = this.context;
                if ("number" === typeof a)a = [c[a]]; else var d = h.map(c, function (a) {
                    return a.nTable
                }), a = h(d).filter(a).map(function () {
                    var a = h.inArray(this, d);
                    return c[a]
                }).toArray();
                b = new b(a)
            } else b = this;
            return b
        });
        p("table()", function (a) {
            var a = this.tables(a), b = a.context;
            return b.length ? new t(b[0]) : a
        });
        s("tables().nodes()", "table().node()", function () {
            return this.iterator("table", function (a) {
                return a.nTable
            }, 1)
        });
        s("tables().body()", "table().body()",
            function () {
                return this.iterator("table", function (a) {
                    return a.nTBody
                }, 1)
            });
        s("tables().header()", "table().header()", function () {
            return this.iterator("table", function (a) {
                return a.nTHead
            }, 1)
        });
        s("tables().footer()", "table().footer()", function () {
            return this.iterator("table", function (a) {
                return a.nTFoot
            }, 1)
        });
        s("tables().containers()", "table().container()", function () {
            return this.iterator("table", function (a) {
                return a.nTableWrapper
            }, 1)
        });
        p("draw()", function (a) {
            return this.iterator("table", function (b) {
                "page" ===
                a ? M(b) : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0), R(b, !1 === a))
            })
        });
        p("page()", function (a) {
            return a === k ? this.page.info().page : this.iterator("table", function (b) {
                Ta(b, a)
            })
        });
        p("page.info()", function () {
            if (0 === this.context.length)return k;
            var a = this.context[0], b = a._iDisplayStart, c = a._iDisplayLength, d = a.fnRecordsDisplay(), e = -1 === c;
            return {
                page: e ? 0 : Math.floor(b / c),
                pages: e ? 1 : Math.ceil(d / c),
                start: b,
                end: a.fnDisplayEnd(),
                length: c,
                recordsTotal: a.fnRecordsTotal(),
                recordsDisplay: d,
                serverSide: "ssp" === y(a)
            }
        });
        p("page.len()", function (a) {
            return a === k ? 0 !== this.context.length ? this.context[0]._iDisplayLength : k : this.iterator("table", function (b) {
                Ra(b, a)
            })
        });
        var Ub = function (a, b, c) {
            if (c) {
                var d = new t(a);
                d.one("draw", function () {
                    c(d.ajax.json())
                })
            }
            if ("ssp" == y(a))R(a, b); else {
                C(a, !0);
                var e = a.jqXHR;
                e && 4 !== e.readyState && e.abort();
                ra(a, [], function (c) {
                    na(a);
                    for (var c = sa(a, c), d = 0, e = c.length; d < e; d++)L(a, c[d]);
                    R(a, b);
                    C(a, !1)
                })
            }
        };
        p("ajax.json()", function () {
            var a = this.context;
            if (0 < a.length)return a[0].json
        });
        p("ajax.params()",
            function () {
                var a = this.context;
                if (0 < a.length)return a[0].oAjaxData
            });
        p("ajax.reload()", function (a, b) {
            return this.iterator("table", function (c) {
                Ub(c, !1 === b, a)
            })
        });
        p("ajax.url()", function (a) {
            var b = this.context;
            if (a === k) {
                if (0 === b.length)return k;
                b = b[0];
                return b.ajax ? h.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource
            }
            return this.iterator("table", function (b) {
                h.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a
            })
        });
        p("ajax.url().load()", function (a, b) {
            return this.iterator("table", function (c) {
                Ub(c, !1 === b, a)
            })
        });
        var Za = function (a, b, c, d, e) {
                var f = [], g, i, j, n, l, m;
                j = typeof b;
                if (!b || "string" === j || "function" === j || b.length === k)b = [b];
                j = 0;
                for (n = b.length; j < n; j++) {
                    i = b[j] && b[j].split ? b[j].split(",") : [b[j]];
                    l = 0;
                    for (m = i.length; l < m; l++)(g = c("string" === typeof i[l] ? h.trim(i[l]) : i[l])) && g.length && (f = f.concat(g))
                }
                a = v.selector[a];
                if (a.length) {
                    j = 0;
                    for (n = a.length; j < n; j++)f = a[j](d, e, f)
                }
                return pa(f)
            }, $a = function (a) {
                a || (a = {});
                a.filter && a.search === k && (a.search = a.filter);
                return h.extend({search: "none", order: "current", page: "all"}, a)
            },
            ab = function (a) {
                for (var b = 0, c = a.length; b < c; b++)if (0 < a[b].length)return a[0] = a[b], a[0].length = 1, a.length = 1, a.context = [a.context[b]], a;
                a.length = 0;
                return a
            }, Da = function (a, b) {
                var c, d, e, f = [], g = a.aiDisplay;
                c = a.aiDisplayMaster;
                var i = b.search;
                d = b.order;
                e = b.page;
                if ("ssp" == y(a))return "removed" === i ? [] : W(0, c.length);
                if ("current" == e) {
                    c = a._iDisplayStart;
                    for (d = a.fnDisplayEnd(); c < d; c++)f.push(g[c])
                } else if ("current" == d || "applied" == d)f = "none" == i ? c.slice() : "applied" == i ? g.slice() : h.map(c, function (a) {
                    return -1 === h.inArray(a,
                        g) ? a : null
                }); else if ("index" == d || "original" == d) {
                    c = 0;
                    for (d = a.aoData.length; c < d; c++)"none" == i ? f.push(c) : (e = h.inArray(c, g), (-1 === e && "removed" == i || 0 <= e && "applied" == i) && f.push(c))
                }
                return f
            };
        p("rows()", function (a, b) {
            a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");
            var b = $a(b), c = this.iterator("table", function (c) {
                var e = b;
                return Za("row", a, function (a) {
                    var b = Pb(a);
                    if (b !== null && !e)return [b];
                    var i = Da(c, e);
                    if (b !== null && h.inArray(b, i) !== -1)return [b];
                    if (!a)return i;
                    if (typeof a === "function")return h.map(i, function (b) {
                        var e =
                            c.aoData[b];
                        return a(b, e._aData, e.nTr) ? b : null
                    });
                    b = Sb(ja(c.aoData, i, "nTr"));
                    if (a.nodeName && h.inArray(a, b) !== -1)return [a._DT_RowIndex];
                    if (typeof a === "string" && a.charAt(0) === "#") {
                        i = c.aIds[a.replace(/^#/, "")];
                        if (i !== k)return [i.idx]
                    }
                    return h(b).filter(a).map(function () {
                        return this._DT_RowIndex
                    }).toArray()
                }, c, e)
            }, 1);
            c.selector.rows = a;
            c.selector.opts = b;
            return c
        });
        p("rows().nodes()", function () {
            return this.iterator("row", function (a, b) {
                return a.aoData[b].nTr || k
            }, 1)
        });
        p("rows().data()", function () {
            return this.iterator(!0,
                "rows", function (a, b) {
                    return ja(a.aoData, b, "_aData")
                }, 1)
        });
        s("rows().cache()", "row().cache()", function (a) {
            return this.iterator("row", function (b, c) {
                var d = b.aoData[c];
                return "search" === a ? d._aFilterData : d._aSortData
            }, 1)
        });
        s("rows().invalidate()", "row().invalidate()", function (a) {
            return this.iterator("row", function (b, c) {
                ea(b, c, a)
            })
        });
        s("rows().indexes()", "row().index()", function () {
            return this.iterator("row", function (a, b) {
                return b
            }, 1)
        });
        s("rows().ids()", "row().id()", function (a) {
            for (var b = [], c = this.context,
                     d = 0, e = c.length; d < e; d++)for (var f = 0, g = this[d].length; f < g; f++) {
                var h = c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);
                b.push((!0 === a ? "#" : "") + h)
            }
            return new t(c, b)
        });
        s("rows().remove()", "row().remove()", function () {
            var a = this;
            this.iterator("row", function (b, c, d) {
                var e = b.aoData, f = e[c];
                e.splice(c, 1);
                for (var g = 0, h = e.length; g < h; g++)null !== e[g].nTr && (e[g].nTr._DT_RowIndex = g);
                oa(b.aiDisplayMaster, c);
                oa(b.aiDisplay, c);
                oa(a[d], c, !1);
                Sa(b);
                c = b.rowIdFn(f._aData);
                c !== k && delete b.aIds[c]
            });
            this.iterator("table", function (a) {
                for (var c =
                    0, d = a.aoData.length; c < d; c++)a.aoData[c].idx = c
            });
            return this
        });
        p("rows.add()", function (a) {
            var b = this.iterator("table", function (b) {
                var c, f, g, h = [];
                f = 0;
                for (g = a.length; f < g; f++)c = a[f], c.nodeName && "TR" === c.nodeName.toUpperCase() ? h.push(ma(b, c)[0]) : h.push(L(b, c));
                return h
            }, 1), c = this.rows(-1);
            c.pop();
            h.merge(c, b);
            return c
        });
        p("row()", function (a, b) {
            return ab(this.rows(a, b))
        });
        p("row().data()", function (a) {
            var b = this.context;
            if (a === k)return b.length && this.length ? b[0].aoData[this[0]]._aData : k;
            b[0].aoData[this[0]]._aData =
                a;
            ea(b[0], this[0], "data");
            return this
        });
        p("row().node()", function () {
            var a = this.context;
            return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null
        });
        p("row.add()", function (a) {
            a instanceof h && a.length && (a = a[0]);
            var b = this.iterator("table", function (b) {
                return a.nodeName && "TR" === a.nodeName.toUpperCase() ? ma(b, a)[0] : L(b, a)
            });
            return this.row(b[0])
        });
        var bb = function (a, b) {
            var c = a.context;
            if (c.length && (c = c[0].aoData[b !== k ? b : a[0]]) && c._details)c._details.remove(), c._detailsShow = k, c._details = k
        }, Vb = function (a,
                          b) {
            var c = a.context;
            if (c.length && a.length) {
                var d = c[0].aoData[a[0]];
                if (d._details) {
                    (d._detailsShow = b) ? d._details.insertAfter(d.nTr) : d._details.detach();
                    var e = c[0], f = new t(e), g = e.aoData;
                    f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
                    0 < D(g, "_details").length && (f.on("draw.dt.DT_details", function (a, b) {
                        e === b && f.rows({page: "current"}).eq(0).each(function (a) {
                            a = g[a];
                            a._detailsShow && a._details.insertAfter(a.nTr)
                        })
                    }), f.on("column-visibility.dt.DT_details", function (a, b) {
                        if (e ===
                            b)for (var c, d = ca(b), f = 0, h = g.length; f < h; f++)c = g[f], c._details && c._details.children("td[colspan]").attr("colspan", d)
                    }), f.on("destroy.dt.DT_details", function (a, b) {
                        if (e === b)for (var c = 0, d = g.length; c < d; c++)g[c]._details && bb(f, c)
                    }))
                }
            }
        };
        p("row().child()", function (a, b) {
            var c = this.context;
            if (a === k)return c.length && this.length ? c[0].aoData[this[0]]._details : k;
            if (!0 === a)this.child.show(); else if (!1 === a)bb(this); else if (c.length && this.length) {
                var d = c[0], c = c[0].aoData[this[0]], e = [], f = function (a, b) {
                    if (h.isArray(a) ||
                        a instanceof h)for (var c = 0, k = a.length; c < k; c++)f(a[c], b); else a.nodeName && "tr" === a.nodeName.toLowerCase() ? e.push(a) : (c = h("<tr><td/></tr>").addClass(b), h("td", c).addClass(b).html(a)[0].colSpan = ca(d), e.push(c[0]))
                };
                f(a, b);
                c._details && c._details.remove();
                c._details = h(e);
                c._detailsShow && c._details.insertAfter(c.nTr)
            }
            return this
        });
        p(["row().child.show()", "row().child().show()"], function () {
            Vb(this, !0);
            return this
        });
        p(["row().child.hide()", "row().child().hide()"], function () {
            Vb(this, !1);
            return this
        });
        p(["row().child.remove()",
            "row().child().remove()"], function () {
            bb(this);
            return this
        });
        p("row().child.isShown()", function () {
            var a = this.context;
            return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1
        });
        var dc = /^(.+):(name|visIdx|visible)$/, Wb = function (a, b, c, d, e) {
            for (var c = [], d = 0, f = e.length; d < f; d++)c.push(B(a, e[d], b));
            return c
        };
        p("columns()", function (a, b) {
            a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");
            var b = $a(b), c = this.iterator("table", function (c) {
                var e = a, f = b, g = c.aoColumns, i = D(g, "sName"), j = D(g, "nTh");
                return Za("column",
                    e, function (a) {
                        var b = Pb(a);
                        if (a === "")return W(g.length);
                        if (b !== null)return [b >= 0 ? b : g.length + b];
                        if (typeof a === "function") {
                            var e = Da(c, f);
                            return h.map(g, function (b, f) {
                                return a(f, Wb(c, f, 0, 0, e), j[f]) ? f : null
                            })
                        }
                        var k = typeof a === "string" ? a.match(dc) : "";
                        if (k)switch (k[2]) {
                            case "visIdx":
                            case "visible":
                                b = parseInt(k[1], 10);
                                if (b < 0) {
                                    var m = h.map(g, function (a, b) {
                                        return a.bVisible ? b : null
                                    });
                                    return [m[m.length + b]]
                                }
                                return [$(c, b)];
                            case "name":
                                return h.map(i, function (a, b) {
                                    return a === k[1] ? b : null
                                })
                        } else return h(j).filter(a).map(function () {
                            return h.inArray(this,
                                j)
                        }).toArray()
                    }, c, f)
            }, 1);
            c.selector.cols = a;
            c.selector.opts = b;
            return c
        });
        s("columns().header()", "column().header()", function () {
            return this.iterator("column", function (a, b) {
                return a.aoColumns[b].nTh
            }, 1)
        });
        s("columns().footer()", "column().footer()", function () {
            return this.iterator("column", function (a, b) {
                return a.aoColumns[b].nTf
            }, 1)
        });
        s("columns().data()", "column().data()", function () {
            return this.iterator("column-rows", Wb, 1)
        });
        s("columns().dataSrc()", "column().dataSrc()", function () {
            return this.iterator("column",
                function (a, b) {
                    return a.aoColumns[b].mData
                }, 1)
        });
        s("columns().cache()", "column().cache()", function (a) {
            return this.iterator("column-rows", function (b, c, d, e, f) {
                return ja(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c)
            }, 1)
        });
        s("columns().nodes()", "column().nodes()", function () {
            return this.iterator("column-rows", function (a, b, c, d, e) {
                return ja(a.aoData, e, "anCells", b)
            }, 1)
        });
        s("columns().visible()", "column().visible()", function (a, b) {
            return this.iterator("column", function (c, d) {
                if (a === k)return c.aoColumns[d].bVisible;
                var e = c.aoColumns, f = e[d], g = c.aoData, i, j, m;
                if (a !== k && f.bVisible !== a) {
                    if (a) {
                        var l = h.inArray(!0, D(e, "bVisible"), d + 1);
                        i = 0;
                        for (j = g.length; i < j; i++)m = g[i].nTr, e = g[i].anCells, m && m.insertBefore(e[d], e[l] || null)
                    } else h(D(c.aoData, "anCells", d)).detach();
                    f.bVisible = a;
                    ga(c, c.aoHeader);
                    ga(c, c.aoFooter);
                    if (b === k || b)Y(c), (c.oScroll.sX || c.oScroll.sY) && Z(c);
                    w(c, null, "column-visibility", [c, d, a]);
                    ya(c)
                }
            })
        });
        s("columns().indexes()", "column().index()", function (a) {
            return this.iterator("column", function (b, c) {
                return "visible" ===
                a ? ba(b, c) : c
            }, 1)
        });
        p("columns.adjust()", function () {
            return this.iterator("table", function (a) {
                Y(a)
            }, 1)
        });
        p("column.index()", function (a, b) {
            if (0 !== this.context.length) {
                var c = this.context[0];
                if ("fromVisible" === a || "toData" === a)return $(c, b);
                if ("fromData" === a || "toVisible" === a)return ba(c, b)
            }
        });
        p("column()", function (a, b) {
            return ab(this.columns(a, b))
        });
        p("cells()", function (a, b, c) {
            h.isPlainObject(a) && (a.row === k ? (c = a, a = null) : (c = b, b = null));
            h.isPlainObject(b) && (c = b, b = null);
            if (null === b || b === k)return this.iterator("table",
                function (b) {
                    var d = a, e = $a(c), f = b.aoData, g = Da(b, e), i = Sb(ja(f, g, "anCells")), j = h([].concat.apply([], i)), l, m = b.aoColumns.length, n, p, t, s, u, v;
                    return Za("cell", d, function (a) {
                        var c = typeof a === "function";
                        if (a === null || a === k || c) {
                            n = [];
                            p = 0;
                            for (t = g.length; p < t; p++) {
                                l = g[p];
                                for (s = 0; s < m; s++) {
                                    u = {row: l, column: s};
                                    if (c) {
                                        v = f[l];
                                        a(u, B(b, l, s), v.anCells ? v.anCells[s] : null) && n.push(u)
                                    } else n.push(u)
                                }
                            }
                            return n
                        }
                        return h.isPlainObject(a) ? [a] : j.filter(a).map(function (a, b) {
                            if (b.parentNode)l = b.parentNode._DT_RowIndex; else {
                                a = 0;
                                for (t =
                                         f.length; a < t; a++)if (h.inArray(b, f[a].anCells) !== -1) {
                                    l = a;
                                    break
                                }
                            }
                            return {row: l, column: h.inArray(b, f[l].anCells)}
                        }).toArray()
                    }, b, e)
                });
            var d = this.columns(b, c), e = this.rows(a, c), f, g, i, j, m, l = this.iterator("table", function (a, b) {
                f = [];
                g = 0;
                for (i = e[b].length; g < i; g++) {
                    j = 0;
                    for (m = d[b].length; j < m; j++)f.push({row: e[b][g], column: d[b][j]})
                }
                return f
            }, 1);
            h.extend(l.selector, {cols: b, rows: a, opts: c});
            return l
        });
        s("cells().nodes()", "cell().node()", function () {
            return this.iterator("cell", function (a, b, c) {
                return (a = a.aoData[b].anCells) ?
                    a[c] : k
            }, 1)
        });
        p("cells().data()", function () {
            return this.iterator("cell", function (a, b, c) {
                return B(a, b, c)
            }, 1)
        });
        s("cells().cache()", "cell().cache()", function (a) {
            a = "search" === a ? "_aFilterData" : "_aSortData";
            return this.iterator("cell", function (b, c, d) {
                return b.aoData[c][a][d]
            }, 1)
        });
        s("cells().render()", "cell().render()", function (a) {
            return this.iterator("cell", function (b, c, d) {
                return B(b, c, d, a)
            }, 1)
        });
        s("cells().indexes()", "cell().index()", function () {
            return this.iterator("cell", function (a, b, c) {
                return {
                    row: b,
                    column: c, columnVisible: ba(a, c)
                }
            }, 1)
        });
        s("cells().invalidate()", "cell().invalidate()", function (a) {
            return this.iterator("cell", function (b, c, d) {
                ea(b, c, a, d)
            })
        });
        p("cell()", function (a, b, c) {
            return ab(this.cells(a, b, c))
        });
        p("cell().data()", function (a) {
            var b = this.context, c = this[0];
            if (a === k)return b.length && c.length ? B(b[0], c[0].row, c[0].column) : k;
            ib(b[0], c[0].row, c[0].column, a);
            ea(b[0], c[0].row, "data", c[0].column);
            return this
        });
        p("order()", function (a, b) {
            var c = this.context;
            if (a === k)return 0 !== c.length ? c[0].aaSorting :
                k;
            "number" === typeof a ? a = [[a, b]] : h.isArray(a[0]) || (a = Array.prototype.slice.call(arguments));
            return this.iterator("table", function (b) {
                b.aaSorting = a.slice()
            })
        });
        p("order.listener()", function (a, b, c) {
            return this.iterator("table", function (d) {
                Oa(d, a, b, c)
            })
        });
        p(["columns().order()", "column().order()"], function (a) {
            var b = this;
            return this.iterator("table", function (c, d) {
                var e = [];
                h.each(b[d], function (b, c) {
                    e.push([c, a])
                });
                c.aaSorting = e
            })
        });
        p("search()", function (a, b, c, d) {
            var e = this.context;
            return a === k ? 0 !== e.length ?
                e[0].oPreviousSearch.sSearch : k : this.iterator("table", function (e) {
                e.oFeatures.bFilter && ha(e, h.extend({}, e.oPreviousSearch, {
                    sSearch: a + "",
                    bRegex: null === b ? !1 : b,
                    bSmart: null === c ? !0 : c,
                    bCaseInsensitive: null === d ? !0 : d
                }), 1)
            })
        });
        s("columns().search()", "column().search()", function (a, b, c, d) {
            return this.iterator("column", function (e, f) {
                var g = e.aoPreSearchCols;
                if (a === k)return g[f].sSearch;
                e.oFeatures.bFilter && (h.extend(g[f], {
                    sSearch: a + "",
                    bRegex: null === b ? !1 : b,
                    bSmart: null === c ? !0 : c,
                    bCaseInsensitive: null === d ? !0 : d
                }), ha(e,
                    e.oPreviousSearch, 1))
            })
        });
        p("state()", function () {
            return this.context.length ? this.context[0].oSavedState : null
        });
        p("state.clear()", function () {
            return this.iterator("table", function (a) {
                a.fnStateSaveCallback.call(a.oInstance, a, {})
            })
        });
        p("state.loaded()", function () {
            return this.context.length ? this.context[0].oLoadedState : null
        });
        p("state.save()", function () {
            return this.iterator("table", function (a) {
                ya(a)
            })
        });
        m.versionCheck = m.fnVersionCheck = function (a) {
            for (var b = m.version.split("."), a = a.split("."), c, d, e = 0, f =
                a.length; e < f; e++)if (c = parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d)return c > d;
            return !0
        };
        m.isDataTable = m.fnIsDataTable = function (a) {
            var b = h(a).get(0), c = !1;
            h.each(m.settings, function (a, e) {
                var f = e.nScrollHead ? h("table", e.nScrollHead)[0] : null, g = e.nScrollFoot ? h("table", e.nScrollFoot)[0] : null;
                if (e.nTable === b || f === b || g === b)c = !0
            });
            return c
        };
        m.tables = m.fnTables = function (a) {
            var b = !1;
            h.isPlainObject(a) && (b = a.api, a = a.visible);
            var c = h.map(m.settings, function (b) {
                if (!a || a && h(b.nTable).is(":visible"))return b.nTable
            });
            return b ? new t(c) : c
        };
        m.util = {throttle: ua, escapeRegex: va};
        m.camelToHungarian = I;
        p("$()", function (a, b) {
            var c = this.rows(b).nodes(), c = h(c);
            return h([].concat(c.filter(a).toArray(), c.find(a).toArray()))
        });
        h.each(["on", "one", "off"], function (a, b) {
            p(b + "()", function () {
                var a = Array.prototype.slice.call(arguments);
                a[0].match(/\.dt\b/) || (a[0] += ".dt");
                var d = h(this.tables().nodes());
                d[b].apply(d, a);
                return this
            })
        });
        p("clear()", function () {
            return this.iterator("table", function (a) {
                na(a)
            })
        });
        p("settings()", function () {
            return new t(this.context,
                this.context)
        });
        p("init()", function () {
            var a = this.context;
            return a.length ? a[0].oInit : null
        });
        p("data()", function () {
            return this.iterator("table", function (a) {
                return D(a.aoData, "_aData")
            }).flatten()
        });
        p("destroy()", function (a) {
            a = a || !1;
            return this.iterator("table", function (b) {
                var c = b.nTableWrapper.parentNode, d = b.oClasses, e = b.nTable, f = b.nTBody, g = b.nTHead, i = b.nTFoot, j = h(e), f = h(f), k = h(b.nTableWrapper), l = h.map(b.aoData, function (a) {
                    return a.nTr
                }), p;
                b.bDestroying = !0;
                w(b, "aoDestroyCallback", "destroy", [b]);
                a ||
                (new t(b)).columns().visible(!0);
                k.unbind(".DT").find(":not(tbody *)").unbind(".DT");
                h(Fa).unbind(".DT-" + b.sInstance);
                e != g.parentNode && (j.children("thead").detach(), j.append(g));
                i && e != i.parentNode && (j.children("tfoot").detach(), j.append(i));
                b.aaSorting = [];
                b.aaSortingFixed = [];
                xa(b);
                h(l).removeClass(b.asStripeClasses.join(" "));
                h("th, td", g).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone);
                b.bJUI && (h("th span." + d.sSortIcon + ", td span." + d.sSortIcon, g).detach(), h("th, td",
                    g).each(function () {
                    var a = h("div." + d.sSortJUIWrapper, this);
                    h(this).append(a.contents());
                    a.detach()
                }));
                f.children().detach();
                f.append(l);
                g = a ? "remove" : "detach";
                j[g]();
                k[g]();
                !a && c && (c.insertBefore(e, b.nTableReinsertBefore), j.css("width", b.sDestroyWidth).removeClass(d.sTable), (p = b.asDestroyStripes.length) && f.children().each(function (a) {
                    h(this).addClass(b.asDestroyStripes[a % p])
                }));
                c = h.inArray(b, m.settings);
                -1 !== c && m.settings.splice(c, 1)
            })
        });
        h.each(["column", "row", "cell"], function (a, b) {
            p(b + "s().every()",
                function (a) {
                    return this.iterator(b, function (d, e, f, g, h) {
                        a.call((new t(d))[b](e, "cell" === b ? f : k), e, f, g, h)
                    })
                })
        });
        p("i18n()", function (a, b, c) {
            var d = this.context[0], a = P(a)(d.oLanguage);
            a === k && (a = b);
            c !== k && h.isPlainObject(a) && (a = a[c] !== k ? a[c] : a._);
            return a.replace("%d", c)
        });
        m.version = "1.10.9";
        m.settings = [];
        m.models = {};
        m.models.oSearch = {bCaseInsensitive: !0, sSearch: "", bRegex: !1, bSmart: !0};
        m.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null,
            idx: -1
        };
        m.models.oColumn = {
            idx: null,
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        };
        m.defaults = {
            aaData: null,
            aaSorting: [[0, "asc"]],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10,
                25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bJQueryUI: !1,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function (a) {
                return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function (a) {
                try {
                    return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname))
                } catch (b) {
                }
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function (a, b) {
                try {
                    (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b))
                } catch (c) {
                }
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {sFirst: "First", sLast: "Last", sNext: "Next", sPrevious: "Previous"},
                sEmptyTable: "No data available in table",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sDecimal: "",
                sThousands: ",",
                sLengthMenu: "Show _MENU_ entries",
                sLoadingRecords: "Loading...",
                sProcessing: "Processing...",
                sSearch: "Search:",
                sSearchPlaceholder: "",
                sUrl: "",
                sZeroRecords: "No matching records found"
            },
            oSearch: h.extend({}, m.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            searchDelay: null,
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null,
            rowId: "DT_RowId"
        };
        X(m.defaults);
        m.defaults.column = {
            aDataSort: null,
            iDataSort: -1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        };
        X(m.defaults.column);
        m.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortMulti: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {
                bCollapse: null,
                iBarWidth: 0, sX: null, sXInner: null, sY: null
            },
            oLanguage: {fnInfoCallback: null},
            oBrowser: {bScrollOversize: !1, bScrollbarLeft: !1, bBounding: !1, barWidth: 0},
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aIds: {},
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            searchDelay: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oSavedState: null,
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            bAjaxDataGet: !0,
            jqXHR: null,
            json: k,
            oAjaxData: k,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: -1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            bJUI: null,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function () {
                return "ssp" == y(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
            },
            fnRecordsDisplay: function () {
                return "ssp" == y(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
            },
            fnDisplayEnd: function () {
                var a = this._iDisplayLength, b = this._iDisplayStart, c = b + a, d = this.aiDisplay.length, e =
                    this.oFeatures, f = e.bPaginate;
                return e.bServerSide ? !1 === f || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d || -1 === a ? d : c
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {},
            rowIdFn: null,
            rowId: null
        };
        m.ext = v = {
            buttons: {},
            classes: {},
            errMode: "alert",
            feature: [],
            search: [],
            selector: {cell: [], column: [], row: []},
            internal: {},
            legacy: {ajax: null},
            pager: {},
            renderer: {pageButton: {}, header: {}},
            order: {},
            type: {detect: [], search: {}, order: {}},
            _unique: 0,
            fnVersionCheck: m.fnVersionCheck,
            iApiIndex: 0,
            oJUIClasses: {},
            sVersion: m.version
        };
        h.extend(v, {
            afnFiltering: v.search,
            aTypes: v.type.detect,
            ofnSearch: v.type.search,
            oSort: v.type.order,
            afnSortData: v.order,
            aoFeatures: v.feature,
            oApi: v.internal,
            oStdClasses: v.classes,
            oPagination: v.pager
        });
        h.extend(m.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_asc_disabled",
            sSortableDesc: "sorting_desc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: ""
        });
        var Ea = "", Ea = "", G = Ea + "ui-state-default", ka = Ea + "css_right ui-icon ui-icon-", Xb = Ea + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
        h.extend(m.ext.oJUIClasses, m.ext.classes, {
            sPageButton: "fg-button ui-button " + G,
            sPageButtonActive: "ui-state-disabled",
            sPageButtonDisabled: "ui-state-disabled",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: G + " sorting_asc",
            sSortDesc: G + " sorting_desc",
            sSortable: G + " sorting",
            sSortableAsc: G + " sorting_asc_disabled",
            sSortableDesc: G + " sorting_desc_disabled",
            sSortableNone: G + " sorting_disabled",
            sSortJUIAsc: ka + "triangle-1-n",
            sSortJUIDesc: ka + "triangle-1-s",
            sSortJUI: ka + "carat-2-n-s",
            sSortJUIAscAllowed: ka + "carat-1-n",
            sSortJUIDescAllowed: ka + "carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead " + G,
            sScrollFoot: "dataTables_scrollFoot " + G,
            sHeaderTH: G,
            sFooterTH: G,
            sJUIHeader: Xb + " ui-corner-tl ui-corner-tr",
            sJUIFooter: Xb + " ui-corner-bl ui-corner-br"
        });
        var Mb = m.ext.pager;
        h.extend(Mb, {
            simple: function () {
                return ["previous", "next"]
            }, full: function () {
                return ["first", "previous", "next", "last"]
            }, numbers: function (a, b) {
                return [Aa(a, b)]
            }, simple_numbers: function (a, b) {
                return ["previous", Aa(a, b), "next"]
            }, full_numbers: function (a, b) {
                return ["first",
                    "previous", Aa(a, b), "next", "last"]
            }, _numbers: Aa, numbers_length: 7
        });
        h.extend(!0, m.ext.renderer, {
            pageButton: {
                _: function (a, b, c, d, e, f) {
                    var g = a.oClasses, i = a.oLanguage.oPaginate, j, k, l = 0, m = function (b, d) {
                        var p, q, t, s, u = function (b) {
                            Ta(a, b.data.action, true)
                        };
                        p = 0;
                        for (q = d.length; p < q; p++) {
                            s = d[p];
                            if (h.isArray(s)) {
                                t = h("<" + (s.DT_el || "div") + "/>").appendTo(b);
                                m(t, s)
                            } else {
                                j = null;
                                k = "";
                                switch (s) {
                                    case "ellipsis":
                                        b.append('<span class="ellipsis">&#x2026;</span>');
                                        break;
                                    case "first":
                                        j = i.sFirst;
                                        k = s + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                                        break;
                                    case "previous":
                                        j = i.sPrevious;
                                        k = s + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                                        break;
                                    case "next":
                                        j = i.sNext;
                                        k = s + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                                        break;
                                    case "last":
                                        j = i.sLast;
                                        k = s + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                                        break;
                                    default:
                                        j = s + 1;
                                        k = e === s ? g.sPageButtonActive : ""
                                }
                                if (j !== null) {
                                    t = h("<a>", {
                                        "class": g.sPageButton + " " + k,
                                        "aria-controls": a.sTableId,
                                        "data-dt-idx": l,
                                        tabindex: a.iTabIndex,
                                        id: c === 0 && typeof s === "string" ? a.sTableId + "_" + s : null
                                    }).html(j).appendTo(b);
                                    Va(t, {action: s}, u);
                                    l++
                                }
                            }
                        }
                    }, p;
                    try {
                        p = h(b).find(T.activeElement).data("dt-idx")
                    } catch (t) {
                    }
                    m(h(b).empty(),
                        d);
                    p && h(b).find("[data-dt-idx=" + p + "]").focus()
                }
            }
        });
        h.extend(m.ext.type.detect, [function (a, b) {
            var c = b.oLanguage.sDecimal;
            return Ya(a, c) ? "num" + c : null
        }, function (a) {
            if (a && !(a instanceof Date) && (!ac.test(a) || !bc.test(a)))return null;
            var b = Date.parse(a);
            return null !== b && !isNaN(b) || K(a) ? "date" : null
        }, function (a, b) {
            var c = b.oLanguage.sDecimal;
            return Ya(a, c, !0) ? "num-fmt" + c : null
        }, function (a, b) {
            var c = b.oLanguage.sDecimal;
            return Rb(a, c) ? "html-num" + c : null
        }, function (a, b) {
            var c = b.oLanguage.sDecimal;
            return Rb(a, c,
                !0) ? "html-num-fmt" + c : null
        }, function (a) {
            return K(a) || "string" === typeof a && -1 !== a.indexOf("<") ? "html" : null
        }]);
        h.extend(m.ext.type.search, {
            html: function (a) {
                return K(a) ? a : "string" === typeof a ? a.replace(Ob, " ").replace(Ca, "") : ""
            }, string: function (a) {
                return K(a) ? a : "string" === typeof a ? a.replace(Ob, " ") : a
            }
        });
        var Ba = function (a, b, c, d) {
            if (0 !== a && (!a || "-" === a))return -Infinity;
            b && (a = Qb(a, b));
            a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, "")));
            return 1 * a
        };
        h.extend(v.type.order, {
            "date-pre": function (a) {
                return Date.parse(a) ||
                    0
            }, "html-pre": function (a) {
                return K(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + ""
            }, "string-pre": function (a) {
                return K(a) ? "" : "string" === typeof a ? a.toLowerCase() : !a.toString ? "" : a.toString()
            }, "string-asc": function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0
            }, "string-desc": function (a, b) {
                return a < b ? 1 : a > b ? -1 : 0
            }
        });
        cb("");
        h.extend(!0, m.ext.renderer, {
            header: {
                _: function (a, b, c, d) {
                    h(a.nTable).on("order.dt.DT", function (e, f, g, h) {
                        if (a === f) {
                            e = c.idx;
                            b.removeClass(c.sSortingClass + " " + d.sSortAsc + " " + d.sSortDesc).addClass(h[e] ==
                            "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass)
                        }
                    })
                }, jqueryui: function (a, b, c, d) {
                    h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b);
                    h(a.nTable).on("order.dt.DT", function (e, f, g, h) {
                        if (a === f) {
                            e = c.idx;
                            b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass);
                            b.find("span." + d.sSortIcon).removeClass(d.sSortJUIAsc + " " + d.sSortJUIDesc + " " + d.sSortJUI + " " +
                                d.sSortJUIAscAllowed + " " + d.sSortJUIDescAllowed).addClass(h[e] == "asc" ? d.sSortJUIAsc : h[e] == "desc" ? d.sSortJUIDesc : c.sSortingClassJUI)
                        }
                    })
                }
            }
        });
        m.render = {
            number: function (a, b, c, d, e) {
                return {
                    display: function (f) {
                        if ("number" !== typeof f && "string" !== typeof f)return f;
                        var g = 0 > f ? "-" : "", f = Math.abs(parseFloat(f)), h = parseInt(f, 10), f = c ? b + (f - h).toFixed(c).substring(2) : "";
                        return g + (d || "") + h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + f + (e || "")
                    }
                }
            }
        };
        h.extend(m.ext.internal, {
            _fnExternApiFunc: Nb,
            _fnBuildAjax: ra,
            _fnAjaxUpdate: lb,
            _fnAjaxParameters: ub,
            _fnAjaxUpdateDraw: vb,
            _fnAjaxDataSrc: sa,
            _fnAddColumn: Ga,
            _fnColumnOptions: la,
            _fnAdjustColumnSizing: Y,
            _fnVisibleToColumnIndex: $,
            _fnColumnIndexToVisible: ba,
            _fnVisbleColumns: ca,
            _fnGetColumns: aa,
            _fnColumnTypes: Ia,
            _fnApplyColumnDefs: hb,
            _fnHungarianMap: X,
            _fnCamelToHungarian: I,
            _fnLanguageCompat: S,
            _fnBrowserDetect: fb,
            _fnAddData: L,
            _fnAddTr: ma,
            _fnNodeToDataIndex: function (a, b) {
                return b._DT_RowIndex !== k ? b._DT_RowIndex : null
            },
            _fnNodeToColumnIndex: function (a, b, c) {
                return h.inArray(c, a.aoData[b].anCells)
            },
            _fnGetCellData: B,
            _fnSetCellData: ib,
            _fnSplitObjNotation: La,
            _fnGetObjectDataFn: P,
            _fnSetObjectDataFn: Q,
            _fnGetDataMaster: Ma,
            _fnClearTable: na,
            _fnDeleteIndex: oa,
            _fnInvalidate: ea,
            _fnGetRowElements: Ka,
            _fnCreateTr: Ja,
            _fnBuildHead: kb,
            _fnDrawHead: ga,
            _fnDraw: M,
            _fnReDraw: R,
            _fnAddOptionsHtml: nb,
            _fnDetectHeader: fa,
            _fnGetUniqueThs: qa,
            _fnFeatureHtmlFilter: pb,
            _fnFilterComplete: ha,
            _fnFilterCustom: yb,
            _fnFilterColumn: xb,
            _fnFilter: wb,
            _fnFilterCreateSearch: Qa,
            _fnEscapeRegex: va,
            _fnFilterData: zb,
            _fnFeatureHtmlInfo: sb,
            _fnUpdateInfo: Cb,
            _fnInfoMacros: Db,
            _fnInitialise: ia,
            _fnInitComplete: ta,
            _fnLengthChange: Ra,
            _fnFeatureHtmlLength: ob,
            _fnFeatureHtmlPaginate: tb,
            _fnPageChange: Ta,
            _fnFeatureHtmlProcessing: qb,
            _fnProcessingDisplay: C,
            _fnFeatureHtmlTable: rb,
            _fnScrollDraw: Z,
            _fnApplyToChildren: H,
            _fnCalculateColumnWidths: Ha,
            _fnThrottle: ua,
            _fnConvertToWidth: Fb,
            _fnGetWidestNode: Gb,
            _fnGetMaxLenString: Hb,
            _fnStringToCss: u,
            _fnSortFlatten: V,
            _fnSort: mb,
            _fnSortAria: Jb,
            _fnSortListener: Ua,
            _fnSortAttachListener: Oa,
            _fnSortingClasses: xa,
            _fnSortData: Ib,
            _fnSaveState: ya,
            _fnLoadState: Kb,
            _fnSettingsFromNode: za,
            _fnLog: J,
            _fnMap: F,
            _fnBindAction: Va,
            _fnCallbackReg: z,
            _fnCallbackFire: w,
            _fnLengthOverflow: Sa,
            _fnRenderer: Pa,
            _fnDataSource: y,
            _fnRowAttributes: Na,
            _fnCalculateEnd: function () {
            }
        });
        h.fn.dataTable = m;
        h.fn.dataTableSettings = m.settings;
        h.fn.dataTableExt = m.ext;
        h.fn.DataTable = function (a) {
            return h(this).dataTable(a).api()
        };
        h.each(m, function (a, b) {
            h.fn.DataTable[a] = b
        });
        return h.fn.dataTable
    };
    "function" === typeof define && define.amd ? define("datatables", ["jquery"], S) : "object" === typeof exports ? module.exports = S(require("jquery")) : jQuery && !jQuery.fn.dataTable && S(jQuery)
})(window, document);

/*!
 * Datepicker for Bootstrap v1.6.0 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a,b){function c(){return new Date(Date.UTC.apply(Date,arguments))}function d(){var a=new Date;return c(a.getFullYear(),a.getMonth(),a.getDate())}function e(a,b){return a.getUTCFullYear()===b.getUTCFullYear()&&a.getUTCMonth()===b.getUTCMonth()&&a.getUTCDate()===b.getUTCDate()}function f(a){return function(){return this[a].apply(this,arguments)}}function g(a){return a&&!isNaN(a.getTime())}function h(b,c){function d(a,b){return b.toLowerCase()}var e,f=a(b).data(),g={},h=new RegExp("^"+c.toLowerCase()+"([A-Z])");c=new RegExp("^"+c.toLowerCase());for(var i in f)c.test(i)&&(e=i.replace(h,d),g[e]=f[i]);return g}function i(b){var c={};if(q[b]||(b=b.split("-")[0],q[b])){var d=q[b];return a.each(p,function(a,b){b in d&&(c[b]=d[b])}),c}}var j=function(){var b={get:function(a){return this.slice(a)[0]},contains:function(a){for(var b=a&&a.valueOf(),c=0,d=this.length;d>c;c++)if(this[c].valueOf()===b)return c;return-1},remove:function(a){this.splice(a,1)},replace:function(b){b&&(a.isArray(b)||(b=[b]),this.clear(),this.push.apply(this,b))},clear:function(){this.length=0},copy:function(){var a=new j;return a.replace(this),a}};return function(){var c=[];return c.push.apply(c,arguments),a.extend(c,b),c}}(),k=function(b,c){a(b).data("datepicker",this),this._process_options(c),this.dates=new j,this.viewDate=this.o.defaultViewDate,this.focusDate=null,this.element=a(b),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.hasClass("date")?this.element.find(".add-on, .input-group-addon, .btn"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&0===this.component.length&&(this.component=!1),this.picker=a(r.template),this._check_template(this.o.templates.leftArrow)&&this.picker.find(".prev").html(this.o.templates.leftArrow),this._check_template(this.o.templates.rightArrow)&&this.picker.find(".next").html(this.o.templates.rightArrow),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan",function(a,b){return parseInt(b)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted),this.setDatesDisabled(this.o.datesDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};k.prototype={constructor:k,_resolveViewName:function(a,c){return 0===a||"days"===a||"month"===a?0:1===a||"months"===a||"year"===a?1:2===a||"years"===a||"decade"===a?2:3===a||"decades"===a||"century"===a?3:4===a||"centuries"===a||"millennium"===a?4:c===b?!1:c},_check_template:function(c){try{if(c===b||""===c)return!1;if((c.match(/[<>]/g)||[]).length<=0)return!0;var d=a(c);return d.length>0}catch(e){return!1}},_process_options:function(b){this._o=a.extend({},this._o,b);var e=this.o=a.extend({},this._o),f=e.language;q[f]||(f=f.split("-")[0],q[f]||(f=o.language)),e.language=f,e.startView=this._resolveViewName(e.startView,0),e.minViewMode=this._resolveViewName(e.minViewMode,0),e.maxViewMode=this._resolveViewName(e.maxViewMode,4),e.startView=Math.min(e.startView,e.maxViewMode),e.startView=Math.max(e.startView,e.minViewMode),e.multidate!==!0&&(e.multidate=Number(e.multidate)||!1,e.multidate!==!1&&(e.multidate=Math.max(0,e.multidate))),e.multidateSeparator=String(e.multidateSeparator),e.weekStart%=7,e.weekEnd=(e.weekStart+6)%7;var g=r.parseFormat(e.format);if(e.startDate!==-(1/0)&&(e.startDate?e.startDate instanceof Date?e.startDate=this._local_to_utc(this._zero_time(e.startDate)):e.startDate=r.parseDate(e.startDate,g,e.language,e.assumeNearbyYear):e.startDate=-(1/0)),e.endDate!==1/0&&(e.endDate?e.endDate instanceof Date?e.endDate=this._local_to_utc(this._zero_time(e.endDate)):e.endDate=r.parseDate(e.endDate,g,e.language,e.assumeNearbyYear):e.endDate=1/0),e.daysOfWeekDisabled=e.daysOfWeekDisabled||[],a.isArray(e.daysOfWeekDisabled)||(e.daysOfWeekDisabled=e.daysOfWeekDisabled.split(/[,\s]*/)),e.daysOfWeekDisabled=a.map(e.daysOfWeekDisabled,function(a){return parseInt(a,10)}),e.daysOfWeekHighlighted=e.daysOfWeekHighlighted||[],a.isArray(e.daysOfWeekHighlighted)||(e.daysOfWeekHighlighted=e.daysOfWeekHighlighted.split(/[,\s]*/)),e.daysOfWeekHighlighted=a.map(e.daysOfWeekHighlighted,function(a){return parseInt(a,10)}),e.datesDisabled=e.datesDisabled||[],!a.isArray(e.datesDisabled)){var h=[];h.push(r.parseDate(e.datesDisabled,g,e.language,e.assumeNearbyYear)),e.datesDisabled=h}e.datesDisabled=a.map(e.datesDisabled,function(a){return r.parseDate(a,g,e.language,e.assumeNearbyYear)});var i=String(e.orientation).toLowerCase().split(/\s+/g),j=e.orientation.toLowerCase();if(i=a.grep(i,function(a){return/^auto|left|right|top|bottom$/.test(a)}),e.orientation={x:"auto",y:"auto"},j&&"auto"!==j)if(1===i.length)switch(i[0]){case"top":case"bottom":e.orientation.y=i[0];break;case"left":case"right":e.orientation.x=i[0]}else j=a.grep(i,function(a){return/^left|right$/.test(a)}),e.orientation.x=j[0]||"auto",j=a.grep(i,function(a){return/^top|bottom$/.test(a)}),e.orientation.y=j[0]||"auto";else;if(e.defaultViewDate){var k=e.defaultViewDate.year||(new Date).getFullYear(),l=e.defaultViewDate.month||0,m=e.defaultViewDate.day||1;e.defaultViewDate=c(k,l,m)}else e.defaultViewDate=d()},_events:[],_secondaryEvents:[],_applyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(d=b,e=a[f][1]):3===a[f].length&&(d=a[f][1],e=a[f][2]),c.on(e,d)},_unapplyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(e=b,d=a[f][1]):3===a[f].length&&(e=a[f][1],d=a[f][2]),c.off(d,e)},_buildEvents:function(){var b={keyup:a.proxy(function(b){-1===a.inArray(b.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:a.proxy(this.keydown,this),paste:a.proxy(this.paste,this)};this.o.showOnFocus===!0&&(b.focus=a.proxy(this.show,this)),this.isInput?this._events=[[this.element,b]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),b],[this.component,{click:a.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:a.proxy(this.show,this)}]],this._events.push([this.element,"*",{blur:a.proxy(function(a){this._focused_from=a.target},this)}],[this.element,{blur:a.proxy(function(a){this._focused_from=a.target},this)}]),this.o.immediateUpdates&&this._events.push([this.element,{"changeYear changeMonth":a.proxy(function(a){this.update(a.date)},this)}]),this._secondaryEvents=[[this.picker,{click:a.proxy(this.click,this)}],[a(window),{resize:a.proxy(this.place,this)}],[a(document),{mousedown:a.proxy(function(a){this.element.is(a.target)||this.element.find(a.target).length||this.picker.is(a.target)||this.picker.find(a.target).length||this.picker.hasClass("datepicker-inline")||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(b,c){var d=c||this.dates.get(-1),e=this._utc_to_local(d);this.element.trigger({type:b,date:e,dates:a.map(this.dates,this._utc_to_local),format:a.proxy(function(a,b){0===arguments.length?(a=this.dates.length-1,b=this.o.format):"string"==typeof a&&(b=a,a=this.dates.length-1),b=b||this.o.format;var c=this.dates.get(a);return r.formatDate(c,b,this.o.language)},this)})},show:function(){var b=this.component?this.element.find("input"):this.element;if(!b.attr("readonly")||this.o.enableOnReadonly!==!1)return this.isInline||this.picker.appendTo(this.o.container),this.place(),this.picker.show(),this._attachSecondaryEvents(),this._trigger("show"),(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.o.disableTouchKeyboard&&a(this.element).blur(),this},hide:function(){return this.isInline?this:this.picker.is(":visible")?(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this._trigger("hide"),this):this},destroy:function(){return this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date,this},paste:function(b){var c;if(b.originalEvent.clipboardData&&b.originalEvent.clipboardData.types&&-1!==a.inArray("text/plain",b.originalEvent.clipboardData.types))c=b.originalEvent.clipboardData.getData("text/plain");else{if(!window.clipboardData)return;c=window.clipboardData.getData("Text")}this.setDate(c),this.update(),b.preventDefault()},_utc_to_local:function(a){return a&&new Date(a.getTime()+6e4*a.getTimezoneOffset())},_local_to_utc:function(a){return a&&new Date(a.getTime()-6e4*a.getTimezoneOffset())},_zero_time:function(a){return a&&new Date(a.getFullYear(),a.getMonth(),a.getDate())},_zero_utc_time:function(a){return a&&new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate()))},getDates:function(){return a.map(this.dates,this._utc_to_local)},getUTCDates:function(){return a.map(this.dates,function(a){return new Date(a)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){var a=this.dates.get(-1);return"undefined"!=typeof a?new Date(a):null},clearDates:function(){var a;this.isInput?a=this.element:this.component&&(a=this.element.find("input")),a&&a.val(""),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()},setDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,b),this._trigger("changeDate"),this.setValue(),this},setUTCDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,a.map(b,this._utc_to_local)),this._trigger("changeDate"),this.setValue(),this},setDate:f("setDates"),setUTCDate:f("setUTCDates"),remove:f("destroy"),setValue:function(){var a=this.getFormattedDate();return this.isInput?this.element.val(a):this.component&&this.element.find("input").val(a),this},getFormattedDate:function(c){c===b&&(c=this.o.format);var d=this.o.language;return a.map(this.dates,function(a){return r.formatDate(a,c,d)}).join(this.o.multidateSeparator)},getStartDate:function(){return this.o.startDate},setStartDate:function(a){return this._process_options({startDate:a}),this.update(),this.updateNavArrows(),this},getEndDate:function(){return this.o.endDate},setEndDate:function(a){return this._process_options({endDate:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekDisabled:function(a){return this._process_options({daysOfWeekDisabled:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekHighlighted:function(a){return this._process_options({daysOfWeekHighlighted:a}),this.update(),this},setDatesDisabled:function(a){this._process_options({datesDisabled:a}),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return this;var b=this.picker.outerWidth(),c=this.picker.outerHeight(),d=10,e=a(this.o.container),f=e.width(),g="body"===this.o.container?a(document).scrollTop():e.scrollTop(),h=e.offset(),i=[];this.element.parents().each(function(){var b=a(this).css("z-index");"auto"!==b&&0!==b&&i.push(parseInt(b))});var j=Math.max.apply(Math,i)+this.o.zIndexOffset,k=this.component?this.component.parent().offset():this.element.offset(),l=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),m=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),n=k.left-h.left,o=k.top-h.top;"body"!==this.o.container&&(o+=g),this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(n-=b-m)):k.left<0?(this.picker.addClass("datepicker-orient-left"),n-=k.left-d):n+b>f?(this.picker.addClass("datepicker-orient-right"),n+=m-b):this.picker.addClass("datepicker-orient-left");var p,q=this.o.orientation.y;if("auto"===q&&(p=-g+o-c,q=0>p?"bottom":"top"),this.picker.addClass("datepicker-orient-"+q),"top"===q?o-=c+parseInt(this.picker.css("padding-top")):o+=l,this.o.rtl){var r=f-(n+m);this.picker.css({top:o,right:r,zIndex:j})}else this.picker.css({top:o,left:n,zIndex:j});return this},_allow_update:!0,update:function(){if(!this._allow_update)return this;var b=this.dates.copy(),c=[],d=!1;return arguments.length?(a.each(arguments,a.proxy(function(a,b){b instanceof Date&&(b=this._local_to_utc(b)),c.push(b)},this)),d=!0):(c=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val(),c=c&&this.o.multidate?c.split(this.o.multidateSeparator):[c],delete this.element.data().date),c=a.map(c,a.proxy(function(a){return r.parseDate(a,this.o.format,this.o.language,this.o.assumeNearbyYear)},this)),c=a.grep(c,a.proxy(function(a){return!this.dateWithinRange(a)||!a},this),!0),this.dates.replace(c),this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate?this.viewDate=new Date(this.o.endDate):this.viewDate=this.o.defaultViewDate,d?this.setValue():c.length&&String(b)!==String(this.dates)&&this._trigger("changeDate"),!this.dates.length&&b.length&&this._trigger("clearDate"),this.fill(),this.element.change(),this},fillDow:function(){var b=this.o.weekStart,c="<tr>";for(this.o.calendarWeeks&&(this.picker.find(".datepicker-days .datepicker-switch").attr("colspan",function(a,b){return parseInt(b)+1}),c+='<th class="cw">&#160;</th>');b<this.o.weekStart+7;)c+='<th class="dow',a.inArray(b,this.o.daysOfWeekDisabled)>-1&&(c+=" disabled"),c+='">'+q[this.o.language].daysMin[b++%7]+"</th>";c+="</tr>",this.picker.find(".datepicker-days thead").append(c)},fillMonths:function(){for(var a=this._utc_to_local(this.viewDate),b="",c=0;12>c;){var d=a&&a.getMonth()===c?" focused":"";b+='<span class="month'+d+'">'+q[this.o.language].monthsShort[c++]+"</span>"}this.picker.find(".datepicker-months td").html(b)},setRange:function(b){b&&b.length?this.range=a.map(b,function(a){return a.valueOf()}):delete this.range,this.fill()},getClassNames:function(b){var c=[],d=this.viewDate.getUTCFullYear(),e=this.viewDate.getUTCMonth(),f=new Date;return b.getUTCFullYear()<d||b.getUTCFullYear()===d&&b.getUTCMonth()<e?c.push("old"):(b.getUTCFullYear()>d||b.getUTCFullYear()===d&&b.getUTCMonth()>e)&&c.push("new"),this.focusDate&&b.valueOf()===this.focusDate.valueOf()&&c.push("focused"),this.o.todayHighlight&&b.getUTCFullYear()===f.getFullYear()&&b.getUTCMonth()===f.getMonth()&&b.getUTCDate()===f.getDate()&&c.push("today"),-1!==this.dates.contains(b)&&c.push("active"),(!this.dateWithinRange(b)||this.dateIsDisabled(b))&&c.push("disabled"),-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekHighlighted)&&c.push("highlighted"),this.range&&(b>this.range[0]&&b<this.range[this.range.length-1]&&c.push("range"),-1!==a.inArray(b.valueOf(),this.range)&&c.push("selected"),b.valueOf()===this.range[0]&&c.push("range-start"),b.valueOf()===this.range[this.range.length-1]&&c.push("range-end")),c},_fill_yearsView:function(c,d,e,f,g,h,i,j){var k,l,m,n,o,p,q,r,s,t,u;for(k="",l=this.picker.find(c),m=parseInt(g/e,10)*e,o=parseInt(h/f,10)*f,p=parseInt(i/f,10)*f,n=a.map(this.dates,function(a){return parseInt(a.getUTCFullYear()/f,10)*f}),l.find(".datepicker-switch").text(m+"-"+(m+9*f)),q=m-f,r=-1;11>r;r+=1)s=[d],t=null,-1===r?s.push("old"):10===r&&s.push("new"),-1!==a.inArray(q,n)&&s.push("active"),(o>q||q>p)&&s.push("disabled"),q===this.viewDate.getFullYear()&&s.push("focused"),j!==a.noop&&(u=j(new Date(q,0,1)),u===b?u={}:"boolean"==typeof u?u={enabled:u}:"string"==typeof u&&(u={classes:u}),u.enabled===!1&&s.push("disabled"),u.classes&&(s=s.concat(u.classes.split(/\s+/))),u.tooltip&&(t=u.tooltip)),k+='<span class="'+s.join(" ")+'"'+(t?' title="'+t+'"':"")+">"+q+"</span>",q+=f;l.find("td").html(k)},fill:function(){var d,e,f=new Date(this.viewDate),g=f.getUTCFullYear(),h=f.getUTCMonth(),i=this.o.startDate!==-(1/0)?this.o.startDate.getUTCFullYear():-(1/0),j=this.o.startDate!==-(1/0)?this.o.startDate.getUTCMonth():-(1/0),k=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,l=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,m=q[this.o.language].today||q.en.today||"",n=q[this.o.language].clear||q.en.clear||"",o=q[this.o.language].titleFormat||q.en.titleFormat;if(!isNaN(g)&&!isNaN(h)){this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(f,o,this.o.language)),this.picker.find("tfoot .today").text(m).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot .clear").text(n).toggle(this.o.clearBtn!==!1),this.picker.find("thead .datepicker-title").text(this.o.title).toggle(""!==this.o.title),this.updateNavArrows(),this.fillMonths();var p=c(g,h-1,28),s=r.getDaysInMonth(p.getUTCFullYear(),p.getUTCMonth());p.setUTCDate(s),p.setUTCDate(s-(p.getUTCDay()-this.o.weekStart+7)%7);var t=new Date(p);p.getUTCFullYear()<100&&t.setUTCFullYear(p.getUTCFullYear()),t.setUTCDate(t.getUTCDate()+42),t=t.valueOf();for(var u,v=[];p.valueOf()<t;){if(p.getUTCDay()===this.o.weekStart&&(v.push("<tr>"),this.o.calendarWeeks)){var w=new Date(+p+(this.o.weekStart-p.getUTCDay()-7)%7*864e5),x=new Date(Number(w)+(11-w.getUTCDay())%7*864e5),y=new Date(Number(y=c(x.getUTCFullYear(),0,1))+(11-y.getUTCDay())%7*864e5),z=(x-y)/864e5/7+1;v.push('<td class="cw">'+z+"</td>")}u=this.getClassNames(p),u.push("day"),this.o.beforeShowDay!==a.noop&&(e=this.o.beforeShowDay(this._utc_to_local(p)),e===b?e={}:"boolean"==typeof e?e={enabled:e}:"string"==typeof e&&(e={classes:e}),e.enabled===!1&&u.push("disabled"),e.classes&&(u=u.concat(e.classes.split(/\s+/))),e.tooltip&&(d=e.tooltip)),u=a.unique(u),v.push('<td class="'+u.join(" ")+'"'+(d?' title="'+d+'"':"")+">"+p.getUTCDate()+"</td>"),d=null,p.getUTCDay()===this.o.weekEnd&&v.push("</tr>"),p.setUTCDate(p.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(v.join(""));var A=q[this.o.language].monthsTitle||q.en.monthsTitle||"Months",B=this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode<2?A:g).end().find("span").removeClass("active");if(a.each(this.dates,function(a,b){b.getUTCFullYear()===g&&B.eq(b.getUTCMonth()).addClass("active")}),(i>g||g>k)&&B.addClass("disabled"),g===i&&B.slice(0,j).addClass("disabled"),g===k&&B.slice(l+1).addClass("disabled"),this.o.beforeShowMonth!==a.noop){var C=this;a.each(B,function(c,d){var e=new Date(g,c,1),f=C.o.beforeShowMonth(e);f===b?f={}:"boolean"==typeof f?f={enabled:f}:"string"==typeof f&&(f={classes:f}),f.enabled!==!1||a(d).hasClass("disabled")||a(d).addClass("disabled"),f.classes&&a(d).addClass(f.classes),f.tooltip&&a(d).prop("title",f.tooltip)})}this._fill_yearsView(".datepicker-years","year",10,1,g,i,k,this.o.beforeShowYear),this._fill_yearsView(".datepicker-decades","decade",100,10,g,i,k,this.o.beforeShowDecade),this._fill_yearsView(".datepicker-centuries","century",1e3,100,g,i,k,this.o.beforeShowCentury)}},updateNavArrows:function(){if(this._allow_update){var a=new Date(this.viewDate),b=a.getUTCFullYear(),c=a.getUTCMonth();switch(this.viewMode){case 0:this.o.startDate!==-(1/0)&&b<=this.o.startDate.getUTCFullYear()&&c<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&b>=this.o.endDate.getUTCFullYear()&&c>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:case 3:case 4:this.o.startDate!==-(1/0)&&b<=this.o.startDate.getUTCFullYear()||this.o.maxViewMode<2?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&b>=this.o.endDate.getUTCFullYear()||this.o.maxViewMode<2?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}}},click:function(b){b.preventDefault(),b.stopPropagation();var e,f,g,h,i,j,k;e=a(b.target),e.hasClass("datepicker-switch")&&this.showMode(1);var l=e.closest(".prev, .next");l.length>0&&(f=r.modes[this.viewMode].navStep*(l.hasClass("prev")?-1:1),0===this.viewMode?(this.viewDate=this.moveMonth(this.viewDate,f),this._trigger("changeMonth",this.viewDate)):(this.viewDate=this.moveYear(this.viewDate,f),1===this.viewMode&&this._trigger("changeYear",this.viewDate)),this.fill()),e.hasClass("today")&&(this.showMode(-2),this._setDate(d(),"linked"===this.o.todayBtn?null:"view")),e.hasClass("clear")&&this.clearDates(),e.hasClass("disabled")||(e.hasClass("day")&&(g=parseInt(e.text(),10)||1,h=this.viewDate.getUTCFullYear(),i=this.viewDate.getUTCMonth(),e.hasClass("old")&&(0===i?(i=11,h-=1,j=!0,k=!0):(i-=1,j=!0)),e.hasClass("new")&&(11===i?(i=0,h+=1,j=!0,k=!0):(i+=1,j=!0)),this._setDate(c(h,i,g)),k&&this._trigger("changeYear",this.viewDate),j&&this._trigger("changeMonth",this.viewDate)),e.hasClass("month")&&(this.viewDate.setUTCDate(1),g=1,i=e.parent().find("span").index(e),h=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(i),this._trigger("changeMonth",this.viewDate),1===this.o.minViewMode?(this._setDate(c(h,i,g)),this.showMode()):this.showMode(-1),this.fill()),(e.hasClass("year")||e.hasClass("decade")||e.hasClass("century"))&&(this.viewDate.setUTCDate(1),g=1,i=0,h=parseInt(e.text(),10)||0,this.viewDate.setUTCFullYear(h),e.hasClass("year")&&(this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(c(h,i,g))),e.hasClass("decade")&&(this._trigger("changeDecade",this.viewDate),3===this.o.minViewMode&&this._setDate(c(h,i,g))),e.hasClass("century")&&(this._trigger("changeCentury",this.viewDate),4===this.o.minViewMode&&this._setDate(c(h,i,g))),this.showMode(-1),this.fill())),this.picker.is(":visible")&&this._focused_from&&a(this._focused_from).focus(),delete this._focused_from},_toggle_multidate:function(a){var b=this.dates.contains(a);if(a||this.dates.clear(),-1!==b?(this.o.multidate===!0||this.o.multidate>1||this.o.toggleActive)&&this.dates.remove(b):this.o.multidate===!1?(this.dates.clear(),this.dates.push(a)):this.dates.push(a),"number"==typeof this.o.multidate)for(;this.dates.length>this.o.multidate;)this.dates.remove(0)},_setDate:function(a,b){b&&"date"!==b||this._toggle_multidate(a&&new Date(a)),b&&"view"!==b||(this.viewDate=a&&new Date(a)),this.fill(),this.setValue(),b&&"view"===b||this._trigger("changeDate");var c;this.isInput?c=this.element:this.component&&(c=this.element.find("input")),c&&c.change(),!this.o.autoclose||b&&"date"!==b||this.hide()},moveDay:function(a,b){var c=new Date(a);return c.setUTCDate(a.getUTCDate()+b),c},moveWeek:function(a,b){return this.moveDay(a,7*b)},moveMonth:function(a,b){if(!g(a))return this.o.defaultViewDate;if(!b)return a;var c,d,e=new Date(a.valueOf()),f=e.getUTCDate(),h=e.getUTCMonth(),i=Math.abs(b);if(b=b>0?1:-1,1===i)d=-1===b?function(){return e.getUTCMonth()===h}:function(){return e.getUTCMonth()!==c},c=h+b,e.setUTCMonth(c),(0>c||c>11)&&(c=(c+12)%12);else{for(var j=0;i>j;j++)e=this.moveMonth(e,b);c=e.getUTCMonth(),e.setUTCDate(f),d=function(){return c!==e.getUTCMonth()}}for(;d();)e.setUTCDate(--f),e.setUTCMonth(c);return e},moveYear:function(a,b){return this.moveMonth(a,12*b)},moveAvailableDate:function(a,b,c){do{if(a=this[c](a,b),!this.dateWithinRange(a))return!1;c="moveDay"}while(this.dateIsDisabled(a));return a},weekOfDateIsDisabled:function(b){return-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekDisabled)},dateIsDisabled:function(b){return this.weekOfDateIsDisabled(b)||a.grep(this.o.datesDisabled,function(a){return e(b,a)}).length>0},dateWithinRange:function(a){return a>=this.o.startDate&&a<=this.o.endDate},keydown:function(a){if(!this.picker.is(":visible"))return void((40===a.keyCode||27===a.keyCode)&&(this.show(),a.stopPropagation()));var b,c,d=!1,e=this.focusDate||this.viewDate;switch(a.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),a.preventDefault(),a.stopPropagation();break;case 37:case 38:case 39:case 40:if(!this.o.keyboardNavigation||7===this.o.daysOfWeekDisabled.length)break;b=37===a.keyCode||38===a.keyCode?-1:1,0===this.viewMode?a.ctrlKey?(c=this.moveAvailableDate(e,b,"moveYear"),c&&this._trigger("changeYear",this.viewDate)):a.shiftKey?(c=this.moveAvailableDate(e,b,"moveMonth"),c&&this._trigger("changeMonth",this.viewDate)):37===a.keyCode||39===a.keyCode?c=this.moveAvailableDate(e,b,"moveDay"):this.weekOfDateIsDisabled(e)||(c=this.moveAvailableDate(e,b,"moveWeek")):1===this.viewMode?((38===a.keyCode||40===a.keyCode)&&(b=4*b),c=this.moveAvailableDate(e,b,"moveMonth")):2===this.viewMode&&((38===a.keyCode||40===a.keyCode)&&(b=4*b),c=this.moveAvailableDate(e,b,"moveYear")),c&&(this.focusDate=this.viewDate=c,this.setValue(),this.fill(),a.preventDefault());break;case 13:if(!this.o.forceParse)break;e=this.focusDate||this.dates.get(-1)||this.viewDate,this.o.keyboardNavigation&&(this._toggle_multidate(e),d=!0),this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(a.preventDefault(),a.stopPropagation(),this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}if(d){this.dates.length?this._trigger("changeDate"):this._trigger("clearDate");var f;this.isInput?f=this.element:this.component&&(f=this.element.find("input")),f&&f.change()}},showMode:function(a){a&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(this.o.maxViewMode,this.viewMode+a))),this.picker.children("div").hide().filter(".datepicker-"+r.modes[this.viewMode].clsName).show(),this.updateNavArrows()}};var l=function(b,c){a(b).data("datepicker",this),this.element=a(b),this.inputs=a.map(c.inputs,function(a){return a.jquery?a[0]:a}),delete c.inputs,n.call(a(this.inputs),c).on("changeDate",a.proxy(this.dateUpdated,this)),this.pickers=a.map(this.inputs,function(b){return a(b).data("datepicker")}),this.updateDates()};l.prototype={updateDates:function(){this.dates=a.map(this.pickers,function(a){return a.getUTCDate()}),this.updateRanges()},updateRanges:function(){var b=a.map(this.dates,function(a){return a.valueOf()});a.each(this.pickers,function(a,c){c.setRange(b)})},dateUpdated:function(b){if(!this.updating){this.updating=!0;var c=a(b.target).data("datepicker");if("undefined"!=typeof c){var d=c.getUTCDate(),e=a.inArray(b.target,this.inputs),f=e-1,g=e+1,h=this.inputs.length;if(-1!==e){if(a.each(this.pickers,function(a,b){b.getUTCDate()||b.setUTCDate(d)}),d<this.dates[f])for(;f>=0&&d<this.dates[f];)this.pickers[f--].setUTCDate(d);else if(d>this.dates[g])for(;h>g&&d>this.dates[g];)this.pickers[g++].setUTCDate(d);this.updateDates(),delete this.updating}}}},remove:function(){a.map(this.pickers,function(a){a.remove()}),delete this.element.data().datepicker}};var m=a.fn.datepicker,n=function(c){var d=Array.apply(null,arguments);d.shift();var e;if(this.each(function(){var b=a(this),f=b.data("datepicker"),g="object"==typeof c&&c;if(!f){var j=h(this,"date"),m=a.extend({},o,j,g),n=i(m.language),p=a.extend({},o,n,j,g);b.hasClass("input-daterange")||p.inputs?(a.extend(p,{inputs:p.inputs||b.find("input").toArray()}),f=new l(this,p)):f=new k(this,p),b.data("datepicker",f)}"string"==typeof c&&"function"==typeof f[c]&&(e=f[c].apply(f,d))}),e===b||e instanceof k||e instanceof l)return this;if(this.length>1)throw new Error("Using only allowed for the collection of a single element ("+c+" function)");return e};a.fn.datepicker=n;var o=a.fn.datepicker.defaults={assumeNearbyYear:!1,autoclose:!1,beforeShowDay:a.noop,beforeShowMonth:a.noop,beforeShowYear:a.noop,beforeShowDecade:a.noop,beforeShowCentury:a.noop,calendarWeeks:!1,clearBtn:!1,toggleActive:!1,daysOfWeekDisabled:[],daysOfWeekHighlighted:[],datesDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,maxViewMode:4,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-(1/0),startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0,disableTouchKeyboard:!1,enableOnReadonly:!0,showOnFocus:!0,zIndexOffset:10,container:"body",immediateUpdates:!1,title:"",templates:{leftArrow:"&laquo;",rightArrow:"&raquo;"}},p=a.fn.datepicker.locale_opts=["format","rtl","weekStart"];a.fn.datepicker.Constructor=k;var q=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM yyyy"}},r={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10},{clsName:"decades",navFnc:"FullDecade",navStep:100},{clsName:"centuries",navFnc:"FullCentury",navStep:1e3}],isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,r.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,parseFormat:function(a){if("function"==typeof a.toValue&&"function"==typeof a.toDisplay)return a;var b=a.replace(this.validParts,"\x00").split("\x00"),c=a.match(this.validParts);if(!b||!b.length||!c||0===c.length)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(e,f,g,h){function i(a,b){return b===!0&&(b=10),100>a&&(a+=2e3,a>(new Date).getFullYear()+b&&(a-=100)),a}function j(){var a=this.slice(0,s[n].length),b=s[n].slice(0,a.length);return a.toLowerCase()===b.toLowerCase()}if(!e)return b;if(e instanceof Date)return e;if("string"==typeof f&&(f=r.parseFormat(f)),f.toValue)return f.toValue(e,f,g);var l,m,n,o,p=/([\-+]\d+)([dmwy])/,s=e.match(/([\-+]\d+)([dmwy])/g),t={d:"moveDay",m:"moveMonth",w:"moveWeek",y:"moveYear"},u={yesterday:"-1d",today:"+0d",tomorrow:"+1d"};if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)){for(e=new Date,n=0;n<s.length;n++)l=p.exec(s[n]),m=parseInt(l[1]),o=t[l[2]],e=k.prototype[o](e,m);return c(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}if("undefined"!=typeof u[e]&&(e=u[e],s=e.match(/([\-+]\d+)([dmwy])/g),/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e))){for(e=new Date,n=0;n<s.length;n++)l=p.exec(s[n]),m=parseInt(l[1]),o=t[l[2]],e=k.prototype[o](e,m);return c(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}s=e&&e.match(this.nonpunctuation)||[],e=new Date;var v,w,x={},y=["yyyy","yy","M","MM","m","mm","d","dd"],z={yyyy:function(a,b){return a.setUTCFullYear(h?i(b,h):b)},yy:function(a,b){return a.setUTCFullYear(h?i(b,h):b)},m:function(a,b){if(isNaN(a))return a;for(b-=1;0>b;)b+=12;for(b%=12,a.setUTCMonth(b);a.getUTCMonth()!==b;)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}};z.M=z.MM=z.mm=z.m,z.dd=z.d,e=d();var A=f.parts.slice();if(s.length!==A.length&&(A=a(A).filter(function(b,c){return-1!==a.inArray(c,y)}).toArray()),s.length===A.length){var B;for(n=0,B=A.length;B>n;n++){if(v=parseInt(s[n],10),l=A[n],isNaN(v))switch(l){case"MM":w=a(q[g].months).filter(j),v=a.inArray(w[0],q[g].months)+1;break;case"M":w=a(q[g].monthsShort).filter(j),v=a.inArray(w[0],q[g].monthsShort)+1;
}x[l]=v}var C,D;for(n=0;n<y.length;n++)D=y[n],D in x&&!isNaN(x[D])&&(C=new Date(e),z[D](C,x[D]),isNaN(C)||(e=C))}return e},formatDate:function(b,c,d){if(!b)return"";if("string"==typeof c&&(c=r.parseFormat(c)),c.toDisplay)return c.toDisplay(b,c,d);var e={d:b.getUTCDate(),D:q[d].daysShort[b.getUTCDay()],DD:q[d].days[b.getUTCDay()],m:b.getUTCMonth()+1,M:q[d].monthsShort[b.getUTCMonth()],MM:q[d].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};e.dd=(e.d<10?"0":"")+e.d,e.mm=(e.m<10?"0":"")+e.m,b=[];for(var f=a.extend([],c.separators),g=0,h=c.parts.length;h>=g;g++)f.length&&b.push(f.shift()),b.push(e[c.parts[g]]);return b.join("")},headTemplate:'<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};r.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+r.headTemplate+"<tbody></tbody>"+r.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-decades"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-centuries"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+"</table></div></div>",a.fn.datepicker.DPGlobal=r,a.fn.datepicker.noConflict=function(){return a.fn.datepicker=m,this},a.fn.datepicker.version="1.6.0",a(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(b){var c=a(this);c.data("datepicker")||(b.preventDefault(),n.call(c,"show"))}),a(function(){n.call(a('[data-provide="datepicker-inline"]'))})});
!function(a){a.fn.datepicker.dates["zh-CN"]={days:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],daysShort:["周日","周一","周二","周三","周四","周五","周六"],daysMin:["日","一","二","三","四","五","六"],months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthsShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],today:"今日",clear:"清除",format:"yyyy年mm月dd日",titleFormat:"yyyy年mm月",weekStart:1}}(jQuery);
/* globals AdminLTEOptions: false */
/* globals FastClick: false */

/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.1.2
 * @license MIT <http://opensource.org/licenses/MIT>
 */

'use strict';

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === 'undefined') {
    throw new Error('AdminLTE requires jQuery');
}

/* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
    //Add slimscroll to navbar menus
    //This requires you to load the slimscroll plugin
    //in every page before app.js
    navbarMenuSlimscroll: true,
    navbarMenuSlimscrollWidth: '3px', //The width of the scroll bar
    navbarMenuHeight: '200px', //The height of the inner menu
    //General animation speed for JS animated elements such as box collapse/expand and
    //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
    //'fast', 'normal', or 'slow'
    animationSpeed: 500,
    //Sidebar push menu toggle button selector
    sidebarToggleSelector: '[data-toggle="offcanvas"]',
    //Activate sidebar push menu
    sidebarPushMenu: true,
    //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
    sidebarSlimScroll: true,
    //Enable sidebar expand on hover effect for sidebar mini
    //This option is forced to true if both the fixed layout and sidebar mini
    //are used together
    sidebarExpandOnHover: false,
    //BoxRefresh Plugin
    enableBoxRefresh: true,
    //Bootstrap.js tooltip
    enableBSToppltip: true,
    BSTooltipSelector: '[data-toggle="tooltip"]',
    //Enable Fast Click. Fastclick.js creates a more
    //native touch experience with touch devices. If you
    //choose to enable the plugin, make sure you load the script
    //before AdminLTE's app.js
    enableFastclick: true,
    //Control Sidebar Options
    enableControlSidebar: true,
    controlSidebarOptions: {
        //Which button should trigger the open/close event
        toggleBtnSelector: '[data-toggle="control-sidebar"]',
        //The sidebar selector
        selector: '.control-sidebar',
        //Enable slide over content
        slide: true
    },
    //Box Widget Plugin. Enable this plugin
    //to allow boxes to be collapsed and/or removed
    enableBoxWidget: true,
    //Box Widget plugin options
    boxWidgetOptions: {
        boxWidgetIcons: {
            //Collapse icon
            collapse: 'fa-minus',
            //Open icon
            open: 'fa-plus',
            //Remove icon
            remove: 'fa-times'
        },
        boxWidgetSelectors: {
            //Remove button selector
            remove: '[data-widget="remove"]',
            //Collapse button selector
            collapse: '[data-widget="collapse"]'
        }
    },
    //Direct Chat plugin options
    directChat: {
        //Enable direct chat by default
        enable: true,
        //The button to open and close the chat contacts pane
        contactToggleSelector: '[data-widget="chat-pane-toggle"]'
    },
    //Define the set of colors to use globally around the website
    colors: {
        lightBlue: '#3c8dbc',
        red: '#f56954',
        green: '#00a65a',
        aqua: '#00c0ef',
        yellow: '#f39c12',
        blue: '#0073b7',
        navy: '#001F3F',
        teal: '#39CCCC',
        olive: '#3D9970',
        lime: '#01FF70',
        orange: '#FF851B',
        fuchsia: '#F012BE',
        purple: '#8E24AA',
        maroon: '#D81B60',
        black: '#222222',
        gray: '#d2d6de'
    },
    //The standard screen sizes that bootstrap uses.
    //If you change these in the variables.less file, change
    //them here too.
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
    //Extend options if external options exist
    if (typeof AdminLTEOptions !== 'undefined') {
        $.extend(true,
            $.AdminLTE.options,
            AdminLTEOptions);
    }

    //Easy access to options
    var o = $.AdminLTE.options;

    //Set up the object
    _init();

    //Activate the layout maker
    $.AdminLTE.layout.activate();

    //Enable sidebar tree view controls
    $.AdminLTE.tree('.sidebar');

    //Enable control sidebar
    if (o.enableControlSidebar) {
        $.AdminLTE.controlSidebar.activate();
    }

    //Add slimscroll to navbar dropdown
    if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll !== 'undefined') {
        $('.navbar .menu').slimscroll({
            height: o.navbarMenuHeight,
            alwaysVisible: false,
            size: o.navbarMenuSlimscrollWidth
        }).css('width', '100%');
    }

    //Activate sidebar push menu
    if (o.sidebarPushMenu) {
        $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
    }

    //Activate Bootstrap tooltip
    if (o.enableBSToppltip) {
        $('body').tooltip({
            selector: o.BSTooltipSelector
        });
    }

    //Activate box widget
    if (o.enableBoxWidget) {
        $.AdminLTE.boxWidget.activate();
    }

    //Activate fast click
    if (o.enableFastclick && typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
    }

    //Activate direct chat widget
    if (o.directChat.enable) {
        $(o.directChat.contactToggleSelector).on('click', function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
        });
    }

    /*
     * INITIALIZE BUTTON TOGGLE
     * ------------------------
     */
    $('.btn-group[data-toggle="btn-toggle"]').each(function () {
        var group = $(this);
        $(this).find('.btn').on('click', function (e) {
            group.find('.btn.active').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });

    });
});

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {

    /* Layout
     * ======
     * Fixes the layout height in case min-height fails.
     *
     * @type Object
     * @usage $.AdminLTE.layout.activate()
     *        $.AdminLTE.layout.fix()
     *        $.AdminLTE.layout.fixSidebar()
     */
    $.AdminLTE.layout = {
        activate: function () {
            var _this = this;
            _this.fix();
            _this.fixSidebar();
            $(window, '.wrapper').resize(function () {
                _this.fix();
                _this.fixSidebar();
            });
        },
        fix: function () {
            //Get window height and the wrapper height
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
            var windowHeight = $(window).height();
            var sidebarHeight = $('.sidebar').height();
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($('body').hasClass('fixed')) {
                $('.content-wrapper, .right-side').css('min-height', windowHeight - $('.main-footer').outerHeight());
            } else {
                var postSetWidth;
                if (windowHeight >= sidebarHeight) {
                    $('.content-wrapper, .right-side').css('min-height', windowHeight - neg);
                    postSetWidth = windowHeight - neg;
                } else {
                    $('.content-wrapper, .right-side').css('min-height', sidebarHeight);
                    postSetWidth = sidebarHeight;
                }

                //Fix for the control sidebar height
                var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
                if (typeof controlSidebar !== 'undefined') {
                    if (controlSidebar.height() > postSetWidth) {
                        $('.content-wrapper, .right-side').css('min-height', controlSidebar.height());
                    }
                }

            }
        },
        fixSidebar: function () {
            //Make sure the body tag has the .fixed class
            if (!$('body').hasClass('fixed')) {
                if (typeof $.fn.slimScroll !== 'undefined') {
                    $('.sidebar').slimScroll({destroy: true}).height('auto');
                }
                return;
            } else if (typeof $.fn.slimScroll === 'undefined' && console) {
                console.error('Error: the fixed layout requires the slimscroll plugin!');
            }
            //Enable slimscroll for fixed layout
            if ($.AdminLTE.options.sidebarSlimScroll) {
                if (typeof $.fn.slimScroll !== 'undefined') {
                    //Destroy if it exists
                    $('.sidebar').slimScroll({destroy: true}).height('auto');
                    //Add slimscroll
                    $('.sidebar').slimscroll({
                        height: ($(window).height() - $('.main-header').height()) + 'px',
                        color: 'rgba(0,0,0,0.2)',
                        size: '3px'
                    });
                }
            }
        }
    };

    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
     */
    $.AdminLTE.pushMenu = {
        activate: function (toggleBtn) {
            //Get the screen sizes
            var screenSizes = $.AdminLTE.options.screenSizes;

            //Enable sidebar toggle
            $(toggleBtn).on('click', function (e) {
                e.preventDefault();

                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {
                    $('body').toggleClass('sidebar-collapse');
                }
                //Handle sidebar push menu for small screens
                else {
                    if ($('body').hasClass('sidebar-open')) {
                        $('body').removeClass('sidebar-open');
                        $('body').removeClass('sidebar-collapse');
                    } else {
                        $('body').addClass('sidebar-open');
                    }
                }
            });

            $('.content-wrapper').click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $('body').hasClass('sidebar-open')) {
                    $('body').removeClass('sidebar-open');
                }
            });

            //Enable expand on hover for sidebar mini
            if ($.AdminLTE.options.sidebarExpandOnHover ||
                ($('body').hasClass('fixed') && $('body').hasClass('sidebar-mini'))) {
                this.expandOnHover();
            }

        },
        expandOnHover: function () {
            var _this = this;
            var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
            //Expand sidebar on hover
            $('.main-sidebar').hover(function () {
                if ($('body').hasClass('sidebar-mini') &&
                    $('body').hasClass('sidebar-collapse') &&
                    $(window).width() > screenWidth) {
                    _this.expand();
                }
            }, function () {
                if ($('body').hasClass('sidebar-mini') &&
                    $('body').hasClass('sidebar-expanded-on-hover') &&
                    $(window).width() > screenWidth) {
                    _this.collapse();
                }
            });
        },
        expand: function () {
            $('body').removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
        },
        collapse: function () {
            if ($('body').hasClass('sidebar-expanded-on-hover')) {
                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
            }
        }
    };

    /* Tree()
     * ======
     * Converts the sidebar into a multilevel
     * tree view menu.
     *
     * @type Function
     * @Usage: $.AdminLTE.tree('.sidebar')
     */
    $.AdminLTE.tree = function (menu) {
        var _this = this;
        var animationSpeed = $.AdminLTE.options.animationSpeed;
        $('li a', $(menu)).on('click', function (e) {
            //Get the clicked link and the next element
            var $this = $(this);
            var checkElement = $this.next();

            //Check if the next element is a menu and is visible
            if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                //Close the menu
                checkElement.slideUp(animationSpeed, function () {
                    checkElement.removeClass('menu-open');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
                checkElement.parent('li').removeClass('active');
            }
            //If the menu is not visible
            else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                //Get the parent menu
                var parent = $this.parents('ul').first();
                //Close all open menus within the parent
                var ul = parent.find('ul:visible').slideUp(animationSpeed);
                //Remove the menu-open class from the parent
                ul.removeClass('menu-open');
                //Get the parent li
                var liParent = $this.parent('li');

                //Open the target menu and add the menu-open class
                checkElement.slideDown(animationSpeed, function () {
                    //Add the class active to the parent li
                    checkElement.addClass('menu-open');
                    parent.find('li.active').removeClass('active');
                    liParent.addClass('active');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    _this.layout.fix();
                });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
            }
        });
    };

    /* ControlSidebar
     * ==============
     * Adds functionality to the right sidebar
     *
     * @type Object
     * @usage $.AdminLTE.controlSidebar.activate(options)
     */
    $.AdminLTE.controlSidebar = {
        //instantiate the object
        activate: function () {
            //Get the object
            var _this = this;
            //Update options
            var o = $.AdminLTE.options.controlSidebarOptions;
            //Get the sidebar
            var sidebar = $(o.selector);
            //The toggle button
            var btn = $(o.toggleBtnSelector);

            //Listen to the click event
            btn.on('click', function (e) {
                e.preventDefault();
                //If the sidebar is not open
                if (!sidebar.hasClass('control-sidebar-open') && !$('body').hasClass('control-sidebar-open')) {
                    //Open the sidebar
                    _this.open(sidebar, o.slide);
                } else {
                    _this.close(sidebar, o.slide);
                }
            });

            //If the body has a boxed layout, fix the sidebar bg position
            var bg = $('.control-sidebar-bg');
            _this._fix(bg);

            //If the body has a fixed layout, make the control sidebar fixed
            if ($('body').hasClass('fixed')) {
                _this._fixForFixed(sidebar);
            } else {
                //If the content height is less than the sidebar's height, force max height
                if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                    _this._fixForContent(sidebar);
                }
            }
        },
        //Open the control sidebar
        open: function (sidebar, slide) {
            // var _this = this;
            //Slide over content
            if (slide) {
                sidebar.addClass('control-sidebar-open');
            } else {
                //Push the content by adding the open class to the body instead
                //of the sidebar itself
                $('body').addClass('control-sidebar-open');
            }
        },
        //Close the control sidebar
        close: function (sidebar, slide) {
            if (slide) {
                sidebar.removeClass('control-sidebar-open');
            } else {
                $('body').removeClass('control-sidebar-open');
            }
        },
        _fix: function (sidebar) {
            var _this = this;
            if ($('body').hasClass('layout-boxed')) {
                sidebar.css('position', 'absolute');
                sidebar.height($('.wrapper').height());
                $(window).resize(function () {
                    _this._fix(sidebar);
                });
            } else {
                sidebar.css({
                    'position': 'fixed',
                    'height': 'auto'
                });
            }
        },
        _fixForFixed: function (sidebar) {
            sidebar.css({
                'position': 'fixed',
                'max-height': '100%',
                'overflow': 'auto',
                'padding-bottom': '50px'
            });
        },
        _fixForContent: function (sidebar) {
            $('.content-wrapper, .right-side').css('min-height', sidebar.height());
        }
    };

    /* BoxWidget
     * =========
     * BoxWidget is a plugin to handle collapsing and
     * removing boxes from the screen.
     *
     * @type Object
     * @usage $.AdminLTE.boxWidget.activate()
     *        Set all your options in the main $.AdminLTE.options object
     */
    $.AdminLTE.boxWidget = {
        selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
        icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
        animationSpeed: $.AdminLTE.options.animationSpeed,
        activate: function (_box) {
            var _this = this;
            if (! _box) {
                _box = document; // activate all boxes per default
            }
            //Listen for collapse event triggers
            $(_box).find(_this.selectors.collapse).on('click', function (e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            $(_box).find(_this.selectors.remove).on('click', function (e) {
                e.preventDefault();
                _this.remove($(this));
            });
        },
        collapse: function (element) {
            var _this = this;
            //Find the box parent
            var box = element.parents('.box').first();
            //Find the body and the footer
            var boxContent = box.find('> .box-body, > .box-footer');
            if (!box.hasClass('collapsed-box')) {
                //Convert minus into plus
                element.children(':first')
                    .removeClass(_this.icons.collapse)
                    .addClass(_this.icons.open);
                //Hide the content
                boxContent.slideUp(_this.animationSpeed, function () {
                    box.addClass('collapsed-box');
                });
            } else {
                //Convert plus into minus
                element.children(':first')
                    .removeClass(_this.icons.open)
                    .addClass(_this.icons.collapse);
                //Show the content
                boxContent.slideDown(_this.animationSpeed, function () {
                    box.removeClass('collapsed-box');
                });
            }
        },
        remove: function (element) {
            //Find the box parent
            var box = element.parents('.box').first();
            box.slideUp(this.animationSpeed);
        }
    };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $('#box-widget').boxRefresh( options );
 */
(function ($) {

    $.fn.boxRefresh = function (options) {

        // Render options
        var settings = $.extend({
            //Refresh button selector
            trigger: '.refresh-btn',
            //File source to be loaded (e.g: ajax/src.php)
            source: '',
            //Callbacks
            onLoadStart: function (box) {
            }, //Right after the button has been clicked
            onLoadDone: function (box) {
            } //When the source has been loaded

        }, options);

        //The overlay
        var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

        return this.each(function () {
            //if a source is specified
            if (settings.source === '') {
                if (console) {
                    console.log('Please specify a source first - boxRefresh()');
                }
                return;
            }
            //the box
            var box = $(this);
            //the button
            var rBtn = box.find(settings.trigger).first();

            //On trigger click
            rBtn.on('click', function (e) {
                e.preventDefault();
                //Add loading overlay
                start(box);

                //Perform ajax call
                box.find('.box-body').load(settings.source, function () {
                    done(box);
                });
            });
        });

        function start(box) {
            //Add overlay and loading img
            box.append(overlay);

            settings.onLoadStart.call(box);
        }

        function done(box) {
            //Remove overlay and loading img
            box.find(overlay).remove();

            settings.onLoadDone.call(box);
        }

    };

})(jQuery);

/*
 * EXPLICIT BOX ACTIVATION
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded.
 *
 * @type plugin
 * @usage $('#box-widget').activateBox();
 */
(function ($) {

    $.fn.activateBox = function () {
        $.AdminLTE.boxWidget.activate(this);
    };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $('#todo-widget').todolist( options );
 */
(function ($) {

    $.fn.todolist = function (options) {
        // Render options
        var settings = $.extend({
            //When the user checks the input
            onCheck: function (ele) {
            },
            //When the user unchecks the input
            onUncheck: function (ele) {
            }
        }, options);

        return this.each(function () {

            if (typeof $.fn.iCheck !== 'undefined') {
                $('input', this).on('ifChecked', function (event) {
                    var ele = $(this).parents('li').first();
                    ele.toggleClass('done');
                    settings.onCheck.call(ele);
                });

                $('input', this).on('ifUnchecked', function (event) {
                    var ele = $(this).parents('li').first();
                    ele.toggleClass('done');
                    settings.onUncheck.call(ele);
                });
            } else {
                $('input', this).on('change', function (event) {
                    var ele = $(this).parents('li').first();
                    ele.toggleClass('done');
                    settings.onCheck.call(ele);
                });
            }
        });
    };
}(jQuery));
$(function() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass: 'iradio_minimal-red'
    });
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });
    //Enable check and uncheck all functionality
    $('.checkbox-toggle').on('ifToggled', function(event){
        var clicks = $(this).data('clicks');
        if (clicks) {
            //Uncheck all checkboxes
            $("input[type='checkbox']").iCheck("uncheck");
        } else {
            //Check all checkboxes
            $("input[type='checkbox']").iCheck("check");
        }
        $(this).data("clicks", !clicks);
    });
    $('.select2').select2({
        minimumResultsForSearch: Infinity
    })
    $('.datepicker').datepicker({
        clearBtn: true,
        autoclose: true,
        format: "yyyy-mm-dd",
        multidateSeparator: true,
        todayHighlight: true,
        orientation: "bottom auto",
        language: "zh-CN"
    });
});
//# sourceMappingURL=backend.js.map
