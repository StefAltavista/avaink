import React, { useState, createRef } from "react";
import { useSelector } from "react-redux";
import AddModal from "./addModal";
import DashboardGallery from "./DashboardGallery";

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
                ? posts.map((post, postIdx) => {
                      return (
                          <div
                              id="post"
                              key={postIdx}
                              onClick={() =>
                                  console.log("open Post Modal, index", postIdx)
                              }
                          >
                              <div id="postText">
                                  {post.title && (
                                      <p id="postTitle">{post.title}</p>
                                  )}
                                  {post.description && (
                                      <p id="postDescription">
                                          {post.description}
                                      </p>
                                  )}
                              </div>
                              <DashboardGallery
                                  images={post.imgUrls}
                                  postIdx={postIdx}
                              ></DashboardGallery>
                          </div>
                      );
                  })
                : null}
        </div>
    );
}
