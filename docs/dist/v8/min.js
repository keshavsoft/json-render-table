const meta = {
  version: "v3.0",
  description: "Pure DOM engine with JSON review and tags.json catalog verification"
}, registerGlobal$1 = (e) => {
  const t = e, n = typeof t == "function" ? t : t == null ? void 0 : t.inFuncDefinition, r = t == null ? void 0 : t.inReviewSpec;
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-tag"] = {
    meta,
    buildSpecElement: n,
    reviewSpec: r
  }, globalThis.ks.jsonToTag = {
    meta,
    buildSpecElement: n,
    reviewSpec: r
  });
}, isNullOrUndefined = ({ inSpec: e }) => {
  const t = e;
  return t == null;
}, isDomNode = ({ inSpec: e }) => typeof Node < "u" && e instanceof Node, isSpecArray = ({ inSpec: e }) => {
  const t = e;
  return Array.isArray(t);
}, buildSpecArray = ({ inSpec: e, inShowLog: t = !1 }) => {
  const n = e, r = t;
  return Array.isArray(n) ? n.map((l) => dispatchSpec({
    inSpec: l,
    inShowLog: r
  })).flat().filter(Boolean) : [];
}, createElement = ({ inTagName: e }) => {
  const t = e == null ? void 0 : e.toLowerCase();
  if (!t) return null;
  if (t === "checkbox") {
    const n = document.createElement("input");
    return n.type = "checkbox", n;
  }
  return document.createElement(t);
}, applyTextContent = ({ inElement: e, inTextContent: t, inAllowsTextContent: n = !0, inTagName: r, inShowLog: l = !1 }) => {
  const o = e, s = t, c = n, u = r, h = l;
  return !o || s === void 0 || s === null ? o : c ? (o.textContent = s, o) : (h && console.warn(`[json-to-tag v3] textContent is not allowed on <${u}>; discarded "${s}"`), o);
}, applyProperties = ({ inElement: e, inProperties: t }) => {
  const n = e, r = t;
  return n && r && typeof r == "object" && Object.assign(n, r), n;
}, applyAttributes = ({ inElement: e, inAttributes: t }) => {
  const n = e, r = t;
  return !n || !r || typeof r != "object" || Object.entries(r).forEach(([l, o]) => {
    l === "class" ? n.className = o : typeof o == "boolean" ? o ? n.setAttribute(l, "") : n.removeAttribute(l) : o != null && n.setAttribute(l, String(o));
  }), n;
}, applyClassList = ({ inElement: e, inClassList: t }) => {
  const n = e, r = t;
  if (!n || !r) return n;
  let l = [];
  return typeof r == "string" ? l = r.split(/\s+/).filter(Boolean) : Array.isArray(r) && (l = r.filter((o) => typeof o == "string" && o.trim().length > 0)), l.length > 0 && n.classList.add(...l), n;
}, appendChildren = ({ inElement: e, inChildren: t, inAllowsChildren: n = !0, inTagName: r, inShowLog: l = !1 }) => {
  const o = e, s = t, c = n, u = r, h = l;
  return !o || !Array.isArray(s) || s.length === 0 ? o : c ? (s.forEach((d) => {
    typeof Node < "u" && d instanceof Node ? o.appendChild(d) : (typeof d == "string" || typeof d == "number") && o.appendChild(document.createTextNode(String(d)));
  }), o) : (h && console.warn(`[json-to-tag v3] Children are not allowed on void tag <${u}>; discarded ${s.length} child nodes.`), o);
}, domElementBuilder = ({ inSpec: e, inClassList: t }) => {
  const n = e, r = t || (n == null ? void 0 : n.classList);
  if (!n || !n.tagName) return null;
  const l = createElement({ inTagName: n.tagName });
  return l ? (applyTextContent({
    inElement: l,
    inTextContent: n.textContent,
    inTagName: n.tagName
  }), applyProperties({
    inElement: l,
    inProperties: n.properties
  }), applyAttributes({
    inElement: l,
    inAttributes: n.attributes
  }), applyClassList({
    inElement: l,
    inClassList: r
  }), appendChildren({
    inElement: l,
    inChildren: n.children,
    inTagName: n.tagName
  }), l) : null;
}, buildChildrenNodes = ({ inChildren: e, inShowLog: t = !1 }) => {
  const n = e, r = t;
  return Array.isArray(n) ? n.map((o) => dispatchSpec({
    inSpec: o,
    inShowLog: r
  })).flat().filter(Boolean) : [];
}, buildSingleElement = ({ inSpec: e, inShowLog: t = !1 }) => {
  const n = e, r = t, l = domElementBuilder({ inSpec: n });
  let o = [];
  return "children" in n && (o = Array.isArray(n.children) && n.children.length > 0 ? buildChildrenNodes({
    inChildren: n.children,
    inShowLog: r
  }) : [], l.append(...o)), l;
}, dispatchSpec = ({ inSpec: e, inShowLog: t = !1 } = {}) => {
  const n = e, r = t;
  return isNullOrUndefined({ inSpec: n }) ? null : isDomNode({ inSpec: n }) ? n : isSpecArray({ inSpec: n }) ? buildSpecArray({
    inSpec: n,
    inShowLog: r
  }) : buildSingleElement({
    inSpec: n,
    inShowLog: r
  });
}, $schema = "./tags.schema.json", div = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, input = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "placeholder",
    "value",
    "name",
    "disabled",
    "readonly",
    "required",
    "list"
  ]
}, checkbox = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "checked",
    "name",
    "value",
    "disabled",
    "required"
  ]
}, colgroup = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "span"
  ],
  childTags: [
    "col"
  ]
}, col = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "span",
    "style",
    "width"
  ]
}, label = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, form = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "action",
    "method",
    "autocomplete",
    "enctype",
    "name",
    "novalidate",
    "target"
  ],
  childTags: []
}, select = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "name",
    "disabled",
    "required",
    "multiple",
    "size"
  ],
  childTags: [
    "option"
  ]
}, p = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, h1 = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, h2 = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, span = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, img = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, button = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, table = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "border",
    "cellpadding",
    "cellspacing"
  ],
  childTags: [
    "caption",
    "colgroup",
    "thead",
    "tbody",
    "tfoot",
    "tr"
  ]
}, thead = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, tbody = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, tfoot = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, tr = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, th = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, td = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, datalist = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, option = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, header = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "role"
  ],
  childTags: []
}, a = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "href",
    "target",
    "rel",
    "title",
    "download"
  ],
  childTags: []
}, i = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "aria-hidden"
  ],
  childTags: []
}, small = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, ul = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "type"
  ],
  childTags: [
    "li"
  ]
}, li = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "value"
  ],
  childTags: []
}, hr = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: []
}, defaultTags = {
  $schema,
  div,
  input,
  checkbox,
  colgroup,
  col,
  label,
  form,
  select,
  p,
  h1,
  h2,
  span,
  img,
  button,
  table,
  thead,
  tbody,
  tfoot,
  tr,
  th,
  td,
  datalist,
  option,
  header,
  a,
  i,
  small,
  ul,
  li,
  hr
}, extractTags = ({ inSpec: e }) => {
  const t = e;
  if (!t) return [];
  if (Array.isArray(t))
    return t.flatMap((r) => extractTags({ inSpec: r }));
  if (typeof t != "object") return [];
  const n = [];
  return typeof t.tagName == "string" && t.tagName.trim().length > 0 && n.push(t.tagName.toLowerCase()), Array.isArray(t.children) && t.children.length > 0 && t.children.forEach((r) => {
    const l = extractTags({ inSpec: r });
    n.push(...l);
  }), n;
}, checkTags = ({ inTagsFound: e, inAllowedTags: t }) => {
  const n = e ?? [], r = t ?? {}, l = new Set(
    Object.keys(r).filter((d) => d !== "$schema").map((d) => d.toLowerCase())
  ), o = {}, s = [], c = [];
  n.forEach((d) => {
    o[d] = (o[d] || 0) + 1, l.has(d) ? s.includes(d) || s.push(d) : c.includes(d) || c.push(d);
  });
  const u = n.length, h = c.length === 0;
  return {
    totalTags: u,
    tagCounts: o,
    uniqueTags: Object.keys(o),
    recognizedTags: s,
    unrecognizedTags: c,
    areAllTagsPresent: h
  };
}, reviewSpec = ({ inSpec: e, inTags: t = defaultTags } = {}) => {
  const n = e, r = t, l = extractTags({ inSpec: n }), o = checkTags({
    inTagsFound: l,
    inAllowedTags: r
  });
  return {
    areAllTagsPresent: o.areAllTagsPresent,
    totalTags: o.totalTags,
    tagCounts: o.tagCounts,
    uniqueTags: o.uniqueTags,
    recognizedTags: o.recognizedTags,
    unrecognizedTags: o.unrecognizedTags
  };
}, buildSpecElement = (e = {}) => {
  try {
    const t = e, n = (t == null ? void 0 : t.spec) ?? (t == null ? void 0 : t.inSpec) ?? t;
    return dispatchSpec({
      inSpec: n
    });
  } catch (t) {
    throw console.error("error : ", t), t;
  }
};
registerGlobal$1({
  inFuncDefinition: buildSpecElement,
  inReviewSpec: reviewSpec
});
const registerGlobal = (e) => {
  typeof window < "u" && (window.renderTable = e);
}, IDENTIFIERS = {
  HARD_CODED: "$",
  PARENT: "^",
  TYPE_START: "(",
  TYPE_END: ")",
  ACTION_START: "{",
  ACTION_END: "}",
  ARRAY_INDEX: "#eq(",
  ARRAY_START: "#eq(",
  ARRAY_END: ")"
}, VALUES = {
  DEFAULT: void 0
}, resolvePath = (e, t) => {
  if (e === "")
    return t;
  const r = e.replace(/\[(\w+)\]/g, ". $1".replace(" ", "")).replace(/^\./, "").split(".");
  for (let l = 0; l < r.length; ) {
    if (Array.isArray(t)) {
      const c = r.slice(l).join(".");
      return t.map((u) => resolvePath(c, u));
    }
    if (typeof t != "object" || t === null)
      return VALUES.DEFAULT;
    let o, s = 0;
    for (let c = r.length; c > l; c -= 1) {
      const u = r.slice(l, c).join(".");
      if (Object.prototype.hasOwnProperty.call(t, u)) {
        o = u, s = c - l;
        break;
      }
    }
    if (o === void 0)
      return VALUES.DEFAULT;
    t = t[o], l += s;
  }
  return t;
}, isNonEmptyArray = (e) => e && Array.isArray(e) && e.length > 0, isNumber = (e) => !isNaN(e), operators = ["+", "-", "*", "/", "%"], convertToString = (e) => e ? String(e) : "", convertToNumber = (e) => e ? Number(e) : 0, convertToUpperCase = (e) => e ? e.toUpperCase() : "", convertToDate = (e) => {
  if (!e) return e;
  try {
    return new Date(e).getTime();
  } catch {
    return e;
  }
}, deleteKey = () => {
}, deleteIfNotPresent = (e) => typeof e > "u" ? void 0 : e, typeToFn = {
  STRING: convertToString,
  NUMBER: convertToNumber,
  DATE: convertToDate,
  UPPER: convertToUpperCase
}, extractSpecial = (e) => {
  const t = e.indexOf(IDENTIFIERS.TYPE_START) > -1 ? IDENTIFIERS.TYPE_START : e.indexOf(IDENTIFIERS.ACTION_START) > -1 ? IDENTIFIERS.ACTION_START : null;
  if (!t) return null;
  const n = t === IDENTIFIERS.TYPE_START ? IDENTIFIERS.TYPE_END : IDENTIFIERS.ACTION_END;
  return {
    kind: t,
    type: e.substring(e.indexOf(t) + 1, e.lastIndexOf(n)),
    path: e.substring(0, e.indexOf(t))
  };
}, evaluateExpression = (value, key, source, config) => {
  const resolvedKey = resolvePath(key, source);
  if (!config[resolvedKey]) return resolvedKey;
  const { operator, value: expressionValue } = config[resolvedKey];
  return !operators.includes(operator) || !isNumber(expressionValue) ? resolvedKey : eval(`${value}${operator}${expressionValue}`);
}, createActionMap = ({ convertValue: e }) => ({
  APPEND: (t, n, r, l) => {
    const o = l == null ? void 0 : l.appendMap;
    if (!o || typeof o[n] > "u") return t;
    const { path: s, separator: c } = o[n];
    return t + (c || "") + e(s, r);
  },
  DELETE: deleteKey,
  DELETE_IF_NOT_PRESENT: deleteIfNotPresent,
  DEPENDS: (t, n, r, l) => {
    if (typeof n > "u") return l.dependentMap[t];
    const o = extractSpecial(n);
    return o && actionMap[o.type] ? actionMap[o.type](t, o.path, r, l) : n;
  },
  EVAL: evaluateExpression
});
let actionMap = {};
const convertType = (e, t) => typeToFn[e] ? typeToFn[e](t) : t, performAction = (e, t, n, r, l, o) => {
  actionMap = createActionMap({ convertValue: o });
  const s = extractSpecial(e);
  return s && actionMap[s.type] ? actionMap[s.type](t, s.path, r, l) : actionMap[e] ? actionMap[e](t, void 0, r, l) : t;
}, resolveValue = (e, t, n, r) => {
  if (e.startsWith(IDENTIFIERS.HARD_CODED))
    return e.substring(1);
  if (e.startsWith(IDENTIFIERS.PARENT))
    return resolvePath(e.substring(1), n);
  const l = extractSpecial(e);
  if (!l)
    return resolvePath(e, t);
  const o = resolvePath(l.path, t);
  return typeof o > "u" ? VALUES.DEFAULT : l.kind === IDENTIFIERS.TYPE_START ? convertType(l.type, o) : performAction(
    l.type,
    o,
    l.path,
    t,
    r,
    (s, c) => resolveValue(s, c, n, r)
  );
}, startFunc$b = (e, t, n) => {
  const r = {};
  return Object.keys(e).forEach((l) => {
    const o = e[l];
    if (typeof o == "string") {
      r[l] = resolveValue(
        o,
        t,
        n.rootSource,
        n.configuration
      );
      return;
    }
    if (Array.isArray(o) && o.length > 0) {
      r[l] = startFunc$4(o[0], t, n);
      return;
    }
    o && typeof o == "object" && (r[l] = traverse(o, t, n));
  }), r;
}, startFunc$a = (e, t, n) => {
  const r = [];
  return e.forEach((l) => {
    if (typeof l == "string") {
      const o = resolveValue(
        l,
        t,
        n.rootSource,
        n.configuration
      );
      isNonEmptyArray(o) ? r.push(...o) : r.push(o);
      return;
    }
    if (Array.isArray(l)) {
      r.push(
        ...startFunc$a(
          l[0],
          t,
          n
        )
      );
      return;
    }
    l && typeof l == "object" && r.push(
      startFunc$b(
        l,
        t,
        n
      )
    );
  }), r;
}, startFunc$9 = (e, t, n) => [
  startFunc$b(
    t,
    e,
    n
  )
], startFunc$8 = (e, t, n) => e.map((r) => startFunc$b(
  t,
  r,
  n
));
function isPlainObject(e) {
  return e !== null && typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype;
}
const startFunc$7 = (e, t, n) => Array.isArray(e) ? startFunc$8(
  e,
  t,
  n
) : isPlainObject(e) ? startFunc$9(
  e,
  t,
  n
) : [], isArrayIndexMapping = (e) => {
  const t = e.list;
  return t.startsWith(IDENTIFIERS.ARRAY_INDEX) && t.includes(IDENTIFIERS.ARRAY_START) && t.includes(IDENTIFIERS.ARRAY_END);
}, getItemMapping$1 = (e) => Array.isArray(e.item) ? e.item[0] : e.item, resolveListSource = (e, t) => resolvePath(
  e.list,
  t
), startFunc$6 = (e, t, n) => {
  const r = getItemMapping$1(e);
  if (isArrayIndexMapping(e))
    return [
      startFunc$b(
        r,
        t,
        n
      )
    ];
  const l = resolveListSource(
    e,
    t
  );
  return startFunc$7(
    l,
    r,
    n
  );
}, getItemMapping = (e) => Array.isArray(e.item) ? e.item[0] : e.item, resolveObjectifySource = (e, t) => resolvePath(
  e.objectify,
  t
), startFunc$5 = (e, t, n) => {
  const r = resolveObjectifySource(
    e,
    t
  );
  return startFunc$9(
    r,
    getItemMapping(e),
    n
  );
}, startFunc$4 = (e, t, n) => typeof e.collect < "u" ? startFunc$a(
  e.item,
  t,
  n
) : typeof e.list < "u" ? startFunc$6(
  e,
  t,
  n
) : typeof e.objectify < "u" ? startFunc$5(
  e,
  t,
  n
) : [], startFunc$3 = (e, t) => {
  if (!e.includes(IDENTIFIERS.ARRAY_INDEX)) return {};
  const n = e.lastIndexOf(IDENTIFIERS.ARRAY_INDEX) + 4, r = e.lastIndexOf(IDENTIFIERS.ARRAY_END), l = e.substring(n, r), o = e.substring(0, e.lastIndexOf(IDENTIFIERS.ARRAY_INDEX)), s = o ? resolvePath(o, t) : t;
  return s == null ? void 0 : s[l];
}, traverse = (e, t, n) => {
  if (typeof e.list < "u" || typeof e.objectify < "u" || typeof e.collect < "u")
    return startFunc$4(e, t, n);
  if (typeof e.flat < "u") {
    const r = startFunc$3(e.flat, t);
    return startFunc$b(e.item, r, n);
  }
  return typeof e.item < "u" ? startFunc$b(e.item, t, n) : startFunc$b(e, t, n);
}, transform = (e, t) => {
  let n = e, r = t;
  e !== null && typeof e == "object" && "inData" in e && t === void 0 && (n = e.inData, r = e.inTransformation);
  const { mapping: l, config: o = {} } = r;
  return traverse(l, n, {
    rootSource: n,
    configuration: o
  });
}, transformHelper = { transform }, deriveColumnsFromData = ({ inData: e = [] } = {}) => {
  const t = e;
  if (!Array.isArray(t) || t.length === 0)
    return [];
  const n = t[0];
  return !n || typeof n != "object" ? [] : Object.keys(n).map((r) => ({
    key: r,
    title: r
  }));
}, resolveColumns = ({ inColumns: e, inData: t } = {}) => {
  const n = e, r = t;
  return Array.isArray(n) && n.length > 0 ? n.map(
    (l) => typeof l == "string" ? l : l.key ?? l.title ?? l.label
  ) : deriveColumnsFromData({ inData: r }).map((l) => l.key);
}, FLAVOR_MAP$1 = {
  simple: "simple",
  headeronly: "headerOnly",
  "header-only": "headerOnly",
  header: "headerOnly",
  withbodyandfooter: "withBodyAndFooter",
  "with-body-and-footer": "withBodyAndFooter",
  bodyandfooter: "withBodyAndFooter",
  footer: "withBodyAndFooter"
}, startFunc$2 = ({
  flavor: e,
  tableType: t,
  data: n,
  columns: r,
  footerData: l
} = {}) => {
  const s = FLAVOR_MAP$1[String((e !== "simple" ? e : t ?? e) ?? "simple").toLowerCase()] ?? "simple", c = Array.isArray(n) ? n : [], u = r, h = l, d = resolveColumns({ inColumns: u, inData: c }), b = d.map((f) => ({ title: f })), y = c.map((f) => ({
    cells: d.map((m) => ({ value: String((f == null ? void 0 : f[m]) ?? "") }))
  }));
  let T = [];
  return s === "withBodyAndFooter" && (Array.isArray(h) && h.length > 0 ? T = h.map((f) => Array.isArray(f) ? { cells: f.map((m) => ({ value: String(m ?? "") })) } : {
    cells: d.map((m) => ({ value: String((f == null ? void 0 : f[m]) ?? "") }))
  }) : T = [
    {
      cells: d.map((f, m) => ({
        value: m === 0 ? `Total: ${c.length} records` : ""
      }))
    }
  ]), {
    columns: b,
    rows: y,
    footerRows: T
  };
}, simple = {
  mapping: {
    tagName: "$table",
    attributes: {
      class: "$table table-hover table-striped align-middle border mb-0"
    },
    children: [
      {
        collect: !0,
        item: [
          {
            tagName: "$thead",
            attributes: {
              class: "$table-dark"
            },
            children: [
              {
                objectify: "",
                item: {
                  tagName: "$tr",
                  children: [
                    {
                      list: "columns",
                      item: {
                        tagName: "$th",
                        textContent: "title",
                        attributes: {
                          class: "$text-start"
                        }
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            tagName: "$tbody",
            children: [
              {
                list: "rows",
                item: {
                  tagName: "$tr",
                  children: [
                    {
                      list: "cells",
                      item: {
                        tagName: "$td",
                        textContent: "value"
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
}, headerOnly = {
  mapping: {
    tagName: "$table",
    attributes: {
      class: "$table table-hover align-middle border mb-0"
    },
    children: [
      {
        collect: !0,
        item: [
          {
            tagName: "$thead",
            attributes: {
              class: "$table-dark"
            },
            children: [
              {
                objectify: "",
                item: {
                  tagName: "$tr",
                  children: [
                    {
                      list: "columns",
                      item: {
                        tagName: "$th",
                        textContent: "title",
                        attributes: {
                          class: "$text-start"
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
}, withBodyAndFooter = {
  mapping: {
    tagName: "$table",
    attributes: {
      class: "$table table-hover table-striped align-middle border mb-0"
    },
    children: [
      {
        collect: !0,
        item: [
          {
            tagName: "$thead",
            attributes: {
              class: "$table-dark"
            },
            children: [
              {
                objectify: "",
                item: {
                  tagName: "$tr",
                  children: [
                    {
                      list: "columns",
                      item: {
                        tagName: "$th",
                        textContent: "title",
                        attributes: {
                          class: "$text-start"
                        }
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            tagName: "$tbody",
            children: [
              {
                list: "rows",
                item: {
                  tagName: "$tr",
                  children: [
                    {
                      list: "cells",
                      item: {
                        tagName: "$td",
                        textContent: "value"
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            tagName: "$tfoot",
            attributes: {
              class: "$table-light fw-bold"
            },
            children: [
              {
                list: "footerRows",
                item: {
                  tagName: "$tr",
                  children: [
                    {
                      list: "cells",
                      item: {
                        tagName: "$td",
                        textContent: "value"
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
}, recipes = {
  simple,
  headerOnly,
  withBodyAndFooter
}, FLAVOR_MAP = {
  simple: "simple",
  headeronly: "headerOnly",
  "header-only": "headerOnly",
  header: "headerOnly",
  withbodyandfooter: "withBodyAndFooter",
  "with-body-and-footer": "withBodyAndFooter",
  bodyandfooter: "withBodyAndFooter",
  footer: "withBodyAndFooter"
}, startFunc$1 = ({
  flavor: e = "simple",
  tableType: t
} = {}) => {
  const r = FLAVOR_MAP[String((e !== "simple" ? e : t ?? e) ?? "simple").toLowerCase()] ?? "simple";
  return recipes[r] ?? recipes.simple;
}, startFunc = ({
  flavor: e = "simple",
  tableType: t,
  data: n = [],
  columns: r,
  footerData: l
} = {}) => {
  const o = startFunc$2({
    flavor: e,
    tableType: t,
    data: n,
    columns: r,
    footerData: l
  }), s = startFunc$1({ flavor: e, tableType: t });
  return transformHelper.transform(o, s);
}, render = ({
  flavor: e = "simple",
  tableType: t,
  data: n = [],
  columns: r,
  footerData: l,
  targetHtmlId: o
} = {}) => {
  const s = o, c = startFunc({
    flavor: e,
    tableType: t,
    data: n,
    columns: r,
    footerData: l
  }), u = typeof s == "string" ? document.getElementById(s) : s;
  if (!u) return c;
  u.innerHTML = "";
  const h = buildSpecElement(c);
  return Array.isArray(h) ? h.forEach((d) => u.append(d)) : u.append(h), h;
};
registerGlobal(render);
export {
  render as default,
  startFunc$1 as prepareRecipe,
  startFunc$2 as prepareSource,
  startFunc as prepareSpec,
  render
};
