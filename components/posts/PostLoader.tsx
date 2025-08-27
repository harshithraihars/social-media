import React from 'react'

const PostLoader = () => {
  return (
    <div className="space-y-6 mt-3">
        {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow p-4 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"/>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"/>
                  <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"/>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded animate-pulse"/>
                <div className="h-3 bg-gray-200 rounded animate-pulse"/>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"/>
              </div>
              {/* Mobile Interaction Bar */}
              <div className="flex justify-between mt-4 pt-3 border-t">
                {[1, 2, 3, 4].map((action) => (
                  <div key={action} className="w-8 h-8 bg-gray-200 rounded animate-pulse"/>
                ))}
              </div>
            </div>
          ))}
      </div>
  )
}

export default PostLoader