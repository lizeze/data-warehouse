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
                    resolve(common.unifyResponse("参数错误", 404));
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

    static unifyResponse(mess, error_code) {
        return {
            mess,
            error_code
        }
    }

    static getRandomArrayElements(arr, count) {
        if (null == arr || arr.length == 0) return []
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }


}



