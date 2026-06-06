import { f as useHead, h as useRouter, a as __nuxt_component_1, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, reactive, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderDynamicModel, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Create Account - PharmaCare" });
    const authStore = useAuthStore();
    useApi();
    useCart();
    const router = useRouter();
    if (authStore.isAuthenticated) router.push("/");
    const form = reactive({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", phoneNumber: "" });
    const errors = reactive({ firstName: "", email: "" });
    const serverError = ref("");
    const loading = ref(false);
    const showPass = ref(false);
    const agreedToTerms = ref(false);
    const passwordMismatch = computed(() => form.confirmPassword && form.password !== form.confirmPassword);
    const passwordStrength = computed(() => {
      const p = form.password;
      let s = 0;
      if (p.length >= 8) s++;
      if (/[A-Z]/.test(p)) s++;
      if (/[0-9]/.test(p)) s++;
      if (/[^A-Za-z0-9]/.test(p)) s++;
      return s;
    });
    const strengthColor = computed(() => ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-500"][passwordStrength.value - 1] || "bg-gray-200");
    const strengthLabel = computed(() => ["", "Weak", "Fair", "Good", "Strong"][passwordStrength.value] || "");
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
      _push(`<p class="text-gray-500 mt-2 text-sm">Create your account in seconds</p></div><div class="card p-7"><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Account</h1><form class="space-y-4"><div class="grid grid-cols-2 gap-3"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label><input${ssrRenderAttr("value", unref(form).firstName)} required type="text" placeholder="John" class="${ssrRenderClass([unref(errors).firstName ? "border-red-400" : "", "input-field"])}">`);
      if (unref(errors).firstName) {
        _push(`<p class="text-xs text-red-500 mt-1">${ssrInterpolate(unref(errors).firstName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label><input${ssrRenderAttr("value", unref(form).lastName)} required type="text" placeholder="Doe" class="input-field"></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:envelope",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(form).email)} required type="email" placeholder="your@email.com" class="${ssrRenderClass([unref(errors).email ? "border-red-400" : "", "input-field pl-10"])}"></div>`);
      if (unref(errors).email) {
        _push(`<p class="text-xs text-red-500 mt-1">${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number (Optional)</label><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:phone",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(form).phoneNumber)} type="tel" placeholder="+20 100 000 0000" class="input-field pl-10"></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:lock-closed",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderDynamicModel(unref(showPass) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPass) ? "text" : "password")} required minlength="8" placeholder="Min. 8 characters" class="input-field pl-10 pr-10"><button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(showPass) ? "heroicons:eye-slash" : "heroicons:eye",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div><div class="flex gap-1 mt-2"><!--[-->`);
      ssrRenderList(4, (i) => {
        _push(`<div class="${ssrRenderClass([unref(passwordStrength) >= i ? unref(strengthColor) : "bg-gray-200 dark:bg-slate-700", "flex-1 h-1 rounded-full transition-colors"])}"></div>`);
      });
      _push(`<!--]--></div><p class="text-xs text-gray-400 mt-1">${ssrInterpolate(unref(strengthLabel))}</p></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label><input${ssrRenderDynamicModel(unref(showPass) ? "text" : "password", unref(form).confirmPassword, null)}${ssrRenderAttr("type", unref(showPass) ? "text" : "password")} required placeholder="Repeat your password" class="${ssrRenderClass([unref(passwordMismatch) ? "border-red-400" : "", "input-field"])}">`);
      if (unref(passwordMismatch)) {
        _push(`<p class="text-xs text-red-500 mt-1">Passwords do not match</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><label class="flex items-start gap-2.5 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(unref(agreedToTerms)) ? ssrLooseContain(unref(agreedToTerms), null) : unref(agreedToTerms)) ? " checked" : ""} type="checkbox" required class="accent-emerald-600 mt-0.5"><span class="text-sm text-gray-600 dark:text-gray-400"> I agree to the `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "text-emerald-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of Service`);
          } else {
            return [
              createTextVNode("Terms of Service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` and `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "text-emerald-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></label>`);
      if (unref(serverError)) {
        _push(`<p class="text-sm text-red-600 bg-red-50 dark:bg-red-950 px-4 py-3 rounded-xl border border-red-200">${ssrInterpolate(unref(serverError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading) || unref(passwordMismatch) || !unref(agreedToTerms)) ? " disabled" : ""} class="btn-primary w-full justify-center py-3 mt-2">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:ring-resize",
          class: "w-5 h-5"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:user-plus",
          class: "w-5 h-5"
        }, null, _parent));
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Creating account\u2026" : "Create Account")}</button></form><p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-5"> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "text-emerald-600 font-semibold hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign In`);
          } else {
            return [
              createTextVNode("Sign In")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-CHbHr0Xe.mjs.map
