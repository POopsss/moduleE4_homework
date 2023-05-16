function  HomeLine(name) {
  this.name = name;
  this.devices = new Map();
  this.deviceID = 1;
}
HomeLine.prototype.addDevice = function (device) {
  if (!this.devices.has(device.type)) {
    this.devices.set(device.type, new Map());
  }
  this.devices.get(device.type).set(this.deviceID, device);
  device.id = this.deviceID;
  this.deviceID++;
}
HomeLine.prototype.rmDevice = function (device) {
  this.devices.get(device.type).delete(device.id);
}
HomeLine.prototype.getInfo = function () {
  let energy_usage = 0;
  let enabled_device = [];
  for (let type of this.devices.values()) {
    for (let device of type.values()) {
      if (device.enabled) {
        energy_usage += device.power;
        enabled_device.push(device);
      }
    }
  }
  return {energy_usage, enabled_count: enabled_device.length, enabled_device,}
}


function Device(name, power, type) {
  this.id = '';
  this.type = type;
  this.enabled = false;
  this.power = power;
}
Device.prototype.turnOn = function (){
  this.enabled = true;
}
Device.prototype.turnOff = function (){
  this.enabled = true;
}


function Lighting(name, socket, power) {
  this.name = name;
  this.type = 'lighting';
  if (!power){
    this.power = 0;
  } else this.power = power;
  this.lamp = {};
  this.socket = socket;
  this.free_socket = [];
  for (let i= 0; i < this.socket; i++) {
    this.free_socket.push(i);
  }
}
Lighting.prototype = new Device()
Lighting.prototype.addLamp = function (lamp) {
  this.lamp[this.free_socket[0]] = lamp;
  lamp.id = this.free_socket[0];
  this.free_socket.shift();
  this.power += lamp.power;
}
Lighting.prototype.rmLamp = function (lamp) {
  delete this.lamp[lamp.id];
  this.free_socket.push(lamp.id);
  lamp.id = '';
  this.power += - lamp.power;
}


function Lamp(type, power) {
  this.id = '';
  this.type = type;
  this.power = power;
}


function WaterHeater(name, power, volume) {
  this.name = name;
  this.type = 'waterheater'
  this.power = power;
  this.volume = volume;
}
WaterHeater.prototype = new Device();


function TV(name, power, diagonal) {
  this.name = name;
  this.type = 'tv';
  this.power = power;
  this.diagonal = diagonal;
}
TV.prototype = new Device();



const home1 = new HomeLine('home1');
const home2 = new HomeLine('home2');
const lamp1 = new Lighting('lamp1', 6);
const lamp2 = new Lighting('lamp1', 2);
const lamp3 = new Lighting('lamp3', 0, 5);
const diode1 = new Lamp('diode', 1.5);
const diode2 = new Lamp('diode', 1.5);
const diode3 = new Lamp('diode', 1.5);
const filament1 = new Lamp('filament', 20);
const boiler1 = new WaterHeater('boiler1', 800, 2);
const boiler2 = new WaterHeater('boiler2', 2000, 30);
const monitor1 = new TV('monitor1', 25, 30);
const monitor2 = new TV('monitor2', 13, 17);

lamp1.addLamp(diode1);
lamp1.addLamp(diode2);
lamp1.addLamp(diode3);
lamp2.addLamp(filament1);

home1.addDevice(lamp1);
home2.addDevice(lamp3);
home1.addDevice(boiler1);
home1.addDevice(boiler2);
home1.addDevice(monitor1);
home2.addDevice(monitor2);

lamp1.turnOn();
lamp3.turnOn();
boiler2.turnOn();
monitor1.turnOn();
monitor2.turnOn();

console.log(home1.getInfo());
console.log(home1.getInfo().energy_usage);
console.log(home2.getInfo().enabled_device);

boiler2.turnOff();

home1.rmDevice(lamp1);
lamp1.rmLamp(diode2);

console.log(home1);