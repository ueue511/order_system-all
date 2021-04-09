// 1.expressモジュールをロードし、インスタンス化してappに代入。
const fs = require('fs');
const express = require("express");

// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors');

//expressの読み込み
const app = express();

//mysqlの読み込み
const mysql = require('mysql');

app.use(cors());

// jsonファイル読み込みで必要
app.use(express.json());



// DB(メニューリスト)の全てのファイルを取り出す
async function ReadFileMenu() {
    return new Promise(resolve => {
        const sql = "SELECT * FROM users";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            resolve(result);
        })
    });
};

// DB(管理者リスト)の全てのファイルを取り出す
async function ReadFileAdd() {
    return new Promise(resolve => {
        const sql = "SELECT * FROM admins";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            resolve(result);
        })
    });
};

//受け取ったファイルのジャンル別の整形
function MakeList() {

}

        
// 2.listen()メソッドを実行して3010番ポートで待ち受け。
const server = app.listen(3010, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

//mysqlへの接続の設定
const con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

//テーブル users の作成
// categre: setmeal.食事 drink.飲み物 dessert.デザート
// order_name: 略語
// price: 値段
// full_name: 正式名所
// temperature: hot or ice
// filename: 画像のpath

//DBに接続
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");

    // テーブル作成
    // const sql = "CREATE TABLE IF NOT EXISTS users (categre VARCHAR(255) NOT NULL, \
    // order_name VARCHAR(255) NOT NULL, \
    // price INT NOT NULL, \
    // full_name VARCHAR(255) NOT NULL, \
    // temperature VARCHAR(255) NOT NULL, \
    // filename VARCHAR(255) NOT NULL)";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("table created")

    // const sql = 'select * from users';
    // con.query(sql, function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    // });
});

//dbからメニューリストを受け取る
app.get('/menulist', async function (req, res, next) {
    var menulist_all = [];
    const jsonlist = await ReadFileMenu();
    var ObjectDrink = jsonlist.filter((item, index) => {
        if (item.categre == "drink") return true;
    });
    var Objectdessert = jsonlist.filter((item, index) => {
        if (item.categre == "dessert") return true;
    });
    var Objectsetmeal = jsonlist.filter((item, index) => {
        if (item.categre == "setmeal") return true;
    });
    menulist_all.push(ObjectDrink, Objectdessert, Objectsetmeal);
    res.json(menulist_all)

    // list_menu = json.Placer.filter(function (item, index) {
    //     if (item.categre == "drink") return true;
    // });
    // for (var i = 0; i < list_menu.length; i++){
    //     console.log(list_menu[i].order_name)
    // }
    // console.log(jsonlist)
});

//メニューリストを取得する jsonを直接入れ込む
// app.get('/menulist', function (req, res, next) {
//     var menulistJson = []
//     var JsonObject_drink = JSON.parse(fs.readFileSync("./public/orderdrink.json", "utf8"));
//     var JsonObject_dessert = JSON.parse(fs.readFileSync("./public/orderdessert.json", "utf8"));
//     var JsonObject_setmeal = JSON.parse(fs.readFileSync("./public/ordersetmeal.json", "utf8"));
//     menulistJson.push(JsonObject_drink, JsonObject_dessert, JsonObject_setmeal);
//     res.json(menulistJson);
// })

//管理画面adminsterのメニューリスト取得
app.get('/adminster', async function (req, res, next) {
    var AddObject = await ReadFileAdd();
    res.json(AddObject);
});

//管理画面登録adminsteraddのメニューリストを追加
app.post('/adminsteradd', function (req, res, next) {
    console.log(ok)
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

