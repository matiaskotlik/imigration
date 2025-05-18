import {Redirect} from 'expo-router';

export default function Home() {
  if (process.env.NODE_ENV === 'development') {
    // return <Redirect href='/survey'/>;
  }

  return <Redirect href='/onboarding'/>;
}
