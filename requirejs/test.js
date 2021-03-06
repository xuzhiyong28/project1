! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.outils = t() : e.outils = t()
}(this, function () {
    return function (e) {
        function t(n) {
            if (o[n]) return o[n].exports;
            var r = o[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(r.exports, r, r.exports, t), r.l = !0, r.exports
        }
        var o = {};
        return t.m = e, t.c = o, t.d = function (e, o, n) {
            t.o(e, o) || Object.defineProperty(e, o, {
                configurable: !1,
                enumerable: !0,
                get: n
            })
        }, t.n = function (e) {
            var o = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return t.d(o, "a", o), o
        }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 5)
    }([
        function (e, t) {
            function o(e, t) {
                return new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className)
            }
            e.exports = o
        },
        function (e, t) {
            function o(e, t, o) {
                var n = new Date;
                n.setDate(n.getDate() + o), document.cookie = e + "=" + t + ";expires=" + n
            }
            e.exports = o
        },
        function (e, t) {
            function o() {
                return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                return window.scrollTo(0, e), e
            }
            e.exports = o
        },
        function (e, t) {
            e.exports = function (e, t, o, n) {
                function r() {
                    function r() {
                        a = Number(new Date), o.apply(c, s)
                    }

                    function u() {
                        i = void 0
                    }
                    var c = this,
                        f = Number(new Date) - a,
                        s = arguments;
                    n && !i && r(), i && clearTimeout(i), void 0 === n && f > e ? r() : !0 !== t && (i = setTimeout(n ? u : r, void 0 === n ? e - f : e))
                }
                var i, a = 0;
                return "boolean" != typeof t && (n = o, o = t, t = void 0), r
            }
        },
        function (e, t, o) {
            var n = o(6),
                r = o(7),
                i = o(0),
                a = o(8),
                u = o(9),
                c = o(10),
                f = o(1),
                s = o(11),
                p = o(12),
                l = o(2),
                d = o(13),
                m = o(14),
                v = o(3),
                g = o(15),
                w = o(4),
                x = o(16),
                y = o(17),
                h = o(18),
                b = o(19),
                C = o(20),
                N = o(21),
                S = o(22),
                M = o(23),
                F = o(24),
                D = o(25),
                E = o(26),
                I = o(27),
                T = o(28),
                k = o(29),
                A = o(30);
            e.exports = {
                arrayEqual: n,
                addClass: r,
                hasClass: i,
                removeClass: a,
                getCookie: u,
                removeCookie: c,
                setCookie: f,
                getOS: s,
                getExplore: p,
                getScrollTop: l,
                offset: d,
                scrollTo: m,
                setScrollTop: v,
                debounce: g,
                throttle: w,
                getKeyName: x,
                deepClone: y,
                isEmptyObject: h,
                randomColor: b,
                randomNum: C,
                isEmail: N,
                isIdCard: S,
                isPhoneNum: M,
                isUrl: F,
                digitUppercase: D,
                isSupportWebP: E,
                formatPassTime: I,
                formatRemainTime: T,
                parseQueryString: k,
                stringfyQueryString: A
            }
        },
        function (e, t) {
            function o(e, t) {
                if (e === t) return !0;
                if (e.length != t.length) return !1;
                for (var o = 0; o < e.length; ++o)
                    if (e[o] !== t[o]) return !1;
                return !0
            }
            e.exports = o
        },
        function (e, t, o) {
            function n(e, t) {
                r(e, t) || (e.className += " " + t)
            }
            var r = o(0);
            e.exports = n
        },
        function (e, t, o) {
            function n(e, t) {
                if (r(e, t)) {
                    var o = new RegExp("(\\s|^)" + t + "(\\s|$)");
                    e.className = e.className.replace(o, " ")
                }
            }
            var r = o(0);
            e.exports = n
        },
        function (e, t) {
            function o(e) {
                for (var t = document.cookie.replace(/\s/g, "").split(";"), o = 0; o < t.length; o++) {
                    var n = t[o].split("=");
                    if (n[0] == e) return decodeURIComponent(n[1])
                }
                return ""
            }
            e.exports = o
        },
        function (e, t, o) {
            function n(e) {
                r(e, "1", -1)
            }
            var r = o(1);
            e.exports = n
        },
        function (e, t) {
            function o() {
                var e = "navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase() || "",
                    t = ("navigator" in window && "vendor" in navigator && navigator.vendor.toLowerCase(), "navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase() || "");
                return /mac/i.test(t) ? "MacOSX" : /win/i.test(t) ? "windows" : /linux/i.test(t) ? "linux" : (/iphone/i.test(e) || /ipad/i.test(e) || /ipod/i.test(e), /android/i.test(e) ? "android" : /win/i.test(t) && /phone/i.test(e) ? "windowsPhone" : void 0)
            }
            e.exports = o
        },
        function (e, t) {
            function o() {
                var e, t = {},
                    o = navigator.userAgent.toLowerCase();
                return (e = o.match(/rv:([\d.]+)\) like gecko/)) ? t.ie = e[1] : (e = o.match(/msie ([\d\.]+)/)) ? t.ie = e[1] : (e = o.match(/edge\/([\d\.]+)/)) ? t.edge = e[1] : (e = o.match(/firefox\/([\d\.]+)/)) ? t.firefox = e[1] : (e = o.match(/(?:opera|opr).([\d\.]+)/)) ? t.opera = e[1] : (e = o.match(/chrome\/([\d\.]+)/)) ? t.chrome = e[1] : (e = o.match(/version\/([\d\.]+).*safari/)) && (t.safari = e[1]), t.ie ? "IE: " + t.ie : t.edge ? "EDGE: " + t.edge : t.firefox ? "Firefox: " + t.firefox : t.chrome ? "Chrome: " + t.chrome : t.opera ? "Opera: " + t.opera : t.safari ? "Safari: " + t.safari : "Unkonwn"
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                for (var t = {
                    left: 0,
                    top: 0
                }; e;) t.left += e.offsetLeft, t.top += e.offsetTop, e = e.offsetParent;
                return t
            }
            e.exports = o
        },
        function (e, t, o) {
            function n(e, t) {
                if (t < 0) return void i(e);
                var o = e - r();
                if (0 !== o) {
                    var a = o / t * 10;
                    requestAnimationFrame(function () {
                        if (Math.abs(a) > Math.abs(o)) return void i(r() + o);
                        i(r() + a), o > 0 && r() >= e || o < 0 && r() <= e || n(e, t - 16)
                    })
                }
            }
            var r = o(2),
                i = o(3);
            ! function () {
                window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
            }();
            e.exports = n
        },
        function (e, t, o) {
            function n(e, t, o) {
                return void 0 === o ? r(e, t, !1) : r(e, o, !1 !== t)
            }
            var r = o(4);
            e.exports = n
        },
        function (e, t) {
            function o(e) {
                return n[e] ? n[e] : (console.log("Unknow Key(Key Code:" + e + ")"), "")
            }
            var n = {
                8: "Backspace",
                9: "Tab",
                13: "Enter",
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                19: "Pause",
                20: "Caps Lock",
                27: "Escape",
                32: "Space",
                33: "Page Up",
                34: "Page Down",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                42: "Print Screen",
                45: "Insert",
                46: "Delete",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                65: "A",
                66: "B",
                67: "C",
                68: "D",
                69: "E",
                70: "F",
                71: "G",
                72: "H",
                73: "I",
                74: "J",
                75: "K",
                76: "L",
                77: "M",
                78: "N",
                79: "O",
                80: "P",
                81: "Q",
                82: "R",
                83: "S",
                84: "T",
                85: "U",
                86: "V",
                87: "W",
                88: "X",
                89: "Y",
                90: "Z",
                91: "Windows",
                93: "Right Click",
                96: "Numpad 0",
                97: "Numpad 1",
                98: "Numpad 2",
                99: "Numpad 3",
                100: "Numpad 4",
                101: "Numpad 5",
                102: "Numpad 6",
                103: "Numpad 7",
                104: "Numpad 8",
                105: "Numpad 9",
                106: "Numpad *",
                107: "Numpad +",
                109: "Numpad -",
                110: "Numpad .",
                111: "Numpad /",
                112: "F1",
                113: "F2",
                114: "F3",
                115: "F4",
                116: "F5",
                117: "F6",
                118: "F7",
                119: "F8",
                120: "F9",
                121: "F10",
                122: "F11",
                123: "F12",
                144: "Num Lock",
                145: "Scroll Lock",
                182: "My Computer",
                183: "My Calculator",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'"
            };
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                var t;
                if (null == e || "object" != (void 0 === e ? "undefined" : n(e))) return e;
                if (e instanceof Date) return t = new Date, t.setTime(e.getTime()), t;
                if (e instanceof Array) {
                    t = [];
                    for (var r = 0, i = e.length; r < i; r++) t[r] = o(e[r]);
                    return t
                }
                if (e instanceof Object) {
                    t = {};
                    for (var a in e) e.hasOwnProperty(a) && (t[a] = o(e[a]));
                    return t
                }
                throw new Error("Unable to copy values! Its type isn't supported.")
            }
            var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                return !(!e || "object" !== (void 0 === e ? "undefined" : n(e)) || Array.isArray(e)) && !Object.keys(e).length
            }
            var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            e.exports = o
        },
        function (e, t) {
            function o() {
                return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).slice(-6)
            }
            e.exports = o
        },
        function (e, t) {
            function o(e, t) {
                return Math.floor(e + Math.random() * (t - e))
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(e)
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(e)
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(e)
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i.test(e)
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                var t = ["角", "分"],
                    o = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"],
                    n = [
                        ["元", "万", "亿"],
                        ["", "拾", "佰", "仟"]
                    ],
                    r = e < 0 ? "欠" : "";
                e = Math.abs(e);
                for (var i = "", a = 0; a < t.length; a++) i += (o[Math.floor(10 * e * Math.pow(10, a)) % 10] + t[a]).replace(/零./, "");
                i = i || "整", e = Math.floor(e);
                for (var a = 0; a < n[0].length && e > 0; a++) {
                    for (var u = "", c = 0; c < n[1].length && e > 0; c++) u = o[e % 10] + n[1][c] + u, e = Math.floor(e / 10);
                    i = u.replace(/(零.)*零$/, "").replace(/^$/, "零") + n[0][a] + i
                }
                return r + i.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整")
            }
            e.exports = o
        },
        function (e, t) {
            function o() {
                return !![].map && 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                var t = Date.parse(new Date),
                    o = t - e,
                    n = parseInt(o / 864e5),
                    r = parseInt(o / 36e5),
                    i = parseInt(o / 6e4),
                    a = parseInt(n / 30),
                    u = parseInt(a / 12);
                return u ? u + "年前" : a ? a + "个月前" : n ? n + "天前" : r ? r + "小时前" : i ? i + "分钟前" : "刚刚"
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                var t = new Date,
                    o = new Date(e),
                    n = o.getTime() - t.getTime(),
                    r = 0,
                    i = 0,
                    a = 0,
                    u = 0;
                return n >= 0 && (r = Math.floor(n / 1e3 / 3600 / 24), i = Math.floor(n / 1e3 / 60 / 60 % 24), a = Math.floor(n / 1e3 / 60 % 60), u = Math.floor(n / 1e3 % 60)), r + "天 " + i + "小时 " + a + "分钟 " + u + "秒"
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                e = null == e ? window.location.href : e;
                var t = e.substring(e.lastIndexOf("?") + 1);
                return t ? JSON.parse('{"' + decodeURIComponent(t).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : {}
            }
            e.exports = o
        },
        function (e, t) {
            function o(e) {
                if (!e) return "";
                var t = [];
                for (var o in e) {
                    var n = e[o];
                    if (n instanceof Array)
                        for (var r = 0; r < n.length; ++r) t.push(encodeURIComponent(o + "[" + r + "]") + "=" + encodeURIComponent(n[r]));
                    else t.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]))
                }
                return t.join("&")
            }
            e.exports = o
        }
    ])
});