export default function parseStringAsArray(arraysAsString: string) {
  return arraysAsString.split(',').map(tech => tech.trim());
}
