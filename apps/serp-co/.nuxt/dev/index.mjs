import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { getRequestHeader, splitCookiesString, setResponseStatus, setResponseHeader, send, getRequestHeaders, defineEventHandler, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, eventHandler, getResponseStatus, setResponseHeaders, setHeaders, sendRedirect, proxyRequest, createError, getRequestHost, getRequestProtocol, getQuery as getQuery$1, getResponseHeaders, getResponseHeader, removeResponseHeader, setHeader, getHeader, readBody, handleCors, getRequestIP, readMultipartFormData, getRequestURL, lazyEventHandler, useBase, createApp, createRouter as createRouter$1, toNodeListener, getRouterParam, getResponseStatusText } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/h3@1.15.0/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import fs, { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parentPort, threadId } from 'node:worker_threads';
import { eq, sql, and } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle-orm/index.js';
import { faker } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@faker-js+faker@9.5.0/node_modules/@faker-js/faker/dist/index.js';
import { drizzle } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle-orm/postgres-js/index.js';
import postgres from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/postgres@3.4.5/node_modules/postgres/src/index.js';
import { pgSchema, varchar, jsonb, text, timestamp, serial, integer, doublePrecision, boolean } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/drizzle-orm@0.36.4_postgres@3.4.5/node_modules/drizzle-orm/pg-core/index.js';
import { isVNode, toValue, getCurrentInstance, useSSRContext, unref, version } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/vue@3.5.13_typescript@5.7.3/node_modules/vue/index.mjs';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/vue-bundle-renderer@2.1.1/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify as stringify$1, uneval } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/devalue@5.1.1/node_modules/devalue/index.js';
import destr from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import { withQuery, joinURL, withTrailingSlash, parseURL, withoutBase, getQuery, joinRelativeURL, hasProtocol, withHttps, withoutProtocol, withoutTrailingSlash, withLeadingSlash, withBase, parsePath, parseQuery, stringifyQuery, encodePath, stringifyParsedURL, withoutLeadingSlash } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/vue@3.5.13_typescript@5.7.3/node_modules/vue/server-renderer/index.mjs';
import { propsToString, renderSSRHead } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@unhead+ssr@1.11.18/node_modules/@unhead/ssr/dist/index.mjs';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/unhead@1.11.18/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@unhead+shared@1.11.18/node_modules/@unhead/shared/dist/index.mjs';
import defu, { defuFn, createDefu, defu as defu$1 } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { consola, createConsola } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/consola@3.4.0/node_modules/consola/dist/index.mjs';
import { createHooks } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { $fetch as $fetch$1, createFetch as createFetch$1, Headers as Headers$1 } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/unenv@1.10.0/node_modules/unenv/runtime/fetch/index.mjs';
import { klona } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import { snakeCase } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/unstorage@1.14.4_db0@0.2.4_ioredis@5.5.0/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/unstorage@1.14.4_db0@0.2.4_ioredis@5.5.0/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47lru_45cache from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/unstorage@1.14.4_db0@0.2.4_ioredis@5.5.0/node_modules/unstorage/drivers/lru-cache.mjs';
import { getContext } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/errx@0.1.0/node_modules/errx/dist/index.js';
import devalue from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxt+devalue@2.0.2/node_modules/@nuxt/devalue/dist/devalue.mjs';
import { format, CacheControl } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@tusbar+cache-control@1.0.2/node_modules/@tusbar/cache-control/dist/cache-control.modern.js';
import redisDriver from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/unstorage@1.14.4_db0@0.2.4_ioredis@5.5.0/node_modules/unstorage/drivers/redis.mjs';
import chalk from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/index.js';
import { HtmlValidate, formatterFactory } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/html-validate@8.18.2_vitest@2.1.9/node_modules/html-validate/dist/es/index.js';
import { webcrypto } from 'node:crypto';
import Fuse from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/fuse.js@7.1.0/node_modules/fuse.js/dist/fuse.mjs';
import { resolve as resolve$1, basename, isAbsolute } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/pathe@1.1.2/node_modules/pathe/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import { diffLines } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/diff@7.0.0/node_modules/diff/lib/index.mjs';
import MagicString from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/magic-string@0.30.17/node_modules/magic-string/dist/magic-string.es.mjs';
import { hash } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/ohash@1.1.4/node_modules/ohash/dist/index.mjs';
import { FilterXSS } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/xss@1.0.15/node_modules/xss/lib/index.js';
import { getIcons } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@iconify+utils@2.3.0/node_modules/@iconify/utils/lib/index.mjs';
import { collections } from 'file:///Users/devin/repos/projects/serp-monorepo/apps/serp-co/.nuxt/nuxt-icon-server-bundle.mjs';
import { fileURLToPath } from 'node:url';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/ipx@2.1.0/node_modules/ipx/dist/index.mjs';

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const script$1 = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _cx8Gfki5nK = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script$1}<\/script>`);
  });
});

const rootDir = "/Users/devin/repos/projects/serp-monorepo/apps/serp-co";

const appHead = {"link":[],"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"},{"property":"og:image","content":"og-image.png"},{"property":"og:image:type","content":"image/png"},{"property":"og:image:width","content":"2662"},{"property":"og:image:height","content":"664"},{"name":"twitter:image","content":"og-image.png"},{"name":"twitter:image:type","content":"image/png"},{"name":"twitter:image:width","content":"2662"},{"name":"twitter:image:height","content":"664"},{"property":"og:type","content":"website"}],"style":[],"script":[],"noscript":[],"title":"SERP","htmlAttrs":{"lang":"en"}};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt","class":"isolate"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _sLJvirkz7d = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify$1(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola.wrapConsole();
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral"
    },
    button: {
      slots: {
        base: [
          "rounded-none font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
          "transition-colors"
        ]
      }
    },
    textarea: {
      slots: {
        base: [
          "w-full rounded-none border-0 placeholder:text-[var(--ui-text-dimmed)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors"
        ]
      }
    }
  }
});

const appConfig1 = defineAppConfig({
  myLayer: {
    name: "@serp/ui"
  }
});

const appConfig2 = defineAppConfig({
  myLayer: {
    name: "@serp/types"
  }
});

const appConfig3 = defineAppConfig({
  myLayer: {
    name: "@serp/utils"
  }
});

const appConfig4 = defineAppConfig({
  myLayer: {
    name: "@serp/tools"
  }
});

const inlineAppConfig = {
  "nuxt": {},
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "ellipsis": "i-lucide-ellipsis",
      "external": "i-lucide-arrow-up-right",
      "loading": "i-lucide-refresh-cw",
      "minus": "i-lucide-minus",
      "plus": "i-lucide-plus",
      "search": "i-lucide-search"
    }
  },
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "components",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons",
      "custom"
    ],
    "fetchTimeout": 1500
  }
};

const appConfig = defuFn(appConfig0, appConfig1, appConfig2, appConfig3, appConfig4, inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/__nuxt_ui__/**": {
        "ssr": false
      },
      "/sitemap.xsl": {
        "headers": {
          "Content-Type": "application/xslt+xml"
        }
      },
      "/sitemap.xml": {
        "redirect": {
          "to": "/sitemap_index.xml",
          "statusCode": 307
        }
      },
      "/sitemap_index.xml": {},
      "/__sitemap__/modules.xml": {},
      "/modules-sitemap.xml": {
        "redirect": {
          "to": "/__sitemap__/modules.xml",
          "statusCode": 307
        }
      },
      "/__sitemap__/company.xml": {},
      "/company-sitemap.xml": {
        "redirect": {
          "to": "/__sitemap__/company.xml",
          "statusCode": 307
        }
      },
      "/__sitemap__/company-categories.xml": {},
      "/company-categories-sitemap.xml": {
        "redirect": {
          "to": "/__sitemap__/company-categories.xml",
          "statusCode": 307
        }
      },
      "/__sitemap__/posts.xml": {},
      "/posts-sitemap.xml": {
        "redirect": {
          "to": "/__sitemap__/posts.xml",
          "statusCode": 307
        }
      },
      "/__sitemap__/post-categories.xml": {},
      "/post-categories-sitemap.xml": {
        "redirect": {
          "to": "/__sitemap__/post-categories.xml",
          "statusCode": 307
        }
      },
      "/__sitemap__/glossary.xml": {},
      "/glossary-sitemap.xml": {
        "redirect": {
          "to": "/__sitemap__/glossary.xml",
          "statusCode": 307
        }
      },
      "/__sitemap__/blog.xml": {},
      "/blog-sitemap.xml": {
        "redirect": {
          "to": "/__sitemap__/blog.xml",
          "statusCode": 307
        }
      },
      "/**": {
        "headers": {
          "Referrer-Policy": "no-referrer",
          "Strict-Transport-Security": "max-age=15552000; includeSubDomains;",
          "X-Content-Type-Options": "nosniff",
          "X-Download-Options": "noopen",
          "X-Frame-Options": "SAMEORIGIN",
          "X-Permitted-Cross-Domain-Policies": "none",
          "X-XSS-Protection": "0"
        }
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        },
        "cache": {
          "maxAge": 31536000
        }
      },
      "/_scripts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        },
        "cache": {
          "maxAge": 31536000
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "siteName": "SERP",
    "domain": "serp.co",
    "siteUrl": "https://staging.serp.co",
    "apiUrl": "/api",
    "environment": "development",
    "socialLinks": [
      {
        "name": "Twitter",
        "href": "https://serp.ly/@serp/twitter",
        "icon": "i-lucide-twitter"
      },
      {
        "name": "Facebook",
        "href": "https://serp.ly/@serp/facebook",
        "icon": "i-lucide-facebook"
      },
      {
        "name": "LinkedIn",
        "href": "https://serp.ly/@serp/linkedin",
        "icon": "i-lucide-linkedin"
      },
      {
        "name": "YouTube",
        "href": "https://serp.ly/@serp/youtube",
        "icon": "i-lucide-youtube"
      },
      {
        "name": "Github",
        "href": "https://serp.ly/@serpai/github",
        "icon": "i-lucide-github"
      },
      {
        "name": "Instagram",
        "href": "https://serp.ly/@serp/instagram",
        "icon": "i-lucide-instagram"
      },
      {
        "name": "SoundCloud",
        "href": "https://serp.ly/@serp/",
        "icon": "i-lucide-external-link"
      }
    ],
    "brandLinks": [
      {
        "name": "About",
        "href": "https://github.com/serpcompany"
      },
      {
        "name": "Add Your Product",
        "href": "https://serp.ly/@serp/submit"
      }
    ],
    "headerNavItems": [
      {
        "label": "Companies",
        "children": [
          {
            "label": "Companies",
            "to": "/reviews/"
          }
        ]
      },
      {
        "label": "Tools",
        "children": [
          {
            "label": "Tools",
            "to": "/tools/"
          },
          {
            "label": "Combine CSVs",
            "to": "/tools/combine-csv-files/"
          },
          {
            "label": "JSON to CSV",
            "to": "/tools/convert-json-to-csv/"
          },
          {
            "label": "Character Counter",
            "to": "/tools/count-characters/"
          },
          {
            "label": "Paragraph Counter",
            "to": "/tools/paragraph-counter/"
          }
        ]
      },
      {
        "label": "Glossary",
        "children": [
          {
            "label": "Glossary",
            "to": "/glossary/"
          }
        ]
      },
      {
        "label": "Posts",
        "children": [
          {
            "label": "Posts",
            "to": "/posts/"
          }
        ]
      }
    ],
    "footerColumns": [
      {
        "title": "Links",
        "id": 1,
        "slug": "",
        "items": [
          {
            "text": "Companies",
            "slug": "/reviews/"
          },
          {
            "text": "Tools",
            "slug": "/tools/"
          },
          {
            "text": "Posts",
            "slug": "/posts/"
          },
          {
            "text": "Glossary",
            "slug": "/glossary/"
          }
        ]
      }
    ],
    "legalLinks": [
      {
        "text": "Privacy",
        "slug": "/legal/privacy-policy/"
      },
      {
        "text": "Terms",
        "slug": "/legal/terms-conditions/"
      },
      {
        "text": "Affiliate Disclosure",
        "slug": "/legal/affiliate-disclosure/"
      },
      {
        "text": "DMCA",
        "slug": "/legal/dmca/"
      }
    ],
    "copyrightText": "© SERP",
    "address": "123 Rank St. Page One City, 90210 USA",
    "nuxt-schema-org": {
      "reactive": true,
      "minify": false,
      "scriptAttributes": {
        "id": "schema-org-graph"
      },
      "identity": "Organization",
      "version": "3.4.7"
    },
    "nuxt-link-checker": {
      "version": "3.2.0",
      "hasSitemapModule": true,
      "rootDir": "/Users/devin/repos/projects/serp-monorepo/apps/serp-co",
      "isNuxtContentDocumentDriven": false,
      "excludeLinks": [],
      "skipInspections": [],
      "fetchTimeout": 10000,
      "showLiveInspections": false,
      "fetchRemoteUrls": false
    },
    "nuxt-seo": {
      "canonicalQueryWhitelist": [
        "page",
        "sort",
        "filter",
        "search",
        "q",
        "category",
        "tag"
      ]
    },
    "nuxt-scripts": {
      "version": "0.9.5",
      "defaultScriptOptions": {
        "trigger": "onNuxtReady"
      }
    }
  },
  "sitemap": {
    "isI18nMapped": false,
    "sitemapName": "sitemap.xml",
    "isMultiSitemap": true,
    "excludeAppSources": [],
    "cacheMaxAgeSeconds": 0,
    "autoLastmod": false,
    "defaultSitemapsChunkSize": 1000,
    "minify": false,
    "sortEntries": true,
    "debug": false,
    "discoverImages": true,
    "discoverVideos": true,
    "sitemapsPathPrefix": "/__sitemap__/",
    "isNuxtContentDocumentDriven": false,
    "xsl": "/__sitemap__/style.xsl",
    "xslTips": true,
    "xslColumns": [
      {
        "label": "URL",
        "width": "50%"
      },
      {
        "label": "Images",
        "width": "25%",
        "select": "count(image:image)"
      },
      {
        "label": "Last Updated",
        "width": "25%",
        "select": "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"
      }
    ],
    "credits": true,
    "version": "6.1.5",
    "sitemaps": {
      "index": {
        "sitemapName": "index",
        "_route": "sitemap_index.xml",
        "sitemaps": [],
        "include": [],
        "exclude": []
      },
      "modules": {
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "includeAppSources": true,
        "sitemapName": "modules",
        "_route": "/__sitemap__/modules.xml",
        "_hasSourceChunk": false
      },
      "company": {
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "sitemapName": "company",
        "_route": "/__sitemap__/company.xml",
        "_hasSourceChunk": 1
      },
      "company-categories": {
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "sitemapName": "company-categories",
        "_route": "/__sitemap__/company-categories.xml",
        "_hasSourceChunk": 1
      },
      "posts": {
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "sitemapName": "posts",
        "_route": "/__sitemap__/posts.xml",
        "_hasSourceChunk": 1
      },
      "post-categories": {
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "sitemapName": "post-categories",
        "_route": "/__sitemap__/post-categories.xml",
        "_hasSourceChunk": 1
      },
      "glossary": {
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "sitemapName": "glossary",
        "_route": "/__sitemap__/glossary.xml",
        "_hasSourceChunk": 1
      },
      "blog": {
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "sitemapName": "blog",
        "_route": "/__sitemap__/blog.xml",
        "_hasSourceChunk": 1
      }
    }
  },
  "multiCache": {
    "debug": false,
    "rootDir": "/Users/devin/repos/projects/serp-monorepo/apps/serp-co",
    "cdn": {
      "enabled": false,
      "cacheControlHeader": "Surrogate-Control",
      "cacheTagHeader": "Cache-Tag"
    },
    "component": false,
    "data": true,
    "route": false,
    "api": {
      "enabled": false,
      "prefix": "/__nuxt_multi_cache",
      "cacheTagInvalidationDelay": 60000,
      "authorizationToken": "",
      "authorizationDisabled": false
    }
  },
  "private": {
    "basicAuth": false
  },
  "security": {
    "strict": false,
    "headers": {
      "crossOriginResourcePolicy": "same-origin",
      "crossOriginOpenerPolicy": "same-origin",
      "crossOriginEmbedderPolicy": "unsafe-none",
      "contentSecurityPolicy": {
        "base-uri": [
          "'none'"
        ],
        "font-src": [
          "'self'",
          "https:",
          "data:"
        ],
        "form-action": [
          "'self'"
        ],
        "frame-ancestors": [
          "'self'"
        ],
        "img-src": [
          "'self'",
          "data:",
          "https://*"
        ],
        "object-src": [
          "'none'"
        ],
        "script-src-attr": [
          "'none'"
        ],
        "style-src": [
          "'self'",
          "https:",
          "'unsafe-inline'"
        ],
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'"
        ],
        "upgrade-insecure-requests": true
      },
      "originAgentCluster": "?1",
      "referrerPolicy": "no-referrer",
      "strictTransportSecurity": {
        "maxAge": 15552000,
        "includeSubdomains": true
      },
      "xContentTypeOptions": "nosniff",
      "xDNSPrefetchControl": "off",
      "xDownloadOptions": "noopen",
      "xFrameOptions": "SAMEORIGIN",
      "xPermittedCrossDomainPolicies": "none",
      "xXSSProtection": "0",
      "permissionsPolicy": {
        "camera": [],
        "display-capture": [],
        "fullscreen": [],
        "geolocation": [],
        "microphone": []
      }
    },
    "requestSizeLimiter": {
      "maxRequestSizeInBytes": 2000000,
      "maxUploadFileRequestInBytes": 8000000,
      "throwError": true
    },
    "rateLimiter": {
      "tokensPerInterval": 150,
      "interval": 300000,
      "headers": false,
      "driver": {
        "name": "lruCache"
      },
      "throwError": true
    },
    "xssValidator": {
      "methods": [
        "GET",
        "POST"
      ],
      "throwError": true
    },
    "corsHandler": {
      "origin": "http://localhost:3000",
      "methods": [
        "GET",
        "HEAD",
        "PUT",
        "PATCH",
        "POST",
        "DELETE"
      ],
      "preflight": {
        "statusCode": 204
      }
    },
    "allowedMethodsRestricter": {
      "methods": "*",
      "throwError": true
    },
    "hidePoweredBy": true,
    "enabled": true,
    "csrf": false,
    "nonce": true,
    "removeLoggers": true,
    "ssg": {
      "meta": true,
      "hashScripts": true,
      "hashStyles": false,
      "nitroHeaders": true,
      "exportToPresets": true
    },
    "sri": true
  },
  "icon": {
    "serverKnownCssClasses": []
  },
  "nuxt-scripts": {
    "version": "0.9.5"
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "name": "serp-co",
        "env": "development"
      },
      {
        "_context": "package.json",
        "_priority": -10,
        "name": "@serp-co"
      },
      {
        "_priority": -3,
        "_context": "nuxt-site-config:config",
        "url": "https://staging.serp.co",
        "name": "SERP",
        "trailingSlash": true
      },
      {
        "_context": "buildEnv",
        "_priority": -1,
        "name": "SERP"
      }
    ],
    "version": "2.2.21",
    "debug": false
  },
  "nuxt-robots": {
    "version": "4.1.11",
    "usingNuxtContent": false,
    "debug": false,
    "credits": true,
    "groups": [
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      }
    ],
    "sitemap": [
      "/sitemap_index.xml"
    ],
    "header": true,
    "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "robotsDisabledValue": "noindex, nofollow",
    "cacheControl": "max-age=14400, must-revalidate"
  },
  "nuxt-simple-robots": {
    "version": "4.1.11",
    "usingNuxtContent": false,
    "debug": false,
    "credits": true,
    "groups": [
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      },
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "*"
        ],
        "userAgent": [
          "*"
        ],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "*",
            "allow": true
          }
        ]
      }
    ],
    "sitemap": [
      "/sitemap_index.xml"
    ],
    "header": true,
    "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "robotsDisabledValue": "noindex, nofollow",
    "cacheControl": "max-age=14400, must-revalidate"
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": [
        "/Users/devin/repos/projects/serp-monorepo/apps/serp-co/public"
      ]
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  if (!event) {
    return _sharedAppConfig;
  }
  if (event.context.nitro.appConfig) {
    return event.context.nitro.appConfig;
  }
  const appConfig$1 = klona(appConfig);
  event.context.nitro.appConfig = appConfig$1;
  return appConfig$1;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function defineNitroPlugin(def) {
  return def;
}

const serverAssets = [{"baseName":"server","dir":"/Users/devin/repos/projects/serp-monorepo/apps/serp-co/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage$1 = createStorage({});

storage$1.mount('/assets', assets);

storage$1.mount('#rate-limiter-storage', unstorage_47drivers_47lru_45cache({"driver":"lruCache"}));
storage$1.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/devin/repos/projects/serp-monorepo/apps/serp-co","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/devin/repos/projects/serp-monorepo/apps/serp-co/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/devin/repos/projects/serp-monorepo/apps/serp-co/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/devin/repos/projects/serp-monorepo/apps/serp-co/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/devin/repos/projects/serp-monorepo/apps/serp-co/.data/kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage$1, base) : storage$1;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config$1.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),s=new Proxy(r,{get(e,o){return i()[o]??r[o]},has(e,o){const E=i();return o in E||o in r},set(e,o,E){const b=i(true);return b[o]=E,true},deleteProperty(e,o){if(!o)return  false;const E=i(true);return delete E[o],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",B=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function p(){if(globalThis.process?.env)for(const e of B){const o=e[1]||e[0];if(globalThis.process?.env[o])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=p(),d=l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(s.CI)||l.ci!==false,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(s.DEBUG);const A=t==="test"||n(s.TEST);n(s.MINIMAL)||T||A||!R;const _=/^win/i.test(I);!n(s.NO_COLOR)&&(n(s.FORCE_COLOR)||(R||_)&&s.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const y=globalThis.process||Object.create(null),c={versions:{}};new Proxy(y,{get(e,o){if(o==="env")return s;if(o in e)return e[o];if(o in c)return c[o]}});const L=globalThis.process?.release?.name==="node",a=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,O=!!globalThis.fastly,S=!!globalThis.Netlify,N=!!globalThis.EdgeRuntime,P=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[N,"edge-light"],[P,"workerd"],[O,"fastly"],[D,"deno"],[a,"bun"],[L,"node"]];function G(){const e=F.find(o=>o[0]);if(e)return {name:e[1]}}const u=G();u?.name||"";

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

function useMultiCacheApp() {
  const app = useNitroApp();
  return app.multiCache;
}

const defuReplaceArray = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) || Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});

function getSiteIndexable(e) {
  const { env, indexable } = useSiteConfig(e);
  if (typeof indexable !== "undefined")
    return String(indexable) === "true";
  return env === "production";
}

function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  if (typeof config.trailingSlash !== "undefined" && !config.trailingSlash)
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(config.url, { acceptRelative: true, strict: false }))
    config.url = withHttps(config.url);
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0)
      return;
    if (!input._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2].split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      input._context = lastFunctionName;
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = val;
    }
    if (Object.keys(entry).filter((k) => !k.startsWith("_")).length > 0)
      stack.push(entry);
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined") {
          siteConfig[k] = val;
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

function envSiteConfig(env) {
  return Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith("NUXT_SITE_") || k.startsWith("NUXT_PUBLIC_SITE_")).map(([k, v]) => [
    k.replace(/^NUXT_(PUBLIC_)?SITE_/, "").split("_").map((s, i) => i === 0 ? s.toLowerCase() : s[0].toUpperCase() + s.slice(1).toLowerCase()).join(""),
    v
  ]));
}

function useNitroOrigin(e) {
  const cert = process.env.NITRO_SSL_CERT;
  const key = process.env.NITRO_SSL_KEY;
  let host = process.env.NITRO_HOST || process.env.HOST || false;
  let port = false;
  port = process.env.NITRO_PORT || process.env.PORT || "3000";
  let protocol = cert && key || false ? "https" : "http";
  if (process.env.__NUXT_DEV__) {
    const origin = JSON.parse(process.env.__NUXT_DEV__).proxy.url;
    host = withoutProtocol(origin);
    protocol = origin.includes("https") ? "https" : "http";
  } else if (process.env.NUXT_VITE_NODE_OPTIONS) {
    const origin = JSON.parse(process.env.NUXT_VITE_NODE_OPTIONS).baseURL.replace("/__nuxt_vite_node__", "");
    host = withoutProtocol(origin);
    protocol = origin.includes("https") ? "https" : "http";
  } else {
    host = getRequestHost(e, { xForwardedHost: true }) || host;
    protocol = getRequestProtocol(e, { xForwardedProto: true }) || protocol;
  }
  if (typeof host === "string" && host.includes(":")) {
    port = host.split(":").pop();
    host = host.split(":")[0];
  }
  port = port ? `:${port}` : "";
  return withTrailingSlash(`${protocol}://${host}${port}`);
}

function useSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu$1(_options, useRuntimeConfig(e)["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
function isPathFile(path) {
  const lastSegment = path.split("/").pop();
  return !!(lastSegment || path).match(/\.[0-9a-z]+$/i)?.[0];
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}

function createSitePathResolver(e, options = {}) {
  const siteConfig = useSiteConfig(e);
  const nitroOrigin = useNitroOrigin(e);
  const nuxtBase = useRuntimeConfig(e).app.baseURL || "/";
  return (path) => {
    return resolveSitePath(path, {
      ...options,
      siteUrl: options.canonical !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    });
  };
}
function withSiteUrl(e, path, options = {}) {
  const siteConfig = e.context.siteConfig?.get();
  let siteUrl = e.context.siteConfigNitroOrigin;
  if ((options.canonical !== false || false) && siteConfig.url)
    siteUrl = siteConfig.url;
  return resolveSitePath(path, {
    absolute: true,
    siteUrl,
    trailingSlash: siteConfig.trailingSlash,
    base: e.context.nitro.baseURL,
    withBase: options.withBase
  });
}

function matches(pattern, path) {
  const pathLength = path.length;
  const patternLength = pattern.length;
  const matchingLengths = Array.from({ length: pathLength + 1 }).fill(0);
  let numMatchingLengths = 1;
  let p = 0;
  while (p < patternLength) {
    if (pattern[p] === "$" && p + 1 === patternLength) {
      return matchingLengths[numMatchingLengths - 1] === pathLength;
    }
    if (pattern[p] === "*") {
      numMatchingLengths = pathLength - matchingLengths[0] + 1;
      for (let i = 1; i < numMatchingLengths; i++) {
        matchingLengths[i] = matchingLengths[i - 1] + 1;
      }
    } else {
      let numMatches = 0;
      for (let i = 0; i < numMatchingLengths; i++) {
        const matchLength = matchingLengths[i];
        if (matchLength < pathLength && path[matchLength] === pattern[p]) {
          matchingLengths[numMatches++] = matchLength + 1;
        }
      }
      if (numMatches === 0) {
        return false;
      }
      numMatchingLengths = numMatches;
    }
    p++;
  }
  return true;
}
function matchPathToRule(path, _rules) {
  let matchedRule = null;
  const rules = _rules.filter(Boolean);
  const rulesLength = rules.length;
  let i = 0;
  while (i < rulesLength) {
    const rule = rules[i];
    if (!matches(rule.pattern, path)) {
      i++;
      continue;
    }
    if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
      matchedRule = rule;
    } else if (rule.pattern.length === matchedRule.pattern.length && rule.allow && !matchedRule.allow) {
      matchedRule = rule;
    }
    i++;
  }
  return matchedRule;
}
function asArray(v) {
  return typeof v === "undefined" ? [] : Array.isArray(v) ? v : [v];
}
function generateRobotsTxt({ groups, sitemaps }) {
  const lines = [];
  for (const group of groups) {
    for (const comment of group.comment || [])
      lines.push(`# ${comment}`);
    for (const userAgent of group.userAgent || ["*"])
      lines.push(`User-agent: ${userAgent}`);
    for (const allow of group.allow || [])
      lines.push(`Allow: ${allow}`);
    for (const disallow of group.disallow || [])
      lines.push(`Disallow: ${disallow}`);
    for (const cleanParam of group.cleanParam || [])
      lines.push(`Clean-param: ${cleanParam}`);
    lines.push("");
  }
  for (const sitemap of sitemaps)
    lines.push(`Sitemap: ${sitemap}`);
  return lines.join("\n");
}
createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function normaliseRobotsRouteRule(config) {
  let allow;
  if (typeof config.robots === "boolean")
    allow = config.robots;
  else if (typeof config.robots === "object" && typeof config.robots.indexable !== "undefined")
    allow = config.robots.indexable;
  else if (typeof config.index !== "undefined")
    allow = config.index;
  let rule;
  if (typeof config.robots === "object" && typeof config.robots.rule !== "undefined")
    rule = config.robots.rule;
  else if (typeof config.robots === "string")
    rule = config.robots;
  if (rule && !allow)
    allow = rule !== "none" && !rule.includes("noindex");
  if (typeof allow === "undefined" && typeof rule === "undefined")
    return;
  return {
    allow,
    rule
  };
}

function withoutQuery$1(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher$1() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu$1({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(withoutTrailingSlash(withoutQuery$1(path)), app.baseURL)
    ).reverse());
  };
}

function getSiteRobotConfig(e) {
  const query = getQuery$1(e);
  const hints = [];
  const { groups, debug } = useRuntimeConfig(e)["nuxt-robots"];
  let indexable = getSiteIndexable(e);
  const queryIndexableEnabled = String(query.mockProductionEnv) === "true" || query.mockProductionEnv === "";
  {
    const { _context } = useSiteConfig(e, { debug: debug || true });
    if (queryIndexableEnabled) {
      indexable = true;
      hints.push("You are mocking a production enviroment with ?mockProductionEnv query.");
    } else if (!indexable && _context.indexable === "nuxt-robots:config") {
      hints.push("You are blocking indexing with your Nuxt Robots config.");
    } else if (!queryIndexableEnabled && !_context.indexable) {
      hints.push(`Indexing is blocked in development. You can mock a production environment with ?mockProductionEnv query.`);
    } else if (!indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is blocked by site config set by ${_context.indexable}.`);
    } else if (indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is enabled from ${_context.indexable}.`);
    }
  }
  if (groups.some((g) => g.userAgent.includes("*") && g.disallow.includes("/"))) {
    indexable = false;
    hints.push("You are blocking all user agents with a wildcard `Disallow /`.");
  } else if (groups.some((g) => g.disallow.includes("/"))) {
    hints.push("You are blocking specific user agents with `Disallow /`.");
  }
  return { indexable, hints };
}

function getPathRobotConfig(e, options) {
  const { robotsDisabledValue, robotsEnabledValue, usingNuxtContent } = useRuntimeConfig()["nuxt-robots"];
  if (!options?.skipSiteIndexable) {
    if (!getSiteRobotConfig(e).indexable) {
      return {
        rule: robotsDisabledValue,
        indexable: false
      };
    }
  }
  const path = options?.path || e.path;
  let userAgent = options?.userAgent;
  if (!userAgent) {
    try {
      userAgent = getRequestHeader(e, "User-Agent");
    } catch {
    }
  }
  const nitroApp = useNitroApp();
  const groups = [
    // run explicit user agent matching first
    ...nitroApp._robots.ctx.groups.filter((g) => {
      if (userAgent) {
        return g.userAgent.some((ua) => ua.toLowerCase().includes(userAgent.toLowerCase()));
      }
      return false;
    }),
    // run wildcard matches second
    ...nitroApp._robots.ctx.groups.filter((g) => g.userAgent.includes("*"))
  ];
  for (const group of groups) {
    if (!group._indexable) {
      return {
        indexable: false,
        rule: robotsDisabledValue,
        debug: {
          source: "/robots.txt",
          line: `Disallow: /`
        }
      };
    }
    const robotsTxtRule = matchPathToRule(path, group._rules);
    if (robotsTxtRule) {
      if (!robotsTxtRule.allow) {
        return {
          indexable: false,
          rule: robotsDisabledValue,
          debug: {
            source: "/robots.txt",
            line: `Disallow: ${robotsTxtRule.pattern}`
          }
        };
      }
      break;
    }
  }
  if (usingNuxtContent && nitroApp._robots?.nuxtContentUrls?.has(withoutTrailingSlash(path))) {
    return {
      indexable: false,
      rule: robotsDisabledValue,
      debug: {
        source: "Nuxt Content"
      }
    };
  }
  nitroApp._robotsRuleMactcher = nitroApp._robotsRuleMactcher || createNitroRouteRuleMatcher$1();
  const routeRules = normaliseRobotsRouteRule(nitroApp._robotsRuleMactcher(path));
  if (routeRules && (routeRules.allow || routeRules.rule)) {
    return {
      indexable: routeRules.allow,
      rule: routeRules.rule || (routeRules.allow ? robotsEnabledValue : robotsDisabledValue),
      debug: {
        source: "Route Rules"
      }
    };
  }
  return {
    indexable: true,
    rule: robotsEnabledValue
  };
}

