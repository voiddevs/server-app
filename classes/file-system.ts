import { FileUpload } from "../interfaces/file-upload";
import fs from 'fs';
import path from 'path';
import uniqid from 'uniqid';
import { resolve } from "url";
import { rejects } from "assert";


export default class FileSystem {

    constructor() { };


    guardarImagenTemporal( file: FileUpload, userId: string ) {


        return new Promise( (resolve, reject) => {

                // CREAR CARPETAS
            const path = this.crearCarpetaUsuario( userId );

            //NOMBRE ARCHIVOS
            const nombreArchivo = this.generarNombreUnico( file.name );
            
            
            // MOVER EL ARCHIVO DEL TEMP A LA CARPETA
            file.mv( `${ path }/${ nombreArchivo }`, (err: any) => {

                if ( err ){
                    // no se pudo mover
                    reject(err);
                }else {
                    // salio bien
                    resolve();
                }
             });

        });
    }

    private crearCarpetaUsuario( userId: string ) {


        const pathUser = path.resolve( __dirname, '../uploads/', userId );
        const pathUserTemp = pathUser + '/temp';


        const existe = fs.existsSync( pathUser );

        if ( !existe ) {
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;

    }

    private generarNombreUnico( nombreOriginal: string ) {


        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length - 1 ];

        const idUnico = uniqid();


        return `${ idUnico }.${ extension }`;
    }

    imagenesDeTempHaciaPost( userId: string ) {

        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve( __dirname, '../uploads/', userId, 'posts');

        if ( !fs.existsSync( pathTemp ) ) {

            return [];

        }

        if ( !fs.existsSync( pathPost ) ) {

            fs.mkdirSync( pathPost );
            
        }

        const imagenesTemp = this.obtenerImagenesEnTemp( userId );

        imagenesTemp.forEach( imagen => {
            fs.renameSync( `${ pathTemp }/${ imagen }`, `${ pathPost }/${ imagen }`);
        });
        
        return imagenesTemp;

    } 
    
    private obtenerImagenesEnTemp( userId: string ) {


        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');

        return fs.readdirSync( pathTemp )  || [];

    }

    getFotoUrl( userId: string, img: string ) {

        //Path post 
        const pathFoto = path.resolve( __dirname, '../uploads', userId, 'posts', img );

        //Verificar si la imagen existe
        const existe = fs.existsSync( pathFoto );

        if ( !existe ) {
            return path.resolve( __dirname, '../assets/400x250.jpg' );
        }


        return pathFoto;

    }
}