const express = require('express');
const app = express.Router();
const con = require("./db");
const th = con.th;
const ac = con.ac;

app.get('/api/degree/:a/:b/:c', (req, res, next) => {
    const a = req.params.a;
    const b = req.params.b;
    const c = req.params.c;

    const sql = `select degrees(ST_Angle(
        ST_Point(${a}), 
        ST_Point(${b}), 
        ST_Point(${c})
    )) as degree`;

    ac.query(sql).then((data) => {
        // res.send(JSON.stringify({
        //     data: data.rows
        // }));
        res.status(200).json({
            data: data.rows
        });
    })
})

app.get('/acc-api/get', (req, res, next) => {
    const sql = `SELECT *, to_char(acc_date, 'DD TMMonth YYYY') as accdate FROM accident ORDER BY gid desc`;
    ac.query(sql).then((data) => {
        res.send(JSON.stringify({
            data: data.rows
        }));
    }).catch((err) => {
        return next(err);
    })
});

app.get('/acc-api/getinfo', (req, res, next) => {
    const sql = `SELECT *, to_char(acc_date, 'DD TMMonth YYYY') as accdate FROM acc_info ORDER BY acc_date desc`;
    ac.query(sql).then((data) => {
        res.send(JSON.stringify({
            data: data.rows
        }));
    }).catch((err) => {
        return next(err);
    })
});

app.post('/acc-api/getimg', (req, res, next) => {
    const { pkid } = req.body;
    const sql = `SELECT img FROM acc_img WHERE pkid = $1`;
    const val = [pkid];
    ac.query(sql, val).then((data) => {
        res.send(JSON.stringify(data.rows));
    }).catch((err) => {
        return next(err);
    })
});

app.post('/acc-api/getname', (req, res, next) => {
    const { pkid } = req.body;
    const sql = `SELECT * FROM acc_name WHERE pkid = $1`;
    const val = [pkid];
    ac.query(sql, val).then((data) => {
        res.send(JSON.stringify(data.rows));
    }).catch((err) => {
        return next(err);
    })
});

// insert feature
app.post('/acc-api/insert', (req, res) => {
    const {
        first_name,
        last_name,
        id_card,
        age,
        sex,
        acc_date,
        acc_time,
        acc_place,
        x,
        y,
        vehicle,
        injury_type,
        alcohol,
        behaviour,
        to_hospital,
        death_info,
        transfer_type,
        transfer_by,
        death_date,
        death_time,
        geom
    } = req.body;

    const sql = `INSERT INTO accident(
        first_name,    
        last_name,    
        id_card,    
        age,        
        sex,        
        acc_date,        
        acc_time,        
        acc_place,
        x,y,        
        vehicle,        
        injury_type,
        alcohol,        
        behaviour,        
        to_hospital,        
        death_info,
        transfer_type,        
        transfer_by,        
        death_date,        
        death_time,
        geom
    )VALUES(
        '${first_name}',
        '${last_name}',
        ${id_card},
        ${age},
        '${sex}',
        '${acc_date}',
        '${acc_time}',
        '${acc_place}',
        ${x},${y},
        '${vehicle}',
        '${injury_type}',
        '${alcohol}',
        '${behaviour}',
        '${to_hospital}',
        '${death_info}',
        '${transfer_type}',
        '${transfer_by}',
        '${death_date}',
        '${death_time}',
        ST_SetSRID(st_geomfromgeojson('${geom}'), 4326)
    )`;

    console.log(sql);

    ac.query(sql)
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'insert ok'
            });
        })
});