const _1RrRRbZ6SF = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(useSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

const logger$2 = createConsola({
  defaults: { tag: "@nuxtjs/robots" }
});

async function resolveRobotsTxtContext(e, nitro = useNitroApp()) {
  const { groups, sitemap: sitemaps } = useRuntimeConfig(e)["nuxt-robots"];
  const generateRobotsTxtCtx = {
    event: e,
    context: e ? "robots.txt" : "init",
    ...JSON.parse(JSON.stringify({ groups, sitemaps }))
  };
  await nitro.hooks.callHook("robots:config", generateRobotsTxtCtx);
  nitro._robots.ctx = generateRobotsTxtCtx;
  return generateRobotsTxtCtx;
}

const _6RyjAd4NMo = defineNitroPlugin(async (nitroApp) => {
  const { usingNuxtContent, robotsDisabledValue } = useRuntimeConfig()["nuxt-robots"];
  nitroApp._robots = {};
  await resolveRobotsTxtContext(void 0, nitroApp);
  const nuxtContentUrls = /* @__PURE__ */ new Set();
  if (usingNuxtContent) {
    let urls;
    try {
      urls = await (await nitroApp.localFetch("/__robots__/nuxt-content.json", {})).json();
    } catch (e) {
      logger$2.error("Failed to read robot rules from content files.", e);
    }
    if (urls && Array.isArray(urls) && urls.length) {
      urls.forEach((url) => nuxtContentUrls.add(withoutTrailingSlash(url)));
    }
  }
  if (nuxtContentUrls.size) {
    nitroApp._robots.nuxtContentUrls = nuxtContentUrls;
  }
});

const MULTI_CACHE_CONTEXT_KEY = "__MULTI_CACHE";
const MULTI_CACHE_ROUTE_CONTEXT_KEY = "__MULTI_CACHE_ROUTE";
const MULTI_CACHE_CDN_CONTEXT_KEY = "__MULTI_CACHE_CDN";
const MULTI_CACHE_PREFIX_KEY = "__MULTI_CACHE_PREFIX";
function getMultiCacheContext(event) {
  return event?.[MULTI_CACHE_CONTEXT_KEY];
}
function getMultiCacheRouteHelper(event) {
  return event?.[MULTI_CACHE_ROUTE_CONTEXT_KEY];
}
function getMultiCacheCDNHelper(event) {
  return event?.[MULTI_CACHE_CDN_CONTEXT_KEY];
}
function getExpiresValue(maxAge) {
  return Math.round(Date.now() / 1e3 + maxAge);
}
function isExpired(item) {
  return item.expires ? Date.now() / 1e3 > item.expires : false;
}
function getCacheKeyWithPrefix(cacheKey, event) {
  const prefix = event[MULTI_CACHE_PREFIX_KEY];
  return prefix ? `${prefix}--${cacheKey}` : cacheKey;
}
function encodeRouteCacheKey(path) {
  const questionMarkIndex = path.indexOf("?");
  if (questionMarkIndex >= 0) {
    return path.substring(0, questionMarkIndex);
  }
  return path;
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function handleCDN(app, event) {
  const cdnHelper = getMultiCacheCDNHelper(event);
  if (!cdnHelper) {
    return;
  }
  const cacheTagsValue = cdnHelper._tags.filter(onlyUnique).join(" ");
  if (cacheTagsValue) {
    setResponseHeader(event, app.config.cdn.cacheTagHeader, cacheTagsValue);
  }
  const cacheControlValue = format(cdnHelper._control);
  if (cacheControlValue) {
    setResponseHeader(
      event,
      app.config.cdn.cacheControlHeader,
      cacheControlValue
    );
  }
}
function onBeforeResponse(event, response) {
  const app = useMultiCacheApp();
  handleCDN(app, event);
}

class NuxtMultiCacheRouteCacheHelper {
  /**
   * The collected cache tags.
   */
  tags = [];
  /**
   * Indicates if the route should be cacheable.
   */
  cacheable = null;
  /**
   * The maximum age.
   */
  maxAge = null;
  /**
   * The stale if error age.
   */
  staleIfError = null;
  /**
   * Whether a stale response can be served during revalidation.
   */
  staleWhileRevalidate = null;
  /**
   * Add cache tags for this route.
   */
  addTags(tags = []) {
    this.tags.push(...tags);
    return this;
  }
  /**
   * Mark this route as cacheable.
   *
   * The initial value is null and this method only changes the value if it is
   * null. This means that once it's set to uncacheable, there is no way to
   * change it back.
   */
  setCacheable() {
    if (this.cacheable === null) {
      this.cacheable = true;
    }
    return this;
  }
  /**
   * Mark the route as uncacheable.
   *
   * After that there is no way to make it cacheable again.
   */
  setUncacheable() {
    this.cacheable = false;
    return this;
  }
  /**
   * Set a numeric value only if its smaller than the existing value.
   */
  setNumeric(property, value) {
    const current = this[property];
    if (current === null || value < current) {
      this[property] = value;
    }
    return this;
  }
  /**
   * Set the max age in seconds.
   *
   * The value is only set if it's smaller than the current max age or if it
   * hasn't been set yet. The initial value is `null`.
   *
   * You can always directly set the maxAge property on this object.
   */
  setMaxAge(v = 0) {
    return this.setNumeric("maxAge", v);
  }
  /**
   * Set the staleIfError in seconds.
   *
   * If set, then a stale route will be served if that refreshed route throws an error.
   */
  setStaleIfError(v = 0) {
    return this.setNumeric("staleIfError", v);
  }
  /**
   * Sets whether a stale respones can be returned while a new one is being generated.
   */
  allowStaleWhileRevalidate() {
    this.staleWhileRevalidate = true;
    return this;
  }
  /**
   * Get the expire timestamp as unix epoch (seconds).
   */
  getExpires(property) {
    const value = this[property];
    if (value === null) {
      return;
    }
    return Math.floor(Date.now() / 1e3) + value;
  }
}

class NuxtMultiCacheCDNHelper {
  _tags;
  _control;
  constructor() {
    this._tags = [];
    this._control = new CacheControl();
  }
  /**
   * Set a cache-control property.
   */
  set(key, value) {
    this._control[key] = value;
    return this;
  }
  /**
   * Add cache tags.
   */
  addTags(tags) {
    this._tags.push(...tags);
    return this;
  }
  /**
   * Sets a numeric value only if it's lower than the current value or if it
   * isn't yet set.
   *
   * For example, this can be used when setting maxAge: You can set a global
   * max age of 1 year for every response. But a component down the tree that
   * shows the current weather can set it to 1 hour. If another component tries
   * to set the max age to 7 days the value won't be set.
   *
   * This basically means that the lowest value will always "win".
   */
  setNumeric(key, value) {
    const currentValue = this._control[key];
    if (currentValue === null || currentValue === void 0 || value < currentValue) {
      this._control[key] = value;
    }
    return this;
  }
  /**
   * Set as private.
   *
   * Note that once it's set to private you can't change it back to public.
   * This is so that it's possible to change it at any time during the request
   * without running into race conditions.
   */
  private() {
    this._control.private = true;
    this._control.public = false;
    return this;
  }
  /**
   * Set public.
   *
   * Note that if `private` was already set to `true` this will have no effect.
   */
  public() {
    if (!this._control.private) {
      this._control.public = true;
    }
    return this;
  }
}

async function addCacheContext(event) {
  const { cache, serverOptions, config } = useMultiCacheApp();
  if (serverOptions.cacheKeyPrefix) {
    if (typeof serverOptions.cacheKeyPrefix === "string") {
      event[MULTI_CACHE_PREFIX_KEY] = serverOptions.cacheKeyPrefix;
    } else {
      event[MULTI_CACHE_PREFIX_KEY] = await serverOptions.cacheKeyPrefix(event);
    }
  }
  event[MULTI_CACHE_CONTEXT_KEY] = cache;
  if (cache.route) {
    event[MULTI_CACHE_ROUTE_CONTEXT_KEY] = new NuxtMultiCacheRouteCacheHelper();
  }
  if (config.cdn.enabled) {
    const helper = new NuxtMultiCacheCDNHelper();
    event[MULTI_CACHE_CDN_CONTEXT_KEY] = helper;
  }
  return cache;
}
function enabledForRequest(event) {
  const { serverOptions } = useMultiCacheApp();
  if (serverOptions.enabledForRequest) {
    return serverOptions.enabledForRequest(event);
  }
  return Promise.resolve(true);
}
function applies(path) {
  const { serverOptions } = useMultiCacheApp();
  if (serverOptions.route?.applies) {
    return serverOptions.route.applies(path);
  }
  if (path.startsWith("/_nuxt") || path.startsWith("/__nuxt_error")) {
    return false;
  }
  return !/.\.(ico|png|jpg|js|css|html|woff|woff2|ttf|otf|eot|svg)$/.test(path);
}
async function onRequest(event) {
  if (!event.path) {
    return;
  }
  if (!applies(event.path)) {
    return;
  }
  const cachingEnabled = await enabledForRequest(event);
  if (!cachingEnabled) {
    return;
  }
  await addCacheContext(event);
}

const DELIMITER = "<CACHE_ITEM>";
function encodeCacheItem(data, metadata) {
  return JSON.stringify(metadata) + DELIMITER + data;
}
function decodeCacheItem(cacheItem) {
  const delimiterPos = cacheItem.indexOf(DELIMITER);
  if (delimiterPos >= 0) {
    const metadata = JSON.parse(cacheItem.substring(0, delimiterPos));
    const data = cacheItem.substring(delimiterPos + DELIMITER.length);
    return { metadata, data };
  }
}
function encodeRouteCacheItem(data, headers, statusCode, expires, staleIfErrorExpires, staleWhileRevalidate, cacheTags) {
  return encodeCacheItem(data, {
    headers,
    statusCode,
    expires,
    cacheTags,
    staleIfErrorExpires,
    staleWhileRevalidate
  });
}
function decodeRouteCacheItem(cacheItem) {
  try {
    const decoded = decodeCacheItem(cacheItem);
    if (decoded) {
      return {
        ...decoded.metadata,
        data: decoded.data
      };
    }
  } catch (e) {
  }
}
function handleRawCacheData(data) {
  if (typeof data === "string") {
    return data;
  } else if (data instanceof Buffer) {
    return data.toString();
  }
}

const logger$1 = consola.withTag("nuxt-multi-cache");

function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (typeof value === "string") {
    return value;
  }
  try {
    if (isPureObject(value) || Array.isArray(value)) {
      return JSON.stringify(value);
    }
    if (typeof value.toJSON === "function") {
      return stringify(value.toJSON());
    }
  } catch (_e) {
  }
}
async function onAfterResponse(event, response) {
  if (event.__MULTI_CACHE_SERVED_FROM_CACHE) {
    return;
  }
  if (!response?.body) {
    return;
  }
  const responseData = stringify(response.body);
  if (!responseData) {
    return;
  }
  const multiCache = getMultiCacheContext(event);
  if (!multiCache?.route) {
    return;
  }
  const routeHelper = getMultiCacheRouteHelper(event);
  if (!routeHelper?.cacheable) {
    return;
  }
  const statusCode = getResponseStatus(event);
  if (statusCode !== 200) {
    return;
  }
  const { serverOptions, state } = useMultiCacheApp();
  let responseHeaders = getResponseHeaders(event);
  responseHeaders["content-encoding"] = void 0;
  if (serverOptions.route?.alterCachedHeaders) {
    responseHeaders = serverOptions.route.alterCachedHeaders(responseHeaders);
  }
  const cacheKey = serverOptions?.route?.buildCacheKey ? serverOptions.route.buildCacheKey(event) : getCacheKeyWithPrefix(encodeRouteCacheKey(event.path), event);
  const expires = routeHelper.getExpires("maxAge");
  const staleIfErrorExpires = routeHelper.getExpires("staleIfError");
  const staleWhileRevalidate = !!routeHelper.staleWhileRevalidate;
  const cacheItem = encodeRouteCacheItem(
    responseData,
    responseHeaders,
    statusCode,
    expires,
    staleIfErrorExpires,
    staleWhileRevalidate,
    routeHelper.tags
  );
  const debugEnabled = useRuntimeConfig().multiCache.debug;
  if (debugEnabled) {
    logger$1.info("Storing route in cache: " + event.path, {
      cacheKey,
      expires,
      staleIfErrorExpires,
      cacheTags: routeHelper.tags,
      staleWhileRevalidate,
      statusCode
    });
  }
  await multiCache.route.setItemRaw(cacheKey, cacheItem, {
    ttl: routeHelper.maxAge
  });
  if (event.__MULTI_CACHE_REVALIDATION_KEY) {
    state.removeKeyBeingRevalidated(event.__MULTI_CACHE_REVALIDATION_KEY);
  }
}

function setCachedResponse(event, decoded) {
  if (decoded.headers) {
    setResponseHeaders(event, decoded.headers);
  }
  if (decoded.statusCode) {
    setResponseStatus(event, decoded.statusCode);
  }
  event.__MULTI_CACHE_SERVED_FROM_CACHE = true;
}

function onError(_error, ctx) {
  try {
    if (!ctx.event) {
      return;
    }
    const { state } = useMultiCacheApp();
    if (ctx.event.__MULTI_CACHE_REVALIDATION_KEY) {
      state.removeKeyBeingRevalidated(ctx.event.__MULTI_CACHE_REVALIDATION_KEY);
    }
    const decoded = ctx.event.__MULTI_CACHE_DECODED_CACHED_ROUTE;
    if (!decoded) {
      return;
    }
    if (!decoded.staleIfErrorExpires) {
      return;
    }
    const now = Date.now() / 1e3;
    if (now >= decoded.staleIfErrorExpires) {
      return;
    }
    setCachedResponse(ctx.event, decoded);
    const response = new Response(decoded.data, {
      headers: decoded.headers
    });
    return ctx.event.respondWith(response);
  } catch (_e) {
  }
}

class MultiCacheState {
  /**
   * Keys that are currently being revalidated.
   */
  keysBeingRevalidated = {};
  /**
   * Add a key that is currently being revalidated.
   */
  addKeyBeingRevalidated(key) {
    this.keysBeingRevalidated[key] = true;
  }
  /**
   * Remove a key from being revalidated.
   */
  removeKeyBeingRevalidated(key) {
    delete this.keysBeingRevalidated[key];
  }
  /**
   * Check if a key is currentl being revalidated.
   */
  isBeingRevalidated(key) {
    return this.keysBeingRevalidated[key] === true;
  }
}

function canBeServedFromCache(key, decoded, state) {
  const now = Date.now() / 1e3;
  const isExpired = decoded.expires ? now >= decoded.expires : false;
  if (!isExpired) {
    return true;
  }
  if (decoded.staleWhileRevalidate && state.isBeingRevalidated(key)) {
    return true;
  }
  return false;
}
async function serveCachedHandler(event) {
  try {
    const { serverOptions, state } = useMultiCacheApp();
    const context = getMultiCacheContext(event);
    if (!context?.route) {
      return;
    }
    const fullKey = serverOptions?.route?.buildCacheKey ? serverOptions.route.buildCacheKey(event) : getCacheKeyWithPrefix(encodeRouteCacheKey(event.path), event);
    const cachedRaw = handleRawCacheData(
      await context.route.getItemRaw(fullKey)
    );
    if (!cachedRaw) {
      return;
    }
    const decoded = decodeRouteCacheItem(cachedRaw);
    if (!decoded) {
      return;
    }
    event.__MULTI_CACHE_DECODED_CACHED_ROUTE = decoded;
    if (!canBeServedFromCache(fullKey, decoded, state)) {
      if (decoded.staleWhileRevalidate) {
        state.addKeyBeingRevalidated(fullKey);
        event.__MULTI_CACHE_REVALIDATION_KEY = fullKey;
      }
      return;
    }
    const debugEnabled = useRuntimeConfig().multiCache.debug;
    if (debugEnabled) {
      logger$1.info("Serving cached route for path: " + event.path, {
        fullKey
      });
    }
    setCachedResponse(event, decoded);
    return decoded.data;
  } catch (e) {
    if (e instanceof Error) {
      console.debug(e.message);
    }
  }
}

function defineMultiCacheOptions(options) {
  return options;
}

const serverOptions = defineMultiCacheOptions({
  data: {
    storage: process.env.REDIS_URL ? {
      driver: redisDriver({
        url: process.env.REDIS_URL
      })
    } : void 0
    // Use default (memory) storage in development
  }
});

function createMultiCacheApp() {
  const runtimeConfig = useRuntimeConfig();
  const cacheContext = {};
  if (runtimeConfig.multiCache.component) {
    cacheContext.component = createStorage(serverOptions.component?.storage);
  }
  if (runtimeConfig.multiCache.data) {
    cacheContext.data = createStorage(serverOptions.data?.storage);
  }
  if (runtimeConfig.multiCache.route) {
    cacheContext.route = createStorage(serverOptions.route?.storage);
  }
  return {
    cache: cacheContext,
    serverOptions,
    config: runtimeConfig.multiCache,
    state: new MultiCacheState()
  };
}
const _AKkhIbivJy = defineNitroPlugin((nitroApp) => {
  const multiCache = createMultiCacheApp();
  nitroApp.multiCache = multiCache;
  nitroApp.hooks.hook("request", onRequest);
  if (multiCache.config.cdn.enabled) {
    nitroApp.hooks.hook("beforeResponse", onBeforeResponse);
  }
  if (multiCache.config.route) {
    nitroApp.h3App.stack.unshift({
      route: "/",
      handler: serveCachedHandler
    });
    nitroApp.hooks.hook("afterResponse", onAfterResponse);
    nitroApp.hooks.hook("error", onError);
  }
});

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _pAvkbvQxOh = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const getValidator = (options = {}) => {
  return new HtmlValidate(options);
};
const useChecker = (validator, usePrettier = false, logLevel = "verbose") => {
  const invalidPages = [];
  const checkHTML = async (url, html) => {
    let couldFormat = false;
    try {
      if (usePrettier) {
        const { format } = await import('file:///Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/prettier@3.5.0/node_modules/prettier/index.mjs');
        html = await format(html, { parser: "html" });
        couldFormat = true;
      }
    } catch (e) {
      console.error(e);
    }
    html = typeof html === "string" ? html.replace(/ ?data-v-[-A-Za-z0-9]+(=["'][^"']*["'])?/g, "") : html;
    const { valid, results } = await validator.validateString(html);
    if (valid && !results.length) {
      if (logLevel === "verbose") {
        console.log(`No HTML validation errors found for ${chalk.bold(url)}`);
      }
      return { valid, results };
    }
    if (!valid) {
      invalidPages.push(url);
    }
    const formatter = couldFormat ? formatterFactory("codeframe") : formatterFactory("stylish");
    const formattedResult = formatter?.(results);
    const message = [
      `HTML validation errors found for ${chalk.bold(url)}`,
      formattedResult
    ].filter(Boolean).join("\n");
    if (valid) {
      if (logLevel === "verbose" || logLevel === "warning") {
        console.warn(message);
      }
    } else {
      console.error(message);
    }
    return { valid, results };
  };
  return { checkHTML, invalidPages };
};
function isIgnored(path, ignore = []) {
  return ignore.some((i) => typeof i === "string" ? path === i : i.test(path));
}

const config = {
  usePrettier: false,
  options: {
  "extends": [
    "html-validate:document",
    "html-validate:recommended",
    "html-validate:standard"
  ],
  "rules": {
    "svg-focusable": "off",
    "no-unknown-elements": "error",
    "void-style": "off",
    "no-trailing-whitespace": "off",
    "require-sri": "off",
    "attribute-boolean-style": "off",
    "doctype-style": "off",
    "no-inline-style": "off"
  }
},
  ignore: [
  /\.(xml|rss|json)$/
],
  logLevel: "verbose"
};

const _11Zq4bgscu = (function(nitro) {
  const validator = getValidator(config.options);
  const { checkHTML } = useChecker(validator, config.usePrettier, config.logLevel);
  nitro.hooks.hook("render:response", async (response, { event }) => {
    if (typeof response.body === "string" && (response.headers?.["Content-Type"] || response.headers?.["content-type"])?.includes("html") && !isIgnored(event.path, config.ignore)) {
      checkHTML(event.path, response.body);
    }
  });
});

const nitroAppSecurityOptions = {};
function getAppSecurityOptions() {
  return nitroAppSecurityOptions;
}
function resolveSecurityRules(event) {
  if (!event.context.security) {
    event.context.security = {};
  }
  if (!event.context.security.rules) {
    const router = createRouter({ routes: structuredClone(nitroAppSecurityOptions) });
    const matcher = toRouteMatcher(router);
    const matches = matcher.matchAll(event.path.split("?")[0]);
    const rules = defuReplaceArray({}, ...matches.reverse());
    event.context.security.rules = rules;
  }
  return event.context.security.rules;
}
function resolveSecurityRoute(event) {
  if (!event.context.security) {
    event.context.security = {};
  }
  if (!event.context.security.route) {
    const routeNames = Object.fromEntries(Object.entries(nitroAppSecurityOptions).map(([name]) => [name, { name }]));
    const router = createRouter({ routes: routeNames });
    const match = router.lookup(event.path.split("?")[0]);
    const route = match?.name ?? "";
    event.context.security.route = route;
  }
  return event.context.security.route;
}

const KEYS_TO_NAMES = {
  contentSecurityPolicy: "Content-Security-Policy",
  crossOriginEmbedderPolicy: "Cross-Origin-Embedder-Policy",
  crossOriginOpenerPolicy: "Cross-Origin-Opener-Policy",
  crossOriginResourcePolicy: "Cross-Origin-Resource-Policy",
  originAgentCluster: "Origin-Agent-Cluster",
  referrerPolicy: "Referrer-Policy",
  strictTransportSecurity: "Strict-Transport-Security",
  xContentTypeOptions: "X-Content-Type-Options",
  xDNSPrefetchControl: "X-DNS-Prefetch-Control",
  xDownloadOptions: "X-Download-Options",
  xFrameOptions: "X-Frame-Options",
  xPermittedCrossDomainPolicies: "X-Permitted-Cross-Domain-Policies",
  xXSSProtection: "X-XSS-Protection",
  permissionsPolicy: "Permissions-Policy"
};
const NAMES_TO_KEYS = Object.fromEntries(Object.entries(KEYS_TO_NAMES).map(([key, name]) => [name, key]));
function getNameFromKey(key) {
  return KEYS_TO_NAMES[key];
}
function getKeyFromName(headerName) {
  const [, key] = Object.entries(NAMES_TO_KEYS).find(([name]) => name.toLowerCase() === headerName.toLowerCase()) || [];
  return key;
}
function headerStringFromObject(optionKey, optionValue) {
  if (optionValue === false) {
    return "";
  }
  if (optionKey === "contentSecurityPolicy") {
    const policies = optionValue;
    return Object.entries(policies).filter(([, value]) => value !== false).map(([directive, sources]) => {
      if (directive === "upgrade-insecure-requests") {
        return "upgrade-insecure-requests;";
      } else {
        const stringifiedSources = typeof sources === "string" ? sources : sources.map((source) => source.trim()).join(" ");
        return `${directive} ${stringifiedSources};`;
      }
    }).join(" ");
  } else if (optionKey === "strictTransportSecurity") {
    const policies = optionValue;
    return [
      `max-age=${policies.maxAge};`,
      policies.includeSubdomains && "includeSubDomains;",
      policies.preload && "preload;"
    ].filter(Boolean).join(" ");
  } else if (optionKey === "permissionsPolicy") {
    const policies = optionValue;
    return Object.entries(policies).filter(([, value]) => value !== false).map(([directive, sources]) => {
      if (typeof sources === "string") {
        return `${directive}=${sources}`;
      } else {
        return `${directive}=(${sources.join(" ")})`;
      }
    }).join(", ");
  } else {
    return optionValue;
  }
}
function headerObjectFromString(optionKey, headerValue) {
  if (!headerValue) {
    return false;
  }
  if (optionKey === "contentSecurityPolicy") {
    const directives = headerValue.split(";").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, ...sources] = directive.split(" ").map((token) => token.trim());
      if (type === "upgrade-insecure-requests") {
        objectForm[type] = true;
      } else {
        objectForm[type] = sources.join(" ");
      }
    }
    return objectForm;
  } else if (optionKey === "strictTransportSecurity") {
    const directives = headerValue.split(";").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, value] = directive.split("=").map((token) => token.trim());
      if (type === "max-age") {
        objectForm.maxAge = Number(value);
      } else if (type === "includeSubdomains" || type === "preload") {
        objectForm[type] = true;
      }
    }
    return objectForm;
  } else if (optionKey === "permissionsPolicy") {
    const directives = headerValue.split(",").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, value] = directive.split("=").map((token) => token.trim());
      objectForm[type] = value;
    }
    return objectForm;
  } else {
    return headerValue;
  }
}
function standardToSecurity(standardHeaders) {
  if (!standardHeaders) {
    return void 0;
  }
  const standardHeadersAsObject = {};
  Object.entries(standardHeaders).forEach(([headerName, headerValue]) => {
    const optionKey = getKeyFromName(headerName);
    if (optionKey) {
      if (typeof headerValue === "string") {
        const objectValue = headerObjectFromString(optionKey, headerValue);
        standardHeadersAsObject[optionKey] = objectValue;
      } else {
        standardHeadersAsObject[optionKey] = headerValue;
      }
    }
  });
  if (Object.keys(standardHeadersAsObject).length === 0) {
    return void 0;
  }
  return standardHeadersAsObject;
}
function backwardsCompatibleSecurity(securityHeaders) {
  if (!securityHeaders) {
    return void 0;
  }
  const securityHeadersAsObject = {};
  Object.entries(securityHeaders).forEach(([key, value]) => {
    const optionKey = key;
    if ((optionKey === "contentSecurityPolicy" || optionKey === "permissionsPolicy" || optionKey === "strictTransportSecurity") && typeof value === "string") {
      const objectValue = headerObjectFromString(optionKey, value);
      securityHeadersAsObject[optionKey] = objectValue;
    } else if (value === "") {
      securityHeadersAsObject[optionKey] = false;
    } else {
      securityHeadersAsObject[optionKey] = value;
    }
  });
  return securityHeadersAsObject;
}

const _v43Kwzt2Ml = defineNitroPlugin(async (nitroApp) => {
  const appSecurityOptions = getAppSecurityOptions();
  const runtimeConfig = useRuntimeConfig();
  for (const route in runtimeConfig.nitro.routeRules) {
    const rule = runtimeConfig.nitro.routeRules[route];
    const { headers: headers2 } = rule;
    const securityHeaders2 = standardToSecurity(headers2);
    if (securityHeaders2) {
      appSecurityOptions[route] = { headers: securityHeaders2 };
    }
  }
  const securityOptions = runtimeConfig.security;
  const { headers } = securityOptions;
  const securityHeaders = backwardsCompatibleSecurity(headers);
  appSecurityOptions["/**"] = defuReplaceArray(
    { headers: securityHeaders },
    securityOptions,
    appSecurityOptions["/**"]
  );
  for (const route in runtimeConfig.nitro.routeRules) {
    const rule = runtimeConfig.nitro.routeRules[route];
    const { security } = rule;
    if (security) {
      const { headers: headers2 } = security;
      const securityHeaders2 = backwardsCompatibleSecurity(headers2);
      appSecurityOptions[route] = defuReplaceArray(
        { headers: securityHeaders2 },
        security,
        appSecurityOptions[route]
      );
    }
  }
  nitroApp.hooks.hook("nuxt-security:headers", ({ route, headers: headers2 }) => {
    appSecurityOptions[route] = defuReplaceArray(
      { headers: headers2 },
      appSecurityOptions[route]
    );
  });
  nitroApp.hooks.hook("nuxt-security:ready", async () => {
    await nitroApp.hooks.callHook("nuxt-security:routeRules", appSecurityOptions);
  });
  await nitroApp.hooks.callHook("nuxt-security:ready");
});

const sriHashes = {"/_nuxt/builds/meta/b9dd6690-52aa-464e-96d3-4cf5958ca0a9.json":"sha384-0qI7x4Pjqjj0AeE8dIhQUTfElUp/2IMx8Vl8X/cREdyAfHNwpbKCxtpUHFbt5p8w","/_robots.txt":"sha384-9AinWV8XAc/GrU+FBAwNnAuljFFZs9isY3KhpabyWke/Ih6aCYOpfiQO0ri/5ndq","/favicon.ico":"sha384-ALiXflH5NQMcTKWOmDXrIxcaPCEuEd5NCNTMtJGFbbW7kWI3w/1vO+pWcFWtmah9","/og-image.png":"sha384-r3sbQdNsztkryEOf0Ceoaxhree/0aTtpI15z83Bejf8fPXY5wCV+2YDHQvQss84s"};

const SCRIPT_RE$1 = /<script((?=[^>]+\bsrc="([^"]+)")(?![^>]+\bintegrity="[^"]+")[^>]+)(?:\/>|><\/script>)/g;
const LINK_RE$1 = /<link((?=[^>]+\brel="(?:stylesheet|preload|modulepreload)")(?=[^>]+\bhref="([^"]+)")(?![^>]+\bintegrity="[\w\-+/=]+")[^>]+)>/g;
const _1albBx7hXX = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const rules = resolveSecurityRules(event);
    if (!rules.enabled || !rules.sri) {
      return;
    }
    const sections = ["body", "bodyAppend", "bodyPrepend", "head"];
    for (const section of sections) {
      html[section] = html[section].map((element) => {
        if (typeof element !== "string") {
          return element;
        }
        element = element.replace(SCRIPT_RE$1, (match, rest, src) => {
          const hash = sriHashes[src];
          if (hash) {
            const integrityScript = `<script integrity="${hash}"${rest}><\/script>`;
            return integrityScript;
          } else {
            return match;
          }
        });
        element = element.replace(LINK_RE$1, (match, rest, href) => {
          const hash = sriHashes[href];
          if (hash) {
            const integrityLink = `<link integrity="${hash}"${rest}>`;
            return integrityLink;
          } else {
            return match;
          }
        });
        return element;
      });
    }
  });
});

globalThis.crypto ??= webcrypto;
function generateRandomNonce() {
  const array = new Uint8Array(18);
  crypto.getRandomValues(array);
  const nonce = btoa(String.fromCharCode(...array));
  return nonce;
}

const _Acuozg3sf0 = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

const LINK_RE = /<link([^>]*?>)/gi;
const SCRIPT_RE = /<script([^>]*?>)/gi;
const STYLE_RE = /<style([^>]*?>)/gi;
const _zez6r0gsGP = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    if (event.context.security?.nonce) {
      return;
    }
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.nonce && true) {
      const nonce = generateRandomNonce();
      event.context.security.nonce = nonce;
    }
  });
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const rules = resolveSecurityRules(event);
    if (!rules.enabled || !rules.headers || !rules.headers.contentSecurityPolicy || !rules.nonce) {
      return;
    }
    const nonce = event.context.security.nonce;
    const sections = ["body", "bodyAppend", "bodyPrepend", "head"];
    for (const section of sections) {
      html[section] = html[section].map((element) => {
        if (typeof element !== "string") {
          return element;
        }
        element = element.replace(LINK_RE, (match, rest) => {
          return `<link nonce="${nonce}"` + rest;
        });
        element = element.replace(SCRIPT_RE, (match, rest) => {
          return `<script nonce="${nonce}"` + rest;
        });
        element = element.replace(STYLE_RE, (match, rest) => {
          return `<style nonce="${nonce}"` + rest;
        });
        return element;
      });
    }
    {
      html.head.push(
        `<meta property="csp-nonce" nonce="${nonce}">`
      );
    }
  });
});

