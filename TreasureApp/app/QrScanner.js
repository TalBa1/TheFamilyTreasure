import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScan = ({ data }) => {
    setScanned(true);
    setScanResult(data);
  };

  const handleRescan = () => {
    setScanned(false);
    setScanResult(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      {scanned ? (
        <>
          <Text>Scan result: {scanResult}</Text>
          <Button title="Rescan" onPress={handleRescan} />
        </>
      ) : (
        <BarCodeScanner onBarCodeScanned={handleScan} style={{ flex: 1 }} />
      )}
    </View>
  );
}

export default QrScanner;
