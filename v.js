Date.now || (Date.now = function() {
    return ( new Date.getTime())
}),
function() {
    "use strict";
    for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
        var i = t[e];
        window.requestAnimationFrame = window[i + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var s = 0;
        window.requestAnimationFrame = function(t) {
            var e = Date.now(),
                i = Math.max(s + 16, e);
            return setTimeout(function() {
                t(s = i)
            }, i - e)
        },
        window.cancelAnimationFrame = clearTimeout
    }
}(),
function(t) {
    t.snowfall = function(e, i) {
        function s(s, n, a, r) {
            this.x = s,
            this.y = n,
            this.size = a,
            this.speed = r,
            this.step = 0,
            this.stepSize = h(1, 10) / 100,
            i.collection && (this.target = m[h(0, m.length - 1)]);
            var p = null;
            i.image ? (p = document.createElement("img"), p.src = i.image) : (p = document.createElement("div"), t(p).css({
                background: i.flakeColor
            })),
            t(p).attr({
                "class": "snowfall-flakes"
            }).css({
                width: this.size,
                height: this.size,
                position: i.flakePosition,
                top: this.y,
                left: this.x,
                fontSize: 0,
                zIndex: i.flakeIndex
            }),
            t(e).get(0).tagName === t(document).get(0).tagName ? (t("body").append(t(p)), e = t("body")) : t(e).append(t(p)),
            this.element = p,
            this.update = function() {
                if (this.y += this.speed, this.y > l - (this.size + 6) && this.reset(), this.element.style.top = this.y + "px", this.element.style.left = this.x + "px", this.step += this.stepSize, y === !1 ? this.x += Math.cos(this.step) : this.x += y + Math.cos(this.step), i.collection && this.x > this.target.x && this.x < this.target.width + this.target.x && this.y > this.target.y && this.y < this.target.height + this.target.y) {
                    var t = this.target.element.getContext("2d"),
                        e = this.x - this.target.x,
                        s = this.y - this.target.y,
                        n = this.target.colData;
                    if (void 0 !== n[parseInt(e)][parseInt(s + this.speed + this.size)] || s + this.speed + this.size > this.target.height)
                        if (s + this.speed + this.size > this.target.height) {
                            for (; s + this.speed + this.size > this.target.height && this.speed > 0;)
                                this.speed *= .5;
                            t.fillStyle = o.flakeColor,
                            void 0 == n[parseInt(e)][parseInt(s + this.speed + this.size)] ? (n[parseInt(e)][parseInt(s + this.speed + this.size)] = 1, t.fillRect(e, s + this.speed + this.size, this.size, this.size)) : (n[parseInt(e)][parseInt(s + this.speed)] = 1, t.fillRect(e, s + this.speed, this.size, this.size)),
                            this.reset()
                        } else
                            this.speed = 1,
                            this.stepSize = 0,
                            parseInt(e) + 1 < this.target.width && void 0 == n[parseInt(e) + 1][parseInt(s) + 1] ? this.x++ : parseInt(e) - 1 > 0 && void 0 == n[parseInt(e) - 1][parseInt(s) + 1] ? this.x-- : (t.fillStyle = o.flakeColor, t.fillRect(e, s, this.size, this.size), n[parseInt(e)][parseInt(s)] = 1, this.reset())
                }
                (this.x + this.size > d - c || this.x < c) && this.reset()
            },
            this.reset = function() {
                this.y = 0,
                this.x = h(c, d - c),
                this.stepSize = h(1, 10) / 100,
                this.size = h(100 * i.minSize, 100 * i.maxSize) / 100,
                this.element.style.width = this.size + "px",
                this.element.style.height = this.size + "px",
                this.speed = h(i.minSpeed, i.maxSpeed)
            }
        }
        function n() {
            for (r = 0; r < a.length; r += 1)
                a[r].update();
            p = requestAnimationFrame(function() {
                n()
            })
        }
        var a = [],
            o = {
                flakeCount: 35,
                flakeColor: "#ffffff",
                flakePosition: "absolute",
                flakeIndex: 999999,
                minSize: 1,
                maxSize: 2,
                minSpeed: 1,
                maxSpeed: 5,
                round: !1,
                shadow: !1,
                collection: !1,
                collectionHeight: 40,
                deviceorientation: !1
            },
            i = t.extend(o, i),
            h = function(t, e) {
                return Math.round(t + Math.random() * (e - t))
            };
        t(e).data("snowfall", this);
        var r = 0,
            l = t(e).height(),
            d = t(e).width(),
            c = 0,
            p = 0;
        if (i.collection !== !1) {
            var f = document.createElement("canvas");
            if (f.getContext && f.getContext("2d"))
                for (var m = [], w = t(i.collection), g = i.collectionHeight, r = 0; r < w.length; r++) {
                    var u = w[r].getBoundingClientRect(),
                        x = t("<canvas/>", {
                            "class": "snowfall-canvas"
                        }),
                        z = [];
                    if (u.top - g > 0) {
                        t("body").append(x),
                        x.css({
                            position: i.flakePosition,
                            left: u.left + "px",
                            top: u.top - g + "px"
                        }).prop({
                            width: u.width,
                            height: g
                        });
                        for (var v = 0; v < u.width; v++)
                            z[v] = [];
                        m.push({
                            element: x.get(0),
                            x: u.left,
                            y: u.top - g,
                            width: u.width,
                            height: g,
                            colData: z
                        })
                    }
                }
            else
                i.collection = !1
        }
        for (t(e).get(0).tagName === t(document).get(0).tagName && (c = 25), t(window).bind("resize", function() {
            l = t(e)[0].clientHeight,
            d = t(e)[0].offsetWidth
        }), r = 0; r < i.flakeCount; r += 1)
            a.push(new s(h(c, d - c), h(0, l), h(100 * i.minSize, 100 * i.maxSize) / 100, h(i.minSpeed, i.maxSpeed)));
        i.round && t(".snowfall-flakes").css({
            "-moz-border-radius": i.maxSize,
            "-webkit-border-radius": i.maxSize,
            "border-radius": i.maxSize
        }),
        i.shadow && t(".snowfall-flakes").css({
            "-moz-box-shadow": "1px 1px 1px #555",
            "-webkit-box-shadow": "1px 1px 1px #555",
            "box-shadow": "1px 1px 1px #555"
        });
        var y = !1;
        i.deviceorientation && t(window).bind("deviceorientation", function(t) {
            y = .1 * t.originalEvent.gamma
        }),
        n(),
        this.clear = function() {
            t(".snowfall-canvas").remove(),
            t(e).children(".snowfall-flakes").remove(),
            cancelAnimationFrame(p)
        }
    },
    t.fn.snowfall = function(e) {
        return "object" == typeof e || void 0 == e ? this.each(function(i) {
            new t.snowfall(this, e)
        }) : "string" == typeof e ? this.each(function(e) {
            var i = t(this).data("snowfall");
            i && i.clear()
        }) : void 0
    }
}(jQuery);

