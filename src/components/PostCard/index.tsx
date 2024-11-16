import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as sx from "./styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addLike, isFavorite, removeLike } from "../utils";

type TPost = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

type TComment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};

export const PostCard = () => {
  const [post, setPost] = useState<TPost>();
  const [comments, setComments] = useState<TComment[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(() => isFavorite(Number(id)));

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setPost(json));

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((json) => setComments(json));
  }, [id]);

  const postComment = () => {
    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify({
        postId: Number(id),
        name,
        email,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json.id += Math.floor(Math.random() * 100);
        setComments(comments.concat(json));
      });
    setName("");
    setEmail("");
    setBody("");
  };

  return (
    <>
      <Card sx={sx.card}>
        <CardContent sx={sx.content}>
          <Paper elevation={3} sx={sx.paper}>
            <Typography gutterBottom variant="button">
              Title:
            </Typography>
            <Typography>{post?.title}</Typography>
            <Typography gutterBottom variant="button">
              Body:
            </Typography>
            <Typography>{post?.body}</Typography>
          </Paper>
          <Paper elevation={3} sx={sx.paper}>
            <Typography variant="button">Comments:</Typography>
            {comments.map((comment, index) => (
              <li style={sx.comment} key={comment.id}>
                <span>{index + 1}:</span>
                <div>
                  <div>
                    <Typography component="span" color="#1976d2">
                      Name:
                    </Typography>{" "}
                    {comment.name}
                  </div>
                  <div>
                    <Typography component="span" color="#1976d2">
                      Body:
                    </Typography>{" "}
                    {comment.body}
                  </div>
                  <div>
                    <Typography component="span" color="#1976d2">
                      Email:
                    </Typography>{" "}
                    {comment.email}
                  </div>
                </div>
              </li>
            ))}
          </Paper>
          <Paper elevation={3} sx={sx.paper}>
            <Box sx={sx.commentsContainer}>
              <TextField
                sx={sx.field}
                label="Name"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
              />
              <TextField
                sx={sx.field}
                label="Email"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
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
              <Button size="small" variant="contained" onClick={postComment}>
                Post Comment
              </Button>
            </Box>
          </Paper>
        </CardContent>
        <CardActions>
          {!liked && (
            <FavoriteBorderIcon
            style={{cursor: 'pointer'}}
              onClick={() => {
                addLike(Number(id));
                setLiked(true);
              }}
            />
          )}
          {liked && (
            <FavoriteIcon
              style={{cursor: 'pointer'}}
              onClick={() => {
                removeLike(Number(id));
                setLiked(false);
              }}
            />
          )}
          <Button size="small" variant="contained" onClick={() => navigate(-1)}>
            Go back
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
