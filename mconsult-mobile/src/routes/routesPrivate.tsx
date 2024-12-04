import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../screens/mainScreen/mainScreen";
import Services from "../screens/services/services";
import FrameSchedule from "../screens/frameScheduling/frameScheduling";
import { COLORS, FONT_SIZE } from "../utils/constants/theme";
import GenericModal from "../screens/genericModal/genericModal";

const Stack = createNativeStackNavigator();

function RoutesPrivate() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{animation: "fade"}}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Services"
        component={Services}
        options={{ title: "Lista de serviços",
          headerTitle: "Serviços",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTintColor: COLORS.light,
          animation: "fade",
          headerStyle: {
            backgroundColor: COLORS.primary
          }
         }}
      />
      <Stack.Screen
        name="Schedule"
        component={FrameSchedule}
        options={{ title: "Agendamento",
          headerTitle: "Agende seu serviço!",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTintColor: COLORS.primary,
          animation: "fade"
         }}
      />
      <Stack.Screen
        name="modal"
        component={GenericModal}
        options={{ 
          contentStyle:{
            paddingVertical: 70,
            paddingHorizontal: 25,
            alignSelf: "center"
          },
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
          animationDuration: 0.05
         }}
      />
    </Stack.Navigator>
  );
}

export default RoutesPrivate;
