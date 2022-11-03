import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddModal from "./addModal";
import ViewModal from "./ViewModal";

export default function Shop() {
    const access = useSelector((state) => state.admin.access);
    const { merchandise } = useSelector((state) => state.content);
    const [addMerch, setAddMerch] = useState(false);
    const [viewMerch, setViewMerch] = useState(false);

    return (
        <div>
            <h1>Shop</h1>

            {access ? (
                <div id="addDesign">
                    <button onClick={() => setAddMerch(!addMerch)}>
                        Add Design
                    </button>
                </div>
            ) : null}
            {addMerch && (
                <AddModal
                    source={"Merch"}
                    closeModal={() => setAddMerch(!addMerch)}
                ></AddModal>
            )}
            {viewMerch && <ViewModal selected={viewMerch}></ViewModal>}
            <div id="designs">
                {merchandise
                    ? merchandise.map((merch, idx) => {
                          return (
                              <div
                                  id="design"
                                  key={idx}
                                  onClick={() => {
                                      console.log(
                                          "open design Modal, index",
                                          idx
                                      );
                                      setViewMerch(merch);
                                  }}
                              >
                                  {merch.title && <p>Title: {merch.title}</p>}
                                  {merch.description && (
                                      <p>Description: {merch.description}</p>
                                  )}
                                  <>
                                      {merch.imgUrls.map((url) => (
                                          <img
                                              src={url}
                                              id="designImg"
                                              key={url}
                                          />
                                      ))}
                                  </>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}
