import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { C_Text } from '../components';
import { ProductIcon } from '../assets/icons';
import { navigate } from '../services/navigationService';

const ProductContainer = () => {
    const [ selectedId, setSelectedId ] = useState("");

    const transportOptions = [
        { id: '1', name: 'Book Any', waitTime: '1 min', price: '₹400 - 450', totalprice: '₹400 - 450', subText: 'Prime sedan, mini' },
        { id: '2', name: 'Prime Sedan', waitTime: '1 min', price: '₹400', totalprice: '₹450', subText: 'Spacious sedan, top drivers' },
        { id: '3', name: 'Auto', waitTime: '5 min', price: '₹210', totalprice: '₹250', subText: 'Quickest auto ride in town' },
        { id: '4', name: 'Bike', waitTime: '2 min', price: '₹82', totalprice: '₹100', subText: 'Fully discounted fare' },
        { id: '5', name: 'Book Any', waitTime: '1 min', price: '₹400 - 450', totalprice: '₹400 - 450', subText: 'Prime sedan, mini' },
        { id: '6', name: 'Prime Sedan', waitTime: '1 min', price: '₹400', totalprice: '₹450', subText: 'Spacious sedan, top drivers' },
        { id: '7', name: 'Auto', waitTime: '5 min', price: '₹210', totalprice: '₹250', subText: 'Quickest auto ride in town' },
        { id: '8', name: 'Bike', waitTime: '2 min', price: '₹82', totalprice: '₹100', subText: 'Fully discounted fare' },
    ];

    const handlePress = (id) => {
        // setSelectedId(id);
        navigate("ProductDetails")
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={transportOptions }
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={handlePress}>
                        <ProductIcon />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ProductContainer;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    headerText: {
        textAlign: 'left',
        marginBottom: 15,
        bottom: 5
    },
});
