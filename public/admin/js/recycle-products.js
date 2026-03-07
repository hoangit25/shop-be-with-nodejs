//check all products in recycle
const btnCheckAll = document.querySelector(`input[name="checkall-recycle"]`);
if(btnCheckAll){
    btnCheckAll.addEventListener("change",()=>{
        const checkProducts = document.querySelectorAll(`input[name="id"]`);
        checkProducts.forEach(checkProduct=>{
            if(btnCheckAll.checked){
                checkProduct.checked = true;
            }else{
                checkProduct.checked = false;
            }
        })
    })
}

//check item in recycle
const checkItem = document.querySelectorAll(`input[name="id"]`);
if(checkItem.length > 0){
    const numberCheckItem =parseInt(checkItem.length);
         checkItem.forEach(checkProduct=>{
        checkProduct.addEventListener("change",()=>{
            const checkedProduct = document.querySelectorAll(`input[name="id"]:checked`).length;
            if(checkedProduct == numberCheckItem){
                btnCheckAll.checked = true;
            }else{
                btnCheckAll.checked = false;
            }
        })
    })
}
