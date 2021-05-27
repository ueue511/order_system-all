'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createtable("userslogin", {
    id: {
      type: "int",
      primarykey: true
    },
    name: {
      type: "varchar(255)",
      notNull: true
    },
    password: {
      type: "varchar(255)",
      notNull: true
    }
  }).then(
    function (result) {
      db.createtable("users", {
        id: {
          type: "int",
          primarykey: true
        },
        categre: {
          type: "varchar(255)",
          notNull: true
        },
        order_name: {
          type: "varchar(255)",
          notNull: true
        },
        price: {
          type: "int",
          notNull: true
        },
        full_name: {
          type: "varchar(255)",
          notNull: true
        },
        temperature: {
          type: "varchar(255)",
          notNull: true
        },
        filename: {
          type: "varchar(255)",
          notNull: true
        },
        filepic: {
          type: "VARBINARY(M)",
          notNull: true
        },
        look: {
          type: "int",
          notNull: true
        }
      }).then(function (result) {
        db.createtable("users", {
          adminster: {
            type: "varchar(255)",
            notNull: true
          },
          path: {
            type: "varchar(255)",
            notNull: true
          },
          img: {
            type: "varchar(255)",
            notNull: true
          }
        })
      })
    }).catch(function (error) {
      return;
    })
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
