import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "TicTacToe",
          headerStyle: { backgroundColor: '#191B1F' },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="outraTela" />
    </Stack>
  );
}
