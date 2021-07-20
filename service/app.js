const express = require('express');
const app = express.Router();
const con = require("./db");
const th = con.th;
const ac = con.ac;


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
        const nameSql = 'INSERT INTO acc_name (pkid,first_name) VALUES ($1,$2)';
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
    const { sname, stype, img, geom } = req.body;
    const pkid = "img" + Date.now();
    const sql = "INSERT INTO ud_riskpoint_4326 (sname, stype, pkid, img, date_notify, geom) " +
        "VALUES ($1,$2,$3,$4,now(),ST_SetSRID(st_geomfromgeojson($5), 4326))";
    const val = [sname, stype, pkid, img, geom];
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
        sql = "UPDATE ud_riskpoint_4326 SET sname=$1,stype=$2,sdesc=$3," +
            "geom=ST_SetSRID(st_geomfromgeojson($4), 4326) WHERE id=$6";
        val = [sname, stype, sdesc, geom, id];
    } else {
        sql = "UPDATE ud_riskpoint_4326 SET sname=$1,stype=$2,sdesc=$3,img=$4," +
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

app.post("/acc-api/pin-getdata", (req, res) => {
    const { start, end } = req.body;
    console.log(start, end)
    const sql = `SELECT gid,tam_code, tname, aname, pvname, sname,stype,sdesc,simg,pkid,img,date_notify,
    st_x(geom) as lon,st_y(geom) as lat, status_fix, validation 
    FROM ud_riskpoint_4326_v WHERE date_notify between $1 and $2`;
    let val = [start, end]
    let jsonFeatures = [];
    ac.query(sql, val).then(data => {
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

app.post("/acc-api/pin-getdata-sum-tam", (req, res) => {
    const { start, end } = req.body;
    console.log(start, end)
    const sql = `SELECT concat('ต.', tname, ' อ.', aname) as place,  count(gid) as cnt
    FROM ud_riskpoint_4326_v
    WHERE date_notify BETWEEN $1 AND $2
    GROUP BY tname, aname
    ORDER BY aname`;
    let val = [start, end]
    ac.query(sql, val).then(data => {
        res.status(200).json({
            status: 'success',
            data: data.rows
        });
    });
});

app.post("/acc-api/pin-getdata-sum-amp", (req, res) => {
    const { start, end } = req.body;
    console.log(start, end)
    const sql = `SELECT concat('อ.', aname) as place,  count(gid) as cnt
    FROM ud_riskpoint_4326_v
    WHERE date_notify BETWEEN $1 AND $2
    GROUP BY aname
    ORDER BY aname`;
    let val = [start, end]
    ac.query(sql, val).then(data => {
        res.status(200).json({
            status: 'success',
            data: data.rows
        });
    });
});

app.get("/acc-api/pin-getdata/:gid", (req, res) => {
    const gid = req.params.gid;
    const sql = "SELECT * FROM ud_riskpoint_4326 WHERE gid=" + gid;

    ac.query(sql).then(data => {
        res.status(200).json({
            status: "success",
            data: data.rows
        });
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

app.post('/acc-api/pin-risk-solve', (req, res) => {
    let { validation, status_fix, date_fix, gid } = req.body;
    let sql = 'UPDATE ud_riskpoint_4326 SET validation=$1, status_fix=$2, date_fix=$3 WHERE gid=$4';
    let val = [validation, status_fix, date_fix, gid]
    ac.query(sql, val).then(() => {
        res.status(200).json({
            status: "success",
            message: "updated data"
        });
    })
})


app.post('/acc-api/pin-risk-remove', (req, res) => {
    let { gid } = req.body;
    // console.log(gid)
    const sql = 'DELETE FROM ud_riskpoint_4326 WHERE gid=$1';
    const val = [gid];

    ac.query(sql, val).then(() => {
        res.status(200).json({
            status: "success",
            message: "delete data"
        });
    })
})

// new form
app.post('/acc-api/forminsert', async (req, res) => {
    const { acc_place, acc_date, acc_time, pro, amp, tam, x, y, vehicle, disputant, to_hospital, transfer_type, img, arrObj } = req.body;
    // console.log(req.body)
    let acc_date_edit = acc_date == '' ? null : acc_date;
    let acc_time_edit = acc_time == '' ? null : acc_time;
    let x_edit = Number(x);
    let y_edit = Number(y);

    const pkid = 'pid' + Date.now();
    const sql = 'INSERT INTO acc_info (acc_place, acc_date, acc_time, pro, amp, tam, x, y, vehicle, disputant, to_hospital, transfer_type, pkid, geom) ' +
        'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,ST_SetSRID(ST_MakePoint($8, $7), 4326))';
    const val = [acc_place, acc_date_edit, acc_time_edit, pro, amp, tam, x_edit, y_edit, vehicle, disputant, to_hospital, transfer_type, pkid];

    await ac.query(sql, val).then(() => {
        console.log('acc_info ok')
    })

    await arrObj.forEach(a => {
        let death_date_edit = a.death_date == '' ? null : a.death_date;
        let death_time_edit = a.death_time == '' ? null : a.death_time;
        let age_edit = Number(a.age);
        const nameSql = 'INSERT INTO acc_name (pkid,title_name, first_name, last_name, type, id_card, age, sex, p_place, injury_type, alcohol, behaviour, death_info, death_date, death_time) ' +
            'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)';
        const nameVal = [pkid, a.title_name, a.first_name, a.last_name, a.type, a.id_card, age_edit, a.sex, a.p_place, a.injury_type, a.alcohol, a.behaviour, a.death_info, death_date_edit, death_time_edit];
        // console.log(nameSql)
        ac.query(nameSql, nameVal).then(() => {
            console.log('acc_name ok')
        })
    })

    const imgSql = 'INSERT INTO acc_img (pkid,img) VALUES ($1,$2)';
    const imgVal = [pkid, img];
    await ac.query(imgSql, imgVal).then(() => {
        console.log('acc_img ok')
        res.status(200).json({
            status: 'success',
            message: 'insert data'
        });
    })
});

app.post('/acc-api/formupdate', async (req, res) => {
    const { acc_place, acc_date, acc_time, pro, amp, tam, x, y, vehicle, disputant, to_hospital, transfer_type, pkid, arrObj } = req.body;
    // console.log(req.body)
    let acc_date_edit = acc_date == '' ? null : acc_date;
    let acc_time_edit = acc_time == '' ? null : acc_time;
    let x_edit = Number(x);
    let y_edit = Number(y);

    const sql = 'UPDATE acc_info SET acc_place=$1, acc_date=$2, acc_time=$3,' +
        'pro=$4, amp=$5, tam=$6, x=$7, y=$8, vehicle=$9, disputant=$10,' +
        'to_hospital=$11, transfer_type=$12, geom=ST_SetSRID(ST_MakePoint($8, $7), 4326)' +
        'WHERE pkid=$13;'

    const val = [acc_place, acc_date_edit, acc_time_edit, pro, amp, tam, x_edit, y_edit, vehicle, disputant, to_hospital, transfer_type, pkid];

    await ac.query(sql, val).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'insert data'
        });
    })

    await arrObj.forEach(a => {
        let death_date_edit = a.death_date == '' ? null : a.death_date;
        let death_time_edit = a.death_time == '' ? null : a.death_time;
        let age_edit = Number(a.age);

        const nameSql = 'UPDATE acc_name SET title_name=$1, first_name=$2, last_name=$3,' +
            'type=$4, id_card=$5, age=$6, sex=$7, p_place=$8, injury_type=$9, alcohol=$10,' +
            'behaviour=$11, death_info=$12, death_date=$13, death_time=$14' +
            'WHERE pkid=$15 AND gid=$16;'

        const nameVal = [a.title_name, a.first_name, a.last_name, a.type, a.id_card, age_edit, a.sex, a.p_place, a.injury_type, a.alcohol, a.behaviour, a.death_info, death_date_edit, death_time_edit, pkid, a.gid];
        ac.query(nameSql, nameVal).then(() => {
            console.log('acc_name ok')
        })
    })
});

app.get("/acc-api/get-acc-info-geojson/:start/:end", (req, res) => {
    let start = req.params.start;
    let end = req.params.end;
    // console.log(start, end)
    const sql = `SELECT gid, pkid, acc_place, to_char(acc_date, 'yyyy') as yyyy, 
                acc_date, acc_time, pro, amp, tam, x, y, vehicle, st_x(geom) as lon,st_y(geom) as lat 
                FROM acc_info WHERE acc_date between $1 and $2 ORDER BY acc_date DESC`;
    let val = [start, end]
    let jsonFeatures = [];
    ac.query(sql, val).then(data => {
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

app.get('/acc-api/get-acc-info', (req, res) => {
    const sql = "SELECT * FROM acc_info ORDER BY gid DESC";
    ac.query(sql).then(data => {
        res.status(200).json({
            data: data.rows
        });
    });
})

app.get('/acc-api/get-acc-info/:pkid', (req, res) => {
    let pkid = req.params.pkid;
    const sql = `SELECT * FROM acc_info WHERE pkid = '${pkid}' ORDER BY gid DESC`;
    ac.query(sql).then(data => {
        res.status(200).json({
            data: data.rows
        });
    });
})

app.get('/acc-api/get-acc-name/:pkid', (req, res) => {
    let pkid = req.params.pkid;
    const sql = `SELECT * FROM acc_name WHERE pkid = '${pkid}' ORDER BY gid DESC`;
    ac.query(sql).then(data => {
        res.status(200).json({
            data: data.rows
        });
    });
})

app.get('/acc-api/get-acc-img/:pkid', (req, res) => {
    let pkid = req.params.pkid;
    const sql = `SELECT * FROM acc_img WHERE pkid = '${pkid}' ORDER BY gid DESC`;
    ac.query(sql).then(data => {
        res.status(200).json({
            data: data.rows
        });
    });
})

app.post('/acc-api/formremove', async (req, res) => {
    const { pkid } = req.body;

    const sql = 'DELETE FROM acc_info WHERE pkid=$1';
    const val = [pkid];

    await ac.query(sql, val).then(() => {
        console.log('acc_info ok')
    })

    const nameSql = 'DELETE FROM acc_name WHERE pkid=$1';
    const nameVal = [pkid];

    await ac.query(nameSql, nameVal).then(() => {
        console.log('acc_name ok')
    })

    const imgSql = 'DELETE FROM acc_img WHERE pkid=$1';
    const imgVal = [pkid];

    await ac.query(imgSql, imgVal).then(() => {
        console.log('acc_img ok')
        res.status(200).json({
            status: 'success',
            message: 'delete data'
        });
    })
});

app.post("/acc-api/alcohol-insert", (req, res) => {
    const { rname, sname, stype, tel, img, geom } = req.body;

    const pkid = "img" + Date.now();
    const sql = "INSERT INTO ud_alcohol_4326 (rname, sname, stype, tel, pkid, img, date_notify, geom) " +
        "VALUES ($1,$2,$3,$4,$5,$6,now(),ST_SetSRID(st_geomfromgeojson($7), 4326))";
    const val = [rname, sname, stype, tel, pkid, img, geom];
    // console.log(sql)
    // console.log(val);

    ac.query(sql, val).then((r) => {
        res.status(200).json({
            status: "success",
            message: "insert data"
        });
    });
});

app.post("/acc-api/alcohol-update", (req, res) => {
    const { gid, rname, sname, stype, tel, status } = req.body;

    const sql = `UPDATE ud_alcohol_4326 
        SET rname='${rname}',sname='${sname}',stype='${stype}',tel='${tel}', status='${status}',date_notify=now()
        WHERE gid=${gid} `;
    // console.log(sql);
    ac.query(sql).then((r) => {
        res.status(200).json({
            status: "success",
            message: "insert data"
        });
    });
});

app.get('/acc-api/alcohol-get', (req, res) => {
    const sql = `SELECT gid, rname, sname, stype, tel, status, TO_CHAR(date_notify, 'DD Mon YYYY') as date_notify,
            st_x(geom) as lon, st_y(geom) as lat 
            FROM ud_alcohol_4326 ORDER BY date_notify DESC`;
    ac.query(sql).then(data => {
        res.status(200).json({
            data: data.rows
        });
    });
})

app.post('/acc-api/alcohol-getimg', (req, res) => {
    const { gid } = req.body;
    const sql = `SELECT img FROM ud_alcohol_4326 WHERE gid=${gid}`;
    ac.query(sql).then(data => {
        res.status(200).json({
            data: data.rows
        });
    });
})

app.post('/acc-api/alcohol-delete', (req, res) => {
    const { gid } = req.body;
    const sql = `DELETE FROM ud_alcohol_4326 WHERE gid=${gid}`;
    ac.query(sql).then(data => {
        res.status(200).json({
            data: "success"
        });
    });
})

module.exports = app;