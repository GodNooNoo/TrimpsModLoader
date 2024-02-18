function _injectScript(id, src) {
	const script = document.createElement('script');
	script.id = id;
	script.src = src;
	script.setAttribute('crossorigin', 'anonymous');
	document.head.appendChild(script);
}

function _setMLMods(mods) {
	localStorage.setItem('modLoaderMods', JSON.stringify(mods));
}

function _getMLMods() {
	const mods = localStorage.getItem('modLoaderMods')
	if (mods === null) return false;
	return JSON.parse(mods);
}

function _MLHover(title, text) {
	document.getElementById('messageConfigMessage').innerHTML = '<b>' + title + '</b> - ' + text;
}

function _MLConfirmSettings() {
	const mods = _getMLMods();
	for (const [name, mod] of Object.entries(mods)) {
		const checkbox = document.getElementById('modLoader:' + name);
		mod.enabled = readNiceCheckbox(checkbox);
	}
	_setMLMods(mods);
	_MLLoad();
}

function _MLLoad() {
	const mods = _getMLMods();
	for (const [name, mod] of Object.entries(mods)) {
		if (mod.enabled && !mod.loaded) {
			_injectScript(name, mod.src);
			mod.loaded = true;
		}
	}
}

function _MLActivateTooltip(elem) {
	tooltipText = "<div id='messageConfigMessage'>Here you can enabled mods. To unload a mod uncheck the mod then refresh your game. Mouse over the name of a mod for more info.</div>";
	tooltipText += "<div class='row'>";
	tooltipText += "<div class='col-xs-4'><span class='messageConfigTitle'></span>";
	for (const [name, mod] of Object.entries(_getMLMods())) {
		tooltipText += '<span>';
		tooltipText += buildNiceCheckbox('modLoader:' + name, false, mod.enabled);
		tooltipText += '</span>';
		tooltipText += '<span onmouseover=\'_MLHover("' + name + '", "' + mod.desc + '")\'';
		tooltipText += "onmouseout='tooltip(\"hide\")' class='messageNameHolder'> - " + name;
		tooltipText += '</span><br/>';
	}
	tooltipText += '</div>';

	ondisplay = function () {
		verticalCenterTooltip();
	};
	game.global.lockTooltip = true;
	elem.style.top = '25%';
	elem.style.left = '25%';
	swapClass('tooltipExtra', 'tooltipExtraLg', elem);
	costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip();_MLConfirmSettings();'>Confirm</div> <div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";

	document.getElementById('tipText').className = '';
	document.getElementById('tipTitle').innerHTML = '<b> Mod Loader </b>';
	document.getElementById('tipText').innerHTML = tooltipText;
	document.getElementById('tipCost').innerHTML = costText;
	elem.style.display = 'block';
	ondisplay();
}

const _MLVersion = 1;
const _MLMods = {
	Graphs: { enabled: false, loaded: false, src: 'https://Quiaaaa.github.io/AutoTrimps/GraphsOnly.js', desc: 'AProvides graphs of your performance over time. By Quia.' },
	ZFarm: { enabled: false, loaded: false, src: 'https://github.com/SadAugust/AutoTrimps/blob/main/mods/farmCalcStandalone.js', desc: 'Gives suggestions for the optimal map level for farming. By Grimmy and August.' },
	TWSpeedup: { enabled: false, loaded: false, src: 'https://github.com/SadAugust/AutoTrimps/blob/main/mods/gameUpdates.js', desc: 'Improves gamespeed during Time Warp. <b>Highly recommened for all users</b>. By August and NooNoo.' },
	HeirloomHelp: { enabled: false, loaded: false, src: 'https://github.com/SadAugust/AutoTrimps/blob/main/mods/heirloomCalc.js', desc: 'Gives suggestions for best heirloom upgrades. By Omsi6 and August.' },
	MutationPresets: { enabled: false, loaded: false, src: 'https://github.com/SadAugust/AutoTrimps/blob/main/mods/mutatorPreset.js', desc: 'Enables presets for mutations. By August.' },
	Perky: { enabled: false, loaded: false, src: 'https://github.com/SadAugust/AutoTrimps/blob/main/mods/perky.js', desc: 'Gives suggestions for good perk setups for Universe 1. By Grimmy and August.' },
	SpireTDImport: { enabled: false, loaded: false, src: 'https://github.com/SadAugust/AutoTrimps/blob/main/mods/spireTD.js', desc: 'Allows for importing layouts from SpireTD tools, such as swaqvalley.com/td_calc and spiredb.tdb.fi. Started by Sliverz, many since.' },
	Surky: { enabled: false, loaded: false, src: 'https://github.com/SadAugust/AutoTrimps/blob/main/mods/surky.js', desc: 'Gives suggestions for good perk setups for Universe 2. By Surstromming and August.' }
};
if (!_getMLMods()) {
	_setMLMods(_MLMods);
	localStorage.setItem("modLoaderVersion", _MLVersion);
} else {
	if (localStorage.getItem("modLoaderVerison") !== _MLVersion) {
		localStorage.removeItem("modLoaderVersion", _MLVersion);
		_setMLMods(_MLMods);
		localStorage.setItem("modLoaderVersion", _MLVersion);
	}
	const mods = _getMLMods();
	for (const mod of Object.values(mods)) {
		mod.loaded = false;
	}
	_setMLMods(mods);
}

_MLLoad();

var loaderPopup = false;

document.addEventListener(
	'keydown',
	function (e) {
		switch (e.keyCode) {
			case 81: // Q character
				if (loaderPopup) {
					cancelTooltip();
					loaderPopup = false;
				} else {
					const elem = document.getElementById('tooltipDiv');
					if (elem.style.display === 'block') {
						cancelTooltip();
					}
					_MLActivateTooltip(elem);
					loaderPopup = true;
				}
		}
	},
	true
);
