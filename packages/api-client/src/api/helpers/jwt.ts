export const getTokenFromAuthHeader = (header: string | null): string | null => header && header.replace('Bearer ', '');
