const googleUrl = document.getElementById("googleUrl");
const openReview = document.getElementById("openReview");

const phoneStyle = document.getElementById("phoneStyle");
const phoneModel = document.getElementById("phoneModel");
const phone = document.getElementById("phone");

const timeMode = document.getElementById("timeMode");
const customTimeBox = document.getElementById("customTimeBox");
const customTime = document.getElementById("customTime");
const statusTime = document.getElementById("statusTime");

const connection = document.getElementById("connection");
const wifiIcon = document.getElementById("wifiIcon");
const dataIcon = document.getElementById("dataIcon");

const simCount = document.getElementById("simCount");
const signal1 = document.getElementById("signal1");
const signal2 = document.getElementById("signal2");
const signal2Box = document.getElementById("signal2Box");
const signalContainer = document.getElementById("signalContainer");

const battery = document.getElementById("battery");
const batteryFill = document.getElementById("batteryFill");
const batteryText = document.getElementById("batteryText");

const webArea = document.getElementById("webArea");

const captureBtn = document.getElementById("captureBtn");
const copyArea = document.getElementById("copyArea");
const copyScreenshot = document.getElementById("copyScreenshot");


/* =========================================================
   PHONE MODELS
========================================================= */

const iphoneModels = [
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15 Plus",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14 Plus",
    "iPhone 14",
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13",
    "iPhone 13 mini",
    "iPhone 12 Pro Max",
    "iPhone 12 Pro",
    "iPhone 12",
    "iPhone 12 mini",
    "iPhone 11 Pro Max",
    "iPhone 11 Pro",
    "iPhone 11",
    "iPhone SE"
];

const androidModels = [
    "Samsung Galaxy S25 Ultra",
    "Samsung Galaxy S25",
    "Samsung Galaxy S24 Ultra",
    "Samsung Galaxy S24",
    "Samsung Galaxy A55",
    "Samsung Galaxy A35",

    "Infinix Note 40 Pro",
    "Infinix Hot 50 Pro",
    "Infinix Zero 40",

    "Vivo V40",
    "Vivo V30",
    "Vivo Y200",

    "OPPO Reno 12",
    "OPPO Reno 11",
    "OPPO A60",

    "Xiaomi 14",
    "Xiaomi Redmi Note 13 Pro",
    "Xiaomi Redmi Note 13",

    "OnePlus 12",
    "OnePlus 11",

    "Google Pixel 9 Pro",
    "Google Pixel 9",
    "Google Pixel 8 Pro",
    "Google Pixel 8",

    "Realme GT 6",
    "Realme 12 Pro",

    "Tecno Camon 30",
    "Tecno Spark 20",

    "Motorola Edge 50 Pro",
    "Motorola Moto G85"
];


/* =========================================================
   MODEL INFORMATION
========================================================= */

