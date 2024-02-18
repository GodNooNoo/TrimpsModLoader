// ==UserScript==
// @name		SpireLoader
// @version		1.0
// @namespace	https://GodNooNoo.github.io/TrimpsModLoader
// @description	Adds Import Spire Build
// @author		Sliverz
// @match		*trimps.github.io*
// @match		*kongregate.com/games/GreenSatellite/trimps
// @match		*trimpstest58.netlify.app/*
// @connect		*trimps.github.io*
// @connect		self
// @grant		GM_xmlhttpRequest
// ==/UserScript==

function injectScript(id, src) {
	const script = document.createElement('script');
	script.id = id;
	script.src = src;
	script.setAttribute('crossorigin', 'anonymous');
	document.head.appendChild(script);
}

injectScript('SpireLoader', 'https://sadaugust.github.io/AutoTrimps/mods/spireTD.js');
