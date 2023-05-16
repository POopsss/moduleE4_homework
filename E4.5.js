// Основной класс выделенной электросети
class HomeLine {
    constructor(name) {
        this.name = name;
        this.devices = new Map();
        this.deviceID = 1;
    }

    // Добавление устройства в сеть
    addDevice(device) {
        // Разделим устройства по типу (чтобы было)
        if (!this.devices.has(device.type)){
            this.devices.set(device.type, new Map());
        }

        this.devices.get(device.type).set(this.deviceID, device);
        device.id = this.deviceID;
        this.deviceID++;
    }

    // Удаление устройства из сети
    rmDevice(device) {
        this.devices.get(device.type).delete(device.id);
    }

    // Получить информацию по сети
    getInfo() {
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
}


// Основной класс всех электронных устройств
class Device {
    constructor(name, power, type) {
        this.id = '';
        this.type = type;
        this.name = name;
        this.enabled = false;
        this.power = power;
    }

    // Включение/Выключение
    turnOn(){
        this.enabled = true;
    }
    turnOff(){
        this.enabled = false;
    }
}


// Освещение
class Lighting extends Device {
    constructor(name, socet, power) {
        let type = 'lightning';
        if (!power){
            power = 0;
        }
        super(name, power, type);
        this.lamp = {};
        this.socet = socet;
        this.free_socet = [];
        for (let i= 0; i < this.socet; i++) {
            this.free_socet.push(i);
        }
    }

    // Добавление/Удаление ламп из сокетов светильников, люстр...
    addLamp (lamp) {
        this.lamp[this.free_socet[0]] = lamp;
        lamp.id = this.free_socet[0];
        this.free_socet.shift();
        this.power += lamp.power;
    }
    rmLamp (lamp) {
        delete this.lamp[lamp.id];
        this.free_socet.push(lamp.id);
        lamp.id = '';
        this.power += - lamp.power;
    }
}


//Лампы
class Lamp {
    constructor(type, power) {
        this.id = '';
        this.type = type;
        this.power = power;
    }
}


class WaterHeater extends Device {
    constructor(name, power, volume) {
        let type = 'water_heater';
        super(name, power, type);
        this.volume = volume;
    }
}


class TV extends Device {
    constructor(name, power, diagonal) {
        let type = 'TV';
        super(name, power, type);
        this.diagonal = diagonal;
    }
}


// Немного примера работы
const home1 = new HomeLine('home1');
const home2 = new HomeLine('home2');
const lamp1 = new Lighting('lamp1', 6);
const lamp2 = new Lighting('lamp1', 2);
const lamp3 = new Lighting('lamp3', 0, 5);
const diod1 = new Lamp('diod1', 1.5);
const diod2 = new Lamp('diod1', 1.5);
const diod3 = new Lamp('diod1', 1.5);
const filament1 = new Lamp('filament1', 20);
const boiler1 = new WaterHeater('boiler1', 800, 2);
const boiler2 = new WaterHeater('boiler2', 2000, 30);
const monitor1 = new TV('monitor1', 25, 30);
const monitor2 = new TV('monitor2', 13, 17);

lamp1.addLamp(diod1);
lamp1.addLamp(diod2);
lamp1.addLamp(diod3);
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
lamp1.rmLamp(diod2);
