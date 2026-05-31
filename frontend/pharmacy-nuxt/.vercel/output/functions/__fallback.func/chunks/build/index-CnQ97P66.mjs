import { f as useHead, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, reactive, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderTeleport, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useApi, c as useFormatters } from './index-CDfwTiwy.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:url';
import 'image-meta';
import '@fastify/accept-negotiator';
import 'etag';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './auth-uW8XXc_J.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Coupons - Admin" });
    useApi();
    const fmt = useFormatters();
    const coupons = ref([]);
    const loading = ref(true);
    const showForm = ref(false);
    const saving = ref(false);
    const editingId = ref(null);
    const defaultForm = () => ({
      code: "",
      discountType: 0,
      discountValue: 0,
      minimumOrderAmount: void 0,
      maximumDiscountAmount: void 0,
      usageLimit: void 0,
      validFrom: "",
      validTo: "",
      description: "",
      isActive: true,
      userUsageLimit: 1
    });
    const form = reactive(defaultForm());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4 mb-7"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Coupons</h1><p class="text-sm text-gray-500 mt-0.5">Manage discount coupons</p></div><button class="btn-primary">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` New Coupon </button></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30"><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Discount</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Usage</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Valid Until</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th><th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr><td colspan="6" class="px-4 py-3"><div class="skeleton h-10 rounded"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(coupons), (c) => {
          var _a;
          _push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors"><td class="px-4 py-3.5"><div><p class="font-mono font-bold text-sm text-gray-900 dark:text-white">${ssrInterpolate(c.code)}</p>`);
          if (c.description) {
            _push(`<p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(c.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="px-4 py-3.5 hidden md:table-cell"><span class="font-semibold text-sm text-gray-900 dark:text-white">${ssrInterpolate(c.discountType === "Percentage" ? `${c.discountValue}%` : unref(fmt).formatCurrency(c.discountValue))}</span>`);
          if (c.minimumOrderAmount) {
            _push(`<p class="text-xs text-gray-400"> Min: ${ssrInterpolate(unref(fmt).formatCurrency(c.minimumOrderAmount))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td class="px-4 py-3.5 hidden lg:table-cell"><div class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(c.usedCount)} / ${ssrInterpolate((_a = c.usageLimit) != null ? _a : "\u221E")}</div>`);
          if (c.usageLimit) {
            _push(`<div class="w-20 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden"><div class="h-full bg-emerald-500 rounded-full" style="${ssrRenderStyle(`width: ${c.usedCount / c.usageLimit * 100}%`)}"></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td class="px-4 py-3.5 hidden lg:table-cell"><span class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(c.validTo ? unref(fmt).formatDate(c.validTo) : "No expiry")}</span></td><td class="px-4 py-3.5"><span class="${ssrRenderClass([c.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500", "text-xs px-2.5 py-1 rounded-full font-semibold"])}">${ssrInterpolate(c.isActive ? "Active" : "Inactive")}</span></td><td class="px-4 py-3.5 text-right"><div class="flex items-center justify-end gap-1"><button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:pencil",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button><button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:trash",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button></div></td></tr>`);
        });
        _push(`<!--]-->`);
        if (!unref(coupons).length) {
          _push(`<tr><td colspan="6" class="px-4 py-12 text-center text-gray-400 text-sm">No coupons yet</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showForm)) {
          _push2(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl"><div class="flex items-center justify-between mb-5"><h3 class="font-bold text-lg text-gray-900 dark:text-white">${ssrInterpolate(unref(editingId) ? "Edit Coupon" : "New Coupon")}</h3><button class="btn-ghost p-1.5">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-5 h-5"
          }, null, _parent));
          _push2(`</button></div><form class="space-y-4"><div class="grid grid-cols-2 gap-3"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Code *</label><input${ssrRenderAttr("value", unref(form).code)} required type="text" placeholder="SAVE20" class="input-field font-mono uppercase"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Discount Type *</label><select class="input-field"><option${ssrRenderAttr("value", 0)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).discountType) ? ssrLooseContain(unref(form).discountType, 0) : ssrLooseEqual(unref(form).discountType, 0)) ? " selected" : ""}>Percentage (%)</option><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).discountType) ? ssrLooseContain(unref(form).discountType, 1) : ssrLooseEqual(unref(form).discountType, 1)) ? " selected" : ""}>Fixed Amount</option></select></div></div><div class="grid grid-cols-2 gap-3"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> Discount Value * ${ssrInterpolate(unref(form).discountType === 0 ? "(%)" : "(EGP)")}</label><input${ssrRenderAttr("value", unref(form).discountValue)} required type="number" step="0.01" min="0.01" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Min Order (EGP)</label><input${ssrRenderAttr("value", unref(form).minimumOrderAmount)} type="number" step="0.01" min="0" placeholder="Optional" class="input-field"></div></div><div class="grid grid-cols-2 gap-3"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Max Discount (EGP)</label><input${ssrRenderAttr("value", unref(form).maximumDiscountAmount)} type="number" step="0.01" min="0" placeholder="No cap" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Usage Limit</label><input${ssrRenderAttr("value", unref(form).usageLimit)} type="number" min="1" placeholder="Unlimited" class="input-field"></div></div><div class="grid grid-cols-2 gap-3"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Valid From</label><input${ssrRenderAttr("value", unref(form).validFrom)} type="datetime-local" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Valid Until</label><input${ssrRenderAttr("value", unref(form).validTo)} type="datetime-local" class="input-field"></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label><input${ssrRenderAttr("value", unref(form).description)} type="text" placeholder="Optional description" class="input-field"></div><label class="flex items-center gap-2.5 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isActive) ? ssrLooseContain(unref(form).isActive, null) : unref(form).isActive) ? " checked" : ""} type="checkbox" class="accent-emerald-600 w-4 h-4"><span class="text-sm text-gray-700 dark:text-gray-300 font-medium">Active</span></label><div class="flex gap-3 pt-2"><button type="button" class="btn-ghost flex-1 justify-center">Cancel</button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary flex-1 justify-center">`);
          if (unref(saving)) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "svg-spinners:ring-resize",
              class: "w-4 h-4"
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(` ${ssrInterpolate(unref(saving) ? "Saving\u2026" : unref(editingId) ? "Update" : "Create")}</button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/coupons/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CnQ97P66.mjs.map
