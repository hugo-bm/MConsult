import { FlatList, Text, View } from "react-native";
import { appointments } from "../../utils/constants/data";
import styles from "./frameConsult.style";
import AppointmentListItem from "../../components/appointmentListItem/appointmentListItem";
const FrameConsult = () => {
  return (
    <View style={styles.frame}>
      <Text style={styles.title}>Minhas Reservas</Text>
      <FlatList
        data={appointments}
        keyExtractor={(doc) => doc.id_appointment.toFixed()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppointmentListItem
            doctor={item.doctor}
            date={item.booking_date}
            hour={item.booking_hour}
            service={item.service}
            specialty={item.specialty}
          />
        )}
      />
    </View>
  );
};

export default FrameConsult;
