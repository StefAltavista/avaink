export default async function uploadImmage(file, token) {
    return new Promise((res, rej) => {
        let formData = new FormData();
        formData.append("file", file);

        fetch("/api/uploadImage", {
            method: "POST",
            // headers: { "content-type": "application/json" },
            // body: JSON.stringify({ token, file: formData }),
            body: formData,
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("image response:", response);
            });
    });
}
