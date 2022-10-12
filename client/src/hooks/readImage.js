export default function readImage(img) {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);

        try {
            reader.onloadend = () => {
                res(reader.result);
            };
        } catch {
            (e) => {
                rej(e);
            };
        }
    });
}
