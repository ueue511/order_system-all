// expressモジュールをロードし、インスタンス化してappに代入。
const fs = require('fs');
const express = require("express");
// ファイルアップロードをimport
const fileUpload = require('express-fileupload');

//.envfileの読み込み
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

//jws発行
const jwt = require("jsonwebtoken");

//鍵
const SECRET_KEY = "FG+Cb*Y,pQ$b~sCXWQeC";

//　ファイルアップロードmulterをimporty
const multer = require('multer')

// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors');

//expressの読み込み
const app = express();

//mysqlの読み込み
const mysql = require('mysql');
const AdmZip = require('adm-zip');
const { resolve } = require('path');
const { rejects } = require('assert');

app.use(cors());

// jsonファイル読み込みで必要
app.use(express.json());

//ファイルのupdateに必要
app.use(fileUpload());

// adm-zipをインポート
const zip = new AdmZip()

// 2.listen()メソッドを実行して3010番ポートで待ち受け。
// var port = process.env.PORT || 3010
var port = 3010

const server = app.listen(port, function() {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

// //mysqlへの接続の設定
// const con = mysql.createConnection({
//     host: process.env.host,
//     user: process.env.user,
//     password: process.env.password,
//     database: process.env.database
// });

//mysqlへの接続の設定 コネクションプール
var pool = mysql.createPool ({
    connectionLimit: 10,
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

//コネクション接続確認
// pool.on("acquire", (connection) => {
//     console.log("Mysql'poll is access ok")
// })

//テーブル users の作成
// categre: setmeal.食事 drink.飲み物 dessert.デザート
// order_name: 略語
// price: 値段
// full_name: 正式名所
// temperature: hot or ice
// filename: 画像のpath

//DBに接続
// con.connect(function(err) {
//     if (err) {
//         console.log("err database, try after 5sec")
//         setTimeout(() => con.connect(), 5000)
//     };
//     console.log("Connected");
// });

//------------------関数設定------------------//

// DB(ログイン)のユーザ情報などを取り出す関数
function ReadUser(datauser) {
    return new Promise((resolve, rejects) => {
        var list = datauser
        userlist = JSON.parse(list);
        const sql = "SELECT * FROM userslogin WHERE name=? AND password=?";
        pool.getConnection((err, connection) => {
            if (err) console.log("err");
            connection.query(sql, [userlist.username, userlist.password], (err, result, fileld) => {
                connection.release();
                resolve(result);
            });
        });
    });
}

// DB(メニューリスト)の全てのファイルを取り出す関数
async function ReadFileMenu(menu) {
    return new Promise(resolve => {
        if (menu === "menu") {
            const sql = "SELECT categre,order_name,price,full_name,temperature,filename,id FROM users WHERE look=1";
            //-----
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(sql, (err, result, fields) =>{
                    connection.release();
                    resolve(result)
                })
            })
            //-----
            // con.query(sql, function (err, result, fields) {
            //     if (err) throw err;
            //     resolve(result);
            // })
        } else {
            const sql = "SELECT id,filepic FROM users WHERE look=1";
            //---
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(sql, function (err, result, fields) {
                    connection.release();
                    resolve(result)
                })
            })
            //---
            // con.query(sql, function (err, result, fields) {
            //     if (err) throw err;
            //     resolve(result);
            // })
        }
    });
};

// DB(管理者リスト)の全てのファイルを取り出す関数
async function ReadFileAdd() {
    return new Promise(resolve => {
        const sql = "SELECT * FROM admins";
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(sql, (err, result, fields) => {
                connection.release
                resolve(result);
            });
        });
    });
};

// 画像が入っている連想配列をbase64に変換する関数
async function ChangeBase(imgdict) {
    return new Promise(resolve => {
        const dict = {}
        for (var a = 0; a < Object.keys(imgdict).length; a++) {
            const img = imgdict[a].filepic;
            const baseimg = img.toString("base64");
            const stringId = String(imgdict[a].id);
            dict[stringId] = baseimg;
        }
        resolve(dict)
    });
}

