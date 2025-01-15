import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, C_TextInput } from '../../../components';
import Colors from '../../../themes/Colors';
import { BackVerctor } from '../../../assets/icons';
import { useRoute } from '@react-navigation/native';

const cityData = [
    'Adilabad',
    'Adoni',
    'Adityapur',
    'Aligarh',
    'Allahabad',
    'Amritsar',
    'Bangalore', 
    'Bhopal',
    // Add more cities here...
];

const OperationalCities = ({navigation}) => {
    const route = useRoute();
    const { name } = route?.params; 

    const [selectedCity, setSelectedCity] = useState('');
    const [filteredCities, setFilteredCities] = useState(cityData);

    const handleSearch = (text) => {
        setSelectedCity(text);
        if (text) {
            const filtered = cityData.filter(city =>
                city.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities(cityData);
        }
    };

    const renderCityItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cityItem} onPress={() => { navigation.navigate('Register', { selectedCity: item,name })}}>
                <Text style={styles.cityText}>{item}</Text>
                <BackVerctor style={styles.rotatedIcon} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={[CommonStyles.container]}>
            <BackButton left text="Operational Cities" />
            <View style={{ padding: 20 }}>
                <C_TextInput
                    value={selectedCity}
                
                    onChangeText={handleSearch}
                    placeholder="Search for a city"
                />
                <FlatList
                    data={filteredCities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCityItem}
                />
            </View>
        </View>
    );
};

export default OperationalCities;

const styles = StyleSheet.create({
    cityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgrey,
    },
    cityText: {
        fontSize: 16,
        color: Colors.black,
    },
    rotatedIcon: {
        transform: [ { rotate: '180deg' } ],
        right:10
      },
});
