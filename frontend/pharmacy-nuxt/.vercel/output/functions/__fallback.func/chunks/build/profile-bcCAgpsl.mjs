import { f as useHead, a as __nuxt_component_1, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, reactive, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    useHead({ title: "My Profile - PharmaCare" });
    const authStore = useAuthStore();
    useApi();
    const form = reactive({
      firstName: ((_a = authStore.user) == null ? void 0 : _a.firstName) || "",
      lastName: ((_b = authStore.user) == null ? void 0 : _b.lastName) || "",
      phoneNumber: ((_c = authStore.user) == null ? void 0 : _c.phoneNumber) || ""
    });
    const pwForm = reactive({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const saving = ref(false);
    const savingPw = ref(false);
    const pwMismatch = computed(() => pwForm.confirmPassword && pwForm.newPassword !== pwForm.confirmPassword);
    const accountLinks = [
      { href: "/account/profile", label: "Profile", icon: "heroicons:user" },
      { href: "/account/orders", label: "My Orders", icon: "heroicons:shopping-bag" },
      { href: "/account/addresses", label: "Addresses", icon: "heroicons:map-pin" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d, _e, _f, _g, _h;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container py-8 max-w-3xl" }, _attrs))}><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-7">My Profile</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="space-y-2"><!--[-->`);
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
              _push2(` ${ssrInterpolate(link.label)}`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: link.icon,
                  class: "w-4 h-4"
                }, null, 8, ["name"]),
                createTextVNode(" " + toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="md:col-span-2"><div class="card p-6"><div class="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100 dark:border-slate-700"><div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center"><span class="text-emerald-700 dark:text-emerald-300 font-bold text-2xl">${ssrInterpolate((_b2 = (_a2 = unref(authStore).user) == null ? void 0 : _a2.firstName) == null ? void 0 : _b2[0])}${ssrInterpolate((_d = (_c2 = unref(authStore).user) == null ? void 0 : _c2.lastName) == null ? void 0 : _d[0])}</span></div><div><p class="font-bold text-xl text-gray-900 dark:text-white">${ssrInterpolate(unref(authStore).fullName)}</p><p class="text-sm text-gray-500">${ssrInterpolate((_e = unref(authStore).user) == null ? void 0 : _e.email)}</p><span class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">${ssrInterpolate((_g = (_f = unref(authStore).user) == null ? void 0 : _f.roles) == null ? void 0 : _g[0])}</span></div></div><form class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label><input${ssrRenderAttr("value", unref(form).firstName)} type="text" required class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label><input${ssrRenderAttr("value", unref(form).lastName)} type="text" required class="input-field"></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label><input${ssrRenderAttr("value", (_h = unref(authStore).user) == null ? void 0 : _h.email)} type="email" disabled class="input-field opacity-60 cursor-not-allowed"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label><input${ssrRenderAttr("value", unref(form).phoneNumber)} type="tel" placeholder="+20 100 000 0000" class="input-field"></div><div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary">`);
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
      _push(` ${ssrInterpolate(unref(saving) ? "Saving\u2026" : "Save Changes")}</button></div></form></div><div class="card p-6 mt-5"><h3 class="font-bold text-gray-900 dark:text-white mb-4">Change Password</h3><form class="space-y-3"><input${ssrRenderAttr("value", unref(pwForm).currentPassword)} type="password" placeholder="Current Password" required class="input-field text-sm"><input${ssrRenderAttr("value", unref(pwForm).newPassword)} type="password" placeholder="New Password (min. 8 chars)" required minlength="8" class="input-field text-sm"><input${ssrRenderAttr("value", unref(pwForm).confirmPassword)} type="password" placeholder="Confirm New Password" required class="${ssrRenderClass([unref(pwMismatch) ? "border-red-400" : "", "input-field text-sm"])}">`);
      if (unref(pwMismatch)) {
        _push(`<p class="text-xs text-red-500">Passwords don&#39;t match</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(unref(savingPw) || unref(pwMismatch)) ? " disabled" : ""} class="btn-secondary text-sm"> Update Password </button></div></form></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-bcCAgpsl.mjs.map
