const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const inputImage = uploadImage.querySelector("[upload-image-input]");
    const previewImage = uploadImage.querySelector("[upload-image-preview]");
    const removeImageButton = uploadImage.querySelector("[upload-image-button]");
    const placeholder = uploadImage.querySelector("[upload-image-placeholder]");
    let currentObjectUrl = null;

    const setPreviewState = (hasImage) => {
        if (!previewImage || !removeImageButton) return;
        previewImage.style.display = hasImage ? "block" : "none";
        removeImageButton.style.display = hasImage ? "inline-flex" : "none";
        if (placeholder) placeholder.style.display = hasImage ? "none" : "block";
        if (!hasImage) {
            previewImage.removeAttribute("src");
        }
    };

    setPreviewState(true);

    inputImage.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) {
            if (currentObjectUrl) {
                URL.revokeObjectURL(currentObjectUrl);
                currentObjectUrl = null;
            }
            setPreviewState(false);
            return;
        }

        if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
        currentObjectUrl = URL.createObjectURL(file);
        previewImage.src = currentObjectUrl;
        setPreviewState(true);
    });

    if (removeImageButton) {
        removeImageButton.addEventListener("click", () => {
            inputImage.value = "";
            if (currentObjectUrl) {
                URL.revokeObjectURL(currentObjectUrl);
                currentObjectUrl = null;
            }
            setPreviewState(false);
        });
    }
}