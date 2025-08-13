import React, { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeContext } from './ThemeProvider';

export const WebAppView: React.FC = () => {
  const { branding } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoadStart = () => {
    setLoading(true);
    setError(null);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (errorEvent: any) => {
    setLoading(false);
    setError('Failed to load the web application');
    console.error('WebView error:', errorEvent.nativeEvent);
  };

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: branding.colors.background }]}>
        <Text style={[styles.errorText, { color: branding.colors.text }]}>
          {error}
        </Text>
        <Text style={[styles.errorSubText, { color: branding.colors.text }]}>
          Please check your internet connection and try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={[styles.loadingContainer, { backgroundColor: branding.colors.background }]}>
          <ActivityIndicator size="large" color={branding.colors.primary} />
          <Text style={[styles.loadingText, { color: branding.colors.text }]}>
            Loading {branding.webapp.title}...
          </Text>
        </View>
      )}
      
      <WebView
        source={{ uri: branding.webapp.url }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        startInLoadingState={false}
        scalesPageToFit={true}
        allowsBackForwardNavigationGestures={true}
        // Optional: Add custom headers if needed for authentication
        // injectedJavaScript={customJavaScript}
        // onMessage={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorSubText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});
