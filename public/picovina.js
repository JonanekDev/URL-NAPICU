document.getElementById("registrovat").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("./api/regurl/" + document.getElementById("url").value + "?redirect=" + document.getElementById("redirect").value, { 
        method: "GET"
    })
    .then(function(res) { return res.json(); })
    .then(function(json) {
        switch (json.err) {
            case 4:
                Swal.fire({
                    icon: "error",
                    title: "Chybka...",
                    text: "Omlouváme se, ale musíte vyplnit všechna pole."
                })
                break;
            case 5:
                Swal.fire({
                    icon: "error",
                    title: "Chybka...",
                    text: "Omlouváme se, ale do pole s redirectem musí být zadán link začínající http."
                })
                break;
            case 1:
                Swal.fire({
                    icon: "error",
                    title: "Chybka...",
                    text: "Omlouváme se, ale tato subdoména je rezerována numaxem."
                })
                break;
            case 2:
                Swal.fire({
                    icon: "error",
                    title: "Chybka...",
                    text: "Omlouváme se, ale tuto subdoménu již někdo využívá."
                })
                break;
            case 3:
                Swal.fire({
                    icon: "error",
                    title: "Chybka...",
                    text: "Omlouváme se, ale subdoména nesmí obsahovat nepovolené znaky."
                })
                break;
            case 6:
                Swal.fire({
                    icon: "error",
                    title: "Chybka...",
                    text: "Omlouváme se, ale nastala chyba při zapisování subdomény."
                })
                break;
            case 69:
                Swal.fire({
                    icon: "success",
                    title: "Registrace se povedla!",
                    text: "Registrace subdomény byla úspěšná."
                })
                break;
            case 6969:
                Swal.fire({
                    icon: "error",
                    title: "Chybka...",
                    text: "Omlouváme se, ale již jsi vyčeptal svůj limit."
                })
                break;
        
            default:
                Swal.fire({
                    icon: "error",
                    title: "Chybka...",
                    text: "Omlouváme se, ale nastala neznámá chyba. Divné."
                })
                break;
        }
    })
})