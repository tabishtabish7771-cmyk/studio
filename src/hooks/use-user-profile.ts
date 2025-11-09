'use client';

import { useEffect, useCallback } from 'react';
import type { UserProfile } from '@/lib/types';
import {
  useAuth,
  useDoc,
  useFirestore,
  useUser,
  setDocumentNonBlocking,
  initiateAnonymousSignIn,
  useMemoFirebase,
} from '@/firebase';
import { doc } from 'firebase/firestore';

const defaultProfile: UserProfile = {
  name: '',
  age: '',
  gender: '',
  medicalConditions: '',
};

export function useUserProfile() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  // Sign in user anonymously if not already logged in
  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  const profileRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'users', user.uid, 'profile');
  }, [firestore, user?.uid]);

  const { data: profileData, isLoading: isProfileLoading } = useDoc<UserProfile>(profileRef);

  const profile = profileData ? profileData : defaultProfile;
  const isLoaded = !isUserLoading && !isProfileLoading;

  const saveProfile = useCallback(
    (newProfile: UserProfile) => {
      if (!profileRef) {
        console.error('Profile cannot be saved: user is not authenticated.');
        return;
      }
      const profileToSave: UserProfile & { id?: string } = {
        ...newProfile,
        age: Number(newProfile.age) || '',
      };
      
      // Ensure the ID in the document matches the user's UID.
      if (user) {
        profileToSave.id = user.uid;
      }

      setDocumentNonBlocking(profileRef, profileToSave, { merge: true });
    },
    [profileRef, user]
  );

  return { profile, saveProfile, isLoaded };
}
