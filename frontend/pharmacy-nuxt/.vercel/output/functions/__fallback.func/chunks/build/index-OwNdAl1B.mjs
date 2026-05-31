import { f as useHead, _ as __nuxt_component_0, a as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$1 } from './NuxtImg-BUTvnb3j.mjs';
import { defineComponent, ref, computed, resolveComponent, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { u as useApi, c as useFormatters, d as useOrderStatus } from './index-CDfwTiwy.mjs';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:url';
import 'image-meta';
import '@fastify/accept-negotiator';
import 'etag';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Dashboard - PharmaCare Admin" });
    useApi();
    const authStore = useAuthStore();
    const fmt = useFormatters();
    const orderStatus = useOrderStatus();
    const loading = ref(true);
    const stats = ref({
      totalOrders: 0,
      pendingOrders: 0,
      todayOrders: 0,
      totalRevenue: 0,
      todayRevenue: 0,
      monthRevenue: 0,
      totalProducts: 0,
      lowStockProducts: 0,
      outOfStockProducts: 0,
      totalCustomers: 0,
      newCustomersThisMonth: 0,
      recentOrders: [],
      lowStockAlerts: [],
      monthlyRevenue: []
    });
    const revenueData = ref([]);
    const revenueMonths = ref(6);
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const hour = (/* @__PURE__ */ new Date()).getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const maxRevenue = computed(() => Math.max(...revenueData.value.map((r) => r.revenue), 1));
    const orderStatuses = computed(() => [
      { label: "Pending", count: stats.value.pendingOrders, color: "bg-yellow-400" },
      { label: "Delivered", count: stats.value.totalOrders - stats.value.pendingOrders, color: "bg-emerald-500" }
    ]);
    const formatMonth = (m) => {
      const [y, mo] = m.split("-");
      return new Date(Number(y), Number(mo) - 1).toLocaleDateString("en", { month: "short" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_Icon = __nuxt_component_0;
      const _component_StatCard = resolveComponent("StatCard");
      const _component_NuxtLink = __nuxt_component_1;
      const _component_NuxtImg = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-between mb-7"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1><p class="text-sm text-gray-500 mt-0.5">${ssrInterpolate(unref(greeting))}, ${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.firstName)}! \u{1F44B}</p></div><div class="flex items-center gap-2 text-sm text-gray-500 bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-gray-100 dark:border-slate-700">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:calendar",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(today))}</div></div><div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(8, (i) => {
          _push(`<div class="skeleton h-32 rounded-2xl"></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_StatCard, {
          icon: "heroicons:shopping-bag",
          label: "Total Orders",
          value: unref(stats).totalOrders,
          color: "bg-blue-500",
          sub: `${unref(stats).todayOrders} today`
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          icon: "heroicons:clock",
          label: "Pending Orders",
          value: unref(stats).pendingOrders,
          color: "bg-amber-500",
          sub: "Needs attention"
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          icon: "heroicons:banknotes",
          label: "Total Revenue",
          value: unref(fmt).formatCurrency(unref(stats).totalRevenue),
          color: "bg-emerald-600",
          sub: `${unref(fmt).formatCurrency(unref(stats).todayRevenue)} today`
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          icon: "heroicons:chart-bar",
          label: "Month Revenue",
          value: unref(fmt).formatCurrency(unref(stats).monthRevenue),
          color: "bg-purple-500"
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          icon: "heroicons:cube",
          label: "Total Products",
          value: unref(stats).totalProducts,
          color: "bg-teal-500"
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          icon: "heroicons:exclamation-triangle",
          label: "Low Stock",
          value: unref(stats).lowStockProducts,
          color: "bg-orange-500",
          sub: `${unref(stats).outOfStockProducts} out of stock`
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          icon: "heroicons:users",
          label: "Total Customers",
          value: unref(stats).totalCustomers,
          color: "bg-indigo-500",
          sub: `${unref(stats).newCustomersThisMonth} new this month`
        }, null, _parent));
        _push(ssrRenderComponent(_component_StatCard, {
          icon: "heroicons:arrow-trending-up",
          label: "Avg Order Value",
          value: unref(fmt).formatCurrency(unref(stats).totalOrders > 0 ? unref(stats).totalRevenue / unref(stats).totalOrders : 0),
          color: "bg-pink-500"
        }, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div><div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8"><div class="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700"><div class="flex items-center justify-between mb-5"><h2 class="font-bold text-gray-900 dark:text-white">Revenue Overview</h2><select class="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1 bg-transparent text-gray-600 dark:text-gray-400"><option${ssrRenderAttr("value", 6)}${ssrIncludeBooleanAttr(Array.isArray(unref(revenueMonths)) ? ssrLooseContain(unref(revenueMonths), 6) : ssrLooseEqual(unref(revenueMonths), 6)) ? " selected" : ""}>Last 6 months</option><option${ssrRenderAttr("value", 12)}${ssrIncludeBooleanAttr(Array.isArray(unref(revenueMonths)) ? ssrLooseContain(unref(revenueMonths), 12) : ssrLooseEqual(unref(revenueMonths), 12)) ? " selected" : ""}>Last 12 months</option></select></div><div class="flex items-end gap-1.5 h-40"><!--[-->`);
      ssrRenderList(unref(revenueData), (item) => {
        _push(`<div class="flex-1 flex flex-col items-center gap-1 group"><div class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">${ssrInterpolate(unref(fmt).formatCurrency(item.revenue))}</div><div class="w-full bg-emerald-500 hover:bg-emerald-600 rounded-t-lg transition-all cursor-pointer relative" style="${ssrRenderStyle(`height: ${unref(maxRevenue) > 0 ? item.revenue / unref(maxRevenue) * 140 + 4 : 4}px`)}"></div><span class="text-xs text-gray-400 truncate w-full text-center">${ssrInterpolate(formatMonth(item.month))}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700"><h2 class="font-bold text-gray-900 dark:text-white mb-5">Order Status</h2><div class="space-y-3"><!--[-->`);
      ssrRenderList(unref(orderStatuses), (s) => {
        _push(`<div class="flex items-center gap-3"><div class="flex-1"><div class="flex justify-between mb-1"><span class="text-xs font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(s.label)}</span><span class="text-xs font-bold text-gray-900 dark:text-white">${ssrInterpolate(s.count)}</span></div><div class="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden"><div class="${ssrRenderClass([s.color, "h-full rounded-full transition-all duration-500"])}" style="${ssrRenderStyle(`width: ${unref(stats).totalOrders > 0 ? s.count / unref(stats).totalOrders * 100 : 0}%`)}"></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="grid grid-cols-1 xl:grid-cols-2 gap-6"><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"><div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700"><h2 class="font-bold text-gray-900 dark:text-white">Recent Orders</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/orders",
        class: "text-sm text-emerald-600 hover:underline font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View All`);
          } else {
            return [
              createTextVNode("View All")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="divide-y divide-gray-50 dark:divide-slate-700/50"><!--[-->`);
      ssrRenderList(unref(stats).recentOrders, (order) => {
        _push(`<div class="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"><div class="w-9 h-9 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:shopping-bag",
          class: "w-4 h-4 text-gray-500"
        }, null, _parent));
        _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-semibold text-gray-900 dark:text-white">${ssrInterpolate(order.orderNumber)}</p><p class="text-xs text-gray-500 truncate">${ssrInterpolate(order.customerName)}</p></div><div class="text-right flex-shrink-0"><p class="text-sm font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(fmt).formatCurrency(order.total))}</p><span class="${ssrRenderClass([unref(orderStatus).getStatus(order.status).color, "text-xs px-2 py-0.5 rounded-full font-medium"])}">${ssrInterpolate(order.status)}</span></div></div>`);
      });
      _push(`<!--]-->`);
      if (!((_b = unref(stats).recentOrders) == null ? void 0 : _b.length)) {
        _push(`<div class="px-5 py-8 text-center text-sm text-gray-400"> No recent orders </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"><div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700"><h2 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:exclamation-triangle",
        class: "w-5 h-5 text-amber-500"
      }, null, _parent));
      _push(` Low Stock Alerts </h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/inventory",
        class: "text-sm text-emerald-600 hover:underline font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Manage`);
          } else {
            return [
              createTextVNode("Manage")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="divide-y divide-gray-50 dark:divide-slate-700/50"><!--[-->`);
      ssrRenderList(unref(stats).lowStockAlerts, (p) => {
        _push(`<div class="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: p.primaryImage || "/img/placeholder.png",
          alt: p.name,
          class: "w-10 h-10 rounded-lg object-contain bg-gray-50 flex-shrink-0"
        }, null, _parent));
        _push(`<div class="flex-1 min-w-0"><p class="text-sm font-semibold text-gray-900 dark:text-white truncate">${ssrInterpolate(p.name)}</p><div class="flex items-center gap-2 mt-0.5"><div class="flex-1 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden"><div class="${ssrRenderClass([p.stockQuantity === 0 ? "bg-red-500" : "bg-amber-500", "h-full rounded-full transition-all"])}" style="${ssrRenderStyle(`width: ${Math.min(100, p.stockQuantity / p.lowStockThreshold * 100)}%`)}"></div></div><span class="${ssrRenderClass([p.stockQuantity === 0 ? "text-red-600" : "text-amber-600", "text-xs font-semibold flex-shrink-0"])}">${ssrInterpolate(p.stockQuantity)} left </span></div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/products/${p.id}/edit`,
          class: "text-xs text-emerald-600 hover:underline font-medium flex-shrink-0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Restock`);
            } else {
              return [
                createTextVNode("Restock")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (!((_c = unref(stats).lowStockAlerts) == null ? void 0 : _c.length)) {
        _push(`<div class="px-5 py-8 text-center text-sm text-gray-400"> All products well-stocked \u2713 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-OwNdAl1B.mjs.map
