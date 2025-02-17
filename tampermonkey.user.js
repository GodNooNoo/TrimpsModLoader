// ==UserScript==
// @name		ModLoader
// @version		1.0
// @namespace	https://GodNooNoo.github.io/TrimpsModLoader
// @description	Load all your mods!
// @author		NooNoo
// @match       *://trimps.github.io/*
// @match       *://kongregate.com/games/GreenSatellite/trimps/*
// @match       *://trimpstest58.netlify.app/*
// @connect     *://GodNooNoo.github.io/TrimpsModLoader/*
// @connect     *://trimps.github.io/*
// @connect		self
// @grant		GM_xmlhttpRequest
// ==/UserScript==

function loadScript(id, src) {
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(script);
}

loadScript("ModLoader", "https://godnoonoo.github.io/TrimpsModLoader/modLoader.js");
