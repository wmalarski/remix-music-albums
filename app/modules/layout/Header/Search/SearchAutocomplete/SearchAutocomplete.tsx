import { useCombobox } from "downshift";
import { ReactElement } from "react";
import { SearchQuery } from "~/api/types.server";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteTrigger,
  IconButton,
  TextInput,
} from "~/components";

type Props = {
  data?: SearchQuery;
  onInputValueChange: (inputValue?: string) => void;
  onSelectedAlbumChange: (id: number) => void;
  onSelectedArtistChange: (id: number) => void;
};

export const SearchAutocomplete = ({
  data,
  onInputValueChange,
  onSelectedAlbumChange,
  onSelectedArtistChange,
}: Props): ReactElement => {
  const artistShift = data?.album.length ?? 0;
  const inputItems = [...(data?.album ?? []), ...(data?.artist ?? [])];

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
    onInputValueChange: ({ inputValue }) => onInputValueChange(inputValue),
    onSelectedItemChange: (changes) => {
      const item = changes.selectedItem;
      if (!item) return;

      switch (item.__typename) {
        case "album": {
          onSelectedAlbumChange(item.id);
          return;
        }
        case "artist": {
          onSelectedArtistChange(item.id);
          return;
        }
      }
    },
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
        {isOpen && (
          <>
            <AutocompleteLabel>Albums</AutocompleteLabel>
            {data?.album.map((item, index) => (
              <AutocompleteItem
                active={highlightedIndex === index}
                key={`album-${item.id}`}
                {...getItemProps({ item, index })}
              >
                {`${item.title} - ${item.artistByArtist.name}`}
              </AutocompleteItem>
            ))}
            <AutocompleteLabel>Artists</AutocompleteLabel>
            {data?.artist.map((item, index) => (
              <AutocompleteItem
                active={highlightedIndex === index + artistShift}
                key={`artist-${item.id}`}
                {...getItemProps({ item, index: index + artistShift })}
              >
                {item.name}
              </AutocompleteItem>
            ))}
          </>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
};
