import path from 'path'

import fs from 'fs'
import common from "../common";

let sqlPath = path.normalize(path.join(__dirname, '../../dist', 'sql', 'driver-license'))


let createSqlText = (array, subject, model) => {

    var sql = ''
    for (let i = 0; i < array.length; i++) {
        let item = array[i]
        // let explains = item.explains.toString().replace('<br/>', '')
        //
        // explains = explains.replace('\r', '')
        let explains = item.explains
        explains = explains.replace(/<br\/>/g, "(br)");
        explains = explains.replace(/\r/g, "(r)");

        // explains=explains.replace(/\r\n/g,"<br>")
        // explains=explains.replace(/\n/g,"<br>");
        sql += `insert into driver_license values ('${common.createUUID()}', '${item.id}','${subject}','${model}','${item.question}','${item.answer}','${item.item1}','${item.item2}','${item.item3}','${item.item4}','${explains}','${item.url}');\n`
    }
    return sql;


}


let main = () => {
    let filePath = path.normalize(path.join(__dirname, '../../data', 'driver-license'))
    common.dirExists(sqlPath)

    fs.readdir(filePath, async (err, files) => {
        for (let i = 0; i < files.length; i++) {
            let fileContent = await common.readFile(path.normalize(filePath + "/" + files[i]))
            let filesItemNames = common.getFileName(files[i]).split('-');
            let model = filesItemNames[0]
            let subject = filesItemNames[1]
            let sql = createSqlText(fileContent, subject, model)
            let fileName = path.normalize(path.join(sqlPath, model + '-' + subject + '-' + (i + 1) + '.sql'));
            fs.writeFileSync(fileName, sql, {encoding: 'utf8'});
        }

    })
}

main()


