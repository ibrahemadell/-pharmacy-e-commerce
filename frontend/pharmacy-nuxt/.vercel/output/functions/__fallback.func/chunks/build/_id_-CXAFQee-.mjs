import { h as useRoute, f as useHead, a as __nuxt_component_1, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useApi, c as useFormatters, d as useOrderStatus } from './index-CDfwTiwy.mjs';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useApi();
    const fmt = useFormatters();
    const orderStatus = useOrderStatus();
    useAuthStore();
    const order = ref(null);
    const loading = ref(true);
    const updatingStatus = ref(false);
    const newStatus = ref("");
    const statusNote = ref("");
    const trackingNumber = ref("");
    useHead({ title: `Order Details - Admin` });
    const statusOptions = [
      { label: "Pending", value: "0" },
      { label: "Confirmed", value: "1" },
      { label: "Processing", value: "2" },
      { label: "Shipped", value: "3" },
      { label: "Delivered", value: "4" },
      { label: "Cancelled", value: "5" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      if (unref(order)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl" }, _attrs))}><div class="flex items-center gap-4 mb-7">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/orders",
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
        _push(`<div class="flex-1"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(order).orderNumber)}</h1><p class="text-sm text-gray-500">Placed ${ssrInterpolate(unref(fmt).formatDateTime(unref(order).createdAt))}</p></div><span class="${ssrRenderClass([unref(orderStatus).getStatus(unref(order).status).color, "text-sm px-4 py-1.5 rounded-full font-semibold"])}">${ssrInterpolate(unref(order).status)}</span></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-5"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"><div class="px-5 py-4 border-b border-gray-100 dark:border-slate-700"><h2 class="font-bold text-gray-900 dark:text-white">Order Items (${ssrInterpolate(unref(order).items.length)})</h2></div><div class="divide-y divide-gray-50 dark:divide-slate-700/50"><!--[-->`);
        ssrRenderList(unref(order).items, (item) => {
          _push(`<div class="flex gap-3 px-5 py-3.5"><div class="w-12 h-12 bg-gray-50 dark:bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:cube",
            class: "w-6 h-6 text-gray-400"
          }, null, _parent));
          _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-semibold text-gray-900 dark:text-white">${ssrInterpolate(item.productName)}</p>`);
          if (item.variantName) {
            _push(`<p class="text-xs text-gray-400">${ssrInterpolate(item.variantName)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-xs text-gray-500 mt-0.5">Qty: ${ssrInterpolate(item.quantity)} \xD7 ${ssrInterpolate(unref(fmt).formatCurrency(item.unitPrice))}</p></div><span class="text-sm font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(fmt).formatCurrency(item.totalPrice))}</span></div>`);
        });
        _push(`<!--]--></div><div class="px-5 py-4 border-t border-gray-100 dark:border-slate-700 space-y-1.5 bg-gray-50 dark:bg-slate-700/30"><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>${ssrInterpolate(unref(fmt).formatCurrency(unref(order).subTotal))}</span></div><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Delivery</span><span class="${ssrRenderClass(unref(order).deliveryFee === 0 ? "text-emerald-600 font-medium" : "")}">${ssrInterpolate(unref(order).deliveryFee === 0 ? "FREE" : unref(fmt).formatCurrency(unref(order).deliveryFee))}</span></div>`);
        if (unref(order).discount > 0) {
          _push(`<div class="flex justify-between text-sm text-emerald-600"><span>Discount</span><span>-${ssrInterpolate(unref(fmt).formatCurrency(unref(order).discount))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-between font-bold text-base pt-2 border-t border-gray-200 dark:border-slate-600"><span>Total</span><span class="text-emerald-600">${ssrInterpolate(unref(fmt).formatCurrency(unref(order).total))}</span></div></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">Status Timeline</h2><div class="relative"><div class="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-slate-700"></div><!--[-->`);
        ssrRenderList(unref(order).statusHistory, (h, i) => {
          _push(`<div class="flex gap-3 relative mb-4 last:mb-0"><div class="${ssrRenderClass([i === 0 ? "bg-emerald-600" : "bg-gray-200 dark:bg-slate-600", "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"])}">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: unref(orderStatus).getStatus(h.status).icon === "clock" ? "heroicons:clock" : "heroicons:check",
            class: "w-4 h-4 text-white"
          }, null, _parent));
          _push(`</div><div class="pt-1"><p class="text-sm font-semibold text-gray-900 dark:text-white">${ssrInterpolate(h.status)}</p>`);
          if (h.notes) {
            _push(`<p class="text-xs text-gray-500">${ssrInterpolate(h.notes)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(unref(fmt).formatDateTime(h.changedAt))}</p></div></div>`);
        });
        _push(`<!--]--></div></div>`);
        if (unref(order).notes) {
          _push(`<div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-2">Customer Notes</h2><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(unref(order).notes)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-5"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">Update Status</h2><div class="space-y-3"><select class="input-field text-sm"><!--[-->`);
        ssrRenderList(statusOptions, (s) => {
          _push(`<option${ssrRenderAttr("value", s.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(newStatus)) ? ssrLooseContain(unref(newStatus), s.value) : ssrLooseEqual(unref(newStatus), s.value)) ? " selected" : ""}>${ssrInterpolate(s.label)}</option>`);
        });
        _push(`<!--]--></select><input${ssrRenderAttr("value", unref(statusNote))} type="text" placeholder="Note (optional)" class="input-field text-sm"><input${ssrRenderAttr("value", unref(trackingNumber))} type="text" placeholder="Tracking number (optional)" class="input-field text-sm"><button${ssrIncludeBooleanAttr(unref(updatingStatus)) ? " disabled" : ""} class="btn-primary w-full justify-center">`);
        if (unref(updatingStatus)) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "svg-spinners:ring-resize",
            class: "w-4 h-4"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(` Update Status </button></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">Customer</h2><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center"><span class="text-emerald-700 dark:text-emerald-300 font-bold text-sm">${ssrInterpolate((_b = (_a = unref(order).user) == null ? void 0 : _a.firstName) == null ? void 0 : _b[0])}${ssrInterpolate((_d = (_c = unref(order).user) == null ? void 0 : _c.lastName) == null ? void 0 : _d[0])}</span></div><div><p class="font-semibold text-sm text-gray-900 dark:text-white">${ssrInterpolate((_e = unref(order).user) == null ? void 0 : _e.firstName)} ${ssrInterpolate((_f = unref(order).user) == null ? void 0 : _f.lastName)}</p><p class="text-xs text-gray-500">${ssrInterpolate((_g = unref(order).user) == null ? void 0 : _g.email)}</p></div></div>`);
        if ((_h = unref(order).user) == null ? void 0 : _h.phoneNumber) {
          _push(`<p class="text-sm text-gray-500 flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:phone",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` ${ssrInterpolate(unref(order).user.phoneNumber)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(order).address) {
          _push(`<div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-3">Delivery Address</h2><div class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><p class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(unref(order).address.fullName)}</p><p>${ssrInterpolate(unref(order).address.phoneNumber)}</p><p>${ssrInterpolate(unref(order).address.addressLine1)}</p>`);
          if (unref(order).address.addressLine2) {
            _push(`<p>${ssrInterpolate(unref(order).address.addressLine2)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p>${ssrInterpolate(unref(order).address.city)}, ${ssrInterpolate(unref(order).address.governorate)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-3">Payment</h2><div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-500">Method</span><span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(order).paymentMethod)}</span></div><div class="flex justify-between"><span class="text-gray-500">Status</span><span class="${ssrRenderClass([unref(order).paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600", "font-semibold"])}">${ssrInterpolate(unref(order).paymentStatus)}</span></div>`);
        if (unref(order).couponCode) {
          _push(`<div class="flex justify-between"><span class="text-gray-500">Coupon</span><span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(unref(order).couponCode)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if ((_i = unref(order).user) == null ? void 0 : _i.phoneNumber) {
          _push(`<a${ssrRenderAttr("href", unref(fmt).whatsappLink(unref(order).user.phoneNumber, `Hi ${unref(order).user.firstName}! Regarding your order ${unref(order).orderNumber}:`))} target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:whatsapp",
            class: "w-5 h-5"
          }, null, _parent));
          _push(` Contact Customer </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center h-64" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:ring-resize",
          class: "w-8 h-8 text-emerald-600"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CXAFQee-.mjs.map
