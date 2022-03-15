var _tt = function () {
    let id = 'tt';
    let top = 3;
    let left = 3;
    let maxw = 300;
    let speed = 8;
    let timer = 10;
    let endalpha = 95;
    let alpha = 0;
    let tt, t, /*c,b,*/h;
    let ie = document.getElementsByTagName('*') ? true : false;
    return {
        show: function(e,v,w) {
            let t = getEventTarget(e);
            addEvent(t, 'mouseout', this.hide);
            t.style.cursor = 'help';
            if (tt == null) {
                tt = document.createElement('div');
                tt.setAttribute('id',id);
                document.body.appendChild(tt);
                tt.style.opacity = 0;
                if (ie) tt.style.filter = 'alpha(opacity=0)';
            }
            tt.style.display = 'block';
            tt.style.position = 'absolute';
            tt.innerHTML = v;
            tt.style.width = w ? w + 'px' : 'auto';
            if (tt.offsetWidth > maxw) tt.style.width = maxw + 'px';
            h = parseInt(tt.offsetHeight) + top;
            clearInterval(tt.timer);
            tt.timer = setInterval(function() {_tt.fade(1)}, timer);
            dd = getOffset(t);
            tt.style.top = (dd.top-h+4) + 'px';
            // tt.style.left = (dd.left + 13) + 'px';
        },
        pos: function (e) {
            let u = ie ? Event.clientY + document.documentElement.scrollTop : e.pageY;
            let l = ie ? Event.clientX + document.documentElement.scrollLeft : e.pageX;
            tt.style.top = (u - h) + 'px';
            tt.style.left = (l + left) + 'px';
        },
        fade: function (d) {
            let a = alpha;
            if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
                let i = speed;
                if (endalpha - a < speed && d == 1) {i = endalpha - a;
                } else if (alpha < speed && d == -1) {i = a;}
                alpha = a + (i * d);
                tt.style.opacity = alpha * 0.01;
                if (ie) tt.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
                clearInterval(tt.timer);
                if (d == -1) {tt.style.display = 'none'}
            }
        },
        hide: function (e) {
            clearInterval(tt.timer);
            tt.timer = setInterval(function() {_tt.fade(-1)}, timer);
        }
    };
}();

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        let box = elem.getBoundingClientRect();
        let body = document.body;
        let docElem = document.documentElement;
        let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        let clientTop = docElem.clientTop || body.clientTop || 0;
        let clientLeft = docElem.clientLeft || body.clientLeft || 0;
        let top = box.top + scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left) };
    } else {
        let top = 0, left = 0;
        while (elem) {
            top = top + parseInt(elem.offsetTop);
            left = left + parseInt(elem.offsetLeft);
            elem = elem.offsetParent;
        }
        return {top: top, left: left}
    }
}

function getEventTarget(e) {
    let target = e.target || e.srcElement;
    if (typeof target == 'undefined') return e;
    if (target.nodeType == 3) target = target.parentNode;
    return target;
}

let addEvent = (function() {
    if (document.addEventListener) {
        return function(obj, type, fn, useCapture) {
            obj.addEventListener(type, fn, useCapture);
        }
    } else if (document.attachEvent) {
        return function(obj, type, fn, useCapture) {
            obj.attachEvent('on' + type, fn);
        }
    } else {
        return function(obj, type, fn, useCapture) {
            obj["on" + type] = fn;
        }
    }
}) ();