const petsModule = (function () {
    const _data = [
        {
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            soundText: "Bark - type b"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            soundText: "Meow - type m"
        }, {
            image: "https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/cow-red.jpg?itok=XrzePhsj",
            name: "Sarıkız",
            type: "Cattle",
            sound: "moo",
            soundText: "Moo - type c"
        },
        {
            image: "https://at.gen.tr/images/At-Irklari-89.jpg",
            name: "Bold Pilot",
            type: "Friesian",
            sound: "neigh",
            soundText: "Neigh - type h"
        },
        {
            image: "https://i2.milimaj.com/i/milliyet/75/0x410/5f58c2b3554283142c3e2fce.jpg",
            name: "Bolivar",
            type: "Saint Bernard",
            sound: "bark",
            soundText: "Bark - type b"
        }
    ];
    const sounKeys = {
        b: "bark",
        m: "meow",
        c: "moo",
        h: "neigh"
    }
    const $tbodyEl = document.querySelector("tbody");
    const $mainImage = document.querySelector(".main-image");

    const getButtons = function () {
        return document.querySelectorAll("button");
    }
    const getRows = function () {
        return document.querySelectorAll("tr");
    }

    const createPetElement = function (pet) {
        return "<tr><td><img class='pet-image' src='" + pet.image + "' /></td><td>" + pet.name + "</td><td>" + pet.type + "</td><td><button data-sound='" + pet.sound + "'>" + pet.soundText + "</button></td></tr>"
    };

    const addToTable = function (content) {
        $tbodyEl.innerHTML += content;
    }

    const putPetsInHtml = function () {
        for (let i = 0; i < _data.length; i++) {
            addToTable(createPetElement(_data[i]));
        }
    }

    //#region EventListeners

    function addKeyPressEventListener() {
        document.addEventListener("keypress", (e) => {
            soundId = sounKeys[e.key];
            const soundElement = document.getElementById(soundId);
            if (soundElement) {
                soundElement.play();
            }
        });
    }

    function addButtonClickListener() {
        const buttons = getButtons();
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function (event) {
                event.stopPropagation();
                const soundId = this.dataset.sound;
                const soundElement = document.getElementById(soundId);
                if (soundElement) {
                    soundElement.play();
                }
            });
        }
    }

    function addRowClickListener() {
        const $rows = getRows();

        $rows.forEach((row) => {
            row.addEventListener("click", () => {

                $rows.forEach((row) => row.classList.remove('selected'));

                row.classList.add('selected');

                $mainImage.src = row.firstElementChild.firstElementChild.src //tr > td > image .src   
            });
        });
    }

    const bindEvents = function () {
        addKeyPressEventListener();
        addButtonClickListener();
        addRowClickListener();
    }
    
    //#endregion

    const init = function () {
        putPetsInHtml();
        bindEvents();
    }

    return {
        init: init
    }
})();

petsModule.init();