const phoneDetails = {

    "iPhone 15 Pro Max": {
        width: 390,
        height: 780,
        radius: 46,
        screenRadius: 37,
        type: "iphone-dynamic"
    },

    "iPhone 15 Pro": {
        width: 380,
        height: 770,
        radius: 45,
        screenRadius: 36,
        type: "iphone-dynamic"
    },

    "iPhone 15 Plus": {
        width: 390,
        height: 780,
        radius: 45,
        screenRadius: 36,
        type: "iphone-dynamic"
    },

    "iPhone 15": {
        width: 380,
        height: 770,
        radius: 44,
        screenRadius: 35,
        type: "iphone-dynamic"
    },

    "iPhone 14 Pro Max": {
        width: 390,
        height: 780,
        radius: 45,
        screenRadius: 36,
        type: "iphone-dynamic"
    },

    "iPhone 14 Pro": {
        width: 380,
        height: 770,
        radius: 44,
        screenRadius: 35,
        type: "iphone-dynamic"
    },

    "iPhone 14 Plus": {
        width: 390,
        height: 780,
        radius: 44,
        screenRadius: 35,
        type: "iphone-dynamic"
    },

    "iPhone 14": {
        width: 375,
        height: 760,
        radius: 43,
        screenRadius: 34,
        type: "iphone-dynamic"
    },

    "iPhone 13 Pro Max": {
        width: 390,
        height: 780,
        radius: 43,
        screenRadius: 34,
        type: "iphone-notch"
    },

    "iPhone 13 Pro": {
        width: 380,
        height: 770,
        radius: 42,
        screenRadius: 33,
        type: "iphone-notch"
    },

    "iPhone 13": {
        width: 375,
        height: 760,
        radius: 42,
        screenRadius: 33,
        type: "iphone-notch"
    },

    "iPhone 13 mini": {
        width: 350,
        height: 700,
        radius: 39,
        screenRadius: 31,
        type: "iphone-notch"
    },

    "iPhone 12 Pro Max": {
        width: 390,
        height: 780,
        radius: 40,
        screenRadius: 31,
        type: "iphone-notch"
    },

    "iPhone 12 Pro": {
        width: 380,
        height: 770,
        radius: 39,
        screenRadius: 30,
        type: "iphone-notch"
    },

    "iPhone 12": {
        width: 375,
        height: 760,
        radius: 39,
        screenRadius: 30,
        type: "iphone-notch"
    },

    "iPhone 12 mini": {
        width: 350,
        height: 700,
        radius: 37,
        screenRadius: 29,
        type: "iphone-notch"
    },

    "iPhone 11 Pro Max": {
        width: 390,
        height: 780,
        radius: 43,
        screenRadius: 32,
        type: "iphone-notch"
    },

    "iPhone 11 Pro": {
        width: 375,
        height: 760,
        radius: 42,
        screenRadius: 31,
        type: "iphone-notch"
    },

    "iPhone 11": {
        width: 375,
        height: 760,
        radius: 41,
        screenRadius: 30,
        type: "iphone-notch"
    },

    "iPhone SE": {
        width: 350,
        height: 700,
        radius: 38,
        screenRadius: 30,
        type: "iphone-home"
    },


    /* SAMSUNG */

    "Samsung Galaxy S25 Ultra": {
        width: 395,
        height: 790,
        radius: 30,
        screenRadius: 23,
        type: "samsung"
    },

    "Samsung Galaxy S25": {
        width: 380,
        height: 770,
        radius: 31,
        screenRadius: 24,
        type: "samsung"
    },

    "Samsung Galaxy S24 Ultra": {
        width: 395,
        height: 790,
        radius: 29,
        screenRadius: 22,
        type: "samsung"
    },

    "Samsung Galaxy S24": {
        width: 380,
        height: 770,
        radius: 30,
        screenRadius: 23,
        type: "samsung"
    },

    "Samsung Galaxy A55": {
        width: 375,
        height: 760,
        radius: 29,
        screenRadius: 22,
        type: "samsung"
    },

    "Samsung Galaxy A35": {
        width: 370,
        height: 750,
        radius: 28,
        screenRadius: 21,
        type: "samsung"
    },


    /* INFINIX */

    "Infinix Note 40 Pro": {
        width: 385,
        height: 775,
        radius: 27,
        screenRadius: 20,
        type: "infinix"
    },

    "Infinix Hot 50 Pro": {
        width: 380,
        height: 770,
        radius: 26,
        screenRadius: 20,
        type: "infinix"
    },

    "Infinix Zero 40": {
        width: 385,
        height: 775,
        radius: 28,
        screenRadius: 21,
        type: "infinix"
    },


    /* VIVO */

    "Vivo V40": {
        width: 378,
        height: 770,
        radius: 34,
        screenRadius: 27,
        type: "vivo"
    },

    "Vivo V30": {
        width: 375,
        height: 760,
        radius: 35,
        screenRadius: 27,
        type: "vivo"
    },

    "Vivo Y200": {
        width: 370,
        height: 750,
        radius: 32,
        screenRadius: 25,
        type: "vivo"
    },


    /* OPPO */

    "OPPO Reno 12": {
        width: 380,
        height: 770,
        radius: 35,
        screenRadius: 27,
        type: "oppo"
    },

    "OPPO Reno 11": {
        width: 375,
        height: 760,
        radius: 34,
        screenRadius: 26,
        type: "oppo"
    },

    "OPPO A60": {
        width: 370,
        height: 750,
        radius: 30,
        screenRadius: 23,
        type: "oppo"
    },


    /* XIAOMI */

    "Xiaomi 14": {
        width: 378,
        height: 765,
        radius: 31,
        screenRadius: 24,
        type: "xiaomi"
    },

    "Xiaomi Redmi Note 13 Pro": {
        width: 385,
        height: 775,
        radius: 28,
        screenRadius: 21,
        type: "xiaomi"
    },

    "Xiaomi Redmi Note 13": {
        width: 380,
        height: 770,
        radius: 27,
        screenRadius: 20,
        type: "xiaomi"
    },


    /* ONEPLUS */

    "OnePlus 12": {
        width: 390,
        height: 785,
        radius: 33,
        screenRadius: 25,
        type: "oneplus"
    },

    "OnePlus 11": {
        width: 385,
        height: 775,
        radius: 32,
        screenRadius: 25,
        type: "oneplus"
    },


    /* PIXEL */

    "Google Pixel 9 Pro": {
        width: 385,
        height: 775,
        radius: 38,
        screenRadius: 30,
        type: "pixel"
    },

    "Google Pixel 9": {
        width: 380,
        height: 770,
        radius: 37,
        screenRadius: 29,
        type: "pixel"
    },

    "Google Pixel 8 Pro": {
        width: 390,
        height: 780,
        radius: 36,
        screenRadius: 28,
        type: "pixel"
    },

    "Google Pixel 8": {
        width: 380,
        height: 770,
        radius: 35,
        screenRadius: 27,
        type: "pixel"
    },


    /* REALME */

    "Realme GT 6": {
        width: 380,
        height: 770,
        radius: 29,
        screenRadius: 22,
        type: "realme"
    },

    "Realme 12 Pro": {
        width: 375,
        height: 760,
        radius: 31,
        screenRadius: 23,
        type: "realme"
    },


    /* TECNO */

    "Tecno Camon 30": {
        width: 380,
        height: 770,
        radius: 28,
        screenRadius: 21,
        type: "tecno"
    },

    "Tecno Spark 20": {
        width: 375,
        height: 760,
        radius: 27,
        screenRadius: 20,
        type: "tecno"
    },


    /* MOTOROLA */

    "Motorola Edge 50 Pro": {
        width: 380,
        height: 770,
        radius: 35,
        screenRadius: 27,
        type: "motorola"
    },

    "Motorola Moto G85": {
        width: 375,
        height: 760,
        radius: 34,
        screenRadius: 26,
        type: "motorola"
    }
};


