import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddModal from "./addModal";
import ViewModal from "./ViewModal";

export default function Designs() {
    const access = useSelector((state) => state.admin.access);
    const { designs } = useSelector((state) => state.content);
    const [addDesign, setAddDesign] = useState(false);
    const [view, setView] = useState(false);

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
                    source="Design"
                    closeModal={() => setView(false)}
                ></ViewModal>
            )}
            <div id="designs">
                {designs
                    ? designs.map((design, idx) => {
                          return (
                              <div id="design" key={idx}>
                                  {design.title && <p> {design.title}</p>}
                                  {design.description && (
                                      <p> {design.description}</p>
                                  )}
                                  <>
                                      {design.imgUrls.map((url, i) => {
                                          return (
                                              <img
                                                  src={url}
                                                  id="designImg"
                                                  key={url}
                                                  onClick={() => {
                                                      setView(url);
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
