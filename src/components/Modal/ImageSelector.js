import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from '../../assets/icons';
import { FontSize } from '../../themes/Fonts';
import Colors from '../../themes/Colors';

const ImageSelector = ({handlePressCamera,handlePressGallary}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Choose Image from</Text>
            <View style={styles.optionsContainer}>
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.option} onPress={handlePressCamera}>
                        <Camera />
                    </TouchableOpacity>
                    <Text style={styles.optionText}>Camera</Text>
                </View>
                <View style={styles.optionContainer}>
                <TouchableOpacity style={styles.option} onPress={handlePressGallary}>
                        <Camera />
                    </TouchableOpacity>
                    <Text style={styles.optionText}>Gallery</Text>
                </View>
            </View>
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    headerText: {
        fontSize: FontSize.FS18,
        marginVertical: 15,
        paddingHorizontal:20,
        color:Colors.black
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionContainer: {
        alignItems: 'center',
        marginHorizontal:20
    },
    option: {
        borderWidth: 1,
        padding: 20, 
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        marginTop: 10, 
        fontSize: FontSize.FS15,
        marginVertical: 15,
        color:Colors.black
    },
});
