import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Checkbox, Text } from 'react-native-paper';

type ShoppingItem = {
  id: string;
  name: string;
  toBuyQuantity: number;
  bought: boolean;
};

// Mock dos dados vindos da tela Lista
const mockShoppingList: ShoppingItem[] = [
  { id: '1', name: 'Arroz', toBuyQuantity: 2, bought: false },
  { id: '2', name: 'Feijão', toBuyQuantity: 1, bought: false },
  { id: '3', name: 'Macarrão', toBuyQuantity: 3, bought: false },
];

export default function Compra() {
  const [items, setItems] = useState<ShoppingItem[]>(mockShoppingList);

  const toggleBought = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={<Text>Nenhum item para comprar.</Text>}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Checkbox
                status={item.bought ? 'checked' : 'unchecked'}
                onPress={() => toggleBought(item.id)}
              />
              <View>
                <Text
                  style={[
                    styles.itemText,
                    item.bought && styles.itemTextBought,
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={styles.quantityText}>
                  Quantidade: {item.toBuyQuantity}
                </Text>
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  itemTextBought: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
  },
});
