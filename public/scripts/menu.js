function toggleMenu(x) {
    x.classList.toggle("toggle");

    let sideNav = document.getElementById("sideNav");
    let main = document.getElementById("main");

    if (sideNav.style.width == "0px" || sideNav.style.width == "") {
        main.style.marginLeft = "15%";
        sideNav.style.width = "15%";
    }
    else {
        main.style.marginLeft = "0";
        sideNav.style.width = "0";
    }
}