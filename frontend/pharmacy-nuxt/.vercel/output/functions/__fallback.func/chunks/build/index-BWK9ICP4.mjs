import { c as _export_sfc, h as useRoute, i as useRouter, f as useHead, _ as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_1 } from './ProductCardSkeleton-GrPrCDv5.mjs';
import { _ as _sfc_main$1 } from './ProductCard-DgZLsjHy.mjs';
import { defineComponent, ref, reactive, computed, watch, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate, ssrRenderComponent, ssrLooseContain, ssrRenderClass } from 'vue/server-renderer';
import { u as useApi } from './index-CDfwTiwy.mjs';
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
import './NuxtImg-BUTvnb3j.mjs';
import './useI18n-B8XBsOEE.mjs';
import './auth-uW8XXc_J.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const api = useApi();
    const route = useRoute();
    useRouter();
    useHead({ title: "Products - PharmaCare" });
    const products = ref([]);
    const pagedResult = ref(null);
    const categories = ref([]);
    const loading = ref(true);
    const viewMode = ref("grid");
    ref(false);
    const currentPage = ref(1);
    const filters = reactive({
      search: route.query.search || "",
      categoryId: route.query.categoryId ? Number(route.query.categoryId) : void 0,
      isFeatured: route.query.isFeatured === "true" ? true : void 0,
      isBestSeller: route.query.isBestSeller === "true" ? true : void 0,
      hasDiscount: route.query.hasDiscount === "true" ? true : void 0,
      inStock: void 0,
      sortBy: "createdAt",
      sortDir: "desc",
      pageSize: 12
    });
    const hasActiveFilters = computed(() => !!(filters.search || filters.categoryId || filters.inStock || filters.hasDiscount));
    const activeCategoryName = computed(() => {
      var _a;
      return ((_a = categories.value.find((c) => c.id === filters.categoryId)) == null ? void 0 : _a.name) || "";
    });
    const pageTitle = computed(() => {
      if (filters.search) return `Search: "${filters.search}"`;
      if (filters.categoryId) return activeCategoryName.value || "Products";
      if (filters.isFeatured) return "Featured Products";
      if (filters.isBestSeller) return "Best Sellers";
      if (filters.hasDiscount) return "Products on Sale";
      return "All Products";
    });
    const visiblePages = computed(() => {
      if (!pagedResult.value) return [];
      const total = pagedResult.value.totalPages;
      const cur = currentPage.value;
      const pages = [];
      for (let i = Math.max(1, cur - 2); i <= Math.min(total, cur + 2); i++) pages.push(i);
      return pages;
    });
    const fetchProducts = async () => {
      loading.value = true;
      let sortBy = filters.sortBy || "createdAt";
      let sortDir = "desc";
      if (sortBy === "price_asc") {
        sortBy = "price";
        sortDir = "asc";
      } else if (sortBy === "price_desc") {
        sortBy = "price";
        sortDir = "desc";
      }
      const res = await api.products.list({ ...filters, sortBy, sortDir, page: currentPage.value });
      loading.value = false;
      if (res.success && res.data) {
        products.value = res.data.items;
        pagedResult.value = res.data;
      }
    };
    watch(() => route.query, (q) => {
      if (q.search !== void 0) filters.search = q.search || "";
      if (q.categoryId !== void 0) filters.categoryId = q.categoryId ? Number(q.categoryId) : void 0;
      fetchProducts();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_FilterToggle = resolveComponent("FilterToggle");
      const _component_Icon = __nuxt_component_0;
      const _component_ProductCardSkeleton = __nuxt_component_1;
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container py-8" }, _attrs))} data-v-0f7bdb1e><div class="flex gap-6" data-v-0f7bdb1e><aside class="hidden lg:block w-64 flex-shrink-0" data-v-0f7bdb1e><div class="card p-5 sticky top-24 space-y-6" data-v-0f7bdb1e><div class="flex items-center justify-between" data-v-0f7bdb1e><h3 class="font-bold text-gray-900 dark:text-white" data-v-0f7bdb1e>Filters</h3><button class="text-xs text-emerald-600 hover:underline" data-v-0f7bdb1e>Clear all</button></div><div data-v-0f7bdb1e><h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3" data-v-0f7bdb1e>Category</h4><div class="space-y-2" data-v-0f7bdb1e><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<label class="flex items-center gap-2.5 cursor-pointer group" data-v-0f7bdb1e><input type="radio"${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(filters).categoryId, cat.id)) ? " checked" : ""} class="accent-emerald-600" data-v-0f7bdb1e><span class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 transition-colors" data-v-0f7bdb1e>${ssrInterpolate(cat.name)} <span class="text-xs text-gray-400" data-v-0f7bdb1e>(${ssrInterpolate(cat.productCount)})</span></span></label>`);
      });
      _push(`<!--]--></div></div><div data-v-0f7bdb1e><h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3" data-v-0f7bdb1e>Price Range</h4><div class="flex gap-2" data-v-0f7bdb1e><input${ssrRenderAttr("value", unref(filters).minPrice)} type="number" placeholder="Min" class="input-field text-xs py-2 px-2.5 w-full" data-v-0f7bdb1e><input${ssrRenderAttr("value", unref(filters).maxPrice)} type="number" placeholder="Max" class="input-field text-xs py-2 px-2.5 w-full" data-v-0f7bdb1e></div></div><div class="space-y-3" data-v-0f7bdb1e>`);
      _push(ssrRenderComponent(_component_FilterToggle, {
        modelValue: unref(filters).inStock,
        "onUpdate:modelValue": ($event) => unref(filters).inStock = $event,
        label: "In Stock Only"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FilterToggle, {
        modelValue: unref(filters).hasDiscount,
        "onUpdate:modelValue": ($event) => unref(filters).hasDiscount = $event,
        label: "On Sale"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FilterToggle, {
        modelValue: unref(filters).isFeatured,
        "onUpdate:modelValue": ($event) => unref(filters).isFeatured = $event,
        label: "Featured"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FilterToggle, {
        modelValue: unref(filters).isBestSeller,
        "onUpdate:modelValue": ($event) => unref(filters).isBestSeller = $event,
        label: "Best Sellers"
      }, null, _parent));
      _push(`</div><button class="btn-primary w-full justify-center" data-v-0f7bdb1e> Apply Filters </button></div></aside><div class="flex-1 min-w-0" data-v-0f7bdb1e><div class="flex flex-wrap items-center justify-between gap-3 mb-6" data-v-0f7bdb1e><div data-v-0f7bdb1e><h1 class="text-xl font-bold text-gray-900 dark:text-white" data-v-0f7bdb1e>${ssrInterpolate(unref(pageTitle))}</h1><p class="text-sm text-gray-500 mt-0.5" data-v-0f7bdb1e>${ssrInterpolate((_b = (_a = unref(pagedResult)) == null ? void 0 : _a.totalCount) != null ? _b : 0)} products found </p></div><div class="flex items-center gap-3" data-v-0f7bdb1e><button class="btn-secondary text-sm lg:hidden" data-v-0f7bdb1e>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:funnel",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Filters </button><select class="input-field text-sm py-2 pr-8 w-44" data-v-0f7bdb1e><option value="createdAt" data-v-0f7bdb1e${ssrIncludeBooleanAttr(Array.isArray(unref(filters).sortBy) ? ssrLooseContain(unref(filters).sortBy, "createdAt") : ssrLooseEqual(unref(filters).sortBy, "createdAt")) ? " selected" : ""}>Newest</option><option value="price_asc" data-v-0f7bdb1e${ssrIncludeBooleanAttr(Array.isArray(unref(filters).sortBy) ? ssrLooseContain(unref(filters).sortBy, "price_asc") : ssrLooseEqual(unref(filters).sortBy, "price_asc")) ? " selected" : ""}>Price: Low to High</option><option value="price_desc" data-v-0f7bdb1e${ssrIncludeBooleanAttr(Array.isArray(unref(filters).sortBy) ? ssrLooseContain(unref(filters).sortBy, "price_desc") : ssrLooseEqual(unref(filters).sortBy, "price_desc")) ? " selected" : ""}>Price: High to Low</option><option value="name" data-v-0f7bdb1e${ssrIncludeBooleanAttr(Array.isArray(unref(filters).sortBy) ? ssrLooseContain(unref(filters).sortBy, "name") : ssrLooseEqual(unref(filters).sortBy, "name")) ? " selected" : ""}>Name A-Z</option></select><div class="flex border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden" data-v-0f7bdb1e><button class="${ssrRenderClass([unref(viewMode) === "grid" ? "bg-emerald-600 text-white" : "bg-white dark:bg-slate-800 text-gray-500", "p-2 transition-colors"])}" data-v-0f7bdb1e>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:squares-2x2",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button><button class="${ssrRenderClass([unref(viewMode) === "list" ? "bg-emerald-600 text-white" : "bg-white dark:bg-slate-800 text-gray-500", "p-2 transition-colors"])}" data-v-0f7bdb1e>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:list-bullet",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></div></div>`);
      if (unref(hasActiveFilters)) {
        _push(`<div class="flex flex-wrap gap-2 mb-5" data-v-0f7bdb1e>`);
        if (unref(filters).search) {
          _push(`<span class="filter-chip" data-v-0f7bdb1e> &quot;${ssrInterpolate(unref(filters).search)}&quot; `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-3.5 h-3.5 ml-1 cursor-pointer"
          }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(filters).categoryId) {
          _push(`<span class="filter-chip" data-v-0f7bdb1e>${ssrInterpolate(unref(activeCategoryName))} `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-3.5 h-3.5 ml-1 cursor-pointer"
          }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(filters).inStock) {
          _push(`<span class="filter-chip" data-v-0f7bdb1e> In Stock `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-3.5 h-3.5 ml-1 cursor-pointer"
          }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(filters).hasDiscount) {
          _push(`<span class="filter-chip" data-v-0f7bdb1e> On Sale `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-3.5 h-3.5 ml-1 cursor-pointer"
          }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(unref(viewMode) === "grid" ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3")}" data-v-0f7bdb1e>`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(12, (i) => {
          _push(ssrRenderComponent(_component_ProductCardSkeleton, { key: i }, null, _parent));
        });
        _push(`<!--]-->`);
      } else if (unref(products).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(products), (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="col-span-full text-center py-20" data-v-0f7bdb1e>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:magnifying-glass",
          class: "w-16 h-16 text-gray-300 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-lg font-semibold text-gray-500" data-v-0f7bdb1e>No products found</p><p class="text-sm text-gray-400 mt-1" data-v-0f7bdb1e>Try adjusting your filters or search term</p><button class="btn-primary mt-4" data-v-0f7bdb1e>Clear Filters</button></div>`);
      }
      _push(`</div>`);
      if (unref(pagedResult) && unref(pagedResult).totalPages > 1) {
        _push(`<div class="flex items-center justify-center gap-2 mt-10" data-v-0f7bdb1e><button${ssrIncludeBooleanAttr(!unref(pagedResult).hasPrevPage) ? " disabled" : ""} class="btn-ghost p-2 disabled:opacity-40" data-v-0f7bdb1e>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-left",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><!--[-->`);
        ssrRenderList(unref(visiblePages), (page) => {
          _push(`<button class="${ssrRenderClass([page === unref(currentPage) ? "bg-emerald-600 text-white" : "btn-ghost", "w-9 h-9 rounded-xl text-sm font-medium flex items-center justify-center transition-colors"])}" data-v-0f7bdb1e>${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(!unref(pagedResult).hasNextPage) ? " disabled" : ""} class="btn-ghost p-2 disabled:opacity-40" data-v-0f7bdb1e>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f7bdb1e"]]);

export { index as default };
//# sourceMappingURL=index-BWK9ICP4.mjs.map
