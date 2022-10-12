import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddModal from "./addModal";

export default function Designs() {
    const access = useSelector((state) => state.admin.access);
    const { designs } = useSelector((state) => state.content);
    const [addDesign, setAddDesign] = useState(false);

    return (
        <div>
            <h1>Designs</h1>

            {access ? (
                <div id="editDashboard">
                    <button onClick={() => setAddDesign(!addDesign)}>
                        Add Design
                    </button>
                </div>
            ) : null}
            {addDesign && <AddModal source={"Design"}></AddModal>}
            {designs
                ? designs.map((design, idx) => {
                      return (
                          <div
                              id="design"
                              key={idx}
                              onClick={() =>
                                  console.log("open design Modal, index", idx)
                              }
                          >
                              {design.title && <p>Title: {design.title}</p>}
                              {design.description && (
                                  <p>Description: {design.description}</p>
                              )}
                              <>
                                  {design.imgUrls.map((url) => (
                                      <img src={url} id="designImg" key={url} />
                                  ))}
                              </>
                          </div>
                      );
                  })
                : null}
        </div>
    );
}
