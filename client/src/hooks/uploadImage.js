export default async function uploadImage(files, token) {
    if (!files[0]) new Error("no file added");
    return Promise.all(
        files.map((file) => {
            return new Promise((res, rej) => {
                let formData = new FormData();
                formData.append("file", file);

                fetch("/api/uploadImage", {
                    method: "POST",
                    headers: { authorization: token },
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((response) => {
                        res(response);
                    })
                    .catch((e) => rej(e));
            });
        })
    );
}
