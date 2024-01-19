"use strict";
function _typeof(t) {
  return (_typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            "function" == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        })(t);
}
!(function () {
  var t = function () {
    var t,
      e,
      o = [],
      n = window,
      r = n;
    for (; r; ) {
      try {
        if (r.frames.__tcfapiLocator) {
          t = r;
          break;
        }
      } catch (t) {}
      if (r === n.top) break;
      r = r.parent;
    }
    t ||
      (!(function t() {
        var e = n.document,
          o = !!n.frames.__tcfapiLocator;
        if (!o)
          if (e.body) {
            var r = e.createElement("iframe");
            (r.style.cssText = "display:none"),
              (r.name = "__tcfapiLocator"),
              e.body.appendChild(r);
          } else setTimeout(t, 5);
        return !o;
      })(),
      (n.__tcfapi = function () {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        if (!n.length) return o;
        "setGdprApplies" === n[0]
          ? n.length > 3 &&
            2 === parseInt(n[1], 10) &&
            "boolean" == typeof n[3] &&
            ((e = n[3]), "function" == typeof n[2] && n[2]("set", !0))
          : "ping" === n[0]
          ? "function" == typeof n[2] &&
            n[2]({ gdprApplies: e, cmpLoaded: !1, cmpStatus: "stub" })
          : o.push(n);
      }),
      n.addEventListener(
        "message",
        function (t) {
          var e = "string" == typeof t.data,
            o = {};
          if (e)
            try {
              o = JSON.parse(t.data);
            } catch (t) {}
          else o = t.data;
          var n = "object" === _typeof(o) && null !== o ? o.__tcfapiCall : null;
          n &&
            window.__tcfapi(
              n.command,
              n.version,
              function (o, r) {
                var a = {
                  __tcfapiReturn: {
                    returnValue: o,
                    success: r,
                    callId: n.callId,
                  },
                };
                t &&
                  t.source &&
                  t.source.postMessage &&
                  t.source.postMessage(e ? JSON.stringify(a) : a, "*");
              },
              n.parameter
            );
        },
        !1
      ));
  };
  "undefined" != typeof module ? (module.exports = t) : t();
})();

function show_pingReturn(pingReturn) {
  // custom code displays the properties of pingReturn data object
  console.groupCollapsed("show_pingReturn");
  console.log("value cmpId is " + pingReturn.cmpId);
  console.log("value cmpVersion is " + pingReturn.cmpVersion);
  console.log("value cmpLoaded is " + pingReturn.cmpLoaded);
  console.log("value gdprApplies is " + pingReturn.gdprApplies);
  console.log("value tcfPolicyVersion is " + pingReturn.tcfPolicyVersion);
  console.log("value cmpLoaded is " + pingReturn.cmpLoaded);
  console.log("value cmpStatus is " + pingReturn.cmpStatus);
  console.log("value displayStatus is " + pingReturn.displayStatus);
  console.log("value apiVersion is " + pingReturn.apiVersion);
  console.groupEnd("show_pingReturn");
}

__tcfapi("addEventListener", 2, function (tcdata, success) {
  if (success) {
    // call TCF API ping command
    __tcfapi("ping", 2, (pingReturn) => {
      // call custom code to display values of pingReturn data object properties
      show_pingReturn(pingReturn);
    });

    if (tcdata.eventStatus === "useractioncomplete") {
      // call code when user has made an action
    } else if (tcdata.eventStatus === "tcloaded") {
      // call code when consent string has loaded
    } else if (tcdata.eventStatus === "cmpuishown") {
      // call code when cmp message is shown
    }
  }
});

function show_tcdata(success, tcdata) {
  // your custom code here
  console.groupCollapsed("show_tcdata");
  console.log("update to the tcdata object through message or privacy manager");
  console.log("the value of success is " + success);
  console.log("tcdata eventStatus is " + tcdata.eventStatus);
  console.log("the value of tcdata is: ");
  console.log({ tcdata });
  console.groupEnd("show_tcdata");
}

__tcfapi("addEventListener", 2, function (tcdata, success) {
  if (success) {
    show_tcdata(success, tcdata);
    if (tcdata.eventStatus === "useractioncomplete") {
      // call code when user has made an action
      show_tcdata(success, tcdata);
    } else if (tcdata.eventStatus === "tcloaded") {
      // remove event listener when consent string has loaded
      __tcfapi(
        "removeEventListener",
        2,
        (success) => {
          console.log("removed event listener: " + tcdata.listenerId);
        },
        tcdata.listenerId
      );
    } else if (tcdata.eventStatus === "cmpuishown") {
      // call code when cmp message is shown
    }
  }
});
