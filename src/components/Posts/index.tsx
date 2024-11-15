import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import * as sx from "./styles";

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

  useEffect(() => {
    const url = userId
      ? `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      : "https://jsonplaceholder.typicode.com/posts";

    fetch(url)
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .finally(() => setLoading(false));
  }, [userId]);

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
      </Box>
      <ul>
        {posts.length !== 0 &&
          posts.map((post) => (
            <li key={post.id}>
              <Box sx={sx.card}>
                <span>{post.title}</span>
                <Button size="small">Learn More</Button>
              </Box>
            </li>
          ))}
      </ul>
    </div>
  );
};
