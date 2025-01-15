import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const BookingMap = () => {
    const [ region, setRegion ] = useState({
        latitude: 28.6494,
        longitude: 77.1620,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    const mapRef = useRef(null);

    return (
        <View style={styles.container}>
            {/* <MapView
                ref={mapRef}
                style={styles.map}
                region={region}
                showsCompass={true}
                toolbarEnabled={true}
                showsBuildings={true}
            >
                <Marker
                    coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                />
            </MapView> */}
        </View>
    );
};

export default BookingMap;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: Dimensions.get('window').height
    },
});

