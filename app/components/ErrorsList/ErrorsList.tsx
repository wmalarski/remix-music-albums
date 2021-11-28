import { ReactElement } from "react";
import { FetcherError } from "~/api/fetcher";

type ErrorsListProps = {
  errors?: FetcherError[];
};

export const ErrorsList = ({ errors }: ErrorsListProps): ReactElement => {
  return (
    <div>
      <p>Errors</p>
      <div>
        {errors?.map((error) => (
          <p key={error.message}>{error.message}</p>
        ))}
      </div>
    </div>
  );
};
