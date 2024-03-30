import mongoose, {Schema , model , models} from 'mongoose';


const ImageSchema = new Schema({
    title : {type : String , required : true },
    transformation_type : {type : String , required : true},
    secure_url : {type : String},
    width : {type : Number},
    height : {type : Number},
    aspect_ratio : {type:String},
    config : {type : Object},
    color : {type : String},
    prompt : {type : String},
    transformation_url : {type : String},
    author : {type : mongoose.SchemaTypes.ObjectId, ref : 'User'},
    created_at : {type : Date,default : Date.now},
    updated_at : {type : Date,default : Date.now}
})

const Image = models?.Image || model('Image', ImageSchema);

export default Image;