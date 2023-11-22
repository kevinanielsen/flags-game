import { badWordsList } from "./badWordsList";
const checkForBadWords: (str: string) => boolean = (str: string) => {
  if (badWordsList.includes(str.toLowerCase())) return true;
  if (badWordsList.join("").toLowerCase().includes(str.toLowerCase()))
    return true;
  return false;
};

export default checkForBadWords;
