import { h as useRoute, i as useRouter, f as useHead, a as __nuxt_component_1, _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$1 } from './NuxtImg-BUTvnb3j.mjs';
import { defineComponent, computed, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useApi, c as useFormatters } from './index-CDfwTiwy.mjs';
import { u as useI18n } from './useI18n-B8XBsOEE.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:url';
import 'ipx';
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
  __name: "edit",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useApi();
    const fmt = useFormatters();
    const { t } = useI18n();
    const productId = route.params.id;
    const isEdit = computed(() => !!productId && productId !== "new");
    useHead({ title: `${isEdit.value ? "Edit" : "New"} Product - Admin` });
    const saving = ref(false);
    const categories = ref([]);
    const newImageUrl = ref("");
    const form = reactive({
      name: "",
      nameAr: "",
      categoryId: "",
      brand: "",
      manufacturer: "",
      unit: "",
      shortDescription: "",
      shortDescriptionAr: "",
      description: "",
      descriptionAr: "",
      barcode: "",
      price: 0,
      discountPrice: void 0,
      stockQuantity: 0,
      lowStockThreshold: 10,
      expiryDate: "",
      isActive: true,
      isFeatured: false,
      isBestSeller: false,
      isPrescriptionRequired: false,
      isAvailableOnWhatsApp: false,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      imageUrls: [],
      primaryImageIndex: 0,
      variants: []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_NuxtImg = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl" }, _attrs))}><div class="flex items-center gap-4 mb-7">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products",
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
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(isEdit) ? "Edit Product" : "New Product")}</h1><p class="text-sm text-gray-500">${ssrInterpolate(unref(isEdit) ? "Update product information" : "Add a new product to your store")}</p></div></div><form class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-5"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">Basic Information</h2><div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${ssrInterpolate(unref(t)("admin.name_en"))}</label><input${ssrRenderAttr("value", unref(form).name)} required type="text" placeholder="e.g. Panadol Extra 500mg" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${ssrInterpolate(unref(t)("admin.name_ar"))}</label><input${ssrRenderAttr("value", unref(form).nameAr)} type="text" placeholder="\u0645\u062B\u0627\u0644: \u0628\u0646\u0627\u062F\u0648\u0644 \u0627\u0643\u0633\u062A\u0631\u0627 500 \u0645\u0644\u063A" class="input-field text-right" dir="rtl"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category *</label><select required class="input-field"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).categoryId) ? ssrLooseContain(unref(form).categoryId, "") : ssrLooseEqual(unref(form).categoryId, "")) ? " selected" : ""}>Select category</option><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(`<option${ssrRenderAttr("value", c.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).categoryId) ? ssrLooseContain(unref(form).categoryId, c.id) : ssrLooseEqual(unref(form).categoryId, c.id)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Brand</label><input${ssrRenderAttr("value", unref(form).brand)} type="text" placeholder="e.g. GSK" class="input-field"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Manufacturer</label><input${ssrRenderAttr("value", unref(form).manufacturer)} type="text" placeholder="Manufacturer" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Unit</label><input${ssrRenderAttr("value", unref(form).unit)} type="text" placeholder="e.g. mg, ml, tablet" class="input-field"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${ssrInterpolate(unref(t)("admin.short_desc_en"))}</label><input${ssrRenderAttr("value", unref(form).shortDescription)} type="text" placeholder="Brief summary (EN)" class="input-field" maxlength="500"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${ssrInterpolate(unref(t)("admin.short_desc_ar"))}</label><input${ssrRenderAttr("value", unref(form).shortDescriptionAr)} type="text" placeholder="\u0645\u0644\u062E\u0635 \u0642\u0635\u064A\u0631 (\u0639\u0631\u0628\u064A)" class="input-field text-right" dir="rtl" maxlength="500"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${ssrInterpolate(unref(t)("admin.desc_en"))}</label><textarea rows="4" placeholder="Detailed description (EN)..." class="input-field resize-none">${ssrInterpolate(unref(form).description)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${ssrInterpolate(unref(t)("admin.desc_ar"))}</label><textarea rows="4" placeholder="\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A (\u0639\u0631\u0628\u064A)..." class="input-field resize-none text-right" dir="rtl">${ssrInterpolate(unref(form).descriptionAr)}</textarea></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Barcode</label><input${ssrRenderAttr("value", unref(form).barcode)} type="text" placeholder="EAN / UPC barcode" class="input-field"></div></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">Pricing</h2><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Original Price (EGP) *</label><input${ssrRenderAttr("value", unref(form).price)} required type="number" step="0.01" min="0" placeholder="0.00" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Discount Price (EGP)</label><input${ssrRenderAttr("value", unref(form).discountPrice)} type="number" step="0.01" min="0" placeholder="Leave empty for no discount" class="input-field"></div></div>`);
      if (unref(form).price && unref(form).discountPrice && unref(form).discountPrice < unref(form).price) {
        _push(`<div class="mt-3 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-4 py-2.5 rounded-xl">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:tag",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Discount: ${ssrInterpolate(Math.round((unref(form).price - unref(form).discountPrice) / unref(form).price * 100))}% off \xB7 Customer saves ${ssrInterpolate(unref(fmt).formatCurrency(unref(form).price - unref(form).discountPrice))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">Inventory</h2><div class="grid grid-cols-2 gap-4 mb-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Stock Quantity</label><input${ssrRenderAttr("value", unref(form).stockQuantity)} type="number" min="0" placeholder="0" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Low Stock Threshold</label><input${ssrRenderAttr("value", unref(form).lowStockThreshold)} type="number" min="1" placeholder="10" class="input-field"></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label><input${ssrRenderAttr("value", unref(form).expiryDate)} type="date" class="input-field"></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><div class="flex items-center justify-between mb-4"><h2 class="font-bold text-gray-900 dark:text-white">Variants</h2><button type="button" class="btn-secondary text-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Variant </button></div>`);
      if (unref(form).variants.length) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(form).variants, (v, i) => {
          _push(`<div class="grid grid-cols-4 gap-2 items-center"><input${ssrRenderAttr("value", v.name)} type="text" placeholder="Name (e.g. 500mg)" class="input-field text-sm py-2"><input${ssrRenderAttr("value", v.value)} type="text" placeholder="Value" class="input-field text-sm py-2"><input${ssrRenderAttr("value", v.stockQuantity)} type="number" min="0" placeholder="Stock" class="input-field text-sm py-2"><button type="button" class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:trash",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="text-sm text-gray-400">No variants added. Add variants like different sizes or strengths.</p>`);
      }
      _push(`</div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">SEO</h2><div class="space-y-3"><input${ssrRenderAttr("value", unref(form).metaTitle)} type="text" placeholder="Meta Title" class="input-field text-sm"><textarea rows="2" placeholder="Meta Description" class="input-field text-sm resize-none">${ssrInterpolate(unref(form).metaDescription)}</textarea><input${ssrRenderAttr("value", unref(form).metaKeywords)} type="text" placeholder="Keywords (comma separated)" class="input-field text-sm"></div></div></div><div class="space-y-5"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">Publish</h2><div class="space-y-3"><label class="flex items-center justify-between cursor-pointer"><span class="text-sm text-gray-700 dark:text-gray-300">Active (Visible)</span>`);
      _push(ssrRenderComponent(_component_ToggleSwitch, {
        modelValue: unref(form).isActive,
        "onUpdate:modelValue": ($event) => unref(form).isActive = $event
      }, null, _parent));
      _push(`</label><label class="flex items-center justify-between cursor-pointer"><span class="text-sm text-gray-700 dark:text-gray-300">Featured</span>`);
      _push(ssrRenderComponent(_component_ToggleSwitch, {
        modelValue: unref(form).isFeatured,
        "onUpdate:modelValue": ($event) => unref(form).isFeatured = $event
      }, null, _parent));
      _push(`</label><label class="flex items-center justify-between cursor-pointer"><span class="text-sm text-gray-700 dark:text-gray-300">Best Seller</span>`);
      _push(ssrRenderComponent(_component_ToggleSwitch, {
        modelValue: unref(form).isBestSeller,
        "onUpdate:modelValue": ($event) => unref(form).isBestSeller = $event
      }, null, _parent));
      _push(`</label><label class="flex items-center justify-between cursor-pointer"><span class="text-sm text-gray-700 dark:text-gray-300">Prescription Required</span>`);
      _push(ssrRenderComponent(_component_ToggleSwitch, {
        modelValue: unref(form).isPrescriptionRequired,
        "onUpdate:modelValue": ($event) => unref(form).isPrescriptionRequired = $event
      }, null, _parent));
      _push(`</label><label class="flex items-center justify-between cursor-pointer"><span class="text-sm text-gray-700 dark:text-gray-300">Order via WhatsApp</span>`);
      _push(ssrRenderComponent(_component_ToggleSwitch, {
        modelValue: unref(form).isAvailableOnWhatsApp,
        "onUpdate:modelValue": ($event) => unref(form).isAvailableOnWhatsApp = $event
      }, null, _parent));
      _push(`</label></div><div class="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700 space-y-2"><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary w-full justify-center py-3">`);
      if (unref(saving)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:ring-resize",
          class: "w-4 h-4"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check",
          class: "w-4 h-4"
        }, null, _parent));
      }
      _push(` ${ssrInterpolate(unref(saving) ? "Saving\u2026" : unref(isEdit) ? "Update Product" : "Create Product")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products",
        class: "btn-ghost w-full justify-center text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cancel `);
          } else {
            return [
              createTextVNode(" Cancel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5"><h2 class="font-bold text-gray-900 dark:text-white mb-4">Product Images</h2><div class="space-y-3"><div class="flex gap-2"><input${ssrRenderAttr("value", unref(newImageUrl))} type="url" placeholder="Paste image URL..." class="input-field text-sm py-2 flex-1"><button type="button" class="btn-secondary text-sm px-3">Add</button></div>`);
      if (unref(form).imageUrls.length) {
        _push(`<div class="grid grid-cols-3 gap-2 mt-3"><!--[-->`);
        ssrRenderList(unref(form).imageUrls, (url, i) => {
          _push(`<div class="relative group aspect-square">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: url,
            class: "w-full h-full object-contain rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50"
          }, null, _parent));
          _push(`<button type="button" class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-3 h-3"
          }, null, _parent));
          _push(`</button><button type="button" class="${ssrRenderClass([unref(form).primaryImageIndex === i ? "bg-emerald-600 text-white" : "bg-white/90 text-gray-600 opacity-0 group-hover:opacity-100", "absolute bottom-1 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full transition-all"])}">${ssrInterpolate(unref(form).primaryImageIndex === i ? "Primary" : "Set Primary")}</button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="text-xs text-gray-400">No images added yet. Add image URLs above.</p>`);
      }
      _push(`</div></div></div></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=edit-CvN9-Kfi.mjs.map
