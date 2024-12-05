import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./serviceListItem.style";
import Button from "../button/button";
import { useNavigation } from "@react-navigation/native";

const ServiceListItem = (props: {
  description: any;
  service: string;
  price: number;
  id_service: number;
  id_doctor: string;
  action: any;
}) => {
  const descriptionContentView = (
    <View>
      <Text>{props.description}</Text>
    </View>
  );
  const navigation = useNavigation();

  return (
    <View style={styles.services}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{props.service}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Preço:</Text>
          <Text style={styles.price}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(props.price)}
          </Text>
        </View>
      </View>
      <View style={styles.actionBtnContainer}>
        <Button
          text="Reservar"
          outline={false}
          theme="primary"
          onPress={() => props.action(props.id_service, props.id_doctor)}
        />
        <Button
          text="?"
          outline={true}
          theme="secondary"
          onPress={() =>
            navigation.navigate("modal", {
              title: props.service,
              content: descriptionContentView,
            })
          }
        />
      </View>
    </View>
  );
};

export default ServiceListItem;
