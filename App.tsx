import './global.css';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';

import { fetchSahhaScores } from './utils/sahhaApi';

type Score = {
  type: string;
  value: number;
  endDateTime: string;
};

const convertDate = (isoDate: string) => {
  const date = new Date(isoDate);

  // Convert to a readable format (adjusts to user's local time zone)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formatted = date.toLocaleString(undefined, options);

  console.log(formatted); // Example output: "May 9, 2025, 11:59 AM"
  return formatted;
};

export default function ScoresScreen() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSahhaScores()
      .then((data: Score[]) => {
        setScores(data);
        setLoading(false);
      })
      .catch((_err: any) => {
        setError('Failed to fetch scores.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#7BFC53" />
        <Text className="mt-4 text-gray-500">Loading scores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white ps-6 pt-6">
        <Text className="mt-8 flex-1 items-center justify-center text-red-600">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      <Text className="mb-6 text-center text-2xl font-bold text-green-600">Your Health Scores</Text>

      {scores?.map((item, index) => (
        <View
          key={index}
          className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-5 shadow-md">
          <Text className="text-lg font-semibold text-green-700">{item.type}</Text>
          <Text className="text-3xl font-bold text-green-900">{item.value}</Text>
          <Text className="mt-1 text-sm text-gray-500">{convertDate(item.endDateTime)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// import { ScreenContent } from 'components/ScreenContent';
// import { StatusBar } from 'expo-status-bar';
// import './global.css';

// export default function App() {
//   return (
//     <>
//       <ScreenContent title="Home" path="App.tsx" />
//       <StatusBar style="auto" />
//     </>
//   );
// }//
