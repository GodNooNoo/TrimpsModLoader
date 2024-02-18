# Trimps mod loader
Tool for loading external mods to trimps. Once installed press the q/Q key on your keyboard.

## Usage  
Press Q.  
If you uncheck a mod you will have to reload your game [Ctrl+R] for the script to get unloaded.

## Compability  
With other mods:  
**AutoTrimps**: Untested, there is no reason for this not to work, there is also no reason to use both as AT already loads all of the same mods.

Between mods in the loader: So far no issues, but up to the mods themselves.

## Installation guide

### Browser
Step 1:  
Install [Tampermonkey](https://www.tampermonkey.net/) or similar.

Step 2:  
Copy the code from [here](https://github.com/GodNooNoo/TrimpsModLoader/blob/main/tampermonkey.js) to a new user script in Tampermonkey.

### Steam

Step 1:

Go to to open the [mods.js](https://github.com/GodNooNoo/TrimpsModLoader/blob/main/mods.js) file.  
Then, right click the Raw button, hit Save link as, and save the mods.js file somewhere to your computer where you can find it, like desktop.  
![Download mods.js](https://i.imgur.com/opuO6yd.png)

Step 2:  
In your Steam Library (where you see all your games in the Steam app), right click on Trimps, go to Manage, then Browse local files.  
A folder where Trimps is installed inside Steam should open.  
![Go to Trimps directory](https://imgur.com/cr35LK2.png)

Inside this folder, navigate to the mods folder (you should be in Steam\steamapps\common\Trimps\mods), and place the mods.js file there, like so:  
![Insert mods.js](https://imgur.com/muW6cUh.png)

### Advanced users  
If you have other mods installed then just copy the text in AT's mods.js and place it somewhere in your existing mods.js file.
