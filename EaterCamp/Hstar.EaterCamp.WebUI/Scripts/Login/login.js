(function (a, b) {
    function k(a, b, f) {
        if (d[a]) throw new Error("Module " + a + " has been defined already.");
        c(b) && (f = b), d[a] = { factory: f, inited: !1 }, a === e && j(a);
    }

    function j(a) {
        var e = {}, f = d[a];
        if (c(d[a].factory)) {
            var g = d[a].factory.apply(b, [i, e, b]);
            f.ret = g === b ? e : g;
        } else f.ret = d[a].factory;
        f.inited = !0;
    }

    function i(a) {
        if (!d[a]) throw new Error("Module " + a + " is not defined.");
        var b = d[a];
        b.inited === !1 && j(a);
        return b.ret;
    }

    function c(a) { return Object.prototype.toString.call(a) === "[object Function]"; }

    if (!a.define) {
        var d = {}, e = null, f = document.getElementsByTagName("script");
        for (var g = 0, h = f.length; g < h && !e; g++) e = f[g].getAttribute("data-main");
        if (!e) throw new Error("No data-main attribute in script tag.");
        a.define = k;
    }
})(window);
define("task/page/login/login", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("module/login/Login"), g = d(window), h = d(document.body), i = a("utils/Log");
    (new e("Login", function () {
        var a = d("#loginForm"), b = d("#regOptions"), c = d("#about"), e = d("#operateBox"), j = d("#loginContent"), k = d("#wrap"), l = k.find(".js-arrow"), m = e.find(".login-trigger"), n = e.find(".register-trigger"), o = 600;
        d(document).bind("loginSuccess", function () { a.addClass("hidden"), b.removeClass("hidden"); });
        var p = !1, q = null, r = !1, s = "", t = null, u = function () {
            var a = g.height(), b = a <= o ? h.height() : a, c = e.offset(), d = b - c.top - e.height();
            return d - 5;
        }, v = function () {
            var a = u();
            k.css({ height: a + "px" });
        }, w = function () { z(); }, x = function () {
            if (!r) t = new f(a, { type: q }), r = !0, s = t.cookieLoginEmail;
            else {
                t.hideTips();
                if (q === "login") s !== "" && t.$username.val(s).trigger("keyup"), p && t.$username.focusToEnd();
                else {
                    var b = d.trim(t.$username.val());
                    s = b, t.$clearBtn.trigger("click"), t.$password.val("").trigger("keyup"), p && t.$username.focus();
                }
            }
        }, y = function () {
            x();
            if (!p) {
                e.parent().addClass("login-operate-actived"), j.stop().animate({ marginTop: "-290px" }, 600, "easeInOutExpo");
                var a = u() + 75;
                k.stop().animate({ height: a + "px" }, 800, "easeInOutExpo", function () { g.bind("resize", v), t.$username.focusToEnd(); }), j.bind("click", w), p = !0;
            }
        }, z = function () { e.parent().removeClass("login-operate-actived"), j.stop().animate({ marginTop: "-215px" }, 600, "easeInOutExpo"), k.stop().animate({ height: 0 }, 600, "easeInOutExpo", function () { g.unbind("resize", v); }), j.unbind("click", w), p = !1, q === "login" && (s = d.trim(t.$username.val())); }, A = function (a) { a === 1 ? (l.addClass("login-wrap-arrow-register"), k.find(".js-login").hide().end().find(".js-register").show()) : (l.removeClass("login-wrap-arrow-register"), k.find(".js-register").hide().end().find(".js-login").show()); }, B = function (a) { e.find("a").removeClass("current"), d(a.currentTarget).addClass("current"); };
        e.delegate("a", "click", function (a) { a.stopPropagation(); }), e.delegate(".login-trigger", "click", function (a) { p && q === "login" ? z() : (q = "login", A(0), B(a), y()), i.doLog({ parameter: { method: "open" }, elem: d(a.target) }); }), e.delegate(".register-trigger", "click", function (a) { p && q === "register" ? z() : (q = "register", A(1), B(a), y()), i.doLog({ parameter: { method: "open" }, elem: d(a.target) }); });
    })).add();
});
define("lib/jquery", function (require, exports, module) {
    "use strict";
    var $ = window.jQuery;
    $.fn.setCaretTo = function (a, b) {
        b === undefined && (b = a);
        var c = this.get(0);
        if (c.createTextRange) {
            var d = c.createTextRange();
            d.collapse(!0), d.moveStart("character", a), d.moveEnd("character", b - a), d.select();
        } else c.focus(), c.setSelectionRange(a, b);
        return this;
    }, $.fn.focusToEnd = function () {
        var a = this.focus().val().length;
        this.setCaretTo(a);
        return this;
    }, $.fn.appendAfterCaret = function (a) {
        var b = this.get(0);
        if (document.selection) {
            var c = document.selection.createRange();
            c.text = a;
        } else if (typeof b.selectionStart == "number" && typeof b.selectionEnd == "number") {
            var d = b.selectionStart, e = b.selectionEnd, f = d, g = b.value;
            b.value = g.substring(0, d) + a + g.substring(e, g.length), f += a.length, b.selectionStart = b.selectionEnd = f;
        } else b.value += a;
        return this;
    }, $.fn.detachDo = function (a) {
        var b = $("<font />");
        return this.each(function (c, d) {
            var e = $(this);
            b.insertBefore(e), e.detach(), a(c, d), e.insertBefore(b), b.detach();
        });
    }, $.fn.getCaretPosition = function () {
        var a = this.get(0), b;
        try {
            b = a.selectionStart;
        } catch (c) {
        }
        if (b !== undefined) return a.selectionStart;
        if (document.selection) {
            var d = 0, e = document.selection.createRange();
            if (e.parentElement() === a) {
                var f = document.body.createTextRange();
                f.moveToElementText(a);
                for (b = 0; f.compareEndPoints("StartToStart", e) < 0; b++) f.moveStart("character", 1);
                for (var g = 0; g <= b; g++) a.value.charAt(g) == "\n" && b++;
                f = document.body.createTextRange(), f.moveToElementText(a);
                for (end = 0; f.compareEndPoints("StartToEnd", e) < 0; end++) f.moveStart("character", 1);
                for (g = 0; g <= end; g++) a.value.charAt(g) == "\n" && end++;
                d = b;
            }
            return d;
        }
        return 0;
    }, $.fn.outerHTML = function () {
        var a = this.first(), b = a.wrap("<div>").parent().html();
        a.unwrap();
        return b;
    }, function (a) {
        var b;
        a.scrollTo = function (c, d) {
            var e = a(document).scrollTop(), f = [], g = e - c, h = d ? d * 30 : 30;
            d = d || 2;
            while (Math.abs(g) > 0) {
                g = g / 2;
                if (Math.abs(g) < 1) {
                    f.push(0);
                    break;
                }
                f.push(g);
            }
            b && clearInterval(b), b = setInterval(function () { f.length ? window.scrollTo(0, c + f.shift()) : clearInterval(b); }, h);
        };
    }($), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function (a, b, c, d, e) { return jQuery.easing[jQuery.easing.def](a, b, c, d, e); },
        easeInQuad: function (a, b, c, d, e) { return d * (b /= e) * b + c; },
        easeOutQuad: function (a, b, c, d, e) { return -d * (b /= e) * (b - 2) + c; },
        easeInOutQuad: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b + c;
            return -d / 2 * (--b * (b - 2) - 1) + c;
        },
        easeInCubic: function (a, b, c, d, e) { return d * (b /= e) * b * b + c; },
        easeOutCubic: function (a, b, c, d, e) { return d * ((b = b / e - 1) * b * b + 1) + c; },
        easeInOutCubic: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b + c;
            return d / 2 * ((b -= 2) * b * b + 2) + c;
        },
        easeInQuart: function (a, b, c, d, e) { return d * (b /= e) * b * b * b + c; },
        easeOutQuart: function (a, b, c, d, e) { return -d * ((b = b / e - 1) * b * b * b - 1) + c; },
        easeInOutQuart: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b * b + c;
            return -d / 2 * ((b -= 2) * b * b * b - 2) + c;
        },
        easeInQuint: function (a, b, c, d, e) { return d * (b /= e) * b * b * b * b + c; },
        easeOutQuint: function (a, b, c, d, e) { return d * ((b = b / e - 1) * b * b * b * b + 1) + c; },
        easeInOutQuint: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b * b * b + c;
            return d / 2 * ((b -= 2) * b * b * b * b + 2) + c;
        },
        easeInSine: function (a, b, c, d, e) { return -d * Math.cos(b / e * (Math.PI / 2)) + d + c; },
        easeOutSine: function (a, b, c, d, e) { return d * Math.sin(b / e * (Math.PI / 2)) + c; },
        easeInOutSine: function (a, b, c, d, e) { return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c; },
        easeInExpo: function (a, b, c, d, e) { return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c; },
        easeOutExpo: function (a, b, c, d, e) { return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c; },
        easeInOutExpo: function (a, b, c, d, e) {
            if (b == 0) return c;
            if (b == e) return c + d;
            if ((b /= e / 2) < 1) return d / 2 * Math.pow(2, 10 * (b - 1)) + c;
            return d / 2 * (-Math.pow(2, -10 * --b) + 2) + c;
        },
        easeInCirc: function (a, b, c, d, e) { return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c; },
        easeOutCirc: function (a, b, c, d, e) { return d * Math.sqrt(1 - (b = b / e - 1) * b) + c; },
        easeInOutCirc: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1) return -d / 2 * (Math.sqrt(1 - b * b) - 1) + c;
            return d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c;
        },
        easeInElastic: function (a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (b == 0) return c;
            if ((b /= e) == 1) return c + d;
            g || (g = e * .3);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c;
        },
        easeOutElastic: function (a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (b == 0) return c;
            if ((b /= e) == 1) return c + d;
            g || (g = e * .3);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c;
        },
        easeInOutElastic: function (a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (b == 0) return c;
            if ((b /= e / 2) == 2) return c + d;
            g || (g = e * .3 * 1.5);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            if (b < 1) return -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c;
            return h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c;
        },
        easeInBack: function (a, b, c, d, e, f) {
            f == undefined && (f = 1.70158);
            return d * (b /= e) * b * ((f + 1) * b - f) + c;
        },
        easeOutBack: function (a, b, c, d, e, f) {
            f == undefined && (f = 1.70158);
            return d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c;
        },
        easeInOutBack: function (a, b, c, d, e, f) {
            f == undefined && (f = 1.70158);
            if ((b /= e / 2) < 1) return d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c;
            return d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c;
        },
        easeInBounce: function (a, b, c, d, e) { return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c; },
        easeOutBounce: function (a, b, c, d, e) { return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c; },
        easeInOutBounce: function (a, b, c, d, e) {
            if (b < e / 2) return jQuery.easing.easeInBounce(a, b * 2, 0, d, e) * .5 + c;
            return jQuery.easing.easeOutBounce(a, b * 2 - e, 0, d, e) * .5 + d * .5 + c;
        }
    }), function () {
        function f() { return (new Date).getTime(); }

        var a = jQuery, b = "jQuery.pause", c = 1, d = a.fn.animate, e = {};
        a.fn.animate = function (g, h, i, j) {
            var k = a.speed(h, i, j);
            k.complete = k.old;
            return this.each(function () {
                this[b] || (this[b] = c++);
                var h = a.extend({}, k);
                d.apply(a(this), [g, a.extend({}, h)]), e[this[b]] = { run: !0, prop: g, opt: h, start: f(), done: 0 };
            });
        }, a.fn.pause = function () {
            return this.each(function () {
                this[b] || (this[b] = c++);
                var d = e[this[b]];
                d && d.run && (d.done += f() - d.start, d.done > d.opt.duration ? delete e[this[b]] : (a(this).stop(), d.run = !1));
            });
        }, a.fn.resume = function () {
            return this.each(function () {
                this[b] || (this[b] = c++);
                var g = e[this[b]];
                g && !g.run && (g.opt.duration -= g.done, g.done = 0, g.run = !0, g.start = f(), d.apply(a(this), [g.prop, a.extend({}, g.opt)]));
            });
        };
    }(), typeof $.JSON != "object" && ($.JSON = {}), function () {
        function str(a, b) {
            var c, d, e, f, g = gap, h, i = b[a];
            i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)), typeof rep == "function" && (i = rep.call(b, a, i));
            switch (typeof i) {
                case "string":
                    return quote(i);
                case "number":
                    return isFinite(i) ? String(i) : "null";
                case "boolean":
                case "null":
                    return String(i);
                case "object":
                    if (!i) return "null";
                    gap += indent, h = [];
                    if (Object.prototype.toString.apply(i) === "[object Array]") {
                        f = i.length;
                        for (c = 0; c < f; c += 1) h[c] = str(c, i) || "null";
                        e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g;
                        return e;
                    }
                    if (rep && typeof rep == "object") {
                        f = rep.length;
                        for (c = 0; c < f; c += 1) typeof rep[c] == "string" && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                    } else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                    e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g;
                    return e;
            }
        }

        function quote(a) {
            escapable.lastIndex = 0;
            return escapable.test(a) ? '"' + a.replace(escapable, function (a) {
                var b = meta[a];
                return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + a + '"';
        }

        function f(a) { return a < 10 ? "0" + a : a; }

        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null; }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf(); });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep;
        typeof $.JSON.stringify != "function" && ($.JSON.stringify = function (a, b, c) {
            var d;
            gap = "", indent = "";
            if (typeof c == "number") for (d = 0; d < c; d += 1) indent += " ";
            else typeof c == "string" && (indent = c);
            rep = b;
            if (b && typeof b != "function" && (typeof b != "object" || typeof b.length != "number")) throw new Error("JSON.stringify");
            return str("", { "": a });
        }), typeof $.JSON.parse != "function" && ($.JSON.parse = function (text, reviver) {
            function walk(a, b) {
                var c, d, e = a[b];
                if (e && typeof e == "object") for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
                return reviver.call(a, b, e);
            }

            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4); }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver == "function" ? walk({ "": j }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        });
    }(), $.equals = function (a, b) {
        if (a.length != b.length) return !1;
        var c = !0;
        $.each(a, function (d) {
            if (a[d] != b[d]) {
                c = !1;
                return !1;
            }
        });
        return c;
    };
    return jQuery.noConflict();
});
define("task/basic/Task", function (a, b, c) {
    var d = a("basic/Class"), e = d.extend({ init: function (a, b, c, d) { this.name = a, d = d || [], c = c || null, this.func = function () { b.apply(c, d); }; }, run: function () { this.func(); }, add: function () { a("task/basic/TaskManager").add(this); } });
    return e;
});
define("basic/Class", function (a, b, c) {
    function f(a, b) {
        return function () {
            var c = this._super;
            this._super = a;
            var d = b.apply(this, arguments);
            this._super = c;
            return d;
        };
    }

    var d = !1, e = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/, g = function () {
    };
    g.extend = function (a) {
        function h() { !d && this.init && this.init.apply(this, arguments); }

        var b = this.prototype;
        d = !0;
        var c = new this;
        d = !1;
        for (var g in a) c[g] = typeof a[g] == "function" && typeof b[g] == "function" && e.test(a[g]) ? f(b[g], a[g]) : a[g];
        h.prototype = c, h.constructor = h, h.extend = arguments.callee;
        return h;
    };
    return g;
});
define("task/basic/TaskManager", function (a, b, c) {
    var d = a("lib/jquery"), e = {
        taskResult: {},
        taskList: [],
        add: function (a) { this.taskList.push(a); },
        run: function () {
            var a = this.taskList.shift();
            if (this.taskList.length > 0) {
                var b = this;
                setTimeout(function () { b.run(); }, 0);
            }
            var c = new Date, d = 0, e = null;
            try {
                a.run();
            } catch (f) {
                typeof console != "undefined" && console.error && console.error("error in task ", a.name, ":", f, f.stack), e = f;
            }
            d = new Date - c, this.taskResult[a.name] = { duration: d, result: e === null ? "success" : e.name + ":" + e.message + "|@|" + e.stack }, this.taskList.length !== 0;
        }
    };
    return e;
});
define("module/login/Login", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Cookie"), i = a("utils/DataSource"), j = a("utils/Error"), k = a("widget/tips/FastTips"), l = a("utils/suggest/EmailSuggest"), m = a("utils/Log"), n = e.extend({
        init: function (a, b) {
            this.$form = a, this.config = b || {}, this.$tips = this.$form.find(".js-tips"), this.$username = this.$form.find(".js-username"), this.$password = this.$form.find(".js-password"), this.$usernameLabel = this.$form.find(".js-usernameLabel"), this.$passwordLabel = this.$form.find(".js-passwordLabel"), this.$clearBtn = this.$form.find(".clear-trigger"), this.$saveLoginBtn = this.$form.find(".saveLogin-trigger"), this.$saveLoginElem = this.$saveLoginBtn.find("input"), this.$submitBtn = this.$form.find(".submit-trigger"), this.cookieLoginEmail = h.get("email") || "", this.bindEvent();
            var c = this;
            this.config.type === "login" ? setTimeout(function () { c.$username.val() === "" && c.cookieLoginEmail !== "" && c.$username.val(c.cookieLoginEmail), c.setDefaultVal(); }, 80) : c.setDefaultVal();
        },
        bindEvent: function () {
            var a = this;
            /*去掉自动补全邮箱后缀功能*/
            //new l(this.$username, { title: "\u8bf7\u9009\u62e9\u6216\u7ee7\u7eed\u8f93\u5165...", className: "email-suggest" }),
            this.$username.bind("paste cut input keyup", d.proxy(this.checkUserNameEmpty, this)), this.$password.bind("paste cut input keyup", d.proxy(this.checkPasswordEmpty, this)), this.$usernameLabel.bind("click", function () { a.$username.focus(); }), this.$passwordLabel.bind("click", function () { a.$password.focus(); }), this.$clearBtn.bind("click", function () { a.$username.val(""), a.$usernameLabel.show(), a.$clearBtn.addClass("hidden"); }), this.$saveLoginBtn.bind("click", d.proxy(this.toggleSave, this)).trigger("click"), this.$submitBtn.bind("click", d.proxy(this.onSubmit, this)), this.$username.bind("keypress", function (b) {
                var c = b.which || b.keyCode;
                c === 13 && (d.trim(a.$password.val()) === "" ? a.$password.focus() : a.onSubmit(b));
            }), this.$password.bind("keypress", function (b) {
                var c = b.which || b.keyCode;
                c === 13 && a.onSubmit(b);
            });
        },
        setDefaultVal: function () {
            var a = this;
            a.$username.val() === "" ? a.$usernameLabel.show() : a.$clearBtn.removeClass("hidden"), a.$password.val() === "" && a.$passwordLabel.show();
        },
        onSubmit: function (a) {
            this.getData();
            !this.onCheckVals() || (h.set("email", this.username, 365), a && m.doLog({ parameter: { method: "login" }, elem: d(a.target) }), this.$form.submit());
        },
        toggleSave: function () { this.$saveLoginBtn.toggleClass("selected"), this.$saveLoginBtn.hasClass("selected") ? this.$saveLoginElem.attr("checked", !0) : this.$saveLoginElem.attr("checked", !1); },
        checkUserNameEmpty: function () {
            var a = d.trim(this.$username.val());
            a !== "" ? (this.$usernameLabel.hide(), this.$clearBtn.removeClass("hidden")) : (this.$usernameLabel.show(), this.$clearBtn.addClass("hidden"));
        },
        checkPasswordEmpty: function () {
            var a = this.$password.val();
            a !== "" ? this.$passwordLabel.hide() : this.$passwordLabel.show();
        },
        getData: function () { this.username = d.trim(this.$username.val()), this.password = d.trim(this.$password.val()); },
        onCheckVals: function () {
            if (this.username === "") {
                g.textTips(this.$tips, "error", "\u901a\u884c\u8bc1\u6216\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a"), this.$username.focus();
                return !1;
            }
            if (this.password === "") {
                g.textTips(this.$tips, "error", "\u901a\u884c\u8bc1\u6216\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a"), this.$password.focus();
                return !1;
            }
            /*去掉邮箱验证*/
            //if (!this.username.match(g.EMAIL_REG) && !this.username.match(g.MOBILE_REG)) {
            //    g.textTips(this.$tips, "error", "\u901a\u884c\u8bc1\u7684\u683c\u5f0f\u4e0d\u5bf9");
            //    return !1;
            //}
            return !0;
        },
        hideTips: function () { g.textTips(this.$tips, "hide"); }
    });
    return n;
});
typeof process != "undefined" && (process.title === "node" || process.title === "grunt") && (define = function (a) { exports.formatTemplate = a().formatTemplate, exports.replaceString = a().replaceString; }), define("utils/tmpl", function (a, b, c) {
    function n(a, b) {
        b = b || {};
        if (typeof a == "function") return a(b);
        return m(a, b);
    }

    function m(a, b) {
        var c = "", e = /^[a-zA-Z0-9\/]+?$/.test(a) ? d[a] = d[a] || m(document.getElementById("tmpl_" + a).innerHTML) : new Function("tmplData", "tmpl", l(a));
        if (b)
            try {
                return e(b, n);
            } catch (f) {
                typeof console !== undefined && console.error && console.error("error in templates ", a, ":", f, f.stack);
            }
        return e;
    }

    function l(a) { return "var p=[];tmplData = tmplData || {}; with(tmplData){p.push('" + a.replace(f, "").replace(g, "").replace(e, " ").replace(h, ">$1<").split("<%").join("\t").replace(i, "$1\r").replace(j, "',$1,'").split("\t").join("');\n").split("%>").join("\np.push('").split("\r").join("\\'") + "');}return p.join('');"; }

    function k() {
        var a = {};
        for (var b = 0; b < arguments.length; b++) {
            var c = arguments[b];
            if (c && typeof c == "object") for (var d in c) c[d] !== undefined && c.hasOwnProperty(d) && (a[d] = c[d]);
        }
        return a;
    }

    var d = {}, e = /[\r\t\n]/g, f = /^\s+/, g = /\s+$/, h = />\s*(.*?)\s*</g, i = /((^|%>)[^\t]*)'/g, j = /\t=(.*?)%>/g;
    return { formatTemplate: n, replaceString: l };
});
define("utils/Utils", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = d(window), f = d(document.body), g = a("utils/OimageUrl"), h = a("utils/Log"), i = {};
    i.ARROW_LEFT_CODE = 37, i.ARROW_RIGHT_CODE = 39, i.ARROW_UP_CODE = 38, i.ARROW_DOWN_CODE = 40, i.ENTER_CODE = 13, i.tipsHideInterval = 2e3, i.MIN_PICSIZE = 10240, i.MAX_PICSIZE = 8388608, i.EMAIL_REG = /^[a-zA-Z0-9_\-\.]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/, i.NICKNAME_REG = /^[\u4e00-\u9fa5\w_]+$/i, i.REALNAME_REG = /^[\u4e00-\u9fa5a-z ]+$/i, i.COMPANY_REG = /^[^<>]+$/i, i.SCHOOL_REG = /^[\u4e00-\u9fa5（）()\w ]*$/i, i.MOBILE_REG = /^0*(13|14|15|18)\d{9}$/, i.MOBILECODE_REG = /^[0-9]{6}$/, i.IDCARD_REG = /^(\d{18,18}|\d{15,15}|\d{17,17}[xX])$/, i.VERIFYCODE_REG = /^[\w]{5}$/, i.INVITECODE_REG = /^[\w]{4,10}$/, i.IMG_FILE_REG = /^image\/\w+$/, i.URL_REG = /^(http)s?:\/\/(?:[\w-]+\.?)+[\.\/\?%&=#@\[\]\-+_!:*~\w-]+|(www)\.(?:[\w-]+\.?)+[\.\/\?%&=#@\[\]\-+_!:*~\w-]+$/i, i.FULLWIDTH_REG = /[\uFE30-\uFFA0\u2E80-\u9FFF\uac00-\ud7ff\u3000‘“”’]/g, i.AVATAR_VER = "131210", i.isIe6 = d.browser.msie && d.browser.version < 7 ? !0 : !1;
    var j = '<div class="loadingBox"><span><em class="icon-loadingB"></em>$TEXT$</span></div>';
    i.LOADING_BIG = function (a) {
        a = a || "\u52a0\u8f7d\u4e2d...";
        return j.replace("$TEXT$", a);
    };
    var k = '<div class="loadingBoxS"><span><em class="icon-loadingS"></em>$TEXT$</span></div>';
    i.LOADING_SMALL = function (a) {
        a = a || "\u52a0\u8f7d\u4e2d...";
        return k.replace("$TEXT$", a);
    }, i.S4 = function () { return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1); }, i.N5 = function () { return ((1 + Math.random()) * 65536 | 0).toString(8).substring(1); }, i.pageWidth = function () { return parseFloat(document.documentElement.clientWidth); }, i.pageHeight = function () { return Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight); }, i.pageMaxHeight = function () { return Math.max(d(window).height(), d(document).height()); }, i.getXY = function (a) {
        var b = a.offsetLeft, c = a.offsetTop;
        while ((a = a.offsetParent) != null) b += a.offsetLeft, c += a.offsetTop;
        return { top: c, left: b };
    }, i.autoClose = function (a, b) {
        var c = a || this.$elem, e = b || this.$trigger, g = this, h = function (a) {
            var b = d(a.target).parents().andSelf();
            d.inArray(c[0], b) === -1 && d.inArray(e[0], b) === -1 && g.hide(a);
        };
        setTimeout(function () { f.bind("click", h); }, 0);
        return h;
    }, i.random = function (a) { return Math.floor(a * (Math.random() % 1)); }, i.randomOimageUrl = function () {
        var a = {};
        return function (b, c, d, e, f, g) {
            if (typeof b != "string" || b === "") throw "Oimage Url is Error!!!";
            var h = b + "|" + c + "|" + d + "|" + e + "|" + g + "|" + f;
            if (!a[h]) {
                b = i.encodeSpecialHtmlChar(b);
                var j = b.lastIndexOf(".");
                j = b.substr(j - 1, 1), j < 0 && (j = b.length - 1);
                var k = String(j).charCodeAt() % 2 + 1, l = "http://htimg" + k + ".cache.netease.com/image?" + (typeof c == "number" ? "w=" + c : "") + (typeof d == "number" ? "&h=" + d : "") + "&url=" + encodeURIComponent(b) + "&gif=" + (e ? 0 : 1) + "&quality=" + (f ? f : 85);
                typeof g != "undefined" && (l += "&fill=0"), a[h] = l;
            }
            return a[h];
        };
    }(), i.buildCursor = function (a) { return a.timestamp; }, i.updateNewCount = function (a, b, c) { b = parseInt(b), b !== 0 ? (b = b > 99 ? "99+" : b, b = c ? "(" + b + ")" : b, a.addClass("show").find(".js-item").text(b)) : a.removeClass("show"); }, i.parseURL = function (a) {
        var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/, c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"], d = b.exec(a), e = {};
        for (var f = 0, g = c.length; f < g; f++) e[c[f]] = d[f] || "";
        return e;
    }, i.encodeSpecialHtmlChar = function (a) {
        if (a) {
            a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return a;
        }
        return "";
    }, i.decodeSpecialHtmlChar = function (a) {
        if (a) {
            var b = ["&quot;", "&amp;", "&lt;", "&gt;"], c = ['"', "&", "<", ">"], d = c.length;
            for (var e = 0; e < d; e++) a = a.replace(new RegExp(b[e], "g"), c[e]);
            return a;
        }
        return "";
    }, i.countChars = function (a, b, c, e) {
        if (a) {
            var f = i.strLen(a), g = [], h = 0;
            if (e) {
                var j = d("<div></div>").html(a);
                a = j.text(), j = null;
            }
            if (f <= b) return a;
            for (var k = 0; k < f; k++) {
                var l = a.charAt(k);
                /[^\x00-\xff]/.test(l) ? h += 2 : h += 1;
                if (h > b) break;
                g.push(l);
            }
            return c ? g.join("") : g.join("") + "...";
        }
        return "";
    }, i.strLen = function (a) {
        var b = a.replace(/[^\x00-\xff\s]/g, "**").length;
        return b;
    }, i.textTips = function (a, b, c) {
        var c = c || "";
        typeof b == "undefined" || b === "hide" ? a.addClass("hidden") : b === "error" ? a.removeClass("text-icon-tips-warning text-icon-tips-access text-icon-tips-pass text-icon-tips-help hidden").addClass("text-icon-tips-error").html('<em class="icon-error-s"></em>' + c) : b === "warning" ? a.removeClass("text-icon-tips-error text-icon-tips-access text-icon-tips-pass text-icon-tips-help hidden").addClass("text-icon-tips-warning").html('<em class="icon-warning-s"></em>' + c) : b === "pass" ? a.removeClass("text-icon-tips-error text-icon-tips-warning text-icon-tips-access text-icon-tips-help hidden").addClass("text-icon-tips-pass").html(c || '<em class="icon-correct-m"></em>') : b === "help" ? a.removeClass("text-icon-tips-error text-icon-tips-warning text-icon-tips-access text-icon-tips-pass hidden").addClass("text-icon-tips-help").html('<em class="icon-help"></em>' + c) : b === "access" && a.removeClass("text-icon-tips-error text-icon-tips-warning text-icon-tips-pass text-icon-tips-help hidden").addClass("text-icon-tips-access").html('<em class="icon-correct-s"></em>' + c);
    }, i.selectValue = function (b, c, d, e) {
        var f = a("utils/data/selectData"), e = e || "";
        if (parseInt(c) === 0 || c === "") return typeof d == "undefined" ? "\u672a\u8bbe\u7f6e" : d === !1 ? "" : d;
        if (b === "province") return f.city.all()[c];
        if (b === "city") {
            var g = c.split(/[-_~]/), h = g[0], i = g[1], j = "";
            parseInt(i) !== 0 && i !== "" && (j = f.city.city[h][i]);
            return j;
        }
        return f[b][c] + e;
    }, i.specialCity = function (b, c) {
        var d = a("utils/data/selectData");
        if (d.city.specialCity[b]) return d.city.specialCity[b];
        return i.selectValue("city", b + "-" + c);
    }, i.replaceEmpty = function (a, b, c) {
        var c = c || "";
        return !a || a === "" ? b ? b : "\u672a\u8bbe\u7f6e" : a + c;
    }, i.reqSelectValue = function (b, c, d, e, f, g) {
        var h = e ? "<" + e + ">" : "", i = e ? "</" + e + ">" : "", f = f || "", j = a("utils/data/selectData"), k = parseInt(c), l = parseInt(d);
        if (b === "age" || b === "height") b = !1;
        if (k === 0 && l !== 0) return h + (b ? j[b][l] : l) + i + f + "\u4ee5\u4e0b";
        if (k !== 0 && l === 0) return h + (b ? j[b][k] : k) + i + f + "\u4ee5\u4e0a";
        if (k !== 0 && l !== 0) {
            var m = h + (b ? j[b][k] : k) + "\u5230" + (b ? j[b][l] : l) + i + f;
            return g ? m : m + "\u4e4b\u95f4";
        }
        return "\u4e0d\u9650";
    }, i.constellationValue = function (b) {
        if (b.length === 12) return "\u661f\u5ea7\u4e0d\u9650";
        var c = a("utils/data/selectData"), d = [];
        for (var e = 0; e < b.length; e++) d[e] = c.constellation[b[e]] + "\u5ea7";
        return d.join("\uff0c");
    }, i.educationValue = function (b, c) {
        if (parseInt(b) === 1 && c) return "\u5b66\u5386\u4e0d\u9650";
        var d = "", e = a("utils/data/selectData");
        d = e.education[b] || "\u5b66\u5386", d = parseInt(b) !== 0 && c ? d + "\u53ca\u4ee5\u4e0a" : d;
        return d;
    }, i.cityValue = function (a, b) { return i.selectValue("province", a, !1) + i.selectValue("city", a + "-" + b, !1); }, i.userSexName = function (a) {
        a = parseInt(a);
        if (a === 1) return "\u4ed6";
        if (a === 2) return "\u5979";
        return "";
    }, i.userSexTitle = function (a) {
        a = parseInt(a);
        if (a === 1) return "\u7537";
        if (a === 2) return "\u5973";
        return "";
    }, i.defaultAvatars = { 1: "http://img1.cache.netease.com/love/image/common/avatar/default_male_big.png", 2: "http://img1.cache.netease.com/love/image/common/avatar/default_female_big.png" }, i.userAvatar = function (a, b, c, d) {
        var e = "";
        typeof arguments[0] == "object" ? e = a.url ? a.url : i.defaultAvatars[a.sex] || i.defaultAvatars[1] : typeof arguments[0] == "string" && (e = a !== "" ? a : i.defaultAvatars[c] || i.defaultAvatars[1]);
        return g(e, b, b, 1, 85, d);
    }, i.tmpl = function (a, b) {
        var c = /\W/.test(a) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : i.cache[a] = i.cache[a] || i.tmpl(document.getElementById(a).innerHTML);
        return b ? c(b) : c;
    }, i.preLoadSWF = function (b, c) {
        var e = i.S4(), g = d('<div style="width:1px;height:1px;position:absolute;left:-9999px;"><div id="' + e + '"></div></div>').appendTo(f);
        a("lib/swfobject").embedSWF(b, e, 1, 1, "10.1.0", "", "", "", "", function (a) {
            if (a.success)
                var b = d("#" + e)[0], f = setInterval(function () {
                    try {
                        b.PercentLoaded() === 100 && (clearInterval(f), c && c({ success: !0 }), g.remove());
                    } catch (a) {
                    }
                }, 20);
            else c && c({ success: !1 }), g.remove();
        });
    }, i.snsShare = function (a, b, c) {
        var d = { 163: { url: "http://t.163.com/article/user/checkLogin.do?", link: "link", source: "source", title: "info", images: "images", togImg: "togImg", key: "key" }, tqq: { url: "http://share.v.t.qq.com/index.php?c=share&a=index&", link: "url", title: "title", pic: "pic", appkey: "appkey" }, weibo: { url: "http://service.weibo.com/share/share.php?", link: "url", source: "source", title: "title", images: "pic", key: "appkey" }, qzone: { url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?", link: "url", title: "title", pics: "pics", desc: "desc", summary: "summary" }, renren: { url: "http://widget.renren.com/dialog/share?", link: "link", title: "title", images: "images", desc: "description" }, douban: { url: "http://shuo.douban.com/!service/share?", link: "href", title: "name" } }, e = c.width || 700, f = c.height || 600;
        a.bind("click", function (a) {
            var g = d[b].url, h = [];
            c.link && (c.link += "?vendor=sns.share&utm_source=sns&utm_campaign=sns.share");
            for (var i in c) d[b][i] && h.push(d[b][i] + "=" + encodeURIComponent(c[i]));
            window.open(g + h.join("&"), "_blank", "width=" + e + ",height=" + f);
        });
    }, i.qaShare = function (a, b) {
        var c = a.width || 700, e = a.height || 600, f = [];
        for (var g in a) f.push(g + "=" + encodeURIComponent(a[g]));
        window.open("/question/share?" + f.join("&"), "_blank", "width=" + c + ",height=" + e), h.doLog({ parameter: { method: "qashare" }, elem: d(b.currentTarget) });
    }, i.captureShare = function (a) {
        var a = d.extend({ param: {}, width: 700, height: 600, url: "", method: "", elem: null }, a);
        a.elem.delegate(".weibo-trigger, .txweibo-trigger, .douban-trigger, .qzone-trigger, .renren-trigger", "click", function (b) {
            var c = d(b.currentTarget), e = "weibo";
            c.hasClass("txweibo-trigger") ? e = "txweibo" : c.hasClass("douban-trigger") ? e = "douban" : c.hasClass("qzone-trigger") ? e = "qzone" : c.hasClass("renren-trigger") && (e = "renren"), a.param.type = e;
            var f = [];
            for (var g in a.param) f.push(g + "=" + encodeURIComponent(a.param[g]));
            window.open(a.url + "?" + f.join("&"), "_blank", "width=" + a.width + ",height=" + a.height), a.method && h.doLog({ parameter: { method: a.method }, elem: c });
        });
    }, i.createTextarea = function (a) {
        var b = a.textarea || null, c = d(document.createElement("TEXTAREA"));
        c.css({ height: "0", position: "absolute", left: "-50000px", top: "-10000px", visibility: "hidden" }), setTimeout(function () { c.css({ fontSize: b.css("fontSize"), fontFamily: b.css("fontFamily"), fontWeight: b.css("fontWeight"), lineHeight: b.css("lineHeight"), "padding-top": b.css("padding-top"), "padding-bottom": b.css("padding-bottom"), "padding-left": b.css("padding-left"), "padding-right": b.css("padding-right"), overflow: "hidden", wordBreak: b.css("wordBreak"), wordWrap: b.css("wordWrap"), width: b.css("width") }); }, 30), f.append(c);
        return c;
    }, i.createSpan = function (a) {
        var b = a.textarea || null, c = d(document.createElement("SPAN"));
        setTimeout(function () { c.css({ fontSize: b.css("fontSize"), fontFamily: b.css("fontFamily"), fontWeight: b.css("fontWeight"), lineHeight: b.css("lineHeight"), position: "absolute", top: "-20000px", left: "-10000px", visibility: "hidden" }); }, 50), f.append(c);
        return c;
    }, i.textAutoBreak = function (a, b, c) {
        var d = c.tempSpanElem, e = c.tempTextareaElem, f = a.split("\n"), g = [], b = b || 474, h = c.start || 0;
        for (var j = 0; j < f.length; j++) {
            var k = f[j];
            k === "" ? g.push("") : d.text(k).width() > b ? g.push(i.breakLongText(e, k, b)) : g.push(k);
        }
        return g.join("\n");
    }, i.breakLongText = function (a, b, c) {
        a.val(" ");
        var d = a[0].scrollHeight, e = [], f = "", g = "";
        for (var h = 0, i = b.length; h < i; h++) {
            f = f + b.charAt(h);
            var j = a.val(f)[0].scrollHeight;
            j > d && (e.push(f.substring(0, f.length - 1)), e.push("\n"), f = f.substring(f.length - 1, f.length), d = a.val("")[0].scrollHeight), h === i - 1 && e.push(f);
        }
        return e.join("");
    }, i.btnSending = function (a) { this.sendBtnDefaultText = a.text(), a.html(a.data("loadingtext")), a.parents(".js-btn:first").addClass("disabled"); }, i.btnSended = function (a) { a.text(this.sendBtnDefaultText), a.parents(".js-btn:first").removeClass("disabled"); }, i.cookieStr = function (a, b, c, d) {
        var e = "";
        if (c) {
            var f = 0, g = new Date;
            c === "today" && (c = 1, f = g.getHours() * 3600 + g.getMinutes() * 60 + g.getSeconds()), g.setTime(g.getTime() + c * 24 * 60 * 60 * 1e3 - f * 1e3), e = "; expires=" + g.toGMTString();
        }
        var h = a + "=" + b + e + "; path=/";
        h = d ? h + ";domain=" + d : h;
        return h;
    }, i.formRedirect = function (a, b, c, e) {
        var g = d("<form></form>");
        g.attr("target", b || "_blank"), g.attr("method", c || "GET"), g.attr("action", a);
        var h = [];
        d.each(e, function (a, b) { h.push('<input type="hidden" name="' + a + '" value="' + b + '" />'); }), g.html(h.join("")), f.append(g), g.submit(), setTimeout(function () { g.remove(); }, 100);
    }, i.isPlaceholderSupport = function () { return "placeholder" in document.createElement("input"); }(), i.placeholder = function (a) {
        if (!i.isPlaceholderSupport) {
            var b = a.attr("placeholder");
            i.inputDefaultVal(a, b);
        }
    }, i.inputDefaultVal = function (a, b) { typeof b != "undefined" && b !== "" && (a.bind("focus", function () { d.trim(a.val()) === b && a.val(""); }).bind("blur", function () { d.trim(a.val()) === "" && a.val(b); }), d.trim(a.val()) === "" && a.val(b)); }, i.bindInput = function (a, b) {
        var c = parseInt(a.data("bindenter")) || 0, e = parseInt(a.data("maxlength")) || 0;
        c === 1 && a.bind("keypress", function (c) {
            var e = c.which || c.keyCode;
            e === i.ENTER_CODE && b && b(d.trim(a.val()));
        }), e !== 0 && a.bind("input propertychange", function (b) {
            var c = i.countChars(a.val(), e, !0);
            c !== a.val() && a.val(c);
        });
    }, i.supportCSS3 = function (a) {
        var b = document.createElement("div"), c = ["O", "Moz", "ms", "webkit"], d = c.length;
        if (a in b.style) return !0;
        a = a.replace(/^[a-z]/, function (a) { return a.toUpperCase(); });
        while (d--) if (c[d] + a in b.style) return !0;
        return !1;
    }, i.bindNumAnimation = function (a, b) {
        var b = d.extend({ interval: 10, multiple: .2, callback: null, elem: null }, b), c = {
            sumNum: 0,
            left_num: null,
            interval: null,
            doSum: function () { this.left_num !== 0 ? (this.sumNum = this.left_num !== null ? this.sumNum + Math.ceil(this.left_num * b.multiple) : Math.ceil(a * b.multiple), this.left_num = a - this.sumNum, b.callback && b.callback({ sumNum: this.sumNum }), b.elem && b.elem.text(this.sumNum)) : clearInterval(this.interval); },
            start: function () {
                var c = this;
                a !== 0 && (this.interval = setInterval(function () { c.doSum(); }, b.interval));
            },
            stop: function () { clearInterval(this.interval); }
        };
        return c;
    }, i.commaNumber = function (a) {
        var b = String(a).split("."), c = function (a) { return a.length <= 3 ? a : c(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3); };
        b[0] = c(b[0]);
        return b.join(".");
    }, i.formatFloat = function (a, b) {
        var c = Math.pow(10, b);
        return parseInt(a * c, 10) / c;
    }, i.formatTime = function (a, b) {
        var c = parseInt(a / 3600) % 24, d = parseInt(a / 60) % 60, e = parseInt(a % 60);
        c = c < 10 ? "0" + c : c, d = d < 10 ? "0" + d : d, e = e < 10 ? "0" + e : e, c = String(c), d = String(d), e = String(e);
        return { hour: c === "NaN" ? "00" : c, min: d === "NaN" ? "00" : d, second: e === "NaN" ? "00" : e };
    }, i.bindFloatElemAnim = function (a) {
        var b = d.extend({ dura: 1e3 }, a), c = b.targetElem;
        c.bind(b.event, function (a, e) {
            var f = c.offset(), g = d('<span style="position:absolute;left:' + f.left + "px;top:" + f.top + 'px;opacity:0;">' + e.text + "</span>").appendTo("body");
            g.css({ fontSize: c.css("fontSize"), fontFamily: c.css("fontFamily"), fontWeight: c.css("fontWeight"), color: c.css("color"), top: parseInt(g.css("top")) - g.innerHeight() / 2 + "px" }), setTimeout(function () { g.animate({ top: "-=20", opacity: 1 }, b.dura).animate({ opacity: 0 }, 200, function () { g.remove(); }); }, 100);
        });
    }, i.BindCopy = function (a, b) { a.bind("click", function () { window.clipboardData ? (window.clipboardData.clearData(), window.clipboardData.setData("Text", d.trim(b.val()))) : b.setCaretTo(0, b.val().length); }); };
    return i;
});
define("utils/OimageUrl", function (a, b, c) {
    "use strict";
    var d = {}, e = function (a) {
        if (a) {
            a = a.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return a;
        }
        return "";
    }, f = function (a, b, c, e, f, g) {
        if (typeof a != "string" || a === "") throw "Oimage Url is Error!!!";
        if (!c || c === "") c = b;
        f = f || 85, g = g || 0;
        var e = typeof e == "number" && e === 1 ? 1 : 0, h = a + "|" + b + "|" + c + "|" + e + "|" + f + "|" + g;
        if (!d[h]) {
            a = a.replace(/#.+$/, "");
            var i = "http://imgsize.ph.126.net/?" + (g === 1 ? "enlarge=true&" : "") + "imgurl=" + a + "_" + b + "x" + c + "x" + e + "x" + f + ".jpg";
            d[h] = i;
        }
        return d[h];
    };
    return f;
});
define("utils/Log", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/data/RequestMap"), g = { pFeed: "pHome", pTrend: "pTrend", pNotify: "pMessage", pDigg: "pM_like", pHeed: "pM_followers", pMessage: "pM_talk", pPhoto: "pImage", pFollowing: "pFollowing", pFollower: "pFollower", pSearch: "pSearch", pLogin: "plogin", pSignfail: "pSign_fail", pIdcard: "pV_name", pMobile: "pV_mobile", pFace: "pS_face", pPassword: "pS_password", pMineProfile: "pMine", pUserProfile: "pUser", pUserCard: "pUserCard", pApp: "pApp", pSignup: "pSignup", pCharge: "charge", pChargeBill: "chargebill", pExpenseBill: "expensebill", pServices: "pVaservices", pPayHelp: "payitems", pOrderError: "paytrouble", pVisitor: "pM_visitor", pPark: "pPark", pQa: "pQa", pAstro: "pAstro", pInvite: "pInviteCard", pRecomm: "pXunrenlist", pSubject: "pXunrenpage", pEscape: "pParkescape", pAccount: "pAccount", pGiftReceive: "pM_gift", pDigging: "pM_digging", pDislike: "pDislike", pTopiclist: "pTopiclist", pTopic: "pTopic", pLovefm: "pLovefm", pLovefmGuest: "pLovefmguest", pInvite2013: "pInvite2013", pParty: "pParty", pPartyList: "pPartyList", pStar: "pStar", pBrowse: "pBrowse", pXy3: "pXy3", pParkNotice: "pM_topic", pFeng2014: "pFeng2014" }, h = { navi: "nav", avatar: "avatar", nickname: "nickname", userIntro: "intro", feeds: "feeds", feedFoot: "ugc", visitor: "visitor", basicInfoBox: "basicinfor", album: "album", requirement: "requirement", detailInfoBox: "exinfor", lifeViewBox: "view", monologBox: "monolog", corpinvite: "intrologin", ursLogin: "session", signupOpen: "nickname", signupAvatar: "avatar", signupVerified: "verified", updateie6: "updateie6", usertimeline: "usertimeline", userRecommend: "rec", edit: "edit", detail: "detail", loginBox: "quickLogin", app_iphone: "iphone", app_android: "android", login_app: "app", newQa: "newqa", nonQa: "nonqa", oldQa: "oldqa", skipQa: "skipqa", sameQa: "sameqa", qaSee: "qasee", qaUpdate: "qarec", photolayer: "piclayer", payNavi: "navi", payErrorTips: "paytips", visitorTips: "tips", visitorLimitTips: "limitTips", inviteSignup: "signup", inviteLogin: "login", inviteSignupLogin: "signup_logined", profilePhotolayer: "figure", subjectUser: "user", appQRBox: "appQR", feedVip: "feedfiltervip", rightVipRank: "rightviprank", rightToCharge: "righttocharge", qaPublishRight: "qa", publishRight: "right", goodNews: "rightAd_goodNews", rightvipad: "rightvipad", rightvipuser: "rightvipuser", rightAdAct: "rightAd_act", rightAd2: "rightAd_AD2", rightAd3: "rightAd_AD3", rightAdFocus: "rightAd_focus", bottomTips: "bottom", profileInfo: "infor", profileQa: "qa", opensvip: "openvip", openvip: "openvip", likeLimit: "favlimit", dislikeLimit: "hidelimit", likeNotice: "favnotice", profileOnline: "online", dmUpOpen: "dmup", hideNoticeOpen: "hide.notice", stickerOpen: "vipsticker", giftBoxOpen: "giftbox", diggOpen: "digg.notice", topic: "topic", lovefmUser: "user", openLogin: "login", openReg: "reg", focus: "focus" }, i = d.extend({}, g, h), j = [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image], k = function (a) { return Math.floor(a * (Math.random() % 1)); }, l = e.extend({
        init: function () {
        },
        keyFrom: function (a) {
            var b = d(a).first();
            if (b[0] === window) return "window";
            var c = d.map(b.parents().andSelf(), function (a) {
                var b = d(a);
                return b.data("keyfrom") || i[b.data("log")] || undefined;
            });
            return c.join(".");
        },
        getType: function (a) {
            var b = null;
            return ((b = typeof a) === "object" ? Object.prototype.toString.call(a).slice(8, -1) : b).toLowerCase();
        },
        paramConcat: function (a, b) {
            var c = "", e = "", f = !1;
            e = decodeURI(d(b).attr("href"));
            if (a && this.getType(a) === "object")
                for (var g in a)
                    if (g == "method" && a[g] == "") {
                        for (var h in this.methodFromMap) {
                            var i = new RegExp(h);
                            if (i.exec(e) != null) {
                                f = !0, c += "&" + g + "=" + this.methodFromMap[h];
                                break;
                            }
                        }
                        f || (c += "&" + g + "=click");
                    } else c += "&" + g + "=" + a[g];
            a && this.getType(a) === "string" && (c += "&" + a);
            return c;
        },
        doLog: function (a) {
            this.$elem = d(a.elem), this.parameter = a.parameter, a.path = a.path || "/page.do", a.path.indexOf("/") === -1 ? this.path = f[a.path].url : this.path = a.path;
            var b = "";
            if (this.path.indexOf("?") === -1) {
                var c = this.keyFrom(this.$elem);
                b = this.path + "?" + "keyfrom=" + c + this.paramConcat(this.parameter, this.$elem);
            } else {
                var c = this.keyFrom(this.$elem);
                b = this.path + "&" + "keyfrom=" + c + this.paramConcat(this.parameter, c);
            }
            this.send(b);
        },
        send: function (a) {
            if (typeof a == "undefined") throw "no valid logger address";
            var b = j[k(10)], c = "";
            a.match(/^http:\/\/.+/) ? c = a : c = "http://" + location.host + (/^\//.test(a) ? a : "/" + a), c += "&__rnd=" + (new Date).getTime(), b.src = c;
        }
    }), m = null;
    return {
        doLog: function (a) { m === null && (m = new l), m.doLog(a); },
        keyFrom: function (a) {
            m === null && (m = new l);
            return m.keyFrom(a);
        },
        send: function (a) {
            m === null && (m = new l);
            return m.send(a);
        }
    };
});
define("utils/data/RequestMap", function (a, b, c) {
    var d = { sendStatus: { url: "/trend/add", login: !0, silent: !0 }, feedList: { url: "/feed/list", login: !0, silent: !0 }, feedSecondLeft: { url: "/feed/secondsleft", login: !0, silent: !0 }, trendList: { url: "/trend/list", login: !0, silent: !0 }, userTrendList: { url: "/trend/usertimeline", login: !0, silent: !0, redirect: !0 }, addFav: { url: "/relation/follow", login: !0, silent: !0 }, cancelFav: { url: "/relation/unfollow", login: !0, silent: !0 }, addShield: { url: "/relation/reject", login: !0, silent: !0 }, addDigg: { url: "/messages/like/praise", login: !0, silent: !0 }, sayHi: { url: "/messages/like/sayHi", login: !0, silent: !0 }, loginUserInfo: { url: "/user/logininfo", login: !0, silent: !0 }, closeUser: { url: "/user/closeUser", login: !0, silent: !0 }, sendMess: { url: "/messages/add", login: !0, silent: !0 }, deleteMess: { url: "/messages/delete", login: !0, silent: !0 }, flushMessNewCount: { url: "/messages/flush", login: !0, silent: !0 }, messageList: { url: "/messages/dmTimeline", login: !0, silent: !0 }, deleteSession: { url: "/messages/deleteSession", login: !0, silent: !0 }, singleSession: { url: "/messages/singleSession", login: !0, silent: !0 }, newCount: { url: "/newCount", login: !0 }, newFeeds: { url: "/home/newFeeds", login: !0 }, newFeedsNew: { url: "/feed/newFeeds", login: !0 }, newTrends: { url: "/trend/newInfo", login: !0 }, trendDelete: { url: "/trend/delete", login: !0 }, heedList: { url: "/messages/followers/list", login: !0, silent: !0 }, diggList: { url: "/messages/like/praiseList", login: !0, silent: !0 }, parkNoticeList: { url: "/messages/park/list", login: !0, silent: !0 }, noticeList: { url: "/messages/notice", login: !0, silent: !0 }, cleanNotice: { url: "/messages/clean", login: !0, silent: !0 }, noticeSearch: { url: "/messages/search", login: !0, silent: !0 }, followingList: { url: "/following/list", login: !0, silent: !0 }, followerList: { url: "/followers/list", login: !0, silent: !0 }, getBigPhotoInfo: { url: "/photo/singlePhoto", login: !0, silent: !0, redirect: !0 }, deletePhoto: { url: "/photo/delete", login: !0, silent: !0 }, sliderPhotoList: { url: "/photo/list", login: !0, silent: !0, redirect: !0 }, segmentPhotoList: { url: "/photo/segmentPhotoList", login: !0, silent: !0, redirect: !0 }, settingProfilePhoto: { url: "/settings/avatars", login: !0, silent: !0, redirect: !0 }, profilePhotoList: { url: "/user/avatarList", login: !0, silent: !0, redirect: !0 }, getProfilePhotoInfo: { url: "/user/avatar", login: !0, silent: !0, redirect: !0 }, searchList: { url: "/search/user/list", login: !1, silent: !0 }, cityInfo: { url: "/user/addOtherCity", login: !1 }, visitorList: { url: "/messages/visitor/list", login: !0 }, visitors: { url: "/visitor/latestvisitor", login: !0 }, userGuide: { url: "/user/novice", login: !0 }, matchCondition: { url: "/match/require", login: !0, silent: !0, redirect: !0 }, matchAgree: { url: "/match/view", login: !0, silent: !0, redirect: !0 }, newUserGuideStep1: { url: "/user/addUser", login: !1, silent: !0 }, newUserGuideStep2: { url: "/user/registAvatar", login: !0 }, updateAvatar: { url: "/user/portraits", login: !0, silent: !0 }, updateBasicInfo: { url: "/user/updateUser", login: !0, silent: !0 }, updateLoverDesc: { url: "/user/require", login: !0, silent: !0 }, updateLifeView: { url: "/user/marrage", login: !0, silent: !0 }, verifyIdCard: { url: "/verifyName", login: !0, silent: !0 }, verifyMobile: { url: "/verifyMobile", login: !0, silent: !0 }, mobileCodeGender: { url: "/genMobileCodeNew", login: !1 }, companySuggest: { url: "/suggest/corp", login: !0 }, loginUpdateInfo: { url: "/user/addUser", login: !1 }, addToAlbum: { url: "/photo/add", login: !0 }, corpMailInvite: { url: "/user/inviteCode", login: !0 }, updateInviteCode: { url: "/user/updateCode", login: !1 }, updateMonolog: { url: "/user/monolog/update", login: !0, silent: !0 }, canMonologUpdate: { url: "/user/monolog/canupdate", login: !0, silent: !0 }, checkNickName: { url: "/user/checkName", login: !1 }, getEmotion: { url: "/emotion/getAll", login: !0 }, sendLetter: { url: "/trend/writeLoveNotes", login: !0, silent: !0 }, reportBlock: { url: "/blacklist/add", login: !0, silent: !0 }, cancelBlock: { url: "/blacklist/remove", login: !0, silent: !0 }, addAnswer: { url: "/question/answer", login: !0, silent: !0 }, skipQuestion: { url: "/question/skip", login: !0, silent: !0 }, newQuestion: { url: "/question/suggest", login: !0, silent: !0 }, questionRecommend: { url: "/question/suggestUserList", login: !0, silent: !0 }, questionList: { url: "/question/questionList", login: !0, silent: !0 }, compareList: { url: "/question/compareList", login: !0, silent: !0 }, unverifyWeibo: { url: "/user/verify/unverifyMicroblog", login: !0, silent: !0 }, unverifyDouban: { url: "/user/verify/unverifyDouban", login: !0, silent: !0 }, rightAds: { url: "/operation/rightAds", login: !0, silent: !0 }, goodNews: { url: "/operation/successfulStory", login: !0, silent: !0 }, rightActivities: { url: "/operation/activities", login: !1, silent: !0 }, payLogin: { url: "/pay/login", login: !0, silent: !0 }, saveNewOrder: { url: "/pay/saveNewOrder", login: !0, silent: !0 }, saveNewOrderForDeal: { url: "/pay/saveNewOrderForDeal", login: !0, silent: !0 }, chargeBillList: { url: "/pay/orderList", login: !0, silent: !0 }, expenseBillList: { url: "/pay/dealInfoList", login: !0, silent: !0 }, closeTrade: { url: "/pay/closeTrade", login: !0, silent: !0 }, closeDeal: { url: "/pay/closeDeal", login: !0, silent: !0 }, visitBuy: { url: "/pay/visitBuy", login: !0, silent: !0 }, informBuy: { url: "/pay/onlineRemindBuy", login: !0, silent: !0 }, loginRemind: { url: "/settings/onlineRemind/set", login: !0, silent: !0 }, createNewDeal: { url: "/pay/createNewDeal", login: !0, silent: !0 }, payDeal: { url: "/pay/deal", login: !0, silent: !0 }, signForCoin: { url: "/pay/signed", login: !0, silent: !0 }, astroSuggest: { url: "/park/astroSuggest", login: !0, silent: !0 }, companyNameVerify: { url: "/corp/getEmail", login: !0, silent: !0 }, companyMailVerify: { url: "/corp/emailAuth", login: !0, silent: !0 }, commitVerifyFile: { url: "/corp/imageAuth", login: !0, silent: !0 }, getChartlet: { url: "/chartlet/list", login: !0, silent: !0 }, createPresentDeal: { url: "/pay/createPresentDeal", login: !0, silent: !0 }, recommendList: { url: "/park/xunrenlist", login: !1, silent: !0 }, deblocking: { url: "/user/plead", login: !1, silent: !1 }, balloonBuy: { url: "/pay/buyService?serviceId=-6491788925688873261", login: !1, silent: !0 }, singlesDayBuy: { url: "/pay/buyService?serviceId=31890713254037487", login: !1, silent: !0 }, getGift: { url: "/gift/getGifts", login: !0, silent: !0 }, giftReceiveList: { url: "/messages/giftList", login: !0, silent: !0 }, giftBoxList: { url: "/gift/giftBoxList", login: !0, silent: !0 }, getTag: { url: "/tag/all", login: !0, silent: !0 }, saveTag: { url: "/tag/save", login: !0, silent: !0 }, vipBuy: { url: "/pay/buyTimeService", login: !0, silent: !0 }, upgradeVip: { url: "/deal/vip/upgradeVIPService", login: !0, silent: !0 }, createUpgradeDeal: { url: "/deal/vip/createNewUpgradeDeal", login: !0, silent: !0 }, diggingList: { url: "/messages/like/sendPraiseList", login: !0, silent: !0 }, unDislike: { url: "/dislike/unDislike", login: !0, silent: !0 }, dislikeList: { url: "/dislike/list", login: !0, silent: !0 }, topicList: { url: "/park/topic/list", login: !1, silent: !0 }, partyList: { url: "/park/partylist", login: !1, silent: !0 }, addTopicComment: { url: "/park/topic/comment/add", login: !0, silent: !0 }, deleteTopicComment: { url: "/park/topic/comment/delete", login: !0, silent: !0 }, topicCommentList: { url: "/park/topic/comment/list", login: !1, silent: !0 }, guestList: { url: "/park/lovefm/guestlist", login: !0, silent: !0 }, exchangeCoupon: { url: "/coupon/getCode", login: !0, silent: !0 }, couponConfirm: { url: "/coupon/exchange", login: !0, silent: !0 }, checkVerifyCode: { url: "/photo/checkVerifyCode", login: !1, silent: !1 }, partySignup: { url: "/park/party/apply", login: !0, silent: !0 }, topBannerList: { url: "/banner/homeTop", login: !0, silent: !0 }, topBannerClose: { url: "/banner/homeTop/close", login: !0, silent: !0 }, femaleStarList: { url: "/park/star/starlist", login: !1, silent: !0 }, maleStarList: { url: "/park/star/starlist", login: !1, silent: !0 }, getToShowInfo: { url: "/park/star/bid", login: !0, silent: !0 }, getRanking: { url: "/park/star/bidRank", login: !0, silent: !0 }, createStarDeal: { url: "/deal/star/createNewDeal", login: !0, silent: !0 }, xy3List: { url: "/park/active/xy3/list", login: !1, silent: !0 }, xy3JoinActive: { url: "/park/active/xy3/joinActive", login: !0, silent: !0 }, xy3Gift: { url: "/park/active/xy3/gifts", login: !1, silent: !0 }, xy3Digg: { url: "/park/active/xy3/digg", login: !1, silent: !0 }, blackedBy: { url: "/blackedBy", login: !0, silent: !0 }, topicTryAdd: { url: "/park/topic/comment/tryAdd", login: !0, silent: !0 }, feng2014NextQuestion: { url: "/park/active/feng2014/nextQuestion", login: !1, silent: !1 }, feng2014Answer: { url: "/park/active/feng2014/answer", login: !1, silent: !1 }, feng2014SuggestUsersList: { url: "/park/active/feng2014/suggestUsersList", login: !1, silent: !1 } };
    return d;
});
define("utils/data/selectData", function (a, b, c) {
    var d = a("lib/jquery"), e = {
        sex: { 1: "\u7537", 2: "\u5973" },
        openedCity: { "1-0": "\u5317\u4eac", "2-0": "\u4e0a\u6d77", "7-1": "\u5e7f\u5dde", "5-1": "\u676d\u5dde", "7-3": "\u6df1\u5733", "3-0": "\u5929\u6d25", "4-0": "\u91cd\u5e86", "5-0": "\u6d59\u6c5f", "6-0": "\u6c5f\u82cf", "7-0": "\u5e7f\u4e1c", "8-0": "\u798f\u5efa", "9-0": "\u6e56\u5357", "10-0": "\u6e56\u5317", "11-0": "\u8fbd\u5b81", "12-0": "\u5409\u6797", "13-0": "\u9ed1\u9f99\u6c5f", "14-0": "\u6cb3\u5317", "15-0": "\u6cb3\u5357", "16-0": "\u5c71\u4e1c", "17-0": "\u9655\u897f", "18-0": "\u7518\u8083", "19-0": "\u9752\u6d77", "20-0": "\u65b0\u7586", "21-0": "\u5c71\u897f", "22-0": "\u56db\u5ddd", "23-0": "\u8d35\u5dde", "24-0": "\u5b89\u5fbd", "25-0": "\u6c5f\u897f", "26-0": "\u4e91\u5357", "27-0": "\u5185\u8499\u53e4", "28-0": "\u5e7f\u897f", "29-0": "\u897f\u85cf", "30-0": "\u5b81\u590f", "31-0": "\u6d77\u5357", "32-0": "\u9999\u6e2f", "33-0": "\u6fb3\u95e8", "34-0": "\u53f0\u6e7e", "35-0": "\u6d77\u5916", "36-0": "\u5176\u4ed6" },
        education: { 1: "\u5927\u4e13\u4ee5\u4e0b", 2: "\u5927\u4e13", 3: "\u672c\u79d1", 4: "\u7855\u58eb", 5: "\u535a\u58eb" },
        industry: { 1: "\u8ba1\u7b97\u673a/\u4e92\u8054\u7f51/\u901a\u4fe1", 2: "\u516c\u52a1\u5458/\u4e8b\u4e1a\u5355\u4f4d", 3: "\u6559\u5e08", 4: "\u533b\u751f", 5: "\u62a4\u58eb", 6: "\u7a7a\u4e58\u4eba\u5458", 7: "\u751f\u4ea7/\u5de5\u827a/\u5236\u9020", 8: "\u5546\u4e1a/\u670d\u52a1\u4e1a/\u4e2a\u4f53\u7ecf\u8425", 9: "\u91d1\u878d/\u94f6\u884c/\u6295\u8d44/\u4fdd\u9669", 10: "\u6587\u5316/\u5e7f\u544a/\u4f20\u5a92", 11: "\u5a31\u4e50/\u827a\u672f/\u8868\u6f14", 12: "\u5f8b\u5e08/\u6cd5\u52a1", 13: "\u6559\u80b2/\u57f9\u8bad/\u7ba1\u7406\u54a8\u8be2", 14: "\u5efa\u7b51/\u623f\u5730\u4ea7/\u7269\u4e1a", 15: "\u6d88\u8d39\u96f6\u552e/\u8d38\u6613/\u4ea4\u901a\u7269\u6d41", 16: "\u9152\u5e97\u65c5\u6e38", 17: "\u73b0\u4ee3\u519c\u4e1a", 18: "\u5728\u6821\u5b66\u751f" },
        marriageStatus: { 1: "\u672a\u5a5a", 2: "\u79bb\u5f02", 3: "\u4e27\u5076", 4: "\u5df2\u5a5a" },
        marriageStatusFilter: { 1: "\u672a\u5a5a", 2: "\u79bb\u5f02", 3: "\u4e27\u5076" },
        lookingFor: { 1: "\u7ed3\u5a5a\u5bf9\u8c61", 2: "\u604b\u4eba", 3: "\u666e\u901a\u670b\u53cb", 4: "\u77e5\u5df1" },
        house: { 1: "\u5df2\u8d2d\u623f", 2: "\u79df\u623f", 3: "\u5355\u4f4d\u5bbf\u820d", 4: "\u548c\u5bb6\u4eba\u540c\u4f4f" },
        birthOrder: { 1: "\u72ec\u751f\u5b50\u5973", 2: "\u8001\u5927", 3: "\u8001\u4e8c", 4: "\u8001\u4e09", 5: "\u8001\u56db", 6: "\u8001\u4e94\u53ca\u66f4\u5c0f", 7: "\u8001\u5e7a" },
        childStatus: { 1: "\u65e0\u5c0f\u5b69", 2: "\u6709\u5c0f\u5b69\u5f52\u81ea\u5df1", 3: "\u6709\u5c0f\u5b69\u5f52\u5bf9\u65b9" },
        religion: { 1: "\u65e0\u5b97\u6559\u4fe1\u4ef0", 2: "\u5927\u4e58\u4f5b\u6559\u663e\u5b97", 3: "\u5927\u4e58\u4f5b\u6559\u5bc6\u5b97", 4: "\u5927\u4e58\u4f5b\u6559\u51c0\u5b97", 5: "\u5c0f\u4e58\u4f5b\u6559", 6: "\u9053\u6559", 7: "\u5112\u6559", 8: "\u57fa\u7763\u6559\u5929\u4e3b\u6559\u6d3e", 9: "\u57fa\u7763\u6559\u4e1c\u6b63\u6559\u6d3e", 10: "\u57fa\u7763\u6559\u65b0\u6559\u6d3e", 11: "\u72b9\u592a\u6559", 12: "\u4f0a\u65af\u5170\u6559\u4ec0\u53f6\u6d3e", 13: "\u4f0a\u65af\u5170\u6559\u900a\u5c3c\u6d3e", 14: "\u5370\u5ea6\u6559", 15: "\u795e\u9053\u6559", 16: "\u8428\u6ee1\u6559", 17: "\u5176\u4ed6\u6559\u6d3e" },
        car: { 1: "\u5df2\u8d2d\u8f66", 2: "\u672a\u8d2d\u8f66" },
        blood: { 1: "A", 2: "B", 3: "AB", 4: "O" },
        nationality: { 1: "\u6c49", 2: "\u8499\u53e4", 3: "\u56de", 4: "\u85cf", 5: "\u7ef4\u543e\u5c14", 6: "\u82d7", 7: "\u5f5d", 8: "\u58ee", 9: "\u5e03\u4f9d", 10: "\u671d\u9c9c", 11: "\u6ee1", 12: "\u4f97", 13: "\u7476", 14: "\u767d", 15: "\u571f\u5bb6", 16: "\u54c8\u5c3c", 17: "\u54c8\u8428\u514b", 18: "\u50a3", 19: "\u9ece", 20: "\u5088\u50f3", 21: "\u4f64", 22: "\u7572", 23: "\u9ad8\u5c71", 24: "\u62c9\u795c", 25: "\u6c34", 26: "\u4e1c\u4e61", 27: "\u7eb3\u897f", 28: "\u666f\u9887", 29: "\u67ef\u5c14\u514b\u5b5c", 30: "\u571f", 31: "\u8fbe\u65a1\u5c14", 32: "\u4eeb\u4f6c", 33: "\u7f8c", 34: "\u5e03\u6717", 35: "\u6492\u62c9", 36: "\u6bdb\u5357", 37: "\u4ee1\u4f6c", 38: "\u9521\u4f2f", 39: "\u963f\u660c", 40: "\u666e\u7c73", 41: "\u5854\u5409\u514b", 42: "\u6012", 43: "\u4e4c\u5b5c\u522b\u514b", 44: "\u4fc4\u7f57\u65af", 45: "\u9102\u6e29\u514b", 46: "\u5fb7\u6602", 47: "\u4fdd\u5b89", 48: "\u88d5\u56fa", 49: "\u4eac", 50: "\u5854\u5854\u5c14", 51: "\u72ec\u9f99", 52: "\u9102\u4f26\u6625", 53: "\u8d6b\u54f2", 54: "\u95e8\u5df4", 55: "\u73de\u5df4", 56: "\u57fa\u8bfa" },
        position: { 1: "\u666e\u901a\u804c\u5458", 2: "\u4e2d\u5c42\u7ba1\u7406\u8005", 3: "\u9ad8\u5c42\u7ba1\u7406\u8005", 4: "\u4f01\u4e1a\u4e3b", 5: "\u5b66\u751f" },
        salary: { "-1": "2000\u5143\u4ee5\u4e0b", 1: "2000-4000\u5143", 2: "4000-6000\u5143", 3: "6000-10000\u5143", 4: "10000-15000\u5143", 5: "15000-20000\u5143", 6: "20000-50000\u5143", 7: "50000\u5143\u4ee5\u4e0a" },
        salaryArray: [{ key: -1, val: "2000\u5143\u4ee5\u4e0b" }, { key: 1, val: "2000-4000\u5143" }, { key: 2, val: "4000-6000\u5143" }, { key: 3, val: "6000-10000\u5143" }, { key: 4, val: "10000-15000\u5143" }, { key: 5, val: "15000-20000\u5143" }, { key: 6, val: "20000-50000\u5143" }, { key: 7, val: "50000\u5143\u4ee5\u4e0a" }],
        searchSalaryArray: [{ key: -1, val: "2000\u5143\u4ee5\u4e0b" }, { key: 1, val: "2000\u5143\u4ee5\u4e0a" }, { key: 2, val: "4000\u5143\u4ee5\u4e0a" }, { key: 3, val: "6000\u5143\u4ee5\u4e0a" }, { key: 4, val: "10000\u5143\u4ee5\u4e0a" }, { key: 5, val: "15000\u5143\u4ee5\u4e0a" }, { key: 6, val: "20000\u5143\u4ee5\u4e0a" }, { key: 7, val: "50000\u5143\u4ee5\u4e0a" }],
        status: { 1: "\u5bfb\u89c5\u5bf9\u8c61\u4e2d", 3: "\u5df2\u6709\u5bf9\u8c61\uff0c\u4e0d\u518d\u5bfb\u89c5" },
        expDegree: { 1: "\u5927\u4e13\u53ca\u4ee5\u4e0a", 2: "\u672c\u79d1\u53ca\u4ee5\u4e0a", 3: "\u7855\u58eb\u53ca\u4ee5\u4e0a", 4: "\u535a\u58eb\u53ca\u4ee5\u4e0a" },
        expSalary: { "-1": 2e3, 1: 4e3, 2: 6e3, 3: 1e4, 4: 2e4, 5: 5e4 },
        expSalaryArray: [{ key: -1, val: 2e3 }, { key: 1, val: 4e3 }, { key: 2, val: 6e3 }, { key: 3, val: 1e4 }, { key: 4, val: 2e4 }, { key: 5, val: 5e4 }],
        cooking: { 1: "\u4f1a\u505a\u996d\uff0c\u5e0c\u671b\u5bf9\u65b9\u4e5f\u4f1a", 2: "\u4f1a\u505a\u996d\uff0c\u5bf9\u53e6\u4e00\u534a\u6ca1\u8981\u6c42", 3: "\u4e0d\u592a\u4f1a\uff0c\u5bf9\u53e6\u4e00\u534a\u6ca1\u8981\u6c42", 4: "\u4e0d\u592a\u4f1a\uff0c\u5e0c\u671b\u5bf9\u65b9\u53a8\u827a\u6bd4\u6211\u597d" },
        arrangement: { 1: "\u5de5\u4f5c\u65f6\u95f4\u56fa\u5b9a\uff0c\u4e0d\u63a5\u53d7\u5bf9\u65b9\u51fa\u5dee", 2: "\u5de5\u4f5c\u65f6\u95f4\u56fa\u5b9a\uff0c\u4e0d\u4ecb\u610f\u5bf9\u65b9\u51fa\u5dee", 3: "\u5de5\u4f5c\u7ecf\u5e38\u51fa\u5dee", 4: "\u5de5\u4f5c\u5076\u5c14\u51fa\u5dee" },
        smoking: { 1: "\u4e0d\u5438\u70df\uff0c\u4e14\u5f88\u53cd\u611f\u5438\u70df", 2: "\u4e0d\u5438\u70df\uff0c\u4f46\u4e5f\u4e0d\u53cd\u611f", 3: "\u5076\u5c14\u5438\u70df", 4: "\u7ecf\u5e38\u5438\u70df" },
        drink: { 1: "\u4e0d\u559d\u9152\uff0c\u4e14\u5f88\u53cd\u611f\u559d\u9152", 2: "\u4e0d\u559d\u9152\uff0c\u4f46\u4e5f\u4e0d\u53cd\u611f", 3: "\u793e\u4ea4\u9700\u8981\u65f6\u624d\u559d", 4: "\u7ecf\u5e38\u559d\u9152" },
        loveAndMarriage: { 1: "\u80fd\u63a5\u53d7\u95ea\u5a5a", 2: "\u4e00\u5e74\u5185", 3: "\u4e24\u5e74\u5185", 4: "\u4e09\u5e74\u53ca\u4ee5\u4e0a", 5: "\u6682\u65f6\u4e0d\u60f3\u7ed3\u5a5a" },
        needChild: { 1: "\u60f3\u8981\u5b69\u5b50", 2: "\u4e0d\u60f3\u8981\u5b69\u5b50", 3: "\u89c6\u60c5\u51b5\u800c\u5b9a" },
        withParents: { 1: "\u4e0d\u4ecb\u610f", 2: "\u4ecb\u610f" },
        housework: { 1: "\u8fd9\u662f\u59bb\u5b50\u7684\u5206\u5185\u4e8b", 2: "\u592b\u59bb\u5e73\u5747\u5206\u914d", 3: "\u8c01\u6709\u65f6\u95f4\u8c01\u505a", 4: "\u592b\u59bb\u5404\u81ea\u627f\u62c5\u81ea\u5df1\u64c5\u957f\u7684\u5bb6\u52a1" },
        financial: { 1: "\u7531\u592b\u59bb\u5171\u540c\u8ba1\u5212", 2: "\u592b\u59bb\u5404\u81ea\u652f\u914d\u5404\u81ea\u7684\u6536\u5165", 3: "\u7531\u59bb\u5b50\u6253\u7406", 4: "\u7531\u4e08\u592b\u6253\u7406" },
        constellation: { 1: "\u9b54\u7faf", 2: "\u6c34\u74f6", 3: "\u53cc\u9c7c", 4: "\u767d\u7f8a", 5: "\u91d1\u725b", 6: "\u53cc\u5b50", 7: "\u5de8\u87f9", 8: "\u72ee\u5b50", 9: "\u5904\u5973", 10: "\u5929\u79e4", 11: "\u5929\u874e", 12: "\u5c04\u624b" },
        zodiac: { 1: "\u9f20", 2: "\u725b", 3: "\u864e", 4: "\u5154", 5: "\u9f99", 6: "\u86c7", 7: "\u9a6c", 8: "\u7f8a", 9: "\u7334", 10: "\u9e21", 11: "\u72d7", 12: "\u732a" },
        height: function (a, b, c) {
            var d = {}, e = 1;
            b = b || 150, c = c || 210;
            for (var f = b; f <= c; f++) d[f] = f, e += 1;
            return d;
        },
        age: function (a, b, c) {
            var d = {}, e = 1;
            b = b || 18, c = c || 60;
            for (var f = b; f <= c; f++) d[f] = f, e += 1;
            return d;
        },
        city: { all: function () { return d.extend(this.mainland, this.overseas); }, mainland: { 1: "\u5317\u4eac", 2: "\u4e0a\u6d77", 3: "\u5929\u6d25", 4: "\u91cd\u5e86", 5: "\u6d59\u6c5f", 6: "\u6c5f\u82cf", 7: "\u5e7f\u4e1c", 8: "\u798f\u5efa", 9: "\u6e56\u5357", 10: "\u6e56\u5317", 11: "\u8fbd\u5b81", 12: "\u5409\u6797", 13: "\u9ed1\u9f99\u6c5f", 14: "\u6cb3\u5317", 15: "\u6cb3\u5357", 16: "\u5c71\u4e1c", 17: "\u9655\u897f", 18: "\u7518\u8083", 19: "\u9752\u6d77", 20: "\u65b0\u7586", 21: "\u5c71\u897f", 22: "\u56db\u5ddd", 23: "\u8d35\u5dde", 24: "\u5b89\u5fbd", 25: "\u6c5f\u897f", 26: "\u4e91\u5357", 27: "\u5185\u8499\u53e4", 28: "\u5e7f\u897f", 29: "\u897f\u85cf", 30: "\u5b81\u590f", 31: "\u6d77\u5357" }, overseas: { 32: "\u9999\u6e2f", 33: "\u6fb3\u95e8", 34: "\u53f0\u6e7e", 35: "\u6d77\u5916", 36: "\u5176\u4ed6\u5730\u533a" }, opened: { 1: "\u5317\u4eac", 2: "\u4e0a\u6d77", "7-1": "\u5e7f\u5dde", "5-1": "\u676d\u5dde", "7-3": "\u6df1\u5733" }, specialCity: { 1: "\u5317\u4eac", 2: "\u4e0a\u6d77", 3: "\u5929\u6d25", 4: "\u91cd\u5e86" }, specialCities: [1, 2, 3, 4, 32, 33, 34, 36], city: { 1: { 1: "\u4e1c\u57ce\u533a", 2: "\u897f\u57ce\u533a", 3: "\u5d07\u6587\u533a", 4: "\u5ba3\u6b66\u533a", 5: "\u671d\u9633\u533a", 6: "\u4e30\u53f0\u533a", 7: "\u77f3\u666f\u5c71\u533a", 8: "\u6d77\u6dc0\u533a", 9: "\u95e8\u5934\u6c9f\u533a", 10: "\u623f\u5c71\u533a", 11: "\u901a\u5dde\u533a", 12: "\u987a\u4e49\u533a", 13: "\u660c\u5e73\u533a", 14: "\u5927\u5174\u533a", 15: "\u6000\u67d4\u533a", 16: "\u5e73\u8c37\u533a", 17: "\u5bc6\u4e91\u53bf", 18: "\u5ef6\u5e86\u53bf" }, 2: { 1: "\u9ec4\u6d66\u533a", 2: "\u5362\u6e7e\u533a", 3: "\u5f90\u6c47\u533a", 4: "\u957f\u5b81\u533a", 5: "\u9759\u5b89\u533a", 6: "\u666e\u9640\u533a", 7: "\u95f8\u5317\u533a", 8: "\u8679\u53e3\u533a", 9: "\u6768\u6d66\u533a", 10: "\u95f5\u884c\u533a", 11: "\u5b9d\u5c71\u533a", 12: "\u5609\u5b9a\u533a", 13: "\u6d66\u4e1c\u65b0\u533a", 14: "\u91d1\u5c71\u533a", 15: "\u677e\u6c5f\u533a", 16: "\u9752\u6d66\u533a", 17: "\u5357\u6c47\u533a", 18: "\u5949\u8d24\u533a", 19: "\u5d07\u660e\u53bf" }, 3: { 1: "\u548c\u5e73\u533a", 2: "\u6cb3\u4e1c\u533a", 3: "\u6cb3\u897f\u533a", 4: "\u5357\u5f00\u533a", 5: "\u6cb3\u5317\u533a", 6: "\u7ea2\u6865\u533a", 7: "\u5858\u6cbd\u533a", 8: "\u6c49\u6cbd\u533a", 9: "\u5927\u6e2f\u533a", 10: "\u4e1c\u4e3d\u533a", 11: "\u897f\u9752\u533a", 12: "\u6d25\u5357\u533a", 13: "\u5317\u8fb0\u533a", 14: "\u6b66\u6e05\u533a", 15: "\u5b9d\u577b\u533a", 16: "\u5b81\u6cb3\u53bf", 17: "\u9759\u6d77\u53bf", 18: "\u84df\u53bf" }, 4: { 1: "\u4e07\u5dde\u533a", 2: "\u6daa\u9675\u533a", 3: "\u6e1d\u4e2d\u533a", 4: "\u5927\u6e21\u53e3\u533a", 5: "\u6c5f\u5317\u533a", 6: "\u6c99\u576a\u575d\u533a", 7: "\u4e5d\u9f99\u5761\u533a", 8: "\u5357\u5cb8\u533a", 9: "\u5317\u789a\u533a", 10: "\u4e07\u76db\u533a", 11: "\u53cc\u6865\u533a", 12: "\u6e1d\u5317\u533a", 13: "\u5df4\u5357\u533a", 14: "\u9ed4\u6c5f\u533a", 15: "\u957f\u5bff\u533a", 16: "\u7da6\u6c5f\u53bf", 17: "\u6f7c\u5357\u53bf", 18: "\u94dc\u6881\u53bf", 19: "\u5927\u8db3\u53bf", 20: "\u8363\u660c\u53bf", 21: "\u74a7\u5c71\u53bf", 22: "\u6881\u5e73\u53bf", 23: "\u57ce\u53e3\u53bf", 24: "\u4e30\u90fd\u53bf", 25: "\u57ab\u6c5f\u53bf", 26: "\u6b66\u9686\u53bf", 27: "\u5fe0\u53bf", 28: "\u5f00\u53bf", 29: "\u4e91\u9633\u53bf", 30: "\u5949\u8282\u53bf", 31: "\u5deb\u5c71\u53bf", 32: "\u5deb\u6eaa\u53bf", 33: "\u77f3\u67f1\u53bf", 34: "\u79c0\u5c71\u53bf", 35: "\u9149\u9633\u53bf", 36: "\u5f6d\u6c34\u53bf", 37: "\u6c5f\u6d25\u5e02", 38: "\u5408\u5ddd\u5e02", 39: "\u6c38\u5ddd\u5e02", 40: "\u5357\u5ddd\u5e02" }, 5: { 1: "\u676d\u5dde", 2: "\u5b81\u6ce2", 3: "\u6e29\u5dde", 4: "\u5609\u5174", 5: "\u6e56\u5dde", 6: "\u7ecd\u5174", 7: "\u91d1\u534e", 8: "\u8862\u5dde", 9: "\u821f\u5c71", 10: "\u53f0\u5dde", 11: "\u4e3d\u6c34" }, 6: { 1: "\u5357\u4eac", 2: "\u65e0\u9521", 3: "\u5f90\u5dde", 4: "\u5e38\u5dde", 5: "\u82cf\u5dde", 6: "\u5357\u901a", 7: "\u8fde\u4e91\u6e2f", 8: "\u6dee\u5b89", 9: "\u76d0\u57ce", 10: "\u626c\u5dde", 11: "\u9547\u6c5f", 12: "\u6cf0\u5dde", 13: "\u5bbf\u8fc1" }, 7: { 1: "\u5e7f\u5dde", 2: "\u97f6\u5173", 3: "\u6df1\u5733", 4: "\u73e0\u6d77", 5: "\u6c55\u5934", 6: "\u4f5b\u5c71", 7: "\u6c5f\u95e8", 8: "\u6e5b\u6c5f", 9: "\u8302\u540d", 10: "\u8087\u5e86", 11: "\u60e0\u5dde", 12: "\u6885\u5dde", 13: "\u6c55\u5c3e", 14: "\u6cb3\u6e90", 15: "\u9633\u6c5f", 16: "\u6e05\u8fdc", 17: "\u4e1c\u839e", 18: "\u4e2d\u5c71", 19: "\u6f6e\u5dde", 20: "\u63ed\u9633", 21: "\u4e91\u6d6e" }, 8: { 1: "\u798f\u5dde", 2: "\u53a6\u95e8", 3: "\u8386\u7530", 4: "\u4e09\u660e", 5: "\u6cc9\u5dde", 6: "\u6f33\u5dde", 7: "\u5357\u5e73", 8: "\u9f99\u5ca9", 9: "\u5b81\u5fb7" }, 9: { 1: "\u957f\u6c99", 2: "\u682a\u6d32", 3: "\u6e58\u6f6d", 4: "\u8861\u9633", 5: "\u90b5\u9633", 6: "\u5cb3\u9633", 7: "\u5e38\u5fb7", 8: "\u5f20\u5bb6\u754c", 9: "\u76ca\u9633", 10: "\u90f4\u5dde", 11: "\u6c38\u5dde", 12: "\u6000\u5316", 13: "\u5a04\u5e95", 14: "\u6e58\u897f" }, 10: { 1: "\u6b66\u6c49", 2: "\u9ec4\u77f3", 3: "\u5341\u5830", 4: "\u5b9c\u660c", 5: "\u8944\u6a0a", 6: "\u9102\u5dde", 7: "\u8346\u95e8", 8: "\u5b5d\u611f", 9: "\u8346\u5dde", 10: "\u9ec4\u5188", 11: "\u54b8\u5b81", 12: "\u968f\u5dde", 13: "\u6069\u65bd", 14: "\u4ed9\u6843", 15: "\u6f5c\u6c5f", 16: "\u5929\u95e8", 17: "\u795e\u519c\u67b6" }, 11: { 1: "\u6c88\u9633", 2: "\u5927\u8fde", 3: "\u978d\u5c71", 4: "\u629a\u987a", 5: "\u672c\u6eaa", 6: "\u4e39\u4e1c", 7: "\u9526\u5dde", 8: "\u8425\u53e3", 9: "\u961c\u65b0", 10: "\u8fbd\u9633", 11: "\u76d8\u9526", 12: "\u94c1\u5cad", 13: "\u671d\u9633", 14: "\u846b\u82a6\u5c9b" }, 12: { 1: "\u957f\u6625", 2: "\u5409\u6797", 3: "\u56db\u5e73", 4: "\u8fbd\u6e90", 5: "\u901a\u5316", 6: "\u767d\u5c71", 7: "\u677e\u539f", 8: "\u767d\u57ce", 9: "\u5ef6\u8fb9" }, 13: { 1: "\u54c8\u5c14\u6ee8", 2: "\u9f50\u9f50\u54c8\u5c14", 3: "\u9e21\u897f", 4: "\u9e64\u5c97", 5: "\u53cc\u9e2d\u5c71", 6: "\u5927\u5e86", 7: "\u4f0a\u6625", 8: "\u4f73\u6728\u65af", 9: "\u4e03\u53f0\u6cb3", 10: "\u7261\u4e39\u6c5f", 11: "\u9ed1\u6cb3", 12: "\u7ee5\u5316", 13: "\u5927\u5174\u5b89\u5cad" }, 14: { 1: "\u77f3\u5bb6\u5e84", 2: "\u5510\u5c71", 3: "\u79e6\u7687\u5c9b", 4: "\u90af\u90f8", 5: "\u90a2\u53f0", 6: "\u4fdd\u5b9a", 7: "\u5f20\u5bb6\u53e3", 8: "\u627f\u5fb7", 9: "\u6ca7\u5dde", 10: "\u5eca\u574a", 11: "\u8861\u6c34" }, 15: { 1: "\u90d1\u5dde", 2: "\u5f00\u5c01", 3: "\u6d1b\u9633", 4: "\u5e73\u9876\u5c71", 5: "\u5b89\u9633", 6: "\u9e64\u58c1", 7: "\u65b0\u4e61", 8: "\u7126\u4f5c", 9: "\u6fee\u9633", 10: "\u8bb8\u660c", 11: "\u6f2f\u6cb3", 12: "\u4e09\u95e8\u5ce1", 13: "\u5357\u9633", 14: "\u5546\u4e18", 15: "\u4fe1\u9633", 16: "\u5468\u53e3", 17: "\u9a7b\u9a6c\u5e97", 18: "\u6d4e\u6e90" }, 16: { 1: "\u6d4e\u5357", 2: "\u9752\u5c9b", 3: "\u6dc4\u535a", 4: "\u67a3\u5e84", 5: "\u4e1c\u8425", 6: "\u70df\u53f0", 7: "\u6f4d\u574a", 8: "\u6d4e\u5b81", 9: "\u6cf0\u5b89", 10: "\u5a01\u6d77", 11: "\u65e5\u7167", 12: "\u83b1\u829c", 13: "\u4e34\u6c82", 14: "\u5fb7\u5dde", 15: "\u804a\u57ce", 16: "\u6ee8\u5dde", 17: "\u83cf\u6cfd" }, 17: { 1: "\u897f\u5b89", 2: "\u94dc\u5ddd", 3: "\u5b9d\u9e21", 4: "\u54b8\u9633", 5: "\u6e2d\u5357", 6: "\u5ef6\u5b89", 7: "\u6c49\u4e2d", 8: "\u6986\u6797", 9: "\u5b89\u5eb7", 10: "\u5546\u6d1b" }, 18: { 1: "\u5170\u5dde", 2: "\u5609\u5cea\u5173", 3: "\u91d1\u660c", 4: "\u767d\u94f6", 5: "\u5929\u6c34", 6: "\u6b66\u5a01", 7: "\u5f20\u6396", 8: "\u5e73\u51c9", 9: "\u9152\u6cc9", 10: "\u5e86\u9633", 11: "\u5b9a\u897f", 12: "\u9647\u5357", 13: "\u4e34\u590f", 14: "\u7518\u5357" }, 19: { 1: "\u897f\u5b81", 2: "\u6d77\u4e1c", 3: "\u6d77\u5317", 4: "\u9ec4\u5357", 5: "\u6d77\u5357", 6: "\u679c\u6d1b", 7: "\u7389\u6811", 8: "\u6d77\u897f" }, 20: { 1: "\u4e4c\u9c81\u6728\u9f50", 2: "\u514b\u62c9\u739b\u4f9d", 3: "\u5410\u9c81\u756a", 4: "\u54c8\u5bc6", 5: "\u660c\u5409", 6: "\u535a\u5c14\u5854\u62c9", 7: "\u5df4\u97f3\u90ed\u695e", 8: "\u963f\u514b\u82cf", 9: "\u514b\u5b5c\u52d2\u82cf", 10: "\u5580\u4ec0", 11: "\u548c\u7530", 12: "\u4f0a\u7281", 13: "\u5854\u57ce", 14: "\u963f\u52d2\u6cf0", 15: "\u77f3\u6cb3\u5b50", 16: "\u963f\u62c9\u5c14", 17: "\u56fe\u6728\u8212\u514b", 18: "\u4e94\u5bb6\u6e20" }, 21: { 1: "\u592a\u539f", 2: "\u5927\u540c", 3: "\u9633\u6cc9", 4: "\u957f\u6cbb", 5: "\u664b\u57ce", 6: "\u6714\u5dde", 7: "\u664b\u4e2d", 8: "\u8fd0\u57ce", 9: "\u5ffb\u5dde", 10: "\u4e34\u6c7e", 11: "\u5415\u6881" }, 22: { 1: "\u6210\u90fd", 2: "\u81ea\u8d21", 3: "\u6500\u679d\u82b1", 4: "\u6cf8\u5dde", 5: "\u5fb7\u9633", 6: "\u7ef5\u9633", 7: "\u5e7f\u5143", 8: "\u9042\u5b81", 9: "\u5185\u6c5f", 10: "\u4e50\u5c71", 11: "\u5357\u5145", 12: "\u7709\u5c71", 13: "\u5b9c\u5bbe", 14: "\u5e7f\u5b89", 15: "\u8fbe\u5dde", 16: "\u96c5\u5b89", 17: "\u5df4\u4e2d", 18: "\u8d44\u9633", 19: "\u963f\u575d", 20: "\u7518\u5b5c", 21: "\u51c9\u5c71" }, 23: { 1: "\u8d35\u9633", 2: "\u516d\u76d8\u6c34", 3: "\u9075\u4e49", 4: "\u5b89\u987a", 5: "\u94dc\u4ec1", 6: "\u9ed4\u897f\u5357", 7: "\u6bd5\u8282", 8: "\u9ed4\u4e1c\u5357", 9: "\u9ed4\u5357" }, 24: { 1: "\u5408\u80a5", 2: "\u829c\u6e56", 3: "\u868c\u57e0", 4: "\u6dee\u5357", 5: "\u9a6c\u978d\u5c71", 6: "\u6dee\u5317", 7: "\u94dc\u9675", 8: "\u5b89\u5e86", 9: "\u9ec4\u5c71", 10: "\u6ec1\u5dde", 11: "\u961c\u9633", 12: "\u5bbf\u5dde", 13: "\u5de2\u6e56", 14: "\u516d\u5b89", 15: "\u4eb3\u5dde", 16: "\u6c60\u5dde", 17: "\u5ba3\u57ce" }, 25: { 1: "\u5357\u660c", 2: "\u666f\u5fb7\u9547", 3: "\u840d\u4e61", 4: "\u4e5d\u6c5f", 5: "\u65b0\u4f59", 6: "\u9e70\u6f6d", 7: "\u8d63\u5dde", 8: "\u5409\u5b89", 9: "\u5b9c\u6625", 10: "\u629a\u5dde", 11: "\u4e0a\u9976" }, 26: { 1: "\u6606\u660e", 2: "\u66f2\u9756", 3: "\u7389\u6eaa", 4: "\u4fdd\u5c71", 5: "\u662d\u901a", 6: "\u4e3d\u6c5f", 7: "\u666e\u6d31", 8: "\u4e34\u6ca7", 9: "\u695a\u96c4", 10: "\u7ea2\u6cb3", 11: "\u6587\u5c71", 12: "\u897f\u53cc\u7248\u7eb3", 13: "\u5927\u7406", 14: "\u5fb7\u5b8f", 15: "\u6012\u6c5f", 16: "\u8fea\u5e86" }, 27: { 1: "\u547c\u548c\u6d69\u7279", 2: "\u5305\u5934", 3: "\u4e4c\u6d77", 4: "\u8d64\u5cf0", 5: "\u901a\u8fbd", 6: "\u9102\u5c14\u591a\u65af", 7: "\u547c\u4f26\u8d1d\u5c14", 8: "\u5df4\u5f66\u6dd6\u5c14", 9: "\u4e4c\u5170\u5bdf\u5e03\u76df", 10: "\u5174\u5b89\u76df", 11: "\u9521\u6797\u90ed\u52d2\u76df", 12: "\u963f\u62c9\u5584\u76df" }, 28: { 1: "\u5357\u5b81", 2: "\u67f3\u5dde", 3: "\u6842\u6797", 4: "\u68a7\u5dde", 5: "\u5317\u6d77", 6: "\u9632\u57ce\u6e2f", 7: "\u94a6\u5dde", 8: "\u8d35\u6e2f", 9: "\u7389\u6797", 10: "\u767e\u8272", 11: "\u8d3a\u5dde", 12: "\u6cb3\u6c60", 13: "\u6765\u5bbe", 14: "\u5d07\u5de6" }, 29: { 1: "\u62c9\u8428", 2: "\u660c\u90fd", 3: "\u5c71\u5357", 4: "\u65e5\u5580\u5219", 5: "\u90a3\u66f2", 6: "\u963f\u91cc", 7: "\u6797\u829d" }, 30: { 1: "\u94f6\u5ddd", 2: "\u77f3\u5634\u5c71", 3: "\u5434\u5fe0", 4: "\u56fa\u539f", 5: "\u4e2d\u536b" }, 31: { 1: "\u6d77\u53e3", 2: "\u4e09\u4e9a", 3: "\u4e94\u6307\u5c71", 4: "\u743c\u6d77", 5: "\u510b\u5dde", 6: "\u6587\u660c", 7: "\u4e07\u5b81", 8: "\u4e1c\u65b9", 9: "\u5b9a\u5b89", 10: "\u5c6f\u660c", 11: "\u6f84\u8fc8", 12: "\u4e34\u9ad8", 13: "\u767d\u6c99", 14: "\u660c\u6c5f", 15: "\u4e50\u4e1c", 16: "\u9675\u6c34", 17: "\u4fdd\u4ead", 18: "\u743c\u4e2d", 19: "\u897f\u6c99\u7fa4\u5c9b", 20: "\u5357\u6c99\u7fa4\u5c9b", 21: "\u4e2d\u6c99\u7fa4\u5c9b" }, 32: { 1: "\u4e2d\u897f\u533a", 2: "\u4e1c\u533a", 3: "\u4e5d\u9f99\u57ce\u533a", 4: "\u89c2\u5858\u533a", 5: "\u5357\u533a", 6: "\u6df1\u6c34\u57d7\u533a", 7: "\u9ec4\u5927\u4ed9\u533a", 8: "\u6e7e\u4ed4\u533a", 9: "\u6cb9\u5c16\u65fa\u533a", 10: "\u79bb\u5c9b\u533a", 11: "\u8475\u9752\u533a", 12: "\u5317\u533a", 13: "\u897f\u8d21\u533a", 14: "\u6c99\u7530\u533a", 15: "\u5c6f\u95e8\u533a", 16: "\u5927\u57d4\u533a", 17: "\u8343\u6e7e\u533a", 18: "\u5143\u6717\u533a" }, 33: { 1: "\u6fb3\u95e8" }, 34: { 1: "\u53f0\u5317\u5e02", 2: "\u9ad8\u96c4\u5e02", 3: "\u57fa\u9686\u5e02", 4: "\u53f0\u4e2d\u5e02", 5: "\u53f0\u5357\u5e02", 6: "\u65b0\u7af9\u5e02", 7: "\u5609\u4e49\u5e02", 9: "\u53f0\u5317\u53bf", 10: "\u5b9c\u5170\u53bf", 11: "\u6843\u56ed\u53bf", 12: "\u65b0\u7af9\u53bf", 13: "\u82d7\u6817\u53bf", 14: "\u53f0\u4e2d\u53bf", 15: "\u5f70\u5316\u53bf", 16: "\u5357\u6295\u53bf", 17: "\u4e91\u6797\u53bf", 18: "\u5609\u4e49\u53bf", 19: "\u53f0\u5357\u53bf", 20: "\u9ad8\u96c4\u53bf", 21: "\u5c4f\u4e1c\u53bf", 22: "\u6f8e\u6e56\u53bf", 23: "\u53f0\u4e1c\u53bf", 24: "\u82b1\u83b2\u53bf" }, 35: { 1: "\u7f8e\u56fd", 2: "\u52a0\u62ff\u5927", 3: "\u6fb3\u5927\u5229\u4e9a", 4: "\u65b0\u897f\u5170", 5: "\u82f1\u56fd", 6: "\u6cd5\u56fd", 7: "\u5fb7\u56fd", 8: "\u6377\u514b", 9: "\u8377\u5170", 10: "\u745e\u58eb", 11: "\u5e0c\u814a", 12: "\u632a\u5a01", 13: "\u745e\u5178", 14: "\u4e39\u9ea6", 15: "\u82ac\u5170", 16: "\u7231\u5c14\u5170", 17: "\u5965\u5730\u5229", 18: "\u610f\u5927\u5229", 19: "\u4e4c\u514b\u5170", 20: "\u4fc4\u7f57\u65af", 21: "\u897f\u73ed\u7259", 22: "\u97e9\u56fd", 23: "\u65b0\u52a0\u5761", 24: "\u9a6c\u6765\u897f\u4e9a", 25: "\u5370\u5ea6", 26: "\u6cf0\u56fd", 27: "\u65e5\u672c", 28: "\u5df4\u897f", 29: "\u963f\u6839\u5ef7", 30: "\u5357\u975e", 31: "\u57c3\u53ca" }, 36: { 1: "\u5176\u4ed6\u5730\u533a" } } }
    };
    return e;
});
define("lib/swfobject", function (a, b, c) {
    function Y(a) {
        var b = /[\\\"<>\.;]/, c = b.exec(a) != null;
        return c && typeof encodeURIComponent != d ? encodeURIComponent(a) : a;
    }

    function X(a, b) {
        if (!!A) {
            var c = b ? "visible" : "hidden";
            w && S(a) ? S(a).style.visibility = c : W("#" + a, "visibility:" + c);
        }
    }

    function W(a, b, c, f) {
        if (!B.ie || !B.mac) {
            var g = l.getElementsByTagName("head")[0];
            if (!g) return;
            var h = c && typeof c == "string" ? c : "screen";
            f && (y = null, z = null);
            if (!y || z != h) {
                var i = T("style");
                i.setAttribute("type", "text/css"), i.setAttribute("media", h), y = g.appendChild(i), B.ie && B.win && typeof l.styleSheets != d && l.styleSheets.length > 0 && (y = l.styleSheets[l.styleSheets.length - 1]), z = h;
            }
            B.ie && B.win ? y && typeof y.addRule == e && y.addRule(a, b) : y && typeof l.createTextNode != d && y.appendChild(l.createTextNode(a + " {" + b + "}"));
        }
    }

    function V(a) {
        var b = B.pv, c = a.split(".");
        c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0;
        return b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1;
    }

    function U(a, b, c) { a.attachEvent(b, c), r[r.length] = [a, b, c]; }

    function T(a) { return l.createElement(a); }

    function S(a) {
        var b = null;
        try {
            b = l.getElementById(a);
        } catch (c) {
        }
        return b;
    }

    function R(a) {
        var b = S(a);
        if (b) {
            for (var c in b) typeof b[c] == "function" && (b[c] = null);
            b.parentNode.removeChild(b);
        }
    }

    function Q(a) {
        var b = S(a);
        b && b.nodeName == "OBJECT" && (B.ie && B.win ? (b.style.display = "none", function () { b.readyState == 4 ? R(a) : setTimeout(arguments.callee, 10); }()) : b.parentNode.removeChild(b));
    }

    function P(a, b, c) {
        var d = T("param");
        d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d);
    }

    function O(a, b, c) {
        var f, g = S(c);
        if (B.wk && B.wk < 312) return f;
        if (g) {
            typeof a.id == d && (a.id = c);
            if (B.ie && B.win) {
                var i = "";
                for (var j in a) a[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? b.movie = a[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + a[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + a[j] + '"'));
                var k = "";
                for (var l in b) b[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + b[l] + '" />');
                g.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>", q[q.length] = a.id, f = S(a.id);
            } else {
                var m = T(e);
                m.setAttribute("type", h);
                for (var n in a) a[n] != Object.prototype[n] && (n.toLowerCase() == "styleclass" ? m.setAttribute("class", a[n]) : n.toLowerCase() != "classid" && m.setAttribute(n, a[n]));
                for (var o in b) b[o] != Object.prototype[o] && o.toLowerCase() != "movie" && P(m, o, b[o]);
                g.parentNode.replaceChild(m, g), f = m;
            }
        }
        return f;
    }

    function N(a) {
        var b = T("div");
        if (B.win && B.ie) b.innerHTML = a.innerHTML;
        else {
            var c = a.getElementsByTagName(e)[0];
            if (c) {
                var d = c.childNodes;
                if (d) {
                    var f = d.length;
                    for (var g = 0; g < f; g++) (d[g].nodeType != 1 || d[g].nodeName != "PARAM") && d[g].nodeType != 8 && b.appendChild(d[g].cloneNode(!0));
                }
            }
        }
        return b;
    }

    function M(a) {
        if (B.ie && B.win && a.readyState != 4) {
            var b = T("div");
            a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(N(a), b), a.style.display = "none", function () { a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10); }();
        } else a.parentNode.replaceChild(N(a), a);
    }

    function L(a, b, c, e) {
        x = !0, u = e || null, v = { success: !1, id: c };
        var f = S(c);
        if (f) {
            f.nodeName == "OBJECT" ? (s = N(f), t = null) : (s = f, t = c), a.id = i;
            if (typeof a.width == d || !/%$/.test(a.width) && parseInt(a.width, 10) < 310) a.width = "310";
            if (typeof a.height == d || !/%$/.test(a.height) && parseInt(a.height, 10) < 137) a.height = "137";
            l.title = l.title.slice(0, 47) + " - Flash Player Installation";
            var g = B.ie && B.win ? "ActiveX" : "PlugIn", h = "MMredirectURL=" + k.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + g + "&MMdoctitle=" + l.title;
            typeof b.flashvars != d ? b.flashvars += "&" + h : b.flashvars = h;
            if (B.ie && B.win && f.readyState != 4) {
                var j = T("div");
                c += "SWFObjectNew", j.setAttribute("id", c), f.parentNode.insertBefore(j, f), f.style.display = "none", function () { f.readyState == 4 ? f.parentNode.removeChild(f) : setTimeout(arguments.callee, 10); }();
            }
            O(a, b, c);
        }
    }

    function K() { return !x && V("6.0.65") && (B.win || B.mac) && !(B.wk && B.wk < 312); }

    function J(a) {
        var b = null, c = S(a);
        if (c && c.nodeName == "OBJECT")
            if (typeof c.SetVariable != d) b = c;
            else {
                var f = c.getElementsByTagName(e)[0];
                f && (b = f);
            }
        return b;
    }

    function I() {
        var a = p.length;
        if (a > 0)
            for (var b = 0; b < a; b++) {
                var c = p[b].id, e = p[b].callbackFn, f = { success: !1, id: c };
                if (B.pv[0] > 0) {
                    var g = S(c);
                    if (g)
                        if (V(p[b].swfVersion) && !(B.wk && B.wk < 312)) X(c, !0), e && (f.success = !0, f.ref = J(c), e(f));
                        else if (p[b].expressInstall && K()) {
                            var h = {};
                            h.data = p[b].expressInstall, h.width = g.getAttribute("width") || "0", h.height = g.getAttribute("height") || "0", g.getAttribute("class") && (h.styleclass = g.getAttribute("class")), g.getAttribute("align") && (h.align = g.getAttribute("align"));
                            var i = {}, j = g.getElementsByTagName("param"), k = j.length;
                            for (var l = 0; l < k; l++) j[l].getAttribute("name").toLowerCase() != "movie" && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
                            L(h, i, c, e);
                        } else M(g), e && e(f);
                } else {
                    X(c, !0);
                    if (e) {
                        var m = J(c);
                        m && typeof m.SetVariable != d && (f.success = !0, f.ref = m), e(f);
                    }
                }
            }
    }

    function H() {
        var a = l.getElementsByTagName("body")[0], b = T(e);
        b.setAttribute("type", h);
        var c = a.appendChild(b);
        if (c) {
            var f = 0;
            (function () {
                if (typeof c.GetVariable != d) {
                    var e = c.GetVariable("$version");
                    e && (e = e.split(" ")[1].split(","), B.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]);
                } else if (f < 10) {
                    f++, setTimeout(arguments.callee, 10);
                    return;
                }
                a.removeChild(b), c = null, I();
            })();
        } else I();
    }

    function G() { n ? H() : I(); }

    function F(a) {
        if (typeof k.addEventListener != d) k.addEventListener("load", a, !1);
        else if (typeof l.addEventListener != d) l.addEventListener("load", a, !1);
        else if (typeof k.attachEvent != d) U(k, "onload", a);
        else if (typeof k.onload == "function") {
            var b = k.onload;
            k.onload = function () { b(), a(); };
        } else k.onload = a;
    }

    function E(a) { w ? a() : o[o.length] = a; }

    function D() {
        if (!w) {
            try {
                var a = l.getElementsByTagName("body")[0].appendChild(T("span"));
                a.parentNode.removeChild(a);
            } catch (b) {
                return;
            }
            w = !0;
            var c = o.length;
            for (var d = 0; d < c; d++) o[d]();
        }
    }

    var d = "undefined", e = "object", f = "Shockwave Flash", g = "ShockwaveFlash.ShockwaveFlash", h = "application/x-shockwave-flash", i = "SWFObjectExprInst", j = "onreadystatechange", k = window, l = document, m = navigator, n = !1, o = [G], p = [], q = [], r = [], s, t, u, v, w = !1, x = !1, y, z, A = !0, B = function () {
        var a = typeof l.getElementById != d && typeof l.getElementsByTagName != d && typeof l.createElement != d, b = m.userAgent.toLowerCase(), c = m.platform.toLowerCase(), i = c ? /win/.test(c) : /win/.test(b), j = c ? /mac/.test(c) : /mac/.test(b), o = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, p = !1, q = [0, 0, 0], r = null;
        if (typeof m.plugins != d && typeof m.plugins[f] == e) r = m.plugins[f].description, r && (typeof m.mimeTypes == d || !m.mimeTypes[h] || !!m.mimeTypes[h].enabledPlugin) && (n = !0, p = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
        else if (typeof k.ActiveXObject != d)
            try {
                var s = new ActiveXObject(g);
                s && (r = s.GetVariable("$version"), r && (p = !0, r = r.split(" ")[1].split(","), q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]));
            } catch (t) {
            }
        return { w3: a, pv: q, wk: o, ie: p, win: i, mac: j };
    }(), C = function () {
        !B.w3 || ((typeof l.readyState != d && l.readyState == "complete" || typeof l.readyState == d && (l.getElementsByTagName("body")[0] || l.body)) && D(), w || (typeof l.addEventListener != d && l.addEventListener("DOMContentLoaded", D, !1), B.ie && B.win && (l.attachEvent(j, function () { l.readyState == "complete" && (l.detachEvent(j, arguments.callee), D()); }), k == top && function () {
            if (!w) {
                try {
                    l.documentElement.doScroll("left");
                } catch (a) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                D();
            }
        }()), B.wk && function () {
            if (!w) {
                if (!/loaded|complete/.test(l.readyState)) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                D();
            }
        }(), F(D)));
    }(), Z = function () {
        B.ie && B.win && window.attachEvent("onunload", function () {
            var a = r.length;
            for (var b = 0; b < a; b++) r[b][0].detachEvent(r[b][1], r[b][2]);
            var c = q.length;
            for (var d = 0; d < c; d++) Q(q[d]);
            for (var e in B) B[e] = null;
            B = null;
            for (var f in $) $[f] = null;
            $ = null;
        });
    }(), $ = {
        registerObject: function (a, b, c, d) {
            if (B.w3 && a && b) {
                var e = {};
                e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, p[p.length] = e, X(a, !1);
            } else d && d({ success: !1, id: a });
        },
        getObjectById: function (a) { if (B.w3) return J(a); },
        embedSWF: function (a, b, c, f, g, h, i, j, k, l) {
            var m = { success: !1, id: b };
            B.w3 && !(B.wk && B.wk < 312) && a && b && c && f && g ? (X(b, !1), E(function () {
                c += "", f += "";
                var n = {};
                if (k && typeof k === e) for (var o in k) n[o] = k[o];
                n.data = a, n.width = c, n.height = f;
                var p = {};
                if (j && typeof j === e) for (var q in j) p[q] = j[q];
                if (i && typeof i === e) for (var r in i) typeof p.flashvars != d ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
                if (V(g)) {
                    var s = O(n, p, b);
                    n.id == b && X(b, !0), m.success = !0, m.ref = s;
                } else {
                    if (h && K()) {
                        n.data = h, L(n, p, b, l);
                        return;
                    }
                    X(b, !0);
                }
                l && l(m);
            })) : l && l(m);
        },
        switchOffAutoHideShow: function () { A = !1; },
        ua: B,
        getFlashPlayerVersion: function () { return { major: B.pv[0], minor: B.pv[1], release: B.pv[2] }; },
        hasFlashPlayerVersion: V,
        createSWF: function (a, b, c) { return B.w3 ? O(a, b, c) : undefined; },
        showExpressInstall: function (a, b, c, d) { B.w3 && K() && L(a, b, c, d); },
        removeSWF: function (a) { B.w3 && Q(a); },
        createCSS: function (a, b, c, d) { B.w3 && W(a, b, c, d); },
        addDomLoadEvent: E,
        addLoadEvent: F,
        getQueryParamValue: function (a) {
            var b = l.location.search || l.location.hash;
            if (b) {
                /\?/.test(b) && (b = b.split("?")[1]);
                if (a == null) return Y(b);
                var c = b.split("&");
                for (var d = 0; d < c.length; d++) if (c[d].substring(0, c[d].indexOf("=")) == a) return Y(c[d].substring(c[d].indexOf("=") + 1));
            }
            return "";
        },
        expressInstallCallback: function () {
            if (x) {
                var a = S(i);
                a && s && (a.parentNode.replaceChild(s, a), t && (X(t, !0), B.ie && B.win && (s.style.display = "block")), u && u(v)), x = !1;
            }
        }
    };
    return $;
});
define("utils/Cookie", function (a, b, c) {
    var d = a("lib/jquery"), e = {
        set: function (a, b, c) {
            var d = "";
            if (c) {
                var e = 0, f = new Date;
                c === "today" && (c = 1, e = f.getHours() * 3600 + f.getMinutes() * 60 + f.getSeconds()), f.setTime(f.getTime() + c * 24 * 60 * 60 * 1e3 - e * 1e3), d = "; expires=" + f.toGMTString();
            }
            document.cookie = a + "=" + b + d + "; path=/";
        },
        get: function (a) {
            var b = a + "=", c = document.cookie.split(";");
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                while (e.charAt(0) === " ") e = e.substring(1, e.length);
                if (e.indexOf(b) === 0) return decodeURIComponent(e.substring(b.length, e.length));
            }
            return null;
        },
        del: function (a) { this.set(a, "", -1); }
    };
    return e;
});
define("utils/DataSource", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("model/UserData"), f = a("utils/Error"), g = a("utils/data/RequestMap"), h = a("widget/box/floatBox/IntegrityTipsBox"), i = a("widget/box/floatBox/NeedVerifyBox"), j = a("widget/box/floatBox/NeedAvatarBox"), k = a("utils/Log"), l = d(document.body), m = {
        keyFrom: null,
        triggerElem: null,
        requestMap: g,
        parseArguments: function (a) {
            var b = a[0], c = this.requestMap[b];
            d.isPlainObject(c) && (this.debug && c.testUrl ? a[0] = c.testUrl : a[0] = c.url);
            return a;
        },
        parseRequest: function (a, b) {
            var c = {}, f = b[0], g = this.requestMap[f], h = d.extend({}, g);
            h.login = h.login || !1, h.silent = h.silent || !1, h.redirect = h.redirect || !1;
            if (d.isPlainObject(g) && h.login && e.getLoginUser() === null) l.trigger("error", ["needLogin"]);
            else {
                b = m.parseArguments(b);
                try {
                    c = a.apply(null, b);
                } catch (i) {
                    return c;
                }
                c.resend = function () { b[0] = f, m.parseRequest(a, b); };
                var j = c.error;
                c.error = function (a) {
                    a && j.call(c, function (b) { b.status !== 421 && a.apply(null, arguments); });
                    return c;
                };
                return h.silent ? this.bindError(c, h) : c;
            }
        },
        get: function () { return this.parseRequest(d.get, arguments); },
        getJSON: function () { return this.parseRequest(d.getJSON, arguments); },
        ajax: function () { return this.parseRequest(d.ajax, arguments); },
        getScript: function () { return this.parseRequest(d.getScript, arguments); },
        post: function () { return this.parseRequest(d.post, arguments); },
        postJSON: function () {
            var a = arguments[0], b = arguments[arguments.length - 1], c = d("#data_" + a);
            if (c.size() > 0) {
                b(d.parseJSON(c.html())), c.remove();
                return null;
            }
            return this.parseRequest(d.post, arguments);
        },
        bindError: function (a, b) {
            var c = this.triggerElem;
            this.triggerElem = null;
            return a.statusCode({ 521: d.proxy(function () { this.userNoLogin(b.login); }, this), 547: d.proxy(function () { this.needAvatar(); }, this), 564: this.loginUserBlock, 565: d.proxy(function () { this.targetUserBlock(c, b.redirect); }, this), 573: d.proxy(function () { this.targetUserBlacked(c); }, this), 576: d.proxy(function () { this.integrityError(c); }, this), 591: d.proxy(function () { this.aboardNeedVerify(c); }, this), 592: d.proxy(function () { this.needVerify(); }, this), 426: d.proxy(function () { this.spamVerify(a); }, this) });
        },
        throwNoFound: function () {
        },
        callError: function (a) {
            var b = d.parseJSON(a.responseText), c = parseInt(b.code);
            !b.code || c === 1;
        },
        throwError: function () { l.trigger("error", ["network", { type: "error", text: "\u7f51\u7edc\u592a\u5fd9\u5566\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5:)" }]); },
        throwSysError: function () { l.trigger("error", ["network", { type: "error", text: "\u670d\u52a1\u5668\u51fa\u73b0\u9519\u8bef\uff01" }]); },
        setTrigger: function (a) {
            this.triggerElem = a;
            return this;
        },
        userNoLogin: function (a) { a === !0 && (location.href = "/"); },
        loginUserBlock: function () { location.href = "/error/block"; },
        targetUserBlock: function (a, b) { b ? location.href = "/404" : a !== null && (a.data("userblock") === "refresh" ? location.reload() : f.showWinTipsBox("warning", f.Code(565), null, a)); },
        targetUserBlacked: function (a) { a !== null && f.showWinTipsBox("warning", f.Code(573), null, a); },
        integrityError: function (a) {
            if (a !== null) {
                var b = "message";
                a.hasClass("mess-trigger") || (b = "QA");
                var c = new h(null, { tipsType: b });
                c.show(), k.doLog({ parameter: { method: "limit" }, elem: a });
            }
        },
        aboardNeedVerify: function (a) { a !== null && f.showWinTipsBox("warning", f.Code(591), null, a); },
        needVerify: function () {
            var a = new i(null, {});
            a.show();
        },
        needAvatar: function () {
            var a = new j(null, { data: { content: "\u60a8\u9700\u8981\u5148\u6dfb\u52a0\u6e05\u6670\u7f8e\u89c2\u7684\u672c\u4eba\u8fd1\u7167\u624d\u80fd\u548c\u5bf9\u65b9\u4e92\u52a8\uff01" } });
            a.show();
        },
        spamVerify: function (a) { l.trigger("error", ["spamVerify", a]); }
    };
    return m;
});
define("model/UserData", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = {}, h = {}, i = e.extend({ init: function (a) { this.id = i.update(a); }, get: function () { return g[this.id]; }, bindUpdate: function (a) { i.bindUpdate(this.id, a); } }), j = ["avatar"];
    i.update = function (a) {
        var b = a.id, c = [], e = g[b];
        if (e)
            for (var h = 0, k = j.length; h < k; h++) {
                var l = j[h];
                a[l] && e[l] && a[l] !== e[l] && c.push(l);
            }
        g[b] = d.extend(e, a);
        var m = g[b];
        if (!m._avatar && typeof a.avatar != "undefined" || d.inArray("avatar", c) !== -1) m._avatar = f.userAvatar(a.avatar, 70, a.sex);
        if (!m._province && typeof a.province != "undefined")
            try {
                m._province = f.selectValue("province", a.province);
            } catch (n) {
                throw "user" + a.id + "province data error!";
            }
        if (!m._city && typeof a.province != "undefined" && typeof a.city != "undefined")
            try {
                m._city = f.selectValue("city", a.province + "-" + a.city), m._cutCity = f.countChars(m._city, 6, !0), m._specialCity = f.specialCity(a.province, a.city), m._cutSpecialCity = f.countChars(m._specialCity, 6, !0);
            } catch (n) {
                throw "user" + a.id + "city data error!";
            }
        c.length > 0 && i.publishUpdate(b, c);
        return b;
    }, i.bindUpdate = function (a, b) {
        var c = h[a] || [];
        c.push(b), h[a] = c;
    }, i.publishUpdate = function (a, b) {
        var c = h[a];
        if (!!c) for (var d = 0, e = c.length; d < e; d++) c[d](i.get(a), b);
    }, i.get = function (a) { return g[a] || null; }, i.loginUserId = null, i.loginUserIsVip = !1, i.loginUserIsNormalVip = !1, i.loginUserIsSuperVip = !1, i.getLoginUser = function () {
        if (i.loginUserId === null) return null;
        return i.get(i.loginUserId);
    }, i.setLoginUser = function (a) {
        if (a && a.id) {
            a.isLoginUser = !0, i.loginUserId = i.update(a);
            var b = i.getLoginUser();
            i.loginUserIsVip = b.isVip, i.loginUserIsNormalVip = b.isNormalVip, i.loginUserIsSuperVip = b.isSuperVip;
        }
    }, i.currentUserId = null, i.loginUserPage = !0, i.getCurrentUser = function () {
        if (i.currentUserId === null) return null;
        return i.get(i.currentUserId);
    }, i.setCurrentUser = function (a) { a && a.id && (i.currentUserId = i.update(a), a.id !== i.loginUserId && (i.loginUserPage = !1)); }, i.isLoginUserPage = function () {
        if (i.currentUserId !== null && i.loginUserId !== i.currentUserId) return !1;
        return !0;
    }, i.isAvatarCheck = function () { return i.getLoginUser().isAvatarBlock ? !1 : !0; };
    return i;
});
define("utils/Error", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/winBox/TipsBox").getInstance(), f = a("widget/box/floatBox/TipsBox"), g = {};
    g.Code = function (a) {
        var b = { 425: ["\u60a8\u8bc4\u8bba\u7684\u592a\u9891\u7e41", ""], 520: ["\u670d\u52a1\u5668\u9519\u8bef", ""], 521: ["\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55", ""], 522: ["\u6ca1\u6709\u627e\u5230\u8be5\u7528\u6237", ""], 523: ["\u5b57\u7b26\u8d85\u957f", ""], 524: ["\u56fe\u7247\u592a\u591a", ""], 525: ["\u52a8\u6001\u4e2d\u6ca1\u6709\u56fe\u7247", ""], 526: ["\u4e0a\u4f20\u56fe\u7247\u51fa\u9519", ""], 527: ["\u771f\u5b9e\u59d3\u540d\u4e0e\u8eab\u4efd\u8bc1\u53f7\u4e0d\u5339\u914d", ""], 528: ["\u7528\u6237\u4fe1\u606f\u4fee\u6539\u5931\u8d25", ""], 529: ["\u4e0a\u4f20\u6570\u636e\u4e3a\u7a7a", ""], 530: ["\u4e0a\u4f20\u6570\u636e\u8fc7\u5927", ""], 531: ["\u4e0a\u4f20\u5931\u8d25", ""], 532: ["\u5bc6\u7801\u88ab\u4fdd\u62a4", ""], 533: ["\u66f4\u6362\u5bc6\u7801\u5931\u8d25", ""], 534: ["\u60a8\u7684\u64cd\u4f5c\u592a\u9891\u7e41", ""], 535: ["\u52a8\u6001\u88ab\u5220\u9664", ""], 540: ["\u8bf7\u6c42\u53c2\u6570\u7684\u683c\u5f0f\u9519\u8bef", ""], 541: ["\u8bf7\u6c42\u5fc5\u987b\u7684\u53c2\u6570\u9519\u8bef", ""], 542: ["\u522b\u8d2a\u5fc3\u54e6\uff0c\u4f60\u5df2\u7ecf\u559c\u6b22\u5f88\u591a\u4eba\u4e86", ""], 543: ["\u8be5\u52a8\u6001\u5df2\u88ab\u5220\u9664", ""], 544: ["\u8be5\u7167\u7247\u5df2\u88ab\u5220\u9664", ""], 545: ["\u8bf7\u52ff\u91cd\u590d\u8d5e", ""], 546: ["\u7528\u6237\u6ca1\u6709\u6ce8\u518c", ""], 547: ["\u60a8\u7684\u5934\u50cf\u8fd8\u6ca1\u6709\u5ba1\u6838\u901a\u8fc7\uff0c<br />\u8fd8\u4e0d\u80fd\u548c\u5176\u4ed6\u7528\u6237\u8fdb\u884c\u4e92\u52a8", ""], 548: ["\u7528\u6237url\u751f\u6210\u5931\u8d25", ""], 550: ["\u7528\u6237\u88ab\u62c9\u9ed1", ""], 551: ["\u9a8c\u8bc1\u7801\u9519\u8bef", ""], 552: ["\u60a8\u586b\u5199\u7684\u6027\u522b\u4e0e\u8eab\u4efd\u8bc1\u4fe1\u606f\u4e0d\u5339\u914d", ""], 553: ["\u5bf9\u4e0d\u8d77\uff0c\u8be5\u4f01\u4e1a\u90ae\u7bb1\u5df2\u7ecf\u7533\u8bf7\u8fc7\u9080\u8bf7\u7801\uff01", ""], 554: ["\u5bf9\u4e0d\u8d77\uff0c\u6682\u53ea\u5bf9\u90e8\u5206\u4f01\u4e1a\u53d1\u9001\u9080\u8bf7\u7801\u3002", ""], 555: ["\u9080\u8bf7\u7801\u5df2\u88ab\u4f7f\u7528", ""], 556: ["\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8f93\u5165\u7684\u90ae\u7bb1\u9519\u8bef\uff0c\u6216\u6682\u4e0d\u5728\u5185\u6d4b\u4f01\u4e1a\u540d\u5355\u4e2d\uff0c\u8bf7\u671f\u5f85\u5f00\u653e\u6ce8\u518c\u518d\u8bd5", ""], 557: ["\u8bf7\u8f93\u5165\u9080\u8bf7\u7801", ""], 558: ["\u7528\u6237\u8f93\u5165\u4e0d\u7b26\u5408\u8981\u6c42", ""], 559: ["\u8be5\u6635\u79f0\u4e0d\u53ef\u7528", ""], 560: ["\u56fe\u7247\u5730\u5740\u975e\u6cd5", ""], 561: ["\u9a8c\u8bc1\u7801\u9519\u8bef", ""], 562: ["\u4e0d\u80fd\u8d5e\u81ea\u5df1", ""], 563: ["\u60a8\u9a8c\u8bc1\u6b21\u6570\u592a\u8fc7\u9891\u7e41\uff0c\u8bf7\u4f7f\u7528\u624b\u673a\u8ba4\u8bc1\u5427", ""], 564: ["\u60a8\u5df2\u88ab\u5c01\u7981", ""], 565: ["\u8be5\u7528\u6237\u5df2\u88ab\u5c01\u7981\uff0c\u65e0\u6cd5\u4e92\u52a8", ""], 566: ["\u62b1\u6b49\uff0c\u5185\u5bb9\u8fdd\u53cd\u76f8\u5173\u6cd5\u5f8b\u6cd5\u89c4\uff0c\u8bf7\u4fee\u6539", ""], 567: ["\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u4f7f\u7528\u624b\u673a\u8ba4\u8bc1\u6216\u8fc7\u4f1a\u91cd\u8bd5", ""], 568: ["\u8be5\u8eab\u4efd\u8bc1\u53f7\u5df2\u5728\u82b1\u7530\u8ba4\u8bc1\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165", ""], 569: ["\u8be5\u624b\u673a\u53f7\u5df2\u5728\u82b1\u7530\u8ba4\u8bc1\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165", ""], 570: ["\u6ca1\u6709\u8fdb\u884c\u8eab\u4efd\u8ba4\u8bc1\uff0c\u65e0\u6cd5\u4e92\u52a8", ""], 571: ["\u60c5\u4e66\u6ca1\u6709\u6587\u5b57", ""], 573: ["\u4f60\u5df2\u88ab\u5bf9\u65b9\u62c9\u9ed1\uff0c\u65e0\u6cd5\u4e92\u52a8", ""], 574: ["\u8be5\u529f\u80fd\u5df2\u8fbe\u4f7f\u7528\u4e0a\u9650", ""], 576: ["\u771f\u53ef\u60dc\uff0c\u4f60\u7684\u8d44\u6599\u5b8c\u6574\u5ea6\u8fd8\u6ca1\u6709\u8fbe\u523030%\uff0c\u6682\u65f6\u4e0d\u80fd\u548c\u7f8e\u5973\u4ea4\u6d41", ""], 579: ["\u56de\u7b54\u65f6\u95f4\u95f4\u9694\u592a\u77ed", ""], 581: ["\u4eca\u65e5\u8df3\u8fc7\u9898\u6570\u8fbe\u5230\u4e0a\u9650", ""], 582: ["\u4e0d\u80fd\u91cd\u590d\u6253\u62db\u547c", ""], 583: ["\u62b1\u6b49\uff0c\u53d1\u9001\u5185\u5bb9\u4e2d\u5305\u542b\u654f\u611f\u5185\u5bb9\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u65b0\u53d1\u9001\u3002", ""], 584: ["\u62b1\u6b49\uff0c\u53d1\u9001\u5185\u5bb9\u4e2d\u5305\u542b\u654f\u611f\u5185\u5bb9\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u65b0\u53d1\u9001\u3002", ""], 585: ["\u6682\u65f6\u4e0d\u80fd\u8d2d\u4e70\u6536\u8d39\u670d\u52a1", ""], 586: ["\u6d88\u8d39\u8ba2\u5355\u4e0d\u5b58\u5728", ""], 590: ["\u8ba2\u5355\u6216\u652f\u4ed8\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8d2d\u4e70\u5e76\u652f\u4ed8", ""], 591: ["\u60a8\u7684\u8ba4\u8bc1\u6b63\u5728\u5ba1\u6838\u4e2d\uff0c\u6682\u4e0d\u80fd\u4e92\u52a8\uff01", ""], 592: ["\u4e3a\u4e86\u4fdd\u8bc1\u4ea4\u53cb\u5b89\u5168\u548c\u771f\u5b9e\u6027\uff0c\u8bf7\u5148\u5b8c\u6210\u624b\u673a\u53f7\u6216\u8eab\u4efd\u8bc1\u53f7\u8ba4\u8bc1", ""], 593: ["\u751f\u6210\u8ba2\u5355ID\u5f02\u5e38", ""], 594: ["\u7528\u6237\u6536\u8d39\u5e10\u53f7\u4e0d\u5b58\u5728", ""], 595: ["\u6d3b\u52a8\u4e0d\u5b58\u5728", ""], 596: ["\u60a8\u5df2\u8d2d\u4e70\u6b64\u670d\u52a1\uff0c\u53ef\u6c38\u4e45\u4f7f\u7528\uff0c\u4e0d\u9700\u8981\u518d\u6b21\u8d2d\u4e70", ""], 598: ["\u4e3a\u4fdd\u8bc1\u5b89\u5168\u4ee5\u9632\u53d7\u9a97\uff0c\u8bf7\u52ff\u4f7f\u7528\u7ad9\u5916\u8054\u7cfb\u65b9\u5f0f\u6c9f\u901a", ""], 599: ["\u8be5\u8bc4\u8bba\u5df2\u5220\u9664\uff01"], 600: ["\u6700\u591a\u53ef\u9009\u62e910\u4e2a\u6807\u7b7e\u5c55\u793a", ""] };
        return b[a] && b[a][0] ? b[a][0] : "";
    }, g.showTips = function (a) {
        var a = d.extend({ json: {} }, a), b = parseInt(a.json.code) || 1;
        if (b === 1) return !1;
        var c = b === 599 ? a.json.apiErrorMessage : g.Code(b);
        c && g.showWinTipsBox("warning", c, a.evt, a.triggerElem);
        return !0;
    }, g.Tips = function (a, b, c) {
        var d = g.Code(a);
        if (a === 1 || d === "") return !1;
        b ? g.showWinTipsBox("warning", d, b, c) : g.showWinTipsBox("warning", d, null, c);
        return !0;
    }, g.showWinTipsBox = function (a, b, c, d) { e.show(c, { data: { type: a, text: b }, triggerElem: d }); }, g.showFloatTipsBox = function (a, b) {
        var c = new f(null, { data: { type: a, text: b } });
        c.show(), c.delayHide(1500);
    };
    return g;
});
define("widget/box/winBox/TipsBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/winBox/Box"), f = a("utils/tmpl"), g = e.extend({
        init: function (a, b) { this._super(a, b); },
        renderTmpl: function () { return d(f.formatTemplate(a("template/winbox/tipsBox"), {})); },
        postRender: function () { this.$typeElem = this.$elem.find(".js-type"), this.$textElem = this.$elem.find(".js-text"), this.$arrowElem = this.$elem.find(".js-arrow"); },
        show: function (a, b) {
            this.timer && clearTimeout(this.timer), this._super(a, b), this.$typeElem.removeClass("correct error warning").addClass(b.data.type), this.$textElem.html(b.data.text), this.setPosition();
            var c = this;
            this.timer = setTimeout(function () { c.hide(); }, 2e3);
        },
        bindEvent: function () { this._super(); },
        setPosition: function () {
            var a = this.$trigger, b = a.offset(), c = this.$elem.width();
            this.$elem.css({ top: b.top - this.$elem.innerHeight() - 10, left: b.left + a.innerWidth() / 2 - c / 2 }), this.$arrowElem.css({ left: c / 2 - 7 });
        }
    }), h = null;
    return {
        getInstance: function () {
            h === null && (h = new g);
            return h;
        },
        getNewInstance: function (a, b) { return new g(a, b); }
    };
});
define("widget/box/winBox/Box", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/Box"), f = a("utils/Utils"), g = d(window), h = d(document.body), i = e.extend({
        init: function (a, b) { this._super(a, b), this.isBindAutoClose = !1; },
        show: function (a, b) {
            this._super(), this.config = b || {}, this.data = this.config.data || {}, this.config.triggerElem ? this.$trigger = this.config.triggerElem : typeof a != "undefined" && (this.$trigger = d(a.currentTarget)), this.hideCallBack = this.config.hideCallBack, !this.isBindAutoClose && this.config.autoClose && (this.autoClose = f.autoClose.call(this), this.isBindAutoClose = !0), this.config.bindResize && this.bindResize(), this.setPosition();
            return this.$elem;
        },
        hide: function () { this.reset(), this.hideCallBack && this.hideCallBack(), this.config.autoClose && (h.unbind("click", this.autoClose), this.isBindAutoClose = !1), this.config.bindResize && g.unbind("resize", d.proxy(this.setPosition, this)), this._super(); },
        bindResize: function () { g.bind("resize", d.proxy(this.setPosition, this)); },
        reset: function () {
        }
    });
    return i;
});
define("widget/box/Box", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = d(window), h = e.extend({
        init: function (a, b) { this.$elem = null, this.config = b || {}, this.data = this.config.data || {}, this.isShow = !1, this.isBindEvent = !1; },
        render: function () {
            if (this.$elem === null) {
                var a = this.preRender(), b = d.extend({}, a, this.data);
                this.$elem = this.renderTmpl(b);
            }
            this.isBindEvent || (this.postRender(), this.bindEvent(), this.isBindEvent = !0);
            return this.$elem;
        },
        preRender: function () { return {}; },
        postRender: function () {
        },
        renderTmpl: function () { throw new Error("abstract function!"); },
        bindEvent: function () { this.$elem.delegate(".close-trigger", "click", d.proxy(this.hide, this)); },
        show: function () { this.render().appendTo("body").show(), this.isShow = !0; },
        hide: function () { this.$elem !== null && this.$elem.detach(), this.isShow = !1; },
        setPosition: function () {
        },
        onTextTips: function (a, b, c) { f.textTips(a, b, c); },
        onVerticalMiddle: function (a) {
            var b = f.isIe6 ? g.scrollTop() : 0, c = (g.height() - this.$mainElem.height()) / 2;
            c = Math.max(c, 0) + b, a ? this.$mainElem.stop().animate({ top: c, duration: 500, easing: "easeInOutExpo" }) : this.$mainElem.css({ top: c });
        },
        onCenter: function () {
            var a = g.width() / 2 - this.$mainElem.width() / 2;
            a = Math.max(a, 0), this.$mainElem.css({ left: a });
        }
    });
    return h;
});
define("template/winbox/tipsBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) p.push('<div class="winlayer tipsBox"><em class="icon-winlayer-arrowDown js-arrow"></em><div class="tipsBox-inner js-inner"><span class="tipsBox-left js-type"><em class="icon-correct-m"></em><em class="icon-warning-m"></em><em class="icon-error-m"></em></span><p class="js-text"></p></div></div>');
        return p.join("");
    };
});
define("widget/box/floatBox/TipsBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/floatBox/Box"), g = f.extend({ preRender: function () { return { title: "", bodyContent: e.formatTemplate(a("template/floatbox/tipsBox"), this.data) }; }, postRender: function () { this._super(), this.$elem.addClass("poplayer-tipsBox"); } });
    return g;
});
define("widget/box/floatBox/Box", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/Box"), g = a("utils/Utils"), h = a("utils/layer/MaskLayer"), i = d(window), j = d(document.body), k = f.extend({
        preRender: function () { return {}; },
        renderTmpl: function (b) { return d(e.formatTemplate(a("template/floatbox/basic"), b)); },
        postRender: function () { this.$mainElem = this.$elem.find(".js-main"); },
        show: function () {
            this._super(), this.$elem.css({ visibility: "visible" });
            var a = {};
            this.config.maskzIndex && (a.zIndex = this.config.maskzIndex), this.maskLayer = new h, this.maskLayer.show(a), this.bindResize(), this.setPosition(), this.config.autoClose && (this.autoClose = g.autoClose.call(this, this.$elem, this.$elem));
        },
        setPosition: function () { this.onVerticalMiddle(), this.onCenter(); },
        bindResize: function () { i.bind("resize", d.proxy(this.resizeHandler, this)), this.config.escDisable || j.bind("keydown", d.proxy(this.hideHandler, this)); },
        unbindResize: function () { i.unbind("resize", d.proxy(this.resizeHandler, this)), this.config.escDisable || j.unbind("keydown", d.proxy(this.hideHandler, this)); },
        resizeHandler: function () { this.setPosition(); },
        hideHandler: function (a) { a.which === 27 && this.hide(); },
        hide: function () { this._super(), this.maskLayer && this.maskLayer.hide(), this.unbindResize(), this.config.autoClose && j.unbind("click", this.autoClose); },
        delayHide: function (a) {
            a = a || 2e3;
            var b = this;
            setTimeout(function () { b.hide(); }, a);
        }
    });
    return k;
});
define("utils/layer/MaskLayer", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("widget/Module"), g = a("utils/Utils"), h = d(window), i = f.extend({
        defaults: { zIndex: 999 },
        renderTmpl: function () { return d('<div class="masklayer"></div>'); },
        postRender: function () { g.isIe6 && (this.$iframe = d('<iframe class="masklayer-iframe" scrolling="no" frameborder="0"></iframe>')); },
        show: function (a) { this.render(), this.config = d.extend({}, this.defaults, a), this.$elem.css("zIndex", this.config.zIndex).appendTo("body"), g.isIe6 && (this.$elem.css("position", "absolute"), this.$iframe.css("zIndex", this.config.zIndex - 1).appendTo("body")), this.resizeHandler(), this.bindResize(); },
        hide: function () { this.$elem !== null && this.$elem.detach(), this.$iframe && this.$iframe.detach(), this.unbindResize(); },
        bindResize: function () { this.bindResizeEvent = d.proxy(this.resizeHandler, this), h.bind("resize", this.bindResizeEvent), g.isIe6 && (this.bindScrollEvent = d.proxy(this.resizeHandler, this), h.bind("scroll", this.bindScrollEvent)); },
        unbindResize: function () { h.unbind("resize", this.bindResizeEvent), g.isIe6 && h.unbind("scroll", this.bindScrollEvent); },
        resizeHandler: function () {
            var a = h.width(), b = h.height(), c = g.pageMaxHeight();
            this.$elem.css({ width: a }), g.isIe6 ? (this.$elem.css({ height: c, position: "absolute" }), this.$iframe.css({ height: c, width: a })) : this.$elem.css({ height: b });
        }
    });
    return i;
});
define("widget/Module", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = e.extend({
        defaults: {},
        init: function (a, b) { typeof a != "string" && (this.$elem = a), this.config = d.extend({}, this.defaults, b), this.data = this.config.data, this.isBindEvent = !1; },
        render: function () {
            if (!this.$elem) {
                var a = this.preRender(), b = d.extend(a, this.data);
                this.$elem = this.renderTmpl(b);
            }
            this.isBindEvent || (this.postRender(), this.bindEvent(), this.isBindEvent = !0);
            return this.$elem;
        },
        preRender: function () { return {}; },
        postRender: function () {
        },
        renderTmpl: function (a) { throw "Abstract Method!!!"; },
        parseData: function (a) { return a; },
        bindEvent: function () { this.isBindEvent = !0; }
    });
    return f;
});
define("template/floatbox/basic", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) p.push('<div class="poplayer"><div class="poplayer-main js-main"><div class="poplayer-hd js-hd"><a class="icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a><h3 class="js-title">', title, "</h3>"), typeof subtitle != "undefined" && subtitle && p.push('<span class="text-md poplayer-subtitle">', subtitle, "</span>"), p.push('</div><div class="js-body">', bodyContent, "</div></div></div>");
        return p.join("");
    };
});
define("template/floatbox/tipsBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) p.push('<div class="poplayer-bd"><p class="text-middle-tips"><span class="fS14">'), type == "correct" ? p.push('<em class="icon-correct-m"></em>') : type == "warning" ? p.push('<em class="icon-warning-m"></em>') : type == "error" && p.push('<em class="icon-error-m"></em>'), p.push("", text, "</span></p>"), typeof desc != "undefined" && desc !== "" && p.push('<p class="poplayer-desc">', desc, "</p>"), p.push("</div>");
        return p.join("");
    };
});
define("widget/box/floatBox/IntegrityTipsBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Log"), i = a("model/UserData"), j = e.extend({ init: function (a, b) { this._super(a, b), this.data.tipsType = b.tipsType || !1, this.data.url = i.getLoginUser().url; }, preRender: function () { return { title: this.config.title || "\u8bf7\u5b8c\u5584\u8d44\u6599", bodyContent: f.formatTemplate(a("template/floatbox/integrityTipsBox"), this.data) }; }, postRender: function () { this._super(), this.$elem.addClass("poplayer-integrity"); }, bindEvent: function () { this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this)); }, hide: function (a) { this._super(), a && this.config.callBack && this.config.callBack({ status: "cancel" }); }, onSubmit: function (a) { this.hide(); } });
    return j;
});
define("template/floatbox/integrityTipsBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><div class="poplayer-mess"><em class="icon-integrity-heart"></em>'), tipsType === "QA" ? p.push('\u771f\u53ef\u60dc\uff0c\u4f60\u7684\u8d44\u6599\u5b8c\u6574\u5ea6\u8fd8\u6ca1\u8fbe\u5230<strong class="text-red">30%</strong>\uff0c\u6682\u65f6\u8fd8\u4e0d\u80fd\u67e5\u770bTA\u7684Q&A\u3002') : p.push('\u771f\u53ef\u60dc\uff0c\u4f60\u7684\u8d44\u6599\u5b8c\u6574\u5ea6\u8fd8\u6ca1\u8fbe\u5230<strong class="text-red">30%</strong>\uff0c\u6682\u65f6\u4e0d\u80fd\u548cTA\u4ea4\u6d41\u3002'), p.push("</div>"), tipsType === "QA" ? p.push('<div class="poplayer-desc"></div>') : p.push('<div class="poplayer-desc">\u5df2\u7ecf\u6709<strong>80%</strong>\u7684\u7528\u6237\u7545\u804a\u65e0\u963b\u3002</div>'), p.push('</div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box"><div><a href="/', url, '?info=1" target="_blank" class="btn btn-red submit-trigger">\u5b8c\u5584\u8d44\u6599</a><a href="javascript:;" class="btn btn-gray close-trigger">\u53d6\u6d88</a></div></div></div>');
        return p.join("");
    };
});
define("widget/box/floatBox/NeedVerifyBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Log"), i = a("model/UserData"), j = e.extend({ init: function (a, b) { this._super(a, b); }, preRender: function () { return { title: this.config.title || "\u9700\u8981\u5148\u5b8c\u6210\u8eab\u4efd\u8ba4\u8bc1", bodyContent: f.formatTemplate(a("template/floatbox/needVerify"), this.data) }; }, postRender: function () { this._super(), this.$elem.addClass("poplayer-needVerify"); }, bindEvent: function () { this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this)); }, hide: function (a) { this._super(), a && this.config.callBack && this.config.callBack({ status: "cancel" }); }, onSubmit: function (a) { this.hide(); } });
    return j;
});
define("template/floatbox/needVerify", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><span class="poplayer-mess"><em class="icon-warning-b"></em>\u4e3a\u4e86\u4fdd\u8bc1\u4ea4\u53cb\u5b89\u5168\u548c\u771f\u5b9e\u6027\uff0c\u8bf7\u5148\u5b8c\u6210\u624b\u673a\u53f7\u6216\u8eab\u4efd\u8bc1\u53f7\u8ba4\u8bc1</span></div><p class="poplayer-desc">\u82b1\u7530\u7528\u6237\u5747\u5df2\u5b8c\u6210\u8fc7\u8ba4\u8bc1</p></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box"><div><a href="/verified/mobile" target="_blank" class="btn btn-red ">\u53bb\u8ba4\u8bc1</a></div></div></div>');
        return p.join("");
    };
});
define("widget/box/floatBox/NeedAvatarBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Log"), i = a("model/UserData"), j = e.extend({ init: function (a, b) { this._super(a, b); }, preRender: function () { return { title: this.config.title || "\u9700\u8981\u4e0a\u4f20\u771f\u5b9e\u5934\u50cf", bodyContent: f.formatTemplate(a("template/floatbox/needAvatar"), this.data) }; }, postRender: function () { this._super(), this.$elem.addClass("poplayer-needAvatar"); }, bindEvent: function () { this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this)); }, hide: function (a) { this._super(), a && this.config.callBack && this.config.callBack({ status: "cancel" }); }, onSubmit: function (a) { this.hide(); } });
    return j;
});
define("template/floatbox/needAvatar", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><span class="poplayer-mess"><em class="icon-warning-b"></em>', content, '</span></div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box"><div><a href="/settings/face" target="_blank" class="btn btn-red ">\u53bb\u4e0a\u4f20\u5934\u50cf</a></div></div></div>');
        return p.join("");
    };
});
define("widget/tips/FastTips", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = e.extend({
        init: function (a, b) { this.$elem = null, this.data = a, this.config = b, this._timer = null; },
        render: function () {
            this.$elem = d('<div class="fast-tips js-top-tips"></div>').appendTo("body");
            return this.$elem;
        },
        show: function (a, b, c) {
            this.$elem === null && this.render();
            !c || c === "" ? this.$elem.hide() : (this.$triggerElem = a, this._timer && clearTimeout(this._timer), b = b || "success", b === "error" ? c = '<div class="fast-tips-inner"><p class="text-middle-tips"><span class="fS14"><em class="icon-error-m"></em>' + c + "</span></p></div>" : c = '<div class="fast-tips-inner"><p class="text-middle-tips"><span class="fS14"><em class="icon-correct-m"></em>' + c + "</span></p></div>", this.$elem.html(c), this.setPosition(), this.onTimerClose());
        },
        onTimerClose: function () {
            var a = this;
            this._timer = setTimeout(function () { a.onHide(); }, 2e3);
        },
        onHide: function () {
            var a = this;
            this.$elem.stop().animate({ duration: 600, easing: "easeInOutExpo", height: 0, marginTop: 0 }, function () { a.$elem.hide(); });
        },
        setPosition: function () {
            var a = this.$triggerElem.offset();
            this.$elem.css({ display: "block", top: a.top, left: a.left - this.$elem.width() / 2 + this.$triggerElem.width() / 2, height: 0, marginTop: 0 });
            var b = this.$elem[0].scrollHeight;
            this.$elem.stop().animate({ duration: 600, easing: "easeInOutExpo", height: b, marginTop: "-" + (b + 5) + "px" });
        }
    }), h = null;
    return {
        getInstance: function () {
            h == null && (h = new g);
            return h;
        },
        show: function (a, b) { d.isPlainObject(arguments[0]) ? this.getInstance().show(arguments[0].$trigger, arguments[0].type, arguments[0].text) : this.getInstance().show($trigger, a, b); }
    };
});
define("utils/suggest/EmailSuggest", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = d(window), h = e.extend({
        init: function (a, b) { this.$inputElem = a, this.$elem = null, this.config = b || {}, this.$userNameLabel = this.$inputElem.parent().find(".js-usernameLabel"), this.isShow = !1, this.bindEvent(); },
        bindEvent: function () {
            this.$inputElem.bind("paste cut input keydown", d.proxy(this.input, this)), this.$inputElem.bind("focus", d.proxy(this.onFocus, this)), this.$inputElem.bind("blur", d.proxy(function () {
                var a = this;
                this.blurTimer = setTimeout(function () { a.onBlur(); }, 100);
            }, this));
        },
        render: function () {
            if (this.$elem === null) {
                var a = this.config.title ? "<h3>" + this.config.title + "</h3>" : "";
                this.$elem = d("<div>" + a + '<ul class="js-list"></ul></div>'), this.postRender();
            }
            return this.$elem;
        },
        postRender: function () {
            var a = this;
            this.$elem.addClass(this.config.className), this.$listElem = this.$elem.find(".js-list"), this.$listElem.delegate("li", "mouseover", function (b) {
                var c = d(b.currentTarget), e = c.data("index");
                a.currentItem(e);
            }), this.$listElem.delegate("li", "click", function (b) { a.blurTimer && clearTimeout(a.blurTimer), a.onSubmit(); });
        },
        input: function (a) {
            var b = a.which || a.keyCode;
            if (b === 38 || b === 40 || b === 13 || b === 27 || b === 9)
                switch (b) {
                    case 38:
                        a.preventDefault(), this.curPrevItem();
                        break;
                    case 40:
                        a.preventDefault(), this.curNextItem();
                        break;
                    case 13:
                        this.onSubmit();
                        break;
                    case 27:
                        a.preventDefault(), this.hide();
                        break;
                    case 9:
                        this.onSubmit();
                        break;
                    default:
                }
            else {
                var c = this;
                this.timer && clearTimeout(this.timer), this.timer = setTimeout(function () { c.onInput(a); }, 30);
            }
        },
        onFocus: function () {
            var a = d.trim(this.$inputElem.val()), b = this.getInputValHash(a);
            d.inArray(b.suffix, h.mailArray) === -1 && this.$inputElem.trigger("keydown");
        },
        onBlur: function () {
            var a = this.getInputValHash(), b = this.inMailArrayIndex(a.suffix);
            this.$listElem && this.$userNameLabel.is(":hidden") && (a.suffix === "" || b !== -1) && this.onSubmit(), this.hide();
        },
        onInput: function (a) {
            this.render();
            var b = f.encodeSpecialHtmlChar(d.trim(this.$inputElem.val()));
            if (b === "") this.hide();
            else {
                var c = this.getInputValHash();
                this.filterList(b, c.suffix);
                if (this.mailArray.length === 0) {
                    this.hide();
                    return;
                }
                this.$listElem.html(this.renderList(c.key)), this.isShow || this.show(), this.currentItem(0);
            }
        },
        getInputValHash: function () {
            var a = f.encodeSpecialHtmlChar(d.trim(this.$inputElem.val())), b = a.indexOf("@"), c = "", e = "";
            b !== -1 ? (c = a.substring(0, b), e = a.substr(b + 1, a.length)) : c = a;
            return { key: c, suffix: e };
        },
        filterList: function (a, b) {
            this.mailArray = [];
            if (!b) this.mailArray = d.merge(this.mailArray, h.mailArray), /^[0-9]*$/.test(a) && this.mailArray.unshift("");
            else for (var c = 0, e = h.mailArray.length; c < e; c++) h.mailArray[c].indexOf(b) === 0 && this.mailArray.push(h.mailArray[c]);
        },
        inMailArrayIndex: function (a) {
            var b = -1;
            for (var c = 0, d = h.mailArray.length; c < d; c++)
                if (h.mailArray[c].indexOf(a) === 0) {
                    b = c;
                    break;
                }
            return b;
        },
        renderList: function (a) {
            var b = [], c = 0;
            for (c, len = this.mailArray.length; c < len; c++) b.push('<li data-index="' + c + '"">'), b.push(a), this.mailArray[c] !== "" && b.push("@"), b.push(this.mailArray[c]), b.push("</li>");
            this.index = -1;
            return b.join("");
        },
        curPrevItem: function () {
            var a = this.index - 1;
            a < 0 && (a = this.mailArray.length - 1), this.currentItem(a);
        },
        curNextItem: function () {
            var a = this.index + 1;
            a > this.mailArray.length - 1 && (a = 0), this.currentItem(a);
        },
        currentItem: function (a) { this.index = a, this.$listElem.find("* > li").removeClass("current").eq(a).addClass("current"); },
        setInputVal: function () { this.$listElem && this.index !== -1 && this.$inputElem.val(this.$listElem.find("* > li").eq(this.index).html()).trigger("email:complete"); },
        onSubmit: function () { this.setInputVal(), this.hide(); },
        show: function () { this.isShow = !0, this.$elem.appendTo("body"), this.setPosition(), g.bind("resize", d.proxy(this.resizeHandler, this)); },
        hide: function () { this.isShow = !1, this.$elem && this.$elem.detach(), this.index = -1, g.unbind("resize", d.proxy(this.resizeHandler, this)); },
        setPosition: function () {
            var a = this.$inputElem.parent().offset();
            this.$elem.css({ left: a.left, top: a.top + this.$inputElem.height() + 5 });
        },
        resizeHandler: function () { this.isShow && this.setPosition(); }
    });
    h.mailArray = ["163.com", "126.com", "yeah.net", "qq.com", "vip.163.com", "vip.126.com", "188.com", "gmail.com", "sina.com", "hotmail.com"];
    return h;
});
define("task/page/login/sliderUser", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task");
    (new e("LoginSliderUser", function () {
        var b = d("#sliderUserbox");
        if (b.size() > 0) {
            var c = a("module/login/SliderUserBox");
            new c(b);
        }
    })).add();
});
define("module/login/SliderUserBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = d(window), g = e.extend({
        init: function (a) {
            this.$userList = a.find(".js-userList"), this.$prevNavBar = a.find(".js-prev-navbar"), this.$nextNavBar = a.find(".js-next-navbar"), this.$allImages = a.find(".js-preview-img"), this.$jsUserItem = a.find(".js-userItem"), this.$defaultUserBox = a;
            this.$allImages.size() !== 0 && (this.ResolutionRange = { 0: 599, 600: 783, 784: 964, 965: 1574, 1575: 9999 }, this.isAnimationMethod = this.supportCss3(), this.isIE6 = this.isIE6(), this.aniLock = !1, this.resizeAdjustice(), this.bindEvent());
        },
        bindEvent: function () { this.$defaultUserBox.delegate(".prev-trigger", "click", d.proxy(this.rightScrolling, this)).delegate(".next-trigger", "click", d.proxy(this.rightScrolling, this)), this.$allImages.bind("load", this.imageLoaded), this.isIE6 && this.$jsUserItem.hover(function () { d(this).addClass("hover"); }, function () { d(this).removeClass("hover"); }), f.bind("resize", d.proxy(this.resizeAdjustice, this)); },
        loadImages: function (a, b) {
            var c = f.height(), e = typeof a == "undefined" ? 0 : a, g = function (a) {
                var f = d(this);
                if (parseInt(f.attr("loaded")) !== 1) {
                    var g = f.offset();
                    if (g.top >= 0 + e && g.top < c + e || b) {
                        var h = f.data("src");
                        this.src = h;
                    }
                }
            };
            this.$allImages.each(g);
        },
        imageLoaded: function () {
            var a = this.src;
            a.indexOf("page/login/placeholder.png") === -1 && d(this).css({ visibility: "visible" }).hide().fadeIn(1500).attr("loaded", "1");
        },
        rightScrolling: function (a) {
            if (!this.aniLock) {
                var b = -1, c = a.currentTarget;
                c.className.indexOf("prev") !== -1 && (b = 1);
                var d = 183, e = f.height(), g = e - e % d, h = this.$userList.height(), i = parseInt(this.$userList.css("margin-top"), 10), j = Math.abs(i);
                b < 0 ? j + e + g > h && (g = h - (j + e) - 3) : i + g > 0 && (g = j);
                var k = (b < 0 ? "-" : "+") + "=" + g + "px", l = this;
                this.animating(k, !0, function () {
                    h = l.$userList.height(), i = parseInt(l.$userList.css("margin-top"), 10);
                    var a = i === 0, b = Math.abs(i) + e + 3 === h;
                    if (!a && !b) l.$prevNavBar.removeClass("hidden"), l.$nextNavBar.removeClass("hidden");
                    else {
                        if (a) {
                            l.$prevNavBar.addClass("hidden");
                            return;
                        }
                        if (b) {
                            l.$nextNavBar.addClass("hidden");
                            return;
                        }
                    }
                }), this.isIE6 || this.loadImages(g);
            }
        },
        animating: function (a, b, c) {
            if (b) {
                var d = this;
                this.aniLock = !0, this.$userList.animate({ "margin-top": a }, 1500, function () { d.aniLock = !1, typeof c == "function" && c(); });
            } else this.$userList.css("margin-top", a);
        },
        resizeAdjustice: function () {
            var a = f.height();
            a <= 600 ? d(document.body).height(600) : d(document.body).removeAttr("style");
            if (!this.isAnimationMethod)
                switch (this.checkViewMode()) {
                    case 0:
                        this.$defaultUserBox.hide();
                        break;
                    case 1:
                        this.$defaultUserBox.show().width("180px");
                        break;
                    case 2:
                        this.$defaultUserBox.show().width("363px");
                        break;
                    case 3:
                        this.$defaultUserBox.show().width("546px");
                        break;
                    default:
                }
            this.animating(0, !1);
            var b = this;
            setTimeout(function () { b.loadImages(undefined, b.isIE6); }, 1);
        },
        checkViewMode: function () {
            var a = 0, b = f.width();
            for (var c in this.ResolutionRange) {
                var d = c, e = this.ResolutionRange[c];
                if (b > d && b < e) break;
                a++;
            }
            return a - 1;
        },
        supportCss3: function () { return !(d.browser.msie && d.browser.version < 9); },
        isIE6: function () { return d.browser.msie && d.browser.version == 6; }
    });
    return g;
});
define("page/login", function (a, b, c) { a("task/page/login/login"), a("task/page/login/sliderUser"), a("task/basic/TaskManager").run(); });