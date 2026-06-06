import { g as useRoute, f as useHead, a as __nuxt_component_1, _ as __nuxt_component_0, i as useRuntimeConfig } from './server.mjs';
import { defineComponent, ref, computed, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useApi();
    const fmt = useFormatters();
    const orderStatus = useOrderStatus();
    const config = useRuntimeConfig();
    const order = ref(null);
    const loading = ref(true);
    const cancelling = ref(false);
    useHead({ title: computed(() => order.value ? `${order.value.orderNumber} - PharmaCare` : "Order - PharmaCare") });
    const statusSteps = [
      { label: "Placed", status: "Pending", icon: "heroicons:clipboard-document-check" },
      { label: "Confirmed", status: "Confirmed", icon: "heroicons:check-circle" },
      { label: "Processing", status: "Processing", icon: "heroicons:cog-6-tooth" },
      { label: "Shipped", status: "Shipped", icon: "heroicons:truck" },
      { label: "Delivered", status: "Delivered", icon: "heroicons:home" }
    ];
    const statusOrder = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];
    const isStepDone = (status) => {
      if (!order.value) return false;
      if (order.value.status === "Cancelled") return false;
      const currentIdx = statusOrder.indexOf(order.value.status);
      const stepIdx = statusOrder.indexOf(status);
      return stepIdx <= currentIdx;
    };
    const waLink = computed(() => {
      if (!order.value) return "#";
      return fmt.whatsappLink(
        config.public.whatsappNumber,
        `Hi PharmaCare! I have a question about order ${order.value.orderNumber}.`
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      if (unref(order)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container py-8 max-w-3xl" }, _attrs))}><div class="flex items-center gap-4 mb-7">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/account/orders",
          class: "btn-ghost p-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:arrow-left",
                  class: "w-5 h-5"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex-1"><h1 class="text-xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(order).orderNumber)}</h1><p class="text-sm text-gray-500">Placed on ${ssrInterpolate(unref(fmt).formatDateTime(unref(order).createdAt))}</p></div><span class="${ssrRenderClass([unref(orderStatus).getStatus(unref(order).status).color, "text-sm px-3 py-1 rounded-full font-semibold flex-shrink-0"])}">${ssrInterpolate(unref(order).status)}</span></div><div class="card p-5 mb-5"><div class="flex items-center justify-between"><!--[-->`);
        ssrRenderList(statusSteps, (step, i) => {
          _push(`<div class="flex-1 flex flex-col items-center relative">`);
          if (i < statusSteps.length - 1) {
            _push(`<div class="${ssrRenderClass([isStepDone(step.status) ? "bg-emerald-500" : "bg-gray-200 dark:bg-slate-700", "absolute top-4 left-1/2 w-full h-0.5 transition-colors"])}"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="${ssrRenderClass([isStepDone(step.status) ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-slate-700 text-gray-400", "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors"])}">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: step.icon,
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</div><p class="${ssrRenderClass([isStepDone(step.status) ? "text-emerald-600" : "text-gray-400", "text-xs mt-1.5 font-medium text-center hidden sm:block"])}">${ssrInterpolate(step.label)}</p></div>`);
        });
        _push(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-5"><div class="md:col-span-2 space-y-5"><div class="card overflow-hidden"><div class="px-5 py-3.5 border-b border-gray-100 dark:border-slate-700"><h2 class="font-bold text-gray-900 dark:text-white">Items (${ssrInterpolate(unref(order).items.length)})</h2></div><div class="divide-y divide-gray-50 dark:divide-slate-700/50"><!--[-->`);
        ssrRenderList(unref(order).items, (item) => {
          _push(`<div class="flex gap-3 px-5 py-3.5"><div class="w-14 h-14 bg-gray-50 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:cube",
            class: "w-7 h-7 text-gray-300"
          }, null, _parent));
          _push(`</div><div class="flex-1 min-w-0">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${item.productId}`,
            class: "text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 line-clamp-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.productName)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.productName), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (item.variantName) {
            _push(`<p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(item.variantName)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-xs text-gray-500 mt-1">Qty: ${ssrInterpolate(item.quantity)}</p></div><div class="text-right flex-shrink-0"><p class="text-sm font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(fmt).formatCurrency(item.totalPrice))}</p><p class="text-xs text-gray-400">${ssrInterpolate(unref(fmt).formatCurrency(item.unitPrice))} each</p></div></div>`);
        });
        _push(`<!--]--></div><div class="px-5 py-4 border-t border-gray-100 dark:border-slate-700 space-y-2 bg-gray-50 dark:bg-slate-700/20"><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>${ssrInterpolate(unref(fmt).formatCurrency(unref(order).subTotal))}</span></div><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Delivery</span><span class="${ssrRenderClass(unref(order).deliveryFee === 0 ? "text-emerald-600 font-medium" : "")}">${ssrInterpolate(unref(order).deliveryFee === 0 ? "FREE" : unref(fmt).formatCurrency(unref(order).deliveryFee))}</span></div>`);
        if (unref(order).discount > 0) {
          _push(`<div class="flex justify-between text-sm text-emerald-600 font-medium"><span>Discount `);
          if (unref(order).couponCode) {
            _push(`<span class="font-mono text-xs">(${ssrInterpolate(unref(order).couponCode)})</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span><span>-${ssrInterpolate(unref(fmt).formatCurrency(unref(order).discount))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-between font-bold text-base pt-2 border-t border-gray-200 dark:border-slate-600"><span>Total</span><span class="text-emerald-600">${ssrInterpolate(unref(fmt).formatCurrency(unref(order).total))}</span></div></div></div>`);
        if (unref(order).status === "Pending") {
          _push(`<div><button${ssrIncludeBooleanAttr(unref(cancelling)) ? " disabled" : ""} class="inline-flex items-center gap-2 px-5 py-2.5 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 font-semibold rounded-xl transition-colors text-sm disabled:opacity-50">`);
          if (unref(cancelling)) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "svg-spinners:ring-resize",
              class: "w-4 h-4"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:x-mark",
              class: "w-4 h-4"
            }, null, _parent));
          }
          _push(` ${ssrInterpolate(unref(cancelling) ? "Cancelling\u2026" : "Cancel Order")}</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-4">`);
        if (unref(order).address) {
          _push(`<div class="card p-4"><h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:map-pin",
            class: "w-4 h-4 text-emerald-500"
          }, null, _parent));
          _push(` Delivery Address </h3><div class="text-sm text-gray-600 dark:text-gray-400 space-y-0.5"><p class="font-semibold text-gray-800 dark:text-gray-200">${ssrInterpolate(unref(order).address.fullName)}</p><p>${ssrInterpolate(unref(order).address.phoneNumber)}</p><p>${ssrInterpolate(unref(order).address.addressLine1)}</p>`);
          if (unref(order).address.addressLine2) {
            _push(`<p>${ssrInterpolate(unref(order).address.addressLine2)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p>${ssrInterpolate(unref(order).address.city)}, ${ssrInterpolate(unref(order).address.governorate)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="card p-4"><h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:credit-card",
          class: "w-4 h-4 text-emerald-500"
        }, null, _parent));
        _push(` Payment </h3><div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-500">Method</span><span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(order).paymentMethod)}</span></div><div class="flex justify-between"><span class="text-gray-500">Status</span><span class="${ssrRenderClass([unref(order).paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600", "font-semibold"])}">${ssrInterpolate(unref(order).paymentStatus)}</span></div></div></div>`);
        if (unref(order).trackingNumber) {
          _push(`<div class="card p-4"><h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:truck",
            class: "w-4 h-4 text-emerald-500"
          }, null, _parent));
          _push(` Tracking </h3><p class="font-mono text-sm font-semibold text-emerald-600">${ssrInterpolate(unref(order).trackingNumber)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(order).notes) {
          _push(`<div class="card p-4"><h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-2">Your Notes</h3><p class="text-sm text-gray-500">${ssrInterpolate(unref(order).notes)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<a${ssrRenderAttr("href", unref(waLink))} target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:whatsapp",
          class: "w-5 h-5"
        }, null, _parent));
        _push(` Ask About This Order </a></div></div></div>`);
      } else if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center min-h-[40vh]" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:ring-resize",
          class: "w-10 h-10 text-emerald-600"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-ZDLNmLOY.mjs.map
