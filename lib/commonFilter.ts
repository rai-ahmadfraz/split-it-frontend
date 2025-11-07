export function Capitalize(str:any) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str:string, length = 20) {
  if (!str) return '';
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export function removeSpaces(str:string) {
  if (!str) return '';
  return str.replace(/\s+/g, '');
}


export const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const getRandomColor = (name: string) => {
  const colors = [
    'primary', 'secondary', 'success', 'danger', 
    'warning', 'info', 'dark'
  ];
  const index = name.length % colors.length;
  return colors[index];
};