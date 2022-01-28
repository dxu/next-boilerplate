export function getLocalStorageKey(): string {
  return `${process.env.REACT_APP_JWT_KEY}-${process.env.NODE_ENV}`;
}