const _mgkNN4l6DL = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (response, { event }) => {
    if (response.island) {
      return;
    }
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.headers) {
      const headers = rules.headers;
      if (headers.contentSecurityPolicy) {
        const csp = headers.contentSecurityPolicy;
        const nonce = event.context.security?.nonce;
        const scriptHashes = event.context.security?.hashes?.script;
        const styleHashes = event.context.security?.hashes?.style;
        headers.contentSecurityPolicy = updateCspVariables(csp, nonce, scriptHashes, styleHashes);
      }
    }
  });
});
function updateCspVariables(csp, nonce, scriptHashes, styleHashes) {
  const generatedCsp = Object.fromEntries(Object.entries(csp).map(([directive, value]) => {
    if (typeof value === "boolean") {
      return [directive, value];
    }
    const sources = typeof value === "string" ? value.split(" ").map((token) => token.trim()).filter((token) => token) : value;
    const modifiedSources = sources.filter((source) => {
      if (source.startsWith("'nonce-") && source !== "'nonce-{{nonce}}'") {
        console.warn("[nuxt-security] removing static nonce from CSP header");
        return false;
      }
      return true;
    }).map((source) => {
      if (source === "'nonce-{{nonce}}'") {
        return nonce ? `'nonce-${nonce}'` : "";
      } else {
        return source;
      }
    }).filter((source) => source);
    if (directive === "script-src" && scriptHashes) {
      modifiedSources.push(...scriptHashes);
    }
    if (directive === "style-src" && styleHashes) {
      modifiedSources.push(...styleHashes);
    }
    return [directive, modifiedSources];
  }));
  return generatedCsp;
}

const _dn8txgCxkw = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

const _kwfSabVUxD = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", (response, { event }) => {
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.headers) {
      const headers = rules.headers;
      Object.entries(headers).forEach(([header, value]) => {
        const headerName = getNameFromKey(header);
        if (value === false) {
          const { headers: standardHeaders } = getRouteRules(event);
          const standardHeaderValue = standardHeaders?.[headerName];
          const currentHeaderValue = getResponseHeader(event, headerName);
          if (standardHeaderValue === currentHeaderValue) {
            removeResponseHeader(event, headerName);
          }
        } else {
          const headerValue = headerStringFromObject(header, value);
          setResponseHeader(event, headerName, headerValue);
        }
      });
    }
  });
});

const _4jJvM2ocen = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event) => {
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.hidePoweredBy && !event.node.res.headersSent) {
      removeResponseHeader(event, "x-powered-by");
    }
  });
});

const _gyu0lJapys = defineNitroPlugin(async (nitroApp) => {
  {
    const prerenderedHeaders = await useStorage("assets:nuxt-security").getItem("headers.json") || {};
    nitroApp.hooks.hook("beforeResponse", (event) => {
      const rules = resolveSecurityRules(event);
      if (rules.enabled && rules.ssg && rules.ssg.nitroHeaders) {
        const path = event.path.split("?")[0];
        if (prerenderedHeaders[path]) {
          setResponseHeaders(event, prerenderedHeaders[path]);
        }
      }
    });
  }
});

const plugins = [
  _cx8Gfki5nK,
_sLJvirkz7d,
_1RrRRbZ6SF,
_6RyjAd4NMo,
_AKkhIbivJy,
_pAvkbvQxOh,
_11Zq4bgscu,
_v43Kwzt2Ml,
_1albBx7hXX,
_Acuozg3sf0,
_zez6r0gsGP,
_mgkNN4l6DL,
_dn8txgCxkw,
_kwfSabVUxD,
_4jJvM2ocen,
_gyu0lJapys
];

const _dy298X = defineEventHandler(async (e) => {
  if (e.context.siteConfig)
    return;
  const runtimeConfig = useRuntimeConfig(e);
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = createSiteConfigStack({
    debug: config.debug
  });
  const appConfig = useAppConfig(e);
  const nitroOrigin = useNitroOrigin(e);
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: -4,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: 0,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    // @ts-expect-error untyped
    ...envSiteConfig(globalThis._importMeta_.env)
    // just in-case, shouldn't be needed
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (appConfig.site) {
    siteConfig.push({
      _priority: -2,
      _context: "app:config",
      ...appConfig.site
    });
  }
  if (e.context._nitro.routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...e.context._nitro.routeRules.site
    });
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
});

const _kj6MQg = defineEventHandler(async (e) => {
  const siteConfig = useSiteConfig(e);
  const nitroOrigin = useNitroOrigin(e);
  const runtimeConfig = useRuntimeConfig(e);
  const stack = e.context.siteConfig.stack;
  setHeader(e, "Content-Type", "application/json");
  return {
    config: siteConfig,
    stack,
    nitroOrigin,
    version: runtimeConfig["nuxt-site-config"].version
  };
});

const _9Pw1DE = defineEventHandler(async (e) => {
  const nitro = useNitroApp();
  const { indexable, hints } = getSiteRobotConfig(e);
  const { credits, usingNuxtContent, cacheControl } = useRuntimeConfig(e)["nuxt-robots"];
  let robotsTxtCtx = {
    sitemaps: [],
    groups: [
      {
        allow: [],
        comment: [],
        userAgent: ["*"],
        disallow: ["/"]
      }
    ]
  };
  if (indexable) {
    robotsTxtCtx = await resolveRobotsTxtContext(e);
    robotsTxtCtx.sitemaps = [...new Set(
      asArray(robotsTxtCtx.sitemaps).map((s) => !s.startsWith("http") ? withSiteUrl(e, s, { withBase: true}) : s)
    )];
    if (usingNuxtContent) {
      const contentWithRobotRules = await e.$fetch("/__robots__/nuxt-content.json", {
        headers: {
          Accept: "application/json"
        }
      });
      for (const group of robotsTxtCtx.groups) {
        if (group.userAgent.includes("*")) {
          group.disallow.push(...contentWithRobotRules);
          group.disallow = group.disallow.filter(Boolean);
        }
      }
    }
  }
  let robotsTxt = generateRobotsTxt(robotsTxtCtx);
  if (hints.length) {
    robotsTxt += `
# DEVELOPMENT HINTS:
# - ${hints.join("\n# - ")}
`;
  }
  if (credits) {
    robotsTxt = [
      `# START nuxt-robots (${indexable ? "indexable" : "indexing disabled"})`,
      robotsTxt,
      "# END nuxt-robots"
    ].filter(Boolean).join("\n");
  }
  setHeader(e, "Content-Type", "text/plain; charset=utf-8");
  setHeader(e, "Cache-Control", "no-store" );
  const hookCtx = { robotsTxt, e };
  await nitro.hooks.callHook("robots:robots-txt", hookCtx);
  return hookCtx.robotsTxt;
});

const _L5no3j = defineEventHandler(async (e) => {
  if (e.path === "/robots.txt" || e.path.startsWith("/__") || e.path.startsWith("/api") || e.path.startsWith("/_nuxt"))
    return;
  const robotConfig = getPathRobotConfig(e);
  const nuxtRobotsConfig = useRuntimeConfig(e)["nuxt-robots"];
  if (nuxtRobotsConfig) {
    const { header } = nuxtRobotsConfig;
    if (header) {
      setHeader(e, "X-Robots-Tag", robotConfig.rule);
    }
    e.context.robots = robotConfig;
  }
});

const _7bWrDQ = defineEventHandler(async (e) => {
  const runtimeConfig = useRuntimeConfig(e)["nuxt-robots"];
  const { indexable, hints } = getSiteRobotConfig(e);
  const siteConfig = useSiteConfig(e);
  const robotsTxt = await e.$fetch("/robots.txt", {
    query: getQuery$1(e)
  });
  return {
    robotsTxt,
    indexable,
    hints,
    runtimeConfig,
    siteConfig: {
      url: siteConfig.url,
      env: siteConfig.env,
      indexable: siteConfig.indexable
    }
  };
});

const _0fc8SV = defineEventHandler(async (e) => {
  const path = getQuery$1(e).path;
  return getPathRobotConfig(e, {
    path
  });
});

const logger = createConsola({
  defaults: {
    tag: "@nuxt/sitemap"
  }
});
const merger$1 = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey$1(arr, key) {
  const res = {};
  arr.forEach((item) => {
    const k = item[key];
    res[k] = merger$1(item, res[k] || {});
  });
  return Object.values(res);
}
function splitForLocales(path, locales) {
  const prefix = withLeadingSlash(path).split("/")[1];
  if (locales.includes(prefix))
    return [prefix, path.replace(`/${prefix}`, "")];
  return [null, path];
}
const StringifiedRegExpPattern = /\/(.*?)\/([gimsuy]*)$/;
function normalizeRuntimeFilters(input) {
  return (input || []).map((rule) => {
    if (rule instanceof RegExp || typeof rule === "string")
      return rule;
    const match = rule.regex.match(StringifiedRegExpPattern);
    if (match)
      return new RegExp(match[1], match[2]);
    return false;
  }).filter(Boolean);
}
function createPathFilter(options = {}) {
  const urlFilter = createFilter(options);
  return (loc) => {
    let path = loc;
    try {
      path = parseURL(loc).pathname;
    } catch {
      return false;
    }
    return urlFilter(path);
  };
}
function createFilter(options = {}) {
  const include = options.include || [];
  const exclude = options.exclude || [];
  if (include.length === 0 && exclude.length === 0)
    return () => true;
  return function(path) {
    for (const v of [{ rules: exclude, result: false }, { rules: include, result: true }]) {
      const regexRules = v.rules.filter((r) => r instanceof RegExp);
      if (regexRules.some((r) => r.test(path)))
        return v.result;
      const stringRules = v.rules.filter((r) => typeof r === "string");
      if (stringRules.length > 0) {
        const routes = {};
        for (const r of stringRules) {
          if (r === path)
            return v.result;
          routes[r] = true;
        }
        const routeRulesMatcher = toRouteMatcher(createRouter({ routes, strictTrailingSlash: false }));
        if (routeRulesMatcher.matchAll(path).length > 0)
          return Boolean(v.result);
      }
    }
    return include.length === 0;
  };
}

function useSimpleSitemapRuntimeConfig(e) {
  const clone = JSON.parse(JSON.stringify(useRuntimeConfig(e).sitemap));
  for (const k in clone.sitemaps) {
    const sitemap = clone.sitemaps[k];
    sitemap.include = normalizeRuntimeFilters(sitemap.include);
    sitemap.exclude = normalizeRuntimeFilters(sitemap.exclude);
    clone.sitemaps[k] = sitemap;
  }
  return Object.freeze(clone);
}

async function fetchDataSource(input, event) {
  const context = typeof input.context === "string" ? { name: input.context } : input.context || { name: "fetch" };
  context.tips = context.tips || [];
  const url = typeof input.fetch === "string" ? input.fetch : input.fetch[0];
  const options = typeof input.fetch === "string" ? {} : input.fetch[1];
  const start = Date.now();
  const timeout = options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  let isHtmlResponse = false;
  try {
    const fetchContainer = url.startsWith("/") && event ? event : globalThis;
    const urls = await fetchContainer.$fetch(url, {
      ...options,
      responseType: "json",
      signal: timeoutController.signal,
      headers: defu$1(options?.headers, {
        Accept: "application/json"
      }, event ? { Host: getRequestHost(event, { xForwardedHost: true }) } : {}),
      // @ts-expect-error untyped
      onResponse({ response }) {
        if (typeof response._data === "string" && response._data.startsWith("<!DOCTYPE html>"))
          isHtmlResponse = true;
      }
    });
    const timeTakenMs = Date.now() - start;
    if (isHtmlResponse) {
      context.tips.push("This is usually because the URL isn't correct or is throwing an error. Please check the URL");
      return {
        ...input,
        context,
        urls: [],
        timeTakenMs,
        error: "Received HTML response instead of JSON"
      };
    }
    return {
      ...input,
      context,
      timeTakenMs,
      urls
    };
  } catch (_err) {
    const error = _err;
    if (error.message.includes("This operation was aborted"))
      context.tips.push("The request has taken too long. Make sure app sources respond within 5 seconds or adjust the timeout fetch option.");
    else
      context.tips.push(`Response returned a status of ${error.response?.status || "unknown"}.`);
    console.error("[@nuxtjs/sitemap] Failed to fetch source.", { url, error });
    return {
      ...input,
      context,
      urls: [],
      error: error.message
    };
  } finally {
    if (abortRequestTimeout) {
      clearTimeout(abortRequestTimeout);
    }
  }
}
function globalSitemapSources() {
  return Promise.resolve().then(function () { return globalSources; }).then((m) => m.sources);
}
function childSitemapSources(definition) {
  return definition?._hasSourceChunk ? Promise.resolve().then(function () { return childSources; }).then((m) => m.sources[definition.sitemapName] || []) : Promise.resolve([]);
}
async function resolveSitemapSources(sources, event) {
  return (await Promise.all(
    sources.map((source) => {
      if (typeof source === "object" && "urls" in source) {
        return {
          timeTakenMs: 0,
          ...source,
          urls: source.urls
        };
      }
      if (source.fetch)
        return fetchDataSource(source, event);
      return {
        ...source,
        error: "Invalid source"
      };
    })
  )).flat();
}

const _bvJrA4 = defineEventHandler(async (e) => {
  const _runtimeConfig = useSimpleSitemapRuntimeConfig();
  const { sitemaps: _sitemaps } = _runtimeConfig;
  const runtimeConfig = { ..._runtimeConfig };
  delete runtimeConfig.sitemaps;
  const globalSources = await globalSitemapSources();
  const nitroOrigin = useNitroOrigin(e);
  const sitemaps = {};
  for (const s of Object.keys(_sitemaps)) {
    sitemaps[s] = {
      ..._sitemaps[s],
      sources: await resolveSitemapSources(await childSitemapSources(_sitemaps[s]))
    };
  }
  return {
    nitroOrigin,
    sitemaps,
    runtimeConfig,
    globalSources: await resolveSitemapSources(globalSources)
  };
});

const _AnSKV0 = defineEventHandler(async (e) => {
  const fixPath = createSitePathResolver(e, { absolute: false, withBase: true });
  const { sitemapName: fallbackSitemapName, cacheMaxAgeSeconds, version, xslColumns, xslTips } = useSimpleSitemapRuntimeConfig();
  setHeader(e, "Content-Type", "application/xslt+xml");
  if (cacheMaxAgeSeconds)
    setHeader(e, "Cache-Control", `public, max-age=${cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(e, "Cache-Control", `no-cache, no-store`);
  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon" style="margin-right: 4px; font-size: 25px;" width="1em" height="1em" viewBox="0 0 32 32"><path fill="#93c5fd" d="M4 26h4v4H4zm10 0h4v4h-4zm10 0h4v4h-4zm1-10h-8v-2h-2v2H7a2.002 2.002 0 0 0-2 2v6h2v-6h8v6h2v-6h8v6h2v-6a2.002 2.002 0 0 0-2-2zM9 2v10h14V2zm2 2h2v6h-2zm10 6h-6V4h6z"></path></svg>`;
  const creditName = `<a href="https://github.com/nuxt-modules/sitemap" style="color: black; display: flex; align-items: center; font-weight: 500;" target="_blank" rel="noopener">${svgIcon} Nuxt Sitemap v${version}</a>`;
  const { name: siteName, url: siteUrl } = useSiteConfig(e);
  const referrer = getHeader(e, "Referer") || "/";
  const referrerPath = parseURL(referrer).pathname;
  const isNotIndexButHasIndex = referrerPath !== "/sitemap.xml" && referrerPath !== "/sitemap_index.xml" && referrerPath.endsWith(".xml");
  const sitemapName = parseURL(referrer).pathname.split("/").pop()?.split("-sitemap")[0] || fallbackSitemapName;
  const title = `${siteName}${sitemapName !== "sitemap.xml" ? ` - ${sitemapName === "sitemap_index.xml" ? "index" : sitemapName}` : ""}`.replace(/&/g, "&amp;");
  const canonicalQuery = getQuery(referrer).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const conditionalTips = [
    'You are looking at a <a href="https://developer.mozilla.org/en-US/docs/Web/XSLT/Transforming_XML_with_XSLT/An_Overview" style="color: #398465" target="_blank">XML stylesheet</a>. Read the <a href="https://nuxtseo.com/sitemap/guides/customising-ui" style="color: #398465" target="_blank">docs</a> to learn how to customize it. View the page source to see the raw XML.',
    `URLs missing? Check Nuxt Devtools Sitemap tab (or the <a href="${withQuery("/__sitemap__/debug.json", { sitemap: sitemapName })}" style="color: #398465" target="_blank">debug endpoint</a>).`
  ];
  if (!isShowingCanonical) {
    const canonicalPreviewUrl = withQuery(referrer, { canonical: "" });
    conditionalTips.push(`Your canonical site URL is <strong>${siteUrl}</strong>.`);
    conditionalTips.push(`You can preview your canonical sitemap by visiting <a href="${canonicalPreviewUrl}" style="color: #398465; white-space: nowrap;">${fixPath(canonicalPreviewUrl)}?canonical</a>`);
  } else {
    conditionalTips.push(`You are viewing the canonical sitemap. You can switch to using the request origin: <a href="${fixPath(referrer)}" style="color: #398465; white-space: nowrap ">${fixPath(referrer)}</a>`);
  }
  const tips = conditionalTips.map((t) => `<li><p>${t}</p></li>`).join("\n");
  const showTips = xslTips !== false;
  let columns = [...xslColumns];
  if (!columns.length) {
    columns = [
      { label: "URL", width: "50%" },
      { label: "Images", width: "25%", select: "count(image:image)" },
      { label: "Last Updated", width: "25%", select: "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))" }
    ];
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          body {
            font-family: Inter, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #333;
          }

          table {
            border: none;
            border-collapse: collapse;
          }

          .bg-yellow-200 {
            background-color: #fef9c3;
          }

          .p-5 {
            padding: 1.25rem;
          }

          .rounded {
            border-radius: 4px;
            }

          .shadow {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          #sitemap tr:nth-child(odd) td {
            background-color: #f8f8f8 !important;
          }

          #sitemap tbody tr:hover td {
            background-color: #fff;
          }

          #sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {
            color: #000;
          }

          .expl a {
            color: #398465
            font-weight: 600;
          }

          .expl a:visited {
            color: #398465
          }

          a {
            color: #000;
            text-decoration: none;
          }

          a:visited {
            color: #777;
          }

          a:hover {
            text-decoration: underline;
          }

          td {
            font-size: 12px;
          }

          .text-2xl {
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.25;
          }

          th {
            text-align: left;
            padding-right: 30px;
            font-size: 12px;
          }

          thead th {
            border-bottom: 1px solid #000;
          }
          .fixed { position: fixed; }
          .right-2 { right: 2rem; }
          .top-2 { top: 2rem; }
          .w-30 { width: 30rem; }
          p { margin: 0; }
          li { padding-bottom: 0.5rem; line-height: 1.5; }
          h1 { margin: 0; }
          .mb-5 { margin-bottom: 1.25rem; }
          .mb-3 { margin-bottom: 0.75rem; }
        </style>
      </head>
      <body>
        <div style="grid-template-columns: 1fr 1fr; display: grid; margin: 3rem;">
            <div>
             <div id="content">
          <h1 class="text-2xl mb-3">XML Sitemap</h1>
          <h2>${title}</h2>
          ${isNotIndexButHasIndex ? `<p style="font-size: 12px; margin-bottom: 1rem;"><a href="${fixPath("/sitemap_index.xml")}">${fixPath("/sitemap_index.xml")}</a></p>` : ""}
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <p class="expl" style="margin-bottom: 1rem;">
              This XML Sitemap Index file contains
              <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
            </p>
            <table id="sitemap" cellpadding="3">
              <thead>
                <tr>
                  <th width="75%">Sitemap</th>
                  <th width="25%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <xsl:variable name="sitemapURL">
                    <xsl:value-of select="sitemap:loc"/>
                  </xsl:variable>
                  <tr>
                    <td>
                      <a href="{$sitemapURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of
                        select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
            <p class="expl" style="margin-bottom: 1rem;">
              This XML Sitemap contains
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
            </p>
            <table id="sitemap" cellpadding="3">
              <thead>
                <tr>
                  ${columns.map((c) => `<th width="${c.width}">${c.label}</th>`).join("\n")}
                </tr>
              </thead>
              <tbody>
                <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
                <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    ${columns.filter((c) => c.label !== "URL").map((c) => `<td>
<xsl:value-of select="${c.select}"/>
</td>`).join("\n")}
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
        </div>
        </div>
                    ${showTips ? `<div class="w-30 top-2 shadow rounded p-5 right-2" style="margin: 0 auto;"><p><strong>Sitemap Tips (development only)</strong></p><ul style="margin: 1rem; padding: 0;">${tips}</ul><p style="margin-top: 1rem;">${creditName}</p></div>` : ""}
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;
});

