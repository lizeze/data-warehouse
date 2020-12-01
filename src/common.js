const fs = require('fs')
const {v4: uuidv4} = require('uuid');
const path = require('path')

function readFile(filePath) {
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

let createUUID = () => uuidv4()

// let getStat = (path) => {
//     return new Promise((resolve, reject) => {
//         fs.stat(path, (err, stats) => {
//             if (err) {
//                 resolve(false);
//             } else {
//                 resolve(stats);
//             }
//         })
//     })
// }

// let mkdir = (dir) => {
//     return new Promise((resolve, reject) => {
//         fs.mkdir(dir, err => {
//             if (err) {
//                 resolve(false);
//             } else {
//                 resolve(true);
//             }
//         })
//     })
// }
let dirExists = (dirname) => {

    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (dirExists(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

let getFileName = (fileName) => {

    return fileName.substr(0, fileName.lastIndexOf('.'))


}

// let readFile = (filePath) => {
//
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, (err, data) => {
//             if (!err) resolve(data)
//             else
//                 resolve(null)
//         });
//     })

// }

let fileDisplay = (filePath) => {
    return new Promise((resolve, reject) => {

        fs.readdir(path.normalize(filePath), async (err, files) => {
            if (!err) resolve(files)
            else resolve(null)

        })
    })
}
module.exports = {
    readFile,
    createUUID,
    dirExists,
    getFileName,
    fileDisplay
}
