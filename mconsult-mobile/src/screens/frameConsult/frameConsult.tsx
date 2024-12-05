import { Alert, FlatList, Text, View } from "react-native";
import styles from "./frameConsult.style";
import AppointmentListItem from "../../components/appointmentListItem/appointmentListItem";
import { useEffect, useState } from "react";
import api from "../../utils/constants/api";
import ConfirmationModal from "../../components/confirmationModal/confirmationModal";

type IAppointmentResponse = {
  id: number;
  id_doctor: string;
  id_service: number;
  id_user: string;
  booking_date: {
    date: string;
    time: string;
  };
};

type IAppointment = {
  id_appointment: number;
  service: string;
  doctor: string;
  specialty: string;
  booking_date: string;
  booking_hour: string;
};

type IService = {
  id_doctor_service: number;
  id_doctor: string;
  id_service: number;
  service_name: string;
  description: string;
  price: number;
};

const FrameConsult = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<{
    message: string;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
  } | null>(null);

  //Modal configuration for confirming the removal of medical appointments

  const showConfirmation = (
    title: string,
    message: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const handleConfirm = () => {
        setModalVisible(false);
        resolve(true);
      };
      
      const handleCancel = () => {
        setModalVisible(false);
        resolve(false);
      };
      
      // Display the modal
      setModalVisible(true);


      // Armazena os callbacks dinamicamente
      setModalConfig({
      message,
      title,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    });
  });
  };

  async function LoadAppointment() {
    try {
      const response = await api.get("appointment/user/list");
      if (response.status == 200) {
        const appointmentListResponse = response.data
          .date as IAppointmentResponse[];
        const appointmentList: IAppointment[] = [];
        for (let app of appointmentListResponse) {
          const doctor = await api.get("/doctor/" + app.id_doctor);
          const { name, specialty, services } = doctor.data.data;
          const service = (services as IService[]).filter(
            (service) => service.id_service == app.id_service
          );
          appointmentList.push({
            id_appointment: app.id,
            service: service[0].service_name,
            doctor: name,
            specialty: specialty,
            booking_date: app.booking_date.date,
            booking_hour: app.booking_date.time,
          });
        }
        setAppointments(appointmentList);
      }
    } catch (error: any) {
      if (error.response.data.status == 404) {
        setAppointments(undefined);
      } else {
        Alert.alert("Erro:" + error);
      }
    }
  }

  async function DeleteAppointment(
    id: number,
    doctorName: string,
    serviceName: string
  ) {
    const confirmationMessage = `Você está prestes a cancelar o serviço '${serviceName}' com o ${doctorName}.\n\n Deseja realmente cancelar este serviço? `;
    const confirmationTitle = "Confirmação de Cancelamento!";


    // Confirms which action the user has chosen
    if (await showConfirmation(confirmationTitle, confirmationMessage)){
      try {
        const response = await api.delete("/appointment", { data: { id: id } });
        if (response.status == 200) {
          LoadAppointment();
        }
      } catch (error: any) {
        Alert.alert("Não foi possível remover a consulta!");
      }
    }
  }

  useEffect(() => {
    LoadAppointment();
  }, []);

  return (
    <View style={styles.frame}>
      <Text style={styles.title}>Minhas Reservas</Text>
      {(appointments && appointments.length > 0) ? (
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
              id_appointment={item.id_appointment}
              action={DeleteAppointment}
            />
          )}
        />
      ) : (
        <Text style={styles.errorMsg}>Nenhuma reserva encontrada!</Text>
      )}
      {modalVisible?<ConfirmationModal
        visible={modalVisible}
        message={modalConfig?.message || ""}
        onConfirm={modalConfig?.onConfirm || (() => { })}
        onCancel={modalConfig?.onCancel || (() => { })} 
        title={modalConfig?.title || ""}/>: <></>}
    </View>
  );
};

export default FrameConsult;
