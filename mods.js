function injectScript(id, src) {
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(script);
}

injectScript("ModLoader", "https://godnoonoo.github.io/TrimpsModLoader/modLoader.js");