function withoutQuery(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [path === "/" ? path : withoutTrailingSlash(path), rules])
      )
    })
  );
  return (pathOrUrl) => {
    const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, app.baseURL).pathname;
    const pathWithoutQuery = withoutQuery(path);
    return defu$1({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(pathWithoutQuery === "/" ? pathWithoutQuery : withoutTrailingSlash(pathWithoutQuery), app.baseURL)
    ).reverse());
  };
}

function resolve(s, resolvers) {
  if (typeof s === "undefined" || !resolvers)
    return s;
  s = typeof s === "string" ? s : s.toString();
  if (hasProtocol(s, { acceptRelative: true, strict: false }))
    return resolvers.fixSlashes(s);
  return resolvers.canonicalUrlResolver(s);
}
function removeTrailingSlash(s) {
  return s.replace(/\/(\?|#|$)/, "$1");
}
function preNormalizeEntry(_e, resolvers) {
  const e = typeof _e === "string" ? { loc: _e } : { ..._e };
  if (e.url && !e.loc) {
    e.loc = e.url;
    delete e.url;
  }
  if (typeof e.loc !== "string") {
    e.loc = "";
  }
  e.loc = removeTrailingSlash(e.loc);
  e._abs = hasProtocol(e.loc, { acceptRelative: false, strict: false });
  try {
    e._path = e._abs ? parseURL(e.loc) : parsePath(e.loc);
  } catch (e2) {
    e2._path = null;
  }
  if (e._path) {
    const query = parseQuery(e._path.search);
    const qs = stringifyQuery(query);
    e._relativeLoc = `${encodePath(e._path?.pathname)}${qs.length ? `?${qs}` : ""}`;
    if (e._path.host) {
      e.loc = stringifyParsedURL(e._path);
    } else {
      e.loc = e._relativeLoc;
    }
  } else {
    e.loc = encodeURI(e.loc);
  }
  if (e.loc === "")
    e.loc = `/`;
  e.loc = resolve(e.loc, resolvers);
  e._key = `${e._sitemap || ""}${withoutTrailingSlash(e.loc)}`;
  return e;
}
function normaliseEntry(_e, defaults, resolvers) {
  const e = defu$1(_e, defaults);
  if (e.lastmod) {
    const date = normaliseDate(e.lastmod);
    if (date)
      e.lastmod = date;
    else
      delete e.lastmod;
  }
  if (!e.lastmod)
    delete e.lastmod;
  e.loc = resolve(e.loc, resolvers);
  if (e.alternatives) {
    e.alternatives = mergeOnKey$1(e.alternatives.map((e2) => {
      const a = { ...e2 };
      if (typeof a.href === "string")
        a.href = resolve(a.href, resolvers);
      else if (typeof a.href === "object" && a.href)
        a.href = resolve(a.href.href, resolvers);
      return a;
    }), "hreflang");
  }
  if (e.images) {
    e.images = mergeOnKey$1(e.images.map((i) => {
      i = { ...i };
      i.loc = resolve(i.loc, resolvers);
      return i;
    }), "loc");
  }
  if (e.videos) {
    e.videos = e.videos.map((v) => {
      v = { ...v };
      if (v.content_loc)
        v.content_loc = resolve(v.content_loc, resolvers);
      return v;
    });
  }
  return e;
}
const IS_VALID_W3C_DATE = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function normaliseDate(d) {
  if (typeof d === "string") {
    if (d.includes("T")) {
      const t = d.split("T")[1];
      if (!t.includes("+") && !t.includes("-") && !t.includes("Z")) {
        d += "Z";
      }
    }
    if (!isValidW3CDate(d))
      return false;
    d = new Date(d);
    d.setMilliseconds(0);
    if (Number.isNaN(d.getTime()))
      return false;
  }
  const z = (n) => `0${n}`.slice(-2);
  const date = `${d.getUTCFullYear()}-${z(d.getUTCMonth() + 1)}-${z(d.getUTCDate())}`;
  if (d.getUTCHours() > 0 || d.getUTCMinutes() > 0 || d.getUTCSeconds() > 0) {
    return `${date}T${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())}Z`;
  }
  return date;
}

function sortSitemapUrls(urls) {
  return urls.sort(
    (a, b) => {
      const aLoc = typeof a === "string" ? a : a.loc;
      const bLoc = typeof b === "string" ? b : b.loc;
      return aLoc.localeCompare(bLoc, void 0, { numeric: true });
    }
  ).sort((a, b) => {
    const aLoc = (typeof a === "string" ? a : a.loc) || "";
    const bLoc = (typeof b === "string" ? b : b.loc) || "";
    const aSegments = aLoc.split("/").length;
    const bSegments = bLoc.split("/").length;
    if (aSegments > bSegments)
      return 1;
    if (aSegments < bSegments)
      return -1;
    return 0;
  });
}

function resolveKey(k) {
  switch (k) {
    case "images":
      return "image";
    case "videos":
      return "video";
    // news & others?
    case "news":
      return "news";
    default:
      return k;
  }
}
function handleObject(key, obj) {
  return [
    `        <${key}:${key}>`,
    ...Object.entries(obj).map(([sk, sv]) => {
      if (key === "video" && Array.isArray(sv)) {
        return sv.map((v) => {
          if (typeof v === "string") {
            return [
              `            `,
              `<${key}:${sk}>`,
              escapeValueForXml(v),
              `</${key}:${sk}>`
            ].join("");
          }
          const attributes = Object.entries(v).filter(([ssk]) => ssk !== sk).map(([ssk, ssv]) => `${ssk}="${escapeValueForXml(ssv)}"`).join(" ");
          return [
            `            <${key}:${sk} ${attributes}>`,
            // value is the same sk
            v[sk],
            `</${key}:${sk}>`
          ].join("");
        }).join("\n");
      }
      if (typeof sv === "object") {
        if (key === "video") {
          const attributes = Object.entries(sv).filter(([ssk]) => ssk !== sk).map(([ssk, ssv]) => `${ssk}="${escapeValueForXml(ssv)}"`).join(" ");
          return [
            `            <${key}:${sk} ${attributes}>`,
            // value is the same sk
            sv[sk],
            `</${key}:${sk}>`
          ].join("");
        }
        return [
          `            <${key}:${sk}>`,
          ...Object.entries(sv).map(([ssk, ssv]) => `                <${key}:${ssk}>${escapeValueForXml(ssv)}</${key}:${ssk}>`),
          `            </${key}:${sk}>`
        ].join("\n");
      }
      return `            <${key}:${sk}>${escapeValueForXml(sv)}</${key}:${sk}>`;
    }),
    `        </${key}:${key}>`
  ].join("\n");
}
function handleArray(key, arr) {
  if (arr.length === 0)
    return false;
  key = resolveKey(key);
  if (key === "alternatives") {
    return arr.map((obj) => [
      `        <xhtml:link rel="alternate" ${Object.entries(obj).map(([sk, sv]) => `${sk}="${escapeValueForXml(sv)}"`).join(" ")} />`
    ].join("\n")).join("\n");
  }
  return arr.map((obj) => handleObject(key, obj)).join("\n");
}
function handleEntry(k, e) {
  return Array.isArray(e[k]) ? handleArray(k, e[k]) : typeof e[k] === "object" ? handleObject(k, e[k]) : `        <${k}>${escapeValueForXml(e[k])}</${k}>`;
}
function wrapSitemapXml(input, resolvers, options) {
  const xsl = options.xsl ? resolvers.relativeBaseUrlResolver(options.xsl) : false;
  const credits = options.credits;
  input.unshift(`<?xml version="1.0" encoding="UTF-8"?>${xsl ? `<?xml-stylesheet type="text/xsl" href="${xsl}"?>` : ""}`);
  if (credits)
    input.push(`<!-- XML Sitemap generated by @nuxtjs/sitemap v${options.version} at ${(/* @__PURE__ */ new Date()).toISOString()} -->`);
  if (options.minify)
    return input.join("").replace(/(?<!<[^>]*)\s(?![^<]*>)/g, "");
  return input.join("\n");
}
function escapeValueForXml(value) {
  if (value === true || value === false)
    return value ? "yes" : "no";
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function resolveSitemapEntries(sitemap, sources, runtimeConfig, resolvers) {
  const {
    autoI18n,
    isI18nMapped
  } = runtimeConfig;
  const filterPath = createPathFilter({
    include: sitemap.include,
    exclude: sitemap.exclude
  });
  const _urls = sources.flatMap((e) => e.urls).map((_e) => {
    const e = preNormalizeEntry(_e, resolvers);
    if (!e.loc || !filterPath(e.loc))
      return false;
    return e;
  }).filter(Boolean);
  let validI18nUrlsForTransform = [];
  let warnIncorrectI18nTransformUsage = false;
  const withoutPrefixPaths = {};
  if (autoI18n && autoI18n.strategy !== "no_prefix") {
    const localeCodes = autoI18n.locales.map((l) => l.code);
    validI18nUrlsForTransform = _urls.map((_e, i) => {
      if (_e._abs)
        return false;
      const split = splitForLocales(_e._relativeLoc, localeCodes);
      let localeCode = split[0];
      const pathWithoutPrefix = split[1];
      if (!localeCode)
        localeCode = autoI18n.defaultLocale;
      const e = _e;
      e._pathWithoutPrefix = pathWithoutPrefix;
      const locale = autoI18n.locales.find((l) => l.code === localeCode);
      if (!locale)
        return false;
      e._locale = locale;
      e._index = i;
      e._key = `${e._sitemap || ""}${e._path?.pathname || "/"}${e._path.search}`;
      withoutPrefixPaths[pathWithoutPrefix] = withoutPrefixPaths[pathWithoutPrefix] || [];
      if (!withoutPrefixPaths[pathWithoutPrefix].some((e2) => e2._locale.code === locale.code))
        withoutPrefixPaths[pathWithoutPrefix].push(e);
      return e;
    }).filter(Boolean);
    for (const e of validI18nUrlsForTransform) {
      if (!e._i18nTransform && !e.alternatives?.length) {
        const alternatives = withoutPrefixPaths[e._pathWithoutPrefix].map((u) => {
          const entries = [];
          if (u._locale.code === autoI18n.defaultLocale) {
            entries.push({
              href: u.loc,
              hreflang: "x-default"
            });
          }
          entries.push({
            href: u.loc,
            hreflang: u._locale._hreflang || autoI18n.defaultLocale
          });
          return entries;
        }).flat().filter(Boolean);
        if (alternatives.length)
          e.alternatives = alternatives;
      } else if (e._i18nTransform) {
        delete e._i18nTransform;
        if (autoI18n.strategy === "no_prefix") {
          warnIncorrectI18nTransformUsage = true;
        }
        if (autoI18n.differentDomains) {
          e.alternatives = [
            {
              // apply default locale domain
              ...autoI18n.locales.find((l) => [l.code, l.language].includes(autoI18n.defaultLocale)),
              code: "x-default"
            },
            ...autoI18n.locales.filter((l) => !!l.domain)
          ].map((locale) => {
            return {
              hreflang: locale._hreflang,
              href: joinURL(withHttps(locale.domain), e._pathWithoutPrefix)
            };
          });
        } else {
          for (const l of autoI18n.locales) {
            let loc = joinURL(`/${l.code}`, e._pathWithoutPrefix);
            if (autoI18n.differentDomains || ["prefix_and_default", "prefix_except_default"].includes(autoI18n.strategy) && l.code === autoI18n.defaultLocale)
              loc = e._pathWithoutPrefix;
            const _sitemap = isI18nMapped ? l._sitemap : void 0;
            const newEntry = preNormalizeEntry({
              _sitemap,
              ...e,
              _index: void 0,
              _key: `${_sitemap || ""}${loc || "/"}${e._path.search}`,
              _locale: l,
              loc,
              alternatives: [{ code: "x-default", _hreflang: "x-default" }, ...autoI18n.locales].map((locale) => {
                const code = locale.code === "x-default" ? autoI18n.defaultLocale : locale.code;
                const isDefault = locale.code === "x-default" || locale.code === autoI18n.defaultLocale;
                let href = "";
                if (autoI18n.strategy === "prefix") {
                  href = joinURL("/", code, e._pathWithoutPrefix);
                } else if (["prefix_and_default", "prefix_except_default"].includes(autoI18n.strategy)) {
                  if (isDefault) {
                    href = e._pathWithoutPrefix;
                  } else {
                    href = joinURL("/", code, e._pathWithoutPrefix);
                  }
                }
                if (!filterPath(href))
                  return false;
                return {
                  hreflang: locale._hreflang,
                  href
                };
              }).filter(Boolean)
            }, resolvers);
            if (e._locale.code === newEntry._locale.code) {
              _urls[e._index] = newEntry;
              e._index = void 0;
            } else {
              _urls.push(newEntry);
            }
          }
        }
      }
      if (isI18nMapped) {
        e._sitemap = e._sitemap || e._locale._sitemap;
        e._key = `${e._sitemap || ""}${e.loc || "/"}${e._path.search}`;
      }
      if (e._index)
        _urls[e._index] = e;
    }
  }
  if (warnIncorrectI18nTransformUsage) {
    logger.warn("You're using _i18nTransform with the `no_prefix` strategy. This will cause issues with the sitemap. Please remove the _i18nTransform flag or change i18n strategy.");
  }
  return _urls;
}
async function buildSitemapUrls(sitemap, resolvers, runtimeConfig) {
  const {
    sitemaps,
    // enhancing
    autoI18n,
    isI18nMapped,
    isMultiSitemap,
    // sorting
    sortEntries,
    // chunking
    defaultSitemapsChunkSize
  } = runtimeConfig;
  const isChunking = typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemap.sitemapName));
  function maybeSort(urls) {
    return sortEntries ? sortSitemapUrls(urls) : urls;
  }
  function maybeSlice(urls) {
    if (isChunking && defaultSitemapsChunkSize) {
      const chunk = Number(sitemap.sitemapName);
      return urls.slice(chunk * defaultSitemapsChunkSize, (chunk + 1) * defaultSitemapsChunkSize);
    }
    return urls;
  }
  if (autoI18n?.differentDomains) {
    const domain = autoI18n.locales.find((e) => [e.language, e.code].includes(sitemap.sitemapName))?.domain;
    if (domain) {
      const _tester = resolvers.canonicalUrlResolver;
      resolvers.canonicalUrlResolver = (path) => resolveSitePath(path, {
        absolute: true,
        withBase: false,
        siteUrl: withHttps(domain),
        trailingSlash: _tester("/test/").endsWith("/"),
        base: "/"
      });
    }
  }
  const sources = sitemap.includeAppSources ? await globalSitemapSources() : [];
  sources.push(...await childSitemapSources(sitemap));
  const resolvedSources = await resolveSitemapSources(sources, resolvers.event);
  const enhancedUrls = resolveSitemapEntries(sitemap, resolvedSources, { autoI18n, isI18nMapped }, resolvers);
  const filteredUrls = enhancedUrls.filter((e) => {
    if (isMultiSitemap && e._sitemap && sitemap.sitemapName)
      return e._sitemap === sitemap.sitemapName;
    return true;
  });
  const sortedUrls = maybeSort(filteredUrls);
  return maybeSlice(sortedUrls);
}
function urlsToXml(urls, resolvers, { version, xsl, credits, minify }) {
  const urlset = urls.map((e) => {
    const keys = Object.keys(e).filter((k) => !k.startsWith("_"));
    return [
      "    <url>",
      keys.map((k) => handleEntry(k, e)).filter(Boolean).join("\n"),
      "    </url>"
    ].join("\n");
  });
  return wrapSitemapXml([
    '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlset.join("\n"),
    "</urlset>"
  ], resolvers, { version, xsl, credits, minify });
}

function useNitroUrlResolvers(e) {
  const canonicalQuery = getQuery$1(e).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const siteConfig = useSiteConfig(e);
  return {
    event: e,
    fixSlashes: (path) => fixSlashes(siteConfig.trailingSlash, path),
    // we need these as they depend on the nitro event
    canonicalUrlResolver: createSitePathResolver(e, {
      canonical: isShowingCanonical || false,
      absolute: true,
      withBase: true
    }),
    relativeBaseUrlResolver: createSitePathResolver(e, { absolute: false, withBase: true })
  };
}
async function createSitemap(event, definition, runtimeConfig) {
  const { sitemapName } = definition;
  const nitro = useNitroApp();
  const resolvers = useNitroUrlResolvers(event);
  let sitemapUrls = await buildSitemapUrls(definition, resolvers, runtimeConfig);
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const { autoI18n } = runtimeConfig;
  sitemapUrls = sitemapUrls.map((u) => {
    const path = u._path?.pathname || u.loc;
    if (!getPathRobotConfig(event, { path, skipSiteIndexable: true }).indexable)
      return false;
    let routeRules = routeRuleMatcher(path);
    if (autoI18n?.locales && autoI18n?.strategy !== "no_prefix") {
      const match = splitForLocales(path, autoI18n.locales.map((l) => l.code));
      const pathWithoutPrefix = match[1];
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        routeRules = defu$1(routeRules, routeRuleMatcher(pathWithoutPrefix));
    }
    if (routeRules.sitemap === false)
      return false;
    if (typeof routeRules.index !== "undefined" && !routeRules.index || typeof routeRules.robots !== "undefined" && !routeRules.robots) {
      return false;
    }
    const hasRobotsDisabled = Object.entries(routeRules.headers || {}).some(([name, value]) => name.toLowerCase() === "x-robots-tag" && value.toLowerCase().includes("noindex"));
    if (routeRules.redirect || hasRobotsDisabled)
      return false;
    return routeRules.sitemap ? defu$1(u, routeRules.sitemap) : u;
  }).filter(Boolean);
  const resolvedCtx = {
    urls: sitemapUrls,
    sitemapName
  };
  await nitro.hooks.callHook("sitemap:resolved", resolvedCtx);
  const maybeSort = (urls2) => runtimeConfig.sortEntries ? sortSitemapUrls(urls2) : urls2;
  const normalizedPreDedupe = resolvedCtx.urls.map((e) => normaliseEntry(e, definition.defaults, resolvers));
  const urls = maybeSort(mergeOnKey$1(normalizedPreDedupe, "_key").map((e) => normaliseEntry(e, definition.defaults, resolvers)));
  const sitemap = urlsToXml(urls, resolvers, runtimeConfig);
  const ctx = { sitemap, sitemapName };
  await nitro.hooks.callHook("sitemap:output", ctx);
  setHeader(event, "Content-Type", "text/xml; charset=UTF-8");
  if (runtimeConfig.cacheMaxAgeSeconds)
    setHeader(event, "Cache-Control", `public, max-age=${runtimeConfig.cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(event, "Cache-Control", `no-cache, no-store`);
  event.context._isSitemap = true;
  return ctx.sitemap;
}

const _CWKO26 = defineEventHandler(async (e) => {
  const runtimeConfig = useSimpleSitemapRuntimeConfig();
  const { sitemaps } = runtimeConfig;
  if ("index" in sitemaps) {
    return sendRedirect(e, withBase("/sitemap_index.xml", useRuntimeConfig().app.baseURL), 302 );
  }
  return createSitemap(e, Object.values(sitemaps)[0], runtimeConfig);
});

function useSchemaOrgConfig(e) {
  const runtimeConfig = useRuntimeConfig(e);
  return defu$1(runtimeConfig["nuxt-schema-org"], {
    scriptAttributes: {}
  });
}

const _zc6Jcs = defineEventHandler(async (e) => {
  const nitroOrigin = useNitroOrigin(e);
  return {
    nitroOrigin,
    runtimeConfig: useSchemaOrgConfig(e)
  };
});

const fileMapping = {};

const _kzg2Lb = defineEventHandler(async (e) => {
  const path = parseURL(e.path).pathname;
  if (fileMapping[path]) {
    if (path.endsWith(".svg"))
      setHeader(e, "Content-Type", "image/svg+xml");
    else if (path.endsWith(".png"))
      setHeader(e, "Content-Type", "image/png");
    else if (path.endsWith(".jpg") || path.endsWith(".jpeg"))
      setHeader(e, "Content-Type", "image/jpeg");
    return fs.readFileSync(fileMapping[path]);
  }
});

function defineRule(rule) {
  return rule;
}
function isNonFetchableLink(link) {
  return link.startsWith("javascript:") || link.startsWith("blob:") || link.startsWith("data:") || link.startsWith("mailto:") || link.startsWith("tel:") || link.startsWith("#");
}

const responses = {};
async function getLinkResponse({ link, timeout, fetchRemoteUrls, baseURL, isInStorage }) {
  if (link.includes("#") && !link.startsWith("#"))
    link = link.split("#")[0];
  link = decodeURI(link);
  const response = responses[link];
  if (!response) {
    if (isNonFetchableLink(link) || link.startsWith("http") && !fetchRemoteUrls || isInStorage()) {
      responses[link] = Promise.resolve({ status: 200, statusText: "OK", headers: {} });
    } else {
      responses[link] = crawlFetch(link, { timeout, baseURL });
    }
  }
  return responses[link];
}
async function crawlFetch(link, options = {}) {
  const timeout = options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  return await $fetch$1.raw(encodeURI(link), {
    baseURL: options.baseURL,
    method: "HEAD",
    signal: timeoutController.signal,
    headers: {
      "user-agent": "Nuxt Link Checker"
    }
  }).catch((error) => {
    if (error.name === "AbortError")
      return { status: 408, statusText: "Request Timeout", headers: {} };
    return { status: 404, statusText: "Not Found", headers: {} };
  }).finally(() => clearTimeout(abortRequestTimeout)).then((res) => ({ status: res.status, statusText: res.statusText, headers: res.headers }));
}

const lruFsCache = /* @__PURE__ */ new Map();
function generateLinkSources(s, link) {
  const regEscapedLink = link.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const VueLinkRegExp = new RegExp(`(['"])${regEscapedLink}(['"])`);
  const MdLinkRegExp = new RegExp(`\\[.*\\]\\((${regEscapedLink})\\)`);
  const lines = s.split("\n");
  const sources = [];
  for (const [i, line] of lines.entries()) {
    const lineNumber = i + 1;
    const preLineLength = lines.slice(0, lineNumber - 1).join("\n").length + 1;
    let index = line.search(VueLinkRegExp);
    if (index !== -1) {
      const columnNumber = index - 1;
      const start = preLineLength + index + 1;
      const end = start + link.length;
      sources.push({ start, end, lineNumber, columnNumber });
    } else {
      index = line.search(MdLinkRegExp);
      if (index !== -1) {
        const substr = line.slice(index);
        const start = preLineLength + index + substr.indexOf("(", index) + 1;
        const end = start + link.length;
        if (s.substring(start, end) === link) {
          sources.push({ start, end, lineNumber: i + 1, columnNumber: start });
        }
      }
    }
  }
  return sources;
}
const LINE_PREVIEW_OFFSET = 2;
async function generateFileLinkPreviews(filepath, link) {
  const contents = lruFsCache.has(filepath) ? lruFsCache.get(filepath) : await readFile(filepath, "utf8");
  const previews = generateLinkSourcePreviews(contents, link);
  let lang = filepath.split(".").pop();
  if (!lang)
    lang = "vue";
  lruFsCache.set(filepath, contents);
  if (lruFsCache.size > 100)
    lruFsCache.delete(lruFsCache.keys().next().value);
  return { previews, lang, filepath };
}
async function generateFileLinkDiff(filepath, original, replacement) {
  const contents = lruFsCache.has(filepath) ? lruFsCache.get(filepath) : await readFile(filepath, "utf8");
  lruFsCache.set(filepath, contents);
  if (lruFsCache.size > 100)
    lruFsCache.delete(lruFsCache.keys().next().value);
  return {
    ...generateLinkDiff(contents, original, replacement),
    filepath
  };
}
function generateLinkSourcePreviews(s, link) {
  const sources = generateLinkSources(s, link);
  const lines = s.split("\n");
  return sources.map(({ lineNumber, columnNumber }) => {
    const code = lines.slice(lineNumber - LINE_PREVIEW_OFFSET - 1, lineNumber + LINE_PREVIEW_OFFSET).join("\n");
    return { code, lineNumber, columnNumber };
  });
}
function generateLinkDiff(s, originalLink, newLink) {
  const ms = new MagicString(s);
  const sources = generateLinkSources(s, originalLink);
  sources.forEach(({ start, end }) => {
    ms.remove(start, end);
    ms.prependRight(start, newLink);
  });
  return { diff: calculateDiff(s, ms.toString()), code: ms.toString() };
}
function calculateDiff(from, to) {
  const diffs = diffLines(from.trim(), to.trim());
  const added = [];
  const removed = [];
  const result = [];
  for (const diff of diffs) {
    const lines = diff.value.trimEnd().split("\n");
    for (const line of lines) {
      if (diff.added) {
        added.push(result.length);
        result.push(line);
      } else if (diff.removed) {
        removed.push(result.length);
        result.push(line);
      } else {
        result.push(line);
      }
    }
  }
  return {
    added,
    removed,
    result: result.join("\n")
  };
}

function RuleAbsoluteSiteUrls() {
  return defineRule({
    id: "absolute-site-urls",
    test({ report, link, url, siteConfig }) {
      if (!link.startsWith(siteConfig.url))
        return;
      report({
        name: "absolute-site-urls",
        scope: "warning",
        message: "Internal links should be relative.",
        tip: "Using internal links that start with / is recommended to avoid issues when deploying your site to different domain names",
        fix: url.pathname,
        fixDescription: `Remove ${siteConfig.url}.`
      });
    }
  });
}

function RuleDescriptiveLinkText() {
  return defineRule({
    id: "link-text",
    test({ textContent, report }) {
      if (typeof textContent === "undefined")
        return;
      if (!textContent) {
        report({
          name: "link-text",
          scope: "warning",
          message: "Missing link textContent, title or aria-label.",
          tip: "Links with descriptive text are easier to understand for screen readers and search engines."
        });
      }
      const uniformLinkText = textContent.trim().toLowerCase();
      const listOfBadDescriptiveLinkTexts = [
        "click here",
        "click this",
        "go",
        "here",
        "this",
        "start",
        "right here",
        "more",
        "learn more"
      ];
      if (listOfBadDescriptiveLinkTexts.includes(uniformLinkText)) {
        report({
          name: "link-text",
          scope: "warning",
          message: `Link text "${textContent}" should be more descriptive.`,
          tip: `The ${textContent} descriptive text does not provide any context to the link.`
        });
      }
    }
  });
}

function RuleMissingHash() {
  return defineRule({
    id: "missing-hash",
    test({ link, report, ids, fromPath }) {
      const [path, hash] = link.split("#");
      if (!link.includes("#") || link.endsWith("#top") || fixSlashes(false, path) !== fromPath)
        return;
      if (ids.includes(hash))
        return;
      const fuse = new Fuse(ids, {
        threshold: 0.6
      });
      const fixedHash = fuse.search(hash.replace("#", ""))?.[0]?.item;
      const payload = {
        name: "missing-hash",
        scope: "error",
        message: `No element with id "${hash}" found.`
      };
      if (fixedHash) {
        payload.fix = `${link.split("#")[0]}#${fixedHash}`;
        payload.fixDescription = `Did you mean ${payload.fix}?`;
      }
      report(payload);
    }
  });
}

function RuleNoDocumentRelative() {
  return defineRule({
    id: "no-baseless",
    // TODO rename to no-document-relative
    test({ link, fromPath, report }) {
      if (link.startsWith("/") || link.startsWith("http") || isNonFetchableLink(link))
        return;
      report({
        name: "no-baseless",
        scope: "warning",
        message: "Links should be root relative.",
        fix: `${joinURL(fromPath, link)}`,
        fixDescription: `Add base ${fromPath}.`
      });
    }
  });
}

function RuleNoDoubleSlashes() {
  return defineRule({
    id: "no-double-slashes",
    test({ url, link, report }) {
      if (link.startsWith("//") && !link.includes(".")) {
        report({
          name: "no-double-slashes",
          scope: "warning",
          message: "Links should not contain double slashes.",
          fix: link.replaceAll(/(^\/{2,}|\/{2,})/g, "/"),
          fixDescription: "Remove double slashes."
        });
      } else if (url.pathname.match(/(^\/{2,}|\/{2,})/)) {
        report({
          name: "no-double-slashes",
          scope: "warning",
          message: "Links should not contain double slashes.",
          fix: link.replace(url.pathname, url.pathname.replaceAll(/(^\/{2,}|\/{2,})/g, "/")),
          fixDescription: "Remove double slashes."
        });
      }
    }
  });
}

function RuleNoDuplicateQueryParams() {
  return defineRule({
    id: "no-duplicate-query-params",
    test({ report, link, url }) {
      if (!url.search)
        return;
      const search = url.search.slice(1);
      const searchParams = search.split("&").map((param) => param.split("=")[0]);
      const duplicates = /* @__PURE__ */ new Set();
      for (const param of searchParams) {
        if (duplicates.has(param)) {
          const fix = link.replace(new RegExp(`([?&])${param}=[^&]*&?`), "$1");
          report({
            name: "no-duplicate-query-params",
            scope: "warning",
            message: "Links should not contain duplicated query parameters.",
            fix,
            tip: "Duplicate query parameters can cause canonical URL issues.",
            fixDescription: "Remove duplicate query parameter."
          });
          return;
        }
        duplicates.add(param);
      }
    }
  });
}

function RuleNoErrorResponse() {
  return defineRule({
    id: "no-error-response",
    test({ link, response, report, pageSearch }) {
      if (!response.status || response.status.toString().startsWith("2") || response.status.toString().startsWith("3") || isNonFetchableLink(link))
        return;
      const payload = {
        name: "no-error-response",
        scope: "error",
        message: `Should not respond with status code ${response.status}${response.statusText ? ` (${response.statusText})` : ""}.`
      };
      if (link.startsWith("/") && pageSearch) {
        const related = pageSearch.search(link)?.[0]?.item;
        if (related?.path && related.path !== link) {
          payload.fix = related.path;
          payload.fixDescription = `Did you mean ${related.path}?`;
        }
      } else {
        payload.canRetry = true;
      }
      report(payload);
    }
  });
}

function RuleNoJavascript() {
  return defineRule({
    id: "no-javascript",
    test({ link, report }) {
      if (link.startsWith("javascript:")) {
        report({
          name: "no-javascript",
          scope: "error",
          tip: 'Using a <button type="button"> instead as a better practice.',
          message: "Should not use JavaScript"
        });
      }
    }
  });
}

function RuleNoMissingHref() {
  return defineRule({
    id: "no-missing-href",
    test({ report, link, role }) {
      if (link.trim().length > 0 || role === "button") {
        return;
      }
      report({
        name: "no-missing-href",
        scope: "warning",
        message: "For accessibility and UX anchor tags require a href attribute.",
        tip: 'Use a button element with type="button" instead if the link is not navigational.'
      }, true);
    }
  });
}

function RuleNoNonAsciiChars() {
  return defineRule({
    id: "no-non-ascii-chars",
    test({ link, report }) {
      if (/[^\u0020-\u007F]/.test(link)) {
        report({
          name: "no-non-ascii-chars",
          scope: "warning",
          message: "Links should not contain non-ascii characters.",
          // fix is to uri encode the link
          fix: encodeURI(link),
          fixDescription: "Encode non-ascii characters."
        });
      }
    }
  });
}

function RuleNoUnderscores() {
  return defineRule({
    id: "no-underscores",
    test({ link, report }) {
      if (link.includes("_")) {
        report({
          name: "no-underscores",
          scope: "warning",
          message: "Links should not contain underscores.",
          fix: link.replaceAll("_", "-"),
          fixDescription: "Replace underscores with dashes."
        });
      }
    }
  });
}

function RuleNoUppercaseChars() {
  return defineRule({
    id: "no-uppercase-chars",
    test({ report, link }) {
      if (link.match(/[A-Z]/)) {
        report({
          name: "no-uppercase-chars",
          scope: "warning",
          message: "Links should not contain uppercase characters.",
          fix: link.toLowerCase(),
          fixDescription: "Convert to lowercase."
        });
      }
    }
  });
}

function RuleNoWhitespace() {
  return defineRule({
    id: "no-whitespace",
    test({ link, report }) {
      if (link.trim() !== link) {
        report({
          name: "no-whitespace",
          scope: "warning",
          message: "Links should not start or end with whitespace.",
          fix: link.trim(),
          fixDescription: "Remove whitespace from start and end of link."
        });
      }
      if (link.trim().match(/\s/)) {
        report({
          name: "no-whitespace",
          scope: "warning",
          message: "Links should not contain whitespace.",
          tip: "Use hyphens to separate words instead of spaces."
        });
      }
    }
  });
}

function RuleTrailingSlash() {
  return defineRule({
    id: "trailing-slash",
    test({ report, link, siteConfig }) {
      if (!link.startsWith("/") && !link.startsWith(siteConfig.url))
        return;
      const $url = parseURL(link);
      const isFile = $url.pathname.split("/").pop().includes(".");
      if ($url.pathname === "/" || isFile)
        return;
      const fix = fixSlashes(siteConfig.trailingSlash, link);
      if (!$url.pathname.endsWith("/") && siteConfig.trailingSlash) {
        report({
          name: "trailing-slash",
          scope: "warning",
          message: "Should have a trailing slash.",
          tip: "Incorrect trailing slashes can cause duplicate pages in search engines and waste crawl budget.",
          fix,
          fixDescription: "Add trailing slash."
        });
      } else if ($url.pathname.endsWith("/") && !siteConfig.trailingSlash) {
        report({
          name: "trailing-slash",
          scope: "warning",
          message: "Should not have a trailing slash.",
          tip: "Incorrect trailing slashes can cause duplicate pages in search engines and waste crawl budget.",
          fix,
          fixDescription: "Removing trailing slash."
        });
      }
    }
  });
}

function RuleRedirects() {
  return defineRule({
    id: "redirects",
    test({ report, response }) {
      if (response.status !== 301 && response.status !== 302)
        return;
      const payload = {
        name: "redirects",
        scope: "warning",
        message: "Should not redirect.",
        tip: "Redirects use up your crawl budget and increase loading times, it's recommended to avoid them when possible."
      };
      const fix = typeof response.headers?.get === "function" ? response.headers.get("location") : response.headers?.location || false;
      if (fix) {
        payload.fix = fix;
        payload.fixDescription = `Set to redirect URL ${fix}.`;
      }
      report(payload);
    }
  });
}

const AllInspections = [
  RuleNoMissingHref(),
  RuleNoDuplicateQueryParams(),
  RuleNoNonAsciiChars(),
  RuleMissingHash(),
  RuleNoUnderscores(),
  RuleNoWhitespace(),
  RuleNoDoubleSlashes(),
  RuleNoErrorResponse(),
  RuleNoDocumentRelative(),
  RuleNoJavascript(),
  RuleTrailingSlash(),
  RuleNoUppercaseChars(),
  RuleAbsoluteSiteUrls(),
  RuleRedirects(),
  RuleDescriptiveLinkText()
];
function inspect(ctx, rules) {
  rules = rules || AllInspections;
  const res = { error: [], warning: [], fix: ctx.link, link: ctx.link };
  let link = ctx.link;
  const url = parseURL(link);
  const validInspections = rules.filter(({ id }) => !(ctx.skipInspections || []).includes(id));
  let processing = true;
  for (const rule of validInspections) {
    rule.test({
      ...ctx,
      link,
      url,
      report(obj, stop) {
        if (stop) {
          processing = false;
        }
        res[obj.scope].push(obj);
        if (obj.fix)
          link = obj.fix;
      }
    });
    if (!processing)
      break;
  }
  res.passes = !res.error?.length && !res.warning?.length;
  res.fix = link;
  res.textContent = ctx.textContent;
  return res;
}

function serverQueryContent() {
  return {
    async findOne() {
      return false;
    },
    async find() {
      return [];
    }
  };
}

function isInternalRoute(path) {
  const lastSegment = path.split("/").pop() || path;
  return lastSegment.includes(".") || path.startsWith("/__") || path.startsWith("@");
}
const _gmYowm = defineEventHandler(async (e) => {
  const { tasks, ids } = await readBody(e);
  const runtimeConfig = useRuntimeConfig().public["nuxt-link-checker"] || {};
  const partialCtx = {
    ids,
    fromPath: fixSlashes(false, parseURL(getHeader(e, "referer") || "/").pathname),
    siteConfig: useSiteConfig(e)
  };
  const extraPaths = [];
  if (serverQueryContent) {
    const contentDocument = await serverQueryContent().findOne();
    if (contentDocument)
      extraPaths.push(resolve$1(runtimeConfig.rootDir, "content", contentDocument._file));
  }
  lruFsCache.clear();
  const links = await $fetch("/__link-checker__/links");
  return Promise.all(
    tasks.map(async ({ link, paths, textContent }) => {
      if (isNonFetchableLink(link) || isInternalRoute(link))
        return { passes: true };
      const response = await getLinkResponse({
        link,
        timeout: runtimeConfig.fetchTimeout,
        fetchRemoteUrls: runtimeConfig.fetchRemoteUrls,
        baseURL: useNitroOrigin(e),
        isInStorage() {
          return false;
        }
      });
      const result = inspect({
        ...partialCtx,
        link,
        textContent,
        pageSearch: new Fuse(links, {
          keys: ["path", "title"],
          threshold: 0.5
        }),
        response,
        skipInspections: runtimeConfig.skipInspections
      });
      const filePaths = [
        ...extraPaths,
        ...paths.map((p) => {
          const [filepath] = p.split(":");
          return filepath;
        })
      ];
      if (!result.passes) {
        result.sources = (await Promise.all(filePaths.map(async (filepath) => await generateFileLinkPreviews(filepath, link)))).filter((s) => s.previews.length);
        result.diff = await Promise.all((result.sources || []).map(async ({ filepath }) => generateFileLinkDiff(filepath, link, result.fix)));
      }
      return result;
    })
  );
});

const pagePaths = [
  {
    "title": "",
    "link": "/blog"
  },
  {
    "title": "",
    "link": "/glossary"
  },
  {
    "title": "",
    "link": "/"
  },
  {
    "title": "",
    "link": "/legal/affiliate-disclosure"
  },
  {
    "title": "",
    "link": "/legal/dmca"
  },
  {
    "title": "",
    "link": "/legal"
  },
  {
    "title": "",
    "link": "/legal/privacy-policy"
  },
  {
    "title": "",
    "link": "/legal/terms-conditions"
  },
  {
    "title": "",
    "link": "/posts/category"
  },
  {
    "title": "",
    "link": "/posts"
  },
  {
    "title": "",
    "link": "/reviews/best"
  },
  {
    "title": "",
    "link": "/reviews"
  },
  {
    "title": "",
    "link": "/tools/combine-csv-files"
  },
  {
    "title": "",
    "link": "/tools/convert-json-to-csv"
  },
  {
    "title": "",
    "link": "/tools/count-characters"
  },
  {
    "title": "",
    "link": "/tools"
  },
  {
    "title": "",
    "link": "/tools/paragraph-counter"
  },
  {
    "title": "",
    "link": "/sitemap.xml"
  },
  {
    "title": "",
    "link": "/modules-sitemap.xml"
  },
  {
    "title": "",
    "link": "/company-sitemap.xml"
  },
  {
    "title": "",
    "link": "/company-categories-sitemap.xml"
  },
  {
    "title": "",
    "link": "/posts-sitemap.xml"
  },
  {
    "title": "",
    "link": "/post-categories-sitemap.xml"
  },
  {
    "title": "",
    "link": "/glossary-sitemap.xml"
  },
  {
    "title": "",
    "link": "/blog-sitemap.xml"
  }
];

const merger = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey(arr, key) {
  const res = {};
  arr.forEach((item) => {
    const k = item[key];
    res[k] = merger(item, res[k] || {});
  });
  return Object.values(res);
}
const _voLmRz = defineCachedEventHandler(async (e) => {
  const runtimeConfig = useRuntimeConfig().public["nuxt-link-checker"] || {};
  const linkDb = [
    ...pagePaths
  ];
  if (runtimeConfig.hasSitemapModule) {
    const sitemapDebug = await $fetch("/__sitemap__/debug.json");
    const entries = sitemapDebug.globalSources.map((source) => source.urls).flat();
    linkDb.push(...entries.map((s) => ({ path: s.loc, title: "" })));
  }
  if (serverQueryContent) {
    const contentDocuments = await serverQueryContent().find();
    if (contentDocuments) {
      linkDb.push(...contentDocuments.map((doc) => ({
        path: doc._path,
        title: doc.title
      })));
    }
  }
  return mergeOnKey(linkDb, "link");
}, {
  maxAge: 10
  // avoid thrashing
});

const _fr5UIw = defineEventHandler(async (e) => {
  return {
    runtimeConfig: useRuntimeConfig(e).public["nuxt-link-checker"]
  };
});

const defaultThrowErrorValue = { throwError: true };
const defaultSecurityConfig = (serverlUrl, strict) => {
  const defaultConfig = {
    strict,
    headers: {
      crossOriginResourcePolicy: "same-origin",
      crossOriginOpenerPolicy: "same-origin",
      crossOriginEmbedderPolicy: "unsafe-none" ,
      contentSecurityPolicy: {
        "base-uri": ["'none'"],
        "font-src": ["'self'", "https:", "data:"],
        "form-action": ["'self'"],
        "frame-ancestors": ["'self'"],
        "img-src": ["'self'", "data:"],
        "object-src": ["'none'"],
        "script-src-attr": ["'none'"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "script-src": ["'self'", "https:", "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        "upgrade-insecure-requests": true
      },
      originAgentCluster: "?1",
      referrerPolicy: "no-referrer",
      strictTransportSecurity: {
        maxAge: 15552e3,
        includeSubdomains: true
      },
      xContentTypeOptions: "nosniff",
      xDNSPrefetchControl: "off",
      xDownloadOptions: "noopen",
      xFrameOptions: "SAMEORIGIN",
      xPermittedCrossDomainPolicies: "none",
      xXSSProtection: "0",
      permissionsPolicy: {
        camera: [],
        "display-capture": [],
        fullscreen: [],
        geolocation: [],
        microphone: []
      }
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2e6,
      maxUploadFileRequestInBytes: 8e6,
      ...defaultThrowErrorValue
    },
    rateLimiter: {
      // Twitter search rate limiting
      tokensPerInterval: 150,
      interval: 3e5,
      headers: false,
      driver: {
        name: "lruCache"
      },
      ...defaultThrowErrorValue
    },
    xssValidator: {
      methods: ["GET", "POST"],
      ...defaultThrowErrorValue
    },
    corsHandler: {
      // Options by CORS middleware for Express https://github.com/expressjs/cors#configuration-options
      origin: serverlUrl,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      preflight: {
        statusCode: 204
      }
    },
    allowedMethodsRestricter: {
      methods: "*",
      ...defaultThrowErrorValue
    },
    hidePoweredBy: true,
    basicAuth: false,
    enabled: true,
    csrf: false,
    nonce: true,
    removeLoggers: true,
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false,
      nitroHeaders: true,
      exportToPresets: true
    },
    sri: true
  };
  return defaultConfig;
};

const FILE_UPLOAD_HEADER = "multipart/form-data";
const defaultSizeLimiter = defaultSecurityConfig("").requestSizeLimiter;
const _mDpYPT = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.requestSizeLimiter) {
    const requestSizeLimiter = defu(
      rules.requestSizeLimiter,
      defaultSizeLimiter
    );
    if (["POST", "PUT", "DELETE"].includes(event.node.req.method)) {
      const contentLengthValue = getRequestHeader(event, "content-length");
      const contentTypeValue = getRequestHeader(event, "content-type");
      const isFileUpload = contentTypeValue?.includes(FILE_UPLOAD_HEADER);
      const requestLimit = isFileUpload ? requestSizeLimiter.maxUploadFileRequestInBytes : requestSizeLimiter.maxRequestSizeInBytes;
      if (parseInt(contentLengthValue) >= requestLimit) {
        const payloadTooLargeError = {
          statusCode: 413,
          statusMessage: "Payload Too Large"
        };
        if (requestSizeLimiter.throwError === false) {
          return payloadTooLargeError;
        }
        throw createError(payloadTooLargeError);
      }
    }
  }
});

const _XkuDHb = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.corsHandler) {
    const { corsHandler } = rules;
    let origin;
    if (typeof corsHandler.origin === "string" && corsHandler.origin !== "*") {
      origin = [corsHandler.origin];
    } else {
      origin = corsHandler.origin;
    }
    if (origin && origin !== "*" && corsHandler.useRegExp) {
      origin = origin.map((o) => new RegExp(o, "i"));
    }
    handleCors(event, {
      origin,
      methods: corsHandler.methods,
      allowHeaders: corsHandler.allowHeaders,
      exposeHeaders: corsHandler.exposeHeaders,
      credentials: corsHandler.credentials,
      maxAge: corsHandler.maxAge,
      preflight: corsHandler.preflight
    });
  }
});

