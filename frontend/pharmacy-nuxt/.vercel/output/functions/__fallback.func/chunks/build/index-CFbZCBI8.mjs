import { f as useHead, a as __nuxt_component_1, _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$1 } from './NuxtImg-BUTvnb3j.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
import { u as useApi, c as useFormatters } from './index-CDfwTiwy.mjs';
import { u as useI18n } from './useI18n-B8XBsOEE.mjs';
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

const pageSize = 15;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Products - Admin" });
    useApi();
    const fmt = useFormatters();
    const { t, isAr } = useI18n();
    const products = ref([]);
    const pagedResult = ref(null);
    const categories = ref([]);
    const loading = ref(true);
    const selected = ref([]);
    const currentPage = ref(1);
    const search = ref("");
    const categoryFilter = ref("");
    const stockFilter = ref("");
    const deleteTarget = ref(null);
    const deleting = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtImg = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4 mb-7"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(t)("admin.products"))}</h1><p class="text-sm text-gray-500 mt-0.5">${ssrInterpolate((_b = (_a = unref(pagedResult)) == null ? void 0 : _a.totalCount) != null ? _b : 0)} ${ssrInterpolate(unref(isAr) ? "\u0645\u0646\u062A\u062C \u0625\u062C\u0645\u0627\u0644\u0627\u064B" : "total products")}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products/new",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(t)("admin.add_product"))}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" " + toDisplayString(unref(t)("admin.add_product")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4 mb-5"><div class="flex flex-wrap gap-3"><div class="relative flex-1 min-w-[200px]">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:magnifying-glass",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(search))} type="text"${ssrRenderAttr("placeholder", unref(isAr) ? "\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u062A\u062C..." : "Search products...")} class="input-field pl-9 py-2 text-sm"></div><select class="input-field py-2 text-sm w-44"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), "") : ssrLooseEqual(unref(categoryFilter), "")) ? " selected" : ""}>${ssrInterpolate(unref(isAr) ? "\u0643\u0644 \u0627\u0644\u0623\u0642\u0633\u0627\u0645" : "All Categories")}</option><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(`<option${ssrRenderAttr("value", c.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), c.id) : ssrLooseEqual(unref(categoryFilter), c.id)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
      });
      _push(`<!--]--></select><select class="input-field py-2 text-sm w-40"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(stockFilter)) ? ssrLooseContain(unref(stockFilter), "") : ssrLooseEqual(unref(stockFilter), "")) ? " selected" : ""}>${ssrInterpolate(unref(isAr) ? "\u0643\u0644 \u0627\u0644\u0645\u062E\u0632\u0648\u0646" : "All Stock")}</option><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(stockFilter)) ? ssrLooseContain(unref(stockFilter), "low") : ssrLooseEqual(unref(stockFilter), "low")) ? " selected" : ""}>${ssrInterpolate(unref(isAr) ? "\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636" : "Low Stock")}</option><option value="out"${ssrIncludeBooleanAttr(Array.isArray(unref(stockFilter)) ? ssrLooseContain(unref(stockFilter), "out") : ssrLooseEqual(unref(stockFilter), "out")) ? " selected" : ""}>${ssrInterpolate(unref(isAr) ? "\u0646\u0641\u0630\u062A \u0627\u0644\u0643\u0645\u064A\u0629" : "Out of Stock")}</option><option value="in"${ssrIncludeBooleanAttr(Array.isArray(unref(stockFilter)) ? ssrLooseContain(unref(stockFilter), "in") : ssrLooseEqual(unref(stockFilter), "in")) ? " selected" : ""}>${ssrInterpolate(unref(isAr) ? "\u0645\u062A\u0648\u0641\u0631" : "In Stock")}</option></select><button class="btn-ghost text-sm px-3 py-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(isAr) ? "\u0645\u0633\u062D" : "Clear")}</button></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30"><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10"><input type="checkbox" class="accent-emerald-600 w-4 h-4"></th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">${ssrInterpolate(unref(isAr) ? "\u0627\u0644\u0645\u0646\u062A\u062C" : "Product")}</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">${ssrInterpolate(unref(isAr) ? "\u0627\u0644\u0642\u0633\u0645" : "Category")}</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">${ssrInterpolate(unref(isAr) ? "\u0627\u0644\u0633\u0639\u0631" : "Price")}</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">${ssrInterpolate(unref(isAr) ? "\u0627\u0644\u0645\u062E\u0632\u0648\u0646" : "Stock")}</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">${ssrInterpolate(unref(isAr) ? "\u0627\u0644\u062D\u0627\u0644\u0629" : "Status")}</th><th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">${ssrInterpolate(unref(isAr) ? "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" : "Actions")}</th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(8, (i) => {
          _push(`<tr><td colspan="7" class="px-4 py-3"><div class="skeleton h-10 rounded"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(products), (p) => {
          var _a2;
          _push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors"><td class="px-4 py-3.5"><input type="checkbox"${ssrRenderAttr("value", p.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selected)) ? ssrLooseContain(unref(selected), p.id) : unref(selected)) ? " checked" : ""} class="accent-emerald-600 w-4 h-4"></td><td class="px-4 py-3.5"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: p.primaryImage || "/img/placeholder.png",
            alt: p.name,
            class: "w-10 h-10 rounded-lg object-contain bg-gray-50 flex-shrink-0"
          }, null, _parent));
          _push(`<div class="min-w-0"><p class="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">${ssrInterpolate(p.name)}</p><div class="flex items-center gap-1.5 mt-0.5">`);
          if (p.isPrescriptionRequired) {
            _push(`<span class="badge-rx text-xs">${ssrInterpolate(unref(isAr) ? "\u0631\u0648\u0634\u062A\u0629" : "Rx")}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (p.isFeatured) {
            _push(`<span class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold">${ssrInterpolate(unref(isAr) ? "\u0645\u0645\u064A\u0632" : "Featured")}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (p.isBestSeller) {
            _push(`<span class="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">${ssrInterpolate(unref(isAr) ? "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B" : "Best Seller")}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></td><td class="px-4 py-3.5 hidden md:table-cell"><span class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(p.categoryName)}</span></td><td class="px-4 py-3.5"><div><p class="text-sm font-semibold text-gray-900 dark:text-white">${ssrInterpolate(unref(fmt).formatCurrency((_a2 = p.discountPrice) != null ? _a2 : p.price))}</p>`);
          if (p.discountPrice) {
            _push(`<p class="text-xs text-gray-400 line-through">${ssrInterpolate(unref(fmt).formatCurrency(p.price))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="px-4 py-3.5 hidden lg:table-cell"><div class="flex items-center gap-1.5"><div class="${ssrRenderClass([p.isOutOfStock ? "bg-red-500" : p.isLowStock ? "bg-amber-500" : "bg-emerald-500", "w-2 h-2 rounded-full flex-shrink-0"])}"></div><span class="text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(p.stockQuantity)}</span></div></td><td class="px-4 py-3.5 hidden lg:table-cell"><span class="${ssrRenderClass([p.isOutOfStock ? "bg-red-100 text-red-700" : p.isLowStock ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700", "text-xs px-2 py-0.5 rounded-full font-semibold"])}">${ssrInterpolate(p.isOutOfStock ? unref(t)("product.out_of_stock") : p.isLowStock ? unref(t)("product.low_stock") : unref(t)("product.in_stock"))}</span></td><td class="px-4 py-3.5"><div class="flex items-center justify-end gap-1">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${p.slug}`,
            target: "_blank",
            class: "p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-lg transition-colors",
            title: unref(isAr) ? "\u0639\u0631\u0636" : "View"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:eye",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "heroicons:eye",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/products/${p.id}/edit`,
            class: "p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors",
            title: unref(isAr) ? "\u062A\u0639\u062F\u064A\u0644" : "Edit"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:pencil",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "heroicons:pencil",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"${ssrRenderAttr("title", unref(isAr) ? "\u062D\u0630\u0641" : "Delete")}>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:trash",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button></div></td></tr>`);
        });
        _push(`<!--]-->`);
        if (!unref(products).length) {
          _push(`<tr><td colspan="7" class="px-4 py-12 text-center text-gray-400 text-sm">${ssrInterpolate(unref(isAr) ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0646\u062A\u062C\u0627\u062A" : "No products found")}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div><div class="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 dark:border-slate-700"><p class="text-sm text-gray-500">${ssrInterpolate(unref(isAr) ? "\u0639\u0631\u0636" : "Showing")} ${ssrInterpolate((unref(currentPage) - 1) * pageSize + 1)}\u2013${ssrInterpolate(Math.min(unref(currentPage) * pageSize, (_d = (_c = unref(pagedResult)) == null ? void 0 : _c.totalCount) != null ? _d : 0))} ${ssrInterpolate(unref(isAr) ? "\u0645\u0646" : "of")} ${ssrInterpolate((_f = (_e = unref(pagedResult)) == null ? void 0 : _e.totalCount) != null ? _f : 0)}</p><div class="flex items-center gap-1"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:chevron-left",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button><span class="px-3 py-1 text-sm font-medium">${ssrInterpolate(unref(currentPage))} / ${ssrInterpolate((_h = (_g = unref(pagedResult)) == null ? void 0 : _g.totalPages) != null ? _h : 1)}</span><button${ssrIncludeBooleanAttr(unref(currentPage) >= ((_j = (_i = unref(pagedResult)) == null ? void 0 : _i.totalPages) != null ? _j : 1)) ? " disabled" : ""} class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:chevron-right",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(deleteTarget)) {
          _push2(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl"><div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons:trash",
            class: "w-6 h-6 text-red-600"
          }, null, _parent));
          _push2(`</div><h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">${ssrInterpolate(unref(t)("admin.confirm_delete_title"))}</h3><p class="text-sm text-gray-500 mb-6">${ssrInterpolate(unref(isAr) ? `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C "${unref(deleteTarget).name}"\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639.` : `Are you sure you want to delete "${unref(deleteTarget).name}"? This action cannot be undone.`)}</p><div class="flex gap-3"><button class="btn-ghost flex-1 justify-center">${ssrInterpolate(unref(t)("admin.cancel"))}</button><button${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""} class="flex-1 justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">`);
          if (unref(deleting)) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "svg-spinners:ring-resize",
              class: "w-4 h-4"
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(` ${ssrInterpolate(unref(t)("admin.delete"))}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CFbZCBI8.mjs.map
