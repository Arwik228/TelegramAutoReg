const remote = require('electron').remote;
const main = require('./scripts/main.js');

(function handleWindowControls() {
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function load(){
        document.getElementById("api-token-sms-activate").value = localStorage.getItem("token") || "";
        document.getElementById("final-user-name").value = localStorage.getItem("name") || "";
        document.getElementById("final-user-avatar").value = localStorage.getItem("avatar") || "";
        document.getElementById("proxyList").value = localStorage.getItem("proxy") || "";
        main.start();
    }
    
    function init() {
        let window = remote.getCurrentWindow();
        const minButton = document.getElementById('min-button'),
            closeButton = document.getElementById('close-button');
        minButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.minimize();
        });
        closeButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.close();
        });
        load();
    }

})();