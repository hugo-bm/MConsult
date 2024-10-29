import { FlatList, Text, View } from "react-native";
import *  as data from "../../utils/constants/data";
import DoctorListItem from "../../components/DoctorListItem/doctorlistitem";
import { mdoctor, fdoctor } from "../../utils/constants/icons";
import styles from "./frameHome.style";
const FrameHome = () => {
  return (
    <View style={styles.frame}>
      <Text style={styles.title}>Agende os seus serviços médicos</Text>
      <FlatList
        data={data.doctors}
        keyExtractor={(doc) => doc.id_doctor.toFixed()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DoctorListItem
            name={item.name}
            icon={item.icon == "F" ? fdoctor : mdoctor}
            speciality={item.specialty}
          />
        )}
      />
    </View>
  );
};

export default FrameHome;
