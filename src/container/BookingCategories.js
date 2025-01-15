import { FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { C_Text, Categories } from '../components';

const BookingCategories = () => {
    
    const [ selectedId, setSelectedId ] = useState("1");

    const categoriesData = [
        { id: '1', name: 'InterCity' },
        { id: '2', name: 'Outstation' },
        { id: '3', name: 'Sharing ride' },
        { id: '4', name: 'Rental' },
    ];

    const handlePress = (id) => {
        setSelectedId(id);
    };

    return (
        <View style={{ paddingHorizontal: 20 }}>
            <C_Text content={"Booking Categories"} medium style={{ textAlign: 'left', bottom:-5 }} />
            <FlatList
                data={categoriesData}
                renderItem={({ item }) => (
                    <Categories
                        item={item}
                        isSelected={item.id === selectedId}
                        onPress={() => handlePress(item.id)}
                    />
                )}
                keyExtractor={item => item.id}
                numColumns={4}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default BookingCategories;

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
