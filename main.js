const menuBtn = document.getElementById("menu-btn");
const navbar = document.querySelector(".navbar");

function closeMenu() {
    if (!navbar || !menuBtn) return;

    navbar.classList.remove("active");
    menuBtn.classList.remove("fa-times");
    menuBtn.classList.add("fa-bars");
    menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && navbar) {
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("active");

        menuBtn.classList.toggle("fa-bars", !isOpen);
        menuBtn.classList.toggle("fa-times", isOpen);
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });
}

document.querySelectorAll(".navbar a, .footer .links, .pricing-container .btn").forEach(link => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
    if (!document.body.classList.contains("modal-open")) {
        closeMenu();
    }
});

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeModal(modal) {
    if (!modal) return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

    if (!document.querySelector(".modal.show")) {
        document.body.classList.remove("modal-open");
    }
}

document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", () => openModal(button.dataset.modal));
});

document.querySelectorAll("[data-product-modal]").forEach(button => {
    button.addEventListener("click", () => openModal(button.dataset.productModal));
});

document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", () => closeModal(button.closest(".modal")));
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal(modal);
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal(document.querySelector(".modal.show"));
    }
});

const photos = {
    preta: "foto-preta",
    tabela: "foto-tabela",
    dryfit: "foto-dryfit",
    tabela2: "foto-tabela2",
    "preta-cam": "foto-preta-cam"
};

document.querySelectorAll("[data-photo]").forEach(button => {
    button.addEventListener("click", () => {
        const target = document.getElementById(photos[button.dataset.photo]);
        const modal = button.closest(".modal");

        if (!target || !modal) return;

        modal.querySelectorAll(".modal-content img").forEach(img => {
            img.classList.remove("active");
        });

        target.classList.add("active");
    });
});