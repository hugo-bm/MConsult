import { FlatList, Image, Text, View } from "react-native";
import * as data from "../../utils/constants/data";
import DoctorListItem from "../../components/DoctorListItem/doctorlistitem";
import { mdoctor, fdoctor } from "../../utils/constants/icons";
import styles from "./services.style";
import ServiceListItem from "../../components/serviceListItem/serviceListItem";
const Services = () => {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={fdoctor} />
        <Text style={styles.name}>Fulano de Castro</Text>
        <Text style={styles.specialty}>Cirurgia Plástica</Text>
      </View>
      <FlatList
        data={data.medical_services}
        keyExtractor={(doc) => doc.id_service.toFixed()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ServiceListItem
            service={item.service}
            description={item.desc}
            price={item.price}
          />
        )}
      />
    </View>
  );
};

export default Services;
