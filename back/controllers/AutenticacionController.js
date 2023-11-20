import { Usuarios } from '../models/UsuariosSchema.js';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    const {nombre, apellido, email, password,  rol  } = req.body;
    try{
        const user = new Usuarios({
            nombre,
            apellido, 
            email, 
            password,
            rol,
        });
        await user.save();

        //jwt token

        return res.status(201).json({
            Estado: "OK",
            Mensaje: "Usuario registrado correctamente"
        });

    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({
                Estado: "ERROR",
                Mensaje: "El email ya se encuentra registrado"
            });
        }
        return  res.status(500).json({
            Estado: "ERROR",
            Mensaje: "Error al registrar el usuario"
        });
    };
};

export const login =  async(req, res) => {
    try{
        const { email, password } = req.body;
        
        let user = await Usuarios.findOne({email});

        if(!user){
            return res.status(403).json({
                Estado: "ERROR",
                Mensaje: "Usuario no encontrado"
            });
        }
        const hayCoincidencia = await user.comparePassword(password);

        if(!hayCoincidencia){
            return res.status(403).json({
                Estado: "ERROR",
                Mensaje: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign({uid: user._id}, "Juan&Ramon&Lopez&40060164&DWN4B",{
            expiresIn: "1h"
        });

        return res.status(200).json({
            token,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            Estado: "ERROR",
            Mensaje: "Error al loguear el usuario"
        });
    };
};