app.post('/acc-api/update', (req, res) => {
    const {
        gid,
        first_name,
        last_name,
        id_card,
        age,
        sex,
        acc_date,
        acc_time,
        acc_place,
        x, y,
        vehicle,
        injury_type,
        alcohol,
        behaviour,
        to_hospital,
        death_info,
        transfer_type,
        transfer_by,
        death_date,
        death_time,
        geom
    } = req.body;

    const sql = `UPDATE accident SET                 
       first_name = '${first_name}',
       last_name = '${last_name}',
       id_card = ${id_card},
       age = ${age},
       sex ='${sex}',
       acc_date = '${acc_date}',
       acc_time = '${acc_time}',
       acc_place =  '${acc_place}',
       x=  ${x}, y=${y},
       vehicle= '${vehicle}',
       injury_type= '${injury_type}',
       alcohol='${alcohol}',
       behaviour ='${behaviour}',
       to_hospital = '${to_hospital}',
       death_info= '${death_info}',
       transfer_type= '${transfer_type}',
       transfer_by='${transfer_by}',
       death_date=  '${death_date}',
       death_time= '${death_time}',
       geom= ST_SetSRID(st_geomfromgeojson('${geom}'), 4326)
       WHERE gid = ${gid}`;

    console.log(sql);

    ac.query(sql)
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'update ok'
            });
        })
});

app.post('/acc-api/delete', (req, res) => {
    const { gid, first_name } = req.body;
    const sql = `DELETE FROM accident WHERE gid = ${gid} and first_name = '${first_name}'`;
    ac.query(sql).then(() => {
        res.status(200).json({
            status: 'success',
            message: `deleted ${gid}`
        })
    })
})

app.get('/acc-api/getaccident', (req, res) => {
    const sql = 'SELECT  *, st_x(geom) as lon, st_y(geom) as lat  FROM accident';
    let jsonFeatures = [];
    ac.query(sql).then((data) => {
        var rows = data.rows;
        rows.forEach((e) => {
            let feature = {
                type: 'Feature',
                properties: e,
                geometry: {
                    type: 'Point',
                    coordinates: [e.lon, e.lat]
                }
            };
            jsonFeatures.push(feature);
        });
        let geoJson = {
            type: 'FeatureCollection',
            features: jsonFeatures
        };
        res.status(200).json({
            count: data.rowCount,
            data: geoJson
        });
    });
});

app.get('/acc-api/getaddress/:lat/:lon', (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const buff = 10;
    const sql = `SELECT tam_name, amp_name, pro_name FROM tambon_4326 
    WHERE ST_DWithin(ST_Transform(geom,3857), 
    ST_Transform(ST_GeomFromText('POINT(${lon} ${lat})',4326), 3857), ${buff}) = 'true'`;
    th.query(sql)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                message: 'get disease',
                data: data.rows
            });
        })
});

app.post('/acc-api/lineinsert', (req, res) => {
    const { name, acc_place, tam, amp, pro, x, y, vehicle, img, geom } = req.body;
    const pkid = 'pid' + Date.now();
    // date'03/03/2014' time'02:03:04'
    const sql = 'INSERT INTO acc_info (acc_place,tam,amp,pro,x,y,vehicle,pkid,acc_date,acc_time,geom) ' +
        'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,now(),now(),ST_SetSRID(st_geomfromgeojson($9), 4326))';
    const val = [acc_place, tam, amp, pro, x, y, vehicle, pkid, geom];

    console.log(val)
    ac.query(sql, val)
        .then(() => {
            console.log('ok')
        })

    name.forEach(a => {
        const nameSql = 'INSERT INTO acc_name (pkid,aname) VALUES ($1,$2)';
        const nameVal = [pkid, a];
        ac.query(nameSql, nameVal)
            .then(() => {
                console.log(a)
            })
    })

    const imgSql = 'INSERT INTO acc_img (pkid,img) VALUES ($1,$2)';
    const imgVal = [pkid, img];
    ac.query(imgSql, imgVal)
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'insert data'
            });
        })
});

app.get('/acc-api/riskpoint', (req, res, next) => {
    const sql = `SELECT *, st_x(geom) as lon, st_y(geom) as lat FROM ud_riskpoint_4326`;
    let jsonFeatures = [];
    ac.query(sql).then((data) => {
        var rows = data.rows;
        rows.forEach((e) => {
            let feature = {
                type: 'Feature',
                properties: e,
                geometry: {
                    type: 'Point',
                    coordinates: [e.lon, e.lat]
                }
            };
            jsonFeatures.push(feature);
        });
        let geoJson = {
            type: 'FeatureCollection',
            features: jsonFeatures
        };
        res.status(200).json(geoJson);
    });
});

