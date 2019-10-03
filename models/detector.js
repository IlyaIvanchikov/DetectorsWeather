const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs');

class Detectors {
    constructor(model_detector, name_detector, producing_country) {
        this.model_detector = model_detector;
        this.name_detector = name_detector;
        this.producing_country = producing_country;
        this.id = uuid();
    }
toJSON() {
    return {
    model_detector: this.model_detector,
    name_detector: this.name_detector,
    producing_country: this.producing_country,
    id: this.id
    }
}

 async save() {
    const detectors = await Detectors.allInfo();
    detectors.push(this.toJSON());
    return new Promise((resolve, reject) => {
        fs.writeFile
        (path.join(__dirname, '..', 'data', 'detector.json'),
        JSON.stringify(detectors),
        (err) => {
        if (err) {
            reject(err);
        } else {
            resolve(detectors);
        }
                }
            )
        })
    }
static allInfo() {
    return new Promise((resolve, reject) => {
        fs.readFile
        (path.join(__dirname, '..', 'data', 'detector.json'),
        'utf-8',
        (err, content) => {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(content));
        }
                }
            )
        })
    }
static async getById(id) {
    const detectors = await Detectors.allInfo();
    return detectors.find(d => d.id === id);
    }
}

module.exports = Detectors;