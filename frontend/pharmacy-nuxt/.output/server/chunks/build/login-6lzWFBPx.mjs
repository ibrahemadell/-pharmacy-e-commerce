import { f as useHead, h as useRouter, g as useRoute, a as __nuxt_component_1, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, reactive, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
import { u as useApi, a as useCart } from './index-BKk0TMm7.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Sign In - PharmaCare" });
    const authStore = useAuthStore();
    useApi();
    useCart();
    const router = useRouter();
    useRoute();
    if (authStore.isAuthenticated) router.push("/");
    const form = reactive({ email: "", password: "" });
    const errors = reactive({ email: "", password: "" });
    const serverError = ref("");
    const loading = ref(false);
    const showPass = ref(false);
    const rememberMe = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4" }, _attrs))}><div class="w-full max-w-md"><div class="text-center mb-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center gap-2.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:pharmacy",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold text-2xl text-emerald-700 dark:text-emerald-400"${_scopeId}>Pharma<span class="text-gray-900 dark:text-white"${_scopeId}>Care</span></span>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center" }, [
                createVNode(_component_Icon, {
                  name: "mdi:pharmacy",
                  class: "w-6 h-6 text-white"
                })
              ]),
              createVNode("span", { class: "font-bold text-2xl text-emerald-700 dark:text-emerald-400" }, [
                createTextVNode("Pharma"),
                createVNode("span", { class: "text-gray-900 dark:text-white" }, "Care")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-gray-500 mt-2 text-sm">Welcome back! Sign in to continue</p></div><div class="card p-7"><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sign In</h1><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:envelope",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(form).email)} type="email" required placeholder="your@email.com" class="${ssrRenderClass([unref(errors).email ? "border-red-400 focus:ring-red-400" : "", "input-field pl-10"])}"></div>`);
      if (unref(errors).email) {
        _push(`<p class="text-xs text-red-500 mt-1">${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:lock-closed",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderDynamicModel(unref(showPass) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPass) ? "text" : "password")} required placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="input-field pl-10 pr-10"><button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(showPass) ? "heroicons:eye-slash" : "heroicons:eye",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div></div><div class="flex items-center justify-between"><label class="flex items-center gap-2 text-sm cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(unref(rememberMe)) ? ssrLooseContain(unref(rememberMe), null) : unref(rememberMe)) ? " checked" : ""} type="checkbox" class="accent-emerald-600"><span class="text-gray-600 dark:text-gray-400">Remember me</span></label>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/forgot-password",
        class: "text-sm text-emerald-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Forgot password?`);
          } else {
            return [
              createTextVNode("Forgot password?")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(serverError)) {
        _push(`<p class="text-sm text-red-600 bg-red-50 dark:bg-red-950 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800">${ssrInterpolate(unref(serverError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="btn-primary w-full justify-center py-3 mt-2">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:ring-resize",
          class: "w-5 h-5"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-right-on-rectangle",
          class: "w-5 h-5"
        }, null, _parent));
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Signing in\u2026" : "Sign In")}</button></form><div class="relative my-6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200 dark:border-slate-700"></div></div><div class="relative text-center"><span class="bg-white dark:bg-slate-800 px-3 text-xs text-gray-400">or</span></div></div><p class="text-center text-sm text-gray-600 dark:text-gray-400"> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-emerald-600 font-semibold hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create Account`);
          } else {
            return [
              createTextVNode("Create Account")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-6lzWFBPx.mjs.map
