let navbarGuilds = document.getElementById("navbar-guilds-container");
let navbarPanelAvatar = document.getElementById("navbar-panel-avatar");
let navabrPanelUsername = document.getElementById("navbar-panel-username");
let navabrPanelTag = document.getElementById("navbar-panel-tag");
let navbarPanelBtnLogin = document.getElementById("navbar-panel-btn-login");
let navbarHomePageBtn = document.getElementById("navbar-home-page-btn");
let navbarGiveawayPageBtn = document.getElementById("navbar-giveaway-page-btn");

/*const createSvg = (viewBox, data) => {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", viewBox);

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", data);
    svg.appendChild(path);

    return svg;
};*/

navbarHomePageBtn.onclick = () => window.location.href = "/";
navbarHomePageBtn.title = "Home";
navbarGiveawayPageBtn.onclick = () => window.location.href = "/giveaway";
navbarGiveawayPageBtn.title = "Giveaway";

if(document.location.pathname === "/") {
    navbarHomePageBtn.classList.add("active");
};

axios("/auth/@me", {
    method: "GET"
}).then(({ data: user }) => {
    // Panel
    navbarPanelAvatar.setAttribute("src", `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
    navabrPanelUsername.innerHTML = user.username;
    navabrPanelTag.innerHTML = `#${user.discriminator}`;

    let imgLogin = document.createElement("img");
    imgLogin.src = "public/img/logout.svg";
    navbarPanelBtnLogin.appendChild(imgLogin);

    navbarPanelBtnLogin.title = "Se déconnecter";
    navbarPanelBtnLogin.onclick = () => window.location.href = "/auth/logout";

    if(user.is_owner) {
        navbarGiveawayPageBtn.style.display = "flex";
        if(document.location.pathname === "/giveaway") {
            navbarGiveawayPageBtn.classList.add("active");
        };
    };

    let divider = document.createElement("div");
    divider.classList.add("divider");
    navbarGuilds.appendChild(divider);

    axios("/auth/@me/guilds", {
        method: "GET"
    }).then(({ data: guilds }) => {
        guilds.map((guild) => {
            let div = document.createElement("div");
            div.classList.add("item");
    
            if(guild.icon) {
                let icon = document.createElement("img");
                icon.classList.add("icon");
                icon.src = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
                div.appendChild(icon);
            } else {
                let icon = document.createElement("span");
                icon.classList.add("icon");
                icon.innerHTML = guild.acronym;
                div.appendChild(icon);
            };
    
            /*let tooltip = document.createElement("span");
            tooltip.classList.add("tooltip");
            tooltip.innerHTML = guild.name;
            div.appendChild(tooltip);*/
            div.title = guild.name;
    
            div.onclick = () => window.location.href = `/dashboard?id=${guild.id}`;
    
            navbarGuilds.appendChild(div);
        });
    }).catch((err) => {
        console.error(err);
    });
}).catch((err) => {
    console.error(err);

    let img = document.createElement("img");
    img.src = "public/img/login.svg";
    navbarPanelBtnLogin.appendChild(img);

    navbarPanelBtnLogin.title = "Se connecter";
    navbarPanelBtnLogin.onclick = () => window.location.href = "/auth/login";
});