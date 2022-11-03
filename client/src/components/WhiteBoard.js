import React, { useEffect } from "react";
import * as p5 from "p5";
let ttS;
let bdS;
let z;
export default function WhiteBoard({
    tattoo,
    bodyImage,
    tattooSize,
    bodySize,
    zoom,
}) {
    ttS = tattooSize;
    bdS = bodySize;
    z = zoom;
    let canvasW = 1600;
    let canvasH = 2000;
    let x = -tattooSize;
    let y = -tattooSize;
    let click = false;
    let design;
    let body;
    let b;
    let d;
    //to commit

    const Sketch = (p5) => {
        p5.preload = () => {
            design = p5.loadImage(tattoo, () => {
                design.resize(400, 0);
            });

            body = p5.loadImage(bodyImage, () => {
                body.resize(800, 0);
            });
        };
        p5.setup = () => {
            p5.frameRate(15);
            p5.createCanvas(canvasW, canvasH);
        };
        p5.draw = () => {
            b = body;
            d = design;
            p5.background(255, 255, 255);
            p5.image(b, 0, 0, b.width * bdS * z, b.height * bdS * z);
            p5.image(d, x, y, d.width * ttS * z, d.height * ttS * z);
            moveElement(p5, d.width * ttS * z, d.height * ttS * z);
        };
    };

    //Functions

    const moveElement = (p5, tw, th) => {
        if (
            (p5.mouseX <= canvasW) &
            (p5.mouseX >= 0) &
            (p5.mouseY <= canvasH) &
            (p5.mouseY >= 0)
        ) {
            if (!click) {
                x = p5.mouseX - tw / 2;
                y = p5.mouseY - th / 2;
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
    useEffect(() => {
        ttS = tattooSize;
        console.log("change Size", tattooSize);
    }, [tattooSize, bodySize]);

    //Build Sketch
    useEffect(() => {
        deleteCanvas();
        new p5(Sketch, "whiteBoard");
    }, [tattoo, bodyImage]);
    return <></>;
}
const deleteCanvas = () => {
    let elem = document.querySelectorAll("canvas");
    if (elem[0]) {
        console.log("delete");
        elem[0].parentNode.removeChild(elem[0]);
    }
};
