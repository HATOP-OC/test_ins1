'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService, LoginPayload, RegisterPayload } from '@/lib/services/auth.service';
import { tokenStorage } from '@/lib/api-client';
import type { User } from '@/lib/types';
import { AxiosError } from 'axios';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = tokenStorage.get();
      if (!token) return null;
      const response = await authService.getProfile();
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (response) => {
      tokenStorage.set(response.data.token, true);
      queryClient.setQueryData(['user'], response.data.user);
      router.push('/dashboard');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (response) => {
      tokenStorage.set(response.data.token, true);
      queryClient.setQueryData(['user'], response.data.user);
      router.push('/dashboard');
    },
  });

  const logout = () => {
    tokenStorage.remove();
    queryClient.setQueryData(['user'], null);
    queryClient.clear();
    router.push('/login');
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      const responseData = error.response?.data as
        | { message?: string; errors?: Record<string, string[]> }
        | undefined;
      if (responseData?.message) {
        if (responseData.errors) {
          const firstField = Object.keys(responseData.errors)[0];
          const firstError = firstField ? responseData.errors[firstField]?.[0] : undefined;
          return firstError ? `${responseData.message}: ${firstError}` : responseData.message;
        }
        return responseData.message;
      }
      return error.message || 'An error occurred';
    }
    return 'An unexpected error occurred';
  };

  return {
    user: user as User | null,
    isLoadingUser,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error ? getErrorMessage(loginMutation.error) : null,
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error ? getErrorMessage(registerMutation.error) : null,
    logout,
  };
}
