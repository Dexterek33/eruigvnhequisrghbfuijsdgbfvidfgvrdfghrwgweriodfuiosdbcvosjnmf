var sex = "m";
var upload = document.querySelector(".upload");
var save = document.querySelector(".save");

var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        setSelectorOption(option.id);
    });
});

function setSelectorOption(id) {
    sex = id;
    document.querySelectorAll(".selector_option").forEach((option) => {
        if (option.id === id) {
            document.querySelector(".selected_text").innerHTML = option.innerHTML;
        }
    });
}

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    });
});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', (event) => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");

    upload.removeAttribute("selected");

    var file = imageInput.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        var url = event.target.result;
        upload.classList.remove("error_shown");
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");
        setUpload(url);
    };
});

function setUpload(url) {
    upload.setAttribute("selected", url);
    upload.querySelector(".upload_uploaded").src = url;
}

document.querySelectorAll('.input').forEach((element) => {
    element.addEventListener('click', () => {
        element.classList.remove('error_shown');
    });
});

save.addEventListener('click', () => {
    if (!save.classList.contains("image_button_loading")) {
        var empty = [];
        var data = {};

        data["sex"] = sex;

        if (!upload.hasAttribute("selected")) {
            empty.push(upload);
            upload.classList.add("error_shown");
        } else {
            data['image'] = upload.getAttribute("selected");
        }

        var dateEmpty = false;
        document.querySelectorAll(".date_input").forEach((element) => {
            if (isEmpty(element.value)) {
                dateEmpty = true;
            } else {
                data[element.id] = parseInt(element.value);
            }
        });

        if (dateEmpty) {
            var dateElement = document.querySelector(".date");
            dateElement.classList.add("error_shown");
            empty.push(dateElement);
        }

        document.querySelectorAll(".input_holder").forEach((element) => {
            var input = element.querySelector(".input");
            if (isEmpty(input.value)) {
                empty.push(element);
                input.classList.add("error_shown");
            } else {
                data[input.id] = input.value;
            }
        });

        if (empty.length !== 0) {
            empty[0].scrollIntoView();
        } else {
            // ✅ Zapisz dane do localStorage i przekieruj do id.html
            localStorage.setItem('cardData', JSON.stringify(data));
            window.location.href = 'id.html';
        }
    }
});

function isEmpty(value) {
    let pattern = /^\s*$/;
    return pattern.test(value);
}
