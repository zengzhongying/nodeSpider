const express = require("express");
let iconv = require('iconv-lite');
let BufferHelper = require('bufferhelper');
let cheerio = require("cheerio"),
    http = require('http'),
    url = 'http://www.yulu13.com/aiqingyulu/10739.html',
    utf8Butter = '';
let $ = '';

let req = http.request(url, res => {
    let bufferHelper = new BufferHelper();

    res.on("data", data => {
        bufferHelper.concat(data);
    })
    res.on("end", () => {
        let fullButter = bufferHelper.toBuffer();
        utf8Butter = iconv.decode(fullButter, 'gb2312');
        // console.log(utf8Butter.toString())
        $ = cheerio.load(utf8Butter.toString());
        // console.log($('.nr-body').children().last().html());
        // $('.nr-body p').html()
    })
})

req.end();

const app = express();
app.get('/', (req, res) => { //get对应的 路由路径  返回的数据
    // res.send(JSON.stringify(myData));
    res.send($('.nr-body').children().last().html());
})
app.listen(3000, () => {
    console.log('zzy的express');
});