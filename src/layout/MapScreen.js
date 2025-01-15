import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP} from '@env';
import Colors from '../themes/Colors';
import {Humburg, WalletIcon2} from '../assets/icons';
import SearchBar from '../components/AppComponent/SearchBox';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 37.78825, lng: -122.4324}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 37.78825, lng: -122.4324}},
};

const MapScreen = () => {
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 28.6494, 
    longitude:77.1620,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [selectedCity, setSelectedCity] = useState('');
  const [inputValue, setInputValue] = useState('');
  const placesAutocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const handleLocationSelect = (data, details) => {
    const {lat, lng} = details.geometry.location;
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setRegion(newRegion);
    setSelectedCity(data.description);
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  return (
    <View style={styles.container}>
      {/* <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsCompass={true}
        toolbarEnabled={true}
        showsBuildings={true}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </MapView> */}

      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <Humburg height={30} width={30} />
        </TouchableOpacity>
        <SearchBar
          greenDot
          editable={false}
          value="Shadipur Colony, west Pate..."
          variant="location"
          onPress={() => {
            navigation.navigate('PickUp');
          }}
          placeholder="Enter Starting Location"
        />
        {/* <GooglePlacesAutocomplete
          ref={placesAutocompleteRef}
          placeholder="Search place..."
          // predefinedPlaces={[homePlace, workPlace]}
          minLength={2}
          listViewDisplayed="auto"
          autoFillOnNotFound={true}
          enableHighAccuracyLocation={true}
          query={{
            key: GOOGLE_MAP,
            language: 'en',
            type: '(cities)',
          }}
          enablePoweredByContainer={false}
          currentLocation={true}
          currentLocationLabel="Current Location"
          debounce={200}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]}
          keyboardShouldPersistTaps="always"
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails={true}
          onPress={handleLocationSelect}
          textInputProps={{
            value: inputValue,
            onChangeText: text => setInputValue(text),
          }}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            // listView: styles.listView,
          }}
        /> */}
        <TouchableOpacity onPress={()=>{navigation.navigate("Wallet")}}>
          <WalletIcon2 height={25} width={25} />
        </TouchableOpacity>
      </View>

      {selectedCity ? (
        <View style={styles.cityView}>
          <Text style={styles.cityText}>Selected City: {selectedCity}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height * 0.45,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 1,
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  textInput: {
    height: 44,
    fontSize: 16,
  },
  listView: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    zIndex: 2,
    width: '88%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  cityView: {
    position: 'absolute',
    top: 70,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    zIndex: 1,
  },
  cityText: {
    fontSize: 16,
    color: 'black',
  },
});