const _WeNjNo = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.allowedMethodsRestricter) {
    const { allowedMethodsRestricter } = rules;
    const allowedMethods = allowedMethodsRestricter.methods;
    if (allowedMethods !== "*" && !allowedMethods.includes(event.node.req.method)) {
      const methodNotAllowedError = {
        statusCode: 405,
        statusMessage: "Method not allowed"
      };
      if (allowedMethodsRestricter.throwError === false) {
        return methodNotAllowedError;
      }
      throw createError(methodNotAllowedError);
    }
  }
});

const storage = useStorage("#rate-limiter-storage");
const defaultRateLimiter = defaultSecurityConfig("").rateLimiter;
const _xucOJQ = defineEventHandler(async (event) => {
  const rules = resolveSecurityRules(event);
  const route = resolveSecurityRoute(event);
  if (rules.enabled && rules.rateLimiter) {
    const rateLimiter = defu(
      rules.rateLimiter,
      defaultRateLimiter
    );
    const ip = getIP(event);
    const url = ip + route;
    let storageItem = await storage.getItem(url);
    if (!storageItem) {
      await setStorageItem(rateLimiter, url);
    } else {
      if (typeof storageItem !== "object") {
        return;
      }
      const timeSinceFirstRateLimit = storageItem.date;
      const timeForInterval = storageItem.date + Number(rateLimiter.interval);
      if (Date.now() >= timeForInterval) {
        await setStorageItem(rateLimiter, url);
        storageItem = await storage.getItem(url);
      }
      const isLimited = timeSinceFirstRateLimit <= timeForInterval && storageItem.value === 0;
      if (isLimited) {
        const tooManyRequestsError = {
          statusCode: 429,
          statusMessage: "Too Many Requests"
        };
        if (rules.rateLimiter.headers) {
          setResponseHeader(event, "x-ratelimit-remaining", 0);
          setResponseHeader(event, "x-ratelimit-limit", rateLimiter.tokensPerInterval);
          setResponseHeader(event, "x-ratelimit-reset", timeForInterval);
        }
        if (rateLimiter.throwError === false) {
          return tooManyRequestsError;
        }
        throw createError(tooManyRequestsError);
      }
      const newItemDate = timeSinceFirstRateLimit > timeForInterval ? Date.now() : storageItem.date;
      const newStorageItem = { value: storageItem.value - 1, date: newItemDate };
      await storage.setItem(url, newStorageItem);
      const currentItem = await storage.getItem(url);
      if (currentItem && rateLimiter.headers) {
        setResponseHeader(event, "x-ratelimit-remaining", currentItem.value);
        setResponseHeader(event, "x-ratelimit-limit", rateLimiter.tokensPerInterval);
        setResponseHeader(event, "x-ratelimit-reset", timeForInterval);
      }
    }
  }
});
async function setStorageItem(rateLimiter, url) {
  const rateLimitedObject = { value: rateLimiter.tokensPerInterval, date: Date.now() };
  await storage.setItem(url, rateLimitedObject);
}
function getIP(event) {
  const ip = getRequestIP(event, { xForwardedFor: true }) || "";
  return ip;
}

