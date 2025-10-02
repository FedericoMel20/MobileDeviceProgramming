import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <HomeScreenContent />
    </SafeAreaProvider>
  );
}

function HomeScreenContent() {
  const handlePress = () => {
    Alert.alert("🌊 Golden Shore", "Your journey begins now!");
  };

  return (
    <ImageBackground
      source={require('../assets/images/golden-shore.png')} // your PNG file
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Overlay for readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.65)']}
        style={styles.overlay}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Journey To The Golden Shore</Text>
        <Text style={styles.subtitle}>
          The Ultimate Stop To Success And Happiness
        </Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Start Swimming</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject },
  content: { position: 'absolute', left: 24, right: 24, bottom: 60 },
  title: {
    color: '#FFD700', // golden
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 40,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#FFB300',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default App;
