import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./appointmentListItem.style";
import { clock, calendar } from "../../utils/constants/icons";
import Button from "../button/button";

const AppointmentListItem = (props: {
  doctor: string;
  date: string;
  hour: string;
  service: string;
  specialty: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.service}: {props.doctor}
      </Text>
      <Text style={styles.specialty}>{props.specialty}</Text>

      <View style={styles.moreInfoContainer}>
        <View style={styles.appointmentInfoContainer}>
          <View style={styles.dateTimeContainer}>
            <Image style={styles.icon} source={calendar} />
            <Text style={styles.dateTime}>{props.date}</Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Image style={styles.icon} source={clock} />
            <Text style={styles.dateTime}>{props.hour}</Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Button text="Cancelar Reserva" outline={true} theme="danger"/>
        </View>
      </View>
    </View>
  );
};

export default AppointmentListItem;
