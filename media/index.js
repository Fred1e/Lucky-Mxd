'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0xb1d3bd, _0x47abc8, _0x80a65, _0x3b316a) {
  if (_0x3b316a === undefined) {
    _0x3b316a = _0x80a65;
  }
  var _0x1c1b10 = Object.getOwnPropertyDescriptor(_0x47abc8, _0x80a65);
  if (!_0x1c1b10 || ("get" in _0x1c1b10 ? !_0x47abc8.__esModule : _0x1c1b10.writable || _0x1c1b10.configurable)) {
    _0x1c1b10 = {
      'enumerable': true,
      'get': function () {
        return _0x47abc8[_0x80a65];
      }
    };
  }
  Object.defineProperty(_0xb1d3bd, _0x3b316a, _0x1c1b10);
} : function (_0x33d98d, _0x2c2375, _0x1de770, _0x4e3291) {
  if (_0x4e3291 === undefined) {
    _0x4e3291 = _0x1de770;
  }
  _0x33d98d[_0x4e3291] = _0x2c2375[_0x1de770];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x4f0f16, _0x2c1301) {
  Object.defineProperty(_0x4f0f16, "default", {
    'enumerable': true,
    'value': _0x2c1301
  });
} : function (_0x56f5c9, _0xcc7a4c) {
  _0x56f5c9["default"] = _0xcc7a4c;
});
var __importStar = this && this.__importStar || function (_0x3caccf) {
  if (_0x3caccf && _0x3caccf.__esModule) {
    return _0x3caccf;
  }
  var _0x95d4fc = {};
  if (_0x3caccf != null) {
    for (var _0x2cd60c in _0x3caccf) if (_0x2cd60c !== "default" && Object.prototype.hasOwnProperty.call(_0x3caccf, _0x2cd60c)) {
      __createBinding(_0x95d4fc, _0x3caccf, _0x2cd60c);
    }
  }
  __setModuleDefault(_0x95d4fc, _0x3caccf);
  return _0x95d4fc;
};
var __importDefault = this && this.__importDefault || function (_0x459432) {
  return _0x459432 && _0x459432.__esModule ? _0x459432 : {
    'default': _0x459432
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require('@whiskeysockets/baileys/lib/Utils/logger'));
const logger = logger_1["default"].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./config");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
let evt = require(__dirname + "/framework/zokou");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const delay = _0x4e838c => new Promise(_0x20dac6 => setTimeout(_0x20dac6, _0x4e838c));
async function rateLimitedSendMessage(_0x3b9b8d, _0x4fe92b, _0x5e74e0) {
  try {
    await delay(0x7d0);
    await _0x3b9b8d.sendMessage(_0x4fe92b, _0x5e74e0);
  } catch (_0xc0c72c) {
    console.error("Error sending message:", _0xc0c72c.message);
    if (_0xc0c72c.output?.['statusCode'] === 0x1ad) {
      console.log("Rate limit hit, waiting 10 seconds...");
      await delay(0x2710);
    }
  }
}
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
const prefixe = conf.PREFIXE;
require("dotenv").config({
  'path': "./set.js"
});
const herokuAppName = process.env.HEROKU_APP_NAME || "Unknown App Name";
const herokuAppLink = process.env.HEROKU_APP_LINK || "https://dashboard.heroku.com/apps/" + herokuAppName;
const botOwner = process.env.NUMERO_OWNER || "Unknown Owner";
function atbverifierEtatJid(_0x3be825) {
  if (!_0x3be825.endsWith('@s.whatsapp.net')) {
    console.error("Invalid JID format:", _0x3be825);
    return false;
  }
  console.log("JID verified:", _0x3be825);
  return true;
}
const zlib = require("zlib");
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + '/Session/creds.json')) {
      console.log("Session connected...");
      const [_0xcc255c, _0x2b66d4] = conf.session.split(";;;");
      if (_0xcc255c === "BWM-XMD" && _0x2b66d4) {
        let _0x3998a6 = Buffer.from(_0x2b66d4.replace('...', ''), "base64");
        let _0x345cee = zlib.gunzipSync(_0x3998a6);
        fs.writeFileSync(__dirname + '/Session/creds.json', _0x345cee, "utf8");
      } else {
        throw new Error("Invalid session format");
      }
    } else {
      if (fs.existsSync(__dirname + "/Session/creds.json") && conf.session !== "zokk") {
        console.log("Updating existing session...");
        const [_0x52953e, _0x40b049] = conf.session.split(";;;");
        if (_0x52953e === "BWM-XMD" && _0x40b049) {
          let _0x35f878 = Buffer.from(_0x40b049.replace("...", ''), "base64");
          let _0xac8bab = zlib.gunzipSync(_0x35f878);
          fs.writeFileSync(__dirname + "/Session/creds.json", _0xac8bab, "utf8");
        } else {
          throw new Error("Invalid session format");
        }
      }
    }
  } catch (_0x425178) {
    console.log("Session Invalid: " + _0x425178.message);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': 'store'
  })
});
setTimeout(() => {
  async function _0x236bae() {
    0x0;
    const {
      version: _0x1e706b,
      isLatest: _0x3ec67f
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x549d96,
      saveCreds: _0x47c12b
    } = await baileys_1.useMultiFileAuthState(__dirname + '/Session');
    0x0;
    const _0x41664e = {
      'version': _0x1e706b,
      'logger': pino({
        'level': 'silent'
      }),
      'browser': ["Bmw-Md", "safari", '1.0.0'],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x549d96.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x549d96.keys, logger)
      },
      'getMessage': async _0x943cb => {
        if (store) {
          const _0x238de0 = await store.loadMessage(_0x943cb.remoteJid, _0x943cb.id, undefined);
          return _0x238de0.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x127877 = baileys_1["default"](_0x41664e);
    store.bind(_0x127877.ev);
    setInterval(() => {
      store.writeToFile("store.json");
    }, 0xbb8);
    function _0x29dd29() {
      const _0xac2a69 = {
        'timeZone': 'Africa/Nairobi',
        'year': "numeric",
        'month': "long",
        'day': "2-digit",
        'hour': "2-digit",
        'minute': '2-digit',
        'second': "2-digit",
        'hour12': false
      };
      return new Intl.DateTimeFormat("en-KE", _0xac2a69).format(new Date());
    }
    const _0xc44ff2 = ["Dream big, code smart, live limitless. ðŸš€", "Innovation is just a bug fix away. ðŸ’»âœ¨", "Stay sharp, stay focused, stay coding. ðŸ”¥", "Think less, code more. Results will follow. ðŸ› ï¸", "Every bug is just an opportunity in disguise. ðŸ›âž¡ï¸ðŸŽ¯", "Donâ€™t stop when youâ€™re tired; stop when itâ€™s done. ðŸ", "Keep calm and deploy the bot. ðŸ¤–ðŸŒ", "Hustle in silence, let your code speak. ðŸ‘¨â€ðŸ’»ðŸ‘©â€ðŸ’»", "Hakuna stress, tuko hapa kwa ground ðŸšœðŸ‡°ðŸ‡ª", "Bora uhai, na bot imewaka! ðŸ”¥", "Sina form but Bwm xmd iko online! ðŸ’ƒ", "Weuh! Vitu kwa ground ni different lakini bot iko shwari! ðŸŒŸ", "Acha tu! Hii bot ni kama chai ya mama mboga, shwari kabisa! â˜•âœ¨", "Life is short, sip your chai and vibe with Bwm xmd! â˜•ðŸ’¬"];
    function _0xeedc88(_0x35d98f = "User") {
      const _0x222612 = _0x29dd29();
      const _0x426a75 = _0xc44ff2[Math.floor(Math.random() * _0xc44ff2.length)];
      return "ðŸ‘‹HEY,  " + _0x35d98f + " BWM XMD IS ONLINE ðŸš€,\nðŸ“… " + _0x222612 + "\nðŸ’¬ \"" + _0x426a75 + "\"";
    }
    setInterval(async () => {
      if (conf.AUTO_BIO === "yes") {
        const _0x12d75b = _0xeedc88('ðŸš€');
        await _0x127877.updateProfileStatus(_0x12d75b);
        console.log("Updated Bio: " + _0x12d75b);
      }
    }, 0xea60);
    _0x127877.ev.on("call", async _0x30d46c => {
      if (conf.ANTICALL === 'yes') {
        const _0x30c32c = _0x30d46c[0x0].id;
        const _0x1b5db5 = _0x30d46c[0x0].from;
        await _0x127877.rejectCall(_0x30c32c, _0x1b5db5);
        setTimeout(async () => {
          await _0x127877.sendMessage(_0x1b5db5, {
            'text': "ðŸš« *Call Rejected!*  \nHi there, Iâ€™m *BWM XMD* ðŸ¤–.  \nâš ï¸ My owner is unavailable at the moment.  \nPlease try again later or leave a message. Cheers! ðŸ˜Š"
          });
        }, 0x3e8);
      }
    });
    let _0x22e9fe = 0x0;
    const _0x1958d4 = {
      'hello': ['ðŸ‘‹', 'ðŸ™‚', 'ðŸ˜Š', "ðŸ™‹â€â™‚ï¸", "ðŸ™‹â€â™€ï¸"],
      'hi': ['ðŸ‘‹', 'ðŸ™‚', 'ðŸ˜', "ðŸ™‹â€â™‚ï¸", "ðŸ™‹â€â™€ï¸"],
      "good morning": ['ðŸŒ…', 'ðŸŒž', 'â˜€ï¸', 'ðŸŒ»', 'ðŸŒ¼'],
      "good night": ['ðŸŒ™', 'ðŸŒœ', 'â­', 'ðŸŒ›', 'ðŸ’«'],
      'bye': ['ðŸ‘‹', 'ðŸ˜¢', "ðŸ‘‹ðŸ»", 'ðŸ¥²', "ðŸš¶â€â™‚ï¸", 'ðŸš¶â€â™€ï¸'],
      "see you": ['ðŸ‘‹', 'ðŸ˜Š', "ðŸ‘‹ðŸ»", 'âœŒï¸', "ðŸš¶â€â™‚ï¸"],
      'bro': ["ðŸ¤œðŸ¤›", 'ðŸ‘Š', 'ðŸ’¥', 'ðŸ¥Š', 'ðŸ‘‘'],
      'sister': ['ðŸ‘­', "ðŸ’â€â™€ï¸", 'ðŸŒ¸', 'ðŸ’–', "ðŸ™‹â€â™€ï¸"],
      'buddy': ['ðŸ¤—', "ðŸ‘¯â€â™‚ï¸", "ðŸ‘¯â€â™€ï¸", "ðŸ¤œðŸ¤›", 'ðŸ¤'],
      'niaje': ['ðŸ‘‹', 'ðŸ˜„', 'ðŸ’¥', 'ðŸ”¥', 'ðŸ•º', 'ðŸ’ƒ'],
      'ibrahim': ['ðŸ˜Ž', 'ðŸ’¯', 'ðŸ”¥', 'ðŸš€', 'ðŸ‘‘'],
      'adams': ['ðŸ”¥', 'ðŸ’¥', 'ðŸ‘‘', 'ðŸ’¯', 'ðŸ˜Ž'],
      'thanks': ['ðŸ™', 'ðŸ˜Š', 'ðŸ’–', 'â¤ï¸', 'ðŸ’'],
      "thank you": ['ðŸ™', 'ðŸ˜Š', 'ðŸ™Œ', 'ðŸ’–', 'ðŸ’'],
      'love': ['â¤ï¸', 'ðŸ’–', 'ðŸ’˜', 'ðŸ˜', 'ðŸ˜˜', 'ðŸ’', 'ðŸ’‘'],
      "miss you": ['ðŸ˜¢', 'ðŸ’”', 'ðŸ˜”', 'ðŸ˜­', 'ðŸ’–'],
      'sorry': ['ðŸ˜”', 'ðŸ™', 'ðŸ˜“', 'ðŸ’”', 'ðŸ¥º'],
      'apologies': ['ðŸ˜”', 'ðŸ’”', 'ðŸ™', 'ðŸ˜ž', 'ðŸ™‡â€â™‚ï¸', "ðŸ™‡â€â™€ï¸"],
      'congratulations': ['ðŸŽ‰', 'ðŸŽŠ', 'ðŸ†', 'ðŸŽ', 'ðŸ‘'],
      "well done": ['ðŸ‘', 'ðŸ’ª', 'ðŸŽ‰', "ðŸŽ–ï¸", 'ðŸ‘'],
      "good job": ['ðŸ‘', 'ðŸ’¯', 'ðŸ‘', 'ðŸŒŸ', 'ðŸŽ‰'],
      'happy': ['ðŸ˜', 'ðŸ˜Š', 'ðŸŽ‰', 'ðŸŽŠ', 'ðŸ’ƒ', 'ðŸ•º'],
      'sad': ['ðŸ˜¢', 'ðŸ˜­', 'ðŸ˜ž', 'ðŸ’”', 'ðŸ˜“'],
      'angry': ['ðŸ˜¡', 'ðŸ¤¬', 'ðŸ˜¤', 'ðŸ’¢', 'ðŸ˜¾'],
      'excited': ['ðŸ¤©', 'ðŸŽ‰', 'ðŸ˜†', 'ðŸ¤—', 'ðŸ¥³'],
      'surprised': ['ðŸ˜²', 'ðŸ˜³', 'ðŸ˜¯', 'ðŸ˜®', 'ðŸ˜²'],
      'help': ['ðŸ†˜', 'â“', 'ðŸ™', 'ðŸ’¡', "ðŸ‘¨â€ðŸ’»", "ðŸ‘©â€ðŸ’»"],
      'how': ['â“', 'ðŸ¤”', 'ðŸ˜•', 'ðŸ˜³', 'ðŸ§'],
      'what': ['â“', "ðŸ¤·â€â™‚ï¸", "ðŸ¤·â€â™€ï¸", 'ðŸ˜•', 'ðŸ˜²'],
      'where': ['â“', 'ðŸŒ', "ðŸ—ºï¸", "ðŸ™ï¸", 'ðŸŒŽ'],
      'party': ['ðŸŽ‰', 'ðŸ¥³', 'ðŸ¾', 'ðŸ»', 'ðŸŽ¤', 'ðŸ’ƒ', 'ðŸ•º'],
      'fun': ['ðŸ¤£', 'ðŸ˜‚', 'ðŸ¥³', 'ðŸŽ‰', 'ðŸŽ®', 'ðŸŽ²'],
      'hangout': ['ðŸ•', 'ðŸ”', 'ðŸ»', 'ðŸŽ®', 'ðŸ¿', 'ðŸ˜†'],
      'good': ['ðŸ‘', 'ðŸ‘Œ', 'ðŸ˜Š', 'ðŸ’¯', 'ðŸŒŸ'],
      'awesome': ['ðŸ”¥', 'ðŸš€', 'ðŸ¤©', 'ðŸ‘', 'ðŸ’¥'],
      'cool': ['ðŸ˜Ž', 'ðŸ‘Œ', 'ðŸŽ®', 'ðŸŽ¸', 'ðŸ’¥'],
      'boring': ['ðŸ˜´', 'ðŸ¥±', 'ðŸ™„', 'ðŸ˜‘', 'ðŸ¤'],
      'tired': ['ðŸ˜´', 'ðŸ¥±', 'ðŸ˜Œ', 'ðŸ’¤', 'ðŸ›Œ'],
      'bot': ['ðŸ¤–', 'ðŸ’»', 'âš™ï¸', 'ðŸ§ ', 'ðŸ”§'],
      'robot': ['ðŸ¤–', 'âš™ï¸', 'ðŸ’»', 'ðŸ”‹', 'ðŸ¤“'],
      "cool bot": ['ðŸ¤–', 'ðŸ˜Ž', 'ðŸ¤˜', 'ðŸ’¥', 'ðŸŽ®'],
      "love you": ['â¤ï¸', 'ðŸ’–', 'ðŸ˜˜', 'ðŸ’‹', 'ðŸ’‘'],
      "thank you bot": ['ðŸ™', 'ðŸ¤–', 'ðŸ˜Š', 'ðŸ’–', 'ðŸ’'],
      "good night bot": ['ðŸŒ™', 'ðŸŒ›', 'â­', 'ðŸ’¤', 'ðŸ˜´'],
      'laughter': ['ðŸ˜‚', 'ðŸ¤£', 'ðŸ˜†', 'ðŸ˜„', 'ðŸ¤ª'],
      'crying': ['ðŸ˜¢', 'ðŸ˜­', 'ðŸ˜¿', 'ðŸ˜“', 'ðŸ’”'],
      'john': ['ðŸ‘‘', 'ðŸ”¥', 'ðŸ’¥', 'ðŸ˜Ž', 'ðŸ’¯'],
      'mike': ['ðŸ’ª', 'ðŸ†', 'ðŸ”¥', 'ðŸ’¥', 'ðŸš€'],
      'lisa': ['ðŸ’–', 'ðŸ‘‘', 'ðŸŒ¸', 'ðŸ˜', 'ðŸŒº'],
      'emily': ['ðŸ’–', 'ðŸ’ƒ', 'ðŸ‘‘', 'ðŸŽ‰', 'ðŸŽ€'],
      'happy': ['ðŸ˜', 'ðŸ˜„', 'ðŸ˜Š', 'ðŸ™Œ', 'ðŸŽ‰', 'ðŸ¥³', 'ðŸ’ƒ', 'ðŸ•º', 'ðŸ”¥'],
      'excited': ['ðŸ¤©', 'ðŸŽ‰', 'ðŸ¥³', 'ðŸŽŠ', 'ðŸ˜†', 'ðŸ¤—', 'ðŸ’¥', 'ðŸš€'],
      'love': ['â¤ï¸', 'ðŸ’–', 'ðŸ’˜', 'ðŸ’', 'ðŸ˜', 'ðŸ˜˜', 'ðŸ’', 'ðŸ’‘', 'ðŸŒ¹'],
      'grateful': ['ðŸ™', 'ðŸ’', 'ðŸ¥°', 'â¤ï¸', 'ðŸ˜Š'],
      'thankful': ['ðŸ™', 'ðŸ’–', 'ðŸ’', 'ðŸ¤—', 'ðŸ˜‡'],
      'sad': ['ðŸ˜¢', 'ðŸ˜­', 'ðŸ˜ž', 'ðŸ’”', 'ðŸ˜”', 'ðŸ˜“', 'ðŸ˜–'],
      'angry': ['ðŸ˜¡', 'ðŸ˜ ', 'ðŸ¤¬', 'ðŸ’¢', 'ðŸ‘Š', 'ðŸ’¥', 'âš¡'],
      'frustrated': ['ðŸ˜¤', 'ðŸ˜©', 'ðŸ¤¯', 'ðŸ˜‘', 'ðŸŒ€'],
      'bored': ['ðŸ˜´', 'ðŸ¥±', 'ðŸ™„', 'ðŸ˜‘', 'ðŸ˜’'],
      'surprised': ['ðŸ˜²', 'ðŸ˜³', 'ðŸ˜®', 'ðŸ˜¯', 'ðŸ˜²', 'ðŸ™€'],
      'shocked': ['ðŸ˜±', 'ðŸ˜³', 'ðŸ˜¯', 'ðŸ’¥', 'ðŸ¤¯'],
      'wow': ['ðŸ˜²', 'ðŸ˜±', 'ðŸ¤©', 'ðŸ¤¯', 'ðŸ’¥', 'ðŸš€'],
      'crying': ['ðŸ˜­', 'ðŸ˜¢', 'ðŸ’”', 'ðŸ˜ž', 'ðŸ˜“'],
      "miss you": ['ðŸ˜­', 'ðŸ’”', 'ðŸ˜”', 'ðŸ˜¢', 'â¤ï¸'],
      'lonely': ['ðŸ˜”', 'ðŸ˜­', 'ðŸ˜¢', 'ðŸ’”', 'ðŸ™'],
      'help': ['ðŸ†˜', 'â“', 'ðŸ¤”', "ðŸ™‹â€â™‚ï¸", "ðŸ™‹â€â™€ï¸", 'ðŸ’¡'],
      "need assistance": ['ðŸ†˜', "ðŸ’â€â™‚ï¸", "ðŸ’â€â™€ï¸", 'â“', 'ðŸ™'],
      'sorry': ['ðŸ˜”', 'ðŸ™', 'ðŸ’”', 'ðŸ˜“', 'ðŸ¥º', "ðŸ™‡â€â™‚ï¸", "ðŸ™‡â€â™€ï¸"],
      'apology': ['ðŸ˜”', 'ðŸ˜ž', 'ðŸ™', 'ðŸ’”', "ðŸ™‡â€â™‚ï¸", 'ðŸ™‡â€â™€ï¸'],
      "good job": ['ðŸ‘', 'ðŸ’¯', 'ðŸŽ‰', 'ðŸŒŸ', 'ðŸ‘', 'ðŸ‘'],
      "well done": ['ðŸ‘', 'ðŸŽ‰', 'ðŸŽ–ï¸', 'ðŸ’ª', 'ðŸ”¥', 'ðŸ†'],
      "you can do it": ['ðŸ’ª', 'ðŸ”¥', 'ðŸ’¯', 'ðŸš€', 'ðŸŒŸ'],
      'congratulations': ['ðŸŽ‰', 'ðŸ†', 'ðŸŽŠ', 'ðŸŽ', 'ðŸ‘', 'ðŸ¾'],
      'cheers': ['ðŸ¥‚', 'ðŸ»', 'ðŸ¾', 'ðŸ·', 'ðŸ¥³', 'ðŸŽ‰'],
      'goodbye': ['ðŸ‘‹', 'ðŸ˜¢', 'ðŸ’”', 'ðŸ‘‹ðŸ»', "ðŸš¶â€â™‚ï¸", "ðŸš¶â€â™€ï¸"],
      'bye': ['ðŸ‘‹', 'ðŸ‘‹ðŸ»', 'ðŸ¥²', "ðŸš¶â€â™‚ï¸", "ðŸš¶â€â™€ï¸"],
      "see you": ['ðŸ‘‹', "ðŸ‘‹ðŸ»", 'ðŸ¤—', 'âœŒï¸', "ðŸ™‹â€â™‚ï¸", 'ðŸ™‹â€â™€ï¸'],
      'hello': ['ðŸ‘‹', 'ðŸ™‚', 'ðŸ˜Š', 'ðŸ™‹â€â™‚ï¸', "ðŸ™‹â€â™€ï¸"],
      'hi': ['ðŸ‘‹', 'ðŸ™‚', 'ðŸ˜', "ðŸ™‹â€â™‚ï¸", "ðŸ™‹â€â™€ï¸"],
      'party': ['ðŸŽ‰', 'ðŸ¥³', 'ðŸŽ¤', 'ðŸ’ƒ', 'ðŸ•º', 'ðŸ»', 'ðŸŽ¶'],
      'fun': ['ðŸŽ®', 'ðŸŽ²', 'ðŸ¤£', 'ðŸŽ‰', 'ðŸƒ'],
      'play': ['ðŸŽ®', 'ðŸ€', 'âš½', 'ðŸŽ¾', 'ðŸŽ±', 'ðŸŽ²', 'ðŸ†'],
      'work': ['ðŸ’»', "ðŸ–¥ï¸", 'ðŸ’¼', 'ðŸ“…', 'ðŸ“'],
      'school': ['ðŸ“š', 'ðŸ«', 'ðŸŽ’', 'ðŸ‘¨â€ðŸ«', "ðŸ‘©â€ðŸ«"],
      'study': ['ðŸ“–', 'ðŸ“', 'ðŸ’¡', 'ðŸ“š', 'ðŸŽ“'],
      'summer': ['ðŸŒž', 'ðŸ–ï¸', 'ðŸŒ´', 'ðŸ‰', 'ðŸŒ»'],
      'winter': ['â„ï¸', 'â˜ƒï¸', 'ðŸŽ¿', 'ðŸ”¥', 'â›„'],
      'autumn': ['ðŸ', 'ðŸ‚', 'ðŸŽƒ', 'ðŸ‚', 'ðŸ'],
      'spring': ['ðŸŒ¸', 'ðŸŒ¼', 'ðŸŒ·', 'ðŸŒ±', 'ðŸŒº'],
      'birthday': ['ðŸŽ‚', 'ðŸŽ‰', 'ðŸŽ', 'ðŸŽˆ', 'ðŸŽŠ'],
      'anniversary': ['ðŸ’', 'ðŸŽ‰', 'ðŸŽ', 'ðŸŽˆ', 'ðŸ’‘'],
      'robot': ['ðŸ¤–', 'âš™ï¸', 'ðŸ”§', 'ðŸ¤–', 'ðŸ§ '],
      'bot': ['ðŸ¤–', 'ðŸ§ ', 'âš™ï¸', 'ðŸ’»', "ðŸ–¥ï¸"],
      'thanks': ['ðŸ™', 'ðŸ’–', 'ðŸ˜Š', 'â¤ï¸', 'ðŸ’'],
      "good luck": ['ðŸ€', 'ðŸ€', 'ðŸ’¯', 'ðŸ€', 'ðŸŽ¯'],
      'john': ['ðŸ‘‘', 'ðŸ”¥', 'ðŸ’¥', 'ðŸ˜Ž', 'ðŸ’¯'],
      'mike': ['ðŸ’ª', 'ðŸ†', 'ðŸ”¥', 'ðŸ’¥', 'ðŸš€'],
      'lisa': ['ðŸ’–', 'ðŸ‘‘', 'ðŸŒ¸', 'ðŸ˜', 'ðŸŒº'],
      'emily': ['ðŸ’–', 'ðŸ’ƒ', 'ðŸ‘‘', 'ðŸŽ‰', 'ðŸŽ€'],
      'food': ['ðŸ•', 'ðŸ”', 'ðŸŸ', 'ðŸ²', 'ðŸ£', 'ðŸ©'],
      'drink': ['ðŸº', 'ðŸ·', 'ðŸ¥‚', 'ðŸ¾', 'ðŸ¥¤'],
      'coffee': ['â˜•', 'ðŸ¥¤', 'ðŸµ', 'ðŸ¥¶'],
      'tea': ['ðŸµ', 'ðŸ«–', 'ðŸ‚', 'ðŸƒ'],
      'excited': ['ðŸ¤©', 'ðŸŽ‰', 'ðŸ¥³', 'ðŸ’¥', 'ðŸš€', 'ðŸ˜†', 'ðŸ˜œ'],
      'nervous': ['ðŸ˜¬', 'ðŸ˜°', 'ðŸ¤ž', 'ðŸ§ ', 'ðŸ‘'],
      'confused': ['ðŸ¤”', 'ðŸ˜•', 'ðŸ§', 'ðŸ˜µ', "ðŸ¤·â€â™‚ï¸", 'ðŸ¤·â€â™€ï¸'],
      'embarrassed': ['ðŸ˜³', 'ðŸ˜³', 'ðŸ™ˆ', 'ðŸ˜³', 'ðŸ˜¬', 'ðŸ˜…'],
      'hopeful': ['ðŸ¤ž', 'ðŸŒ ', 'ðŸ™', 'ðŸŒˆ', 'ðŸ’«'],
      'shy': ['ðŸ˜Š', 'ðŸ˜³', 'ðŸ™ˆ', 'ðŸ«£', 'ðŸ«¶'],
      'family': ['ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦', 'ðŸ‘©â€ðŸ‘§', 'ðŸ‘©â€ðŸ‘§â€ðŸ‘¦', 'ðŸ‘¨â€ðŸ‘©â€ðŸ‘§', 'ðŸ’', "ðŸ‘¨â€ðŸ‘¨â€ðŸ‘§â€ðŸ‘¦", "ðŸ‘©â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦"],
      'friends': ["ðŸ‘¯â€â™‚ï¸", "ðŸ‘¯â€â™€ï¸", 'ðŸ¤—', 'ðŸ«¶', 'ðŸ’«', 'ðŸ¤'],
      'relationship': ['ðŸ’‘', 'â¤ï¸', 'ðŸ’', 'ðŸ¥°', 'ðŸ’', 'ðŸ’Œ'],
      'couple': ["ðŸ‘©â€â¤ï¸â€ðŸ‘¨", 'ðŸ‘¨â€â¤ï¸â€ðŸ‘¨', "ðŸ‘©â€â¤ï¸â€ðŸ‘©", 'ðŸ’', 'ðŸ’‘', 'ðŸ’'],
      "best friend": ['ðŸ¤—', 'ðŸ’–', "ðŸ‘¯â€â™€ï¸", "ðŸ‘¯â€â™‚ï¸", 'ðŸ™Œ'],
      "love you": ['â¤ï¸', 'ðŸ˜˜', 'ðŸ’–', 'ðŸ’˜', 'ðŸ’“', 'ðŸ’—'],
      'vacation': ["ðŸ–ï¸", 'ðŸŒ´', 'âœˆï¸', 'ðŸŒŠ', 'ðŸ›³ï¸', 'ðŸžï¸', "ðŸ•ï¸"],
      'beach': ["ðŸ–ï¸", 'ðŸŒŠ', 'ðŸ„â€â™€ï¸', 'ðŸ©´', 'ðŸ–ï¸', 'ðŸŒ´', 'ðŸ¦€'],
      "road trip": ['ðŸš—', 'ðŸš™', "ðŸ›£ï¸", 'ðŸŒ„', 'ðŸŒŸ'],
      'mountain': ["ðŸžï¸", 'â›°ï¸', "ðŸ”ï¸", 'ðŸŒ„', "ðŸ•ï¸", 'ðŸŒ²'],
      'city': ["ðŸ™ï¸", 'ðŸŒ†', 'ðŸ—½', 'ðŸŒ‡', 'ðŸš–', "ðŸ™ï¸"],
      'exploration': ['ðŸŒ', 'ðŸ§­', 'ðŸŒŽ', 'ðŸŒ', 'ðŸ§³', 'ðŸ“', 'â›µ'],
      'morning': ['ðŸŒ…', 'â˜€ï¸', 'ðŸŒž', 'ðŸŒ„', 'ðŸŒ»', 'ðŸ•¶ï¸'],
      'afternoon': ['ðŸŒž', "ðŸŒ¤ï¸", 'â›…', 'ðŸŒ»', 'ðŸŒ‡'],
      'night': ['ðŸŒ™', 'ðŸŒ›', 'ðŸŒœ', 'â­', 'ðŸŒš', 'ðŸ’«'],
      'evening': ['ðŸŒ™', 'ðŸŒ›', 'ðŸŒ‡', 'ðŸŒ“', 'ðŸ’«'],
      'goodnight': ['ðŸŒ™', 'ðŸ˜´', 'ðŸ’¤', 'ðŸŒœ', 'ðŸ›Œ', 'ðŸŒ›', 'âœ¨'],
      'productivity': ['ðŸ’»', 'ðŸ“Š', 'ðŸ“', 'ðŸ’¼', 'ðŸ“…', 'ðŸ“ˆ'],
      'office': ["ðŸ–¥ï¸", 'ðŸ’¼', "ðŸ—‚ï¸", 'ðŸ“…', "ðŸ–‹ï¸"],
      'workout': ["ðŸ‹ï¸â€â™€ï¸", 'ðŸ’ª', "ðŸƒâ€â™‚ï¸", "ðŸƒâ€â™€ï¸", 'ðŸ¤¸â€â™€ï¸', 'ðŸš´â€â™€ï¸', "ðŸ‹ï¸â€â™‚ï¸"],
      "study hard": ['ðŸ“š', 'ðŸ“', 'ðŸ“–', 'ðŸ’¡', 'ðŸ’¼'],
      'focus': ['ðŸ”', 'ðŸŽ¯', 'ðŸ’»', 'ðŸ§ ', 'ðŸ¤“'],
      'food': ['ðŸ•', 'ðŸ”', 'ðŸŸ', 'ðŸ–', 'ðŸ–', 'ðŸ¥—', 'ðŸ£', 'ðŸ²'],
      'drink': ['ðŸ¹', 'ðŸ¥¤', 'ðŸ·', 'ðŸ¾', 'ðŸ¸', 'ðŸº', 'ðŸ¥‚', 'â˜•'],
      'coffee': ['â˜•', 'ðŸ§ƒ', 'ðŸµ', 'ðŸ¥¤', 'ðŸ«'],
      'cake': ['ðŸ°', 'ðŸŽ‚', 'ðŸ©', 'ðŸª', 'ðŸ«', 'ðŸ§'],
      "ice cream": ['ðŸ¦', 'ðŸ§', 'ðŸ¨', 'ðŸª'],
      'cat': ['ðŸ±', 'ðŸ˜º', 'ðŸˆ', 'ðŸ¾'],
      'dog': ['ðŸ¶', 'ðŸ•', 'ðŸ©', "ðŸ•â€ðŸ¦º", 'ðŸ¾'],
      'bird': ['ðŸ¦', 'ðŸ¦‰', 'ðŸ¦…', 'ðŸ¦'],
      'fish': ['ðŸŸ', 'ðŸ ', 'ðŸ¡', 'ðŸ¡', 'ðŸ™'],
      'rabbit': ['ðŸ°', 'ðŸ‡', 'ðŸ¹', 'ðŸ¾'],
      'lion': ['ðŸ¦', 'ðŸ¯', 'ðŸ…', 'ðŸ†'],
      'bear': ['ðŸ»', 'ðŸ¨', 'ðŸ¼', "ðŸ»â€â„ï¸"],
      'elephant': ['ðŸ˜', 'ðŸ˜'],
      'sun': ['â˜€ï¸', 'ðŸŒž', 'ðŸŒ„', 'ðŸŒ…', 'ðŸŒž'],
      'rain': ["ðŸŒ§ï¸", 'â˜”', 'ðŸŒˆ', "ðŸŒ¦ï¸", "ðŸŒ§ï¸"],
      'snow': ['â„ï¸', 'â›„', "ðŸŒ¨ï¸", "ðŸŒ¬ï¸", 'â„ï¸'],
      'wind': ['ðŸ’¨', "ðŸŒ¬ï¸", "ðŸŒªï¸", "ðŸŒ¬ï¸"],
      'earth': ['ðŸŒ', 'ðŸŒ', 'ðŸŒŽ', 'ðŸŒ', 'ðŸŒ±', 'ðŸŒ³'],
      'phone': ['ðŸ“±', 'â˜Žï¸', 'ðŸ“ž', 'ðŸ“²', 'ðŸ“¡'],
      'computer': ['ðŸ’»', "ðŸ–¥ï¸", 'âŒ¨ï¸', "ðŸ–±ï¸", "ðŸ–¥ï¸"],
      'internet': ['ðŸŒ', 'ðŸ’»', 'ðŸ“¶', 'ðŸ“¡', 'ðŸ”Œ'],
      'software': ['ðŸ’»', "ðŸ–¥ï¸", 'ðŸ§‘â€ðŸ’»', 'ðŸ–±ï¸', 'ðŸ’¡'],
      'star': ['â­', 'ðŸŒŸ', 'âœ¨', 'ðŸŒ ', 'ðŸ’«'],
      'light': ['ðŸ’¡', 'ðŸ”¦', 'âœ¨', 'ðŸŒŸ', 'ðŸ”†'],
      'money': ['ðŸ’µ', 'ðŸ’°', 'ðŸ’¸', 'ðŸ’³', 'ðŸ’¶'],
      'victory': ['âœŒï¸', 'ðŸ†', 'ðŸŽ‰', "ðŸŽ–ï¸", 'ðŸŽŠ'],
      'gift': ['ðŸŽ', 'ðŸŽ€', 'ðŸŽ‰', 'ðŸŽ'],
      'fire': ['ðŸ”¥', 'ðŸ’¥', 'ðŸŒ‹', 'ðŸ”¥', 'ðŸ’£'],
      'music': ['ðŸŽµ', 'ðŸŽ¶', 'ðŸŽ§', 'ðŸŽ¤', 'ðŸŽ¸', 'ðŸŽ¹'],
      'sports': ['âš½', 'ðŸ€', 'ðŸˆ', 'ðŸŽ¾', "ðŸ‹ï¸â€â™‚ï¸", "ðŸƒâ€â™€ï¸", 'ðŸ†', 'ðŸ¥‡'],
      'games': ['ðŸŽ®', 'ðŸ•¹ï¸', 'ðŸŽ²', 'ðŸŽ¯', 'ðŸ§©'],
      'art': ['ðŸŽ¨', "ðŸ–Œï¸", "ðŸ–¼ï¸", 'ðŸŽ­', "ðŸ–ï¸"],
      'photography': ['ðŸ“·', 'ðŸ“¸', 'ðŸ“¸', "ðŸ–¼ï¸", 'ðŸŽ¥'],
      'reading': ['ðŸ“š', 'ðŸ“–', 'ðŸ“š', 'ðŸ“°'],
      'craft': ['ðŸ§µ', 'ðŸª¡', 'âœ‚ï¸', 'ðŸª¢', 'ðŸ§¶'],
      'hello': ['ðŸ‘‹', 'ðŸ™‚', 'ðŸ˜Š'],
      'hey': ['ðŸ‘‹', 'ðŸ™‚', 'ðŸ˜Š'],
      'hi': ['ðŸ‘‹', 'ðŸ™‚', 'ðŸ˜Š'],
      'bye': ['ðŸ‘‹', 'ðŸ˜¢', 'ðŸ‘‹'],
      'goodbye': ['ðŸ‘‹', 'ðŸ˜¢', "ðŸ™‹â€â™‚ï¸"],
      'thanks': ['ðŸ™', 'ðŸ˜Š', 'ðŸŒ¹'],
      "thank you": ['ðŸ™', 'ðŸ˜Š', 'ðŸŒ¸'],
      'welcome': ['ðŸ˜Š', 'ðŸ˜„', 'ðŸŒ·'],
      'congrats': ['ðŸŽ‰', 'ðŸ‘', 'ðŸ¥³'],
      'congratulations': ['ðŸŽ‰', 'ðŸ‘', 'ðŸ¥³'],
      "good job": ['ðŸ‘', 'ðŸ‘', 'ðŸ™Œ'],
      'great': ['ðŸ‘', 'ðŸ’ª', 'ðŸ˜„'],
      'cool': ['ðŸ˜Ž', 'ðŸ¤™', 'ðŸ”¥'],
      'ok': ['ðŸ‘Œ', 'ðŸ‘', 'âœ…'],
      'love': ['â¤ï¸', 'ðŸ’•', 'ðŸ’–'],
      'like': ['ðŸ‘', 'â¤ï¸', 'ðŸ‘Œ'],
      'happy': ['ðŸ˜Š', 'ðŸ˜', 'ðŸ™‚'],
      'joy': ['ðŸ˜', 'ðŸ˜†', 'ðŸ˜‚'],
      'laugh': ['ðŸ˜‚', 'ðŸ¤£', 'ðŸ˜'],
      'sad': ['ðŸ˜¢', 'ðŸ˜­', 'â˜¹ï¸'],
      'cry': ['ðŸ˜­', 'ðŸ˜¢', 'ðŸ˜¿'],
      'angry': ['ðŸ˜¡', 'ðŸ˜ ', 'ðŸ’¢'],
      'mad': ['ðŸ˜ ', 'ðŸ˜¡', 'ðŸ˜¤'],
      'shocked': ['ðŸ˜²', 'ðŸ˜±', 'ðŸ˜®'],
      'scared': ['ðŸ˜±', 'ðŸ˜¨', 'ðŸ˜§'],
      'sleep': ['ðŸ˜´', 'ðŸ’¤', 'ðŸ˜Œ'],
      'bored': ['ðŸ˜', 'ðŸ˜‘', 'ðŸ™„'],
      'excited': ['ðŸ¤©', 'ðŸ¥³', 'ðŸŽ‰'],
      'party': ['ðŸ¥³', 'ðŸŽ‰', 'ðŸ¾'],
      'kiss': ['ðŸ˜˜', 'ðŸ’‹', 'ðŸ˜'],
      'hug': ['ðŸ¤—', 'â¤ï¸', 'ðŸ’•'],
      'peace': ['âœŒï¸', "ðŸ•Šï¸", 'âœŒï¸'],
      'pizza': ['ðŸ•', 'ðŸ¥–', 'ðŸŸ'],
      'coffee': ['â˜•', 'ðŸ¥¤', 'ðŸµ'],
      'water': ['ðŸ’§', 'ðŸ’¦', 'ðŸŒŠ'],
      'wine': ['ðŸ·', 'ðŸ¸', 'ðŸ¾'],
      'hello': ['ðŸ‘‹', 'ðŸ™‚', 'ðŸ˜Š', 'ðŸ˜ƒ', 'ðŸ˜„'],
      'hey': ['ðŸ‘‹', 'ðŸ˜Š', 'ðŸ™‹', 'ðŸ˜„', 'ðŸ˜'],
      'hi': ['ðŸ‘‹', 'ðŸ˜€', 'ðŸ˜', 'ðŸ˜ƒ', 'ðŸ™‚'],
      'bye': ['ðŸ‘‹', 'ðŸ˜¢', 'ðŸ™‹â€â™‚ï¸', 'ðŸ˜ž', 'ðŸ˜”'],
      'goodbye': ['ðŸ‘‹', 'ðŸ˜¢', "ðŸ™‹â€â™€ï¸", 'ðŸ˜”', 'ðŸ˜­'],
      'thanks': ['ðŸ™', 'ðŸ˜Š', 'ðŸŒ¹', 'ðŸ¤²', 'ðŸ¤—'],
      "thank you": ['ðŸ™', 'ðŸ’', 'ðŸ¤²', 'ðŸ¥°', 'ðŸ˜Œ'],
      'welcome': ['ðŸ˜Š', 'ðŸ˜„', 'ðŸŒ¸', 'ðŸ™‚', 'ðŸ’–'],
      'congrats': ['ðŸŽ‰', 'ðŸ‘', 'ðŸ¥³', 'ðŸ’', 'ðŸŽŠ'],
      'congratulations': ['ðŸŽ‰', 'ðŸ‘', 'ðŸ¥³', 'ðŸŽŠ', 'ðŸ¾'],
      "good job": ['ðŸ‘', 'ðŸ‘', 'ðŸ™Œ', 'ðŸ’ª', 'ðŸ¤©'],
      'great': ['ðŸ‘', 'ðŸ’ª', 'ðŸ˜„', 'ðŸ”¥', 'âœ¨'],
      'cool': ['ðŸ˜Ž', 'ðŸ¤™', 'ðŸ”¥', 'ðŸ‘Œ', 'ðŸ†’'],
      'ok': ['ðŸ‘Œ', 'ðŸ‘', 'âœ…', 'ðŸ˜Œ', 'ðŸ¤ž'],
      'love': ['â¤ï¸', 'ðŸ’•', 'ðŸ’–', 'ðŸ’—', 'ðŸ˜'],
      'like': ['ðŸ‘', 'â¤ï¸', 'ðŸ‘Œ', 'ðŸ˜Œ', 'ðŸ’“'],
      'happy': ['ðŸ˜Š', 'ðŸ˜', 'ðŸ™‚', 'ðŸ˜ƒ', 'ðŸ˜„'],
      'joy': ['ðŸ˜', 'ðŸ˜†', 'ðŸ˜‚', 'ðŸ˜Š', 'ðŸ¤—'],
      'laugh': ['ðŸ˜‚', 'ðŸ¤£', 'ðŸ˜', 'ðŸ˜¹', 'ðŸ˜„'],
      'sad': ['ðŸ˜¢', 'ðŸ˜­', 'â˜¹ï¸', 'ðŸ˜ž', 'ðŸ˜”'],
      'cry': ['ðŸ˜­', 'ðŸ˜¢', 'ðŸ˜¿', 'ðŸ’§', 'ðŸ˜©'],
      'angry': ['ðŸ˜¡', 'ðŸ˜ ', 'ðŸ’¢', 'ðŸ˜¤', 'ðŸ¤¬'],
      'mad': ['ðŸ˜ ', 'ðŸ˜¡', 'ðŸ˜¤', 'ðŸ’¢', 'ðŸ˜’'],
      'shocked': ['ðŸ˜²', 'ðŸ˜±', 'ðŸ˜®', 'ðŸ˜¯', 'ðŸ˜§'],
      'scared': ['ðŸ˜±', 'ðŸ˜¨', 'ðŸ˜§', 'ðŸ˜°', 'ðŸ˜³'],
      'sleep': ['ðŸ˜´', 'ðŸ’¤', 'ðŸ˜Œ', 'ðŸ˜ª', 'ðŸ›Œ'],
      'bored': ['ðŸ˜', 'ðŸ˜‘', 'ðŸ™„', 'ðŸ˜’', 'ðŸ¤¦'],
      'excited': ['ðŸ¤©', 'ðŸ¥³', 'ðŸŽ‰', 'ðŸ˜„', 'âœ¨'],
      'party': ['ðŸ¥³', 'ðŸŽ‰', 'ðŸŽŠ', 'ðŸ¾', 'ðŸŽˆ'],
      'kiss': ['ðŸ˜˜', 'ðŸ’‹', 'ðŸ˜', 'ðŸ’–', 'ðŸ’'],
      'hug': ['ðŸ¤—', 'â¤ï¸', 'ðŸ’•', 'ðŸ’ž', 'ðŸ˜Š'],
      'peace': ['âœŒï¸', 'ðŸ•Šï¸', 'ðŸ¤ž', 'ðŸ’«', 'â˜®ï¸'],
      'pizza': ['ðŸ•', 'ðŸ¥–', 'ðŸŸ', 'ðŸ”', 'ðŸ'],
      'burger': ['ðŸ”', 'ðŸŸ', 'ðŸ¥“', 'ðŸ¥ª', 'ðŸŒ­'],
      'fries': ['ðŸŸ', 'ðŸ”', 'ðŸ¥¤', 'ðŸ¿', 'ðŸ§‚'],
      'coffee': ['â˜•', 'ðŸ¥¤', 'ðŸµ', 'ðŸ«–', 'ðŸ¥„'],
      'tea': ['ðŸµ', 'â˜•', 'ðŸ«–', 'ðŸ¥„', 'ðŸª'],
      'cake': ['ðŸ°', 'ðŸŽ‚', 'ðŸ§', 'ðŸ©', 'ðŸ«'],
      'donut': ['ðŸ©', 'ðŸª', 'ðŸ°', 'ðŸ§', 'ðŸ«'],
      "ice cream": ['ðŸ¦', 'ðŸ¨', 'ðŸ§', 'ðŸ§', 'ðŸ«'],
      'cookie': ['ðŸª', 'ðŸ©', 'ðŸ°', 'ðŸ§', 'ðŸ«'],
      'chocolate': ['ðŸ«', 'ðŸ¬', 'ðŸ°', 'ðŸ¦', 'ðŸ­'],
      'popcorn': ['ðŸ¿', 'ðŸ¥¤', 'ðŸ«', 'ðŸŽ¬', 'ðŸ©'],
      'soda': ['ðŸ¥¤', 'ðŸ¾', 'ðŸ¹', 'ðŸ·', 'ðŸ¸'],
      'water': ['ðŸ’§', 'ðŸ’¦', 'ðŸŒŠ', 'ðŸš°', 'ðŸ¥¤'],
      'wine': ['ðŸ·', 'ðŸ¾', 'ðŸ¥‚', 'ðŸ¹', 'ðŸ¸'],
      'beer': ['ðŸº', 'ðŸ»', 'ðŸ¥‚', 'ðŸ¹', 'ðŸ¾'],
      'cheers': ['ðŸ¥‚', 'ðŸ»', 'ðŸ¾', 'ðŸŽ‰', 'ðŸŽŠ'],
      'sun': ['ðŸŒž', 'â˜€ï¸', 'ðŸŒ…', 'ðŸŒ„', 'ðŸŒ»'],
      'moon': ['ðŸŒœ', 'ðŸŒ™', 'ðŸŒš', 'ðŸŒ', 'ðŸŒ›'],
      'star': ['ðŸŒŸ', 'â­', 'âœ¨', 'ðŸ’«', 'ðŸŒ '],
      'cloud': ['â˜ï¸', "ðŸŒ¥ï¸", "ðŸŒ¤ï¸", 'â›…', "ðŸŒ§ï¸"],
      'rain': ["ðŸŒ§ï¸", 'â˜”', 'ðŸ’§', 'ðŸ’¦', 'ðŸŒ‚'],
      'thunder': ['âš¡', 'â›ˆï¸', "ðŸŒ©ï¸", "ðŸŒªï¸", 'âš ï¸'],
      'fire': ['ðŸ”¥', 'âš¡', 'ðŸŒ‹', 'ðŸ”¥', 'ðŸ’¥'],
      'flower': ['ðŸŒ¸', 'ðŸŒº', 'ðŸŒ·', 'ðŸ’', 'ðŸŒ¹'],
      'tree': ['ðŸŒ³', 'ðŸŒ²', 'ðŸŒ´', 'ðŸŽ„', 'ðŸŒ±'],
      'leaves': ['ðŸƒ', 'ðŸ‚', 'ðŸ', 'ðŸŒ¿', 'ðŸŒ¾'],
      'snow': ['â„ï¸', 'â›„', "ðŸŒ¨ï¸", "ðŸŒ¬ï¸", 'â˜ƒï¸'],
      'wind': ['ðŸ’¨', 'ðŸŒ¬ï¸', 'ðŸƒ', 'â›…', "ðŸŒªï¸"],
      'rainbow': ['ðŸŒˆ', "ðŸŒ¤ï¸", 'â˜€ï¸', 'âœ¨', 'ðŸ’§'],
      'ocean': ['ðŸŒŠ', 'ðŸ’¦', 'ðŸš¤', 'â›µ', "ðŸ„â€â™‚ï¸"],
      'dog': ['ðŸ¶', 'ðŸ•', 'ðŸ¾', 'ðŸ©', 'ðŸ¦®'],
      'cat': ['ðŸ±', 'ðŸ˜º', 'ðŸ˜¸', 'ðŸ¾', 'ðŸ¦'],
      'lion': ['ðŸ¦', 'ðŸ¯', 'ðŸ±', 'ðŸ¾', 'ðŸ…'],
      'tiger': ['ðŸ¯', 'ðŸ…', 'ðŸ¦', 'ðŸ†', 'ðŸ¾'],
      'bear': ['ðŸ»', 'ðŸ¨', 'ðŸ¼', 'ðŸ§¸', 'ðŸ¾'],
      'rabbit': ['ðŸ°', 'ðŸ‡', 'ðŸ¾', 'ðŸ¹', 'ðŸ­'],
      'panda': ['ðŸ¼', 'ðŸ»', 'ðŸ¾', 'ðŸ¨', 'ðŸƒ'],
      'monkey': ['ðŸ’', 'ðŸµ', 'ðŸ™Š', 'ðŸ™‰', 'ðŸ™ˆ'],
      'fox': ['ðŸ¦Š', 'ðŸº', 'ðŸ¾', 'ðŸ¶', 'ðŸ¦®'],
      'bird': ['ðŸ¦', 'ðŸ§', 'ðŸ¦…', 'ðŸ¦¢', 'ðŸ¦œ'],
      'fish': ['ðŸŸ', 'ðŸ ', 'ðŸ¡', 'ðŸ¬', 'ðŸ³'],
      'whale': ['ðŸ‹', 'ðŸ³', 'ðŸŒŠ', 'ðŸŸ', 'ðŸ '],
      'dolphin': ['ðŸ¬', 'ðŸŸ', 'ðŸ ', 'ðŸ³', 'ðŸŒŠ'],
      'unicorn': ['ðŸ¦„', 'âœ¨', 'ðŸŒˆ', 'ðŸŒ¸', 'ðŸ’«'],
      'bee': ['ðŸ', 'ðŸ¯', 'ðŸŒ»', 'ðŸ’', 'ðŸž'],
      'butterfly': ['ðŸ¦‹', 'ðŸŒ¸', 'ðŸ’', 'ðŸŒ·', 'ðŸŒ¼'],
      'phoenix': ['ðŸ¦…', 'ðŸ”¥', 'âœ¨', 'ðŸŒ„', 'ðŸ”¥'],
      'wolf': ['ðŸº', 'ðŸŒ•', 'ðŸ¾', 'ðŸŒ²', 'ðŸŒŒ'],
      'mouse': ['ðŸ­', 'ðŸ', 'ðŸ§€', 'ðŸ¾', 'ðŸ€'],
      'cow': ['ðŸ®', 'ðŸ„', 'ðŸ‚', 'ðŸŒ¾', 'ðŸ€'],
      'pig': ['ðŸ·', 'ðŸ½', 'ðŸ–', 'ðŸ¾', 'ðŸ—'],
      'horse': ['ðŸ´', 'ðŸ‡', 'ðŸŽ', 'ðŸŒ„', "ðŸžï¸"],
      'sheep': ['ðŸ‘', 'ðŸ', 'ðŸŒ¾', 'ðŸ¾', 'ðŸ'],
      'soccer': ['âš½', 'ðŸ¥…', "ðŸŸï¸", 'ðŸŽ‰', 'ðŸ‘'],
      'basketball': ['ðŸ€', "â›¹ï¸â€â™‚ï¸", 'ðŸ†', 'ðŸŽ‰', 'ðŸ¥‡'],
      'tennis': ['ðŸŽ¾', 'ðŸ¸', 'ðŸ¥‡', 'ðŸ…', 'ðŸ’ª'],
      'baseball': ['âš¾', 'ðŸŸï¸', 'ðŸ†', 'ðŸŽ‰', 'ðŸ‘'],
      'football': ['ðŸˆ', 'ðŸŽ‰', 'ðŸŸï¸', 'ðŸ†', 'ðŸ¥…'],
      'golf': ['â›³', 'ðŸŒï¸â€â™‚ï¸', 'ðŸŒï¸â€â™€ï¸', 'ðŸŽ‰', 'ðŸ†'],
      'bowling': ['ðŸŽ³', 'ðŸ…', 'ðŸŽ‰', 'ðŸ†', 'ðŸ‘'],
      'running': ["ðŸƒâ€â™‚ï¸", "ðŸƒâ€â™€ï¸", 'ðŸ‘Ÿ', 'ðŸ…', 'ðŸ”¥'],
      'swimming': ['ðŸŠâ€â™‚ï¸', 'ðŸŠâ€â™€ï¸', 'ðŸŒŠ', 'ðŸ†', 'ðŸ‘'],
      'cycling': ["ðŸš´â€â™‚ï¸", "ðŸš´â€â™€ï¸", 'ðŸ…', 'ðŸ”¥', "ðŸžï¸"],
      'yoga': ['ðŸ§˜', 'ðŸŒ¸', 'ðŸ’ª', 'âœ¨', 'ðŸ˜Œ'],
      'dancing': ['ðŸ’ƒ', 'ðŸ•º', 'ðŸŽ¶', 'ðŸ¥³', 'ðŸŽ‰'],
      'singing': ['ðŸŽ¤', 'ðŸŽ¶', 'ðŸŽ™ï¸', 'ðŸŽ‰', 'ðŸŽµ'],
      'guitar': ['ðŸŽ¸', 'ðŸŽ¶', 'ðŸŽ¼', 'ðŸŽµ', 'ðŸŽ‰'],
      'piano': ['ðŸŽ¹', 'ðŸŽ¶', 'ðŸŽ¼', 'ðŸŽµ', 'ðŸŽ‰'],
      'money': ['ðŸ’¸', 'ðŸ’°', 'ðŸ’µ', 'ðŸ’³', 'ðŸ¤‘'],
      'fire': ['ðŸ”¥', 'ðŸ’¥', 'âš¡', 'ðŸŽ‡', 'âœ¨'],
      'rocket': ['ðŸš€', 'ðŸŒŒ', 'ðŸ›¸', "ðŸ›°ï¸", 'âœ¨'],
      'bomb': ['ðŸ’£', 'ðŸ”¥', 'âš¡', 'ðŸ˜±', 'ðŸ’¥'],
      'computer': ['ðŸ’»', 'ðŸ–¥ï¸', 'ðŸ“±', 'âŒ¨ï¸', "ðŸ–±ï¸"],
      'phone': ['ðŸ“±', 'ðŸ“²', 'â˜Žï¸', 'ðŸ“ž', 'ðŸ“³'],
      'camera': ['ðŸ“·', 'ðŸ“¸', 'ðŸŽ¥', 'ðŸ“¹', "ðŸŽžï¸"],
      'book': ['ðŸ“š', 'ðŸ“–', 'âœï¸', 'ðŸ“˜', 'ðŸ“•'],
      'light': ['ðŸ’¡', 'âœ¨', 'ðŸ”¦', 'ðŸŒŸ', 'ðŸŒž'],
      'music': ['ðŸŽ¶', 'ðŸŽµ', 'ðŸŽ¼', 'ðŸŽ¸', 'ðŸŽ§'],
      'star': ['ðŸŒŸ', 'â­', 'âœ¨', 'ðŸŒ ', 'ðŸ’«'],
      'gift': ['ðŸŽ', 'ðŸ’', 'ðŸŽ‰', 'ðŸŽŠ', 'ðŸŽˆ'],
      'car': ['ðŸš—', 'ðŸš˜', 'ðŸš™', 'ðŸš•', "ðŸ›£ï¸"],
      'train': ['ðŸš†', 'ðŸš„', 'ðŸš…', 'ðŸšž', 'ðŸš‚'],
      'plane': ['âœˆï¸', 'ðŸ›«', 'ðŸ›¬', "ðŸ›©ï¸", 'ðŸš'],
      'boat': ['â›µ', "ðŸ›¥ï¸", 'ðŸš¤', 'ðŸš¢', 'ðŸŒŠ'],
      'city': ["ðŸ™ï¸", 'ðŸŒ†', 'ðŸŒ‡', 'ðŸ¢', 'ðŸŒƒ'],
      'beach': ['ðŸ–ï¸', 'ðŸŒ´', 'ðŸŒŠ', 'â˜€ï¸', 'ðŸ„â€â™‚ï¸'],
      'mountain': ["ðŸ”ï¸", 'â›°ï¸', 'ðŸ—»', 'ðŸŒ„', 'ðŸŒž'],
      'forest': ['ðŸŒ²', 'ðŸŒ³', 'ðŸƒ', "ðŸžï¸", 'ðŸ¾'],
      'desert': ['ðŸœï¸', 'ðŸŒµ', 'ðŸª', 'ðŸŒž', "ðŸ–ï¸"],
      'hotel': ['ðŸ¨', 'ðŸ©', "ðŸ›ï¸", "ðŸ›Žï¸", 'ðŸ¢'],
      'restaurant': ["ðŸ½ï¸", 'ðŸ´', 'ðŸ¥‚', 'ðŸ·', 'ðŸ¾'],
      'brave': ['ðŸ¦¸â€â™‚ï¸', "ðŸ¦¸â€â™€ï¸", 'ðŸ’ª', 'ðŸ”¥', 'ðŸ‘Š'],
      'shy': ['ðŸ˜³', 'â˜ºï¸', 'ðŸ™ˆ', 'ðŸ˜Š', 'ðŸ˜Œ'],
      'surprised': ['ðŸ˜²', 'ðŸ˜®', 'ðŸ˜§', 'ðŸ˜¯', 'ðŸ¤¯'],
      'bored': ['ðŸ˜', 'ðŸ˜‘', 'ðŸ˜¶', 'ðŸ™„', 'ðŸ˜’'],
      'sleepy': ['ðŸ˜´', 'ðŸ’¤', 'ðŸ˜ª', 'ðŸ˜Œ', 'ðŸ›Œ'],
      'determined': ['ðŸ’ª', 'ðŸ”¥', 'ðŸ˜¤', 'ðŸ‘Š', 'ðŸ†'],
      'birthday': ['ðŸŽ‚', 'ðŸŽ‰', 'ðŸŽˆ', 'ðŸŽŠ', 'ðŸ°'],
      'christmas': ['ðŸŽ„', 'ðŸŽ…', 'ðŸ¤¶', 'ðŸŽ', 'â›„'],
      "new year": ['ðŸŽ‰', 'ðŸŽŠ', 'ðŸŽ‡', 'ðŸ¾', 'âœ¨'],
      'easter': ['ðŸ°', 'ðŸ£', 'ðŸŒ·', 'ðŸ¥š', 'ðŸŒ¸'],
      'halloween': ['ðŸŽƒ', 'ðŸ‘»', 'ðŸ•¸ï¸', "ðŸ•·ï¸", 'ðŸ‘¹'],
      'valentine': ['ðŸ’˜', 'â¤ï¸', 'ðŸ’Œ', 'ðŸ’•', 'ðŸŒ¹'],
      'wedding': ['ðŸ’', 'ðŸ‘°', 'ðŸ¤µ', 'ðŸŽ©', 'ðŸ’’']
    };
    const _0x5bfe57 = ['ðŸ˜Ž', 'ðŸ”¥', 'ðŸ’¥', 'ðŸ’¯', 'âœ¨', 'ðŸŒŸ', 'ðŸŒˆ', 'âš¡', 'ðŸ’Ž', 'ðŸŒ€', 'ðŸ‘‘', 'ðŸŽ‰', 'ðŸŽŠ', 'ðŸ¦„', 'ðŸ‘½', 'ðŸ›¸', 'ðŸš€', 'ðŸ¦‹', 'ðŸ’«', 'ðŸ€', 'ðŸŽ¶', 'ðŸŽ§', 'ðŸŽ¸', 'ðŸŽ¤', 'ðŸ†', 'ðŸ…', 'ðŸŒ', 'ðŸŒŽ', 'ðŸŒ', 'ðŸŽ®', 'ðŸŽ²', 'ðŸ’ª', 'ðŸ‹ï¸', 'ðŸ¥‡', 'ðŸ‘Ÿ', 'ðŸƒ', 'ðŸš´', 'ðŸš¶', 'ðŸ„', 'â›·ï¸', "ðŸ•¶ï¸", 'ðŸ§³', 'ðŸ¿', 'ðŸ¿', 'ðŸ¥‚', 'ðŸ»', 'ðŸ·', 'ðŸ¸', 'ðŸ¥ƒ', 'ðŸ¾', 'ðŸŽ¯', 'â³', 'ðŸŽ', 'ðŸŽˆ', 'ðŸŽ¨', 'ðŸŒ»', 'ðŸŒ¸', 'ðŸŒº', 'ðŸŒ¹', 'ðŸŒ¼', 'ðŸŒž', 'ðŸŒ', 'ðŸŒœ', 'ðŸŒ™', 'ðŸŒš', 'ðŸ€', 'ðŸŒ±', 'ðŸƒ', 'ðŸ‚', 'ðŸŒ¾', 'ðŸ‰', 'ðŸ', 'ðŸ¦“', 'ðŸ¦„', 'ðŸ¦‹', 'ðŸ¦§', 'ðŸ¦˜', 'ðŸ¦¨', 'ðŸ¦¡', 'ðŸ‰', 'ðŸ…', 'ðŸ†', 'ðŸ“', 'ðŸ¢', 'ðŸŠ', 'ðŸ ', 'ðŸŸ', 'ðŸ¡', 'ðŸ¦‘', 'ðŸ™', 'ðŸ¦€', 'ðŸ¬', 'ðŸ¦•', 'ðŸ¦–', 'ðŸ¾', 'ðŸ•', 'ðŸˆ', 'ðŸ‡', 'ðŸ¾', 'ðŸ', 'ðŸ€', "ðŸ¿ï¸"];
    const _0x42e782 = _0x2aceed => {
      const _0x47b37e = _0x2aceed.split(/\s+/);
      for (const _0x10d49f of _0x47b37e) {
        const _0x597ecb = _0x26f9c1(_0x10d49f.toLowerCase());
        if (_0x597ecb) {
          return _0x597ecb;
        }
      }
      return _0x5bfe57[Math.floor(Math.random() * _0x5bfe57.length)];
    };
    const _0x26f9c1 = _0x16b39a => {
      const _0xcc31d4 = _0x1958d4[_0x16b39a.toLowerCase()];
      if (_0xcc31d4 && _0xcc31d4.length > 0x0) {
        return _0xcc31d4[Math.floor(Math.random() * _0xcc31d4.length)];
      }
      return null;
    };
    if (conf.AUTO_REACT_STATUS === "yes") {
      _0x127877.ev.on("messages.upsert", async _0x2a791a => {
        const {
          messages: _0x260db1
        } = _0x2a791a;
        for (const _0x4357a5 of _0x260db1) {
          if (_0x4357a5.key && _0x4357a5.key.remoteJid === "status@broadcast") {
            const _0x4e64ec = Date.now();
            if (_0x4e64ec - _0x22e9fe < 0x1388) {
              continue;
            }
            const _0xd97bf7 = _0x42e782(_0x4357a5.message?.["conversation"] || '');
            if (_0xd97bf7) {
              await rateLimitedSendMessage(_0x127877, _0x4357a5.key.remoteJid, {
                'react': {
                  'key': _0x4357a5.key,
                  'text': _0xd97bf7
                }
              });
              _0x22e9fe = Date.now();
            }
          }
        }
      });
    }
    if (conf.AUTO_REACT === 'yes') {
      _0x127877.ev.on('messages.upsert', async _0x6d7aca => {
        const {
          messages: _0x150a2e
        } = _0x6d7aca;
        for (const _0x1d083e of _0x150a2e) {
          if (_0x1d083e.key && _0x1d083e.key.remoteJid) {
            const _0x29d075 = Date.now();
            if (_0x29d075 - _0x22e9fe < 0x1388) {
              continue;
            }
            const _0x266771 = _0x42e782(_0x1d083e.message?.["conversation"] || '');
            if (_0x266771) {
              await rateLimitedSendMessage(_0x127877, _0x1d083e.key.remoteJid, {
                'react': {
                  'text': _0x266771,
                  'key': _0x1d083e.key
                }
              });
              _0x22e9fe = Date.now();
            }
          }
        }
      });
    }
    if (conf.AUTO_REACT_STATUS === 'yes') {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0x127877.ev.on("messages.upsert", async _0x3f877e => {
        const {
          messages: _0x334c63
        } = _0x3f877e;
        for (const _0x1e41bf of _0x334c63) {
          if (_0x1e41bf.key && _0x1e41bf.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x1e41bf.key.remoteJid);
            const _0x3f8a68 = Date.now();
            if (_0x3f8a68 - _0x22e9fe < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x5e9279 = _0x127877.user && _0x127877.user.id ? _0x127877.user.id.split(':')[0x0] + "@s.whatsapp.net" : null;
            if (!_0x5e9279) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0x1a1953 = _0x1e41bf?.["message"]?.['conversation'] || '';
            const _0x386430 = _0x42e782(_0x1a1953) || _0x5bfe57[Math.floor(Math.random() * _0x5bfe57.length)];
            if (_0x386430) {
              await _0x127877.sendMessage(_0x1e41bf.key.remoteJid, {
                'react': {
                  'key': _0x1e41bf.key,
                  'text': _0x386430
                }
              }, {
                'statusJidList': [_0x1e41bf.key.participant, _0x5e9279]
              });
              _0x22e9fe = Date.now();
              console.log("Successfully reacted with '" + _0x386430 + "' to status update by " + _0x1e41bf.key.remoteJid);
            }
            await delay(0x7d0);
          }
        }
      });
    }
    if (conf.AUTO_REACT === 'yes') {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x127877.ev.on('messages.upsert', async _0x1a0dd7 => {
        const {
          messages: _0x28a8a9
        } = _0x1a0dd7;
        for (const _0x5ed742 of _0x28a8a9) {
          if (_0x5ed742.key && _0x5ed742.key.remoteJid) {
            const _0xb0d2ca = Date.now();
            if (_0xb0d2ca - _0x22e9fe < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x14a057 = _0x5ed742?.["message"]?.['conversation'] || '';
            const _0x1e567d = _0x42e782(_0x14a057) || _0x5bfe57[Math.floor(Math.random() * _0x5bfe57.length)];
            if (_0x1e567d) {
              await _0x127877.sendMessage(_0x5ed742.key.remoteJid, {
                'react': {
                  'text': _0x1e567d,
                  'key': _0x5ed742.key
                }
              }).then(() => {
                _0x22e9fe = Date.now();
                console.log("Successfully reacted with '" + _0x1e567d + "' to message by " + _0x5ed742.key.remoteJid);
              })["catch"](_0x5d334a => {
                console.error("Failed to send reaction:", _0x5d334a);
              });
            }
            await delay(0x7d0);
          }
        }
      });
    }
    async function _0x49b87c(_0x50c1be, _0x2a0aec) {
      try {
        const _0x31b38f = _0x50c1be.split('@')[0x0];
        let _0x1804ca = 0x1;
        let _0x50fcdf = _0x2a0aec + " " + _0x1804ca;
        while (Object.values(store.contacts).some(_0xb447bc => _0xb447bc.name === _0x50fcdf)) {
          _0x1804ca++;
          _0x50fcdf = _0x2a0aec + " " + _0x1804ca;
        }
        const _0x245611 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x50fcdf + "\nTEL;type=CELL;type=VOICE;waid=" + _0x31b38f + ':+' + _0x31b38f + "\nEND:VCARD\n";
        const _0x3855b6 = './' + _0x50fcdf + ".vcf";
        fs.writeFileSync(_0x3855b6, _0x245611);
        await _0x127877.sendMessage(conf.NUMERO_OWNER + '@s.whatsapp.net', {
          'document': {
            'url': _0x3855b6
          },
          'mimetype': "text/vcard",
          'fileName': _0x50fcdf + ".vcf",
          'caption': "Contact saved as " + _0x50fcdf + ". Please import this vCard to add the number to your contacts.\n\nðŸš€ Ê™á´¡á´ xá´á´… Ê™Ê ÉªÊ™Ê€á´€ÊœÉªá´ á´€á´…á´€á´s"
        });
        console.log("vCard created and sent for: " + _0x50fcdf + " (" + _0x50c1be + ')');
        fs.unlinkSync(_0x3855b6);
        return _0x50fcdf;
      } catch (_0x435e49) {
        console.error("Error creating or sending vCard for " + name + ':', _0x435e49.message);
      }
    }
    _0x127877.ev.on("messages.upsert", async _0x405650 => {
      if (conf.AUTO_SAVE_CONTACTS !== "yes") {
        return;
      }
      const {
        messages: _0x42ab0c
      } = _0x405650;
      const _0x3ad61a = _0x42ab0c[0x0];
      if (!_0x3ad61a.message) {
        return;
      }
      const _0x640c91 = _0x3ad61a.key.remoteJid;
      if (_0x640c91.endsWith("@s.whatsapp.net") && (!store.contacts[_0x640c91] || !store.contacts[_0x640c91].name)) {
        const _0xc85083 = await _0x49b87c(_0x640c91, "ðŸš€ Ê™á´¡á´ xá´á´…");
        store.contacts[_0x640c91] = {
          'name': _0xc85083
        };
        await _0x127877.sendMessage(_0x640c91, {
          'text': "Hello! Your name has been saved as \"" + _0xc85083 + "\" in our system.\n\nðŸš€ Ê™á´¡á´ xá´á´… Ê™Ê ÉªÊ™Ê€á´€ÊœÉªá´ á´€á´…á´€á´s"
        });
        console.log("Contact " + _0xc85083 + " has been saved and notified.");
      }
    });
    async function _0x57f06d(_0xf514a2, _0x5bc149, _0x43e1ec) {
      try {
        await _0x43e1ec.sendMessage(_0xf514a2, {
          'text': "âŒ› Generating vCard file for all group members. This may take a few moments..."
        });
        const _0x4bee1e = await _0x43e1ec.groupMetadata(_0xf514a2);
        const _0x121053 = _0x4bee1e.participants;
        const _0xac4803 = _0x5bc149 + '_' + _0x4bee1e.subject.replace(/\s+/g, '_') + ".vcf";
        const _0x122d3d = './' + _0xac4803;
        const _0x4c4a3b = fs.createWriteStream(_0x122d3d);
        _0x121053.forEach((_0x6d3a5f, _0x4c1ede) => {
          const _0x5c03f7 = _0x6d3a5f.id.split('@')[0x0];
          const _0x5d8ad7 = _0x5bc149 + " " + (_0x4c1ede + 0x1);
          _0x4c4a3b.write("BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x5d8ad7 + "\nTEL;type=CELL;type=VOICE;waid=" + _0x5c03f7 + ':+' + _0x5c03f7 + "\nEND:VCARD\n\n");
        });
        _0x4c4a3b.end();
        _0x4c4a3b.on("finish", async () => {
          await _0x43e1ec.sendMessage(_0xf514a2, {
            'document': {
              'url': _0x122d3d
            },
            'mimetype': "text/vcard",
            'fileName': _0xac4803,
            'caption': "Here is the vCard file containing all " + _0x121053.length + " members of this group: " + _0x4bee1e.subject + ".\n\nðŸš€ Ê™á´¡á´ xá´á´… Ê™Ê ÉªÊ™Ê€á´€ÊœÉªá´ á´€á´…á´€á´s"
          });
          fs.unlinkSync(_0x122d3d);
          console.log("vCard file created and sent for group: " + _0x4bee1e.subject);
        });
        _0x4c4a3b.on("error", _0x312fe9 => {
          console.error("Error writing vCard file: " + _0x312fe9.message);
        });
      } catch (_0x34fd97) {
        console.error("Error creating or sending vCard file for group " + _0xf514a2 + ':', _0x34fd97.message);
        await _0x43e1ec.sendMessage(_0xf514a2, {
          'text': "âŒ Error generating the vCard file for this group. Please try again later.\n\nðŸš€ Ê™á´¡á´ xá´á´… Ê™Ê ÉªÊ™Ê€á´€ÊœÉªá´ á´€á´…á´€á´s"
        });
      }
    }
    _0x127877.ev.on("messages.upsert", async _0x19fcd5 => {
      const {
        messages: _0x12439e
      } = _0x19fcd5;
      const _0x291e8b = _0x12439e[0x0];
      if (!_0x291e8b.message) {
        return;
      }
      const _0x4153d5 = _0x291e8b.message.conversation || _0x291e8b.message.extendedTextMessage?.["text"] || '';
      const _0x56dfef = _0x291e8b.key.remoteJid;
      if (_0x4153d5.slice(0x1).toLowerCase() === "vcard" && _0x56dfef.endsWith("@g.us")) {
        await _0x57f06d(_0x56dfef, "ðŸš€ Ê™á´¡á´ xá´á´…", _0x127877);
      }
    });
    let _0xac65f3 = "Hello, I am Bwm xmd. My owner is currently unavailable. Please leave a message, and he will get back to you as soon as possible.";
    let _0x4cc78f = new Set();
    _0x127877.ev.on("messages.upsert", async _0xe75159 => {
      const {
        messages: _0x279b44
      } = _0xe75159;
      const _0x15ba06 = _0x279b44[0x0];
      if (!_0x15ba06.message) {
        return;
      }
      const _0x207cf2 = _0x15ba06.message.conversation || _0x15ba06.message.extendedTextMessage?.["text"];
      const _0x485d00 = _0x15ba06.key.remoteJid;
      if (_0x207cf2 && _0x207cf2.match(/^[^\w\s]/) && _0x15ba06.key.fromMe) {
        const _0x4e0fe1 = _0x207cf2[0x0];
        const _0x183aa1 = _0x207cf2.slice(0x1).split(" ")[0x0];
        const _0x37b81f = _0x207cf2.slice(_0x4e0fe1.length + _0x183aa1.length).trim();
        if (_0x183aa1 === 'setautoreply' && _0x37b81f) {
          _0xac65f3 = _0x37b81f;
          await _0x127877.sendMessage(_0x485d00, {
            'text': "Auto-reply message has been updated to:\n\"" + _0xac65f3 + "\""
          });
          return;
        }
      }
      if (conf.AUTO_REPLY === "yes" && !_0x4cc78f.has(_0x485d00) && !_0x15ba06.key.fromMe && !_0x485d00.includes("@g.us")) {
        await _0x127877.sendMessage(_0x485d00, {
          'text': _0xac65f3
        });
        _0x4cc78f.add(_0x485d00);
      }
    });
    async function _0x2d0c60(_0x25ac26) {
      const _0x5e41cc = Object.keys(_0x25ac26)[0x0].replace("Message", '');
      try {
        const _0x2b7a4b = await _0x127877.downloadContentFromMessage(_0x25ac26[_0x5e41cc], _0x5e41cc);
        let _0x4487d7 = Buffer.from([]);
        for await (const _0x565c2c of _0x2b7a4b) {
          _0x4487d7 = Buffer.concat([_0x4487d7, _0x565c2c]);
        }
        return _0x4487d7;
      } catch (_0x3926cc) {
        console.error("Error downloading media:", _0x3926cc);
        return null;
      }
    }
    function _0x1a7765(_0x474378) {
      const _0x507e89 = _0x474378.key.participant || _0x474378.key.remoteJid;
      const _0x3d12e9 = new Intl.DateTimeFormat("en-KE", {
        'timeZone': "Africa/Nairobi",
        'dateStyle': "full",
        'timeStyle': "medium"
      }).format(new Date());
      let _0x1c9883 = "*[ANTIDELETE DETECTED]*\n\n";
      _0x1c9883 += "*Time:* " + _0x3d12e9 + "\n";
      _0x1c9883 += "*Deleted By:* @" + _0x507e89.split('@')[0x0] + "\n\n";
      return _0x1c9883;
    }
    _0x127877.ev.on("messages.upsert", async _0x280931 => {
      if (conf.ANTIDELETE2 === 'yes') {
        const {
          messages: _0x52588f
        } = _0x280931;
        const _0x40740e = _0x52588f[0x0];
        if (!_0x40740e.message) {
          return;
        }
        const _0x279f7f = _0x40740e.key;
        const _0x34f6ef = _0x279f7f.remoteJid;
        if (!store.chats[_0x34f6ef]) {
          store.chats[_0x34f6ef] = [];
        }
        store.chats[_0x34f6ef].push(_0x40740e);
        if (_0x40740e.message.protocolMessage && _0x40740e.message.protocolMessage.type === 0x0) {
          const _0xecfd3e = _0x40740e.message.protocolMessage.key;
          const _0x59075b = store.chats[_0x34f6ef];
          const _0x27d5f2 = _0x59075b.find(_0x4d9e59 => _0x4d9e59.key.id === _0xecfd3e.id);
          if (_0x27d5f2) {
            try {
              const _0x4b2f05 = _0x1a7765(_0x27d5f2);
              const _0x1b52bc = Object.keys(_0x27d5f2.message)[0x0];
              if (_0x1b52bc === 'conversation' || _0x1b52bc === "extendedTextMessage") {
                await _0x127877.sendMessage(conf.NUMERO_OWNER + '@s.whatsapp.net', {
                  'text': _0x4b2f05 + ("*Message:* " + _0x27d5f2.message[_0x1b52bc].text),
                  'mentions': [_0x27d5f2.key.participant]
                });
              } else {
                if (_0x1b52bc === "imageMessage" || _0x1b52bc === "videoMessage" || _0x1b52bc === 'documentMessage' || _0x1b52bc === "audioMessage" || _0x1b52bc === "stickerMessage" || _0x1b52bc === "voiceMessage") {
                  const _0x5d5cdd = await _0x2d0c60(_0x27d5f2.message);
                  if (_0x5d5cdd) {
                    const _0x496cf6 = _0x1b52bc.replace("Message", '').toLowerCase();
                    await _0x127877.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
                      [_0x496cf6]: _0x5d5cdd,
                      'caption': _0x4b2f05,
                      'mentions': [_0x27d5f2.key.participant]
                    });
                  }
                }
              }
            } catch (_0x358955) {
              console.error("Error handling deleted message:", _0x358955);
            }
          }
        }
      }
    });
    _0x127877.ev.on("messages.upsert", async _0x3e286d => {
      if (conf.ANTIDELETE1 === "yes") {
        const {
          messages: _0x5c1dce
        } = _0x3e286d;
        const _0x1fc062 = _0x5c1dce[0x0];
        if (!_0x1fc062.message) {
          return;
        }
        const _0x36e699 = _0x1fc062.key;
        const _0x2478dc = _0x36e699.remoteJid;
        if (!store.chats[_0x2478dc]) {
          store.chats[_0x2478dc] = [];
        }
        store.chats[_0x2478dc].push(_0x1fc062);
        if (_0x1fc062.message.protocolMessage && _0x1fc062.message.protocolMessage.type === 0x0) {
          const _0x26df1f = _0x1fc062.message.protocolMessage.key;
          const _0x4b460e = store.chats[_0x2478dc];
          const _0x35e585 = _0x4b460e.find(_0x514dce => _0x514dce.key.id === _0x26df1f.id);
          if (_0x35e585) {
            try {
              const _0xcfcbf5 = _0x1a7765(_0x35e585);
              if (_0x35e585.message.conversation) {
                await _0x127877.sendMessage(_0x2478dc, {
                  'text': _0xcfcbf5 + ("*Message:* " + _0x35e585.message.conversation),
                  'mentions': [_0x35e585.key.participant]
                });
              } else {
                if (_0x35e585.message.imageMessage || _0x35e585.message.videoMessage || _0x35e585.message.documentMessage || _0x35e585.message.audioMessage || _0x35e585.message.stickerMessage || _0x35e585.message.voiceMessage) {
                  const _0x1fbbca = await _0x2d0c60(_0x35e585.message);
                  if (_0x1fbbca) {
                    const _0xc7e3ba = _0x35e585.message.imageMessage ? "image" : _0x35e585.message.videoMessage ? 'video' : _0x35e585.message.documentMessage ? "document" : _0x35e585.message.audioMessage ? "audio" : _0x35e585.message.stickerMessage ? "sticker" : "audio";
                    await _0x127877.sendMessage(_0x2478dc, {
                      [_0xc7e3ba]: _0x1fbbca,
                      'caption': _0xcfcbf5,
                      'mentions': [_0x35e585.key.participant]
                    });
                  }
                }
              }
            } catch (_0x41518e) {
              console.error("Error handling deleted message:", _0x41518e);
            }
          }
        }
      }
    });
    const _0x1b2904 = {
      'hey': 'files/hey.wav',
      'hi': "files/hey.wav",
      'hey': "files/hey.wav",
      'he': 'files/hey.wav',
      'hello': "files/hello.wav",
      'mambo': "files/hey.wav",
      'niaje': 'files/hey.wav',
      'morning': "files/goodmorning.wav",
      'goodmorning': "files/goodmorning.wav",
      "weka up": 'files/goodmorning.wav',
      'night': "files/goodnight.wav",
      'goodnight': 'files/goodnight.wav',
      'sleep': "files/goodnight.wav",
      'oyaah': "files/mkuu.wav",
      'mkuu': 'files/mkuu.wav',
      'mahn': "files/mkuu.wav",
      'owoh': "files/mkuu.wav",
      'yoo': "files/mkuu.wav",
      'wazii': "files/mkuu.wav",
      'dev': 'files/ibrahim.wav',
      'ibraah': "files/ibrahim.wav",
      'ibrah': "files/ibrahim.wav",
      'ibrahim': "files/ibrahim.wav",
      'adams': "files/ibrahim.wav",
      'bot': "files/bwm.mp3",
      'bwm': 'files/bwm.mp3',
      'xmd': "files/bwm.mp3",
      'bmw': "files/bwm.mp3",
      'md': "files/bwm.mp3",
      "whatsapp bot": "files/bwm.mp3",
      "bmw md": 'files/bwm.mp3',
      'evening': "files/goodevening.wav",
      'goodevening': 'files/goodevening.wav',
      'darling': "files/darling.wav",
      'beb': "files/darling.wav",
      'mpenzi': 'files/darling.wav',
      'afternoon': "files/goodafternoon.wav",
      'jion': "files/goodafternoon.wav",
      'kaka': 'files/kaka.wav',
      'bro': 'files/morio.mp3',
      'ndugu': "files/kaka.wav",
      'morio': "files/morio.mp3",
      'mzee': "files/morio.mp3",
      'kijina': "files/mkuu.wav",
      'mkuu': "files/mkuu.wav",
      'ozah': "files/mkuu.wav",
      'ozaah': 'files/mkuu.wav',
      'oyaah': "files/mkuu.wav",
      'oyah': 'files/mkuu.wav'
    };
    const _0x3b8638 = _0x4223c8 => {
      const _0x381b44 = _0x4223c8.split(/\s+/);
      for (const _0x479ca0 of _0x381b44) {
        const _0x2d2027 = _0x1b2904[_0x479ca0.toLowerCase()];
        if (_0x2d2027) {
          return _0x2d2027;
        }
      }
      return null;
    };
    if (conf.AUDIO_REPLY === 'yes') {
      console.log("AUTO_REPLY_AUDIO is enabled. Listening for messages...");
      _0x127877.ev.on("messages.upsert", async _0x3940dd => {
        try {
          const {
            messages: _0x467bb2
          } = _0x3940dd;
          for (const _0x281f9c of _0x467bb2) {
            if (!_0x281f9c.key || !_0x281f9c.key.remoteJid) {
              continue;
            }
            const _0x3747d6 = _0x281f9c?.["message"]?.["conversation"] || '';
            const _0x3fc9e0 = _0x3b8638(_0x3747d6);
            if (_0x3fc9e0) {
              try {
                await fs.access(_0x3fc9e0);
                console.log("Replying with audio: " + _0x3fc9e0);
                await _0x127877.sendMessage(_0x281f9c.key.remoteJid, {
                  'audio': {
                    'url': _0x3fc9e0
                  },
                  'mimetype': "audio/mp4",
                  'ptt': true
                });
                console.log("Audio reply sent: " + _0x3fc9e0);
              } catch (_0xc918c2) {
                console.error("Error sending audio reply: " + _0xc918c2.message);
              }
            } else {
              console.log("No matching keyword detected. Skipping message.");
            }
            await new Promise(_0x2a293c => setTimeout(_0x2a293c, 0xbb8));
          }
        } catch (_0xeaef2c) {
          console.error("Error in message processing:", _0xeaef2c.message);
        }
      });
    }
    _0x127877.ev.on("messages.upsert", async _0x454410 => {
      const {
        messages: _0x210950
      } = _0x454410;
      const _0x1570d3 = _0x210950[0x0];
      if (!_0x1570d3.message) {
        return;
      }
      const _0x507eaf = _0x555f35 => {
        if (!_0x555f35) {
          return _0x555f35;
        }
        if (/:\d+@/gi.test(_0x555f35)) {
          0x0;
          let _0x140418 = baileys_1.jidDecode(_0x555f35) || {};
          return _0x140418.user && _0x140418.server && _0x140418.user + '@' + _0x140418.server || _0x555f35;
        } else {
          return _0x555f35;
        }
      };
      0x0;
      var _0x41010f = baileys_1.getContentType(_0x1570d3.message);
      var _0x47c587 = _0x41010f == 'conversation' ? _0x1570d3.message.conversation : _0x41010f == "imageMessage" ? _0x1570d3.message.imageMessage?.["caption"] : _0x41010f == "videoMessage" ? _0x1570d3.message.videoMessage?.['caption'] : _0x41010f == "extendedTextMessage" ? _0x1570d3.message?.["extendedTextMessage"]?.["text"] : _0x41010f == 'buttonsResponseMessage' ? _0x1570d3?.['message']?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x41010f == "listResponseMessage" ? _0x1570d3.message?.['listResponseMessage']?.["singleSelectReply"]?.["selectedRowId"] : _0x41010f == "messageContextInfo" ? _0x1570d3?.["message"]?.["buttonsResponseMessage"]?.['selectedButtonId'] || _0x1570d3.message?.['listResponseMessage']?.['singleSelectReply']?.["selectedRowId"] || _0x1570d3.text : '';
      var _0xffe6a9 = _0x1570d3.key.remoteJid;
      var _0x1ec14e = _0x507eaf(_0x127877.user.id);
      var _0x4b4736 = _0x1ec14e.split('@')[0x0];
      const _0x3d61c9 = _0xffe6a9?.["endsWith"]("@g.us");
      var _0x37d1c9 = _0x3d61c9 ? await _0x127877.groupMetadata(_0xffe6a9) : '';
      var _0x47f2ca = _0x3d61c9 ? _0x37d1c9.subject : '';
      var _0x1ee2f0 = _0x1570d3.message.extendedTextMessage?.['contextInfo']?.['quotedMessage'];
      var _0x4af601 = _0x507eaf(_0x1570d3.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x4451c8 = _0x3d61c9 ? _0x1570d3.key.participant ? _0x1570d3.key.participant : _0x1570d3.participant : _0xffe6a9;
      if (_0x1570d3.key.fromMe) {
        _0x4451c8 = _0x1ec14e;
      }
      var _0x1a69c5 = _0x3d61c9 ? _0x1570d3.key.participant : '';
      const {
        getAllSudoNumbers: _0x472030
      } = require("./lib/sudo");
      const _0x1c931f = _0x1570d3.pushName;
      const _0x25bf2c = await _0x472030();
      const _0x5f50f1 = [_0x4b4736, "254710772666", "254710772666", '254710772666', "254710772666", conf.NUMERO_OWNER].map(_0x33c065 => _0x33c065.replace(/[^0-9]/g) + '@s.whatsapp.net');
      const _0x377018 = _0x5f50f1.concat(_0x25bf2c);
      const _0x4ac55a = _0x377018.includes(_0x4451c8);
      var _0x25c88b = ["254710772666", "254710772666", '254710772666', "254710772666"].map(_0x3157a7 => _0x3157a7.replace(/[^0-9]/g) + '@s.whatsapp.net').includes(_0x4451c8);
      function _0x3f810a(_0x24d92b) {
        _0x127877.sendMessage(_0xffe6a9, {
          'text': _0x24d92b
        }, {
          'quoted': _0x1570d3
        });
      }
      console.log("\tCONSOLE MESSAGES");
      console.log("=========== NEW CONVERSATION ===========");
      if (_0x3d61c9) {
        console.log("MESSAGE FROM GROUP : " + _0x47f2ca);
      }
      console.log("MESSAGE SENT BY : [" + _0x1c931f + " : " + _0x4451c8.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("MESSAGE TYPE : " + _0x41010f);
      console.log("==================TEXT==================");
      console.log(_0x47c587);
      function _0x52a4fa(_0x405028) {
        let _0x1eeaae = [];
        for (_0x454410 of _0x405028) {
          if (_0x454410.admin == null) {
            continue;
          }
          _0x1eeaae.push(_0x454410.id);
        }
        return _0x1eeaae;
      }
      var _0x40f013 = conf.ETAT;
      if (_0x40f013 == 0x1) {
        await _0x127877.sendPresenceUpdate("available", _0xffe6a9);
      } else {
        if (_0x40f013 == 0x2) {
          await _0x127877.sendPresenceUpdate("composing", _0xffe6a9);
        } else if (_0x40f013 == 0x3) {
          await _0x127877.sendPresenceUpdate("recording", _0xffe6a9);
        } else {
          await _0x127877.sendPresenceUpdate('unavailable', _0xffe6a9);
        }
      }
      const _0x114788 = _0x3d61c9 ? await _0x37d1c9.participants : '';
      let _0x1784d9 = _0x3d61c9 ? _0x52a4fa(_0x114788) : '';
      const _0x3939f1 = _0x3d61c9 ? _0x1784d9.includes(_0x4451c8) : false;
      var _0x1afe1c = _0x3d61c9 ? _0x1784d9.includes(_0x1ec14e) : false;
      const _0x1f510c = _0x47c587 ? _0x47c587.trim().split(/ +/).slice(0x1) : null;
      const _0x5a48dd = _0x47c587 ? _0x47c587.startsWith(prefixe) : false;
      const _0x335c22 = _0x5a48dd ? _0x47c587.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x2b32e7 = conf.URL.split(',');
      function _0x18aaa4() {
        const _0x2e963c = Math.floor(Math.random() * _0x2b32e7.length);
        const _0x1f51ad = _0x2b32e7[_0x2e963c];
        return _0x1f51ad;
      }
      var _0x58a682 = {
        'superUser': _0x4ac55a,
        'dev': _0x25c88b,
        'verifGroupe': _0x3d61c9,
        'mbre': _0x114788,
        'membreGroupe': _0x1a69c5,
        'verifAdmin': _0x3939f1,
        'infosGroupe': _0x37d1c9,
        'nomGroupe': _0x47f2ca,
        'auteurMessage': _0x4451c8,
        'nomAuteurMessage': _0x1c931f,
        'idBot': _0x1ec14e,
        'verifZokouAdmin': _0x1afe1c,
        'prefixe': prefixe,
        'arg': _0x1f510c,
        'repondre': _0x3f810a,
        'mtype': _0x41010f,
        'groupeAdmin': _0x52a4fa,
        'msgRepondu': _0x1ee2f0,
        'auteurMsgRepondu': _0x4af601,
        'ms': _0x1570d3,
        'mybotpic': _0x18aaa4
      };
      if (conf.AUTO_READ === "yes") {
        _0x127877.ev.on("messages.upsert", async _0x589029 => {
          const {
            messages: _0x3837d4
          } = _0x589029;
          for (const _0x220080 of _0x3837d4) {
            if (!_0x220080.key.fromMe) {
              await _0x127877.readMessages([_0x220080.key]);
            }
          }
        });
      }
      if (_0x1570d3.key && _0x1570d3.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === 'yes') {
        await _0x127877.readMessages([_0x1570d3.key]);
      }
      if (_0x1570d3.key && _0x1570d3.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x1570d3.message.extendedTextMessage) {
          var _0x1222a8 = _0x1570d3.message.extendedTextMessage.text;
          await _0x127877.sendMessage(_0x1ec14e, {
            'text': _0x1222a8
          }, {
            'quoted': _0x1570d3
          });
        } else {
          if (_0x1570d3.message.imageMessage) {
            var _0x36f3cc = _0x1570d3.message.imageMessage.caption;
            var _0x49c61a = await _0x127877.downloadAndSaveMediaMessage(_0x1570d3.message.imageMessage);
            await _0x127877.sendMessage(_0x1ec14e, {
              'image': {
                'url': _0x49c61a
              },
              'caption': _0x36f3cc
            }, {
              'quoted': _0x1570d3
            });
          } else {
            if (_0x1570d3.message.videoMessage) {
              var _0x36f3cc = _0x1570d3.message.videoMessage.caption;
              var _0xccefee = await _0x127877.downloadAndSaveMediaMessage(_0x1570d3.message.videoMessage);
              await _0x127877.sendMessage(_0x1ec14e, {
                'video': {
                  'url': _0xccefee
                },
                'caption': _0x36f3cc
              }, {
                'quoted': _0x1570d3
              });
            }
          }
        }
      }
      if (!_0x25c88b && _0xffe6a9 == "120363158701337904@g.us") {
        return;
      }
      if (_0x47c587 && _0x4451c8.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x27ad04
        } = require("./lib/level");
        try {
          await _0x27ad04(_0x4451c8);
        } catch (_0x1d8dd6) {
          console.error(_0x1d8dd6);
        }
      }
      try {
        if (_0x1570d3.message[_0x41010f].contextInfo.mentionedJid && (_0x1570d3.message[_0x41010f].contextInfo.mentionedJid.includes(_0x1ec14e) || _0x1570d3.message[_0x41010f].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0xffe6a9 == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x4ac55a) {
            console.log('hummm');
            return;
          }
          let _0xc602b1 = require("./lib/mention");
          let _0x30ba44 = await _0xc602b1.recupererToutesLesValeurs();
          let _0x19b4a7 = _0x30ba44[0x0];
          if (_0x19b4a7.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x3bd9a1;
          if (_0x19b4a7.type.toLocaleLowerCase() === "image") {
            _0x3bd9a1 = {
              'image': {
                'url': _0x19b4a7.url
              },
              'caption': _0x19b4a7.message
            };
          } else {
            if (_0x19b4a7.type.toLocaleLowerCase() === 'video') {
              _0x3bd9a1 = {
                'video': {
                  'url': _0x19b4a7.url
                },
                'caption': _0x19b4a7.message
              };
            } else {
              if (_0x19b4a7.type.toLocaleLowerCase() === "sticker") {
                let _0x1b1d8e = new Sticker(_0x19b4a7.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['ðŸ¤©', 'ðŸŽ‰'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x2e9688 = await _0x1b1d8e.toBuffer();
                _0x3bd9a1 = {
                  'sticker': _0x2e9688
                };
              } else if (_0x19b4a7.type.toLocaleLowerCase() === "audio") {
                _0x3bd9a1 = {
                  'audio': {
                    'url': _0x19b4a7.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0x127877.sendMessage(_0xffe6a9, _0x3bd9a1, {
            'quoted': _0x1570d3
          });
        }
      } catch (_0x5d5266) {}
      try {
        const _0x24b397 = await verifierEtatJid(_0xffe6a9);
        if (_0x47c587.includes("https://") && _0x3d61c9 && _0x24b397) {
          console.log("lien detectÃ©");
          var _0x390db1 = _0x3d61c9 ? _0x1784d9.includes(_0x1ec14e) : false;
          if (_0x4ac55a || _0x3939f1 || !_0x390db1) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x57eb76 = {
            'remoteJid': _0xffe6a9,
            'fromMe': false,
            'id': _0x1570d3.key.id,
            'participant': _0x4451c8
          };
          var _0x54d580 = "lien detected, \n";
          var _0x1cc3ea = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "BWM-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['ðŸ¤©', 'ðŸŽ‰'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x1cc3ea.toFile("st1.webp");
          var _0x4a8a18 = await recupererActionJid(_0xffe6a9);
          if (_0x4a8a18 === "remove") {
            _0x54d580 += "message deleted \n @" + _0x4451c8.split('@')[0x0] + " removed from group.";
            await _0x127877.sendMessage(_0xffe6a9, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x127877.sendMessage(_0xffe6a9, {
              'text': _0x54d580,
              'mentions': [_0x4451c8]
            }, {
              'quoted': _0x1570d3
            });
            try {
              await _0x127877.groupParticipantsUpdate(_0xffe6a9, [_0x4451c8], 'remove');
            } catch (_0x530a87) {
              console.log("antiien ") + _0x530a87;
            }
            await _0x127877.sendMessage(_0xffe6a9, {
              'delete': _0x57eb76
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x4a8a18 === "delete") {
              _0x54d580 += "message deleted \n @" + _0x4451c8.split('@')[0x0] + " avoid sending link.";
              await _0x127877.sendMessage(_0xffe6a9, {
                'text': _0x54d580,
                'mentions': [_0x4451c8]
              }, {
                'quoted': _0x1570d3
              });
              await _0x127877.sendMessage(_0xffe6a9, {
                'delete': _0x57eb76
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x4a8a18 === "warn") {
                const {
                  getWarnCountByJID: _0x44b25f,
                  ajouterUtilisateurAvecWarnCount: _0x3c32b3
                } = require("./lib/warn");
                let _0x215b6e = await _0x44b25f(_0x4451c8);
                let _0x3f14d0 = conf.WARN_COUNT;
                if (_0x215b6e >= _0x3f14d0) {
                  var _0x71c7e1 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x127877.sendMessage(_0xffe6a9, {
                    'text': _0x71c7e1,
                    'mentions': [_0x4451c8]
                  }, {
                    'quoted': _0x1570d3
                  });
                  await _0x127877.groupParticipantsUpdate(_0xffe6a9, [_0x4451c8], 'remove');
                  await _0x127877.sendMessage(_0xffe6a9, {
                    'delete': _0x57eb76
                  });
                } else {
                  var _0x3553a5 = _0x3f14d0 - _0x215b6e;
                  var _0x4734fd = "Link detected , your warn_count was upgrade ;\n rest : " + _0x3553a5 + " ";
                  await _0x3c32b3(_0x4451c8);
                  await _0x127877.sendMessage(_0xffe6a9, {
                    'text': _0x4734fd,
                    'mentions': [_0x4451c8]
                  }, {
                    'quoted': _0x1570d3
                  });
                  await _0x127877.sendMessage(_0xffe6a9, {
                    'delete': _0x57eb76
                  });
                }
              }
            }
          }
        }
      } catch (_0x477e47) {
        console.log("bdd err " + _0x477e47);
      }
      try {
        const _0x469035 = _0x1570d3.key?.['id']?.["startsWith"]("BAES") && _0x1570d3.key?.['id']?.["length"] === 0x10;
        const _0x44b172 = _0x1570d3.key?.['id']?.["startsWith"]('BAE5') && _0x1570d3.key?.['id']?.["length"] === 0x10;
        if (_0x469035 || _0x44b172) {
          if (_0x41010f === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x47a88a = await atbverifierEtatJid(_0xffe6a9);
          if (!_0x47a88a) {
            return;
          }
          ;
          if (_0x3939f1 || _0x4451c8 === _0x1ec14e) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x96d0d3 = {
            'remoteJid': _0xffe6a9,
            'fromMe': false,
            'id': _0x1570d3.key.id,
            'participant': _0x4451c8
          };
          var _0x54d580 = "bot detected, \n";
          var _0x1cc3ea = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Bmw-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['ðŸ¤©', 'ðŸŽ‰'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x1cc3ea.toFile('st1.webp');
          var _0x4a8a18 = await atbrecupererActionJid(_0xffe6a9);
          if (_0x4a8a18 === "remove") {
            _0x54d580 += "message deleted \n @" + _0x4451c8.split('@')[0x0] + " removed from group.";
            await _0x127877.sendMessage(_0xffe6a9, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x127877.sendMessage(_0xffe6a9, {
              'text': _0x54d580,
              'mentions': [_0x4451c8]
            }, {
              'quoted': _0x1570d3
            });
            try {
              await _0x127877.groupParticipantsUpdate(_0xffe6a9, [_0x4451c8], "remove");
            } catch (_0x58f077) {
              console.log("antibot ") + _0x58f077;
            }
            await _0x127877.sendMessage(_0xffe6a9, {
              'delete': _0x96d0d3
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x4a8a18 === "delete") {
              _0x54d580 += "message delete \n @" + _0x4451c8.split('@')[0x0] + " Avoid sending link.";
              await _0x127877.sendMessage(_0xffe6a9, {
                'text': _0x54d580,
                'mentions': [_0x4451c8]
              }, {
                'quoted': _0x1570d3
              });
              await _0x127877.sendMessage(_0xffe6a9, {
                'delete': _0x96d0d3
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x4a8a18 === "warn") {
                const {
                  getWarnCountByJID: _0x545170,
                  ajouterUtilisateurAvecWarnCount: _0x1a3496
                } = require("./bdd/warn");
                let _0x16e911 = await _0x545170(_0x4451c8);
                let _0xc5b3aa = conf.WARN_COUNT;
                if (_0x16e911 >= _0xc5b3aa) {
                  var _0x71c7e1 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x127877.sendMessage(_0xffe6a9, {
                    'text': _0x71c7e1,
                    'mentions': [_0x4451c8]
                  }, {
                    'quoted': _0x1570d3
                  });
                  await _0x127877.groupParticipantsUpdate(_0xffe6a9, [_0x4451c8], "remove");
                  await _0x127877.sendMessage(_0xffe6a9, {
                    'delete': _0x96d0d3
                  });
                } else {
                  var _0x3553a5 = _0xc5b3aa - _0x16e911;
                  var _0x4734fd = "bot detected , your warn_count was upgrade ;\n rest : " + _0x3553a5 + " ";
                  await _0x1a3496(_0x4451c8);
                  await _0x127877.sendMessage(_0xffe6a9, {
                    'text': _0x4734fd,
                    'mentions': [_0x4451c8]
                  }, {
                    'quoted': _0x1570d3
                  });
                  await _0x127877.sendMessage(_0xffe6a9, {
                    'delete': _0x96d0d3
                  });
                }
              }
            }
          }
        }
      } catch (_0x574eee) {
        console.log(".... " + _0x574eee);
      }
      if (_0x5a48dd) {
        const _0x6e90c9 = evt.cm.find(_0x462fa2 => _0x462fa2.nomCom === _0x335c22);
        if (_0x6e90c9) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x4ac55a) {
              return;
            }
            if (!_0x4ac55a && _0xffe6a9 === _0x4451c8 && conf.PM_PERMIT === 'yes') {
              _0x3f810a("Sorry you don't have access to command this code");
              return;
            }
            if (!_0x4ac55a && _0x3d61c9) {
              let _0x274462 = await isGroupBanned(_0xffe6a9);
              if (_0x274462) {
                return;
              }
            }
            if (!_0x3939f1 && _0x3d61c9) {
              let _0x527d1a = await isGroupOnlyAdmin(_0xffe6a9);
              if (_0x527d1a) {
                return;
              }
            }
            if (!_0x4ac55a) {
              let _0x1aa758 = await isUserBanned(_0x4451c8);
              if (_0x1aa758) {
                _0x3f810a("You are banned from bot commands");
                return;
              }
            }
            reagir(_0xffe6a9, _0x127877, _0x1570d3, _0x6e90c9.reaction);
            _0x6e90c9.fonction(_0xffe6a9, _0x127877, _0x58a682);
          } catch (_0x1795d6) {
            console.log("ðŸ˜¡ðŸ˜¡ " + _0x1795d6);
            _0x127877.sendMessage(_0xffe6a9, {
              'text': "ðŸ˜¡ðŸ˜¡ " + _0x1795d6
            }, {
              'quoted': _0x1570d3
            });
          }
        }
      }
    });
    const {
      recupevents: _0x161968
    } = require("./lib/welcome");
    _0x127877.ev.on("group-participants.update", async _0xf86379 => {
      console.log(_0xf86379);
      let _0x17fc93;
      try {
        _0x17fc93 = await _0x127877.profilePictureUrl(_0xf86379.id, "image");
      } catch {
        _0x17fc93 = '';
      }
      try {
        const _0x1e92da = await _0x127877.groupMetadata(_0xf86379.id);
        if (_0xf86379.action == "add" && (await _0x161968(_0xf86379.id, "welcome")) == 'on') {
          let _0x1dfbcd = "*BWM XMD WELCOME MESSAGE*";
          let _0x55fa5e = _0xf86379.participants;
          for (let _0x191651 of _0x55fa5e) {
            _0x1dfbcd += " \nâ’ *Hey* ðŸ–ï¸ @" + _0x191651.split('@')[0x0] + " WELCOME TO OUR GROUP. \n\n";
          }
          _0x1dfbcd += "â’ *READ THE GROUP DESCRIPTION TO AVOID GETTING REMOVED* ";
          _0x127877.sendMessage(_0xf86379.id, {
            'image': {
              'url': _0x17fc93
            },
            'caption': _0x1dfbcd,
            'mentions': _0x55fa5e
          });
        } else {
          if (_0xf86379.action == "remove" && (await _0x161968(_0xf86379.id, "goodbye")) == 'on') {
            let _0x515bca = "One of our member have left the group;\n";
            let _0x9d8025 = _0xf86379.participants;
            for (let _0x189dc1 of _0x9d8025) {
              _0x515bca += '@' + _0x189dc1.split('@')[0x0] + "\n";
            }
            _0x127877.sendMessage(_0xf86379.id, {
              'text': _0x515bca,
              'mentions': _0x9d8025
            });
          } else {
            if (_0xf86379.action == 'promote' && (await _0x161968(_0xf86379.id, "antipromote")) == 'on') {
              if (_0xf86379.author == _0x1e92da.owner || _0xf86379.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0xf86379.author == decodeJid(_0x127877.user.id) || _0xf86379.author == _0xf86379.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x127877.groupParticipantsUpdate(_0xf86379.id, [_0xf86379.author, _0xf86379.participants[0x0]], 'demote');
              _0x127877.sendMessage(_0xf86379.id, {
                'text': '@' + _0xf86379.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0xf86379.author.split('@')[0x0] + " and @" + _0xf86379.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0xf86379.author, _0xf86379.participants[0x0]]
              });
            } else {
              if (_0xf86379.action == "demote" && (await _0x161968(_0xf86379.id, "antidemote")) == 'on') {
                if (_0xf86379.author == _0x1e92da.owner || _0xf86379.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0xf86379.author == decodeJid(_0x127877.user.id) || _0xf86379.author == _0xf86379.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x127877.groupParticipantsUpdate(_0xf86379.id, [_0xf86379.author], 'demote');
                await _0x127877.groupParticipantsUpdate(_0xf86379.id, [_0xf86379.participants[0x0]], "promote");
                _0x127877.sendMessage(_0xf86379.id, {
                  'text': '@' + _0xf86379.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0xf86379.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0xf86379.author, _0xf86379.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x2c23ba) {
        console.error(_0x2c23ba);
      }
    });
    async function _0x519970() {
      const _0x2cb90c = require("node-cron");
      const {
        getCron: _0xfddcdc
      } = require("./lib/cron");
      let _0x846dba = await _0xfddcdc();
      console.log(_0x846dba);
      if (_0x846dba.length > 0x0) {
        for (let _0x548b14 = 0x0; _0x548b14 < _0x846dba.length; _0x548b14++) {
          if (_0x846dba[_0x548b14].mute_at != null) {
            let _0x49216a = _0x846dba[_0x548b14].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x846dba[_0x548b14].group_id + " a " + _0x49216a[0x0] + " H " + _0x49216a[0x1]);
            _0x2cb90c.schedule(_0x49216a[0x1] + " " + _0x49216a[0x0] + " * * *", async () => {
              await _0x127877.groupSettingUpdate(_0x846dba[_0x548b14].group_id, "announcement");
              _0x127877.sendMessage(_0x846dba[_0x548b14].group_id, {
                'image': {
                  'url': "./files/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': 'Africa/Nairobi'
            });
          }
          if (_0x846dba[_0x548b14].unmute_at != null) {
            let _0xbc359f = _0x846dba[_0x548b14].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0xbc359f[0x0] + " H " + _0xbc359f[0x1] + " ");
            _0x2cb90c.schedule(_0xbc359f[0x1] + " " + _0xbc359f[0x0] + " * * *", async () => {
              await _0x127877.groupSettingUpdate(_0x846dba[_0x548b14].group_id, "not_announcement");
              _0x127877.sendMessage(_0x846dba[_0x548b14].group_id, {
                'image': {
                  'url': './files/chrono.webp'
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas Ã©tÃ© activÃ©s");
      }
      return;
    }
    _0x127877.ev.on("connection.update", async _0xb83a7c => {
      const {
        lastDisconnect: _0xb1852b,
        connection: _0x1ceff7
      } = _0xb83a7c;
      if (_0x1ceff7 === 'connecting') {
        console.log("â„¹ï¸ Bmw is connecting...");
      } else {
        if (_0x1ceff7 === "open") {
          console.log("âœ… Bmw Connected to WhatsApp! â˜ºï¸");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log('------------------/-----');
          console.log("Bmw Md is Online ðŸ•¸\n\n");
          console.log("Loading Bmw Commands ...\n");
          fs.readdirSync(__dirname + "/scs").forEach(_0x33b826 => {
            if (path.extname(_0x33b826).toLowerCase() == ".js") {
              try {
                require(__dirname + "/scs/" + _0x33b826);
                console.log(_0x33b826 + " Installed Successfullyâœ”ï¸");
              } catch (_0x17165c) {
                console.log(_0x33b826 + " could not be installed due to : " + _0x17165c);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x4e25ab;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x4e25ab = 'public';
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x4e25ab = 'private';
          } else {
            _0x4e25ab = "undefined";
          }
          console.log("Commands Installation Completed âœ…");
          await _0x519970();
          if (conf.DP.toLowerCase() === "yes") {
            let _0x3dd5b6 = " â â â â \nâ•”â•â•â•â•â• â– â€¢âœ¦\nâ•‘   SYSTEM ACTIVE\nâ•šâ•â•â•â•â• â– â€¢âœ¦\nâ•‘ Prefix: [ " + prefixe + " ]\nâ•‘ Mode: " + _0x4e25ab + "\nâ•‘ Version: 7.0.8\nâ•‘ Bot Name: BWM XMD\nâ•‘ Owner: Sir Ibrahim Adams\nâ•šâ•â•â•â•â• â– â€¢âœ¦\nâ•­â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”âŠ·\n\n*Stay Updated in our channel*\n \n> https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y\n\n*Heroku App Configuration*\n \n*Your Heroku App Name*\n> " + herokuAppName + "\n\n*Visit Heroku App*\n> " + herokuAppLink + "\n\n*Owner Number*\n> " + botOwner + "\n\nâ•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”âŠ·\n                \n                 ";
            await _0x127877.sendMessage(_0x127877.user.id, {
              'text': _0x3dd5b6
            });
          }
        } else {
          if (_0x1ceff7 == 'close') {
            let _0x33da32 = new boom_1.Boom(_0xb1852b?.["error"])?.["output"]['statusCode'];
            if (_0x33da32 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x33da32 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermÃ©e, reconnexion en cours ...");
                _0x236bae();
              } else {
                if (_0x33da32 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error ðŸ˜ž ,,, trying to reconnect... ");
                  _0x236bae();
                } else {
                  if (_0x33da32 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion rÃ©placÃ©e ,,, une sesssion est dÃ©jÃ  ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x33da32 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous Ãªtes dÃ©connectÃ©,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x33da32 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redÃ©marrage en cours â–¶ï¸");
                        _0x236bae();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x33da32);
                        const {
                          exec: _0x313e70
                        } = require("child_process");
                        _0x313e70("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x1ceff7);
            _0x236bae();
          }
        }
      }
    });
    _0x127877.ev.on("creds.update", _0x47c12b);
    _0x127877.downloadAndSaveMediaMessage = async (_0x2fc05c, _0x2ad90f = '', _0x249cd8 = true) => {
      let _0x191481 = _0x2fc05c.msg ? _0x2fc05c.msg : _0x2fc05c;
      let _0x4a0521 = (_0x2fc05c.msg || _0x2fc05c).mimetype || '';
      let _0x29e51 = _0x2fc05c.mtype ? _0x2fc05c.mtype.replace(/Message/gi, '') : _0x4a0521.split('/')[0x0];
      0x0;
      const _0x237e5a = await baileys_1.downloadContentFromMessage(_0x191481, _0x29e51);
      let _0x4763ea = Buffer.from([]);
      for await (const _0x492142 of _0x237e5a) {
        _0x4763ea = Buffer.concat([_0x4763ea, _0x492142]);
      }
      let _0x18231b = await FileType.fromBuffer(_0x4763ea);
      let _0x1993f8 = './' + _0x2ad90f + '.' + _0x18231b.ext;
      await fs.writeFileSync(_0x1993f8, _0x4763ea);
      return _0x1993f8;
    };
    _0x127877.awaitForMessage = async (_0x496d47 = {}) => {
      return new Promise((_0x53ae95, _0x52149e) => {
        if (typeof _0x496d47 !== "object") {
          _0x52149e(new Error("Options must be an object"));
        }
        if (typeof _0x496d47.sender !== "string") {
          _0x52149e(new Error("Sender must be a string"));
        }
        if (typeof _0x496d47.chatJid !== 'string') {
          _0x52149e(new Error("ChatJid must be a string"));
        }
        if (_0x496d47.timeout && typeof _0x496d47.timeout !== "number") {
          _0x52149e(new Error("Timeout must be a number"));
        }
        if (_0x496d47.filter && typeof _0x496d47.filter !== 'function') {
          _0x52149e(new Error("Filter must be a function"));
        }
        const _0x4b5140 = _0x496d47?.["timeout"] || undefined;
        const _0x3523a5 = _0x496d47?.["filter"] || (() => true);
        let _0x3960c8 = undefined;
        let _0x4d40c1 = _0x479254 => {
          let {
            type: _0x483272,
            messages: _0x503c6e
          } = _0x479254;
          if (_0x483272 == "notify") {
            for (let _0x248cdf of _0x503c6e) {
              const _0x79ed4c = _0x248cdf.key.fromMe;
              const _0x47e88c = _0x248cdf.key.remoteJid;
              const _0x82231f = _0x47e88c.endsWith("@g.us");
              const _0x10bc37 = _0x47e88c == "status@broadcast";
              const _0x44b71e = _0x79ed4c ? _0x127877.user.id.replace(/:.*@/g, '@') : _0x82231f || _0x10bc37 ? _0x248cdf.key.participant.replace(/:.*@/g, '@') : _0x47e88c;
              if (_0x44b71e == _0x496d47.sender && _0x47e88c == _0x496d47.chatJid && _0x3523a5(_0x248cdf)) {
                _0x127877.ev.off("messages.upsert", _0x4d40c1);
                clearTimeout(_0x3960c8);
                _0x53ae95(_0x248cdf);
              }
            }
          }
        };
        _0x127877.ev.on("messages.upsert", _0x4d40c1);
        if (_0x4b5140) {
          _0x3960c8 = setTimeout(() => {
            _0x127877.ev.off("messages.upsert", _0x4d40c1);
            _0x52149e(new Error("Timeout"));
          }, _0x4b5140);
        }
      });
    };
    return _0x127877;
  }
  let _0x2a39b4 = require.resolve(__filename);
  fs.watchFile(_0x2a39b4, () => {
    fs.unwatchFile(_0x2a39b4);
    console.log("mise Ã  jour " + __filename);
    delete require.cache[_0x2a39b4];
    require(_0x2a39b4);
  });
  _0x236bae();
}, 0x1388);
