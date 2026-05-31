import { c as _export_sfc, _ as __nuxt_component_0$1, a as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$3 } from './NuxtImg-BUTvnb3j.mjs';
import { defineComponent, resolveComponent, mergeProps, ref, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderTeleport, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { a as useCart, b as useCartStore, c as useFormatters } from './index-CDfwTiwy.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CartItem",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    useCart();
    const fmt = useFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_NuxtImg = _sfc_main$3;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.item.productSlug}`,
        class: "flex-shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: __props.item.productImage || "/img/placeholder.png",
              alt: __props.item.productName,
              class: "w-16 h-16 rounded-lg object-cover bg-gray-50"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtImg, {
                src: __props.item.productImage || "/img/placeholder.png",
                alt: __props.item.productName,
                class: "w-16 h-16 rounded-lg object-cover bg-gray-50"
              }, null, 8, ["src", "alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex-1 min-w-0">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.item.productSlug}`,
        class: "text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-emerald-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.item.productName)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.item.productName), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.item.variantName) {
        _push(`<p class="text-xs text-gray-500 mt-0.5">${ssrInterpolate(__props.item.variantName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-2 mt-1"><span class="text-sm font-bold text-emerald-600">${ssrInterpolate(unref(fmt).formatCurrency((_a = __props.item.discountPrice) != null ? _a : __props.item.unitPrice))}</span>`);
      if (__props.item.discountPrice) {
        _push(`<span class="text-xs text-gray-400 line-through">${ssrInterpolate(unref(fmt).formatCurrency(__props.item.unitPrice))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.item.isPrescriptionRequired) {
        _push(`<span class="badge-rx text-xs mt-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:clipboard-document",
          class: "w-3 h-3"
        }, null, _parent));
        _push(` Rx </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between mt-2"><div class="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg overflow-hidden"><button${ssrIncludeBooleanAttr(__props.item.quantity <= 1) ? " disabled" : ""} class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:minus",
        class: "w-3 h-3"
      }, null, _parent));
      _push(`</button><span class="w-8 text-center text-sm font-semibold">${ssrInterpolate(__props.item.quantity)}</span><button${ssrIncludeBooleanAttr(__props.item.quantity >= __props.item.maxQuantity) ? " disabled" : ""} class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-3 h-3"
      }, null, _parent));
      _push(`</button></div><button class="text-red-400 hover:text-red-600 p-1 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:trash",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CartDrawer",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    useCart();
    const fmt = useFormatters();
    const couponInput = ref("");
    const couponMsg = ref("");
    const couponValid = ref(false);
    const couponLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_CartItem = _sfc_main$2;
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(cartStore).isOpen) {
          _push2(`<div class="fixed inset-0 bg-black/50 z-50" data-v-a30118bc></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (unref(cartStore).isOpen) {
          _push2(`<div class="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-50 flex flex-col shadow-2xl" data-v-a30118bc><div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-800" data-v-a30118bc><div class="flex items-center gap-2" data-v-a30118bc>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons:shopping-cart",
            class: "w-5 h-5 text-emerald-600"
          }, null, _parent));
          _push2(`<h2 class="font-bold text-lg" data-v-a30118bc>My Cart</h2><span class="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full" data-v-a30118bc>${ssrInterpolate(unref(cartStore).cart.itemCount)}</span></div><button class="btn-ghost p-2" data-v-a30118bc>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-5 h-5"
          }, null, _parent));
          _push2(`</button></div><div class="flex-1 overflow-y-auto px-5 py-4 space-y-4" data-v-a30118bc>`);
          if (unref(cartStore).isEmpty) {
            _push2(`<div class="flex flex-col items-center justify-center h-64 text-center" data-v-a30118bc><div class="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4" data-v-a30118bc>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-cart",
              class: "w-10 h-10 text-gray-400"
            }, null, _parent));
            _push2(`</div><p class="font-semibold text-gray-700 dark:text-gray-300" data-v-a30118bc>Your cart is empty</p><p class="text-sm text-gray-400 mt-1" data-v-a30118bc>Add some products to get started</p>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/products",
              onClick: ($event) => unref(cartStore).closeCart(),
              class: "btn-primary mt-4 text-sm"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`Browse Products`);
                } else {
                  return [
                    createTextVNode("Browse Products")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<!--[-->`);
          ssrRenderList(unref(cartStore).cart.items, (item) => {
            _push2(ssrRenderComponent(_component_CartItem, {
              key: item.id,
              item
            }, null, _parent));
          });
          _push2(`<!--]-->`);
          if (unref(cartStore).cart.hasPrescriptionItems) {
            _push2(`<div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-3 flex gap-2" data-v-a30118bc>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:exclamation-triangle",
              class: "w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5"
            }, null, _parent));
            _push2(`<p class="text-sm text-orange-700 dark:text-orange-400" data-v-a30118bc> Your cart contains prescription items. You&#39;ll need to upload a prescription during checkout. </p></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (!unref(cartStore).isEmpty) {
            _push2(`<div class="px-5 py-3 border-t border-gray-100 dark:border-slate-800" data-v-a30118bc><div class="flex gap-2" data-v-a30118bc><input${ssrRenderAttr("value", unref(couponInput))} type="text" placeholder="Enter coupon code" class="input-field text-sm py-2 flex-1" data-v-a30118bc><button${ssrIncludeBooleanAttr(unref(couponLoading)) ? " disabled" : ""} class="btn-secondary text-sm px-4 py-2" data-v-a30118bc>`);
            if (unref(couponLoading)) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "svg-spinners:ring-resize",
                class: "w-4 h-4"
              }, null, _parent));
            } else {
              _push2(`<span data-v-a30118bc>Apply</span>`);
            }
            _push2(`</button></div>`);
            if (unref(couponMsg)) {
              _push2(`<p class="${ssrRenderClass([unref(couponValid) ? "text-emerald-600" : "text-red-500", "text-xs mt-1.5 font-medium"])}" data-v-a30118bc>${ssrInterpolate(unref(couponMsg))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (!unref(cartStore).isEmpty) {
            _push2(`<div class="px-5 py-4 border-t border-gray-100 dark:border-slate-800 space-y-2 bg-gray-50 dark:bg-slate-800/50" data-v-a30118bc><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400" data-v-a30118bc><span data-v-a30118bc>Subtotal</span><span data-v-a30118bc>${ssrInterpolate(unref(fmt).formatCurrency(unref(cartStore).cart.subTotal))}</span></div><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400" data-v-a30118bc><span data-v-a30118bc>Delivery</span><span class="${ssrRenderClass(unref(cartStore).cart.deliveryFee === 0 ? "text-emerald-600 font-semibold" : "")}" data-v-a30118bc>${ssrInterpolate(unref(cartStore).cart.deliveryFee === 0 ? "FREE" : unref(fmt).formatCurrency(unref(cartStore).cart.deliveryFee))}</span></div>`);
            if (unref(cartStore).cart.discount > 0) {
              _push2(`<div class="flex justify-between text-sm text-emerald-600 font-medium" data-v-a30118bc><span data-v-a30118bc>Discount</span><span data-v-a30118bc>-${ssrInterpolate(unref(fmt).formatCurrency(unref(cartStore).cart.discount))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-slate-600" data-v-a30118bc><span data-v-a30118bc>Total</span><span class="text-emerald-600" data-v-a30118bc>${ssrInterpolate(unref(fmt).formatCurrency(unref(cartStore).cart.total))}</span></div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/checkout",
              onClick: ($event) => unref(cartStore).closeCart(),
              class: "btn-primary w-full mt-3 justify-center py-3"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "heroicons:lock-closed",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push3(` Proceed to Checkout `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "heroicons:lock-closed",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Proceed to Checkout ")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`<button class="btn-ghost w-full text-sm justify-center" data-v-a30118bc>Continue Shopping</button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartDrawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a30118bc"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    useCart();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppNavbar = resolveComponent("AppNavbar");
      const _component_AppFooter = resolveComponent("AppFooter");
      const _component_CartDrawer = __nuxt_component_0;
      const _component_ToastContainer = resolveComponent("ToastContainer");
      const _component_WhatsappFab = resolveComponent("WhatsappFab");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AppNavbar, null, null, _parent));
      _push(`<main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_CartDrawer, null, null, _parent));
      _push(ssrRenderComponent(_component_ToastContainer, null, null, _parent));
      _push(ssrRenderComponent(_component_WhatsappFab, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BA9X3nl5.mjs.map
