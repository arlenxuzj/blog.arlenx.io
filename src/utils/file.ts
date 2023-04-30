import fg from 'fast-glob';

export const getFiles = async (glob: string) => {
  return fg(glob);
};
