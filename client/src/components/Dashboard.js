import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const access = useSelector((state) => state.admin.access);
    const token = useSelector((state) => state.admin.token);

    const { posts } = useSelector((state) => state.content);

    return (
        <div>
            {access ? (
                <div id="editDashboard">
                    <button onClick={() => console.log("open add post modal")}>
                        Add Post
                    </button>
                </div>
            ) : null}
            {posts
                ? posts.map((post, idx) => {
                      return (
                          <div
                              id="post"
                              key={idx}
                              onClick={() =>
                                  console.log("open Post Modal, index", idx)
                              }
                          >
                              {" "}
                              <p>post text: {post.post}</p>
                              {post.imgUrls.map((url) => (
                                  <img src={url} id="postImg" key={url} />
                              ))}
                          </div>
                      );
                  })
                : null}
        </div>
    );
}
