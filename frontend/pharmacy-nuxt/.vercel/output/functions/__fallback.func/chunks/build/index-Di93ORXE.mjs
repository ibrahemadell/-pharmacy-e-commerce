import { f as useHead, _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$1 } from './NuxtImg-BUTvnb3j.mjs';
import { defineComponent, ref, reactive, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderTeleport, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import './auth-uW8XXc_J.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Categories - Admin" });
    useApi();
    const categories = ref([]);
    const loading = ref(true);
    const showForm = ref(false);
    const saving = ref(false);
    const editingId = ref(null);
    const form = reactive({
      name: "",
      description: "",
      imageUrl: "",
      parentId: void 0,
      sortOrder: 0,
      isActive: true
    });
    const parentOptions = computed(() => categories.value.filter((c) => !c.parentId && c.id !== editingId.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtImg = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4 mb-7"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1><p class="text-sm text-gray-500 mt-0.5">${ssrInterpolate(unref(categories).length)} categories</p></div><button class="btn-primary">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` New Category </button></div>`);
      if (unref(loading)) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(8, (i) => {
          _push(`<div class="skeleton h-32 rounded-2xl"></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(unref(categories), (cat) => {
          var _a;
          _push(`<div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4 hover:shadow-md transition-shadow group"><div class="flex items-start justify-between mb-3"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">`);
          if (cat.imageUrl) {
            _push(ssrRenderComponent(_component_NuxtImg, {
              src: cat.imageUrl,
              alt: cat.name,
              class: "w-8 h-8 object-contain"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:tag",
              class: "w-6 h-6 text-emerald-600"
            }, null, _parent));
          }
          _push(`</div><div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:pencil",
            class: "w-3.5 h-3.5"
          }, null, _parent));
          _push(`</button><button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:trash",
            class: "w-3.5 h-3.5"
          }, null, _parent));
          _push(`</button></div></div><h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-0.5">${ssrInterpolate(cat.name)}</h3><p class="text-xs text-gray-400">${ssrInterpolate(cat.productCount)} products</p><div class="mt-2 flex items-center gap-2"><span class="${ssrRenderClass([cat.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500", "text-xs px-2 py-0.5 rounded-full font-semibold"])}">${ssrInterpolate(cat.isActive ? "Active" : "Hidden")}</span>`);
          if (cat.parentName) {
            _push(`<span class="text-xs text-gray-400 truncate">in ${ssrInterpolate(cat.parentName)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if ((_a = cat.children) == null ? void 0 : _a.length) {
            _push(`<div class="mt-2 flex flex-wrap gap-1"><!--[-->`);
            ssrRenderList(cat.children.slice(0, 3), (child) => {
              _push(`<span class="text-xs bg-gray-100 dark:bg-slate-700 text-gray-500 px-1.5 py-0.5 rounded-lg">${ssrInterpolate(child.name)}</span>`);
            });
            _push(`<!--]-->`);
            if (cat.children.length > 3) {
              _push(`<span class="text-xs text-gray-400">+${ssrInterpolate(cat.children.length - 3)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if (!unref(categories).length) {
          _push(`<div class="col-span-full text-center py-12 text-gray-400"> No categories yet. Create your first one! </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showForm)) {
          _push2(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"><div class="flex items-center justify-between mb-5"><h3 class="font-bold text-lg text-gray-900 dark:text-white">${ssrInterpolate(unref(editingId) ? "Edit Category" : "New Category")}</h3><button class="btn-ghost p-1.5">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "w-5 h-5"
          }, null, _parent));
          _push2(`</button></div><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label><input${ssrRenderAttr("value", unref(form).name)} required type="text" placeholder="Category name" class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label><textarea rows="2" placeholder="Optional description" class="input-field resize-none text-sm">${ssrInterpolate(unref(form).description)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image URL</label><input${ssrRenderAttr("value", unref(form).imageUrl)} type="url" placeholder="https://..." class="input-field"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Parent Category</label><select class="input-field"><option${ssrRenderAttr("value", void 0)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parentId) ? ssrLooseContain(unref(form).parentId, void 0) : ssrLooseEqual(unref(form).parentId, void 0)) ? " selected" : ""}>None (Top Level)</option><!--[-->`);
          ssrRenderList(unref(parentOptions), (c) => {
            _push2(`<option${ssrRenderAttr("value", c.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parentId) ? ssrLooseContain(unref(form).parentId, c.id) : ssrLooseEqual(unref(form).parentId, c.id)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
          });
          _push2(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Sort Order</label><input${ssrRenderAttr("value", unref(form).sortOrder)} type="number" min="0" class="input-field"></div><label class="flex items-center gap-2.5 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isActive) ? ssrLooseContain(unref(form).isActive, null) : unref(form).isActive) ? " checked" : ""} type="checkbox" class="accent-emerald-600 w-4 h-4"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Active (visible on store)</span></label><div class="flex gap-3 pt-2"><button type="button" class="btn-ghost flex-1 justify-center">Cancel</button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary flex-1 justify-center">`);
          if (unref(saving)) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "svg-spinners:ring-resize",
              class: "w-4 h-4"
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(` ${ssrInterpolate(unref(saving) ? "Saving\u2026" : unref(editingId) ? "Update" : "Create")}</button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Di93ORXE.mjs.map
