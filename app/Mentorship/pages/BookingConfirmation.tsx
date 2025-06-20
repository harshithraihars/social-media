import React from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Download, 
  Plus
} from 'lucide-react';

export default function BookingConfirmation() {
  return (
    <div className="min-h-screen md:mt-12 bg-gradient-to-br ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Booking Confirmed</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your mentorship session has been successfully scheduled and payment processed.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Session Details - Full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl shadow-lg border border-sky-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Session Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date & Time */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Date & Time</h3>
                    <p className="text-lg font-semibold text-gray-900">Friday, June 20, 2025</p>
                    <p className="text-blue-600 font-medium">4:00 PM</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Duration</h3>
                    <p className="text-lg font-semibold text-gray-900">30 minutes</p>
                    <p className="text-gray-600">Professional session</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg" onClick={()=>{window.location.reload()}}>
                  <Plus className="w-4 h-4" />
                  <span>Book Another Session</span>
                </button>
                <button className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-200 hover:shadow-lg">
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl shadow-lg border border-sky-200 p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Session Fee</span>
                  <span className="font-semibold text-gray-900">$50.00</span>
                </div>
                
                <div className="border-t border-sky-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-900">Total Paid</span>
                    <span className="text-2xl font-bold text-green-600">$50.00</span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 font-medium">Payment Successful</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl shadow-lg border border-sky-200 p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Session Info</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Session ID</span>
                  <span className="font-mono text-sm font-semibold text-gray-900 bg-gradient-to-r from-blue-100 to-sky-100 px-2 py-1 rounded">#8ESDN9</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Booked on</span>
                  <span className="font-semibold text-gray-900">Jun 20, 2025</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-green-600">Confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}