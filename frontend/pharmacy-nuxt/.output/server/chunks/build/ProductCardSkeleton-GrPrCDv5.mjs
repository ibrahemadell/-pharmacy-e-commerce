import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { c as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card overflow-hidden animate-pulse" }, _attrs))}><div class="skeleton h-44 rounded-none"></div><div class="p-3 space-y-3"><div class="skeleton h-3 w-20 rounded"></div><div class="space-y-1.5"><div class="skeleton h-4 w-full rounded"></div><div class="skeleton h-4 w-3/4 rounded"></div></div><div class="skeleton h-3 w-24 rounded"></div><div class="skeleton h-5 w-28 rounded"></div><div class="skeleton h-9 w-full rounded-xl"></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCardSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ProductCardSkeleton-GrPrCDv5.mjs.map
