import React, { createRef, useState } from "react";
import { useSelector } from "react-redux";
import AddModal from "./addModal";
import ViewModal from "./ViewModal";

export default function Designs() {
    const access = useSelector((state) => state.admin.access);
    const { designs } = useSelector((state) => state.content);
    const [addDesign, setAddDesign] = useState(false);
    const [view, setView] = useState(false);
    const selected = [];

    return (
        <div>
            <h1>Designs</h1>

            {access ? (
                <div id="addDesign">
                    <button onClick={() => setAddDesign(!addDesign)}>
                        Add Design
                    </button>
                </div>
            ) : null}
            {addDesign && (
                <AddModal
                    source={"Design"}
                    closeModal={() => setAddDesign(!addDesign)}
                ></AddModal>
            )}
            {view && (
                <ViewModal
                    img={[view]}
                    closeModal={() => setView(false)}
                ></ViewModal>
            )}
            <div id="designs">
                {designs
                    ? designs.map((design, idx) => {
                          selected[idx] = [];
                          return (
                              <div id="design" key={idx}>
                                  {design.title && <p>Title: {design.title}</p>}
                                  {design.description && (
                                      <p>Description: {design.description}</p>
                                  )}
                                  <>
                                      {design.imgUrls.map((url, i) => {
                                          return (
                                              <img
                                                  src={url}
                                                  id="designImg"
                                                  key={url}
                                                  ref={
                                                      (selected[idx][i] =
                                                          createRef())
                                                  }
                                                  onClick={() => {
                                                      setView(url);
                                                      //   console.log(
                                                      //       "open design Modal of",
                                                      //       selected[idx][i]
                                                      //           .current
                                                      //   );
                                                  }}
                                              />
                                          );
                                      })}
                                  </>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}
