import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Table } from "antd";
import Image from "next/image";
import "antd/dist/antd.css";
function About() {
  const [show, setShow] = useState(true);
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState([]);
  const colors = ["red", "green", "blue", "black", "yellow"];
  const [color, setColor] = useState(0);
  const handleColor = () => {
    setColor(Math.round(Math.random() * colors.length));
    console.log(color);
  };
  console.log(job);
  const handleShow = () => {
    setShow(!show);
  };
  const handleClick = () => {
    setJobs((prev) => [...prev, job]);
    setJob("");
  };
  // ####################
  const tags = ["posts", "comments", "albums"];
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState();
  const handleButton = (index) => {
    setTag(tags[index]);
    setTitle(tags[index]);
    console.log(tag, title);
  };
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${tag}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [tag]);
  //   ##################
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      setScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [size, setSize] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);
  return (
    <div style={{ padding: 30 }}>
      <p>please resize...{size}</p>
      <button onClick={handleShow}>Show/hide about</button>
      {show ? <div>My name is Tom</div> : ""}
      <button
        style={{
          margin: 10,
          fontWeight: "bold",
          color: "white",
          backgroundColor: colors[color],
        }}
        onClick={handleColor}
      >
        RANDOM COLOR
      </button>
      <div>
        <input
          placeholder="enter text here..."
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button style={{ margin: 10 }} onClick={handleClick}>
          add text to todolist
        </button>
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>{job}</li>
          ))}
        </ul>
        <div>################</div>
        {tags.map((tag, index) => (
          <button
            onClick={() => handleButton(index)}
            style={{ margin: 10 }}
            key={index}
          >
            {tag}
          </button>
        ))}
        <ul>
          {title && (
            <h1>
              <b style={{ textTransform: "uppercase" }}>{title}</b>
            </h1>
          )}

          {posts.map((post) => (
            <li key={post.id}>{post.title || post.name}</li>
          ))}
        </ul>
      </div>
      {scroll && (
        <button style={{ position: "fixed", bottom: 200, right: 20 }}>
          go to top
        </button>
      )}
    </div>
  );
}
export default About;
