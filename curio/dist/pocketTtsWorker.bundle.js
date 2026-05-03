"use strict";
(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // node_modules/onnxruntime-web/dist/ort.wasm.bundle.min.mjs
  var import_meta = {};
  var Jt = Object.defineProperty;
  var Za = Object.getOwnPropertyDescriptor;
  var Qa = Object.getOwnPropertyNames;
  var Ka = Object.prototype.hasOwnProperty;
  var qt = ((n) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(n, { get: (t, a) => (typeof __require < "u" ? __require : t)[a] }) : n)(function(n) {
    if (typeof __require < "u") return __require.apply(this, arguments);
    throw Error('Dynamic require of "' + n + '" is not supported');
  });
  var N = (n, t) => () => (n && (t = n(n = 0)), t);
  var it = (n, t) => {
    for (var a in t) Jt(n, a, { get: t[a], enumerable: true });
  };
  var es = (n, t, a, u) => {
    if (t && typeof t == "object" || typeof t == "function") for (let o of Qa(t)) !Ka.call(n, o) && o !== a && Jt(n, o, { get: () => t[o], enumerable: !(u = Za(t, o)) || u.enumerable });
    return n;
  };
  var Xt = (n) => es(Jt({}, "__esModule", { value: true }), n);
  var ut;
  var Be;
  var Je;
  var ts;
  var dr;
  var Zt = N(() => {
    "use strict";
    ut = /* @__PURE__ */ new Map(), Be = [], Je = (n, t, a) => {
      if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
        let u = ut.get(n);
        if (u === void 0) ut.set(n, { backend: t, priority: a });
        else {
          if (u.priority > a) return;
          if (u.priority === a && u.backend !== t) throw new Error(`cannot register backend "${n}" using priority ${a}`);
        }
        if (a >= 0) {
          let o = Be.indexOf(n);
          o !== -1 && Be.splice(o, 1);
          for (let d = 0; d < Be.length; d++) if (ut.get(Be[d]).priority <= a) {
            Be.splice(d, 0, n);
            return;
          }
          Be.push(n);
        }
        return;
      }
      throw new TypeError("not a valid backend");
    }, ts = async (n) => {
      let t = ut.get(n);
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
    }, dr = async (n) => {
      let t = n.executionProviders || [], a = t.map((m) => typeof m == "string" ? m : m.name), u = a.length === 0 ? Be : a, o, d = [], c = /* @__PURE__ */ new Set();
      for (let m of u) {
        let h = await ts(m);
        typeof h == "string" ? d.push({ name: m, err: h }) : (o || (o = h), o === h && c.add(m));
      }
      if (!o) throw new Error(`no available backend found. ERR: ${d.map((m) => `[${m.name}] ${m.err}`).join(", ")}`);
      for (let { name: m, err: h } of d) a.includes(m) && console.warn(`removing requested execution provider "${m}" from session options because it is not available: ${h}`);
      let l = t.filter((m) => c.has(typeof m == "string" ? m : m.name));
      return [o, new Proxy(n, { get: (m, h) => h === "executionProviders" ? l : Reflect.get(m, h) })];
    };
  });
  var pr = N(() => {
    "use strict";
    Zt();
  });
  var mr;
  var hr = N(() => {
    "use strict";
    mr = "1.24.3";
  });
  var wr;
  var J;
  var Qt = N(() => {
    "use strict";
    hr();
    wr = "warning", J = { wasm: {}, webgl: {}, webgpu: {}, versions: { common: mr }, set logLevel(n) {
      if (n !== void 0) {
        if (typeof n != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(n) === -1) throw new Error(`Unsupported logging level: ${n}`);
        wr = n;
      }
    }, get logLevel() {
      return wr;
    } };
    Object.defineProperty(J, "logLevel", { enumerable: true });
  });
  var Y;
  var br = N(() => {
    "use strict";
    Qt();
    Y = J;
  });
  var yr;
  var gr;
  var Er = N(() => {
    "use strict";
    yr = (n, t) => {
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
        for (let U = 0; U < d; U++) for (let z = 0; z < o; z++) {
          let v = (n.data[b++] - h[0]) * m[0], O = (n.data[y++] - h[1]) * m[1], F = (n.data[T++] - h[2]) * m[2], D = I === -1 ? 255 : (n.data[I++] - h[3]) * m[3];
          u.fillStyle = "rgba(" + v + "," + O + "," + F + "," + D + ")", u.fillRect(z, U, 1, 1);
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
        let y = 4, T = 0, I = 1, U = 2, z = 3, v = 0, O = b, F = b * 2, D = -1;
        l === "RGBA" ? (v = 0, O = b, F = b * 2, D = b * 3) : l === "RGB" ? (v = 0, O = b, F = b * 2) : l === "RBG" && (v = 0, F = b, O = b * 2), u = a.createImageData(o, d);
        for (let k = 0; k < d * o; T += y, I += y, U += y, z += y, k++) u.data[T] = (n.data[v++] - g[0]) * h[0], u.data[I] = (n.data[O++] - g[1]) * h[1], u.data[U] = (n.data[F++] - g[2]) * h[2], u.data[z] = D === -1 ? 255 : (n.data[D++] - g[3]) * h[3];
      } else throw new Error("Can not access image data");
      return u;
    };
  });
  var Kt;
  var Tr;
  var Sr;
  var vr;
  var Or;
  var Ar;
  var Ir = N(() => {
    "use strict";
    ft();
    Kt = (n, t) => {
      if (n === void 0) throw new Error("Image buffer must be defined");
      if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
      if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
      let { height: a, width: u } = t, o = t.norm ?? { mean: 255, bias: 0 }, d, c;
      typeof o.mean == "number" ? d = [o.mean, o.mean, o.mean, o.mean] : d = [o.mean[0], o.mean[1], o.mean[2], o.mean[3] ?? 255], typeof o.bias == "number" ? c = [o.bias, o.bias, o.bias, o.bias] : c = [o.bias[0], o.bias[1], o.bias[2], o.bias[3] ?? 0];
      let l = t.format !== void 0 ? t.format : "RGBA", m = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", h = a * u, g = m === "RGBA" ? new Float32Array(h * 4) : new Float32Array(h * 3), b = 4, y = 0, T = 1, I = 2, U = 3, z = 0, v = h, O = h * 2, F = -1;
      l === "RGB" && (b = 3, y = 0, T = 1, I = 2, U = -1), m === "RGBA" ? F = h * 3 : m === "RBG" ? (z = 0, O = h, v = h * 2) : m === "BGR" && (O = 0, v = h, z = h * 2);
      for (let k = 0; k < h; k++, y += b, I += b, T += b, U += b) g[z++] = (n[y] + c[0]) / d[0], g[v++] = (n[T] + c[1]) / d[1], g[O++] = (n[I] + c[2]) / d[2], F !== -1 && U !== -1 && (g[F++] = (n[U] + c[3]) / d[3]);
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
          return b.drawImage(n, 0, 0, T, y), c = b.getImageData(0, 0, T, y).data, l.height = y, l.width = T, Kt(c, l);
        } else throw new Error("Can not access image data");
      } else {
        if (d) return new Promise((g, b) => {
          let y = m(), T = h(y);
          if (!n || !T) return b();
          let I = new Image();
          I.crossOrigin = "Anonymous", I.src = n, I.onload = () => {
            y.width = I.width, y.height = I.height, T.drawImage(I, 0, 0, y.width, y.height);
            let U = T.getImageData(0, 0, y.width, y.height);
            l.height = y.height, l.width = y.width, g(Kt(U.data, l));
          };
        });
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
      if (c !== void 0) return Kt(c, l);
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
  var Le;
  var qe;
  var Br;
  var Lr;
  var Pr = N(() => {
    "use strict";
    Le = /* @__PURE__ */ new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), qe = /* @__PURE__ */ new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), Br = false, Lr = () => {
      if (!Br) {
        Br = true;
        let n = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, a = globalThis.Float16Array, u = typeof a < "u" && a.from;
        n && (Le.set("int64", BigInt64Array), qe.set(BigInt64Array, "int64")), t && (Le.set("uint64", BigUint64Array), qe.set(BigUint64Array, "uint64")), u ? (Le.set("float16", a), qe.set(a, "float16")) : Le.set("float16", Uint16Array);
      }
    };
  });
  var Dr;
  var _r;
  var Ur = N(() => {
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
  var Z;
  var ft = N(() => {
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
        return yr(this, t);
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
  var de;
  var en = N(() => {
    "use strict";
    ft();
    de = Z;
  });
  var xr;
  var Mr;
  var Pe;
  var De;
  var _e;
  var Ue;
  var tn = N(() => {
    "use strict";
    Qt();
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
  var ct;
  var Cr = N(() => {
    "use strict";
    Zt();
    en();
    tn();
    ct = class n {
      constructor(t) {
        this.handler = t;
      }
      async run(t, a, u) {
        Pe(), _e("InferenceSession.run");
        let o = {}, d = {};
        if (typeof t != "object" || t === null || t instanceof de || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
        let c = true;
        if (typeof a == "object") {
          if (a === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
          if (a instanceof de) throw new TypeError("'fetches' cannot be a Tensor");
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
              (y === null || y instanceof de) && (h = true, c = false, o[b] = y);
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
          g instanceof de ? m[h] = g : m[h] = new de(g.type, g.data, g.dims);
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
        let [l, m] = await dr(c), h = await l.createInferenceSessionHandler(d, m);
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
  var ns;
  var Rr = N(() => {
    "use strict";
    Cr();
    ns = ct;
  });
  var Fr = N(() => {
    "use strict";
  });
  var Nr = N(() => {
    "use strict";
  });
  var kr = N(() => {
    "use strict";
  });
  var Wr = N(() => {
    "use strict";
  });
  var nn = {};
  it(nn, { InferenceSession: () => ns, TRACE: () => xr, TRACE_EVENT_BEGIN: () => _e, TRACE_EVENT_END: () => Ue, TRACE_FUNC_BEGIN: () => Pe, TRACE_FUNC_END: () => De, Tensor: () => de, env: () => Y, registerBackend: () => Je });
  var Te = N(() => {
    "use strict";
    pr();
    br();
    Rr();
    en();
    Fr();
    Nr();
    tn();
    kr();
    Wr();
  });
  var lt = N(() => {
    "use strict";
  });
  var Hr = {};
  it(Hr, { default: () => rs });
  var $r;
  var zr;
  var rs;
  var jr = N(() => {
    "use strict";
    rn();
    xe();
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
            ht(o, u).then(() => {
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
            bt(a), postMessage({ type: t });
            break;
          case "run": {
            let { sessionId: u, inputIndices: o, inputs: d, outputIndices: c, options: l } = a;
            yt(u, o, d, c, new Array(c.length).fill(null), l).then((m) => {
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
    rs = zr ? null : (n) => new Worker(n ?? oe, { type: "module", name: $r });
  });
  var Yr = {};
  it(Yr, { default: () => os });
  async function Vr(n = {}) {
    var t = n, a = !!globalThis.window, u = !!globalThis.WorkerGlobalScope, o = u && self.name?.startsWith("em-pthread");
    t.mountExternalData = (e, r) => {
      e.startsWith("./") && (e = e.substring(2)), (t.Sb || (t.Sb = /* @__PURE__ */ new Map())).set(e, r);
    }, t.unmountExternalData = () => {
      delete t.Sb;
    }, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({ initial: 0, maximum: 0, kc: true }).buffer.constructor;
    var d, c, l = (e, r) => {
      throw r;
    }, m = import_meta.url, h = "";
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
    var g, b, y, T, I, U, z = console.log.bind(console), v = console.error.bind(console), O = z, F = v, D = false, k = (e) => e.startsWith("file://");
    function w() {
      ge.buffer != j.buffer && ee();
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
            }, p == "print" && (O = t[p]), p == "printErr" && (F = t[p]));
            ge = i.ec, ee(), b = i.fc, Ut(), st();
          } else if (s === "run") {
            (function(f) {
              var p = (w(), W)[f + 52 >>> 2 >>> 0];
              f = (w(), W)[f + 56 >>> 2 >>> 0], sr(p, p - f), P(p);
            })(i.Pb), zt(i.Pb, 0, 0, 1, 0, 0), wn(), Ft(i.Pb), Q ||= true;
            try {
              Ao(i.cc, i.Ub);
            } catch (f) {
              if (f != "unwind") throw f;
            }
          } else i.target !== "setimmediate" && (s === "checkMailbox" ? Q && nt() : s && (F(`worker: received unknown command ${s}`), F(i)));
        } catch (f) {
          throw tr(), f;
        }
      };
      var vs = e, Q = false;
      self.onunhandledrejection = (r) => {
        throw r.reason || r;
      }, self.onmessage = e;
    }
    var j, ne, pe, B, W, re, me, A, K, He = false;
    function ee() {
      var e = ge.buffer;
      t.HEAP8 = j = new Int8Array(e), pe = new Int16Array(e), t.HEAPU8 = ne = new Uint8Array(e), new Uint16Array(e), t.HEAP32 = B = new Int32Array(e), t.HEAPU32 = W = new Uint32Array(e), re = new Float32Array(e), me = new Float64Array(e), A = new BigInt64Array(e), new BigUint64Array(e);
    }
    function he() {
      He = true, o ? U() : Ee.Ua();
    }
    function H(e) {
      throw F(e = "Aborted(" + e + ")"), D = true, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), I?.(e), e;
    }
    function q() {
      return { a: { S: fa, f: Io, w: Bo, e: Lo, j: Po, g: Do, T: _o, b: Uo, G: xo, ua: vn, k: Mo, K: In, Ka: Bn, qa: Ln, sa: Pn, La: Dn, Ia: _n, Ba: Un, Ha: xn, Z: Mn, ra: Cn, oa: Rn, Ja: Fn, pa: Nn, Qa: Co, Ea: Ro, ma: No, va: ko, ja: Wo, U: Go, Da: Ft, Na: $o, ya: zo, za: Ho, Aa: jo, wa: $n, xa: zn, ka: Hn, Sa: Yo, Pa: Xo, W: Zo, V: Qo, Oa: Jo, F: Ko, Ma: ea, na: ta, u: Vo, H: na, R: ot, la: oa, da: ra, Ta: aa, Fa: Yn, Ga: Jn, ta: ye, L: qn, Y: Xn, Ca: Zn, X: Qn, $: Va, M: ka, aa: ja, N: Na, v: Pa, c: pa, m: la, n: ca, r: va, ea: Ca, x: Ia, o: ha, O: Ra, D: Wa, I: Ma, ba: Ha, ca: za, Q: Da, P: xa, fa: _a, z: Ba, E: Fa, d: ma, q: wa, i: da, _: Ya, l: ya, p: ga, s: ba, t: Ea, y: Oa, ga: La, B: Ga, J: Aa, C: $a, ha: Sa, ia: Ta, A: Ua, h: ia, a: ge, Ra: V } };
    }
    async function Ut() {
      function e(s, f) {
        return Ee = s.exports, Ee = (function() {
          var p = Ee, E = (M) => () => M() >>> 0, S = (M) => (R) => M(R) >>> 0;
          return (p = Object.assign({}, p)).tb = E(p.tb), p.vb = S(p.vb), p.Jb = S(p.Jb), p.Kb = E(p.Kb), p.Ob = S(p.Ob), p;
        })(), mn.push(Ee.wb), s = Ee, t._OrtInit = s.Va, t._OrtGetLastError = s.Wa, t._OrtCreateSessionOptions = s.Xa, t._OrtAppendExecutionProvider = s.Ya, t._OrtAddFreeDimensionOverride = s.Za, t._OrtAddSessionConfigEntry = s._a, t._OrtReleaseSessionOptions = s.$a, t._OrtCreateSession = s.ab, t._OrtReleaseSession = s.bb, t._OrtGetInputOutputCount = s.cb, t._OrtGetInputOutputMetadata = s.db, t._OrtFree = s.eb, t._OrtCreateTensor = s.fb, t._OrtGetTensorData = s.gb, t._OrtReleaseTensor = s.hb, t._OrtCreateRunOptions = s.ib, t._OrtAddRunConfigEntry = s.jb, t._OrtReleaseRunOptions = s.kb, t._OrtCreateBinding = s.lb, t._OrtBindInput = s.mb, t._OrtBindOutput = s.nb, t._OrtClearBoundOutputs = s.ob, t._OrtReleaseBinding = s.pb, t._OrtRunWithBinding = s.qb, t._OrtRun = s.rb, t._OrtEndProfiling = s.sb, at = s.tb, Kn = t._free = s.ub, er = t._malloc = s.vb, zt = s.yb, tr = s.zb, nr = s.Ab, rr = s.Bb, Ht = s.Cb, or = s.Db, ar = s.Eb, x = s.Fb, Ye = s.Gb, sr = s.Hb, P = s.Ib, jt = s.Jb, _ = s.Kb, ir = s.Lb, Vt = s.Mb, ur = s.Nb, fr = s.Ob, cr = s.xb, b = f, Ee;
      }
      var r, i = q();
      return t.instantiateWasm ? new Promise((s) => {
        t.instantiateWasm(i, (f, p) => {
          s(e(f, p));
        });
      }) : o ? e(new WebAssembly.Instance(b, q()), b) : (K ??= t.locateFile ? t.locateFile ? t.locateFile("ort-wasm-simd-threaded.wasm", h) : h + "ort-wasm-simd-threaded.wasm" : new URL("ort-wasm-simd-threaded.wasm", import_meta.url).href, r = await (async function(s) {
        var f = K;
        if (!g && !k(f)) try {
          var p = fetch(f, { credentials: "same-origin" });
          return await WebAssembly.instantiateStreaming(p, s);
        } catch (E) {
          F(`wasm streaming compile failed: ${E}`), F("falling back to ArrayBuffer instantiation");
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
            F(`failed to asynchronously prepare wasm: ${R}`), H(R);
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
    }, je = [], Re = 0, te = null, ue = (e) => {
      ce.length == 0 && (yn(), bn(ce[0]));
      var r = ce.pop();
      if (!r) return 6;
      Fe.push(r), Oe[e.Pb] = r, r.Pb = e.Pb;
      var i = { Qb: "run", cc: e.bc, Ub: e.Ub, Pb: e.Pb };
      return r.postMessage(i, e.Yb), 0;
    }, se = 0, L = (e, r, ...i) => {
      var s, f = 16 * i.length, p = _(), E = jt(f), S = E >>> 3;
      for (s of i) typeof s == "bigint" ? ((w(), A)[S++ >>> 0] = 1n, (w(), A)[S++ >>> 0] = s) : ((w(), A)[S++ >>> 0] = 0n, (w(), me)[S++ >>> 0] = s);
      return e = nr(e, 0, f, E, r), P(p), e;
    };
    function V(e) {
      if (o) return L(0, 1, e);
      if (y = e, !(0 < se)) {
        for (var r of Fe) ve(r);
        for (r of ce) ve(r);
        ce = [], Fe = [], Oe = {}, D = true;
      }
      l(0, new Se(e));
    }
    function fe(e) {
      if (o) return L(1, 0, e);
      ye(e);
    }
    var ye = (e) => {
      if (y = e, o) throw fe(e), "unwind";
      V(e);
    }, ce = [], Fe = [], mn = [], Oe = {}, hn = (e) => {
      var r = e.Pb;
      delete Oe[r], ce.push(e), Fe.splice(Fe.indexOf(e), 1), e.Pb = 0, rr(r);
    };
    function wn() {
      mn.forEach((e) => e());
    }
    var bn = (e) => new Promise((r) => {
      e.onmessage = (f) => {
        var p = f.data;
        if (f = p.Qb, p.Tb && p.Tb != at()) {
          var E = Oe[p.Tb];
          E ? E.postMessage(p, p.Yb) : F(`Internal error! Worker sent a message "${f}" to target pthread ${p.Tb}, but that thread no longer exists!`);
        } else f === "checkMailbox" ? nt() : f === "spawnThread" ? ue(p) : f === "cleanupThread" ? Rt(() => {
          hn(Oe[p.dc]);
        }) : f === "loaded" ? (e.loaded = true, r(e)) : p.target === "setimmediate" ? e.postMessage(p) : f === "uncaughtException" ? e.onerror(p.error) : f === "callHandler" ? t[p.Zb](...p.args) : f && F(`worker sent an unknown command ${f}`);
      }, e.onerror = (f) => {
        throw F(`worker sent an error! ${f.filename}:${f.lineno}: ${f.message}`), f;
      };
      var i, s = [];
      for (i of []) t.propertyIsEnumerable(i) && s.push(i);
      e.postMessage({ Qb: "load", $b: s, ec: ge, fc: b });
    });
    function yn() {
      var e = new Worker((() => {
        let r = URL;
        return import_meta.url > "file:" && import_meta.url < "file;" ? new r("ort.wasm.bundle.min.mjs", import_meta.url) : new URL(import_meta.url);
      })(), { type: "module", workerData: "em-pthread", name: "em-pthread" });
      ce.push(e);
    }
    var ge, gn = [], C = (e) => {
      var r = gn[e];
      return r || (gn[e] = r = cr.get(e)), r;
    }, Ao = (e, r) => {
      se = 0, e = C(e)(r), 0 < se ? y = e : Ht(e);
    }, et = [], tt = 0;
    function Io(e) {
      var r = new xt(e >>>= 0);
      return (w(), j)[r.Rb + 12 >>> 0] == 0 && (En(r, true), tt--), Tn(r, false), et.push(r), fr(e);
    }
    var Ne = 0, Bo = () => {
      x(0, 0);
      var e = et.pop();
      ir(e.Vb), Ne = 0;
    };
    function En(e, r) {
      r = r ? 1 : 0, (w(), j)[e.Rb + 12 >>> 0] = r;
    }
    function Tn(e, r) {
      r = r ? 1 : 0, (w(), j)[e.Rb + 13 >>> 0] = r;
    }
    class xt {
      constructor(r) {
        this.Vb = r, this.Rb = r - 24;
      }
    }
    var Mt = (e) => {
      var r = Ne;
      if (!r) return Ye(0), 0;
      var i = new xt(r);
      (w(), W)[i.Rb + 16 >>> 2 >>> 0] = r;
      var s = (w(), W)[i.Rb + 4 >>> 2 >>> 0];
      if (!s) return Ye(0), r;
      for (var f of e) {
        if (f === 0 || f === s) break;
        if (ur(f, s, i.Rb + 16)) return Ye(f), r;
      }
      return Ye(s), r;
    };
    function Lo() {
      return Mt([]);
    }
    function Po(e) {
      return Mt([e >>> 0]);
    }
    function Do(e, r, i, s) {
      return Mt([e >>> 0, r >>> 0, i >>> 0, s >>> 0]);
    }
    var _o = () => {
      var e = et.pop();
      e || H("no exception to throw");
      var r = e.Vb;
      throw (w(), j)[e.Rb + 13 >>> 0] == 0 && (et.push(e), Tn(e, true), En(e, false), tt++), Vt(r), Ne = r;
    };
    function Uo(e, r, i) {
      var s = new xt(e >>>= 0);
      throw r >>>= 0, i >>>= 0, (w(), W)[s.Rb + 16 >>> 2 >>> 0] = 0, (w(), W)[s.Rb + 4 >>> 2 >>> 0] = r, (w(), W)[s.Rb + 8 >>> 2 >>> 0] = i, Vt(e), tt++, Ne = e;
    }
    var xo = () => tt;
    function Sn(e, r, i, s) {
      return o ? L(2, 1, e, r, i, s) : vn(e, r, i, s);
    }
    function vn(e, r, i, s) {
      if (e >>>= 0, r >>>= 0, i >>>= 0, s >>>= 0, !globalThis.SharedArrayBuffer) return 6;
      var f = [];
      return o && f.length === 0 ? Sn(e, r, i, s) : (e = { bc: i, Pb: e, Ub: s, Yb: f }, o ? (e.Qb = "spawnThread", postMessage(e, f), 0) : ue(e));
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
          o ? at() && Ht(y) : ye(y);
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
      var e = at();
      e && (Ft(e), ar());
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
      return (r ? lr[r] : ua[e])(...Nt);
    }
    var Wo = () => {
      se = 0;
    };
    function Go(e) {
      e >>>= 0, o ? postMessage({ Qb: "cleanupThread", dc: e }) : hn(Oe[e]);
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
    var Ve = {}, Vo = () => performance.timeOrigin + performance.now();
    function Hn(e, r) {
      if (o) return L(18, 1, e, r);
      if (Ve[e] && (clearTimeout(Ve[e].id), delete Ve[e]), !r) return 0;
      var i = setTimeout(() => {
        delete Ve[e], Rt(() => or(e, performance.timeOrigin + performance.now()));
      }, r);
      return Ve[e] = { id: i, lc: r }, 0;
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
      return lr[e](...kt);
    }
    var Qo = () => {
    };
    function Ko(e, r) {
      return F(Ct(e >>> 0, r >>> 0));
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
    }, rt = (e) => {
      var r;
      return (r = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e)) ? +r[1] : (r = /:(\d+):\d+(?:\)|$)/.exec(e)) ? 2147483648 | +r[1] : 0;
    }, jn = (e) => {
      for (var r of e) (e = rt(r)) && (Ie[e] = r);
    };
    function ra() {
      var e = Error().stack.toString().split(`
`);
      return e[0] == "Error" && e.shift(), jn(e), Ie.Wb = rt(e[3]), Ie.ac = e, Ie.Wb;
    }
    function ot(e) {
      if (!(e = Ie[e >>> 0])) return 0;
      var r;
      if (r = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e)) e = r[1];
      else if (r = /^\s+at (.*) \(.*\)$/.exec(e)) e = r[1];
      else {
        if (!(r = /^(.+?)@/.exec(e))) return 0;
        e = r[1];
      }
      Kn(ot.Xb ?? 0), r = Wt(e) + 1;
      var i = er(r);
      return i && Ae(e, i, r), ot.Xb = i, ot.Xb;
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
            ge.grow(s), ee();
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
      for (var f = 3; s[f] && rt(s[f]) != e; ) ++f;
      for (e = 0; e < i && s[e + f]; ++e) (w(), B)[r + 4 * e >>> 2 >>> 0] = rt(s[e + f]);
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
          X === 0 || X === 10 ? ((R === 1 ? O : F)(An(le)), le.length = 0) : le.push(X);
        }
        f += S;
      }
      return (w(), W)[s >>> 2 >>> 0] = f, 0;
    }
    function ia(e) {
      return e >>> 0;
    }
    o || (function() {
      for (var e = t.numThreads - 1; e--; ) yn();
      je.push(async () => {
        var r = (async function() {
          if (!o) return Promise.all(ce.map(bn));
        })();
        Re++, await r, --Re == 0 && te && (r = te, te = null, r());
      });
    })(), o || (ge = new WebAssembly.Memory({ initial: 256, maximum: 65536, shared: true }), ee()), t.wasmBinary && (g = t.wasmBinary), t.stackSave = () => _(), t.stackRestore = (e) => P(e), t.stackAlloc = (e) => jt(e), t.setValue = function(e, r, i = "i8") {
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
    var at, Kn, er, zt, tr, nr, rr, Ht, or, ar, x, Ye, sr, P, jt, _, ir, Vt, ur, fr, cr, Ee, ua = [V, fe, Sn, In, Bn, Ln, Pn, Dn, _n, Un, xn, Mn, Cn, Rn, Fn, Nn, $n, zn, Hn, Yn, Jn, qn, Xn, Zn, Qn], lr = { 887900: (e, r, i, s, f) => {
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
    function Oa(e, r, i, s, f, p, E, S) {
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
      } catch (be) {
        if (P(we), be !== be + 0) throw be;
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
    function Ba(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        return x(1, 0), 0n;
      }
    }
    function La(e, r, i, s, f, p, E, S, M) {
      var R = _();
      try {
        C(e)(r, i, s, f, p, E, S, M);
      } catch (X) {
        if (P(R), X !== X + 0) throw X;
        x(1, 0);
      }
    }
    function Pa(e) {
      var r = _();
      try {
        return C(e)();
      } catch (i) {
        if (P(r), i !== i + 0) throw i;
        x(1, 0);
      }
    }
    function Da(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        x(1, 0);
      }
    }
    function _a(e, r) {
      var i = _();
      try {
        return C(e)(r);
      } catch (s) {
        if (P(i), s !== s + 0) throw s;
        return x(1, 0), 0n;
      }
    }
    function Ua(e, r, i, s, f) {
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
    function Ma(e, r, i, s, f, p) {
      var E = _();
      try {
        return C(e)(r, i, s, f, p);
      } catch (S) {
        if (P(E), S !== S + 0) throw S;
        x(1, 0);
      }
    }
    function Ca(e, r, i, s, f, p) {
      var E = _();
      try {
        return C(e)(r, i, s, f, p);
      } catch (S) {
        if (P(E), S !== S + 0) throw S;
        x(1, 0);
      }
    }
    function Ra(e, r, i, s, f, p, E, S) {
      var M = _();
      try {
        return C(e)(r, i, s, f, p, E, S);
      } catch (R) {
        if (P(M), R !== R + 0) throw R;
        x(1, 0);
      }
    }
    function Fa(e, r, i, s, f) {
      var p = _();
      try {
        return C(e)(r, i, s, f);
      } catch (E) {
        if (P(p), E !== E + 0) throw E;
        return x(1, 0), 0n;
      }
    }
    function Na(e, r, i, s) {
      var f = _();
      try {
        return C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function ka(e, r, i, s) {
      var f = _();
      try {
        return C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function Wa(e, r, i, s, f, p, E, S, M, R, X, le) {
      var we = _();
      try {
        return C(e)(r, i, s, f, p, E, S, M, R, X, le);
      } catch (be) {
        if (P(we), be !== be + 0) throw be;
        x(1, 0);
      }
    }
    function Ga(e, r, i, s, f, p, E, S, M, R, X) {
      var le = _();
      try {
        C(e)(r, i, s, f, p, E, S, M, R, X);
      } catch (we) {
        if (P(le), we !== we + 0) throw we;
        x(1, 0);
      }
    }
    function $a(e, r, i, s, f, p, E, S, M, R, X, le, we, be, Ja, qa) {
      var Xa = _();
      try {
        C(e)(r, i, s, f, p, E, S, M, R, X, le, we, be, Ja, qa);
      } catch (Yt) {
        if (P(Xa), Yt !== Yt + 0) throw Yt;
        x(1, 0);
      }
    }
    function za(e, r, i, s) {
      var f = _();
      try {
        return C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function Ha(e, r, i, s, f) {
      var p = _();
      try {
        return C(e)(r, i, s, f);
      } catch (E) {
        if (P(p), E !== E + 0) throw E;
        x(1, 0);
      }
    }
    function ja(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        x(1, 0);
      }
    }
    function Va(e, r, i) {
      var s = _();
      try {
        return C(e)(r, i);
      } catch (f) {
        if (P(s), f !== f + 0) throw f;
        x(1, 0);
      }
    }
    function Ya(e, r, i, s) {
      var f = _();
      try {
        C(e)(r, i, s);
      } catch (p) {
        if (P(f), p !== p + 0) throw p;
        x(1, 0);
      }
    }
    function st() {
      if (0 < Re) te = st;
      else if (o) T?.(t), he();
      else {
        for (var e = je; 0 < e.length; ) e.shift()(t);
        0 < Re ? te = st : (t.calledRun = true, D || (he(), T?.(t)));
      }
    }
    return o || (Ee = await Ut(), st()), t.PTR_SIZE = 4, He ? t : new Promise((e, r) => {
      T = e, I = r;
    });
  }
  var os;
  var as;
  var Jr = N(() => {
    "use strict";
    os = Vr, as = globalThis.self?.name?.startsWith("em-pthread");
    as && Vr();
  });
  var Zr;
  var an;
  var ss;
  var oe;
  var Qr;
  var on;
  var is;
  var us;
  var Kr;
  var fs;
  var qr;
  var eo;
  var Xr;
  var to;
  var dt = N(() => {
    "use strict";
    lt();
    Zr = typeof location > "u" ? void 0 : location.origin, an = import_meta.url > "file:" && import_meta.url < "file;", ss = () => {
      if (true) {
        if (an) {
          let n = URL;
          return new URL(new n("ort.wasm.bundle.min.mjs", import_meta.url).href, Zr).href;
        }
        return import_meta.url;
      }
    }, oe = ss(), Qr = () => {
      if (oe && !oe.startsWith("blob:")) return oe.substring(0, oe.lastIndexOf("/") + 1);
    }, on = (n, t) => {
      try {
        let a = t ?? oe;
        return (a ? new URL(n, a) : new URL(n)).origin === Zr;
      } catch {
        return false;
      }
    }, is = (n, t) => {
      let a = t ?? oe;
      try {
        return (a ? new URL(n, a) : new URL(n)).href;
      } catch {
        return;
      }
    }, us = (n, t) => `${t ?? "./"}${n}`, Kr = async (n) => {
      let a = await (await fetch(n, { credentials: "same-origin" })).blob();
      return URL.createObjectURL(a);
    }, fs = async (n) => (await import(
      /*webpackIgnore:true*/
      /*@vite-ignore*/
      n
    )).default, qr = (jr(), Xt(Hr)).default, eo = async () => {
      if (!oe) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
      if (on(oe)) return [void 0, qr()];
      let n = await Kr(oe);
      return [n, qr(n)];
    }, Xr = (Jr(), Xt(Yr)).default, to = async (n, t, a, u) => {
      let o = Xr && !(n || t);
      if (o) if (oe) o = on(oe) || u && !a;
      else if (u && !a) o = true;
      else throw new Error("cannot determine the script source URL.");
      if (o) return [void 0, Xr];
      {
        let d = "ort-wasm-simd-threaded.mjs", c = n ?? is(d, t), l = a && c && !on(c, t), m = l ? await Kr(c) : c ?? us(d, t);
        return [l ? m : void 0, await fs(m)];
      }
    };
  });
  var sn;
  var un;
  var Tt;
  var no;
  var cs;
  var ls;
  var ds;
  var pt;
  var $;
  var xe = N(() => {
    "use strict";
    dt();
    un = false, Tt = false, no = false, cs = () => {
      if (typeof SharedArrayBuffer > "u") return false;
      try {
        return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
      } catch {
        return false;
      }
    }, ls = () => {
      try {
        return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
      } catch {
        return false;
      }
    }, ds = () => {
      try {
        return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 19, 1, 17, 0, 65, 1, 253, 15, 65, 2, 253, 15, 65, 3, 253, 15, 253, 147, 2, 11]));
      } catch {
        return false;
      }
    }, pt = async (n) => {
      if (un) return Promise.resolve();
      if (Tt) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
      if (no) throw new Error("previous call to 'initializeWebAssembly()' failed.");
      Tt = true;
      let t = n.initTimeout, a = n.numThreads;
      if (n.simd !== false) {
        if (n.simd === "relaxed") {
          if (!ds()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
        } else if (!ls()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
      }
      let u = cs();
      a > 1 && !u && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + a + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), n.numThreads = a = 1);
      let o = n.wasmPaths, d = typeof o == "string" ? o : void 0, c = o?.mjs, l = c?.href ?? c, m = o?.wasm, h = m?.href ?? m, g = n.wasmBinary, [b, y] = await to(l, d, a > 1, !!g || !!h), T = false, I = [];
      if (t > 0 && I.push(new Promise((U) => {
        setTimeout(() => {
          T = true, U();
        }, t);
      })), I.push(new Promise((U, z) => {
        let v = { numThreads: a };
        if (g) v.wasmBinary = g, v.locateFile = (O) => O;
        else if (h || d) v.locateFile = (O) => h ?? d + O;
        else if (l && l.indexOf("blob:") !== 0) v.locateFile = (O) => new URL(O, l).href;
        else if (b) {
          let O = Qr();
          O && (v.locateFile = (F) => O + F);
        }
        y(v).then((O) => {
          Tt = false, un = true, sn = O, U(), b && URL.revokeObjectURL(b);
        }, (O) => {
          Tt = false, no = true, z(O);
        });
      })), await Promise.race(I), T) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
    }, $ = () => {
      if (un && sn) return sn;
      throw new Error("WebAssembly is not initialized yet.");
    };
  });
  var ae;
  var Ze;
  var G;
  var St = N(() => {
    "use strict";
    xe();
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
  var ro;
  var oo = N(() => {
    "use strict";
    xe();
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
  var ps;
  var ms;
  var hs;
  var vt;
  var ws;
  var ao;
  var so = N(() => {
    "use strict";
    xe();
    St();
    ps = (n) => {
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
    }, ms = (n) => {
      switch (n) {
        case "sequential":
          return 0;
        case "parallel":
          return 1;
        default:
          throw new Error(`unsupported execution mode: ${n}`);
      }
    }, hs = (n) => {
      n.extra || (n.extra = {}), n.extra.session || (n.extra.session = {});
      let t = n.extra.session;
      t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), n.executionProviders && n.executionProviders.some((a) => (typeof a == "string" ? a : a.name) === "webgpu") && (n.enableMemPattern = false);
    }, vt = (n, t, a, u) => {
      let o = ae(t, u), d = ae(a, u);
      $()._OrtAddSessionConfigEntry(n, o, d) !== 0 && G(`Can't set a session config entry: ${t} - ${a}.`);
    }, ws = async (n, t, a) => {
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
      hs(o);
      try {
        let d = ps(o.graphOptimizationLevel ?? "all"), c = ms(o.executionMode ?? "sequential"), l = typeof o.logId == "string" ? ae(o.logId, u) : 0, m = o.logSeverityLevel ?? 2;
        if (!Number.isInteger(m) || m < 0 || m > 4) throw new Error(`log severity level is not valid: ${m}`);
        let h = o.logVerbosityLevel ?? 0;
        if (!Number.isInteger(h) || h < 0 || h > 4) throw new Error(`log verbosity level is not valid: ${h}`);
        let g = typeof o.optimizedModelFilePath == "string" ? ae(o.optimizedModelFilePath, u) : 0;
        if (a = t._OrtCreateSessionOptions(d, !!o.enableCpuMemArena, !!o.enableMemPattern, c, !!o.enableProfiling, 0, l, m, h, g), a === 0 && G("Can't create session options."), o.executionProviders && await ws(a, o, u), o.enableGraphCapture !== void 0) {
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
  var ke;
  var Ot;
  var We;
  var io;
  var uo;
  var At;
  var It;
  var fo;
  var fn = N(() => {
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
    }, Ot = (n) => {
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
    }, At = (n) => n === "float32" || n === "float16" || n === "int32" || n === "int64" || n === "uint32" || n === "uint8" || n === "bool" || n === "uint4" || n === "int4", It = (n) => n === "float32" || n === "float16" || n === "int32" || n === "int64" || n === "uint32" || n === "uint64" || n === "int8" || n === "uint8" || n === "bool" || n === "uint4" || n === "int4", fo = (n) => {
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
  var Qe;
  var cn = N(() => {
    "use strict";
    lt();
    Qe = async (n) => {
      if (typeof n == "string") if (false) try {
        let { readFile: t } = qt("node:fs/promises");
        return new Uint8Array(await t(n));
      } catch (t) {
        if (t.code === "ERR_FS_FILE_TOO_LARGE") {
          let { createReadStream: a } = qt("node:fs"), u = a(n), o = [];
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
  var bs;
  var mt;
  var ht;
  var Ge;
  var ys;
  var co;
  var Xe;
  var wt;
  var bt;
  var lo;
  var yt;
  var gt;
  var Et;
  var rn = N(() => {
    "use strict";
    Te();
    oo();
    so();
    fn();
    xe();
    St();
    cn();
    bs = (n, t) => {
      $()._OrtInit(n, t) !== 0 && G("Can't initialize onnxruntime.");
    }, mt = async (n) => {
      bs(n.wasm.numThreads, uo(n.logLevel));
    }, ht = async (n, t) => {
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
    }, Ge = /* @__PURE__ */ new Map(), ys = (n) => {
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
            D.push(Qe(typeof k == "string" ? k : k.data).then((Q) => {
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
        let [b, y] = ys(d), T = !!t?.enableGraphCapture, I = [], U = [], z = [], v = [], O = [];
        for (let D = 0; D < b; D++) {
          let [k, w, Q] = co(d, D);
          k === 0 && G("Can't get an input name."), h.push(k);
          let j = o.UTF8ToString(k);
          I.push(j), z.push(w === 0 ? { name: j, isTensor: false } : { name: j, isTensor: true, type: Ot(w), shape: Q });
        }
        for (let D = 0; D < y; D++) {
          let [k, w, Q] = co(d, D + b);
          k === 0 && G("Can't get an output name."), g.push(k);
          let j = o.UTF8ToString(k);
          U.push(j), v.push(w === 0 ? { name: j, isTensor: false } : { name: j, isTensor: true, type: Ot(w), shape: Q });
        }
        return Ge.set(d, [d, h, g, null, T, false]), [d, I, U, z, v];
      } catch (b) {
        throw h.forEach((y) => o._OrtFree(y)), g.forEach((y) => o._OrtFree(y)), l !== 0 && o._OrtReleaseBinding(l) !== 0 && G("Can't release IO binding."), d !== 0 && o._OrtReleaseSession(d) !== 0 && G("Can't release session."), b;
      } finally {
        o._free(a), c !== 0 && o._OrtReleaseSessionOptions(c) !== 0 && G("Can't release session options."), m.forEach((b) => o._free(b)), o.unmountExternalData?.();
      }
    }, bt = (n) => {
      let t = $(), a = Ge.get(n);
      if (!a) throw new Error(`cannot release session. invalid session id: ${n}`);
      let [u, o, d, c, l] = a;
      c && (l && t._OrtClearBoundOutputs(c.handle) !== 0 && G("Can't clear bound outputs."), t._OrtReleaseBinding(c.handle) !== 0 && G("Can't release IO binding.")), t.jsepOnReleaseSession?.(n), t.webnnOnReleaseSession?.(n), t.webgpuOnReleaseSession?.(n), o.forEach((m) => t._OrtFree(m)), d.forEach((m) => t._OrtFree(m)), t._OrtReleaseSession(u) !== 0 && G("Can't release session."), Ge.delete(n);
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
          let O = l.webnnIsGraphInput, F = l.webnnIsGraphOutput;
          if (h !== "string" && O && F) {
            let D = l.UTF8ToString(o);
            if (O(u, D) || F(u, D)) {
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
      let U = l.stackSave(), z = l.stackAlloc(4 * g.length);
      try {
        g.forEach((O, F) => l.setValue(z + F * m, O, m === 4 ? "i32" : "i64"));
        let v = l._OrtCreateTensor(ke(h), T, I, z, g.length, fo(y));
        v === 0 && G(`Can't create tensor for input/output. session=${u}, index=${d}.`), t.push(v);
      } finally {
        l.stackRestore(U);
      }
    }, yt = async (n, t, a, u, o, d) => {
      let c = $(), l = c.PTR_SIZE, m = Ge.get(n);
      if (!m) throw new Error(`cannot run inference. invalid session id: ${n}`);
      let h = m[0], g = m[1], b = m[2], y = m[3], T = m[4], I = m[5], U = t.length, z = u.length, v = 0, O = [], F = [], D = [], k = [], w = [], Q = c.stackSave(), j = c.stackAlloc(U * l), ne = c.stackAlloc(U * l), pe = c.stackAlloc(z * l), B = c.stackAlloc(z * l);
      try {
        [v, O] = ro(d), _e("wasm prepareInputOutputTensor");
        for (let A = 0; A < U; A++) await lo(a[A], F, k, n, g[t[A]], t[A], T);
        for (let A = 0; A < z; A++) await lo(o[A], D, k, n, b[u[A]], U + u[A], T);
        Ue("wasm prepareInputOutputTensor");
        for (let A = 0; A < U; A++) c.setValue(j + A * l, F[A], "*"), c.setValue(ne + A * l, g[t[A]], "*");
        for (let A = 0; A < z; A++) c.setValue(pe + A * l, D[A], "*"), c.setValue(B + A * l, b[u[A]], "*");
        c.jsepOnRunStart?.(h), c.webnnOnRunStart?.(h);
        let W;
        W = await c._OrtRun(h, ne, j, U, B, z, pe, v), W !== 0 && G("failed to call OrtRun().");
        let re = [], me = [];
        _e("wasm ProcessOutputTensor");
        for (let A = 0; A < z; A++) {
          let K = Number(c.getValue(pe + A * l, "*"));
          if (K === D[A] || w.includes(D[A])) {
            re.push(o[A]), K !== D[A] && c._OrtReleaseTensor(K) !== 0 && G("Can't release tensor.");
            continue;
          }
          let He = c.stackSave(), ee = c.stackAlloc(4 * l), he = false, H, q = 0;
          try {
            c._OrtGetTensorData(K, ee, ee + l, ee + 2 * l, ee + 3 * l) !== 0 && G(`Can't access output tensor data on index ${A}.`);
            let Se = l === 4 ? "i32" : "i64", ve = Number(c.getValue(ee, Se));
            q = c.getValue(ee + l, "*");
            let je = c.getValue(ee + l * 2, "*"), Re = Number(c.getValue(ee + l * 3, Se)), te = [];
            for (let L = 0; L < Re; L++) te.push(Number(c.getValue(je + L * l, Se)));
            c._OrtFree(je) !== 0 && G("Can't free memory for tensor dims.");
            let ue = te.reduce((L, V) => L * V, 1);
            H = Ot(ve);
            let se = y?.outputPreferredLocations[u[A]];
            if (H === "string") {
              if (se === "gpu-buffer" || se === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
              let L = [];
              for (let V = 0; V < ue; V++) {
                let fe = c.getValue(q + V * l, "*"), ye = c.getValue(q + (V + 1) * l, "*"), ce = V === ue - 1 ? void 0 : ye - fe;
                L.push(c.UTF8ToString(fe, ce));
              }
              re.push([H, te, L, "cpu"]);
            } else if (se === "gpu-buffer" && ue > 0) {
              let L = c.jsepGetBuffer;
              if (!L) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
              let V = L(q), fe = We(ve, ue);
              if (fe === void 0 || !At(H)) throw new Error(`Unsupported data type: ${H}`);
              he = true, re.push([H, te, { gpuBuffer: V, download: c.jsepCreateDownloader(V, fe, H), dispose: () => {
                c._OrtReleaseTensor(K) !== 0 && G("Can't release tensor.");
              } }, "gpu-buffer"]);
            } else if (se === "ml-tensor" && ue > 0) {
              let L = c.webnnEnsureTensor, V = c.webnnIsGraphInputOutputTypeSupported;
              if (!L || !V) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
              if (We(ve, ue) === void 0 || !It(H)) throw new Error(`Unsupported data type: ${H}`);
              if (!V(n, H, false)) throw new Error(`preferredLocation "ml-tensor" for ${H} output is not supported by current WebNN Context.`);
              let ye = await L(n, q, ve, te, false);
              he = true, re.push([H, te, { mlTensor: ye, download: c.webnnCreateMLTensorDownloader(q, H), dispose: () => {
                c.webnnReleaseTensorId(q), c._OrtReleaseTensor(K);
              } }, "ml-tensor"]);
            } else if (se === "ml-tensor-cpu-output" && ue > 0) {
              let L = c.webnnCreateMLTensorDownloader(q, H)(), V = re.length;
              he = true, me.push((async () => {
                let fe = [V, await L];
                return c.webnnReleaseTensorId(q), c._OrtReleaseTensor(K), fe;
              })()), re.push([H, te, [], "cpu"]);
            } else {
              let L = io(H), V = new L(ue);
              new Uint8Array(V.buffer, V.byteOffset, V.byteLength).set(c.HEAPU8.subarray(q, q + V.byteLength)), re.push([H, te, V, "cpu"]);
            }
          } finally {
            c.stackRestore(He), H === "string" && q && c._free(q), he || c._OrtReleaseTensor(K);
          }
        }
        y && !T && (c._OrtClearBoundOutputs(y.handle) !== 0 && G("Can't clear bound outputs."), Ge.set(n, [h, g, b, y, T, false]));
        for (let [A, K] of await Promise.all(me)) re[A][2] = K;
        return Ue("wasm ProcessOutputTensor"), re;
      } finally {
        c.webnnOnRunEnd?.(h), c.stackRestore(Q), F.forEach((W) => c._OrtReleaseTensor(W)), D.forEach((W) => c._OrtReleaseTensor(W)), k.forEach((W) => c._free(W)), v !== 0 && c._OrtReleaseRunOptions(v), O.forEach((W) => c._free(W));
      }
    }, gt = (n) => {
      let t = $(), a = Ge.get(n);
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
  var Ce;
  var ie;
  var Ke;
  var Lt;
  var Pt;
  var Bt;
  var ln;
  var dn;
  var $e;
  var ze;
  var Es;
  var po;
  var mo;
  var ho;
  var wo;
  var bo;
  var yo;
  var go;
  var pn = N(() => {
    "use strict";
    Te();
    rn();
    xe();
    dt();
    Ce = () => !!Y.wasm.proxy && typeof document < "u", Ke = false, Lt = false, Pt = false, dn = /* @__PURE__ */ new Map(), $e = (n, t) => {
      let a = dn.get(n);
      a ? a.push(t) : dn.set(n, [t]);
    }, ze = () => {
      if (Ke || !Lt || Pt || !ie) throw new Error("worker not ready");
    }, Es = (n) => {
      switch (n.data.type) {
        case "init-wasm":
          Ke = false, n.data.err ? (Pt = true, ln[1](n.data.err)) : (Lt = true, ln[0]()), Bt && (URL.revokeObjectURL(Bt), Bt = void 0);
          break;
        case "init-ep":
        case "copy-from":
        case "create":
        case "release":
        case "run":
        case "end-profiling": {
          let t = dn.get(n.data.type);
          n.data.err ? t.shift()[1](n.data.err) : t.shift()[0](n.data.out);
          break;
        }
        default:
      }
    }, po = async () => {
      if (!Lt) {
        if (Ke) throw new Error("multiple calls to 'initWasm()' detected.");
        if (Pt) throw new Error("previous call to 'initWasm()' failed.");
        if (Ke = true, Ce()) return new Promise((n, t) => {
          ie?.terminate(), eo().then(([a, u]) => {
            try {
              ie = u, ie.onerror = (d) => t(d), ie.onmessage = Es, ln = [n, t];
              let o = { type: "init-wasm", in: Y };
              !o.in.wasm.wasmPaths && (a || an) && (o.in.wasm.wasmPaths = { wasm: new URL("ort-wasm-simd-threaded.wasm", import_meta.url).href }), ie.postMessage(o), Bt = a;
            } catch (o) {
              t(o);
            }
          }, t);
        });
        try {
          await pt(Y.wasm), await mt(Y), Lt = true;
        } catch (n) {
          throw Pt = true, n;
        } finally {
          Ke = false;
        }
      }
    }, mo = async (n) => {
      if (Ce()) return ze(), new Promise((t, a) => {
        $e("init-ep", [t, a]);
        let u = { type: "init-ep", in: { epName: n, env: Y } };
        ie.postMessage(u);
      });
      await ht(Y, n);
    }, ho = async (n) => Ce() ? (ze(), new Promise((t, a) => {
      $e("copy-from", [t, a]);
      let u = { type: "copy-from", in: { buffer: n } };
      ie.postMessage(u, [n.buffer]);
    })) : Xe(n), wo = async (n, t) => {
      if (Ce()) {
        if (t?.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
        return ze(), new Promise((a, u) => {
          $e("create", [a, u]);
          let o = { type: "create", in: { model: n, options: { ...t } } }, d = [];
          n instanceof Uint8Array && d.push(n.buffer), ie.postMessage(o, d);
        });
      } else return wt(n, t);
    }, bo = async (n) => {
      if (Ce()) return ze(), new Promise((t, a) => {
        $e("release", [t, a]);
        let u = { type: "release", in: n };
        ie.postMessage(u);
      });
      bt(n);
    }, yo = async (n, t, a, u, o, d) => {
      if (Ce()) {
        if (a.some((c) => c[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
        if (o.some((c) => c)) throw new Error("pre-allocated output tensor is not supported for proxy.");
        return ze(), new Promise((c, l) => {
          $e("run", [c, l]);
          let m = a, h = { type: "run", in: { sessionId: n, inputIndices: t, inputs: m, outputIndices: u, options: d } };
          ie.postMessage(h, Et(m));
        });
      } else return yt(n, t, a, u, o, d);
    }, go = async (n) => {
      if (Ce()) return ze(), new Promise((t, a) => {
        $e("end-profiling", [t, a]);
        let u = { type: "end-profiling", in: n };
        ie.postMessage(u);
      });
      gt(n);
    };
  });
  var Eo;
  var Ts;
  var Dt;
  var To = N(() => {
    "use strict";
    Te();
    pn();
    fn();
    lt();
    cn();
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
    }, Ts = (n) => {
      switch (n[3]) {
        case "cpu":
          return new de(n[0], n[2], n[1]);
        case "gpu-buffer": {
          let t = n[0];
          if (!At(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
          let { gpuBuffer: a, download: u, dispose: o } = n[2];
          return de.fromGpuBuffer(a, { dataType: t, dims: n[1], download: u, dispose: o });
        }
        case "ml-tensor": {
          let t = n[0];
          if (!It(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
          let { mlTensor: a, download: u, dispose: o } = n[2];
          return de.fromMLTensor(a, { dataType: t, dims: n[1], download: u, dispose: o });
        }
        default:
          throw new Error(`invalid data location: ${n[3]}`);
      }
    }, Dt = class {
      async fetchModelAndCopyToWasmMemory(t) {
        return ho(await Qe(t));
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
        for (let y = 0; y < g.length; y++) b[this.outputNames[l[y]]] = c[y] ?? Ts(g[y]);
        return De(), b;
      }
      startProfiling() {
      }
      endProfiling() {
        go(this.sessionId);
      }
    };
  });
  var vo = {};
  it(vo, { OnnxruntimeWebAssemblyBackend: () => _t, initializeFlags: () => So, wasmBackend: () => Ss });
  var So;
  var _t;
  var Ss;
  var Oo = N(() => {
    "use strict";
    Te();
    pn();
    To();
    So = () => {
      (typeof Y.wasm.initTimeout != "number" || Y.wasm.initTimeout < 0) && (Y.wasm.initTimeout = 0);
      let n = Y.wasm.simd;
      if (typeof n != "boolean" && n !== void 0 && n !== "fixed" && n !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${n}". Reset it to \`false\` and ignore SIMD feature checking.`), Y.wasm.simd = false), typeof Y.wasm.proxy != "boolean" && (Y.wasm.proxy = false), typeof Y.wasm.trace != "boolean" && (Y.wasm.trace = false), typeof Y.wasm.numThreads != "number" || !Number.isInteger(Y.wasm.numThreads) || Y.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) Y.wasm.numThreads = 1;
      else {
        let t = typeof navigator > "u" ? qt("node:os").cpus().length : navigator.hardwareConcurrency;
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
    }, Ss = new _t();
  });
  Te();
  Te();
  Te();
  var Gr = "1.24.3";
  {
    let n = (Oo(), Xt(vo)).wasmBackend;
    Je("cpu", n, 10), Je("wasm", n, 10);
  }
  Object.defineProperty(Y.versions, "web", { value: Gr, enumerable: true });

  // node_modules/@jax-js/loaders/dist/chunk-Cl8Af3a2.js
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };

  // node_modules/@bufbuild/protobuf/dist/esm/is-message.js
  function isMessage(arg, schema) {
    const isMessage2 = arg !== null && typeof arg == "object" && "$typeName" in arg && typeof arg.$typeName == "string";
    if (!isMessage2) {
      return false;
    }
    if (schema === void 0) {
      return true;
    }
    return schema.typeName === arg.$typeName;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
  var ScalarType;
  (function(ScalarType2) {
    ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
    ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
    ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
    ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
    ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
    ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
    ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
    ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
    ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
    ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
    ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
    ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
    ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
    ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
    ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
  })(ScalarType || (ScalarType = {}));

  // node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
  function varint64read() {
    let lowBits = 0;
    let highBits = 0;
    for (let shift = 0; shift < 28; shift += 7) {
      let b = this.buf[this.pos++];
      lowBits |= (b & 127) << shift;
      if ((b & 128) == 0) {
        this.assertBounds();
        return [lowBits, highBits];
      }
    }
    let middleByte = this.buf[this.pos++];
    lowBits |= (middleByte & 15) << 28;
    highBits = (middleByte & 112) >> 4;
    if ((middleByte & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
    for (let shift = 3; shift <= 31; shift += 7) {
      let b = this.buf[this.pos++];
      highBits |= (b & 127) << shift;
      if ((b & 128) == 0) {
        this.assertBounds();
        return [lowBits, highBits];
      }
    }
    throw new Error("invalid varint");
  }
  var TWO_PWR_32_DBL = 4294967296;
  function int64FromString(dec) {
    const minus = dec[0] === "-";
    if (minus) {
      dec = dec.slice(1);
    }
    const base = 1e6;
    let lowBits = 0;
    let highBits = 0;
    function add1e6digit(begin, end) {
      const digit1e6 = Number(dec.slice(begin, end));
      highBits *= base;
      lowBits = lowBits * base + digit1e6;
      if (lowBits >= TWO_PWR_32_DBL) {
        highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
        lowBits = lowBits % TWO_PWR_32_DBL;
      }
    }
    add1e6digit(-24, -18);
    add1e6digit(-18, -12);
    add1e6digit(-12, -6);
    add1e6digit(-6);
    return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
  }
  function int64ToString(lo2, hi) {
    let bits = newBits(lo2, hi);
    const negative = bits.hi & 2147483648;
    if (negative) {
      bits = negate(bits.lo, bits.hi);
    }
    const result = uInt64ToString(bits.lo, bits.hi);
    return negative ? "-" + result : result;
  }
  function uInt64ToString(lo2, hi) {
    ({ lo: lo2, hi } = toUnsigned(lo2, hi));
    if (hi <= 2097151) {
      return String(TWO_PWR_32_DBL * hi + lo2);
    }
    const low = lo2 & 16777215;
    const mid = (lo2 >>> 24 | hi << 8) & 16777215;
    const high = hi >> 16 & 65535;
    let digitA = low + mid * 6777216 + high * 6710656;
    let digitB = mid + high * 8147497;
    let digitC = high * 2;
    const base = 1e7;
    if (digitA >= base) {
      digitB += Math.floor(digitA / base);
      digitA %= base;
    }
    if (digitB >= base) {
      digitC += Math.floor(digitB / base);
      digitB %= base;
    }
    return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
  }
  function toUnsigned(lo2, hi) {
    return { lo: lo2 >>> 0, hi: hi >>> 0 };
  }
  function newBits(lo2, hi) {
    return { lo: lo2 | 0, hi: hi | 0 };
  }
  function negate(lowBits, highBits) {
    highBits = ~highBits;
    if (lowBits) {
      lowBits = ~lowBits + 1;
    } else {
      highBits += 1;
    }
    return newBits(lowBits, highBits);
  }
  var decimalFrom1e7WithLeadingZeros = (digit1e7) => {
    const partial = String(digit1e7);
    return "0000000".slice(partial.length) + partial;
  };
  function varint32write(value, bytes) {
    if (value >= 0) {
      while (value > 127) {
        bytes.push(value & 127 | 128);
        value = value >>> 7;
      }
      bytes.push(value);
    } else {
      for (let i = 0; i < 9; i++) {
        bytes.push(value & 127 | 128);
        value = value >> 7;
      }
      bytes.push(1);
    }
  }
  function varint32read() {
    let b = this.buf[this.pos++];
    let result = b & 127;
    if ((b & 128) == 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 127) << 7;
    if ((b & 128) == 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 127) << 14;
    if ((b & 128) == 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 127) << 21;
    if ((b & 128) == 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 15) << 28;
    for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++)
      b = this.buf[this.pos++];
    if ((b & 128) != 0)
      throw new Error("invalid varint");
    this.assertBounds();
    return result >>> 0;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
  var protoInt64 = /* @__PURE__ */ makeInt64Support();
  function makeInt64Support() {
    const dv = new DataView(new ArrayBuffer(8));
    const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (!!globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1");
    if (ok) {
      const MIN = BigInt("-9223372036854775808");
      const MAX = BigInt("9223372036854775807");
      const UMIN = BigInt("0");
      const UMAX = BigInt("18446744073709551615");
      return {
        zero: BigInt(0),
        supported: true,
        parse(value) {
          const bi = typeof value == "bigint" ? value : BigInt(value);
          if (bi > MAX || bi < MIN) {
            throw new Error(`invalid int64: ${value}`);
          }
          return bi;
        },
        uParse(value) {
          const bi = typeof value == "bigint" ? value : BigInt(value);
          if (bi > UMAX || bi < UMIN) {
            throw new Error(`invalid uint64: ${value}`);
          }
          return bi;
        },
        enc(value) {
          dv.setBigInt64(0, this.parse(value), true);
          return {
            lo: dv.getInt32(0, true),
            hi: dv.getInt32(4, true)
          };
        },
        uEnc(value) {
          dv.setBigInt64(0, this.uParse(value), true);
          return {
            lo: dv.getInt32(0, true),
            hi: dv.getInt32(4, true)
          };
        },
        dec(lo2, hi) {
          dv.setInt32(0, lo2, true);
          dv.setInt32(4, hi, true);
          return dv.getBigInt64(0, true);
        },
        uDec(lo2, hi) {
          dv.setInt32(0, lo2, true);
          dv.setInt32(4, hi, true);
          return dv.getBigUint64(0, true);
        }
      };
    }
    return {
      zero: "0",
      supported: false,
      parse(value) {
        if (typeof value != "string") {
          value = value.toString();
        }
        assertInt64String(value);
        return value;
      },
      uParse(value) {
        if (typeof value != "string") {
          value = value.toString();
        }
        assertUInt64String(value);
        return value;
      },
      enc(value) {
        if (typeof value != "string") {
          value = value.toString();
        }
        assertInt64String(value);
        return int64FromString(value);
      },
      uEnc(value) {
        if (typeof value != "string") {
          value = value.toString();
        }
        assertUInt64String(value);
        return int64FromString(value);
      },
      dec(lo2, hi) {
        return int64ToString(lo2, hi);
      },
      uDec(lo2, hi) {
        return uInt64ToString(lo2, hi);
      }
    };
  }
  function assertInt64String(value) {
    if (!/^-?[0-9]+$/.test(value)) {
      throw new Error("invalid int64: " + value);
    }
  }
  function assertUInt64String(value) {
    if (!/^[0-9]+$/.test(value)) {
      throw new Error("invalid uint64: " + value);
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
  function scalarZeroValue(type, longAsString) {
    switch (type) {
      case ScalarType.STRING:
        return "";
      case ScalarType.BOOL:
        return false;
      case ScalarType.DOUBLE:
      case ScalarType.FLOAT:
        return 0;
      case ScalarType.INT64:
      case ScalarType.UINT64:
      case ScalarType.SFIXED64:
      case ScalarType.FIXED64:
      case ScalarType.SINT64:
        return longAsString ? "0" : protoInt64.zero;
      case ScalarType.BYTES:
        return new Uint8Array(0);
      default:
        return 0;
    }
  }
  function isScalarZeroValue(type, value) {
    switch (type) {
      case ScalarType.BOOL:
        return value === false;
      case ScalarType.STRING:
        return value === "";
      case ScalarType.BYTES:
        return value instanceof Uint8Array && !value.byteLength;
      default:
        return value == 0;
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
  var IMPLICIT = 2;
  var unsafeLocal = /* @__PURE__ */ Symbol.for("reflect unsafe local");
  function unsafeOneofCase(target, oneof) {
    const c = target[oneof.localName].case;
    if (c === void 0) {
      return c;
    }
    return oneof.fields.find((f) => f.localName === c);
  }
  function unsafeIsSet(target, field) {
    const name = field.localName;
    if (field.oneof) {
      return target[field.oneof.localName].case === name;
    }
    if (field.presence != IMPLICIT) {
      return target[name] !== void 0 && Object.prototype.hasOwnProperty.call(target, name);
    }
    switch (field.fieldKind) {
      case "list":
        return target[name].length > 0;
      case "map":
        return Object.keys(target[name]).length > 0;
      case "scalar":
        return !isScalarZeroValue(field.scalar, target[name]);
      case "enum":
        return target[name] !== field.enum.values[0].number;
    }
    throw new Error("message field with implicit presence");
  }
  function unsafeIsSetExplicit(target, localName) {
    return Object.prototype.hasOwnProperty.call(target, localName) && target[localName] !== void 0;
  }
  function unsafeGet(target, field) {
    if (field.oneof) {
      const oneof = target[field.oneof.localName];
      if (oneof.case === field.localName) {
        return oneof.value;
      }
      return void 0;
    }
    return target[field.localName];
  }
  function unsafeSet(target, field, value) {
    if (field.oneof) {
      target[field.oneof.localName] = {
        case: field.localName,
        value
      };
    } else {
      target[field.localName] = value;
    }
  }
  function unsafeClear(target, field) {
    const name = field.localName;
    if (field.oneof) {
      const oneofLocalName = field.oneof.localName;
      if (target[oneofLocalName].case === name) {
        target[oneofLocalName] = { case: void 0 };
      }
    } else if (field.presence != IMPLICIT) {
      delete target[name];
    } else {
      switch (field.fieldKind) {
        case "map":
          target[name] = {};
          break;
        case "list":
          target[name] = [];
          break;
        case "enum":
          target[name] = field.enum.values[0].number;
          break;
        case "scalar":
          target[name] = scalarZeroValue(field.scalar, field.longAsString);
          break;
      }
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
  function isObject(arg) {
    return arg !== null && typeof arg == "object" && !Array.isArray(arg);
  }
  function isReflectList(arg, field) {
    var _a, _b, _c, _d;
    if (isObject(arg) && unsafeLocal in arg && "add" in arg && "field" in arg && typeof arg.field == "function") {
      if (field !== void 0) {
        const a = field;
        const b = arg.field();
        return a.listKind == b.listKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
      }
      return true;
    }
    return false;
  }
  function isReflectMap(arg, field) {
    var _a, _b, _c, _d;
    if (isObject(arg) && unsafeLocal in arg && "has" in arg && "field" in arg && typeof arg.field == "function") {
      if (field !== void 0) {
        const a = field, b = arg.field();
        return a.mapKey === b.mapKey && a.mapKind == b.mapKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
      }
      return true;
    }
    return false;
  }
  function isReflectMessage(arg, messageDesc2) {
    return isObject(arg) && unsafeLocal in arg && "desc" in arg && isObject(arg.desc) && arg.desc.kind === "message" && (messageDesc2 === void 0 || arg.desc.typeName == messageDesc2.typeName);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
  function isWrapper(arg) {
    return isWrapperTypeName(arg.$typeName);
  }
  function isWrapperDesc(messageDesc2) {
    const f = messageDesc2.fields[0];
    return isWrapperTypeName(messageDesc2.typeName) && f !== void 0 && f.fieldKind == "scalar" && f.name == "value" && f.number == 1;
  }
  function isWrapperTypeName(name) {
    return name.startsWith("google.protobuf.") && [
      "DoubleValue",
      "FloatValue",
      "Int64Value",
      "UInt64Value",
      "Int32Value",
      "UInt32Value",
      "BoolValue",
      "StringValue",
      "BytesValue"
    ].includes(name.substring(16));
  }

  // node_modules/@bufbuild/protobuf/dist/esm/create.js
  var EDITION_PROTO3 = 999;
  var EDITION_PROTO2 = 998;
  var IMPLICIT2 = 2;
  function create(schema, init) {
    if (isMessage(init, schema)) {
      return init;
    }
    const message = createZeroMessage(schema);
    if (init !== void 0) {
      initMessage(schema, message, init);
    }
    return message;
  }
  function initMessage(messageDesc2, message, init) {
    for (const member of messageDesc2.members) {
      let value = init[member.localName];
      if (value == null) {
        continue;
      }
      let field;
      if (member.kind == "oneof") {
        const oneofField = unsafeOneofCase(init, member);
        if (!oneofField) {
          continue;
        }
        field = oneofField;
        value = unsafeGet(init, oneofField);
      } else {
        field = member;
      }
      switch (field.fieldKind) {
        case "message":
          value = toMessage(field, value);
          break;
        case "scalar":
          value = initScalar(field, value);
          break;
        case "list":
          value = initList(field, value);
          break;
        case "map":
          value = initMap(field, value);
          break;
      }
      unsafeSet(message, field, value);
    }
    return message;
  }
  function initScalar(field, value) {
    if (field.scalar == ScalarType.BYTES) {
      return toU8Arr(value);
    }
    return value;
  }
  function initMap(field, value) {
    if (isObject(value)) {
      if (field.scalar == ScalarType.BYTES) {
        return convertObjectValues(value, toU8Arr);
      }
      if (field.mapKind == "message") {
        return convertObjectValues(value, (val) => toMessage(field, val));
      }
    }
    return value;
  }
  function initList(field, value) {
    if (Array.isArray(value)) {
      if (field.scalar == ScalarType.BYTES) {
        return value.map(toU8Arr);
      }
      if (field.listKind == "message") {
        return value.map((item) => toMessage(field, item));
      }
    }
    return value;
  }
  function toMessage(field, value) {
    if (field.fieldKind == "message" && !field.oneof && isWrapperDesc(field.message)) {
      return initScalar(field.message.fields[0], value);
    }
    if (isObject(value)) {
      if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName !== "google.protobuf.Value") {
        return value;
      }
      if (!isMessage(value, field.message)) {
        return create(field.message, value);
      }
    }
    return value;
  }
  function toU8Arr(value) {
    return Array.isArray(value) ? new Uint8Array(value) : value;
  }
  function convertObjectValues(obj, fn2) {
    const ret = {};
    for (const entry of Object.entries(obj)) {
      ret[entry[0]] = fn2(entry[1]);
    }
    return ret;
  }
  var tokenZeroMessageField = /* @__PURE__ */ Symbol();
  var messagePrototypes = /* @__PURE__ */ new WeakMap();
  function createZeroMessage(desc) {
    let msg;
    if (!needsPrototypeChain(desc)) {
      msg = {
        $typeName: desc.typeName
      };
      for (const member of desc.members) {
        if (member.kind == "oneof" || member.presence == IMPLICIT2) {
          msg[member.localName] = createZeroField(member);
        }
      }
    } else {
      const cached = messagePrototypes.get(desc);
      let prototype;
      let members;
      if (cached) {
        ({ prototype, members } = cached);
      } else {
        prototype = {};
        members = /* @__PURE__ */ new Set();
        for (const member of desc.members) {
          if (member.kind == "oneof") {
            continue;
          }
          if (member.fieldKind != "scalar" && member.fieldKind != "enum") {
            continue;
          }
          if (member.presence == IMPLICIT2) {
            continue;
          }
          members.add(member);
          prototype[member.localName] = createZeroField(member);
        }
        messagePrototypes.set(desc, { prototype, members });
      }
      msg = Object.create(prototype);
      msg.$typeName = desc.typeName;
      for (const member of desc.members) {
        if (members.has(member)) {
          continue;
        }
        if (member.kind == "field") {
          if (member.fieldKind == "message") {
            continue;
          }
          if (member.fieldKind == "scalar" || member.fieldKind == "enum") {
            if (member.presence != IMPLICIT2) {
              continue;
            }
          }
        }
        msg[member.localName] = createZeroField(member);
      }
    }
    return msg;
  }
  function needsPrototypeChain(desc) {
    switch (desc.file.edition) {
      case EDITION_PROTO3:
        return false;
      case EDITION_PROTO2:
        return true;
      default:
        return desc.fields.some((f) => f.presence != IMPLICIT2 && f.fieldKind != "message" && !f.oneof);
    }
  }
  function createZeroField(field) {
    if (field.kind == "oneof") {
      return { case: void 0 };
    }
    if (field.fieldKind == "list") {
      return [];
    }
    if (field.fieldKind == "map") {
      return {};
    }
    if (field.fieldKind == "message") {
      return tokenZeroMessageField;
    }
    const defaultValue = field.getDefaultValue();
    if (defaultValue !== void 0) {
      return field.fieldKind == "scalar" && field.longAsString ? defaultValue.toString() : defaultValue;
    }
    return field.fieldKind == "scalar" ? scalarZeroValue(field.scalar, field.longAsString) : field.enum.values[0].number;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
  var FieldError = class extends Error {
    constructor(fieldOrOneof, message, name = "FieldValueInvalidError") {
      super(message);
      this.name = name;
      this.field = () => fieldOrOneof;
    }
  };

  // node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
  var symbol = /* @__PURE__ */ Symbol.for("@bufbuild/protobuf/text-encoding");
  function getTextEncoding() {
    if (globalThis[symbol] == void 0) {
      const te = new globalThis.TextEncoder();
      const td = new globalThis.TextDecoder();
      globalThis[symbol] = {
        encodeUtf8(text) {
          return te.encode(text);
        },
        decodeUtf8(bytes) {
          return td.decode(bytes);
        },
        checkUtf8(text) {
          try {
            encodeURIComponent(text);
            return true;
          } catch (_) {
            return false;
          }
        }
      };
    }
    return globalThis[symbol];
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
  var WireType;
  (function(WireType2) {
    WireType2[WireType2["Varint"] = 0] = "Varint";
    WireType2[WireType2["Bit64"] = 1] = "Bit64";
    WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
    WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
    WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
    WireType2[WireType2["Bit32"] = 5] = "Bit32";
  })(WireType || (WireType = {}));
  var FLOAT32_MAX = 34028234663852886e22;
  var FLOAT32_MIN = -34028234663852886e22;
  var UINT32_MAX = 4294967295;
  var INT32_MAX = 2147483647;
  var INT32_MIN = -2147483648;
  var BinaryReader = class {
    constructor(buf, decodeUtf8 = getTextEncoding().decodeUtf8) {
      this.decodeUtf8 = decodeUtf8;
      this.varint64 = varint64read;
      this.uint32 = varint32read;
      this.buf = buf;
      this.len = buf.length;
      this.pos = 0;
      this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    /**
     * Reads a tag - field number and wire type.
     */
    tag() {
      let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
      if (fieldNo <= 0 || wireType < 0 || wireType > 5)
        throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
      return [fieldNo, wireType];
    }
    /**
     * Skip one element and return the skipped data.
     *
     * When skipping StartGroup, provide the tags field number to check for
     * matching field number in the EndGroup tag.
     */
    skip(wireType, fieldNo) {
      let start = this.pos;
      switch (wireType) {
        case WireType.Varint:
          while (this.buf[this.pos++] & 128) {
          }
          break;
        // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
        case WireType.Bit64:
          this.pos += 4;
        case WireType.Bit32:
          this.pos += 4;
          break;
        case WireType.LengthDelimited:
          let len = this.uint32();
          this.pos += len;
          break;
        case WireType.StartGroup:
          for (; ; ) {
            const [fn2, wt2] = this.tag();
            if (wt2 === WireType.EndGroup) {
              if (fieldNo !== void 0 && fn2 !== fieldNo) {
                throw new Error("invalid end group tag");
              }
              break;
            }
            this.skip(wt2, fn2);
          }
          break;
        default:
          throw new Error("cant skip wire type " + wireType);
      }
      this.assertBounds();
      return this.buf.subarray(start, this.pos);
    }
    /**
     * Throws error if position in byte array is out of range.
     */
    assertBounds() {
      if (this.pos > this.len)
        throw new RangeError("premature EOF");
    }
    /**
     * Read a `int32` field, a signed 32 bit varint.
     */
    int32() {
      return this.uint32() | 0;
    }
    /**
     * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
     */
    sint32() {
      let zze = this.uint32();
      return zze >>> 1 ^ -(zze & 1);
    }
    /**
     * Read a `int64` field, a signed 64-bit varint.
     */
    int64() {
      return protoInt64.dec(...this.varint64());
    }
    /**
     * Read a `uint64` field, an unsigned 64-bit varint.
     */
    uint64() {
      return protoInt64.uDec(...this.varint64());
    }
    /**
     * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64() {
      let [lo2, hi] = this.varint64();
      let s = -(lo2 & 1);
      lo2 = (lo2 >>> 1 | (hi & 1) << 31) ^ s;
      hi = hi >>> 1 ^ s;
      return protoInt64.dec(lo2, hi);
    }
    /**
     * Read a `bool` field, a variant.
     */
    bool() {
      let [lo2, hi] = this.varint64();
      return lo2 !== 0 || hi !== 0;
    }
    /**
     * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
     */
    fixed32() {
      return this.view.getUint32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
     */
    sfixed32() {
      return this.view.getInt32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
     */
    fixed64() {
      return protoInt64.uDec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
     */
    sfixed64() {
      return protoInt64.dec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `float` field, 32-bit floating point number.
     */
    float() {
      return this.view.getFloat32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `double` field, a 64-bit floating point number.
     */
    double() {
      return this.view.getFloat64((this.pos += 8) - 8, true);
    }
    /**
     * Read a `bytes` field, length-delimited arbitrary data.
     */
    bytes() {
      let len = this.uint32(), start = this.pos;
      this.pos += len;
      this.assertBounds();
      return this.buf.subarray(start, start + len);
    }
    /**
     * Read a `string` field, length-delimited data converted to UTF-8 text.
     */
    string() {
      return this.decodeUtf8(this.bytes());
    }
  };

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect-check.js
  function checkField(field, value) {
    const check = field.fieldKind == "list" ? isReflectList(value, field) : field.fieldKind == "map" ? isReflectMap(value, field) : checkSingular(field, value);
    if (check === true) {
      return void 0;
    }
    let reason;
    switch (field.fieldKind) {
      case "list":
        reason = `expected ${formatReflectList(field)}, got ${formatVal(value)}`;
        break;
      case "map":
        reason = `expected ${formatReflectMap(field)}, got ${formatVal(value)}`;
        break;
      default: {
        reason = reasonSingular(field, value, check);
      }
    }
    return new FieldError(field, reason);
  }
  function checkListItem(field, index, value) {
    const check = checkSingular(field, value);
    if (check !== true) {
      return new FieldError(field, `list item #${index + 1}: ${reasonSingular(field, value, check)}`);
    }
    return void 0;
  }
  function checkMapEntry(field, key, value) {
    const checkKey = checkScalarValue(key, field.mapKey);
    if (checkKey !== true) {
      return new FieldError(field, `invalid map key: ${reasonSingular({ scalar: field.mapKey }, key, checkKey)}`);
    }
    const checkVal = checkSingular(field, value);
    if (checkVal !== true) {
      return new FieldError(field, `map entry ${formatVal(key)}: ${reasonSingular(field, value, checkVal)}`);
    }
    return void 0;
  }
  function checkSingular(field, value) {
    if (field.scalar !== void 0) {
      return checkScalarValue(value, field.scalar);
    }
    if (field.enum !== void 0) {
      if (field.enum.open) {
        return Number.isInteger(value);
      }
      return field.enum.values.some((v) => v.number === value);
    }
    return isReflectMessage(value, field.message);
  }
  function checkScalarValue(value, scalar) {
    switch (scalar) {
      case ScalarType.DOUBLE:
        return typeof value == "number";
      case ScalarType.FLOAT:
        if (typeof value != "number") {
          return false;
        }
        if (Number.isNaN(value) || !Number.isFinite(value)) {
          return true;
        }
        if (value > FLOAT32_MAX || value < FLOAT32_MIN) {
          return `${value.toFixed()} out of range`;
        }
        return true;
      case ScalarType.INT32:
      case ScalarType.SFIXED32:
      case ScalarType.SINT32:
        if (typeof value !== "number" || !Number.isInteger(value)) {
          return false;
        }
        if (value > INT32_MAX || value < INT32_MIN) {
          return `${value.toFixed()} out of range`;
        }
        return true;
      case ScalarType.FIXED32:
      case ScalarType.UINT32:
        if (typeof value !== "number" || !Number.isInteger(value)) {
          return false;
        }
        if (value > UINT32_MAX || value < 0) {
          return `${value.toFixed()} out of range`;
        }
        return true;
      case ScalarType.BOOL:
        return typeof value == "boolean";
      case ScalarType.STRING:
        if (typeof value != "string") {
          return false;
        }
        return getTextEncoding().checkUtf8(value) || "invalid UTF8";
      case ScalarType.BYTES:
        return value instanceof Uint8Array;
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) {
          try {
            protoInt64.parse(value);
            return true;
          } catch (_) {
            return `${value} out of range`;
          }
        }
        return false;
      case ScalarType.FIXED64:
      case ScalarType.UINT64:
        if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) {
          try {
            protoInt64.uParse(value);
            return true;
          } catch (_) {
            return `${value} out of range`;
          }
        }
        return false;
    }
  }
  function reasonSingular(field, val, details) {
    details = typeof details == "string" ? `: ${details}` : `, got ${formatVal(val)}`;
    if (field.scalar !== void 0) {
      return `expected ${scalarTypeDescription(field.scalar)}` + details;
    }
    if (field.enum !== void 0) {
      return `expected ${field.enum.toString()}` + details;
    }
    return `expected ${formatReflectMessage(field.message)}` + details;
  }
  function formatVal(val) {
    switch (typeof val) {
      case "object":
        if (val === null) {
          return "null";
        }
        if (val instanceof Uint8Array) {
          return `Uint8Array(${val.length})`;
        }
        if (Array.isArray(val)) {
          return `Array(${val.length})`;
        }
        if (isReflectList(val)) {
          return formatReflectList(val.field());
        }
        if (isReflectMap(val)) {
          return formatReflectMap(val.field());
        }
        if (isReflectMessage(val)) {
          return formatReflectMessage(val.desc);
        }
        if (isMessage(val)) {
          return `message ${val.$typeName}`;
        }
        return "object";
      case "string":
        return val.length > 30 ? "string" : `"${val.split('"').join('\\"')}"`;
      case "boolean":
        return String(val);
      case "number":
        return String(val);
      case "bigint":
        return String(val) + "n";
      default:
        return typeof val;
    }
  }
  function formatReflectMessage(desc) {
    return `ReflectMessage (${desc.typeName})`;
  }
  function formatReflectList(field) {
    switch (field.listKind) {
      case "message":
        return `ReflectList (${field.message.toString()})`;
      case "enum":
        return `ReflectList (${field.enum.toString()})`;
      case "scalar":
        return `ReflectList (${ScalarType[field.scalar]})`;
    }
  }
  function formatReflectMap(field) {
    switch (field.mapKind) {
      case "message":
        return `ReflectMap (${ScalarType[field.mapKey]}, ${field.message.toString()})`;
      case "enum":
        return `ReflectMap (${ScalarType[field.mapKey]}, ${field.enum.toString()})`;
      case "scalar":
        return `ReflectMap (${ScalarType[field.mapKey]}, ${ScalarType[field.scalar]})`;
    }
  }
  function scalarTypeDescription(scalar) {
    switch (scalar) {
      case ScalarType.STRING:
        return "string";
      case ScalarType.BOOL:
        return "boolean";
      case ScalarType.INT64:
      case ScalarType.SINT64:
      case ScalarType.SFIXED64:
        return "bigint (int64)";
      case ScalarType.UINT64:
      case ScalarType.FIXED64:
        return "bigint (uint64)";
      case ScalarType.BYTES:
        return "Uint8Array";
      case ScalarType.DOUBLE:
        return "number (float64)";
      case ScalarType.FLOAT:
        return "number (float32)";
      case ScalarType.FIXED32:
      case ScalarType.UINT32:
        return "number (uint32)";
      case ScalarType.INT32:
      case ScalarType.SFIXED32:
      case ScalarType.SINT32:
        return "number (int32)";
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect.js
  function reflect(messageDesc2, message, check = true) {
    return new ReflectMessageImpl(messageDesc2, message, check);
  }
  var messageSortedFields = /* @__PURE__ */ new WeakMap();
  var ReflectMessageImpl = class {
    get sortedFields() {
      const cached = messageSortedFields.get(this.desc);
      if (cached) {
        return cached;
      }
      const sortedFields = this.desc.fields.concat().sort((a, b) => a.number - b.number);
      messageSortedFields.set(this.desc, sortedFields);
      return sortedFields;
    }
    constructor(messageDesc2, message, check = true) {
      this.lists = /* @__PURE__ */ new Map();
      this.maps = /* @__PURE__ */ new Map();
      this.check = check;
      this.desc = messageDesc2;
      this.message = this[unsafeLocal] = message !== null && message !== void 0 ? message : create(messageDesc2);
      this.fields = messageDesc2.fields;
      this.oneofs = messageDesc2.oneofs;
      this.members = messageDesc2.members;
    }
    findNumber(number) {
      if (!this._fieldsByNumber) {
        this._fieldsByNumber = new Map(this.desc.fields.map((f) => [f.number, f]));
      }
      return this._fieldsByNumber.get(number);
    }
    oneofCase(oneof) {
      assertOwn(this.message, oneof);
      return unsafeOneofCase(this.message, oneof);
    }
    isSet(field) {
      assertOwn(this.message, field);
      return unsafeIsSet(this.message, field);
    }
    clear(field) {
      assertOwn(this.message, field);
      unsafeClear(this.message, field);
    }
    get(field) {
      assertOwn(this.message, field);
      const value = unsafeGet(this.message, field);
      switch (field.fieldKind) {
        case "list":
          let list = this.lists.get(field);
          if (!list || list[unsafeLocal] !== value) {
            this.lists.set(
              field,
              // biome-ignore lint/suspicious/noAssignInExpressions: no
              list = new ReflectListImpl(field, value, this.check)
            );
          }
          return list;
        case "map":
          let map = this.maps.get(field);
          if (!map || map[unsafeLocal] !== value) {
            this.maps.set(
              field,
              // biome-ignore lint/suspicious/noAssignInExpressions: no
              map = new ReflectMapImpl(field, value, this.check)
            );
          }
          return map;
        case "message":
          return messageToReflect(field, value, this.check);
        case "scalar":
          return value === void 0 ? scalarZeroValue(field.scalar, false) : longToReflect(field, value);
        case "enum":
          return value !== null && value !== void 0 ? value : field.enum.values[0].number;
      }
    }
    set(field, value) {
      assertOwn(this.message, field);
      if (this.check) {
        const err = checkField(field, value);
        if (err) {
          throw err;
        }
      }
      let local;
      if (field.fieldKind == "message") {
        local = messageToLocal(field, value);
      } else if (isReflectMap(value) || isReflectList(value)) {
        local = value[unsafeLocal];
      } else {
        local = longToLocal(field, value);
      }
      unsafeSet(this.message, field, local);
    }
    getUnknown() {
      return this.message.$unknown;
    }
    setUnknown(value) {
      this.message.$unknown = value;
    }
  };
  function assertOwn(owner, member) {
    if (member.parent.typeName !== owner.$typeName) {
      throw new FieldError(member, `cannot use ${member.toString()} with message ${owner.$typeName}`, "ForeignFieldError");
    }
  }
  var ReflectListImpl = class {
    field() {
      return this._field;
    }
    get size() {
      return this._arr.length;
    }
    constructor(field, unsafeInput, check) {
      this._field = field;
      this._arr = this[unsafeLocal] = unsafeInput;
      this.check = check;
    }
    get(index) {
      const item = this._arr[index];
      return item === void 0 ? void 0 : listItemToReflect(this._field, item, this.check);
    }
    set(index, item) {
      if (index < 0 || index >= this._arr.length) {
        throw new FieldError(this._field, `list item #${index + 1}: out of range`);
      }
      if (this.check) {
        const err = checkListItem(this._field, index, item);
        if (err) {
          throw err;
        }
      }
      this._arr[index] = listItemToLocal(this._field, item);
    }
    add(item) {
      if (this.check) {
        const err = checkListItem(this._field, this._arr.length, item);
        if (err) {
          throw err;
        }
      }
      this._arr.push(listItemToLocal(this._field, item));
      return void 0;
    }
    clear() {
      this._arr.splice(0, this._arr.length);
    }
    [Symbol.iterator]() {
      return this.values();
    }
    keys() {
      return this._arr.keys();
    }
    *values() {
      for (const item of this._arr) {
        yield listItemToReflect(this._field, item, this.check);
      }
    }
    *entries() {
      for (let i = 0; i < this._arr.length; i++) {
        yield [i, listItemToReflect(this._field, this._arr[i], this.check)];
      }
    }
  };
  var ReflectMapImpl = class {
    constructor(field, unsafeInput, check = true) {
      this.obj = this[unsafeLocal] = unsafeInput !== null && unsafeInput !== void 0 ? unsafeInput : {};
      this.check = check;
      this._field = field;
    }
    field() {
      return this._field;
    }
    set(key, value) {
      if (this.check) {
        const err = checkMapEntry(this._field, key, value);
        if (err) {
          throw err;
        }
      }
      this.obj[mapKeyToLocal(key)] = mapValueToLocal(this._field, value);
      return this;
    }
    delete(key) {
      const k = mapKeyToLocal(key);
      const has = Object.prototype.hasOwnProperty.call(this.obj, k);
      if (has) {
        delete this.obj[k];
      }
      return has;
    }
    clear() {
      for (const key of Object.keys(this.obj)) {
        delete this.obj[key];
      }
    }
    get(key) {
      let val = this.obj[mapKeyToLocal(key)];
      if (val !== void 0) {
        val = mapValueToReflect(this._field, val, this.check);
      }
      return val;
    }
    has(key) {
      return Object.prototype.hasOwnProperty.call(this.obj, mapKeyToLocal(key));
    }
    *keys() {
      for (const objKey of Object.keys(this.obj)) {
        yield mapKeyToReflect(objKey, this._field.mapKey);
      }
    }
    *entries() {
      for (const objEntry of Object.entries(this.obj)) {
        yield [
          mapKeyToReflect(objEntry[0], this._field.mapKey),
          mapValueToReflect(this._field, objEntry[1], this.check)
        ];
      }
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    get size() {
      return Object.keys(this.obj).length;
    }
    *values() {
      for (const val of Object.values(this.obj)) {
        yield mapValueToReflect(this._field, val, this.check);
      }
    }
    forEach(callbackfn, thisArg) {
      for (const mapEntry of this.entries()) {
        callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
      }
    }
  };
  function messageToLocal(field, value) {
    if (!isReflectMessage(value)) {
      return value;
    }
    if (isWrapper(value.message) && !field.oneof && field.fieldKind == "message") {
      return value.message.value;
    }
    if (value.desc.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value") {
      return wktStructToLocal(value.message);
    }
    return value.message;
  }
  function messageToReflect(field, value, check) {
    if (value !== void 0) {
      if (isWrapperDesc(field.message) && !field.oneof && field.fieldKind == "message") {
        value = {
          $typeName: field.message.typeName,
          value: longToReflect(field.message.fields[0], value)
        };
      } else if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value" && isObject(value)) {
        value = wktStructToReflect(value);
      }
    }
    return new ReflectMessageImpl(field.message, value, check);
  }
  function listItemToLocal(field, value) {
    if (field.listKind == "message") {
      return messageToLocal(field, value);
    }
    return longToLocal(field, value);
  }
  function listItemToReflect(field, value, check) {
    if (field.listKind == "message") {
      return messageToReflect(field, value, check);
    }
    return longToReflect(field, value);
  }
  function mapValueToLocal(field, value) {
    if (field.mapKind == "message") {
      return messageToLocal(field, value);
    }
    return longToLocal(field, value);
  }
  function mapValueToReflect(field, value, check) {
    if (field.mapKind == "message") {
      return messageToReflect(field, value, check);
    }
    return value;
  }
  function mapKeyToLocal(key) {
    return typeof key == "string" || typeof key == "number" ? key : String(key);
  }
  function mapKeyToReflect(key, type) {
    switch (type) {
      case ScalarType.STRING:
        return key;
      case ScalarType.INT32:
      case ScalarType.FIXED32:
      case ScalarType.UINT32:
      case ScalarType.SFIXED32:
      case ScalarType.SINT32: {
        const n = Number.parseInt(key);
        if (Number.isFinite(n)) {
          return n;
        }
        break;
      }
      case ScalarType.BOOL:
        switch (key) {
          case "true":
            return true;
          case "false":
            return false;
        }
        break;
      case ScalarType.UINT64:
      case ScalarType.FIXED64:
        try {
          return protoInt64.uParse(key);
        } catch (_a) {
        }
        break;
      default:
        try {
          return protoInt64.parse(key);
        } catch (_b) {
        }
        break;
    }
    return key;
  }
  function longToReflect(field, value) {
    switch (field.scalar) {
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        if ("longAsString" in field && field.longAsString && typeof value == "string") {
          value = protoInt64.parse(value);
        }
        break;
      case ScalarType.FIXED64:
      case ScalarType.UINT64:
        if ("longAsString" in field && field.longAsString && typeof value == "string") {
          value = protoInt64.uParse(value);
        }
        break;
    }
    return value;
  }
  function longToLocal(field, value) {
    switch (field.scalar) {
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        if ("longAsString" in field && field.longAsString) {
          value = String(value);
        } else if (typeof value == "string" || typeof value == "number") {
          value = protoInt64.parse(value);
        }
        break;
      case ScalarType.FIXED64:
      case ScalarType.UINT64:
        if ("longAsString" in field && field.longAsString) {
          value = String(value);
        } else if (typeof value == "string" || typeof value == "number") {
          value = protoInt64.uParse(value);
        }
        break;
    }
    return value;
  }
  function wktStructToReflect(json) {
    const struct = {
      $typeName: "google.protobuf.Struct",
      fields: {}
    };
    if (isObject(json)) {
      for (const [k, v] of Object.entries(json)) {
        struct.fields[k] = wktValueToReflect(v);
      }
    }
    return struct;
  }
  function wktStructToLocal(val) {
    const json = {};
    for (const [k, v] of Object.entries(val.fields)) {
      json[k] = wktValueToLocal(v);
    }
    return json;
  }
  function wktValueToLocal(val) {
    switch (val.kind.case) {
      case "structValue":
        return wktStructToLocal(val.kind.value);
      case "listValue":
        return val.kind.value.values.map(wktValueToLocal);
      case "nullValue":
      case void 0:
        return null;
      default:
        return val.kind.value;
    }
  }
  function wktValueToReflect(json) {
    const value = {
      $typeName: "google.protobuf.Value",
      kind: { case: void 0 }
    };
    switch (typeof json) {
      case "number":
        value.kind = { case: "numberValue", value: json };
        break;
      case "string":
        value.kind = { case: "stringValue", value: json };
        break;
      case "boolean":
        value.kind = { case: "boolValue", value: json };
        break;
      case "object":
        if (json === null) {
          const nullValue = 0;
          value.kind = { case: "nullValue", value: nullValue };
        } else if (Array.isArray(json)) {
          const listValue = {
            $typeName: "google.protobuf.ListValue",
            values: []
          };
          if (Array.isArray(json)) {
            for (const e of json) {
              listValue.values.push(wktValueToReflect(e));
            }
          }
          value.kind = {
            case: "listValue",
            value: listValue
          };
        } else {
          value.kind = {
            case: "structValue",
            value: wktStructToReflect(json)
          };
        }
        break;
    }
    return value;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
  function base64Decode(base64Str) {
    const table = getDecodeTable();
    let es2 = base64Str.length * 3 / 4;
    if (base64Str[base64Str.length - 2] == "=")
      es2 -= 2;
    else if (base64Str[base64Str.length - 1] == "=")
      es2 -= 1;
    let bytes = new Uint8Array(es2), bytePos = 0, groupPos = 0, b, p = 0;
    for (let i = 0; i < base64Str.length; i++) {
      b = table[base64Str.charCodeAt(i)];
      if (b === void 0) {
        switch (base64Str[i]) {
          // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
          case "=":
            groupPos = 0;
          // reset state when padding found
          case "\n":
          case "\r":
          case "	":
          case " ":
            continue;
          // skip white-space, and padding
          default:
            throw Error("invalid base64 string");
        }
      }
      switch (groupPos) {
        case 0:
          p = b;
          groupPos = 1;
          break;
        case 1:
          bytes[bytePos++] = p << 2 | (b & 48) >> 4;
          p = b;
          groupPos = 2;
          break;
        case 2:
          bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
          p = b;
          groupPos = 3;
          break;
        case 3:
          bytes[bytePos++] = (p & 3) << 6 | b;
          groupPos = 0;
          break;
      }
    }
    if (groupPos == 1)
      throw Error("invalid base64 string");
    return bytes.subarray(0, bytePos);
  }
  var encodeTableStd;
  var encodeTableUrl;
  var decodeTable;
  function getEncodeTable(encoding) {
    if (!encodeTableStd) {
      encodeTableStd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      encodeTableUrl = encodeTableStd.slice(0, -2).concat("-", "_");
    }
    return encoding == "url" ? (
      // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
      encodeTableUrl
    ) : encodeTableStd;
  }
  function getDecodeTable() {
    if (!decodeTable) {
      decodeTable = [];
      const encodeTable = getEncodeTable("std");
      for (let i = 0; i < encodeTable.length; i++)
        decodeTable[encodeTable[i].charCodeAt(0)] = i;
      decodeTable["-".charCodeAt(0)] = encodeTable.indexOf("+");
      decodeTable["_".charCodeAt(0)] = encodeTable.indexOf("/");
    }
    return decodeTable;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
  function protoCamelCase(snakeCase) {
    let capNext = false;
    const b = [];
    for (let i = 0; i < snakeCase.length; i++) {
      let c = snakeCase.charAt(i);
      switch (c) {
        case "_":
          capNext = true;
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          b.push(c);
          capNext = false;
          break;
        default:
          if (capNext) {
            capNext = false;
            c = c.toUpperCase();
          }
          b.push(c);
          break;
      }
    }
    return b.join("");
  }
  var reservedObjectProperties = /* @__PURE__ */ new Set([
    // names reserved by JavaScript
    "constructor",
    "toString",
    "toJSON",
    "valueOf"
  ]);
  function safeObjectProperty(name) {
    return reservedObjectProperties.has(name) ? name + "$" : name;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/restore-json-names.js
  function restoreJsonNames(message) {
    for (const f of message.field) {
      if (!unsafeIsSetExplicit(f, "jsonName")) {
        f.jsonName = protoCamelCase(f.name);
      }
    }
    message.nestedType.forEach(restoreJsonNames);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
  function parseTextFormatEnumValue(descEnum, value) {
    const enumValue = descEnum.values.find((v) => v.name === value);
    if (!enumValue) {
      throw new Error(`cannot parse ${descEnum} default value: ${value}`);
    }
    return enumValue.number;
  }
  function parseTextFormatScalarValue(type, value) {
    switch (type) {
      case ScalarType.STRING:
        return value;
      case ScalarType.BYTES: {
        const u = unescapeBytesDefaultValue(value);
        if (u === false) {
          throw new Error(`cannot parse ${ScalarType[type]} default value: ${value}`);
        }
        return u;
      }
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        return protoInt64.parse(value);
      case ScalarType.UINT64:
      case ScalarType.FIXED64:
        return protoInt64.uParse(value);
      case ScalarType.DOUBLE:
      case ScalarType.FLOAT:
        switch (value) {
          case "inf":
            return Number.POSITIVE_INFINITY;
          case "-inf":
            return Number.NEGATIVE_INFINITY;
          case "nan":
            return Number.NaN;
          default:
            return parseFloat(value);
        }
      case ScalarType.BOOL:
        return value === "true";
      case ScalarType.INT32:
      case ScalarType.UINT32:
      case ScalarType.SINT32:
      case ScalarType.FIXED32:
      case ScalarType.SFIXED32:
        return parseInt(value, 10);
    }
  }
  function unescapeBytesDefaultValue(str) {
    const b = [];
    const input = {
      tail: str,
      c: "",
      next() {
        if (this.tail.length == 0) {
          return false;
        }
        this.c = this.tail[0];
        this.tail = this.tail.substring(1);
        return true;
      },
      take(n) {
        if (this.tail.length >= n) {
          const r = this.tail.substring(0, n);
          this.tail = this.tail.substring(n);
          return r;
        }
        return false;
      }
    };
    while (input.next()) {
      switch (input.c) {
        case "\\":
          if (input.next()) {
            switch (input.c) {
              case "\\":
                b.push(input.c.charCodeAt(0));
                break;
              case "b":
                b.push(8);
                break;
              case "f":
                b.push(12);
                break;
              case "n":
                b.push(10);
                break;
              case "r":
                b.push(13);
                break;
              case "t":
                b.push(9);
                break;
              case "v":
                b.push(11);
                break;
              case "0":
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7": {
                const s = input.c;
                const t = input.take(2);
                if (t === false) {
                  return false;
                }
                const n = parseInt(s + t, 8);
                if (Number.isNaN(n)) {
                  return false;
                }
                b.push(n);
                break;
              }
              case "x": {
                const s = input.c;
                const t = input.take(2);
                if (t === false) {
                  return false;
                }
                const n = parseInt(s + t, 16);
                if (Number.isNaN(n)) {
                  return false;
                }
                b.push(n);
                break;
              }
              case "u": {
                const s = input.c;
                const t = input.take(4);
                if (t === false) {
                  return false;
                }
                const n = parseInt(s + t, 16);
                if (Number.isNaN(n)) {
                  return false;
                }
                const chunk = new Uint8Array(4);
                const view = new DataView(chunk.buffer);
                view.setInt32(0, n, true);
                b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
                break;
              }
              case "U": {
                const s = input.c;
                const t = input.take(8);
                if (t === false) {
                  return false;
                }
                const tc = protoInt64.uEnc(s + t);
                const chunk = new Uint8Array(8);
                const view = new DataView(chunk.buffer);
                view.setInt32(0, tc.lo, true);
                view.setInt32(4, tc.hi, true);
                b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
                break;
              }
            }
          }
          break;
        default:
          b.push(input.c.charCodeAt(0));
      }
    }
    return new Uint8Array(b);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
  function* nestedTypes(desc) {
    switch (desc.kind) {
      case "file":
        for (const message of desc.messages) {
          yield message;
          yield* nestedTypes(message);
        }
        yield* desc.enums;
        yield* desc.services;
        yield* desc.extensions;
        break;
      case "message":
        for (const message of desc.nestedMessages) {
          yield message;
          yield* nestedTypes(message);
        }
        yield* desc.nestedEnums;
        yield* desc.nestedExtensions;
        break;
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/registry.js
  function createFileRegistry(...args) {
    const registry = createBaseRegistry();
    if (!args.length) {
      return registry;
    }
    if ("$typeName" in args[0] && args[0].$typeName == "google.protobuf.FileDescriptorSet") {
      for (const file of args[0].file) {
        addFile(file, registry);
      }
      return registry;
    }
    if ("$typeName" in args[0]) {
      let recurseDeps = function(file) {
        const deps = [];
        for (const protoFileName of file.dependency) {
          if (registry.getFile(protoFileName) != void 0) {
            continue;
          }
          if (seen.has(protoFileName)) {
            continue;
          }
          const dep = resolve(protoFileName);
          if (!dep) {
            throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
          }
          if ("kind" in dep) {
            registry.addFile(dep, false, true);
          } else {
            seen.add(dep.name);
            deps.push(dep);
          }
        }
        return deps.concat(...deps.map(recurseDeps));
      };
      const input = args[0];
      const resolve = args[1];
      const seen = /* @__PURE__ */ new Set();
      for (const file of [input, ...recurseDeps(input)].reverse()) {
        addFile(file, registry);
      }
    } else {
      for (const fileReg of args) {
        for (const file of fileReg.files) {
          registry.addFile(file);
        }
      }
    }
    return registry;
  }
  function createBaseRegistry() {
    const types = /* @__PURE__ */ new Map();
    const extendees = /* @__PURE__ */ new Map();
    const files = /* @__PURE__ */ new Map();
    return {
      kind: "registry",
      types,
      extendees,
      [Symbol.iterator]() {
        return types.values();
      },
      get files() {
        return files.values();
      },
      addFile(file, skipTypes, withDeps) {
        files.set(file.proto.name, file);
        if (!skipTypes) {
          for (const type of nestedTypes(file)) {
            this.add(type);
          }
        }
        if (withDeps) {
          for (const f of file.dependencies) {
            this.addFile(f, skipTypes, withDeps);
          }
        }
      },
      add(desc) {
        if (desc.kind == "extension") {
          let numberToExt = extendees.get(desc.extendee.typeName);
          if (!numberToExt) {
            extendees.set(
              desc.extendee.typeName,
              // biome-ignore lint/suspicious/noAssignInExpressions: no
              numberToExt = /* @__PURE__ */ new Map()
            );
          }
          numberToExt.set(desc.number, desc);
        }
        types.set(desc.typeName, desc);
      },
      get(typeName) {
        return types.get(typeName);
      },
      getFile(fileName) {
        return files.get(fileName);
      },
      getMessage(typeName) {
        const t = types.get(typeName);
        return (t === null || t === void 0 ? void 0 : t.kind) == "message" ? t : void 0;
      },
      getEnum(typeName) {
        const t = types.get(typeName);
        return (t === null || t === void 0 ? void 0 : t.kind) == "enum" ? t : void 0;
      },
      getExtension(typeName) {
        const t = types.get(typeName);
        return (t === null || t === void 0 ? void 0 : t.kind) == "extension" ? t : void 0;
      },
      getExtensionFor(extendee, no2) {
        var _a;
        return (_a = extendees.get(extendee.typeName)) === null || _a === void 0 ? void 0 : _a.get(no2);
      },
      getService(typeName) {
        const t = types.get(typeName);
        return (t === null || t === void 0 ? void 0 : t.kind) == "service" ? t : void 0;
      }
    };
  }
  var EDITION_PROTO22 = 998;
  var EDITION_PROTO32 = 999;
  var TYPE_STRING = 9;
  var TYPE_GROUP = 10;
  var TYPE_MESSAGE = 11;
  var TYPE_BYTES = 12;
  var TYPE_ENUM = 14;
  var LABEL_REPEATED = 3;
  var LABEL_REQUIRED = 2;
  var JS_STRING = 1;
  var IDEMPOTENCY_UNKNOWN = 0;
  var EXPLICIT = 1;
  var IMPLICIT3 = 2;
  var LEGACY_REQUIRED = 3;
  var PACKED = 1;
  var DELIMITED = 2;
  var OPEN = 1;
  var featureDefaults = {
    // EDITION_PROTO2
    998: {
      fieldPresence: 1,
      // EXPLICIT,
      enumType: 2,
      // CLOSED,
      repeatedFieldEncoding: 2,
      // EXPANDED,
      utf8Validation: 3,
      // NONE,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 2,
      // LEGACY_BEST_EFFORT,
      enforceNamingStyle: 2,
      // STYLE_LEGACY,
      defaultSymbolVisibility: 1
      // EXPORT_ALL,
    },
    // EDITION_PROTO3
    999: {
      fieldPresence: 2,
      // IMPLICIT,
      enumType: 1,
      // OPEN,
      repeatedFieldEncoding: 1,
      // PACKED,
      utf8Validation: 2,
      // VERIFY,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 1,
      // ALLOW,
      enforceNamingStyle: 2,
      // STYLE_LEGACY,
      defaultSymbolVisibility: 1
      // EXPORT_ALL,
    },
    // EDITION_2023
    1e3: {
      fieldPresence: 1,
      // EXPLICIT,
      enumType: 1,
      // OPEN,
      repeatedFieldEncoding: 1,
      // PACKED,
      utf8Validation: 2,
      // VERIFY,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 1,
      // ALLOW,
      enforceNamingStyle: 2,
      // STYLE_LEGACY,
      defaultSymbolVisibility: 1
      // EXPORT_ALL,
    },
    // EDITION_2024
    1001: {
      fieldPresence: 1,
      // EXPLICIT,
      enumType: 1,
      // OPEN,
      repeatedFieldEncoding: 1,
      // PACKED,
      utf8Validation: 2,
      // VERIFY,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 1,
      // ALLOW,
      enforceNamingStyle: 1,
      // STYLE2024,
      defaultSymbolVisibility: 2
      // EXPORT_TOP_LEVEL,
    }
  };
  function addFile(proto, reg) {
    var _a, _b;
    const file = {
      kind: "file",
      proto,
      deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
      edition: getFileEdition(proto),
      name: proto.name.replace(/\.proto$/, ""),
      dependencies: findFileDependencies(proto, reg),
      enums: [],
      messages: [],
      extensions: [],
      services: [],
      toString() {
        return `file ${proto.name}`;
      }
    };
    const mapEntriesStore = /* @__PURE__ */ new Map();
    const mapEntries = {
      get(typeName) {
        return mapEntriesStore.get(typeName);
      },
      add(desc) {
        var _a2;
        assert(((_a2 = desc.proto.options) === null || _a2 === void 0 ? void 0 : _a2.mapEntry) === true);
        mapEntriesStore.set(desc.typeName, desc);
      }
    };
    for (const enumProto of proto.enumType) {
      addEnum(enumProto, file, void 0, reg);
    }
    for (const messageProto of proto.messageType) {
      addMessage(messageProto, file, void 0, reg, mapEntries);
    }
    for (const serviceProto of proto.service) {
      addService(serviceProto, file, reg);
    }
    addExtensions(file, reg);
    for (const mapEntry of mapEntriesStore.values()) {
      addFields(mapEntry, reg, mapEntries);
    }
    for (const message of file.messages) {
      addFields(message, reg, mapEntries);
      addExtensions(message, reg);
    }
    reg.addFile(file, true);
  }
  function addExtensions(desc, reg) {
    switch (desc.kind) {
      case "file":
        for (const proto of desc.proto.extension) {
          const ext = newField(proto, desc, reg);
          desc.extensions.push(ext);
          reg.add(ext);
        }
        break;
      case "message":
        for (const proto of desc.proto.extension) {
          const ext = newField(proto, desc, reg);
          desc.nestedExtensions.push(ext);
          reg.add(ext);
        }
        for (const message of desc.nestedMessages) {
          addExtensions(message, reg);
        }
        break;
    }
  }
  function addFields(message, reg, mapEntries) {
    const allOneofs = message.proto.oneofDecl.map((proto) => newOneof(proto, message));
    const oneofsSeen = /* @__PURE__ */ new Set();
    for (const proto of message.proto.field) {
      const oneof = findOneof(proto, allOneofs);
      const field = newField(proto, message, reg, oneof, mapEntries);
      message.fields.push(field);
      message.field[field.localName] = field;
      if (oneof === void 0) {
        message.members.push(field);
      } else {
        oneof.fields.push(field);
        if (!oneofsSeen.has(oneof)) {
          oneofsSeen.add(oneof);
          message.members.push(oneof);
        }
      }
    }
    for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) {
      message.oneofs.push(oneof);
    }
    for (const child of message.nestedMessages) {
      addFields(child, reg, mapEntries);
    }
  }
  function addEnum(proto, file, parent, reg) {
    var _a, _b, _c, _d, _e2;
    const sharedPrefix = findEnumSharedPrefix(proto.name, proto.value);
    const desc = {
      kind: "enum",
      proto,
      deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
      file,
      parent,
      open: true,
      name: proto.name,
      typeName: makeTypeName(proto, parent, file),
      value: {},
      values: [],
      sharedPrefix,
      toString() {
        return `enum ${this.typeName}`;
      }
    };
    desc.open = isEnumOpen(desc);
    reg.add(desc);
    for (const p of proto.value) {
      const name = p.name;
      desc.values.push(
        // biome-ignore lint/suspicious/noAssignInExpressions: no
        desc.value[p.number] = {
          kind: "enum_value",
          proto: p,
          deprecated: (_d = (_c = p.options) === null || _c === void 0 ? void 0 : _c.deprecated) !== null && _d !== void 0 ? _d : false,
          parent: desc,
          name,
          localName: safeObjectProperty(sharedPrefix == void 0 ? name : name.substring(sharedPrefix.length)),
          number: p.number,
          toString() {
            return `enum value ${desc.typeName}.${name}`;
          }
        }
      );
    }
    ((_e2 = parent === null || parent === void 0 ? void 0 : parent.nestedEnums) !== null && _e2 !== void 0 ? _e2 : file.enums).push(desc);
  }
  function addMessage(proto, file, parent, reg, mapEntries) {
    var _a, _b, _c, _d;
    const desc = {
      kind: "message",
      proto,
      deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
      file,
      parent,
      name: proto.name,
      typeName: makeTypeName(proto, parent, file),
      fields: [],
      field: {},
      oneofs: [],
      members: [],
      nestedEnums: [],
      nestedMessages: [],
      nestedExtensions: [],
      toString() {
        return `message ${this.typeName}`;
      }
    };
    if (((_c = proto.options) === null || _c === void 0 ? void 0 : _c.mapEntry) === true) {
      mapEntries.add(desc);
    } else {
      ((_d = parent === null || parent === void 0 ? void 0 : parent.nestedMessages) !== null && _d !== void 0 ? _d : file.messages).push(desc);
      reg.add(desc);
    }
    for (const enumProto of proto.enumType) {
      addEnum(enumProto, file, desc, reg);
    }
    for (const messageProto of proto.nestedType) {
      addMessage(messageProto, file, desc, reg, mapEntries);
    }
  }
  function addService(proto, file, reg) {
    var _a, _b;
    const desc = {
      kind: "service",
      proto,
      deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
      file,
      name: proto.name,
      typeName: makeTypeName(proto, void 0, file),
      methods: [],
      method: {},
      toString() {
        return `service ${this.typeName}`;
      }
    };
    file.services.push(desc);
    reg.add(desc);
    for (const methodProto of proto.method) {
      const method = newMethod(methodProto, desc, reg);
      desc.methods.push(method);
      desc.method[method.localName] = method;
    }
  }
  function newMethod(proto, parent, reg) {
    var _a, _b, _c, _d;
    let methodKind;
    if (proto.clientStreaming && proto.serverStreaming) {
      methodKind = "bidi_streaming";
    } else if (proto.clientStreaming) {
      methodKind = "client_streaming";
    } else if (proto.serverStreaming) {
      methodKind = "server_streaming";
    } else {
      methodKind = "unary";
    }
    const input = reg.getMessage(trimLeadingDot(proto.inputType));
    const output = reg.getMessage(trimLeadingDot(proto.outputType));
    assert(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
    assert(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
    const name = proto.name;
    return {
      kind: "rpc",
      proto,
      deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
      parent,
      name,
      localName: safeObjectProperty(name.length ? safeObjectProperty(name[0].toLowerCase() + name.substring(1)) : name),
      methodKind,
      input,
      output,
      idempotency: (_d = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.idempotencyLevel) !== null && _d !== void 0 ? _d : IDEMPOTENCY_UNKNOWN,
      toString() {
        return `rpc ${parent.typeName}.${name}`;
      }
    };
  }
  function newOneof(proto, parent) {
    return {
      kind: "oneof",
      proto,
      deprecated: false,
      parent,
      fields: [],
      name: proto.name,
      localName: safeObjectProperty(protoCamelCase(proto.name)),
      toString() {
        return `oneof ${parent.typeName}.${this.name}`;
      }
    };
  }
  function newField(proto, parentOrFile, reg, oneof, mapEntries) {
    var _a, _b, _c;
    const isExtension = mapEntries === void 0;
    const field = {
      kind: "field",
      proto,
      deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
      name: proto.name,
      number: proto.number,
      scalar: void 0,
      message: void 0,
      enum: void 0,
      presence: getFieldPresence(proto, oneof, isExtension, parentOrFile),
      listKind: void 0,
      mapKind: void 0,
      mapKey: void 0,
      delimitedEncoding: void 0,
      packed: void 0,
      longAsString: false,
      getDefaultValue: void 0
    };
    if (isExtension) {
      const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
      const parent = parentOrFile.kind == "file" ? void 0 : parentOrFile;
      const typeName = makeTypeName(proto, parent, file);
      field.kind = "extension";
      field.file = file;
      field.parent = parent;
      field.oneof = void 0;
      field.typeName = typeName;
      field.jsonName = `[${typeName}]`;
      field.toString = () => `extension ${typeName}`;
      const extendee = reg.getMessage(trimLeadingDot(proto.extendee));
      assert(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
      field.extendee = extendee;
    } else {
      const parent = parentOrFile;
      assert(parent.kind == "message");
      field.parent = parent;
      field.oneof = oneof;
      field.localName = oneof ? protoCamelCase(proto.name) : safeObjectProperty(protoCamelCase(proto.name));
      field.jsonName = proto.jsonName;
      field.toString = () => `field ${parent.typeName}.${proto.name}`;
    }
    const label = proto.label;
    const type = proto.type;
    const jstype = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.jstype;
    if (label === LABEL_REPEATED) {
      const mapEntry = type == TYPE_MESSAGE ? mapEntries === null || mapEntries === void 0 ? void 0 : mapEntries.get(trimLeadingDot(proto.typeName)) : void 0;
      if (mapEntry) {
        field.fieldKind = "map";
        const { key, value } = findMapEntryFields(mapEntry);
        field.mapKey = key.scalar;
        field.mapKind = value.fieldKind;
        field.message = value.message;
        field.delimitedEncoding = false;
        field.enum = value.enum;
        field.scalar = value.scalar;
        return field;
      }
      field.fieldKind = "list";
      switch (type) {
        case TYPE_MESSAGE:
        case TYPE_GROUP:
          field.listKind = "message";
          field.message = reg.getMessage(trimLeadingDot(proto.typeName));
          assert(field.message);
          field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
          break;
        case TYPE_ENUM:
          field.listKind = "enum";
          field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
          assert(field.enum);
          break;
        default:
          field.listKind = "scalar";
          field.scalar = type;
          field.longAsString = jstype == JS_STRING;
          break;
      }
      field.packed = isPackedField(proto, parentOrFile);
      return field;
    }
    switch (type) {
      case TYPE_MESSAGE:
      case TYPE_GROUP:
        field.fieldKind = "message";
        field.message = reg.getMessage(trimLeadingDot(proto.typeName));
        assert(field.message, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
        field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
        field.getDefaultValue = () => void 0;
        break;
      case TYPE_ENUM: {
        const enumeration = reg.getEnum(trimLeadingDot(proto.typeName));
        assert(enumeration !== void 0, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
        field.fieldKind = "enum";
        field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
        field.getDefaultValue = () => {
          return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatEnumValue(enumeration, proto.defaultValue) : void 0;
        };
        break;
      }
      default: {
        field.fieldKind = "scalar";
        field.scalar = type;
        field.longAsString = jstype == JS_STRING;
        field.getDefaultValue = () => {
          return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatScalarValue(type, proto.defaultValue) : void 0;
        };
        break;
      }
    }
    return field;
  }
  function getFileEdition(proto) {
    switch (proto.syntax) {
      case "":
      case "proto2":
        return EDITION_PROTO22;
      case "proto3":
        return EDITION_PROTO32;
      case "editions":
        if (proto.edition in featureDefaults) {
          return proto.edition;
        }
        throw new Error(`${proto.name}: unsupported edition`);
      default:
        throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
    }
  }
  function findFileDependencies(proto, reg) {
    return proto.dependency.map((wantName) => {
      const dep = reg.getFile(wantName);
      if (!dep) {
        throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
      }
      return dep;
    });
  }
  function findEnumSharedPrefix(enumName, values) {
    const prefix = camelToSnakeCase(enumName) + "_";
    for (const value of values) {
      if (!value.name.toLowerCase().startsWith(prefix)) {
        return void 0;
      }
      const shortName = value.name.substring(prefix.length);
      if (shortName.length == 0) {
        return void 0;
      }
      if (/^\d/.test(shortName)) {
        return void 0;
      }
    }
    return prefix;
  }
  function camelToSnakeCase(camel) {
    return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)).toLowerCase();
  }
  function makeTypeName(proto, parent, file) {
    let typeName;
    if (parent) {
      typeName = `${parent.typeName}.${proto.name}`;
    } else if (file.proto.package.length > 0) {
      typeName = `${file.proto.package}.${proto.name}`;
    } else {
      typeName = `${proto.name}`;
    }
    return typeName;
  }
  function trimLeadingDot(typeName) {
    return typeName.startsWith(".") ? typeName.substring(1) : typeName;
  }
  function findOneof(proto, allOneofs) {
    if (!unsafeIsSetExplicit(proto, "oneofIndex")) {
      return void 0;
    }
    if (proto.proto3Optional) {
      return void 0;
    }
    const oneof = allOneofs[proto.oneofIndex];
    assert(oneof, `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`);
    return oneof;
  }
  function getFieldPresence(proto, oneof, isExtension, parent) {
    if (proto.label == LABEL_REQUIRED) {
      return LEGACY_REQUIRED;
    }
    if (proto.label == LABEL_REPEATED) {
      return IMPLICIT3;
    }
    if (!!oneof || proto.proto3Optional) {
      return EXPLICIT;
    }
    if (isExtension) {
      return EXPLICIT;
    }
    const resolved = resolveFeature("fieldPresence", { proto, parent });
    if (resolved == IMPLICIT3 && (proto.type == TYPE_MESSAGE || proto.type == TYPE_GROUP)) {
      return EXPLICIT;
    }
    return resolved;
  }
  function isPackedField(proto, parent) {
    if (proto.label != LABEL_REPEATED) {
      return false;
    }
    switch (proto.type) {
      case TYPE_STRING:
      case TYPE_BYTES:
      case TYPE_GROUP:
      case TYPE_MESSAGE:
        return false;
    }
    const o = proto.options;
    if (o && unsafeIsSetExplicit(o, "packed")) {
      return o.packed;
    }
    return PACKED == resolveFeature("repeatedFieldEncoding", {
      proto,
      parent
    });
  }
  function findMapEntryFields(mapEntry) {
    const key = mapEntry.fields.find((f) => f.number === 1);
    const value = mapEntry.fields.find((f) => f.number === 2);
    assert(key && key.fieldKind == "scalar" && key.scalar != ScalarType.BYTES && key.scalar != ScalarType.FLOAT && key.scalar != ScalarType.DOUBLE && value && value.fieldKind != "list" && value.fieldKind != "map");
    return { key, value };
  }
  function isEnumOpen(desc) {
    var _a;
    return OPEN == resolveFeature("enumType", {
      proto: desc.proto,
      parent: (_a = desc.parent) !== null && _a !== void 0 ? _a : desc.file
    });
  }
  function isDelimitedEncoding(proto, parent) {
    if (proto.type == TYPE_GROUP) {
      return true;
    }
    return DELIMITED == resolveFeature("messageEncoding", {
      proto,
      parent
    });
  }
  function resolveFeature(name, ref) {
    var _a, _b;
    const featureSet = (_a = ref.proto.options) === null || _a === void 0 ? void 0 : _a.features;
    if (featureSet) {
      const val = featureSet[name];
      if (val != 0) {
        return val;
      }
    }
    if ("kind" in ref) {
      if (ref.kind == "message") {
        return resolveFeature(name, (_b = ref.parent) !== null && _b !== void 0 ? _b : ref.file);
      }
      const editionDefaults = featureDefaults[ref.edition];
      if (!editionDefaults) {
        throw new Error(`feature default for edition ${ref.edition} not found`);
      }
      return editionDefaults[name];
    }
    return resolveFeature(name, ref.parent);
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error(msg);
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/boot.js
  function boot(boot2) {
    const root = bootFileDescriptorProto(boot2);
    root.messageType.forEach(restoreJsonNames);
    const reg = createFileRegistry(root, () => void 0);
    return reg.getFile(root.name);
  }
  function bootFileDescriptorProto(init) {
    const proto = /* @__PURE__ */ Object.create({
      syntax: "",
      edition: 0
    });
    return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, init), { messageType: init.messageType.map(bootDescriptorProto), enumType: init.enumType.map(bootEnumDescriptorProto) }));
  }
  function bootDescriptorProto(init) {
    var _a, _b, _c, _d, _e2, _f, _g, _h;
    const proto = /* @__PURE__ */ Object.create({
      visibility: 0
    });
    return Object.assign(proto, {
      $typeName: "google.protobuf.DescriptorProto",
      name: init.name,
      field: (_b = (_a = init.field) === null || _a === void 0 ? void 0 : _a.map(bootFieldDescriptorProto)) !== null && _b !== void 0 ? _b : [],
      extension: [],
      nestedType: (_d = (_c = init.nestedType) === null || _c === void 0 ? void 0 : _c.map(bootDescriptorProto)) !== null && _d !== void 0 ? _d : [],
      enumType: (_f = (_e2 = init.enumType) === null || _e2 === void 0 ? void 0 : _e2.map(bootEnumDescriptorProto)) !== null && _f !== void 0 ? _f : [],
      extensionRange: (_h = (_g = init.extensionRange) === null || _g === void 0 ? void 0 : _g.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e))) !== null && _h !== void 0 ? _h : [],
      oneofDecl: [],
      reservedRange: [],
      reservedName: []
    });
  }
  function bootFieldDescriptorProto(init) {
    const proto = /* @__PURE__ */ Object.create({
      label: 1,
      typeName: "",
      extendee: "",
      defaultValue: "",
      oneofIndex: 0,
      jsonName: "",
      proto3Optional: false
    });
    return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, init), { options: init.options ? bootFieldOptions(init.options) : void 0 }));
  }
  function bootFieldOptions(init) {
    var _a, _b, _c;
    const proto = /* @__PURE__ */ Object.create({
      ctype: 0,
      packed: false,
      jstype: 0,
      lazy: false,
      unverifiedLazy: false,
      deprecated: false,
      weak: false,
      debugRedact: false,
      retention: 0
    });
    return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, init), { targets: (_a = init.targets) !== null && _a !== void 0 ? _a : [], editionDefaults: (_c = (_b = init.editionDefaults) === null || _b === void 0 ? void 0 : _b.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e))) !== null && _c !== void 0 ? _c : [], uninterpretedOption: [] }));
  }
  function bootEnumDescriptorProto(init) {
    const proto = /* @__PURE__ */ Object.create({
      visibility: 0
    });
    return Object.assign(proto, {
      $typeName: "google.protobuf.EnumDescriptorProto",
      name: init.name,
      reservedName: [],
      reservedRange: [],
      value: init.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
    });
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/message.js
  function messageDesc(file, path, ...paths) {
    return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/enum.js
  function enumDesc(file, path, ...paths) {
    if (paths.length == 0) {
      return file.enums[path];
    }
    const e = paths.pop();
    return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]).nestedEnums[e];
  }
  function tsEnum(desc) {
    const enumObject = {};
    for (const value of desc.values) {
      enumObject[value.localName] = value.number;
      enumObject[value.number] = value.localName;
    }
    return enumObject;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/descriptor_pb.js
  var file_google_protobuf_descriptor = /* @__PURE__ */ boot({ "name": "google/protobuf/descriptor.proto", "package": "google.protobuf", "messageType": [{ "name": "FileDescriptorSet", "field": [{ "name": "file", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.FileDescriptorProto" }], "extensionRange": [{ "start": 536e6, "end": 536000001 }] }, { "name": "FileDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "package", "number": 2, "type": 9, "label": 1 }, { "name": "dependency", "number": 3, "type": 9, "label": 3 }, { "name": "public_dependency", "number": 10, "type": 5, "label": 3 }, { "name": "weak_dependency", "number": 11, "type": 5, "label": 3 }, { "name": "option_dependency", "number": 15, "type": 9, "label": 3 }, { "name": "message_type", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto" }, { "name": "enum_type", "number": 5, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto" }, { "name": "service", "number": 6, "type": 11, "label": 3, "typeName": ".google.protobuf.ServiceDescriptorProto" }, { "name": "extension", "number": 7, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "options", "number": 8, "type": 11, "label": 1, "typeName": ".google.protobuf.FileOptions" }, { "name": "source_code_info", "number": 9, "type": 11, "label": 1, "typeName": ".google.protobuf.SourceCodeInfo" }, { "name": "syntax", "number": 12, "type": 9, "label": 1 }, { "name": "edition", "number": 14, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }] }, { "name": "DescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "field", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "extension", "number": 6, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "nested_type", "number": 3, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto" }, { "name": "enum_type", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto" }, { "name": "extension_range", "number": 5, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto.ExtensionRange" }, { "name": "oneof_decl", "number": 8, "type": 11, "label": 3, "typeName": ".google.protobuf.OneofDescriptorProto" }, { "name": "options", "number": 7, "type": 11, "label": 1, "typeName": ".google.protobuf.MessageOptions" }, { "name": "reserved_range", "number": 9, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto.ReservedRange" }, { "name": "reserved_name", "number": 10, "type": 9, "label": 3 }, { "name": "visibility", "number": 11, "type": 14, "label": 1, "typeName": ".google.protobuf.SymbolVisibility" }], "nestedType": [{ "name": "ExtensionRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.ExtensionRangeOptions" }] }, { "name": "ReservedRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }] }] }, { "name": "ExtensionRangeOptions", "field": [{ "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }, { "name": "declaration", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.ExtensionRangeOptions.Declaration", "options": { "retention": 2 } }, { "name": "features", "number": 50, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "verification", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.ExtensionRangeOptions.VerificationState", "defaultValue": "UNVERIFIED", "options": { "retention": 2 } }], "nestedType": [{ "name": "Declaration", "field": [{ "name": "number", "number": 1, "type": 5, "label": 1 }, { "name": "full_name", "number": 2, "type": 9, "label": 1 }, { "name": "type", "number": 3, "type": 9, "label": 1 }, { "name": "reserved", "number": 5, "type": 8, "label": 1 }, { "name": "repeated", "number": 6, "type": 8, "label": 1 }] }], "enumType": [{ "name": "VerificationState", "value": [{ "name": "DECLARATION", "number": 0 }, { "name": "UNVERIFIED", "number": 1 }] }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "FieldDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "number", "number": 3, "type": 5, "label": 1 }, { "name": "label", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldDescriptorProto.Label" }, { "name": "type", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldDescriptorProto.Type" }, { "name": "type_name", "number": 6, "type": 9, "label": 1 }, { "name": "extendee", "number": 2, "type": 9, "label": 1 }, { "name": "default_value", "number": 7, "type": 9, "label": 1 }, { "name": "oneof_index", "number": 9, "type": 5, "label": 1 }, { "name": "json_name", "number": 10, "type": 9, "label": 1 }, { "name": "options", "number": 8, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions" }, { "name": "proto3_optional", "number": 17, "type": 8, "label": 1 }], "enumType": [{ "name": "Type", "value": [{ "name": "TYPE_DOUBLE", "number": 1 }, { "name": "TYPE_FLOAT", "number": 2 }, { "name": "TYPE_INT64", "number": 3 }, { "name": "TYPE_UINT64", "number": 4 }, { "name": "TYPE_INT32", "number": 5 }, { "name": "TYPE_FIXED64", "number": 6 }, { "name": "TYPE_FIXED32", "number": 7 }, { "name": "TYPE_BOOL", "number": 8 }, { "name": "TYPE_STRING", "number": 9 }, { "name": "TYPE_GROUP", "number": 10 }, { "name": "TYPE_MESSAGE", "number": 11 }, { "name": "TYPE_BYTES", "number": 12 }, { "name": "TYPE_UINT32", "number": 13 }, { "name": "TYPE_ENUM", "number": 14 }, { "name": "TYPE_SFIXED32", "number": 15 }, { "name": "TYPE_SFIXED64", "number": 16 }, { "name": "TYPE_SINT32", "number": 17 }, { "name": "TYPE_SINT64", "number": 18 }] }, { "name": "Label", "value": [{ "name": "LABEL_OPTIONAL", "number": 1 }, { "name": "LABEL_REPEATED", "number": 3 }, { "name": "LABEL_REQUIRED", "number": 2 }] }] }, { "name": "OneofDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "options", "number": 2, "type": 11, "label": 1, "typeName": ".google.protobuf.OneofOptions" }] }, { "name": "EnumDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "value", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumValueDescriptorProto" }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.EnumOptions" }, { "name": "reserved_range", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { "name": "reserved_name", "number": 5, "type": 9, "label": 3 }, { "name": "visibility", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.SymbolVisibility" }], "nestedType": [{ "name": "EnumReservedRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }] }] }, { "name": "EnumValueDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "number", "number": 2, "type": 5, "label": 1 }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.EnumValueOptions" }] }, { "name": "ServiceDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "method", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.MethodDescriptorProto" }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.ServiceOptions" }] }, { "name": "MethodDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "input_type", "number": 2, "type": 9, "label": 1 }, { "name": "output_type", "number": 3, "type": 9, "label": 1 }, { "name": "options", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.MethodOptions" }, { "name": "client_streaming", "number": 5, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "server_streaming", "number": 6, "type": 8, "label": 1, "defaultValue": "false" }] }, { "name": "FileOptions", "field": [{ "name": "java_package", "number": 1, "type": 9, "label": 1 }, { "name": "java_outer_classname", "number": 8, "type": 9, "label": 1 }, { "name": "java_multiple_files", "number": 10, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "java_generate_equals_and_hash", "number": 20, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "java_string_check_utf8", "number": 27, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "optimize_for", "number": 9, "type": 14, "label": 1, "typeName": ".google.protobuf.FileOptions.OptimizeMode", "defaultValue": "SPEED" }, { "name": "go_package", "number": 11, "type": 9, "label": 1 }, { "name": "cc_generic_services", "number": 16, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "java_generic_services", "number": 17, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "py_generic_services", "number": 18, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 23, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "cc_enable_arenas", "number": 31, "type": 8, "label": 1, "defaultValue": "true" }, { "name": "objc_class_prefix", "number": 36, "type": 9, "label": 1 }, { "name": "csharp_namespace", "number": 37, "type": 9, "label": 1 }, { "name": "swift_prefix", "number": 39, "type": 9, "label": 1 }, { "name": "php_class_prefix", "number": 40, "type": 9, "label": 1 }, { "name": "php_namespace", "number": 41, "type": 9, "label": 1 }, { "name": "php_metadata_namespace", "number": 44, "type": 9, "label": 1 }, { "name": "ruby_package", "number": 45, "type": 9, "label": 1 }, { "name": "features", "number": 50, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "enumType": [{ "name": "OptimizeMode", "value": [{ "name": "SPEED", "number": 1 }, { "name": "CODE_SIZE", "number": 2 }, { "name": "LITE_RUNTIME", "number": 3 }] }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "MessageOptions", "field": [{ "name": "message_set_wire_format", "number": 1, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "no_standard_descriptor_accessor", "number": 2, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "map_entry", "number": 7, "type": 8, "label": 1 }, { "name": "deprecated_legacy_json_field_conflicts", "number": 11, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "features", "number": 12, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "FieldOptions", "field": [{ "name": "ctype", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.CType", "defaultValue": "STRING" }, { "name": "packed", "number": 2, "type": 8, "label": 1 }, { "name": "jstype", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.JSType", "defaultValue": "JS_NORMAL" }, { "name": "lazy", "number": 5, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "unverified_lazy", "number": 15, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "weak", "number": 10, "type": 8, "label": 1, "defaultValue": "false", "options": { "deprecated": true } }, { "name": "debug_redact", "number": 16, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "retention", "number": 17, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.OptionRetention" }, { "name": "targets", "number": 19, "type": 14, "label": 3, "typeName": ".google.protobuf.FieldOptions.OptionTargetType" }, { "name": "edition_defaults", "number": 20, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldOptions.EditionDefault" }, { "name": "features", "number": 21, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "feature_support", "number": 22, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions.FeatureSupport" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "nestedType": [{ "name": "EditionDefault", "field": [{ "name": "edition", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "value", "number": 2, "type": 9, "label": 1 }] }, { "name": "FeatureSupport", "field": [{ "name": "edition_introduced", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "edition_deprecated", "number": 2, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "deprecation_warning", "number": 3, "type": 9, "label": 1 }, { "name": "edition_removed", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }] }], "enumType": [{ "name": "CType", "value": [{ "name": "STRING", "number": 0 }, { "name": "CORD", "number": 1 }, { "name": "STRING_PIECE", "number": 2 }] }, { "name": "JSType", "value": [{ "name": "JS_NORMAL", "number": 0 }, { "name": "JS_STRING", "number": 1 }, { "name": "JS_NUMBER", "number": 2 }] }, { "name": "OptionRetention", "value": [{ "name": "RETENTION_UNKNOWN", "number": 0 }, { "name": "RETENTION_RUNTIME", "number": 1 }, { "name": "RETENTION_SOURCE", "number": 2 }] }, { "name": "OptionTargetType", "value": [{ "name": "TARGET_TYPE_UNKNOWN", "number": 0 }, { "name": "TARGET_TYPE_FILE", "number": 1 }, { "name": "TARGET_TYPE_EXTENSION_RANGE", "number": 2 }, { "name": "TARGET_TYPE_MESSAGE", "number": 3 }, { "name": "TARGET_TYPE_FIELD", "number": 4 }, { "name": "TARGET_TYPE_ONEOF", "number": 5 }, { "name": "TARGET_TYPE_ENUM", "number": 6 }, { "name": "TARGET_TYPE_ENUM_ENTRY", "number": 7 }, { "name": "TARGET_TYPE_SERVICE", "number": 8 }, { "name": "TARGET_TYPE_METHOD", "number": 9 }] }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "OneofOptions", "field": [{ "name": "features", "number": 1, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "EnumOptions", "field": [{ "name": "allow_alias", "number": 2, "type": 8, "label": 1 }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated_legacy_json_field_conflicts", "number": 6, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "features", "number": 7, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "EnumValueOptions", "field": [{ "name": "deprecated", "number": 1, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "features", "number": 2, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "debug_redact", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "feature_support", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions.FeatureSupport" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "ServiceOptions", "field": [{ "name": "features", "number": 34, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "deprecated", "number": 33, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "MethodOptions", "field": [{ "name": "deprecated", "number": 33, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "idempotency_level", "number": 34, "type": 14, "label": 1, "typeName": ".google.protobuf.MethodOptions.IdempotencyLevel", "defaultValue": "IDEMPOTENCY_UNKNOWN" }, { "name": "features", "number": 35, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "enumType": [{ "name": "IdempotencyLevel", "value": [{ "name": "IDEMPOTENCY_UNKNOWN", "number": 0 }, { "name": "NO_SIDE_EFFECTS", "number": 1 }, { "name": "IDEMPOTENT", "number": 2 }] }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "UninterpretedOption", "field": [{ "name": "name", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption.NamePart" }, { "name": "identifier_value", "number": 3, "type": 9, "label": 1 }, { "name": "positive_int_value", "number": 4, "type": 4, "label": 1 }, { "name": "negative_int_value", "number": 5, "type": 3, "label": 1 }, { "name": "double_value", "number": 6, "type": 1, "label": 1 }, { "name": "string_value", "number": 7, "type": 12, "label": 1 }, { "name": "aggregate_value", "number": 8, "type": 9, "label": 1 }], "nestedType": [{ "name": "NamePart", "field": [{ "name": "name_part", "number": 1, "type": 9, "label": 2 }, { "name": "is_extension", "number": 2, "type": 8, "label": 2 }] }] }, { "name": "FeatureSet", "field": [{ "name": "field_presence", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.FieldPresence", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "EXPLICIT", "edition": 900 }, { "value": "IMPLICIT", "edition": 999 }, { "value": "EXPLICIT", "edition": 1e3 }] } }, { "name": "enum_type", "number": 2, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.EnumType", "options": { "retention": 1, "targets": [6, 1], "editionDefaults": [{ "value": "CLOSED", "edition": 900 }, { "value": "OPEN", "edition": 999 }] } }, { "name": "repeated_field_encoding", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.RepeatedFieldEncoding", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "EXPANDED", "edition": 900 }, { "value": "PACKED", "edition": 999 }] } }, { "name": "utf8_validation", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.Utf8Validation", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "NONE", "edition": 900 }, { "value": "VERIFY", "edition": 999 }] } }, { "name": "message_encoding", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.MessageEncoding", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "LENGTH_PREFIXED", "edition": 900 }] } }, { "name": "json_format", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.JsonFormat", "options": { "retention": 1, "targets": [3, 6, 1], "editionDefaults": [{ "value": "LEGACY_BEST_EFFORT", "edition": 900 }, { "value": "ALLOW", "edition": 999 }] } }, { "name": "enforce_naming_style", "number": 7, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.EnforceNamingStyle", "options": { "retention": 2, "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9], "editionDefaults": [{ "value": "STYLE_LEGACY", "edition": 900 }, { "value": "STYLE2024", "edition": 1001 }] } }, { "name": "default_symbol_visibility", "number": 8, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", "options": { "retention": 2, "targets": [1], "editionDefaults": [{ "value": "EXPORT_ALL", "edition": 900 }, { "value": "EXPORT_TOP_LEVEL", "edition": 1001 }] } }], "nestedType": [{ "name": "VisibilityFeature", "enumType": [{ "name": "DefaultSymbolVisibility", "value": [{ "name": "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", "number": 0 }, { "name": "EXPORT_ALL", "number": 1 }, { "name": "EXPORT_TOP_LEVEL", "number": 2 }, { "name": "LOCAL_ALL", "number": 3 }, { "name": "STRICT", "number": 4 }] }] }], "enumType": [{ "name": "FieldPresence", "value": [{ "name": "FIELD_PRESENCE_UNKNOWN", "number": 0 }, { "name": "EXPLICIT", "number": 1 }, { "name": "IMPLICIT", "number": 2 }, { "name": "LEGACY_REQUIRED", "number": 3 }] }, { "name": "EnumType", "value": [{ "name": "ENUM_TYPE_UNKNOWN", "number": 0 }, { "name": "OPEN", "number": 1 }, { "name": "CLOSED", "number": 2 }] }, { "name": "RepeatedFieldEncoding", "value": [{ "name": "REPEATED_FIELD_ENCODING_UNKNOWN", "number": 0 }, { "name": "PACKED", "number": 1 }, { "name": "EXPANDED", "number": 2 }] }, { "name": "Utf8Validation", "value": [{ "name": "UTF8_VALIDATION_UNKNOWN", "number": 0 }, { "name": "VERIFY", "number": 2 }, { "name": "NONE", "number": 3 }] }, { "name": "MessageEncoding", "value": [{ "name": "MESSAGE_ENCODING_UNKNOWN", "number": 0 }, { "name": "LENGTH_PREFIXED", "number": 1 }, { "name": "DELIMITED", "number": 2 }] }, { "name": "JsonFormat", "value": [{ "name": "JSON_FORMAT_UNKNOWN", "number": 0 }, { "name": "ALLOW", "number": 1 }, { "name": "LEGACY_BEST_EFFORT", "number": 2 }] }, { "name": "EnforceNamingStyle", "value": [{ "name": "ENFORCE_NAMING_STYLE_UNKNOWN", "number": 0 }, { "name": "STYLE2024", "number": 1 }, { "name": "STYLE_LEGACY", "number": 2 }] }], "extensionRange": [{ "start": 1e3, "end": 9995 }, { "start": 9995, "end": 1e4 }, { "start": 1e4, "end": 10001 }] }, { "name": "FeatureSetDefaults", "field": [{ "name": "defaults", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { "name": "minimum_edition", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "maximum_edition", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }], "nestedType": [{ "name": "FeatureSetEditionDefault", "field": [{ "name": "edition", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "overridable_features", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "fixed_features", "number": 5, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }] }] }, { "name": "SourceCodeInfo", "field": [{ "name": "location", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.SourceCodeInfo.Location" }], "nestedType": [{ "name": "Location", "field": [{ "name": "path", "number": 1, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "span", "number": 2, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "leading_comments", "number": 3, "type": 9, "label": 1 }, { "name": "trailing_comments", "number": 4, "type": 9, "label": 1 }, { "name": "leading_detached_comments", "number": 6, "type": 9, "label": 3 }] }], "extensionRange": [{ "start": 536e6, "end": 536000001 }] }, { "name": "GeneratedCodeInfo", "field": [{ "name": "annotation", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation" }], "nestedType": [{ "name": "Annotation", "field": [{ "name": "path", "number": 1, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "source_file", "number": 2, "type": 9, "label": 1 }, { "name": "begin", "number": 3, "type": 5, "label": 1 }, { "name": "end", "number": 4, "type": 5, "label": 1 }, { "name": "semantic", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], "enumType": [{ "name": "Semantic", "value": [{ "name": "NONE", "number": 0 }, { "name": "SET", "number": 1 }, { "name": "ALIAS", "number": 2 }] }] }] }], "enumType": [{ "name": "Edition", "value": [{ "name": "EDITION_UNKNOWN", "number": 0 }, { "name": "EDITION_LEGACY", "number": 900 }, { "name": "EDITION_PROTO2", "number": 998 }, { "name": "EDITION_PROTO3", "number": 999 }, { "name": "EDITION_2023", "number": 1e3 }, { "name": "EDITION_2024", "number": 1001 }, { "name": "EDITION_UNSTABLE", "number": 9999 }, { "name": "EDITION_1_TEST_ONLY", "number": 1 }, { "name": "EDITION_2_TEST_ONLY", "number": 2 }, { "name": "EDITION_99997_TEST_ONLY", "number": 99997 }, { "name": "EDITION_99998_TEST_ONLY", "number": 99998 }, { "name": "EDITION_99999_TEST_ONLY", "number": 99999 }, { "name": "EDITION_MAX", "number": 2147483647 }] }, { "name": "SymbolVisibility", "value": [{ "name": "VISIBILITY_UNSET", "number": 0 }, { "name": "VISIBILITY_LOCAL", "number": 1 }, { "name": "VISIBILITY_EXPORT", "number": 2 }] }] });
  var FileDescriptorProtoSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_descriptor, 1);
  var ExtensionRangeOptions_VerificationState;
  (function(ExtensionRangeOptions_VerificationState2) {
    ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["DECLARATION"] = 0] = "DECLARATION";
    ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["UNVERIFIED"] = 1] = "UNVERIFIED";
  })(ExtensionRangeOptions_VerificationState || (ExtensionRangeOptions_VerificationState = {}));
  var FieldDescriptorProto_Type;
  (function(FieldDescriptorProto_Type2) {
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["DOUBLE"] = 1] = "DOUBLE";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FLOAT"] = 2] = "FLOAT";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT64"] = 3] = "INT64";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT64"] = 4] = "UINT64";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT32"] = 5] = "INT32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED64"] = 6] = "FIXED64";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED32"] = 7] = "FIXED32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BOOL"] = 8] = "BOOL";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["STRING"] = 9] = "STRING";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["GROUP"] = 10] = "GROUP";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["MESSAGE"] = 11] = "MESSAGE";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BYTES"] = 12] = "BYTES";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT32"] = 13] = "UINT32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["ENUM"] = 14] = "ENUM";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED32"] = 15] = "SFIXED32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED64"] = 16] = "SFIXED64";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT32"] = 17] = "SINT32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT64"] = 18] = "SINT64";
  })(FieldDescriptorProto_Type || (FieldDescriptorProto_Type = {}));
  var FieldDescriptorProto_Label;
  (function(FieldDescriptorProto_Label2) {
    FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["OPTIONAL"] = 1] = "OPTIONAL";
    FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REPEATED"] = 3] = "REPEATED";
    FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REQUIRED"] = 2] = "REQUIRED";
  })(FieldDescriptorProto_Label || (FieldDescriptorProto_Label = {}));
  var FileOptions_OptimizeMode;
  (function(FileOptions_OptimizeMode2) {
    FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["SPEED"] = 1] = "SPEED";
    FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["CODE_SIZE"] = 2] = "CODE_SIZE";
    FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
  })(FileOptions_OptimizeMode || (FileOptions_OptimizeMode = {}));
  var FieldOptions_CType;
  (function(FieldOptions_CType2) {
    FieldOptions_CType2[FieldOptions_CType2["STRING"] = 0] = "STRING";
    FieldOptions_CType2[FieldOptions_CType2["CORD"] = 1] = "CORD";
    FieldOptions_CType2[FieldOptions_CType2["STRING_PIECE"] = 2] = "STRING_PIECE";
  })(FieldOptions_CType || (FieldOptions_CType = {}));
  var FieldOptions_JSType;
  (function(FieldOptions_JSType2) {
    FieldOptions_JSType2[FieldOptions_JSType2["JS_NORMAL"] = 0] = "JS_NORMAL";
    FieldOptions_JSType2[FieldOptions_JSType2["JS_STRING"] = 1] = "JS_STRING";
    FieldOptions_JSType2[FieldOptions_JSType2["JS_NUMBER"] = 2] = "JS_NUMBER";
  })(FieldOptions_JSType || (FieldOptions_JSType = {}));
  var FieldOptions_OptionRetention;
  (function(FieldOptions_OptionRetention2) {
    FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_UNKNOWN"] = 0] = "RETENTION_UNKNOWN";
    FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_RUNTIME"] = 1] = "RETENTION_RUNTIME";
    FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_SOURCE"] = 2] = "RETENTION_SOURCE";
  })(FieldOptions_OptionRetention || (FieldOptions_OptionRetention = {}));
  var FieldOptions_OptionTargetType;
  (function(FieldOptions_OptionTargetType2) {
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_UNKNOWN"] = 0] = "TARGET_TYPE_UNKNOWN";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FILE"] = 1] = "TARGET_TYPE_FILE";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_EXTENSION_RANGE"] = 2] = "TARGET_TYPE_EXTENSION_RANGE";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_MESSAGE"] = 3] = "TARGET_TYPE_MESSAGE";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FIELD"] = 4] = "TARGET_TYPE_FIELD";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ONEOF"] = 5] = "TARGET_TYPE_ONEOF";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM"] = 6] = "TARGET_TYPE_ENUM";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM_ENTRY"] = 7] = "TARGET_TYPE_ENUM_ENTRY";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_SERVICE"] = 8] = "TARGET_TYPE_SERVICE";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_METHOD"] = 9] = "TARGET_TYPE_METHOD";
  })(FieldOptions_OptionTargetType || (FieldOptions_OptionTargetType = {}));
  var MethodOptions_IdempotencyLevel;
  (function(MethodOptions_IdempotencyLevel2) {
    MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
    MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
    MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENT"] = 2] = "IDEMPOTENT";
  })(MethodOptions_IdempotencyLevel || (MethodOptions_IdempotencyLevel = {}));
  var FeatureSet_VisibilityFeature_DefaultSymbolVisibility;
  (function(FeatureSet_VisibilityFeature_DefaultSymbolVisibility2) {
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["DEFAULT_SYMBOL_VISIBILITY_UNKNOWN"] = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN";
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["EXPORT_ALL"] = 1] = "EXPORT_ALL";
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["EXPORT_TOP_LEVEL"] = 2] = "EXPORT_TOP_LEVEL";
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["LOCAL_ALL"] = 3] = "LOCAL_ALL";
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["STRICT"] = 4] = "STRICT";
  })(FeatureSet_VisibilityFeature_DefaultSymbolVisibility || (FeatureSet_VisibilityFeature_DefaultSymbolVisibility = {}));
  var FeatureSet_FieldPresence;
  (function(FeatureSet_FieldPresence2) {
    FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["FIELD_PRESENCE_UNKNOWN"] = 0] = "FIELD_PRESENCE_UNKNOWN";
    FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["EXPLICIT"] = 1] = "EXPLICIT";
    FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["IMPLICIT"] = 2] = "IMPLICIT";
    FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["LEGACY_REQUIRED"] = 3] = "LEGACY_REQUIRED";
  })(FeatureSet_FieldPresence || (FeatureSet_FieldPresence = {}));
  var FeatureSet_EnumType;
  (function(FeatureSet_EnumType2) {
    FeatureSet_EnumType2[FeatureSet_EnumType2["ENUM_TYPE_UNKNOWN"] = 0] = "ENUM_TYPE_UNKNOWN";
    FeatureSet_EnumType2[FeatureSet_EnumType2["OPEN"] = 1] = "OPEN";
    FeatureSet_EnumType2[FeatureSet_EnumType2["CLOSED"] = 2] = "CLOSED";
  })(FeatureSet_EnumType || (FeatureSet_EnumType = {}));
  var FeatureSet_RepeatedFieldEncoding;
  (function(FeatureSet_RepeatedFieldEncoding2) {
    FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["REPEATED_FIELD_ENCODING_UNKNOWN"] = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN";
    FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["PACKED"] = 1] = "PACKED";
    FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["EXPANDED"] = 2] = "EXPANDED";
  })(FeatureSet_RepeatedFieldEncoding || (FeatureSet_RepeatedFieldEncoding = {}));
  var FeatureSet_Utf8Validation;
  (function(FeatureSet_Utf8Validation2) {
    FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["UTF8_VALIDATION_UNKNOWN"] = 0] = "UTF8_VALIDATION_UNKNOWN";
    FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["VERIFY"] = 2] = "VERIFY";
    FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["NONE"] = 3] = "NONE";
  })(FeatureSet_Utf8Validation || (FeatureSet_Utf8Validation = {}));
  var FeatureSet_MessageEncoding;
  (function(FeatureSet_MessageEncoding2) {
    FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["MESSAGE_ENCODING_UNKNOWN"] = 0] = "MESSAGE_ENCODING_UNKNOWN";
    FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["LENGTH_PREFIXED"] = 1] = "LENGTH_PREFIXED";
    FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["DELIMITED"] = 2] = "DELIMITED";
  })(FeatureSet_MessageEncoding || (FeatureSet_MessageEncoding = {}));
  var FeatureSet_JsonFormat;
  (function(FeatureSet_JsonFormat2) {
    FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["JSON_FORMAT_UNKNOWN"] = 0] = "JSON_FORMAT_UNKNOWN";
    FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["ALLOW"] = 1] = "ALLOW";
    FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["LEGACY_BEST_EFFORT"] = 2] = "LEGACY_BEST_EFFORT";
  })(FeatureSet_JsonFormat || (FeatureSet_JsonFormat = {}));
  var FeatureSet_EnforceNamingStyle;
  (function(FeatureSet_EnforceNamingStyle2) {
    FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["ENFORCE_NAMING_STYLE_UNKNOWN"] = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN";
    FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE2024"] = 1] = "STYLE2024";
    FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE_LEGACY"] = 2] = "STYLE_LEGACY";
  })(FeatureSet_EnforceNamingStyle || (FeatureSet_EnforceNamingStyle = {}));
  var GeneratedCodeInfo_Annotation_Semantic;
  (function(GeneratedCodeInfo_Annotation_Semantic2) {
    GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["NONE"] = 0] = "NONE";
    GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["SET"] = 1] = "SET";
    GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["ALIAS"] = 2] = "ALIAS";
  })(GeneratedCodeInfo_Annotation_Semantic || (GeneratedCodeInfo_Annotation_Semantic = {}));
  var Edition;
  (function(Edition2) {
    Edition2[Edition2["EDITION_UNKNOWN"] = 0] = "EDITION_UNKNOWN";
    Edition2[Edition2["EDITION_LEGACY"] = 900] = "EDITION_LEGACY";
    Edition2[Edition2["EDITION_PROTO2"] = 998] = "EDITION_PROTO2";
    Edition2[Edition2["EDITION_PROTO3"] = 999] = "EDITION_PROTO3";
    Edition2[Edition2["EDITION_2023"] = 1e3] = "EDITION_2023";
    Edition2[Edition2["EDITION_2024"] = 1001] = "EDITION_2024";
    Edition2[Edition2["EDITION_UNSTABLE"] = 9999] = "EDITION_UNSTABLE";
    Edition2[Edition2["EDITION_1_TEST_ONLY"] = 1] = "EDITION_1_TEST_ONLY";
    Edition2[Edition2["EDITION_2_TEST_ONLY"] = 2] = "EDITION_2_TEST_ONLY";
    Edition2[Edition2["EDITION_99997_TEST_ONLY"] = 99997] = "EDITION_99997_TEST_ONLY";
    Edition2[Edition2["EDITION_99998_TEST_ONLY"] = 99998] = "EDITION_99998_TEST_ONLY";
    Edition2[Edition2["EDITION_99999_TEST_ONLY"] = 99999] = "EDITION_99999_TEST_ONLY";
    Edition2[Edition2["EDITION_MAX"] = 2147483647] = "EDITION_MAX";
  })(Edition || (Edition = {}));
  var SymbolVisibility;
  (function(SymbolVisibility2) {
    SymbolVisibility2[SymbolVisibility2["VISIBILITY_UNSET"] = 0] = "VISIBILITY_UNSET";
    SymbolVisibility2[SymbolVisibility2["VISIBILITY_LOCAL"] = 1] = "VISIBILITY_LOCAL";
    SymbolVisibility2[SymbolVisibility2["VISIBILITY_EXPORT"] = 2] = "VISIBILITY_EXPORT";
  })(SymbolVisibility || (SymbolVisibility = {}));

  // node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
  var readDefaults = {
    readUnknownFields: true
  };
  function makeReadOptions(options) {
    return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
  }
  function fromBinary(schema, bytes, options) {
    const msg = reflect(schema, void 0, false);
    readMessage(msg, new BinaryReader(bytes), makeReadOptions(options), false, bytes.byteLength);
    return msg.message;
  }
  function readMessage(message, reader, options, delimited, lengthOrDelimitedFieldNo) {
    var _a;
    const end = delimited ? reader.len : reader.pos + lengthOrDelimitedFieldNo;
    let fieldNo;
    let wireType;
    const unknownFields = (_a = message.getUnknown()) !== null && _a !== void 0 ? _a : [];
    while (reader.pos < end) {
      [fieldNo, wireType] = reader.tag();
      if (delimited && wireType == WireType.EndGroup) {
        break;
      }
      const field = message.findNumber(fieldNo);
      if (!field) {
        const data = reader.skip(wireType, fieldNo);
        if (options.readUnknownFields) {
          unknownFields.push({ no: fieldNo, wireType, data });
        }
        continue;
      }
      readField(message, reader, field, wireType, options);
    }
    if (delimited) {
      if (wireType != WireType.EndGroup || fieldNo !== lengthOrDelimitedFieldNo) {
        throw new Error("invalid end group tag");
      }
    }
    if (unknownFields.length > 0) {
      message.setUnknown(unknownFields);
    }
  }
  function readField(message, reader, field, wireType, options) {
    var _a;
    switch (field.fieldKind) {
      case "scalar":
        message.set(field, readScalar(reader, field.scalar));
        break;
      case "enum":
        const val = readScalar(reader, ScalarType.INT32);
        if (field.enum.open) {
          message.set(field, val);
        } else {
          const ok = field.enum.values.some((v) => v.number === val);
          if (ok) {
            message.set(field, val);
          } else if (options.readUnknownFields) {
            const bytes = [];
            varint32write(val, bytes);
            const unknownFields = (_a = message.getUnknown()) !== null && _a !== void 0 ? _a : [];
            unknownFields.push({
              no: field.number,
              wireType,
              data: new Uint8Array(bytes)
            });
            message.setUnknown(unknownFields);
          }
        }
        break;
      case "message":
        message.set(field, readMessageField(reader, options, field, message.get(field)));
        break;
      case "list":
        readListField(reader, wireType, message.get(field), options);
        break;
      case "map":
        readMapEntry(reader, message.get(field), options);
        break;
    }
  }
  function readMapEntry(reader, map, options) {
    const field = map.field();
    let key;
    let val;
    const len = reader.uint32();
    const end = reader.pos + len;
    while (reader.pos < end) {
      const [fieldNo] = reader.tag();
      switch (fieldNo) {
        case 1:
          key = readScalar(reader, field.mapKey);
          break;
        case 2:
          switch (field.mapKind) {
            case "scalar":
              val = readScalar(reader, field.scalar);
              break;
            case "enum":
              val = reader.int32();
              break;
            case "message":
              val = readMessageField(reader, options, field);
              break;
          }
          break;
      }
    }
    if (key === void 0) {
      key = scalarZeroValue(field.mapKey, false);
    }
    if (val === void 0) {
      switch (field.mapKind) {
        case "scalar":
          val = scalarZeroValue(field.scalar, false);
          break;
        case "enum":
          val = field.enum.values[0].number;
          break;
        case "message":
          val = reflect(field.message, void 0, false);
          break;
      }
    }
    map.set(key, val);
  }
  function readListField(reader, wireType, list, options) {
    var _a;
    const field = list.field();
    if (field.listKind === "message") {
      list.add(readMessageField(reader, options, field));
      return;
    }
    const scalarType = (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32;
    const packed = wireType == WireType.LengthDelimited && scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES;
    if (!packed) {
      list.add(readScalar(reader, scalarType));
      return;
    }
    const e = reader.uint32() + reader.pos;
    while (reader.pos < e) {
      list.add(readScalar(reader, scalarType));
    }
  }
  function readMessageField(reader, options, field, mergeMessage) {
    const delimited = field.delimitedEncoding;
    const message = mergeMessage !== null && mergeMessage !== void 0 ? mergeMessage : reflect(field.message, void 0, false);
    readMessage(message, reader, options, delimited, delimited ? field.number : reader.uint32());
    return message;
  }
  function readScalar(reader, type) {
    switch (type) {
      case ScalarType.STRING:
        return reader.string();
      case ScalarType.BOOL:
        return reader.bool();
      case ScalarType.DOUBLE:
        return reader.double();
      case ScalarType.FLOAT:
        return reader.float();
      case ScalarType.INT32:
        return reader.int32();
      case ScalarType.INT64:
        return reader.int64();
      case ScalarType.UINT64:
        return reader.uint64();
      case ScalarType.FIXED64:
        return reader.fixed64();
      case ScalarType.BYTES:
        return reader.bytes();
      case ScalarType.FIXED32:
        return reader.fixed32();
      case ScalarType.SFIXED32:
        return reader.sfixed32();
      case ScalarType.SFIXED64:
        return reader.sfixed64();
      case ScalarType.SINT64:
        return reader.sint64();
      case ScalarType.UINT32:
        return reader.uint32();
      case ScalarType.SINT32:
        return reader.sint32();
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/file.js
  function fileDesc(b64, imports) {
    var _a;
    const root = fromBinary(FileDescriptorProtoSchema, base64Decode(b64));
    root.messageType.forEach(restoreJsonNames);
    root.dependency = (_a = imports === null || imports === void 0 ? void 0 : imports.map((f) => f.proto.name)) !== null && _a !== void 0 ? _a : [];
    const reg = createFileRegistry(root, (protoFileName) => imports === null || imports === void 0 ? void 0 : imports.find((f) => f.proto.name === protoFileName));
    return reg.getFile(root.name);
  }

  // node_modules/sentencepiece-buf/dist/sentencepiece_model_pb.js
  var file_sentencepiece_model = /* @__PURE__ */ fileDesc("ChlzZW50ZW5jZXBpZWNlX21vZGVsLnByb3RvEg1zZW50ZW5jZXBpZWNlIqQMCgtUcmFpbmVyU3BlYxINCgVpbnB1dBgBIAMoCRIUCgxpbnB1dF9mb3JtYXQYByABKAkSFAoMbW9kZWxfcHJlZml4GAIgASgJEkEKCm1vZGVsX3R5cGUYAyABKA4yJC5zZW50ZW5jZXBpZWNlLlRyYWluZXJTcGVjLk1vZGVsVHlwZToHVU5JR1JBTRIYCgp2b2NhYl9zaXplGAQgASgFOgQ4MDAwEhcKD2FjY2VwdF9sYW5ndWFnZRgFIAMoCRIgChVzZWxmX3Rlc3Rfc2FtcGxlX3NpemUYBiABKAU6ATASKgobZW5hYmxlX2RpZmZlcmVudGlhbF9wcml2YWN5GDIgASgIOgVmYWxzZRIrCiBkaWZmZXJlbnRpYWxfcHJpdmFjeV9ub2lzZV9sZXZlbBgzIAEoAjoBMBIyCidkaWZmZXJlbnRpYWxfcHJpdmFjeV9jbGlwcGluZ190aHJlc2hvbGQYNCABKAQ6ATASIgoSY2hhcmFjdGVyX2NvdmVyYWdlGAogASgCOgYwLjk5OTUSHgoTaW5wdXRfc2VudGVuY2Vfc2l6ZRgLIAEoBDoBMBIkChZzaHVmZmxlX2lucHV0X3NlbnRlbmNlGBMgASgIOgR0cnVlEiAKFG1pbmluZ19zZW50ZW5jZV9zaXplGAwgASgFQgIYARIiChZ0cmFpbmluZ19zZW50ZW5jZV9zaXplGA0gASgFQgIYARIoChdzZWVkX3NlbnRlbmNlcGllY2Vfc2l6ZRgOIAEoBToHMTAwMDAwMBIeChBzaHJpbmtpbmdfZmFjdG9yGA8gASgCOgQwLjc1EiEKE21heF9zZW50ZW5jZV9sZW5ndGgYEiABKAU6BDQxOTISFwoLbnVtX3RocmVhZHMYECABKAU6AjE2Eh0KEm51bV9zdWJfaXRlcmF0aW9ucxgRIAEoBToBMhIkChhtYXhfc2VudGVuY2VwaWVjZV9sZW5ndGgYFCABKAU6AjE2EiUKF3NwbGl0X2J5X3VuaWNvZGVfc2NyaXB0GBUgASgIOgR0cnVlEh0KD3NwbGl0X2J5X251bWJlchgXIAEoCDoEdHJ1ZRIhChNzcGxpdF9ieV93aGl0ZXNwYWNlGBYgASgIOgR0cnVlEikKGnRyZWF0X3doaXRlc3BhY2VfYXNfc3VmZml4GBggASgIOgVmYWxzZRIrChxhbGxvd193aGl0ZXNwYWNlX29ubHlfcGllY2VzGBogASgIOgVmYWxzZRIbCgxzcGxpdF9kaWdpdHMYGSABKAg6BWZhbHNlEiMKGXByZXRva2VuaXphdGlvbl9kZWxpbWl0ZXIYNSABKAk6ABIXCg9jb250cm9sX3N5bWJvbHMYHiADKAkSHAoUdXNlcl9kZWZpbmVkX3N5bWJvbHMYHyADKAkSFgoOcmVxdWlyZWRfY2hhcnMYJCABKAkSHAoNYnl0ZV9mYWxsYmFjaxgjIAEoCDoFZmFsc2USKwoddm9jYWJ1bGFyeV9vdXRwdXRfcGllY2Vfc2NvcmUYICABKAg6BHRydWUSHgoQaGFyZF92b2NhYl9saW1pdBghIAEoCDoEdHJ1ZRIcCg11c2VfYWxsX3ZvY2FiGCIgASgIOgVmYWxzZRIRCgZ1bmtfaWQYKCABKAU6ATASEQoGYm9zX2lkGCkgASgFOgExEhEKBmVvc19pZBgqIAEoBToBMhISCgZwYWRfaWQYKyABKAU6Ai0xEhgKCXVua19waWVjZRgtIAEoCToFPHVuaz4SFgoJYm9zX3BpZWNlGC4gASgJOgM8cz4SFwoJZW9zX3BpZWNlGC8gASgJOgQ8L3M+EhgKCXBhZF9waWVjZRgwIAEoCToFPHBhZD4SGgoLdW5rX3N1cmZhY2UYLCABKAk6BSDigYcgEisKHHRyYWluX2V4dHJlbWVseV9sYXJnZV9jb3JwdXMYMSABKAg6BWZhbHNlEiIKGHNlZWRfc2VudGVuY2VwaWVjZXNfZmlsZRg2IAEoCToAIjUKCU1vZGVsVHlwZRILCgdVTklHUkFNEAESBwoDQlBFEAISCAoEV09SRBADEggKBENIQVIQBCoJCMgBEICAgIACItEBCg5Ob3JtYWxpemVyU3BlYxIMCgRuYW1lGAEgASgJEhwKFHByZWNvbXBpbGVkX2NoYXJzbWFwGAIgASgMEh4KEGFkZF9kdW1teV9wcmVmaXgYAyABKAg6BHRydWUSJgoYcmVtb3ZlX2V4dHJhX3doaXRlc3BhY2VzGAQgASgIOgR0cnVlEiAKEmVzY2FwZV93aGl0ZXNwYWNlcxgFIAEoCDoEdHJ1ZRIeChZub3JtYWxpemF0aW9uX3J1bGVfdHN2GAYgASgJKgkIyAEQgICAgAIieQoMU2VsZlRlc3REYXRhEjMKB3NhbXBsZXMYASADKAsyIi5zZW50ZW5jZXBpZWNlLlNlbGZUZXN0RGF0YS5TYW1wbGUaKQoGU2FtcGxlEg0KBWlucHV0GAEgASgJEhAKCGV4cGVjdGVkGAIgASgJKgkIyAEQgICAgAIi/gMKCk1vZGVsUHJvdG8SNwoGcGllY2VzGAEgAygLMicuc2VudGVuY2VwaWVjZS5Nb2RlbFByb3RvLlNlbnRlbmNlUGllY2USMAoMdHJhaW5lcl9zcGVjGAIgASgLMhouc2VudGVuY2VwaWVjZS5UcmFpbmVyU3BlYxI2Cg9ub3JtYWxpemVyX3NwZWMYAyABKAsyHS5zZW50ZW5jZXBpZWNlLk5vcm1hbGl6ZXJTcGVjEjMKDnNlbGZfdGVzdF9kYXRhGAQgASgLMhsuc2VudGVuY2VwaWVjZS5TZWxmVGVzdERhdGESOAoRZGVub3JtYWxpemVyX3NwZWMYBSABKAsyHS5zZW50ZW5jZXBpZWNlLk5vcm1hbGl6ZXJTcGVjGtIBCg1TZW50ZW5jZVBpZWNlEg0KBXBpZWNlGAEgASgJEg0KBXNjb3JlGAIgASgCEkIKBHR5cGUYAyABKA4yLC5zZW50ZW5jZXBpZWNlLk1vZGVsUHJvdG8uU2VudGVuY2VQaWVjZS5UeXBlOgZOT1JNQUwiVAoEVHlwZRIKCgZOT1JNQUwQARILCgdVTktOT1dOEAISCwoHQ09OVFJPTBADEhAKDFVTRVJfREVGSU5FRBAEEggKBEJZVEUQBhIKCgZVTlVTRUQQBSoJCMgBEICAgIACKgkIyAEQgICAgAJCAkgD");
  var ModelProtoSchema = /* @__PURE__ */ messageDesc(file_sentencepiece_model, 3);
  var ModelProto_SentencePiece_TypeSchema = /* @__PURE__ */ enumDesc(file_sentencepiece_model, 3, 0, 0);
  var ModelProto_SentencePiece_Type = /* @__PURE__ */ tsEnum(ModelProto_SentencePiece_TypeSchema);

  // node_modules/@jax-js/loaders/dist/index.js
  function isOPFSSupported() {
    return typeof navigator !== "undefined" && "storage" in navigator && "getDirectory" in navigator.storage;
  }
  function fileToInfo(name, file) {
    return {
      name,
      lastModified: new Date(file.lastModified),
      size: file.size
    };
  }
  var OPFS = class OPFS2 {
    #root = null;
    async #getRoot() {
      if (!this.#root) {
        if (!isOPFSSupported()) throw new Error("OPFS is not supported in this environment");
        const dir = await navigator.storage.getDirectory();
        this.#root = await dir.getDirectoryHandle("jax-js", { create: true });
      }
      return this.#root;
    }
    /** Escape problematic characters in keys for safe file system usage. */
    static #escapeKey(name) {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(name);
      const hex = Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
      return `blob-${hex}`;
    }
    static #unescapeKey(key) {
      try {
        if (!key.startsWith("blob-")) return key;
        const hex = key.slice(5);
        const bytes = new Uint8Array(hex.match(/.{2}/g)?.map((h) => parseInt(h, 16)) ?? []);
        return new TextDecoder().decode(bytes);
      } catch {
        return key;
      }
    }
    /** Write data to OPFS with the given key. */
    async write(name, data) {
      const root = await this.#getRoot();
      const key = OPFS2.#escapeKey(name);
      const fileHandle = await root.getFileHandle(key, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(data);
      await writable.close();
    }
    async #getFile(name) {
      const root = await this.#getRoot();
      const key = OPFS2.#escapeKey(name);
      try {
        const fileHandle = await root.getFileHandle(key);
        return await fileHandle.getFile();
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotFoundError") return null;
        throw error;
      }
    }
    /** Read data from OPFS with the given key. */
    async read(name) {
      const file = await this.#getFile(name);
      if (!file) return null;
      return new Uint8Array(await file.arrayBuffer());
    }
    /** Get file information for the given key. */
    async info(name) {
      const file = await this.#getFile(name);
      if (!file) return null;
      return fileToInfo(name, file);
    }
    /** List all files in OPFS. */
    async list() {
      const root = await this.#getRoot();
      const files = [];
      for await (const [key, handle] of root.entries()) if (handle.kind === "file") {
        const name = OPFS2.#unescapeKey(key);
        try {
          const file = await handle.getFile();
          files.push(fileToInfo(name, file));
        } catch (error) {
          if (error instanceof DOMException && error.name === "NotFoundError") continue;
          throw error;
        }
      }
      return files;
    }
    /** Remove a file from OPFS and return its info if it existed. */
    async remove(name) {
      const root = await this.#getRoot();
      const file = await this.#getFile(name);
      if (!file) return null;
      const info = fileToInfo(name, file);
      const key = OPFS2.#escapeKey(name);
      try {
        await root.removeEntry(key);
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotFoundError") return null;
        throw error;
      }
      return info;
    }
    /** Clear all files from OPFS. */
    async clear() {
      const root = await this.#getRoot();
      for await (const key of root.keys()) try {
        await root.removeEntry(key);
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotFoundError") continue;
        throw error;
      }
    }
  };
  var opfs = new OPFS();
  async function cachedFetch(input, init, onProgress) {
    const url = typeof input === "string" ? input : String(input);
    const cachedData = await opfs.read(url);
    if (cachedData !== null) {
      onProgress?.({
        loadedBytes: cachedData.byteLength,
        totalBytes: cachedData.byteLength
      });
      return cachedData;
    }
    const resp = await fetch(input, init);
    if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.status} ${resp.statusText}`);
    const contentLength = resp.headers.get("Content-Length");
    let totalBytes = contentLength ? parseInt(contentLength, 10) : void 0;
    if (totalBytes && (!Number.isInteger(totalBytes) || totalBytes < 0)) totalBytes = void 0;
    let loadedBytes = 0;
    let data;
    if (!resp.body) {
      data = new Uint8Array();
      onProgress?.({
        loadedBytes,
        totalBytes: 0
      });
    } else {
      const trackedBody = resp.body.pipeThrough(new TransformStream({
        start() {
          onProgress?.({
            loadedBytes,
            totalBytes
          });
        },
        transform(chunk, controller) {
          loadedBytes += chunk.byteLength;
          onProgress?.({
            loadedBytes,
            totalBytes
          });
          controller.enqueue(chunk);
        }
      }));
      data = new Uint8Array(await new Response(trackedBody).bytes());
      onProgress?.({
        loadedBytes: data.byteLength,
        totalBytes: data.byteLength
      });
    }
    try {
      await opfs.write(url, data);
    } catch (cacheError) {
      console.warn(`Failed to cache response in OPFS for ${url}:`, cacheError);
    }
    return data;
  }
  var safetensors_exports = {};
  __export(safetensors_exports, {
    fromNested: () => fromNested,
    parse: () => parse,
    toNested: () => toNested
  });
  function parse(data) {
    let buffer;
    let ptr = 0;
    const len = data.byteLength;
    if (data instanceof ArrayBuffer) buffer = data;
    else {
      buffer = data.buffer;
      ptr = data.byteOffset;
    }
    if (len < 8) throw new Error("Data too short to be a valid safetensors file");
    const view = new DataView(buffer, ptr, 8);
    const headerSize = view.getBigUint64(0, true);
    if (headerSize > BigInt(len - 8)) throw new Error("Invalid header size");
    let header;
    try {
      header = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, ptr + 8, Number(headerSize))));
    } catch (error) {
      throw new Error(`Failed to parse safetensors header as JSON: ${error}`);
    }
    const file = {
      tensors: {},
      totalSize: len
    };
    for (const [key, value] of Object.entries(header)) {
      if (key === "__metadata__") {
        file.metadata = value;
        continue;
      }
      const { dtype, shape, data_offsets } = value;
      const byteOffset = ptr + Number(headerSize) + 8 + data_offsets[0];
      const byteLength = data_offsets[1] - data_offsets[0];
      let data$1;
      switch (dtype) {
        case "F16":
          data$1 = new Float16Array(buffer, byteOffset, byteLength / 2);
          break;
        case "F32":
          data$1 = new Float32Array(buffer, byteOffset, byteLength / 4);
          break;
        case "F64":
          data$1 = new Float64Array(buffer, byteOffset, byteLength / 8);
          break;
        case "I8":
          data$1 = new Int8Array(buffer, byteOffset, byteLength);
          break;
        case "I16":
          data$1 = new Int16Array(buffer, byteOffset, byteLength / 2);
          break;
        case "I32":
          data$1 = new Int32Array(buffer, byteOffset, byteLength / 4);
          break;
        case "I64":
          data$1 = new BigInt64Array(buffer, byteOffset, byteLength / 8);
          break;
        case "U8":
          data$1 = new Uint8Array(buffer, byteOffset, byteLength);
          break;
        case "U16":
          data$1 = new Uint16Array(buffer, byteOffset, byteLength / 2);
          break;
        case "U32":
          data$1 = new Uint32Array(buffer, byteOffset, byteLength / 4);
          break;
        case "U64":
          data$1 = new BigUint64Array(buffer, byteOffset, byteLength / 8);
          break;
        case "BOOL":
          data$1 = new Uint8Array(buffer, byteOffset, byteLength);
          break;
        default:
          throw new Error(`Unsupported dtype: ${dtype}`);
      }
      file.tensors[key] = {
        dtype,
        shape,
        data: data$1
      };
    }
    return file;
  }
  function toNested(tensors) {
    const isNumeric = (s) => /^\d+$/.test(s);
    const keys = Object.keys(tensors);
    const isTopLevelArray = keys.length > 0 && keys.every((key) => {
      const firstPart = key.split(".")[0];
      return isNumeric(firstPart);
    });
    const result = isTopLevelArray ? [] : {};
    for (const [key, value] of Object.entries(tensors)) {
      if (!key) throw new Error("empty key in tensors list");
      const parts = key.split(".");
      let currentObj = result;
      let currentPart = parts[0];
      for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        if (isNumeric(part)) {
          if (!Object.hasOwn(currentObj, currentPart)) currentObj[currentPart] = [];
          currentObj = currentObj[currentPart];
          currentPart = parseInt(part, 10);
        } else {
          if (!Object.hasOwn(currentObj, currentPart)) currentObj[currentPart] = {};
          currentObj = currentObj[currentPart];
          currentPart = part;
        }
      }
      currentObj[currentPart] = value;
    }
    return result;
  }
  function isLeaf(value) {
    if (typeof value !== "object" || value === null) return true;
    return !Array.isArray(value) && value.constructor !== Object;
  }
  function fromNested(nested, prefix = "") {
    const result = {};
    function flatten(obj, currentPrefix) {
      if (isLeaf(obj)) {
        if (!currentPrefix) throw new Error("cannot have empty key in nested object");
        result[currentPrefix] = obj;
        return;
      }
      if (Array.isArray(obj)) for (let i = 0; i < obj.length; i++) {
        const newPrefix = currentPrefix ? `${currentPrefix}.${i}` : `${i}`;
        flatten(obj[i], newPrefix);
      }
      else for (const [key, value] of Object.entries(obj)) {
        const newPrefix = currentPrefix ? `${currentPrefix}.${key}` : key;
        flatten(value, newPrefix);
      }
    }
    flatten(nested, prefix);
    return result;
  }
  var tokenizers_exports = {};
  __export(tokenizers_exports, {
    BpeEncoding: () => BpeEncoding,
    Unigram: () => Unigram,
    getBpe: () => getBpe,
    loadSentencePiece: () => loadSentencePiece
  });
  var r50kPattern = /'(?:[sdmt]|ll|ve|re)| ?[\p{L}]+| ?[\p{N}]+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;
  async function getBpe(name) {
    if (name === "clip") {
      const vocab = await loadClipData();
      return new ClipEncoding(vocab);
    } else if (name === "r50k_base") {
      const encoder = await loadTiktokenBpe("https://cdn.jsdelivr.net/npm/gpt-tokenizer@3.0.1/data/r50k_base.tiktoken");
      return new BpeEncoding(encoder, { "<|endoftext|>": 50256 }, r50kPattern);
    } else if (name === "p50k_base" || name === "p50k_edit") {
      const encoder = await loadTiktokenBpe("https://cdn.jsdelivr.net/npm/gpt-tokenizer@3.0.1/data/p50k_base.tiktoken");
      const specialTokens = { "<|endoftext|>": 50256 };
      if (name === "p50k_edit") {
        specialTokens["<|fim_prefix|>"] = 50281;
        specialTokens["<|fim_middle|>"] = 50282;
        specialTokens["<|fim_suffix|>"] = 50283;
      }
      return new BpeEncoding(encoder, specialTokens, r50kPattern);
    } else if (name === "cl100k_base") {
      const encoder = await loadTiktokenBpe("https://cdn.jsdelivr.net/npm/gpt-tokenizer@3.0.1/data/cl100k_base.tiktoken");
      const specialTokens = {
        "<|endoftext|>": 100257,
        "<|fim_prefix|>": 100258,
        "<|fim_middle|>": 100259,
        "<|fim_suffix|>": 100260,
        "<|endofprompt|>": 100276
      };
      return new BpeEncoding(encoder, specialTokens, /'(?:[sdmtSDMT]|[lL]{2}|[vV][eE]|[rR][eE])|[^\r\n\p{L}\p{N}]?\p{L}+|\p{N}{1,3}| ?[^\s\p{L}\p{N}]+[\r\n]*|\s+$|\s*[\r\n]|\s+(?!\S)|\s/gu);
    } else if (name === "o200k_base" || name === "o200k_harmony") {
      const encoder = await loadTiktokenBpe("https://cdn.jsdelivr.net/npm/gpt-tokenizer@3.0.1/data/o200k_base.tiktoken");
      const specialTokens = {
        "<|endoftext|>": 199999,
        "<|endofprompt|>": 200018
      };
      if (name === "o200k_harmony") {
        delete specialTokens["<|endofprompt|>"];
        specialTokens["<|startoftext|>"] = 199998;
        specialTokens["<|reserved_200000|>"] = 2e5;
        specialTokens["<|reserved_200001|>"] = 200001;
        specialTokens["<|return|>"] = 200002;
        specialTokens["<|constrain|>"] = 200003;
        specialTokens["<|reserved_200004|>"] = 200004;
        specialTokens["<|channel|>"] = 200005;
        specialTokens["<|start|>"] = 200006;
        specialTokens["<|end|>"] = 200007;
        specialTokens["<|message|>"] = 200008;
        specialTokens["<|reserved_200009|>"] = 200009;
        specialTokens["<|reserved_200010|>"] = 200010;
        specialTokens["<|reserved_200011|>"] = 200011;
        specialTokens["<|call|>"] = 200012;
        for (let i = 200013; i < 201088; i++) specialTokens[`<|reserved_${i}|>`] = i;
      }
      const pattern = new RegExp([/[^\r\n\p{L}\p{N}]?[\p{Lu}\p{Lt}\p{Lm}\p{Lo}\p{M}]*[\p{Ll}\p{Lm}\p{Lo}\p{M}]+(?:'[stmdSTMD]|'[rR][eE]|'[vV][eE]|'[lL]{2})?/u.source + /[^\r\n\p{L}\p{N}]?[\p{Lu}\p{Lt}\p{Lm}\p{Lo}\p{M}]+[\p{Ll}\p{Lm}\p{Lo}\p{M}]*(?:'[stmdSTMD]|'[rR][eE]|'[vV][eE]|'[lL]{2})?/u.source + /\p{N}{1,3}/u.source + / ?[^\s\p{L}\p{N}]+[\r\n/]*/u.source + /\s*[\r\n]+/.source + /\s+(?!\S)/.source + /\s+/.source].join("|"), "gu");
      return new BpeEncoding(encoder, specialTokens, pattern);
    }
    throw new Error(`Unsupported tokenizer: ${name}`);
  }
  function _bytePairMerge(ranks, piece) {
    const RANK_MAX = 2147483647;
    const n = piece.length / 2;
    const parts = [];
    let minRank = [RANK_MAX, -1];
    for (let i = 0; i < n - 1; i++) {
      const rank = ranks.get(piece.substring(2 * i, 2 * (i + 2))) ?? RANK_MAX;
      if (rank < minRank[0]) minRank = [rank, i];
      parts.push([i, rank]);
    }
    parts.push([n - 1, RANK_MAX]);
    parts.push([n, RANK_MAX]);
    const getRank = (i) => {
      if (i + 3 < parts.length) return ranks.get(piece.substring(2 * parts[i][0], 2 * parts[i + 3][0])) ?? RANK_MAX;
      return RANK_MAX;
    };
    while (minRank[0] !== RANK_MAX) {
      const i = minRank[1];
      if (i > 0) parts[i - 1][1] = getRank(i - 1);
      parts[i][1] = getRank(i);
      parts.splice(i + 1, 1);
      minRank = [RANK_MAX, -1];
      for (let j = 0; j < parts.length - 1; j++) if (parts[j][1] < minRank[0]) minRank = [parts[j][1], j];
    }
    return parts;
  }
  function bytePairEncode(piece, ranks) {
    if (piece.length / 2 === 1) return [ranks.get(piece)];
    const parts = _bytePairMerge(ranks, piece);
    const tokens = [];
    for (let i = 0; i < parts.length - 1; i++) tokens.push(ranks.get(piece.substring(2 * parts[i][0], 2 * parts[i + 1][0])));
    return tokens;
  }
  var BpeEncoding = class {
    encoder;
    specialTokensEncoder;
    decoder;
    specialTokensDecoder;
    regex;
    specialRegex;
    /** Construct a new BPE encoding. */
    constructor(encoder, specialTokens, regex) {
      if (!regex.global) throw new Error("Regex for BPE pattern should have global flag set");
      const specialTokensEncoder = new Map(Object.entries(specialTokens));
      const specialRegex = new RegExp([...specialTokensEncoder.keys()].map(_escapeRegex).join("|"), "g");
      const decoder = /* @__PURE__ */ new Map();
      for (const [bytes, rank] of encoder.entries()) {
        if (decoder.has(rank)) throw new Error(`Duplicate rank in encoder: ${rank}`);
        decoder.set(rank, bytes);
      }
      const specialTokensDecoder = /* @__PURE__ */ new Map();
      for (const [token, rank] of specialTokensEncoder.entries()) {
        if (decoder.has(rank) || specialTokensDecoder.has(rank)) throw new Error(`Duplicate rank in special tokens: ${rank}`);
        specialTokensDecoder.set(rank, _bytesToHex(new TextEncoder().encode(token)));
      }
      this.encoder = encoder;
      this.specialTokensEncoder = specialTokensEncoder;
      this.decoder = decoder;
      this.specialTokensDecoder = specialTokensDecoder;
      this.regex = regex;
      this.specialRegex = specialRegex;
    }
    /**
    * Decode tokens into a string.
    *
    * May be lossy if the tokens output bytes that don't correspond to a valid
    * UTF-8 string.
    */
    decode(tokens) {
      return new TextDecoder().decode(this.decodeBytes(tokens));
    }
    /** Decode tokens into a byte array (may not be UTF-8). */
    decodeBytes(tokens) {
      tokens = this._beforeDecode(tokens);
      const decodedHex = [];
      for (const token of tokens) {
        let bytes = this.decoder.get(token);
        if (bytes === void 0) bytes = this.specialTokensDecoder.get(token);
        if (bytes === void 0) throw new Error(`Unknown token during decode: ${token}`);
        decodedHex.push(bytes);
      }
      return _bytesFromHex(decodedHex.join(""));
    }
    /** Encode a text string into tokens, optionally supporting special tokens. */
    encode(text, allowedSpecial) {
      text = this._beforeEncode(text);
      const ret = [];
      let start = 0;
      while (true) {
        let nextSpecial = null;
        this.specialRegex.lastIndex = start;
        while (true) {
          nextSpecial = this.specialRegex.exec(text);
          if (nextSpecial === null) break;
          if (allowedSpecial?.has(nextSpecial[0])) break;
          this.specialRegex.lastIndex = nextSpecial.index + 1;
        }
        const end = nextSpecial ? nextSpecial.index : text.length;
        for (const mat of text.slice(start, end).matchAll(this.regex)) {
          const pieceBytes = new TextEncoder().encode(mat[0]);
          const piece = _bytesToHex(pieceBytes);
          const token = this.encoder.get(piece);
          if (token !== void 0) ret.push(token);
          else {
            const tokens = bytePairEncode(piece, this.encoder);
            ret.push(...tokens);
          }
        }
        if (nextSpecial !== null) {
          const piece = nextSpecial[0];
          const token = this.specialTokensEncoder.get(piece);
          ret.push(token);
          start = nextSpecial.index + nextSpecial.length;
        } else break;
      }
      return this._afterEncode(ret);
    }
    /** Retrieve a list of special tokens in this encoding. */
    specialTokens() {
      return new Set(this.specialTokensEncoder.keys());
    }
    /** Encode text with all special tokens allowed. */
    encodeWithSpecialTokens(text) {
      return this.encode(text, this.specialTokens());
    }
    /** Can be overridden to change behavior of decode(). */
    _beforeDecode(tokens) {
      return tokens;
    }
    /** Can be overridden to change behavior of encode(). */
    _beforeEncode(text) {
      return text;
    }
    /** Can be overridden to change behavior of encode(). */
    _afterEncode(tokens) {
      return tokens;
    }
  };
  var ClipEncoding = class ClipEncoding2 extends BpeEncoding {
    static pattern = /(?:'s|'t|'re|'ve|'m|'ll|'d|[a-z]+|[0-9]|[^\s\w]+) ?/g;
    constructor(encoder) {
      const specialTokens = {
        "<|startoftext|>": encoder.size,
        "<|endoftext|>": encoder.size + 1
      };
      super(encoder, specialTokens, ClipEncoding2.pattern);
    }
    _beforeEncode(text) {
      text = text.toLowerCase().replace(/\s+/g, " ").trim();
      return [...text.matchAll(ClipEncoding2.pattern).map((m) => m[0] + " ")].join("");
    }
    _afterEncode(tokens) {
      const bosToken = this.specialTokensEncoder.get("<|startoftext|>");
      const eosToken = this.specialTokensEncoder.get("<|endoftext|>");
      const padToken = 0;
      const result = [
        bosToken,
        ...tokens,
        eosToken
      ];
      while (result.length < 77) result.push(padToken);
      return result.slice(0, 77);
    }
    _beforeDecode(tokens) {
      return tokens.filter((t) => t !== 0);
    }
  };
  function _escapeRegex(s) {
    if ("escape" in RegExp) return RegExp.escape(s);
    return s.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  function _bytesToHex(arr) {
    if ("toHex" in Uint8Array.prototype) return arr.toHex();
    return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  function _bytesFromHex(hex) {
    if ("fromHex" in Uint8Array) return Uint8Array.fromHex(hex);
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substring(2 * i, 2 * i + 2), 16);
    return bytes;
  }
  async function* streamLines(stream) {
    const reader = stream.getReader();
    let buffer = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += value;
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) yield line;
      }
      if (buffer) yield buffer;
    } finally {
      reader.releaseLock();
    }
  }
  async function loadClipData() {
    const url = "https://cdn.jsdelivr.net/gh/mlfoundations/open_clip@v3.2.0/src/open_clip/bpe_simple_vocab_16e6.txt.gz";
    const gzippedData = await cachedFetch(url);
    const textStream = new Blob([gzippedData]).stream().pipeThrough(new DecompressionStream("gzip")).pipeThrough(new TextDecoderStream());
    const merges = [];
    const maxMerges = 48894;
    let lineNumber = 0;
    for await (const line of streamLines(textStream)) {
      if (lineNumber > 0 && merges.length < maxMerges) {
        const trimmed = line.trim();
        if (trimmed) {
          const parts = trimmed.split(/\s+/);
          if (parts.length === 2) merges.push(`${parts[0]} ${parts[1]}`);
        }
      }
      lineNumber++;
      if (merges.length >= maxMerges) break;
    }
    const rankToIntbyte = [];
    for (let i = 33; i <= 126; i++) rankToIntbyte.push(i);
    for (let i = 161; i <= 172; i++) rankToIntbyte.push(i);
    for (let i = 174; i <= 255; i++) rankToIntbyte.push(i);
    const dataGymByteToByte = new Map(rankToIntbyte.map((b) => [String.fromCharCode(b), b]));
    let n = 0;
    let escapedSpace = " ";
    for (let b = 0; b < 256; b++) if (!rankToIntbyte.includes(b)) {
      rankToIntbyte.push(b);
      dataGymByteToByte.set(String.fromCharCode(256 + n), b);
      if (b === 32) escapedSpace = String.fromCharCode(256 + n);
      n++;
    }
    const decodeDataGym = (value) => {
      value = value.replace(/<\/w>/g, escapedSpace);
      return _bytesToHex(new Uint8Array(value.split("").map((c) => dataGymByteToByte.get(c))));
    };
    const encoder = /* @__PURE__ */ new Map();
    for (const [i, b] of rankToIntbyte.entries()) encoder.set(_bytesToHex(new Uint8Array([b])), i);
    for (const [i, b] of rankToIntbyte.entries()) encoder.set(_bytesToHex(new Uint8Array([b, 32])), i + 256);
    for (const line of merges) {
      const [first, second] = line.split(" ");
      encoder.set(decodeDataGym(first) + decodeDataGym(second), encoder.size);
    }
    return encoder;
  }
  async function loadTiktokenBpe(url) {
    const data = await cachedFetch(url);
    const encoder = /* @__PURE__ */ new Map();
    for (const line of new TextDecoder().decode(data).split("\n")) {
      if (!line) continue;
      const [token, rank] = line.split(/\s+/);
      encoder.set(_bytesToHex(Uint8Array.from(atob(token), (c) => c.charCodeAt(0))), parseInt(rank));
    }
    return encoder;
  }
  var SPIECE_UNDERLINE = "\u2581";
  function createTrieNode() {
    return { children: /* @__PURE__ */ new Map() };
  }
  var Unigram = class Unigram2 {
    #trie;
    #decoder;
    #byteFallback;
    #unkId;
    #bosId;
    #eosId;
    /** Normalizer settings */
    #addDummyPrefix;
    #removeExtraWhitespaces;
    constructor(model) {
      this.#trie = createTrieNode();
      this.#decoder = /* @__PURE__ */ new Map();
      this.#byteFallback = /* @__PURE__ */ new Map();
      this.#unkId = model.trainerSpec?.unkId ?? 0;
      this.#bosId = model.trainerSpec?.bosId ?? 1;
      this.#eosId = model.trainerSpec?.eosId ?? 2;
      this.#addDummyPrefix = model.normalizerSpec?.addDummyPrefix ?? true;
      this.#removeExtraWhitespaces = model.normalizerSpec?.removeExtraWhitespaces ?? true;
      for (let i = 0; i < model.pieces.length; i++) {
        const piece = model.pieces[i];
        const pieceStr = piece.piece;
        const score = piece.score;
        const type = piece.type;
        this.#decoder.set(i, pieceStr);
        if (type === ModelProto_SentencePiece_Type.BYTE) {
          const match = pieceStr.match(/^<0x([0-9A-Fa-f]{2})>$/);
          if (match) this.#byteFallback.set(match[1].toLowerCase(), i);
        } else if (type === ModelProto_SentencePiece_Type.NORMAL || type === ModelProto_SentencePiece_Type.USER_DEFINED) this.#insertIntoTrie(pieceStr, i, score);
      }
    }
    static fromBinary(data) {
      const model = fromBinary(ModelProtoSchema, data);
      return new Unigram2(model);
    }
    /** Insert a piece into the trie. */
    #insertIntoTrie(piece, id, score) {
      let node = this.#trie;
      for (const char of piece) {
        let child = node.children.get(char);
        if (!child) {
          child = createTrieNode();
          node.children.set(char, child);
        }
        node = child;
      }
      node.token = {
        id,
        score
      };
    }
    /**
    * Find all pieces in the vocabulary that start at position `start` in `text`.
    * Returns array of [endPosition, tokenId, score] tuples.
    */
    #findPiecesAt(text, start) {
      const results = [];
      let node = this.#trie;
      for (let i = start; i < text.length; i++) {
        const char = text[i];
        const child = node.children.get(char);
        if (!child) break;
        node = child;
        if (node.token) results.push([
          i + 1,
          node.token.id,
          node.token.score
        ]);
      }
      return results;
    }
    /** Normalize input text according to SentencePiece rules. */
    #normalize(text) {
      if (this.#removeExtraWhitespaces) text = text.replace(/\s+/g, " ").trim();
      if (text.length === 0) return "";
      if (this.#addDummyPrefix) text = " " + text;
      text = text.replace(/ /g, SPIECE_UNDERLINE);
      return text;
    }
    /**
    * Encode text into token IDs using Viterbi algorithm.
    *
    * Finds the most likely segmentation by computing the best path through
    * all possible segmentations, where scores are log probabilities.
    */
    encode(text) {
      text = this.#normalize(text);
      if (text.length === 0) return [];
      const n = text.length;
      const best = new Array(n + 1).fill(-Infinity);
      const prev = new Array(n + 1).fill(null);
      best[0] = 0;
      for (let i = 0; i < n; i++) {
        if (best[i] === -Infinity) continue;
        const matches = this.#findPiecesAt(text, i);
        for (const [end, id, score] of matches) {
          const newScore = best[i] + score;
          if (newScore > best[end]) {
            best[end] = newScore;
            prev[end] = [i, [id]];
          }
        }
        if (prev[i + 1] === null) {
          const char = text[i];
          const bytes = new TextEncoder().encode(char);
          const byteTokens = [];
          for (const byte of bytes) {
            const hex = byte.toString(16).padStart(2, "0");
            const byteId = this.#byteFallback.get(hex);
            if (byteId !== void 0) byteTokens.push(byteId);
            else byteTokens.push(this.#unkId);
          }
          if (byteTokens.length > 0) {
            best[i + 1] = best[i];
            prev[i + 1] = [i, byteTokens];
          }
        }
      }
      const tokens = [];
      let pos = n;
      while (pos > 0) if (prev[pos] === null) {
        const char = text[pos - 1];
        const bytes = new TextEncoder().encode(char);
        for (let j = bytes.length - 1; j >= 0; j--) {
          const hex = bytes[j].toString(16).padStart(2, "0");
          const byteId = this.#byteFallback.get(hex);
          tokens.push(byteId ?? this.#unkId);
        }
        pos--;
      } else {
        const [start, tokenIds] = prev[pos];
        for (let j = tokenIds.length - 1; j >= 0; j--) tokens.push(tokenIds[j]);
        pos = start;
      }
      tokens.reverse();
      return tokens;
    }
    /** Decode token IDs back to text. */
    decode(tokens) {
      const pieces = [];
      let i = 0;
      while (i < tokens.length) {
        const tokenId = tokens[i];
        const piece = this.#decoder.get(tokenId);
        if (piece === void 0) {
          pieces.push("\uFFFD");
          i++;
          continue;
        }
        const byteMatch = piece.match(/^<0x([0-9A-Fa-f]{2})>$/);
        if (byteMatch) {
          const bytes = [parseInt(byteMatch[1], 16)];
          i++;
          while (i < tokens.length) {
            const nextPiece = this.#decoder.get(tokens[i]);
            const nextByteMatch = nextPiece?.match(/^<0x([0-9A-Fa-f]{2})>$/);
            if (nextByteMatch) {
              bytes.push(parseInt(nextByteMatch[1], 16));
              i++;
            } else break;
          }
          pieces.push(new TextDecoder().decode(new Uint8Array(bytes)));
        } else {
          pieces.push(piece);
          i++;
        }
      }
      let result = pieces.join("").replace(new RegExp(SPIECE_UNDERLINE, "g"), " ");
      if (this.#addDummyPrefix && result.startsWith(" ")) result = result.slice(1);
      return result;
    }
    /** Get the beginning-of-sequence token ID. */
    get bosToken() {
      return this.#bosId;
    }
    /** Get the end-of-sequence token ID. */
    get eosToken() {
      return this.#eosId;
    }
    /** Get the unknown token ID. */
    get unkToken() {
      return this.#unkId;
    }
    /** Get vocabulary size. */
    get vocabSize() {
      return this.#decoder.size;
    }
  };
  async function loadSentencePiece(url) {
    const data = await cachedFetch(url);
    return Unigram.fromBinary(data);
  }

  // src/lib/ortWasmConfig.ts
  var DEFAULT_ORT_WASM_PATH_PREFIX = "/models/";
  var DEFAULT_ORT_WASM_BINARY = "ort-wasm-simd-threaded.wasm";
  var normalizeOrtWasmPathPrefix = (prefix = DEFAULT_ORT_WASM_PATH_PREFIX) => prefix.endsWith("/") ? prefix : `${prefix}/`;
  var createOrtWasmPaths = (prefix = DEFAULT_ORT_WASM_PATH_PREFIX) => ({
    wasm: `${normalizeOrtWasmPathPrefix(prefix)}${DEFAULT_ORT_WASM_BINARY}`
  });
  var configureOrtWasmEnv = (env, options = {}) => {
    const wasm = env.wasm;
    if (options.forceWasmPaths || !wasm.wasmPaths) {
      wasm.wasmPaths = createOrtWasmPaths(options.wasmPathPrefix);
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

  // src/services/pocketTtsRuntimeMode.ts
  var getRuntimeEnvironment = () => ({
    crossOriginIsolated: globalThis.crossOriginIsolated,
    hardwareConcurrency: typeof navigator === "undefined" ? void 0 : navigator.hardwareConcurrency,
    hasDocument: typeof document !== "undefined",
    preference: getPocketTtsRuntimePreference(),
    userAgent: typeof navigator === "undefined" ? void 0 : navigator.userAgent
  });
  var normalizePreference = (value) => {
    if (value === "main-thread" || value === "worker" || value === "auto") return value;
    return null;
  };
  var getPocketTtsRuntimePreference = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = normalizePreference(params.get("curioPocketTtsRuntime") || params.get("pocketTtsRuntime"));
      if (fromUrl) return fromUrl;
    }
    try {
      const fromStorage = normalizePreference(localStorage.getItem("curio:pocket-tts-runtime"));
      if (fromStorage && fromStorage !== "main-thread") return fromStorage;
    } catch {
    }
    return "auto";
  };
  var getPocketTtsThreadCount = (environment = getRuntimeEnvironment()) => {
    if (!environment.crossOriginIsolated) return 1;
    return Math.max(1, Math.min(Math.floor(environment.hardwareConcurrency || 1), 4));
  };

  // src/lib/pocketTts/mimiEncoder.ts
  var isWorkerScope = typeof document === "undefined";
  var maxMainThreadThreads = getPocketTtsThreadCount();
  configureOrtWasmEnv(Y, {
    // The Pocket inference worker is already a worker. ORT's threaded WASM path
    // tries to derive and spawn another worker script from the bundled IIFE,
    // which fails in Chrome with "cannot determine the script source URL".
    numThreads: isWorkerScope ? 1 : maxMainThreadThreads,
    proxy: false,
    forceWasmPaths: true
  });
  if (typeof globalThis.crossOriginIsolated !== "undefined" && !globalThis.crossOriginIsolated) {
    console.warn("Pocket TTS: crossOriginIsolated=false, forcing numThreads=1 (set COOP/COEP headers to enable multi-threading)");
    Y.wasm.numThreads = 1;
  }

  // src/services/audioContext.ts
  var AudioContextClass = typeof window !== "undefined" ? window.AudioContext || window.webkitAudioContext : void 0;
  var isSafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/Chromium/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);

  // src/lib/pocketTts/audioPostProcess.ts
  var POCKET_SAMPLE_RATE = 24e3;
  var POCKET_SAMPLES_PER_FRAME = 1920;
  var POCKET_DECODER_WARMUP_FRAMES = 128;
  var POCKET_DECODER_SETTLE_FRAMES = 48;

  // src/lib/pocketTts/onnxState.ts
  var tensorElementCount = (shape) => {
    const dims = shape.map((dim) => typeof dim === "number" ? dim : 0);
    return dims.reduce((total, dim) => total * dim, 1);
  };
  var makeInitialStateData = (type, shape, mode = "default") => {
    const total = tensorElementCount(shape);
    switch (type) {
      case "int64":
      case "tensor(int64)":
        return new BigInt64Array(total);
      case "bool":
      case "tensor(bool)": {
        const data = new Uint8Array(total);
        data.fill(1);
        return data;
      }
      default: {
        const data = new Float32Array(total);
        if (mode === "flow" && total > 0) {
          data.fill(NaN);
        }
        return data;
      }
    }
  };

  // src/lib/pocketTts/onnxEngine.ts
  var ONNX_BASE_URL = "https://huggingface.co/KevinAHM/pocket-tts-onnx/resolve/main/onnx";
  var ONNX_BUNDLE_REMOTE_URL = "https://huggingface.co/spaces/KevinAHM/pocket-tts-web/resolve/main/onnx/english_2026-04";
  var LOCAL_BASE_URL = "/models/pocket-tts-onnx";
  var LOCAL_BUNDLE_URL = `${LOCAL_BASE_URL}/english_2026-04`;
  var SAMPLE_RATE = POCKET_SAMPLE_RATE;
  var SAMPLES_PER_FRAME = POCKET_SAMPLES_PER_FRAME;
  var FRAME_LATENT_DIM = 32;
  var TEXT_EMBED_DIM = 1024;
  var FRAME_DURATION_SEC = SAMPLES_PER_FRAME / SAMPLE_RATE;
  var bundlePromise = null;
  var isIOS = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    const iPadish = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return /iPad|iPhone|iPod/.test(ua) || iPadish;
  };
  var isSafari = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|CriOS|FxiOS/.test(ua);
  };
  var wrapSafariMemoryError = (err, phase) => {
    const message = err instanceof Error ? err.message : String(err);
    return new Error(
      `Pocket TTS couldn't ${phase} in Safari. Safari caps WebAssembly memory aggressively, which may not be enough for the Pocket TTS models plus runtime buffers. Close other browser tabs and try again, or switch to the 'Browser', 'Tiny', or 'Remote' TTS engine in Settings. (Underlying error: ${message})`
    );
  };
  var makeSessionOptions = () => {
    const isWorkerScope2 = typeof document === "undefined";
    const threadCount = isWorkerScope2 ? 1 : getPocketTtsThreadCount();
    return {
      // WASM-only: WebGPU EP currently fails on these INT8 models with a WGSL
      // compile error ("no matching constructor for i32(vec4<u32>)"). Revisit
      // when ORT-web's WebGPU backend supports quantized conv/matmul properly.
      executionProviders: ["wasm"],
      intraOpNumThreads: threadCount,
      interOpNumThreads: 1,
      graphOptimizationLevel: "all"
    };
  };
  var legacyModelName = (name) => {
    if (name === "text_conditioner_int8") {
      return "text_conditioner";
    }
    return name;
  };
  var fetchModel = async (name) => {
    const filename = `${name}.onnx`;
    const legacyFilename = `${legacyModelName(name)}.onnx`;
    const local = `${LOCAL_BUNDLE_URL}/${filename}`;
    const remote = `${ONNX_BUNDLE_REMOTE_URL}/${filename}`;
    const legacyLocal = `${LOCAL_BASE_URL}/${legacyFilename}`;
    const legacyRemote = `${ONNX_BASE_URL}/${legacyFilename}`;
    for (const url of [local, remote, legacyLocal, legacyRemote]) {
      try {
        const head = await fetch(url, { method: "HEAD" });
        const contentType = head.headers.get("content-type") || "";
        if (head.ok && !contentType.includes("text/html")) {
          const res = await fetch(url);
          if (res.ok) return await res.arrayBuffer();
        }
      } catch {
      }
    }
    throw new Error(`Failed to download Pocket TTS model ${name}.`);
  };
  var loadSession = async (name) => {
    const data = await fetchModel(name);
    return await ns.create(new Uint8Array(data), makeSessionOptions());
  };
  var loadModels = async () => {
    if (bundlePromise) return bundlePromise;
    bundlePromise = (async () => {
      try {
        if (isIOS() || isSafari()) {
          const text_conditioner2 = await loadSession("text_conditioner_int8");
          const flow_lm_main2 = await loadSession("flow_lm_main_int8");
          const flow_lm_flow2 = await loadSession("flow_lm_flow_int8");
          const mimi_decoder2 = await loadSession("mimi_decoder_int8");
          return { text_conditioner: text_conditioner2, flow_lm_main: flow_lm_main2, flow_lm_flow: flow_lm_flow2, mimi_decoder: mimi_decoder2 };
        }
        const [text_conditioner, flow_lm_main, flow_lm_flow, mimi_decoder] = await Promise.all([
          loadSession("text_conditioner_int8"),
          loadSession("flow_lm_main_int8"),
          loadSession("flow_lm_flow_int8"),
          loadSession("mimi_decoder_int8")
        ]);
        return { text_conditioner, flow_lm_main, flow_lm_flow, mimi_decoder };
      } catch (err) {
        bundlePromise = null;
        if (isIOS() || isSafari()) throw wrapSafariMemoryError(err, "load");
        throw err;
      }
    })();
    return bundlePromise;
  };
  var releaseModels = () => {
    bundlePromise = null;
  };
  var initialStateTensor = (type, shape, mode = "default") => {
    const dims = shape.map((d) => typeof d === "number" ? d : 0);
    const data = makeInitialStateData(type, shape, mode);
    switch (type) {
      case "int64":
      case "tensor(int64)":
        return new de("int64", data, dims);
      case "bool":
      case "tensor(bool)":
        return new de("bool", data, dims);
      default:
        return new de("float32", data, dims);
    }
  };
  var initState = (session, mode = "default") => {
    const state = {};
    const metadata = session.inputMetadata;
    for (let i = 0; i < session.inputNames.length; i++) {
      const name = session.inputNames[i];
      if (!name.startsWith("state_")) continue;
      const meta = metadata[i];
      if (meta && meta.isTensor) {
        state[name] = initialStateTensor(meta.type, meta.shape, mode);
      } else {
        state[name] = initialStateTensor("float32", [], mode);
      }
    }
    return state;
  };
  var stateFromSerialized = (state) => {
    const result = {};
    for (const [name, tensor] of Object.entries(state)) {
      result[name] = new de(tensor.dtype, tensor.data, tensor.shape);
    }
    return result;
  };
  var copyStateFromOutputs = (state, result, session) => {
    const next = { ...state };
    for (const outName of session.outputNames) {
      if (!outName.startsWith("out_state_")) continue;
      const idx = outName.replace("out_state_", "");
      const value = result[outName];
      if (value) next[`state_${idx}`] = value;
    }
    return next;
  };
  var primeMimiDecoderState = async (bundle2, state, firstLatent) => {
    const warmupFrames = POCKET_DECODER_WARMUP_FRAMES;
    const settleFrames = POCKET_DECODER_SETTLE_FRAMES;
    const totalFrames = warmupFrames + settleFrames;
    if (totalFrames <= 0) return state;
    const latents = new Float32Array(totalFrames * FRAME_LATENT_DIM);
    for (let frame = 0; frame < settleFrames; frame += 1) {
      latents.set(firstLatent, (warmupFrames + frame) * FRAME_LATENT_DIM);
    }
    const primeOut = await bundle2.mimi_decoder.run({
      latent: new de(
        "float32",
        latents,
        [1, totalFrames, FRAME_LATENT_DIM]
      ),
      ...state
    });
    return copyStateFromOutputs(state, primeOut, bundle2.mimi_decoder);
  };
  var gaussianNoise = (size, std) => {
    const out = new Float32Array(size);
    if (std <= 0) return out;
    for (let i = 0; i < size; i += 2) {
      const u1 = Math.random() || 1e-9;
      const u2 = Math.random();
      const r = Math.sqrt(-2 * Math.log(u1));
      const theta = 2 * Math.PI * u2;
      out[i] = r * Math.cos(theta) * std;
      if (i + 1 < size) out[i + 1] = r * Math.sin(theta) * std;
    }
    return out;
  };
  var yieldToEventLoop = () => {
    const scheduler = globalThis.scheduler;
    if (scheduler?.yield) return scheduler.yield();
    return new Promise((resolve) => setTimeout(resolve, 0));
  };
  var runInference = async (bundle2, tokenIds, opts, onAudioChunk, shouldAbort) => {
    const {
      voiceState,
      voiceEmbedding,
      voiceEmbeddingFrames,
      temperature = 0.7,
      lsdSteps = 1,
      framesAfterEos = 3,
      maxFrames = 500,
      firstChunkFrames = 3,
      chunkFrames = 12,
      yieldEverySteps = 4
    } = opts;
    const tokensBig = new BigInt64Array(tokenIds.length);
    for (let i = 0; i < tokenIds.length; i++) tokensBig[i] = BigInt(tokenIds[i]);
    const tokenTensor = new de("int64", tokensBig, [1, tokenIds.length]);
    const textCondOut = await bundle2.text_conditioner.run({ token_ids: tokenTensor });
    let textEmbTensor = Object.values(textCondOut)[0];
    if (textEmbTensor.dims.length === 2) {
      textEmbTensor = new de(
        "float32",
        textEmbTensor.data,
        [1, textEmbTensor.dims[0], textEmbTensor.dims[1]]
      );
    }
    const emptySeq = new de("float32", new Float32Array(0), [1, 0, FRAME_LATENT_DIM]);
    const emptyText = new de("float32", new Float32Array(0), [1, 0, TEXT_EMBED_DIM]);
    let mainState = voiceState ? stateFromSerialized(voiceState) : initState(bundle2.flow_lm_main, "flow");
    if (!voiceState) {
      if (!voiceEmbedding || !voiceEmbeddingFrames) {
        throw new Error("Pocket TTS needs either a voice state or a voice embedding.");
      }
      const voiceTensor = new de(
        "float32",
        voiceEmbedding,
        [1, voiceEmbeddingFrames, TEXT_EMBED_DIM]
      );
      const voiceWarmup = await bundle2.flow_lm_main.run({
        sequence: emptySeq,
        text_embeddings: voiceTensor,
        ...mainState
      });
      mainState = copyStateFromOutputs(mainState, voiceWarmup, bundle2.flow_lm_main);
    }
    const textWarmup = await bundle2.flow_lm_main.run({
      sequence: emptySeq,
      text_embeddings: textEmbTensor,
      ...mainState
    });
    mainState = copyStateFromOutputs(mainState, textWarmup, bundle2.flow_lm_main);
    let curr = new de(
      "float32",
      new Float32Array(FRAME_LATENT_DIM).fill(NaN),
      [1, 1, FRAME_LATENT_DIM]
    );
    const generated = [];
    let decodedFrames = 0;
    let mimiState = initState(bundle2.mimi_decoder, "mimi");
    let isFirstAudioChunk = true;
    let eosStep = null;
    const dt2 = 1 / lsdSteps;
    const std = temperature > 0 ? Math.sqrt(temperature) : 0;
    const sScalarData = new Float32Array(1);
    const tScalarData = new Float32Array(1);
    const xFlowData = new Float32Array(FRAME_LATENT_DIM);
    const sScalarTensor = new de("float32", sScalarData, [1, 1]);
    const tScalarTensor = new de("float32", tScalarData, [1, 1]);
    const xFlowTensor = new de("float32", xFlowData, [1, FRAME_LATENT_DIM]);
    for (let step = 0; step < maxFrames; step++) {
      if (shouldAbort?.()) return;
      if (step > 0 && yieldEverySteps > 0 && step % yieldEverySteps === 0) await yieldToEventLoop();
      const mainOut = await bundle2.flow_lm_main.run({
        sequence: curr,
        text_embeddings: emptyText,
        ...mainState
      });
      const conditioning = mainOut[bundle2.flow_lm_main.outputNames[0]];
      const eosLogit = mainOut[bundle2.flow_lm_main.outputNames[1]];
      mainState = copyStateFromOutputs(mainState, mainOut, bundle2.flow_lm_main);
      if (eosStep === null && eosLogit.data[0] > -4) {
        eosStep = step;
      }
      const shouldStop = eosStep !== null && step >= eosStep + framesAfterEos;
      let x = gaussianNoise(FRAME_LATENT_DIM, std);
      for (let j = 0; j < lsdSteps; j++) {
        const s = j / lsdSteps;
        const t = s + dt2;
        sScalarData[0] = s;
        tScalarData[0] = t;
        xFlowData.set(x);
        const flowOut = await bundle2.flow_lm_flow.run({
          c: conditioning,
          s: sScalarTensor,
          t: tScalarTensor,
          x: xFlowTensor
        });
        const delta = Object.values(flowOut)[0];
        const deltaData = delta.data;
        const nextX = new Float32Array(FRAME_LATENT_DIM);
        for (let k = 0; k < FRAME_LATENT_DIM; k++) nextX[k] = x[k] + deltaData[k] * dt2;
        x = nextX;
      }
      generated.push(x);
      curr = new de("float32", x, [1, 1, FRAME_LATENT_DIM]);
      const pendingFrames = generated.length - decodedFrames;
      let framesToDecode = 0;
      if (shouldStop) {
        framesToDecode = pendingFrames;
      } else if (isFirstAudioChunk && pendingFrames >= firstChunkFrames) {
        framesToDecode = firstChunkFrames;
      } else if (pendingFrames >= chunkFrames) {
        framesToDecode = chunkFrames;
      }
      if (framesToDecode > 0) {
        if (isFirstAudioChunk) {
          mimiState = await primeMimiDecoderState(bundle2, mimiState, generated[0]);
        }
        const latents = new Float32Array(framesToDecode * FRAME_LATENT_DIM);
        for (let frame = 0; frame < framesToDecode; frame += 1) {
          latents.set(generated[decodedFrames + frame], frame * FRAME_LATENT_DIM);
        }
        const decOut = await bundle2.mimi_decoder.run({
          latent: new de(
            "float32",
            latents,
            [1, framesToDecode, FRAME_LATENT_DIM]
          ),
          ...mimiState
        });
        mimiState = copyStateFromOutputs(mimiState, decOut, bundle2.mimi_decoder);
        decodedFrames += framesToDecode;
        const audioTensor = decOut[bundle2.mimi_decoder.outputNames[0]];
        const audioData = new Float32Array(audioTensor.data);
        if (audioData.length > 0) {
          await onAudioChunk(audioData);
        }
        isFirstAudioChunk = false;
      }
      if (shouldStop) break;
    }
  };

  // src/lib/pocketTts/inference.worker.ts
  var bundle = null;
  var abortedIds = /* @__PURE__ */ new Set();
  var ensureBundle = async () => {
    if (!bundle) bundle = await loadModels();
    return bundle;
  };
  var post = (msg, transfer) => {
    if (transfer && transfer.length) {
      self.postMessage(msg, transfer);
    } else {
      self.postMessage(msg);
    }
  };
  self.addEventListener("message", async (event) => {
    const msg = event.data;
    if (msg.type === "abort") {
      abortedIds.add(msg.id);
      return;
    }
    if (msg.type === "release") {
      bundle = null;
      releaseModels();
      return;
    }
    if (msg.type === "warmup") {
      try {
        await ensureBundle();
        post({ type: "done", id: msg.id });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        post({ type: "error", id: msg.id, message });
      }
      return;
    }
    if (msg.type === "speak") {
      const { id, tokenIds, voiceEmbedding, voiceEmbeddingFrames, voiceState, temperature, lsdSteps, framesAfterEos } = msg;
      try {
        const active = await ensureBundle();
        await runInference(
          active,
          tokenIds,
          {
            voiceState,
            voiceEmbedding,
            voiceEmbeddingFrames,
            temperature,
            lsdSteps,
            framesAfterEos
          },
          async (samples) => {
            const copy = new Float32Array(samples.length);
            copy.set(samples);
            post({ type: "chunk", id, samples: copy }, [copy.buffer]);
          },
          () => abortedIds.has(id)
        );
        abortedIds.delete(id);
        post({ type: "done", id });
      } catch (err) {
        abortedIds.delete(id);
        const message = err instanceof Error ? err.message : String(err);
        post({ type: "error", id, message });
      }
    }
  });
})();
/*! Bundled license information:

onnxruntime-web/dist/ort.wasm.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.24.3
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)
*/
