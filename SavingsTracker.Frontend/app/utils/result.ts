export const success = <T>(data: T) => ({ success: true, data }) as const;

export const error = <T>(error: T) => ({ success: false, error }) as const;
