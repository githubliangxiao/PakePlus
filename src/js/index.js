
const { createApp, ref, reactive, onBeforeMount, onMounted } = Vue;
const app = createApp({
    setup() {
        const message = ref("啦啦啦");
        return {
            message
        };
    }
});
// 路由
app.use(router);
// 使用 element-plus
app.use(ElementPlus);
// 注册 element-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const vm = app.mount("#vueScoped");