/* =========================================================
   PHONE MODEL DROPDOWN
========================================================= */

function updatePhoneModels() {

    phoneModel.innerHTML = "";

    const models =
        phoneStyle.value === "iphone"
            ? iphoneModels
            : androidModels;

    models.forEach(function(model) {

        const option =
            document.createElement("option");

        option.value = model;
        option.textContent = model;

        phoneModel.appendChild(option);
    });

    updatePhoneAppearance();
}


/* =========================================================
   PHONE VISUAL CHANGE
========================================================= */

function updatePhoneAppearance() {

    const model =
        phoneModel.value;

    const details =
        phoneDetails[model];

    if (!details) {
        return;
    }


    /* Remove old model classes */

    phone.className = "phone";


    /* Add style class */

    if (details.type === "iphone-dynamic") {

        phone.classList.add(
            "iphone",
            "dynamic-island"
        );

    }

    else if (details.type === "iphone-notch") {

        phone.classList.add(
            "iphone",
            "notch"
        );

    }

    else if (details.type === "iphone-home") {

        phone.classList.add(
            "iphone",
            "home-button",
            "se-model"
        );

    }

    else {

        phone.classList.add(
            "android",
            details.type
        );
    }


    /* Change actual phone size */

    phone.style.width =
        details.width + "px";

    phone.style.height =
        details.height + "px";

    phone.style.borderRadius =
        details.radius + "px";


    /* Change screen shape */

    const screen =
        document.getElementById(
            "phoneScreen"
        );

    if (screen) {

        screen.style.borderRadius =
            details.screenRadius + "px";
    }
}


phoneStyle.addEventListener(
    "change",
    updatePhoneModels
);

phoneModel.addEventListener(
    "change",
    updatePhoneAppearance
);


/* =========================================================
   TIME
========================================================= */

function updateTime() {

    if (timeMode.value === "custom") {

        customTimeBox.classList.remove(
            "hidden"
        );

        if (customTime.value) {

            statusTime.textContent =
                customTime.value;
        }

        return;
    }

    customTimeBox.classList.add(
        "hidden"
    );

    const now =
        new Date();

    let hours =
        String(now.getHours())
            .padStart(2, "0");

    let minutes =
        String(now.getMinutes())
            .padStart(2, "0");

    statusTime.textContent =
        hours + ":" + minutes;
}


timeMode.addEventListener(
    "change",
    updateTime
);

customTime.addEventListener(
    "input",
    updateTime
);


/* =========================================================
   CONNECTION
========================================================= */

function updateConnection() {

    const value =
        connection.value;

    wifiIcon.classList.toggle(
        "hidden",
        value === "data"
    );

    dataIcon.classList.toggle(
        "hidden",
        value === "wifi"
    );
}


connection.addEventListener(
    "change",
    updateConnection
);


