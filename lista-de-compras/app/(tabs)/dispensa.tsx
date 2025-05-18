import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';

type Product = {
  id: string;
  name: string;
  idealQuantity: number;
};

export default function Dispensa() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [idealQuantity, setIdealQuantity] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!name || !idealQuantity) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    if (editingId) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId
            ? { ...product, name, idealQuantity: Number(idealQuantity) }
            : product
        )
      );
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: uuid.v4() as string,
        name,
        idealQuantity: Number(idealQuantity),
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    setName('');
    setIdealQuantity('');
  };

  const handleEdit = (product: Product) => {
    setName(product.name);
    setIdealQuantity(product.idealQuantity.toString());
    setEditingId(product.id);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Remover item', 'Tem certeza que deseja remover este item?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          setProducts((prev) => prev.filter((product) => product.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Minha Dispensa Ideal
      </Text>

      <TextInput
        label="Produto"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Quantidade Ideal"
        value={idealQuantity}
        onChangeText={setIdealQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddOrUpdate} style={styles.button}>
        {editingId ? 'Atualizar Produto' : 'Adicionar Produto'}
      </Button>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={<Text>Nenhum item adicionado ainda.</Text>}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={`Ideal: ${item.idealQuantity}`}
            />
            <Card.Actions>
              <IconButton icon="pencil" onPress={() => handleEdit(item)} />
              <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    marginBottom: 12,
  },
  input: {
    marginTop: 12,
  },
  button: {
    marginTop: 16,
  },
  list: {
    marginTop: 24,
  },
  card: {
    marginBottom: 12,
    margin: 5
  },
});
