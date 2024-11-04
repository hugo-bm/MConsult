import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./serviceListItem.style";
import Button from "../button/button";

const ServiceListItem = (props: {
  service: string;
  description: string;
  price: number;
}) => {
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
        <Button text="Reservar" outline={false} theme="primary" />
        <Button text="?" outline={true} theme="secondary" />
      </View>
    </View>
  );
};

export default ServiceListItem;
