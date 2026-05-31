import { f as useHead, _ as __nuxt_component_0, a as __nuxt_component_1, j as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_1$1 } from './ProductCardSkeleton-GrPrCDv5.mjs';
import { _ as _sfc_main$1 } from './ProductCard-DgZLsjHy.mjs';
import { defineComponent, computed, ref, withAsyncContext, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useI18n } from './useI18n-B8XBsOEE.mjs';
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
import './NuxtImg-BUTvnb3j.mjs';
import './auth-uW8XXc_J.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, isAr } = useI18n();
    useHead({ title: computed(() => isAr.value ? "\u0635\u064A\u062F\u0644\u064A\u0629 \u0641\u0627\u0631\u0645\u0627\u0643\u064A\u0631 - \u0635\u064A\u062F\u0644\u064A\u062A\u0643 \u0627\u0644\u0645\u0648\u062B\u0648\u0642\u0629" : "PharmaCare - Your Trusted Online Pharmacy") });
    const api = useApi();
    const fmt = useFormatters();
    const config = useRuntimeConfig();
    const waLink = computed(() => fmt.whatsappLink(config.public.whatsappNumber, isAr.value ? "\u0645\u0631\u062D\u0628\u0627\u064B! \u0623\u0648\u062F \u0637\u0644\u0628 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629." : "Hi! I need pharmacy assistance."));
    const featured = ref([]);
    const bestSellers = ref([]);
    const offers = ref([]);
    const categories = ref([]);
    const loadingFeatured = ref(true);
    const loadingBest = ref(true);
    const loadingOffers = ref(true);
    const badges = computed(() => [
      { icon: "heroicons:shield-check", label: t("home.licensed_pharmacy") },
      { icon: "heroicons:truck", label: t("home.fast_delivery") },
      { icon: "heroicons:lock-closed", label: t("home.secure_payment") }
    ]);
    const features = computed(() => [
      { icon: "heroicons:truck", title: t("home.fast_delivery_title"), desc: t("home.fast_delivery_desc") },
      { icon: "heroicons:shield-check", title: t("home.authentic_products_title"), desc: t("home.authentic_products_desc") },
      { icon: "heroicons:chat-bubble-left-right", title: t("home.support_title"), desc: t("home.support_desc") },
      { icon: "heroicons:arrow-uturn-left", title: t("home.returns_title"), desc: t("home.returns_desc") }
    ]);
    const secondsLeft = ref(8 * 3600 + 45 * 60 + 22);
    const countdown = computed(() => [
      { label: isAr.value ? "\u0633\u0627\u0639\u0629" : "Hrs", value: String(Math.floor(secondsLeft.value / 3600)).padStart(2, "0") },
      { label: isAr.value ? "\u062F\u0642\u064A\u0642\u0629" : "Min", value: String(Math.floor(secondsLeft.value % 3600 / 60)).padStart(2, "0") },
      { label: isAr.value ? "\u062B\u0627\u0646\u064A\u0629" : "Sec", value: String(secondsLeft.value % 60).padStart(2, "0") }
    ]);
    const [catsRes, featRes, bestRes, offerRes] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      api.categories.list(),
      api.products.featured(),
      api.products.bestSellers(),
      api.products.offers()
    ])), __temp = await __temp, __restore(), __temp);
    if (catsRes.success) categories.value = catsRes.data || [];
    if (featRes.success) featured.value = featRes.data || [];
    if (bestRes.success) bestSellers.value = bestRes.data || [];
    if (offerRes.success) offers.value = offerRes.data || [];
    loadingFeatured.value = false;
    loadingBest.value = false;
    loadingOffers.value = false;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_ProductCardSkeleton = __nuxt_component_1$1;
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800"><div class="absolute inset-0 overflow-hidden pointer-events-none"><div class="absolute -top-20 -end-20 w-96 h-96 bg-white/5 rounded-full"></div><div class="absolute -bottom-32 -start-16 w-80 h-80 bg-white/5 rounded-full"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full"></div></div><div class="page-container relative"><div class="flex flex-col md:flex-row items-center gap-8 py-16 md:py-20"><div class="flex-1 text-white text-center md:text-start"><div class="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:sparkles",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(t)("home.hero_badge"))}</div><h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5" style="${ssrRenderStyle({ "font-family": "var(--font-display)" })}">${ssrInterpolate(unref(t)("home.hero_title_1"))}<br><span class="text-emerald-200">${ssrInterpolate(unref(t)("home.hero_title_2"))}</span></h1><p class="text-emerald-100 text-lg max-w-xl mb-8 leading-relaxed">${ssrInterpolate(unref(t)("home.hero_subtitle"))}</p><div class="flex flex-wrap gap-3 justify-center md:justify-start">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg inline-flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-bag",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(t)("home.shop_now"))}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:shopping-bag",
                class: "w-5 h-5"
              }),
              createTextVNode(" " + toDisplayString(unref(t)("home.shop_now")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a${ssrRenderAttr("href", unref(waLink))} target="_blank" class="bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg inline-flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-5 h-5"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(t)("home.order_whatsapp"))}</a></div><div class="flex flex-wrap gap-5 mt-8 justify-center md:justify-start"><!--[-->`);
      ssrRenderList(unref(badges), (b) => {
        _push(`<div class="flex items-center gap-2 text-sm text-emerald-100">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: b.icon,
          class: "w-5 h-5 text-emerald-300"
        }, null, _parent));
        _push(` ${ssrInterpolate(b.label)}</div>`);
      });
      _push(`<!--]--></div></div><div class="flex-shrink-0 hidden md:flex w-72 h-72 bg-white/10 rounded-3xl items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:pharmacy",
        class: "w-40 h-40 text-white/40"
      }, null, _parent));
      _push(`</div></div></div></section><section class="py-10 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800"><div class="page-container"><div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide"><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: cat.id,
          to: `/products?categoryId=${cat.id}`,
          class: "flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-200 border border-transparent transition-all group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:pill",
                class: "w-6 h-6 text-emerald-600 group-hover:text-white transition-colors"
              }, null, _parent2, _scopeId));
              _push2(`</div><span class="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap"${_scopeId}>${ssrInterpolate(unref(isAr) ? cat.nameAr || cat.name : cat.name)}</span>`);
            } else {
              return [
                createVNode("div", { class: "w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors" }, [
                  createVNode(_component_Icon, {
                    name: "mdi:pill",
                    class: "w-6 h-6 text-emerald-600 group-hover:text-white transition-colors"
                  })
                ]),
                createVNode("span", { class: "text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap" }, toDisplayString(unref(isAr) ? cat.nameAr || cat.name : cat.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section><section class="py-14"><div class="page-container"><div class="flex items-center justify-between mb-8"><div><p class="text-sm font-semibold text-emerald-600 mb-1">${ssrInterpolate(unref(t)("home.handpicked"))}</p><h2 class="section-title">${ssrInterpolate(unref(t)("home.featured_products"))}</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products?isFeatured=true",
        class: "btn-secondary text-sm hidden sm:flex"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("home.view_all"))} `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-right",
              class: ["w-4 h-4", unref(isAr) ? "rotate-180" : ""]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("home.view_all")) + " ", 1),
              createVNode(_component_Icon, {
                name: "heroicons:arrow-right",
                class: ["w-4 h-4", unref(isAr) ? "rotate-180" : ""]
              }, null, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">`);
      if (unref(loadingFeatured)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(ssrRenderComponent(_component_ProductCardSkeleton, { key: i }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(featured), (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div></section><section class="py-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950"><div class="page-container"><div class="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100 dark:border-orange-900"><div><span class="text-orange-500 font-bold text-sm uppercase tracking-wider">${ssrInterpolate(unref(t)("home.limited_offers"))}</span><h3 class="text-2xl md:text-3xl font-bold mt-1 text-gray-900 dark:text-white">${ssrInterpolate(unref(t)("home.up_to"))} <span class="text-red-500">50% ${ssrInterpolate(unref(t)("home.off"))}</span></h3><p class="text-gray-500 mt-1 text-sm">${ssrInterpolate(unref(t)("home.selected_wellness"))}</p></div><div class="flex items-center gap-4 flex-shrink-0"><!--[-->`);
      ssrRenderList(unref(countdown), (c) => {
        _push(`<div class="text-center"><div class="bg-gray-900 dark:bg-slate-700 text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center">${ssrInterpolate(c.value)}</div><span class="text-xs text-gray-500 mt-1 block">${ssrInterpolate(c.label)}</span></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products?hasDiscount=true",
        class: "btn-primary whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("home.shop_offers"))} `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-right",
              class: ["w-4 h-4", unref(isAr) ? "rotate-180" : ""]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("home.shop_offers")) + " ", 1),
              createVNode(_component_Icon, {
                name: "heroicons:arrow-right",
                class: ["w-4 h-4", unref(isAr) ? "rotate-180" : ""]
              }, null, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-14"><div class="page-container"><div class="flex items-center justify-between mb-8"><div><p class="text-sm font-semibold text-red-500 mb-1">${ssrInterpolate(unref(t)("home.dont_miss"))}</p><h2 class="section-title">${ssrInterpolate(unref(t)("home.todays_offers"))}</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products?hasDiscount=true",
        class: "btn-secondary text-sm hidden sm:flex"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("home.all_offers"))} `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-right",
              class: ["w-4 h-4", unref(isAr) ? "rotate-180" : ""]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("home.all_offers")) + " ", 1),
              createVNode(_component_Icon, {
                name: "heroicons:arrow-right",
                class: ["w-4 h-4", unref(isAr) ? "rotate-180" : ""]
              }, null, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">`);
      if (unref(loadingOffers)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(ssrRenderComponent(_component_ProductCardSkeleton, { key: i }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(offers), (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div></section><section class="py-14 bg-gray-50 dark:bg-slate-800/30"><div class="page-container"><div class="flex items-center justify-between mb-8"><div><p class="text-sm font-semibold text-amber-600 mb-1">${ssrInterpolate(unref(t)("home.most_popular"))}</p><h2 class="section-title">${ssrInterpolate(unref(t)("home.best_sellers"))}</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products?isBestSeller=true",
        class: "btn-secondary text-sm hidden sm:flex"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("home.view_all"))} `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-right",
              class: ["w-4 h-4", unref(isAr) ? "rotate-180" : ""]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("home.view_all")) + " ", 1),
              createVNode(_component_Icon, {
                name: "heroicons:arrow-right",
                class: ["w-4 h-4", unref(isAr) ? "rotate-180" : ""]
              }, null, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">`);
      if (unref(loadingBest)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(ssrRenderComponent(_component_ProductCardSkeleton, { key: i }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(bestSellers), (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div></section><section class="py-16"><div class="page-container"><div class="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"><div class="absolute inset-0 pointer-events-none"><div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div><div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div></div><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-16 h-16 mx-auto mb-4 text-green-200"
      }, null, _parent));
      _push(`<h2 class="text-3xl md:text-4xl font-bold mb-3">${ssrInterpolate(unref(t)("home.need_prescription"))}</h2><p class="text-green-100 text-lg max-w-xl mx-auto mb-8">${ssrInterpolate(unref(t)("home.prescription_desc"))}</p><a${ssrRenderAttr("href", unref(waLink))} target="_blank" class="inline-flex items-center gap-2.5 bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg text-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-6 h-6"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(t)("home.chat_pharmacist"))}</a></div></div></div></section><section class="py-14 border-t border-gray-100 dark:border-slate-800"><div class="page-container"><div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(unref(features), (f) => {
        _push(`<div class="text-center"><div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: f.icon,
          class: "w-7 h-7 text-emerald-600"
        }, null, _parent));
        _push(`</div><h4 class="font-bold text-gray-900 dark:text-white text-sm mb-1">${ssrInterpolate(f.title)}</h4><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(f.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DIWPSXoc.mjs.map
