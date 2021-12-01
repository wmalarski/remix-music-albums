import * as Portal from "@radix-ui/react-portal";
import { ReactElement } from "react";
import { FetcherError } from "~/api/fetcher";
import * as Styles from "./ErrorsList.styles";

type ErrorsListProps = {
  errors?: FetcherError[];
};

export const ErrorsList = ({
  errors,
}: ErrorsListProps): ReactElement | null => {
  return errors ? (
    <Portal.Root>
      <Styles.Root direction="column">
        {errors?.map((error) => (
          <p key={error.message}>{error.message}</p>
        ))}
      </Styles.Root>
    </Portal.Root>
  ) : null;
};
