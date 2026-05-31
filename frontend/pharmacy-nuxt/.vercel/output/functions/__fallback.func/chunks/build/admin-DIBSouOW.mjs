import { i as useRouter, c as _export_sfc, h as useRoute, _ as __nuxt_component_0$1, a as __nuxt_component_1, k as useState } from './server.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, unref, computed, withCtx, createTextVNode, toDisplayString, createVNode, Transition, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  props: {
    collapsed: { type: Boolean }
  },
  emits: ["toggle"],
  setup(__props) {
    const route = useRoute();
    const navSections = [
      {
        label: "Overview",
        items: [
          { href: "/admin", label: "Dashboard", icon: "heroicons:chart-bar-square" },
          { href: "/admin/analytics", label: "Analytics", icon: "heroicons:presentation-chart-line" }
        ]
      },
      {
        label: "Catalog",
        items: [
          { href: "/admin/products", label: "Products", icon: "heroicons:cube" },
          { href: "/admin/categories", label: "Categories", icon: "heroicons:tag" },
          { href: "/admin/inventory", label: "Inventory", icon: "heroicons:archive-box" }
        ]
      },
      {
        label: "Sales",
        items: [
          { href: "/admin/orders", label: "Orders", icon: "heroicons:shopping-bag" },
          { href: "/admin/customers", label: "Customers", icon: "heroicons:users" },
          { href: "/admin/coupons", label: "Coupons", icon: "heroicons:ticket" }
        ]
      },
      {
        label: "System",
        items: [
          { href: "/admin/settings", label: "Settings", icon: "heroicons:cog-6-tooth" }
        ]
      }
    ];
    const isActive = (href) => {
      if (href === "/admin") return route.path === "/admin";
      return route.path.startsWith(href);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: ["fixed left-0 top-0 h-full bg-slate-900 text-white z-30 flex flex-col transition-all duration-300 shadow-2xl", __props.collapsed ? "w-16" : "w-64"]
      }, _attrs))} data-v-6d3206a1><div class="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50 flex-shrink-0" data-v-6d3206a1><div class="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0" data-v-6d3206a1>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:pharmacy",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div>`);
      if (!__props.collapsed) {
        _push(`<div class="overflow-hidden" data-v-6d3206a1><p class="font-bold text-base leading-tight" data-v-6d3206a1>PharmaCare</p><p class="text-xs text-slate-400" data-v-6d3206a1>Admin Panel</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><nav class="flex-1 py-4 overflow-y-auto overflow-x-hidden" data-v-6d3206a1><!--[-->`);
      ssrRenderList(navSections, (section) => {
        _push(`<div class="mb-4" data-v-6d3206a1>`);
        if (!__props.collapsed) {
          _push(`<p class="px-4 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider" data-v-6d3206a1>${ssrInterpolate(section.label)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<ul class="space-y-0.5 px-2" data-v-6d3206a1><!--[-->`);
        ssrRenderList(section.items, (item) => {
          _push(`<li data-v-6d3206a1>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.href,
            class: ["flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative", isActive(item.href) ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30" : "text-slate-400 hover:text-white hover:bg-slate-800"]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: item.icon,
                  class: "w-5 h-5 flex-shrink-0"
                }, null, _parent2, _scopeId));
                _push2(``);
                if (!__props.collapsed) {
                  _push2(`<span class="text-sm font-medium" data-v-6d3206a1${_scopeId}>${ssrInterpolate(item.label)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.collapsed) {
                  _push2(`<div class="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity border border-slate-700" data-v-6d3206a1${_scopeId}>${ssrInterpolate(item.label)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (isActive(item.href) && __props.collapsed) {
                  _push2(`<div class="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full" data-v-6d3206a1${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: item.icon,
                    class: "w-5 h-5 flex-shrink-0"
                  }, null, 8, ["name"]),
                  createVNode(Transition, { name: "fade-slide" }, {
                    default: withCtx(() => [
                      !__props.collapsed ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-sm font-medium"
                      }, toDisplayString(item.label), 1)) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024),
                  __props.collapsed ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity border border-slate-700"
                  }, toDisplayString(item.label), 1)) : createCommentVNode("", true),
                  isActive(item.href) && __props.collapsed ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full"
                  })) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></nav><div class="p-3 border-t border-slate-700/50 space-y-1" data-v-6d3206a1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-top-right-on-square",
              class: "w-5 h-5 flex-shrink-0"
            }, null, _parent2, _scopeId));
            _push2(``);
            if (!__props.collapsed) {
              _push2(`<span class="text-sm font-medium" data-v-6d3206a1${_scopeId}>View Store</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:arrow-top-right-on-square",
                class: "w-5 h-5 flex-shrink-0"
              }),
              createVNode(Transition, { name: "fade-slide" }, {
                default: withCtx(() => [
                  !__props.collapsed ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-sm font-medium"
                  }, "View Store")) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all" data-v-6d3206a1>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: __props.collapsed ? "heroicons:chevron-double-right" : "heroicons:chevron-double-left",
        class: "w-5 h-5 flex-shrink-0"
      }, null, _parent));
      if (!__props.collapsed) {
        _push(`<span class="text-sm font-medium" data-v-6d3206a1>Collapse</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></aside>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6d3206a1"]]);
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminTopbar",
  __ssrInlineRender: true,
  emits: ["toggle-sidebar"],
  setup(__props) {
    const authStore = useAuthStore();
    const route = useRoute();
    const colorMode = useColorMode();
    const { locale } = useI18n();
    const isDark = computed(() => colorMode.value === "dark");
    const routeCrumbMap = {
      "/admin/products": [{ label: "Products", href: "/admin/products" }],
      "/admin/products/new": [{ label: "Products", href: "/admin/products" }, { label: "New Product", href: "" }],
      "/admin/categories": [{ label: "Categories", href: "/admin/categories" }],
      "/admin/orders": [{ label: "Orders", href: "/admin/orders" }],
      "/admin/customers": [{ label: "Customers", href: "/admin/customers" }],
      "/admin/coupons": [{ label: "Coupons", href: "/admin/coupons" }],
      "/admin/settings": [{ label: "Settings", href: "/admin/settings" }],
      "/admin/analytics": [{ label: "Analytics", href: "/admin/analytics" }],
      "/admin/inventory": [{ label: "Inventory", href: "/admin/inventory" }]
    };
    const crumbs = computed(() => {
      const path = route.path;
      if (path.match(/\/admin\/products\/\d+\/edit/)) {
        return [{ label: "Products", href: "/admin/products" }, { label: "Edit Product", href: "" }];
      }
      if (path.match(/\/admin\/orders\/\d+/)) {
        return [{ label: "Orders", href: "/admin/orders" }, { label: "Order Details", href: "" }];
      }
      return routeCrumbMap[path] || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_Icon = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "h-16 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-6 flex-shrink-0" }, _attrs))}><div class="flex items-center gap-3"><button class="btn-ghost p-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:bars-3",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button><nav class="hidden md:flex items-center gap-1.5 text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-gray-400 hover:text-emerald-600 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Admin`);
          } else {
            return [
              createTextVNode("Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(crumbs).length) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-4 h-4 text-gray-300"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(crumbs), (crumb, i) => {
        _push(`<!--[-->`);
        if (i < unref(crumbs).length - 1) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: crumb.href,
            class: "text-gray-400 hover:text-emerald-600 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(crumb.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(crumb.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="text-gray-800 dark:text-white font-semibold">${ssrInterpolate(crumb.label)}</span>`);
        }
        if (i < unref(crumbs).length - 1) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:chevron-right",
            class: "w-4 h-4 text-gray-300"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></nav></div><div class="flex items-center gap-3"><button class="btn-ghost p-2 flex items-center gap-1 text-sm font-semibold">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:language",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(locale) === "en" ? "\u0639\u0631\u0628\u064A" : "EN")}</span></button><button class="btn-ghost p-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(isDark) ? "heroicons:sun" : "heroicons:moon",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button><button class="btn-ghost p-2 relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:bell",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button><div class="flex items-center gap-2.5 pl-3 border-l border-gray-100 dark:border-slate-700"><div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center"><span class="text-emerald-700 dark:text-emerald-300 font-bold text-sm">${ssrInterpolate((_b = (_a = unref(authStore).user) == null ? void 0 : _a.firstName) == null ? void 0 : _b[0])}${ssrInterpolate((_d = (_c = unref(authStore).user) == null ? void 0 : _c.lastName) == null ? void 0 : _d[0])}</span></div><div class="hidden sm:block"><p class="text-sm font-semibold text-gray-800 dark:text-white leading-tight">${ssrInterpolate(unref(authStore).fullName)}</p><p class="text-xs text-gray-400">${ssrInterpolate((_f = (_e = unref(authStore).user) == null ? void 0 : _e.roles) == null ? void 0 : _f[0])}</p></div></div></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminTopbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    useRouter();
    const sidebarCollapsed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminSidebar = __nuxt_component_0;
      const _component_AdminTopbar = _sfc_main$1;
      const _component_ToastContainer = resolveComponent("ToastContainer");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-slate-950 flex" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AdminSidebar, {
        collapsed: unref(sidebarCollapsed),
        onToggle: ($event) => sidebarCollapsed.value = !unref(sidebarCollapsed)
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([unref(sidebarCollapsed) ? "ml-16" : "ml-64", "flex-1 flex flex-col min-w-0 transition-all duration-300"])}">`);
      _push(ssrRenderComponent(_component_AdminTopbar, {
        onToggleSidebar: ($event) => sidebarCollapsed.value = !unref(sidebarCollapsed)
      }, null, _parent));
      _push(`<main class="flex-1 p-6 overflow-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      _push(ssrRenderComponent(_component_ToastContainer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-DIBSouOW.mjs.map
