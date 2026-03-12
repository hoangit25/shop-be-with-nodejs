//button locj status
const buttonStatus = document.querySelectorAll('[button-status]');
console.log(buttonStatus);
if (buttonStatus.length > 0) {
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            let url = new URL(window.location.href);
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);

            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
}

//products search
const formSearch = document.querySelector('#form-search');
if (formSearch) {
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const valueSeach = e.target.elements.keyword.value;
        console.log(valueSeach);
        if (valueSeach) {
            url.searchParams.set("keyword", valueSeach);

        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })

}
//button pagination

const btnPage = document.querySelectorAll("[button-pagination]")

if (btnPage) {
    btnPage.forEach(btn => {
        const url = new URL(window.location.href);
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const valuePage = e.target.getAttribute("button-pagination")
            if (valuePage) {
                url.searchParams.set("page", valuePage)
            }
            window.location.href = url.href
        })
    })
}

//params sort product in [GET]admin/products
const sortProsuct = document.querySelector('[sort]')

if (sortProsuct) {
    const formSort = document.querySelector('[sort-select]');
    if (formSort) {
        console.log(formSort)
        const url = new URL(window.location.href);
        formSort.addEventListener('change', (e) => {
            e.preventDefault();
            const valueSort = e.target.value.split('-');
            let [sort, value] = valueSort;
            url.searchParams.set('sortKey', sort);
            url.searchParams.set('sortValue', value);

            window.location.href = url.href;



        });
        // button clear sort
        const clearSort = document.querySelector('[clear-sort]');
        if (clearSort) {
            clearSort.addEventListener('click', (e) => {
                e.preventDefault();
                const url = new URL(window.location.href);
                url.searchParams.delete('sortKey');
                url.searchParams.delete('sortValue');
                window.location.href = url.href;
            }
            )
        }

        // change disable selected sort

        const sortKey = url.searchParams.get('sortKey');
        const sortValue = url.searchParams.get('sortValue');
        console.log(sortKey, sortValue);
        const optionSelected = formSort.querySelector(`option[value="${sortKey}-${sortValue}"]`);
        if (optionSelected) {
            console.log(optionSelected);
            optionSelected.selected = true;
        }
    }
}
