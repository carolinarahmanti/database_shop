const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// create MySql Connectuin
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

// ------------------------------ crud pelanggan ------------------------------ //

app.get("/pelanggan", (req,res) => {
    let sql = "select * from pelanggan" 

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                pelanggan: result
            }
        }
        res.json(response)
    })
})

app.get("/pelanggan/:id_pelanggan", (req, res) => {
    let data = {
        id_pelanggan: req.params.id_pelanggan
    }
    let sql = "select * from pelanggan where id_pelanggan"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else { 
            response = {
                count: result.length, 
                pelanggan: result 
            }
        }
        res.json(response)
    })
})

app.post("/pelanggan", (req,res) => { 
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat
    }

    // create sql query insert
    let sql = "insert into pelanggan set ?"

    // run query
    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/pelanggan/:id_pelanggan", (req,res) => {
    let data = [
        {
            nama: req.body.nama,
            alamat: req.body.alamat
        },

        // parameter (primary key)
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]
    // create sql query update
    let sql = "update pelanggan set ? where ?"

    // run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
            message: result.affectedRows + " data updated"
            }   
        }
        res.json(response) // send response
    })
})

app.delete("/pelanggan/:id_pelanggan", (req, res) => {
    let data = {
        id_pelanggan: req.params.id_pelanggan
    }

    let sql = "delete from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if(error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

// ------------------------------- crud barang ------------------------------- //

app.get("/barang", (req,res) => {
    let sql = "select * from barang" 

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                barang: result
            }
        }
        res.json(response)
    })
})

app.get("/barang/:id_barang", (req, res) => {
    let data = {
        id_barang: req.params.id_barang
    }
    let sql = "select * from barang where id_barang"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else { 
            response = {
                count: result.length, 
                barang: result 
            }
        }
        res.json(response)
    })
})

app.post("/barang", (req,res) => { 
    let data = {
        kondisi_barang: req.body.kondisi_barang,
        nama_barang: req.body.nama_barang, 
        stok: req.body.stok
    }

    // create sql query insert
    let sql = "insert into barang set ?"

    // run query
    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/barang/:id_barang", (req,res) => {
    let data = [
        {
            kondisi_barang: req.body.kondisi_barang,
            nama_barang: req.body.nama_barang, 
            stok: req.body.stok
        },

        // parameter (primary key)
        {
            id_barang: req.body.id_barang
        }
    ]
    // create sql query update
    let sql = "update barang set ? where ?"

    // run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
            message: result.affectedRows + " data updated"
            }   
        }
        res.json(response) // send response
    })
})

app.delete("/barang/:id_barang", (req, res) => {
    let data = {
        id_barang: req.params.id_barang
    }

    let sql = "delete from barang where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if(error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

// ------------------------------- crud admin ------------------------------- //

app.get("/admin", (req,res) => {
    let sql = "select * from admin" 

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                admin: result
            }
        }
        res.json(response)
    })
})

app.get("/admin/:id_admin", (req, res) => {
    let data = {
        id_barang: req.params.id_barang
    }
    let sql = "select * from admin where id_admin"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else { 
            response = {
                count: result.length, 
                admin: result 
            }
        }
        res.json(response)
    })
})

app.post("/admin", (req,res) => { 
    let data = {
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin
    }

    // create sql query insert
    let sql = "insert into admin set ?"

    // run query
    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/admin/:id_admin", (req,res) => {
    let data = [
        {
            nama_admin: req.body.nama_admin,
            status_admin: req.body.status_admin
        },

        // parameter (primary key)
        {
            id_admin: req.body.id_admin
        }
    ]
    // create sql query update
    let sql = "update admin set ? where ?"

    // run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
            message: result.affectedRows + " data updated"
            }   
        }
        res.json(response) // send response
    })
})

app.delete("/admin/:id_admin", (req, res) => {
    let data = {
        id_admin: req.params.id_admin
    }

    let sql = "delete from admin where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if(error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})


app.listen(18000, () => {
    console.log("Run on port 18000")
})
