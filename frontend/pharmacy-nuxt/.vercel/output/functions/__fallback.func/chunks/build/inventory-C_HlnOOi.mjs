import { f as useHead, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, reactive, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useApi } from './index-BKk0TMm7.mjs';
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
  __name: "inventory",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Inventory - Admin" });
    useApi();
    const products = ref([]);
    ref(true);
    const activeTab = ref("all");
    const stockUpdates = reactive({});
    const outOfStock = computed(() => products.value.filter((p) => p.isOutOfStock));
    const lowStock = computed(() => products.value.filter((p) => p.isLowStock));
    const inStock = computed(() => products.value.filter((p) => !p.isOutOfStock && !p.isLowStock));
    const stockTabs = computed(() => [
      { key: "all", label: "All", count: products.value.length },
      { key: "out", label: "Out of Stock", count: outOfStock.value.length },
      { key: "low", label: "Low Stock", count: lowStock.value.length },
      { key: "ok", label: "In Stock", count: inStock.value.length }
    ]);
    const filteredProducts = computed(() => {
      if (activeTab.value === "out") return outOfStock.value;
      if (activeTab.value === "low") return lowStock.value;
      if (activeTab.value === "ok") return inStock.value;
      return products.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4 mb-7"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1><p class="text-sm text-gray-500 mt-0.5">Monitor and manage product stock levels</p></div></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-circle",
        class: "w-5 h-5 text-red-600"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(outOfStock).length)}</p><p class="text-xs text-gray-500">Out of Stock</p></div></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:exclamation-triangle",
        class: "w-5 h-5 text-amber-600"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(lowStock).length)}</p><p class="text-xs text-gray-500">Low Stock</p></div></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:check-circle",
        class: "w-5 h-5 text-emerald-600"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(inStock).length)}</p><p class="text-xs text-gray-500">In Stock</p></div></div></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"><div class="flex gap-1 p-3 border-b border-gray-100 dark:border-slate-700 overflow-x-auto"><!--[-->`);
      ssrRenderList(unref(stockTabs), (tab) => {
        _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.key ? "bg-emerald-600 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700", "flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"])}">${ssrInterpolate(tab.label)} <span class="text-xs opacity-75">(${ssrInterpolate(tab.count)})</span></button>`);
      });
      _push(`<!--]--></div><div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30"><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Threshold</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th><th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Update Stock</th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-slate-700/50"><!--[-->`);
      ssrRenderList(unref(filteredProducts), (p) => {
        var _a;
        _push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors"><td class="px-4 py-3.5"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", p.primaryImage || "/img/placeholder.png")}${ssrRenderAttr("alt", p.name)} class="w-9 h-9 rounded-lg object-contain bg-gray-50 flex-shrink-0"><p class="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">${ssrInterpolate(p.name)}</p></div></td><td class="px-4 py-3.5 hidden md:table-cell"><span class="text-sm text-gray-500">${ssrInterpolate(p.categoryName)}</span></td><td class="px-4 py-3.5"><span class="${ssrRenderClass([p.stockQuantity === 0 ? "text-red-600" : p.isLowStock ? "text-amber-600" : "text-gray-900 dark:text-white", "text-sm font-bold"])}">${ssrInterpolate(p.stockQuantity)}</span></td><td class="px-4 py-3.5 hidden lg:table-cell"><span class="text-sm text-gray-500">${ssrInterpolate((_a = p.lowStockThreshold) != null ? _a : 10)}</span></td><td class="px-4 py-3.5"><div class="flex items-center gap-2 w-28"><div class="flex-1 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden"><div class="${ssrRenderClass([p.stockQuantity === 0 ? "bg-red-500" : p.isLowStock ? "bg-amber-500" : "bg-emerald-500", "h-full rounded-full transition-all"])}" style="${ssrRenderStyle(`width: ${Math.min(100, p.stockQuantity > 0 ? p.stockQuantity / Math.max(p.stockQuantity, 50) * 100 : 0)}%`)}"></div></div><span class="${ssrRenderClass([p.stockQuantity === 0 ? "text-red-500" : p.isLowStock ? "text-amber-500" : "text-emerald-500", "text-xs font-medium"])}">${ssrInterpolate(p.stockQuantity === 0 ? "OUT" : p.isLowStock ? "LOW" : "OK")}</span></div></td><td class="px-4 py-3.5 text-right"><div class="flex items-center justify-end gap-2"><input${ssrRenderAttr("value", unref(stockUpdates)[p.id])} type="number" min="0"${ssrRenderAttr("placeholder", String(p.stockQuantity))} class="w-20 text-center text-sm border border-gray-200 dark:border-slate-600 rounded-lg py-1 bg-transparent focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"><button${ssrIncludeBooleanAttr(!unref(stockUpdates)[p.id] && unref(stockUpdates)[p.id] !== 0) ? " disabled" : ""} class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 px-2.5 py-1 rounded-lg transition-colors disabled:opacity-40"> Update </button></div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (!unref(filteredProducts).length) {
        _push(`<tr><td colspan="6" class="px-4 py-12 text-center text-gray-400 text-sm">No products in this category</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/inventory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=inventory-C_HlnOOi.mjs.map
