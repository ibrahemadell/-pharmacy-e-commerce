import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useCart } from './index-BbS-CUl0.mjs';
import { u as useI18n } from './useI18n-CmjBwoSx.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    useCart();
    const { t, isAr, formatCurrency } = useI18n();
    const adding = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card group relative overflow-hidden flex flex-col" }, _attrs))}><div class="absolute top-2 start-2 z-10 flex flex-col gap-1">`);
      if (__props.product.discountPercent > 0) {
        _push(`<span class="badge-discount">-${ssrInterpolate(__props.product.discountPercent)}%</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.isPrescriptionRequired) {
        _push(`<span class="badge-rx">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:clipboard-document",
          class: "w-3 h-3"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(t)("product.rx"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.isOutOfStock) {
        _push(`<span class="px-2 py-0.5 bg-gray-500 text-white text-xs font-semibold rounded-full">${ssrInterpolate(unref(t)("product.out_of_stock"))}</span>`);
      } else if (__props.product.isLowStock) {
        _push(`<span class="badge-low-stock">${ssrInterpolate(unref(t)("product.low_stock"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="absolute top-2 end-2 z-10 w-8 h-8 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-50 hover:text-emerald-600 shadow-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:heart",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.slug}`,
        class: "block overflow-hidden bg-gray-50 dark:bg-slate-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.product.primaryImage || "/img/placeholder.png")}${ssrRenderAttr("alt", unref(isAr) ? __props.product.nameAr || __props.product.name : __props.product.name)} class="w-full h-44 object-contain p-4 group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: __props.product.primaryImage || "/img/placeholder.png",
                alt: unref(isAr) ? __props.product.nameAr || __props.product.name : __props.product.name,
                class: "w-full h-44 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              }, null, 8, ["src", "alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="p-3 flex flex-col flex-1"><p class="text-xs text-emerald-600 font-medium mb-1">${ssrInterpolate(__props.product.categoryName)}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.slug}`,
        class: "text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-emerald-600 transition-colors leading-snug mb-2 flex-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isAr) ? __props.product.nameAr || __props.product.name : __props.product.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isAr) ? __props.product.nameAr || __props.product.name : __props.product.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-1 mb-2"><div class="flex"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(ssrRenderComponent(_component_Icon, {
          key: i,
          name: i <= Math.round(__props.product.averageRating) ? "heroicons:star-solid" : "heroicons:star",
          class: ["w-3.5 h-3.5", i <= Math.round(__props.product.averageRating) ? "text-amber-400" : "text-gray-200"]
        }, null, _parent));
      });
      _push(`<!--]--></div><span class="text-xs text-gray-400">(${ssrInterpolate(__props.product.reviewCount)})</span></div><div class="flex items-center gap-2 mb-3"><span class="text-base font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(formatCurrency)((_a = __props.product.discountPrice) != null ? _a : __props.product.price))}</span>`);
      if (__props.product.discountPrice) {
        _push(`<span class="text-sm text-gray-400 line-through">${ssrInterpolate(unref(formatCurrency)(__props.product.price))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!__props.product.isOutOfStock && !__props.product.isPrescriptionRequired) {
        _push(`<button${ssrIncludeBooleanAttr(unref(adding)) ? " disabled" : ""} class="btn-primary w-full text-sm py-2 justify-center">`);
        if (unref(adding)) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "svg-spinners:ring-resize",
            class: "w-4 h-4"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:shopping-cart",
            class: "w-4 h-4"
          }, null, _parent));
        }
        _push(` ${ssrInterpolate(unref(adding) ? unref(isAr) ? "\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0636\u0627\u0641\u0629..." : "Adding\u2026" : unref(t)("product.add_to_cart"))}</button>`);
      } else if (__props.product.isPrescriptionRequired) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/products/${__props.product.slug}`,
          class: "btn-secondary w-full text-sm py-2 justify-center text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:clipboard-document",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(isAr) ? "\u0639\u0631\u0636 \u0648\u0637\u0644\u0628" : "View & Order")}`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:clipboard-document",
                  class: "w-4 h-4"
                }),
                createTextVNode(" " + toDisplayString(unref(isAr) ? "\u0639\u0631\u0636 \u0648\u0637\u0644\u0628" : "View & Order"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="text-center text-sm text-gray-400 py-2">${ssrInterpolate(unref(t)("product.out_of_stock"))}</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ProductCard-Cd7Hk02d.mjs.map
