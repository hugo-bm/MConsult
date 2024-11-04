import { Text, TextInput, View } from "react-native";
import styles, { theme } from "./frameSchedule.style";
import { Calendar, LocaleConfig } from "react-native-calendars";
import ptBR from "../../utils/constants/calendarLocale";
import { useState } from "react";
import Button from "../../components/button/button";
import { Picker } from "@react-native-picker/picker";
import { opening_hours } from "../../utils/constants/data";

LocaleConfig.locales["pt-BR"] = ptBR;
LocaleConfig.defaultLocale = "pt-BR";

const FrameSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Calendar
          style={styles.calendar}
          theme={theme}
          onDayPress={function (day: any) {
            setSelectedDate(day.dateString);
          }}
          markedDates={{ [selectedDate]: { selected: true } }}
          minDate={new Date().toDateString()}
        />
        <View>
          <Text style={styles.title}>Horário</Text>
        </View>
        <View>
          <Picker
            style={styles.picker}
            selectedValue={selectedTime}
            onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
          >
            {opening_hours.flatMap((hour) => (
              <Picker.Item label={hour} value={hour} />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <Button text={"Confirmar Reserva"} outline={false} theme={"primary"} />
      </View>
    </View>
  );
};

export default FrameSchedule;
