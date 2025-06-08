import React from "react";
import { useMainContext } from "~/context/mainContext";

const FeedLeftSideUserInfo = () => {
  const { user } = useMainContext();
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
      <a href="/profile" className="flex items-center gap-3 group">
        <img
          src={
            user?.profilePicture ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=232"
          }
          alt="User profile"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400">
            {user?.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            @{user?.username}
          </div>
        </div>
      </a>
    </div>
  );
};

export default FeedLeftSideUserInfo;
