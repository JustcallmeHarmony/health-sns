import firestore from '@react-native-firebase/firestore';
import {retry} from 'react-native-track-player/lib/src/trackPlayer';

export const userCollection = firestore().collection('users');

export function creatUser({id, displayName, photoURL}) {
  return userCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getUser(id) {
  const doc = await userCollection.doc(id).get();
  return doc.data();
}
