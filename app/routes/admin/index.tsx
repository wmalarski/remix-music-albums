import { ReactElement } from "react";
import { Link } from "remix";

const AdminIndex = (): ReactElement => {
  return (
    <p>
      <Link to="new">Create a New Post</Link>
    </p>
  );
};

export default AdminIndex;
