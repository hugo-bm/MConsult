import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from "react";
import api from "../constants/api";
import { Alert } from "react-native";
import JWT from "expo-jwt";

type LoginType = {
  email: string;
  password: string;
};

type ProviderProps = {
  token: string;
  id: string;
  login(data: LoginType): Promise<void>;
  logout(): void;
};

const AuthContext = createContext<ProviderProps>({
  token: "",
  id: "",
  login: async () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [id, setID] = useState("");

  const login = async (data: LoginType) => {
    try {
      const response = await api.post("/user/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data) {
        setTimeout(() => {
          setToken(response.data.data.token);
          setID(JWT.decode(response.data.data.token, "senhaquualquer").id);
          api.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.data.token;
        }, 100);
      }
    } catch (error: any) {
      Alert.alert(error.response?.data.message);
    }
  };

  const logout = () => {
    setToken("");
    setID("");
    api.defaults.headers.common["Authorization"] =
            "Bearer "
  };

  return (
    <AuthContext.Provider value={{ token, id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
