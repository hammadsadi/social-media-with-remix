import { Outlet, useNavigate } from "@remix-run/react";
import {
  Menu,
  X,
  Bookmark,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Eye,
  Search,
  Home,
  Users,
  Bell,
  Mail,
  User,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import FeedLeftSideUserInfo from "~/components/FeedLeftSIde/FeedLeftSideUserInfo";
import Loading from "~/components/Loading";
import { useMainContext } from "~/context/mainContext";

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [uiLoading, setUiLoading] = useState(true);
  const { user: userInfo, loading } = useMainContext();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample posts data with images
  const posts = [
    {
      id: 1,
      username: "janedoe",
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      time: "2h ago",
      content:
        "Just launched my new Remix project! Check it out and let me know what you think. #remix #webdev",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      likes: 42,
      comments: 8,
      shares: 5,
      views: 256,
    },
    {
      id: 2,
      username: "johnsmith",
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "4h ago",
      content:
        "Exploring advanced React patterns today. Here's a quick tip about compound components that might help you!",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      likes: 89,
      comments: 14,
      shares: 7,
      views: 512,
    },
    {
      id: 3,
      username: "alexj",
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      time: "1d ago",
      content:
        "Responsive design isn't optional anymore. Here are my top 5 tips for making your sites look great on any device:",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      likes: 56,
      comments: 5,
      shares: 12,
      views: 384,
    },
  ];

  // Trending topics
  const trendingTopics = [
    { tag: "#RemixJS", posts: "12.5K" },
    { tag: "#WebDev", posts: "245K" },
    { tag: "#React", posts: "356K" },
    { tag: "#TailwindCSS", posts: "89.2K" },
  ];

  // Suggested accounts
  const suggestedAccounts = [
    { username: "reactofficial", name: "React" },
    { username: "remix_run", name: "Remix" },
    { username: "tailwindcss", name: "Tailwind CSS" },
  ];

  //  Protected route

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      setUiLoading(false);
      return;
    } else {
      setUiLoading(false);
    }
  }, [userInfo]);
  if (uiLoading || loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* === Left Sidebar (Fixed) === */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        aria-label="Main navigation"
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-start p-4 border-b border-gray-200 dark:border-gray-800">
            <a
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-primary-600 dark:text-primary-400"
              aria-label="Home"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 903 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0"
              >
                <path d="M814.39 736.55L751.05 699.74..." fill="currentColor" />
              </svg>
              <span>SocialApp</span>
            </a>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-6 space-y-2">
            <a
              href="/"
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors justify-start"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </a>
            <a
              href="/explore"
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors justify-start"
            >
              <Search className="w-5 h-5" />
              <span>Explore</span>
            </a>
            <a
              href="/notifications"
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors justify-start"
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </a>
            <a
              href="/messages"
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors justify-start"
            >
              <Mail className="w-5 h-5" />
              <span>Messages</span>
            </a>
            <a
              href="/communities"
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors justify-start"
            >
              <Users className="w-5 h-5" />
              <span>Communities</span>
            </a>
            <a
              href="/profile"
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors justify-start"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </a>
          </nav>

          {/* User Profile (Bottom) */}

          <FeedLeftSideUserInfo />
        </div>
      </aside>

      {/* === Main Content Area === */}
      <div className="lg:ml-64 lg:mr-80">
        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-30 w-full px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 dark:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Home
          </h1>
          <div className="w-6" /> {/* Spacer for balance */}
        </header>

        {/* === Posts Feed (Scrollable) === */}
        <main className="max-w-2xl mx-auto w-full">
          {/* Create Post */}
          <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-start gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Your profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  placeholder="What's happening?"
                  className="w-full bg-transparent border-0 resize-none focus:ring-0 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  rows={2}
                />
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex space-x-2">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {posts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-900 p-4">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.avatar}
                      alt={post.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <a
                          href={`/${post.username}`}
                          className="font-semibold text-gray-800 dark:text-gray-200 hover:underline"
                        >
                          {post.name}
                        </a>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          · {post.time}
                        </span>
                      </div>
                      <a
                        href={`/${post.username}`}
                        className="text-gray-500 dark:text-gray-400 text-sm hover:underline"
                      >
                        @{post.username}
                      </a>
                    </div>
                  </div>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mt-3 text-gray-800 dark:text-gray-200">
                  <p className="whitespace-pre-line">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="mt-3 flex justify-between items-center text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 group">
                      <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 group-hover:text-red-500 dark:group-hover:text-red-400">
                        <Heart className="w-5 h-5" />
                      </div>
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 group">
                      <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 group">
                      <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 group-hover:text-green-500 dark:group-hover:text-green-400">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>

      {/* === Right Sidebar (Fixed) === */}
      <aside className="hidden lg:block fixed right-0 top-0 h-screen w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
        <div className="p-4">
          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-gray-100 dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Trending */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
              What's happening
            </h2>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <a key={index} href="#" className="block group">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Trending
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {topic.tag}
                  </h3>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {topic.posts} posts
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Who to follow */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
              Who to follow
            </h2>
            <div className="space-y-4">
              {suggestedAccounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {account.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        @{account.username}
                      </div>
                    </div>
                  </div>
                  <button className="text-sm font-semibold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded-full">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Cookie Policy
              </a>
              <a href="#" className="hover:underline">
                Accessibility
              </a>
              <a href="#" className="hover:underline">
                Ads info
              </a>
              <a href="#" className="hover:underline">
                More
              </a>
            </div>
            <div className="mt-2">
              © {new Date().getFullYear()} SocialApp, Inc.
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default HomeLayout;
