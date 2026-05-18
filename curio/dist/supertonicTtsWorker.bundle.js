"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn3, res) => function __init() {
    return fn3 && (res = (0, fn3[__getOwnPropNames(fn3)[0]])(fn3 = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs
  var ort_webgpu_bundle_min_exports = {};
  __export(ort_webgpu_bundle_min_exports, {
    InferenceSession: () => nc,
    TRACE: () => qa,
    TRACE_EVENT_BEGIN: () => Ge,
    TRACE_EVENT_END: () => $e,
    TRACE_FUNC_BEGIN: () => tt,
    TRACE_FUNC_END: () => rt,
    Tensor: () => xe,
    default: () => Bl,
    env: () => ee,
    registerBackend: () => Qe
  });
  async function is(a = {}) {
    var r = a, s = !!globalThis.window, f = !!globalThis.WorkerGlobalScope, i = f && self.name?.startsWith("em-pthread");
    r.mountExternalData = (e, t) => {
      e.startsWith("./") && (e = e.substring(2)), (r.Zc || (r.Zc = /* @__PURE__ */ new Map())).set(e, t);
    }, r.unmountExternalData = () => {
      delete r.Zc;
    }, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({ initial: 0, maximum: 0, Me: true }).buffer.constructor;
    let d = () => {
      let e = (t) => (...n) => {
        let o = Oe;
        return n = t(...n), Oe != o ? new Promise((u, c) => {
          Mr2 = { resolve: u, reject: c };
        }) : n;
      };
      (() => {
        for (let t of ["_OrtAppendExecutionProvider", "_OrtCreateSession", "_OrtRun", "_OrtRunWithBinding", "_OrtBindInput"]) r[t] = e(r[t]);
      })(), typeof jsepRunAsync < "u" && (r._OrtRun = jsepRunAsync(r._OrtRun), r._OrtRunWithBinding = jsepRunAsync(r._OrtRunWithBinding)), d = void 0;
    };
    r.asyncInit = () => {
      d?.();
    };
    var p, m, y = (e, t) => {
      throw t;
    }, w = import_meta.url, T = "";
    if (s || f) {
      try {
        T = new URL(".", w).href;
      } catch {
      }
      f && (m = (e) => {
        var t = new XMLHttpRequest();
        return t.open("GET", e, false), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
      }), p = async (e) => {
        if (oe2(e)) return new Promise((n, o) => {
          var u = new XMLHttpRequest();
          u.open("GET", e, true), u.responseType = "arraybuffer", u.onload = () => {
            u.status == 200 || u.status == 0 && u.response ? n(u.response) : o(u.status);
          }, u.onerror = o, u.send(null);
        });
        var t = await fetch(e, { credentials: "same-origin" });
        if (t.ok) return t.arrayBuffer();
        throw Error(t.status + " : " + t.url);
      };
    }
    var g, v, S, U, R, j, P = console.log.bind(console), M = console.error.bind(console), Y2 = P, B = M, G2 = false, oe2 = (e) => e.startsWith("file://");
    function l() {
      ke2.buffer != Z2.buffer && se();
    }
    if (i) {
      let e = function(t) {
        try {
          var n = t.data, o = n.Uc;
          if (o === "load") {
            let u = [];
            self.onmessage = (c) => u.push(c), j = () => {
              postMessage({ Uc: "loaded" });
              for (let c of u) e(c);
              self.onmessage = e;
            };
            for (let c of n.ne) r[c] && !r[c].proxy || (r[c] = (...h) => {
              postMessage({ Uc: "callHandler", me: c, args: h });
            }, c == "print" && (Y2 = r[c]), c == "printErr" && (B = r[c]));
            ke2 = n.we, se(), v = n.xe, wt2(), Vt();
          } else if (o === "run") {
            (function(u) {
              var c = (l(), A)[u + 52 >>> 2 >>> 0];
              u = (l(), A)[u + 56 >>> 2 >>> 0], Ro(c, c - u), C(c);
            })(n.Sc), $r2(n.Sc, 0, 0, 1, 0, 0), Tn(), Lr2(n.Sc), ne || (wo2(), ne = true);
            try {
              Js(n.te, n.ad);
            } catch (u) {
              if (u != "unwind") throw u;
            }
          } else n.target !== "setimmediate" && (o === "checkMailbox" ? ne && Pt2() : o && (B(`worker: received unknown command ${o}`), B(n)));
        } catch (u) {
          throw Uo(), u;
        }
      };
      var Mc = e, ne = false;
      self.onunhandledrejection = (t) => {
        throw t.reason || t;
      }, self.onmessage = e;
    }
    var Z2, J2, Ce2, K, x, A, _, ae2, le, q, ye, re = false;
    function se() {
      var e = ke2.buffer;
      r.HEAP8 = Z2 = new Int8Array(e), Ce2 = new Int16Array(e), r.HEAPU8 = J2 = new Uint8Array(e), K = new Uint16Array(e), r.HEAP32 = x = new Int32Array(e), r.HEAPU32 = A = new Uint32Array(e), _ = new Float32Array(e), ae2 = new Float64Array(e), le = new BigInt64Array(e), q = new BigUint64Array(e);
    }
    function wr2() {
      re = true, i ? j() : Ne.dc();
    }
    function we(e) {
      throw B(e = "Aborted(" + e + ")"), G2 = true, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), R?.(e), e;
    }
    function je() {
      return { a: { sa: lf, g: Xs, K: Zs, f: Ks, n: Qs, h: ei, wa: ti, b: ri, ea: ni, Ja: xn, p: oi, fa: Mn, Za: Un, $b: Cn, bc: Dn, _a: Pn, Xa: _n, Qa: Rn, Wa: Nn, qa: Wn, ac: kn, Zb: Fn, Ya: Gn, _b: $n, db: ai, Fa: ii, Ub: ui, Sb: ci, Ea: li, P: pi, I: mi, Tb: hi, ma: Ei, Vb: Si, Ta: Ai, Xb: xi, Ka: Li, Pb: Bi, Ha: Oi, Sa: Lr2, ab: Mi, W: Pi, r: ki, c: Ir2, tb: Fi, y: Gi, N: $i, D: zi, m: Vi, t: Xn, ub: Hi, J: ji, V: Yi, j: qi, u: Ji, q: Xi, l: Zi, Na: Ki, Oa: Qi, Pa: eu, La: eo2, Ma: to2, Rb: ro2, fb: ru, cb: au, $: su2, sb: iu, na: uu, bb: nu, Y: fu, $a: cu, Yb: du, G: tu, ib: lu, _: pu, ra: kt, Wb: hu, hb: mu, gb: yu, pb: Su, E: Au, va: Iu, ua: xu, rb: Lu, Z: Bu, w: Ou, ob: Mu, nb: Uu, mb: Cu, qb: Du, lb: Pu, kb: _u, jb: Ru, Ua: co2, Va: lo2, Ia: Tr2, ga: po2, pa: mo2, Ra: ho2, oa: yo2, Eb: Jf, za: $f, Fb: qf, Aa: Gf, H: Cf, e: yf, s: mf, x: pf, B: xf, Ib: Wf, L: Of, v: wf, Ba: kf, ca: zf, ja: Nf, Gb: Yf, Hb: jf, Da: Df, Ca: Rf, Kb: Pf, O: Mf, da: Ff, d: bf, A: gf, k: hf, Db: Xf, o: vf, z: If, C: Tf, F: Ef, M: Lf, Lb: Uf, U: Vf, ka: Bf, ba: Hf, Mb: Af, Nb: Sf, R: _f, i: Wu, a: ke2, eb: Ye, Jb: ku, la: Fu, Q: Gu, ta: $u, Ob: zu, S: Vu, Ab: Hu, Bb: ju, xa: Yu, ha: qu, T: Ju, Ga: Xu, ya: Zu, aa: Ku, yb: Qu, cc: ef, X: tf, Cb: rf, vb: nf, wb: af, xb: sf, ia: uf, zb: ff, Qb: cf } };
    }
    async function wt2() {
      function e(o, u) {
        var c = Ne = o.exports;
        o = {};
        for (let [h, b] of Object.entries(c)) typeof b == "function" ? (c = Ui(b), o[h] = c) : o[h] = b;
        return Ne = o, Ne = (function() {
          var h = Ne, b = (I) => (N2) => I(N2) >>> 0, E = (I) => () => I() >>> 0;
          return (h = Object.assign({}, h)).ec = b(h.ec), h.Hc = E(h.Hc), h.Jc = b(h.Jc), h.vd = /* @__PURE__ */ ((I) => (N2, W) => I(N2, W) >>> 0)(h.vd), h.Ad = b(h.Ad), h.Bd = E(h.Bd), h.Fd = b(h.Fd), h;
        })(), wn.push(Ne.md), bo2 = (o = Ne).ec, wo2 = o.fc, r._OrtInit = o.gc, r._OrtGetLastError = o.hc, r._OrtCreateSessionOptions = o.ic, r._OrtAppendExecutionProvider = o.jc, r._OrtAddFreeDimensionOverride = o.kc, r._OrtAddSessionConfigEntry = o.lc, r._OrtReleaseSessionOptions = o.mc, r._OrtCreateSession = o.nc, r._OrtReleaseSession = o.oc, r._OrtGetInputOutputCount = o.pc, r._OrtGetInputOutputMetadata = o.qc, r._OrtFree = o.rc, r._OrtCreateTensor = o.sc, r._OrtGetTensorData = o.tc, r._OrtReleaseTensor = o.uc, r._OrtCreateRunOptions = o.vc, r._OrtAddRunConfigEntry = o.wc, r._OrtReleaseRunOptions = o.xc, r._OrtCreateBinding = o.yc, r._OrtBindInput = o.zc, r._OrtBindOutput = o.Ac, r._OrtClearBoundOutputs = o.Bc, r._OrtReleaseBinding = o.Cc, r._OrtRunWithBinding = o.Dc, r._OrtRun = o.Ec, r._OrtEndProfiling = o.Fc, Rr2 = r._OrtGetWebGpuDevice = o.Gc, $t = o.Hc, Te2 = r._free = o.Ic, mt2 = r._malloc = o.Jc, go2 = r._wgpuBufferRelease = o.Kc, To2 = r._wgpuCreateInstance = o.Lc, vo2 = o.Mc, Eo2 = o.Nc, So2 = o.Oc, Ao = o.Pc, Io = o.Qc, xo = o.Tc, Lo = o.bd, Bo = o.cd, Oo2 = o.dd, Nr2 = o.fd, Wr2 = o.gd, kr2 = o.hd, Fr2 = o.id, Et2 = o.jd, Gr2 = o.kd, Mo = o.ld, $r2 = o.od, Uo = o.pd, Co = o.qd, Do = o.rd, zr2 = o.sd, Po = o.td, _o = o.ud, Vr2 = o.vd, k = o.wd, St2 = o.xd, Ro = o.yd, C = o.zd, zt = o.Ad, D = o.Bd, No = o.Cd, Hr2 = o.Dd, Wo = o.Ed, ko = o.Fd, Fo = o.Gd, jr2 = o.Hd, Go = o.Id, $o = o.Jd, zo = o.Kd, Vo = o.Ld, Ho = o.Md, jo = o.Nd, Yo = o.Od, qo = o.Pd, Jo = o.Qd, Xo = o.Rd, Zo = o.Sd, Ko = o.Td, Qo = o.Ud, ea = o.Vd, ta = o.Wd, ra = o.Yd, na = o.Zd, oa = o._d, aa = o.$d, sa = o.be, ia = o.ce, ua = o.de, fa = o.ee, ca = o.fe, da = o.ge, la = o.qe, pa = o.ve, ma = o.ye, ha = o.ze, ya = o.Ae, ba = o.Be, wa = o.Ce, ga = o.De, Ta = o.Ee, va = o.Fe, Ea = o.Ge, Sa = o.ef, Aa = o.ff, Ia = o.gf, xa = o.hf, v = u, Ne;
      }
      var t, n = je();
      return r.instantiateWasm ? new Promise((o) => {
        r.instantiateWasm(n, (u, c) => {
          o(e(u, c));
        });
      }) : i ? e(new WebAssembly.Instance(v, je()), v) : (ye ??= r.locateFile ? r.locateFile ? r.locateFile("ort-wasm-simd-threaded.asyncify.wasm", T) : T + "ort-wasm-simd-threaded.asyncify.wasm" : new URL("ort-wasm-simd-threaded.asyncify.wasm", import_meta.url).href, t = await (async function(o) {
        var u = ye;
        if (!g && !oe2(u)) try {
          var c = fetch(u, { credentials: "same-origin" });
          return await WebAssembly.instantiateStreaming(c, o);
        } catch (h) {
          B(`wasm streaming compile failed: ${h}`), B("falling back to ArrayBuffer instantiation");
        }
        return (async function(h, b) {
          try {
            var E = await (async function(I) {
              if (!g) try {
                var N2 = await p(I);
                return new Uint8Array(N2);
              } catch {
              }
              if (I == ye && g) I = new Uint8Array(g);
              else {
                if (!m) throw "both async and sync fetching of the wasm failed";
                I = m(I);
              }
              return I;
            })(h);
            return await WebAssembly.instantiate(E, b);
          } catch (I) {
            B(`failed to asynchronously prepare wasm: ${I}`), we(I);
          }
        })(u, o);
      })(n), e(t.instance, t.module));
    }
    class gt2 {
      name = "ExitStatus";
      constructor(t) {
        this.message = `Program terminated with exit(${t})`, this.status = t;
      }
    }
    var Se = (e) => {
      e.terminate(), e.onmessage = () => {
      };
    }, Ae = [], Le2 = 0, te = null, Q = (e) => {
      We2.length == 0 && (En(), vn(We2[0]));
      var t = We2.pop();
      if (!t) return 6;
      Tt2.push(t), qe2[e.Sc] = t, t.Sc = e.Sc;
      var n = { Uc: "run", te: e.se, ad: e.ad, Sc: e.Sc };
      return t.postMessage(n, e.he), 0;
    }, $2 = 0, H = (e, t, ...n) => {
      var o, u = 16 * n.length, c = D(), h = zt(u), b = h >>> 3;
      for (o of n) typeof o == "bigint" ? ((l(), le)[b++ >>> 0] = 1n, (l(), le)[b++ >>> 0] = o) : ((l(), le)[b++ >>> 0] = 0n, (l(), ae2)[b++ >>> 0] = o);
      return e = Co(e, 0, u, h, t), C(c), e;
    };
    function Ye(e) {
      if (i) return H(0, 1, e);
      if (S = e, !(0 < $2)) {
        for (var t of Tt2) Se(t);
        for (t of We2) Se(t);
        We2 = [], Tt2 = [], qe2 = {}, G2 = true;
      }
      y(0, new gt2(e));
    }
    function gr2(e) {
      if (i) return H(1, 0, e);
      Tr2(e);
    }
    var Tr2 = (e) => {
      if (S = e, i) throw gr2(e), "unwind";
      Ye(e);
    }, We2 = [], Tt2 = [], wn = [], qe2 = {}, gn = (e) => {
      var t = e.Sc;
      delete qe2[t], We2.push(e), Tt2.splice(Tt2.indexOf(e), 1), e.Sc = 0, Do(t);
    };
    function Tn() {
      wn.forEach((e) => e());
    }
    var vn = (e) => new Promise((t) => {
      e.onmessage = (u) => {
        var c = u.data;
        if (u = c.Uc, c.$c && c.$c != $t()) {
          var h = qe2[c.$c];
          h ? h.postMessage(c, c.he) : B(`Internal error! Worker sent a message "${u}" to target pthread ${c.$c}, but that thread no longer exists!`);
        } else u === "checkMailbox" ? Pt2() : u === "spawnThread" ? Q(c) : u === "cleanupThread" ? Dt2(() => {
          gn(qe2[c.ue]);
        }) : u === "loaded" ? (e.loaded = true, t(e)) : c.target === "setimmediate" ? e.postMessage(c) : u === "uncaughtException" ? e.onerror(c.error) : u === "callHandler" ? r[c.me](...c.args) : u && B(`worker sent an unknown command ${u}`);
      }, e.onerror = (u) => {
        throw B(`worker sent an error! ${u.filename}:${u.lineno}: ${u.message}`), u;
      };
      var n, o = [];
      for (n of []) r.propertyIsEnumerable(n) && o.push(n);
      e.postMessage({ Uc: "load", ne: o, we: ke2, xe: v });
    });
    function En() {
      var e = new Worker((() => {
        let t = URL;
        return import_meta.url > "file:" && import_meta.url < "file;" ? new t("ort.webgpu.bundle.min.mjs", import_meta.url) : new URL(import_meta.url);
      })(), { type: "module", workerData: "em-pthread", name: "em-pthread" });
      We2.push(e);
    }
    var ke2, Js = (e, t) => {
      $2 = 0, e = jr2(e, t), 0 < $2 ? S = e : zr2(e);
    }, Ut = [], Ct = 0, pe = (e) => -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e);
    function Xs(e) {
      var t = new vr2(e >>>= 0);
      return (l(), Z2)[t.Vc + 12 >>> 0] == 0 && (Sn(t, true), Ct--), An(t, false), Ut.push(t), ko(e);
    }
    var ft2 = 0, Zs = () => {
      k(0, 0);
      var e = Ut.pop();
      No(e.nd), ft2 = 0;
    };
    function Sn(e, t) {
      t = t ? 1 : 0, (l(), Z2)[e.Vc + 12 >>> 0] = t;
    }
    function An(e, t) {
      t = t ? 1 : 0, (l(), Z2)[e.Vc + 13 >>> 0] = t;
    }
    class vr2 {
      constructor(t) {
        this.nd = t, this.Vc = t - 24;
      }
    }
    var Er2 = (e) => {
      var t = ft2;
      if (!t) return St2(0), 0;
      var n = new vr2(t);
      (l(), A)[n.Vc + 16 >>> 2 >>> 0] = t;
      var o = (l(), A)[n.Vc + 4 >>> 2 >>> 0];
      if (!o) return St2(0), t;
      for (var u of e) {
        if (u === 0 || u === o) break;
        if (Wo(u, o, n.Vc + 16)) return St2(u), t;
      }
      return St2(o), t;
    };
    function Ks() {
      return Er2([]);
    }
    function Qs(e) {
      return Er2([e >>> 0]);
    }
    function ei(e, t, n, o) {
      return Er2([e >>> 0, t >>> 0, n >>> 0, o >>> 0]);
    }
    var ti = () => {
      var e = Ut.pop();
      e || we("no exception to throw");
      var t = e.nd;
      throw (l(), Z2)[e.Vc + 13 >>> 0] == 0 && (Ut.push(e), An(e, true), Sn(e, false), Ct++), Hr2(t), ft2 = t;
    };
    function ri(e, t, n) {
      var o = new vr2(e >>>= 0);
      throw t >>>= 0, n >>>= 0, (l(), A)[o.Vc + 16 >>> 2 >>> 0] = 0, (l(), A)[o.Vc + 4 >>> 2 >>> 0] = t, (l(), A)[o.Vc + 8 >>> 2 >>> 0] = n, Hr2(e), Ct++, ft2 = e;
    }
    var ni = () => Ct;
    function In(e, t, n, o) {
      return i ? H(2, 1, e, t, n, o) : xn(e, t, n, o);
    }
    function xn(e, t, n, o) {
      if (e >>>= 0, t >>>= 0, n >>>= 0, o >>>= 0, !globalThis.SharedArrayBuffer) return 6;
      var u = [];
      return i && u.length === 0 ? In(e, t, n, o) : (e = { se: n, Sc: e, ad: o, he: u }, i ? (e.Uc = "spawnThread", postMessage(e, u), 0) : Q(e));
    }
    function oi(e) {
      throw ft2 ||= e >>> 0, ft2;
    }
    var Ln = globalThis.TextDecoder && new TextDecoder(), Bn = (e, t, n, o) => {
      if (n = t + n, o) return n;
      for (; e[t] && !(t >= n); ) ++t;
      return t;
    }, On = (e, t = 0, n, o) => {
      if (16 < (n = Bn(e, t >>>= 0, n, o)) - t && e.buffer && Ln) return Ln.decode(e.buffer instanceof ArrayBuffer ? e.subarray(t, n) : e.slice(t, n));
      for (o = ""; t < n; ) {
        var u = e[t++];
        if (128 & u) {
          var c = 63 & e[t++];
          if ((224 & u) == 192) o += String.fromCharCode((31 & u) << 6 | c);
          else {
            var h = 63 & e[t++];
            65536 > (u = (240 & u) == 224 ? (15 & u) << 12 | c << 6 | h : (7 & u) << 18 | c << 12 | h << 6 | 63 & e[t++]) ? o += String.fromCharCode(u) : (u -= 65536, o += String.fromCharCode(55296 | u >> 10, 56320 | 1023 & u));
          }
        } else o += String.fromCharCode(u);
      }
      return o;
    }, ct2 = (e, t, n) => (e >>>= 0) ? On((l(), J2), e, t, n) : "";
    function Mn(e, t, n) {
      return i ? H(3, 1, e, t, n) : 0;
    }
    function Un(e, t) {
      if (i) return H(4, 1, e, t);
    }
    function Cn(e, t) {
      if (i) return H(5, 1, e, t);
    }
    function Dn(e, t, n) {
      if (i) return H(6, 1, e, t, n);
    }
    function Pn(e, t, n) {
      return i ? H(7, 1, e, t, n) : 0;
    }
    function _n(e, t) {
      if (i) return H(8, 1, e, t);
    }
    function Rn(e, t, n) {
      if (i) return H(9, 1, e, t, n);
    }
    function Nn(e, t, n, o) {
      if (i) return H(10, 1, e, t, n, o);
    }
    function Wn(e, t, n, o) {
      if (i) return H(11, 1, e, t, n, o);
    }
    function kn(e, t, n, o) {
      if (i) return H(12, 1, e, t, n, o);
    }
    function Fn(e) {
      if (i) return H(13, 1, e);
    }
    function Gn(e, t) {
      if (i) return H(14, 1, e, t);
    }
    function $n(e, t, n) {
      if (i) return H(15, 1, e, t, n);
    }
    var ai = () => we(""), Be2 = (e) => {
      e >>>= 0;
      for (var t = ""; ; ) {
        var n = (l(), J2)[e++ >>> 0];
        if (!n) return t;
        t += String.fromCharCode(n);
      }
    }, Sr2 = {}, Ar2 = {}, si = {}, dt2 = class extends Error {
      constructor(e) {
        super(e), this.name = "BindingError";
      }
    };
    function De2(e, t, n = {}) {
      return (function(o, u, c = {}) {
        var h = u.name;
        if (!o) throw new dt2(`type "${h}" must have a positive integer typeid pointer`);
        if (Ar2.hasOwnProperty(o)) {
          if (c.oe) return;
          throw new dt2(`Cannot register type '${h}' twice`);
        }
        Ar2[o] = u, delete si[o], Sr2.hasOwnProperty(o) && (u = Sr2[o], delete Sr2[o], u.forEach((b) => b()));
      })(e, t, n);
    }
    var zn = (e, t, n) => {
      switch (t) {
        case 1:
          return n ? (o) => (l(), Z2)[o >>> 0] : (o) => (l(), J2)[o >>> 0];
        case 2:
          return n ? (o) => (l(), Ce2)[o >>> 1 >>> 0] : (o) => (l(), K)[o >>> 1 >>> 0];
        case 4:
          return n ? (o) => (l(), x)[o >>> 2 >>> 0] : (o) => (l(), A)[o >>> 2 >>> 0];
        case 8:
          return n ? (o) => (l(), le)[o >>> 3 >>> 0] : (o) => (l(), q)[o >>> 3 >>> 0];
        default:
          throw new TypeError(`invalid integer width (${t}): ${e}`);
      }
    };
    function ii(e, t, n, o, u) {
      e >>>= 0, n >>>= 0, t = Be2(t >>> 0);
      let c = (h) => h;
      if (o = o === 0n) {
        let h = 8 * n;
        c = (b) => BigInt.asUintN(h, b), u = c(u);
      }
      De2(e, { name: t, Rc: c, Xc: (h, b) => (typeof b == "number" && (b = BigInt(b)), b), Wc: zn(t, n, !o), Yc: null });
    }
    function ui(e, t, n, o) {
      De2(e >>>= 0, { name: t = Be2(t >>> 0), Rc: function(u) {
        return !!u;
      }, Xc: function(u, c) {
        return c ? n : o;
      }, Wc: function(u) {
        return this.Rc((l(), J2)[u >>> 0]);
      }, Yc: null });
    }
    var Vn = [], Je2 = [0, 1, , 1, null, 1, true, 1, false, 1];
    function Ir2(e) {
      9 < (e >>>= 0) && --Je2[e + 1] == 0 && (Je2[e] = void 0, Vn.push(e));
    }
    var ge = (e) => {
      if (!e) throw new dt2(`Cannot use deleted val. handle = ${e}`);
      return Je2[e];
    }, Ie = (e) => {
      switch (e) {
        case void 0:
          return 2;
        case null:
          return 4;
        case true:
          return 6;
        case false:
          return 8;
        default:
          let t = Vn.pop() || Je2.length;
          return Je2[t] = e, Je2[t + 1] = 1, t;
      }
    };
    function xr2(e) {
      return this.Rc((l(), A)[e >>> 2 >>> 0]);
    }
    var fi = { name: "emscripten::val", Rc: (e) => {
      var t = ge(e);
      return Ir2(e), t;
    }, Xc: (e, t) => Ie(t), Wc: xr2, Yc: null };
    function ci(e) {
      return De2(e >>> 0, fi);
    }
    var di = (e, t) => {
      switch (t) {
        case 4:
          return function(n) {
            return this.Rc((l(), _)[n >>> 2 >>> 0]);
          };
        case 8:
          return function(n) {
            return this.Rc((l(), ae2)[n >>> 3 >>> 0]);
          };
        default:
          throw new TypeError(`invalid float width (${t}): ${e}`);
      }
    };
    function li(e, t, n) {
      n >>>= 0, De2(e >>>= 0, { name: t = Be2(t >>> 0), Rc: (o) => o, Xc: (o, u) => u, Wc: di(t, n), Yc: null });
    }
    function pi(e, t, n, o, u) {
      e >>>= 0, n >>>= 0, t = Be2(t >>> 0);
      let c = (b) => b;
      if (o === 0) {
        var h = 32 - 8 * n;
        c = (b) => b << h >>> h, u = c(u);
      }
      De2(e, { name: t, Rc: c, Xc: (b, E) => E, Wc: zn(t, n, o !== 0), Yc: null });
    }
    function mi(e, t, n) {
      function o(c) {
        var h = (l(), A)[c >>> 2 >>> 0];
        return c = (l(), A)[c + 4 >>> 2 >>> 0], new u((l(), Z2).buffer, c, h);
      }
      var u = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][t];
      De2(e >>>= 0, { name: n = Be2(n >>> 0), Rc: o, Wc: o }, { oe: true });
    }
    var Pe2 = (e, t, n) => {
      var o = (l(), J2);
      if (t >>>= 0, 0 < n) {
        var u = t;
        n = t + n - 1;
        for (var c = 0; c < e.length; ++c) {
          var h = e.codePointAt(c);
          if (127 >= h) {
            if (t >= n) break;
            o[t++ >>> 0] = h;
          } else if (2047 >= h) {
            if (t + 1 >= n) break;
            o[t++ >>> 0] = 192 | h >> 6, o[t++ >>> 0] = 128 | 63 & h;
          } else if (65535 >= h) {
            if (t + 2 >= n) break;
            o[t++ >>> 0] = 224 | h >> 12, o[t++ >>> 0] = 128 | h >> 6 & 63, o[t++ >>> 0] = 128 | 63 & h;
          } else {
            if (t + 3 >= n) break;
            o[t++ >>> 0] = 240 | h >> 18, o[t++ >>> 0] = 128 | h >> 12 & 63, o[t++ >>> 0] = 128 | h >> 6 & 63, o[t++ >>> 0] = 128 | 63 & h, c++;
          }
        }
        o[t >>> 0] = 0, e = t - u;
      } else e = 0;
      return e;
    }, _e2 = (e) => {
      for (var t = 0, n = 0; n < e.length; ++n) {
        var o = e.charCodeAt(n);
        127 >= o ? t++ : 2047 >= o ? t += 2 : 55296 <= o && 57343 >= o ? (t += 4, ++n) : t += 3;
      }
      return t;
    };
    function hi(e, t) {
      De2(e >>>= 0, { name: t = Be2(t >>> 0), Rc(n) {
        var o = (l(), A)[n >>> 2 >>> 0];
        return o = ct2(n + 4, o, true), Te2(n), o;
      }, Xc(n, o) {
        o instanceof ArrayBuffer && (o = new Uint8Array(o));
        var u = typeof o == "string";
        if (!(u || ArrayBuffer.isView(o) && o.BYTES_PER_ELEMENT == 1)) throw new dt2("Cannot pass non-string to std::string");
        var c = u ? _e2(o) : o.length, h = mt2(4 + c + 1), b = h + 4;
        return (l(), A)[h >>> 2 >>> 0] = c, u ? Pe2(o, b, c + 1) : (l(), J2).set(o, b >>> 0), n !== null && n.push(Te2, h), h;
      }, Wc: xr2, Yc(n) {
        Te2(n);
      } });
    }
    var Hn = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, yi = (e, t, n) => {
      if (e >>>= 1, 16 < (t = Bn((l(), K), e, t / 2, n)) - e && Hn) return Hn.decode((l(), K).slice(e, t));
      for (n = ""; e < t; ++e) {
        var o = (l(), K)[e >>> 0];
        n += String.fromCharCode(o);
      }
      return n;
    }, bi = (e, t, n) => {
      if (n ??= 2147483647, 2 > n) return 0;
      var o = t;
      n = (n -= 2) < 2 * e.length ? n / 2 : e.length;
      for (var u = 0; u < n; ++u) {
        var c = e.charCodeAt(u);
        (l(), Ce2)[t >>> 1 >>> 0] = c, t += 2;
      }
      return (l(), Ce2)[t >>> 1 >>> 0] = 0, t - o;
    }, wi = (e) => 2 * e.length, gi = (e, t, n) => {
      var o = "";
      e >>>= 2;
      for (var u = 0; !(u >= t / 4); u++) {
        var c = (l(), A)[e + u >>> 0];
        if (!c && !n) break;
        o += String.fromCodePoint(c);
      }
      return o;
    }, Ti = (e, t, n) => {
      if (t >>>= 0, n ??= 2147483647, 4 > n) return 0;
      var o = t;
      n = o + n - 4;
      for (var u = 0; u < e.length; ++u) {
        var c = e.codePointAt(u);
        if (65535 < c && u++, (l(), x)[t >>> 2 >>> 0] = c, (t += 4) + 4 > n) break;
      }
      return (l(), x)[t >>> 2 >>> 0] = 0, t - o;
    }, vi = (e) => {
      for (var t = 0, n = 0; n < e.length; ++n) 65535 < e.codePointAt(n) && n++, t += 4;
      return t;
    };
    function Ei(e, t, n) {
      if (e >>>= 0, t >>>= 0, n = Be2(n >>>= 0), t === 2) var o = yi, u = bi, c = wi;
      else o = gi, u = Ti, c = vi;
      De2(e, { name: n, Rc: (h) => {
        var b = (l(), A)[h >>> 2 >>> 0];
        return b = o(h + 4, b * t, true), Te2(h), b;
      }, Xc: (h, b) => {
        if (typeof b != "string") throw new dt2(`Cannot pass non-string to C++ string type ${n}`);
        var E = c(b), I = mt2(4 + E + t);
        return (l(), A)[I >>> 2 >>> 0] = E / t, u(b, I + 4, E + t), h !== null && h.push(Te2, I), I;
      }, Wc: xr2, Yc(h) {
        Te2(h);
      } });
    }
    function Si(e, t) {
      De2(e >>>= 0, { pe: true, name: t = Be2(t >>> 0), Rc: () => {
      }, Xc: () => {
      } });
    }
    function Ai(e) {
      $r2(e >>> 0, !f, 1, !s, 131072, false), Tn();
    }
    var Dt2 = (e) => {
      if (!G2) try {
        if (e(), !(0 < $2)) try {
          i ? $t() && zr2(S) : Tr2(S);
        } catch (t) {
          t instanceof gt2 || t == "unwind" || y(0, t);
        }
      } catch (t) {
        t instanceof gt2 || t == "unwind" || y(0, t);
      }
    }, Ii = !Atomics.waitAsync || globalThis.navigator?.userAgent && 91 > Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) || [])[2]);
    function Lr2(e) {
      e >>>= 0, Ii || (Atomics.waitAsync((l(), x), e >>> 2, e).value.then(Pt2), e += 128, Atomics.store((l(), x), e >>> 2, 1));
    }
    var Pt2 = () => Dt2(() => {
      var e = $t();
      e && (Lr2(e), _o());
    });
    function xi(e, t) {
      (e >>>= 0) == t >>> 0 ? setTimeout(Pt2) : i ? postMessage({ $c: e, Uc: "checkMailbox" }) : (e = qe2[e]) && e.postMessage({ Uc: "checkMailbox" });
    }
    var Br2 = [];
    function Li(e, t, n, o, u) {
      for (t >>>= 0, u >>>= 0, Br2.length = 0, n = u >>> 3, o = u + o >>> 3; n < o; ) {
        var c;
        c = (l(), le)[n++ >>> 0] ? (l(), le)[n++ >>> 0] : (l(), ae2)[n++ >>> 0], Br2.push(c);
      }
      return (t ? Yr2[t] : df[e])(...Br2);
    }
    var Bi = () => {
      $2 = 0;
    };
    function Oi(e) {
      e >>>= 0, i ? postMessage({ Uc: "cleanupThread", ue: e }) : gn(qe2[e]);
    }
    function Mi(e) {
    }
    var _t2 = (e) => {
      try {
        e();
      } catch (t) {
        we(t);
      }
    };
    function Ui(e) {
      var t = (...n) => {
        Rt.push(e);
        try {
          return e(...n);
        } finally {
          G2 || (Rt.pop(), Oe && Fe === 1 && Rt.length === 0 && (Fe = 0, $2 += 1, _t2(Aa), typeof Fibers < "u" && Fibers.Oe()));
        }
      };
      return qn.set(e, t), t;
    }
    var Fe = 0, Oe = null, jn = 0, Rt = [], Or2 = /* @__PURE__ */ new Map(), Yn = /* @__PURE__ */ new Map(), qn = /* @__PURE__ */ new Map(), Ci = 0, Mr2 = null, Di = [], Jn = (e) => (function(t) {
      if (!G2) {
        if (Fe === 0) {
          var n = false, o = false;
          t((u = 0) => {
            if (!G2 && (jn = u, n = true, o)) {
              Fe = 2, _t2(() => Ia(Oe)), typeof MainLoop < "u" && MainLoop.le && MainLoop.resume(), u = false;
              try {
                var c = (function() {
                  var E = (l(), x)[Oe + 8 >>> 2 >>> 0];
                  return E = Yn.get(E), E = qn.get(E), --$2, E();
                })();
              } catch (E) {
                c = E, u = true;
              }
              var h = false;
              if (!Oe) {
                var b = Mr2;
                b && (Mr2 = null, (u ? b.reject : b.resolve)(c), h = true);
              }
              if (u && !h) throw c;
            }
          }), o = true, n || (Fe = 1, Oe = (function() {
            var u = mt2(65548), c = u + 12;
            if ((l(), A)[u >>> 2 >>> 0] = c, (l(), A)[u + 4 >>> 2 >>> 0] = c + 65536, c = Rt[0], !Or2.has(c)) {
              var h = Ci++;
              Or2.set(c, h), Yn.set(h, c);
            }
            return c = Or2.get(c), (l(), x)[u + 8 >>> 2 >>> 0] = c, u;
          })(), typeof MainLoop < "u" && MainLoop.le && MainLoop.pause(), _t2(() => Sa(Oe)));
        } else Fe === 2 ? (Fe = 0, _t2(xa), Te2(Oe), Oe = null, Di.forEach(Dt2)) : we(`invalid state: ${Fe}`);
        return jn;
      }
    })((t) => {
      e().then(t);
    });
    function Pi(e) {
      return e >>>= 0, Jn(async () => {
        var t = await ge(e);
        return Ie(t);
      });
    }
    var Ur2 = [], _i = (e) => {
      var t = Ur2.length;
      return Ur2.push(e), t;
    }, Ri = (e, t) => {
      for (var n = Array(e), o = 0; o < e; ++o) {
        var u = o, c = (l(), A)[t + 4 * o >>> 2 >>> 0], h = Ar2[c];
        if (h === void 0) throw e = `parameter ${o}`, c = bo2(c), t = Be2(c), Te2(c), new dt2(`${e} has unknown type ${t}`);
        n[u] = h;
      }
      return n;
    }, Ni = (e, t, n) => {
      var o = [];
      return e = e(o, n), o.length && ((l(), A)[t >>> 2 >>> 0] = Ie(o)), e;
    }, Wi = {}, Nt = (e) => {
      var t = Wi[e];
      return t === void 0 ? Be2(e) : t;
    };
    function ki(e, t, n) {
      var [o, ...u] = Ri(e, t >>> 0);
      t = o.Xc.bind(o);
      var c = u.map((E) => E.Wc.bind(E));
      e--;
      var h = { toValue: ge };
      switch (e = c.map((E, I) => {
        var N2 = `argFromPtr${I}`;
        return h[N2] = E, `${N2}(args${I ? "+" + 8 * I : ""})`;
      }), n) {
        case 0:
          var b = "toValue(handle)";
          break;
        case 2:
          b = "new (toValue(handle))";
          break;
        case 3:
          b = "";
          break;
        case 1:
          h.getStringOrSymbol = Nt, b = "toValue(handle)[getStringOrSymbol(methodName)]";
      }
      return b += `(${e})`, o.pe || (h.toReturnWire = t, h.emval_returnValue = Ni, b = `return emval_returnValue(toReturnWire, destructorsRef, ${b})`), b = `return function (handle, methodName, destructorsRef, args) {
  ${b}
  }`, n = new Function(Object.keys(h), b)(...Object.values(h)), b = `methodCaller<(${u.map((E) => E.name)}) => ${o.name}>`, _i(Object.defineProperty(n, "name", { value: b }));
    }
    function Fi(e, t) {
      return t >>>= 0, (e = ge(e >>> 0)) == ge(t);
    }
    function Gi(e) {
      return (e >>>= 0) ? (e = Nt(e), Ie(globalThis[e])) : Ie(globalThis);
    }
    function $i(e) {
      return e = Nt(e >>> 0), Ie(r[e]);
    }
    function zi(e, t) {
      return t >>>= 0, e = ge(e >>> 0), t = ge(t), Ie(e[t]);
    }
    function Vi(e) {
      9 < (e >>>= 0) && (Je2[e + 1] += 1);
    }
    function Xn(e, t, n, o, u) {
      return Ur2[e >>> 0](t >>> 0, n >>> 0, o >>> 0, u >>> 0);
    }
    function Hi(e, t, n, o, u) {
      return Xn(e >>> 0, t >>> 0, n >>> 0, o >>> 0, u >>> 0);
    }
    function ji() {
      return Ie([]);
    }
    function Yi(e) {
      e = ge(e >>> 0);
      for (var t = Array(e.length), n = 0; n < e.length; n++) t[n] = e[n];
      return Ie(t);
    }
    function qi(e) {
      return Ie(Nt(e >>> 0));
    }
    function Ji() {
      return Ie({});
    }
    function Xi(e) {
      for (var t = ge(e >>>= 0); t.length; ) {
        var n = t.pop();
        t.pop()(n);
      }
      Ir2(e);
    }
    function Zi(e, t, n) {
      t >>>= 0, n >>>= 0, e = ge(e >>> 0), t = ge(t), n = ge(n), e[t] = n;
    }
    function Ki(e, t) {
      e = pe(e), t >>>= 0, e = new Date(1e3 * e), (l(), x)[t >>> 2 >>> 0] = e.getUTCSeconds(), (l(), x)[t + 4 >>> 2 >>> 0] = e.getUTCMinutes(), (l(), x)[t + 8 >>> 2 >>> 0] = e.getUTCHours(), (l(), x)[t + 12 >>> 2 >>> 0] = e.getUTCDate(), (l(), x)[t + 16 >>> 2 >>> 0] = e.getUTCMonth(), (l(), x)[t + 20 >>> 2 >>> 0] = e.getUTCFullYear() - 1900, (l(), x)[t + 24 >>> 2 >>> 0] = e.getUTCDay(), e = (e.getTime() - Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, (l(), x)[t + 28 >>> 2 >>> 0] = e;
    }
    var Zn = (e) => e % 4 == 0 && (e % 100 != 0 || e % 400 == 0), Kn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Qn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    function Qi(e, t) {
      e = pe(e), t >>>= 0, e = new Date(1e3 * e), (l(), x)[t >>> 2 >>> 0] = e.getSeconds(), (l(), x)[t + 4 >>> 2 >>> 0] = e.getMinutes(), (l(), x)[t + 8 >>> 2 >>> 0] = e.getHours(), (l(), x)[t + 12 >>> 2 >>> 0] = e.getDate(), (l(), x)[t + 16 >>> 2 >>> 0] = e.getMonth(), (l(), x)[t + 20 >>> 2 >>> 0] = e.getFullYear() - 1900, (l(), x)[t + 24 >>> 2 >>> 0] = e.getDay();
      var n = (Zn(e.getFullYear()) ? Kn : Qn)[e.getMonth()] + e.getDate() - 1 | 0;
      (l(), x)[t + 28 >>> 2 >>> 0] = n, (l(), x)[t + 36 >>> 2 >>> 0] = -60 * e.getTimezoneOffset(), n = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
      var o = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
      e = 0 | (n != o && e.getTimezoneOffset() == Math.min(o, n)), (l(), x)[t + 32 >>> 2 >>> 0] = e;
    }
    function eu(e) {
      e >>>= 0;
      var t = new Date((l(), x)[e + 20 >>> 2 >>> 0] + 1900, (l(), x)[e + 16 >>> 2 >>> 0], (l(), x)[e + 12 >>> 2 >>> 0], (l(), x)[e + 8 >>> 2 >>> 0], (l(), x)[e + 4 >>> 2 >>> 0], (l(), x)[e >>> 2 >>> 0], 0), n = (l(), x)[e + 32 >>> 2 >>> 0], o = t.getTimezoneOffset(), u = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(), c = new Date(t.getFullYear(), 0, 1).getTimezoneOffset(), h = Math.min(c, u);
      return 0 > n ? (l(), x)[e + 32 >>> 2 >>> 0] = +(u != c && h == o) : 0 < n != (h == o) && (u = Math.max(c, u), t.setTime(t.getTime() + 6e4 * ((0 < n ? h : u) - o))), (l(), x)[e + 24 >>> 2 >>> 0] = t.getDay(), n = (Zn(t.getFullYear()) ? Kn : Qn)[t.getMonth()] + t.getDate() - 1 | 0, (l(), x)[e + 28 >>> 2 >>> 0] = n, (l(), x)[e >>> 2 >>> 0] = t.getSeconds(), (l(), x)[e + 4 >>> 2 >>> 0] = t.getMinutes(), (l(), x)[e + 8 >>> 2 >>> 0] = t.getHours(), (l(), x)[e + 12 >>> 2 >>> 0] = t.getDate(), (l(), x)[e + 16 >>> 2 >>> 0] = t.getMonth(), (l(), x)[e + 20 >>> 2 >>> 0] = t.getYear(), e = t.getTime(), BigInt(isNaN(e) ? -1 : e / 1e3);
    }
    function eo2(e, t, n, o, u, c, h) {
      return i ? H(16, 1, e, t, n, o, u, c, h) : -52;
    }
    function to2(e, t, n, o, u, c) {
      if (i) return H(17, 1, e, t, n, o, u, c);
    }
    var vt2 = {}, tu = () => performance.timeOrigin + performance.now();
    function ro2(e, t) {
      if (i) return H(18, 1, e, t);
      if (vt2[e] && (clearTimeout(vt2[e].id), delete vt2[e]), !t) return 0;
      var n = setTimeout(() => {
        delete vt2[e], Dt2(() => Po(e, performance.timeOrigin + performance.now()));
      }, t);
      return vt2[e] = { id: n, Ne: t }, 0;
    }
    function ru(e, t, n, o) {
      e >>>= 0, t >>>= 0, n >>>= 0, o >>>= 0;
      var u = (/* @__PURE__ */ new Date()).getFullYear(), c = new Date(u, 0, 1).getTimezoneOffset();
      u = new Date(u, 6, 1).getTimezoneOffset();
      var h = Math.max(c, u);
      (l(), A)[e >>> 2 >>> 0] = 60 * h, (l(), x)[t >>> 2 >>> 0] = +(c != u), e = (t = (b) => {
        var E = Math.abs(b);
        return `UTC${0 <= b ? "-" : "+"}${String(Math.floor(E / 60)).padStart(2, "0")}${String(E % 60).padStart(2, "0")}`;
      })(c), t = t(u), u < c ? (Pe2(e, n, 17), Pe2(t, o, 17)) : (Pe2(e, o, 17), Pe2(t, n, 17));
    }
    var nu = () => Date.now(), ou = 1;
    function au(e, t, n) {
      if (n >>>= 0, !(0 <= e && 3 >= e)) return 28;
      if (e === 0) e = Date.now();
      else {
        if (!ou) return 52;
        e = performance.timeOrigin + performance.now();
      }
      return e = Math.round(1e6 * e), (l(), le)[n >>> 3 >>> 0] = BigInt(e), 0;
    }
    var Cr2 = [], no2 = (e, t) => {
      Cr2.length = 0;
      for (var n; n = (l(), J2)[e++ >>> 0]; ) {
        var o = n != 105;
        t += (o &= n != 112) && t % 8 ? 4 : 0, Cr2.push(n == 112 ? (l(), A)[t >>> 2 >>> 0] : n == 106 ? (l(), le)[t >>> 3 >>> 0] : n == 105 ? (l(), x)[t >>> 2 >>> 0] : (l(), ae2)[t >>> 3 >>> 0]), t += o ? 8 : 4;
      }
      return Cr2;
    };
    function su2(e, t, n) {
      return e >>>= 0, t = no2(t >>> 0, n >>> 0), Yr2[e](...t);
    }
    function iu(e, t, n) {
      return e >>>= 0, t = no2(t >>> 0, n >>> 0), Yr2[e](...t);
    }
    var uu = () => {
    };
    function fu(e, t) {
      return B(ct2(e >>> 0, t >>> 0));
    }
    var cu = () => {
      throw $2 += 1, "unwind";
    };
    function du() {
      return 4294901760;
    }
    var lu = () => 1, pu = () => navigator.hardwareConcurrency, Xe2 = {}, oo2 = (e) => {
      var t = _e2(e) + 1, n = mt2(t);
      return n && Pe2(e, n, t), n;
    }, Wt = (e) => {
      var t;
      return (t = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e)) ? +t[1] : (t = /:(\d+):\d+(?:\)|$)/.exec(e)) ? 2147483648 | +t[1] : 0;
    }, ao2 = (e) => {
      for (var t of e) (e = Wt(t)) && (Xe2[e] = t);
    };
    function mu() {
      var e = Error().stack.toString().split(`
`);
      return e[0] == "Error" && e.shift(), ao2(e), Xe2.Xd = Wt(e[3]), Xe2.re = e, Xe2.Xd;
    }
    function kt(e) {
      if (!(e = Xe2[e >>> 0])) return 0;
      var t;
      if (t = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e)) e = t[1];
      else if (t = /^\s+at (.*) \(.*\)$/.exec(e)) e = t[1];
      else {
        if (!(t = /^(.+?)@/.exec(e))) return 0;
        e = t[1];
      }
      return Te2(kt.ae ?? 0), kt.ae = oo2(e), kt.ae;
    }
    function hu(e) {
      e >>>= 0;
      var t = (l(), J2).length;
      if (e <= t || 4294901760 < e) return false;
      for (var n = 1; 4 >= n; n *= 2) {
        var o = t * (1 + 0.2 / n);
        o = Math.min(o, e + 100663296);
        e: {
          o = (Math.min(4294901760, 65536 * Math.ceil(Math.max(e, o) / 65536)) - ke2.buffer.byteLength + 65535) / 65536 | 0;
          try {
            ke2.grow(o), se();
            var u = 1;
            break e;
          } catch {
          }
          u = void 0;
        }
        if (u) return true;
      }
      return false;
    }
    function yu(e, t, n) {
      if (e >>>= 0, t >>>= 0, Xe2.Xd == e) var o = Xe2.re;
      else (o = Error().stack.toString().split(`
`))[0] == "Error" && o.shift(), ao2(o);
      for (var u = 3; o[u] && Wt(o[u]) != e; ) ++u;
      for (e = 0; e < n && o[e + u]; ++e) (l(), x)[t + 4 * e >>> 2 >>> 0] = Wt(o[e + u]);
      return e;
    }
    var Me = (e) => {
      var t = _e2(e) + 1, n = zt(t);
      return Pe2(e, n, t), n;
    }, Dr2 = [], me = (e, t) => {
      Dr2[e >>>= 0] = t;
    }, Ue2 = [], Ft = [], lt2 = (e, t) => {
      Ft[e] = new Promise((n) => t.finally(() => n(e)));
    }, O = (e) => {
      if (e) return Dr2[e >>> 0];
    }, Gt = (e, t, n) => {
      (l(), A)[e >>> 2 >>> 0] = t, (l(), A)[e + 4 >>> 2 >>> 0] = n;
    }, so2 = (e) => {
      var t = (l(), A)[e >>> 2 >>> 0];
      return e = (l(), A)[e + 4 >>> 2 >>> 0], ct2(t, e);
    }, Re = (e) => {
      var t = (l(), A)[e >>> 2 >>> 0];
      return e = (l(), A)[e + 4 >>> 2 >>> 0], t ? ct2(t, e) : e === 0 ? "" : void 0;
    }, bu = (e) => {
      var t = Re(e + 4), n = (n = (l(), A)[e + 12 >>> 2 >>> 0]) ? O(n) : "auto";
      if (e += 16) {
        var o = O((l(), A)[e + 4 >>> 2 >>> 0]), u = (l(), A)[e + 16 >>> 2 >>> 0], c = (l(), A)[e + 20 >>> 2 >>> 0];
        if (u) {
          for (var h = {}, b = 0; b < u; ++b) {
            var E = c + 24 * b;
            h[so2(E + 4)] = (l(), ae2)[E + 16 >>> 3 >>> 0];
          }
          u = h;
        } else u = void 0;
        e = { module: o, constants: u, entryPoint: Re(e + 8) };
      } else e = void 0;
      return { label: t, layout: n, compute: e };
    }, io2 = (e, t) => {
      function n(u, c) {
        u = e[u], (l(), x)[t + c >>> 2 >>> 0] = u;
      }
      function o(u, c) {
        u = e[u], (l(), le)[t + c >>> 3 >>> 0] = BigInt(u);
      }
      n("maxTextureDimension1D", 4), n("maxTextureDimension2D", 8), n("maxTextureDimension3D", 12), n("maxTextureArrayLayers", 16), n("maxBindGroups", 20), n("maxBindGroupsPlusVertexBuffers", 24), n("maxBindingsPerBindGroup", 28), n("maxDynamicUniformBuffersPerPipelineLayout", 32), n("maxDynamicStorageBuffersPerPipelineLayout", 36), n("maxSampledTexturesPerShaderStage", 40), n("maxSamplersPerShaderStage", 44), n("maxStorageBuffersPerShaderStage", 48), n("maxStorageTexturesPerShaderStage", 52), n("maxUniformBuffersPerShaderStage", 56), n("minUniformBufferOffsetAlignment", 80), n("minStorageBufferOffsetAlignment", 84), o("maxUniformBufferBindingSize", 64), o("maxStorageBufferBindingSize", 72), n("maxVertexBuffers", 88), o("maxBufferSize", 96), n("maxVertexAttributes", 104), n("maxVertexBufferArrayStride", 108), n("maxInterStageShaderVariables", 112), n("maxColorAttachments", 116), n("maxColorAttachmentBytesPerSample", 120), n("maxComputeWorkgroupStorageSize", 124), n("maxComputeInvocationsPerWorkgroup", 128), n("maxComputeWorkgroupSizeX", 132), n("maxComputeWorkgroupSizeY", 136), n("maxComputeWorkgroupSizeZ", 140), n("maxComputeWorkgroupsPerDimension", 144), e.Le !== void 0 && n("maxImmediateSize", 148);
    }, wu = [, "validation", "out-of-memory", "internal"], gu = [, "compatibility", "core"], uo2 = { 1: "core-features-and-limits", 2: "depth-clip-control", 3: "depth32float-stencil8", 4: "texture-compression-bc", 5: "texture-compression-bc-sliced-3d", 6: "texture-compression-etc2", 7: "texture-compression-astc", 8: "texture-compression-astc-sliced-3d", 9: "timestamp-query", 10: "indirect-first-instance", 11: "shader-f16", 12: "rg11b10ufloat-renderable", 13: "bgra8unorm-storage", 14: "float32-filterable", 15: "float32-blendable", 16: "clip-distances", 17: "dual-source-blending", 18: "subgroups", 19: "texture-formats-tier1", 20: "texture-formats-tier2", 21: "primitive-index", 327692: "chromium-experimental-unorm16-texture-formats", 327693: "chromium-experimental-snorm16-texture-formats", 327732: "chromium-experimental-multi-draw-indirect" }, Tu = [, "low-power", "high-performance"], vu = [, "occlusion", "timestamp"], Eu = { undefined: 1, unknown: 1, destroyed: 2 };
    function Su(e, t, n, o, u, c) {
      t = pe(t), n = pe(n), o >>>= 0, u >>>= 0, c >>>= 0;
      var h = O(e >>> 0);
      if (e = {}, c) {
        var b = (l(), A)[c + 12 >>> 2 >>> 0];
        if (b) {
          var E = (l(), A)[c + 16 >>> 2 >>> 0];
          e.requiredFeatures = Array.from((l(), A).subarray(E >>> 2 >>> 0, E + 4 * b >>> 2 >>> 0), (L) => uo2[L]);
        }
        var I = (l(), A)[c + 20 >>> 2 >>> 0];
        if (I) {
          let L = function(ve, ie2, Ze2 = false) {
            ie2 = I + ie2, (ie2 = (l(), A)[ie2 >>> 2 >>> 0]) == 4294967295 || Ze2 && ie2 == 0 || (N2[ve] = ie2);
          }, fe = function(ve, ie2) {
            ie2 = I + ie2;
            var Ze2 = (l(), A)[ie2 >>> 2 >>> 0], Zf = (l(), A)[ie2 + 4 >>> 2 >>> 0];
            Ze2 == 4294967295 && Zf == 4294967295 || (N2[ve] = 4294967296 * (l(), A)[ie2 + 4 >>> 2 >>> 0] + (l(), A)[ie2 >>> 2 >>> 0]);
          };
          var W = L, X = fe, N2 = {};
          L("maxTextureDimension1D", 4), L("maxTextureDimension2D", 8), L("maxTextureDimension3D", 12), L("maxTextureArrayLayers", 16), L("maxBindGroups", 20), L("maxBindGroupsPlusVertexBuffers", 24), L("maxDynamicUniformBuffersPerPipelineLayout", 32), L("maxDynamicStorageBuffersPerPipelineLayout", 36), L("maxSampledTexturesPerShaderStage", 40), L("maxSamplersPerShaderStage", 44), L("maxStorageBuffersPerShaderStage", 48), L("maxStorageTexturesPerShaderStage", 52), L("maxUniformBuffersPerShaderStage", 56), L("minUniformBufferOffsetAlignment", 80), L("minStorageBufferOffsetAlignment", 84), fe("maxUniformBufferBindingSize", 64), fe("maxStorageBufferBindingSize", 72), L("maxVertexBuffers", 88), fe("maxBufferSize", 96), L("maxVertexAttributes", 104), L("maxVertexBufferArrayStride", 108), L("maxInterStageShaderVariables", 112), L("maxColorAttachments", 116), L("maxColorAttachmentBytesPerSample", 120), L("maxComputeWorkgroupStorageSize", 124), L("maxComputeInvocationsPerWorkgroup", 128), L("maxComputeWorkgroupSizeX", 132), L("maxComputeWorkgroupSizeY", 136), L("maxComputeWorkgroupSizeZ", 140), L("maxComputeWorkgroupsPerDimension", 144), L("maxImmediateSize", 148, true), e.requiredLimits = N2;
        }
        (b = (l(), A)[c + 24 >>> 2 >>> 0]) && (b = { label: Re(b + 4) }, e.defaultQueue = b), e.label = Re(c + 4);
      }
      $2 += 1, lt2(t, h.requestDevice(e).then((L) => {
        --$2, me(u, L.queue), me(o, L), n && ($2 += 1, lt2(n, L.lost.then((fe) => {
          --$2, L.onuncapturederror = () => {
          };
          var ve = D(), ie2 = Me(fe.message);
          Wr2(n, Eu[fe.reason], ie2), C(ve);
        }))), L.onuncapturederror = (fe) => {
          var ve = 5;
          fe.error instanceof GPUValidationError ? ve = 2 : fe.error instanceof GPUOutOfMemoryError ? ve = 3 : fe.error instanceof GPUInternalError && (ve = 4);
          var ie2 = D();
          fe = Me(fe.error.message), Mo(o, ve, fe), C(ie2);
        }, "adapterInfo" in L || (L.adapterInfo = h.info), Gr2(t, 1, o, 0);
      }, (L) => {
        --$2;
        var fe = D();
        L = Me(L.message), Gr2(t, 3, o, L), n && Wr2(n, 4, L), C(fe);
      }));
    }
    function Au(e) {
      var t = O(e >>>= 0), n = Ue2[e];
      if (n) {
        for (var o = 0; o < n.length; ++o) n[o]();
        delete Ue2[e];
      }
      t.destroy();
    }
    var pt2 = () => {
      var e = "getMappedRange size=0 no longer means WGPU_WHOLE_MAP_SIZE";
      pt2.ed || (pt2.ed = {}), pt2.ed[e] || (pt2.ed[e] = 1, B(e));
    };
    function Iu(e, t, n) {
      t >>>= 0, n >>>= 0;
      var o = O(e >>>= 0);
      n === 0 && pt2(), n == 4294967295 && (n = void 0);
      try {
        var u = o.getMappedRange(t, n);
      } catch {
        return 0;
      }
      var c = Vr2(16, u.byteLength);
      return (l(), J2).set(new Uint8Array(u), c >>> 0), Ue2[e].push(() => Te2(c)), c;
    }
    function xu(e, t, n) {
      t >>>= 0, n >>>= 0;
      var o = O(e >>>= 0);
      n === 0 && pt2(), n == 4294967295 && (n = void 0);
      try {
        var u = o.getMappedRange(t, n);
      } catch {
        return 0;
      }
      var c = Vr2(16, u.byteLength);
      return (l(), J2).fill(0, c, u.byteLength), Ue2[e].push(() => {
        new Uint8Array(u).set((l(), J2).subarray(c >>> 0, c + u.byteLength >>> 0)), Te2(c);
      }), c;
    }
    function Lu(e, t, n, o, u) {
      e >>>= 0, t = pe(t), n = pe(n), u >>>= 0;
      var c = O(e);
      Ue2[e] = [], u == 4294967295 && (u = void 0), $2 += 1, lt2(t, c.mapAsync(n, o >>> 0, u).then(() => {
        --$2, kr2(t, 1, 0);
      }, (h) => {
        --$2, D();
        var b = Me(h.message);
        kr2(t, h.name === "AbortError" ? 4 : h.name === "OperationError" ? 3 : 0, b), delete Ue2[e];
      }));
    }
    function Bu(e) {
      var t = O(e >>>= 0), n = Ue2[e];
      if (n) {
        for (var o = 0; o < n.length; ++o) n[o]();
        delete Ue2[e], t.unmap();
      }
    }
    function Ou(e) {
      delete Dr2[e >>> 0];
    }
    function Mu(e, t, n) {
      e >>>= 0, t >>>= 0, n >>>= 0;
      var o = !!(l(), A)[t + 32 >>> 2 >>> 0];
      t = { label: Re(t + 4), usage: (l(), A)[t + 16 >>> 2 >>> 0], size: 4294967296 * (l(), A)[t + 28 >>> 2 >>> 0] + (l(), A)[t + 24 >>> 2 >>> 0], mappedAtCreation: o }, e = O(e);
      try {
        var u = e.createBuffer(t);
      } catch {
        return false;
      }
      return me(n, u), o && (Ue2[n] = []), true;
    }
    function Uu(e, t, n, o) {
      e >>>= 0, t = pe(t), o >>>= 0, n = bu(n >>> 0), e = O(e), $2 += 1, lt2(t, e.createComputePipelineAsync(n).then((u) => {
        --$2, me(o, u), Nr2(t, 1, o, 0);
      }, (u) => {
        --$2;
        var c = D(), h = Me(u.message);
        Nr2(t, u.reason === "validation" ? 3 : u.reason === "internal" ? 4 : 0, o, h), C(c);
      }));
    }
    function Cu(e, t, n) {
      e >>>= 0, t >>>= 0, n >>>= 0;
      var o = (l(), A)[t >>> 2 >>> 0], u = (l(), A)[o + 4 >>> 2 >>> 0];
      t = { label: Re(t + 4), code: "" }, u === 2 && (t.code = so2(o + 8)), me(n, O(e).createShaderModule(t));
    }
    var Du = (e) => {
      (e = O(e)).onuncapturederror = null, e.destroy();
    };
    function Pu(e, t) {
      t = pe(t), e = O(e >>> 0), $2 += 1, lt2(t, e.popErrorScope().then((n) => {
        --$2;
        var o = 5;
        n ? n instanceof GPUValidationError ? o = 2 : n instanceof GPUOutOfMemoryError ? o = 3 : n instanceof GPUInternalError && (o = 4) : o = 1;
        var u = D();
        n = n ? Me(n.message) : 0, Fr2(t, 1, o, n), C(u);
      }, (n) => {
        --$2;
        var o = D();
        n = Me(n.message), Fr2(t, 1, 5, n), C(o);
      }));
    }
    function _u(e, t, n, o) {
      if (t = pe(t), o >>>= 0, n >>>= 0) {
        var u = (l(), A)[n + 4 >>> 2 >>> 0];
        u = { featureLevel: gu[u], powerPreference: Tu[(l(), A)[n + 8 >>> 2 >>> 0]], forceFallbackAdapter: !!(l(), A)[n + 12 >>> 2 >>> 0] }, (n = (l(), A)[n >>> 2 >>> 0]) !== 0 && (l(), u.Qe = !!(l(), A)[n + 8 >>> 2 >>> 0]);
      }
      "gpu" in navigator ? ($2 += 1, lt2(t, navigator.gpu.requestAdapter(u).then((c) => {
        if (--$2, c) me(o, c), Et2(t, 1, o, 0);
        else {
          c = D();
          var h = Me("WebGPU not available on this browser (requestAdapter returned null)");
          Et2(t, 3, o, h), C(c);
        }
      }, (c) => {
        --$2;
        var h = D();
        c = Me(c.message), Et2(t, 4, o, c), C(h);
      }))) : (n = D(), u = Me("WebGPU not available on this browser (navigator.gpu is not available)"), Et2(t, 3, o, u), C(n));
    }
    function Ru(e, t, n) {
      return e >>>= 0, t >>>= 0, n >>>= 0, Jn(async () => {
        var o = [];
        if (n) {
          var u = (l(), x)[n >>> 2 >>> 0];
          o.length = t + 1, o[t] = new Promise((b) => setTimeout(b, u, 0));
        } else o.length = t;
        for (var c = 0; c < t; ++c) {
          var h = 4294967296 * (l(), A)[e + 8 * c + 4 >>> 2 >>> 0] + (l(), A)[e + 8 * c >>> 2 >>> 0];
          if (!(h in Ft)) return h;
          o[c] = Ft[h];
        }
        return o = await Promise.race(o), delete Ft[o], o;
      });
    }
    var Pr2, _r2 = {}, fo2 = () => {
      if (!Pr2) {
        var e, t = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8", _: "./this.program" };
        for (e in _r2) _r2[e] === void 0 ? delete t[e] : t[e] = _r2[e];
        var n = [];
        for (e in t) n.push(`${e}=${t[e]}`);
        Pr2 = n;
      }
      return Pr2;
    };
    function co2(e, t) {
      if (i) return H(19, 1, e, t);
      e >>>= 0, t >>>= 0;
      var n, o = 0, u = 0;
      for (n of fo2()) {
        var c = t + o;
        (l(), A)[e + u >>> 2 >>> 0] = c, o += Pe2(n, c, 1 / 0) + 1, u += 4;
      }
      return 0;
    }
    function lo2(e, t) {
      if (i) return H(20, 1, e, t);
      e >>>= 0, t >>>= 0;
      var n = fo2();
      for (var o of ((l(), A)[e >>> 2 >>> 0] = n.length, e = 0, n)) e += _e2(o) + 1;
      return (l(), A)[t >>> 2 >>> 0] = e, 0;
    }
    function po2(e) {
      return i ? H(21, 1, e) : 52;
    }
    function mo2(e, t, n, o) {
      return i ? H(22, 1, e, t, n, o) : 52;
    }
    function ho2(e, t, n, o) {
      return i ? H(23, 1, e, t, n, o) : 70;
    }
    var Nu = [null, [], []];
    function yo2(e, t, n, o) {
      if (i) return H(24, 1, e, t, n, o);
      t >>>= 0, n >>>= 0, o >>>= 0;
      for (var u = 0, c = 0; c < n; c++) {
        var h = (l(), A)[t >>> 2 >>> 0], b = (l(), A)[t + 4 >>> 2 >>> 0];
        t += 8;
        for (var E = 0; E < b; E++) {
          var I = e, N2 = (l(), J2)[h + E >>> 0], W = Nu[I];
          N2 === 0 || N2 === 10 ? ((I === 1 ? Y2 : B)(On(W)), W.length = 0) : W.push(N2);
        }
        u += b;
      }
      return (l(), A)[o >>> 2 >>> 0] = u, 0;
    }
    function Wu(e) {
      return e >>> 0;
    }
    function ku(e, t) {
      return io2(O(e >>> 0).limits, t >>> 0), 1;
    }
    function Fu(e, t) {
      return O(e >>> 0).features.has(uo2[t]);
    }
    function Gu(e) {
      return BigInt(O(e >>> 0).size);
    }
    function $u(e) {
      return BigInt(O(e >>> 0).usage);
    }
    function zu(e, t) {
      if (e >>>= 0, t >>>= 0) {
        var n = Re(t + 4);
        n = { label: n, timestampWrites: t = (t = (l(), A)[t + 12 >>> 2 >>> 0]) !== 0 ? { querySet: O((l(), A)[t + 4 >>> 2 >>> 0]), beginningOfPassWriteIndex: (l(), A)[t + 8 >>> 2 >>> 0], endOfPassWriteIndex: (l(), A)[t + 12 >>> 2 >>> 0] } : void 0 };
      }
      return e = O(e), t = Io(0), me(t, e.beginComputePass(n)), t;
    }
    function Vu(e, t, n, o, u, c) {
      n = pe(n), u = pe(u), c = pe(c), O(e >>> 0).copyBufferToBuffer(O(t >>> 0), n, O(o >>> 0), u, c);
    }
    function Hu(e) {
      e = O(e >>> 0);
      var t = So2(0);
      return me(t, e.finish()), t;
    }
    function ju(e, t, n, o, u, c) {
      c = pe(c), O(e >>> 0).resolveQuerySet(O(t >>> 0), n, o, O(u >>> 0), c);
    }
    function Yu(e, t, n, o) {
      O(e >>> 0).dispatchWorkgroups(t, n, o);
    }
    function qu(e, t, n) {
      n = pe(n), O(e >>> 0).dispatchWorkgroupsIndirect(O(t >>> 0), n);
    }
    function Ju(e) {
      O(e >>> 0).end();
    }
    function Xu(e, t, n, o, u) {
      o >>>= 0, u >>>= 0, e = O(e >>> 0), n = O(n >>> 0), o == 0 ? e.setBindGroup(t, n) : e.setBindGroup(t, n, (l(), A), u >>> 2, o);
    }
    function Zu(e, t) {
      O(e >>> 0).setPipeline(O(t >>> 0));
    }
    function Ku(e, t, n) {
      O(e >>> 0).Pe(O(t >>> 0), n);
    }
    function Qu(e, t) {
      e = O(e >>> 0);
      var n = Eo2(0);
      return me(n, e.getBindGroupLayout(t)), n;
    }
    function ef(e, t) {
      e >>>= 0;
      var n = Re(4 + (t >>>= 0)), o = O((l(), A)[t + 12 >>> 2 >>> 0]), u = (l(), A)[t + 16 >>> 2 >>> 0];
      t = (l(), A)[t + 20 >>> 2 >>> 0];
      for (var c = [], h = 0; h < u; ++h) {
        var b = c, E = b.push, I = t + 40 * h, N2 = (l(), A)[I + 8 >>> 2 >>> 0], W = (l(), A)[I + 32 >>> 2 >>> 0], X = (l(), A)[I + 36 >>> 2 >>> 0], L = (l(), A)[I + 4 >>> 2 >>> 0];
        N2 ? (W = I + 24, (W = (l(), A)[W >>> 2 >>> 0] + 4294967296 * (l(), x)[W + 4 >>> 2 >>> 0]) == -1 && (W = void 0), I = { binding: L, resource: { buffer: O(N2), offset: 4294967296 * (l(), A)[I + 4 + 16 >>> 2 >>> 0] + (l(), A)[I + 16 >>> 2 >>> 0], size: W } }) : I = W ? { binding: L, resource: O(W) } : { binding: L, resource: O(X) }, E.call(b, I);
      }
      return n = { label: n, layout: o, entries: c }, e = O(e), o = vo2(0), me(o, e.createBindGroup(n)), o;
    }
    function tf(e, t) {
      var n;
      return e >>>= 0, (t >>>= 0) && (n = { label: Re(t + 4) }), e = O(e), t = Ao(0), me(t, e.createCommandEncoder(n)), t;
    }
    function rf(e, t) {
      e >>>= 0, t >>>= 0, t = { type: vu[(l(), A)[t + 12 >>> 2 >>> 0]], count: (l(), A)[t + 16 >>> 2 >>> 0] }, e = O(e);
      var n = xo(0);
      return me(n, e.createQuerySet(t)), n;
    }
    function nf(e, t) {
      e = O(e >>> 0).adapterInfo, t >>>= 0, (l(), x)[t + 52 >>> 2 >>> 0] = e.subgroupMinSize, (l(), x)[t + 56 >>> 2 >>> 0] = e.subgroupMaxSize;
      var n = oo2(e.vendor + e.architecture + e.device + e.description), o = _e2(e.vendor);
      return Gt(t + 4, n, o), n += o, o = _e2(e.architecture), Gt(t + 12, n, o), n += o, o = _e2(e.device), Gt(t + 20, n, o), Gt(t + 28, n + o, _e2(e.description)), (l(), x)[t + 36 >>> 2 >>> 0] = 2, e = e.isFallbackAdapter ? 3 : 4, (l(), x)[t + 40 >>> 2 >>> 0] = e, (l(), x)[t + 44 >>> 2 >>> 0] = 0, (l(), x)[t + 48 >>> 2 >>> 0] = 0, 1;
    }
    var of = { "core-features-and-limits": 1, "depth-clip-control": 2, "depth32float-stencil8": 3, "texture-compression-bc": 4, "texture-compression-bc-sliced-3d": 5, "texture-compression-etc2": 6, "texture-compression-astc": 7, "texture-compression-astc-sliced-3d": 8, "timestamp-query": 9, "indirect-first-instance": 10, "shader-f16": 11, "rg11b10ufloat-renderable": 12, "bgra8unorm-storage": 13, "float32-filterable": 14, "float32-blendable": 15, "clip-distances": 16, "dual-source-blending": 17, subgroups: 18, "texture-formats-tier1": 19, "texture-formats-tier2": 20, "primitive-index": 21, "chromium-experimental-unorm16-texture-formats": 327692, "chromium-experimental-snorm16-texture-formats": 327693, "chromium-experimental-multi-draw-indirect": 327732 };
    function af(e, t) {
      t >>>= 0, e = O(e >>> 0);
      var n = mt2(4 * e.features.size), o = 0, u = 0;
      e.features.forEach((c) => {
        0 <= (c = of[c]) && ((l(), x)[n + o >>> 2 >>> 0] = c, o += 4, u++);
      }), (l(), A)[t + 4 >>> 2 >>> 0] = n, (l(), A)[t >>> 2 >>> 0] = u;
    }
    function sf(e, t) {
      return io2(O(e >>> 0).limits, t >>> 0), 1;
    }
    function uf(e, t) {
      O(e >>> 0).pushErrorScope(wu[t]);
    }
    function ff(e, t, n) {
      t >>>= 0, n >>>= 0, e = O(e >>> 0), t = Array.from((l(), x).subarray(n >>> 2 >>> 0, n + 4 * t >>> 2 >>> 0), (o) => O(o)), e.submit(t);
    }
    function cf(e, t, n, o, u) {
      n = pe(n), o >>>= 0, u >>>= 0, e = O(e >>> 0), t = O(t >>> 0), o = (l(), J2).subarray(o >>> 0, o + u >>> 0), e.writeBuffer(t, n, o, 0, u);
    }
    i || (function() {
      for (var e = r.numThreads - 1; e--; ) En();
      Ae.push(async () => {
        var t = (async function() {
          if (!i) return Promise.all(We2.map(vn));
        })();
        Le2++, await t, --Le2 == 0 && te && (t = te, te = null, t());
      });
    })(), i || (ke2 = new WebAssembly.Memory({ initial: 256, maximum: 65536, shared: true }), se()), r.wasmBinary && (g = r.wasmBinary), r.stackSave = () => D(), r.stackRestore = (e) => C(e), r.stackAlloc = (e) => zt(e), r.setValue = function(e, t, n = "i8") {
      switch (n.endsWith("*") && (n = "*"), n) {
        case "i1":
        case "i8":
          (l(), Z2)[e >>> 0] = t;
          break;
        case "i16":
          (l(), Ce2)[e >>> 1 >>> 0] = t;
          break;
        case "i32":
          (l(), x)[e >>> 2 >>> 0] = t;
          break;
        case "i64":
          (l(), le)[e >>> 3 >>> 0] = BigInt(t);
          break;
        case "float":
          (l(), _)[e >>> 2 >>> 0] = t;
          break;
        case "double":
          (l(), ae2)[e >>> 3 >>> 0] = t;
          break;
        case "*":
          (l(), A)[e >>> 2 >>> 0] = t;
          break;
        default:
          we(`invalid type for setValue: ${n}`);
      }
    }, r.getValue = function(e, t = "i8") {
      switch (t.endsWith("*") && (t = "*"), t) {
        case "i1":
        case "i8":
          return (l(), Z2)[e >>> 0];
        case "i16":
          return (l(), Ce2)[e >>> 1 >>> 0];
        case "i32":
          return (l(), x)[e >>> 2 >>> 0];
        case "i64":
          return (l(), le)[e >>> 3 >>> 0];
        case "float":
          return (l(), _)[e >>> 2 >>> 0];
        case "double":
          return (l(), ae2)[e >>> 3 >>> 0];
        case "*":
          return (l(), A)[e >>> 2 >>> 0];
        default:
          we(`invalid type for getValue: ${t}`);
      }
    }, r.UTF8ToString = ct2, r.stringToUTF8 = Pe2, r.lengthBytesUTF8 = _e2;
    var bo2, wo2, Rr2, $t, Te2, mt2, go2, To2, vo2, Eo2, So2, Ao, Io, xo, Lo, Bo, Oo2, Nr2, Wr2, kr2, Fr2, Et2, Gr2, Mo, $r2, Uo, Co, Do, zr2, Po, _o, Vr2, k, St2, Ro, C, zt, D, No, Hr2, Wo, ko, Fo, jr2, Go, $o, zo, Vo, Ho, jo, Yo, qo, Jo, Xo, Zo, Ko, Qo, ea, ta, ra, na, oa, aa, sa, ia, ua, fa, ca, da, la, pa, ma, ha, ya, ba, wa, ga, Ta, va, Ea, Sa, Aa, Ia, xa, Ne, df = [Ye, gr2, In, Mn, Un, Cn, Dn, Pn, _n, Rn, Nn, Wn, kn, Fn, Gn, $n, eo2, to2, ro2, co2, lo2, po2, mo2, ho2, yo2], Yr2 = { 1113148: (e, t, n, o, u) => {
      if (r === void 0 || !r.Zc) return 1;
      if ((e = ct2(Number(e >>> 0))).startsWith("./") && (e = e.substring(2)), !(e = r.Zc.get(e))) return 2;
      if (t = Number(t >>> 0), n = Number(n >>> 0), o = Number(o >>> 0), t + n > e.byteLength) return 3;
      try {
        let c = e.subarray(t, t + n);
        switch (u) {
          case 0:
            (l(), J2).set(c, o >>> 0);
            break;
          case 1:
            r.ie ? r.ie(o, c) : r.Ke(o, c);
            break;
          default:
            return 4;
        }
        return 0;
      } catch {
        return 4;
      }
    }, 1113972: (e, t, n) => {
      r.ke(e, (l(), J2).subarray(t >>> 0, t + n >>> 0));
    }, 1114036: () => r.Ie(), 1114078: (e) => {
      r.je(e);
    }, 1114115: () => typeof wasmOffsetConverter < "u" };
    function lf() {
      return typeof wasmOffsetConverter < "u";
    }
    function pf(e, t, n, o) {
      var u = D();
      try {
        return qo(e, t, n, o);
      } catch (c) {
        if (C(u), c !== c + 0) throw c;
        k(1, 0);
      }
    }
    function mf(e, t, n) {
      var o = D();
      try {
        return Ho(e, t, n);
      } catch (u) {
        if (C(o), u !== u + 0) throw u;
        k(1, 0);
      }
    }
    function hf(e, t, n) {
      var o = D();
      try {
        Fo(e, t, n);
      } catch (u) {
        if (C(o), u !== u + 0) throw u;
        k(1, 0);
      }
    }
    function yf(e, t) {
      var n = D();
      try {
        return jr2(e, t);
      } catch (o) {
        if (C(n), o !== o + 0) throw o;
        k(1, 0);
      }
    }
    function bf(e) {
      var t = D();
      try {
        Go(e);
      } catch (n) {
        if (C(t), n !== n + 0) throw n;
        k(1, 0);
      }
    }
    function wf(e, t, n, o, u, c, h) {
      var b = D();
      try {
        return Vo(e, t, n, o, u, c, h);
      } catch (E) {
        if (C(b), E !== E + 0) throw E;
        k(1, 0);
      }
    }
    function gf(e, t) {
      var n = D();
      try {
        Jo(e, t);
      } catch (o) {
        if (C(n), o !== o + 0) throw o;
        k(1, 0);
      }
    }
    function Tf(e, t, n, o, u, c) {
      var h = D();
      try {
        $o(e, t, n, o, u, c);
      } catch (b) {
        if (C(h), b !== b + 0) throw b;
        k(1, 0);
      }
    }
    function vf(e, t, n, o) {
      var u = D();
      try {
        Yo(e, t, n, o);
      } catch (c) {
        if (C(u), c !== c + 0) throw c;
        k(1, 0);
      }
    }
    function Ef(e, t, n, o, u, c, h) {
      var b = D();
      try {
        Zo(e, t, n, o, u, c, h);
      } catch (E) {
        if (C(b), E !== E + 0) throw E;
        k(1, 0);
      }
    }
    function Sf(e, t, n, o, u, c, h) {
      var b = D();
      try {
        Ko(e, t, n, o, u, c, h);
      } catch (E) {
        if (C(b), E !== E + 0) throw E;
        k(1, 0);
      }
    }
    function Af(e, t, n, o, u, c, h, b) {
      var E = D();
      try {
        ua(e, t, n, o, u, c, h, b);
      } catch (I) {
        if (C(E), I !== I + 0) throw I;
        k(1, 0);
      }
    }
    function If(e, t, n, o, u) {
      var c = D();
      try {
        zo(e, t, n, o, u);
      } catch (h) {
        if (C(c), h !== h + 0) throw h;
        k(1, 0);
      }
    }
    function xf(e, t, n, o, u) {
      var c = D();
      try {
        return Xo(e, t, n, o, u);
      } catch (h) {
        if (C(c), h !== h + 0) throw h;
        k(1, 0);
      }
    }
    function Lf(e, t, n, o, u, c, h, b) {
      var E = D();
      try {
        fa(e, t, n, o, u, c, h, b);
      } catch (I) {
        if (C(E), I !== I + 0) throw I;
        k(1, 0);
      }
    }
    function Bf(e, t, n, o, u, c, h, b, E, I, N2, W) {
      var X = D();
      try {
        Qo(e, t, n, o, u, c, h, b, E, I, N2, W);
      } catch (L) {
        if (C(X), L !== L + 0) throw L;
        k(1, 0);
      }
    }
    function Of(e, t, n, o, u, c) {
      var h = D();
      try {
        return sa(e, t, n, o, u, c);
      } catch (b) {
        if (C(h), b !== b + 0) throw b;
        k(1, 0);
      }
    }
    function Mf(e, t, n) {
      var o = D();
      try {
        return na(e, t, n);
      } catch (u) {
        if (C(o), u !== u + 0) throw u;
        return k(1, 0), 0n;
      }
    }
    function Uf(e, t, n, o, u, c, h, b, E) {
      var I = D();
      try {
        jo(e, t, n, o, u, c, h, b, E);
      } catch (N2) {
        if (C(I), N2 !== N2 + 0) throw N2;
        k(1, 0);
      }
    }
    function Cf(e) {
      var t = D();
      try {
        return ta(e);
      } catch (n) {
        if (C(t), n !== n + 0) throw n;
        k(1, 0);
      }
    }
    function Df(e, t, n) {
      var o = D();
      try {
        return ca(e, t, n);
      } catch (u) {
        if (C(o), u !== u + 0) throw u;
        k(1, 0);
      }
    }
    function Pf(e, t) {
      var n = D();
      try {
        return Ea(e, t);
      } catch (o) {
        if (C(n), o !== o + 0) throw o;
        return k(1, 0), 0n;
      }
    }
    function _f(e, t, n, o, u) {
      var c = D();
      try {
        da(e, t, n, o, u);
      } catch (h) {
        if (C(c), h !== h + 0) throw h;
        k(1, 0);
      }
    }
    function Rf(e) {
      var t = D();
      try {
        return ea(e);
      } catch (n) {
        if (C(t), n !== n + 0) throw n;
        return k(1, 0), 0n;
      }
    }
    function Nf(e, t, n, o, u, c) {
      var h = D();
      try {
        return ma(e, t, n, o, u, c);
      } catch (b) {
        if (C(h), b !== b + 0) throw b;
        k(1, 0);
      }
    }
    function Wf(e, t, n, o, u, c) {
      var h = D();
      try {
        return ha(e, t, n, o, u, c);
      } catch (b) {
        if (C(h), b !== b + 0) throw b;
        k(1, 0);
      }
    }
    function kf(e, t, n, o, u, c, h, b) {
      var E = D();
      try {
        return ia(e, t, n, o, u, c, h, b);
      } catch (I) {
        if (C(E), I !== I + 0) throw I;
        k(1, 0);
      }
    }
    function Ff(e, t, n, o, u) {
      var c = D();
      try {
        return ya(e, t, n, o, u);
      } catch (h) {
        if (C(c), h !== h + 0) throw h;
        return k(1, 0), 0n;
      }
    }
    function Gf(e, t, n, o) {
      var u = D();
      try {
        return ba(e, t, n, o);
      } catch (c) {
        if (C(u), c !== c + 0) throw c;
        k(1, 0);
      }
    }
    function $f(e, t, n, o) {
      var u = D();
      try {
        return wa(e, t, n, o);
      } catch (c) {
        if (C(u), c !== c + 0) throw c;
        k(1, 0);
      }
    }
    function zf(e, t, n, o, u, c, h, b, E, I, N2, W) {
      var X = D();
      try {
        return ga(e, t, n, o, u, c, h, b, E, I, N2, W);
      } catch (L) {
        if (C(X), L !== L + 0) throw L;
        k(1, 0);
      }
    }
    function Vf(e, t, n, o, u, c, h, b, E, I, N2) {
      var W = D();
      try {
        la(e, t, n, o, u, c, h, b, E, I, N2);
      } catch (X) {
        if (C(W), X !== X + 0) throw X;
        k(1, 0);
      }
    }
    function Hf(e, t, n, o, u, c, h, b, E, I, N2, W, X, L, fe, ve) {
      var ie2 = D();
      try {
        pa(e, t, n, o, u, c, h, b, E, I, N2, W, X, L, fe, ve);
      } catch (Ze2) {
        if (C(ie2), Ze2 !== Ze2 + 0) throw Ze2;
        k(1, 0);
      }
    }
    function jf(e, t, n, o) {
      var u = D();
      try {
        return Ta(e, t, n, o);
      } catch (c) {
        if (C(u), c !== c + 0) throw c;
        k(1, 0);
      }
    }
    function Yf(e, t, n, o, u) {
      var c = D();
      try {
        return va(e, t, n, o, u);
      } catch (h) {
        if (C(c), h !== h + 0) throw h;
        k(1, 0);
      }
    }
    function qf(e, t, n) {
      var o = D();
      try {
        return ra(e, t, n);
      } catch (u) {
        if (C(o), u !== u + 0) throw u;
        k(1, 0);
      }
    }
    function Jf(e, t, n) {
      var o = D();
      try {
        return oa(e, t, n);
      } catch (u) {
        if (C(o), u !== u + 0) throw u;
        k(1, 0);
      }
    }
    function Xf(e, t, n, o) {
      var u = D();
      try {
        aa(e, t, n, o);
      } catch (c) {
        if (C(u), c !== c + 0) throw c;
        k(1, 0);
      }
    }
    function Vt() {
      if (0 < Le2) te = Vt;
      else if (i) U?.(r), wr2();
      else {
        for (var e = Ae; 0 < e.length; ) e.shift()(r);
        0 < Le2 ? te = Vt : (r.calledRun = true, G2 || (wr2(), U?.(r)));
      }
    }
    return i || (Ne = await wt2(), Vt()), r.PTR_SIZE = 4, r.webgpuInit = (e) => {
      let t = /* @__PURE__ */ new WeakMap(), n, o, u = 1;
      r.webgpuRegisterDevice = (b) => {
        if (o !== void 0) throw Error("another WebGPU EP inference session is being created.");
        if (b) {
          var E = t.get(b);
          if (!E) {
            let I = ((N2, W = 0) => {
              var X = Oo2(W);
              return W = Bo(W, X), me(X, N2.queue), me(W, N2), W;
            })(b, E = To2(0));
            E = [u++, E, I], t.set(b, E);
          }
          return n = b, o = E[0], E;
        }
        n = void 0, o = 0;
      };
      let c = /* @__PURE__ */ new Map();
      r.webgpuOnCreateSession = (b) => {
        if (o !== void 0) {
          var E = o;
          if (o = void 0, b) {
            let I = Rr2(E);
            c.set(b, I), E === 0 && e(n ?? O(I));
          }
          n = void 0;
        }
      }, r.webgpuOnReleaseSession = (b) => {
        c.delete(b);
      };
      let h = /* @__PURE__ */ Symbol("gpuBufferMetadata");
      r.webgpuRegisterBuffer = (b, E, I) => {
        if (I) return b[h] = [I, NaN], I;
        if (I = b[h]) return I[1]++, I[0];
        if ((E = c.get(E)) === void 0) throw Error("Invalid session handle passed to webgpuRegisterBuffer");
        return E = ((N2, W = 0) => (N2.mapState != "pending" || we(), W = Lo(W, N2.mapState == "mapped" ? 3 : 1), me(W, N2), N2.mapState == "mapped" && (Ue2[W] = []), W))(b, E), b[h] = [E, 1], E;
      }, r.webgpuUnregisterBuffer = (b) => {
        let E = b[h];
        if (!E) throw Error("Buffer is not registered");
        E[1]--, E[1] === 0 && (go2(E[0]), delete b[h]);
      }, r.webgpuGetBuffer = (b) => O(b), r.webgpuCreateDownloader = (b, E, I) => {
        if ((I = c.get(I)) === void 0) throw Error("Invalid session handle passed to webgpuRegisterBuffer");
        let N2 = O(I), W = 16 * Math.ceil(Number(E) / 16);
        return async () => {
          let X = N2.createBuffer({ size: W, usage: 9 });
          try {
            let L = N2.createCommandEncoder();
            return L.copyBufferToBuffer(b, 0, X, 0, W), N2.queue.submit([L.finish()]), await X.mapAsync(GPUMapMode.READ), X.getMappedRange().slice(0, E);
          } finally {
            X.destroy();
          }
        };
      }, r.ie = (b, E) => {
        var I = E.buffer;
        let N2 = E.byteOffset, W = E.byteLength;
        if (E = 16 * Math.ceil(Number(W) / 16), b = O(b), !n) {
          var X = Rr2(o);
          n = O(X);
        }
        let L = (X = n.createBuffer({ mappedAtCreation: true, size: E, usage: 6 })).getMappedRange();
        new Uint8Array(L).set(new Uint8Array(I, N2, W)), X.unmap(), (I = n.createCommandEncoder()).copyBufferToBuffer(X, 0, b, 0, E), n.queue.submit([I.finish()]), X.destroy();
      };
    }, r.webnnInit = (e) => {
      let t = e[0];
      [r.Ie, r.je, r.webnnEnsureTensor, r.ke, r.webnnDownloadTensor, r.He, r.webnnEnableTraceEvent] = e.slice(1), r.webnnReleaseTensorId = r.je, r.webnnUploadTensor = r.ke, r.webnnRegisterMLContext = r.He, r.webnnOnRunStart = (n) => t.onRunStart(n), r.webnnOnRunEnd = t.onRunEnd.bind(t), r.webnnOnReleaseSession = (n) => {
        t.onReleaseSession(n);
      }, r.webnnCreateMLTensorDownloader = (n, o) => t.createMLTensorDownloader(n, o), r.webnnRegisterMLTensor = (n, o, u, c) => t.registerMLTensor(n, o, u, c), r.webnnCreateMLContext = (n) => t.createMLContext(n), r.webnnRegisterMLConstant = (n, o, u, c, h, b) => t.registerMLConstant(n, o, u, c, h, r.Zc, b), r.webnnRegisterGraphInput = t.registerGraphInput.bind(t), r.webnnIsGraphInput = t.isGraphInput.bind(t), r.webnnRegisterGraphOutput = t.registerGraphOutput.bind(t), r.webnnIsGraphOutput = t.isGraphOutput.bind(t), r.webnnCreateTemporaryTensor = t.createTemporaryTensor.bind(t), r.webnnIsGraphInputOutputTypeSupported = t.isGraphInputOutputTypeSupported.bind(t);
    }, re ? r : new Promise((e, t) => {
      U = e, R = t;
    });
  }
  var import_meta, qr, Kf, Qf, ec, Jr, F, At, tc, Ht, jt, Ke, Qe, rc, La, Xr, Ba, Oa, Ma, Ua, ue, Zr, ee, Ca, Da, Pa, _a, Kr, Ra, Na, Wa, ka, Fa, Ga, et, It, $a, za, Va, Ha, ja, Ya, ce, Yt, xe, Qr, qa, Ja, tt, rt, Ge, $e, en, qt, Xa, nc, Za, Ka, Qa, es, ts, tn, ze, Jt, as, ns, os, oc, ss, us, ac, sc, fs, ls, on, ic, be, ps, nn, uc, fc, ms, cc, cs, hs, ds, ys, Xt, an, sn, ar, bs, dc, lc, pc, Zt, V, Ve, he, Lt, z, sr, ws, gs, mc, hc, yc, un, ot, bc, Ts, vs, He, ir, ht, at, Bt, ur, fr, fn, st, Ot, cn, Es, Ss, wc, gc, As, Is, xs, Tc, de, dn, Bs, pn, Os, vc, Ls, Ec, Ms, cr, dr, ln, Us, Cs, Ds, lr, Sc, mn, Ps, Ac, Kt, Qt, it, Ic, _s, xt, er, tr, Rs, rr, nr, or, rn, ut, Ee, Mt, mr, hr, pr, hn, yn, yt, bt, Lc, Ns, Ws, ks, Fs, Gs, $s, zs, bn, Vs, Bc, yr, Hs, Ys, js, br, Oc, qs, rs, Bl;
  var init_ort_webgpu_bundle_min = __esm({
    "node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs"() {
      import_meta = {};
      qr = Object.defineProperty;
      Kf = Object.getOwnPropertyDescriptor;
      Qf = Object.getOwnPropertyNames;
      ec = Object.prototype.hasOwnProperty;
      Jr = ((a) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(a, { get: (r, s) => (typeof __require < "u" ? __require : r)[s] }) : a)(function(a) {
        if (typeof __require < "u") return __require.apply(this, arguments);
        throw Error('Dynamic require of "' + a + '" is not supported');
      });
      F = (a, r) => () => (a && (r = a(a = 0)), r);
      At = (a, r) => {
        for (var s in r) qr(a, s, { get: r[s], enumerable: true });
      };
      tc = (a, r, s, f) => {
        if (r && typeof r == "object" || typeof r == "function") for (let i of Qf(r)) !ec.call(a, i) && i !== s && qr(a, i, { get: () => r[i], enumerable: !(f = Kf(r, i)) || f.enumerable });
        return a;
      };
      Ht = (a) => tc(qr({}, "__esModule", { value: true }), a);
      Xr = F(() => {
        "use strict";
        jt = /* @__PURE__ */ new Map(), Ke = [], Qe = (a, r, s) => {
          if (r && typeof r.init == "function" && typeof r.createInferenceSessionHandler == "function") {
            let f = jt.get(a);
            if (f === void 0) jt.set(a, { backend: r, priority: s });
            else {
              if (f.priority > s) return;
              if (f.priority === s && f.backend !== r) throw new Error(`cannot register backend "${a}" using priority ${s}`);
            }
            if (s >= 0) {
              let i = Ke.indexOf(a);
              i !== -1 && Ke.splice(i, 1);
              for (let d = 0; d < Ke.length; d++) if (jt.get(Ke[d]).priority <= s) {
                Ke.splice(d, 0, a);
                return;
              }
              Ke.push(a);
            }
            return;
          }
          throw new TypeError("not a valid backend");
        }, rc = async (a) => {
          let r = jt.get(a);
          if (!r) return "backend not found.";
          if (r.initialized) return r.backend;
          if (r.aborted) return r.error;
          {
            let s = !!r.initPromise;
            try {
              return s || (r.initPromise = r.backend.init(a)), await r.initPromise, r.initialized = true, r.backend;
            } catch (f) {
              return s || (r.error = `${f}`, r.aborted = true), r.error;
            } finally {
              delete r.initPromise;
            }
          }
        }, La = async (a) => {
          let r = a.executionProviders || [], s = r.map((y) => typeof y == "string" ? y : y.name), f = s.length === 0 ? Ke : s, i, d = [], p = /* @__PURE__ */ new Set();
          for (let y of f) {
            let w = await rc(y);
            typeof w == "string" ? d.push({ name: y, err: w }) : (i || (i = w), i === w && p.add(y));
          }
          if (!i) throw new Error(`no available backend found. ERR: ${d.map((y) => `[${y.name}] ${y.err}`).join(", ")}`);
          for (let { name: y, err: w } of d) s.includes(y) && console.warn(`removing requested execution provider "${y}" from session options because it is not available: ${w}`);
          let m = r.filter((y) => p.has(typeof y == "string" ? y : y.name));
          return [i, new Proxy(a, { get: (y, w) => w === "executionProviders" ? m : Reflect.get(y, w) })];
        };
      });
      Ba = F(() => {
        "use strict";
        Xr();
      });
      Ma = F(() => {
        "use strict";
        Oa = "1.24.3";
      });
      Zr = F(() => {
        "use strict";
        Ma();
        Ua = "warning", ue = { wasm: {}, webgl: {}, webgpu: {}, versions: { common: Oa }, set logLevel(a) {
          if (a !== void 0) {
            if (typeof a != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(a) === -1) throw new Error(`Unsupported logging level: ${a}`);
            Ua = a;
          }
        }, get logLevel() {
          return Ua;
        } };
        Object.defineProperty(ue, "logLevel", { enumerable: true });
      });
      Ca = F(() => {
        "use strict";
        Zr();
        ee = ue;
      });
      _a = F(() => {
        "use strict";
        Da = (a, r) => {
          let s = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
          s.width = a.dims[3], s.height = a.dims[2];
          let f = s.getContext("2d");
          if (f != null) {
            let i, d;
            r?.tensorLayout !== void 0 && r.tensorLayout === "NHWC" ? (i = a.dims[2], d = a.dims[3]) : (i = a.dims[3], d = a.dims[2]);
            let p = r?.format !== void 0 ? r.format : "RGB", m = r?.norm, y, w;
            m === void 0 || m.mean === void 0 ? y = [255, 255, 255, 255] : typeof m.mean == "number" ? y = [m.mean, m.mean, m.mean, m.mean] : (y = [m.mean[0], m.mean[1], m.mean[2], 0], m.mean[3] !== void 0 && (y[3] = m.mean[3])), m === void 0 || m.bias === void 0 ? w = [0, 0, 0, 0] : typeof m.bias == "number" ? w = [m.bias, m.bias, m.bias, m.bias] : (w = [m.bias[0], m.bias[1], m.bias[2], 0], m.bias[3] !== void 0 && (w[3] = m.bias[3]));
            let T = d * i, g = 0, v = T, S = T * 2, U = -1;
            p === "RGBA" ? (g = 0, v = T, S = T * 2, U = T * 3) : p === "RGB" ? (g = 0, v = T, S = T * 2) : p === "RBG" && (g = 0, S = T, v = T * 2);
            for (let R = 0; R < d; R++) for (let j = 0; j < i; j++) {
              let P = (a.data[g++] - w[0]) * y[0], M = (a.data[v++] - w[1]) * y[1], Y2 = (a.data[S++] - w[2]) * y[2], B = U === -1 ? 255 : (a.data[U++] - w[3]) * y[3];
              f.fillStyle = "rgba(" + P + "," + M + "," + Y2 + "," + B + ")", f.fillRect(j, R, 1, 1);
            }
            if ("toDataURL" in s) return s.toDataURL();
            throw new Error("toDataURL is not supported");
          } else throw new Error("Can not access image data");
        }, Pa = (a, r) => {
          let s = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), f;
          if (s != null) {
            let i, d, p;
            r?.tensorLayout !== void 0 && r.tensorLayout === "NHWC" ? (i = a.dims[2], d = a.dims[1], p = a.dims[3]) : (i = a.dims[3], d = a.dims[2], p = a.dims[1]);
            let m = r !== void 0 && r.format !== void 0 ? r.format : "RGB", y = r?.norm, w, T;
            y === void 0 || y.mean === void 0 ? w = [255, 255, 255, 255] : typeof y.mean == "number" ? w = [y.mean, y.mean, y.mean, y.mean] : (w = [y.mean[0], y.mean[1], y.mean[2], 255], y.mean[3] !== void 0 && (w[3] = y.mean[3])), y === void 0 || y.bias === void 0 ? T = [0, 0, 0, 0] : typeof y.bias == "number" ? T = [y.bias, y.bias, y.bias, y.bias] : (T = [y.bias[0], y.bias[1], y.bias[2], 0], y.bias[3] !== void 0 && (T[3] = y.bias[3]));
            let g = d * i;
            if (r !== void 0 && (r.format !== void 0 && p === 4 && r.format !== "RGBA" || p === 3 && r.format !== "RGB" && r.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
            let v = 4, S = 0, U = 1, R = 2, j = 3, P = 0, M = g, Y2 = g * 2, B = -1;
            m === "RGBA" ? (P = 0, M = g, Y2 = g * 2, B = g * 3) : m === "RGB" ? (P = 0, M = g, Y2 = g * 2) : m === "RBG" && (P = 0, Y2 = g, M = g * 2), f = s.createImageData(i, d);
            for (let G2 = 0; G2 < d * i; S += v, U += v, R += v, j += v, G2++) f.data[S] = (a.data[P++] - T[0]) * w[0], f.data[U] = (a.data[M++] - T[1]) * w[1], f.data[R] = (a.data[Y2++] - T[2]) * w[2], f.data[j] = B === -1 ? 255 : (a.data[B++] - T[3]) * w[3];
          } else throw new Error("Can not access image data");
          return f;
        };
      });
      Ga = F(() => {
        "use strict";
        Yt();
        Kr = (a, r) => {
          if (a === void 0) throw new Error("Image buffer must be defined");
          if (r.height === void 0 || r.width === void 0) throw new Error("Image height and width must be defined");
          if (r.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
          let { height: s, width: f } = r, i = r.norm ?? { mean: 255, bias: 0 }, d, p;
          typeof i.mean == "number" ? d = [i.mean, i.mean, i.mean, i.mean] : d = [i.mean[0], i.mean[1], i.mean[2], i.mean[3] ?? 255], typeof i.bias == "number" ? p = [i.bias, i.bias, i.bias, i.bias] : p = [i.bias[0], i.bias[1], i.bias[2], i.bias[3] ?? 0];
          let m = r.format !== void 0 ? r.format : "RGBA", y = r.tensorFormat !== void 0 && r.tensorFormat !== void 0 ? r.tensorFormat : "RGB", w = s * f, T = y === "RGBA" ? new Float32Array(w * 4) : new Float32Array(w * 3), g = 4, v = 0, S = 1, U = 2, R = 3, j = 0, P = w, M = w * 2, Y2 = -1;
          m === "RGB" && (g = 3, v = 0, S = 1, U = 2, R = -1), y === "RGBA" ? Y2 = w * 3 : y === "RBG" ? (j = 0, M = w, P = w * 2) : y === "BGR" && (M = 0, P = w, j = w * 2);
          for (let G2 = 0; G2 < w; G2++, v += g, U += g, S += g, R += g) T[j++] = (a[v] + p[0]) / d[0], T[P++] = (a[S] + p[1]) / d[1], T[M++] = (a[U] + p[2]) / d[2], Y2 !== -1 && R !== -1 && (T[Y2++] = (a[R] + p[3]) / d[3]);
          return y === "RGBA" ? new ce("float32", T, [1, 4, s, f]) : new ce("float32", T, [1, 3, s, f]);
        }, Ra = async (a, r) => {
          let s = typeof HTMLImageElement < "u" && a instanceof HTMLImageElement, f = typeof ImageData < "u" && a instanceof ImageData, i = typeof ImageBitmap < "u" && a instanceof ImageBitmap, d = typeof a == "string", p, m = r ?? {}, y = () => {
            if (typeof document < "u") return document.createElement("canvas");
            if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
            throw new Error("Canvas is not supported");
          }, w = (T) => typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || T instanceof OffscreenCanvas ? T.getContext("2d") : null;
          if (s) {
            let T = y();
            T.width = a.width, T.height = a.height;
            let g = w(T);
            if (g != null) {
              let v = a.height, S = a.width;
              if (r !== void 0 && r.resizedHeight !== void 0 && r.resizedWidth !== void 0 && (v = r.resizedHeight, S = r.resizedWidth), r !== void 0) {
                if (m = r, r.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
                m.tensorFormat = "RGBA", m.height = v, m.width = S;
              } else m.tensorFormat = "RGBA", m.height = v, m.width = S;
              g.drawImage(a, 0, 0), p = g.getImageData(0, 0, S, v).data;
            } else throw new Error("Can not access image data");
          } else if (f) {
            let T, g;
            if (r !== void 0 && r.resizedWidth !== void 0 && r.resizedHeight !== void 0 ? (T = r.resizedHeight, g = r.resizedWidth) : (T = a.height, g = a.width), r !== void 0 && (m = r), m.format = "RGBA", m.height = T, m.width = g, r !== void 0) {
              let v = y();
              v.width = g, v.height = T;
              let S = w(v);
              if (S != null) S.putImageData(a, 0, 0), p = S.getImageData(0, 0, g, T).data;
              else throw new Error("Can not access image data");
            } else p = a.data;
          } else if (i) {
            if (r === void 0) throw new Error("Please provide image config with format for Imagebitmap");
            let T = y();
            T.width = a.width, T.height = a.height;
            let g = w(T);
            if (g != null) {
              let v = a.height, S = a.width;
              return g.drawImage(a, 0, 0, S, v), p = g.getImageData(0, 0, S, v).data, m.height = v, m.width = S, Kr(p, m);
            } else throw new Error("Can not access image data");
          } else {
            if (d) return new Promise((T, g) => {
              let v = y(), S = w(v);
              if (!a || !S) return g();
              let U = new Image();
              U.crossOrigin = "Anonymous", U.src = a, U.onload = () => {
                v.width = U.width, v.height = U.height, S.drawImage(U, 0, 0, v.width, v.height);
                let R = S.getImageData(0, 0, v.width, v.height);
                m.height = v.height, m.width = v.width, T(Kr(R.data, m));
              };
            });
            throw new Error("Input data provided is not supported - aborted tensor creation");
          }
          if (p !== void 0) return Kr(p, m);
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }, Na = (a, r) => {
          let { width: s, height: f, download: i, dispose: d } = r, p = [1, f, s, 4];
          return new ce({ location: "texture", type: "float32", texture: a, dims: p, download: i, dispose: d });
        }, Wa = (a, r) => {
          let { dataType: s, dims: f, download: i, dispose: d } = r;
          return new ce({ location: "gpu-buffer", type: s ?? "float32", gpuBuffer: a, dims: f, download: i, dispose: d });
        }, ka = (a, r) => {
          let { dataType: s, dims: f, download: i, dispose: d } = r;
          return new ce({ location: "ml-tensor", type: s ?? "float32", mlTensor: a, dims: f, download: i, dispose: d });
        }, Fa = (a, r, s) => new ce({ location: "cpu-pinned", type: a, data: r, dims: s ?? [r.length] });
      });
      Va = F(() => {
        "use strict";
        et = /* @__PURE__ */ new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), It = /* @__PURE__ */ new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), $a = false, za = () => {
          if (!$a) {
            $a = true;
            let a = typeof BigInt64Array < "u" && BigInt64Array.from, r = typeof BigUint64Array < "u" && BigUint64Array.from, s = globalThis.Float16Array, f = typeof s < "u" && s.from;
            a && (et.set("int64", BigInt64Array), It.set(BigInt64Array, "int64")), r && (et.set("uint64", BigUint64Array), It.set(BigUint64Array, "uint64")), f ? (et.set("float16", s), It.set(s, "float16")) : et.set("float16", Uint16Array);
          }
        };
      });
      Ya = F(() => {
        "use strict";
        Yt();
        Ha = (a) => {
          let r = 1;
          for (let s = 0; s < a.length; s++) {
            let f = a[s];
            if (typeof f != "number" || !Number.isSafeInteger(f)) throw new TypeError(`dims[${s}] must be an integer, got: ${f}`);
            if (f < 0) throw new RangeError(`dims[${s}] must be a non-negative integer, got: ${f}`);
            r *= f;
          }
          return r;
        }, ja = (a, r) => {
          switch (a.location) {
            case "cpu":
              return new ce(a.type, a.data, r);
            case "cpu-pinned":
              return new ce({ location: "cpu-pinned", data: a.data, type: a.type, dims: r });
            case "texture":
              return new ce({ location: "texture", texture: a.texture, type: a.type, dims: r });
            case "gpu-buffer":
              return new ce({ location: "gpu-buffer", gpuBuffer: a.gpuBuffer, type: a.type, dims: r });
            case "ml-tensor":
              return new ce({ location: "ml-tensor", mlTensor: a.mlTensor, type: a.type, dims: r });
            default:
              throw new Error(`tensorReshape: tensor location ${a.location} is not supported`);
          }
        };
      });
      Yt = F(() => {
        "use strict";
        _a();
        Ga();
        Va();
        Ya();
        ce = class {
          constructor(r, s, f) {
            za();
            let i, d;
            if (typeof r == "object" && "location" in r) switch (this.dataLocation = r.location, i = r.type, d = r.dims, r.location) {
              case "cpu-pinned": {
                let m = et.get(i);
                if (!m) throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);
                if (!(r.data instanceof m)) throw new TypeError(`buffer should be of type ${m.name}`);
                this.cpuData = r.data;
                break;
              }
              case "texture": {
                if (i !== "float32") throw new TypeError(`unsupported type "${i}" to create tensor from texture`);
                this.gpuTextureData = r.texture, this.downloader = r.download, this.disposer = r.dispose;
                break;
              }
              case "gpu-buffer": {
                if (i !== "float32" && i !== "float16" && i !== "int32" && i !== "int64" && i !== "uint32" && i !== "uint8" && i !== "bool" && i !== "uint4" && i !== "int4") throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);
                this.gpuBufferData = r.gpuBuffer, this.downloader = r.download, this.disposer = r.dispose;
                break;
              }
              case "ml-tensor": {
                if (i !== "float32" && i !== "float16" && i !== "int32" && i !== "int64" && i !== "uint32" && i !== "uint64" && i !== "int8" && i !== "uint8" && i !== "bool" && i !== "uint4" && i !== "int4") throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);
                this.mlTensorData = r.mlTensor, this.downloader = r.download, this.disposer = r.dispose;
                break;
              }
              default:
                throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
            }
            else {
              let m, y;
              if (typeof r == "string") if (i = r, y = f, r === "string") {
                if (!Array.isArray(s)) throw new TypeError("A string tensor's data must be a string array.");
                m = s;
              } else {
                let w = et.get(r);
                if (w === void 0) throw new TypeError(`Unsupported tensor type: ${r}.`);
                if (Array.isArray(s)) {
                  if (r === "float16" && w === Uint16Array || r === "uint4" || r === "int4") throw new TypeError(`Creating a ${r} tensor from number array is not supported. Please use ${w.name} as data.`);
                  r === "uint64" || r === "int64" ? m = w.from(s, BigInt) : m = w.from(s);
                } else if (s instanceof w) m = s;
                else if (s instanceof Uint8ClampedArray) if (r === "uint8") m = Uint8Array.from(s);
                else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
                else if (r === "float16" && s instanceof Uint16Array && w !== Uint16Array) m = new globalThis.Float16Array(s.buffer, s.byteOffset, s.length);
                else throw new TypeError(`A ${i} tensor's data must be type of ${w}`);
              }
              else if (y = s, Array.isArray(r)) {
                if (r.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
                let w = typeof r[0];
                if (w === "string") i = "string", m = r;
                else if (w === "boolean") i = "bool", m = Uint8Array.from(r);
                else throw new TypeError(`Invalid element type of data array: ${w}.`);
              } else if (r instanceof Uint8ClampedArray) i = "uint8", m = Uint8Array.from(r);
              else {
                let w = It.get(r.constructor);
                if (w === void 0) throw new TypeError(`Unsupported type for tensor data: ${r.constructor}.`);
                i = w, m = r;
              }
              if (y === void 0) y = [m.length];
              else if (!Array.isArray(y)) throw new TypeError("A tensor's dims must be a number array");
              d = y, this.cpuData = m, this.dataLocation = "cpu";
            }
            let p = Ha(d);
            if (this.cpuData && p !== this.cpuData.length && !((i === "uint4" || i === "int4") && Math.ceil(p / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${p}) does not match data length(${this.cpuData.length}).`);
            this.type = i, this.dims = d, this.size = p;
          }
          static async fromImage(r, s) {
            return Ra(r, s);
          }
          static fromTexture(r, s) {
            return Na(r, s);
          }
          static fromGpuBuffer(r, s) {
            return Wa(r, s);
          }
          static fromMLTensor(r, s) {
            return ka(r, s);
          }
          static fromPinnedBuffer(r, s, f) {
            return Fa(r, s, f);
          }
          toDataURL(r) {
            return Da(this, r);
          }
          toImageData(r) {
            return Pa(this, r);
          }
          get data() {
            if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
            return this.cpuData;
          }
          get location() {
            return this.dataLocation;
          }
          get texture() {
            if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
            return this.gpuTextureData;
          }
          get gpuBuffer() {
            if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
            return this.gpuBufferData;
          }
          get mlTensor() {
            if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
            return this.mlTensorData;
          }
          async getData(r) {
            switch (this.ensureValid(), this.dataLocation) {
              case "cpu":
              case "cpu-pinned":
                return this.data;
              case "texture":
              case "gpu-buffer":
              case "ml-tensor": {
                if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
                if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
                try {
                  this.isDownloading = true;
                  let s = await this.downloader();
                  return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = s, r && this.disposer && (this.disposer(), this.disposer = void 0), s;
                } finally {
                  this.isDownloading = false;
                }
              }
              default:
                throw new Error(`cannot get data from location: ${this.dataLocation}`);
            }
          }
          dispose() {
            if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
            this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
          }
          ensureValid() {
            if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
          }
          reshape(r) {
            if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
            return ja(this, r);
          }
        };
      });
      Qr = F(() => {
        "use strict";
        Yt();
        xe = ce;
      });
      en = F(() => {
        "use strict";
        Zr();
        qa = (a, r) => {
          (typeof ue.trace > "u" ? !ue.wasm.trace : !ue.trace) || console.timeStamp(`${a}::ORT::${r}`);
        }, Ja = (a, r) => {
          let s = new Error().stack?.split(/\r\n|\r|\n/g) || [], f = false;
          for (let i = 0; i < s.length; i++) {
            if (f && !s[i].includes("TRACE_FUNC")) {
              let d = `FUNC_${a}::${s[i].trim().split(" ")[1]}`;
              r && (d += `::${r}`), qa("CPU", d);
              return;
            }
            s[i].includes("TRACE_FUNC") && (f = true);
          }
        }, tt = (a) => {
          (typeof ue.trace > "u" ? !ue.wasm.trace : !ue.trace) || Ja("BEGIN", a);
        }, rt = (a) => {
          (typeof ue.trace > "u" ? !ue.wasm.trace : !ue.trace) || Ja("END", a);
        }, Ge = (a) => {
          (typeof ue.trace > "u" ? !ue.wasm.trace : !ue.trace) || console.time(`ORT::${a}`);
        }, $e = (a) => {
          (typeof ue.trace > "u" ? !ue.wasm.trace : !ue.trace) || console.timeEnd(`ORT::${a}`);
        };
      });
      Xa = F(() => {
        "use strict";
        Xr();
        Qr();
        en();
        qt = class a {
          constructor(r) {
            this.handler = r;
          }
          async run(r, s, f) {
            tt(), Ge("InferenceSession.run");
            let i = {}, d = {};
            if (typeof r != "object" || r === null || r instanceof xe || Array.isArray(r)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
            let p = true;
            if (typeof s == "object") {
              if (s === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
              if (s instanceof xe) throw new TypeError("'fetches' cannot be a Tensor");
              if (Array.isArray(s)) {
                if (s.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
                p = false;
                for (let w of s) {
                  if (typeof w != "string") throw new TypeError("'fetches' must be a string array or an object.");
                  if (this.outputNames.indexOf(w) === -1) throw new RangeError(`'fetches' contains invalid output name: ${w}.`);
                  i[w] = null;
                }
                if (typeof f == "object" && f !== null) d = f;
                else if (typeof f < "u") throw new TypeError("'options' must be an object.");
              } else {
                let w = false, T = Object.getOwnPropertyNames(s);
                for (let g of this.outputNames) if (T.indexOf(g) !== -1) {
                  let v = s[g];
                  (v === null || v instanceof xe) && (w = true, p = false, i[g] = v);
                }
                if (w) {
                  if (typeof f == "object" && f !== null) d = f;
                  else if (typeof f < "u") throw new TypeError("'options' must be an object.");
                } else d = s;
              }
            } else if (typeof s < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
            for (let w of this.inputNames) if (typeof r[w] > "u") throw new Error(`input '${w}' is missing in 'feeds'.`);
            if (p) for (let w of this.outputNames) i[w] = null;
            let m = await this.handler.run(r, i, d), y = {};
            for (let w in m) if (Object.hasOwnProperty.call(m, w)) {
              let T = m[w];
              T instanceof xe ? y[w] = T : y[w] = new xe(T.type, T.data, T.dims);
            }
            return $e("InferenceSession.run"), rt(), y;
          }
          async release() {
            return this.handler.dispose();
          }
          static async create(r, s, f, i) {
            tt(), Ge("InferenceSession.create");
            let d, p = {};
            if (typeof r == "string") {
              if (d = r, typeof s == "object" && s !== null) p = s;
              else if (typeof s < "u") throw new TypeError("'options' must be an object.");
            } else if (r instanceof Uint8Array) {
              if (d = r, typeof s == "object" && s !== null) p = s;
              else if (typeof s < "u") throw new TypeError("'options' must be an object.");
            } else if (r instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && r instanceof SharedArrayBuffer) {
              let T = r, g = 0, v = r.byteLength;
              if (typeof s == "object" && s !== null) p = s;
              else if (typeof s == "number") {
                if (g = s, !Number.isSafeInteger(g)) throw new RangeError("'byteOffset' must be an integer.");
                if (g < 0 || g >= T.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${T.byteLength}).`);
                if (v = r.byteLength - g, typeof f == "number") {
                  if (v = f, !Number.isSafeInteger(v)) throw new RangeError("'byteLength' must be an integer.");
                  if (v <= 0 || g + v > T.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${T.byteLength - g}].`);
                  if (typeof i == "object" && i !== null) p = i;
                  else if (typeof i < "u") throw new TypeError("'options' must be an object.");
                } else if (typeof f < "u") throw new TypeError("'byteLength' must be a number.");
              } else if (typeof s < "u") throw new TypeError("'options' must be an object.");
              d = new Uint8Array(T, g, v);
            } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
            let [m, y] = await La(p), w = await m.createInferenceSessionHandler(d, y);
            return $e("InferenceSession.create"), rt(), new a(w);
          }
          startProfiling() {
            this.handler.startProfiling();
          }
          endProfiling() {
            this.handler.endProfiling();
          }
          get inputNames() {
            return this.handler.inputNames;
          }
          get outputNames() {
            return this.handler.outputNames;
          }
          get inputMetadata() {
            return this.handler.inputMetadata;
          }
          get outputMetadata() {
            return this.handler.outputMetadata;
          }
        };
      });
      Za = F(() => {
        "use strict";
        Xa();
        nc = qt;
      });
      Ka = F(() => {
        "use strict";
      });
      Qa = F(() => {
        "use strict";
      });
      es = F(() => {
        "use strict";
      });
      ts = F(() => {
        "use strict";
      });
      tn = {};
      At(tn, { InferenceSession: () => nc, TRACE: () => qa, TRACE_EVENT_BEGIN: () => Ge, TRACE_EVENT_END: () => $e, TRACE_FUNC_BEGIN: () => tt, TRACE_FUNC_END: () => rt, Tensor: () => xe, env: () => ee, registerBackend: () => Qe });
      ze = F(() => {
        "use strict";
        Ba();
        Ca();
        Za();
        Qr();
        Ka();
        Qa();
        en();
        es();
        ts();
      });
      Jt = F(() => {
        "use strict";
      });
      as = {};
      At(as, { default: () => oc });
      ss = F(() => {
        "use strict";
        rn();
        Ve();
        Xt();
        ns = "ort-wasm-proxy-worker", os = globalThis.self?.name === ns;
        os && (self.onmessage = (a) => {
          let { type: r, in: s } = a.data;
          try {
            switch (r) {
              case "init-wasm":
                Zt(s.wasm).then(() => {
                  Kt(s).then(() => {
                    postMessage({ type: r });
                  }, (f) => {
                    postMessage({ type: r, err: f });
                  });
                }, (f) => {
                  postMessage({ type: r, err: f });
                });
                break;
              case "init-ep": {
                let { epName: f, env: i } = s;
                Qt(i, f).then(() => {
                  postMessage({ type: r });
                }, (d) => {
                  postMessage({ type: r, err: d });
                });
                break;
              }
              case "copy-from": {
                let { buffer: f } = s, i = xt(f);
                postMessage({ type: r, out: i });
                break;
              }
              case "create": {
                let { model: f, options: i } = s;
                er(f, i).then((d) => {
                  postMessage({ type: r, out: d });
                }, (d) => {
                  postMessage({ type: r, err: d });
                });
                break;
              }
              case "release":
                tr(s), postMessage({ type: r });
                break;
              case "run": {
                let { sessionId: f, inputIndices: i, inputs: d, outputIndices: p, options: m } = s;
                rr(f, i, d, p, new Array(p.length).fill(null), m).then((y) => {
                  y.some((w) => w[3] !== "cpu") ? postMessage({ type: r, err: "Proxy does not support non-cpu tensor location." }) : postMessage({ type: r, out: y }, or([...d, ...y]));
                }, (y) => {
                  postMessage({ type: r, err: y });
                });
                break;
              }
              case "end-profiling":
                nr(s), postMessage({ type: r });
                break;
              default:
            }
          } catch (f) {
            postMessage({ type: r, err: f });
          }
        });
        oc = os ? null : (a) => new Worker(a ?? be, { type: "module", name: ns });
      });
      us = {};
      At(us, { default: () => ac });
      fs = F(() => {
        "use strict";
        ac = is, sc = globalThis.self?.name?.startsWith("em-pthread");
        sc && is();
      });
      Xt = F(() => {
        "use strict";
        Jt();
        ls = typeof location > "u" ? void 0 : location.origin, on = import_meta.url > "file:" && import_meta.url < "file;", ic = () => {
          if (true) {
            if (on) {
              let a = URL;
              return new URL(new a("ort.webgpu.bundle.min.mjs", import_meta.url).href, ls).href;
            }
            return import_meta.url;
          }
        }, be = ic(), ps = () => {
          if (be && !be.startsWith("blob:")) return be.substring(0, be.lastIndexOf("/") + 1);
        }, nn = (a, r) => {
          try {
            let s = r ?? be;
            return (s ? new URL(a, s) : new URL(a)).origin === ls;
          } catch {
            return false;
          }
        }, uc = (a, r) => {
          let s = r ?? be;
          try {
            return (s ? new URL(a, s) : new URL(a)).href;
          } catch {
            return;
          }
        }, fc = (a, r) => `${r ?? "./"}${a}`, ms = async (a) => {
          let s = await (await fetch(a, { credentials: "same-origin" })).blob();
          return URL.createObjectURL(s);
        }, cc = async (a) => (await import(
          /*webpackIgnore:true*/
          /*@vite-ignore*/
          a
        )).default, cs = (ss(), Ht(as)).default, hs = async () => {
          if (!be) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
          if (nn(be)) return [void 0, cs()];
          let a = await ms(be);
          return [a, cs(a)];
        }, ds = (fs(), Ht(us)).default, ys = async (a, r, s, f) => {
          let i = ds && !(a || r);
          if (i) if (be) i = nn(be) || f && !s;
          else if (f && !s) i = true;
          else throw new Error("cannot determine the script source URL.");
          if (i) return [void 0, ds];
          {
            let d = "ort-wasm-simd-threaded.asyncify.mjs", p = a ?? uc(d, r), m = s && p && !nn(p, r), y = m ? await ms(p) : p ?? fc(d, r);
            return [m ? y : void 0, await cc(y)];
          }
        };
      });
      Ve = F(() => {
        "use strict";
        Xt();
        sn = false, ar = false, bs = false, dc = () => {
          if (typeof SharedArrayBuffer > "u") return false;
          try {
            return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
          } catch {
            return false;
          }
        }, lc = () => {
          try {
            return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
          } catch {
            return false;
          }
        }, pc = () => {
          try {
            return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 19, 1, 17, 0, 65, 1, 253, 15, 65, 2, 253, 15, 65, 3, 253, 15, 253, 147, 2, 11]));
          } catch {
            return false;
          }
        }, Zt = async (a) => {
          if (sn) return Promise.resolve();
          if (ar) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
          if (bs) throw new Error("previous call to 'initializeWebAssembly()' failed.");
          ar = true;
          let r = a.initTimeout, s = a.numThreads;
          if (a.simd !== false) {
            if (a.simd === "relaxed") {
              if (!pc()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
            } else if (!lc()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
          }
          let f = dc();
          s > 1 && !f && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + s + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), a.numThreads = s = 1);
          let i = a.wasmPaths, d = typeof i == "string" ? i : void 0, p = i?.mjs, m = p?.href ?? p, y = i?.wasm, w = y?.href ?? y, T = a.wasmBinary, [g, v] = await ys(m, d, s > 1, !!T || !!w), S = false, U = [];
          if (r > 0 && U.push(new Promise((R) => {
            setTimeout(() => {
              S = true, R();
            }, r);
          })), U.push(new Promise((R, j) => {
            let P = { numThreads: s };
            if (T) P.wasmBinary = T, P.locateFile = (M) => M;
            else if (w || d) P.locateFile = (M) => w ?? d + M;
            else if (m && m.indexOf("blob:") !== 0) P.locateFile = (M) => new URL(M, m).href;
            else if (g) {
              let M = ps();
              M && (P.locateFile = (Y2) => M + Y2);
            }
            v(P).then((M) => {
              ar = false, sn = true, an = M, R(), g && URL.revokeObjectURL(g);
            }, (M) => {
              ar = false, bs = true, j(M);
            });
          })), await Promise.race(U), S) throw new Error(`WebAssembly backend initializing failed due to timeout: ${r}ms`);
        }, V = () => {
          if (sn && an) return an;
          throw new Error("WebAssembly is not initialized yet.");
        };
      });
      sr = F(() => {
        "use strict";
        Ve();
        he = (a, r) => {
          let s = V(), f = s.lengthBytesUTF8(a) + 1, i = s._malloc(f);
          return s.stringToUTF8(a, i, f), r.push(i), i;
        }, Lt = (a, r, s, f) => {
          if (typeof a == "object" && a !== null) {
            if (s.has(a)) throw new Error("Circular reference in options");
            s.add(a);
          }
          Object.entries(a).forEach(([i, d]) => {
            let p = r ? r + i : i;
            if (typeof d == "object") Lt(d, p + ".", s, f);
            else if (typeof d == "string" || typeof d == "number") f(p, d.toString());
            else if (typeof d == "boolean") f(p, d ? "1" : "0");
            else throw new Error(`Can't handle extra config type: ${typeof d}`);
          });
        }, z = (a) => {
          let r = V(), s = r.stackSave();
          try {
            let f = r.PTR_SIZE, i = r.stackAlloc(2 * f);
            r._OrtGetLastError(i, i + f);
            let d = Number(r.getValue(i, f === 4 ? "i32" : "i64")), p = r.getValue(i + f, "*"), m = p ? r.UTF8ToString(p) : "";
            throw new Error(`${a} ERROR_CODE: ${d}, ERROR_MESSAGE: ${m}`);
          } finally {
            r.stackRestore(s);
          }
        };
      });
      gs = F(() => {
        "use strict";
        Ve();
        sr();
        ws = (a) => {
          let r = V(), s = 0, f = [], i = a || {};
          try {
            if (a?.logSeverityLevel === void 0) i.logSeverityLevel = 2;
            else if (typeof a.logSeverityLevel != "number" || !Number.isInteger(a.logSeverityLevel) || a.logSeverityLevel < 0 || a.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${a.logSeverityLevel}`);
            if (a?.logVerbosityLevel === void 0) i.logVerbosityLevel = 0;
            else if (typeof a.logVerbosityLevel != "number" || !Number.isInteger(a.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${a.logVerbosityLevel}`);
            a?.terminate === void 0 && (i.terminate = false);
            let d = 0;
            return a?.tag !== void 0 && (d = he(a.tag, f)), s = r._OrtCreateRunOptions(i.logSeverityLevel, i.logVerbosityLevel, !!i.terminate, d), s === 0 && z("Can't create run options."), a?.extra !== void 0 && Lt(a.extra, "", /* @__PURE__ */ new WeakSet(), (p, m) => {
              let y = he(p, f), w = he(m, f);
              r._OrtAddRunConfigEntry(s, y, w) !== 0 && z(`Can't set a run config entry: ${p} - ${m}.`);
            }), [s, f];
          } catch (d) {
            throw s !== 0 && r._OrtReleaseRunOptions(s), f.forEach((p) => r._free(p)), d;
          }
        };
      });
      vs = F(() => {
        "use strict";
        Ve();
        sr();
        mc = (a) => {
          switch (a) {
            case "disabled":
              return 0;
            case "basic":
              return 1;
            case "extended":
              return 2;
            case "layout":
              return 3;
            case "all":
              return 99;
            default:
              throw new Error(`unsupported graph optimization level: ${a}`);
          }
        }, hc = (a) => {
          switch (a) {
            case "sequential":
              return 0;
            case "parallel":
              return 1;
            default:
              throw new Error(`unsupported execution mode: ${a}`);
          }
        }, yc = (a) => {
          a.extra || (a.extra = {}), a.extra.session || (a.extra.session = {});
          let r = a.extra.session;
          r.use_ort_model_bytes_directly || (r.use_ort_model_bytes_directly = "1"), a.executionProviders && a.executionProviders.some((s) => (typeof s == "string" ? s : s.name) === "webgpu") && (a.enableMemPattern = false);
        }, un = (a, r, s, f) => {
          let i = he(r, f), d = he(s, f);
          V()._OrtAddSessionConfigEntry(a, i, d) !== 0 && z(`Can't set a session config entry: ${r} - ${s}.`);
        }, ot = (a, r, s, f) => {
          let i = he(r, f), d = he(s, f);
          a.push([i, d]);
        }, bc = async (a, r, s) => {
          let f = r.executionProviders;
          for (let i of f) {
            let d = typeof i == "string" ? i : i.name, p = [];
            switch (d) {
              case "webnn":
                if (d = "WEBNN", typeof i != "string") {
                  let v = i?.deviceType;
                  v && un(a, "deviceType", v, s);
                }
                break;
              case "webgpu":
                {
                  d = "WebGPU";
                  let g;
                  if (typeof i != "string") {
                    let S = i;
                    if (S.device) if (typeof GPUDevice < "u" && S.device instanceof GPUDevice) g = S.device;
                    else throw new Error("Invalid GPU device set in WebGPU EP options.");
                    let { enableGraphCapture: U } = r;
                    if (typeof U == "boolean" && U && ot(p, "enableGraphCapture", "1", s), typeof S.preferredLayout == "string" && ot(p, "preferredLayout", S.preferredLayout, s), S.forceCpuNodeNames) {
                      let R = Array.isArray(S.forceCpuNodeNames) ? S.forceCpuNodeNames : [S.forceCpuNodeNames];
                      ot(p, "forceCpuNodeNames", R.join(`
`), s);
                    }
                    S.validationMode && ot(p, "validationMode", S.validationMode, s);
                  }
                  let v = V().webgpuRegisterDevice(g);
                  if (v) {
                    let [S, U, R] = v;
                    ot(p, "deviceId", S.toString(), s), ot(p, "webgpuInstance", U.toString(), s), ot(p, "webgpuDevice", R.toString(), s);
                  }
                }
                break;
              case "wasm":
              case "cpu":
                continue;
              default:
                throw new Error(`not supported execution provider: ${d}`);
            }
            let m = he(d, s), y = p.length, w = 0, T = 0;
            if (y > 0) {
              w = V()._malloc(y * V().PTR_SIZE), s.push(w), T = V()._malloc(y * V().PTR_SIZE), s.push(T);
              for (let g = 0; g < y; g++) V().setValue(w + g * V().PTR_SIZE, p[g][0], "*"), V().setValue(T + g * V().PTR_SIZE, p[g][1], "*");
            }
            await V()._OrtAppendExecutionProvider(a, m, w, T, y) !== 0 && z(`Can't append execution provider: ${d}.`);
          }
        }, Ts = async (a) => {
          let r = V(), s = 0, f = [], i = a || {};
          yc(i);
          try {
            let d = mc(i.graphOptimizationLevel ?? "all"), p = hc(i.executionMode ?? "sequential"), m = typeof i.logId == "string" ? he(i.logId, f) : 0, y = i.logSeverityLevel ?? 2;
            if (!Number.isInteger(y) || y < 0 || y > 4) throw new Error(`log severity level is not valid: ${y}`);
            let w = i.logVerbosityLevel ?? 0;
            if (!Number.isInteger(w) || w < 0 || w > 4) throw new Error(`log verbosity level is not valid: ${w}`);
            let T = typeof i.optimizedModelFilePath == "string" ? he(i.optimizedModelFilePath, f) : 0;
            if (s = r._OrtCreateSessionOptions(d, !!i.enableCpuMemArena, !!i.enableMemPattern, p, !!i.enableProfiling, 0, m, y, w, T), s === 0 && z("Can't create session options."), i.executionProviders && await bc(s, i, f), i.enableGraphCapture !== void 0) {
              if (typeof i.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);
              un(s, "enableGraphCapture", i.enableGraphCapture.toString(), f);
            }
            if (i.freeDimensionOverrides) for (let [g, v] of Object.entries(i.freeDimensionOverrides)) {
              if (typeof g != "string") throw new Error(`free dimension override name must be a string: ${g}`);
              if (typeof v != "number" || !Number.isInteger(v) || v < 0) throw new Error(`free dimension override value must be a non-negative integer: ${v}`);
              let S = he(g, f);
              r._OrtAddFreeDimensionOverride(s, S, v) !== 0 && z(`Can't set a free dimension override: ${g} - ${v}.`);
            }
            return i.extra !== void 0 && Lt(i.extra, "", /* @__PURE__ */ new WeakSet(), (g, v) => {
              un(s, g, v, f);
            }), [s, f];
          } catch (d) {
            throw s !== 0 && r._OrtReleaseSessionOptions(s) !== 0 && z("Can't release session options."), f.forEach((p) => r._free(p)), d;
          }
        };
      });
      st = F(() => {
        "use strict";
        He = (a) => {
          switch (a) {
            case "int8":
              return 3;
            case "uint8":
              return 2;
            case "bool":
              return 9;
            case "int16":
              return 5;
            case "uint16":
              return 4;
            case "int32":
              return 6;
            case "uint32":
              return 12;
            case "float16":
              return 10;
            case "float32":
              return 1;
            case "float64":
              return 11;
            case "string":
              return 8;
            case "int64":
              return 7;
            case "uint64":
              return 13;
            case "int4":
              return 22;
            case "uint4":
              return 21;
            default:
              throw new Error(`unsupported data type: ${a}`);
          }
        }, ir = (a) => {
          switch (a) {
            case 3:
              return "int8";
            case 2:
              return "uint8";
            case 9:
              return "bool";
            case 5:
              return "int16";
            case 4:
              return "uint16";
            case 6:
              return "int32";
            case 12:
              return "uint32";
            case 10:
              return "float16";
            case 1:
              return "float32";
            case 11:
              return "float64";
            case 8:
              return "string";
            case 7:
              return "int64";
            case 13:
              return "uint64";
            case 22:
              return "int4";
            case 21:
              return "uint4";
            default:
              throw new Error(`unsupported data type: ${a}`);
          }
        }, ht = (a, r) => {
          let s = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, 0.5, 0.5][a], f = typeof r == "number" ? r : r.reduce((i, d) => i * d, 1);
          return s > 0 ? Math.ceil(f * s) : void 0;
        }, at = (a) => {
          switch (a) {
            case "float16":
              return typeof Float16Array < "u" && Float16Array.from ? Float16Array : Uint16Array;
            case "float32":
              return Float32Array;
            case "uint8":
              return Uint8Array;
            case "int8":
              return Int8Array;
            case "uint16":
              return Uint16Array;
            case "int16":
              return Int16Array;
            case "int32":
              return Int32Array;
            case "bool":
              return Uint8Array;
            case "float64":
              return Float64Array;
            case "uint32":
              return Uint32Array;
            case "int64":
              return BigInt64Array;
            case "uint64":
              return BigUint64Array;
            default:
              throw new Error(`unsupported type: ${a}`);
          }
        }, Bt = (a) => {
          switch (a) {
            case "verbose":
              return 0;
            case "info":
              return 1;
            case "warning":
              return 2;
            case "error":
              return 3;
            case "fatal":
              return 4;
            default:
              throw new Error(`unsupported logging level: ${a}`);
          }
        }, ur = (a) => a === "float32" || a === "float16" || a === "int32" || a === "int64" || a === "uint32" || a === "uint8" || a === "bool" || a === "uint4" || a === "int4", fr = (a) => a === "float32" || a === "float16" || a === "int32" || a === "int64" || a === "uint32" || a === "uint64" || a === "int8" || a === "uint8" || a === "bool" || a === "uint4" || a === "int4", fn = (a) => {
          switch (a) {
            case "none":
              return 0;
            case "cpu":
              return 1;
            case "cpu-pinned":
              return 2;
            case "texture":
              return 3;
            case "gpu-buffer":
              return 4;
            case "ml-tensor":
              return 5;
            default:
              throw new Error(`unsupported data location: ${a}`);
          }
        };
      });
      cn = F(() => {
        "use strict";
        Jt();
        Ot = async (a) => {
          if (typeof a == "string") if (false) try {
            let { readFile: r } = Jr("node:fs/promises");
            return new Uint8Array(await r(a));
          } catch (r) {
            if (r.code === "ERR_FS_FILE_TOO_LARGE") {
              let { createReadStream: s } = Jr("node:fs"), f = s(a), i = [];
              for await (let d of f) i.push(d);
              return new Uint8Array(Buffer.concat(i));
            }
            throw r;
          }
          else {
            let r = await fetch(a);
            if (!r.ok) throw new Error(`failed to load external data file: ${a}`);
            let s = r.headers.get("Content-Length"), f = s ? parseInt(s, 10) : 0;
            if (f < 1073741824) return new Uint8Array(await r.arrayBuffer());
            {
              if (!r.body) throw new Error(`failed to load external data file: ${a}, no response body.`);
              let i = r.body.getReader(), d;
              try {
                d = new ArrayBuffer(f);
              } catch (m) {
                if (m instanceof RangeError) {
                  let y = Math.ceil(f / 65536);
                  d = new WebAssembly.Memory({ initial: y, maximum: y }).buffer;
                } else throw m;
              }
              let p = 0;
              for (; ; ) {
                let { done: m, value: y } = await i.read();
                if (m) break;
                let w = y.byteLength;
                new Uint8Array(d, p, w).set(y), p += w;
              }
              return new Uint8Array(d, 0, f);
            }
          }
          else return a instanceof Blob ? new Uint8Array(await a.arrayBuffer()) : a instanceof Uint8Array ? a : new Uint8Array(a);
        };
      });
      Ss = F(() => {
        "use strict";
        st();
        Es = (a, r) => new (at(r))(a);
      });
      dn = F(() => {
        "use strict";
        st();
        wc = ["V", "I", "W", "E", "F"], gc = (a, r) => {
          console.log(`[${wc[a]},${(/* @__PURE__ */ new Date()).toISOString()}]${r}`);
        }, xs = (a, r) => {
          As = a, Is = r;
        }, Tc = (a, r) => {
          let s = Bt(a), f = Bt(As);
          s >= f && gc(s, typeof r == "function" ? r() : r);
        }, de = (...a) => {
          Is && Tc(...a);
        };
      });
      Cs = F(() => {
        "use strict";
        st();
        dn();
        Bs = /* @__PURE__ */ new Map([["float32", 32], ["float16", 16], ["int32", 32], ["uint32", 32], ["int64", 64], ["uint64", 64], ["int8", 8], ["uint8", 8], ["int4", 4], ["uint4", 4]]), pn = (a, r) => {
          if (r === "int32") return a;
          let s = Bs.get(r);
          if (!s) throw new Error(`WebNN backend does not support data type: ${r}`);
          let f = s / 8;
          if (a.byteLength % f !== 0) throw new Error(`Invalid Uint8Array length - must be a multiple of ${f}.`);
          let i = a.byteLength / f, d = new (at(r))(a.buffer, a.byteOffset, i);
          switch (r) {
            case "int64":
            case "uint64": {
              let p = new Int32Array(i);
              for (let m = 0; m < i; m++) {
                let y = d[m];
                if (y > 2147483647n || y < -2147483648n) throw new Error("Can not convert int64 data to int32 - value out of range.");
                p[m] = Number(y);
              }
              return new Uint8Array(p.buffer);
            }
            case "int8":
            case "uint8":
            case "uint32": {
              if (r === "uint32" && d.some((m) => m > 2147483647)) throw new Error("Can not convert uint32 data to int32 - value out of range.");
              let p = Int32Array.from(d, Number);
              return new Uint8Array(p.buffer);
            }
            default:
              throw new Error(`Unsupported data conversion from ${r} to 'int32'`);
          }
        }, Os = (a, r) => {
          if (r === "int32") return a;
          if (a.byteLength % 4 !== 0) throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");
          let s = a.byteLength / 4, f = new Int32Array(a.buffer, a.byteOffset, s);
          switch (r) {
            case "int64": {
              let i = BigInt64Array.from(f, BigInt);
              return new Uint8Array(i.buffer);
            }
            case "uint64": {
              if (f.some((d) => d < 0)) throw new Error("Can not convert int32 data to uin64 - negative value found.");
              let i = BigUint64Array.from(f, BigInt);
              return new Uint8Array(i.buffer);
            }
            case "int8": {
              if (f.some((d) => d < -128 || d > 127)) throw new Error("Can not convert int32 data to int8 - value out of range.");
              let i = Int8Array.from(f, Number);
              return new Uint8Array(i.buffer);
            }
            case "uint8": {
              if (f.some((i) => i < 0 || i > 255)) throw new Error("Can not convert int32 data to uint8 - value out of range.");
              return Uint8Array.from(f, Number);
            }
            case "uint32": {
              if (f.some((d) => d < 0)) throw new Error("Can not convert int32 data to uint32 - negative value found.");
              let i = Uint32Array.from(f, Number);
              return new Uint8Array(i.buffer);
            }
            default:
              throw new Error(`Unsupported data conversion from 'int32' to ${r}`);
          }
        }, vc = 1, Ls = () => vc++, Ec = /* @__PURE__ */ new Map([["int8", "int32"], ["uint8", "int32"], ["uint32", "int32"], ["int64", "int32"]]), Ms = (a, r) => {
          let s = Bs.get(a);
          if (!s) throw new Error(`WebNN backend does not support data type: ${a}`);
          return r.length > 0 ? Math.ceil(r.reduce((f, i) => f * i) * s / 8) : 0;
        }, cr = class {
          constructor(r) {
            this.isDataConverted = false;
            let { sessionId: s, context: f, tensor: i, dataType: d, shape: p, fallbackDataType: m } = r;
            this.sessionId = s, this.mlContext = f, this.mlTensor = i, this.dataType = d, this.tensorShape = p, this.fallbackDataType = m;
          }
          get tensor() {
            return this.mlTensor;
          }
          get type() {
            return this.dataType;
          }
          get fallbackType() {
            return this.fallbackDataType;
          }
          get shape() {
            return this.tensorShape;
          }
          get byteLength() {
            return Ms(this.dataType, this.tensorShape);
          }
          destroy() {
            de("verbose", () => "[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy();
          }
          write(r) {
            this.mlContext.writeTensor(this.mlTensor, r);
          }
          async read(r) {
            if (this.fallbackDataType) {
              let s = await this.mlContext.readTensor(this.mlTensor), f = Os(new Uint8Array(s), this.dataType);
              if (r) {
                (r instanceof ArrayBuffer ? new Uint8Array(r) : new Uint8Array(r.buffer, r.byteOffset, r.byteLength)).set(f);
                return;
              } else return f.buffer;
            } else return r ? this.mlContext.readTensor(this.mlTensor, r) : this.mlContext.readTensor(this.mlTensor);
          }
          canReuseTensor(r, s, f) {
            return this.mlContext === r && this.dataType === s && this.tensorShape.length === f.length && this.tensorShape.every((i, d) => i === f[d]);
          }
          setIsDataConverted(r) {
            this.isDataConverted = r;
          }
        }, dr = class {
          constructor(r, s) {
            this.tensorManager = r;
            this.wrapper = s;
          }
          get tensorWrapper() {
            return this.wrapper;
          }
          releaseTensor() {
            this.tensorWrapper && (this.tensorManager.releaseTensor(this.tensorWrapper), this.wrapper = void 0);
          }
          async ensureTensor(r, s, f, i) {
            let d = this.tensorManager.getMLContext(r), p = this.tensorManager.getMLOpSupportLimits(r), m;
            if (!p?.input.dataTypes.includes(s)) {
              if (m = Ec.get(s), !m || p?.input.dataTypes.includes(m)) throw new Error(`WebNN backend does not support data type: ${s}`);
              de("verbose", () => `[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${s} to ${m}`);
            }
            if (this.wrapper) {
              if (this.wrapper.canReuseTensor(d, s, f)) return this.wrapper.tensor;
              if (i) {
                if (this.wrapper.byteLength !== Ms(s, f)) throw new Error("Unable to copy data to tensor with different size.");
                this.activeUpload = new Uint8Array(await this.wrapper.read());
              }
              this.tensorManager.releaseTensor(this.wrapper);
            }
            let y = typeof MLTensorUsage > "u" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
            return this.wrapper = await this.tensorManager.getCachedTensor(r, s, f, y, true, true, m), i && this.activeUpload && (this.wrapper.write(this.activeUpload), this.activeUpload = void 0), this.wrapper.tensor;
          }
          upload(r) {
            let s = r;
            if (this.wrapper) {
              if (this.wrapper.fallbackType) if (this.wrapper.fallbackType === "int32") s = pn(r, this.wrapper.type), this.wrapper.setIsDataConverted(true);
              else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);
              if (r.byteLength === this.wrapper.byteLength) {
                this.wrapper.write(s);
                return;
              } else de("verbose", () => "Data size does not match tensor size. Releasing tensor."), this.releaseTensor();
            }
            this.activeUpload ? this.activeUpload.set(s) : this.activeUpload = new Uint8Array(s);
          }
          async download(r) {
            if (this.activeUpload) {
              let s = this.wrapper?.isDataConverted ? Os(this.activeUpload, this.wrapper?.type) : this.activeUpload;
              if (r) {
                r instanceof ArrayBuffer ? new Uint8Array(r).set(s) : new Uint8Array(r.buffer, r.byteOffset, r.byteLength).set(s);
                return;
              } else return s.buffer;
            }
            if (!this.wrapper) throw new Error("Tensor has not been created.");
            return r ? this.wrapper.read(r) : this.wrapper.read();
          }
        }, ln = class {
          constructor(r) {
            this.backend = r;
            this.tensorTrackersById = /* @__PURE__ */ new Map();
            this.freeTensors = [];
            this.externalTensors = /* @__PURE__ */ new Set();
          }
          getMLContext(r) {
            let s = this.backend.getMLContext(r);
            if (!s) throw new Error("MLContext not found for session.");
            return s;
          }
          getMLOpSupportLimits(r) {
            return this.backend.getMLOpSupportLimits(r);
          }
          reserveTensorId() {
            let r = Ls();
            return this.tensorTrackersById.set(r, new dr(this)), r;
          }
          releaseTensorId(r) {
            let s = this.tensorTrackersById.get(r);
            s && (this.tensorTrackersById.delete(r), s.tensorWrapper && this.releaseTensor(s.tensorWrapper));
          }
          async ensureTensor(r, s, f, i, d) {
            de("verbose", () => `[WebNN] TensorManager.ensureTensor {tensorId: ${s}, dataType: ${f}, shape: ${i}, copyOld: ${d}}`);
            let p = this.tensorTrackersById.get(s);
            if (!p) throw new Error("Tensor not found.");
            return p.ensureTensor(r, f, i, d);
          }
          upload(r, s) {
            let f = this.tensorTrackersById.get(r);
            if (!f) throw new Error("Tensor not found.");
            f.upload(s);
          }
          async download(r, s) {
            de("verbose", () => `[WebNN] TensorManager.download {tensorId: ${r}, dstBuffer: ${s?.byteLength}}`);
            let f = this.tensorTrackersById.get(r);
            if (!f) throw new Error("Tensor not found.");
            return f.download(s);
          }
          releaseTensorsForSession(r) {
            for (let s of this.freeTensors) s.sessionId === r && s.destroy();
            this.freeTensors = this.freeTensors.filter((s) => s.sessionId !== r);
          }
          registerTensor(r, s, f, i) {
            let d = this.getMLContext(r), p = Ls(), m = new cr({ sessionId: r, context: d, tensor: s, dataType: f, shape: i });
            return this.tensorTrackersById.set(p, new dr(this, m)), this.externalTensors.add(m), p;
          }
          async getCachedTensor(r, s, f, i, d, p, m) {
            let y = this.getMLContext(r);
            for (let [T, g] of this.freeTensors.entries()) if (g.canReuseTensor(y, s, f)) {
              de("verbose", () => `[WebNN] Reusing tensor {dataType: ${s}, ${m ? `fallbackDataType: ${m},` : ""} shape: ${f}`);
              let v = this.freeTensors.splice(T, 1)[0];
              return v.sessionId = r, v;
            }
            de("verbose", () => `[WebNN] MLContext.createTensor {dataType: ${s}, ${m ? `fallbackDataType: ${m},` : ""} shape: ${f}}`);
            let w = await y.createTensor({ dataType: m ?? s, shape: f, dimensions: f, usage: i, writable: d, readable: p });
            return new cr({ sessionId: r, context: y, tensor: w, dataType: s, shape: f, fallbackDataType: m });
          }
          releaseTensor(r) {
            this.externalTensors.has(r) && this.externalTensors.delete(r), this.freeTensors.push(r);
          }
        }, Us = (...a) => new ln(...a);
      });
      Ds = {};
      At(Ds, { WebNNBackend: () => mn });
      Ps = F(() => {
        "use strict";
        st();
        Ve();
        Ss();
        Cs();
        dn();
        lr = /* @__PURE__ */ new Map([[1, "float32"], [10, "float16"], [6, "int32"], [12, "uint32"], [7, "int64"], [13, "uint64"], [22, "int4"], [21, "uint4"], [3, "int8"], [2, "uint8"], [9, "uint8"]]), Sc = (a, r) => {
          if (a === r) return true;
          if (a === void 0 || r === void 0) return false;
          let s = Object.keys(a).sort(), f = Object.keys(r).sort();
          return s.length === f.length && s.every((i, d) => i === f[d] && a[i] === r[i]);
        }, mn = class {
          constructor(r) {
            this.tensorManager = Us(this);
            this.mlContextBySessionId = /* @__PURE__ */ new Map();
            this.sessionIdsByMLContext = /* @__PURE__ */ new Map();
            this.mlContextCache = [];
            this.sessionGraphInputs = /* @__PURE__ */ new Map();
            this.sessionGraphOutputs = /* @__PURE__ */ new Map();
            this.temporaryGraphInputs = [];
            this.temporaryGraphOutputs = [];
            this.temporarySessionTensorIds = /* @__PURE__ */ new Map();
            this.mlOpSupportLimitsBySessionId = /* @__PURE__ */ new Map();
            xs(r.logLevel, !!r.debug);
          }
          get currentSessionId() {
            if (this.activeSessionId === void 0) throw new Error("No active session");
            return this.activeSessionId;
          }
          onRunStart(r) {
            de("verbose", () => `[WebNN] onRunStart {sessionId: ${r}}`), this.activeSessionId = r;
          }
          onRunEnd(r) {
            de("verbose", () => `[WebNN] onRunEnd {sessionId: ${r}}`);
            let s = this.temporarySessionTensorIds.get(r);
            if (s) {
              for (let f of s) de("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${f}}`), this.tensorManager.releaseTensorId(f);
              this.temporarySessionTensorIds.delete(r), this.activeSessionId = void 0;
            }
          }
          async createMLContext(r) {
            if (r instanceof GPUDevice) {
              let f = this.mlContextCache.findIndex((i) => i.gpuDevice === r);
              if (f !== -1) return this.mlContextCache[f].mlContext;
              {
                let i = await navigator.ml.createContext(r);
                return this.mlContextCache.push({ gpuDevice: r, mlContext: i }), i;
              }
            } else if (r === void 0) {
              let f = this.mlContextCache.findIndex((i) => i.options === void 0 && i.gpuDevice === void 0);
              if (f !== -1) return this.mlContextCache[f].mlContext;
              {
                let i = await navigator.ml.createContext();
                return this.mlContextCache.push({ mlContext: i }), i;
              }
            }
            let s = this.mlContextCache.findIndex((f) => Sc(f.options, r));
            if (s !== -1) return this.mlContextCache[s].mlContext;
            {
              let f = await navigator.ml.createContext(r);
              return this.mlContextCache.push({ options: r, mlContext: f }), f;
            }
          }
          registerMLContext(r, s) {
            this.mlContextBySessionId.set(r, s);
            let f = this.sessionIdsByMLContext.get(s);
            f || (f = /* @__PURE__ */ new Set(), this.sessionIdsByMLContext.set(s, f)), f.add(r), this.mlOpSupportLimitsBySessionId.has(r) || this.mlOpSupportLimitsBySessionId.set(r, s.opSupportLimits()), this.temporaryGraphInputs.length > 0 && (this.sessionGraphInputs.set(r, this.temporaryGraphInputs), this.temporaryGraphInputs = []), this.temporaryGraphOutputs.length > 0 && (this.sessionGraphOutputs.set(r, this.temporaryGraphOutputs), this.temporaryGraphOutputs = []);
          }
          onReleaseSession(r) {
            this.sessionGraphInputs.delete(r), this.sessionGraphOutputs.delete(r);
            let s = this.mlContextBySessionId.get(r);
            if (!s) return;
            this.tensorManager.releaseTensorsForSession(r), this.mlContextBySessionId.delete(r), this.mlOpSupportLimitsBySessionId.delete(r);
            let f = this.sessionIdsByMLContext.get(s);
            if (f.delete(r), f.size === 0) {
              this.sessionIdsByMLContext.delete(s);
              let i = this.mlContextCache.findIndex((d) => d.mlContext === s);
              i !== -1 && this.mlContextCache.splice(i, 1);
            }
          }
          getMLContext(r) {
            return this.mlContextBySessionId.get(r);
          }
          getMLOpSupportLimits(r) {
            return this.mlOpSupportLimitsBySessionId.get(r);
          }
          reserveTensorId() {
            return this.tensorManager.reserveTensorId();
          }
          releaseTensorId(r) {
            de("verbose", () => `[WebNN] releaseTensorId {tensorId: ${r}}`), this.tensorManager.releaseTensorId(r);
          }
          async ensureTensor(r, s, f, i, d) {
            let p = lr.get(f);
            if (!p) throw new Error(`Unsupported ONNX data type: ${f}`);
            return this.tensorManager.ensureTensor(r ?? this.currentSessionId, s, p, i, d);
          }
          async createTemporaryTensor(r, s, f) {
            de("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${s}, shape: ${f}}`);
            let i = lr.get(s);
            if (!i) throw new Error(`Unsupported ONNX data type: ${s}`);
            let d = this.tensorManager.reserveTensorId();
            await this.tensorManager.ensureTensor(r, d, i, f, false);
            let p = this.temporarySessionTensorIds.get(r);
            return p ? p.push(d) : this.temporarySessionTensorIds.set(r, [d]), d;
          }
          uploadTensor(r, s) {
            if (!V().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
            de("verbose", () => `[WebNN] uploadTensor {tensorId: ${r}, data: ${s.byteLength}}`), this.tensorManager.upload(r, s);
          }
          async downloadTensor(r, s) {
            return this.tensorManager.download(r, s);
          }
          createMLTensorDownloader(r, s) {
            return async () => {
              let f = await this.tensorManager.download(r);
              return Es(f, s);
            };
          }
          registerMLTensor(r, s, f, i) {
            let d = lr.get(f);
            if (!d) throw new Error(`Unsupported ONNX data type: ${f}`);
            let p = this.tensorManager.registerTensor(r, s, d, i);
            return de("verbose", () => `[WebNN] registerMLTensor {tensor: ${s}, dataType: ${d}, dimensions: ${i}} -> {tensorId: ${p}}`), p;
          }
          registerMLConstant(r, s, f, i, d, p, m = false) {
            if (!p) throw new Error("External mounted files are not available.");
            let y = r;
            r.startsWith("./") && (y = r.substring(2));
            let w = p.get(y);
            if (!w) throw new Error(`File with name ${y} not found in preloaded files.`);
            if (s + f > w.byteLength) throw new Error("Out of bounds: data offset and length exceed the external file data size.");
            let T = w.slice(s, s + f).buffer, g;
            switch (d.dataType) {
              case "float32":
                g = new Float32Array(T);
                break;
              case "float16":
                g = typeof Float16Array < "u" && Float16Array.from ? new Float16Array(T) : new Uint16Array(T);
                break;
              case "int32":
                g = new Int32Array(T);
                break;
              case "uint32":
                g = new Uint32Array(T);
                break;
              case "int64":
                if (m) {
                  let v = pn(new Uint8Array(T), "int64");
                  g = new Int32Array(v.buffer), d.dataType = "int32";
                } else g = new BigInt64Array(T);
                break;
              case "uint64":
                g = new BigUint64Array(T);
                break;
              case "int8":
                g = new Int8Array(T);
                break;
              case "int4":
              case "uint4":
              case "uint8":
                g = new Uint8Array(T);
                break;
              default:
                throw new Error(`Unsupported data type: ${d.dataType} in creating WebNN Constant from external data.`);
            }
            return de("verbose", () => `[WebNN] registerMLConstant {dataType: ${d.dataType}, shape: ${d.shape}}} ${m ? "(Note: it was int64 data type and registered to int32 as workaround)" : ""}`), i.constant(d, g);
          }
          registerGraphInput(r) {
            this.temporaryGraphInputs.push(r);
          }
          registerGraphOutput(r) {
            this.temporaryGraphOutputs.push(r);
          }
          isGraphInput(r, s) {
            let f = this.sessionGraphInputs.get(r);
            return f ? f.includes(s) : false;
          }
          isGraphOutput(r, s) {
            let f = this.sessionGraphOutputs.get(r);
            return f ? f.includes(s) : false;
          }
          isGraphInputOutputTypeSupported(r, s, f = true) {
            let i = lr.get(He(s)), d = this.mlOpSupportLimitsBySessionId.get(r);
            return typeof i > "u" ? false : f ? !!d?.input.dataTypes.includes(i) : !!d?.output.dataTypes.includes(i);
          }
          flush() {
          }
        };
      });
      rn = F(() => {
        "use strict";
        ze();
        gs();
        vs();
        st();
        Ve();
        sr();
        cn();
        Ac = (a, r) => {
          V()._OrtInit(a, r) !== 0 && z("Can't initialize onnxruntime.");
        }, Kt = async (a) => {
          Ac(a.wasm.numThreads, Bt(a.logLevel));
        }, Qt = async (a, r) => {
          V().asyncInit?.();
          let s = a.webgpu.adapter;
          if (r === "webgpu") {
            if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
            if (s) {
              if (typeof s.limits != "object" || typeof s.features != "object" || typeof s.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
            } else {
              let f = a.webgpu.powerPreference;
              if (f !== void 0 && f !== "low-power" && f !== "high-performance") throw new Error(`Invalid powerPreference setting: "${f}"`);
              let i = a.webgpu.forceFallbackAdapter;
              if (i !== void 0 && typeof i != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);
              if (s = await navigator.gpu.requestAdapter({ powerPreference: f, forceFallbackAdapter: i }), !s) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.');
            }
          }
          if (r === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
          if (r === "webgpu" && V().webgpuInit((f) => {
            a.webgpu.device = f;
          }), r === "webnn") {
            let f = new (Ps(), Ht(Ds)).WebNNBackend(a);
            V().webnnInit([f, () => f.reserveTensorId(), (i) => f.releaseTensorId(i), async (i, d, p, m, y) => f.ensureTensor(i, d, p, m, y), (i, d) => {
              f.uploadTensor(i, d);
            }, async (i, d) => f.downloadTensor(i, d), (i, d) => f.registerMLContext(i, d), !!a.trace]);
          }
        }, it = /* @__PURE__ */ new Map(), Ic = (a) => {
          let r = V(), s = r.stackSave();
          try {
            let f = r.PTR_SIZE, i = r.stackAlloc(2 * f);
            r._OrtGetInputOutputCount(a, i, i + f) !== 0 && z("Can't get session input/output count.");
            let p = f === 4 ? "i32" : "i64";
            return [Number(r.getValue(i, p)), Number(r.getValue(i + f, p))];
          } finally {
            r.stackRestore(s);
          }
        }, _s = (a, r) => {
          let s = V(), f = s.stackSave(), i = 0;
          try {
            let d = s.PTR_SIZE, p = s.stackAlloc(2 * d);
            s._OrtGetInputOutputMetadata(a, r, p, p + d) !== 0 && z("Can't get session input/output metadata.");
            let y = Number(s.getValue(p, "*"));
            i = Number(s.getValue(p + d, "*"));
            let w = s.HEAP32[i / 4];
            if (w === 0) return [y, 0];
            let T = s.HEAPU32[i / 4 + 1], g = [];
            for (let v = 0; v < T; v++) {
              let S = Number(s.getValue(i + 8 + v * d, "*"));
              g.push(S !== 0 ? s.UTF8ToString(S) : Number(s.getValue(i + 8 + (v + T) * d, "*")));
            }
            return [y, w, g];
          } finally {
            s.stackRestore(f), i !== 0 && s._OrtFree(i);
          }
        }, xt = (a) => {
          let r = V(), s = r._malloc(a.byteLength);
          if (s === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${a.byteLength}.`);
          return r.HEAPU8.set(a, s), [s, a.byteLength];
        }, er = async (a, r) => {
          let s, f, i = V();
          Array.isArray(a) ? [s, f] = a : a.buffer === i.HEAPU8.buffer ? [s, f] = [a.byteOffset, a.byteLength] : [s, f] = xt(a);
          let d = 0, p = 0, m = 0, y = [], w = [], T = [];
          try {
            if ([p, y] = await Ts(r), r?.externalData && i.mountExternalData) {
              let B = [];
              for (let G2 of r.externalData) {
                let oe2 = typeof G2 == "string" ? G2 : G2.path;
                B.push(Ot(typeof G2 == "string" ? G2 : G2.data).then((l) => {
                  i.mountExternalData(oe2, l);
                }));
              }
              await Promise.all(B);
            }
            for (let B of r?.executionProviders ?? []) if ((typeof B == "string" ? B : B.name) === "webnn") {
              if (i.shouldTransferToMLTensor = false, typeof B != "string") {
                let oe2 = B, l = oe2?.context, ne = oe2?.gpuDevice, Z2 = oe2?.deviceType, J2 = oe2?.powerPreference;
                l ? i.currentContext = l : ne ? i.currentContext = await i.webnnCreateMLContext(ne) : i.currentContext = await i.webnnCreateMLContext({ deviceType: Z2, powerPreference: J2 });
              } else i.currentContext = await i.webnnCreateMLContext();
              break;
            }
            d = await i._OrtCreateSession(s, f, p), i.webgpuOnCreateSession?.(d), d === 0 && z("Can't create a session."), i.jsepOnCreateSession?.(), i.currentContext && (i.webnnRegisterMLContext(d, i.currentContext), i.currentContext = void 0, i.shouldTransferToMLTensor = true);
            let [g, v] = Ic(d), S = !!r?.enableGraphCapture, U = [], R = [], j = [], P = [], M = [];
            for (let B = 0; B < g; B++) {
              let [G2, oe2, l] = _s(d, B);
              G2 === 0 && z("Can't get an input name."), w.push(G2);
              let ne = i.UTF8ToString(G2);
              U.push(ne), j.push(oe2 === 0 ? { name: ne, isTensor: false } : { name: ne, isTensor: true, type: ir(oe2), shape: l });
            }
            for (let B = 0; B < v; B++) {
              let [G2, oe2, l] = _s(d, B + g);
              G2 === 0 && z("Can't get an output name."), T.push(G2);
              let ne = i.UTF8ToString(G2);
              R.push(ne), P.push(oe2 === 0 ? { name: ne, isTensor: false } : { name: ne, isTensor: true, type: ir(oe2), shape: l });
              {
                if (S && r?.preferredOutputLocation === void 0) {
                  M.push("gpu-buffer");
                  continue;
                }
                let Z2 = typeof r?.preferredOutputLocation == "string" ? r.preferredOutputLocation : r?.preferredOutputLocation?.[ne] ?? "cpu", J2 = i.webnnIsGraphOutput;
                if (Z2 === "cpu" && J2 && J2(d, ne)) {
                  M.push("ml-tensor-cpu-output");
                  continue;
                }
                if (Z2 !== "cpu" && Z2 !== "cpu-pinned" && Z2 !== "gpu-buffer" && Z2 !== "ml-tensor") throw new Error(`Not supported preferred output location: ${Z2}.`);
                if (S && Z2 !== "gpu-buffer") throw new Error(`Not supported preferred output location: ${Z2}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);
                M.push(Z2);
              }
            }
            let Y2 = null;
            return M.some((B) => B === "gpu-buffer" || B === "ml-tensor" || B === "ml-tensor-cpu-output") && (m = i._OrtCreateBinding(d), m === 0 && z("Can't create IO binding."), Y2 = { handle: m, outputPreferredLocations: M, outputPreferredLocationsEncoded: M.map((B) => B === "ml-tensor-cpu-output" ? "ml-tensor" : B).map((B) => fn(B)) }), it.set(d, [d, w, T, Y2, S, false]), [d, U, R, j, P];
          } catch (g) {
            throw w.forEach((v) => i._OrtFree(v)), T.forEach((v) => i._OrtFree(v)), m !== 0 && i._OrtReleaseBinding(m) !== 0 && z("Can't release IO binding."), d !== 0 && i._OrtReleaseSession(d) !== 0 && z("Can't release session."), g;
          } finally {
            i._free(s), p !== 0 && i._OrtReleaseSessionOptions(p) !== 0 && z("Can't release session options."), y.forEach((g) => i._free(g)), i.unmountExternalData?.();
          }
        }, tr = (a) => {
          let r = V(), s = it.get(a);
          if (!s) throw new Error(`cannot release session. invalid session id: ${a}`);
          let [f, i, d, p, m] = s;
          p && (m && r._OrtClearBoundOutputs(p.handle) !== 0 && z("Can't clear bound outputs."), r._OrtReleaseBinding(p.handle) !== 0 && z("Can't release IO binding.")), r.jsepOnReleaseSession?.(a), r.webnnOnReleaseSession?.(a), r.webgpuOnReleaseSession?.(a), i.forEach((y) => r._OrtFree(y)), d.forEach((y) => r._OrtFree(y)), r._OrtReleaseSession(f) !== 0 && z("Can't release session."), it.delete(a);
        }, Rs = async (a, r, s, f, i, d, p = false) => {
          if (!a) {
            r.push(0);
            return;
          }
          let m = V(), y = m.PTR_SIZE, w = a[0], T = a[1], g = a[3], v = g, S, U;
          if (w === "string" && (g === "gpu-buffer" || g === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
          if (p && g !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${d} when enableGraphCapture is true.`);
          if (g === "gpu-buffer") {
            let P = a[2].gpuBuffer;
            U = ht(He(w), T);
            {
              let M = m.webgpuRegisterBuffer;
              if (!M) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
              S = M(P, f);
            }
          } else if (g === "ml-tensor") {
            let P = a[2].mlTensor;
            U = ht(He(w), T);
            let M = m.webnnRegisterMLTensor;
            if (!M) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
            S = M(f, P, He(w), T);
          } else {
            let P = a[2];
            if (Array.isArray(P)) {
              U = y * P.length, S = m._malloc(U), s.push(S);
              for (let M = 0; M < P.length; M++) {
                if (typeof P[M] != "string") throw new TypeError(`tensor data at index ${M} is not a string`);
                m.setValue(S + M * y, he(P[M], s), "*");
              }
            } else {
              let M = m.webnnIsGraphInput, Y2 = m.webnnIsGraphOutput;
              if (w !== "string" && M && Y2) {
                let B = m.UTF8ToString(i);
                if (M(f, B) || Y2(f, B)) {
                  let G2 = He(w);
                  U = ht(G2, T), v = "ml-tensor";
                  let oe2 = m.webnnCreateTemporaryTensor, l = m.webnnUploadTensor;
                  if (!oe2 || !l) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
                  let ne = await oe2(f, G2, T);
                  l(ne, new Uint8Array(P.buffer, P.byteOffset, P.byteLength)), S = ne;
                } else U = P.byteLength, S = m._malloc(U), s.push(S), m.HEAPU8.set(new Uint8Array(P.buffer, P.byteOffset, U), S);
              } else U = P.byteLength, S = m._malloc(U), s.push(S), m.HEAPU8.set(new Uint8Array(P.buffer, P.byteOffset, U), S);
            }
          }
          let R = m.stackSave(), j = m.stackAlloc(4 * T.length);
          try {
            T.forEach((M, Y2) => m.setValue(j + Y2 * y, M, y === 4 ? "i32" : "i64"));
            let P = m._OrtCreateTensor(He(w), S, U, j, T.length, fn(v));
            P === 0 && z(`Can't create tensor for input/output. session=${f}, index=${d}.`), r.push(P);
          } finally {
            m.stackRestore(R);
          }
        }, rr = async (a, r, s, f, i, d) => {
          let p = V(), m = p.PTR_SIZE, y = it.get(a);
          if (!y) throw new Error(`cannot run inference. invalid session id: ${a}`);
          let w = y[0], T = y[1], g = y[2], v = y[3], S = y[4], U = y[5], R = r.length, j = f.length, P = 0, M = [], Y2 = [], B = [], G2 = [], oe2 = [], l = p.stackSave(), ne = p.stackAlloc(R * m), Z2 = p.stackAlloc(R * m), J2 = p.stackAlloc(j * m), Ce2 = p.stackAlloc(j * m);
          try {
            [P, M] = ws(d), Ge("wasm prepareInputOutputTensor");
            for (let _ = 0; _ < R; _++) await Rs(s[_], Y2, G2, a, T[r[_]], r[_], S);
            for (let _ = 0; _ < j; _++) await Rs(i[_], B, G2, a, g[f[_]], R + f[_], S);
            $e("wasm prepareInputOutputTensor");
            for (let _ = 0; _ < R; _++) p.setValue(ne + _ * m, Y2[_], "*"), p.setValue(Z2 + _ * m, T[r[_]], "*");
            for (let _ = 0; _ < j; _++) p.setValue(J2 + _ * m, B[_], "*"), p.setValue(Ce2 + _ * m, g[f[_]], "*");
            if (v && !U) {
              let { handle: _, outputPreferredLocations: ae2, outputPreferredLocationsEncoded: le } = v;
              if (T.length !== R) throw new Error(`input count from feeds (${R}) is expected to be always equal to model's input count (${T.length}).`);
              Ge("wasm bindInputsOutputs");
              for (let q = 0; q < R; q++) {
                let ye = r[q];
                await p._OrtBindInput(_, T[ye], Y2[q]) !== 0 && z(`Can't bind input[${q}] for session=${a}.`);
              }
              for (let q = 0; q < j; q++) {
                let ye = f[q];
                i[q]?.[3] ? (oe2.push(B[q]), p._OrtBindOutput(_, g[ye], B[q], 0) !== 0 && z(`Can't bind pre-allocated output[${q}] for session=${a}.`)) : p._OrtBindOutput(_, g[ye], 0, le[ye]) !== 0 && z(`Can't bind output[${q}] to ${ae2[q]} for session=${a}.`);
              }
              $e("wasm bindInputsOutputs"), it.set(a, [w, T, g, v, S, true]);
            }
            p.jsepOnRunStart?.(w), p.webnnOnRunStart?.(w);
            let K;
            v ? K = await p._OrtRunWithBinding(w, v.handle, j, J2, P) : K = await p._OrtRun(w, Z2, ne, R, Ce2, j, J2, P), K !== 0 && z("failed to call OrtRun().");
            let x = [], A = [];
            Ge("wasm ProcessOutputTensor");
            for (let _ = 0; _ < j; _++) {
              let ae2 = Number(p.getValue(J2 + _ * m, "*"));
              if (ae2 === B[_] || oe2.includes(B[_])) {
                x.push(i[_]), ae2 !== B[_] && p._OrtReleaseTensor(ae2) !== 0 && z("Can't release tensor.");
                continue;
              }
              let le = p.stackSave(), q = p.stackAlloc(4 * m), ye = false, re, se = 0;
              try {
                p._OrtGetTensorData(ae2, q, q + m, q + 2 * m, q + 3 * m) !== 0 && z(`Can't access output tensor data on index ${_}.`);
                let we = m === 4 ? "i32" : "i64", je = Number(p.getValue(q, we));
                se = p.getValue(q + m, "*");
                let wt2 = p.getValue(q + m * 2, "*"), gt2 = Number(p.getValue(q + m * 3, we)), Se = [];
                for (let te = 0; te < gt2; te++) Se.push(Number(p.getValue(wt2 + te * m, we)));
                p._OrtFree(wt2) !== 0 && z("Can't free memory for tensor dims.");
                let Ae = Se.reduce((te, Q) => te * Q, 1);
                re = ir(je);
                let Le2 = v?.outputPreferredLocations[f[_]];
                if (re === "string") {
                  if (Le2 === "gpu-buffer" || Le2 === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
                  let te = [];
                  for (let Q = 0; Q < Ae; Q++) {
                    let $2 = p.getValue(se + Q * m, "*"), H = p.getValue(se + (Q + 1) * m, "*"), Ye = Q === Ae - 1 ? void 0 : H - $2;
                    te.push(p.UTF8ToString($2, Ye));
                  }
                  x.push([re, Se, te, "cpu"]);
                } else if (Le2 === "gpu-buffer" && Ae > 0) {
                  let te = p.webgpuGetBuffer;
                  if (!te) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                  let Q = te(se), $2 = ht(je, Ae);
                  if ($2 === void 0 || !ur(re)) throw new Error(`Unsupported data type: ${re}`);
                  ye = true;
                  {
                    p.webgpuRegisterBuffer(Q, a, se);
                    let H = p.webgpuCreateDownloader(Q, $2, a);
                    x.push([re, Se, { gpuBuffer: Q, download: async () => {
                      let Ye = await H();
                      return new (at(re))(Ye);
                    }, dispose: () => {
                      p._OrtReleaseTensor(ae2) !== 0 && z("Can't release tensor.");
                    } }, "gpu-buffer"]);
                  }
                } else if (Le2 === "ml-tensor" && Ae > 0) {
                  let te = p.webnnEnsureTensor, Q = p.webnnIsGraphInputOutputTypeSupported;
                  if (!te || !Q) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                  if (ht(je, Ae) === void 0 || !fr(re)) throw new Error(`Unsupported data type: ${re}`);
                  if (!Q(a, re, false)) throw new Error(`preferredLocation "ml-tensor" for ${re} output is not supported by current WebNN Context.`);
                  let H = await te(a, se, je, Se, false);
                  ye = true, x.push([re, Se, { mlTensor: H, download: p.webnnCreateMLTensorDownloader(se, re), dispose: () => {
                    p.webnnReleaseTensorId(se), p._OrtReleaseTensor(ae2);
                  } }, "ml-tensor"]);
                } else if (Le2 === "ml-tensor-cpu-output" && Ae > 0) {
                  let te = p.webnnCreateMLTensorDownloader(se, re)(), Q = x.length;
                  ye = true, A.push((async () => {
                    let $2 = [Q, await te];
                    return p.webnnReleaseTensorId(se), p._OrtReleaseTensor(ae2), $2;
                  })()), x.push([re, Se, [], "cpu"]);
                } else {
                  let te = at(re), Q = new te(Ae);
                  new Uint8Array(Q.buffer, Q.byteOffset, Q.byteLength).set(p.HEAPU8.subarray(se, se + Q.byteLength)), x.push([re, Se, Q, "cpu"]);
                }
              } finally {
                p.stackRestore(le), re === "string" && se && p._free(se), ye || p._OrtReleaseTensor(ae2);
              }
            }
            v && !S && (p._OrtClearBoundOutputs(v.handle) !== 0 && z("Can't clear bound outputs."), it.set(a, [w, T, g, v, S, false]));
            for (let [_, ae2] of await Promise.all(A)) x[_][2] = ae2;
            return $e("wasm ProcessOutputTensor"), x;
          } finally {
            p.webnnOnRunEnd?.(w), p.stackRestore(l), s.forEach((K) => {
              K && K[3] === "gpu-buffer" && p.webgpuUnregisterBuffer(K[2].gpuBuffer);
            }), i.forEach((K) => {
              K && K[3] === "gpu-buffer" && p.webgpuUnregisterBuffer(K[2].gpuBuffer);
            }), Y2.forEach((K) => p._OrtReleaseTensor(K)), B.forEach((K) => p._OrtReleaseTensor(K)), G2.forEach((K) => p._free(K)), P !== 0 && p._OrtReleaseRunOptions(P), M.forEach((K) => p._free(K));
          }
        }, nr = (a) => {
          let r = V(), s = it.get(a);
          if (!s) throw new Error("invalid session id");
          let f = s[0], i = r._OrtEndProfiling(f);
          i === 0 && z("Can't get an profile file name."), r._OrtFree(i);
        }, or = (a) => {
          let r = [];
          for (let s of a) {
            let f = s[2];
            !Array.isArray(f) && "buffer" in f && r.push(f.buffer);
          }
          return r;
        };
      });
      bn = F(() => {
        "use strict";
        ze();
        rn();
        Ve();
        Xt();
        ut = () => !!ee.wasm.proxy && typeof document < "u", Mt = false, mr = false, hr = false, yn = /* @__PURE__ */ new Map(), yt = (a, r) => {
          let s = yn.get(a);
          s ? s.push(r) : yn.set(a, [r]);
        }, bt = () => {
          if (Mt || !mr || hr || !Ee) throw new Error("worker not ready");
        }, Lc = (a) => {
          switch (a.data.type) {
            case "init-wasm":
              Mt = false, a.data.err ? (hr = true, hn[1](a.data.err)) : (mr = true, hn[0]()), pr && (URL.revokeObjectURL(pr), pr = void 0);
              break;
            case "init-ep":
            case "copy-from":
            case "create":
            case "release":
            case "run":
            case "end-profiling": {
              let r = yn.get(a.data.type);
              a.data.err ? r.shift()[1](a.data.err) : r.shift()[0](a.data.out);
              break;
            }
            default:
          }
        }, Ns = async () => {
          if (!mr) {
            if (Mt) throw new Error("multiple calls to 'initWasm()' detected.");
            if (hr) throw new Error("previous call to 'initWasm()' failed.");
            if (Mt = true, ut()) return new Promise((a, r) => {
              Ee?.terminate(), hs().then(([s, f]) => {
                try {
                  Ee = f, Ee.onerror = (d) => r(d), Ee.onmessage = Lc, hn = [a, r];
                  let i = { type: "init-wasm", in: ee };
                  !i.in.wasm.wasmPaths && (s || on) && (i.in.wasm.wasmPaths = { wasm: new URL("ort-wasm-simd-threaded.asyncify.wasm", import_meta.url).href }), Ee.postMessage(i), pr = s;
                } catch (i) {
                  r(i);
                }
              }, r);
            });
            try {
              await Zt(ee.wasm), await Kt(ee), mr = true;
            } catch (a) {
              throw hr = true, a;
            } finally {
              Mt = false;
            }
          }
        }, Ws = async (a) => {
          if (ut()) return bt(), new Promise((r, s) => {
            yt("init-ep", [r, s]);
            let f = { type: "init-ep", in: { epName: a, env: ee } };
            Ee.postMessage(f);
          });
          await Qt(ee, a);
        }, ks = async (a) => ut() ? (bt(), new Promise((r, s) => {
          yt("copy-from", [r, s]);
          let f = { type: "copy-from", in: { buffer: a } };
          Ee.postMessage(f, [a.buffer]);
        })) : xt(a), Fs = async (a, r) => {
          if (ut()) {
            if (r?.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
            return bt(), new Promise((s, f) => {
              yt("create", [s, f]);
              let i = { type: "create", in: { model: a, options: { ...r } } }, d = [];
              a instanceof Uint8Array && d.push(a.buffer), Ee.postMessage(i, d);
            });
          } else return er(a, r);
        }, Gs = async (a) => {
          if (ut()) return bt(), new Promise((r, s) => {
            yt("release", [r, s]);
            let f = { type: "release", in: a };
            Ee.postMessage(f);
          });
          tr(a);
        }, $s = async (a, r, s, f, i, d) => {
          if (ut()) {
            if (s.some((p) => p[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
            if (i.some((p) => p)) throw new Error("pre-allocated output tensor is not supported for proxy.");
            return bt(), new Promise((p, m) => {
              yt("run", [p, m]);
              let y = s, w = { type: "run", in: { sessionId: a, inputIndices: r, inputs: y, outputIndices: f, options: d } };
              Ee.postMessage(w, or(y));
            });
          } else return rr(a, r, s, f, i, d);
        }, zs = async (a) => {
          if (ut()) return bt(), new Promise((r, s) => {
            yt("end-profiling", [r, s]);
            let f = { type: "end-profiling", in: a };
            Ee.postMessage(f);
          });
          nr(a);
        };
      });
      Hs = F(() => {
        "use strict";
        ze();
        bn();
        st();
        Jt();
        cn();
        Vs = (a, r) => {
          switch (a.location) {
            case "cpu":
              return [a.type, a.dims, a.data, "cpu"];
            case "gpu-buffer":
              return [a.type, a.dims, { gpuBuffer: a.gpuBuffer }, "gpu-buffer"];
            case "ml-tensor":
              return [a.type, a.dims, { mlTensor: a.mlTensor }, "ml-tensor"];
            default:
              throw new Error(`invalid data location: ${a.location} for ${r()}`);
          }
        }, Bc = (a) => {
          switch (a[3]) {
            case "cpu":
              return new xe(a[0], a[2], a[1]);
            case "gpu-buffer": {
              let r = a[0];
              if (!ur(r)) throw new Error(`not supported data type: ${r} for deserializing GPU tensor`);
              let { gpuBuffer: s, download: f, dispose: i } = a[2];
              return xe.fromGpuBuffer(s, { dataType: r, dims: a[1], download: f, dispose: i });
            }
            case "ml-tensor": {
              let r = a[0];
              if (!fr(r)) throw new Error(`not supported data type: ${r} for deserializing MLTensor tensor`);
              let { mlTensor: s, download: f, dispose: i } = a[2];
              return xe.fromMLTensor(s, { dataType: r, dims: a[1], download: f, dispose: i });
            }
            default:
              throw new Error(`invalid data location: ${a[3]}`);
          }
        }, yr = class {
          async fetchModelAndCopyToWasmMemory(r) {
            return ks(await Ot(r));
          }
          async loadModel(r, s) {
            tt();
            let f;
            typeof r == "string" ? f = await this.fetchModelAndCopyToWasmMemory(r) : f = r, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await Fs(f, s), rt();
          }
          async dispose() {
            return Gs(this.sessionId);
          }
          async run(r, s, f) {
            tt();
            let i = [], d = [];
            Object.entries(r).forEach((v) => {
              let S = v[0], U = v[1], R = this.inputNames.indexOf(S);
              if (R === -1) throw new Error(`invalid input '${S}'`);
              i.push(U), d.push(R);
            });
            let p = [], m = [];
            Object.entries(s).forEach((v) => {
              let S = v[0], U = v[1], R = this.outputNames.indexOf(S);
              if (R === -1) throw new Error(`invalid output '${S}'`);
              p.push(U), m.push(R);
            });
            let y = i.map((v, S) => Vs(v, () => `input "${this.inputNames[d[S]]}"`)), w = p.map((v, S) => v ? Vs(v, () => `output "${this.outputNames[m[S]]}"`) : null), T = await $s(this.sessionId, d, y, m, w, f), g = {};
            for (let v = 0; v < T.length; v++) g[this.outputNames[m[v]]] = p[v] ?? Bc(T[v]);
            return rt(), g;
          }
          startProfiling() {
          }
          endProfiling() {
            zs(this.sessionId);
          }
        };
      });
      Ys = {};
      At(Ys, { OnnxruntimeWebAssemblyBackend: () => br, initializeFlags: () => js, wasmBackend: () => Oc });
      qs = F(() => {
        "use strict";
        ze();
        bn();
        Hs();
        js = () => {
          (typeof ee.wasm.initTimeout != "number" || ee.wasm.initTimeout < 0) && (ee.wasm.initTimeout = 0);
          let a = ee.wasm.simd;
          if (typeof a != "boolean" && a !== void 0 && a !== "fixed" && a !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${a}". Reset it to \`false\` and ignore SIMD feature checking.`), ee.wasm.simd = false), typeof ee.wasm.proxy != "boolean" && (ee.wasm.proxy = false), typeof ee.wasm.trace != "boolean" && (ee.wasm.trace = false), typeof ee.wasm.numThreads != "number" || !Number.isInteger(ee.wasm.numThreads) || ee.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) ee.wasm.numThreads = 1;
          else {
            let r = typeof navigator > "u" ? Jr("node:os").cpus().length : navigator.hardwareConcurrency;
            ee.wasm.numThreads = Math.min(4, Math.ceil((r || 1) / 2));
          }
        }, br = class {
          async init(r) {
            js(), await Ns(), await Ws(r);
          }
          async createInferenceSessionHandler(r, s) {
            let f = new yr();
            return await f.loadModel(r, s), f;
          }
        }, Oc = new br();
      });
      ze();
      ze();
      ze();
      rs = "1.24.3";
      Bl = tn;
      {
        let a = (qs(), Ht(Ys)).wasmBackend;
        Qe("webgpu", a, 5), Qe("webnn", a, 5), Qe("cpu", a, 10), Qe("wasm", a, 10);
      }
      Object.defineProperty(ee.versions, "web", { value: rs, enumerable: true });
    }
  });

  // node_modules/onnxruntime-web/dist/ort.wasm.bundle.min.mjs
  var ort_wasm_bundle_min_exports = {};
  __export(ort_wasm_bundle_min_exports, {
    InferenceSession: () => ns2,
    TRACE: () => xr,
    TRACE_EVENT_BEGIN: () => _e,
    TRACE_EVENT_END: () => Ue,
    TRACE_FUNC_BEGIN: () => Pe,
    TRACE_FUNC_END: () => De,
    Tensor: () => de2,
    default: () => su,
    env: () => Y,
    registerBackend: () => Je
  });
  async function Vr(n = {}) {
    var t = n, a = !!globalThis.window, u = !!globalThis.WorkerGlobalScope, o = u && self.name?.startsWith("em-pthread");
    t.mountExternalData = (e, r) => {
      e.startsWith("./") && (e = e.substring(2)), (t.Sb || (t.Sb = /* @__PURE__ */ new Map())).set(e, r);
    }, t.unmountExternalData = () => {
      delete t.Sb;
    }, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({ initial: 0, maximum: 0, kc: true }).buffer.constructor;
    var d, c, l = (e, r) => {
      throw r;
    }, m = import_meta2.url, h = "";
    if (a || u) {
      try {
        h = new URL(".", m).href;
      } catch {
      }
      u && (c = (e) => {
        var r = new XMLHttpRequest();
        return r.open("GET", e, false), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
      }), d = async (e) => {
        if (k(e)) return new Promise((i, s) => {
          var f = new XMLHttpRequest();
          f.open("GET", e, true), f.responseType = "arraybuffer", f.onload = () => {
            f.status == 200 || f.status == 0 && f.response ? i(f.response) : s(f.status);
          }, f.onerror = s, f.send(null);
        });
        var r = await fetch(e, { credentials: "same-origin" });
        if (r.ok) return r.arrayBuffer();
        throw Error(r.status + " : " + r.url);
      };
    }
    var g, b, y, T, I, U, z2 = console.log.bind(console), v = console.error.bind(console), O = z2, F2 = v, D = false, k = (e) => e.startsWith("file://");
    function w() {
      ge.buffer != j.buffer && ee2();
    }
    if (o) {
      let e = function(r) {
        try {
          var i = r.data, s = i.Qb;
          if (s === "load") {
            let f = [];
            self.onmessage = (p) => f.push(p), U = () => {
              postMessage({ Qb: "loaded" });
              for (let p of f) e(p);
              self.onmessage = e;
            };
            for (let p of i.$b) t[p] && !t[p].proxy || (t[p] = (...E) => {
              postMessage({ Qb: "callHandler", Zb: p, args: E });
            }, p == "print" && (O = t[p]), p == "printErr" && (F2 = t[p]));
            ge = i.ec, ee2(), b = i.fc, Ut(), st2();
          } else if (s === "run") {
            (function(f) {
              var p = (w(), W)[f + 52 >>> 2 >>> 0];
              f = (w(), W)[f + 56 >>> 2 >>> 0], sr2(p, p - f), P(p);
            })(i.Pb), zt(i.Pb, 0, 0, 1, 0, 0), wn(), Ft(i.Pb), Q ||= true;
            try {
              Ao(i.cc, i.Ub);
            } catch (f) {
              if (f != "unwind") throw f;
            }
          } else i.target !== "setimmediate" && (s === "checkMailbox" ? Q && nt() : s && (F2(`worker: received unknown command ${s}`), F2(i)));
        } catch (f) {
          throw tr2(), f;
        }
      };
      var vs2 = e, Q = false;
      self.onunhandledrejection = (r) => {
        throw r.reason || r;
      }, self.onmessage = e;
    }
    var j, ne, pe, B, W, re, me, A, K, He2 = false;
    function ee2() {
      var e = ge.buffer;
      t.HEAP8 = j = new Int8Array(e), pe = new Int16Array(e), t.HEAPU8 = ne = new Uint8Array(e), new Uint16Array(e), t.HEAP32 = B = new Int32Array(e), t.HEAPU32 = W = new Uint32Array(e), re = new Float32Array(e), me = new Float64Array(e), A = new BigInt64Array(e), new BigUint64Array(e);
    }
    function he2() {
      He2 = true, o ? U() : Ee2.Ua();
    }
    function H(e) {
      throw F2(e = "Aborted(" + e + ")"), D = true, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), I?.(e), e;
    }
    function q() {
      return { a: { S: fa, f: Io, w: Bo, e: Lo, j: Po, g: Do, T: _o, b: Uo, G: xo, ua: vn, k: Mo, K: In, Ka: Bn, qa: Ln, sa: Pn, La: Dn, Ia: _n, Ba: Un, Ha: xn, Z: Mn, ra: Cn, oa: Rn, Ja: Fn, pa: Nn, Qa: Co, Ea: Ro, ma: No, va: ko, ja: Wo, U: Go, Da: Ft, Na: $o, ya: zo, za: Ho, Aa: jo, wa: $n, xa: zn, ka: Hn, Sa: Yo, Pa: Xo, W: Zo, V: Qo, Oa: Jo, F: Ko, Ma: ea, na: ta, u: Vo, H: na, R: ot2, la: oa, da: ra, Ta: aa, Fa: Yn, Ga: Jn, ta: ye, L: qn, Y: Xn, Ca: Zn, X: Qn, $: Va2, M: ka2, aa: ja2, N: Na2, v: Pa2, c: pa, m: la, n: ca, r: va, ea: Ca2, x: Ia, o: ha, O: Ra2, D: Wa2, I: Ma2, ba: Ha2, ca: za2, Q: Da2, P: xa, fa: _a2, z: Ba2, E: Fa2, d: ma, q: wa, i: da, _: Ya2, l: ya, p: ga, s: ba, t: Ea, y: Oa2, ga: La2, B: Ga2, J: Aa, C: $a2, ha: Sa, ia: Ta, A: Ua2, h: ia, a: ge, Ra: V2 } };
    }
    async function Ut() {
      function e(s, f) {
        return Ee2 = s.exports, Ee2 = (function() {
          var p = Ee2, E = (M) => () => M() >>> 0, S = (M) => (R) => M(R) >>> 0;
          return (p = Object.assign({}, p)).tb = E(p.tb), p.vb = S(p.vb), p.Jb = S(p.Jb), p.Kb = E(p.Kb), p.Ob = S(p.Ob), p;
        })(), mn2.push(Ee2.wb), s = Ee2, t._OrtInit = s.Va, t._OrtGetLastError = s.Wa, t._OrtCreateSessionOptions = s.Xa, t._OrtAppendExecutionProvider = s.Ya, t._OrtAddFreeDimensionOverride = s.Za, t._OrtAddSessionConfigEntry = s._a, t._OrtReleaseSessionOptions = s.$a, t._OrtCreateSession = s.ab, t._OrtReleaseSession = s.bb, t._OrtGetInputOutputCount = s.cb, t._OrtGetInputOutputMetadata = s.db, t._OrtFree = s.eb, t._OrtCreateTensor = s.fb, t._OrtGetTensorData = s.gb, t._OrtReleaseTensor = s.hb, t._OrtCreateRunOptions = s.ib, t._OrtAddRunConfigEntry = s.jb, t._OrtReleaseRunOptions = s.kb, t._OrtCreateBinding = s.lb, t._OrtBindInput = s.mb, t._OrtBindOutput = s.nb, t._OrtClearBoundOutputs = s.ob, t._OrtReleaseBinding = s.pb, t._OrtRunWithBinding = s.qb, t._OrtRun = s.rb, t._OrtEndProfiling = s.sb, at2 = s.tb, Kn = t._free = s.ub, er2 = t._malloc = s.vb, zt = s.yb, tr2 = s.zb, nr2 = s.Ab, rr2 = s.Bb, Ht2 = s.Cb, or2 = s.Db, ar2 = s.Eb, x = s.Fb, Ye = s.Gb, sr2 = s.Hb, P = s.Ib, jt2 = s.Jb, _ = s.Kb, ir2 = s.Lb, Vt = s.Mb, ur2 = s.Nb, fr2 = s.Ob, cr2 = s.xb, b = f, Ee2;
      }
      var r, i = q();
      return t.instantiateWasm ? new Promise((s) => {
        t.instantiateWasm(i, (f, p) => {
          s(e(f, p));
        });
      }) : o ? e(new WebAssembly.Instance(b, q()), b) : (K ??= t.locateFile ? t.locateFile ? t.locateFile("ort-wasm-simd-threaded.wasm", h) : h + "ort-wasm-simd-threaded.wasm" : new URL("ort-wasm-simd-threaded.wasm", import_meta2.url).href, r = await (async function(s) {
        var f = K;
        if (!g && !k(f)) try {
          var p = fetch(f, { credentials: "same-origin" });
          return await WebAssembly.instantiateStreaming(p, s);
        } catch (E) {
          F2(`wasm streaming compile failed: ${E}`), F2("falling back to ArrayBuffer instantiation");
        }
        return (async function(E, S) {
          try {
            var M = await (async function(R) {
              if (!g) try {
                var X = await d(R);
                return new Uint8Array(X);
              } catch {
              }
              if (R == K && g) R = new Uint8Array(g);
              else {
                if (!c) throw "both async and sync fetching of the wasm failed";
                R = c(R);
              }
              return R;
            })(E);
            return await WebAssembly.instantiate(M, S);
          } catch (R) {
            F2(`failed to asynchronously prepare wasm: ${R}`), H(R);
          }
        })(f, s);
      })(i), e(r.instance, r.module));
    }
    class Se {
      name = "ExitStatus";
      constructor(r) {
        this.message = `Program terminated with exit(${r})`, this.status = r;
      }
    }
    var ve = (e) => {
      e.terminate(), e.onmessage = () => {
      };
    }, je = [], Re = 0, te = null, ue2 = (e) => {
      ce2.length == 0 && (yn2(), bn2(ce2[0]));
      var r = ce2.pop();
      if (!r) return 6;
      Fe.push(r), Oe[e.Pb] = r, r.Pb = e.Pb;
      var i = { Qb: "run", cc: e.bc, Ub: e.Ub, Pb: e.Pb };
      return r.postMessage(i, e.Yb), 0;
    }, se = 0, L = (e, r, ...i) => {
      var s, f = 16 * i.length, p = _(), E = jt2(f), S = E >>> 3;
      for (s of i) typeof s == "bigint" ? ((w(), A)[S++ >>> 0] = 1n, (w(), A)[S++ >>> 0] = s) : ((w(), A)[S++ >>> 0] = 0n, (w(), me)[S++ >>> 0] = s);
      return e = nr2(e, 0, f, E, r), P(p), e;
    };
    function V2(e) {
      if (o) return L(0, 1, e);
      if (y = e, !(0 < se)) {
        for (var r of Fe) ve(r);
        for (r of ce2) ve(r);
        ce2 = [], Fe = [], Oe = {}, D = true;
      }
      l(0, new Se(e));
    }
    function fe(e) {
      if (o) return L(1, 0, e);
      ye(e);
    }
    var ye = (e) => {
      if (y = e, o) throw fe(e), "unwind";
      V2(e);
    }, ce2 = [], Fe = [], mn2 = [], Oe = {}, hn2 = (e) => {
      var r = e.Pb;
      delete Oe[r], ce2.push(e), Fe.splice(Fe.indexOf(e), 1), e.Pb = 0, rr2(r);
    };
    function wn() {
      mn2.forEach((e) => e());
    }
    var bn2 = (e) => new Promise((r) => {
      e.onmessage = (f) => {
        var p = f.data;
        if (f = p.Qb, p.Tb && p.Tb != at2()) {
          var E = Oe[p.Tb];
          E ? E.postMessage(p, p.Yb) : F2(`Internal error! Worker sent a message "${f}" to target pthread ${p.Tb}, but that thread no longer exists!`);
        } else f === "checkMailbox" ? nt() : f === "spawnThread" ? ue2(p) : f === "cleanupThread" ? Rt(() => {
          hn2(Oe[p.dc]);
        }) : f === "loaded" ? (e.loaded = true, r(e)) : p.target === "setimmediate" ? e.postMessage(p) : f === "uncaughtException" ? e.onerror(p.error) : f === "callHandler" ? t[p.Zb](...p.args) : f && F2(`worker sent an unknown command ${f}`);
      }, e.onerror = (f) => {
        throw F2(`worker sent an error! ${f.filename}:${f.lineno}: ${f.message}`), f;
      };
      var i, s = [];
      for (i of []) t.propertyIsEnumerable(i) && s.push(i);
      e.postMessage({ Qb: "load", $b: s, ec: ge, fc: b });
    });
    function yn2() {
      var e = new Worker((() => {
        let r = URL;
        return import_meta2.url > "file:" && import_meta2.url < "file;" ? new r("ort.wasm.bundle.min.mjs", import_meta2.url) : new URL(import_meta2.url);
      })(), { type: "module", workerData: "em-pthread", name: "em-pthread" });
      ce2.push(e);
    }
    var ge, gn = [], C = (e) => {
      var r = gn[e];
      return r || (gn[e] = r = cr2.get(e)), r;
    }, Ao = (e, r) => {
      se = 0, e = C(e)(r), 0 < se ? y = e : Ht2(e);
    }, et2 = [], tt2 = 0;
    function Io(e) {
      var r = new xt2(e >>>= 0);
      return (w(), j)[r.Rb + 12 >>> 0] == 0 && (En(r, true), tt2--), Tn(r, false), et2.push(r), fr2(e);
    }
    var Ne = 0, Bo = () => {
      x(0, 0);
      var e = et2.pop();
      ir2(e.Vb), Ne = 0;
    };
    function En(e, r) {
      r = r ? 1 : 0, (w(), j)[e.Rb + 12 >>> 0] = r;
    }
    function Tn(e, r) {
      r = r ? 1 : 0, (w(), j)[e.Rb + 13 >>> 0] = r;
    }
    class xt2 {
      constructor(r) {
        this.Vb = r, this.Rb = r - 24;
      }
    }
    var Mt2 = (e) => {
      var r = Ne;
      if (!r) return Ye(0), 0;
      var i = new xt2(r);
      (w(), W)[i.Rb + 16 >>> 2 >>> 0] = r;
      var s = (w(), W)[i.Rb + 4 >>> 2 >>> 0];
      if (!s) return Ye(0), r;
      for (var f of e) {
        if (f === 0 || f === s) break;
        if (ur2(f, s, i.Rb + 16)) return Ye(f), r;
      }
      return Ye(s), r;
    };
    function Lo() {
      return Mt2([]);
    }
    function Po(e) {
      return Mt2([e >>> 0]);
    }
    function Do(e, r, i, s) {
      return Mt2([e >>> 0, r >>> 0, i >>> 0, s >>> 0]);
    }
    var _o = () => {
      var e = et2.pop();
      e || H("no exception to throw");
      var r = e.Vb;
      throw (w(), j)[e.Rb + 13 >>> 0] == 0 && (et2.push(e), Tn(e, true), En(e, false), tt2++), Vt(r), Ne = r;
    };
    function Uo(e, r, i) {
      var s = new xt2(e >>>= 0);
      throw r >>>= 0, i >>>= 0, (w(), W)[s.Rb + 16 >>> 2 >>> 0] = 0, (w(), W)[s.Rb + 4 >>> 2 >>> 0] = r, (w(), W)[s.Rb + 8 >>> 2 >>> 0] = i, Vt(e), tt2++, Ne = e;
    }
    var xo = () => tt2;
    function Sn(e, r, i, s) {
      return o ? L(2, 1, e, r, i, s) : vn(e, r, i, s);
    }
    function vn(e, r, i, s) {
      if (e >>>= 0, r >>>= 0, i >>>= 0, s >>>= 0, !globalThis.SharedArrayBuffer) return 6;
      var f = [];
      return o && f.length === 0 ? Sn(e, r, i, s) : (e = { bc: i, Pb: e, Ub: s, Yb: f }, o ? (e.Qb = "spawnThread", postMessage(e, f), 0) : ue2(e));
    }
    function Mo(e) {
      throw Ne ||= e >>> 0, Ne;
    }
    var On = globalThis.TextDecoder && new TextDecoder(), An = (e, r = 0, i, s) => {
      var f = r >>>= 0;
      if (i = f + i, s) s = i;
      else {
        for (; e[f] && !(f >= i); ) ++f;
        s = f;
      }
      if (16 < s - r && e.buffer && On) return On.decode(e.buffer instanceof ArrayBuffer ? e.subarray(r, s) : e.slice(r, s));
      for (f = ""; r < s; ) if (128 & (i = e[r++])) {
        var p = 63 & e[r++];
        if ((224 & i) == 192) f += String.fromCharCode((31 & i) << 6 | p);
        else {
          var E = 63 & e[r++];
          65536 > (i = (240 & i) == 224 ? (15 & i) << 12 | p << 6 | E : (7 & i) << 18 | p << 12 | E << 6 | 63 & e[r++]) ? f += String.fromCharCode(i) : (i -= 65536, f += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i));
        }
      } else f += String.fromCharCode(i);
      return f;
    }, Ct = (e, r, i) => (e >>>= 0) ? An((w(), ne), e, r, i) : "";
    function In(e, r, i) {
      return o ? L(3, 1, e, r, i) : 0;
    }
    function Bn(e, r) {
      if (o) return L(4, 1, e, r);
    }
    function Ln(e, r) {
      if (o) return L(5, 1, e, r);
    }
    function Pn(e, r, i) {
      if (o) return L(6, 1, e, r, i);
    }
    function Dn(e, r, i) {
      return o ? L(7, 1, e, r, i) : 0;
    }
    function _n(e, r) {
      if (o) return L(8, 1, e, r);
    }
    function Un(e, r, i) {
      if (o) return L(9, 1, e, r, i);
    }
    function xn(e, r, i, s) {
      if (o) return L(10, 1, e, r, i, s);
    }
    function Mn(e, r, i, s) {
      if (o) return L(11, 1, e, r, i, s);
    }
    function Cn(e, r, i, s) {
      if (o) return L(12, 1, e, r, i, s);
    }
    function Rn(e) {
      if (o) return L(13, 1, e);
    }
    function Fn(e, r) {
      if (o) return L(14, 1, e, r);
    }
    function Nn(e, r, i) {
      if (o) return L(15, 1, e, r, i);
    }
    var Co = () => H("");
    function Ro(e) {
      zt(e >>> 0, !u, 1, !a, 131072, false), wn();
    }
    var Rt = (e) => {
      if (!D) try {
        if (e(), !(0 < se)) try {
          o ? at2() && Ht2(y) : ye(y);
        } catch (r) {
          r instanceof Se || r == "unwind" || l(0, r);
        }
      } catch (r) {
        r instanceof Se || r == "unwind" || l(0, r);
      }
    }, Fo = !Atomics.waitAsync || globalThis.navigator?.userAgent && 91 > Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) || [])[2]);
    function Ft(e) {
      e >>>= 0, Fo || (Atomics.waitAsync((w(), B), e >>> 2, e).value.then(nt), e += 128, Atomics.store((w(), B), e >>> 2, 1));
    }
    var nt = () => Rt(() => {
      var e = at2();
      e && (Ft(e), ar2());
    });
    function No(e, r) {
      (e >>>= 0) == r >>> 0 ? setTimeout(nt) : o ? postMessage({ Tb: e, Qb: "checkMailbox" }) : (e = Oe[e]) && e.postMessage({ Qb: "checkMailbox" });
    }
    var Nt = [];
    function ko(e, r, i, s, f) {
      for (r >>>= 0, f >>>= 0, Nt.length = 0, i = f >>> 3, s = f + s >>> 3; i < s; ) {
        var p;
        p = (w(), A)[i++ >>> 0] ? (w(), A)[i++ >>> 0] : (w(), me)[i++ >>> 0], Nt.push(p);
      }
      return (r ? lr2[r] : ua[e])(...Nt);
    }
    var Wo = () => {
      se = 0;
    };
    function Go(e) {
      e >>>= 0, o ? postMessage({ Qb: "cleanupThread", dc: e }) : hn2(Oe[e]);
    }
    function $o(e) {
    }
    function zo(e, r) {
      e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), r >>>= 0, e = new Date(1e3 * e), (w(), B)[r >>> 2 >>> 0] = e.getUTCSeconds(), (w(), B)[r + 4 >>> 2 >>> 0] = e.getUTCMinutes(), (w(), B)[r + 8 >>> 2 >>> 0] = e.getUTCHours(), (w(), B)[r + 12 >>> 2 >>> 0] = e.getUTCDate(), (w(), B)[r + 16 >>> 2 >>> 0] = e.getUTCMonth(), (w(), B)[r + 20 >>> 2 >>> 0] = e.getUTCFullYear() - 1900, (w(), B)[r + 24 >>> 2 >>> 0] = e.getUTCDay(), e = (e.getTime() - Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, (w(), B)[r + 28 >>> 2 >>> 0] = e;
    }
    var kn = (e) => e % 4 == 0 && (e % 100 != 0 || e % 400 == 0), Wn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Gn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    function Ho(e, r) {
      e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), r >>>= 0, e = new Date(1e3 * e), (w(), B)[r >>> 2 >>> 0] = e.getSeconds(), (w(), B)[r + 4 >>> 2 >>> 0] = e.getMinutes(), (w(), B)[r + 8 >>> 2 >>> 0] = e.getHours(), (w(), B)[r + 12 >>> 2 >>> 0] = e.getDate(), (w(), B)[r + 16 >>> 2 >>> 0] = e.getMonth(), (w(), B)[r + 20 >>> 2 >>> 0] = e.getFullYear() - 1900, (w(), B)[r + 24 >>> 2 >>> 0] = e.getDay();
      var i = (kn(e.getFullYear()) ? Wn : Gn)[e.getMonth()] + e.getDate() - 1 | 0;
      (w(), B)[r + 28 >>> 2 >>> 0] = i, (w(), B)[r + 36 >>> 2 >>> 0] = -60 * e.getTimezoneOffset(), i = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
      var s = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
      e = 0 | (i != s && e.getTimezoneOffset() == Math.min(s, i)), (w(), B)[r + 32 >>> 2 >>> 0] = e;
    }
    function jo(e) {
      e >>>= 0;
      var r = new Date((w(), B)[e + 20 >>> 2 >>> 0] + 1900, (w(), B)[e + 16 >>> 2 >>> 0], (w(), B)[e + 12 >>> 2 >>> 0], (w(), B)[e + 8 >>> 2 >>> 0], (w(), B)[e + 4 >>> 2 >>> 0], (w(), B)[e >>> 2 >>> 0], 0), i = (w(), B)[e + 32 >>> 2 >>> 0], s = r.getTimezoneOffset(), f = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(), p = new Date(r.getFullYear(), 0, 1).getTimezoneOffset(), E = Math.min(p, f);
      return 0 > i ? (w(), B)[e + 32 >>> 2 >>> 0] = +(f != p && E == s) : 0 < i != (E == s) && (f = Math.max(p, f), r.setTime(r.getTime() + 6e4 * ((0 < i ? E : f) - s))), (w(), B)[e + 24 >>> 2 >>> 0] = r.getDay(), i = (kn(r.getFullYear()) ? Wn : Gn)[r.getMonth()] + r.getDate() - 1 | 0, (w(), B)[e + 28 >>> 2 >>> 0] = i, (w(), B)[e >>> 2 >>> 0] = r.getSeconds(), (w(), B)[e + 4 >>> 2 >>> 0] = r.getMinutes(), (w(), B)[e + 8 >>> 2 >>> 0] = r.getHours(), (w(), B)[e + 12 >>> 2 >>> 0] = r.getDate(), (w(), B)[e + 16 >>> 2 >>> 0] = r.getMonth(), (w(), B)[e + 20 >>> 2 >>> 0] = r.getYear(), e = r.getTime(), BigInt(isNaN(e) ? -1 : e / 1e3);
    }
    function $n(e, r, i, s, f, p, E) {
      return o ? L(16, 1, e, r, i, s, f, p, E) : -52;
    }
    function zn(e, r, i, s, f, p) {
      if (o) return L(17, 1, e, r, i, s, f, p);
    }
    var Ve2 = {}, Vo = () => performance.timeOrigin + performance.now();
    function Hn(e, r) {
      if (o) return L(18, 1, e, r);
      if (Ve2[e] && (clearTimeout(Ve2[e].id), delete Ve2[e]), !r) return 0;
      var i = setTimeout(() => {
        delete Ve2[e], Rt(() => or2(e, performance.timeOrigin + performance.now()));
      }, r);
      return Ve2[e] = { id: i, lc: r }, 0;
    }
    var Ae = (e, r, i) => {
      var s = (w(), ne);
      if (r >>>= 0, 0 < i) {
        var f = r;
        i = r + i - 1;
        for (var p = 0; p < e.length; ++p) {
          var E = e.codePointAt(p);
          if (127 >= E) {
            if (r >= i) break;
            s[r++ >>> 0] = E;
          } else if (2047 >= E) {
            if (r + 1 >= i) break;
            s[r++ >>> 0] = 192 | E >> 6, s[r++ >>> 0] = 128 | 63 & E;
          } else if (65535 >= E) {
            if (r + 2 >= i) break;
            s[r++ >>> 0] = 224 | E >> 12, s[r++ >>> 0] = 128 | E >> 6 & 63, s[r++ >>> 0] = 128 | 63 & E;
          } else {
            if (r + 3 >= i) break;
            s[r++ >>> 0] = 240 | E >> 18, s[r++ >>> 0] = 128 | E >> 12 & 63, s[r++ >>> 0] = 128 | E >> 6 & 63, s[r++ >>> 0] = 128 | 63 & E, p++;
          }
        }
        s[r >>> 0] = 0, e = r - f;
      } else e = 0;
      return e;
    };
    function Yo(e, r, i, s) {
      e >>>= 0, r >>>= 0, i >>>= 0, s >>>= 0;
      var f = (/* @__PURE__ */ new Date()).getFullYear(), p = new Date(f, 0, 1).getTimezoneOffset();
      f = new Date(f, 6, 1).getTimezoneOffset();
      var E = Math.max(p, f);
      (w(), W)[e >>> 2 >>> 0] = 60 * E, (w(), B)[r >>> 2 >>> 0] = +(p != f), e = (r = (S) => {
        var M = Math.abs(S);
        return `UTC${0 <= S ? "-" : "+"}${String(Math.floor(M / 60)).padStart(2, "0")}${String(M % 60).padStart(2, "0")}`;
      })(p), r = r(f), f < p ? (Ae(e, i, 17), Ae(r, s, 17)) : (Ae(e, s, 17), Ae(r, i, 17));
    }
    var Jo = () => Date.now(), qo = 1;
    function Xo(e, r, i) {
      if (i >>>= 0, !(0 <= e && 3 >= e)) return 28;
      if (e === 0) e = Date.now();
      else {
        if (!qo) return 52;
        e = performance.timeOrigin + performance.now();
      }
      return e = Math.round(1e6 * e), (w(), A)[i >>> 3 >>> 0] = BigInt(e), 0;
    }
    var kt = [];
    function Zo(e, r, i) {
      e >>>= 0, r >>>= 0, i >>>= 0, kt.length = 0;
      for (var s; s = (w(), ne)[r++ >>> 0]; ) {
        var f = s != 105;
        i += (f &= s != 112) && i % 8 ? 4 : 0, kt.push(s == 112 ? (w(), W)[i >>> 2 >>> 0] : s == 106 ? (w(), A)[i >>> 3 >>> 0] : s == 105 ? (w(), B)[i >>> 2 >>> 0] : (w(), me)[i >>> 3 >>> 0]), i += f ? 8 : 4;
      }
      return lr2[e](...kt);
    }
    var Qo = () => {
    };
    function Ko(e, r) {
      return F2(Ct(e >>> 0, r >>> 0));
    }
    var ea = () => {
      throw se += 1, "unwind";
    };
    function ta() {
      return 4294901760;
    }
    var na = () => navigator.hardwareConcurrency, Ie = {}, Wt = (e) => {
      for (var r = 0, i = 0; i < e.length; ++i) {
        var s = e.charCodeAt(i);
        127 >= s ? r++ : 2047 >= s ? r += 2 : 55296 <= s && 57343 >= s ? (r += 4, ++i) : r += 3;
      }
      return r;
    }, rt2 = (e) => {
      var r;
      return (r = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e)) ? +r[1] : (r = /:(\d+):\d+(?:\)|$)/.exec(e)) ? 2147483648 | +r[1] : 0;
    }, jn = (e) => {
      for (var r of e) (e = rt2(r)) && (Ie[e] = r);
    };
    function ra() {
      var e = Error().stack.toString().split(`
`);
      return e[0] == "Error" && e.shift(), jn(e), Ie.Wb = rt2(e[3]), Ie.ac = e, Ie.Wb;
    }
    function ot2(e) {
      if (!(e = Ie[e >>> 0])) return 0;
      var r;
      if (r = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e)) e = r[1];
      else if (r = /^\s+at (.*) \(.*\)$/.exec(e)) e = r[1];
      else {
        if (!(r = /^(.+?)@/.exec(e))) return 0;
        e = r[1];
      }
      Kn(ot2.Xb ?? 0), r = Wt(e) + 1;
      var i = er2(r);
      return i && Ae(e, i, r), ot2.Xb = i, ot2.Xb;
    }
    function oa(e) {
      e >>>= 0;
      var r = (w(), ne).length;
      if (e <= r || 4294901760 < e) return false;
      for (var i = 1; 4 >= i; i *= 2) {
        var s = r * (1 + 0.2 / i);
        s = Math.min(s, e + 100663296);
        e: {
          s = (Math.min(4294901760, 65536 * Math.ceil(Math.max(e, s) / 65536)) - ge.buffer.byteLength + 65535) / 65536 | 0;
          try {
            ge.grow(s), ee2();
            var f = 1;
            break e;
          } catch {
          }
          f = void 0;
        }
        if (f) return true;
      }
      return false;
    }
    function aa(e, r, i) {
      if (e >>>= 0, r >>>= 0, Ie.Wb == e) var s = Ie.ac;
      else (s = Error().stack.toString().split(`
`))[0] == "Error" && s.shift(), jn(s);
      for (var f = 3; s[f] && rt2(s[f]) != e; ) ++f;
      for (e = 0; e < i && s[e + f]; ++e) (w(), B)[r + 4 * e >>> 2 >>> 0] = rt2(s[e + f]);
      return e;
    }
    var Gt, $t = {}, Vn = () => {
      if (!Gt) {
        var e, r = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8", _: "./this.program" };
        for (e in $t) $t[e] === void 0 ? delete r[e] : r[e] = $t[e];
        var i = [];
        for (e in r) i.push(`${e}=${r[e]}`);
        Gt = i;
      }
      return Gt;
    };
    function Yn(e, r) {
      if (o) return L(19, 1, e, r);
      e >>>= 0, r >>>= 0;
      var i, s = 0, f = 0;
      for (i of Vn()) {
        var p = r + s;
        (w(), W)[e + f >>> 2 >>> 0] = p, s += Ae(i, p, 1 / 0) + 1, f += 4;
      }
      return 0;
    }
    function Jn(e, r) {
      if (o) return L(20, 1, e, r);
      e >>>= 0, r >>>= 0;
      var i = Vn();
      for (var s of ((w(), W)[e >>> 2 >>> 0] = i.length, e = 0, i)) e += Wt(s) + 1;
      return (w(), W)[r >>> 2 >>> 0] = e, 0;
    }
    function qn(e) {
      return o ? L(21, 1, e) : 52;
    }
    function Xn(e, r, i, s) {
      return o ? L(22, 1, e, r, i, s) : 52;
    }
    function Zn(e, r, i, s) {
      return o ? L(23, 1, e, r, i, s) : 70;
    }
    var sa = [null, [], []];
    function Qn(e, r, i, s) {
      if (o) return L(24, 1, e, r, i, s);
      r >>>= 0, i >>>= 0, s >>>= 0;
      for (var f = 0, p = 0; p < i; p++) {
        var E = (w(), W)[r >>> 2 >>> 0], S = (w(), W)[r + 4 >>> 2 >>> 0];
        r += 8;
        for (var M = 0; M < S; M++) {
          var R = e, X = (w(), ne)[E + M >>> 0], le = sa[R];
          X === 0 || X === 10 ? ((R === 1 ? O : F2)(An(le)), le.length = 0) : le.push(X);
        }
        f += S;
      }
      return (w(), W)[s >>> 2 >>> 0] = f, 0;
    }
    function ia(e) {
      return e >>> 0;
    }
    o || (function() {
      for (var e = t.numThreads - 1; e--; ) yn2();
      je.push(async () => {
        var r = (async function() {
          if (!o) return Promise.all(ce2.map(bn2));
        })();
        Re++, await r, --Re == 0 && te && (r = te, te = null, r());
      });
    })(), o || (ge = new WebAssembly.Memory({ initial: 256, maximum: 65536, shared: true }), ee2()), t.wasmBinary && (g = t.wasmBinary), t.stackSave = () => _(), t.stackRestore = (e) => P(e), t.stackAlloc = (e) => jt2(e), t.setValue = function(e, r, i = "i8") {
      switch (i.endsWith("*") && (i = "*"), i) {
        case "i1":
        case "i8":
          (w(), j)[e >>> 0] = r;
          break;
        case "i16":
          (w(), pe)[e >>> 1 >>> 0] = r;
          break;
        case "i32":
          (w(), B)[e >>> 2 >>> 0] = r;
          break;
        case "i64":
          (w(), A)[e >>> 3 >>> 0] = BigInt(r);
          break;
        case "float":
          (w(), re)[e >>> 2 >>> 0] = r;
          break;
        case "double":
          (w(), me)[e >>> 3 >>> 0] = r;
          break;
        case "*":
          (w(), W)[e >>> 2 >>> 0] = r;
          break;
        default:
          H(`invalid type for setValue: ${i}`);
      }
    }, t.getValue = function(e, r = "i8") {
      switch (r.endsWith("*") && (r = "*"), r) {
        case "i1":
        case "i8":
          return (w(), j)[e >>> 0];
        case "i16":
          return (w(), pe)[e >>> 1 >>> 0];
        case "i32":
          return (w(), B)[e >>> 2 >>> 0];
        case "i64":
          return (w(), A)[e >>> 3 >>> 0];
        case "float":
          return (w(), re)[e >>> 2 >>> 0];
        case "double":
          return (w(), me)[e >>> 3 >>> 0];
        case "*":
          return (w(), W)[e >>> 2 >>> 0];
        default:
          H(`invalid type for getValue: ${r}`);
      }
    }, t.UTF8ToString = Ct, t.stringToUTF8 = Ae, t.lengthBytesUTF8 = Wt;
    var at2, Kn, er2, zt, tr2, nr2, rr2, Ht2, or2, ar2, x, Ye, sr2, P, jt2, _, ir2, Vt, ur2, fr2, cr2, Ee2, ua = [V2, fe, Sn, In, Bn, Ln, Pn, Dn, _n, Un, xn, Mn, Cn, Rn, Fn, Nn, $n, zn, Hn, Yn, Jn, qn, Xn, Zn, Qn], lr2 = { 887900: (e, r, i, s, f) => {
      if (t === void 0 || !t.Sb) return 1;
      if ((e = Ct(Number(e >>> 0))).startsWith("./") && (e = e.substring(2)), !(e = t.Sb.get(e))) return 2;
      if (r = Number(r >>> 0), i = Number(i >>> 0), s = Number(s >>> 0), r + i > e.byteLength) return 3;
      try {
        let p = e.subarray(r, r + i);
        switch (f) {
          case 0:
            (w(), ne).set(p, s >>> 0);
            break;
          case 1:
            t.hc ? t.hc(s, p) : t.jc(s, p);
            break;
          default:
            return 4;
        }
        return 0;
      } catch {
        return 4;
      }
    }, 888724: () => typeof wasmOffsetConverter < "u" };
    function fa() {
      return typeof wasmOffsetConverter < "u";
    }
    function ca(e, r, i, s) {
      var f = _();
      try {
        return C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function la(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        x(1, 0);
      }
    }
    function da(e, r, i) {
      var s = _();
      try {
        C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        x(1, 0);
      }
    }
    function pa(e, r) {
      var i = _();
      try {
        return C(e)(r);
      } catch (s) {
        if (P(i), s !== s + 0) throw s;
        x(1, 0);
      }
    }
    function ma(e) {
      var r = _();
      try {
        C(e)();
      } catch (i) {
        if (P(r), i !== i + 0) throw i;
        x(1, 0);
      }
    }
    function ha(e, r, i, s, f, p, E) {
      var S = _();
      try {
        return C(e)(r, i, s, f, p, E);
      } catch (M) {
        if (P(S), M !== M + 0) throw M;
        x(1, 0);
      }
    }
    function wa(e, r) {
      var i = _();
      try {
        C(e)(r);
      } catch (s) {
        if (P(i), s !== s + 0) throw s;
        x(1, 0);
      }
    }
    function ba(e, r, i, s, f, p) {
      var E = _();
      try {
        C(e)(r, i, s, f, p);
      } catch (S) {
        if (P(E), S !== S + 0) throw S;
        x(1, 0);
      }
    }
    function ya(e, r, i, s) {
      var f = _();
      try {
        C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function ga(e, r, i, s, f) {
      var p = _();
      try {
        C(e)(r, i, s, f);
      } catch (E) {
        if (P(p), E !== E + 0) throw E;
        x(1, 0);
      }
    }
    function Ea(e, r, i, s, f, p, E) {
      var S = _();
      try {
        C(e)(r, i, s, f, p, E);
      } catch (M) {
        if (P(S), M !== M + 0) throw M;
        x(1, 0);
      }
    }
    function Ta(e, r, i, s, f, p, E) {
      var S = _();
      try {
        C(e)(r, i, s, f, p, E);
      } catch (M) {
        if (P(S), M !== M + 0) throw M;
        x(1, 0);
      }
    }
    function Sa(e, r, i, s, f, p, E, S) {
      var M = _();
      try {
        C(e)(r, i, s, f, p, E, S);
      } catch (R) {
        if (P(M), R !== R + 0) throw R;
        x(1, 0);
      }
    }
    function va(e, r, i, s, f) {
      var p = _();
      try {
        return C(e)(r, i, s, f);
      } catch (E) {
        if (P(p), E !== E + 0) throw E;
        x(1, 0);
      }
    }
    function Oa2(e, r, i, s, f, p, E, S) {
      var M = _();
      try {
        C(e)(r, i, s, f, p, E, S);
      } catch (R) {
        if (P(M), R !== R + 0) throw R;
        x(1, 0);
      }
    }
    function Aa(e, r, i, s, f, p, E, S, M, R, X, le) {
      var we = _();
      try {
        C(e)(r, i, s, f, p, E, S, M, R, X, le);
      } catch (be2) {
        if (P(we), be2 !== be2 + 0) throw be2;
        x(1, 0);
      }
    }
    function Ia(e, r, i, s, f, p) {
      var E = _();
      try {
        return C(e)(r, i, s, f, p);
      } catch (S) {
        if (P(E), S !== S + 0) throw S;
        x(1, 0);
      }
    }
    function Ba2(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        return x(1, 0), 0n;
      }
    }
    function La2(e, r, i, s, f, p, E, S, M) {
      var R = _();
      try {
        C(e)(r, i, s, f, p, E, S, M);
      } catch (X) {
        if (P(R), X !== X + 0) throw X;
        x(1, 0);
      }
    }
    function Pa2(e) {
      var r = _();
      try {
        return C(e)();
      } catch (i) {
        if (P(r), i !== i + 0) throw i;
        x(1, 0);
      }
    }
    function Da2(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        x(1, 0);
      }
    }
    function _a2(e, r) {
      var i = _();
      try {
        return C(e)(r);
      } catch (s) {
        if (P(i), s !== s + 0) throw s;
        return x(1, 0), 0n;
      }
    }
    function Ua2(e, r, i, s, f) {
      var p = _();
      try {
        C(e)(r, i, s, f);
      } catch (E) {
        if (P(p), E !== E + 0) throw E;
        x(1, 0);
      }
    }
    function xa(e) {
      var r = _();
      try {
        return C(e)();
      } catch (i) {
        if (P(r), i !== i + 0) throw i;
        return x(1, 0), 0n;
      }
    }
    function Ma2(e, r, i, s, f, p) {
      var E = _();
      try {
        return C(e)(r, i, s, f, p);
      } catch (S) {
        if (P(E), S !== S + 0) throw S;
        x(1, 0);
      }
    }
    function Ca2(e, r, i, s, f, p) {
      var E = _();
      try {
        return C(e)(r, i, s, f, p);
      } catch (S) {
        if (P(E), S !== S + 0) throw S;
        x(1, 0);
      }
    }
    function Ra2(e, r, i, s, f, p, E, S) {
      var M = _();
      try {
        return C(e)(r, i, s, f, p, E, S);
      } catch (R) {
        if (P(M), R !== R + 0) throw R;
        x(1, 0);
      }
    }
    function Fa2(e, r, i, s, f) {
      var p = _();
      try {
        return C(e)(r, i, s, f);
      } catch (E) {
        if (P(p), E !== E + 0) throw E;
        return x(1, 0), 0n;
      }
    }
    function Na2(e, r, i, s) {
      var f = _();
      try {
        return C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function ka2(e, r, i, s) {
      var f = _();
      try {
        return C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function Wa2(e, r, i, s, f, p, E, S, M, R, X, le) {
      var we = _();
      try {
        return C(e)(r, i, s, f, p, E, S, M, R, X, le);
      } catch (be2) {
        if (P(we), be2 !== be2 + 0) throw be2;
        x(1, 0);
      }
    }
    function Ga2(e, r, i, s, f, p, E, S, M, R, X) {
      var le = _();
      try {
        C(e)(r, i, s, f, p, E, S, M, R, X);
      } catch (we) {
        if (P(le), we !== we + 0) throw we;
        x(1, 0);
      }
    }
    function $a2(e, r, i, s, f, p, E, S, M, R, X, le, we, be2, Ja2, qa2) {
      var Xa2 = _();
      try {
        C(e)(r, i, s, f, p, E, S, M, R, X, le, we, be2, Ja2, qa2);
      } catch (Yt2) {
        if (P(Xa2), Yt2 !== Yt2 + 0) throw Yt2;
        x(1, 0);
      }
    }
    function za2(e, r, i, s) {
      var f = _();
      try {
        return C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function Ha2(e, r, i, s, f) {
      var p = _();
      try {
        return C(e)(r, i, s, f);
      } catch (E) {
        if (P(p), E !== E + 0) throw E;
        x(1, 0);
      }
    }
    function ja2(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        x(1, 0);
      }
    }
    function Va2(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        x(1, 0);
      }
    }
    function Ya2(e, r, i, s) {
      var f = _();
      try {
        C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function st2() {
      if (0 < Re) te = st2;
      else if (o) T?.(t), he2();
      else {
        for (var e = je; 0 < e.length; ) e.shift()(t);
        0 < Re ? te = st2 : (t.calledRun = true, D || (he2(), T?.(t)));
      }
    }
    return o || (Ee2 = await Ut(), st2()), t.PTR_SIZE = 4, He2 ? t : new Promise((e, r) => {
      T = e, I = r;
    });
  }
  var import_meta2, Jt2, Za2, Qa2, Ka2, qt2, N, it2, es2, Xt2, ut2, Be, Je, ts2, dr2, Zt2, pr2, mr2, hr2, wr, J, Qt2, Y, br2, yr2, gr, Er, Kt2, Tr, Sr, vr, Or, Ar, Ir, Le, qe, Br, Lr, Pr, Dr, _r, Ur, Z, ft, de2, en2, xr, Mr, Pe, De, _e, Ue, tn2, ct, Cr, ns2, Rr, Fr, Nr, kr, Wr, nn2, Te, lt, Hr, $r, zr, rs2, jr, Yr, os2, as2, Jr2, Zr2, an2, ss2, oe, Qr2, on2, is2, us2, Kr2, fs2, qr2, eo, Xr2, to, dt, sn2, un2, Tt, no, cs2, ls2, ds2, pt, $, xe2, ae, Ze, G, St, ro, oo, ps2, ms2, hs2, vt, ws2, ao, so, ke, Ot2, We, io, uo, At2, It2, fo, fn2, Qe2, cn2, bs2, mt, ht2, Ge2, ys2, co, Xe, wt, bt2, lo, yt2, gt, Et, rn2, Ce, ie, Ke2, Lt2, Pt, Bt2, ln2, dn2, $e2, ze2, Es2, po, mo, ho, wo, bo, yo, go, pn2, Eo, Ts2, Dt, To, vo, So, _t, Ss2, Oo, Gr, su;
  var init_ort_wasm_bundle_min = __esm({
    "node_modules/onnxruntime-web/dist/ort.wasm.bundle.min.mjs"() {
      import_meta2 = {};
      Jt2 = Object.defineProperty;
      Za2 = Object.getOwnPropertyDescriptor;
      Qa2 = Object.getOwnPropertyNames;
      Ka2 = Object.prototype.hasOwnProperty;
      qt2 = ((n) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(n, { get: (t, a) => (typeof __require < "u" ? __require : t)[a] }) : n)(function(n) {
        if (typeof __require < "u") return __require.apply(this, arguments);
        throw Error('Dynamic require of "' + n + '" is not supported');
      });
      N = (n, t) => () => (n && (t = n(n = 0)), t);
      it2 = (n, t) => {
        for (var a in t) Jt2(n, a, { get: t[a], enumerable: true });
      };
      es2 = (n, t, a, u) => {
        if (t && typeof t == "object" || typeof t == "function") for (let o of Qa2(t)) !Ka2.call(n, o) && o !== a && Jt2(n, o, { get: () => t[o], enumerable: !(u = Za2(t, o)) || u.enumerable });
        return n;
      };
      Xt2 = (n) => es2(Jt2({}, "__esModule", { value: true }), n);
      Zt2 = N(() => {
        "use strict";
        ut2 = /* @__PURE__ */ new Map(), Be = [], Je = (n, t, a) => {
          if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
            let u = ut2.get(n);
            if (u === void 0) ut2.set(n, { backend: t, priority: a });
            else {
              if (u.priority > a) return;
              if (u.priority === a && u.backend !== t) throw new Error(`cannot register backend "${n}" using priority ${a}`);
            }
            if (a >= 0) {
              let o = Be.indexOf(n);
              o !== -1 && Be.splice(o, 1);
              for (let d = 0; d < Be.length; d++) if (ut2.get(Be[d]).priority <= a) {
                Be.splice(d, 0, n);
                return;
              }
              Be.push(n);
            }
            return;
          }
          throw new TypeError("not a valid backend");
        }, ts2 = async (n) => {
          let t = ut2.get(n);
          if (!t) return "backend not found.";
          if (t.initialized) return t.backend;
          if (t.aborted) return t.error;
          {
            let a = !!t.initPromise;
            try {
              return a || (t.initPromise = t.backend.init(n)), await t.initPromise, t.initialized = true, t.backend;
            } catch (u) {
              return a || (t.error = `${u}`, t.aborted = true), t.error;
            } finally {
              delete t.initPromise;
            }
          }
        }, dr2 = async (n) => {
          let t = n.executionProviders || [], a = t.map((m) => typeof m == "string" ? m : m.name), u = a.length === 0 ? Be : a, o, d = [], c = /* @__PURE__ */ new Set();
          for (let m of u) {
            let h = await ts2(m);
            typeof h == "string" ? d.push({ name: m, err: h }) : (o || (o = h), o === h && c.add(m));
          }
          if (!o) throw new Error(`no available backend found. ERR: ${d.map((m) => `[${m.name}] ${m.err}`).join(", ")}`);
          for (let { name: m, err: h } of d) a.includes(m) && console.warn(`removing requested execution provider "${m}" from session options because it is not available: ${h}`);
          let l = t.filter((m) => c.has(typeof m == "string" ? m : m.name));
          return [o, new Proxy(n, { get: (m, h) => h === "executionProviders" ? l : Reflect.get(m, h) })];
        };
      });
      pr2 = N(() => {
        "use strict";
        Zt2();
      });
      hr2 = N(() => {
        "use strict";
        mr2 = "1.24.3";
      });
      Qt2 = N(() => {
        "use strict";
        hr2();
        wr = "warning", J = { wasm: {}, webgl: {}, webgpu: {}, versions: { common: mr2 }, set logLevel(n) {
          if (n !== void 0) {
            if (typeof n != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(n) === -1) throw new Error(`Unsupported logging level: ${n}`);
            wr = n;
          }
        }, get logLevel() {
          return wr;
        } };
        Object.defineProperty(J, "logLevel", { enumerable: true });
      });
      br2 = N(() => {
        "use strict";
        Qt2();
        Y = J;
      });
      Er = N(() => {
        "use strict";
        yr2 = (n, t) => {
          let a = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
          a.width = n.dims[3], a.height = n.dims[2];
          let u = a.getContext("2d");
          if (u != null) {
            let o, d;
            t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (o = n.dims[2], d = n.dims[3]) : (o = n.dims[3], d = n.dims[2]);
            let c = t?.format !== void 0 ? t.format : "RGB", l = t?.norm, m, h;
            l === void 0 || l.mean === void 0 ? m = [255, 255, 255, 255] : typeof l.mean == "number" ? m = [l.mean, l.mean, l.mean, l.mean] : (m = [l.mean[0], l.mean[1], l.mean[2], 0], l.mean[3] !== void 0 && (m[3] = l.mean[3])), l === void 0 || l.bias === void 0 ? h = [0, 0, 0, 0] : typeof l.bias == "number" ? h = [l.bias, l.bias, l.bias, l.bias] : (h = [l.bias[0], l.bias[1], l.bias[2], 0], l.bias[3] !== void 0 && (h[3] = l.bias[3]));
            let g = d * o, b = 0, y = g, T = g * 2, I = -1;
            c === "RGBA" ? (b = 0, y = g, T = g * 2, I = g * 3) : c === "RGB" ? (b = 0, y = g, T = g * 2) : c === "RBG" && (b = 0, T = g, y = g * 2);
            for (let U = 0; U < d; U++) for (let z2 = 0; z2 < o; z2++) {
              let v = (n.data[b++] - h[0]) * m[0], O = (n.data[y++] - h[1]) * m[1], F2 = (n.data[T++] - h[2]) * m[2], D = I === -1 ? 255 : (n.data[I++] - h[3]) * m[3];
              u.fillStyle = "rgba(" + v + "," + O + "," + F2 + "," + D + ")", u.fillRect(z2, U, 1, 1);
            }
            if ("toDataURL" in a) return a.toDataURL();
            throw new Error("toDataURL is not supported");
          } else throw new Error("Can not access image data");
        }, gr = (n, t) => {
          let a = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), u;
          if (a != null) {
            let o, d, c;
            t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (o = n.dims[2], d = n.dims[1], c = n.dims[3]) : (o = n.dims[3], d = n.dims[2], c = n.dims[1]);
            let l = t !== void 0 && t.format !== void 0 ? t.format : "RGB", m = t?.norm, h, g;
            m === void 0 || m.mean === void 0 ? h = [255, 255, 255, 255] : typeof m.mean == "number" ? h = [m.mean, m.mean, m.mean, m.mean] : (h = [m.mean[0], m.mean[1], m.mean[2], 255], m.mean[3] !== void 0 && (h[3] = m.mean[3])), m === void 0 || m.bias === void 0 ? g = [0, 0, 0, 0] : typeof m.bias == "number" ? g = [m.bias, m.bias, m.bias, m.bias] : (g = [m.bias[0], m.bias[1], m.bias[2], 0], m.bias[3] !== void 0 && (g[3] = m.bias[3]));
            let b = d * o;
            if (t !== void 0 && (t.format !== void 0 && c === 4 && t.format !== "RGBA" || c === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
            let y = 4, T = 0, I = 1, U = 2, z2 = 3, v = 0, O = b, F2 = b * 2, D = -1;
            l === "RGBA" ? (v = 0, O = b, F2 = b * 2, D = b * 3) : l === "RGB" ? (v = 0, O = b, F2 = b * 2) : l === "RBG" && (v = 0, F2 = b, O = b * 2), u = a.createImageData(o, d);
            for (let k = 0; k < d * o; T += y, I += y, U += y, z2 += y, k++) u.data[T] = (n.data[v++] - g[0]) * h[0], u.data[I] = (n.data[O++] - g[1]) * h[1], u.data[U] = (n.data[F2++] - g[2]) * h[2], u.data[z2] = D === -1 ? 255 : (n.data[D++] - g[3]) * h[3];
          } else throw new Error("Can not access image data");
          return u;
        };
      });
      Ir = N(() => {
        "use strict";
        ft();
        Kt2 = (n, t) => {
          if (n === void 0) throw new Error("Image buffer must be defined");
          if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
          if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
          let { height: a, width: u } = t, o = t.norm ?? { mean: 255, bias: 0 }, d, c;
          typeof o.mean == "number" ? d = [o.mean, o.mean, o.mean, o.mean] : d = [o.mean[0], o.mean[1], o.mean[2], o.mean[3] ?? 255], typeof o.bias == "number" ? c = [o.bias, o.bias, o.bias, o.bias] : c = [o.bias[0], o.bias[1], o.bias[2], o.bias[3] ?? 0];
          let l = t.format !== void 0 ? t.format : "RGBA", m = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", h = a * u, g = m === "RGBA" ? new Float32Array(h * 4) : new Float32Array(h * 3), b = 4, y = 0, T = 1, I = 2, U = 3, z2 = 0, v = h, O = h * 2, F2 = -1;
          l === "RGB" && (b = 3, y = 0, T = 1, I = 2, U = -1), m === "RGBA" ? F2 = h * 3 : m === "RBG" ? (z2 = 0, O = h, v = h * 2) : m === "BGR" && (O = 0, v = h, z2 = h * 2);
          for (let k = 0; k < h; k++, y += b, I += b, T += b, U += b) g[z2++] = (n[y] + c[0]) / d[0], g[v++] = (n[T] + c[1]) / d[1], g[O++] = (n[I] + c[2]) / d[2], F2 !== -1 && U !== -1 && (g[F2++] = (n[U] + c[3]) / d[3]);
          return m === "RGBA" ? new Z("float32", g, [1, 4, a, u]) : new Z("float32", g, [1, 3, a, u]);
        }, Tr = async (n, t) => {
          let a = typeof HTMLImageElement < "u" && n instanceof HTMLImageElement, u = typeof ImageData < "u" && n instanceof ImageData, o = typeof ImageBitmap < "u" && n instanceof ImageBitmap, d = typeof n == "string", c, l = t ?? {}, m = () => {
            if (typeof document < "u") return document.createElement("canvas");
            if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
            throw new Error("Canvas is not supported");
          }, h = (g) => typeof HTMLCanvasElement < "u" && g instanceof HTMLCanvasElement || g instanceof OffscreenCanvas ? g.getContext("2d") : null;
          if (a) {
            let g = m();
            g.width = n.width, g.height = n.height;
            let b = h(g);
            if (b != null) {
              let y = n.height, T = n.width;
              if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (y = t.resizedHeight, T = t.resizedWidth), t !== void 0) {
                if (l = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
                l.tensorFormat = "RGBA", l.height = y, l.width = T;
              } else l.tensorFormat = "RGBA", l.height = y, l.width = T;
              b.drawImage(n, 0, 0), c = b.getImageData(0, 0, T, y).data;
            } else throw new Error("Can not access image data");
          } else if (u) {
            let g, b;
            if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (g = t.resizedHeight, b = t.resizedWidth) : (g = n.height, b = n.width), t !== void 0 && (l = t), l.format = "RGBA", l.height = g, l.width = b, t !== void 0) {
              let y = m();
              y.width = b, y.height = g;
              let T = h(y);
              if (T != null) T.putImageData(n, 0, 0), c = T.getImageData(0, 0, b, g).data;
              else throw new Error("Can not access image data");
            } else c = n.data;
          } else if (o) {
            if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
            let g = m();
            g.width = n.width, g.height = n.height;
            let b = h(g);
            if (b != null) {
              let y = n.height, T = n.width;
              return b.drawImage(n, 0, 0, T, y), c = b.getImageData(0, 0, T, y).data, l.height = y, l.width = T, Kt2(c, l);
            } else throw new Error("Can not access image data");
          } else {
            if (d) return new Promise((g, b) => {
              let y = m(), T = h(y);
              if (!n || !T) return b();
              let I = new Image();
              I.crossOrigin = "Anonymous", I.src = n, I.onload = () => {
                y.width = I.width, y.height = I.height, T.drawImage(I, 0, 0, y.width, y.height);
                let U = T.getImageData(0, 0, y.width, y.height);
                l.height = y.height, l.width = y.width, g(Kt2(U.data, l));
              };
            });
            throw new Error("Input data provided is not supported - aborted tensor creation");
          }
          if (c !== void 0) return Kt2(c, l);
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }, Sr = (n, t) => {
          let { width: a, height: u, download: o, dispose: d } = t, c = [1, u, a, 4];
          return new Z({ location: "texture", type: "float32", texture: n, dims: c, download: o, dispose: d });
        }, vr = (n, t) => {
          let { dataType: a, dims: u, download: o, dispose: d } = t;
          return new Z({ location: "gpu-buffer", type: a ?? "float32", gpuBuffer: n, dims: u, download: o, dispose: d });
        }, Or = (n, t) => {
          let { dataType: a, dims: u, download: o, dispose: d } = t;
          return new Z({ location: "ml-tensor", type: a ?? "float32", mlTensor: n, dims: u, download: o, dispose: d });
        }, Ar = (n, t, a) => new Z({ location: "cpu-pinned", type: n, data: t, dims: a ?? [t.length] });
      });
      Pr = N(() => {
        "use strict";
        Le = /* @__PURE__ */ new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), qe = /* @__PURE__ */ new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), Br = false, Lr = () => {
          if (!Br) {
            Br = true;
            let n = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, a = globalThis.Float16Array, u = typeof a < "u" && a.from;
            n && (Le.set("int64", BigInt64Array), qe.set(BigInt64Array, "int64")), t && (Le.set("uint64", BigUint64Array), qe.set(BigUint64Array, "uint64")), u ? (Le.set("float16", a), qe.set(a, "float16")) : Le.set("float16", Uint16Array);
          }
        };
      });
      Ur = N(() => {
        "use strict";
        ft();
        Dr = (n) => {
          let t = 1;
          for (let a = 0; a < n.length; a++) {
            let u = n[a];
            if (typeof u != "number" || !Number.isSafeInteger(u)) throw new TypeError(`dims[${a}] must be an integer, got: ${u}`);
            if (u < 0) throw new RangeError(`dims[${a}] must be a non-negative integer, got: ${u}`);
            t *= u;
          }
          return t;
        }, _r = (n, t) => {
          switch (n.location) {
            case "cpu":
              return new Z(n.type, n.data, t);
            case "cpu-pinned":
              return new Z({ location: "cpu-pinned", data: n.data, type: n.type, dims: t });
            case "texture":
              return new Z({ location: "texture", texture: n.texture, type: n.type, dims: t });
            case "gpu-buffer":
              return new Z({ location: "gpu-buffer", gpuBuffer: n.gpuBuffer, type: n.type, dims: t });
            case "ml-tensor":
              return new Z({ location: "ml-tensor", mlTensor: n.mlTensor, type: n.type, dims: t });
            default:
              throw new Error(`tensorReshape: tensor location ${n.location} is not supported`);
          }
        };
      });
      ft = N(() => {
        "use strict";
        Er();
        Ir();
        Pr();
        Ur();
        Z = class {
          constructor(t, a, u) {
            Lr();
            let o, d;
            if (typeof t == "object" && "location" in t) switch (this.dataLocation = t.location, o = t.type, d = t.dims, t.location) {
              case "cpu-pinned": {
                let l = Le.get(o);
                if (!l) throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);
                if (!(t.data instanceof l)) throw new TypeError(`buffer should be of type ${l.name}`);
                this.cpuData = t.data;
                break;
              }
              case "texture": {
                if (o !== "float32") throw new TypeError(`unsupported type "${o}" to create tensor from texture`);
                this.gpuTextureData = t.texture, this.downloader = t.download, this.disposer = t.dispose;
                break;
              }
              case "gpu-buffer": {
                if (o !== "float32" && o !== "float16" && o !== "int32" && o !== "int64" && o !== "uint32" && o !== "uint8" && o !== "bool" && o !== "uint4" && o !== "int4") throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);
                this.gpuBufferData = t.gpuBuffer, this.downloader = t.download, this.disposer = t.dispose;
                break;
              }
              case "ml-tensor": {
                if (o !== "float32" && o !== "float16" && o !== "int32" && o !== "int64" && o !== "uint32" && o !== "uint64" && o !== "int8" && o !== "uint8" && o !== "bool" && o !== "uint4" && o !== "int4") throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);
                this.mlTensorData = t.mlTensor, this.downloader = t.download, this.disposer = t.dispose;
                break;
              }
              default:
                throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
            }
            else {
              let l, m;
              if (typeof t == "string") if (o = t, m = u, t === "string") {
                if (!Array.isArray(a)) throw new TypeError("A string tensor's data must be a string array.");
                l = a;
              } else {
                let h = Le.get(t);
                if (h === void 0) throw new TypeError(`Unsupported tensor type: ${t}.`);
                if (Array.isArray(a)) {
                  if (t === "float16" && h === Uint16Array || t === "uint4" || t === "int4") throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${h.name} as data.`);
                  t === "uint64" || t === "int64" ? l = h.from(a, BigInt) : l = h.from(a);
                } else if (a instanceof h) l = a;
                else if (a instanceof Uint8ClampedArray) if (t === "uint8") l = Uint8Array.from(a);
                else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
                else if (t === "float16" && a instanceof Uint16Array && h !== Uint16Array) l = new globalThis.Float16Array(a.buffer, a.byteOffset, a.length);
                else throw new TypeError(`A ${o} tensor's data must be type of ${h}`);
              }
              else if (m = a, Array.isArray(t)) {
                if (t.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
                let h = typeof t[0];
                if (h === "string") o = "string", l = t;
                else if (h === "boolean") o = "bool", l = Uint8Array.from(t);
                else throw new TypeError(`Invalid element type of data array: ${h}.`);
              } else if (t instanceof Uint8ClampedArray) o = "uint8", l = Uint8Array.from(t);
              else {
                let h = qe.get(t.constructor);
                if (h === void 0) throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);
                o = h, l = t;
              }
              if (m === void 0) m = [l.length];
              else if (!Array.isArray(m)) throw new TypeError("A tensor's dims must be a number array");
              d = m, this.cpuData = l, this.dataLocation = "cpu";
            }
            let c = Dr(d);
            if (this.cpuData && c !== this.cpuData.length && !((o === "uint4" || o === "int4") && Math.ceil(c / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${c}) does not match data length(${this.cpuData.length}).`);
            this.type = o, this.dims = d, this.size = c;
          }
          static async fromImage(t, a) {
            return Tr(t, a);
          }
          static fromTexture(t, a) {
            return Sr(t, a);
          }
          static fromGpuBuffer(t, a) {
            return vr(t, a);
          }
          static fromMLTensor(t, a) {
            return Or(t, a);
          }
          static fromPinnedBuffer(t, a, u) {
            return Ar(t, a, u);
          }
          toDataURL(t) {
            return yr2(this, t);
          }
          toImageData(t) {
            return gr(this, t);
          }
          get data() {
            if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
            return this.cpuData;
          }
          get location() {
            return this.dataLocation;
          }
          get texture() {
            if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
            return this.gpuTextureData;
          }
          get gpuBuffer() {
            if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
            return this.gpuBufferData;
          }
          get mlTensor() {
            if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
            return this.mlTensorData;
          }
          async getData(t) {
            switch (this.ensureValid(), this.dataLocation) {
              case "cpu":
              case "cpu-pinned":
                return this.data;
              case "texture":
              case "gpu-buffer":
              case "ml-tensor": {
                if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
                if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
                try {
                  this.isDownloading = true;
                  let a = await this.downloader();
                  return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = a, t && this.disposer && (this.disposer(), this.disposer = void 0), a;
                } finally {
                  this.isDownloading = false;
                }
              }
              default:
                throw new Error(`cannot get data from location: ${this.dataLocation}`);
            }
          }
          dispose() {
            if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
            this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
          }
          ensureValid() {
            if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
          }
          reshape(t) {
            if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
            return _r(this, t);
          }
        };
      });
      en2 = N(() => {
        "use strict";
        ft();
        de2 = Z;
      });
      tn2 = N(() => {
        "use strict";
        Qt2();
        xr = (n, t) => {
          (typeof J.trace > "u" ? !J.wasm.trace : !J.trace) || console.timeStamp(`${n}::ORT::${t}`);
        }, Mr = (n, t) => {
          let a = new Error().stack?.split(/\r\n|\r|\n/g) || [], u = false;
          for (let o = 0; o < a.length; o++) {
            if (u && !a[o].includes("TRACE_FUNC")) {
              let d = `FUNC_${n}::${a[o].trim().split(" ")[1]}`;
              t && (d += `::${t}`), xr("CPU", d);
              return;
            }
            a[o].includes("TRACE_FUNC") && (u = true);
          }
        }, Pe = (n) => {
          (typeof J.trace > "u" ? !J.wasm.trace : !J.trace) || Mr("BEGIN", n);
        }, De = (n) => {
          (typeof J.trace > "u" ? !J.wasm.trace : !J.trace) || Mr("END", n);
        }, _e = (n) => {
          (typeof J.trace > "u" ? !J.wasm.trace : !J.trace) || console.time(`ORT::${n}`);
        }, Ue = (n) => {
          (typeof J.trace > "u" ? !J.wasm.trace : !J.trace) || console.timeEnd(`ORT::${n}`);
        };
      });
      Cr = N(() => {
        "use strict";
        Zt2();
        en2();
        tn2();
        ct = class n {
          constructor(t) {
            this.handler = t;
          }
          async run(t, a, u) {
            Pe(), _e("InferenceSession.run");
            let o = {}, d = {};
            if (typeof t != "object" || t === null || t instanceof de2 || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
            let c = true;
            if (typeof a == "object") {
              if (a === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
              if (a instanceof de2) throw new TypeError("'fetches' cannot be a Tensor");
              if (Array.isArray(a)) {
                if (a.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
                c = false;
                for (let h of a) {
                  if (typeof h != "string") throw new TypeError("'fetches' must be a string array or an object.");
                  if (this.outputNames.indexOf(h) === -1) throw new RangeError(`'fetches' contains invalid output name: ${h}.`);
                  o[h] = null;
                }
                if (typeof u == "object" && u !== null) d = u;
                else if (typeof u < "u") throw new TypeError("'options' must be an object.");
              } else {
                let h = false, g = Object.getOwnPropertyNames(a);
                for (let b of this.outputNames) if (g.indexOf(b) !== -1) {
                  let y = a[b];
                  (y === null || y instanceof de2) && (h = true, c = false, o[b] = y);
                }
                if (h) {
                  if (typeof u == "object" && u !== null) d = u;
                  else if (typeof u < "u") throw new TypeError("'options' must be an object.");
                } else d = a;
              }
            } else if (typeof a < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
            for (let h of this.inputNames) if (typeof t[h] > "u") throw new Error(`input '${h}' is missing in 'feeds'.`);
            if (c) for (let h of this.outputNames) o[h] = null;
            let l = await this.handler.run(t, o, d), m = {};
            for (let h in l) if (Object.hasOwnProperty.call(l, h)) {
              let g = l[h];
              g instanceof de2 ? m[h] = g : m[h] = new de2(g.type, g.data, g.dims);
            }
            return Ue("InferenceSession.run"), De(), m;
          }
          async release() {
            return this.handler.dispose();
          }
          static async create(t, a, u, o) {
            Pe(), _e("InferenceSession.create");
            let d, c = {};
            if (typeof t == "string") {
              if (d = t, typeof a == "object" && a !== null) c = a;
              else if (typeof a < "u") throw new TypeError("'options' must be an object.");
            } else if (t instanceof Uint8Array) {
              if (d = t, typeof a == "object" && a !== null) c = a;
              else if (typeof a < "u") throw new TypeError("'options' must be an object.");
            } else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
              let g = t, b = 0, y = t.byteLength;
              if (typeof a == "object" && a !== null) c = a;
              else if (typeof a == "number") {
                if (b = a, !Number.isSafeInteger(b)) throw new RangeError("'byteOffset' must be an integer.");
                if (b < 0 || b >= g.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${g.byteLength}).`);
                if (y = t.byteLength - b, typeof u == "number") {
                  if (y = u, !Number.isSafeInteger(y)) throw new RangeError("'byteLength' must be an integer.");
                  if (y <= 0 || b + y > g.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${g.byteLength - b}].`);
                  if (typeof o == "object" && o !== null) c = o;
                  else if (typeof o < "u") throw new TypeError("'options' must be an object.");
                } else if (typeof u < "u") throw new TypeError("'byteLength' must be a number.");
              } else if (typeof a < "u") throw new TypeError("'options' must be an object.");
              d = new Uint8Array(g, b, y);
            } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
            let [l, m] = await dr2(c), h = await l.createInferenceSessionHandler(d, m);
            return Ue("InferenceSession.create"), De(), new n(h);
          }
          startProfiling() {
            this.handler.startProfiling();
          }
          endProfiling() {
            this.handler.endProfiling();
          }
          get inputNames() {
            return this.handler.inputNames;
          }
          get outputNames() {
            return this.handler.outputNames;
          }
          get inputMetadata() {
            return this.handler.inputMetadata;
          }
          get outputMetadata() {
            return this.handler.outputMetadata;
          }
        };
      });
      Rr = N(() => {
        "use strict";
        Cr();
        ns2 = ct;
      });
      Fr = N(() => {
        "use strict";
      });
      Nr = N(() => {
        "use strict";
      });
      kr = N(() => {
        "use strict";
      });
      Wr = N(() => {
        "use strict";
      });
      nn2 = {};
      it2(nn2, { InferenceSession: () => ns2, TRACE: () => xr, TRACE_EVENT_BEGIN: () => _e, TRACE_EVENT_END: () => Ue, TRACE_FUNC_BEGIN: () => Pe, TRACE_FUNC_END: () => De, Tensor: () => de2, env: () => Y, registerBackend: () => Je });
      Te = N(() => {
        "use strict";
        pr2();
        br2();
        Rr();
        en2();
        Fr();
        Nr();
        tn2();
        kr();
        Wr();
      });
      lt = N(() => {
        "use strict";
      });
      Hr = {};
      it2(Hr, { default: () => rs2 });
      jr = N(() => {
        "use strict";
        rn2();
        xe2();
        dt();
        $r = "ort-wasm-proxy-worker", zr = globalThis.self?.name === $r;
        zr && (self.onmessage = (n) => {
          let { type: t, in: a } = n.data;
          try {
            switch (t) {
              case "init-wasm":
                pt(a.wasm).then(() => {
                  mt(a).then(() => {
                    postMessage({ type: t });
                  }, (u) => {
                    postMessage({ type: t, err: u });
                  });
                }, (u) => {
                  postMessage({ type: t, err: u });
                });
                break;
              case "init-ep": {
                let { epName: u, env: o } = a;
                ht2(o, u).then(() => {
                  postMessage({ type: t });
                }, (d) => {
                  postMessage({ type: t, err: d });
                });
                break;
              }
              case "copy-from": {
                let { buffer: u } = a, o = Xe(u);
                postMessage({ type: t, out: o });
                break;
              }
              case "create": {
                let { model: u, options: o } = a;
                wt(u, o).then((d) => {
                  postMessage({ type: t, out: d });
                }, (d) => {
                  postMessage({ type: t, err: d });
                });
                break;
              }
              case "release":
                bt2(a), postMessage({ type: t });
                break;
              case "run": {
                let { sessionId: u, inputIndices: o, inputs: d, outputIndices: c, options: l } = a;
                yt2(u, o, d, c, new Array(c.length).fill(null), l).then((m) => {
                  m.some((h) => h[3] !== "cpu") ? postMessage({ type: t, err: "Proxy does not support non-cpu tensor location." }) : postMessage({ type: t, out: m }, Et([...d, ...m]));
                }, (m) => {
                  postMessage({ type: t, err: m });
                });
                break;
              }
              case "end-profiling":
                gt(a), postMessage({ type: t });
                break;
              default:
            }
          } catch (u) {
            postMessage({ type: t, err: u });
          }
        });
        rs2 = zr ? null : (n) => new Worker(n ?? oe, { type: "module", name: $r });
      });
      Yr = {};
      it2(Yr, { default: () => os2 });
      Jr2 = N(() => {
        "use strict";
        os2 = Vr, as2 = globalThis.self?.name?.startsWith("em-pthread");
        as2 && Vr();
      });
      dt = N(() => {
        "use strict";
        lt();
        Zr2 = typeof location > "u" ? void 0 : location.origin, an2 = import_meta2.url > "file:" && import_meta2.url < "file;", ss2 = () => {
          if (true) {
            if (an2) {
              let n = URL;
              return new URL(new n("ort.wasm.bundle.min.mjs", import_meta2.url).href, Zr2).href;
            }
            return import_meta2.url;
          }
        }, oe = ss2(), Qr2 = () => {
          if (oe && !oe.startsWith("blob:")) return oe.substring(0, oe.lastIndexOf("/") + 1);
        }, on2 = (n, t) => {
          try {
            let a = t ?? oe;
            return (a ? new URL(n, a) : new URL(n)).origin === Zr2;
          } catch {
            return false;
          }
        }, is2 = (n, t) => {
          let a = t ?? oe;
          try {
            return (a ? new URL(n, a) : new URL(n)).href;
          } catch {
            return;
          }
        }, us2 = (n, t) => `${t ?? "./"}${n}`, Kr2 = async (n) => {
          let a = await (await fetch(n, { credentials: "same-origin" })).blob();
          return URL.createObjectURL(a);
        }, fs2 = async (n) => (await import(
          /*webpackIgnore:true*/
          /*@vite-ignore*/
          n
        )).default, qr2 = (jr(), Xt2(Hr)).default, eo = async () => {
          if (!oe) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
          if (on2(oe)) return [void 0, qr2()];
          let n = await Kr2(oe);
          return [n, qr2(n)];
        }, Xr2 = (Jr2(), Xt2(Yr)).default, to = async (n, t, a, u) => {
          let o = Xr2 && !(n || t);
          if (o) if (oe) o = on2(oe) || u && !a;
          else if (u && !a) o = true;
          else throw new Error("cannot determine the script source URL.");
          if (o) return [void 0, Xr2];
          {
            let d = "ort-wasm-simd-threaded.mjs", c = n ?? is2(d, t), l = a && c && !on2(c, t), m = l ? await Kr2(c) : c ?? us2(d, t);
            return [l ? m : void 0, await fs2(m)];
          }
        };
      });
      xe2 = N(() => {
        "use strict";
        dt();
        un2 = false, Tt = false, no = false, cs2 = () => {
          if (typeof SharedArrayBuffer > "u") return false;
          try {
            return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
          } catch {
            return false;
          }
        }, ls2 = () => {
          try {
            return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
          } catch {
            return false;
          }
        }, ds2 = () => {
          try {
            return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 19, 1, 17, 0, 65, 1, 253, 15, 65, 2, 253, 15, 65, 3, 253, 15, 253, 147, 2, 11]));
          } catch {
            return false;
          }
        }, pt = async (n) => {
          if (un2) return Promise.resolve();
          if (Tt) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
          if (no) throw new Error("previous call to 'initializeWebAssembly()' failed.");
          Tt = true;
          let t = n.initTimeout, a = n.numThreads;
          if (n.simd !== false) {
            if (n.simd === "relaxed") {
              if (!ds2()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
            } else if (!ls2()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
          }
          let u = cs2();
          a > 1 && !u && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + a + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), n.numThreads = a = 1);
          let o = n.wasmPaths, d = typeof o == "string" ? o : void 0, c = o?.mjs, l = c?.href ?? c, m = o?.wasm, h = m?.href ?? m, g = n.wasmBinary, [b, y] = await to(l, d, a > 1, !!g || !!h), T = false, I = [];
          if (t > 0 && I.push(new Promise((U) => {
            setTimeout(() => {
              T = true, U();
            }, t);
          })), I.push(new Promise((U, z2) => {
            let v = { numThreads: a };
            if (g) v.wasmBinary = g, v.locateFile = (O) => O;
            else if (h || d) v.locateFile = (O) => h ?? d + O;
            else if (l && l.indexOf("blob:") !== 0) v.locateFile = (O) => new URL(O, l).href;
            else if (b) {
              let O = Qr2();
              O && (v.locateFile = (F2) => O + F2);
            }
            y(v).then((O) => {
              Tt = false, un2 = true, sn2 = O, U(), b && URL.revokeObjectURL(b);
            }, (O) => {
              Tt = false, no = true, z2(O);
            });
          })), await Promise.race(I), T) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
        }, $ = () => {
          if (un2 && sn2) return sn2;
          throw new Error("WebAssembly is not initialized yet.");
        };
      });
      St = N(() => {
        "use strict";
        xe2();
        ae = (n, t) => {
          let a = $(), u = a.lengthBytesUTF8(n) + 1, o = a._malloc(u);
          return a.stringToUTF8(n, o, u), t.push(o), o;
        }, Ze = (n, t, a, u) => {
          if (typeof n == "object" && n !== null) {
            if (a.has(n)) throw new Error("Circular reference in options");
            a.add(n);
          }
          Object.entries(n).forEach(([o, d]) => {
            let c = t ? t + o : o;
            if (typeof d == "object") Ze(d, c + ".", a, u);
            else if (typeof d == "string" || typeof d == "number") u(c, d.toString());
            else if (typeof d == "boolean") u(c, d ? "1" : "0");
            else throw new Error(`Can't handle extra config type: ${typeof d}`);
          });
        }, G = (n) => {
          let t = $(), a = t.stackSave();
          try {
            let u = t.PTR_SIZE, o = t.stackAlloc(2 * u);
            t._OrtGetLastError(o, o + u);
            let d = Number(t.getValue(o, u === 4 ? "i32" : "i64")), c = t.getValue(o + u, "*"), l = c ? t.UTF8ToString(c) : "";
            throw new Error(`${n} ERROR_CODE: ${d}, ERROR_MESSAGE: ${l}`);
          } finally {
            t.stackRestore(a);
          }
        };
      });
      oo = N(() => {
        "use strict";
        xe2();
        St();
        ro = (n) => {
          let t = $(), a = 0, u = [], o = n || {};
          try {
            if (n?.logSeverityLevel === void 0) o.logSeverityLevel = 2;
            else if (typeof n.logSeverityLevel != "number" || !Number.isInteger(n.logSeverityLevel) || n.logSeverityLevel < 0 || n.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${n.logSeverityLevel}`);
            if (n?.logVerbosityLevel === void 0) o.logVerbosityLevel = 0;
            else if (typeof n.logVerbosityLevel != "number" || !Number.isInteger(n.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);
            n?.terminate === void 0 && (o.terminate = false);
            let d = 0;
            return n?.tag !== void 0 && (d = ae(n.tag, u)), a = t._OrtCreateRunOptions(o.logSeverityLevel, o.logVerbosityLevel, !!o.terminate, d), a === 0 && G("Can't create run options."), n?.extra !== void 0 && Ze(n.extra, "", /* @__PURE__ */ new WeakSet(), (c, l) => {
              let m = ae(c, u), h = ae(l, u);
              t._OrtAddRunConfigEntry(a, m, h) !== 0 && G(`Can't set a run config entry: ${c} - ${l}.`);
            }), [a, u];
          } catch (d) {
            throw a !== 0 && t._OrtReleaseRunOptions(a), u.forEach((c) => t._free(c)), d;
          }
        };
      });
      so = N(() => {
        "use strict";
        xe2();
        St();
        ps2 = (n) => {
          switch (n) {
            case "disabled":
              return 0;
            case "basic":
              return 1;
            case "extended":
              return 2;
            case "layout":
              return 3;
            case "all":
              return 99;
            default:
              throw new Error(`unsupported graph optimization level: ${n}`);
          }
        }, ms2 = (n) => {
          switch (n) {
            case "sequential":
              return 0;
            case "parallel":
              return 1;
            default:
              throw new Error(`unsupported execution mode: ${n}`);
          }
        }, hs2 = (n) => {
          n.extra || (n.extra = {}), n.extra.session || (n.extra.session = {});
          let t = n.extra.session;
          t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), n.executionProviders && n.executionProviders.some((a) => (typeof a == "string" ? a : a.name) === "webgpu") && (n.enableMemPattern = false);
        }, vt = (n, t, a, u) => {
          let o = ae(t, u), d = ae(a, u);
          $()._OrtAddSessionConfigEntry(n, o, d) !== 0 && G(`Can't set a session config entry: ${t} - ${a}.`);
        }, ws2 = async (n, t, a) => {
          let u = t.executionProviders;
          for (let o of u) {
            let d = typeof o == "string" ? o : o.name, c = [];
            switch (d) {
              case "webnn":
                if (d = "WEBNN", typeof o != "string") {
                  let y = o?.deviceType;
                  y && vt(n, "deviceType", y, a);
                }
                break;
              case "webgpu":
                if (d = "JS", typeof o != "string") {
                  let b = o;
                  if (b?.preferredLayout) {
                    if (b.preferredLayout !== "NCHW" && b.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${b.preferredLayout}`);
                    vt(n, "preferredLayout", b.preferredLayout, a);
                  }
                }
                break;
              case "wasm":
              case "cpu":
                continue;
              default:
                throw new Error(`not supported execution provider: ${d}`);
            }
            let l = ae(d, a), m = c.length, h = 0, g = 0;
            if (m > 0) {
              h = $()._malloc(m * $().PTR_SIZE), a.push(h), g = $()._malloc(m * $().PTR_SIZE), a.push(g);
              for (let b = 0; b < m; b++) $().setValue(h + b * $().PTR_SIZE, c[b][0], "*"), $().setValue(g + b * $().PTR_SIZE, c[b][1], "*");
            }
            await $()._OrtAppendExecutionProvider(n, l, h, g, m) !== 0 && G(`Can't append execution provider: ${d}.`);
          }
        }, ao = async (n) => {
          let t = $(), a = 0, u = [], o = n || {};
          hs2(o);
          try {
            let d = ps2(o.graphOptimizationLevel ?? "all"), c = ms2(o.executionMode ?? "sequential"), l = typeof o.logId == "string" ? ae(o.logId, u) : 0, m = o.logSeverityLevel ?? 2;
            if (!Number.isInteger(m) || m < 0 || m > 4) throw new Error(`log severity level is not valid: ${m}`);
            let h = o.logVerbosityLevel ?? 0;
            if (!Number.isInteger(h) || h < 0 || h > 4) throw new Error(`log verbosity level is not valid: ${h}`);
            let g = typeof o.optimizedModelFilePath == "string" ? ae(o.optimizedModelFilePath, u) : 0;
            if (a = t._OrtCreateSessionOptions(d, !!o.enableCpuMemArena, !!o.enableMemPattern, c, !!o.enableProfiling, 0, l, m, h, g), a === 0 && G("Can't create session options."), o.executionProviders && await ws2(a, o, u), o.enableGraphCapture !== void 0) {
              if (typeof o.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);
              vt(a, "enableGraphCapture", o.enableGraphCapture.toString(), u);
            }
            if (o.freeDimensionOverrides) for (let [b, y] of Object.entries(o.freeDimensionOverrides)) {
              if (typeof b != "string") throw new Error(`free dimension override name must be a string: ${b}`);
              if (typeof y != "number" || !Number.isInteger(y) || y < 0) throw new Error(`free dimension override value must be a non-negative integer: ${y}`);
              let T = ae(b, u);
              t._OrtAddFreeDimensionOverride(a, T, y) !== 0 && G(`Can't set a free dimension override: ${b} - ${y}.`);
            }
            return o.extra !== void 0 && Ze(o.extra, "", /* @__PURE__ */ new WeakSet(), (b, y) => {
              vt(a, b, y, u);
            }), [a, u];
          } catch (d) {
            throw a !== 0 && t._OrtReleaseSessionOptions(a) !== 0 && G("Can't release session options."), u.forEach((c) => t._free(c)), d;
          }
        };
      });
      fn2 = N(() => {
        "use strict";
        ke = (n) => {
          switch (n) {
            case "int8":
              return 3;
            case "uint8":
              return 2;
            case "bool":
              return 9;
            case "int16":
              return 5;
            case "uint16":
              return 4;
            case "int32":
              return 6;
            case "uint32":
              return 12;
            case "float16":
              return 10;
            case "float32":
              return 1;
            case "float64":
              return 11;
            case "string":
              return 8;
            case "int64":
              return 7;
            case "uint64":
              return 13;
            case "int4":
              return 22;
            case "uint4":
              return 21;
            default:
              throw new Error(`unsupported data type: ${n}`);
          }
        }, Ot2 = (n) => {
          switch (n) {
            case 3:
              return "int8";
            case 2:
              return "uint8";
            case 9:
              return "bool";
            case 5:
              return "int16";
            case 4:
              return "uint16";
            case 6:
              return "int32";
            case 12:
              return "uint32";
            case 10:
              return "float16";
            case 1:
              return "float32";
            case 11:
              return "float64";
            case 8:
              return "string";
            case 7:
              return "int64";
            case 13:
              return "uint64";
            case 22:
              return "int4";
            case 21:
              return "uint4";
            default:
              throw new Error(`unsupported data type: ${n}`);
          }
        }, We = (n, t) => {
          let a = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, 0.5, 0.5][n], u = typeof t == "number" ? t : t.reduce((o, d) => o * d, 1);
          return a > 0 ? Math.ceil(u * a) : void 0;
        }, io = (n) => {
          switch (n) {
            case "float16":
              return typeof Float16Array < "u" && Float16Array.from ? Float16Array : Uint16Array;
            case "float32":
              return Float32Array;
            case "uint8":
              return Uint8Array;
            case "int8":
              return Int8Array;
            case "uint16":
              return Uint16Array;
            case "int16":
              return Int16Array;
            case "int32":
              return Int32Array;
            case "bool":
              return Uint8Array;
            case "float64":
              return Float64Array;
            case "uint32":
              return Uint32Array;
            case "int64":
              return BigInt64Array;
            case "uint64":
              return BigUint64Array;
            default:
              throw new Error(`unsupported type: ${n}`);
          }
        }, uo = (n) => {
          switch (n) {
            case "verbose":
              return 0;
            case "info":
              return 1;
            case "warning":
              return 2;
            case "error":
              return 3;
            case "fatal":
              return 4;
            default:
              throw new Error(`unsupported logging level: ${n}`);
          }
        }, At2 = (n) => n === "float32" || n === "float16" || n === "int32" || n === "int64" || n === "uint32" || n === "uint8" || n === "bool" || n === "uint4" || n === "int4", It2 = (n) => n === "float32" || n === "float16" || n === "int32" || n === "int64" || n === "uint32" || n === "uint64" || n === "int8" || n === "uint8" || n === "bool" || n === "uint4" || n === "int4", fo = (n) => {
          switch (n) {
            case "none":
              return 0;
            case "cpu":
              return 1;
            case "cpu-pinned":
              return 2;
            case "texture":
              return 3;
            case "gpu-buffer":
              return 4;
            case "ml-tensor":
              return 5;
            default:
              throw new Error(`unsupported data location: ${n}`);
          }
        };
      });
      cn2 = N(() => {
        "use strict";
        lt();
        Qe2 = async (n) => {
          if (typeof n == "string") if (false) try {
            let { readFile: t } = qt2("node:fs/promises");
            return new Uint8Array(await t(n));
          } catch (t) {
            if (t.code === "ERR_FS_FILE_TOO_LARGE") {
              let { createReadStream: a } = qt2("node:fs"), u = a(n), o = [];
              for await (let d of u) o.push(d);
              return new Uint8Array(Buffer.concat(o));
            }
            throw t;
          }
          else {
            let t = await fetch(n);
            if (!t.ok) throw new Error(`failed to load external data file: ${n}`);
            let a = t.headers.get("Content-Length"), u = a ? parseInt(a, 10) : 0;
            if (u < 1073741824) return new Uint8Array(await t.arrayBuffer());
            {
              if (!t.body) throw new Error(`failed to load external data file: ${n}, no response body.`);
              let o = t.body.getReader(), d;
              try {
                d = new ArrayBuffer(u);
              } catch (l) {
                if (l instanceof RangeError) {
                  let m = Math.ceil(u / 65536);
                  d = new WebAssembly.Memory({ initial: m, maximum: m }).buffer;
                } else throw l;
              }
              let c = 0;
              for (; ; ) {
                let { done: l, value: m } = await o.read();
                if (l) break;
                let h = m.byteLength;
                new Uint8Array(d, c, h).set(m), c += h;
              }
              return new Uint8Array(d, 0, u);
            }
          }
          else return n instanceof Blob ? new Uint8Array(await n.arrayBuffer()) : n instanceof Uint8Array ? n : new Uint8Array(n);
        };
      });
      rn2 = N(() => {
        "use strict";
        Te();
        oo();
        so();
        fn2();
        xe2();
        St();
        cn2();
        bs2 = (n, t) => {
          $()._OrtInit(n, t) !== 0 && G("Can't initialize onnxruntime.");
        }, mt = async (n) => {
          bs2(n.wasm.numThreads, uo(n.logLevel));
        }, ht2 = async (n, t) => {
          $().asyncInit?.();
          let a = n.webgpu.adapter;
          if (t === "webgpu") {
            if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
            if (a) {
              if (typeof a.limits != "object" || typeof a.features != "object" || typeof a.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
            } else {
              let u = n.webgpu.powerPreference;
              if (u !== void 0 && u !== "low-power" && u !== "high-performance") throw new Error(`Invalid powerPreference setting: "${u}"`);
              let o = n.webgpu.forceFallbackAdapter;
              if (o !== void 0 && typeof o != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);
              if (a = await navigator.gpu.requestAdapter({ powerPreference: u, forceFallbackAdapter: o }), !a) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.');
            }
          }
          if (t === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
        }, Ge2 = /* @__PURE__ */ new Map(), ys2 = (n) => {
          let t = $(), a = t.stackSave();
          try {
            let u = t.PTR_SIZE, o = t.stackAlloc(2 * u);
            t._OrtGetInputOutputCount(n, o, o + u) !== 0 && G("Can't get session input/output count.");
            let c = u === 4 ? "i32" : "i64";
            return [Number(t.getValue(o, c)), Number(t.getValue(o + u, c))];
          } finally {
            t.stackRestore(a);
          }
        }, co = (n, t) => {
          let a = $(), u = a.stackSave(), o = 0;
          try {
            let d = a.PTR_SIZE, c = a.stackAlloc(2 * d);
            a._OrtGetInputOutputMetadata(n, t, c, c + d) !== 0 && G("Can't get session input/output metadata.");
            let m = Number(a.getValue(c, "*"));
            o = Number(a.getValue(c + d, "*"));
            let h = a.HEAP32[o / 4];
            if (h === 0) return [m, 0];
            let g = a.HEAPU32[o / 4 + 1], b = [];
            for (let y = 0; y < g; y++) {
              let T = Number(a.getValue(o + 8 + y * d, "*"));
              b.push(T !== 0 ? a.UTF8ToString(T) : Number(a.getValue(o + 8 + (y + g) * d, "*")));
            }
            return [m, h, b];
          } finally {
            a.stackRestore(u), o !== 0 && a._OrtFree(o);
          }
        }, Xe = (n) => {
          let t = $(), a = t._malloc(n.byteLength);
          if (a === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);
          return t.HEAPU8.set(n, a), [a, n.byteLength];
        }, wt = async (n, t) => {
          let a, u, o = $();
          Array.isArray(n) ? [a, u] = n : n.buffer === o.HEAPU8.buffer ? [a, u] = [n.byteOffset, n.byteLength] : [a, u] = Xe(n);
          let d = 0, c = 0, l = 0, m = [], h = [], g = [];
          try {
            if ([c, m] = await ao(t), t?.externalData && o.mountExternalData) {
              let D = [];
              for (let k of t.externalData) {
                let w = typeof k == "string" ? k : k.path;
                D.push(Qe2(typeof k == "string" ? k : k.data).then((Q) => {
                  o.mountExternalData(w, Q);
                }));
              }
              await Promise.all(D);
            }
            for (let D of t?.executionProviders ?? []) if ((typeof D == "string" ? D : D.name) === "webnn") {
              if (o.shouldTransferToMLTensor = false, typeof D != "string") {
                let w = D, Q = w?.context, j = w?.gpuDevice, ne = w?.deviceType, pe = w?.powerPreference;
                Q ? o.currentContext = Q : j ? o.currentContext = await o.webnnCreateMLContext(j) : o.currentContext = await o.webnnCreateMLContext({ deviceType: ne, powerPreference: pe });
              } else o.currentContext = await o.webnnCreateMLContext();
              break;
            }
            d = await o._OrtCreateSession(a, u, c), o.webgpuOnCreateSession?.(d), d === 0 && G("Can't create a session."), o.jsepOnCreateSession?.(), o.currentContext && (o.webnnRegisterMLContext(d, o.currentContext), o.currentContext = void 0, o.shouldTransferToMLTensor = true);
            let [b, y] = ys2(d), T = !!t?.enableGraphCapture, I = [], U = [], z2 = [], v = [], O = [];
            for (let D = 0; D < b; D++) {
              let [k, w, Q] = co(d, D);
              k === 0 && G("Can't get an input name."), h.push(k);
              let j = o.UTF8ToString(k);
              I.push(j), z2.push(w === 0 ? { name: j, isTensor: false } : { name: j, isTensor: true, type: Ot2(w), shape: Q });
            }
            for (let D = 0; D < y; D++) {
              let [k, w, Q] = co(d, D + b);
              k === 0 && G("Can't get an output name."), g.push(k);
              let j = o.UTF8ToString(k);
              U.push(j), v.push(w === 0 ? { name: j, isTensor: false } : { name: j, isTensor: true, type: Ot2(w), shape: Q });
            }
            return Ge2.set(d, [d, h, g, null, T, false]), [d, I, U, z2, v];
          } catch (b) {
            throw h.forEach((y) => o._OrtFree(y)), g.forEach((y) => o._OrtFree(y)), l !== 0 && o._OrtReleaseBinding(l) !== 0 && G("Can't release IO binding."), d !== 0 && o._OrtReleaseSession(d) !== 0 && G("Can't release session."), b;
          } finally {
            o._free(a), c !== 0 && o._OrtReleaseSessionOptions(c) !== 0 && G("Can't release session options."), m.forEach((b) => o._free(b)), o.unmountExternalData?.();
          }
        }, bt2 = (n) => {
          let t = $(), a = Ge2.get(n);
          if (!a) throw new Error(`cannot release session. invalid session id: ${n}`);
          let [u, o, d, c, l] = a;
          c && (l && t._OrtClearBoundOutputs(c.handle) !== 0 && G("Can't clear bound outputs."), t._OrtReleaseBinding(c.handle) !== 0 && G("Can't release IO binding.")), t.jsepOnReleaseSession?.(n), t.webnnOnReleaseSession?.(n), t.webgpuOnReleaseSession?.(n), o.forEach((m) => t._OrtFree(m)), d.forEach((m) => t._OrtFree(m)), t._OrtReleaseSession(u) !== 0 && G("Can't release session."), Ge2.delete(n);
        }, lo = async (n, t, a, u, o, d, c = false) => {
          if (!n) {
            t.push(0);
            return;
          }
          let l = $(), m = l.PTR_SIZE, h = n[0], g = n[1], b = n[3], y = b, T, I;
          if (h === "string" && (b === "gpu-buffer" || b === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
          if (c && b !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${d} when enableGraphCapture is true.`);
          if (b === "gpu-buffer") {
            let v = n[2].gpuBuffer;
            I = We(ke(h), g);
            {
              let O = l.jsepRegisterBuffer;
              if (!O) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
              T = O(u, d, v, I);
            }
          } else if (b === "ml-tensor") {
            let v = n[2].mlTensor;
            I = We(ke(h), g);
            let O = l.webnnRegisterMLTensor;
            if (!O) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
            T = O(u, v, ke(h), g);
          } else {
            let v = n[2];
            if (Array.isArray(v)) {
              I = m * v.length, T = l._malloc(I), a.push(T);
              for (let O = 0; O < v.length; O++) {
                if (typeof v[O] != "string") throw new TypeError(`tensor data at index ${O} is not a string`);
                l.setValue(T + O * m, ae(v[O], a), "*");
              }
            } else {
              let O = l.webnnIsGraphInput, F2 = l.webnnIsGraphOutput;
              if (h !== "string" && O && F2) {
                let D = l.UTF8ToString(o);
                if (O(u, D) || F2(u, D)) {
                  let k = ke(h);
                  I = We(k, g), y = "ml-tensor";
                  let w = l.webnnCreateTemporaryTensor, Q = l.webnnUploadTensor;
                  if (!w || !Q) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
                  let j = await w(u, k, g);
                  Q(j, new Uint8Array(v.buffer, v.byteOffset, v.byteLength)), T = j;
                } else I = v.byteLength, T = l._malloc(I), a.push(T), l.HEAPU8.set(new Uint8Array(v.buffer, v.byteOffset, I), T);
              } else I = v.byteLength, T = l._malloc(I), a.push(T), l.HEAPU8.set(new Uint8Array(v.buffer, v.byteOffset, I), T);
            }
          }
          let U = l.stackSave(), z2 = l.stackAlloc(4 * g.length);
          try {
            g.forEach((O, F2) => l.setValue(z2 + F2 * m, O, m === 4 ? "i32" : "i64"));
            let v = l._OrtCreateTensor(ke(h), T, I, z2, g.length, fo(y));
            v === 0 && G(`Can't create tensor for input/output. session=${u}, index=${d}.`), t.push(v);
          } finally {
            l.stackRestore(U);
          }
        }, yt2 = async (n, t, a, u, o, d) => {
          let c = $(), l = c.PTR_SIZE, m = Ge2.get(n);
          if (!m) throw new Error(`cannot run inference. invalid session id: ${n}`);
          let h = m[0], g = m[1], b = m[2], y = m[3], T = m[4], I = m[5], U = t.length, z2 = u.length, v = 0, O = [], F2 = [], D = [], k = [], w = [], Q = c.stackSave(), j = c.stackAlloc(U * l), ne = c.stackAlloc(U * l), pe = c.stackAlloc(z2 * l), B = c.stackAlloc(z2 * l);
          try {
            [v, O] = ro(d), _e("wasm prepareInputOutputTensor");
            for (let A = 0; A < U; A++) await lo(a[A], F2, k, n, g[t[A]], t[A], T);
            for (let A = 0; A < z2; A++) await lo(o[A], D, k, n, b[u[A]], U + u[A], T);
            Ue("wasm prepareInputOutputTensor");
            for (let A = 0; A < U; A++) c.setValue(j + A * l, F2[A], "*"), c.setValue(ne + A * l, g[t[A]], "*");
            for (let A = 0; A < z2; A++) c.setValue(pe + A * l, D[A], "*"), c.setValue(B + A * l, b[u[A]], "*");
            c.jsepOnRunStart?.(h), c.webnnOnRunStart?.(h);
            let W;
            W = await c._OrtRun(h, ne, j, U, B, z2, pe, v), W !== 0 && G("failed to call OrtRun().");
            let re = [], me = [];
            _e("wasm ProcessOutputTensor");
            for (let A = 0; A < z2; A++) {
              let K = Number(c.getValue(pe + A * l, "*"));
              if (K === D[A] || w.includes(D[A])) {
                re.push(o[A]), K !== D[A] && c._OrtReleaseTensor(K) !== 0 && G("Can't release tensor.");
                continue;
              }
              let He2 = c.stackSave(), ee2 = c.stackAlloc(4 * l), he2 = false, H, q = 0;
              try {
                c._OrtGetTensorData(K, ee2, ee2 + l, ee2 + 2 * l, ee2 + 3 * l) !== 0 && G(`Can't access output tensor data on index ${A}.`);
                let Se = l === 4 ? "i32" : "i64", ve = Number(c.getValue(ee2, Se));
                q = c.getValue(ee2 + l, "*");
                let je = c.getValue(ee2 + l * 2, "*"), Re = Number(c.getValue(ee2 + l * 3, Se)), te = [];
                for (let L = 0; L < Re; L++) te.push(Number(c.getValue(je + L * l, Se)));
                c._OrtFree(je) !== 0 && G("Can't free memory for tensor dims.");
                let ue2 = te.reduce((L, V2) => L * V2, 1);
                H = Ot2(ve);
                let se = y?.outputPreferredLocations[u[A]];
                if (H === "string") {
                  if (se === "gpu-buffer" || se === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
                  let L = [];
                  for (let V2 = 0; V2 < ue2; V2++) {
                    let fe = c.getValue(q + V2 * l, "*"), ye = c.getValue(q + (V2 + 1) * l, "*"), ce2 = V2 === ue2 - 1 ? void 0 : ye - fe;
                    L.push(c.UTF8ToString(fe, ce2));
                  }
                  re.push([H, te, L, "cpu"]);
                } else if (se === "gpu-buffer" && ue2 > 0) {
                  let L = c.jsepGetBuffer;
                  if (!L) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                  let V2 = L(q), fe = We(ve, ue2);
                  if (fe === void 0 || !At2(H)) throw new Error(`Unsupported data type: ${H}`);
                  he2 = true, re.push([H, te, { gpuBuffer: V2, download: c.jsepCreateDownloader(V2, fe, H), dispose: () => {
                    c._OrtReleaseTensor(K) !== 0 && G("Can't release tensor.");
                  } }, "gpu-buffer"]);
                } else if (se === "ml-tensor" && ue2 > 0) {
                  let L = c.webnnEnsureTensor, V2 = c.webnnIsGraphInputOutputTypeSupported;
                  if (!L || !V2) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                  if (We(ve, ue2) === void 0 || !It2(H)) throw new Error(`Unsupported data type: ${H}`);
                  if (!V2(n, H, false)) throw new Error(`preferredLocation "ml-tensor" for ${H} output is not supported by current WebNN Context.`);
                  let ye = await L(n, q, ve, te, false);
                  he2 = true, re.push([H, te, { mlTensor: ye, download: c.webnnCreateMLTensorDownloader(q, H), dispose: () => {
                    c.webnnReleaseTensorId(q), c._OrtReleaseTensor(K);
                  } }, "ml-tensor"]);
                } else if (se === "ml-tensor-cpu-output" && ue2 > 0) {
                  let L = c.webnnCreateMLTensorDownloader(q, H)(), V2 = re.length;
                  he2 = true, me.push((async () => {
                    let fe = [V2, await L];
                    return c.webnnReleaseTensorId(q), c._OrtReleaseTensor(K), fe;
                  })()), re.push([H, te, [], "cpu"]);
                } else {
                  let L = io(H), V2 = new L(ue2);
                  new Uint8Array(V2.buffer, V2.byteOffset, V2.byteLength).set(c.HEAPU8.subarray(q, q + V2.byteLength)), re.push([H, te, V2, "cpu"]);
                }
              } finally {
                c.stackRestore(He2), H === "string" && q && c._free(q), he2 || c._OrtReleaseTensor(K);
              }
            }
            y && !T && (c._OrtClearBoundOutputs(y.handle) !== 0 && G("Can't clear bound outputs."), Ge2.set(n, [h, g, b, y, T, false]));
            for (let [A, K] of await Promise.all(me)) re[A][2] = K;
            return Ue("wasm ProcessOutputTensor"), re;
          } finally {
            c.webnnOnRunEnd?.(h), c.stackRestore(Q), F2.forEach((W) => c._OrtReleaseTensor(W)), D.forEach((W) => c._OrtReleaseTensor(W)), k.forEach((W) => c._free(W)), v !== 0 && c._OrtReleaseRunOptions(v), O.forEach((W) => c._free(W));
          }
        }, gt = (n) => {
          let t = $(), a = Ge2.get(n);
          if (!a) throw new Error("invalid session id");
          let u = a[0], o = t._OrtEndProfiling(u);
          o === 0 && G("Can't get an profile file name."), t._OrtFree(o);
        }, Et = (n) => {
          let t = [];
          for (let a of n) {
            let u = a[2];
            !Array.isArray(u) && "buffer" in u && t.push(u.buffer);
          }
          return t;
        };
      });
      pn2 = N(() => {
        "use strict";
        Te();
        rn2();
        xe2();
        dt();
        Ce = () => !!Y.wasm.proxy && typeof document < "u", Ke2 = false, Lt2 = false, Pt = false, dn2 = /* @__PURE__ */ new Map(), $e2 = (n, t) => {
          let a = dn2.get(n);
          a ? a.push(t) : dn2.set(n, [t]);
        }, ze2 = () => {
          if (Ke2 || !Lt2 || Pt || !ie) throw new Error("worker not ready");
        }, Es2 = (n) => {
          switch (n.data.type) {
            case "init-wasm":
              Ke2 = false, n.data.err ? (Pt = true, ln2[1](n.data.err)) : (Lt2 = true, ln2[0]()), Bt2 && (URL.revokeObjectURL(Bt2), Bt2 = void 0);
              break;
            case "init-ep":
            case "copy-from":
            case "create":
            case "release":
            case "run":
            case "end-profiling": {
              let t = dn2.get(n.data.type);
              n.data.err ? t.shift()[1](n.data.err) : t.shift()[0](n.data.out);
              break;
            }
            default:
          }
        }, po = async () => {
          if (!Lt2) {
            if (Ke2) throw new Error("multiple calls to 'initWasm()' detected.");
            if (Pt) throw new Error("previous call to 'initWasm()' failed.");
            if (Ke2 = true, Ce()) return new Promise((n, t) => {
              ie?.terminate(), eo().then(([a, u]) => {
                try {
                  ie = u, ie.onerror = (d) => t(d), ie.onmessage = Es2, ln2 = [n, t];
                  let o = { type: "init-wasm", in: Y };
                  !o.in.wasm.wasmPaths && (a || an2) && (o.in.wasm.wasmPaths = { wasm: new URL("ort-wasm-simd-threaded.wasm", import_meta2.url).href }), ie.postMessage(o), Bt2 = a;
                } catch (o) {
                  t(o);
                }
              }, t);
            });
            try {
              await pt(Y.wasm), await mt(Y), Lt2 = true;
            } catch (n) {
              throw Pt = true, n;
            } finally {
              Ke2 = false;
            }
          }
        }, mo = async (n) => {
          if (Ce()) return ze2(), new Promise((t, a) => {
            $e2("init-ep", [t, a]);
            let u = { type: "init-ep", in: { epName: n, env: Y } };
            ie.postMessage(u);
          });
          await ht2(Y, n);
        }, ho = async (n) => Ce() ? (ze2(), new Promise((t, a) => {
          $e2("copy-from", [t, a]);
          let u = { type: "copy-from", in: { buffer: n } };
          ie.postMessage(u, [n.buffer]);
        })) : Xe(n), wo = async (n, t) => {
          if (Ce()) {
            if (t?.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
            return ze2(), new Promise((a, u) => {
              $e2("create", [a, u]);
              let o = { type: "create", in: { model: n, options: { ...t } } }, d = [];
              n instanceof Uint8Array && d.push(n.buffer), ie.postMessage(o, d);
            });
          } else return wt(n, t);
        }, bo = async (n) => {
          if (Ce()) return ze2(), new Promise((t, a) => {
            $e2("release", [t, a]);
            let u = { type: "release", in: n };
            ie.postMessage(u);
          });
          bt2(n);
        }, yo = async (n, t, a, u, o, d) => {
          if (Ce()) {
            if (a.some((c) => c[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
            if (o.some((c) => c)) throw new Error("pre-allocated output tensor is not supported for proxy.");
            return ze2(), new Promise((c, l) => {
              $e2("run", [c, l]);
              let m = a, h = { type: "run", in: { sessionId: n, inputIndices: t, inputs: m, outputIndices: u, options: d } };
              ie.postMessage(h, Et(m));
            });
          } else return yt2(n, t, a, u, o, d);
        }, go = async (n) => {
          if (Ce()) return ze2(), new Promise((t, a) => {
            $e2("end-profiling", [t, a]);
            let u = { type: "end-profiling", in: n };
            ie.postMessage(u);
          });
          gt(n);
        };
      });
      To = N(() => {
        "use strict";
        Te();
        pn2();
        fn2();
        lt();
        cn2();
        Eo = (n, t) => {
          switch (n.location) {
            case "cpu":
              return [n.type, n.dims, n.data, "cpu"];
            case "gpu-buffer":
              return [n.type, n.dims, { gpuBuffer: n.gpuBuffer }, "gpu-buffer"];
            case "ml-tensor":
              return [n.type, n.dims, { mlTensor: n.mlTensor }, "ml-tensor"];
            default:
              throw new Error(`invalid data location: ${n.location} for ${t()}`);
          }
        }, Ts2 = (n) => {
          switch (n[3]) {
            case "cpu":
              return new de2(n[0], n[2], n[1]);
            case "gpu-buffer": {
              let t = n[0];
              if (!At2(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
              let { gpuBuffer: a, download: u, dispose: o } = n[2];
              return de2.fromGpuBuffer(a, { dataType: t, dims: n[1], download: u, dispose: o });
            }
            case "ml-tensor": {
              let t = n[0];
              if (!It2(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
              let { mlTensor: a, download: u, dispose: o } = n[2];
              return de2.fromMLTensor(a, { dataType: t, dims: n[1], download: u, dispose: o });
            }
            default:
              throw new Error(`invalid data location: ${n[3]}`);
          }
        }, Dt = class {
          async fetchModelAndCopyToWasmMemory(t) {
            return ho(await Qe2(t));
          }
          async loadModel(t, a) {
            Pe();
            let u;
            typeof t == "string" ? u = await this.fetchModelAndCopyToWasmMemory(t) : u = t, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await wo(u, a), De();
          }
          async dispose() {
            return bo(this.sessionId);
          }
          async run(t, a, u) {
            Pe();
            let o = [], d = [];
            Object.entries(t).forEach((y) => {
              let T = y[0], I = y[1], U = this.inputNames.indexOf(T);
              if (U === -1) throw new Error(`invalid input '${T}'`);
              o.push(I), d.push(U);
            });
            let c = [], l = [];
            Object.entries(a).forEach((y) => {
              let T = y[0], I = y[1], U = this.outputNames.indexOf(T);
              if (U === -1) throw new Error(`invalid output '${T}'`);
              c.push(I), l.push(U);
            });
            let m = o.map((y, T) => Eo(y, () => `input "${this.inputNames[d[T]]}"`)), h = c.map((y, T) => y ? Eo(y, () => `output "${this.outputNames[l[T]]}"`) : null), g = await yo(this.sessionId, d, m, l, h, u), b = {};
            for (let y = 0; y < g.length; y++) b[this.outputNames[l[y]]] = c[y] ?? Ts2(g[y]);
            return De(), b;
          }
          startProfiling() {
          }
          endProfiling() {
            go(this.sessionId);
          }
        };
      });
      vo = {};
      it2(vo, { OnnxruntimeWebAssemblyBackend: () => _t, initializeFlags: () => So, wasmBackend: () => Ss2 });
      Oo = N(() => {
        "use strict";
        Te();
        pn2();
        To();
        So = () => {
          (typeof Y.wasm.initTimeout != "number" || Y.wasm.initTimeout < 0) && (Y.wasm.initTimeout = 0);
          let n = Y.wasm.simd;
          if (typeof n != "boolean" && n !== void 0 && n !== "fixed" && n !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${n}". Reset it to \`false\` and ignore SIMD feature checking.`), Y.wasm.simd = false), typeof Y.wasm.proxy != "boolean" && (Y.wasm.proxy = false), typeof Y.wasm.trace != "boolean" && (Y.wasm.trace = false), typeof Y.wasm.numThreads != "number" || !Number.isInteger(Y.wasm.numThreads) || Y.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) Y.wasm.numThreads = 1;
          else {
            let t = typeof navigator > "u" ? qt2("node:os").cpus().length : navigator.hardwareConcurrency;
            Y.wasm.numThreads = Math.min(4, Math.ceil((t || 1) / 2));
          }
        }, _t = class {
          async init(t) {
            So(), await po(), await mo(t);
          }
          async createInferenceSessionHandler(t, a) {
            let u = new Dt();
            return await u.loadModel(t, a), u;
          }
        }, Ss2 = new _t();
      });
      Te();
      Te();
      Te();
      Gr = "1.24.3";
      su = nn2;
      {
        let n = (Oo(), Xt2(vo)).wasmBackend;
        Je("cpu", n, 10), Je("wasm", n, 10);
      }
      Object.defineProperty(Y.versions, "web", { value: Gr, enumerable: true });
    }
  });

  // src/lib/supertonicTts/catalog.ts
  var SUPERTONIC_LANGUAGE_CODES = [
    "en",
    "ko",
    "ja",
    "ar",
    "bg",
    "cs",
    "da",
    "de",
    "el",
    "es",
    "et",
    "fi",
    "fr",
    "hi",
    "hr",
    "hu",
    "id",
    "it",
    "lt",
    "lv",
    "nl",
    "pl",
    "pt",
    "ro",
    "ru",
    "sk",
    "sl",
    "sv",
    "tr",
    "uk",
    "vi",
    "na"
  ];
  var DEFAULT_SUPERTONIC_LANGUAGE = "en";
  var DEFAULT_SUPERTONIC_STEPS = 8;
  var DEFAULT_SUPERTONIC_SPEED = 1.05;
  var DEFAULT_SUPERTONIC_VOICE = "M1";
  var SUPERTONIC_VOICES = [
    { id: "M1", label: "Supertonic M1 - male style 1" },
    { id: "M2", label: "Supertonic M2 - male style 2" },
    { id: "M3", label: "Supertonic M3 - male style 3" },
    { id: "M4", label: "Supertonic M4 - male style 4" },
    { id: "M5", label: "Supertonic M5 - male style 5" },
    { id: "F1", label: "Supertonic F1 - female style 1" },
    { id: "F2", label: "Supertonic F2 - female style 2" },
    { id: "F3", label: "Supertonic F3 - female style 3" },
    { id: "F4", label: "Supertonic F4 - female style 4" },
    { id: "F5", label: "Supertonic F5 - female style 5" }
  ];
  var isSupertonicVoiceId = (voiceId) => Boolean(voiceId && SUPERTONIC_VOICES.some((voice) => voice.id === voiceId));
  var normalizeSupertonicVoiceId = (voiceId) => isSupertonicVoiceId(voiceId) ? voiceId : DEFAULT_SUPERTONIC_VOICE;
  var isSupertonicLanguageCode = (value) => SUPERTONIC_LANGUAGE_CODES.includes(value);

  // src/lib/ortWasmConfig.ts
  var DEFAULT_ORT_WASM_PATH_PREFIX = "/models/";
  var DEFAULT_ORT_WASM_BINARY = "ort-wasm-simd-threaded.wasm";
  var normalizeOrtWasmPathPrefix = (prefix = DEFAULT_ORT_WASM_PATH_PREFIX) => prefix.endsWith("/") ? prefix : `${prefix}/`;
  var createOrtWasmPaths = (prefix = DEFAULT_ORT_WASM_PATH_PREFIX, binary = DEFAULT_ORT_WASM_BINARY) => ({
    wasm: `${normalizeOrtWasmPathPrefix(prefix)}${binary}`
  });
  var configureOrtWasmEnv = (env, options = {}) => {
    const wasm = env.wasm;
    if (options.forceWasmPaths || !wasm.wasmPaths) {
      wasm.wasmPaths = createOrtWasmPaths(options.wasmPathPrefix, options.wasmBinary);
    }
    wasm.simd = true;
    if (typeof options.numThreads === "number" && Number.isFinite(options.numThreads)) {
      wasm.numThreads = Math.max(1, Math.floor(options.numThreads));
    }
    if (typeof options.proxy === "boolean") {
      wasm.proxy = options.proxy;
    }
    return env;
  };

  // src/lib/supertonicTts/supertonicEngine.ts
  var SUPERTONIC_WEBGPU_WASM_BINARY = "ort-wasm-simd-threaded.jsep.wasm";
  var getNavigatorWebGpu = () => {
    if (typeof navigator === "undefined") return void 0;
    return navigator.gpu;
  };
  var canRequestWebGpuAdapter = () => {
    const gpu = getNavigatorWebGpu();
    return typeof gpu?.requestAdapter === "function";
  };
  var ensureWebGpuAdapter = async () => {
    const gpu = getNavigatorWebGpu();
    if (typeof gpu?.requestAdapter !== "function") {
      throw new Error("WebGPU is not exposed by this browser.");
    }
    const adapter = await gpu.requestAdapter({ powerPreference: "high-performance" }).catch(() => null) || await gpu.requestAdapter().catch(() => null);
    if (!adapter) {
      throw new Error("No usable WebGPU adapter is available.");
    }
  };
  var configureSupertonicOrt = (ortModule, executionProvider, options = {}) => {
    configureOrtWasmEnv(ortModule.env, {
      forceWasmPaths: true,
      numThreads: 1,
      proxy: false,
      wasmPathPrefix: options.wasmPathPrefix,
      wasmBinary: executionProvider === "webgpu" ? SUPERTONIC_WEBGPU_WASM_BINARY : void 0
    });
    const webgpuEnv = ortModule.env.webgpu;
    if (executionProvider === "webgpu" && webgpuEnv) {
      webgpuEnv.powerPreference = "high-performance";
    }
    return { ort: ortModule, executionProvider };
  };
  var loadSupertonicOrtRuntime = async (executionProvider, options = {}) => {
    if (executionProvider === "webgpu") {
      await ensureWebGpuAdapter();
      const ortModule2 = await Promise.resolve().then(() => (init_ort_webgpu_bundle_min(), ort_webgpu_bundle_min_exports));
      return configureSupertonicOrt(ortModule2, "webgpu", options);
    }
    const ortModule = await Promise.resolve().then(() => (init_ort_wasm_bundle_min(), ort_wasm_bundle_min_exports));
    return configureSupertonicOrt(ortModule, "wasm", options);
  };
  var UnicodeProcessor = class {
    constructor(indexer) {
      this.indexer = indexer;
    }
    call(textList, languageList) {
      const processedTexts = textList.map((text, index) => this.preprocessText(text, languageList[index] ?? DEFAULT_SUPERTONIC_LANGUAGE));
      const textIdsLengths = processedTexts.map((text) => Array.from(text).length);
      const maxLen = Math.max(...textIdsLengths);
      const textIds = processedTexts.map((text) => {
        const row = new Array(maxLen).fill(0);
        const chars = Array.from(text);
        for (let index = 0; index < chars.length; index += 1) {
          const codePoint = chars[index].codePointAt(0) ?? 0;
          row[index] = codePoint < this.indexer.length ? this.indexer[codePoint] ?? -1 : -1;
        }
        return row;
      });
      return {
        textIds,
        textMask: this.lengthToMask(textIdsLengths, maxLen)
      };
    }
    preprocessText(input, language) {
      if (!isSupertonicLanguageCode(language)) {
        throw new Error(`Invalid Supertonic language: ${language}.`);
      }
      let text = input.normalize("NFKD");
      text = text.replace(/[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u2600-\u27BF]+/gu, "");
      const replacements = {
        "\u2013": "-",
        "\u2011": "-",
        "\u2014": "-",
        "_": " ",
        "\u201C": '"',
        "\u201D": '"',
        "\u2018": "'",
        "\u2019": "'",
        "\xB4": "'",
        "`": "'",
        "[": " ",
        "]": " ",
        "|": " ",
        "/": " ",
        "#": " ",
        "\u2192": " ",
        "\u2190": " "
      };
      for (const [source, replacement] of Object.entries(replacements)) {
        text = text.split(source).join(replacement);
      }
      text = text.replace(/[\u2665\u2606\u2661\u00A9\\]/g, "").replaceAll("@", " at ").replaceAll("e.g.,", "for example, ").replaceAll("i.e.,", "that is, ").replace(/ ,/g, ",").replace(/ \./g, ".").replace(/ !/g, "!").replace(/ \?/g, "?").replace(/ ;/g, ";").replace(/ :/g, ":").replace(/ '/g, "'").replace(/\s+/g, " ").trim();
      while (text.includes('""')) text = text.replace('""', '"');
      while (text.includes("''")) text = text.replace("''", "'");
      if (!text) text = ".";
      if (!/[.!?;:,'")\]}\u2026\u3002\u300D\u300F\u3011\u3009\u300B\u203A\u00BB]$/.test(text)) {
        text += ".";
      }
      return `<${language}>${text}</${language}>`;
    }
    lengthToMask(lengths, maxLen) {
      return lengths.map((length) => {
        const row = new Array(maxLen).fill(0);
        for (let index = 0; index < Math.min(length, maxLen); index += 1) {
          row[index] = 1;
        }
        return [row];
      });
    }
  };
  var SupertonicStyle = class {
    constructor(ttl, dp) {
      this.ttl = ttl;
      this.dp = dp;
    }
    release() {
      this.ttl.dispose?.();
      this.dp.dispose?.();
    }
  };
  var SupertonicTextToSpeech = class {
    constructor(ort, cfgs, textProcessor, dpOrt, textEncOrt, vectorEstOrt, vocoderOrt) {
      this.ort = ort;
      this.cfgs = cfgs;
      this.textProcessor = textProcessor;
      this.dpOrt = dpOrt;
      this.textEncOrt = textEncOrt;
      this.vectorEstOrt = vectorEstOrt;
      this.vocoderOrt = vocoderOrt;
      this.sampleRate = Number(cfgs?.ae?.sample_rate) || 24e3;
    }
    async call(text, style, options = {}) {
      if (style.ttl.dims[0] !== 1) {
        throw new Error("Supertonic browser playback supports one voice style at a time.");
      }
      const language = normalizeLanguage(options.language);
      const maxLen = language === "ko" || language === "ja" ? 120 : 300;
      const chunks = chunkText(text, maxLen);
      const parts = [];
      let totalLength = 0;
      let totalDuration = 0;
      for (let index = 0; index < chunks.length; index += 1) {
        if (options.shouldAbort?.()) break;
        const result = await this.infer([chunks[index]], [language], style, options);
        parts.push(result.samples);
        totalLength += result.samples.length;
        totalDuration += result.duration;
        if (index < chunks.length - 1) {
          const silenceDuration = Math.max(0, options.silenceDuration ?? 0.3);
          const silenceLength = Math.floor(silenceDuration * this.sampleRate);
          if (silenceLength > 0) {
            parts.push(new Float32Array(silenceLength));
            totalLength += silenceLength;
            totalDuration += silenceDuration;
          }
        }
      }
      const samples = new Float32Array(totalLength);
      let offset = 0;
      for (const part of parts) {
        samples.set(part, offset);
        offset += part.length;
      }
      return {
        samples,
        duration: totalDuration,
        sampleRate: this.sampleRate
      };
    }
    release() {
      for (const session of [this.dpOrt, this.textEncOrt, this.vectorEstOrt, this.vocoderOrt]) {
        void session.release?.();
      }
    }
    async infer(textList, languageList, style, options) {
      const batchSize = textList.length;
      const { textIds, textMask } = this.textProcessor.call(textList, languageList);
      const textIdsFlat = new BigInt64Array(textIds.flat().map((value) => BigInt(value)));
      const textIdsTensor = new this.ort.Tensor("int64", textIdsFlat, [batchSize, textIds[0].length]);
      const textMaskTensor = new this.ort.Tensor(
        "float32",
        new Float32Array(textMask.flat(2)),
        [batchSize, 1, textMask[0][0].length]
      );
      try {
        const dpOutputs = await this.dpOrt.run({
          text_ids: textIdsTensor,
          style_dp: style.dp,
          text_mask: textMaskTensor
        });
        const duration = Array.from(dpOutputs.duration.data);
        const speed = normalizeSpeed(options.speed);
        for (let index = 0; index < duration.length; index += 1) {
          duration[index] /= speed;
        }
        const textEncOutputs = await this.textEncOrt.run({
          text_ids: textIdsTensor,
          style_ttl: style.ttl,
          text_mask: textMaskTensor
        });
        const textEmb = textEncOutputs.text_emb;
        let { xt: xt2, latentMask } = this.sampleNoisyLatent(duration);
        const latentMaskTensor = new this.ort.Tensor(
          "float32",
          new Float32Array(latentMask.flat(2)),
          [batchSize, 1, latentMask[0][0].length]
        );
        const steps = normalizeSteps(options.steps);
        const totalStepTensor = new this.ort.Tensor("float32", new Float32Array(batchSize).fill(steps), [batchSize]);
        try {
          for (let step = 0; step < steps; step += 1) {
            if (options.shouldAbort?.()) {
              throw new DOMException("Supertonic TTS was stopped.", "AbortError");
            }
            options.onProgress?.(step + 1, steps);
            const xtShape = [batchSize, xt2[0].length, xt2[0][0].length];
            const xtTensor = new this.ort.Tensor("float32", new Float32Array(xt2.flat(2)), xtShape);
            const currentStepTensor = new this.ort.Tensor(
              "float32",
              new Float32Array(batchSize).fill(step),
              [batchSize]
            );
            try {
              const vectorEstOutputs = await this.vectorEstOrt.run({
                noisy_latent: xtTensor,
                text_emb: textEmb,
                style_ttl: style.ttl,
                latent_mask: latentMaskTensor,
                text_mask: textMaskTensor,
                current_step: currentStepTensor,
                total_step: totalStepTensor
              });
              xt2 = reshape3d(
                Array.from(vectorEstOutputs.denoised_latent.data),
                xtShape
              );
            } finally {
              xtTensor.dispose?.();
              currentStepTensor.dispose?.();
            }
          }
          const finalXtShape = [batchSize, xt2[0].length, xt2[0][0].length];
          const finalXtTensor = new this.ort.Tensor("float32", new Float32Array(xt2.flat(2)), finalXtShape);
          try {
            const vocoderOutputs = await this.vocoderOrt.run({ latent: finalXtTensor });
            const wavData = vocoderOutputs.wav_tts.data;
            return {
              samples: new Float32Array(wavData),
              duration: duration[0] ?? 0
            };
          } finally {
            finalXtTensor.dispose?.();
          }
        } finally {
          textEmb.dispose?.();
          latentMaskTensor.dispose?.();
          totalStepTensor.dispose?.();
        }
      } finally {
        textIdsTensor.dispose?.();
        textMaskTensor.dispose?.();
      }
    }
    sampleNoisyLatent(duration) {
      const batchSize = duration.length;
      const maxDuration = Math.max(...duration);
      const wavLenMax = Math.floor(maxDuration * this.sampleRate);
      const wavLengths = duration.map((value) => Math.floor(value * this.sampleRate));
      const baseChunkSize = Number(this.cfgs?.ae?.base_chunk_size) || 1024;
      const chunkCompress = Number(this.cfgs?.ttl?.chunk_compress_factor) || 1;
      const latentDim = Number(this.cfgs?.ttl?.latent_dim) || 64;
      const chunkSize = baseChunkSize * chunkCompress;
      const latentLen = Math.floor((wavLenMax + chunkSize - 1) / chunkSize);
      const latentDimValue = latentDim * chunkCompress;
      const xt2 = [];
      for (let batch = 0; batch < batchSize; batch += 1) {
        const sample = [];
        for (let dim = 0; dim < latentDimValue; dim += 1) {
          const row = [];
          for (let tick = 0; tick < latentLen; tick += 1) {
            row.push(randomNormal());
          }
          sample.push(row);
        }
        xt2.push(sample);
      }
      const latentLengths = wavLengths.map((length) => Math.floor((length + chunkSize - 1) / chunkSize));
      const latentMask = lengthToMask(latentLengths, latentLen);
      for (let batch = 0; batch < batchSize; batch += 1) {
        for (let dim = 0; dim < latentDimValue; dim += 1) {
          for (let tick = 0; tick < latentLen; tick += 1) {
            xt2[batch][dim][tick] *= latentMask[batch][0][tick];
          }
        }
      }
      return { xt: xt2, latentMask };
    }
  };
  var loadSupertonicVoiceStyleWithRuntime = async (runtime, voiceStylePaths, resourceLoader2) => {
    const firstStyle = await fetchJson(voiceStylePaths[0], resourceLoader2);
    const ttlDims = firstStyle.style_ttl.dims;
    const dpDims = firstStyle.style_dp.dims;
    const ttlFlat = new Float32Array(voiceStylePaths.length * ttlDims[1] * ttlDims[2]);
    const dpFlat = new Float32Array(voiceStylePaths.length * dpDims[1] * dpDims[2]);
    for (let index = 0; index < voiceStylePaths.length; index += 1) {
      const style = index === 0 ? firstStyle : await fetchJson(voiceStylePaths[index], resourceLoader2);
      ttlFlat.set(flattenNumbers(style.style_ttl.data), index * ttlDims[1] * ttlDims[2]);
      dpFlat.set(flattenNumbers(style.style_dp.data), index * dpDims[1] * dpDims[2]);
    }
    return new SupertonicStyle(
      new runtime.ort.Tensor("float32", ttlFlat, [voiceStylePaths.length, ttlDims[1], ttlDims[2]]),
      new runtime.ort.Tensor("float32", dpFlat, [voiceStylePaths.length, dpDims[1], dpDims[2]])
    );
  };
  var loadSupertonicModel = async (onnxDir, progressCallback, options = {}) => {
    const shouldTryWebGpu = options.preferWebGpu === true && canRequestWebGpuAdapter();
    if (shouldTryWebGpu) {
      try {
        return await loadSupertonicModelWithRuntime(
          onnxDir,
          await loadSupertonicOrtRuntime("webgpu", options),
          progressCallback,
          options.resourceLoader
        );
      } catch (error) {
        options.onProviderFallback?.("webgpu", error);
      }
    }
    return loadSupertonicModelWithRuntime(
      onnxDir,
      await loadSupertonicOrtRuntime("wasm", options),
      progressCallback,
      options.resourceLoader
    );
  };
  var loadSupertonicModelWithRuntime = async (onnxDir, runtime, progressCallback, resourceLoader2) => {
    const cfgs = await fetchJson(`${onnxDir}/tts.json`, resourceLoader2);
    const modelPaths = [
      ["Duration Predictor", `${onnxDir}/duration_predictor.onnx`],
      ["Text Encoder", `${onnxDir}/text_encoder.onnx`],
      ["Vector Estimator", `${onnxDir}/vector_estimator.onnx`],
      ["Vocoder", `${onnxDir}/vocoder.onnx`]
    ];
    const sessionOptions = {
      executionProviders: [runtime.executionProvider],
      graphOptimizationLevel: "all"
    };
    const sessions = [];
    try {
      for (let index = 0; index < modelPaths.length; index += 1) {
        const [name, path] = modelPaths[index];
        progressCallback?.(name, index + 1, modelPaths.length);
        if (resourceLoader2?.fetchArrayBuffer) {
          const modelBytes = new Uint8Array(await resourceLoader2.fetchArrayBuffer(path));
          sessions.push(await runtime.ort.InferenceSession.create(modelBytes, sessionOptions));
        } else {
          sessions.push(await runtime.ort.InferenceSession.create(path, sessionOptions));
        }
      }
      const textProcessor = await loadTextProcessor(onnxDir, resourceLoader2);
      const textToSpeech = new SupertonicTextToSpeech(
        runtime.ort,
        cfgs,
        textProcessor,
        sessions[0],
        sessions[1],
        sessions[2],
        sessions[3]
      );
      return {
        textToSpeech,
        executionProvider: runtime.executionProvider,
        loadVoiceStyle: (voiceStylePaths) => loadSupertonicVoiceStyleWithRuntime(runtime, voiceStylePaths, resourceLoader2),
        release: () => textToSpeech.release()
      };
    } catch (error) {
      for (const session of sessions) {
        void session.release?.();
      }
      throw error;
    }
  };
  var loadTextProcessor = async (onnxDir, resourceLoader2) => {
    const indexer = await fetchJson(`${onnxDir}/unicode_indexer.json`, resourceLoader2);
    return new UnicodeProcessor(indexer);
  };
  var normalizeLanguage = (language) => language && isSupertonicLanguageCode(language) ? language : DEFAULT_SUPERTONIC_LANGUAGE;
  var normalizeSteps = (steps) => {
    if (!Number.isFinite(steps)) return DEFAULT_SUPERTONIC_STEPS;
    return Math.max(1, Math.min(16, Math.round(Number(steps))));
  };
  var normalizeSpeed = (speed) => {
    if (!Number.isFinite(speed)) return DEFAULT_SUPERTONIC_SPEED;
    return Math.max(0.75, Math.min(1.5, Number(speed)));
  };
  var fetchJson = async (url, resourceLoader2) => {
    if (resourceLoader2?.fetchJson) {
      return resourceLoader2.fetchJson(url);
    }
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }
    return response.json();
  };
  var flattenNumbers = (value) => {
    const result = [];
    const visit = (item) => {
      if (Array.isArray(item)) {
        item.forEach(visit);
      } else if (typeof item === "number") {
        result.push(item);
      }
    };
    visit(value);
    return result;
  };
  var chunkText = (text, maxLen = 300) => {
    const paragraphs = text.trim().split(/\n\s*\n+/).filter(Boolean);
    const chunks = [];
    for (const paragraph of paragraphs) {
      const parts = paragraph.match(/[^.!?]+[.!?]*/g) ?? [paragraph];
      let current = "";
      for (const part of parts.map((value) => value.trim()).filter(Boolean)) {
        if (current && current.length + part.length + 1 > maxLen) {
          chunks.push(current);
          current = part;
        } else {
          current = current ? `${current} ${part}` : part;
        }
      }
      if (current) chunks.push(current);
    }
    return chunks.length > 0 ? chunks : [text.trim()];
  };
  var lengthToMask = (lengths, maxLen) => lengths.map((length) => {
    const row = new Array(maxLen).fill(0);
    for (let index = 0; index < Math.min(length, maxLen); index += 1) {
      row[index] = 1;
    }
    return [row];
  });
  var randomNormal = () => {
    const first = Math.max(1e-4, Math.random());
    const second = Math.random();
    return Math.sqrt(-2 * Math.log(first)) * Math.cos(2 * Math.PI * second);
  };
  var reshape3d = (values, shape) => {
    const [batchSize, depth, length] = shape;
    const output = [];
    let offset = 0;
    for (let batch = 0; batch < batchSize; batch += 1) {
      const sample = [];
      for (let dim = 0; dim < depth; dim += 1) {
        const row = [];
        for (let tick = 0; tick < length; tick += 1) {
          row.push(values[offset++]);
        }
        sample.push(row);
      }
      output.push(sample);
    }
    return output;
  };

  // src/services/supertonicTtsCache.ts
  var SUPERTONIC_MODEL_CACHE_NAME = "curio-models-v2";
  var SUPERTONIC_CACHE_CHANGED_EVENT = "curio:supertonic-cache-changed";
  var normalizeRequestUrl = (url) => {
    try {
      return new URL(url, globalThis.location?.href ?? "http://localhost/").href;
    } catch {
      return url;
    }
  };
  var notifySupertonicCacheChanged = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event(SUPERTONIC_CACHE_CHANGED_EVENT));
  };
  var cacheFirstSupertonicFetch = async (url) => {
    const request = new Request(normalizeRequestUrl(url), { method: "GET" });
    if (typeof caches === "undefined") {
      return fetch(request, { cache: "force-cache" });
    }
    const cache = await caches.open(SUPERTONIC_MODEL_CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached.clone();
    const response = await fetch(request);
    if (response.ok) {
      try {
        await cache.put(request, response.clone());
        notifySupertonicCacheChanged();
      } catch {
      }
    }
    return response;
  };
  var cacheFirstSupertonicJson = async (url) => {
    const response = await cacheFirstSupertonicFetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }
    return response.json();
  };
  var cacheFirstSupertonicArrayBuffer = async (url) => {
    const response = await cacheFirstSupertonicFetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }
    return response.arrayBuffer();
  };

  // src/lib/supertonicTts/inference.worker.ts
  var resourceLoader = {
    fetchJson: cacheFirstSupertonicJson,
    fetchArrayBuffer: cacheFirstSupertonicArrayBuffer
  };
  var PCM_CHUNK_SAMPLES = 16384;
  var modelBaseUrl = null;
  var modelPromise = null;
  var styleCache = /* @__PURE__ */ new Map();
  var abortedIds = /* @__PURE__ */ new Set();
  var post = (msg, transfer) => {
    if (transfer && transfer.length) {
      self.postMessage(msg, transfer);
    } else {
      self.postMessage(msg);
    }
  };
  var postProgress = (id, message) => {
    post({ type: "progress", id, message });
  };
  var yieldBetweenPostedChunks = () => new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  var getModel = async (id, baseUrl) => {
    if (modelPromise && modelBaseUrl === baseUrl) return modelPromise;
    releaseModelState();
    modelBaseUrl = baseUrl;
    modelPromise = loadSupertonicModel(`${baseUrl}/onnx`, (modelName, current, total) => {
      postProgress(id, `Loading Supertonic ${modelName} (${current}/${total})...`);
    }, {
      resourceLoader,
      onProviderFallback: () => {
        postProgress(id, "Supertonic WebGPU is unavailable here; using WASM.");
      }
    }).catch((error) => {
      modelPromise = null;
      throw error;
    });
    return modelPromise;
  };
  var getStyle = async (id, baseUrl, model, voiceId) => {
    const normalizedVoiceId = normalizeSupertonicVoiceId(voiceId);
    const cacheKey = `${baseUrl}:${model.executionProvider}:${normalizedVoiceId}`;
    const cached = styleCache.get(cacheKey);
    if (cached) return cached;
    postProgress(id, `Loading Supertonic ${normalizedVoiceId} voice...`);
    const promise = model.loadVoiceStyle([`${baseUrl}/voice_styles/${normalizedVoiceId}.json`]).catch((error) => {
      styleCache.delete(cacheKey);
      throw error;
    });
    styleCache.set(cacheKey, promise);
    return promise;
  };
  var releaseModelState = () => {
    modelPromise?.then((model) => model.release()).catch(() => {
    });
    modelPromise = null;
    modelBaseUrl = null;
    for (const stylePromise of styleCache.values()) {
      stylePromise.then((style) => style.release()).catch(() => {
      });
    }
    styleCache = /* @__PURE__ */ new Map();
  };
  var ensureReady = async (id, baseUrl, voiceId) => {
    const model = await getModel(id, baseUrl);
    await getStyle(id, baseUrl, model, voiceId);
    return model;
  };
  self.addEventListener("message", async (event) => {
    const msg = event.data;
    if (msg.type === "abort") {
      abortedIds.add(msg.id);
      return;
    }
    if (msg.type === "release") {
      releaseModelState();
      abortedIds.clear();
      return;
    }
    if (msg.type === "warmup") {
      try {
        const model = await ensureReady(msg.id, msg.baseUrl, msg.voiceId);
        post({ type: "ready", id: msg.id, executionProvider: model.executionProvider });
      } catch (error) {
        post({ type: "error", id: msg.id, message: error instanceof Error ? error.message : String(error) });
      } finally {
        abortedIds.delete(msg.id);
      }
      return;
    }
    if (msg.type === "speak") {
      try {
        const voiceId = normalizeSupertonicVoiceId(msg.voiceId);
        const model = await ensureReady(msg.id, msg.baseUrl, voiceId);
        const style = await getStyle(msg.id, msg.baseUrl, model, voiceId);
        postProgress(msg.id, `Generating Supertonic ${voiceId}...`);
        const result = await model.textToSpeech.call(msg.text, style, {
          speed: msg.speed ?? DEFAULT_SUPERTONIC_SPEED,
          onProgress: (step, total) => postProgress(msg.id, `Supertonic denoising ${step}/${total}...`),
          shouldAbort: () => abortedIds.has(msg.id)
        });
        for (let offset = 0; offset < result.samples.length; offset += PCM_CHUNK_SAMPLES) {
          if (abortedIds.has(msg.id)) {
            throw new DOMException("Supertonic TTS was stopped.", "AbortError");
          }
          const chunk = result.samples.slice(offset, offset + PCM_CHUNK_SAMPLES);
          post({
            type: "chunk",
            id: msg.id,
            samples: chunk,
            sampleRate: result.sampleRate
          }, [chunk.buffer]);
          await yieldBetweenPostedChunks();
        }
        post({
          type: "done",
          id: msg.id,
          sampleRate: result.sampleRate,
          duration: result.duration,
          executionProvider: model.executionProvider
        });
      } catch (error) {
        post({ type: "error", id: msg.id, message: error instanceof Error ? error.message : String(error) });
      } finally {
        abortedIds.delete(msg.id);
      }
    }
  });
})();
/*! Bundled license information:

onnxruntime-web/dist/ort.webgpu.bundle.min.mjs:
onnxruntime-web/dist/ort.wasm.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.24.3
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)
*/
