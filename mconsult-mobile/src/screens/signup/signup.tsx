import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./signup.style";
import Button from "../../components/button/button";
import { logo } from "../../utils/constants/icons";
import api from "../../utils/constants/api";
import { useState } from "react";

const  parseDateToAPIFormat = (dateIn: string): string => {
  const [day,month,year] = dateIn.split("/");
  return `${year}-${month}-${day}`;
}


const Signup = (props: { navigation: any }): React.JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cel, setCel] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  async function ExecuteRecord() {
    try {
      const response = await api.post("/user", {
        email: email,
        password: password,
        name: name,
        phone: "+55" + cel,
        birth_date: parseDateToAPIFormat(birthDate)
      });
      if (response.data.status == 201) {
        Alert.alert("Criado com sucesso!");
        setTimeout(()=>props.navigation.navigate("Login"), 6000)
      }
    } catch (error: any) {
      Alert.alert(error.response?.data.message);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <View style={styles.containerInput}>
          <TextInput
            autoComplete="name"
            placeholder="Nome"
            style={styles.input}
            onChangeText={(t)=>setName(t)}
          />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            inputMode="email"
            autoComplete="email"
            placeholder="E-mail"
            style={styles.input}
            onChangeText={(t)=>setEmail(t)}
          />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            inputMode="tel"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="tel"
            placeholder="Contato: (99) 99999-9999"
            style={styles.input}
            onChangeText={(t)=>setCel(t)}
            />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="Data de nascimento: dd/mm/aaaa"
            style={styles.input}
            onChangeText={(t)=>setBirthDate(t)}
          />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(t)=>setPassword(t)}
          />
        </View>
        <Button
          text="Criar Conta"
          outline={false}
          theme="primary"
          onPress={ExecuteRecord}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tenho conta. </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.Link}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
