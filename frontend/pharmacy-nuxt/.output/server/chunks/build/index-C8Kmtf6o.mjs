import { f as useHead, _ as __nuxt_component_0, a as __nuxt_component_1 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useApi, c as useFormatters, d as useOrderStatus } from './index-BKk0TMm7.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
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
    useHead({ title: "My Orders - PharmaCare" });
    useApi();
    const fmt = useFormatters();
    const orderStatus = useOrderStatus();
    const orders = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const totalPages = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container py-8 max-w-3xl" }, _attrs))}><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-7">My Orders</h1>`);
      if (_ctx.$route.query.success) {
        _push(`<div class="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 mb-6 flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-circle",
          class: "w-6 h-6 text-emerald-600 flex-shrink-0"
        }, null, _parent));
        _push(`<div><p class="font-semibold text-emerald-800 dark:text-emerald-300">Order placed successfully! \u{1F389}</p><p class="text-sm text-emerald-600 dark:text-emerald-400">We&#39;ll notify you when your order is confirmed.</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="skeleton h-24 rounded-2xl"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(orders).length) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(orders), (order) => {
          var _a, _b;
          _push(`<div class="card p-5 hover:shadow-md transition-shadow"><div class="flex flex-wrap items-start justify-between gap-3 mb-3"><div><p class="font-bold text-gray-900 dark:text-white">${ssrInterpolate(order.orderNumber)}</p><p class="text-xs text-gray-500 mt-0.5">${ssrInterpolate(unref(fmt).formatDateTime(order.createdAt))}</p></div><span class="${ssrRenderClass([unref(orderStatus).getStatus(order.status).color, "text-xs px-3 py-1 rounded-full font-semibold"])}">${ssrInterpolate(order.status)}</span></div><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:shopping-bag",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` ${ssrInterpolate((_b = (_a = order.items) == null ? void 0 : _a.length) != null ? _b : 0)} item(s) <span class="mx-1 text-gray-300">\xB7</span>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:credit-card",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` ${ssrInterpolate(order.paymentMethod)}</div><div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700"><span class="font-bold text-lg text-emerald-600">${ssrInterpolate(unref(fmt).formatCurrency(order.total))}</span><div class="flex gap-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/account/orders/${order.id}`,
            class: "btn-secondary text-sm px-4 py-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` View Details `);
              } else {
                return [
                  createTextVNode(" View Details ")
                ];
              }
            }),
            _: 2
          }, _parent));
          if (order.status === "Pending") {
            _push(`<button class="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 px-3 py-2 rounded-xl transition-colors"> Cancel </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(totalPages) > 1) {
          _push(`<div class="flex justify-center gap-2 mt-6"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="btn-ghost p-2 disabled:opacity-40">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:chevron-left",
            class: "w-5 h-5"
          }, null, _parent));
          _push(`</button><span class="px-4 py-2 text-sm font-medium">${ssrInterpolate(unref(currentPage))} / ${ssrInterpolate(unref(totalPages))}</span><button${ssrIncludeBooleanAttr(unref(currentPage) >= unref(totalPages)) ? " disabled" : ""} class="btn-ghost p-2 disabled:opacity-40">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:chevron-right",
            class: "w-5 h-5"
          }, null, _parent));
          _push(`</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="text-center py-20"><div class="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:shopping-bag",
          class: "w-10 h-10 text-gray-400"
        }, null, _parent));
        _push(`</div><p class="text-lg font-semibold text-gray-500">No orders yet</p><p class="text-sm text-gray-400 mt-1">Start shopping and your orders will appear here</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn-primary mt-5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Browse Products`);
            } else {
              return [
                createTextVNode("Browse Products")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C8Kmtf6o.mjs.map
