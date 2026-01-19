import { useCallback, useEffect, useState } from 'react';
import { ProfileInfo } from '../types';
import { profileService } from '../services/ProfileService';
export function useProfile(userId: string) {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedProfile = await profileService.getProfileInfo(userId);
      setProfile(fetchedProfile);
    } catch (err) {
      setError('Failed to fetch profile information');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  const updateProfile = async (profileData: Partial<ProfileInfo>): Promise<ProfileInfo | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProfile = await profileService.updateProfileInfo(userId, profileData);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
      return updatedProfile;
    } catch (err) {
      setError('Failed to update profile information');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile
  };
}