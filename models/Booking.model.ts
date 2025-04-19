import { Schema, model, Document } from 'mongoose';

interface IBooking extends Document {
    mentorId: String;
    menteeId: String;
    date: Date;
    time:String
    sessionAmount: number;
    createdAt: Date;
}

const bookingSchema = new Schema<IBooking>({
    mentorId: {
        type: String,
        ref: 'User',
        required: true
    },
    menteeId: {
        type: String,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
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
    }
});

export const Booking = model<IBooking>('Booking', bookingSchema);