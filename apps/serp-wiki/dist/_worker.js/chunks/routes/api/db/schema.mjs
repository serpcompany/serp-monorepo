const e = Symbol.for('drizzle:entityKind');
function is(t, i) {
  if (!t || 'object' != typeof t) return !1;
  if (t instanceof i) return !0;
  if (!Object.prototype.hasOwnProperty.call(i, e))
    throw new Error(
      `Class "${i.name ?? '<unknown>'}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  let n = Object.getPrototypeOf(t).constructor;
  if (n)
    for (; n; ) {
      if (e in n && n[e] === i[e]) return !0;
      n = Object.getPrototypeOf(n);
    }
  return !1;
}
class QueryPromise {
  static [e] = 'QueryPromise';
  [Symbol.toStringTag] = 'QueryPromise';
  catch(e) {
    return this.then(void 0, e);
  }
  finally(e) {
    return this.then(
      (t) => (e?.(), t),
      (t) => {
        throw (e?.(), t);
      }
    );
  }
  then(e, t) {
    return this.execute().then(e, t);
  }
}
const t = Symbol.for('drizzle:Name'),
  i = Symbol.for('drizzle:Schema'),
  n = Symbol.for('drizzle:Columns'),
  s = Symbol.for('drizzle:ExtraConfigColumns'),
  r = Symbol.for('drizzle:OriginalName'),
  a = Symbol.for('drizzle:BaseName'),
  l = Symbol.for('drizzle:IsAlias'),
  o = Symbol.for('drizzle:ExtraConfigBuilder'),
  u = Symbol.for('drizzle:IsDrizzleTable');
class Table {
  static [e] = 'Table';
  static Symbol = {
    Name: t,
    Schema: i,
    OriginalName: r,
    Columns: n,
    ExtraConfigColumns: s,
    BaseName: a,
    IsAlias: l,
    ExtraConfigBuilder: o
  };
  [t];
  [r];
  [i];
  [n];
  [s];
  [a];
  [l] = !1;
  [u] = !0;
  [o] = void 0;
  constructor(e, n, s) {
    (this[t] = this[r] = e), (this[i] = n), (this[a] = s);
  }
}
function getTableName(e) {
  return e[t];
}
function getTableUniqueName(e) {
  return `${e[i] ?? 'public'}.${e[t]}`;
}
const c = { startActiveSpan: (e, t) => t() };
class Column {
  constructor(e, t) {
    (this.table = e),
      (this.config = t),
      (this.name = t.name),
      (this.keyAsName = t.keyAsName),
      (this.notNull = t.notNull),
      (this.default = t.default),
      (this.defaultFn = t.defaultFn),
      (this.onUpdateFn = t.onUpdateFn),
      (this.hasDefault = t.hasDefault),
      (this.primary = t.primaryKey),
      (this.isUnique = t.isUnique),
      (this.uniqueName = t.uniqueName),
      (this.uniqueType = t.uniqueType),
      (this.dataType = t.dataType),
      (this.columnType = t.columnType),
      (this.generated = t.generated),
      (this.generatedIdentity = t.generatedIdentity);
  }
  static [e] = 'Column';
  name;
  keyAsName;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = void 0;
  generated = void 0;
  generatedIdentity = void 0;
  config;
  mapFromDriverValue(e) {
    return e;
  }
  mapToDriverValue(e) {
    return e;
  }
  shouldDisableInsert() {
    return (
      void 0 !== this.config.generated &&
      'byDefault' !== this.config.generated.type
    );
  }
}
class ColumnBuilder {
  static [e] = 'ColumnBuilder';
  config;
  constructor(e, t, i) {
    this.config = {
      name: e,
      keyAsName: '' === e,
      notNull: !1,
      default: void 0,
      hasDefault: !1,
      primaryKey: !1,
      isUnique: !1,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType: t,
      columnType: i,
      generated: void 0
    };
  }
  $type() {
    return this;
  }
  notNull() {
    return (this.config.notNull = !0), this;
  }
  default(e) {
    return (this.config.default = e), (this.config.hasDefault = !0), this;
  }
  $defaultFn(e) {
    return (this.config.defaultFn = e), (this.config.hasDefault = !0), this;
  }
  $default = this.$defaultFn;
  $onUpdateFn(e) {
    return (this.config.onUpdateFn = e), (this.config.hasDefault = !0), this;
  }
  $onUpdate = this.$onUpdateFn;
  primaryKey() {
    return (this.config.primaryKey = !0), (this.config.notNull = !0), this;
  }
  setName(e) {
    '' === this.config.name && (this.config.name = e);
  }
}
class ForeignKeyBuilder {
  static [e] = 'PgForeignKeyBuilder';
  reference;
  _onUpdate = 'no action';
  _onDelete = 'no action';
  constructor(e, t) {
    (this.reference = () => {
      const { name: t, columns: i, foreignColumns: n } = e();
      return {
        name: t,
        columns: i,
        foreignTable: n[0].table,
        foreignColumns: n
      };
    }),
      t && ((this._onUpdate = t.onUpdate), (this._onDelete = t.onDelete));
  }
  onUpdate(e) {
    return (this._onUpdate = void 0 === e ? 'no action' : e), this;
  }
  onDelete(e) {
    return (this._onDelete = void 0 === e ? 'no action' : e), this;
  }
  build(e) {
    return new ForeignKey(e, this);
  }
}
class ForeignKey {
  constructor(e, t) {
    (this.table = e),
      (this.reference = t.reference),
      (this.onUpdate = t._onUpdate),
      (this.onDelete = t._onDelete);
  }
  static [e] = 'PgForeignKey';
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name: e, columns: i, foreignColumns: n } = this.reference(),
      s = i.map((e) => e.name),
      r = n.map((e) => e.name),
      a = [this.table[t], ...s, n[0].table[t], ...r];
    return e ?? `${a.join('_')}_fk`;
  }
}
function parsePgArrayValue(e, t, i) {
  for (let n = t; n < e.length; n++) {
    const s = e[n];
    if ('\\' !== s) {
      if ('"' === s) return [e.slice(t, n).replace(/\\/g, ''), n + 1];
      if (!i && (',' === s || '}' === s))
        return [e.slice(t, n).replace(/\\/g, ''), n];
    } else n++;
  }
  return [e.slice(t).replace(/\\/g, ''), e.length];
}
function parsePgNestedArray(e, t = 0) {
  const i = [];
  let n = t,
    s = !1;
  for (; n < e.length; ) {
    const r = e[n];
    if (',' === r) {
      (s || n === t) && i.push(''), (s = !0), n++;
      continue;
    }
    if (((s = !1), '\\' === r)) {
      n += 2;
      continue;
    }
    if ('"' === r) {
      const [t, s] = parsePgArrayValue(e, n + 1, !0);
      i.push(t), (n = s);
      continue;
    }
    if ('}' === r) return [i, n + 1];
    if ('{' === r) {
      const [t, s] = parsePgNestedArray(e, n + 1);
      i.push(t), (n = s);
      continue;
    }
    const [a, l] = parsePgArrayValue(e, n, !1);
    i.push(a), (n = l);
  }
  return [i, n];
}
function parsePgArray(e) {
  const [t] = parsePgNestedArray(e, 1);
  return t;
}
function makePgArray(e) {
  return `{${e.map((e) => (Array.isArray(e) ? makePgArray(e) : 'string' == typeof e ? `"${e.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : `${e}`)).join(',')}}`;
}
class PgColumnBuilder extends ColumnBuilder {
  foreignKeyConfigs = [];
  static [e] = 'PgColumnBuilder';
  array(e) {
    return new PgArrayBuilder(this.config.name, this, e);
  }
  references(e, t = {}) {
    return this.foreignKeyConfigs.push({ ref: e, actions: t }), this;
  }
  unique(e, t) {
    return (
      (this.config.isUnique = !0),
      (this.config.uniqueName = e),
      (this.config.uniqueType = t?.nulls),
      this
    );
  }
  generatedAlwaysAs(e) {
    return (
      (this.config.generated = { as: e, type: 'always', mode: 'stored' }), this
    );
  }
  buildForeignKeys(e, t) {
    return this.foreignKeyConfigs.map(({ ref: i, actions: n }) =>
      (function (e, ...t) {
        return e(...t);
      })(
        (i, n) => {
          const s = new ForeignKeyBuilder(() => {
            const t = i();
            return { columns: [e], foreignColumns: [t] };
          });
          return (
            n.onUpdate && s.onUpdate(n.onUpdate),
            n.onDelete && s.onDelete(n.onDelete),
            s.build(t)
          );
        },
        i,
        n
      )
    );
  }
  buildExtraConfigColumn(e) {
    return new ExtraConfigColumn(e, this.config);
  }
}
class PgColumn extends Column {
  constructor(e, i) {
    i.uniqueName ||
      (i.uniqueName = (function (e, i) {
        return `${e[t]}_${i.join('_')}_unique`;
      })(e, [i.name])),
      super(e, i),
      (this.table = e);
  }
  static [e] = 'PgColumn';
}
class ExtraConfigColumn extends PgColumn {
  static [e] = 'ExtraConfigColumn';
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? 'asc',
    nulls: this.config.nulls ?? 'last',
    opClass: this.config.opClass
  };
  defaultConfig = { order: 'asc', nulls: 'last', opClass: void 0 };
  asc() {
    return (this.indexConfig.order = 'asc'), this;
  }
  desc() {
    return (this.indexConfig.order = 'desc'), this;
  }
  nullsFirst() {
    return (this.indexConfig.nulls = 'first'), this;
  }
  nullsLast() {
    return (this.indexConfig.nulls = 'last'), this;
  }
  op(e) {
    return (this.indexConfig.opClass = e), this;
  }
}
class PgArrayBuilder extends PgColumnBuilder {
  static [e] = 'PgArrayBuilder';
  constructor(e, t, i) {
    super(e, 'array', 'PgArray'),
      (this.config.baseBuilder = t),
      (this.config.size = i);
  }
  build(e) {
    const t = this.config.baseBuilder.build(e);
    return new PgArray(e, this.config, t);
  }
}
class PgArray extends PgColumn {
  constructor(e, t, i, n) {
    super(e, t), (this.baseColumn = i), (this.range = n), (this.size = t.size);
  }
  size;
  static [e] = 'PgArray';
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${'number' == typeof this.size ? this.size : ''}]`;
  }
  mapFromDriverValue(e) {
    return (
      'string' == typeof e && (e = parsePgArray(e)),
      e.map((e) => this.baseColumn.mapFromDriverValue(e))
    );
  }
  mapToDriverValue(e, t = !1) {
    const i = e.map((e) =>
      null === e
        ? null
        : is(this.baseColumn, PgArray)
          ? this.baseColumn.mapToDriverValue(e, !0)
          : this.baseColumn.mapToDriverValue(e)
    );
    return t ? i : makePgArray(i);
  }
}
const g = Symbol.for('drizzle:isPgEnum');
class PgEnumColumnBuilder extends PgColumnBuilder {
  static [e] = 'PgEnumColumnBuilder';
  constructor(e, t) {
    super(e, 'string', 'PgEnumColumn'), (this.config.enum = t);
  }
  build(e) {
    return new PgEnumColumn(e, this.config);
  }
}
class PgEnumColumn extends PgColumn {
  static [e] = 'PgEnumColumn';
  enum = this.config.enum;
  enumValues = this.config.enum.enumValues;
  constructor(e, t) {
    super(e, t), (this.enum = t.enum);
  }
  getSQLType() {
    return this.enum.enumName;
  }
}
class Subquery {
  static [e] = 'Subquery';
  constructor(e, t, i, n = !1) {
    this._ = {
      brand: 'Subquery',
      sql: e,
      selectedFields: t,
      alias: i,
      isWith: n
    };
  }
}
class WithSubquery extends Subquery {
  static [e] = 'WithSubquery';
}
const d = Symbol.for('drizzle:ViewBaseConfig');
function isSQLWrapper(e) {
  return null != e && 'function' == typeof e.getSQL;
}
class StringChunk {
  static [e] = 'StringChunk';
  value;
  constructor(e) {
    this.value = Array.isArray(e) ? e : [e];
  }
  getSQL() {
    return new SQL([this]);
  }
}
class SQL {
  constructor(e) {
    this.queryChunks = e;
  }
  static [e] = 'SQL';
  decoder = m;
  shouldInlineParams = !1;
  append(e) {
    return this.queryChunks.push(...e.queryChunks), this;
  }
  toQuery(e) {
    return c.startActiveSpan('drizzle.buildSQL', (t) => {
      const i = this.buildQueryFromSourceParams(this.queryChunks, e);
      return (
        t?.setAttributes({
          'drizzle.query.text': i.sql,
          'drizzle.query.params': JSON.stringify(i.params)
        }),
        i
      );
    });
  }
  buildQueryFromSourceParams(e, t) {
    const i = Object.assign({}, t, {
        inlineParams: t.inlineParams || this.shouldInlineParams,
        paramStartIndex: t.paramStartIndex || { value: 0 }
      }),
      {
        casing: n,
        escapeName: s,
        escapeParam: r,
        prepareTyping: a,
        inlineParams: o,
        paramStartIndex: u
      } = i;
    return (function (e) {
      const t = { sql: '', params: [] };
      for (const i of e)
        (t.sql += i.sql),
          t.params.push(...i.params),
          i.typings?.length &&
            (t.typings || (t.typings = []), t.typings.push(...i.typings));
      return t;
    })(
      e.map((e) => {
        if (is(e, StringChunk)) return { sql: e.value.join(''), params: [] };
        if (is(e, Name)) return { sql: s(e.value), params: [] };
        if (void 0 === e) return { sql: '', params: [] };
        if (Array.isArray(e)) {
          const t = [new StringChunk('(')];
          for (const [i, n] of e.entries())
            t.push(n), i < e.length - 1 && t.push(new StringChunk(', '));
          return (
            t.push(new StringChunk(')')), this.buildQueryFromSourceParams(t, i)
          );
        }
        if (is(e, SQL))
          return this.buildQueryFromSourceParams(e.queryChunks, {
            ...i,
            inlineParams: o || e.shouldInlineParams
          });
        if (is(e, Table)) {
          const t = e[Table.Symbol.Schema],
            i = e[Table.Symbol.Name];
          return { sql: void 0 === t ? s(i) : s(t) + '.' + s(i), params: [] };
        }
        if (is(e, Column)) {
          const i = n.getColumnCasing(e);
          if ('indexes' === t.invokeSource) return { sql: s(i), params: [] };
          const r = e.table[Table.Symbol.Schema];
          return {
            sql:
              e.table[l] || void 0 === r
                ? s(e.table[Table.Symbol.Name]) + '.' + s(i)
                : s(r) + '.' + s(e.table[Table.Symbol.Name]) + '.' + s(i),
            params: []
          };
        }
        if (is(e, View)) {
          const t = e[d].schema,
            i = e[d].name;
          return { sql: void 0 === t ? s(i) : s(t) + '.' + s(i), params: [] };
        }
        if (is(e, Param)) {
          if (is(e.value, Placeholder))
            return { sql: r(u.value++, e), params: [e], typings: ['none'] };
          const t =
            null === e.value ? null : e.encoder.mapToDriverValue(e.value);
          if (is(t, SQL)) return this.buildQueryFromSourceParams([t], i);
          if (o) return { sql: this.mapInlineParam(t, i), params: [] };
          let n = ['none'];
          return (
            a && (n = [a(e.encoder)]),
            { sql: r(u.value++, t), params: [t], typings: n }
          );
        }
        return is(e, Placeholder)
          ? { sql: r(u.value++, e), params: [e], typings: ['none'] }
          : is(e, SQL.Aliased) && void 0 !== e.fieldAlias
            ? { sql: s(e.fieldAlias), params: [] }
            : is(e, Subquery)
              ? e._.isWith
                ? { sql: s(e._.alias), params: [] }
                : this.buildQueryFromSourceParams(
                    [
                      new StringChunk('('),
                      e._.sql,
                      new StringChunk(') '),
                      new Name(e._.alias)
                    ],
                    i
                  )
              : (c = e) && 'function' == typeof c && g in c && !0 === c[g]
                ? e.schema
                  ? { sql: s(e.schema) + '.' + s(e.enumName), params: [] }
                  : { sql: s(e.enumName), params: [] }
                : isSQLWrapper(e)
                  ? e.shouldOmitSQLParens?.()
                    ? this.buildQueryFromSourceParams([e.getSQL()], i)
                    : this.buildQueryFromSourceParams(
                        [
                          new StringChunk('('),
                          e.getSQL(),
                          new StringChunk(')')
                        ],
                        i
                      )
                  : o
                    ? { sql: this.mapInlineParam(e, i), params: [] }
                    : { sql: r(u.value++, e), params: [e], typings: ['none'] };
        var c;
      })
    );
  }
  mapInlineParam(e, { escapeString: t }) {
    if (null === e) return 'null';
    if ('number' == typeof e || 'boolean' == typeof e) return e.toString();
    if ('string' == typeof e) return t(e);
    if ('object' == typeof e) {
      const i = e.toString();
      return t('[object Object]' === i ? JSON.stringify(e) : i);
    }
    throw new Error('Unexpected param value: ' + e);
  }
  getSQL() {
    return this;
  }
  as(e) {
    return void 0 === e ? this : new SQL.Aliased(this, e);
  }
  mapWith(e) {
    return (
      (this.decoder = 'function' == typeof e ? { mapFromDriverValue: e } : e),
      this
    );
  }
  inlineParams() {
    return (this.shouldInlineParams = !0), this;
  }
  if(e) {
    return e ? this : void 0;
  }
}
class Name {
  constructor(e) {
    this.value = e;
  }
  static [e] = 'Name';
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
const m = { mapFromDriverValue: (e) => e },
  h = { mapToDriverValue: (e) => e };
class Param {
  constructor(e, t = h) {
    (this.value = e), (this.encoder = t);
  }
  static [e] = 'Param';
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
function sql(e, ...t) {
  const i = [];
  (t.length > 0 || (e.length > 0 && '' !== e[0])) &&
    i.push(new StringChunk(e[0]));
  for (const [n, s] of t.entries()) i.push(s, new StringChunk(e[n + 1]));
  return new SQL(i);
}
var f;
((f = sql || (sql = {})).empty = function () {
  return new SQL([]);
}),
  (f.fromList = function (e) {
    return new SQL(e);
  }),
  (f.raw = function (e) {
    return new SQL([new StringChunk(e)]);
  }),
  (f.join = function (e, t) {
    const i = [];
    for (const [n, s] of e.entries())
      n > 0 && void 0 !== t && i.push(t), i.push(s);
    return new SQL(i);
  }),
  (f.identifier = function (e) {
    return new Name(e);
  }),
  (f.placeholder = function (e) {
    return new Placeholder(e);
  }),
  (f.param = function (e, t) {
    return new Param(e, t);
  }),
  ((t) => {
    class Aliased {
      constructor(e, t) {
        (this.sql = e), (this.fieldAlias = t);
      }
      static [e] = 'SQL.Aliased';
      isSelectionField = !1;
      getSQL() {
        return this.sql;
      }
      clone() {
        return new Aliased(this.sql, this.fieldAlias);
      }
    }
    t.Aliased = Aliased;
  })(SQL || (SQL = {}));
class Placeholder {
  constructor(e) {
    this.name = e;
  }
  static [e] = 'Placeholder';
  getSQL() {
    return new SQL([this]);
  }
}
function fillPlaceholders(e, t) {
  return e.map((e) => {
    if (is(e, Placeholder)) {
      if (!(e.name in t))
        throw new Error(`No value for placeholder "${e.name}" was provided`);
      return t[e.name];
    }
    if (is(e, Param) && is(e.value, Placeholder)) {
      if (!(e.value.name in t))
        throw new Error(
          `No value for placeholder "${e.value.name}" was provided`
        );
      return e.encoder.mapToDriverValue(t[e.value.name]);
    }
    return e;
  });
}
class View {
  static [e] = 'View';
  [d];
  constructor({ name: e, schema: t, selectedFields: i, query: n }) {
    this[d] = {
      name: e,
      originalName: e,
      schema: t,
      selectedFields: i,
      query: n,
      isExisting: !n,
      isAlias: !1
    };
  }
  getSQL() {
    return new SQL([this]);
  }
}
function mapResultRow(e, t, i) {
  const n = {},
    s = e.reduce((e, { path: s, field: r }, a) => {
      let l;
      l = is(r, Column) ? r : is(r, SQL) ? r.decoder : r.sql.decoder;
      let o = e;
      for (const [e, u] of s.entries())
        if (e < s.length - 1) u in o || (o[u] = {}), (o = o[u]);
        else {
          const e = t[a],
            c = (o[u] = null === e ? null : l.mapFromDriverValue(e));
          if (i && is(r, Column) && 2 === s.length) {
            const e = s[0];
            e in n
              ? 'string' == typeof n[e] &&
                n[e] !== getTableName(r.table) &&
                (n[e] = !1)
              : (n[e] = null === c && getTableName(r.table));
          }
        }
      return e;
    }, {});
  if (i && Object.keys(n).length > 0)
    for (const [e, t] of Object.entries(n))
      'string' != typeof t || i[t] || (s[e] = null);
  return s;
}
function orderSelectedFields(e, t) {
  return Object.entries(e).reduce((e, [i, n]) => {
    if ('string' != typeof i) return e;
    const s = t ? [...t, i] : [i];
    return (
      is(n, Column) || is(n, SQL) || is(n, SQL.Aliased)
        ? e.push({ path: s, field: n })
        : is(n, Table)
          ? e.push(...orderSelectedFields(n[Table.Symbol.Columns], s))
          : e.push(...orderSelectedFields(n, s)),
      e
    );
  }, []);
}
function haveSameKeys(e, t) {
  const i = Object.keys(e),
    n = Object.keys(t);
  if (i.length !== n.length) return !1;
  for (const [e, t] of i.entries()) if (t !== n[e]) return !1;
  return !0;
}
function mapUpdateSet(e, t) {
  const i = Object.entries(t)
    .filter(([, e]) => void 0 !== e)
    .map(([t, i]) =>
      is(i, SQL) || is(i, Column)
        ? [t, i]
        : [t, new Param(i, e[Table.Symbol.Columns][t])]
    );
  if (0 === i.length) throw new Error('No values to set');
  return Object.fromEntries(i);
}
function getTableColumns(e) {
  return e[Table.Symbol.Columns];
}
function getTableLikeName(e) {
  return is(e, Subquery)
    ? e._.alias
    : is(e, View)
      ? e[d].name
      : is(e, SQL)
        ? void 0
        : e[Table.Symbol.IsAlias]
          ? e[Table.Symbol.Name]
          : e[Table.Symbol.BaseName];
}
function getColumnNameAndConfig(e, t) {
  return {
    name: 'string' == typeof e && e.length > 0 ? e : '',
    config: 'object' == typeof e ? e : t
  };
}
function isConfig(e) {
  if ('object' != typeof e || null === e) return !1;
  if ('Object' !== e.constructor.name) return !1;
  if ('logger' in e) {
    const t = typeof e.logger;
    return (
      'boolean' === t ||
      ('object' === t && 'function' == typeof e.logger.logQuery) ||
      'undefined' === t
    );
  }
  if ('schema' in e) {
    const t = typeof e.logger;
    return 'object' === t || 'undefined' === t;
  }
  if ('casing' in e) {
    const t = typeof e.logger;
    return 'string' === t || 'undefined' === t;
  }
  if ('mode' in e)
    return (
      'default' === e.mode && 'planetscale' === e.mode && void 0 === e.mode
    );
  if ('connection' in e) {
    const t = typeof e.connection;
    return 'string' === t || 'object' === t || 'undefined' === t;
  }
  if ('client' in e) {
    const t = typeof e.client;
    return 'object' === t || 'function' === t || 'undefined' === t;
  }
  return 0 === Object.keys(e).length;
}
(Column.prototype.getSQL = function () {
  return new SQL([this]);
}),
  (Table.prototype.getSQL = function () {
    return new SQL([this]);
  }),
  (Subquery.prototype.getSQL = function () {
    return new SQL([this]);
  });
class ColumnAliasProxyHandler {
  constructor(e) {
    this.table = e;
  }
  static [e] = 'ColumnAliasProxyHandler';
  get(e, t) {
    return 'table' === t ? this.table : e[t];
  }
}
class TableAliasProxyHandler {
  constructor(e, t) {
    (this.alias = e), (this.replaceOriginalName = t);
  }
  static [e] = 'TableAliasProxyHandler';
  get(e, t) {
    if (t === Table.Symbol.IsAlias) return !0;
    if (t === Table.Symbol.Name) return this.alias;
    if (this.replaceOriginalName && t === Table.Symbol.OriginalName)
      return this.alias;
    if (t === d) return { ...e[d], name: this.alias, isAlias: !0 };
    if (t === Table.Symbol.Columns) {
      const t = e[Table.Symbol.Columns];
      if (!t) return t;
      const i = {};
      return (
        Object.keys(t).map((n) => {
          i[n] = new Proxy(
            t[n],
            new ColumnAliasProxyHandler(new Proxy(e, this))
          );
        }),
        i
      );
    }
    const i = e[t];
    return is(i, Column)
      ? new Proxy(i, new ColumnAliasProxyHandler(new Proxy(e, this)))
      : i;
  }
}
function aliasedTable(e, t) {
  return new Proxy(e, new TableAliasProxyHandler(t, !1));
}
function aliasedTableColumn(e, t) {
  return new Proxy(
    e,
    new ColumnAliasProxyHandler(
      new Proxy(e.table, new TableAliasProxyHandler(t, !1))
    )
  );
}
function mapColumnsInAliasedSQLToAlias(e, t) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(e.sql, t), e.fieldAlias);
}
function mapColumnsInSQLToAlias(e, t) {
  return sql.join(
    e.queryChunks.map((e) =>
      is(e, Column)
        ? aliasedTableColumn(e, t)
        : is(e, SQL)
          ? mapColumnsInSQLToAlias(e, t)
          : is(e, SQL.Aliased)
            ? mapColumnsInAliasedSQLToAlias(e, t)
            : e
    )
  );
}
function toSnakeCase(e) {
  return (
    e
      .replace(/['\u2019]/g, '')
      .match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []
  )
    .map((e) => e.toLowerCase())
    .join('_');
}
function toCamelCase(e) {
  return (
    e
      .replace(/['\u2019]/g, '')
      .match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []
  ).reduce(
    (e, t, i) =>
      e + (0 === i ? t.toLowerCase() : `${t[0].toUpperCase()}${t.slice(1)}`),
    ''
  );
}
function noopCase(e) {
  return e;
}
class CasingCache {
  static [e] = 'CasingCache';
  cache = {};
  cachedTables = {};
  convert;
  constructor(e) {
    this.convert =
      'snake_case' === e
        ? toSnakeCase
        : 'camelCase' === e
          ? toCamelCase
          : noopCase;
  }
  getColumnCasing(e) {
    if (!e.keyAsName) return e.name;
    const t = `${e.table[Table.Symbol.Schema] ?? 'public'}.${e.table[Table.Symbol.OriginalName]}.${e.name}`;
    return this.cache[t] || this.cacheTable(e.table), this.cache[t];
  }
  cacheTable(e) {
    const t = `${e[Table.Symbol.Schema] ?? 'public'}.${e[Table.Symbol.OriginalName]}`;
    if (!this.cachedTables[t]) {
      for (const i of Object.values(e[Table.Symbol.Columns])) {
        const e = `${t}.${i.name}`;
        this.cache[e] = this.convert(i.name);
      }
      this.cachedTables[t] = !0;
    }
  }
  clearCache() {
    (this.cache = {}), (this.cachedTables = {});
  }
}
class DrizzleError extends Error {
  static [e] = 'DrizzleError';
  constructor({ message: e, cause: t }) {
    super(e), (this.name = 'DrizzleError'), (this.cause = t);
  }
}
class TransactionRollbackError extends DrizzleError {
  static [e] = 'TransactionRollbackError';
  constructor() {
    super({ message: 'Rollback' });
  }
}
class PgIntColumnBaseBuilder extends PgColumnBuilder {
  static [e] = 'PgIntColumnBaseBuilder';
  generatedAlwaysAsIdentity(e) {
    if (e) {
      const { name: t, ...i } = e;
      this.config.generatedIdentity = {
        type: 'always',
        sequenceName: t,
        sequenceOptions: i
      };
    } else this.config.generatedIdentity = { type: 'always' };
    return (this.config.hasDefault = !0), (this.config.notNull = !0), this;
  }
  generatedByDefaultAsIdentity(e) {
    if (e) {
      const { name: t, ...i } = e;
      this.config.generatedIdentity = {
        type: 'byDefault',
        sequenceName: t,
        sequenceOptions: i
      };
    } else this.config.generatedIdentity = { type: 'byDefault' };
    return (this.config.hasDefault = !0), (this.config.notNull = !0), this;
  }
}
class PgBigInt53Builder extends PgIntColumnBaseBuilder {
  static [e] = 'PgBigInt53Builder';
  constructor(e) {
    super(e, 'number', 'PgBigInt53');
  }
  build(e) {
    return new PgBigInt53(e, this.config);
  }
}
class PgBigInt53 extends PgColumn {
  static [e] = 'PgBigInt53';
  getSQLType() {
    return 'bigint';
  }
  mapFromDriverValue(e) {
    return 'number' == typeof e ? e : Number(e);
  }
}
class PgBigInt64Builder extends PgIntColumnBaseBuilder {
  static [e] = 'PgBigInt64Builder';
  constructor(e) {
    super(e, 'bigint', 'PgBigInt64');
  }
  build(e) {
    return new PgBigInt64(e, this.config);
  }
}
class PgBigInt64 extends PgColumn {
  static [e] = 'PgBigInt64';
  getSQLType() {
    return 'bigint';
  }
  mapFromDriverValue(e) {
    return BigInt(e);
  }
}
function bigint(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return 'number' === n.mode
    ? new PgBigInt53Builder(i)
    : new PgBigInt64Builder(i);
}
class PgBigSerial53Builder extends PgColumnBuilder {
  static [e] = 'PgBigSerial53Builder';
  constructor(e) {
    super(e, 'number', 'PgBigSerial53'),
      (this.config.hasDefault = !0),
      (this.config.notNull = !0);
  }
  build(e) {
    return new PgBigSerial53(e, this.config);
  }
}
class PgBigSerial53 extends PgColumn {
  static [e] = 'PgBigSerial53';
  getSQLType() {
    return 'bigserial';
  }
  mapFromDriverValue(e) {
    return 'number' == typeof e ? e : Number(e);
  }
}
class PgBigSerial64Builder extends PgColumnBuilder {
  static [e] = 'PgBigSerial64Builder';
  constructor(e) {
    super(e, 'bigint', 'PgBigSerial64'), (this.config.hasDefault = !0);
  }
  build(e) {
    return new PgBigSerial64(e, this.config);
  }
}
class PgBigSerial64 extends PgColumn {
  static [e] = 'PgBigSerial64';
  getSQLType() {
    return 'bigserial';
  }
  mapFromDriverValue(e) {
    return BigInt(e);
  }
}
function bigserial(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return 'number' === n.mode
    ? new PgBigSerial53Builder(i)
    : new PgBigSerial64Builder(i);
}
class PgBooleanBuilder extends PgColumnBuilder {
  static [e] = 'PgBooleanBuilder';
  constructor(e) {
    super(e, 'boolean', 'PgBoolean');
  }
  build(e) {
    return new PgBoolean(e, this.config);
  }
}
class PgBoolean extends PgColumn {
  static [e] = 'PgBoolean';
  getSQLType() {
    return 'boolean';
  }
}
function boolean(e) {
  return new PgBooleanBuilder(e ?? '');
}
class PgCharBuilder extends PgColumnBuilder {
  static [e] = 'PgCharBuilder';
  constructor(e, t) {
    super(e, 'string', 'PgChar'),
      (this.config.length = t.length),
      (this.config.enumValues = t.enum);
  }
  build(e) {
    return new PgChar(e, this.config);
  }
}
class PgChar extends PgColumn {
  static [e] = 'PgChar';
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return void 0 === this.length ? 'char' : `char(${this.length})`;
  }
}
function char(e, t = {}) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgCharBuilder(i, n);
}
class PgCidrBuilder extends PgColumnBuilder {
  static [e] = 'PgCidrBuilder';
  constructor(e) {
    super(e, 'string', 'PgCidr');
  }
  build(e) {
    return new PgCidr(e, this.config);
  }
}
class PgCidr extends PgColumn {
  static [e] = 'PgCidr';
  getSQLType() {
    return 'cidr';
  }
}
function cidr(e) {
  return new PgCidrBuilder(e ?? '');
}
class PgCustomColumnBuilder extends PgColumnBuilder {
  static [e] = 'PgCustomColumnBuilder';
  constructor(e, t, i) {
    super(e, 'custom', 'PgCustomColumn'),
      (this.config.fieldConfig = t),
      (this.config.customTypeParams = i);
  }
  build(e) {
    return new PgCustomColumn(e, this.config);
  }
}
class PgCustomColumn extends PgColumn {
  static [e] = 'PgCustomColumn';
  sqlName;
  mapTo;
  mapFrom;
  constructor(e, t) {
    super(e, t),
      (this.sqlName = t.customTypeParams.dataType(t.fieldConfig)),
      (this.mapTo = t.customTypeParams.toDriver),
      (this.mapFrom = t.customTypeParams.fromDriver);
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(e) {
    return 'function' == typeof this.mapFrom ? this.mapFrom(e) : e;
  }
  mapToDriverValue(e) {
    return 'function' == typeof this.mapTo ? this.mapTo(e) : e;
  }
}
function customType(e) {
  return (t, i) => {
    const { name: n, config: s } = getColumnNameAndConfig(t, i);
    return new PgCustomColumnBuilder(n, s, e);
  };
}
class PgDateColumnBaseBuilder extends PgColumnBuilder {
  static [e] = 'PgDateColumnBaseBuilder';
  defaultNow() {
    return this.default(sql`now()`);
  }
}
class PgDateBuilder extends PgDateColumnBaseBuilder {
  static [e] = 'PgDateBuilder';
  constructor(e) {
    super(e, 'date', 'PgDate');
  }
  build(e) {
    return new PgDate(e, this.config);
  }
}
class PgDate extends PgColumn {
  static [e] = 'PgDate';
  getSQLType() {
    return 'date';
  }
  mapFromDriverValue(e) {
    return new Date(e);
  }
  mapToDriverValue(e) {
    return e.toISOString();
  }
}
class PgDateStringBuilder extends PgDateColumnBaseBuilder {
  static [e] = 'PgDateStringBuilder';
  constructor(e) {
    super(e, 'string', 'PgDateString');
  }
  build(e) {
    return new PgDateString(e, this.config);
  }
}
class PgDateString extends PgColumn {
  static [e] = 'PgDateString';
  getSQLType() {
    return 'date';
  }
}
function date(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return 'date' === n?.mode ? new PgDateBuilder(i) : new PgDateStringBuilder(i);
}
class PgDoublePrecisionBuilder extends PgColumnBuilder {
  static [e] = 'PgDoublePrecisionBuilder';
  constructor(e) {
    super(e, 'number', 'PgDoublePrecision');
  }
  build(e) {
    return new PgDoublePrecision(e, this.config);
  }
}
class PgDoublePrecision extends PgColumn {
  static [e] = 'PgDoublePrecision';
  getSQLType() {
    return 'double precision';
  }
  mapFromDriverValue(e) {
    return 'string' == typeof e ? Number.parseFloat(e) : e;
  }
}
function doublePrecision(e) {
  return new PgDoublePrecisionBuilder(e ?? '');
}
class PgInetBuilder extends PgColumnBuilder {
  static [e] = 'PgInetBuilder';
  constructor(e) {
    super(e, 'string', 'PgInet');
  }
  build(e) {
    return new PgInet(e, this.config);
  }
}
class PgInet extends PgColumn {
  static [e] = 'PgInet';
  getSQLType() {
    return 'inet';
  }
}
function inet(e) {
  return new PgInetBuilder(e ?? '');
}
class PgIntegerBuilder extends PgIntColumnBaseBuilder {
  static [e] = 'PgIntegerBuilder';
  constructor(e) {
    super(e, 'number', 'PgInteger');
  }
  build(e) {
    return new PgInteger(e, this.config);
  }
}
class PgInteger extends PgColumn {
  static [e] = 'PgInteger';
  getSQLType() {
    return 'integer';
  }
  mapFromDriverValue(e) {
    return 'string' == typeof e ? Number.parseInt(e) : e;
  }
}
function integer(e) {
  return new PgIntegerBuilder(e ?? '');
}
class PgIntervalBuilder extends PgColumnBuilder {
  static [e] = 'PgIntervalBuilder';
  constructor(e, t) {
    super(e, 'string', 'PgInterval'), (this.config.intervalConfig = t);
  }
  build(e) {
    return new PgInterval(e, this.config);
  }
}
class PgInterval extends PgColumn {
  static [e] = 'PgInterval';
  fields = this.config.intervalConfig.fields;
  precision = this.config.intervalConfig.precision;
  getSQLType() {
    return `interval${this.fields ? ` ${this.fields}` : ''}${this.precision ? `(${this.precision})` : ''}`;
  }
}
function interval(e, t = {}) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgIntervalBuilder(i, n);
}
class PgJsonBuilder extends PgColumnBuilder {
  static [e] = 'PgJsonBuilder';
  constructor(e) {
    super(e, 'json', 'PgJson');
  }
  build(e) {
    return new PgJson(e, this.config);
  }
}
class PgJson extends PgColumn {
  static [e] = 'PgJson';
  constructor(e, t) {
    super(e, t);
  }
  getSQLType() {
    return 'json';
  }
  mapToDriverValue(e) {
    return JSON.stringify(e);
  }
  mapFromDriverValue(e) {
    if ('string' == typeof e)
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    return e;
  }
}
function json(e) {
  return new PgJsonBuilder(e ?? '');
}
class PgJsonbBuilder extends PgColumnBuilder {
  static [e] = 'PgJsonbBuilder';
  constructor(e) {
    super(e, 'json', 'PgJsonb');
  }
  build(e) {
    return new PgJsonb(e, this.config);
  }
}
class PgJsonb extends PgColumn {
  static [e] = 'PgJsonb';
  constructor(e, t) {
    super(e, t);
  }
  getSQLType() {
    return 'jsonb';
  }
  mapToDriverValue(e) {
    return JSON.stringify(e);
  }
  mapFromDriverValue(e) {
    if ('string' == typeof e)
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    return e;
  }
}
function jsonb(e) {
  return new PgJsonbBuilder(e ?? '');
}
class PgLineBuilder extends PgColumnBuilder {
  static [e] = 'PgLineBuilder';
  constructor(e) {
    super(e, 'array', 'PgLine');
  }
  build(e) {
    return new PgLineTuple(e, this.config);
  }
}
class PgLineTuple extends PgColumn {
  static [e] = 'PgLine';
  getSQLType() {
    return 'line';
  }
  mapFromDriverValue(e) {
    const [t, i, n] = e.slice(1, -1).split(',');
    return [Number.parseFloat(t), Number.parseFloat(i), Number.parseFloat(n)];
  }
  mapToDriverValue(e) {
    return `{${e[0]},${e[1]},${e[2]}}`;
  }
}
class PgLineABCBuilder extends PgColumnBuilder {
  static [e] = 'PgLineABCBuilder';
  constructor(e) {
    super(e, 'json', 'PgLineABC');
  }
  build(e) {
    return new PgLineABC(e, this.config);
  }
}
class PgLineABC extends PgColumn {
  static [e] = 'PgLineABC';
  getSQLType() {
    return 'line';
  }
  mapFromDriverValue(e) {
    const [t, i, n] = e.slice(1, -1).split(',');
    return {
      a: Number.parseFloat(t),
      b: Number.parseFloat(i),
      c: Number.parseFloat(n)
    };
  }
  mapToDriverValue(e) {
    return `{${e.a},${e.b},${e.c}}`;
  }
}
function line(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return n?.mode && 'tuple' !== n.mode
    ? new PgLineABCBuilder(i)
    : new PgLineBuilder(i);
}
class PgMacaddrBuilder extends PgColumnBuilder {
  static [e] = 'PgMacaddrBuilder';
  constructor(e) {
    super(e, 'string', 'PgMacaddr');
  }
  build(e) {
    return new PgMacaddr(e, this.config);
  }
}
class PgMacaddr extends PgColumn {
  static [e] = 'PgMacaddr';
  getSQLType() {
    return 'macaddr';
  }
}
function macaddr(e) {
  return new PgMacaddrBuilder(e ?? '');
}
class PgMacaddr8Builder extends PgColumnBuilder {
  static [e] = 'PgMacaddr8Builder';
  constructor(e) {
    super(e, 'string', 'PgMacaddr8');
  }
  build(e) {
    return new PgMacaddr8(e, this.config);
  }
}
class PgMacaddr8 extends PgColumn {
  static [e] = 'PgMacaddr8';
  getSQLType() {
    return 'macaddr8';
  }
}
function macaddr8(e) {
  return new PgMacaddr8Builder(e ?? '');
}
class PgNumericBuilder extends PgColumnBuilder {
  static [e] = 'PgNumericBuilder';
  constructor(e, t, i) {
    super(e, 'string', 'PgNumeric'),
      (this.config.precision = t),
      (this.config.scale = i);
  }
  build(e) {
    return new PgNumeric(e, this.config);
  }
}
class PgNumeric extends PgColumn {
  static [e] = 'PgNumeric';
  precision;
  scale;
  constructor(e, t) {
    super(e, t), (this.precision = t.precision), (this.scale = t.scale);
  }
  getSQLType() {
    return void 0 !== this.precision && void 0 !== this.scale
      ? `numeric(${this.precision}, ${this.scale})`
      : void 0 === this.precision
        ? 'numeric'
        : `numeric(${this.precision})`;
  }
}
function numeric(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgNumericBuilder(i, n?.precision, n?.scale);
}
class PgPointTupleBuilder extends PgColumnBuilder {
  static [e] = 'PgPointTupleBuilder';
  constructor(e) {
    super(e, 'array', 'PgPointTuple');
  }
  build(e) {
    return new PgPointTuple(e, this.config);
  }
}
class PgPointTuple extends PgColumn {
  static [e] = 'PgPointTuple';
  getSQLType() {
    return 'point';
  }
  mapFromDriverValue(e) {
    if ('string' == typeof e) {
      const [t, i] = e.slice(1, -1).split(',');
      return [Number.parseFloat(t), Number.parseFloat(i)];
    }
    return [e.x, e.y];
  }
  mapToDriverValue(e) {
    return `(${e[0]},${e[1]})`;
  }
}
class PgPointObjectBuilder extends PgColumnBuilder {
  static [e] = 'PgPointObjectBuilder';
  constructor(e) {
    super(e, 'json', 'PgPointObject');
  }
  build(e) {
    return new PgPointObject(e, this.config);
  }
}
class PgPointObject extends PgColumn {
  static [e] = 'PgPointObject';
  getSQLType() {
    return 'point';
  }
  mapFromDriverValue(e) {
    if ('string' == typeof e) {
      const [t, i] = e.slice(1, -1).split(',');
      return { x: Number.parseFloat(t), y: Number.parseFloat(i) };
    }
    return e;
  }
  mapToDriverValue(e) {
    return `(${e.x},${e.y})`;
  }
}
function point(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return n?.mode && 'tuple' !== n.mode
    ? new PgPointObjectBuilder(i)
    : new PgPointTupleBuilder(i);
}
function bytesToFloat64(e, t) {
  const i = new ArrayBuffer(8),
    n = new DataView(i);
  for (let i = 0; i < 8; i++) n.setUint8(i, e[t + i]);
  return n.getFloat64(0, !0);
}
function parseEWKB(e) {
  const t = (function (e) {
    const t = [];
    for (let i = 0; i < e.length; i += 2)
      t.push(Number.parseInt(e.slice(i, i + 2), 16));
    return new Uint8Array(t);
  })(e);
  let i = 0;
  const n = t[i];
  i += 1;
  const s = new DataView(t.buffer),
    r = s.getUint32(i, 1 === n);
  if (
    ((i += 4),
    536870912 & r && (s.getUint32(i, 1 === n), (i += 4)),
    1 == (65535 & r))
  ) {
    const e = bytesToFloat64(t, i);
    i += 8;
    const n = bytesToFloat64(t, i);
    return (i += 8), [e, n];
  }
  throw new Error('Unsupported geometry type');
}
class PgGeometryBuilder extends PgColumnBuilder {
  static [e] = 'PgGeometryBuilder';
  constructor(e) {
    super(e, 'array', 'PgGeometry');
  }
  build(e) {
    return new PgGeometry(e, this.config);
  }
}
class PgGeometry extends PgColumn {
  static [e] = 'PgGeometry';
  getSQLType() {
    return 'geometry(point)';
  }
  mapFromDriverValue(e) {
    return parseEWKB(e);
  }
  mapToDriverValue(e) {
    return `point(${e[0]} ${e[1]})`;
  }
}
class PgGeometryObjectBuilder extends PgColumnBuilder {
  static [e] = 'PgGeometryObjectBuilder';
  constructor(e) {
    super(e, 'json', 'PgGeometryObject');
  }
  build(e) {
    return new PgGeometryObject(e, this.config);
  }
}
class PgGeometryObject extends PgColumn {
  static [e] = 'PgGeometryObject';
  getSQLType() {
    return 'geometry(point)';
  }
  mapFromDriverValue(e) {
    const t = parseEWKB(e);
    return { x: t[0], y: t[1] };
  }
  mapToDriverValue(e) {
    return `point(${e.x} ${e.y})`;
  }
}
function geometry(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return n?.mode && 'tuple' !== n.mode
    ? new PgGeometryObjectBuilder(i)
    : new PgGeometryBuilder(i);
}
class PgRealBuilder extends PgColumnBuilder {
  static [e] = 'PgRealBuilder';
  constructor(e, t) {
    super(e, 'number', 'PgReal'), (this.config.length = t);
  }
  build(e) {
    return new PgReal(e, this.config);
  }
}
class PgReal extends PgColumn {
  static [e] = 'PgReal';
  constructor(e, t) {
    super(e, t);
  }
  getSQLType() {
    return 'real';
  }
  mapFromDriverValue = (e) => ('string' == typeof e ? Number.parseFloat(e) : e);
}
function real(e) {
  return new PgRealBuilder(e ?? '');
}
class PgSerialBuilder extends PgColumnBuilder {
  static [e] = 'PgSerialBuilder';
  constructor(e) {
    super(e, 'number', 'PgSerial'),
      (this.config.hasDefault = !0),
      (this.config.notNull = !0);
  }
  build(e) {
    return new PgSerial(e, this.config);
  }
}
class PgSerial extends PgColumn {
  static [e] = 'PgSerial';
  getSQLType() {
    return 'serial';
  }
}
function serial(e) {
  return new PgSerialBuilder(e ?? '');
}
class PgSmallIntBuilder extends PgIntColumnBaseBuilder {
  static [e] = 'PgSmallIntBuilder';
  constructor(e) {
    super(e, 'number', 'PgSmallInt');
  }
  build(e) {
    return new PgSmallInt(e, this.config);
  }
}
class PgSmallInt extends PgColumn {
  static [e] = 'PgSmallInt';
  getSQLType() {
    return 'smallint';
  }
  mapFromDriverValue = (e) => ('string' == typeof e ? Number(e) : e);
}
function smallint(e) {
  return new PgSmallIntBuilder(e ?? '');
}
class PgSmallSerialBuilder extends PgColumnBuilder {
  static [e] = 'PgSmallSerialBuilder';
  constructor(e) {
    super(e, 'number', 'PgSmallSerial'),
      (this.config.hasDefault = !0),
      (this.config.notNull = !0);
  }
  build(e) {
    return new PgSmallSerial(e, this.config);
  }
}
class PgSmallSerial extends PgColumn {
  static [e] = 'PgSmallSerial';
  getSQLType() {
    return 'smallserial';
  }
}
function smallserial(e) {
  return new PgSmallSerialBuilder(e ?? '');
}
class PgTextBuilder extends PgColumnBuilder {
  static [e] = 'PgTextBuilder';
  constructor(e, t) {
    super(e, 'string', 'PgText'), (this.config.enumValues = t.enum);
  }
  build(e) {
    return new PgText(e, this.config);
  }
}
class PgText extends PgColumn {
  static [e] = 'PgText';
  enumValues = this.config.enumValues;
  getSQLType() {
    return 'text';
  }
}
function text(e, t = {}) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgTextBuilder(i, n);
}
class PgTimeBuilder extends PgDateColumnBaseBuilder {
  constructor(e, t, i) {
    super(e, 'string', 'PgTime'),
      (this.withTimezone = t),
      (this.precision = i),
      (this.config.withTimezone = t),
      (this.config.precision = i);
  }
  static [e] = 'PgTimeBuilder';
  build(e) {
    return new PgTime(e, this.config);
  }
}
class PgTime extends PgColumn {
  static [e] = 'PgTime';
  withTimezone;
  precision;
  constructor(e, t) {
    super(e, t),
      (this.withTimezone = t.withTimezone),
      (this.precision = t.precision);
  }
  getSQLType() {
    return `time${void 0 === this.precision ? '' : `(${this.precision})`}${this.withTimezone ? ' with time zone' : ''}`;
  }
}
function time(e, t = {}) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgTimeBuilder(i, n.withTimezone ?? !1, n.precision);
}
class PgTimestampBuilder extends PgDateColumnBaseBuilder {
  static [e] = 'PgTimestampBuilder';
  constructor(e, t, i) {
    super(e, 'date', 'PgTimestamp'),
      (this.config.withTimezone = t),
      (this.config.precision = i);
  }
  build(e) {
    return new PgTimestamp(e, this.config);
  }
}
class PgTimestamp extends PgColumn {
  static [e] = 'PgTimestamp';
  withTimezone;
  precision;
  constructor(e, t) {
    super(e, t),
      (this.withTimezone = t.withTimezone),
      (this.precision = t.precision);
  }
  getSQLType() {
    return `timestamp${void 0 === this.precision ? '' : ` (${this.precision})`}${this.withTimezone ? ' with time zone' : ''}`;
  }
  mapFromDriverValue = (e) => new Date(this.withTimezone ? e : e + '+0000');
  mapToDriverValue = (e) => e.toISOString();
}
class PgTimestampStringBuilder extends PgDateColumnBaseBuilder {
  static [e] = 'PgTimestampStringBuilder';
  constructor(e, t, i) {
    super(e, 'string', 'PgTimestampString'),
      (this.config.withTimezone = t),
      (this.config.precision = i);
  }
  build(e) {
    return new PgTimestampString(e, this.config);
  }
}
class PgTimestampString extends PgColumn {
  static [e] = 'PgTimestampString';
  withTimezone;
  precision;
  constructor(e, t) {
    super(e, t),
      (this.withTimezone = t.withTimezone),
      (this.precision = t.precision);
  }
  getSQLType() {
    return `timestamp${void 0 === this.precision ? '' : `(${this.precision})`}${this.withTimezone ? ' with time zone' : ''}`;
  }
}
function timestamp(e, t = {}) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return 'string' === n?.mode
    ? new PgTimestampStringBuilder(i, n.withTimezone ?? !1, n.precision)
    : new PgTimestampBuilder(i, n?.withTimezone ?? !1, n?.precision);
}
class PgUUIDBuilder extends PgColumnBuilder {
  static [e] = 'PgUUIDBuilder';
  constructor(e) {
    super(e, 'string', 'PgUUID');
  }
  defaultRandom() {
    return this.default(sql`gen_random_uuid()`);
  }
  build(e) {
    return new PgUUID(e, this.config);
  }
}
class PgUUID extends PgColumn {
  static [e] = 'PgUUID';
  getSQLType() {
    return 'uuid';
  }
}
function uuid(e) {
  return new PgUUIDBuilder(e ?? '');
}
class PgVarcharBuilder extends PgColumnBuilder {
  static [e] = 'PgVarcharBuilder';
  constructor(e, t) {
    super(e, 'string', 'PgVarchar'),
      (this.config.length = t.length),
      (this.config.enumValues = t.enum);
  }
  build(e) {
    return new PgVarchar(e, this.config);
  }
}
class PgVarchar extends PgColumn {
  static [e] = 'PgVarchar';
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return void 0 === this.length ? 'varchar' : `varchar(${this.length})`;
  }
}
function varchar(e, t = {}) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgVarcharBuilder(i, n);
}
class PgBinaryVectorBuilder extends PgColumnBuilder {
  static [e] = 'PgBinaryVectorBuilder';
  constructor(e, t) {
    super(e, 'string', 'PgBinaryVector'),
      (this.config.dimensions = t.dimensions);
  }
  build(e) {
    return new PgBinaryVector(e, this.config);
  }
}
class PgBinaryVector extends PgColumn {
  static [e] = 'PgBinaryVector';
  dimensions = this.config.dimensions;
  getSQLType() {
    return `bit(${this.dimensions})`;
  }
}
function bit(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgBinaryVectorBuilder(i, n);
}
class PgHalfVectorBuilder extends PgColumnBuilder {
  static [e] = 'PgHalfVectorBuilder';
  constructor(e, t) {
    super(e, 'array', 'PgHalfVector'), (this.config.dimensions = t.dimensions);
  }
  build(e) {
    return new PgHalfVector(e, this.config);
  }
}
class PgHalfVector extends PgColumn {
  static [e] = 'PgHalfVector';
  dimensions = this.config.dimensions;
  getSQLType() {
    return `halfvec(${this.dimensions})`;
  }
  mapToDriverValue(e) {
    return JSON.stringify(e);
  }
  mapFromDriverValue(e) {
    return e
      .slice(1, -1)
      .split(',')
      .map((e) => Number.parseFloat(e));
  }
}
function halfvec(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgHalfVectorBuilder(i, n);
}
class PgSparseVectorBuilder extends PgColumnBuilder {
  static [e] = 'PgSparseVectorBuilder';
  constructor(e, t) {
    super(e, 'string', 'PgSparseVector'),
      (this.config.dimensions = t.dimensions);
  }
  build(e) {
    return new PgSparseVector(e, this.config);
  }
}
class PgSparseVector extends PgColumn {
  static [e] = 'PgSparseVector';
  dimensions = this.config.dimensions;
  getSQLType() {
    return `sparsevec(${this.dimensions})`;
  }
}
function sparsevec(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgSparseVectorBuilder(i, n);
}
class PgVectorBuilder extends PgColumnBuilder {
  static [e] = 'PgVectorBuilder';
  constructor(e, t) {
    super(e, 'array', 'PgVector'), (this.config.dimensions = t.dimensions);
  }
  build(e) {
    return new PgVector(e, this.config);
  }
}
class PgVector extends PgColumn {
  static [e] = 'PgVector';
  dimensions = this.config.dimensions;
  getSQLType() {
    return `vector(${this.dimensions})`;
  }
  mapToDriverValue(e) {
    return JSON.stringify(e);
  }
  mapFromDriverValue(e) {
    return e
      .slice(1, -1)
      .split(',')
      .map((e) => Number.parseFloat(e));
  }
}
function vector(e, t) {
  const { name: i, config: n } = getColumnNameAndConfig(e, t);
  return new PgVectorBuilder(i, n);
}
const p = Symbol.for('drizzle:PgInlineForeignKeys'),
  b = Symbol.for('drizzle:EnableRLS');
class PgTable extends Table {
  static [e] = 'PgTable';
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys: p,
    EnableRLS: b
  });
  [p] = [];
  [b] = !1;
  [Table.Symbol.ExtraConfigBuilder] = void 0;
}
function pgTableWithSchema(e, t, i, n, s = e) {
  const r = new PgTable(e, n, s),
    a =
      'function' == typeof t
        ? t({
            bigint: bigint,
            bigserial: bigserial,
            boolean: boolean,
            char: char,
            cidr: cidr,
            customType: customType,
            date: date,
            doublePrecision: doublePrecision,
            inet: inet,
            integer: integer,
            interval: interval,
            json: json,
            jsonb: jsonb,
            line: line,
            macaddr: macaddr,
            macaddr8: macaddr8,
            numeric: numeric,
            point: point,
            geometry: geometry,
            real: real,
            serial: serial,
            smallint: smallint,
            smallserial: smallserial,
            text: text,
            time: time,
            timestamp: timestamp,
            uuid: uuid,
            varchar: varchar,
            bit: bit,
            halfvec: halfvec,
            sparsevec: sparsevec,
            vector: vector
          })
        : t,
    l = Object.fromEntries(
      Object.entries(a).map(([e, t]) => {
        const i = t;
        i.setName(e);
        const n = i.build(r);
        return r[p].push(...i.buildForeignKeys(n, r)), [e, n];
      })
    ),
    o = Object.fromEntries(
      Object.entries(a).map(([e, t]) => {
        const i = t;
        i.setName(e);
        return [e, i.buildExtraConfigColumn(r)];
      })
    ),
    u = Object.assign(r, l);
  return (
    (u[Table.Symbol.Columns] = l),
    (u[Table.Symbol.ExtraConfigColumns] = o),
    i && (u[PgTable.Symbol.ExtraConfigBuilder] = i),
    Object.assign(u, {
      enableRLS: () => ((u[PgTable.Symbol.EnableRLS] = !0), u)
    })
  );
}
const pgTable = (e, t, i) => pgTableWithSchema(e, t, i, void 0);
class PrimaryKeyBuilder {
  static [e] = 'PgPrimaryKeyBuilder';
  columns;
  name;
  constructor(e, t) {
    (this.columns = e), (this.name = t);
  }
  build(e) {
    return new PrimaryKey(e, this.columns, this.name);
  }
}
class PrimaryKey {
  constructor(e, t, i) {
    (this.table = e), (this.columns = t), (this.name = i);
  }
  static [e] = 'PgPrimaryKey';
  columns;
  name;
  getName() {
    return (
      this.name ??
      `${this.table[PgTable.Symbol.Name]}_${this.columns.map((e) => e.name).join('_')}_pk`
    );
  }
}
function bindIfParam(e, t) {
  return !(function (e) {
    return (
      'object' == typeof e &&
      null !== e &&
      'mapToDriverValue' in e &&
      'function' == typeof e.mapToDriverValue
    );
  })(t) ||
    isSQLWrapper(e) ||
    is(e, Param) ||
    is(e, Placeholder) ||
    is(e, Column) ||
    is(e, Table) ||
    is(e, View)
    ? e
    : new Param(e, t);
}
const eq = (e, t) => sql`${e} = ${bindIfParam(t, e)}`,
  ne = (e, t) => sql`${e} <> ${bindIfParam(t, e)}`;
function and(...e) {
  const t = e.filter((e) => void 0 !== e);
  if (0 !== t.length)
    return 1 === t.length
      ? new SQL(t)
      : new SQL([
          new StringChunk('('),
          sql.join(t, new StringChunk(' and ')),
          new StringChunk(')')
        ]);
}
function or(...e) {
  const t = e.filter((e) => void 0 !== e);
  if (0 !== t.length)
    return 1 === t.length
      ? new SQL(t)
      : new SQL([
          new StringChunk('('),
          sql.join(t, new StringChunk(' or ')),
          new StringChunk(')')
        ]);
}
function not(e) {
  return sql`not ${e}`;
}
const gt = (e, t) => sql`${e} > ${bindIfParam(t, e)}`,
  gte = (e, t) => sql`${e} >= ${bindIfParam(t, e)}`,
  lt = (e, t) => sql`${e} < ${bindIfParam(t, e)}`,
  lte = (e, t) => sql`${e} <= ${bindIfParam(t, e)}`;
function inArray(e, t) {
  return Array.isArray(t)
    ? 0 === t.length
      ? sql`false`
      : sql`${e} in ${t.map((t) => bindIfParam(t, e))}`
    : sql`${e} in ${bindIfParam(t, e)}`;
}
function notInArray(e, t) {
  return Array.isArray(t)
    ? 0 === t.length
      ? sql`true`
      : sql`${e} not in ${t.map((t) => bindIfParam(t, e))}`
    : sql`${e} not in ${bindIfParam(t, e)}`;
}
function isNull(e) {
  return sql`${e} is null`;
}
function isNotNull(e) {
  return sql`${e} is not null`;
}
function exists(e) {
  return sql`exists ${e}`;
}
function notExists(e) {
  return sql`not exists ${e}`;
}
function between(e, t, i) {
  return sql`${e} between ${bindIfParam(t, e)} and ${bindIfParam(i, e)}`;
}
function notBetween(e, t, i) {
  return sql`${e} not between ${bindIfParam(t, e)} and ${bindIfParam(i, e)}`;
}
function like(e, t) {
  return sql`${e} like ${t}`;
}
function notLike(e, t) {
  return sql`${e} not like ${t}`;
}
function ilike(e, t) {
  return sql`${e} ilike ${t}`;
}
function notIlike(e, t) {
  return sql`${e} not ilike ${t}`;
}
function asc(e) {
  return sql`${e} asc`;
}
function desc(e) {
  return sql`${e} desc`;
}
class Relation {
  constructor(e, t, i) {
    (this.sourceTable = e),
      (this.referencedTable = t),
      (this.relationName = i),
      (this.referencedTableName = t[Table.Symbol.Name]);
  }
  static [e] = 'Relation';
  referencedTableName;
  fieldName;
}
class Relations {
  constructor(e, t) {
    (this.table = e), (this.config = t);
  }
  static [e] = 'Relations';
}
class One extends Relation {
  constructor(e, t, i, n) {
    super(e, t, i?.relationName), (this.config = i), (this.isNullable = n);
  }
  static [e] = 'One';
  withFieldName(e) {
    const t = new One(
      this.sourceTable,
      this.referencedTable,
      this.config,
      this.isNullable
    );
    return (t.fieldName = e), t;
  }
}
class Many extends Relation {
  constructor(e, t, i) {
    super(e, t, i?.relationName), (this.config = i);
  }
  static [e] = 'Many';
  withFieldName(e) {
    const t = new Many(this.sourceTable, this.referencedTable, this.config);
    return (t.fieldName = e), t;
  }
}
function extractTablesRelationalConfig(e, t) {
  1 === Object.keys(e).length &&
    'default' in e &&
    !is(e.default, Table) &&
    (e = e.default);
  const i = {},
    n = {},
    s = {};
  for (const [r, a] of Object.entries(e))
    if (is(a, Table)) {
      const e = getTableUniqueName(a),
        t = n[e];
      (i[e] = r),
        (s[r] = {
          tsName: r,
          dbName: a[Table.Symbol.Name],
          schema: a[Table.Symbol.Schema],
          columns: a[Table.Symbol.Columns],
          relations: t?.relations ?? {},
          primaryKey: t?.primaryKey ?? []
        });
      for (const e of Object.values(a[Table.Symbol.Columns]))
        e.primary && s[r].primaryKey.push(e);
      const l = a[Table.Symbol.ExtraConfigBuilder]?.(
        a[Table.Symbol.ExtraConfigColumns]
      );
      if (l)
        for (const e of Object.values(l))
          is(e, PrimaryKeyBuilder) && s[r].primaryKey.push(...e.columns);
    } else if (is(a, Relations)) {
      const e = getTableUniqueName(a.table),
        r = i[e],
        l = a.config(t(a.table));
      let o;
      for (const [t, i] of Object.entries(l))
        if (r) {
          s[r].relations[t] = i;
        } else
          e in n || (n[e] = { relations: {}, primaryKey: o }),
            (n[e].relations[t] = i);
    }
  return { tables: s, tableNamesMap: i };
}
function createOne(e) {
  return function (t, i) {
    return new One(
      e,
      t,
      i,
      i?.fields.reduce((e, t) => e && t.notNull, !0) ?? !1
    );
  };
}
function createMany(e) {
  return function (t, i) {
    return new Many(e, t, i);
  };
}
function normalizeRelation(e, t, i) {
  if (is(i, One) && i.config)
    return { fields: i.config.fields, references: i.config.references };
  const n = t[getTableUniqueName(i.referencedTable)];
  if (!n)
    throw new Error(
      `Table "${i.referencedTable[Table.Symbol.Name]}" not found in schema`
    );
  const s = e[n];
  if (!s) throw new Error(`Table "${n}" not found in schema`);
  const r = i.sourceTable,
    a = t[getTableUniqueName(r)];
  if (!a)
    throw new Error(`Table "${r[Table.Symbol.Name]}" not found in schema`);
  const l = [];
  for (const e of Object.values(s.relations))
    ((i.relationName && i !== e && e.relationName === i.relationName) ||
      (!i.relationName && e.referencedTable === i.sourceTable)) &&
      l.push(e);
  if (l.length > 1)
    throw i.relationName
      ? new Error(
          `There are multiple relations with name "${i.relationName}" in table "${n}"`
        )
      : new Error(
          `There are multiple relations between "${n}" and "${i.sourceTable[Table.Symbol.Name]}". Please specify relation name`
        );
  if (l[0] && is(l[0], One) && l[0].config)
    return { fields: l[0].config.references, references: l[0].config.fields };
  throw new Error(
    `There is not enough information to infer relation "${a}.${i.fieldName}"`
  );
}
function createTableRelationsHelpers(e) {
  return { one: createOne(e), many: createMany(e) };
}
function mapRelationalRow(e, t, i, n, s = (e) => e) {
  const r = {};
  for (const [a, l] of n.entries())
    if (l.isJson) {
      const n = t.relations[l.tsKey],
        o = i[a],
        u = 'string' == typeof o ? JSON.parse(o) : o;
      r[l.tsKey] = is(n, One)
        ? u && mapRelationalRow(e, e[l.relationTableTsKey], u, l.selection, s)
        : u.map((t) =>
            mapRelationalRow(e, e[l.relationTableTsKey], t, l.selection, s)
          );
    } else {
      const e = s(i[a]),
        t = l.field;
      let n;
      (n = is(t, Column) ? t : is(t, SQL) ? t.decoder : t.sql.decoder),
        (r[l.tsKey] = null === e ? null : n.mapFromDriverValue(e));
    }
  return r;
}
class PgViewBase extends View {
  static [e] = 'PgViewBase';
}
class PgDialect {
  static [e] = 'PgDialect';
  casing;
  constructor(e) {
    this.casing = new CasingCache(e?.casing);
  }
  async migrate(e, t, i) {
    const n =
        'string' == typeof i
          ? '__drizzle_migrations'
          : (i.migrationsTable ?? '__drizzle_migrations'),
      s = 'string' == typeof i ? 'drizzle' : (i.migrationsSchema ?? 'drizzle'),
      r = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(s)}.${sql.identifier(n)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
    await t.execute(sql`CREATE SCHEMA IF NOT EXISTS ${sql.identifier(s)}`),
      await t.execute(r);
    const a = (
      await t.all(
        sql`select id, hash, created_at from ${sql.identifier(s)}.${sql.identifier(n)} order by created_at desc limit 1`
      )
    )[0];
    await t.transaction(async (t) => {
      for await (const i of e)
        if (!a || Number(a.created_at) < i.folderMillis) {
          for (const e of i.sql) await t.execute(sql.raw(e));
          await t.execute(
            sql`insert into ${sql.identifier(s)}.${sql.identifier(n)} ("hash", "created_at") values(${i.hash}, ${i.folderMillis})`
          );
        }
    });
  }
  escapeName(e) {
    return `"${e}"`;
  }
  escapeParam(e) {
    return `$${e + 1}`;
  }
  escapeString(e) {
    return `'${e.replace(/'/g, "''")}'`;
  }
  buildWithCTE(e) {
    if (!e?.length) return;
    const t = [sql`with `];
    for (const [i, n] of e.entries())
      t.push(sql`${sql.identifier(n._.alias)} as (${n._.sql})`),
        i < e.length - 1 && t.push(sql`, `);
    return t.push(sql` `), sql.join(t);
  }
  buildDeleteQuery({ table: e, where: t, returning: i, withList: n }) {
    return sql`${this.buildWithCTE(n)}delete from ${e}${t ? sql` where ${t}` : void 0}${i ? sql` returning ${this.buildSelection(i, { isSingleTable: !0 })}` : void 0}`;
  }
  buildUpdateSet(e, t) {
    const i = e[Table.Symbol.Columns],
      n = Object.keys(i).filter(
        (e) => void 0 !== t[e] || void 0 !== i[e]?.onUpdateFn
      ),
      s = n.length;
    return sql.join(
      n.flatMap((e, n) => {
        const r = i[e],
          a = t[e] ?? sql.param(r.onUpdateFn(), r),
          l = sql`${sql.identifier(this.casing.getColumnCasing(r))} = ${a}`;
        return n < s - 1 ? [l, sql.raw(', ')] : [l];
      })
    );
  }
  buildUpdateQuery({
    table: e,
    set: t,
    where: i,
    returning: n,
    withList: s,
    from: r,
    joins: a
  }) {
    const l = this.buildWithCTE(s),
      o = e[PgTable.Symbol.Name],
      u = e[PgTable.Symbol.Schema],
      c = e[PgTable.Symbol.OriginalName],
      g = o === c ? void 0 : o,
      d = sql`${u ? sql`${sql.identifier(u)}.` : void 0}${sql.identifier(c)}${g && sql` ${sql.identifier(g)}`}`,
      m = this.buildUpdateSet(e, t),
      h = r && sql.join([sql.raw(' from '), this.buildFromTable(r)]);
    return sql`${l}update ${d} set ${m}${h}${this.buildJoins(a)}${i ? sql` where ${i}` : void 0}${n ? sql` returning ${this.buildSelection(n, { isSingleTable: !r })}` : void 0}`;
  }
  buildSelection(e, { isSingleTable: t = !1 } = {}) {
    const i = e.length,
      n = e.flatMap(({ field: e }, n) => {
        const s = [];
        if (is(e, SQL.Aliased) && e.isSelectionField)
          s.push(sql.identifier(e.fieldAlias));
        else if (is(e, SQL.Aliased) || is(e, SQL)) {
          const i = is(e, SQL.Aliased) ? e.sql : e;
          t
            ? s.push(
                new SQL(
                  i.queryChunks.map((e) =>
                    is(e, PgColumn)
                      ? sql.identifier(this.casing.getColumnCasing(e))
                      : e
                  )
                )
              )
            : s.push(i),
            is(e, SQL.Aliased) &&
              s.push(sql` as ${sql.identifier(e.fieldAlias)}`);
        } else
          is(e, Column) &&
            (t
              ? s.push(sql.identifier(this.casing.getColumnCasing(e)))
              : s.push(e));
        return n < i - 1 && s.push(sql`, `), s;
      });
    return sql.join(n);
  }
  buildJoins(e) {
    if (!e || 0 === e.length) return;
    const t = [];
    for (const [i, n] of e.entries()) {
      0 === i && t.push(sql` `);
      const s = n.table,
        r = n.lateral ? sql` lateral` : void 0;
      if (is(s, PgTable)) {
        const e = s[PgTable.Symbol.Name],
          i = s[PgTable.Symbol.Schema],
          a = s[PgTable.Symbol.OriginalName],
          l = e === a ? void 0 : n.alias;
        t.push(
          sql`${sql.raw(n.joinType)} join${r} ${i ? sql`${sql.identifier(i)}.` : void 0}${sql.identifier(a)}${l && sql` ${sql.identifier(l)}`} on ${n.on}`
        );
      } else if (is(s, View)) {
        const e = s[d].name,
          i = s[d].schema,
          a = s[d].originalName,
          l = e === a ? void 0 : n.alias;
        t.push(
          sql`${sql.raw(n.joinType)} join${r} ${i ? sql`${sql.identifier(i)}.` : void 0}${sql.identifier(a)}${l && sql` ${sql.identifier(l)}`} on ${n.on}`
        );
      } else t.push(sql`${sql.raw(n.joinType)} join${r} ${s} on ${n.on}`);
      i < e.length - 1 && t.push(sql` `);
    }
    return sql.join(t);
  }
  buildFromTable(e) {
    if (is(e, Table) && e[Table.Symbol.OriginalName] !== e[Table.Symbol.Name]) {
      let t = sql`${sql.identifier(e[Table.Symbol.OriginalName])}`;
      return (
        e[Table.Symbol.Schema] &&
          (t = sql`${sql.identifier(e[Table.Symbol.Schema])}.${t}`),
        sql`${t} ${sql.identifier(e[Table.Symbol.Name])}`
      );
    }
    return e;
  }
  buildSelectQuery({
    withList: e,
    fields: t,
    fieldsFlat: i,
    where: n,
    having: s,
    table: r,
    joins: a,
    orderBy: l,
    groupBy: o,
    limit: u,
    offset: c,
    lockingClause: g,
    distinct: m,
    setOperators: h
  }) {
    const f = i ?? orderSelectedFields(t);
    for (const e of f)
      if (
        is(e.field, Column) &&
        getTableName(e.field.table) !==
          (is(r, Subquery)
            ? r._.alias
            : is(r, PgViewBase)
              ? r[d].name
              : is(r, SQL)
                ? void 0
                : getTableName(r)) &&
        !((e) =>
          a?.some(
            ({ alias: t }) =>
              t ===
              (e[Table.Symbol.IsAlias]
                ? getTableName(e)
                : e[Table.Symbol.BaseName])
          ))(e.field.table)
      ) {
        const t = getTableName(e.field.table);
        throw new Error(
          `Your "${e.path.join('->')}" field references a column "${t}"."${e.field.name}", but the table "${t}" is not part of the query! Did you forget to join it?`
        );
      }
    const p = !a || 0 === a.length,
      b = this.buildWithCTE(e);
    let y;
    m &&
      (y =
        !0 === m
          ? sql` distinct`
          : sql` distinct on (${sql.join(m.on, sql`, `)})`);
    const P = this.buildSelection(f, { isSingleTable: p }),
      S = this.buildFromTable(r),
      w = this.buildJoins(a),
      C = n ? sql` where ${n}` : void 0,
      T = s ? sql` having ${s}` : void 0;
    let B, q;
    l && l.length > 0 && (B = sql` order by ${sql.join(l, sql`, `)}`),
      o && o.length > 0 && (q = sql` group by ${sql.join(o, sql`, `)}`);
    const v =
        'object' == typeof u || ('number' == typeof u && u >= 0)
          ? sql` limit ${u}`
          : void 0,
      N = c ? sql` offset ${c}` : void 0,
      x = sql.empty();
    if (g) {
      const e = sql` for ${sql.raw(g.strength)}`;
      g.config.of &&
        e.append(
          sql` of ${sql.join(Array.isArray(g.config.of) ? g.config.of : [g.config.of], sql`, `)}`
        ),
        g.config.noWait
          ? e.append(sql` no wait`)
          : g.config.skipLocked && e.append(sql` skip locked`),
        x.append(e);
    }
    const $ = sql`${b}select${y} ${P} from ${S}${w}${C}${q}${T}${B}${v}${N}${x}`;
    return h.length > 0 ? this.buildSetOperations($, h) : $;
  }
  buildSetOperations(e, t) {
    const [i, ...n] = t;
    if (!i) throw new Error('Cannot pass undefined values to any set operator');
    return 0 === n.length
      ? this.buildSetOperationQuery({ leftSelect: e, setOperator: i })
      : this.buildSetOperations(
          this.buildSetOperationQuery({ leftSelect: e, setOperator: i }),
          n
        );
  }
  buildSetOperationQuery({
    leftSelect: e,
    setOperator: {
      type: t,
      isAll: i,
      rightSelect: n,
      limit: s,
      orderBy: r,
      offset: a
    }
  }) {
    const l = sql`(${e.getSQL()}) `,
      o = sql`(${n.getSQL()})`;
    let u;
    if (r && r.length > 0) {
      const e = [];
      for (const t of r)
        if (is(t, PgColumn)) e.push(sql.identifier(t.name));
        else if (is(t, SQL)) {
          for (let e = 0; e < t.queryChunks.length; e++) {
            const i = t.queryChunks[e];
            is(i, PgColumn) && (t.queryChunks[e] = sql.identifier(i.name));
          }
          e.push(sql`${t}`);
        } else e.push(sql`${t}`);
      u = sql` order by ${sql.join(e, sql`, `)} `;
    }
    const c =
        'object' == typeof s || ('number' == typeof s && s >= 0)
          ? sql` limit ${s}`
          : void 0,
      g = sql.raw(`${t} ${i ? 'all ' : ''}`);
    return sql`${l}${g}${o}${u}${c}${a ? sql` offset ${a}` : void 0}`;
  }
  buildInsertQuery({
    table: e,
    values: t,
    onConflict: i,
    returning: n,
    withList: s,
    select: r,
    overridingSystemValue_: a
  }) {
    const l = [],
      o = e[Table.Symbol.Columns],
      u = Object.entries(o).filter(([e, t]) => !t.shouldDisableInsert()),
      c = u.map(([, e]) => sql.identifier(this.casing.getColumnCasing(e)));
    if (r) {
      const e = t;
      is(e, SQL) ? l.push(e) : l.push(e.getSQL());
    } else {
      const e = t;
      l.push(sql.raw('values '));
      for (const [t, i] of e.entries()) {
        const n = [];
        for (const [e, t] of u) {
          const s = i[e];
          if (void 0 === s || (is(s, Param) && void 0 === s.value))
            if (void 0 !== t.defaultFn) {
              const e = t.defaultFn(),
                i = is(e, SQL) ? e : sql.param(e, t);
              n.push(i);
            } else if (t.default || void 0 === t.onUpdateFn)
              n.push(sql`default`);
            else {
              const e = t.onUpdateFn(),
                i = is(e, SQL) ? e : sql.param(e, t);
              n.push(i);
            }
          else n.push(s);
        }
        l.push(n), t < e.length - 1 && l.push(sql`, `);
      }
    }
    const g = this.buildWithCTE(s),
      d = sql.join(l);
    return sql`${g}insert into ${e} ${c} ${!0 === a ? sql`overriding system value ` : void 0}${d}${i ? sql` on conflict ${i}` : void 0}${n ? sql` returning ${this.buildSelection(n, { isSingleTable: !0 })}` : void 0}`;
  }
  buildRefreshMaterializedViewQuery({
    view: e,
    concurrently: t,
    withNoData: i
  }) {
    return sql`refresh materialized view${t ? sql` concurrently` : void 0} ${e}${i ? sql` with no data` : void 0}`;
  }
  prepareTyping(e) {
    return is(e, PgJsonb) || is(e, PgJson)
      ? 'json'
      : is(e, PgNumeric)
        ? 'decimal'
        : is(e, PgTime)
          ? 'time'
          : is(e, PgTimestamp) || is(e, PgTimestampString)
            ? 'timestamp'
            : is(e, PgDate) || is(e, PgDateString)
              ? 'date'
              : is(e, PgUUID)
                ? 'uuid'
                : 'none';
  }
  sqlToQuery(e, t) {
    return e.toQuery({
      casing: this.casing,
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      prepareTyping: this.prepareTyping,
      invokeSource: t
    });
  }
  buildRelationalQueryWithoutPK({
    fullSchema: e,
    schema: t,
    tableNamesMap: i,
    table: n,
    tableConfig: s,
    queryConfig: r,
    tableAlias: a,
    nestedQueryRelation: l,
    joinOn: o
  }) {
    let u,
      c,
      g,
      d = [],
      m = [];
    const h = [];
    if (!0 === r) {
      d = Object.entries(s.columns).map(([e, t]) => ({
        dbKey: t.name,
        tsKey: e,
        field: aliasedTableColumn(t, a),
        relationTableTsKey: void 0,
        isJson: !1,
        selection: []
      }));
    } else {
      const n = Object.fromEntries(
        Object.entries(s.columns).map(([e, t]) => [e, aliasedTableColumn(t, a)])
      );
      if (r.where) {
        const e =
          'function' == typeof r.where
            ? r.where(n, {
                and: and,
                between: between,
                eq: eq,
                exists: exists,
                gt: gt,
                gte: gte,
                ilike: ilike,
                inArray: inArray,
                isNull: isNull,
                isNotNull: isNotNull,
                like: like,
                lt: lt,
                lte: lte,
                ne: ne,
                not: not,
                notBetween: notBetween,
                notExists: notExists,
                notLike: notLike,
                notIlike: notIlike,
                notInArray: notInArray,
                or: or,
                sql: sql
              })
            : r.where;
        g = e && mapColumnsInSQLToAlias(e, a);
      }
      const l = [];
      let o = [];
      if (r.columns) {
        let e = !1;
        for (const [t, i] of Object.entries(r.columns))
          void 0 !== i &&
            t in s.columns &&
            (e || !0 !== i || (e = !0), o.push(t));
        o.length > 0 &&
          (o = e
            ? o.filter((e) => !0 === r.columns?.[e])
            : Object.keys(s.columns).filter((e) => !o.includes(e)));
      } else o = Object.keys(s.columns);
      for (const e of o) {
        const t = s.columns[e];
        l.push({ tsKey: e, value: t });
      }
      let f,
        p = [];
      if (
        (r.with &&
          (p = Object.entries(r.with)
            .filter((e) => !!e[1])
            .map(([e, t]) => ({
              tsKey: e,
              queryConfig: t,
              relation: s.relations[e]
            }))),
        r.extras)
      ) {
        f =
          'function' == typeof r.extras ? r.extras(n, { sql: sql }) : r.extras;
        for (const [e, t] of Object.entries(f))
          l.push({ tsKey: e, value: mapColumnsInAliasedSQLToAlias(t, a) });
      }
      for (const { tsKey: e, value: t } of l)
        d.push({
          dbKey: is(t, SQL.Aliased) ? t.fieldAlias : s.columns[e].name,
          tsKey: e,
          field: is(t, Column) ? aliasedTableColumn(t, a) : t,
          relationTableTsKey: void 0,
          isJson: !1,
          selection: []
        });
      let b =
        'function' == typeof r.orderBy
          ? r.orderBy(n, { sql: sql, asc: asc, desc: desc })
          : (r.orderBy ?? []);
      Array.isArray(b) || (b = [b]),
        (m = b.map((e) =>
          is(e, Column)
            ? aliasedTableColumn(e, a)
            : mapColumnsInSQLToAlias(e, a)
        )),
        (u = r.limit),
        (c = r.offset);
      for (const { tsKey: n, queryConfig: s, relation: r } of p) {
        const l = normalizeRelation(t, i, r),
          o = i[getTableUniqueName(r.referencedTable)],
          u = `${a}_${n}`,
          c = and(
            ...l.fields.map((e, t) =>
              eq(
                aliasedTableColumn(l.references[t], u),
                aliasedTableColumn(e, a)
              )
            )
          ),
          g = this.buildRelationalQueryWithoutPK({
            fullSchema: e,
            schema: t,
            tableNamesMap: i,
            table: e[o],
            tableConfig: t[o],
            queryConfig: is(r, One)
              ? !0 === s
                ? { limit: 1 }
                : { ...s, limit: 1 }
              : s,
            tableAlias: u,
            joinOn: c,
            nestedQueryRelation: r
          }),
          m = sql`${sql.identifier(u)}.${sql.identifier('data')}`.as(n);
        h.push({
          on: sql`true`,
          table: new Subquery(g.sql, {}, u),
          alias: u,
          joinType: 'left',
          lateral: !0
        }),
          d.push({
            dbKey: n,
            tsKey: n,
            field: m,
            relationTableTsKey: o,
            isJson: !0,
            selection: g.selection
          });
      }
    }
    if (0 === d.length)
      throw new DrizzleError({
        message: `No fields selected for table "${s.tsName}" ("${a}")`
      });
    let f;
    if (((g = and(o, g)), l)) {
      let e = sql`json_build_array(${sql.join(
        d.map(({ field: e, tsKey: t, isJson: i }) =>
          i
            ? sql`${sql.identifier(`${a}_${t}`)}.${sql.identifier('data')}`
            : is(e, SQL.Aliased)
              ? e.sql
              : e
        ),
        sql`, `
      )})`;
      is(l, Many) &&
        (e = sql`coalesce(json_agg(${e}${m.length > 0 ? sql` order by ${sql.join(m, sql`, `)}` : void 0}), '[]'::json)`);
      const t = [
        {
          dbKey: 'data',
          tsKey: 'data',
          field: e.as('data'),
          isJson: !0,
          relationTableTsKey: s.tsName,
          selection: d
        }
      ];
      void 0 !== u || void 0 !== c || m.length > 0
        ? ((f = this.buildSelectQuery({
            table: aliasedTable(n, a),
            fields: {},
            fieldsFlat: [{ path: [], field: sql.raw('*') }],
            where: g,
            limit: u,
            offset: c,
            orderBy: m,
            setOperators: []
          })),
          (g = void 0),
          (u = void 0),
          (c = void 0),
          (m = []))
        : (f = aliasedTable(n, a)),
        (f = this.buildSelectQuery({
          table: is(f, PgTable) ? f : new Subquery(f, {}, a),
          fields: {},
          fieldsFlat: t.map(({ field: e }) => ({
            path: [],
            field: is(e, Column) ? aliasedTableColumn(e, a) : e
          })),
          joins: h,
          where: g,
          limit: u,
          offset: c,
          orderBy: m,
          setOperators: []
        }));
    } else
      f = this.buildSelectQuery({
        table: aliasedTable(n, a),
        fields: {},
        fieldsFlat: d.map(({ field: e }) => ({
          path: [],
          field: is(e, Column) ? aliasedTableColumn(e, a) : e
        })),
        joins: h,
        where: g,
        limit: u,
        offset: c,
        orderBy: m,
        setOperators: []
      });
    return { tableTsKey: s.tsName, sql: f, selection: d };
  }
}
class SelectionProxyHandler {
  static [e] = 'SelectionProxyHandler';
  config;
  constructor(e) {
    this.config = { ...e };
  }
  get(e, t) {
    if ('_' === t)
      return { ...e._, selectedFields: new Proxy(e._.selectedFields, this) };
    if (t === d)
      return { ...e[d], selectedFields: new Proxy(e[d].selectedFields, this) };
    if ('symbol' == typeof t) return e[t];
    const i = (
      is(e, Subquery)
        ? e._.selectedFields
        : is(e, View)
          ? e[d].selectedFields
          : e
    )[t];
    if (is(i, SQL.Aliased)) {
      if ('sql' === this.config.sqlAliasedBehavior && !i.isSelectionField)
        return i.sql;
      const e = i.clone();
      return (e.isSelectionField = !0), e;
    }
    if (is(i, SQL)) {
      if ('sql' === this.config.sqlBehavior) return i;
      throw new Error(
        `You tried to reference "${t}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
      );
    }
    return is(i, Column)
      ? this.config.alias
        ? new Proxy(
            i,
            new ColumnAliasProxyHandler(
              new Proxy(
                i.table,
                new TableAliasProxyHandler(
                  this.config.alias,
                  this.config.replaceOriginalName ?? !1
                )
              )
            )
          )
        : i
      : 'object' != typeof i || null === i
        ? i
        : new Proxy(i, new SelectionProxyHandler(this.config));
  }
}
class TypedQueryBuilder {
  static [e] = 'TypedQueryBuilder';
  getSelectedFields() {
    return this._.selectedFields;
  }
}
class PgSelectBuilder {
  static [e] = 'PgSelectBuilder';
  fields;
  session;
  dialect;
  withList = [];
  distinct;
  constructor(e) {
    (this.fields = e.fields),
      (this.session = e.session),
      (this.dialect = e.dialect),
      e.withList && (this.withList = e.withList),
      (this.distinct = e.distinct);
  }
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  from(e) {
    const t = !!this.fields;
    let i;
    return (
      (i = this.fields
        ? this.fields
        : is(e, Subquery)
          ? Object.fromEntries(
              Object.keys(e._.selectedFields).map((t) => [t, e[t]])
            )
          : is(e, PgViewBase)
            ? e[d].selectedFields
            : is(e, SQL)
              ? {}
              : getTableColumns(e)),
      void 0 === this.authToken
        ? new PgSelectBase({
            table: e,
            fields: i,
            isPartialSelect: t,
            session: this.session,
            dialect: this.dialect,
            withList: this.withList,
            distinct: this.distinct
          })
        : new PgSelectBase({
            table: e,
            fields: i,
            isPartialSelect: t,
            session: this.session,
            dialect: this.dialect,
            withList: this.withList,
            distinct: this.distinct
          }).setToken(this.authToken)
    );
  }
}
class PgSelectQueryBuilderBase extends TypedQueryBuilder {
  static [e] = 'PgSelectQueryBuilder';
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  constructor({
    table: e,
    fields: t,
    isPartialSelect: i,
    session: n,
    dialect: s,
    withList: r,
    distinct: a
  }) {
    super(),
      (this.config = {
        withList: r,
        table: e,
        fields: { ...t },
        distinct: a,
        setOperators: []
      }),
      (this.isPartialSelect = i),
      (this.session = n),
      (this.dialect = s),
      (this._ = { selectedFields: t }),
      (this.tableName = getTableLikeName(e)),
      (this.joinsNotNullableMap =
        'string' == typeof this.tableName ? { [this.tableName]: !0 } : {});
  }
  createJoin(e) {
    return (t, i) => {
      const n = this.tableName,
        s = getTableLikeName(t);
      if ('string' == typeof s && this.config.joins?.some((e) => e.alias === s))
        throw new Error(`Alias "${s}" is already used in this query`);
      if (
        !this.isPartialSelect &&
        (1 === Object.keys(this.joinsNotNullableMap).length &&
          'string' == typeof n &&
          (this.config.fields = { [n]: this.config.fields }),
        'string' == typeof s && !is(t, SQL))
      ) {
        const e = is(t, Subquery)
          ? t._.selectedFields
          : is(t, View)
            ? t[d].selectedFields
            : t[Table.Symbol.Columns];
        this.config.fields[s] = e;
      }
      if (
        ('function' == typeof i &&
          (i = i(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({
                sqlAliasedBehavior: 'sql',
                sqlBehavior: 'sql'
              })
            )
          )),
        this.config.joins || (this.config.joins = []),
        this.config.joins.push({ on: i, table: t, joinType: e, alias: s }),
        'string' == typeof s)
      )
        switch (e) {
          case 'left':
            this.joinsNotNullableMap[s] = !1;
            break;
          case 'right':
            (this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([e]) => [e, !1])
            )),
              (this.joinsNotNullableMap[s] = !0);
            break;
          case 'inner':
            this.joinsNotNullableMap[s] = !0;
            break;
          case 'full':
            (this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([e]) => [e, !1])
            )),
              (this.joinsNotNullableMap[s] = !1);
        }
      return this;
    };
  }
  leftJoin = this.createJoin('left');
  rightJoin = this.createJoin('right');
  innerJoin = this.createJoin('inner');
  fullJoin = this.createJoin('full');
  createSetOperator(e, t) {
    return (i) => {
      const n = 'function' == typeof i ? i(getPgSetOperators()) : i;
      if (!haveSameKeys(this.getSelectedFields(), n.getSelectedFields()))
        throw new Error(
          'Set operator error (union / intersect / except): selected fields are not the same or are in a different order'
        );
      return (
        this.config.setOperators.push({ type: e, isAll: t, rightSelect: n }),
        this
      );
    };
  }
  union = this.createSetOperator('union', !1);
  unionAll = this.createSetOperator('union', !0);
  intersect = this.createSetOperator('intersect', !1);
  intersectAll = this.createSetOperator('intersect', !0);
  except = this.createSetOperator('except', !1);
  exceptAll = this.createSetOperator('except', !0);
  addSetOperators(e) {
    return this.config.setOperators.push(...e), this;
  }
  where(e) {
    return (
      'function' == typeof e &&
        (e = e(
          new Proxy(
            this.config.fields,
            new SelectionProxyHandler({
              sqlAliasedBehavior: 'sql',
              sqlBehavior: 'sql'
            })
          )
        )),
      (this.config.where = e),
      this
    );
  }
  having(e) {
    return (
      'function' == typeof e &&
        (e = e(
          new Proxy(
            this.config.fields,
            new SelectionProxyHandler({
              sqlAliasedBehavior: 'sql',
              sqlBehavior: 'sql'
            })
          )
        )),
      (this.config.having = e),
      this
    );
  }
  groupBy(...e) {
    if ('function' == typeof e[0]) {
      const t = e[0](
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({
            sqlAliasedBehavior: 'alias',
            sqlBehavior: 'sql'
          })
        )
      );
      this.config.groupBy = Array.isArray(t) ? t : [t];
    } else this.config.groupBy = e;
    return this;
  }
  orderBy(...e) {
    if ('function' == typeof e[0]) {
      const t = e[0](
          new Proxy(
            this.config.fields,
            new SelectionProxyHandler({
              sqlAliasedBehavior: 'alias',
              sqlBehavior: 'sql'
            })
          )
        ),
        i = Array.isArray(t) ? t : [t];
      this.config.setOperators.length > 0
        ? (this.config.setOperators.at(-1).orderBy = i)
        : (this.config.orderBy = i);
    } else {
      const t = e;
      this.config.setOperators.length > 0
        ? (this.config.setOperators.at(-1).orderBy = t)
        : (this.config.orderBy = t);
    }
    return this;
  }
  limit(e) {
    return (
      this.config.setOperators.length > 0
        ? (this.config.setOperators.at(-1).limit = e)
        : (this.config.limit = e),
      this
    );
  }
  offset(e) {
    return (
      this.config.setOperators.length > 0
        ? (this.config.setOperators.at(-1).offset = e)
        : (this.config.offset = e),
      this
    );
  }
  for(e, t = {}) {
    return (this.config.lockingClause = { strength: e, config: t }), this;
  }
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
    return t;
  }
  as(e) {
    return new Proxy(
      new Subquery(this.getSQL(), this.config.fields, e),
      new SelectionProxyHandler({
        alias: e,
        sqlAliasedBehavior: 'alias',
        sqlBehavior: 'error'
      })
    );
  }
  getSelectedFields() {
    return new Proxy(
      this.config.fields,
      new SelectionProxyHandler({
        alias: this.tableName,
        sqlAliasedBehavior: 'alias',
        sqlBehavior: 'error'
      })
    );
  }
  $dynamic() {
    return this;
  }
}
class PgSelectBase extends PgSelectQueryBuilderBase {
  static [e] = 'PgSelect';
  _prepare(e) {
    const {
      session: t,
      config: i,
      dialect: n,
      joinsNotNullableMap: s,
      authToken: r
    } = this;
    if (!t)
      throw new Error(
        'Cannot execute a query on a query builder. Please use a database instance instead.'
      );
    return c.startActiveSpan('drizzle.prepareQuery', () => {
      const a = orderSelectedFields(i.fields),
        l = t.prepareQuery(n.sqlToQuery(this.getSQL()), a, e, !0);
      return (l.joinsNotNullableMap = s), void 0 === r ? l : l.setToken(r);
    });
  }
  prepare(e) {
    return this._prepare(e);
  }
  authToken;
  setToken(e) {
    return (this.authToken = e), this;
  }
  execute = (e) =>
    c.startActiveSpan('drizzle.operation', () =>
      this._prepare().execute(e, this.authToken)
    );
}
function createSetOperator(e, t) {
  return (i, n, ...s) => {
    const r = [n, ...s].map((i) => ({ type: e, isAll: t, rightSelect: i }));
    for (const e of r)
      if (
        !haveSameKeys(i.getSelectedFields(), e.rightSelect.getSelectedFields())
      )
        throw new Error(
          'Set operator error (union / intersect / except): selected fields are not the same or are in a different order'
        );
    return i.addSetOperators(r);
  };
}
!(function (e, t) {
  for (const i of t)
    for (const t of Object.getOwnPropertyNames(i.prototype))
      'constructor' !== t &&
        Object.defineProperty(
          e.prototype,
          t,
          Object.getOwnPropertyDescriptor(i.prototype, t) || Object.create(null)
        );
})(PgSelectBase, [QueryPromise]);
const getPgSetOperators = () => ({
    union: y,
    unionAll: P,
    intersect: S,
    intersectAll: w,
    except: C,
    exceptAll: T
  }),
  y = createSetOperator('union', !1),
  P = createSetOperator('union', !0),
  S = createSetOperator('intersect', !1),
  w = createSetOperator('intersect', !0),
  C = createSetOperator('except', !1),
  T = createSetOperator('except', !0);
class QueryBuilder {
  static [e] = 'PgQueryBuilder';
  dialect;
  dialectConfig;
  constructor(e) {
    (this.dialect = is(e, PgDialect) ? e : void 0),
      (this.dialectConfig = is(e, PgDialect) ? void 0 : e);
  }
  $with(e) {
    const t = this;
    return {
      as: (i) => (
        'function' == typeof i && (i = i(t)),
        new Proxy(
          new WithSubquery(i.getSQL(), i.getSelectedFields(), e, !0),
          new SelectionProxyHandler({
            alias: e,
            sqlAliasedBehavior: 'alias',
            sqlBehavior: 'error'
          })
        )
      )
    };
  }
  with(...e) {
    const t = this;
    return {
      select: function (i) {
        return new PgSelectBuilder({
          fields: i ?? void 0,
          session: void 0,
          dialect: t.getDialect(),
          withList: e
        });
      },
      selectDistinct: function (e) {
        return new PgSelectBuilder({
          fields: e ?? void 0,
          session: void 0,
          dialect: t.getDialect(),
          distinct: !0
        });
      },
      selectDistinctOn: function (e, i) {
        return new PgSelectBuilder({
          fields: i ?? void 0,
          session: void 0,
          dialect: t.getDialect(),
          distinct: { on: e }
        });
      }
    };
  }
  select(e) {
    return new PgSelectBuilder({
      fields: e ?? void 0,
      session: void 0,
      dialect: this.getDialect()
    });
  }
  selectDistinct(e) {
    return new PgSelectBuilder({
      fields: e ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: !0
    });
  }
  selectDistinctOn(e, t) {
    return new PgSelectBuilder({
      fields: t ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: { on: e }
    });
  }
  getDialect() {
    return (
      this.dialect || (this.dialect = new PgDialect(this.dialectConfig)),
      this.dialect
    );
  }
}
class PgSequence {
  constructor(e, t, i) {
    (this.seqName = e), (this.seqOptions = t), (this.schema = i);
  }
  static [e] = 'PgSequence';
}
const B = Symbol.for('drizzle:PgViewConfig');
class DefaultViewBuilderCore {
  constructor(e, t) {
    (this.name = e), (this.schema = t);
  }
  static [e] = 'PgDefaultViewBuilderCore';
  config = {};
  with(e) {
    return (this.config.with = e), this;
  }
}
class ViewBuilder extends DefaultViewBuilderCore {
  static [e] = 'PgViewBuilder';
  as(e) {
    'function' == typeof e && (e = e(new QueryBuilder()));
    const t = new SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: 'error',
        sqlAliasedBehavior: 'alias',
        replaceOriginalName: !0
      }),
      i = new Proxy(e.getSelectedFields(), t);
    return new Proxy(
      new PgView({
        pgConfig: this.config,
        config: {
          name: this.name,
          schema: this.schema,
          selectedFields: i,
          query: e.getSQL().inlineParams()
        }
      }),
      t
    );
  }
}
class ManualViewBuilder extends DefaultViewBuilderCore {
  static [e] = 'PgManualViewBuilder';
  columns;
  constructor(e, t, i) {
    super(e, i), (this.columns = getTableColumns(pgTable(e, t)));
  }
  existing() {
    return new Proxy(
      new PgView({
        pgConfig: void 0,
        config: {
          name: this.name,
          schema: this.schema,
          selectedFields: this.columns,
          query: void 0
        }
      }),
      new SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: 'error',
        sqlAliasedBehavior: 'alias',
        replaceOriginalName: !0
      })
    );
  }
  as(e) {
    return new Proxy(
      new PgView({
        pgConfig: this.config,
        config: {
          name: this.name,
          schema: this.schema,
          selectedFields: this.columns,
          query: e.inlineParams()
        }
      }),
      new SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: 'error',
        sqlAliasedBehavior: 'alias',
        replaceOriginalName: !0
      })
    );
  }
}
class MaterializedViewBuilderCore {
  constructor(e, t) {
    (this.name = e), (this.schema = t);
  }
  static [e] = 'PgMaterializedViewBuilderCore';
  config = {};
  using(e) {
    return (this.config.using = e), this;
  }
  with(e) {
    return (this.config.with = e), this;
  }
  tablespace(e) {
    return (this.config.tablespace = e), this;
  }
  withNoData() {
    return (this.config.withNoData = !0), this;
  }
}
class MaterializedViewBuilder extends MaterializedViewBuilderCore {
  static [e] = 'PgMaterializedViewBuilder';
  as(e) {
    'function' == typeof e && (e = e(new QueryBuilder()));
    const t = new SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: 'error',
        sqlAliasedBehavior: 'alias',
        replaceOriginalName: !0
      }),
      i = new Proxy(e.getSelectedFields(), t);
    return new Proxy(
      new PgMaterializedView({
        pgConfig: {
          with: this.config.with,
          using: this.config.using,
          tablespace: this.config.tablespace,
          withNoData: this.config.withNoData
        },
        config: {
          name: this.name,
          schema: this.schema,
          selectedFields: i,
          query: e.getSQL().inlineParams()
        }
      }),
      t
    );
  }
}
class ManualMaterializedViewBuilder extends MaterializedViewBuilderCore {
  static [e] = 'PgManualMaterializedViewBuilder';
  columns;
  constructor(e, t, i) {
    super(e, i), (this.columns = getTableColumns(pgTable(e, t)));
  }
  existing() {
    return new Proxy(
      new PgMaterializedView({
        pgConfig: {
          tablespace: this.config.tablespace,
          using: this.config.using,
          with: this.config.with,
          withNoData: this.config.withNoData
        },
        config: {
          name: this.name,
          schema: this.schema,
          selectedFields: this.columns,
          query: void 0
        }
      }),
      new SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: 'error',
        sqlAliasedBehavior: 'alias',
        replaceOriginalName: !0
      })
    );
  }
  as(e) {
    return new Proxy(
      new PgMaterializedView({
        pgConfig: {
          tablespace: this.config.tablespace,
          using: this.config.using,
          with: this.config.with,
          withNoData: this.config.withNoData
        },
        config: {
          name: this.name,
          schema: this.schema,
          selectedFields: this.columns,
          query: e.inlineParams()
        }
      }),
      new SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: 'error',
        sqlAliasedBehavior: 'alias',
        replaceOriginalName: !0
      })
    );
  }
}
class PgView extends PgViewBase {
  static [e] = 'PgView';
  [B];
  constructor({ pgConfig: e, config: t }) {
    super(t), e && (this[B] = { with: e.with });
  }
}
const q = Symbol.for('drizzle:PgMaterializedViewConfig');
class PgMaterializedView extends PgViewBase {
  static [e] = 'PgMaterializedView';
  [q];
  constructor({ pgConfig: e, config: t }) {
    super(t),
      (this[q] = {
        with: e?.with,
        using: e?.using,
        tablespace: e?.tablespace,
        withNoData: e?.withNoData
      });
  }
}
class PgSchema {
  constructor(e) {
    this.schemaName = e;
  }
  static [e] = 'PgSchema';
  table = (e, t, i) => pgTableWithSchema(e, t, i, this.schemaName);
  view = (e, t) =>
    (function (e, t, i) {
      return t ? new ManualViewBuilder(e, t, i) : new ViewBuilder(e, i);
    })(e, t, this.schemaName);
  materializedView = (e, t) =>
    (function (e, t, i) {
      return t
        ? new ManualMaterializedViewBuilder(e, t, i)
        : new MaterializedViewBuilder(e, i);
    })(e, t, this.schemaName);
  enum = (e, t) =>
    (function (e, t, i) {
      const n = Object.assign((e) => new PgEnumColumnBuilder(e ?? '', n), {
        enumName: e,
        enumValues: t,
        schema: i,
        [g]: !0
      });
      return n;
    })(e, t, this.schemaName);
  sequence = (e, t) =>
    (function (e, t, i) {
      return new PgSequence(e, t, i);
    })(e, t, this.schemaName);
  getSQL() {
    return new SQL([sql.identifier(this.schemaName)]);
  }
  shouldOmitSQLParens() {
    return !0;
  }
}
function pgSchema(e) {
  if ('public' === e)
    throw new Error(
      "You can't specify 'public' as schema name. Postgres is using public schema by default. If you want to use 'public' schema, just use pgTable() instead of creating a schema"
    );
  return new PgSchema(e);
}
const v = pgSchema('cache'),
  N = v.table('company_cache', {
    updatedAt: timestamp('updated_at', { withTimezone: !0 })
      .notNull()
      .defaultNow(),
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    oneLiner: text('one_liner'),
    excerpt: text('excerpt'),
    content: text('content'),
    domain: text('domain'),
    needsWww: boolean('needs_www'),
    serplyLink: text('serply_link'),
    features: jsonb('features'),
    pros: text('pros').array(),
    cons: text('cons').array(),
    faqs: jsonb('faqs'),
    alternatives: jsonb('alternatives'),
    categories: jsonb('categories'),
    logo: text('logo'),
    screenshots: jsonb('screenshots'),
    rating: doublePrecision('rating'),
    upvotes: integer('upvotes'),
    downvotes: integer('downvotes'),
    featured: boolean('featured'),
    featuredOrder: integer('featured_order')
  }),
  x = v.table('company_category_cache', {
    updatedAt: timestamp('updated_at', { withTimezone: !0 })
      .notNull()
      .defaultNow(),
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull()
  }),
  $ = v.table('post_cache', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: !0 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: !0 })
      .notNull()
      .defaultNow(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    excerpt: varchar('excerpt', { length: 255 }),
    content: text('content').notNull(),
    featuredImage: varchar('featured_image', { length: 255 }),
    author: varchar('author', { length: 255 }),
    categories: jsonb('categories'),
    oneLiner: text('one_liner'),
    videoId: varchar('video_id', { length: 255 }),
    relatedPosts: jsonb('related_posts'),
    module: varchar('module', { length: 255 }),
    keyword: varchar('keyword', { length: 255 })
  }),
  j = v.table('post_category_cache', {
    id: serial('id').primaryKey(),
    updatedAt: timestamp('updated_at', { withTimezone: !0 })
      .notNull()
      .defaultNow(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull()
  }),
  L = v.table('boxer_cache', {
    lastUpdated: timestamp('last_updated', { withTimezone: !0 })
      .notNull()
      .defaultNow(),
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }),
    slug: varchar('slug', { length: 255 }),
    birthName: varchar('birth_name', { length: 255 }),
    career: varchar('career', { length: 255 }),
    debut: varchar('debut', { length: 255 }),
    status: varchar('status', { length: 50 }),
    gender: varchar('gender', { length: 10 }),
    nationality: varchar('nationality', { length: 255 }),
    residence: varchar('residence', { length: 255 }),
    nicknames: jsonb('nicknames'),
    stance: varchar('stance', { length: 255 }),
    birthPlace: varchar('birth_place', { length: 255 }),
    heightCm: doublePrecision('height_cm'),
    reachCm: doublePrecision('reach_cm'),
    division: jsonb('division'),
    content: text('content'),
    numWins: integer('num_wins'),
    numDraws: integer('num_draws'),
    numLosses: integer('num_losses'),
    bouts: jsonb('bouts')
  }),
  A = v.table('weight_class_cache', {
    lastUpdated: timestamp('last_updated', { withTimezone: !0 })
      .notNull()
      .defaultNow(),
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }),
    slug: varchar('slug', { length: 255 })
  }),
  Q = pgSchema('mapping'),
  D = Q.table('mb_metadata_cache', {
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    artists: jsonb('artists').notNull(),
    tags: text('tags').array().notNull(),
    genres: text('genres').array().notNull(),
    releaseGroup: jsonb('release_group'),
    releaseGroupSlug: text('release_group_slug'),
    length: integer('length'),
    artistRels: jsonb('artist_rels'),
    urlRels: jsonb('url_rels'),
    workRels: jsonb('work_rels'),
    workUrlRels: jsonb('work_url_rels'),
    recordingRels: jsonb('recording_rels'),
    recordingReverseRels: jsonb('recording_reverse_rels'),
    seriesRels: jsonb('series_rels'),
    areaRels: jsonb('area_rels'),
    eventRels: jsonb('event_rels'),
    labelRels: jsonb('label_rels'),
    placeRels: jsonb('place_rels'),
    wikidata: jsonb('wikidata'),
    workWikidata: jsonb('work_wikidata'),
    lyrics: text('lyrics'),
    lyricsAnnotations: jsonb('lyrics_annotations'),
    lyricsSync: jsonb('lyrics_sync'),
    overview: text('overview'),
    seoDescription: text('seo_description'),
    seoTitle: text('seo_title')
  }),
  O = Q.table('mb_release_group_cache', {
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    type: text('type').notNull(),
    secondaryTypes: text('secondary_types').array(),
    date: text('date').notNull(),
    coverArt: jsonb('cover_art'),
    tags: text('tags').array().notNull(),
    genres: text('genres').array().notNull(),
    artists: jsonb('artists').notNull(),
    recordings: jsonb('recordings').notNull(),
    mediums: jsonb('mediums').notNull(),
    artistRels: jsonb('artist_rels'),
    urlRels: jsonb('url_rels'),
    eventRels: jsonb('event_rels'),
    releaseGroupRels: jsonb('release_group_rels'),
    releaseGroupReverseRels: jsonb('release_group_reverse_rels'),
    seriesRels: jsonb('series_rels'),
    wikidata: jsonb('wikidata'),
    overview: text('overview'),
    seoDescription: text('seo_description'),
    seoTitle: text('seo_title')
  }),
  V = Q.table('mb_artist_metadata_cache', {
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    beginDate: text('begin_date'),
    endDate: text('end_date'),
    artistType: text('artist_type'),
    gender: text('gender'),
    area: text('area'),
    beginArea: text('begin_area'),
    endArea: text('end_area'),
    tags: text('tags').array().notNull(),
    genres: text('genres').array().notNull(),
    releaseGroups: jsonb('release_groups').notNull(),
    urlRels: jsonb('url_rels'),
    artistRels: jsonb('artist_rels'),
    artistReverseRels: jsonb('artist_reverse_rels'),
    eventRels: jsonb('event_rels'),
    labelRels: jsonb('label_rels'),
    placeRels: jsonb('place_rels'),
    seriesRels: jsonb('series_rels'),
    wikidata: jsonb('wikidata'),
    overview: text('overview'),
    seoDescription: text('seo_description'),
    seoTitle: text('seo_title')
  }),
  _ = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boxerCache: L,
        cacheSchema: v,
        companyCache: N,
        companyCategoryCache: x,
        mappingSchema: Q,
        mbArtistMetadataCache: V,
        mbMetadataCache: D,
        mbReleaseGroupCache: O,
        postCache: $,
        postCategoryCache: j,
        weightClassCache: A
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  );
export {
  TransactionRollbackError as A,
  fillPlaceholders as B,
  n as C,
  mapResultRow as D,
  isConfig as E,
  PgDialect as F,
  extractTablesRelationalConfig as G,
  createTableRelationsHelpers as H,
  _ as I,
  and as J,
  Param as P,
  QueryPromise as Q,
  SQL as S,
  Table as T,
  d as V,
  WithSubquery as W,
  V as a,
  L as b,
  x as c,
  N as d,
  eq as e,
  j as f,
  D as g,
  desc as h,
  asc as i,
  e as j,
  is as k,
  QueryBuilder as l,
  O as m,
  haveSameKeys as n,
  orderSelectedFields as o,
  $ as p,
  mapUpdateSet as q,
  getTableLikeName as r,
  sql as s,
  c as t,
  PgTable as u,
  Subquery as v,
  A as w,
  SelectionProxyHandler as x,
  mapRelationalRow as y,
  PgSelectBuilder as z
};
//# sourceMappingURL=schema.mjs.map
