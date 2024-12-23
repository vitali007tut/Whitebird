import { useEffect, useState } from "react";
import * as sx from "./styles";
import { Box, Button, Tooltip, Zoom } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";

type TUser = {
  id: string;
  name: string;
  username: string;
};

type TProps = {
  changeId: (id: string) => void;
};

export const Users = ({ changeId }: TProps) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [activeId, setActiveIndex] = useState<string>("");
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  const handleActiveUser = (id: string) => {
    setActiveIndex(id);
    changeId(id);
  };

  const handleShowAll = () => {
    setActiveIndex("");
    changeId("");
  };

  return (
    <div>
      <Box sx={sx.title}>
        <div>Users list</div>
        <div>
          {activeId && (
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleShowAll}
            >
              Show all posts
            </Button>
          )}
        </div>
      </Box>
      {!users.length && <div>Loading...</div>}
      <ul>
        {users.length !== 0 &&
          users.map((user) => (
            <Box
              sx={sx.card}
              component={"div"}
              key={user.id}
              className={activeId === user.id ? "active" : ""}
              onClick={() => handleActiveUser(user.id)}
            >
              {user.username}
              <Tooltip TransitionComponent={Zoom} title="Personal account" color="primary">
                  <AccountBoxIcon onClick={() => navigate(`user/${user.id}`)} />
              </Tooltip>
            </Box>
          ))}
      </ul>
    </div>
  );
};
