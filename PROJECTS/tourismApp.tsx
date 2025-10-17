// PROJECTS/GambiaDetail.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Alert } from 'react-native';

type Destination = {
  id: number;
  name: string;
  price: number; // in Dalasis
  rating: string;
  image: any;
  description: string;
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <GambiaDetailScreen />
    </SafeAreaProvider>
  );
}

function GambiaDetailScreen(): React.JSX.Element {
  const destinations: Destination[] = [
    {
      id: 1,
      name: 'Kunta Kinteh Island',
      price: 5000,
      rating: '4.8',
      image: require('../assets/images/kunta-kinteh.jpg'),
      description:
        'A historical heritage site harboring tales of slavery in Africa — symbolizing resistance and the strength of a "never again".',
    },
    {
      id: 2,
      name: 'Bijilo Forest Park',
      price: 4000,
      rating: '4.5',
      image: require('../assets/images/bijilo-forest.jpg'),
      description:
        'Discover the beauty of nature purely raw and interact with some of its innocent and interesting creatures.',
    },
    {
      id: 3,
      name: 'Sanyang Beach',
      price: 3500,
      rating: '4.9',
      image: require('../assets/images/sanyang-beach.jpg'),
      description:
        "Can't talk about The Gambia without its cool beaches and breathtaking sunset views.",
    },
  ];

  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [selectedPrice, setSelectedPrice] = useState<number>(destinations[0].price);
  const [quantity, setQuantity] = useState<number>(1);

  // animated values for each destination
  const animRefs = useRef<Record<number, Animated.Value>>(
    destinations.reduce((acc, d) => {
      acc[d.id] = new Animated.Value(d.id === selectedId ? 1 : 0);
      return acc;
    }, {} as Record<number, Animated.Value>),
  ).current;

  useEffect(() => {
    // animate each card's dropdown based on selection
    destinations.forEach((d) => {
      const toValue = d.id === selectedId ? 1 : 0;
      Animated.timing(animRefs[d.id], {
        toValue,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // animating layout/height -> false
      }).start();
    });

    const sel = destinations.find((x) => x.id === selectedId);
    if (sel) {
      setSelectedPrice(sel.price);
    }
  }, [selectedId, destinations, animRefs]);

  const totalAmount = selectedPrice * quantity;

  function onSelectDestination(id: number, price: number) {
    setSelectedId((prev) => (prev === id ? id : id));
    setSelectedPrice(price);
  }

  function inc() {
    setQuantity((q) => q + 1);
  }
  function dec() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <ImageBackground
        source={require('../assets/images/gambia.jpg')}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={styles.headerOverlay}>
          <View style={styles.headerTop}>
            <View />
            <View style={styles.weatherWrap}>
              <Text style={styles.weatherText}>☀️ 28°C</Text>
              <Text style={styles.flagText}>🇬🇲</Text>
            </View>
          </View>

          <View style={styles.headerContent}>
            <Text style={styles.title}>Gambia</Text>
            <Text style={styles.subtitle}>The Smiling Coast of Africa</Text>
            <Text style={styles.shortDesc}>
              Discover the beauty of Gambia, the ultimate stop to cultural richness, wildlife, and
              serene beaches.
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.body}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Destinations</Text>
          <Text style={styles.sectionHint}>Tap a card to view details & pricing</Text>
        </View>

        {destinations.map((d) => {
          const anim = animRefs[d.id];
          const maxDescHeight = 90;
          const descHeight = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, maxDescHeight],
          });
          const descOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
          const isSelected = d.id === selectedId;

          return (
            <View key={d.id} style={styles.cardOuter}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onSelectDestination(d.id, d.price)}
                style={[styles.card, isSelected ? styles.cardSelected : undefined]}
              >
                <Image source={d.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardTitle}>{d.name}</Text>
                    <Text style={styles.cardPrice}>{d.price.toLocaleString()} D</Text>
                  </View>

                  <View style={styles.cardRow}>
                    <View style={styles.ratingWrap}>
                      <Text style={styles.star}>★</Text>
                      <Text style={styles.ratingText}>{d.rating}</Text>
                    </View>

                    <Text style={styles.smallHint}>{isSelected ? 'Selected' : 'Tap to open'}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <Animated.View
                style={[
                  styles.dropdown,
                  {
                    height: descHeight,
                    opacity: descOpacity,
                  },
                ]}
              >
                <Text style={styles.dropdownText}>{d.description}</Text>
              </Animated.View>
            </View>
          );
        })}
      </View>

      <LinearGradient colors={['#11121a', '#22223a']} style={styles.footer}>
        <View style={styles.counter}>
          <TouchableOpacity onPress={dec} style={styles.counterBtn}>
            <Text style={styles.counterBtnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity onPress={inc} style={styles.counterBtn}>
            <Text style={styles.counterBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalWrap}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{totalAmount.toLocaleString()} D</Text>
        </View>

        <TouchableOpacity
            style={styles.bookBtn}
            activeOpacity={0.8}
            onPress={() => {
                Alert.alert(
                    "Booking Successful ✅",
                    "Can't wait to explore with you!",
                    [{ text: "OK" }]
                 );
            }}
        >
            <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>

      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7fb' },

  headerImage: { height: 260, justifyContent: 'flex-end' },
  headerOverlay: { height: '100%', justifyContent: 'space-between', paddingBottom: 20 },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  weatherWrap: { flexDirection: 'row', alignItems: 'center' },
  weatherText: { color: '#fff', marginRight: 8, fontWeight: '600' },
  flagText: { fontSize: 18 },

  headerContent: { paddingHorizontal: 18, paddingBottom: 18 },
  title: { color: '#FFD700', fontSize: 32, fontWeight: '800', letterSpacing: 0.3 },
  subtitle: { color: 'rgba(255,255,255,0.95)', fontSize: 14, marginTop: 6 },
  shortDesc: { color: 'rgba(255,255,255,0.92)', marginTop: 8, fontSize: 13 },

  body: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 18 },

  sectionHeader: { marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#222' },
  sectionHint: { color: '#666', fontSize: 12, marginTop: 4 },

  cardOuter: { marginTop: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  cardSelected: { borderWidth: 2, borderColor: '#F59E0B', shadowColor: '#f59e0b', shadowOpacity: 0.2 },
  cardImage: { width: 100, height: 100, resizeMode: 'cover' },
  cardContent: { flex: 1, padding: 12 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#222', flex: 1 },
  cardPrice: { fontSize: 13, fontWeight: '700', color: '#9a6b00' },

  ratingWrap: { flexDirection: 'row', alignItems: 'center' },
  star: { color: '#FFD54A', marginRight: 6, fontSize: 16 },
  ratingText: { color: '#555', fontWeight: '700' },
  smallHint: { color: '#888', fontSize: 12 },

  dropdown: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  dropdownText: { color: '#444', fontSize: 13, lineHeight: 18 },

  footer: {
    marginTop: 18,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  counter: { flexDirection: 'row', alignItems: 'center' },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnText: { color: '#fff', fontWeight: '800', fontSize: 20 },
  quantity: { marginHorizontal: 12, color: '#fff', fontWeight: '700', fontSize: 16 },

  totalWrap: { alignItems: 'flex-end', marginRight: 12 },
  totalLabel: { color: '#ccc', fontSize: 12 },
  totalValue: { color: '#fff', fontSize: 18, fontWeight: '800' },

  bookBtn: {
    backgroundColor: '#F97316',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bookBtnText: { color: '#fff', fontWeight: '800' },
});

export default App;