/* =========================================================
   SIGNAL
========================================================= */

function createSignal(value) {

    const wrapper =
        document.createElement("span");

    wrapper.className =
        "signal";

    const bars =
        [1, 2, 3, 4];

    bars.forEach(function(bar) {

        const span =
            document.createElement("span");

        if (bar > value) {

            span.classList.add(
                "off"
            );
        }

        wrapper.appendChild(
            span
        );
    });

    return wrapper;
}


function updateSignal() {

    signalContainer.innerHTML =
        "";

    const firstSignal =
        Number(signal1.value);

    signalContainer.appendChild(
        createSignal(
            Math.min(
                firstSignal,
                4
            )
        )
    );


    if (simCount.value === "2") {

        const secondSignal =
            Number(signal2.value);

        signalContainer.appendChild(
            createSignal(
                Math.min(
                    secondSignal,
                    4
                )
            )
        );
    }
}


simCount.addEventListener(
    "change",
    function() {

        if (simCount.value === "2") {

            signal2Box.classList.remove(
                "hidden"
            );

        } else {

            signal2Box.classList.add(
                "hidden"
            );
        }

        updateSignal();
    }
);


signal1.addEventListener(
    "change",
    updateSignal
);

signal2.addEventListener(
    "change",
    updateSignal
);


/* =========================================================
   BATTERY 1 - 100
========================================================= */

function createBatteryOptions() {

    battery.innerHTML =
        "";

    for (
        let i = 1;
        i <= 100;
        i++
    ) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            String(i);

        option.textContent =
            i + "%";

        if (i === 100) {

            option.selected =
                true;
        }

        battery.appendChild(
            option
        );
    }
}


function updateBattery() {

    const value =
        Number(
            battery.value
        );

    batteryFill.style.width =
        value + "%";

    batteryText.textContent =
        value + "%";
}


battery.addEventListener(
    "change",
    updateBattery
);


/* =========================================================
   BUSINESS NAME
========================================================= */

function cleanBusinessName(name) {

    if (!name) {
        return "";
    }

    try {

        name =
            decodeURIComponent(
                name
            );

    } catch (error) {

        // Keep original name.
    }

    name =
        name.replace(
            /\+/g,
            " "
        );

    name =
        name.replace(
            /\s+/g,
            " "
        );

    name =
        name.trim();

    return name;
}


function extractBusinessName(url) {

    try {

        const parsed =
            new URL(url);

        const placeMatch =
            parsed.pathname.match(
                /\/place\/([^/]+)/i
            );

        if (placeMatch) {

            return cleanBusinessName(
                placeMatch[1]
            );
        }

        const q =
            parsed.searchParams.get(
                "q"
            );

        if (q) {

            return cleanBusinessName(
                q
            );
        }

        const query =
            parsed.searchParams.get(
                "query"
            );

        if (query) {

            return cleanBusinessName(
                query
            );
        }

        const destination =
            parsed.searchParams.get(
                "destination"
            );

        if (destination) {

            return cleanBusinessName(
                destination
            );
        }

        return "";

    } catch (error) {

        return "";
    }
}


/* =========================================================
   RESOLVE GOOGLE LINK
========================================================= */

