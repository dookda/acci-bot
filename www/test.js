$(document).ready(function () {
    loadShp();
});



function loadShp() {
    $.get('http://cgi.uru.ac.th/geoserver/udparcel/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=udparcel%3Ahadla_parcel_4326&maxFeatures=50&outputFormat=application%2Fjson', (res) => {
        const fc = res.features;

        var degree = []
        fc.forEach(e => {
            const geom = e.geometry.coordinates[0][0];
            const n = geom.length;
            var i = 0;
            // console.log(n)
            // console.log(geom)
            var node;
            while (i < n - 1) {
                if (i + 1 == (n - 1)) {
                    node = [geom[i], geom[0], geom[1]]
                } else if (i + 2 == (n - 1)) {
                    node = [geom[i], geom[i + 1], geom[0]]
                } else {
                    node = [geom[i], geom[i + 1], geom[i + 2]]
                }
                i += 1
            }
            console.log(node)
        });
    })
}

// dg([100.31887729, 17.77519642], [100.3188885, 17.7759012], [100.31926458, 17.77589866])

function dg(a, b, c) {
    $.get(`http://localhost:3100/api/degree/${a[0]},${a[1]}/${b[0]},${b[1]}/${c[0]},${c[1]}`, (res) => {
        var dg = JSON.parse(res)
        // console.log(dg.data[0])
        return dg.data[0].degree;
    })
}