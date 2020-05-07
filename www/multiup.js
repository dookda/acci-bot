$(document).ready(function () {
    console.log('ddd')
    $('dd')
});

async function bt2() {
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service']
    })
        .then(device => device.gatt.connect())
        .then(server => {
            // Getting Battery Service...
            return server.getPrimaryService('battery_service');
        })
        .then(service => {
            // Getting Battery Level Characteristic...
            return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
            // Reading Battery Level...
            return characteristic.readValue();
        })
        .then(value => {
            console.log('Battery percentage is ' + value.getUint8(0));
        })
        .catch(error => { console.log(error); });
}

async function bt() {
    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
        .then(device => {
            // Human-readable name of the device.
            console.log(device.name);

            // Attempts to connect to remote GATT Server.
            return device.gatt.connect();
        })
        .then(server => {
            console.log(server)
        })
        .catch(error => { console.log(error); });

    // let filters = [];

    // filters.push({ services: ['battery_service'] });

    // navigator.bluetooth.requestDevice({ filters: filters })
    //     .then(device => {
    //         return device.gatt.connect();
    //     })
    //     .then(server => {
    //         console.log('Getting Battery Service...');
    //         return server.getPrimaryService('battery_service');
    //     })
    //     .then(service => {
    //         console.log('Getting Battery Level Characteristic...');
    //         return service.getCharacteristic('battery_level');
    //     })
    //     .then(characteristic => {
    //         console.log('Reading Battery Level...');
    //         return characteristic.readValue();
    //     })
    //     .then(value => {
    //         let batteryLevel = value.getUint8(0);
    //         console.log('> Battery Level is ' + batteryLevel + '%');
    //     })
    //     .catch(error => {
    //         console.log('Argh! ' + error);
    //     });
}


