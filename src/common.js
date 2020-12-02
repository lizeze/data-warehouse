import fs from 'fs'
import path from 'path'
import {v4 as uuidv4} from 'uuid';

export default class common {
    static readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.normalize(filePath), function (eror, data) {
                if (!eror) {
                    resolve(JSON.parse(data));
                } else {
                    console.log('error');
                    reject(JSON.stringify({reason: 'error', result: '参数错误', error_code: 400}));
                }
            });
        });
    }

    static createUUID() {
        return uuidv4()
    }

    static dirExists(dirname) {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (common.dirExists(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    }

    static getFileName(fileName) {
        return fileName.substr(0, fileName.lastIndexOf('.'))
    }

    static fileDisplay(filePath) {
        return new Promise((resolve, reject) => {

            fs.readdir(path.normalize(filePath), async (err, files) => {
                if (!err) resolve(files)
                else resolve(null)

            })
        })
    }

}



