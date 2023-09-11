export const removeDuplicatesArray = (data: string[]): string[] => {
  const setObject = new Set(data)
  return [...setObject]
}
