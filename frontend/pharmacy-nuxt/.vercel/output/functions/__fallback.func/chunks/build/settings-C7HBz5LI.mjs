import { f as useHead, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useApi, c as useFormatters } from './index-CDfwTiwy.mjs';
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
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Settings - Admin" });
    useApi();
    const fmt = useFormatters();
    const activeTab = ref("general");
    const saving = ref(false);
    const settings = reactive({
      pharmacy_name: "",
      pharmacy_phone: "",
      pharmacy_whatsapp: "",
      pharmacy_email: "",
      pharmacy_address: "",
      currency: "EGP",
      hero_title: "",
      hero_subtitle: "",
      delivery_fee: "25",
      free_delivery_threshold: "300",
      social_facebook: "",
      social_instagram: "",
      social_twitter: ""
    });
    const tabs = [
      { id: "general", label: "General", icon: "heroicons:cog-6-tooth" },
      { id: "shipping", label: "Shipping", icon: "heroicons:truck" },
      { id: "social", label: "Social", icon: "heroicons:share" }
    ];
    const socialFields = [
      { key: "social_facebook", label: "Facebook", icon: "mdi:facebook", placeholder: "https://facebook.com/..." },
      { key: "social_instagram", label: "Instagram", icon: "mdi:instagram", placeholder: "https://instagram.com/..." },
      { key: "social_twitter", label: "Twitter/X", icon: "mdi:twitter", placeholder: "https://twitter.com/..." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl" }, _attrs))}><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-7">Settings</h1><div class="flex gap-1 mb-6 bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl w-fit"><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.id ? "bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700", "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: tab.icon,
          class: "w-4 h-4"
        }, null, _parent));
        _push(` ${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(activeTab) === "general") {
        _push(`<div class="space-y-5"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6"><h2 class="font-bold text-gray-900 dark:text-white mb-5">Pharmacy Information</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pharmacy Name</label><input${ssrRenderAttr("value", unref(settings).pharmacy_name)} type="text" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label><input${ssrRenderAttr("value", unref(settings).pharmacy_phone)} type="tel" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">WhatsApp Number</label><input${ssrRenderAttr("value", unref(settings).pharmacy_whatsapp)} type="tel" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label><input${ssrRenderAttr("value", unref(settings).pharmacy_email)} type="email" class="input-field"></div><div class="sm:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label><input${ssrRenderAttr("value", unref(settings).pharmacy_address)} type="text" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Currency</label><select class="input-field"><option value="EGP"${ssrIncludeBooleanAttr(Array.isArray(unref(settings).currency) ? ssrLooseContain(unref(settings).currency, "EGP") : ssrLooseEqual(unref(settings).currency, "EGP")) ? " selected" : ""}>EGP - Egyptian Pound</option><option value="USD"${ssrIncludeBooleanAttr(Array.isArray(unref(settings).currency) ? ssrLooseContain(unref(settings).currency, "USD") : ssrLooseEqual(unref(settings).currency, "USD")) ? " selected" : ""}>USD - US Dollar</option><option value="SAR"${ssrIncludeBooleanAttr(Array.isArray(unref(settings).currency) ? ssrLooseContain(unref(settings).currency, "SAR") : ssrLooseEqual(unref(settings).currency, "SAR")) ? " selected" : ""}>SAR - Saudi Riyal</option><option value="AED"${ssrIncludeBooleanAttr(Array.isArray(unref(settings).currency) ? ssrLooseContain(unref(settings).currency, "AED") : ssrLooseEqual(unref(settings).currency, "AED")) ? " selected" : ""}>AED - UAE Dirham</option></select></div></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6"><h2 class="font-bold text-gray-900 dark:text-white mb-5">Homepage Content</h2><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Hero Title</label><input${ssrRenderAttr("value", unref(settings).hero_title)} type="text" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Hero Subtitle</label><input${ssrRenderAttr("value", unref(settings).hero_subtitle)} type="text" class="input-field"></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "shipping") {
        _push(`<div class="space-y-5"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6"><h2 class="font-bold text-gray-900 dark:text-white mb-5">Delivery Settings</h2><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Delivery Fee (EGP)</label><input${ssrRenderAttr("value", unref(settings).delivery_fee)} type="number" min="0" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Free Delivery Above (EGP)</label><input${ssrRenderAttr("value", unref(settings).free_delivery_threshold)} type="number" min="0" class="input-field"></div></div><div class="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-xl text-sm text-emerald-700 dark:text-emerald-400 flex items-start gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:information-circle",
          class: "w-5 h-5 flex-shrink-0 mt-0.5"
        }, null, _parent));
        _push(` Customers get free delivery on orders over ${ssrInterpolate(unref(fmt).formatCurrency(Number(unref(settings).free_delivery_threshold) || 0))}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "social") {
        _push(`<div class="space-y-5"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6"><h2 class="font-bold text-gray-900 dark:text-white mb-5">Social Media Links</h2><div class="space-y-4"><!--[-->`);
        ssrRenderList(socialFields, (s) => {
          _push(`<div class="flex items-center gap-3"><div class="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: s.icon,
            class: "w-5 h-5 text-gray-500"
          }, null, _parent));
          _push(`</div><input${ssrRenderAttr("value", unref(settings)[s.key])} type="url"${ssrRenderAttr("placeholder", s.placeholder)} class="input-field flex-1"></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-end mt-6"><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary px-8">`);
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
      _push(` ${ssrInterpolate(unref(saving) ? "Saving\u2026" : "Save Settings")}</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-C7HBz5LI.mjs.map
