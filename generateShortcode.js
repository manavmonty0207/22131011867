import { v4 as uuidv4 } from 'uuid';

export const generateShortcode = () => {
  return uuidv4().slice(0, 6);
};
