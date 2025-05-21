import mongoose, { Schema, model, models, Document } from 'mongoose';

interface IBooking extends Document {
    mentorId: string;
    menteeId: string;
    date: Date;
    time: string;
    Duration: string;
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
    }
});

export const Booking = models.Booking || model<IBooking>('Booking', bookingSchema);
