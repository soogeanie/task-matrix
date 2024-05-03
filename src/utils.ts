export const checkIfArrayIsUnique = (array: Array<string | number>) => {
  return array.length === new Set(array).size
}