//確認用ミドルウェア
const auth = (req, res, next) => {
    let token = "";
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return next("token none")
    };

    //トークンの検証
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
            next(err.message);
        } else {
            req.decoded = decoded;
            next();
        };
    });
}

//--------------------------------------//
      


//dbからメニューリストを受け取り、画像以外を送信
app.get('/menulist', async function(req, res, next) {
    const menu = "menu";
    var menulist_all = [];
    const jsonlist = await ReadFileMenu(menu);
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

    res.json(menulist_all);
});

//dbからメニューリストを受け取り画像のみをbase64に変換して送信
app.get('/menuimg', async function(req, res, next) {
    const menu = "img";
    const jsonlist = await ReadFileMenu(menu);
    var menuImg = await ChangeBase(jsonlist);
    
//-------------------------------------
    // res.writeHead(200, {'Content-Type': 'text/plain', 'content-encoding': 'gzip'})
    // zlib.gzip(menuImg, function(err, buffer){
    //     res.end(buffer);
    // });
//-------------------------------------

    res.json(menuImg);
});

//管理画面adminsterのメニューリスト取得
app.get('/adminster', async function(req, res, next) {
    var AddObject = await ReadFileAdd();
    res.json(AddObject);
});

//管理画面登録adminsteraddのメニューリストを新規登録
app.post('/adminsternew', auth, async function (req, res, next) {
    //json→連想配列に変換
    var jsonObject = JSON.parse(req.body.menu);
    
    // 各種ファイルを変数に格納
    const { categre, order_name, price, full_name, temperature, filename } = jsonObject;

    //画像ファイルを格納
    const filepic = req.files.file.data

    DBRow_worth = [
        categre,
        order_name,
        price,
        full_name,
        temperature,
        filename,
        filepic
    ]
    
    //sqlの命令を入力
    const sql = "INSERT INTO users(categre,order_name,price,full_name,temperature,filename,filepic,look) VALUES(?,1);"

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sql, [DBRow_worth]), (err, result, fields) => {
            connection.release();
            resolve(result);
        };
    });
});

//管理画面変更adminsterchangeの変更項目及び画像ファイル受け取り
app.post('/adminsteradd', auth, async function (req, res, next) {
    
    //id用の連想配列
    DBAdd_id = {}
    DBAdd_pic = {}
    //json→連想配列に変換
    var jsonObject = JSON.parse(req.body.menu);
    DBAdd_id["id"] = jsonObject.id;

    //画像ファイルの有無での処理判定
    if (req.files != null) {
        DBAdd_pic["filepic"] = req.files.file.data;
        const sql = "UPDATE users SET ?,? WHERE ?";
        delete jsonObject.id;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(sql, [jsonObject, DBAdd_pic, DBAdd_id], (err, result, fields) => {
                if (err) throw err;
                res.status(200).send("")
                connection.release()
            });
        });
    } else {
        const sql = "UPDATE users SET ? WHERE ?";
        delete jsonObject.id;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(sql, [jsonObject, DBAdd_id], (err, result, fields) => {
                if (err) throw err;
                res.status(200).send("")
                connection.release();
            });
        });
    }
});

//削除
app.post('/adminsterdelete', auth, (req, res, next) => {
    listid = JSON.parse(req.body.id);
    const sql = "UPDATE users SET look=0 WHERE id=?";
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sql, [listid.id]), (err, result, fileld) => {
            connection.release()
            resolve(result);
        }
    })
});

//ログイン
app.post('/loginuser', function(req, res, next){
    ReadUser(req.body.login).then(result => {
        if (Object.keys(result).length === 1) {
            // JWS発行
            const payload = {
                user: req.body.user
            };
            const option = {
                expiresIn: "1m"
            };
            const token = jwt.sign(payload, SECRET_KEY, option);
            res.json({
                message: "create token",
                token: token
            });
        } else res.send("false")
    });
});