class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.lastScrollTop = 0;
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            if (!link.style.animation) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                link.style.animation = '';
            }
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();

        if (this.navList.classList.contains(this.activeClass)) {
            this.navbar.classList.add(this.activeClass);
            this.navbar.classList.add("sticky");
        } else {
            this.navbar.classList.remove(this.activeClass);
            if (window.pageYOffset === 0) {
                this.navbar.classList.remove("sticky");
            }
        }
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    handleScroll() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > this.lastScrollTop) {
            if (!this.navList.classList.contains(this.activeClass)) {
                this.navbar.classList.remove("sticky");
            }
        } else {
            this.navbar.classList.add("sticky");
        }

        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
            this.navbar = document.getElementById("navbar");
            window.addEventListener('scroll', this.handleScroll);
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);
mobileNavbar.init();
