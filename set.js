




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ05uYnJhN1g0MXdBTDN0VFZIRGZxWkwva1R2UkRKajF4NUQybWZjU3ZXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0FVQ0NaU3VrbjNBYmJabEFsdGE0Tld1SllMaXpHZlpzSjlub1NydDhqWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1Q1Z3REFPL0dacW9JRTA0SVFpM1RkdUZSTEFtREQ3YmJzVEM0NGFBQ1YwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvcWVSM1p5VnczbENhUkdCeW9IVkFjMDZoeDBYeWFUUUMwekg5UURSdkZjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtBRENsR2tudG5nekVWbnNkQjZIbFdKcTUvRDRnd3ZtY3RONWxDQ1lGMkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1BR1pENndnMFpYTXk1My9WYzFiTms1bkNmMVBnU1U3Rmg1N0VuNUhaaGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0I1aVE5K0NUeCtQMGtDb1czR3QzY0pSVm1YK1UxeFlNVTJ3T00zdHFVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGFEOS9NaVBYVTVIZ29rQXZySzNqWm5aQTlCbElmeVY5RmhJcFJQay9tcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndCdjQwaStSWGJzVTErM21DNkRCaFhjMXF2a0FabXVDQjk5cEp5SkhrZ3lUQkVsZWM5VXdMbHA1YzZ3RWY0V3grQjQ4UWRDbUxCM01sWnYxb0V3b0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjcsImFkdlNlY3JldEtleSI6ImFKL2UwcHhoRFoxOUJIV1VncjZOSzVMWWlHazMvY2UwM01BZ1pJRGZLT3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMTgyOTM1MTE1MzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTBDMjAyNTY2Q0U4NEIyMjU3NkREQjJBRTQ2OTBGRjQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDk5NTkyOH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMTgyOTM1MTE1MzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRDk3OEM5QzA2NjFFRDVFRkU5QUFDQzdFQTY2QTZEQjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDk5NTk0N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiVEdSVEMzUVkiLCJtZSI6eyJpZCI6IjE4MjkzNTExNTMxOjk0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCTg7XwnZut6p2bIC3wnZCD8J2bpfCdkYbwnZuo8J2br/CdmrTwnZup8JODtSIsImxpZCI6IjYxNDQ0MzU1ODA5MzAxOjk0QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSkdTNHNNSEVMNm4rTUlHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieHpYOXJDWGMxN1poMnQzY0tTdG9UNjgvRkJtM0ZkZ05IZjdYUlVmSE0xUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVnhuMXRoZUQ1RDBzTlEzK2tWbVdFMXQvY25IM0wyUWdGTEdWL0JDQ2NXaUMzM1RHVk91KzFWVk5FNUR2SFRwaVpMTERCeUlodkVtc01ZYW1KRExKQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IllOVHRLbEtuSTBNc0JLd3RGWDVrSmRuaE5CS1ZQS2pJbjRqazdXcHFNVjFmaTBGd1VQZnNkRDczcWdOZ1lqZFhYSEZtNExZdVdqbXJkbWdBY3Rhc0NRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTgyOTM1MTE1MzE6OTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY2MxL2F3bDNOZTJZZHJkM0NrcmFFK3ZQeFFadHhYWURSMysxMFZIeHpOVSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwOTk1OTE1LCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUEE1In0= ',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "18293511531",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "mr dacheno ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
