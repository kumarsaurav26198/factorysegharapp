import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const BottomSheetContext = createContext();

export const BottomSheetProvider = ({ children }) => {
  const bottomSheetModalRef = useRef(null);
  const [content, setContent] = useState(null); 

  const snapPoints = useMemo(() => ['25%', '40%', '60%',"80%"], []);

  const openBottomSheet = (newContent) => {
    setContent(newContent); 
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetContext.Provider
        value={{
          openBottomSheet,
          closeBottomSheet,
          bottomSheetModalRef,
        }}
      >
        {children}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onDismiss={() => setContent(null)}
        >
          <BottomSheetView>
            {content} 
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetContext.Provider>
    </BottomSheetModalProvider>
  );
};

// Custom hook to use the BottomSheetContext
export const useBottomSheet = () => {
  return useContext(BottomSheetContext);
};
