const express = require("express");
let iconv = require('iconv-lite');
let BufferHelper = require('bufferhelper');
let cheerio = require("cheerio"),
    http = require('http'),
    url = 'http://www.yulu13.com/aiqingyulu/10739.html',
    utf8Butter = '';
let $ = '';
let list = [];

let req = http.request(url, res => {
    let bufferHelper = new BufferHelper();

    res.on("data", data => {
        bufferHelper.concat(data);
    })
    res.on("end", () => {
        let fullButter = bufferHelper.toBuffer();
        utf8Butter = iconv.decode(fullButter, 'gb2312');
        $ = cheerio.load(utf8Butter.toString());
        list = $('.nr-body').children().last().text().split('\n\n');
    })
})

req.end();

const app = express();
app.get('/', (req, res) => { //get对应的 路由路径  返回的数据
    // res.send(JSON.stringify(myData));
    res.send(list[1]);
})
app.listen(3000, () => {
    console.log('zzy的express');
});