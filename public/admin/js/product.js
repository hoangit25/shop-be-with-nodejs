///change status
const buttonStatusChange = document.querySelectorAll("[button-change-status]")
if (buttonStatusChange.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonStatusChange.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChanged = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${statusChanged}` + `/${id}` + `?_method=PATCH`;

            formChangeStatus.action = action;

            formChangeStatus.submit();

        })
    })
}

// CHECK/CHECKED all products       

const checkBox = document.querySelector(`input[name="checkall"]`);
const checkProducts = document.querySelectorAll(`input[name="id"]`);
if (checkBox) {
    checkBox.addEventListener('change', () => {
        checkProducts.forEach(checkProduct => {
            if (checkBox.checked) {
                checkProduct.checked = checkBox.checked
            } else {
                checkProduct.checked = false;
            }
        })
    })
}


// choose check element to all
const totalCheckItem = checkProducts.length;
checkProducts.forEach(btn => {
    btn.addEventListener('change', () => {
        const checkedProduct = document.querySelectorAll(`input[name="id"]:checked`).length;
        if (checkedProduct == totalCheckItem) {
            checkBox.checked = true;
        } else {
            checkBox.checked = false;
        }
    })
})

// input id products choosed
const formChecked = document.querySelector("[form-change-multi]");
if (formChecked) {
    formChecked.addEventListener('submit', (e) => {
        e.preventDefault();
        const isComfirm = window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")
        const checkMulti = document.querySelector(`input[name="checkall"]`);
        const checkItem = document.querySelectorAll(`input[name="id"]:checked`);
        if (isComfirm) {


            if (checkItem.length > 0) {
                const inputIds = document.querySelector(`input[name="ids"]`);

                let ids = [];
                checkItem.forEach(item => {
                    const id = item.value;
                    const typeChange = e.target.elements.type.value;
                    if (typeChange === "change-position") {
                        const position = item.closest("tr").querySelector(`input[name="position"]`).value;

                        ids.push(`${id}-${position}`);
                    } else {
                        ids.push(id);
                    }

                })
                inputIds.value = ids.join(", ")
                formChecked.submit();

            }
            else {
                alert("Vui lòng chọn sản phẩm để thực hiện hành động");
            }
        } else {
            return;
        }

    }
    );
}



// delete products
const delProducts = document.querySelector("#form-delete-product");
if (delProducts) {
    const btnDel = document.querySelectorAll("[button-delete-product]");
    btnDel.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const conform = window.confirm("Bạn có chắc muốn xóa sản phẩm này không?");
            console.log(conform);
            if (conform) {

                const id = btn.getAttribute("data-id");
                const action = delProducts.getAttribute("data-path") + `/${id}` + `?_method=DELETE`;
                delProducts.action = action;
                delProducts.submit();
            } else return;
        })
    })
}
//alert nofitication
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)
}
const closeAlert = document.querySelector("[close-alert]");
if (closeAlert) {
    closeAlert.addEventListener('click', () => {
        showAlert.classList.add("alert-hidden");
    })
}

// upload image
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

    setPreviewState(false);

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




