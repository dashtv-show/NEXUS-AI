




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUF1REYySWJwREwrTG16RDhpeW51eHZtVHlMbG9mNVBxdlU5RW5rRktuaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTRYU0NKMDJneU14YWJ5b1dMQTlwbjFFcFNvcjhjZjJFSkJqK1owdEFtQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLRTJudUtuMkJsZ1FFMkc4cks3UjBtL2xtcWtiMW9DaFh1U2ZnU0l6N1hBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkbXkwQmRUNnpHSVJKK3lMbmoydDFNZ1ZTLy90a1M1MzRDNEVzcXk1clJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlBblRnVlJ4Q2tGRC9zSXh2MHBCYXJTSzNVSU45N0hLKytidnNXOGVuV3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxDVHBHYXNJaUh3ZTJtUEl2dTk1MjNYK2FDQ3hvbXhyZ2M0QkRpUnovblE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUZZbVB6TjlxMkNPWDVGb2c2RlRMR0cwSStldkkwbWphWkd4Q2xTYWlGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEhDSTFteUdEZC82eVhxS1l3QlR0U0Y4bFhuOTE4ejFTYm9pVVVWME5XOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRyN0JveGZ6ZmNtUGo0SmRvRnpWVEhsdDZYZGQ4ajhiUkJ3Y1ZrME9HTDhFVmZCWU54QzIxTzEzUk80TkRWZk9ZL2h1UzFlUU9nUkdiQk9Ta043QmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg5LCJhZHZTZWNyZXRLZXkiOiJKbWpRZEZkN3lncDMvV1ZNc094QnhaVVhGeEZxTkdZWGtrazROOXZTMC9ZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjE4MjkzNTExNTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjRGRDg0NDFDQkM5RTI2N0QwRUFBNTRFOTlDRjEwRTNFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEwNTEzMDN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjE4MjkzNTExNTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjlBQzQ0MEEyQkIwMTY3NzZDNTI5M0M4NzlDQ0RFQjA1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEwNTEzMDl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjE4MjkzNTExNTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjRDQTAzNzkyRThCNTMzMTUwQUE4OTI2QjIxRUNBMjEwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEwNTEzMTd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjE4MjkzNTExNTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE1REYwMjJDOTI0M0QxMTlCQUIyRTBDQzE2QjM3RUYyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEwNTEzMzl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlFGWTJSR05BIiwibWUiOnsiaWQiOiIxODI5MzUxMTUzMTozQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdm61SUyBMRcOPU1NBIiwibGlkIjoiNjE0NDQzNTU4MDkzMDE6M0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0phUzRzTUhFSlhZKzhJR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Inh6WDlyQ1hjMTdaaDJ0M2NLU3RvVDY4L0ZCbTNGZGdOSGY3WFJVZkhNMVE9IiwiYWNjb3VudFNpZ25hdHVyZSI6InNQL29lNW1Zc1hVUDNKeTMvYTFRakhJVG9adUVqRmNySUZRTGRwdUkyRy9oc1J4QWpQd0QxVE0zVjR1TkMwNGUweENsT1VvR0d6dGZ4QlBVa0E0Q0NBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0K2UyM1NUcWlGYjFTRzNORjVTcFZ2UGVhUnEyemJERHIzMlJsOGt2MDIxYjFmZHYwUllRWUhlMUovazRTdnEvY2t2OFZpRExFaXJ0OUZFWVc2NzRqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjE4MjkzNTExNTMxOjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY2MxL2F3bDNOZTJZZHJkM0NrcmFFK3ZQeFFadHhYWURSMysxMFZIeHpOVSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxMDUxMjk4LCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT3BUIn0=',
    PREFIXE: process.env.PREFIX || "'",
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
