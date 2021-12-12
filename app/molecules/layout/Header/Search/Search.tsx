import { ReactElement } from "react";
import { SearchAutocomplete } from "./SearchAutocomplete/SearchAutocomplete";

const items = ["Afg", "Belgium"];

export const Search = (): ReactElement => {
  return <SearchAutocomplete items={items} />;
};
