import { Alert, FlatList, Image, Text, View } from "react-native";
import { mdoctor, fdoctor } from "../../utils/constants/icons";
import styles from "./services.style";
import ServiceListItem from "../../components/serviceListItem/serviceListItem";
import { useContext, useEffect, useState } from "react";
import api from "../../utils/constants/api";
import { AuthContext } from "../../utils/context/auth";

type IServicesList = [
  {
    id_doctor_service: number;
    id_doctor: string;
    id_service: number;
    service_name: string;
    description: string;
    price: number;
  }
];

const Services = (props: any) => {
  const { id_doctor, name, speciality, icon } = props.route.params;
  const toSchedule = (id_service: number, id_doctor: string) => {
      props.navigation.navigate("Schedule", {
        id_doctor,
        id_service,
      });
  };

  const [services, setServices] = useState<IServicesList>();


  async function LoadServices(id_doctor: string) {
    try {
      const response = await api.get(`/doctor/${id_doctor}`);

      if (response.status) {
        setServices(response.data.data.services);
      }   
    } catch (error: any) {
        if (error.response?.data.message) {
          Alert.alert(`Erro ao obter os serviços: ${error.response?.data.message}`);
        }
        else {
          Alert.alert("Tente novamente mais tarde!");
        }
    }
  }
  useEffect(() => {
    if (id_doctor) {
      LoadServices(id_doctor);
    }
    else {
      Alert.alert("Error on load services provided by this doctor!");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={icon == "F" ? fdoctor : mdoctor} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{speciality}</Text>
      </View>
      {services ? (
        <FlatList
          data={services}
          keyExtractor={(doc) => doc.id_service.toFixed()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ServiceListItem
              service={item.service_name}
              description={item.description}
              price={item.price}
              id_service={item.id_service}
              id_doctor={id_doctor}
              action={toSchedule}
            />
          )}
        />
      ) : (
        <Text style={styles.errMsg}>
          Não há serviços disponíveis para este médico(a)
        </Text>
      )}
    </View>
  );
};

export default Services;
