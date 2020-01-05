const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

const db = require('../config/db_conexion');

process.env.SECRET_KEY = 'secret';

app.post('/login', (req, res) => {
    let nombre = req.body.nombre_completo;
    let usuario = req.body.usuario;
    let password = req.body.password;
    // let role = req.body.role;

    // pool.query({
    //     'SELECT * FROM usuarios WHERE usuario = $1': {
    //         usuario: req.body.usuario
    //     }
    // }).then(usuario => {
    //     console.log(usuario);
    // });

    db
        .query('SELECT * FROM usuarios WHERE usuario = $1', [usuario], (err, result) => {
            console.log(result);

            if (result.rowCount === 0) {
                return res.status(500).json({
                    ok: false,
                    err: 'El usuario no existe'
                });
            }

            if (!bcrypt.compareSync(password, result.rows[0].password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o (Contraseña) Incorrectos'
                    }
                });
            }

            let role = result.rows[0].role_user;
            console.log(role);
            const expiresIN = 24 * 60 * 60;
            let token = jwt.sign({ user: result.rows }, process.env.SECRET_KEY, {
                expiresIn: expiresIN
            })
            const dataUser = {
                usuario: result.rows[0].usuario,
                role: role,
                area: result.rows[0].area_role,
                accessToken: token,
                expiresIn: expiresIN
            }
            res.json(dataUser)

        })
        // .then(usuario => {

    //     console.log(usuario);
    //     console.log(usuario.rows);

    //     if (usuario.rowCount === 0) {
    //         return res.status(500).json({
    //             ok: false,
    //             err: 'El usuario no existe'
    //         });
    //     }

    //     // if (!bcrypt.compareSync())

    //     // let us = usuario.rows;

    //     // //let s = JSON.stringify(us);

    //     // console.log(us);

    // }).catch(e => console.error(e))

    // pool.query({ } {

    // }).then(result => {
    //     console.log(result);
    // })

});


//PROFILE

app.get('/profile', (req, res) => {
    let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    if (decoded.user) {
        res.json(decoded.user)
    } else {
        res.send('User does not exist')
    }

    // console.log(decoded);

    // // let j = { "usuario": decoded.user };

    // // let w = JSON.parse(j);
    // // console.log(w);
    // res.json(decoded.user);


    // USER.findOne({
    //     where: {
    //         id_user: decoded.id_user
    //     }
    // }).then(usuario => {
    //     if (usuario) {
    //         res.json(usuario)
    //     } else {
    //         res.send('User does not exist')
    //     }
    // }).catch(err => {
    //     res.send('error: ' + err)
    // })

    ///////////////////////////////

    // pool
    //     .query('SELECT * FROM usuarios WHERE usuario = $1', [usuario])
    //     .then(usuario => {
    //         console.log(usuario);
    //         if (usuario) {
    //             res.json(usuario)
    //         } else {
    //             res.send('User does not exist')
    //         }
    //     }).catch(err => {
    //         res.send('error: ' + err)
    //     })

})

module.exports = app;