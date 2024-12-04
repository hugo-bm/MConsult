import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./doctorlistitem.style";
import { mdoctor, fdoctor } from "../../utils/constants/icons";


const DoctorListItem = (props: {
  id_doctor: string;
  name: string;
  icon: "F" | "M";
  specialty: string;
  onPress: Function;
}) => {
  return (
    <TouchableOpacity style={styles.doctor} onPress={() => props.onPress(props.id_doctor, props.name, props.specialty, props.icon)}>
      <Image source={props.icon == "F" ? fdoctor : mdoctor} style={styles.icon}/>
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.speciality}>{props.specialty}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorListItem;
