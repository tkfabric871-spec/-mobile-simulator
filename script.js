document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       DOM ELEMENTS
    ========================================================= */

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
        "Redmi Note 13 Pro",
        "Redmi Note 13",

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
       PHONE DETAILS
       Actual frame/size changes according to selected model.
    ========================================================= */

    const phoneDetails = {

        "iPhone 15 Pro Max": {
            width: 393,
            height: 852,
            radius: 46,
            screenRadius: 40,
            type: "iphone"
        },

        "iPhone 15 Pro": {
            width: 393,
            height: 852,
            radius: 44,
            screenRadius: 38,
            type: "iphone"
        },

        "iPhone 15 Plus": {
            width: 430,
            height: 932,
            radius: 46,
            screenRadius: 40,
            type: "iphone"
        },

        "iPhone 15": {
            width: 393,
            height: 852,
            radius: 44,
            screenRadius: 38,
            type: "iphone"
        },

        "iPhone 14 Pro Max": {
            width: 393,
            height: 852,
            radius: 46,
            screenRadius: 40,
            type: "iphone"
        },

        "iPhone 14 Pro": {
            width: 393,
            height: 852,
            radius: 44,
            screenRadius: 38,
            type: "iphone"
        },

        "iPhone 14 Plus": {
            width: 430,
            height: 932,
            radius: 46,
            screenRadius: 40,
            type: "iphone"
        },

        "iPhone 14": {
            width: 390,
            height: 844,
            radius: 43,
            screenRadius: 37,
            type: "iphone"
        },

        "iPhone 13 Pro Max": {
            width: 428,
            height: 926,
            radius: 46,
            screenRadius: 40,
            type: "iphone"
        },

        "iPhone 13 Pro": {
            width: 390,
            height: 844,
            radius: 43,
            screenRadius: 37,
            type: "iphone"
        },

        "iPhone 13": {
            width: 390,
            height: 844,
            radius: 43,
            screenRadius: 37,
            type: "iphone"
        },

        "iPhone 13 mini": {
            width: 375,
            height: 812,
            radius: 40,
            screenRadius: 34,
            type: "iphone"
        },

        "iPhone 12 Pro Max": {
            width: 428,
            height: 926,
            radius: 45,
            screenRadius: 39,
            type: "iphone"
        },

        "iPhone 12 Pro": {
            width: 390,
            height: 844,
            radius: 40,
            screenRadius: 34,
            type: "iphone"
        },

        "iPhone 12": {
            width: 390,
            height: 844,
            radius: 40,
            screenRadius: 34,
            type: "iphone"
        },

        "iPhone 12 mini": {
            width: 375,
            height: 812,
            radius: 38,
            screenRadius: 32,
            type: "iphone"
        },

        "iPhone 11 Pro Max": {
            width: 414,
            height: 896,
            radius: 42,
            screenRadius: 36,
            type: "iphone"
        },

        "iPhone 11 Pro": {
            width: 375,
            height: 812,
            radius: 38,
            screenRadius: 32,
            type: "iphone"
        },

        "iPhone 11": {
            width: 414,
            height: 896,
            radius: 42,
            screenRadius: 36,
            type: "iphone"
        },

        "iPhone SE": {
            width: 375,
            height: 667,
            radius: 32,
            screenRadius: 27,
            type: "iphone"
        },


        /* =====================================================
           SAMSUNG
        ===================================================== */

        "Samsung Galaxy S25 Ultra": {
            width: 412,
            height: 915,
            radius: 34,
            screenRadius: 29,
            type: "android"
        },

        "Samsung Galaxy S25": {
            width: 388,
            height: 856,
            radius: 31,
            screenRadius: 27,
            type: "android"
        },

        "Samsung Galaxy S24 Ultra": {
            width: 412,
            height: 912,
            radius: 34,
            screenRadius: 29,
            type: "android"
        },

        "Samsung Galaxy S24": {
            width: 393,
            height: 852,
            radius: 31,
            screenRadius: 27,
            type: "android"
        },

        "Samsung Galaxy A55": {
            width: 393,
            height: 852,
            radius: 31,
            screenRadius: 27,
            type: "android"
        },

        "Samsung Galaxy A35": {
            width: 390,
            height: 844,
            radius: 31,
            screenRadius: 27,
            type: "android"
        },


        /* =====================================================
           INFINIX
        ===================================================== */

        "Infinix Note 40 Pro": {
            width: 393,
            height: 852,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },

        "Infinix Hot 50 Pro": {
            width: 393,
            height: 852,
            radius: 29,
            screenRadius: 25,
            type: "android"
        },

        "Infinix Zero 40": {
            width: 393,
            height: 852,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },


        /* =====================================================
           VIVO
        ===================================================== */

        "Vivo V40": {
            width: 393,
            height: 852,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },

        "Vivo V30": {
            width: 393,
            height: 852,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },

        "Vivo Y200": {
            width: 393,
            height: 852,
            radius: 29,
            screenRadius: 25,
            type: "android"
        },


        /* =====================================================
           OPPO
        ===================================================== */

        "OPPO Reno 12": {
            width: 393,
            height: 852,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },

        "OPPO Reno 11": {
            width: 393,
            height: 852,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },

        "OPPO A60": {
            width: 393,
            height: 852,
            radius: 29,
            screenRadius: 25,
            type: "android"
        },


        /* =====================================================
           XIAOMI
        ===================================================== */

        "Xiaomi 14": {
            width: 393,
            height: 852,
            radius: 29,
            screenRadius: 25,
            type: "android"
        },

        "Redmi Note 13 Pro": {
            width: 393,
            height: 852,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },

        "Redmi Note 13": {
            width: 393,
            height: 852,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },


        /* =====================================================
           ONEPLUS
        ===================================================== */

        "OnePlus 12": {
            width: 412,
            height: 914,
            radius: 32,
            screenRadius: 27,
            type: "android"
        },

        "OnePlus 11": {
            width: 412,
            height: 914,
            radius: 32,
            screenRadius: 27,
            type: "android"
        },


        /* =====================================================
           GOOGLE PIXEL
        ===================================================== */

        "Google Pixel 9 Pro": {
            width: 412,
            height: 912,
            radius: 32,
            screenRadius: 28,
            type: "android"
        },

        "Google Pixel 9": {
            width: 412,
            height: 912,
            radius: 32,
            screenRadius: 28,
            type: "android"
        },

        "Google Pixel 8 Pro": {
            width: 412,
            height: 912,
            radius: 32,
            screenRadius: 28,
            type: "android"
        },

        "Google Pixel 8": {
            width: 412,
            height: 915,
            radius: 32,
            screenRadius: 28,
            type: "android"
        },


        /* =====================================================
           REALME
        ===================================================== */

        "Realme GT 6": {
            width: 393,
            height: 864,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },

        "Realme 12 Pro": {
            width: 393,
            height: 864,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },


        /* =====================================================
           TECNO
        ===================================================== */

        "Tecno Camon 30": {
            width: 393,
            height: 864,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },

        "Tecno Spark 20": {
            width: 393,
            height: 864,
            radius: 30,
            screenRadius: 26,
            type: "android"
        },


        /* =====================================================
           MOTOROLA
        ===================================================== */

        "Motorola Edge 50 Pro": {
            width: 412,
            height: 912,
            radius: 31,
            screenRadius: 27,
            type: "android"
        },

        "Motorola Moto G85": {
            width: 393,
            height: 876,
            radius: 30,
            screenRadius: 26,
            type: "android"
        }
    };


    /* =========================================================
       UPDATE MODEL DROPDOWN
    ========================================================= */

    function updatePhoneModels() {

        if (!phoneStyle || !phoneModel) {
            return;
        }

        const style =
            phoneStyle.value || "iphone";

        phoneModel.innerHTML = "";

        const models =
            style === "android"
                ? androidModels
                : iphoneModels;

        models.forEach(model => {

            const option =
                document.createElement("option");

            option.value = model;
            option.textContent = model;

            phoneModel.appendChild(
                option
            );
        });

        if (models.length > 0) {
            phoneModel.value =
                models[0];
        }

        updatePhoneAppearance();
    }


    /* =========================================================
       UPDATE PHONE APPEARANCE
    ========================================================= */

    function updatePhoneAppearance() {

        if (!phone || !phoneModel) {
            return;
        }

        const model =
            phoneModel.value;

        const details =
            phoneDetails[model];

        if (!details) {
            return;
        }

        phone.classList.remove(
            "iphone",
            "android"
        );

        phone.classList.add(
            details.type
        );

        phone.dataset.model =
            model;

        phone.style.width =
            details.width + "px";

        phone.style.height =
            details.height + "px";

        phone.style.borderRadius =
            details.radius + "px";

        const screen =
            phone.querySelector(
                ".phone-screen"
            );

        if (screen) {
            screen.style.borderRadius =
                details.screenRadius + "px";
        }
    }


    /* =========================================================
       TIME
    ========================================================= */

    function formatTime(date) {

        let hours =
            date.getHours();

        const minutes =
            String(
                date.getMinutes()
            ).padStart(2, "0");

        const seconds =
            String(
                date.getSeconds()
            ).padStart(2, "0");

        const mode =
            timeMode
                ? timeMode.value
                : "12";

        if (mode === "24") {

            return (
                String(hours).padStart(2, "0") +
                ":" +
                minutes
            );
        }

        const suffix =
            hours >= 12
                ? "PM"
                : "AM";

        hours =
            hours % 12 || 12;

        return (
            String(hours) +
            ":" +
            minutes +
            " " +
            suffix
        );
    }


    function updateTime() {

        if (!statusTime) {
            return;
        }

        if (
            timeMode &&
            timeMode.value === "custom"
        ) {

            if (
                customTime &&
                customTime.value
            ) {
                statusTime.textContent =
                    customTime.value;
            }

            return;
        }

        statusTime.textContent =
            formatTime(
                new Date()
            );
    }


    if (timeMode) {

        timeMode.addEventListener(
            "change",
            () => {

                if (
                    customTimeBox
                ) {
                    customTimeBox.style.display =
                        timeMode.value === "custom"
                            ? "block"
                            : "none";
                }

                updateTime();
            }
        );
    }


    if (customTime) {

        customTime.addEventListener(
            "input",
            updateTime
        );
    }


    setInterval(
        updateTime,
        1000
    );

    updateTime();


    /* =========================================================
       CONNECTION
    ========================================================= */

    function updateConnection() {

        if (!connection) {
            return;
        }

        const value =
            connection.value;

        if (wifiIcon) {
            wifiIcon.style.display =
                value === "wifi" ||
                value === "both"
                    ? "inline-flex"
                    : "none";
        }

        if (dataIcon) {
            dataIcon.style.display =
                value === "data" ||
                value === "both"
                    ? "inline-flex"
                    : "none";
        }
    }


    if (connection) {

        connection.addEventListener(
            "change",
            updateConnection
        );

        updateConnection();
    }


    /* =========================================================
       SIM COUNT
    ========================================================= */

    function updateSimCount() {

        if (!simCount) {
            return;
        }

        const count =
            simCount.value;

        if (
            signal2Box
        ) {
            signal2Box.style.display =
                count === "2"
                    ? "flex"
                    : "none";
        }
    }


    if (simCount) {

        simCount.addEventListener(
            "change",
            updateSimCount
        );

        updateSimCount();
    }


    /* =========================================================
       SIGNAL STRENGTH
    ========================================================= */

    function setSignal(
        container,
        level
    ) {

        if (!container) {
            return;
        }

        const bars =
            container.querySelectorAll(
                ".signal-bar"
            );

        bars.forEach(
            (bar, index) => {

                bar.classList.toggle(
                    "active",
                    index < level
                );
            }
        );
    }


    function updateSignals() {

        const level1 =
            Math.floor(
                Math.random() * 5
            );

        const level2 =
            Math.floor(
                Math.random() * 5
            );

        setSignal(
            signal1,
            level1
        );

        setSignal(
            signal2,
            level2
        );
    }


    if (
        signalContainer
    ) {

        signalContainer.addEventListener(
            "click",
            updateSignals
        );
    }


    /* =========================================================
       BATTERY
    ========================================================= */

    function updateBattery() {

        const value =
            Math.floor(
                Math.random() * 101
            );

        if (
            batteryFill
        ) {
            batteryFill.style.width =
                value + "%";
        }

        if (
            batteryText
        ) {
            batteryText.textContent =
                value + "%";
        }

        if (
            battery
        ) {
            battery.dataset.level =
                value;
        }
    }


    if (battery) {

        battery.addEventListener(
            "click",
            updateBattery
        );
    }


    /* =========================================================
       GOOGLE BUSINESS NAME
    ========================================================= */

    function cleanBusinessName(name) {

        if (!name) {
            return "";
        }

        let value =
            String(name);

        try {
            value =
                decodeURIComponent(
                    value
                );
        } catch (error) {}

        value =
            value
                .replace(/\+/g, " ")
                .replace(/\s+/g, " ")
                .trim();

        value =
            value
                .replace(
                    /\s*-\s*Google Maps.*$/i,
                    ""
                )
                .replace(
                    /\s*-\s*Google.*$/i,
                    ""
                )
                .trim();

        return value;
    }


    /* =========================================================
       EXTRACT BUSINESS NAME FROM DIRECT GOOGLE MAPS URL
    ========================================================= */

    function extractBusinessName(url) {

        if (!url) {
            return "";
        }

        try {

            const parsed =
                new URL(url);

            const patterns = [

                /\/maps\/place\/([^/?#]+)/i,

                /\/maps\/preview\/place\/([^/?#]+)/i,

                /\/maps\/search\/([^/?#]+)/i,

                /\/maps\/dir\/([^/?#]+)/i
            ];

            for (
                const pattern of patterns
            ) {

                const match =
                    parsed.pathname.match(
                        pattern
                    );

                if (
                    match &&
                    match[1]
                ) {

                    let name =
                        cleanBusinessName(
                            match[1]
                        );

                    name =
                        name
                            .replace(
                                /@.*$/,
                                ""
                            )
                            .replace(
                                /,.*$/,
                                ""
                            )
                            .trim();

                    if (
                        name &&
                        name.toLowerCase() !==
                            "place" &&
                        name.toLowerCase() !==
                            "search"
                    ) {
                        return name;
                    }
                }
            }


            const params = [
                "q",
                "query",
                "destination",
                "origin",
                "daddr"
            ];

            for (
                const key of params
            ) {

                const value =
                    parsed.searchParams.get(
                        key
                    );

                if (!value) {
                    continue;
                }

                const name =
                    cleanBusinessName(
                        value
                    );

                if (name) {
                    return name;
                }
            }

        } catch (error) {

            return "";
        }

        return "";
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
                ) +
                "&t=" +
                Date.now(),
                {
                    method: "GET",

                    cache: "no-store",

                    headers: {
                        "Cache-Control":
                            "no-cache"
                    }
                }
            );


        let data = {};

        try {

            data =
                await response.json();

        } catch (error) {

            throw new Error(
                "Server returned an invalid response."
            );
        }


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Could not resolve Google link."
            );
        }


        if (
            !data.businessName
        ) {

            throw new Error(
                "Business name could not be found."
            );
        }


        return {
            businessName:
                cleanBusinessName(
                    data.businessName
                )
        };
    }


    /* =========================================================
       HTML ESCAPE
    ========================================================= */

    function escapeHtml(value) {

        return String(
            value || ""
        )
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
       SHOW LOCAL REVIEW PAGE
    ========================================================= */

    function showReview(
        businessName
    ) {

        if (!webArea) {
            return;
        }

        const safeName =
            escapeHtml(
                businessName
            );


        webArea.innerHTML = `

            <div class="local-review-page">

                <div class="review-topbar">

                    <button
                        type="button"
                        class="review-back"
                        aria-label="Back"
                    >
                        ‹
                    </button>

                    <div class="review-search">

                        <span class="review-search-icon">
                            🔍
                        </span>

                        <span class="review-business-name">
                            ${safeName}
                        </span>

                    </div>

                    <button
                        type="button"
                        class="review-more"
                        aria-label="More"
                    >
                        ⋮
                    </button>

                </div>


                <div class="review-content">

                    <div class="review-business-header">

                        <div class="review-business-title">
                            ${safeName}
                        </div>

                        <div class="review-stars">
                            ★★★★★
                        </div>

                        <div class="review-rating-text">
                            4.6 · 1,248 reviews
                        </div>

                        <div class="review-category">
                            Cafe · Restaurant
                        </div>

                    </div>


                    <div class="review-tabs">

                        <div class="review-tab active">
                            About
                        </div>

                        <div class="review-tab">
                            Overview
                        </div>

                        <div class="review-tab">
                            Menu
                        </div>

                        <div class="review-tab">
                            Reviews
                        </div>

                    </div>


                    <section class="review-section">

                        <h3>
                            Accessibility
                        </h3>

                        <div class="review-list-item">
                            <span>♿</span>
                            <span>
                                Wheelchair accessible entrance
                            </span>
                        </div>

                        <div class="review-list-item">
                            <span>♿</span>
                            <span>
                                Wheelchair accessible parking lot
                            </span>
                        </div>

                        <div class="review-list-item">
                            <span>♿</span>
                            <span>
                                Wheelchair accessible restroom
                            </span>
                        </div>

                        <div class="review-list-item">
                            <span>🪑</span>
                            <span>
                                Seating
                            </span>
                        </div>

                    </section>


                    <section class="review-section">

                        <h3>
                            Service options
                        </h3>

                        <div class="review-chips">

                            <span class="review-chip">
                                Curbside pickup
                            </span>

                            <span class="review-chip">
                                Outdoor seating
                            </span>

                            <span class="review-chip">
                                No-contact delivery
                            </span>

                            <span class="review-chip">
                                Delivery
                            </span>

                            <span class="review-chip">
                                Takeout
                            </span>

                            <span class="review-chip">
                                Drive-through
                            </span>

                            <span class="review-chip">
                                Dine-in
                            </span>

                        </div>

                    </section>


                    <section class="review-section">

                        <h3>
                            Highlights
                        </h3>

                        <div class="review-chips">

                            <span class="review-chip">
                                Great coffee
                            </span>

                            <span class="review-chip">
                                Fireplace
                            </span>

                            <span class="review-chip">
                                Great dessert
                            </span>

                            <span class="review-chip">
                                Great tea selection
                            </span>

                            <span class="review-chip">
                                Live music
                            </span>

                            <span class="review-chip">
                                Rooftop seating
                            </span>

                        </div>

                    </section>


                    <section class="review-section">

                        <div class="reviews-heading">

                            <h3>
                                Reviews
                            </h3>

                            <span>
                                See all
                            </span>

                        </div>


                        <div class="review-card">

                            <div class="review-card-header">

                                <div class="review-avatar">
                                    A
                                </div>

                                <div>

                                    <div class="review-author">
                                        Ayesha
                                    </div>

                                    <div class="review-date">
                                        2 weeks ago
                                    </div>

                                </div>

                            </div>

                            <div class="review-card-stars">
                                ★★★★★
                            </div>

                            <p>
                                Great atmosphere and very good service.
                                The food was fresh and delicious.
                            </p>

                        </div>


                        <div class="review-card">

                            <div class="review-card-header">

                                <div class="review-avatar">
                                    M
                                </div>

                                <div>

                                    <div class="review-author">
                                        Muhammad
                                    </div>

                                    <div class="review-date">
                                        1 month ago
                                    </div>

                                </div>

                            </div>

                            <div class="review-card-stars">
                                ★★★★★
                            </div>

                            <p>
                                Nice place with a comfortable
                                atmosphere. Would visit again.
                            </p>

                        </div>


                        <div class="review-card">

                            <div class="review-card-header">

                                <div class="review-avatar">
                                    S
                                </div>

                                <div>

                                    <div class="review-author">
                                        Sara
                                    </div>

                                    <div class="review-date">
                                        2 months ago
                                    </div>

                                </div>

                            </div>

                            <div class="review-card-stars">
                                ★★★★☆
                            </div>

                            <p>
                                Good coffee, friendly service
                                and a nice overall experience.
                            </p>

                        </div>

                    </section>

                </div>

            </div>
        `;


        /* =====================================================
           BACK BUTTON
        ===================================================== */

        const backButton =
            webArea.querySelector(
                ".review-back"
            );

        if (backButton) {

            backButton.addEventListener(
                "click",
                () => {

                    webArea.innerHTML = "";

                }
            );
        }
    }


    /* =========================================================
       OPEN REVIEW BUTTON
    ========================================================= */

    if (openReview) {

        openReview.addEventListener(
            "click",
            async () => {

                const url =
                    googleUrl
                        ? googleUrl.value.trim()
                        : "";

                if (!url) {

                    alert(
                        "Please enter a Google Maps link."
                    );

                    return;
                }


                try {

                    new URL(url);

                } catch {

                    alert(
                        "Please enter a valid Google Maps link."
                    );

                    return;
                }


                openReview.disabled =
                    true;

                const originalText =
                    openReview.textContent;

                openReview.textContent =
                    "Opening...";


                try {

                    const result =
                        await resolveBusiness(
                            url
                        );

                    if (
                        !result ||
                        !result.businessName
                    ) {
                        throw new Error(
                            "Business name could not be found."
                        );
                    }

                    showReview(
                        result.businessName
                    );

                } catch (error) {

                    console.error(
                        "Google review error:",
                        error
                    );

                    alert(
                        error.message ||
                        "Could not resolve Google link."
                    );

                } finally {

                    openReview.disabled =
                        false;

                    openReview.textContent =
                        originalText;
                }
            }
        );
    }


    /* =========================================================
       HTML2CANVAS
    ========================================================= */

    async function loadHtml2Canvas() {

        if (
            window.html2canvas
        ) {
            return window.html2canvas;
        }

        return new Promise(
            (resolve, reject) => {

                const script =
                    document.createElement(
                        "script"
                    );

                script.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

                script.onload =
                    () => resolve(
                        window.html2canvas
                    );

                script.onerror =
                    () => reject(
                        new Error(
                            "Screenshot library could not be loaded."
                        )
                    );

                document.head.appendChild(
                    script
                );
            }
        );
    }


    /* =========================================================
       CAPTURE SCREENSHOT
    ========================================================= */

    async function captureScreenshot() {

        if (!phone) {
            return null;
        }

        const html2canvas =
            await loadHtml2Canvas();

        const canvas =
            await html2canvas(
                phone,
                {
                    backgroundColor:
                        null,

                    scale:
                        Math.min(
                            window.devicePixelRatio ||
                            2,
                            3
                        ),

                    useCORS:
                        true,

                    logging:
                        false
                }
            );

        return canvas;
    }


    /* =========================================================
       SCREENSHOT BUTTON
    ========================================================= */

    if (captureBtn) {

        captureBtn.addEventListener(
            "click",
            async () => {

                const originalText =
                    captureBtn.textContent;

                captureBtn.disabled =
                    true;

                captureBtn.textContent =
                    "Capturing...";

                try {

                    const canvas =
                        await captureScreenshot();

                    if (!canvas) {
                        throw new Error(
                            "Could not capture screenshot."
                        );
                    }

                    const link =
                        document.createElement(
                            "a"
                        );

                    link.download =
                        "mobile-simulator-screenshot.png";

                    link.href =
                        canvas.toDataURL(
                            "image/png"
                        );

                    link.click();

                } catch (error) {

                    console.error(
                        "Screenshot error:",
                        error
                    );

                    alert(
                        error.message ||
                        "Screenshot failed."
                    );

                } finally {

                    captureBtn.disabled =
                        false;

                    captureBtn.textContent =
                        originalText;
                }
            }
        );
    }


    /* =========================================================
       COPY SCREENSHOT
    ========================================================= */

    if (copyScreenshot) {

        copyScreenshot.addEventListener(
            "click",
            async () => {

                const originalText =
                    copyScreenshot.textContent;

                copyScreenshot.disabled =
                    true;

                copyScreenshot.textContent =
                    "Copying...";

                try {

                    const canvas =
                        await captureScreenshot();

                    if (!canvas) {
                        throw new Error(
                            "Could not capture screenshot."
                        );
                    }


                    const blob =
                        await new Promise(
                            resolve =>
                                canvas.toBlob(
                                    resolve,
                                    "image/png"
                                )
                        );


                    if (
                        !blob ||
                        !navigator.clipboard ||
                        !window.ClipboardItem
                    ) {

                        throw new Error(
                            "Image copying is not supported by this browser."
                        );
                    }


                    await navigator.clipboard.write(
                        [
                            new ClipboardItem(
                                {
                                    "image/png":
                                        blob
                                }
                            )
                        ]
                    );


                    copyScreenshot.textContent =
                        "Copied!";

                    setTimeout(
                        () => {

                            copyScreenshot.textContent =
                                originalText;

                        },
                        1500
                    );

                } catch (error) {

                    console.error(
                        "Copy screenshot error:",
                        error
                    );

                    alert(
                        error.message ||
                        "Could not copy screenshot."
                    );

                    copyScreenshot.textContent =
                        originalText;

                } finally {

                    copyScreenshot.disabled =
                        false;
                }
            }
        );
    }


    /* =========================================================
       INITIAL SETUP
    ========================================================= */

    if (phoneStyle) {

        phoneStyle.addEventListener(
            "change",
            updatePhoneModels
        );
    }


    if (phoneModel) {

        phoneModel.addEventListener(
            "change",
            updatePhoneAppearance
        );
    }


    updatePhoneModels();
    updatePhoneAppearance();
    updateConnection();
    updateSimCount();
    updateTime();


    /* =========================================================
       DEFAULT BATTERY
    ========================================================= */

    if (
        batteryFill &&
        !batteryFill.style.width
    ) {
        batteryFill.style.width =
            "82%";
    }

    if (
        batteryText &&
        !batteryText.textContent
    ) {
        batteryText.textContent =
            "82%";
    }

});