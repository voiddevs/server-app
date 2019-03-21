
import { Schema, Document, model } from 'mongoose';


const postSchema = new Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
        type: String
    }],
    coords: {
        type: String //-13.13131313, 12.1003102
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una ref a un usuario' ]
    }
});


postSchema.pre<IPost>( 'save', function( next ) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date;
    mensaje: string;
    img: string[];
    coords: string;
    usuario: string;
}


export const Post = model<IPost>( 'Post', postSchema);