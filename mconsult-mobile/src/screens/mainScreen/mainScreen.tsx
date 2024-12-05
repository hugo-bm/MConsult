import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FrameHome from "../frameHome/frameHome";
import FrameProfile from "../frameProfile/frameProfile";
import FrameConsult from "../frameConsult/frameConsult";
import { Image } from "react-native";
import { calendar, home, logo, profile } from "../../utils/constants/icons";
import { COLORS } from "../../utils/constants/theme";

const Tab = createBottomTabNavigator();
const Main = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 1,
            borderStartStartRadius: 10,
            borderStartEndRadius: 10,
          },

          headerStyle: {
            backgroundColor: COLORS.mainBackground,
            borderWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={FrameHome}
          options={{
            headerTitleAlign: "center",
            headerTitle: function () {
              return <Image source={logo} />;
            },
            tabBarShowLabel: false,
            tabBarIcon: function ({ focused }) {
              return (
                <Image
                  source={home}
                  style={{
                    width: 25,
                    height: 25,
                    opacity: focused ? 1 : 0.34,
                    objectFit: "cover",
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Consultas"
          component={FrameConsult}
          options={{
            unmountOnBlur: true,
            headerTitleAlign: "center",
            headerTitle: function () {
              return <Image source={logo} />;
            },
            tabBarShowLabel: false,
            tabBarIcon: function ({ focused }) {
              return (
                <Image
                  source={calendar}
                  style={{
                    width: 25,
                    height: 25,
                    opacity: focused ? 1 : 0.34,
                    objectFit: "cover",
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={FrameProfile}
          options={{
            headerTitleAlign: "center",
            headerTitle: function () {
              return <Image source={logo} />;
            },
            tabBarShowLabel: false,
            tabBarIcon: function ({ focused }) {
              return (
                <Image
                  source={profile}
                  style={{
                    width: 25,
                    height: 25,
                    opacity: focused ? 1 : 0.34,
                    objectFit: "cover",
                  }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
  );
};
export default Main;