const _IC25uT = defineEventHandler(async (event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.xssValidator) {
    const filterOpt = {
      ...rules.xssValidator,
      escapeHtml: void 0
    };
    if (rules.xssValidator.escapeHtml === false) {
      filterOpt.escapeHtml = (value) => value;
    }
    const xssValidator = new FilterXSS(filterOpt);
    if (event.node.req.socket.readyState !== "readOnly") {
      if (rules.xssValidator.methods && rules.xssValidator.methods.includes(
        event.node.req.method
      )) {
        const valueToFilter = event.node.req.method === "GET" ? getQuery$1(event) : event.node.req.headers["content-type"]?.includes(
          "multipart/form-data"
        ) ? await readMultipartFormData(event) : await readBody(event);
        if (valueToFilter && Object.keys(valueToFilter).length) {
          if (valueToFilter.statusMessage && valueToFilter.statusMessage !== "Bad Request") {
            return;
          }
          const stringifiedValue = JSON.stringify(valueToFilter);
          const processedValue = xssValidator.process(
            JSON.stringify(valueToFilter)
          );
          if (processedValue !== stringifiedValue) {
            const badRequestError = {
              statusCode: 400,
              statusMessage: "Bad Request"
            };
            if (rules.xssValidator.throwError === false) {
              return badRequestError;
            }
            throw createError(badRequestError);
          }
        }
      }
    }
  }
});

const warnOnceSet = /* @__PURE__ */ new Set();
const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _gVoUz7 = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      console.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  } else {
    if (collectionName && !warnOnceSet.has(collectionName) && apiEndPoint === DEFAULT_ENDPOINT) {
      console.warn([
        `[Icon] Collection \`${collectionName}\` is not found locally`,
        `We suggest to install it via \`npm i -D @iconify-json/${collectionName}\` to provide the best end-user experience.`
      ].join("\n"));
      warnOnceSet.add(collectionName);
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    console.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      console.error(e);
      if (e.status === 404)
        return createError({ status: 404 });
      else
        return createError({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery$1(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _e2pxGp = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_WINVkh = () => Promise.resolve().then(function () { return index$j; });
const _lazy_5H3xUA = () => Promise.resolve().then(function () { return index$h; });
const _lazy_R6DJPi = () => Promise.resolve().then(function () { return index$f; });
const _lazy_wFE21N = () => Promise.resolve().then(function () { return index$d; });
const _lazy_wE2BvO = () => Promise.resolve().then(function () { return index$b; });
const _lazy_fmrQ2O = () => Promise.resolve().then(function () { return index$9; });
const _lazy_QegfJy = () => Promise.resolve().then(function () { return index$7; });
const _lazy_5vLvg4 = () => Promise.resolve().then(function () { return companyCategories$3; });
const _lazy_X0YrKR = () => Promise.resolve().then(function () { return _slug_$7; });
const _lazy_qnpbkY = () => Promise.resolve().then(function () { return index$5; });
const _lazy_Tg4NON = () => Promise.resolve().then(function () { return companyCategories$1; });
const _lazy_dwsrft = () => Promise.resolve().then(function () { return _slug_$5; });
const _lazy_5kIvFF = () => Promise.resolve().then(function () { return postCategories$3; });
const _lazy_xqiAyQ = () => Promise.resolve().then(function () { return _slug_$3; });
const _lazy_jGKPgt = () => Promise.resolve().then(function () { return index$3; });
const _lazy_Ea3A0F = () => Promise.resolve().then(function () { return postCategories$1; });
const _lazy_kCSS2D = () => Promise.resolve().then(function () { return _slug_$1; });
const _lazy_cKKQYN = () => Promise.resolve().then(function () { return index$1; });
const _lazy_3xmMqp = () => Promise.resolve().then(function () { return renderer$1; });
const _lazy_SNkt2O = () => Promise.resolve().then(function () { return sitemap_index_xml$1; });
const _lazy_Lcuqu3 = () => Promise.resolve().then(function () { return _sitemap__xml$1; });

const handlers = [
  { route: '/api/__sitemap__/blog', handler: _lazy_WINVkh, lazy: true, middleware: false, method: undefined },
  { route: '/api/__sitemap__/company-categories', handler: _lazy_5H3xUA, lazy: true, middleware: false, method: undefined },
  { route: '/api/__sitemap__/company', handler: _lazy_R6DJPi, lazy: true, middleware: false, method: undefined },
  { route: '/api/__sitemap__/glossary', handler: _lazy_wFE21N, lazy: true, middleware: false, method: undefined },
  { route: '/api/__sitemap__/post-categories', handler: _lazy_wE2BvO, lazy: true, middleware: false, method: undefined },
  { route: '/api/__sitemap__/posts', handler: _lazy_fmrQ2O, lazy: true, middleware: false, method: undefined },
  { route: '/api/companies', handler: _lazy_QegfJy, lazy: true, middleware: false, method: undefined },
  { route: '/api/company-categories', handler: _lazy_5vLvg4, lazy: true, middleware: false, method: undefined },
  { route: '/api/company/:slug', handler: _lazy_X0YrKR, lazy: true, middleware: false, method: undefined },
  { route: '/api/mock/companies', handler: _lazy_qnpbkY, lazy: true, middleware: false, method: undefined },
  { route: '/api/mock/company-categories', handler: _lazy_Tg4NON, lazy: true, middleware: false, method: undefined },
  { route: '/api/mock/company/:slug', handler: _lazy_dwsrft, lazy: true, middleware: false, method: undefined },
  { route: '/api/mock/post-categories', handler: _lazy_5kIvFF, lazy: true, middleware: false, method: undefined },
  { route: '/api/mock/post/:slug', handler: _lazy_xqiAyQ, lazy: true, middleware: false, method: undefined },
  { route: '/api/mock/posts', handler: _lazy_jGKPgt, lazy: true, middleware: false, method: undefined },
  { route: '/api/post-categories', handler: _lazy_Ea3A0F, lazy: true, middleware: false, method: undefined },
  { route: '/api/post/:slug', handler: _lazy_kCSS2D, lazy: true, middleware: false, method: undefined },
  { route: '/api/posts', handler: _lazy_cKKQYN, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_3xmMqp, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _dy298X, lazy: false, middleware: true, method: undefined },
  { route: '/__site-config__/debug.json', handler: _kj6MQg, lazy: false, middleware: false, method: undefined },
  { route: '/robots.txt', handler: _9Pw1DE, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _L5no3j, lazy: false, middleware: false, method: undefined },
  { route: '/__robots__/debug.json', handler: _7bWrDQ, lazy: false, middleware: false, method: undefined },
  { route: '/__robots__/debug-path.json', handler: _0fc8SV, lazy: false, middleware: false, method: undefined },
  { route: '/sitemap_index.xml', handler: _lazy_SNkt2O, lazy: true, middleware: false, method: undefined },
  { route: '/__sitemap__/**:sitemap', handler: _lazy_Lcuqu3, lazy: true, middleware: false, method: undefined },
  { route: '/__sitemap__/debug.json', handler: _bvJrA4, lazy: false, middleware: false, method: undefined },
  { route: '/__sitemap__/style.xsl', handler: _AnSKV0, lazy: false, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _CWKO26, lazy: false, middleware: false, method: undefined },
  { route: '/__schema-org__/debug.json', handler: _zc6Jcs, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _kzg2Lb, lazy: false, middleware: false, method: undefined },
  { route: '/__link-checker__/inspect', handler: _gmYowm, lazy: false, middleware: false, method: undefined },
  { route: '/__link-checker__/links', handler: _voLmRz, lazy: false, middleware: false, method: undefined },
  { route: '/__link-checker__/debug.json', handler: _fr5UIw, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _mDpYPT, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _XkuDHb, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _WeNjNo, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _xucOJQ, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _IC25uT, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _gVoUz7, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _e2pxGp, lazy: false, middleware: false, method: undefined },
  { route: '/_fonts/**', handler: _lazy_3xmMqp, lazy: true, middleware: false, method: undefined },
  { route: '/_scripts/**', handler: _lazy_3xmMqp, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_3xmMqp, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (d === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (_) {
    return join(String.raw`\\.\pipe\nitro`, socketName);
  }
  const socketDir = join(tmpdir(), "nitro");
  mkdirSync(socketDir, { recursive: true });
  return join(socketDir, socketName);
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort?.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address?.port }
  });
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort?.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort?.postMessage({ event: "exit" });
  }
});

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + messages.statusCode + " - " + messages.statusMessage + " | " + messages.appName + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}h1,p,pre{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + messages.statusCode + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + messages.description + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><pre class="font-light leading-tight p-8 text-xl z-10">' + messages.stack + "</pre></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const sources$1 = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/blog"
            },
            {
                "loc": "/glossary"
            },
            {
                "loc": "/"
            },
            {
                "loc": "/legal/affiliate-disclosure"
            },
            {
                "loc": "/legal/dmca"
            },
            {
                "loc": "/legal"
            },
            {
                "loc": "/legal/privacy-policy"
            },
            {
                "loc": "/legal/terms-conditions"
            },
            {
                "loc": "/posts/category"
            },
            {
                "loc": "/posts"
            },
            {
                "loc": "/reviews/best"
            },
            {
                "loc": "/reviews"
            },
            {
                "loc": "/tools/combine-csv-files"
            },
            {
                "loc": "/tools/convert-json-to-csv"
            },
            {
                "loc": "/tools/count-characters"
            },
            {
                "loc": "/tools"
            },
            {
                "loc": "/tools/paragraph-counter"
            },
            {
                "loc": "/sitemap.xml"
            },
            {
                "loc": "/modules-sitemap.xml"
            },
            {
                "loc": "/company-sitemap.xml"
            },
            {
                "loc": "/company-categories-sitemap.xml"
            },
            {
                "loc": "/posts-sitemap.xml"
            },
            {
                "loc": "/post-categories-sitemap.xml"
            },
            {
                "loc": "/glossary-sitemap.xml"
            },
            {
                "loc": "/blog-sitemap.xml"
            }
        ],
        "sourceType": "app"
    }
];

const globalSources = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sources: sources$1
});

const sources = {
    "modules": [],
    "company": [
        {
            "sourceType": "user",
            "fetch": "/api/__sitemap__/company"
        }
    ],
    "company-categories": [
        {
            "sourceType": "user",
            "fetch": "/api/__sitemap__/company-categories"
        }
    ],
    "posts": [
        {
            "sourceType": "user",
            "fetch": "/api/__sitemap__/posts"
        }
    ],
    "post-categories": [
        {
            "sourceType": "user",
            "fetch": "/api/__sitemap__/post-categories"
        }
    ],
    "glossary": [
        {
            "sourceType": "user",
            "fetch": "/api/__sitemap__/glossary"
        }
    ],
    "blog": [
        {
            "sourceType": "user",
            "fetch": "/api/__sitemap__/blog"
        }
    ]
};

const childSources = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sources: sources
});

const cacheSchema = pgSchema("cache");
const companyCache = cacheSchema.table("company_cache", {
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  oneLiner: text("one_liner"),
  excerpt: text("excerpt"),
  content: text("content"),
  domain: text("domain"),
  needsWww: boolean("needs_www"),
  serplyLink: text("serply_link"),
  features: jsonb("features"),
  pros: text("pros").array(),
  cons: text("cons").array(),
  faqs: jsonb("faqs"),
  alternatives: jsonb("alternatives"),
  categories: jsonb("categories"),
  logo: text("logo"),
  screenshots: jsonb("screenshots"),
  rating: doublePrecision("rating"),
  upvotes: integer("upvotes"),
  downvotes: integer("downvotes")
});
const companyCategoryCache = cacheSchema.table(
  "company_category_cache",
  {
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull()
  }
);
const postCache = cacheSchema.table("post_cache", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  excerpt: varchar("excerpt", { length: 255 }),
  content: text("content").notNull(),
  featuredImage: varchar("featured_image", { length: 255 }),
  author: varchar("author", { length: 255 }),
  categories: jsonb("categories"),
  oneLiner: text("one_liner"),
  videoId: varchar("video_id", { length: 255 }),
  relatedPosts: jsonb("related_posts"),
  module: varchar("module", { length: 255 })
});
const postCategoryCache = cacheSchema.table("post_category_cache", {
  id: serial("id").primaryKey(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull()
});

const schema = /*#__PURE__*/Object.freeze({
  __proto__: null,
  cacheSchema: cacheSchema,
  companyCache: companyCache,
  companyCategoryCache: companyCategoryCache,
  postCache: postCache,
  postCategoryCache: postCategoryCache
});

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}
const client = postgres(connectionString);
const db = drizzle(client, { schema });

function useDataCache(key, providedEvent) {
  const dummy = {
    addToCache: (_v) => {
      return Promise.resolve();
    },
    cacheTags: []
  };
  globalThis._importMeta_.env.VITEST_SERVER === "true" || true;
  const { debug } = useRuntimeConfig().multiCache || {};
  try {
    const event = (() => {
      if (providedEvent) {
        return providedEvent;
      }
      if (!getCurrentInstance()) {
        if (debug) {
          logger$1.warn(
            "No H3Event provided while not in vue context when calling useDataCache for key: " + key
          );
        }
        return;
      }
      const ssrContext = useSSRContext();
      if (ssrContext) {
        return ssrContext.event;
      }
    })();
    const multiCache = getMultiCacheContext(event);
    if (!multiCache?.data) {
      return Promise.resolve(dummy);
    }
    const fullKey = getCacheKeyWithPrefix(key, event);
    return multiCache.data.getItem(fullKey).then((v) => {
      const item = v;
      const addToCache = (data, cacheTags = [], maxAge) => {
        const item2 = { data, cacheTags };
        if (maxAge) {
          item2.expires = getExpiresValue(maxAge);
        }
        if (debug) {
          logger$1.info("Stored item in data cache: " + fullKey);
        }
        return multiCache.data.setItem(fullKey, item2, { ttl: maxAge });
      };
      if (item) {
        const itemIsExpired = isExpired(item);
        if (!itemIsExpired) {
          if (debug) {
            logger$1.info("Returned item from data cache: " + fullKey);
          }
          return {
            addToCache,
            // Extract the value. If the item was stored along its cache tags, it
            // will be an object with a cacheTags property.
            value: item.data,
            cacheTags: item.cacheTags || [],
            expires: item.expires
          };
        } else if (debug) {
          logger$1.info(
            "Skipped returning item from data cache because expired: " + fullKey
          );
        }
      }
      return {
        addToCache,
        cacheTags: []
      };
    });
  } catch (e) {
    if (e instanceof Error) {
      console.debug(e.message);
    }
  }
  return Promise.resolve(dummy);
}

const index$i = defineEventHandler(async (event) => {
  const cacheKey = `blog-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const post = await db.select({
    slug: postCache.slug
  }).from(postCache).where(eq(postCache.module, "Blog")).execute();
  const response = post.map((post_) => `/posts/${post_.slug}/`);
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const index$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$i
});

const index$g = defineEventHandler(async (event) => {
  const cacheKey = `company-categories-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const companyCategories = await db.select({
    slug: companyCategoryCache.slug
  }).from(companyCategoryCache).execute();
  const response = companyCategories.map(
    (companyCategory) => `/reviews/best/${companyCategory.slug}/`
  );
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const index$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$g
});

const index$e = defineEventHandler(async (event) => {
  const cacheKey = `company-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const companies = await db.select({
    slug: companyCache.slug
  }).from(companyCache).execute();
  const response = companies.map((company) => `/reviews/${company.slug}/`);
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const index$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$e
});

const index$c = defineEventHandler(async (event) => {
  const cacheKey = `glossary-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const post = await db.select({
    slug: postCache.slug
  }).from(postCache).where(eq(postCache.module, "Glossary")).execute();
  const response = post.map((post_) => `/posts/${post_.slug}/`);
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const index$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$c
});

const index$a = defineEventHandler(async (event) => {
  const cacheKey = `post-categories-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const postCategories = await db.select({
    slug: postCategoryCache.slug
  }).from(postCategoryCache).execute();
  const response = postCategories.map(
    (postCategory) => `/posts/category/${postCategory.slug}/`
  );
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const index$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$a
});

const index$8 = defineEventHandler(async (event) => {
  const cacheKey = `post-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const post = await db.select({
    slug: postCache.slug
  }).from(postCache).execute();
  const response = post.map((post_) => `/posts/${post_.slug}/`);
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const index$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$8
});

