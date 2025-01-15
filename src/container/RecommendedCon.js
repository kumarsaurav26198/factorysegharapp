import { FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { C_Text } from '../components';
import Recommended from '../components/AppComponent/Recommended';

const RecommendedCon = () => {
    const [selectedId, setSelectedId] = useState("");

    const transportOptions = [
        { id: '1', name: 'Book Any', waitTime: '1 min', price: '₹400 - 450', totalprice: '₹400 - 450', subText: 'Prime sedan, mini' },
        { id: '2', name: 'Prime Sedan', waitTime: '1 min', price: '₹400',totalprice: '₹450', subText: 'Spacious sedan, top drivers' },
        { id: '3', name: 'Auto', waitTime: '5 min', price: '₹210',totalprice: '₹250', subText: 'Quickest auto ride in town' },
        { id: '4', name: 'Bike', waitTime: '2 min', price: '₹82',totalprice: '₹100', subText: 'Fully discounted fare' },
    ];

    const handlePress = (id) => {
        setSelectedId(id);
    };

    return (
        <View style={styles.container}>
            {/* <C_Text content={"Recommended for you"} medium style={styles.headerText} /> */}
            <FlatList
                data={transportOptions}
                renderItem={({ item }) => (
                    <Recommended
                        item={item}
                        isSelected={item.id === selectedId}
                        onPress={() => handlePress(item.id)} 
                    />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default RecommendedCon;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    headerText: {
        textAlign: 'left',
        marginBottom: 15,
        bottom:5
    },
});
