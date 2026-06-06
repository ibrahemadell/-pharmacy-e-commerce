import { f as useHead, a as __nuxt_component_1, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useApi } from './index-BKk0TMm7.mjs';
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
import './auth-uW8XXc_J.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "My Addresses - PharmaCare" });
    useApi();
    const addresses = ref([]);
    const showForm = ref(false);
    const saving = ref(false);
    const editingId = ref(null);
    const form = reactive({
      label: "Home",
      fullName: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      governorate: "",
      isDefault: false
    });
    const accountLinks = [
      { href: "/account/profile", label: "Profile", icon: "heroicons:user" },
      { href: "/account/orders", label: "My Orders", icon: "heroicons:shopping-bag" },
      { href: "/account/addresses", label: "Addresses", icon: "heroicons:map-pin" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container py-8 max-w-3xl" }, _attrs))}><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-7">My Addresses</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="space-y-2"><!--[-->`);
      ssrRenderList(accountLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.href,
          to: link.href,
          class: ["flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors", _ctx.$route.path === link.href ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: link.icon,
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: link.icon,
                  class: "w-4 h-4"
                }, null, 8, ["name"]),
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="md:col-span-2 space-y-4"><!--[-->`);
      ssrRenderList(unref(addresses), (addr) => {
        _push(`<div class="card p-5"><div class="flex items-start justify-between mb-3"><div class="flex items-center gap-2"><span class="font-semibold text-sm text-gray-900 dark:text-white">${ssrInterpolate(addr.label)}</span>`);
        if (addr.isDefault) {
          _push(`<span class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">Default</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-1"><button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button><button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></div><div class="text-sm text-gray-600 dark:text-gray-400 space-y-0.5"><p class="font-medium text-gray-800 dark:text-gray-200">${ssrInterpolate(addr.fullName)}</p><p>${ssrInterpolate(addr.phoneNumber)}</p><p>${ssrInterpolate(addr.addressLine1)}`);
        if (addr.addressLine2) {
          _push(`<span>, ${ssrInterpolate(addr.addressLine2)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p><p>${ssrInterpolate(addr.city)}, ${ssrInterpolate(addr.governorate)}</p></div></div>`);
      });
      _push(`<!--]--><button class="btn-secondary w-full justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(showForm) && !unref(editingId) ? "Cancel" : "Add New Address")}</button>`);
      if (unref(showForm)) {
        _push(`<div class="card p-5 space-y-3"><h3 class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(unref(editingId) ? "Edit Address" : "New Address")}</h3><div class="grid grid-cols-2 gap-3"><input${ssrRenderAttr("value", unref(form).fullName)} type="text" placeholder="Full Name *" required class="input-field text-sm"><input${ssrRenderAttr("value", unref(form).phoneNumber)} type="tel" placeholder="Phone *" required class="input-field text-sm"></div><select class="input-field text-sm"><option value="Home"${ssrIncludeBooleanAttr(Array.isArray(unref(form).label) ? ssrLooseContain(unref(form).label, "Home") : ssrLooseEqual(unref(form).label, "Home")) ? " selected" : ""}>Home</option><option value="Work"${ssrIncludeBooleanAttr(Array.isArray(unref(form).label) ? ssrLooseContain(unref(form).label, "Work") : ssrLooseEqual(unref(form).label, "Work")) ? " selected" : ""}>Work</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).label) ? ssrLooseContain(unref(form).label, "Other") : ssrLooseEqual(unref(form).label, "Other")) ? " selected" : ""}>Other</option></select><input${ssrRenderAttr("value", unref(form).addressLine1)} type="text" placeholder="Street Address *" required class="input-field text-sm"><input${ssrRenderAttr("value", unref(form).addressLine2)} type="text" placeholder="Apartment / Floor (optional)" class="input-field text-sm"><div class="grid grid-cols-2 gap-3"><input${ssrRenderAttr("value", unref(form).city)} type="text" placeholder="City *" required class="input-field text-sm"><input${ssrRenderAttr("value", unref(form).governorate)} type="text" placeholder="Governorate *" required class="input-field text-sm"></div><label class="flex items-center gap-2 text-sm cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isDefault) ? ssrLooseContain(unref(form).isDefault, null) : unref(form).isDefault) ? " checked" : ""} type="checkbox" class="accent-emerald-600"><span class="text-gray-600 dark:text-gray-400">Set as default address</span></label><div class="flex gap-2 pt-1"><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary flex-1 justify-center">`);
        if (unref(saving)) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "svg-spinners:ring-resize",
            class: "w-4 h-4"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(editingId) ? "Update" : "Save")}</button><button class="btn-ghost flex-1 justify-center">Cancel</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/addresses/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CT8g2Ue2.mjs.map
