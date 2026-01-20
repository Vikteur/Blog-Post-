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
  return {
    profile,
    isLoading,
    error,
    fetchProfile
  };
}