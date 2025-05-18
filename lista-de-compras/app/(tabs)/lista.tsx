import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

type Product = {
  id: string;
  name: string;
  idealQuantity: number;
};

type ShoppingItem = {
  id: string;
  name: string;
  idealQuantity: number;
  toBuyQuantity: number;
};

// Dados mockados da dispensa
const mockPantry: Product[] = [
  { id: '1', name: 'Arroz', idealQuantity: 5 },
  { id: '2', name: 'Feijão', idealQuantity: 3 },
  { id: '3', name: 'Macarrão', idealQuantity: 2 },
];

export default function Lista() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(
    mockPantry.map((item) => ({
      ...item,
      toBuyQuantity: 0,
    }))
  );

  const handleChange = (id: string, type: 'increment' | 'decrement') => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              toBuyQuantity:
                type === 'increment'
                  ? item.toBuyQuantity + 1
                  : Math.max(0, item.toBuyQuantity - 1),
            }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Compras
      </Text>

      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={<Text>Nenhum item disponível.</Text>}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} />
            <Card.Content>
              <Text style={styles.idealText}>
                Quantidade ideal (dispensa): {item.idealQuantity}
              </Text>
              <View style={styles.quantityContainer}>
                <IconButton
                  icon="minus"
                  mode="contained"
                  onPress={() => handleChange(item.id, 'decrement')}
                />
                <Text style={styles.quantityText}>{item.toBuyQuantity}</Text>
                <IconButton
                  icon="plus"
                  mode="contained"
                  onPress={() => handleChange(item.id, 'increment')}
                />
              </View>
            </Card.Content>
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
  list: {
    marginTop: 12,
  },
  card: {
    marginBottom: 12,
    margin: 5,
  },
  idealText: {
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
