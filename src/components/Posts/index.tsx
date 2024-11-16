import {
  Button,
  Box,
  Paper,
  TextField,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as sx from "./styles";
import { useNavigate } from "react-router-dom";
import { getFavotiteArray } from "../utils";
import DeleteIcon from "@mui/icons-material/Delete";

type TPosts = {
  id: string;
  body: string;
  title: string;
  userId: string;
};

type TProps = {
  userId: string;
};

export const Posts = ({ userId }: TProps) => {
  const [posts, setPosts] = useState<TPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const ref = useRef<TPosts[]>();
  const refFilterMode = useRef<boolean>(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const url = userId
      ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      : "https://jsonplaceholder.typicode.com/posts";

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (refFilterMode.current) {
          ref.current = json;
          const array = getFavotiteArray();
          const filtered = ref.current?.filter((post) =>
            array.includes(Number(post.id))
          );
          setPosts(filtered ?? []);
        } else setPosts(json);
      })
      .finally(() => setLoading(false));

      setPage(1)
  }, [userId]);

  const handleClickPost = (id: string) => {
    navigate(`/post/${id}`);
  };

  const showFavorite = () => {
    ref.current = posts;
    const array = getFavotiteArray();
    const filtered = posts.filter((post) => array.includes(Number(post.id)));
    setPosts(filtered);
    refFilterMode.current = true;
  };

  const showAll = () => {
    setPosts(ref.current ?? []);
    refFilterMode.current = false;
  };

  const handleDeletePost = (postId: number) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    });
    setPosts((prev) => prev.filter((item) => Number(item.id) !== postId));
  };

  const addPost = () => {
    const numberId = userId ? userId : Math.floor(Math.random() * 10 + 1);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: numberId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json.id += Math.floor(Math.random() * 100);
        setPosts(posts.concat(json));
      });
    setTitle("");
    setBody("");
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const currentPageItems = posts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <Box sx={sx.title}>
        {loading && <div>Loading posts...</div>}
        {!userId && !loading && <div>Found {posts.length} posts</div>}
        {userId && (
          <div>
            Found {posts.length} posts by userId: {userId}
          </div>
        )}
        {!refFilterMode.current && (
          <Button size="small" variant="contained" onClick={showFavorite}>
            Show favorite posts
          </Button>
        )}
        {refFilterMode.current && (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={showAll}
          >
            Сancel favorite filtration
          </Button>
        )}
      </Box>
      <ul>
        {currentPageItems.map((post) => (
          <li key={post.id}>
            <Box sx={sx.card}>
              <div>
                <span>{post.title}</span>
                <Button size="small" onClick={() => handleClickPost(post.id)}>
                  Learn More
                </Button>
              </div>
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleDeletePost(Number(post.id))}
              />
            </Box>
          </li>
        ))}
      </ul>
      <Pagination
        count={Math.ceil(posts.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}

            sx={sx.paginationItem}
          />
        )}
      />

      <Paper elevation={3} sx={sx.paper}>
        <Typography>Creating post</Typography>
        <Box sx={sx.commentsContainer}>
          <TextField
            sx={sx.field}
            label="Title"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            sx={sx.field}
            label="Body"
            value={body}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setBody(event.target.value);
            }}
          />
          <Button size="small" variant="contained" onClick={addPost}>
            Add post
          </Button>
        </Box>
      </Paper>
    </div>
  );
};
