function loadToolDependencies() {

    var dependency;
    var element = document.getElementsByTagName("body")[0]

    console.log('loading csf-gddtool-v4 CSS');
    dependency = document.createElement('link');
    dependency.setAttribute("rel","stylesheet");
    dependency.setAttribute("type","text/css");
    dependency.setAttribute("href", CSFTOOL_URL + "/style/csf-gddtool-v4.css?v=4.0.0");
    element.appendChild(dependency);

}
loadToolDependencies();
