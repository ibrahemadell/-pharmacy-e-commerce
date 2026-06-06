import { f as useHead, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useApi, c as useFormatters } from './index-BbS-CUl0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './auth-uW8XXc_J.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Customers - Admin" });
    useApi();
    const fmt = useFormatters();
    const users = ref([]);
    const pagedResult = ref(null);
    const loading = ref(true);
    const currentPage = ref(1);
    const search = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4 mb-7"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1><p class="text-sm text-gray-500 mt-0.5">${ssrInterpolate((_b = (_a = unref(pagedResult)) == null ? void 0 : _a.totalCount) != null ? _b : 0)} registered customers</p></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4 mb-5"><div class="relative max-w-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:magnifying-glass",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Search by name or email..." class="input-field pl-9 py-2 text-sm"></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30"><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Phone</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Roles</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Joined</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(10, (i) => {
          _push(`<tr><td colspan="5" class="px-4 py-3"><div class="skeleton h-10 rounded"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(users), (u) => {
          _push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors"><td class="px-4 py-3.5"><div class="flex items-center gap-3"><div class="w-9 h-9 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0"><span class="text-emerald-700 dark:text-emerald-300 font-bold text-sm">${ssrInterpolate(u.firstName[0])}${ssrInterpolate(u.lastName[0])}</span></div><div><p class="text-sm font-semibold text-gray-900 dark:text-white">${ssrInterpolate(u.firstName)} ${ssrInterpolate(u.lastName)}</p><p class="text-xs text-gray-400">${ssrInterpolate(u.email)}</p></div></div></td><td class="px-4 py-3.5 hidden md:table-cell"><span class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(u.phoneNumber || "\u2014")}</span></td><td class="px-4 py-3.5 hidden lg:table-cell"><div class="flex flex-wrap gap-1"><!--[-->`);
          ssrRenderList(u.roles, (role) => {
            _push(`<span class="${ssrRenderClass([role === "Admin" ? "bg-purple-100 text-purple-700" : role === "Pharmacist" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600", "text-xs px-2 py-0.5 rounded-full font-semibold"])}">${ssrInterpolate(role)}</span>`);
          });
          _push(`<!--]--></div></td><td class="px-4 py-3.5 hidden lg:table-cell"><span class="text-sm text-gray-500">${ssrInterpolate(unref(fmt).formatDate(u.createdAt))}</span></td><td class="px-4 py-3.5"><span class="${ssrRenderClass([u.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600", "text-xs px-2.5 py-1 rounded-full font-semibold"])}">${ssrInterpolate(u.isActive ? "Active" : "Inactive")}</span></td></tr>`);
        });
        _push(`<!--]-->`);
        if (!unref(users).length) {
          _push(`<tr><td colspan="5" class="px-4 py-12 text-center text-gray-400 text-sm">No customers found</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div><div class="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 dark:border-slate-700"><p class="text-sm text-gray-500">${ssrInterpolate((_d = (_c = unref(pagedResult)) == null ? void 0 : _c.totalCount) != null ? _d : 0)} customers</p><div class="flex items-center gap-1"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:chevron-left",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button><span class="px-3 text-sm font-medium">${ssrInterpolate(unref(currentPage))} / ${ssrInterpolate((_f = (_e = unref(pagedResult)) == null ? void 0 : _e.totalPages) != null ? _f : 1)}</span><button${ssrIncludeBooleanAttr(unref(currentPage) >= ((_h = (_g = unref(pagedResult)) == null ? void 0 : _g.totalPages) != null ? _h : 1)) ? " disabled" : ""} class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:chevron-right",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/customers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ZlVx6pOO.mjs.map