app.get('/acc-api/riskpoint/:lat/:lon/:buff', (req, res, next) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const buff = req.params.buff;
    const sql = `SELECT *, st_x(geom) as lon, st_y(geom) as lat FROM ud_riskpoint_4326
    WHERE ST_DWithin(ST_Transform(geom,3857), 
    ST_Transform(ST_GeomFromText('POINT(${lon} ${lat})',4326), 3857), ${buff}) = 'true'`;
    let jsonFeatures = [];
    ac.query(sql).then((data) => {
        var rows = data.rows;
        rows.forEach((e) => {
            let feature = {
                type: 'Feature',
                properties: e,
                geometry: {
                    type: 'Point',
                    coordinates: [e.lon, e.lat]
                }
            };
            jsonFeatures.push(feature);
        });
        let geoJson = {
            type: 'FeatureCollection',
            features: jsonFeatures
        };
        res.status(200).json({
            count: data.rowCount,
            data: geoJson
        });
    });
});

// pin api
app.post("/acc-api/pin-insert", (req, res) => {
    const { sname, stype, sdesc, img, geom } = req.body;
    const pkid = "img" + Date.now();
    const sql =
        "INSERT INTO ud_riskpoint_4326 (sname, stype, sdesc, pkid, img, geom) " +
        "VALUES ($1,$2,$3,$4,$5,ST_SetSRID(st_geomfromgeojson($6), 4326))";
    const val = [sname, stype, sdesc, pkid, img, geom];
    console.log(sql)
    console.log(val);

    ac.query(sql, val).then((r) => {
        res.status(200).json({
            status: "success",
            message: "insert data"
        });
    });
});

app.post("/acc-api/pin-update", (req, res) => {
    const { sname, stype, sdesc, img, geom, id } = req.body;
    let sql, val;
    if (img == "-") {
        sql =
            "UPDATE ud_riskpoint_4326 SET sname=$1,stype=$2,sdesc=$3," +
            "geom=ST_SetSRID(st_geomfromgeojson($4), 4326) WHERE id=$6";
        val = [sname, stype, sdesc, geom, id];
    } else {
        sql =
            "UPDATE ud_riskpoint_4326 SET sname=$1,stype=$2,sdesc=$3,img=$4," +
            "geom=ST_SetSRID(st_geomfromgeojson($5), 4326) WHERE id=$6";
        val = [sname, stype, sdesc, img, geom, id];
    }

    // console.log(val)
    ac.query(sql, val).then(() => {
        res.status(200).json({
            status: "success",
            message: "insert data"
        });
    });
});

app.get("/acc-api/pin-getdata", (req, res) => {
    const sql =
        "SELECT id,sname,stype,sdesc,simg,pkid,img,st_x(geom) as lon,st_y(geom) as lat FROM ud_riskpoint_4326";
    let jsonFeatures = [];
    ac.query(sql).then(data => {
        var rows = data.rows;
        rows.forEach(e => {
            // console.log(e.img)
            let feature = {
                type: "Feature",
                properties: e,
                geometry: {
                    type: "Point",
                    coordinates: [e.lon, e.lat]
                }
            };
            jsonFeatures.push(feature);
        });
        let geoJson = {
            type: "FeatureCollection",
            features: jsonFeatures
        };
        res.status(200).json(geoJson);
    });
});

app.get("/acc-api/pin-getimg/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT id,img FROM acc_img WHERE id = $1";
    val = [id];
    ac.query(sql, val).then(data => {
        res.status(200).json({
            status: "success",
            message: "get disease",
            data: data.rows
        });
    });
});

app.post("/acc-api/pin-delete", (req, res) => {
    const { id } = req.body;
    console.log(id);
    const sql = "DELETE FROM ud_riskpoint_4326 WHERE id=$1";
    const val = [id];
    ac.query(sql, val).then(() => {
        res.status(200).json({
            status: "success",
            message: "deleted data"
        });
    });
});

module.exports = app;