import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';
import { FontSize } from './Fonts';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  authTitleVerticalGap: {
    marginVertical: 10,
  },
  containerWrap: {
    flex: 1,
    paddingHorizontal: 15,
  },
  marginTop7: {
    marginTop: 7,
  },
  screenWidth: {
    width: screenWidth,
  },
  screenHeight: {
    height: screenHeight,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifySpaceAround: {
    justifyContent: 'space-around',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  paddingHorizontal: {
    paddingHorizontal: 15, 
  },
  paddingVertical: {
    paddingVertical: 10, 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainerCenter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    position:"absolute",
    bottom:0
  },
  modalContentCenter: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent:"center",
    alignItems: 'center',
  },
    bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: Colors.white,
    paddingBottom: 10,
    alignItems:"center",
    paddingHorizontal:20
  },
  modalText: {
    fontSize: FontSize.FS16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: Colors.blue, 
    fontSize: FontSize.FS14,
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 10,
    paddingHorizontal: 10,
    alignSelf:"flex-start"
  },
  balanceContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: screenWidth,
    height: 150,
  },
  balanceBox: {
    flex: 1, 
    marginTop: 30,
    marginHorizontal:20,
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    borderColor:Colors.primary,
    backgroundColor:Colors.inputColor
  },
  medium:{
    fontSize: FontSize.FS18,
    marginTop:8
  }
});

export const screenDimensions = { screenWidth, screenHeight };
