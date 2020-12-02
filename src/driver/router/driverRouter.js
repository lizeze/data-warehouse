import express from 'express';
import common from "../../common";
import path from 'path'

let driverRouter = express.Router();
driverRouter.post('/question', async (req, res) => {
    let {model, subject, type} = req.body;
    let filePath = path.join(__dirname, "../../../data", "driver-license", "/")
    const fileName = filePath + model + '-' + subject + ".json"
    let fileContent = await common.readFile(fileName)
    if (fileContent.error_code) {
        res.status(404).send(common.unifyResponse("资源不存在", 404))
        return
    }
    let result = []
    if (type == "random")
        result = common.getRandomArrayElements(fileContent, 100)
    else
        result = fileContent;
    res.send(result)
})
export default driverRouter
