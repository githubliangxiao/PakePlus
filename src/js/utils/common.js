var loaderOptions = {
    moduleCache: {
        vue: Vue
    },
    getFile: function getFile(url) {
        return fetch(url).then(function (response) {
            return response.ok ? response.text() : Promise.reject(response);
        });
    },
    addStyle: function addStyle(styleStr) {
        var style = document.createElement('style');
        style.textContent = styleStr;
        var ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    }
};

try {
    var loadModule = window["vue3-sfc-loader"].loadModule;
} catch (e) {
    window.console.log("loader");
}