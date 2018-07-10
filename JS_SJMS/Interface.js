/**
 * Created by xzy on 2016/7/21.
 */
var Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw new Error("101-参数长度错误");
    }
    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("102-Error : 不是是string类型");
        }
        this.methods.push(methods[i]);
    }

};
/**
 *  var CompositeParent = new Interface('Composite',['add','remove','getChild']);
 *  Interface.ensureImplements(CompositeChilden,CompositeParent);
 *  上面两行 用来判断CompositeChilden 是否实现CompositeParent的接口
 * @param object
 */
Interface.ensureImplements = function (object) {
    if (arguments.length < 2) {
        throw new Error("103-参数长度错误");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {  //这里i=1 表示从第二个参数开始
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error("104-Function错误");
        }
        for (var j = 0, methodsLen = interface.methods.length; i < methodsLen; i++) {
            var method = interface.methods[i];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("105-错误");
            }
        }
    }
}


function addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    }
    else {
        element['on' + type] = handler;
    }
}


/**
 * 类式继承
 * @param subClass
 * @param superClass
 */
function extend(subClass, superClass) {
    var F = function () {
    };
    F.prototype = superClass.prototype;   //这里的F就是superClass的一个实例
    subClass.prototype = new F(); //指向超类的一个实例
    subClass.prototype.constructor = subClass;
}

/**
 * 原型式继承
 * @param object
 * @returns {F}
 */
function clone(object) {
    function F() {
    }

    F.prototype = object;
    return new F();
}

/**
 * 掺元方式继承
 * @param receivingClass
 * @param givingClass
 */
function augment(receivingClass, givingClass) {
    if (arguments[2]) {
        for (var i = 2, len = arguments.length; i < len; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    else {
        for (var methodName in givingClass.prototype) {
            if (!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[arguments[i]];
            }
        }
    }
}



var asyncRequest = (function () {

    function handleReadyState(o, callback) {
        var poll = window.setInterval(
            function () {
                if (o && o.readyState == 4) {
                    window.clearInterval(poll);
                    if (callback) {
                        callback(o);
                    }
                }
            },
            50
        );
    }

    var getXHR = function () {
        var http;
        try {
            http = new XMLHttpRequest;
            getXHR = function () {
                return new XMLHttpRequest;
            };
        } catch (e) {
            var msxml = [
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];

            for (var i = 0, len = msxml.length; i < len; ++i) {
                try {
                    http = new ActiveXObject(msxml[i]);
                    getXHR = function () {
                        return new ActiveXObject(msxml[i]);
                    };
                    break;
                }
                catch (e) { }
            }
        }
        return http;
    };

    return function (method, uri, callback, postData) {
        var http = getXHR();
        http.open(method, uri, true);
        handleReadyState(http, callback);
        http.send(postData || null);
        return http;
    };
})();



