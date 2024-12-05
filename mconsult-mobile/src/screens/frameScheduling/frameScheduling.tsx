import { Alert, Text, View } from "react-native";
import { styles, theme } from "./frameScheduling.style";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import ptBR from "../../utils/constants/calendarLocale";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import { Picker } from "@react-native-picker/picker";
import api from "../../utils/constants/api";
import { AuthContext } from "../../utils/context/auth";

LocaleConfig.locales["pt-BR"] = ptBR;
LocaleConfig.defaultLocale = "pt-BR";

const FrameSchedule = (props: any) => {
  // Params
  const { id_doctor, id_service } = props.route.params;
  const id_user = useContext(AuthContext).id;
  // States
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [timeList, setTimeList] = useState<string[]>([
    "Selecione primeiro uma data!",
  ]);
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    "": [],
  });
  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  async function getAvailabilityDays(data: any) {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    if (data.month >= currentMonth || data.year > currentYear) {
      const resp = await api.get("/appointment/availability/" + id_doctor, {
        params: { month: data.month, year: data.year },
      });
      if (resp.status != 400) {
        setAvailability(resp.data.date);
        // Performs an operation on the received data, generating a list of days without available time.
        const noTimeDates: string[] = [];
        for (let date of Object.keys(resp.data.date)) {
          if ((resp.data.date as Record<string, string[]>)[date].length == 0) {
            noTimeDates.push(date);
          }
        }
        // Persist the list of days unavailable for medical appointments
        setDisabledDates(noTimeDates);
      }
    }
  }

  const generateMarkedDates = () => {
    const marked: any = {};

    // Mark disabled dates
    disabledDates.forEach((date) => {
      marked[date] = { disabled: true, disableTouchEvent: true };
    });

    // Mark the selected date if it is not disabled
    if (selectedDate && !disabledDates.includes(selectedDate)) {
      marked[selectedDate] = { selected: true };
    }

    return marked;
  };

  useEffect(() => {
    getAvailabilityDays({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });
  }, []);

  // Sends the medical appointment request to the server
  async function appointment() {
    console.log(selectedDate.length > 0)
    if (selectedDate.length > 0 && selectedTime.length > 0) {
      try {
        const resp = await api.post("/appointment", {
          id_doctor: id_doctor,
          id_service: id_service,
          id_user: id_user,
          date: selectedDate,
          time: selectedTime,
        });
        if (resp.status == 200) {
          Alert.alert("Reservado com sucesso!");
          setTimeout(() => {
            props.navigation.navigate("Main");
          }, 100);
        }
      } catch (error: any) {
        Alert.alert(
          "Erro ao finalizar o agendamento, tente novamente mais tarde!"
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Calendar
          style={styles.calendar}
          theme={theme}
          onDayPress={function (date: DateData) {
            if (!disabledDates.includes(date.dateString)) {
              // Select the first available time slot to speed up the process and avoid interaction
              setSelectedTime(availability[date.dateString][0]);
              // Loads the list of available times for the given day
              setTimeList(availability[date.dateString]);
              setSelectedDate(date.dateString);
            }
          }}
          onMonthChange={(month: DateData) => {
            getAvailabilityDays(month);
          }}
          disableAllTouchEventsForDisabledDays={true}
          markedDates={generateMarkedDates()}
          minDate={new Date().toDateString()}
        />
        <View>
          <Text style={styles.title}>Horário</Text>
        </View>
        <View>
          <Picker
            style={styles.picker}
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
          >
            {timeList.flatMap((hour, index) => (
              <Picker.Item label={hour} key={index} value={hour} />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <Button
          text={"Confirmar Reserva"}
          outline={false}
          theme={"primary"}
          onPress={appointment}
        />
      </View>
    </View>
  );
};

export default FrameSchedule;
