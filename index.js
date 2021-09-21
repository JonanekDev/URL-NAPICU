const express = require("express");
const RateLimit = require("express-rate-limit");
const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER
})

db.connect((e) => {
    if (e) {
        throw e;
    }
    console.log("Napoejní na Mysql bylo úspěšné!");
    setInterval(() => {
        db.ping();
    }, 10 * 60 * 1000);
})

const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("main");
})

app.get("/api/url/:url", (req, res) => {
    db.query("SELECT * FROM `URLNapicu` WHERE `URL` LIKE '" + req.params.url + "' LIMIT 1", (e, result) => {
        if (e || result.length < 1) {
            //TODO: Nějaké design 
            res.send("Omlouváme se, ale nastala chyba. Nepodařilo se najít hlednaou URL ");
            return;
        }
        res.redirect(result[0].REDIRECT_URL);
    })
})

app.get("/api/regurl/:url", RateLimit({
    windowMs: 24 * 60 * 60 * 100,
    max: 1,
    message: {err: 6969}
}),(req, res) => {
    console.log(req.params);
    const config = require("./config.json");
    if (!req.params.url || !req.query.redirect){
        res.json({err: 4});
        return;
    }
    if (!req.query.redirect.startsWith("http")){
        res.json({err: 5});
        return;
    }
    if (config.rezerovaneSubDomeny.includes(req.params.url.toLocaleLowerCase())) {
        res.json({err: 1});
        return;
    }
    db.query("SELECT * FROM `URLNapicu` WHERE URL LIKE '" + req.params.url.toLocaleLowerCase() + "' LIMIT 1", (e, result) => {
        if (result.length > 0) {
            res.json({err: 2});
        } else {
            const ZnakyNapicu = /[!@#$%^&*ěščřžýáíéťď()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if(ZnakyNapicu.test(req.params.url)){
                res.json({err: 3});
            } else {
                db.query("INSERT INTO `URLNapicu`(`URL`, `REDIRECT_URL`) VALUES ('" + req.params.url + "', '" + req.query.redirect + "')", (e2, result2) => {
                    if (e2) {
                        res.json({err: 6});
                        return;
                    }
                    res.json({err: 69});
                })
            }
        }
    })
})

const port = process.env.WEB_PORT || 8080;
app.listen(port, () => console.log("WEb běží na portu " + port + "! Tak užívej a nezlob."));