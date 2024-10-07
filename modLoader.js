function _injectScript(id, src) {
    const script = document.createElement("script");
    script.async = false;
    script.id = id;
    script.src = src;
    script.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(script);
}

function _setMLMods(mods) {
    localStorage.setItem("modLoaderMods", JSON.stringify(mods));
}

function _getMLMods() {
    const mods = localStorage.getItem("modLoaderMods");
    if (mods === null) return false;
    return JSON.parse(mods);
}

function _MLHover(title, text) {
    document.getElementById("messageConfigMessage").innerHTML = "<b>" + title + "</b> - " + text;
}

function _MLConfirmSettings() {
    const mods = _getMLMods();
    for (const [name, mod] of Object.entries(mods)) {
        const checkbox = document.getElementById("modLoader:" + name);
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
    _setMLMods(mods);
}

function _cancelTooltip() {
    loaderPopup = false;
    cancelTooltip();
}

function _MLActivateTooltip(elem) {
    tooltipText =
        "<div id='messageConfigMessage'>Here you can enabled mods. To unload a mod uncheck the mod then refresh your game. Mouse over the name of a mod for more info.</div>";
    tooltipText += "<div class='row'>";
    tooltipText += "<div class='col-xs-4'><span class='messageConfigTitle'></span>";
    for (const [name, mod] of Object.entries(_getMLMods())) {
        tooltipText += "<span>";
        tooltipText += buildNiceCheckbox("modLoader:" + name, false, mod.enabled);
        tooltipText += "</span>";
        tooltipText += "<span onmouseover='_MLHover(\"" + name + '", "' + mod.desc + "\")'";
        tooltipText += "onmouseout='tooltip(\"hide\")' class='messageNameHolder'> - " + name;
        tooltipText += "</span><br/>";
    }
    tooltipText += "</div>";

    ondisplay = function () {
        verticalCenterTooltip();
    };
    game.global.lockTooltip = true;
    elem.style.top = "25%";
    elem.style.left = "25%";
    swapClass("tooltipExtra", "tooltipExtraLg", elem);
    costText =
        "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='_cancelTooltip();_MLConfirmSettings();'>Confirm</div> <div class='btn btn-danger' onclick='_cancelTooltip()'>Cancel</div></div>";

    document.getElementById("tipText").className = "";
    document.getElementById("tipTitle").innerHTML = "<b> Mod Loader </b>";
    document.getElementById("tipText").innerHTML = tooltipText;
    document.getElementById("tipCost").innerHTML = costText;
    elem.style.display = "block";
    ondisplay();
}

function _setEnabledMLMods() {
    const enabledMods = _getMLMods();
    for (const [name, mod] of Object.entries(enabledMods)) {
        if (mod.enabled) {
            _MLMods[name].enabled = true;
        }
    }
}

const _MLVersion = "8";
const _MLMods = {
    // Make sure game-overwriting files are always loaded first.
    TWSpeedup: {
        enabled: false,
        loaded: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/gameUpdates.js",
        desc: "Improves gamespeed during Time Warp. <b>Highly recommended for all users</b>. By August and NooNoo.",
    },
    VoidsInfo: {
        enabled: false,
        loaded: false,
        src: "https://stellar-demesne.github.io/Trimps-VoidMapClarifier/VoidMapClarifier.js",
        desc: "Display void drop information. By Wombats.",
    },
    RTDisplay: {
        enabled: false,
        loaded: false,
        src: "https://stellar-demesne.github.io/Trimps-RunetrinketCounter/RunetrinketCounter.js",
        desc: "Displays your runetrinkets on the main screen. By Wombats.",
    },
    Graphs: {
        enabled: false,
        loaded: false,
        src: "https://Quiaaaa.github.io/AutoTrimps/GraphsOnly.js",
        desc: "Provides graphs of your performance over time. By Quia.",
    },
    ZFarm: {
        enabled: false,
        loaded: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/farmCalc.js",
        desc: "Gives suggestions for the optimal map level for farming. By Grimmy and August.",
    },
    HeirloomHelp: {
        enabled: false,
        loaded: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/heirloomCalc.js",
        desc: "Gives suggestions for best heirloom upgrades. By Omsi6 and August.",
    },
    MutationPresets: {
        enabled: false,
        loaded: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/mutatorPreset.js",
        desc: "Enables presets for mutations. By August.",
    },
    PerkCalculators: {
        enabled: false,
        loaded: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/perky.js",
        desc: "Gives suggestions for good perk setups. Uses Perky for U1 & Surky for U2. By Grimmy, Surstromming and August.",
    },
    SpireTDImport: {
        enabled: false,
        loaded: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/spireTD.js",
        desc: "Allows for importing layouts from SpireTD tools, such as swaqvalley.com/td_calc and spiredb.tdb.fi. Started by Sliverz, many since.",
    },
};
if (!_getMLMods()) {
    _setMLMods(_MLMods);
    localStorage.setItem("modLoaderVersion", _MLVersion);
} else {
    if (localStorage.getItem("modLoaderVersion") !== _MLVersion) {
        localStorage.removeItem("modLoaderVersion", _MLVersion);
        _setEnabledMLMods();
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
    "keydown",
    function (e) {
        const keyCheck = e.keyCode == 81 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey;
        if (keyCheck && e.target.tagName !== "INPUT") {
            // Q character
            if (loaderPopup) {
                cancelTooltip();
                loaderPopup = false;
            } else {
                if (document.getElementById("tooltipDiv").style.display === "block") return;
                const elem = document.getElementById("tooltipDiv");
                if (elem.style.display === "block") {
                    cancelTooltip();
                }
                _MLActivateTooltip(elem);
                loaderPopup = true;
            }
        }
    },
    true
);
