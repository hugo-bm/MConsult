import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/login";
import Signup from "../screens/signup/signup";

const Stack = createNativeStackNavigator();

const RoutesPublic = () => {
  return (
    <Stack.Navigator screenOptions={{animation: "fade"}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, title: "Acessar" }}
      />
      <Stack.Screen
        name="SignUp"
        component={Signup}
        options={{ headerShown: false, title: "Inscreva-se" }}
      />
    </Stack.Navigator>
  );
};

export default RoutesPublic;
