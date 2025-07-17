import mongoose, { Schema, model, models, Document, Mongoose } from 'mongoose';

interface IBooking extends Document {
    mentorId: mongoose.Types.ObjectId;
    menteeId: mongoose.Types.ObjectId;
    menteeEmail:string,
    date: Date;
    time: string;
    Duration: string;
    sessionAmount: number;
    createdAt: Date;
    callId:String
}

const bookingSchema = new Schema<IBooking>({
    mentorId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    menteeId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menteeEmail:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
    sessionAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    callId:{
        type:String,
        default:null
    }
});

export const Booking = models.Booking || model<IBooking>('Booking', bookingSchema);
