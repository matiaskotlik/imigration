import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import PdfRendererView from 'react-native-pdf-renderer';
import tw from 'twrnc';

export default function PDFViewScreen() {
  const theme = useTheme();
  const { source } = useLocalSearchParams<{ source: string }>();
  console.log('source', source);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'PDF Viewer',
        }}
      />
      <SafeAreaView style={tw`flex-1`}>
        <PdfRendererView
          distanceBetweenPages={16}
          maxZoom={5}
          source={source}
          style={{ backgroundColor: theme.colors.background }}
        />
      </SafeAreaView>
    </>
  );
}
