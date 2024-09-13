import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);

  const buscarCep = async () => {
    if (cep.length !== 8) {
      Alert.alert('Erro', 'O CEP deve conter 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
      } else {
        setEndereco(data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o CEP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Endereço por CEP</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        value={cep}
        onChangeText={(text) => setCep(text)}
      />

      <Button title="Buscar" onPress={buscarCep} />

      {endereco && (
        <View style={styles.result}>
          <Text>CEP: {endereco.cep}</Text>
          <Text>Rua: {endereco.logradouro}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>Cidade: {endereco.localidade}</Text>
          <Text>Estado: {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
  },
});
