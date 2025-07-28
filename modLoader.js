const modLoader = {
    get storageMods() {
        return JSON.parse(localStorage.getItem("modLoaderMods"));
    },

    set storageMods(MLMods) {
        localStorage.setItem("modLoaderMods", JSON.stringify(MLMods));
    },

    firstLoad() {
        const mods = localStorage.getItem("modLoaderMods");
        if (mods !== null) return;

        console.log("No mods found in localStorage, loading defaults.");
        this.storageMods = MLMods;
    },

    updateMods() {
        const mods = this.storageMods;
        for (const [mod, values] of Object.entries(mods)) {
            if (mod in MLMods) {
                MLMods[mod] = values;
            }
        }
        this.storageMods = MLMods;
    },

    loadMods() {
        for (const [mod, values] of Object.entries(this.storageMods)) {
            if (values.enabled && document.getElementById(mod) === null) {
                _loadScript(mod, values.src);
            }
        }
    },

    confirmSettings() {
        for (const [name, mod] of Object.entries(MLMods)) {
            const checkbox = document.getElementById("modLoader:" + name);
            mod.enabled = readNiceCheckbox(checkbox);
        }
        this.storageMods = MLMods;
        this.loadMods();
    },

    updateLocalStorage() {
        this.firstLoad();
        this.updateMods();
    },
};

const modLoaderTooltip = {
    popupDisplayed: false,

    activateTooltip(elem) {
        tooltipText =
            "<div id='messageConfigMessage'>Here you can enabled mods. To unload a mod uncheck the mod then refresh your game. Mouse over the name of a mod for more info.</div>";
        tooltipText += "<div class='row'>";
        tooltipText += "<div class='col-xs-4'><span class='messageConfigTitle'></span>";
        for (const [id, mod] of Object.entries(modLoader.storageMods)) {
            tooltipText += "<span>";
            tooltipText += buildNiceCheckbox("modLoader:" + id, false, mod.enabled, false, "Enable: " + id);
            tooltipText += "</span>";
            tooltipText += "<span onmouseover='modLoaderTooltip.hover(\"" + id + '", "' + mod.desc + "\")'";
            tooltipText += "onmouseout='tooltip(\"hide\")' class='messageNameHolder'> - " + id;
            tooltipText += "</span><br/>";
        }
        tooltipText += "</div>";
        game.global.lockTooltip = true;
        elem.style.top = "25%";
        elem.style.left = "25%";
        swapClass("tooltipExtra", "tooltipExtraLg", elem);
        costText =
            "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='modLoaderTooltip.cancelTooltip();modLoader.confirmSettings();'>Confirm</div> <div class='btn btn-danger' onclick='modLoaderTooltip.cancelTooltip()'>Cancel</div></div>";

        document.getElementById("tipText").className = "";
        document.getElementById("tipTitle").innerHTML = "<b> Mod Loader </b>";
        document.getElementById("tipText").innerHTML = tooltipText;
        document.getElementById("tipCost").innerHTML = costText;
        elem.style.display = "block";
        verticalCenterTooltip();
    },

    cancelTooltip() {
        modLoaderTooltip.popupDisplayed = false;
        cancelTooltip();
    },

    hover(id, text) {
        document.getElementById("messageConfigMessage").innerHTML = "<b>" + id + "</b> - " + text;
    },

    popup(e) {
        const keyCheck = e.keyCode == 81 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey; // Q character
        if (keyCheck && e.target.tagName !== "INPUT") {
            if (modLoaderTooltip.popupDisplayed) {
                modLoaderTooltip.cancelTooltip();
            } else {
                if (document.getElementById("tooltipDiv").style.display === "block") return;
                const elem = document.getElementById("tooltipDiv");
                if (elem.style.display === "block") {
                    modLoaderTooltip.cancelTooltip();
                }
                modLoaderTooltip.activateTooltip(elem);
                modLoaderTooltip.popupDisplayed = true;
            }
        }
    },
};

function _loadScript(id, url) {
    const script = document.createElement("script");
    script.id = id;
    script.src = `${url}?${Math.floor(Date.now() / 60000) * 60000}`;
    script.type = "text/javascript";
    document.head.appendChild(script);
}

const MLMods = {
    MazIO: {
        enabled: false,
        src: "https://stellar-demesne.github.io/Trimps-QWUI/mazIO.js",
        desc: "Adds importing and exporting Map at Zone configs. By Quia.",
    },
    VoidsInfo: {
        enabled: false,
        src: "https://stellar-demesne.github.io/Trimps-VoidMapClarifier/VoidMapClarifier.js",
        desc: "Display void drop information. By Wombats.",
    },
    RunetrinketInfo: {
        enabled: false,
        src: "https://stellar-demesne.github.io/Trimps-RunetrinketCounter/RunetrinketCounter.js",
        desc: "Displays your runetrinkets on the main screen. By Wombats.",
    },
    SeedsInfo: {
        enabled: false,
        src: "https://stellar-demesne.github.io/Trimps-MutationCounter/MutationCounter.js",
        desc: "Displays information about mutated seeds for the current zone. By Wombats.",
    },
    Graphs: {
        enabled: false,
        src: "https://Quiaaaa.github.io/AutoTrimps/GraphsOnly.js",
        desc: "Provides graphs of your performance over time. By Quia.",
    },
    ZFarm: {
        enabled: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/farmCalc.js",
        desc: "Gives suggestions for the optimal map level for farming. By Grimmy and August.",
    },
    HeirloomHelp: {
        enabled: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/heirloomCalc.js",
        desc: "Gives suggestions for best heirloom upgrades. By Omsi6 and August.",
    },
    MutationPresets: {
        enabled: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/mutatorPreset.js",
        desc: "Enables presets for mutations. By August.",
    },
    PerkCalculators: {
        enabled: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/perky.js",
        desc: "Gives suggestions for good perk setups. Uses Perky for U1 & Surky for U2. By Grimmy, Surstromming and August.",
    },
    SpireTDImport: {
        enabled: false,
        src: "https://sadaugust.github.io/AutoTrimps/mods/spireTD.js",
        desc: "Allows for importing layouts from SpireTD tools, such as `swaqvalley.com/td_calc` and `spiredb.tdb.fi`. Started by Sliverz, many since.",
    },
    MinigamesTooltips: {
        enabled: false,
        src: "https://stellar-demesne.github.io/Trimps-MinigameSummaryTooltips/SMinigameTooltips.js",
        desc: "Displays information from minigames on the main screen. By Wombats."
    },
};

modLoader.updateLocalStorage();
modLoader.loadMods();

document.addEventListener("keydown", modLoaderTooltip.popup, true);
