import React, { useEffect } from "react";
import * as p5 from "p5";

export default function WhiteBoard({ url }) {
    console.log("whiteboard:", url);

    reset();

    let canvasW = 400;
    let canvasH = 500;
    let w = 250;
    let h = 250;
    let x = -w;
    let y = -h;

    const Sketch = (p5) => {
        let design;
        let click = false;
        p5.preload = () => {
            design = p5.loadImage(url, () => {
                design.resize(200, 200);
            });
        };
        p5.setup = () => {
            console.log("set");
            p5.frameRate(15);

            p5.createCanvas(canvasW, canvasH);
        };
        p5.draw = () => {
            p5.background(30, 40, 120);
            p5.image(design, x, y);
            if (
                (p5.mouseX <= canvasW) &
                (p5.mouseX >= 0) &
                (p5.mouseY <= canvasH) &
                (p5.mouseY >= 0)
            ) {
                if (!click) {
                    x = p5.mouseX - 100;
                    y = p5.mouseY - 100;
                }
            }
            p5.mouseClicked = () => {
                if (
                    (p5.mouseX <= canvasW) &
                    (p5.mouseX >= 0) &
                    (p5.mouseY <= canvasH) &
                    (p5.mouseY >= 0)
                ) {
                    click = !click;
                }
            };
        };
    };

    useEffect(() => {
        new p5(Sketch, "whiteBoard");
    }, [url]);

    return;
}
const reset = () => {
    let elem = document.querySelectorAll("canvas");
    if (elem[0]) {
        console.log("delete");
        elem[0].parentNode.removeChild(elem[0]);
    }
};
