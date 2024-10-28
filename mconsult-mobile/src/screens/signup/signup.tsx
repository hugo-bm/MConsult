import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./signup.style";
import Button from "../../components/button/button";
import { logo } from "../../utils/constants/icons";

const Signup = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={logo}
          style={styles.logo}
        />
      </View>
      <View>
        <View style={styles.containerInput}>
          <TextInput
            autoComplete="name"
            placeholder="Nome"
            style={styles.input}
          />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            inputMode="email"
            autoComplete="email"
            placeholder="E-mail"
            style={styles.input}
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
          />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="Data de nascimento: dd/mm/aaaa"
            style={styles.input}
          />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <Button text="Criar Conta" outline={false} theme="primary"/>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tenho conta. </Text>
        <TouchableOpacity>
          <Text style={styles.Link}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