async function resolveBusiness(url) {

    const directName =
        extractBusinessName(
            url
        );

    if (directName) {

        return {
            businessName:
                directName
        };
    }


    const response =
        await fetch(
            "/resolve-google?url=" +
            encodeURIComponent(
                url
            )
        );


    if (!response.ok) {

        throw new Error(
            "Could not resolve Google link."
        );
    }


    const data =
        await response.json();


    if (!data.businessName) {

        throw new Error(
            "Business name could not be found."
        );
    }


    return {
        businessName:
            data.businessName
    };
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   GOOGLE REVIEW PAGE
========================================================= */

function showReview(
    businessName
) {

    const safeName =
        escapeHtml(
            businessName
        );

    webArea.innerHTML = `

        <div class="review-page">

            <div class="review-search">

                <div class="search-box">

                    <span class="search-icon">
                        ⌕
                    </span>

                    <span class="search-name">
                        ${safeName}
                    </span>

                </div>

            </div>


            <div class="place-header">

                <div class="business-name">
                    ${safeName}
                </div>

                <div class="rating-line">

                    <span class="stars">
                        ★★★★★
                    </span>

                    <span>
                        Reviews
                    </span>

                </div>

                <div class="place-note">
                    Business information
                </div>

            </div>


            <div class="tabs">

                <div class="tab active">
                    About
                </div>

                <div class="tab">
                    Overview
                </div>

                <div class="tab">
                    Menu
                </div>

                <div class="tab">
                    Reviews
                </div>

            </div>


            <div class="section">

                <div class="section-title">
                    Accessibility
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Wheelchair accessible entrance
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Wheelchair accessible parking lot
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Wheelchair accessible restroom
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon">
                        •
                    </span>

                    <span>
                        Seating
                    </span>
                </div>

            </div>


            <div class="section">

                <div class="section-title">
                    Service options
                </div>

                <div class="info-row">
                    <span class="info-icon">
                        •
                    </span>

                    <span>
                        Curbside pickup
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Outdoor seating
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon">
                        •
                    </span>

                    <span>
                        No-contact delivery
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Delivery
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Takeout
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Drive-through
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Dine-in
                    </span>
                </div>

            </div>


            <div class="section">

                <div class="section-title">
                    Highlights
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Great coffee
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Fireplace
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Great dessert
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Great tea selection
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Live music
                    </span>
                </div>

                <div class="info-row">
                    <span class="info-icon check">
                        ✓
                    </span>

                    <span>
                        Rooftop seating
                    </span>
                </div>

            </div>


            <div class="section">

                <div class="section-title">
                    Reviews
                </div>

                <div class="review-card">

                    <div class="review-user">
                        Customer
                    </div>

                    <div class="review-stars">
                        ★★★★★
                    </div>

                    <div class="review-text">
                        Review information

                        <span class="review-date">
                            Recently
                        </span>
                    </div>

                </div>


                <div class="review-card">

                    <div class="review-user">
                        Customer
                    </div>

                    <div class="review-stars">
                        ★★★★☆
                    </div>

                    <div class="review-text">
                        Review information
                    </div>

                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   OPEN REVIEW
========================================================= */

openReview.addEventListener(
    "click",
    async function() {

        const url =
            googleUrl.value.trim();


        if (!url) {

            webArea.innerHTML = `

                <div class="error">
                    Please paste a Google Maps or
                    Google review link.
                </div>

            `;

            return;
        }


        try {

            openReview.disabled =
                true;

            openReview.textContent =
                "Loading...";


            const result =
                await resolveBusiness(
                    url
                );


            showReview(
                result.businessName
            );


        } catch (error) {

            webArea.innerHTML = `

                <div class="error">

                    ${escapeHtml(
                        error.message ||
                        "Could not load business information."
                    )}

                </div>

            `;


        } finally {

            openReview.disabled =
                false;

            openReview.textContent =
                "Open Review";
        }
    }
);


/* =========================================================
   SCREENSHOT
========================================================= */

let screenshotBlob = null;


async function loadHtml2Canvas() {

    if (window.html2canvas) {
        return;
    }


    await new Promise(
        function(resolve, reject) {

            const script =
                document.createElement(
                    "script"
                );

            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

            script.onload =
                resolve;

            script.onerror =
                reject;

            document.head.appendChild(
                script
            );
        }
    );
}


captureBtn.addEventListener(
    "click",
    async function() {

        try {

            await loadHtml2Canvas();


            const canvas =
                await html2canvas(
                    document.getElementById(
                        "phoneScreen"
                    ),
                    {
                        backgroundColor:
                            "#ffffff",

                        useCORS:
                            true,

                        scale:
                            2
                    }
                );


            screenshotBlob =
                await new Promise(
                    function(resolve) {

                        canvas.toBlob(
                            resolve,
                            "image/png"
                        );
                    }
                );


            copyArea.classList.remove(
                "hidden"
            );


        } catch (error) {

            alert(
                "Screenshot could not be created."
            );
        }
    }
);


/* =========================================================
   COPY SCREENSHOT
========================================================= */

copyScreenshot.addEventListener(
    "click",
    async function() {

        if (!screenshotBlob) {
            return;
        }


        try {

            const item =
                new ClipboardItem({
                    "image/png":
                        screenshotBlob
                });


            await navigator.clipboard.write(
                [item]
            );


            copyScreenshot.textContent =
                "Copied";


            setTimeout(
                function() {

                    copyScreenshot.textContent =
                        "Copy Screenshot";

                },
                1500
            );


        } catch (error) {

            alert(
                "Your browser does not allow image copying."
            );
        }
    }
);


/* =========================================================
   INITIAL SETUP
========================================================= */

createBatteryOptions();

updateBattery();

updatePhoneModels();

updateTime();

setInterval(
    updateTime,
    1000
);

updateConnection();

signal2Box.classList.add(
    "hidden"
);

updateSignal();