import { f as useHead, _ as __nuxt_component_0, a as __nuxt_component_1 } from './server.mjs';
import { defineComponent, ref, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useApi, c as useFormatters, d as useOrderStatus } from './index-CDfwTiwy.mjs';
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
    useHead({ title: "Orders - Admin" });
    useApi();
    const fmt = useFormatters();
    const orderStatus = useOrderStatus();
    const orders = ref([]);
    const pagedResult = ref(null);
    const loading = ref(true);
    const currentPage = ref(1);
    const statusFilter = ref("");
    const statusTabs = [
      { label: "All", value: "" },
      { label: "Pending", value: "Pending" },
      { label: "Confirmed", value: "Confirmed" },
      { label: "Processing", value: "Processing" },
      { label: "Shipped", value: "Shipped" },
      { label: "Delivered", value: "Delivered" },
      { label: "Cancelled", value: "Cancelled" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4 mb-7"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1><p class="text-sm text-gray-500 mt-0.5">${ssrInterpolate((_b = (_a = unref(pagedResult)) == null ? void 0 : _a.totalCount) != null ? _b : 0)} total orders</p></div></div><div class="flex gap-1.5 mb-5 overflow-x-auto pb-1"><!--[-->`);
      ssrRenderList(statusTabs, (tab) => {
        _push(`<button class="${ssrRenderClass([unref(statusFilter) === tab.value ? "bg-emerald-600 text-white shadow-sm" : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-emerald-300", "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0"])}">${ssrInterpolate(tab.label)} `);
        if (tab.count !== void 0) {
          _push(`<span class="text-xs opacity-75">(${ssrInterpolate(tab.count)})</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30"><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Customer</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Items</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Payment</th><th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th><th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(8, (i) => {
          _push(`<tr><td colspan="8" class="px-4 py-3"><div class="skeleton h-10 rounded"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(orders), (order) => {
          var _a2, _b2, _c2, _d2, _e2;
          _push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors"><td class="px-4 py-3.5"><div><p class="text-sm font-bold text-gray-900 dark:text-white">${ssrInterpolate(order.orderNumber)}</p>`);
          if (order.hasPrescriptionItems) {
            _push(`<p class="text-xs text-orange-600 flex items-center gap-0.5 mt-0.5">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:clipboard-document",
              class: "w-3 h-3"
            }, null, _parent));
            _push(` Rx Required </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="px-4 py-3.5 hidden md:table-cell"><p class="text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate((_a2 = order.user) == null ? void 0 : _a2.firstName)} ${ssrInterpolate((_b2 = order.user) == null ? void 0 : _b2.lastName)}</p><p class="text-xs text-gray-400">${ssrInterpolate((_c2 = order.user) == null ? void 0 : _c2.email)}</p></td><td class="px-4 py-3.5 hidden lg:table-cell"><span class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate((_e2 = (_d2 = order.items) == null ? void 0 : _d2.length) != null ? _e2 : 0)} items</span></td><td class="px-4 py-3.5"><p class="text-sm font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(fmt).formatCurrency(order.total))}</p></td><td class="px-4 py-3.5"><span class="${ssrRenderClass([unref(orderStatus).getStatus(order.status).color, "text-xs px-2.5 py-1 rounded-full font-semibold"])}">${ssrInterpolate(order.status)}</span></td><td class="px-4 py-3.5 hidden lg:table-cell"><span class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(order.paymentMethod)}</span></td><td class="px-4 py-3.5 hidden md:table-cell"><span class="text-xs text-gray-500">${ssrInterpolate(unref(fmt).formatDate(order.createdAt))}</span></td><td class="px-4 py-3.5 text-right">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/orders/${order.id}`,
            class: "btn-ghost text-xs px-3 py-1.5"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` View `);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:arrow-right",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(" View "),
                  createVNode(_component_Icon, {
                    name: "heroicons:arrow-right",
                    class: "w-3 h-3"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]-->`);
        if (!unref(orders).length) {
          _push(`<tr><td colspan="8" class="px-4 py-12 text-center text-gray-400 text-sm">No orders found</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div><div class="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 dark:border-slate-700"><p class="text-sm text-gray-500">${ssrInterpolate((_d = (_c = unref(pagedResult)) == null ? void 0 : _c.totalCount) != null ? _d : 0)} orders</p><div class="flex items-center gap-1"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D5Cacg9E.mjs.map
