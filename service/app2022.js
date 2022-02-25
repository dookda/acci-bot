const express = require('express');
const app = express.Router();
const con = require("./db");
const th = con.th;
const ac = con.ac;

app.post("/acc-api/get-acc-by-amp", (req, res) => {
    let { amp } = req.body;
    let sql;
    if (amp == "ทั้งหมด") {
        sql = `SELECT gid, pkid, acc_place, to_char(acc_date, 'yyyy') as yyyy, 
    acc_date, acc_time, pro, amp, tam, x, y, vehicle, ST_AsGeoJSON(geom) as geojson 
    FROM acc_info  ORDER BY acc_date DESC`;
    } else {
        sql = `SELECT gid, pkid, acc_place, to_char(acc_date, 'yyyy') as yyyy, 
    acc_date, acc_time, pro, amp, tam, x, y, vehicle, ST_AsGeoJSON(geom) as geojson 
    FROM acc_info WHERE amp='${amp}' ORDER BY acc_date DESC`;
    }

    // console.log(sql);
    ac.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        });
    });
});

app.post("/acc-api/get-acc-by-select-one", (req, res) => {
    let { pkid } = req.body;
    const sql = `SELECT gid, pkid, acc_place, to_char(acc_date, 'yyyy') as yyyy, 
                acc_date, acc_time, pro, amp, tam, x, y, vehicle, ST_AsGeoJSON(geom) as geojson 
                FROM acc_info WHERE pkid='${pkid}'`;
    ac.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        });
    });
});

module.exports = app;