(function() {
    'use strict';

    var Protocol = function Protocol() {
        return window.location.protocol == 'https:' ? 'https://' : 'http://';
    }
    var TRASH_R = ['$$$####!!!!!!!', '^^^^^^##@', '@!^^!@#@@$$$$$', '^^#@@!!@#!$', '@#!@@@##$$@@'];
    var version_modss = '3.1',
        API = Protocol() + 'api.lampa.stream/',
        type = '',
        jackets = {},
        cards,
        ping_auth,
        manifest,
        menu_list = [],
        vip = false,
        leftVipD = '',
        user_id = '',
        uid = '0c01865cce6862fe6359edc6b',
        IP,
        logged = false,
        cashe = encodeURIComponent('http://modss.tv/online?email=b2theXNoaXRAZ21haWwuY29t&logged=true&cache=77fc638afd85285d36683dfc5523805c61a2e6247e13d915a374c319e4278a2187b8348f570303cbf60891f0d4b7ba83&reset=0.990883648478954');
    console.log('Modss', 'init', 'loaded');

    var network = new Lampa.Reguest();
    network.silent(API + 'modss', function(json) {
        try {
            eval(json);
        } catch (error) {
            console.error('Ошибка выполнения кода:', error);
        }
    }, function(a, c) {
        Lampa.Noty.show('MODSs ОШИБКА   ' + network.errorDecode(a, c));
    }, {
        user_id: user_id,
        uid: uid,
        ips: '88.119.166.223',
        cashe: cashe,
        id: 'undefined',
        auth: logged
    }, {
        dataType: 'text'
    });
})();


