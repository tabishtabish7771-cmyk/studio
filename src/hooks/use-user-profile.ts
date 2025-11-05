'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/lib/types';

const defaultProfile: UserProfile = {
  name: '',
  age: '',
  gender: '',
  medicalConditions: '',
};

const USER_PROFILE_KEY = 'healthwise-user-profile';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(USER_PROFILE_KEY);
      if (item) {
        const parsedProfile = JSON.parse(item);
        // Basic validation to ensure object shape is correct
        if (
          'name' in parsedProfile &&
          'age' in parsedProfile &&
          'gender' in parsedProfile &&
          'medicalConditions' in parsedProfile
        ) {
          setProfile(parsedProfile);
        }
      }
    } catch (error) {
      console.error('Failed to parse user profile from localStorage', error);
      // Fallback to default profile
      setProfile(defaultProfile);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProfile = useCallback((newProfile: UserProfile) => {
    try {
      const profileToSave = { ...newProfile, age: Number(newProfile.age) || '' };
      window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileToSave));
      setProfile(profileToSave);
    } catch (error) {
      console.error('Failed to save user profile to localStorage', error);
    }
  }, []);

  return { profile, saveProfile, isLoaded };
}
