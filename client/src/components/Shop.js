import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import AddModal from "./addModal";
import ViewModal from "./ViewModal";
import { ChartContext } from "./ChartContext";

export default function Shop() {
    const access = useSelector((state) => state.admin.access);
    const { merchandise } = useSelector((state) => state.content);
    const [addMerch, setAddMerch] = useState(false);
    const [view, setView] = useState(false);

    const { chart, dispatch } = useContext(ChartContext);

    return (
        <div>
            <h1>Shop</h1>
            <div>
                <p>Chart</p>
                {chart.map((x) => {
                    return <p>{x}</p>;
                })}
            </div>

            {access ? (
                <div id="addDesign">
                    <button onClick={() => setAddMerch(!addMerch)}>
                        Add Merch
                    </button>
                </div>
            ) : null}
            {addMerch && (
                <AddModal
                    source={"Merch"}
                    closeModal={() => setAddMerch(!addMerch)}
                ></AddModal>
            )}

            {view && (
                <ViewModal
                    img={[view]}
                    closeModal={() => setView(false)}
                    source="Shop"
                ></ViewModal>
            )}
            <div id="designs">
                {merchandise
                    ? merchandise.map((merch, idx) => {
                          return (
                              <div id="design" key={idx}>
                                  {merch.title && (
                                      <p id="merchTitle">{merch.title}</p>
                                  )}
                                  {merch.description && (
                                      <p id="merchDescription">
                                          {merch.description}
                                      </p>
                                  )}
                                  <>
                                      {merch.imgUrls.map((url) => (
                                          <img
                                              src={url}
                                              id="designImg"
                                              key={url}
                                              onClick={() => {
                                                  setView(url);
                                              }}
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
