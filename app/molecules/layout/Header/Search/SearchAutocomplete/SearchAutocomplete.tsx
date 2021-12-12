import { useCombobox } from "downshift";
import { ReactElement, useState } from "react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteItem,
  AutocompleteTrigger,
  IconButton,
  TextInput,
} from "~/components";

type SearchAutocompleteProps = {
  items: string[];
  // onInputValueChange:
};

export const SearchAutocomplete = ({
  items,
}: SearchAutocompleteProps): ReactElement => {
  const [inputItems, setInputItems] = useState(items);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() ?? "")
        )
      );
    },
    onSelectedItemChange: (changes) =>
      console.log("onSelectedItemChange", { changes }),
  });
  return (
    <Autocomplete>
      <AutocompleteTrigger {...getComboboxProps()}>
        <TextInput {...getInputProps()} />
        <IconButton
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </IconButton>
      </AutocompleteTrigger>
      <AutocompleteContent {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <AutocompleteItem
              active={highlightedIndex === index}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </AutocompleteItem>
          ))}
      </AutocompleteContent>
    </Autocomplete>
  );
};
