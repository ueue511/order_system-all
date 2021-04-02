// 1.expressモジュールをロードし、インスタンス化してappに代入。
const fs = require('fs');
const express = require("express");
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors');

const app = express();
app.use(cors());

// jsonファイル読み込みで必要
app.use(express.json());


// 2.listen()メソッドを実行して3010番ポートで待ち受け。
const server = app.listen(3010, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

// メニューリストを取得するAPI
app.post("/menulist", function (req, res, next) {
    const no = req.body.id;
    var jsonObject
    // console.log(no);
    // res.send({ message: no });
    switch (no) {
        case 1:
            jsonObject = JSON.parse(fs.readFileSync("./public/orderdrink.json", "utf8"));
            res.json(jsonObject);
            break;
        
        case 2:
            jsonObject = JSON.parse(fs.readFileSync("./public/orderdessert.json", "utf8"));
            res.json(jsonObject);
            break;
        
        case 3:
            jsonObject = JSON.parse(fs.readFileSync("./public/ordersetmeal.json", "utf8"));
            res.json(jsonObject);
            break;
        default:
            break;
    };
});

//管理画面adminsterのメニューリスト取得
app.get('/adminster', function (req, res, next) {
    var jsonObject = JSON.parse(fs.readFileSync("./public/adminster.json", "utf8"));
    res.json(jsonObject);
});

//管理画面登録adminsteraddのメニューリストを追加
app.post('/adminsteradd', function (req, res, next) {
    var jsonObject = JSON.parse(fs.readFileSync("./public/" + req.body.categre + ".json", "utf8"));
    jsonObject.push({
        order_name: req.body.order_name,
        price: req.body.price,
        full_name: req.body.full_name,
        temperature: req.body.temperature,
        img: req.body.filename
    });
    json = JSON.stringify(jsonObject);
    fs.writeFileSync("./public/" + req.body.categre + ".json", json, "utf8")
})

