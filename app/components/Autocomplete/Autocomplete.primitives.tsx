import {
  useCombobox,
  UseComboboxProps,
  UseComboboxReturnValue,
} from "downshift";
import {
  createContext,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useContext,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutocompleteContext = createContext<UseComboboxReturnValue<any> | null>(
  null
);

function useAutocompleteContext<TItem>(): UseComboboxReturnValue<TItem> {
  const value = useContext(AutocompleteContext);
  if (!value) throw new Error("Autocomplete context not defined");
  return value;
}

type AutocompleteProps<TItem> = {
  options: UseComboboxProps<TItem>;
  children: ReactNode;
};

export function Autocomplete<TItem>({
  options,
  children,
}: AutocompleteProps<TItem>): ReactElement {
  const combobox = useCombobox(options);

  return (
    <AutocompleteContext.Provider value={combobox}>
      {children}
    </AutocompleteContext.Provider>
  );
}

export const AutocompleteTrigger = forwardRef(
  (
    props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const { getComboboxProps } = useAutocompleteContext();
    return <div {...props} {...getComboboxProps()} ref={ref} />;
  }
);

AutocompleteTrigger.displayName = "AutocompleteTrigger";

export const AutocompleteInput = forwardRef(
  (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    const { getInputProps } = useAutocompleteContext();
    return <input {...props} {...getInputProps()} ref={ref} />;
  }
);

AutocompleteInput.displayName = "AutocompleteInput";

export const AutocompleteToggleButton = forwardRef(
  (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    ref: ForwardedRef<HTMLButtonElement>
  ): ReactElement => {
    const { getToggleButtonProps } = useAutocompleteContext();
    return <button {...props} {...getToggleButtonProps()} ref={ref} />;
  }
);

AutocompleteToggleButton.displayName = "AutocompleteToggleButton";

export const AutocompleteLabel = forwardRef(
  (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    ref: ForwardedRef<HTMLLabelElement>
  ): ReactElement => {
    const { getLabelProps } = useAutocompleteContext();
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    return <label {...props} {...getLabelProps()} ref={ref} />;
  }
);

AutocompleteLabel.displayName = "AutocompleteLabel";

export const AutocompleteMenu = forwardRef(
  (
    props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    ref: ForwardedRef<HTMLElement>
  ): ReactElement | null => {
    const { getMenuProps, isOpen } = useAutocompleteContext();
    if (!isOpen) return null;
    return <div {...props} {...getMenuProps()} ref={ref} />;
  }
);

AutocompleteMenu.displayName = "AutocompleteMenu";

type AutocompleteItemProps<TItem> = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  index?: number;
  item: TItem;
  disabled?: boolean;
};

function AutocompleteItemInner<TItem>(
  { index, item, disabled, ...props }: AutocompleteItemProps<TItem>,
  ref: ForwardedRef<HTMLElement>
): ReactElement {
  const { getItemProps, highlightedIndex } = useAutocompleteContext();
  return (
    <div
      {...props}
      {...getItemProps({
        index,
        item,
        isSelected: highlightedIndex === index,
        disabled,
      })}
      ref={ref}
    />
  );
}

export const AutocompleteItem = forwardRef(AutocompleteItemInner);
