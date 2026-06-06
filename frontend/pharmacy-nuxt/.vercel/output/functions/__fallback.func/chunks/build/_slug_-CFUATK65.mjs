import { g as useRoute, a as __nuxt_component_1, _ as __nuxt_component_0, i as useRuntimeConfig } from './server.mjs';
import { _ as _sfc_main$1 } from './ProductCard-Cd7Hk02d.mjs';
import { defineComponent, ref, computed, unref, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useApi, a as useCart, c as useFormatters } from './index-BbS-CUl0.mjs';
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
import './useI18n-CmjBwoSx.mjs';
import './auth-uW8XXc_J.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useApi();
    useCart();
    const fmt = useFormatters();
    const config = useRuntimeConfig();
    const product = ref(null);
    const similar = ref([]);
    const loading = ref(true);
    const adding = ref(false);
    const qty = ref(1);
    const selectedVariant = ref(null);
    const activeTab = ref("description");
    const activeImage = ref("");
    const tabs = [
      { id: "description", label: "Description" },
      { id: "details", label: "Product Details" }
    ];
    const miniFeatures = [
      { icon: "heroicons:shield-check", label: "Genuine Product" },
      { icon: "heroicons:truck", label: "Fast Delivery" },
      { icon: "heroicons:arrow-uturn-left", label: "Easy Returns" },
      { icon: "heroicons:lock-closed", label: "Secure Payment" }
    ];
    const productDetails = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g;
      return [
        { label: "Category", value: (_a = product.value) == null ? void 0 : _a.categoryName },
        { label: "Brand", value: (_b = product.value) == null ? void 0 : _b.brand },
        { label: "Manufacturer", value: (_c = product.value) == null ? void 0 : _c.manufacturer },
        { label: "Unit", value: (_d = product.value) == null ? void 0 : _d.unit },
        { label: "Barcode", value: (_e = product.value) == null ? void 0 : _e.barcode },
        { label: "Expiry Date", value: ((_f = product.value) == null ? void 0 : _f.expiryDate) ? fmt.formatDate(product.value.expiryDate) : null },
        { label: "Prescription", value: ((_g = product.value) == null ? void 0 : _g.isPrescriptionRequired) ? "Required" : "Not Required" }
      ];
    });
    const waOrderLink = computed(() => {
      if (!product.value) return "#";
      const msg = `Hi PharmaCare! I'd like to order:
\u2022 ${product.value.name}
\u2022 Qty: ${qty.value}
Please assist me.`;
      return fmt.whatsappLink(config.public.whatsappNumber, msg);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      const _component_ProductCard = _sfc_main$1;
      if (unref(product)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container py-8" }, _attrs))}><nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "hover:text-emerald-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-4 h-4"
        }, null, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "hover:text-emerald-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Products`);
            } else {
              return [
                createTextVNode("Products")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-4 h-4"
        }, null, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/products?categoryId=${unref(product).categoryId}`,
          class: "hover:text-emerald-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(product).categoryName)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(product).categoryName), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span class="text-gray-900 dark:text-white font-medium line-clamp-1">${ssrInterpolate(unref(product).name)}</span></nav><div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14"><div><div class="aspect-square bg-gray-50 dark:bg-slate-800 rounded-2xl overflow-hidden mb-3 border border-gray-100 dark:border-slate-700"><img${ssrRenderAttr("src", unref(activeImage) || "/img/placeholder.png")}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-contain p-8"></div>`);
        if (unref(product).images.length > 1) {
          _push(`<div class="flex gap-2 overflow-x-auto pb-1"><!--[-->`);
          ssrRenderList(unref(product).images, (img) => {
            _push(`<button class="${ssrRenderClass([unref(activeImage) === img.imageUrl ? "border-emerald-500 ring-1 ring-emerald-500" : "border-gray-200 dark:border-slate-600", "flex-shrink-0 w-16 h-16 border rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-800 transition-all"])}"><img${ssrRenderAttr("src", img.imageUrl)}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-contain p-1"></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><div class="flex flex-wrap gap-2 mb-3">`);
        if (unref(product).isPrescriptionRequired) {
          _push(`<span class="badge-rx text-sm px-3 py-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:clipboard-document",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Prescription Required </span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).isBestSeller) {
          _push(`<span class="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:fire",
            class: "w-3.5 h-3.5"
          }, null, _parent));
          _push(` Best Seller </span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).discountPercent > 0) {
          _push(`<span class="badge-discount text-sm px-3 py-1">${ssrInterpolate(unref(product).discountPercent)}% OFF</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">${ssrInterpolate(unref(product).name)}</h1><div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">`);
        if (unref(product).brand) {
          _push(`<span><strong>Brand:</strong> ${ssrInterpolate(unref(product).brand)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).manufacturer) {
          _push(`<span><strong>By:</strong> ${ssrInterpolate(unref(product).manufacturer)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).unit) {
          _push(`<span><strong>Unit:</strong> ${ssrInterpolate(unref(product).unit)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center gap-3 mb-5"><div class="flex"><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(ssrRenderComponent(_component_Icon, {
            key: i,
            name: i <= Math.round(unref(product).averageRating) ? "heroicons:star-solid" : "heroicons:star",
            class: ["w-5 h-5", i <= Math.round(unref(product).averageRating) ? "text-amber-400" : "text-gray-200"]
          }, null, _parent));
        });
        _push(`<!--]--></div><span class="text-sm text-gray-500">${ssrInterpolate(unref(product).averageRating.toFixed(1))} (${ssrInterpolate(unref(product).reviewCount)} reviews)</span></div><div class="flex items-end gap-3 mb-6"><span class="text-3xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(fmt).formatCurrency((_a = unref(product).discountPrice) != null ? _a : unref(product).price))}</span>`);
        if (unref(product).discountPrice) {
          _push(`<span class="text-xl text-gray-400 line-through mb-0.5">${ssrInterpolate(unref(fmt).formatCurrency(unref(product).price))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).discountPrice) {
          _push(`<span class="text-sm font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-lg"> You save ${ssrInterpolate(unref(fmt).formatCurrency(unref(product).price - unref(product).discountPrice))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(product).shortDescription) {
          _push(`<p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">${ssrInterpolate(unref(product).shortDescription)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).variants.length) {
          _push(`<div class="mb-5"><p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Select Variant:</p><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(unref(product).variants, (v) => {
            _push(`<button class="${ssrRenderClass([unref(selectedVariant) === v.id ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-emerald-300", "px-3 py-1.5 rounded-xl border text-sm font-medium transition-all"])}"${ssrIncludeBooleanAttr(v.stockQuantity === 0) ? " disabled" : ""}>${ssrInterpolate(v.name)} `);
            if (v.stockQuantity === 0) {
              _push(`<span class="text-xs ml-1 text-red-400">(Out)</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</button>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center gap-2 mb-5"><div class="${ssrRenderClass([unref(product).isOutOfStock ? "bg-red-500" : unref(product).isLowStock ? "bg-amber-500" : "bg-emerald-500", "w-2.5 h-2.5 rounded-full"])}"></div><span class="${ssrRenderClass([unref(product).isOutOfStock ? "text-red-600" : unref(product).isLowStock ? "text-amber-600" : "text-emerald-600", "text-sm font-medium"])}">${ssrInterpolate(unref(product).isOutOfStock ? "Out of Stock" : unref(product).isLowStock ? `Only ${unref(product).stockQuantity} left!` : "In Stock")}</span></div>`);
        if (unref(product).expiryDate) {
          _push(`<div class="flex items-center gap-2 text-sm text-gray-500 mb-5">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:calendar",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Expires: ${ssrInterpolate(unref(fmt).formatDate(unref(product).expiryDate))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-wrap items-center gap-3 mb-5"><div class="flex items-center border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden"><button class="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:minus",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button><input${ssrRenderAttr("value", unref(qty))} type="number" min="1"${ssrRenderAttr("max", unref(product).stockQuantity)} class="w-14 h-11 text-center font-semibold bg-transparent border-none outline-none"><button class="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:plus",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div>`);
        if (!unref(product).isOutOfStock) {
          _push(`<button${ssrIncludeBooleanAttr(unref(adding)) ? " disabled" : ""} class="btn-primary flex-1 min-w-[160px] justify-center py-3">`);
          if (unref(adding)) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "svg-spinners:ring-resize",
              class: "w-5 h-5"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-cart",
              class: "w-5 h-5"
            }, null, _parent));
          }
          _push(` ${ssrInterpolate(unref(adding) ? "Adding\u2026" : "Add to Cart")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<a${ssrRenderAttr("href", unref(waOrderLink))} target="_blank" class="flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:whatsapp",
          class: "w-5 h-5"
        }, null, _parent));
        _push(` Order via WhatsApp </a></div>`);
        if (unref(product).isPrescriptionRequired) {
          _push(`<div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-5"><div class="flex gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:exclamation-triangle",
            class: "w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5"
          }, null, _parent));
          _push(`<div><p class="text-sm font-semibold text-orange-800 dark:text-orange-300">Prescription Required</p><p class="text-xs text-orange-600 dark:text-orange-400 mt-0.5"> You will need to upload a valid prescription during checkout or send it via WhatsApp. </p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-2 gap-3"><!--[-->`);
        ssrRenderList(miniFeatures, (f) => {
          _push(`<div class="flex items-center gap-2 text-xs text-gray-500">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: f.icon,
            class: "w-4 h-4 text-emerald-500 flex-shrink-0"
          }, null, _parent));
          _push(` ${ssrInterpolate(f.label)}</div>`);
        });
        _push(`<!--]--></div></div></div><div class="card mb-14"><div class="flex border-b border-gray-100 dark:border-slate-700"><!--[-->`);
        ssrRenderList(tabs, (tab) => {
          _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.id ? "border-b-2 border-emerald-600 text-emerald-600 font-semibold" : "text-gray-500 hover:text-gray-700", "px-6 py-3.5 text-sm transition-colors -mb-px"])}">${ssrInterpolate(tab.label)}</button>`);
        });
        _push(`<!--]--></div><div class="p-6">`);
        if (unref(activeTab) === "description") {
          _push(`<div class="prose prose-sm dark:prose-invert max-w-none">`);
          if (unref(product).description) {
            _push(`<p class="text-gray-600 dark:text-gray-400 leading-relaxed">${ssrInterpolate(unref(product).description)}</p>`);
          } else {
            _push(`<p class="text-gray-400">No description available.</p>`);
          }
          _push(`</div>`);
        } else if (unref(activeTab) === "details") {
          _push(`<div class="space-y-3"><!--[-->`);
          ssrRenderList(unref(productDetails), (d) => {
            _push(`<div class="flex gap-3 text-sm"><span class="font-medium text-gray-700 dark:text-gray-300 w-36 flex-shrink-0">${ssrInterpolate(d.label)}</span><span class="text-gray-500">${ssrInterpolate(d.value || "\u2014")}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(similar).length) {
          _push(`<div><div class="flex items-center justify-between mb-6"><h2 class="section-title">Similar Products</h2></div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"><!--[-->`);
          ssrRenderList(unref(similar), (p) => {
            _push(ssrRenderComponent(_component_ProductCard, {
              key: p.id,
              product: p
            }, null, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container py-8" }, _attrs))}><div class="grid grid-cols-1 lg:grid-cols-2 gap-10"><div class="skeleton aspect-square rounded-2xl"></div><div class="space-y-4"><div class="skeleton h-8 w-3/4 rounded"></div><div class="skeleton h-5 w-1/2 rounded"></div><div class="skeleton h-10 w-1/3 rounded"></div><div class="skeleton h-4 w-full rounded"></div><div class="skeleton h-4 w-5/6 rounded"></div><div class="skeleton h-12 w-full rounded-xl"></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CFUATK65.mjs.map
