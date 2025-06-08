import { Link } from "@remix-run/react";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Heart,
  Link as LinkIcon,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Share2,
  Users,
} from "lucide-react";
import { useMainContext } from "~/context/mainContext";

const UserProfile = () => {
  // Sample user data
  const user = {
    name: "Jane Doe",
    username: "janedoe",
    bio: "Frontend Developer | UI/UX Enthusiast | Coffee Lover | Building cool stuff with React & Remix",
    location: "San Francisco, CA",
    website: "janedoe.dev",
    joinDate: "Joined June 2018",
    following: 542,
    followers: 1284,
    coverImage:
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    posts: [
      {
        id: 1,
        content:
          "Just launched my new Remix project! Check it out and let me know what you think. #remix #webdev",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        likes: 42,
        comments: 8,
        time: "2h ago",
      },
      {
        id: 2,
        content:
          "Exploring advanced React patterns today. Here's a quick tip about compound components that might help you!",
        likes: 89,
        comments: 14,
        time: "4h ago",
      },
    ],
  };
  const { user: userInfo } = useMainContext();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
          <Link
            to="/feed"
            className="mr-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="font-bold text-lg text-gray-800 dark:text-gray-200">
              {userInfo?.name}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.posts.length} posts
            </p>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Picture and Actions */}
        <div className="px-4 pb-4 relative">
          <div className="flex justify-between items-end -mt-16">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-900 overflow-hidden">
              <img
                src={
                  userInfo?.profilePicture ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=232"
                }
                alt={userInfo?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-gray-800 dark:text-gray-200">
                <Edit className="w-4 h-4 inline mr-1" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {userInfo?.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              @{userInfo?.username}
            </p>

            <p className="mt-3 text-gray-800 dark:text-gray-200">
              {userInfo?.bio}
            </p>

            <div className="flex flex-wrap gap-y-1 mt-3 text-gray-500 dark:text-gray-400">
              {userInfo?.location && (
                <div className="flex items-center mr-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
              {userInfo?.website && (
                <div className="flex items-center mr-4">
                  <LinkIcon className="w-4 h-4 mr-1" />
                  <Link
                    to={`https://${userInfo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {userInfo.website}
                  </Link>
                </div>
              )}
              {user.joinDate && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-500">
                    {userInfo?.createdAt
                      ? format(new Date(userInfo.createdAt), "MMMM d, yyyy")
                      : "Date not available"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex mt-4 space-x-5">
              <Link
                to={`/${user.username}/following`}
                className="text-sm hover:underline"
              >
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {user.following}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  Following
                </span>
              </Link>
              <Link
                to={`/${user.username}/followers`}
                className="text-sm hover:underline"
              >
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {user.followers}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  Followers
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto flex">
          <button className="flex-1 py-4 font-medium text-center border-b-2 border-primary-600 text-primary-600 dark:text-primary-400">
            Posts
          </button>
          <button className="flex-1 py-4 font-medium text-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            Replies
          </button>
          <button className="flex-1 py-4 font-medium text-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            Media
          </button>
          <button className="flex-1 py-4 font-medium text-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            Likes
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800 max-w-2xl mx-auto">
        {user.posts.map((post) => (
          <article key={post.id} className="p-4">
            {/* Post Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {user.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      @{user.username}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      · {post.time}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Post Content */}
            <div className="mt-3 ml-13 text-gray-800 dark:text-gray-200">
              <p className="whitespace-pre-line">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="mt-3 ml-13 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="mt-3 ml-13 flex justify-between items-center text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 group">
                  <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 group">
                  <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 group-hover:text-red-500 dark:group-hover:text-red-400">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 group">
                  <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 group-hover:text-green-500 dark:group-hover:text-green-400">
                    <Share2 className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
