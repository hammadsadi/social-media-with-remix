import { useNavigate } from "@remix-run/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import Loading from "~/components/Loading";
import { MainContextType } from "~/types/mainContext";
import { IUser } from "~/types/user";
import { AxiosClient } from "~/utils/axiosClient";

export const MainContext = createContext<MainContextType>({
  user: null,
  handleLogout: () => {},
  fetchUser: () => {},
  loading: true,
});
export const useMainContext = () => useContext(MainContext);

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //    Handle Logout
  const handleLogout = () => {
    try {
      setUser(null);
      toast.success("Logout Successfully");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  //  Fetch User
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await AxiosClient.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      setUser(data);
      console.log("User Info From Context", data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const data: MainContextType = { user, loading, handleLogout, fetchUser };

  if (loading) {
    return <Loading />;
  }
  return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};