const transformCategory$5 = (category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});
const transformCompany$1 = (company) => {
  var _a;
  return {
    id: company.id,
    name: company.name,
    slug: company.slug,
    oneLiner: company.oneLiner,
    excerpt: company.excerpt,
    logo: company.logo,
    serplyLink: company.serplyLink,
    categories: (_a = company.categories) == null ? void 0 : _a.map(transformCategory$5),
    screenshots: company.screenshots,
    rating: company.rating,
    upvotes: company.upvotes,
    downvotes: company.downvotes
  };
};
const index$6 = defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug } = getQuery$1(event);
  const cacheKey = `companies-${categorySlug}-${page}-${limit}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: "Page must be a positive integer."
    });
  }
  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: "Limit must be a positive integer."
    });
  }
  const offset = (pageNumber - 1) * limitNumber;
  let baseQuery = db.select({
    id: companyCache.id,
    name: companyCache.name,
    slug: companyCache.slug,
    oneLiner: companyCache.oneLiner,
    excerpt: companyCache.excerpt,
    logo: companyCache.logo,
    serplyLink: companyCache.serplyLink,
    categories: companyCache.categories,
    screenshots: companyCache.screenshots,
    rating: companyCache.rating,
    upvotes: companyCache.upvotes,
    downvotes: companyCache.downvotes
  }).from(companyCache);
  if (categorySlug) {
    baseQuery = baseQuery.where(
      sql`
        jsonb_path_exists(
          ${companyCache.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }
  baseQuery = baseQuery.orderBy(companyCache.name).limit(limitNumber).offset(offset);
  let totalQuery = db.select({ count: sql`count(*)` }).from(companyCache);
  if (categorySlug) {
    totalQuery = totalQuery.where(
      sql`
        jsonb_path_exists(
          ${companyCache.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }
  const [results, [{ count: total }]] = await Promise.all([
    baseQuery.execute(),
    totalQuery.execute()
  ]);
  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: "Not found"
    });
  }
  const companies = results.map(transformCompany$1);
  const pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };
  const getCategoryName = () => {
    if (companies && companies.length && companies[0].categories) {
      for (const category of companies[0].categories) {
        if (category.slug === categorySlug) {
          return category.name;
        }
      }
      return void 0;
    }
  };
  const categoryName = getCategoryName();
  const response = {
    companies,
    pagination,
    categoryName
  };
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const index$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$6
});

const transformCategory$4 = (category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});
const companyCategories$2 = defineEventHandler(async (event) => {
  const cacheKey = "company-categories";
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const query = db.select().from(companyCategoryCache);
  const results = await query.execute();
  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: "Not found"
    });
  }
  const categories = results.map(transformCategory$4);
  const response = categories;
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const companyCategories$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: companyCategories$2
});

const transformFeature = (feature) => ({
  id: feature.id,
  item: feature.item,
  description: feature.description
});
const transformFaq = (faq) => ({
  question: faq.question,
  answer: faq.answer
});
const transformCategory$3 = (category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});
const transformCompany = (company) => {
  var _a, _b, _c;
  return {
    id: company.id,
    name: company.name,
    slug: company.slug,
    oneLiner: company.oneLiner,
    excerpt: company.excerpt,
    logo: company.logo,
    serplyLink: company.serplyLink,
    article: company.content,
    features: (_a = company.features) == null ? void 0 : _a.map(transformFeature),
    pros: company.pros,
    cons: company.cons,
    faqs: (_b = company.faqs) == null ? void 0 : _b.map(transformFaq),
    alternatives: company.alternatives,
    categories: (_c = company.categories) == null ? void 0 : _c.map(transformCategory$3),
    screenshots: company.screenshots,
    rating: company.rating,
    upvotes: company.upvotes,
    downvotes: company.downvotes
  };
};
const _slug_$6 = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const cacheKey = `company-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const query = db.select().from(companyCache).where(eq(companyCache.slug, slug));
  const results = await query.execute();
  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: "Company not found"
    });
  }
  const company = transformCompany(results[0]);
  const response = company;
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const _slug_$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug_$6
});

const generateCompany$1 = () => {
  const name = faker.company.name();
  return {
    id: faker.number.int(),
    name,
    slug: faker.helpers.slugify(name),
    screenshots: Array.from({ length: 3 }, () => faker.image.urlLoremFlickr()),
    oneLiner: faker.lorem.words(13),
    excerpt: faker.lorem.sentences(12),
    rating: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
    upvotes: faker.number.int({ min: 0, max: 1e3 }),
    downvotes: faker.number.int({ min: 0, max: 1e3 }),
    logo: "https://imagedelivery.net/lnCkkCGRx34u0qGwzZrUBQ/f364fd53-6e3b-4156-1c32-2d1540384f00/width=200,height=200,fit=pad",
    serplyLink: faker.internet.url(),
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    }))
  };
};
const TOTAL_MOCK_ITEMS$1 = 500;
const mockDb$3 = Array.from({ length: TOTAL_MOCK_ITEMS$1 }, generateCompany$1).sort(
  (a, b) => a.name.localeCompare(b.name)
);
const index$4 = defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug = "" } = getQuery$1(event);
  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: "Page must be a positive integer"
    });
  }
  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: "Limit must be a positive integer"
    });
  }
  const offset = (pageNumber - 1) * limitNumber;
  const companies = mockDb$3.slice(offset, offset + limitNumber);
  const pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: TOTAL_MOCK_ITEMS$1
  };
  const categoryArticle = `
  <h2>Buyers Guide: How to Choose & Email Marketing Software</h2>
  <p>Understanding different company categories is crucial for business planning and market analysis.</p>

  <h3>Types of Business Structures</h3>
  <p>Companies can be classified into various structures, from sole proprietorships to corporations, each with distinct legal and financial implications. Choosing the right structure impacts taxation, liability, and operational flexibility.</p>

  <h3>Industry Classifications</h3>
  <p>Standard industrial classification systems help categorize companies by their primary business activities. These classifications are essential for market research, regulatory compliance, and competitive analysis.</p>

  <h3>Size Categories</h3>
  <p>Organizations are often grouped by size metrics such as revenue, employee count, or market capitalization. Small and medium enterprises (SMEs) operate differently from large corporations and multinationals.</p>

  <h3>Market Positioning</h3>
  <p>Companies position themselves in different market segments, from budget-friendly to premium offerings. Understanding market positioning helps identify competitors and target customer segments effectively.</p>

  <h3>Ownership Models</h3>
  <p>Business ownership structures range from private companies to publicly traded corporations. Each model has specific requirements for governance, reporting, and stakeholder management.</p>
  `;
  const categoryName = faker.lorem.words(2);
  return {
    companies,
    pagination,
    categoryName: categorySlug ? categoryName : null,
    categoryArticle: categorySlug ? categoryArticle : null
  };
});

const index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$4
});

const CATEGORIES$1 = [
  {
    id: 1,
    name: "Technology",
    slug: "technology"
  },
  {
    id: 2,
    name: "Finance",
    slug: "finance"
  },
  {
    id: 3,
    name: "Healthcare",
    slug: "healthcare"
  },
  {
    id: 4,
    name: "Education",
    slug: "education"
  },
  {
    id: 5,
    name: "E-commerce",
    slug: "e-commerce"
  },
  {
    id: 6,
    name: "Marketing",
    slug: "marketing"
  }
];
const companyCategories = defineEventHandler(async () => CATEGORIES$1);

const companyCategories$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: companyCategories
});

const generateCompany = (slug) => {
  const name = faker.company.name();
  return {
    id: faker.number.int(),
    name,
    slug,
    oneLiner: faker.company.catchPhrase(),
    excerpt: faker.lorem.paragraph(),
    logo: "https://placehold.co/250x250",
    screenshots: [
      "https://placehold.co/500x500",
      "https://placehold.co/500x500",
      "https://placehold.co/500x500",
      "https://placehold.co/500x500"
    ],
    serplyLink: faker.internet.url(),
    article: faker.lorem.paragraphs(7),
    features: Array.from({ length: 5 }, () => ({
      id: faker.number.int(),
      item: faker.commerce.productName(),
      description: faker.lorem.sentence()
    })),
    faqs: Array.from({ length: 3 }, () => ({
      question: faker.lorem.sentence(),
      answer: faker.lorem.paragraph()
    })),
    alternatives: [faker.company.name(), faker.company.name()],
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    }))
  };
};
const mockDb$2 = /* @__PURE__ */ new Map();
const _slug_$4 = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Slug parameter is required"
    });
  }
  let company = mockDb$2.get(slug);
  if (!company) {
    company = generateCompany(slug);
    mockDb$2.set(slug, company);
  }
  return company;
});

const _slug_$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug_$4
});

const CATEGORIES = [
  {
    id: 1,
    name: "Technology",
    slug: "technology"
  },
  {
    id: 2,
    name: "Finance",
    slug: "finance"
  },
  {
    id: 3,
    name: "Healthcare",
    slug: "healthcare"
  },
  {
    id: 4,
    name: "SEO",
    slug: "seo"
  },
  {
    id: 5,
    name: "E-commerce",
    slug: "e-commerce"
  },
  {
    id: 6,
    name: "Marketing",
    slug: "marketing"
  }
];
const postCategories$2 = defineEventHandler(async () => CATEGORIES);

const postCategories$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: postCategories$2
});

const generatePostIndex = (slug) => {
  const title = faker.lorem.words(5);
  return {
    id: faker.number.int(),
    title,
    slug,
    excerpt: faker.lorem.sentence(),
    author: faker.person.fullName(),
    createdAt: faker.date.recent().toISOString(),
    image: "https://placehold.co/250x250",
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    })),
    oneLiner: faker.lorem.sentence(),
    module: faker.helpers.arrayElement(["blog", "glossary"])
  };
};
const generatePost$1 = (slug) => {
  const title = faker.lorem.words(5);
  return {
    id: faker.number.int(),
    title,
    slug,
    excerpt: faker.lorem.sentence(),
    author: faker.person.fullName(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    image: "https://placehold.co/250x250",
    content: faker.lorem.paragraphs(7),
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    })),
    oneLiner: faker.lorem.sentence(),
    videoId: "r2py_Z-bMuY",
    relatedPosts: Array.from({ length: 10 }, generatePostIndex),
    module: faker.helpers.arrayElement(["blog", "glossary"])
  };
};
const mockDb$1 = /* @__PURE__ */ new Map();
const _slug_$2 = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Slug parameter is required"
    });
  }
  let post = mockDb$1.get(slug);
  if (!post) {
    post = generatePost$1(slug);
    mockDb$1.set(slug, post);
  }
  return post;
});

const _slug_$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug_$2
});

const generatePost = () => {
  const title = faker.lorem.sentence();
  return {
    id: faker.number.int(),
    title,
    slug: faker.helpers.slugify(title),
    excerpt: faker.lorem.sentences(2),
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    })),
    createdAt: faker.date.past().toISOString(),
    author: faker.person.fullName(),
    image: "https://raw.githubusercontent.com/serpcompany/serp-ipsum/refs/heads/main/images/devin-schumacher-grumpy-cat.png",
    oneLiner: faker.lorem.sentence(),
    module: faker.helpers.arrayElement(["blog", "glossary"])
  };
};
const TOTAL_MOCK_ITEMS = 500;
const mockDb = Array.from({ length: TOTAL_MOCK_ITEMS }, generatePost).sort(
  (a, b) => a.title.localeCompare(b.title)
);
const index$2 = defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug = "" } = getQuery$1(event);
  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: "Page must be a positive integer"
    });
  }
  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: "Limit must be a positive integer"
    });
  }
  const offset = (pageNumber - 1) * limitNumber;
  const posts = mockDb.slice(offset, offset + limitNumber);
  const pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: TOTAL_MOCK_ITEMS
  };
  const categoryName = categorySlug ? faker.lorem.words(2) : null;
  return {
    posts,
    pagination,
    categoryName
  };
});

const index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$2
});

const transformCategory$2 = (category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});
const postCategories = defineEventHandler(async (event) => {
  const cacheKey = "post-categories";
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const query = db.select().from(postCategoryCache);
  const results = await query.execute();
  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: "Not found"
    });
  }
  const categories = results.map(transformCategory$2);
  const response = categories;
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const postCategories$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: postCategories
});

const transformCategory$1 = (category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});
const transformPost$1 = (post) => {
  var _a;
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    image: post.featuredImage,
    categories: (_a = post.categories) == null ? void 0 : _a.map(transformCategory$1),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    author: post.author,
    content: post.content,
    videoId: post.videoId,
    oneLiner: post.oneLiner,
    relatedPosts: post.relatedPosts,
    module: post.module
  };
};
const _slug_ = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const cacheKey = `post-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const query = db.select().from(postCache).where(eq(postCache.slug, slug));
  const results = await query.execute();
  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: "Post not found"
    });
  }
  const post = transformPost$1(results[0]);
  const response = post;
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const _slug_$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug_
});

const transformCategory = (category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});
const transformPost = (post) => {
  var _a;
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    image: post.featuredImage,
    categories: (_a = post.categories) == null ? void 0 : _a.map(transformCategory),
    createdAt: post.createdAt,
    author: post.author,
    module: post.module
  };
};
const index = defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug, module = "" } = getQuery$1(event);
  const cacheKey = `posts-${categorySlug}-${page}-${limit}-${module}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }
  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: "Page must be a positive integer."
    });
  }
  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: "Limit must be a positive integer."
    });
  }
  const offset = (pageNumber - 1) * limitNumber;
  const whereConditions = [];
  let baseQuery = db.select({
    id: postCache.id,
    title: postCache.title,
    slug: postCache.slug,
    excerpt: postCache.excerpt,
    featuredImage: postCache.featuredImage,
    categories: postCache.categories,
    createdAt: postCache.createdAt,
    author: postCache.author,
    module: postCache.module
  }).from(postCache);
  if (categorySlug) {
    whereConditions.push(
      sql`
          jsonb_path_exists(
            ${postCache.categories},
         '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
        `
    );
  }
  if (module) {
    whereConditions.push(eq(postCache.module, module));
  }
  baseQuery = baseQuery.orderBy(postCache.title).limit(limitNumber).offset(offset);
  let totalQuery = db.select({ count: sql`count(*)` }).from(postCache);
  if (whereConditions.length > 0) {
    baseQuery = baseQuery.where(and(...whereConditions));
    totalQuery = totalQuery.where(and(...whereConditions));
  }
  const [results, [{ count: total }]] = await Promise.all([
    baseQuery.execute(),
    totalQuery.execute()
  ]);
  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: "Not found"
    });
  }
  const posts = results.map(transformPost);
  const pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };
  const getCategoryName = () => {
    if (posts && posts.length && posts[0].categories) {
      for (const category of posts[0].categories) {
        if (category.slug === categorySlug) {
          return category.name;
        }
      }
      return void 0;
    }
  };
  const categoryName = getCategoryName();
  const response = {
    posts,
    pagination,
    categoryName
  };
  addToCache(response, [], 60 * 60 * 24 * 7);
  return response;
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});

const Vue3 = version[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file:///Users/devin/repos/projects/serp-monorepo/apps/serp-co/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('file:///Users/devin/repos/projects/serp-monorepo/apps/serp-co/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = event.path.startsWith("/__nuxt_island");
  const islandContext = isRenderingIsland ? await getIslandContext(event) : void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  if (!isRenderingIsland) {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (false),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = isRenderingIsland ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest) {
    head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  {
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (!isRenderingIsland || resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (isRenderingIsland && islandContext) {
    const islandHead = {};
    for (const entry of head.headEntries()) {
      for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
        const currentValue = islandHead[key];
        if (Array.isArray(currentValue)) {
          currentValue.push(...value);
        }
        islandHead[key] = value;
      }
    }
    islandHead.link ||= [];
    islandHead.style ||= [];
    const islandResponse = {
      id: islandContext.id,
      head: islandHead,
      html: getServerComponentHTML(htmlContext.body),
      components: getClientIslandResponse(ssrContext),
      slots: getSlotIslandResponse(ssrContext)
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: getResponseStatus(event),
      statusMessage: getResponseStatusText(event),
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify$1(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify$1(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
function getServerComponentHTML(body) {
  const match = body[0].match(ROOT_NODE_REGEX);
  return match?.[1] || body[0];
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=[^;]*;(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, slot] = match;
      if (!slot) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

async function buildSitemapIndex(resolvers, runtimeConfig) {
  const {
    sitemaps,
    // enhancing
    autoLastmod,
    // chunking
    defaultSitemapsChunkSize,
    autoI18n,
    isI18nMapped,
    sortEntries,
    sitemapsPathPrefix
  } = runtimeConfig;
  if (!sitemaps)
    throw new Error("Attempting to build a sitemap index without required `sitemaps` configuration.");
  function maybeSort(urls) {
    return sortEntries ? sortSitemapUrls(urls) : urls;
  }
  const isChunking = typeof sitemaps.chunks !== "undefined";
  const chunks = {};
  if (isChunking) {
    const sitemap = sitemaps.chunks;
    const sources = await resolveSitemapSources(await globalSitemapSources());
    const normalisedUrls = resolveSitemapEntries(sitemap, sources, { autoI18n, isI18nMapped }, resolvers);
    const enhancedUrls = normalisedUrls.map((e) => defu$1(e, sitemap.defaults));
    const sortedUrls = maybeSort(enhancedUrls);
    sortedUrls.forEach((url, i) => {
      const chunkIndex = Math.floor(i / defaultSitemapsChunkSize);
      chunks[chunkIndex] = chunks[chunkIndex] || { urls: [] };
      chunks[chunkIndex].urls.push(url);
    });
  } else {
    for (const sitemap in sitemaps) {
      if (sitemap !== "index") {
        chunks[sitemap] = chunks[sitemap] || { urls: [] };
      }
    }
  }
  const entries = [];
  for (const name in chunks) {
    const sitemap = chunks[name];
    const entry = {
      _sitemapName: name,
      sitemap: resolvers.canonicalUrlResolver(joinURL(sitemapsPathPrefix, `/${name}.xml`))
    };
    let lastmod = sitemap.urls.filter((a) => !!a?.lastmod).map((a) => typeof a.lastmod === "string" ? new Date(a.lastmod) : a.lastmod).sort((a, b) => (b?.getTime() || 0) - (a?.getTime() || 0))?.[0];
    if (!lastmod && autoLastmod)
      lastmod = /* @__PURE__ */ new Date();
    if (lastmod)
      entry.lastmod = normaliseDate(lastmod);
    entries.push(entry);
  }
  if (sitemaps.index) {
    entries.push(...sitemaps.index.sitemaps.map((entry) => {
      return typeof entry === "string" ? { sitemap: entry } : entry;
    }));
  }
  return entries;
}
function urlsToIndexXml(sitemaps, resolvers, { version, xsl, credits, minify }) {
  const sitemapXml = sitemaps.map((e) => [
    "    <sitemap>",
    `        <loc>${escapeValueForXml(e.sitemap)}</loc>`,
    // lastmod is optional
    e.lastmod ? `        <lastmod>${escapeValueForXml(e.lastmod)}</lastmod>` : false,
    "    </sitemap>"
  ].filter(Boolean).join("\n")).join("\n");
  return wrapSitemapXml([
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapXml,
    "</sitemapindex>"
  ], resolvers, { version, xsl, credits, minify });
}

const sitemap_index_xml = defineEventHandler(async (e) => {
  const runtimeConfig = useSimpleSitemapRuntimeConfig();
  const nitro = useNitroApp();
  const resolvers = useNitroUrlResolvers(e);
  const sitemaps = await buildSitemapIndex(resolvers, runtimeConfig);
  const indexResolvedCtx = { sitemaps };
  await nitro.hooks.callHook("sitemap:index-resolved", indexResolvedCtx);
  const output = urlsToIndexXml(indexResolvedCtx.sitemaps, resolvers, runtimeConfig);
  const ctx = { sitemap: output, sitemapName: "sitemap" };
  await nitro.hooks.callHook("sitemap:output", ctx);
  setHeader(e, "Content-Type", "text/xml; charset=UTF-8");
  if (runtimeConfig.cacheMaxAgeSeconds)
    setHeader(e, "Cache-Control", `public, max-age=${runtimeConfig.cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(e, "Cache-Control", `no-cache, no-store`);
  return ctx.sitemap;
});

const sitemap_index_xml$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sitemap_index_xml
});

const _sitemap__xml = defineEventHandler(async (e) => {
  const runtimeConfig = useSimpleSitemapRuntimeConfig(e);
  const { sitemaps } = runtimeConfig;
  const sitemapName = withoutLeadingSlash(withoutTrailingSlash((getRouterParam(e, "sitemap") || e.path)?.replace(".xml", "").replace(runtimeConfig.sitemapsPathPrefix, "")));
  const isChunking = typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemapName));
  if (!sitemapName || !(sitemapName in sitemaps) && !isChunking) {
    return createError({
      statusCode: 404,
      message: `Sitemap "${sitemapName}" not found.`
    });
  }
  return createSitemap(e, isChunking ? {
    ...sitemaps.chunks,
    sitemapName
  } : sitemaps[sitemapName], runtimeConfig);
});

const _sitemap__xml$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _sitemap__xml
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
//# sourceMappingURL=index.mjs.map
