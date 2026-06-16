interface CheckSessionResponse {
  success: boolean;
}

export const checkSession = async (): Promise<CheckSessionResponse> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await api.get<CheckSessionResponse>('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};