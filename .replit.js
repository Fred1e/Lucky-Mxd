run = "npm start || yarn start || node ."
# stop =  "npm stop || yarn stop"
entrypoint = "set.js"
hidden = [".set"]




[unitTest]
language = "nodejs"

onBoot = "npm i || yarn"

[nix]
channel = "stable-23_05"

[deployment]
run = ["yarn","start"]
deploymentTarget = "cloudrun"
ignorePorts = false
 
