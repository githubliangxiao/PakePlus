const { defineComponent, defineAsyncComponent } = Vue;
const { useRoute, useRouter } = VueRouter;
const getComponent = (path) => {
    return defineAsyncComponent(() => loadModule(path, loaderOptions));
};
const routes = [
    {
        path: "/",
        name: "默认",
        redirect: "/login"
    },
    {
        path: "/login",
        name: "登录",
        component: getComponent("components/login/Login.vue", loaderOptions)
    },
    {
        path: "/test",
        name: "测试组件",
        component: getComponent("components/test/Parent.vue", loaderOptions)
    }
];

/* 实例化路由 */
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});
