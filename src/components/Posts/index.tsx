import { Button, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as sx from "./styles";
import { useNavigate } from "react-router-dom";
import { getFavotiteArray } from "../utils";
import { log } from "console";

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
  const navigate = useNavigate();
  const ref = useRef<TPosts[]>()
  const refFilterMode = useRef<boolean>(false)

  useEffect(() => {
    const url = userId
      ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      : "https://jsonplaceholder.typicode.com/posts";

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (refFilterMode.current) {
          ref.current = json;
          const array = getFavotiteArray()
          const filtered = ref.current?.filter(post => array.includes(Number(post.id)))
          setPosts(filtered??[])
        } else setPosts(json)
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleClickPost = (id: string) => {
    navigate(`/post/${id}`)
  }

  const showFavorite = () => {
    ref.current = posts;
    const array = getFavotiteArray()
    const filtered = posts.filter(post => array.includes(Number(post.id)))
    setPosts(filtered)
    refFilterMode.current = true
  }

  const showAll = () => {
    setPosts(ref.current??[])
    refFilterMode.current = false
  }

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
        {!refFilterMode.current && <Button size="small" variant="contained" onClick={showFavorite}>
          Show favorite posts</Button>}
        {refFilterMode.current && <Button 
        size="small" 
        variant="contained"
        color="secondary"
        onClick={showAll}
        >Сancel favorite filtration</Button>}
      </Box>
      <ul>
        {posts.length !== 0 &&
          posts.map((post) => (
            <li key={post.id}>
              <Box sx={sx.card}>
                <span>{post.title}</span>
                <Button size="small" onClick={() => handleClickPost(post.id)}>Learn More</Button>
              </Box>
            </li>
          ))}
      </ul>
    </div>
  );
};
