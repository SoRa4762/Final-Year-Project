import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Post from "../HomePage/Post";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const Feed = ({ id }) => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const reversedListOfPosts = Array.from(listOfPosts).reverse();

  useEffect(() => {
    id
      ? axios
          .get(`http://localhost:3006/posts/byuserId/${id}`)
          .then((response) => {
            setListOfPosts(response.data);
          })
      : axios
          .get("http://localhost:3006/posts", {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((response) => {
            setListOfPosts(response.data);
          });
  }, [id]);

  return (
    <Container
      sx={{ backgroundColor: "#252424", paddingTop: useTheme().spacing(5) }}
    >
      {reversedListOfPosts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </Container>
  );
};

export default Feed;
