import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddModal from "./addModal";

export default function Dashboard() {
    const access = useSelector((state) => state.admin.access);
    const { posts } = useSelector((state) => state.content);
    const [addPost, setAddPost] = useState(false);

    return (
        <div>
            {access ? (
                <div id="editDashboard">
                    <button onClick={() => setAddPost(!addPost)}>
                        Add Post
                    </button>
                </div>
            ) : null}
            {addPost && (
                <AddModal
                    source={"Post"}
                    closeModal={() => setAddPost(!addPost)}
                ></AddModal>
            )}
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
                              {post.title && <p>Title: {post.title}</p>}
                              {post.description && (
                                  <p>Description: {post.description}</p>
                              )}
                              <>
                                  {post.imgUrls.map((url) => (
                                      <img src={url} id="postImg" key={url} />
                                  ))}
                              </>
                          </div>
                      );
                  })
                : null}
        </div>
    );
}
