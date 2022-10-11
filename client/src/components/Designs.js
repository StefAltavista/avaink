import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddDesign from "./addDesign";

export default function Designs() {
    const access = useSelector((state) => state.admin.access);
    const token = useSelector((state) => state.admin.token);
    const [addDesign, setAddDesign] = useState(false);

    const { designs } = useSelector((state) => state.content);

    return (
        <div>
            {addDesign && <AddDesign></AddDesign>}
            {access ? (
                <div id="editDashboard">
                    <button onClick={() => setAddDesign(!addDesign)}>
                        Add Design
                    </button>
                </div>
            ) : null}
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
                              {" "}
                              <p>design text: {design.title}</p>
                              <img src={design.imgUrl} id="designImg" />
                          </div>
                      );
                  })
                : null}
        </div>
    );
}
