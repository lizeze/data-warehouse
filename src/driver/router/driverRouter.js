import express from 'express';
import common from "../../common";
import path from 'path'

let driverRouter = express.Router();
driverRouter.post('/question', async (req, res) => {
    let {model, subject, type} = req.body;

    let filePath = path.join(__dirname, "../../../data", "driver-license", "/")
    const fileName = filePath + model + '-' + subject + ".json"
    let fileContent = await common.readFile(fileName)
    res.send(fileContent)

})
export default driverRouter
