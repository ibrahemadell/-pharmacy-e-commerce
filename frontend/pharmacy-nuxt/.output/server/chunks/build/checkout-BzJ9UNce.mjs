import { f as useHead, h as useRouter, _ as __nuxt_component_0, i as useRuntimeConfig } from './server.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderComponent, ssrLooseContain } from 'vue/server-renderer';
import { u as useApi, b as useCartStore, a as useCart, c as useFormatters } from './index-BKk0TMm7.mjs';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
import { u as useI18n } from './useI18n-B8XBsOEE.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Checkout - PharmaCare" });
    useApi();
    const cartStore = useCartStore();
    useAuthStore();
    useCart();
    const fmt = useFormatters();
    useRouter();
    const config = useRuntimeConfig();
    const { t, dir, isAr } = useI18n();
    const addresses = ref([]);
    const selectedAddressId = ref(null);
    const showAddressForm = ref(false);
    const savingAddr = ref(false);
    const placing = ref(false);
    const paymentMethod = ref(0);
    const notes = ref("");
    const prescriptionUrl = ref("");
    const couponCode = ref("");
    const couponMsg = ref("");
    const couponApplied = ref(false);
    const couponDiscount = ref(0);
    const couponLoading = ref(false);
    const newAddr = reactive({
      label: "Home",
      fullName: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      governorate: "",
      isDefault: false
    });
    const paymentMethods = computed(() => [
      { value: 0, label: t("checkout.cod"), desc: isAr.value ? "\u0627\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0637\u0644\u0628" : "Pay when your order arrives", icon: "mdi:cash" },
      { value: 1, label: t("checkout.online"), desc: isAr.value ? "\u0628\u0637\u0627\u0642\u0629 \u0627\u0626\u062A\u0645\u0627\u0646\u064A\u0629/\u0645\u062F\u064A\u0646\u064A\u0629 (\u0642\u0631\u064A\u0628\u0627\u064B)" : "Credit/Debit card (coming soon)", icon: "heroicons:credit-card" },
      { value: 2, label: t("checkout.whatsapp"), desc: isAr.value ? "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0635\u064A\u062F\u0644\u064A \u0645\u0628\u0627\u0634\u0631\u0629" : "Contact pharmacist directly", icon: "mdi:whatsapp" }
    ]);
    const canPlaceOrder = computed(() => selectedAddressId.value && !cartStore.isEmpty);
    const waRxLink = computed(() => fmt.whatsappLink(config.public.whatsappNumber, "Hi! I want to send my prescription."));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "page-container py-8 max-w-5xl",
        dir: unref(dir)
      }, _attrs))}><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">${ssrInterpolate(unref(t)("checkout.title"))}</h1><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="card p-6"><h2 class="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center gap-2"><span class="w-7 h-7 bg-emerald-600 text-white rounded-full text-sm flex items-center justify-center font-bold">1</span> ${ssrInterpolate(unref(t)("checkout.shipping_address"))}</h2>`);
      if (unref(addresses).length) {
        _push(`<div class="space-y-3 mb-4"><!--[-->`);
        ssrRenderList(unref(addresses), (addr) => {
          _push(`<label class="${ssrRenderClass([unref(selectedAddressId) === addr.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950" : "border-gray-200 dark:border-slate-600 hover:border-emerald-300", "flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all"])}"><input type="radio"${ssrRenderAttr("value", addr.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedAddressId), addr.id)) ? " checked" : ""} class="accent-emerald-600 mt-0.5"><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-0.5"><span class="font-semibold text-sm">${ssrInterpolate(addr.label)}</span>`);
          if (addr.isDefault) {
            _push(`<span class="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">${ssrInterpolate(unref(isAr) ? "\u0627\u0641\u062A\u0631\u0627\u0636\u064A" : "Default")}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(addr.fullName)} \xB7 ${ssrInterpolate(addr.phoneNumber)}</p><p class="text-sm text-gray-500">${ssrInterpolate(addr.addressLine1)}, ${ssrInterpolate(addr.city)}, ${ssrInterpolate(addr.governorate)}</p></div></label>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="btn-secondary text-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(showAddressForm) ? unref(t)("admin.cancel") : unref(t)("checkout.new_address"))}</button>`);
      if (unref(showAddressForm)) {
        _push(`<div class="mt-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl space-y-3"><div class="grid grid-cols-2 gap-3"><input${ssrRenderAttr("value", unref(newAddr).fullName)}${ssrRenderAttr("placeholder", unref(isAr) ? "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 *" : "Full Name *")} class="input-field text-sm" required><input${ssrRenderAttr("value", unref(newAddr).phoneNumber)}${ssrRenderAttr("placeholder", unref(isAr) ? "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 *" : "Phone *")} class="input-field text-sm" required></div><input${ssrRenderAttr("value", unref(newAddr).addressLine1)}${ssrRenderAttr("placeholder", unref(isAr) ? "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644 *" : "Street Address *")} class="input-field text-sm" required><input${ssrRenderAttr("value", unref(newAddr).addressLine2)}${ssrRenderAttr("placeholder", unref(isAr) ? "\u0627\u0644\u0634\u0642\u0629 / \u0627\u0644\u062F\u0648\u0631 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)" : "Apartment / Floor (optional)")} class="input-field text-sm"><div class="grid grid-cols-2 gap-3"><input${ssrRenderAttr("value", unref(newAddr).city)}${ssrRenderAttr("placeholder", unref(isAr) ? "\u0627\u0644\u0645\u062F\u064A\u0646\u0629 *" : "City *")} class="input-field text-sm" required><input${ssrRenderAttr("value", unref(newAddr).governorate)}${ssrRenderAttr("placeholder", unref(isAr) ? "\u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 *" : "Governorate *")} class="input-field text-sm" required></div><div class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(newAddr).isDefault) ? ssrLooseContain(unref(newAddr).isDefault, null) : unref(newAddr).isDefault) ? " checked" : ""} type="checkbox" id="defaultAddr" class="accent-emerald-600"><label for="defaultAddr" class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(unref(isAr) ? "\u062A\u0639\u064A\u064A\u0646 \u0643\u0639\u0646\u0648\u0627\u0646 \u0627\u0641\u062A\u0631\u0627\u0636\u064A" : "Set as default address")}</label></div><button${ssrIncludeBooleanAttr(unref(savingAddr)) ? " disabled" : ""} class="btn-primary text-sm">`);
        if (unref(savingAddr)) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "svg-spinners:ring-resize",
            class: "w-4 h-4"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(isAr) ? "\u062D\u0641\u0638 \u0627\u0644\u0639\u0646\u0648\u0627\u0646" : "Save Address")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="card p-6"><h2 class="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center gap-2"><span class="w-7 h-7 bg-emerald-600 text-white rounded-full text-sm flex items-center justify-center font-bold">2</span> ${ssrInterpolate(unref(t)("checkout.payment_method"))}</h2><div class="space-y-3"><!--[-->`);
      ssrRenderList(unref(paymentMethods), (pm) => {
        _push(`<label class="${ssrRenderClass([unref(paymentMethod) === pm.value ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950" : "border-gray-200 dark:border-slate-600 hover:border-emerald-300", "flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all"])}"><input type="radio"${ssrRenderAttr("value", pm.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(paymentMethod), pm.value)) ? " checked" : ""} class="accent-emerald-600">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: pm.icon,
          class: "w-6 h-6 text-gray-500"
        }, null, _parent));
        _push(`<div><p class="font-medium text-sm">${ssrInterpolate(pm.label)}</p><p class="text-xs text-gray-400">${ssrInterpolate(pm.desc)}</p></div></label>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(cartStore).cart.hasPrescriptionItems) {
        _push(`<div class="card p-6"><h2 class="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center gap-2"><span class="w-7 h-7 bg-orange-500 text-white rounded-full text-sm flex items-center justify-center font-bold">3</span> ${ssrInterpolate(unref(isAr) ? "\u0631\u0641\u0639 \u0627\u0644\u0648\u0635\u0641\u0629 \u0627\u0644\u0637\u0628\u064A\u0629" : "Upload Prescription")}</h2><div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-4"><p class="text-sm text-orange-700 dark:text-orange-400">${ssrInterpolate(unref(isAr) ? "\u0633\u0644\u062A\u0643 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0623\u062F\u0648\u064A\u0629 \u062A\u062A\u0637\u0644\u0628 \u0631\u0648\u0634\u062A\u0629 \u0637\u0628\u064A\u0629. \u064A\u0631\u062C\u0649 \u0631\u0641\u0639 \u0627\u0644\u0648\u0635\u0641\u0629." : "Your cart contains prescription items. Please upload a valid prescription.")}</p></div><input${ssrRenderAttr("value", unref(prescriptionUrl))} type="url"${ssrRenderAttr("placeholder", unref(isAr) ? "\u0627\u0644\u0635\u0642 \u0631\u0627\u0628\u0637 \u0635\u0648\u0631\u0629 \u0627\u0644\u0648\u0635\u0641\u0629 \u0623\u0648 \u0623\u0631\u0633\u0644\u0647\u0627 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628" : "Paste prescription image URL or upload via WhatsApp")} class="input-field text-sm"><p class="text-xs text-gray-400 mt-2">${ssrInterpolate(unref(isAr) ? "\u0623\u0648 " : "Or ")} <a${ssrRenderAttr("href", unref(waRxLink))} target="_blank" class="text-emerald-600 hover:underline">${ssrInterpolate(unref(isAr) ? "\u0623\u0631\u0633\u0644\u0647\u0627 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628" : "send it via WhatsApp")}</a></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card p-6"><h2 class="font-semibold text-gray-900 dark:text-white mb-3">${ssrInterpolate(unref(t)("checkout.notes"))}</h2><textarea rows="3"${ssrRenderAttr("placeholder", unref(isAr) ? "\u0623\u064A \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u062E\u0627\u0635\u0629 \u0644\u0637\u0644\u0628\u0643..." : "Any special instructions for your order...")} class="input-field text-sm resize-none">${ssrInterpolate(unref(notes))}</textarea></div></div><div class="lg:col-span-1"><div class="card p-5 sticky top-24"><h3 class="font-bold text-gray-900 dark:text-white mb-4">${ssrInterpolate(unref(t)("checkout.summary"))}</h3><div class="space-y-3 mb-4"><!--[-->`);
      ssrRenderList(unref(cartStore).cart.items, (item) => {
        _push(`<div class="flex gap-3"><img${ssrRenderAttr("src", item.productImage || "/img/placeholder.png")}${ssrRenderAttr("alt", item.productName)} class="w-12 h-12 rounded-lg object-contain bg-gray-50 flex-shrink-0"><div class="flex-1 min-w-0"><p class="text-xs font-medium line-clamp-2 text-gray-800 dark:text-gray-200">${ssrInterpolate(item.productName)}</p><p class="text-xs text-gray-500">${ssrInterpolate(unref(isAr) ? "\u0627\u0644\u0643\u0645\u064A\u0629:" : "Qty:")} ${ssrInterpolate(item.quantity)}</p></div><span class="text-xs font-semibold text-gray-900 dark:text-white flex-shrink-0">${ssrInterpolate(unref(fmt).formatCurrency(item.lineTotal))}</span></div>`);
      });
      _push(`<!--]--></div><div class="border-t border-gray-100 dark:border-slate-700 pt-4 mb-4"><div class="flex gap-2"><input${ssrRenderAttr("value", unref(couponCode))} type="text"${ssrRenderAttr("placeholder", unref(isAr) ? "\u0643\u0648\u062F \u0627\u0644\u062E\u0635\u0645" : "Coupon code")} class="input-field text-sm py-2 flex-1"><button${ssrIncludeBooleanAttr(unref(couponLoading)) ? " disabled" : ""} class="btn-secondary text-xs px-3">${ssrInterpolate(unref(t)("cart.apply"))}</button></div>`);
      if (unref(couponMsg)) {
        _push(`<p class="${ssrRenderClass([unref(couponApplied) ? "text-emerald-600" : "text-red-500", "text-xs mt-1.5 font-medium"])}">${ssrInterpolate(unref(couponMsg))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2 text-sm"><div class="flex justify-between text-gray-600 dark:text-gray-400"><span>${ssrInterpolate(unref(t)("cart.subtotal"))}</span><span>${ssrInterpolate(unref(fmt).formatCurrency(unref(cartStore).cart.subTotal))}</span></div><div class="flex justify-between text-gray-600 dark:text-gray-400"><span>${ssrInterpolate(unref(t)("cart.delivery"))}</span><span class="${ssrRenderClass(unref(cartStore).cart.deliveryFee === 0 ? "text-emerald-600 font-semibold" : "")}">${ssrInterpolate(unref(cartStore).cart.deliveryFee === 0 ? unref(isAr) ? "\u0645\u062C\u0627\u0646\u064A" : "FREE" : unref(fmt).formatCurrency(unref(cartStore).cart.deliveryFee))}</span></div>`);
      if (unref(couponDiscount) > 0) {
        _push(`<div class="flex justify-between text-emerald-600 font-medium"><span>${ssrInterpolate(unref(t)("cart.discount"))}</span><span>-${ssrInterpolate(unref(fmt).formatCurrency(unref(couponDiscount)))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between font-bold text-base pt-3 border-t border-gray-200 dark:border-slate-600"><span>${ssrInterpolate(unref(t)("cart.total"))}</span><span class="text-emerald-600">${ssrInterpolate(unref(fmt).formatCurrency(unref(cartStore).cart.subTotal + unref(cartStore).cart.deliveryFee - unref(couponDiscount)))}</span></div></div><button${ssrIncludeBooleanAttr(!unref(canPlaceOrder) || unref(placing)) ? " disabled" : ""} class="btn-primary w-full justify-center py-3.5 mt-5">`);
      if (unref(placing)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:ring-resize",
          class: "w-5 h-5"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-badge",
          class: "w-5 h-5"
        }, null, _parent));
      }
      _push(` ${ssrInterpolate(unref(placing) ? unref(isAr) ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0623\u0643\u064A\u062F..." : "Placing Order\u2026" : unref(t)("checkout.place_order"))}</button><p class="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:lock-closed",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(isAr) ? "\u062F\u0641\u0639 \u0622\u0645\u0646 \u0648\u0645\u0634\u0641\u0631" : "Secure & encrypted checkout")}</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-BzJ9UNce.mjs.map
