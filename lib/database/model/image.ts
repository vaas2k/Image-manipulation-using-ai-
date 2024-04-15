import mongoose, {Schema , model , models} from 'mongoose';


const ImageSchema = new Schema({
    title : {type : String, required : true },
    type : {type : String , required : true},
    image_url : {type : String , required : true},
    width : {type : Number},
    height : {type : Number},
    aspect_ratio : {type:String},
    color : {type : String},
    object_recolor : {type : String},
    prompt : {type : String},
    transformation_url : {type : String},
    author : {type : mongoose.SchemaTypes.ObjectId, ref : 'User'},
    author_img : {type : String},
    created_at : {type : Date,default : Date.now},
    updated_at : {type : Date,default : Date.now}
})

const ImageModel = models?.Image || model('Image', ImageSchema);

export default ImageModel;