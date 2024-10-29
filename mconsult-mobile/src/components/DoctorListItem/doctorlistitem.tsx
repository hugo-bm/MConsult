import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./doctorlistitem.style";


const DoctorListItem = (props: {
  name: string;
  icon: any;
  speciality: string;
}) => {
  return (
    <TouchableOpacity style={styles.doctor}>
      <Image source={props.icon} style={styles.icon}/>
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.speciality}>{props.speciality}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorListItem;
