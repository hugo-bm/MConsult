import { Alert, FlatList, Text, View } from "react-native";
import DoctorListItem from "../../components/DoctorListItem/doctorlistitem";
import styles from "./frameHome.style";
import api from "../../utils/constants/api";
import { useEffect, useState } from "react";

type IDoctorsList = [
  { id: string; name: string; icon: string; specialty: string }
];

const FrameHome = (props: any) => {
  const SelectDoctor = (
    id_doctor: any,
    name: any,
    speciality: any,
    icon: any
  ) => {
    props.navigation.navigate("Services", {
      id_doctor,
      name,
      speciality,
      icon,
    });
  };
  
  const [doctors, setDoctors] = useState<IDoctorsList>();

  async function LoadDoctors() {
    try {
        const response = await api.get("/doctor");
       
            if (response.status) {
              setDoctors(response.data.data);
            }        
      } catch (error: any) {
        if (error.response?.data.error){
          Alert.alert("Error on connection with server", error.response.data.error);
        }
        else {
          Alert.alert("Tente novamente mais tarde!");
        }
      }
  }

  useEffect(()=>{LoadDoctors()},[]);

  return (
    <View style={styles.frame}>
      <Text style={styles.title}>Agende os seus serviços médicos</Text>
      {doctors ? (
        <FlatList
          data={doctors}
          keyExtractor={(_, index) => index.toFixed()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DoctorListItem
              id_doctor={item.id}
              name={item.name}
              icon={item.icon == "F" ? "F" : "M"}
              specialty={item.specialty}
              onPress={SelectDoctor}
            />
          )}
        />
      ) : (
        <Text style={styles.errMsg}>Não há médicos dísponiveis no momento</Text>
      )}
    </View>
  );
};

export default FrameHome;
