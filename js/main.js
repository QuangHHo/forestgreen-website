(function () {
  "use strict";

  const data = window.SITE_DATA || {};
  const socials = (data.socials || []).filter((social) => social.url);
  const instagram = socials.find((social) => social.platform === "instagram");
  const external = { target: "_blank", rel: "noopener" };

  const ICONS = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/>',
    spotify: '<circle cx="12" cy="12" r="9.5"/><path d="M7.2 9.4c3.3-1 6.9-.7 9.8.9M7.8 12.6c2.7-.8 5.6-.5 8 .8M8.4 15.6c2.1-.6 4.3-.4 6.2.6"/>',
    tiktok: '<path d="M14 3.5v11.2a3.6 3.6 0 1 1-3.6-3.6"/><path d="M14 3.5c.4 2.6 2.3 4.5 5 4.8"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.2 9.3v5.4l4.6-2.7z" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14.5 8H16V4.5h-2.2C11.3 4.5 10 6 10 8.5V11H7.5v3.5H10V21h3.5v-6.5h2.4l.6-3.5h-3V9c0-.6.4-1 1-1z"/>',
    bandcamp: '<path d="M2 17.5 8.2 6.5H22l-6.2 11z" fill="currentColor" stroke="none"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  };

  function icon(name) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (ICONS[name] || ICONS.email) +
      "</svg>"
    );
  }

  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value == null || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "html") node.innerHTML = value;
      else node.setAttribute(key, value === true ? "" : value);
    }
    node.append(...children.filter((child) => child != null && child !== false));
    return node;
  }

  /* Social links */

  function renderSocials() {
    document.querySelectorAll('[data-socials="icons"]').forEach((list) => {
      list.replaceChildren(
        ...socials.map((social) =>
          el("li", null,
            el("a", { class: "social-icon", href: social.url, "aria-label": social.label, title: social.label, html: icon(social.platform), ...external })
          )
        )
      );
    });

    document.querySelectorAll('[data-socials="buttons"]').forEach((list) => {
      list.replaceChildren(
        ...socials.map((social) =>
          el("li", null,
            el("a", { class: "social-button", href: social.url, ...external },
              el("span", { html: icon(social.platform) }).firstChild,
              el("span", { class: "social-button-text" },
                el("span", { class: "social-button-label" }, social.label),
                el("span", { class: "social-button-handle" }, social.handle || new URL(social.url).hostname.replace(/^www\./, ""))
              ),
              el("span", { class: "social-button-arrow", "aria-hidden": "true" }, "\u2197")
            )
          )
        )
      );
    });

    const contact = document.getElementById("contact");
    if (data.contactEmail) {
      contact.append("Bookings and enquiries: ", el("a", { href: "mailto:" + data.contactEmail }, data.contactEmail));
    } else if (instagram) {
      contact.append("For bookings and enquiries, send us a DM on ", el("a", { href: instagram.url, ...external }, "Instagram"), ".");
    }
  }

  /* Spotify */

  function spotifyEmbed(url) {
    const match = /open\.spotify\.com\/(?:intl-[\w-]+\/)?(artist|album|playlist|track|episode|show)\/([A-Za-z0-9]+)/.exec(url || "");
    if (!match) return null;
    const [, type, id] = match;
    return {
      src: "https://open.spotify.com/embed/" + type + "/" + id + "?utm_source=generator&theme=0",
      height: type === "track" || type === "episode" ? 152 : 452,
    };
  }

  function renderSpotify() {
    const container = document.getElementById("spotify-embed");
    const embed = spotifyEmbed(data.spotifyUrl);

    if (!embed) {
      if (data.spotifyUrl) console.warn("spotifyUrl is not a recognised open.spotify.com link:", data.spotifyUrl);
      container.append(
        el("div", { class: "spotify-placeholder" },
          el("span", { html: icon("spotify") }).firstChild,
          el("strong", null, "Spotify player"),
          el("p", null, "Add the band's Spotify link to ", el("code", null, "spotifyUrl"), " in ", el("code", null, "js/data.js"), " to show the player here.")
        )
      );
      return;
    }

    container.append(
      el("iframe", {
        class: "spotify-frame",
        src: embed.src,
        height: embed.height,
        title: "Forest Green on Spotify",
        loading: "lazy",
        allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
      })
    );
  }

  /* Shows */

  const monthFormat = new Intl.DateTimeFormat("en-AU", { month: "short" });
  const weekdayFormat = new Intl.DateTimeFormat("en-AU", { weekday: "short" });
  const fullDateFormat = new Intl.DateTimeFormat("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  function parseDate(value) {
    const [year, month, day] = String(value).split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function showItem(show, isPast) {
    const { when } = show;
    const thisYear = new Date().getFullYear();
    const subline = isPast
      ? String(when.getFullYear())
      : weekdayFormat.format(when) + (when.getFullYear() !== thisYear ? " " + when.getFullYear() : "");
    const meta = [show.city, show.time].filter(Boolean).join(" \u00b7 ");

    let action = null;
    if (!isPast) {
      action = el("div", { class: "show-action" },
        show.ticketUrl
          ? el("a", {
              class: "button button-ghost button-small",
              href: show.ticketUrl,
              "aria-label": "Tickets for " + show.venue + ", " + fullDateFormat.format(when),
              ...external,
            }, "Tickets")
          : el("span", { class: "show-soon" }, "Tickets soon")
      );
    }

    return el("li", { class: "show" },
      el("time", { class: "show-date", datetime: show.date, title: fullDateFormat.format(when) },
        el("span", { class: "show-day" }, String(when.getDate())),
        el("span", { class: "show-month" }, monthFormat.format(when)),
        el("span", { class: "show-weekday" }, subline)
      ),
      el("div", { class: "show-info" },
        el("h3", { class: "show-venue" }, show.venue),
        meta && el("p", { class: "show-meta" }, meta),
        show.note && el("p", { class: "show-note" }, show.note)
      ),
      action
    );
  }

  function renderShows() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const shows = (data.shows || [])
      .map((show) => ({ ...show, when: parseDate(show.date) }))
      .filter((show) => !Number.isNaN(show.when.getTime()));

    const upcoming = shows.filter((show) => show.when >= today).sort((a, b) => a.when - b.when);
    const past = shows.filter((show) => show.when < today).sort((a, b) => b.when - a.when);

    const upcomingList = document.getElementById("shows-upcoming");
    if (upcoming.length) {
      upcomingList.append(...upcoming.map((show) => showItem(show, false)));
    } else {
      upcomingList.append(
        el("li", { class: "show-empty" },
          "No upcoming shows right now. ",
          instagram ? el("a", { href: instagram.url, ...external }, "Follow us on Instagram") : "Check back soon",
          " for announcements."
        )
      );
    }

    if (past.length) {
      document.getElementById("shows-past").append(...past.map((show) => showItem(show, true)));
      document.getElementById("past-shows").hidden = false;
    }
  }

  /* Gallery and lightbox */

  const galleryBreakpoints = [
    { query: window.matchMedia("(min-width: 1040px)"), columns: 4 },
    { query: window.matchMedia("(min-width: 720px)"), columns: 3 },
  ];

  function galleryColumnCount() {
    const match = galleryBreakpoints.find((breakpoint) => breakpoint.query.matches);
    return match ? match.columns : 2;
  }

  function renderGallery() {
    const grid = document.getElementById("gallery-grid");
    const photos = data.gallery || [];

    const tiles = photos.map((photo, index) => ({
      ratio: photo.width && photo.height ? photo.height / photo.width : 1,
      node: el("li", { class: "gallery-item" },
        el("button", { class: "gallery-button", type: "button", "data-index": index, "aria-label": "Open photo: " + photo.alt },
          el("img", { src: photo.src, alt: photo.alt, width: photo.width, height: photo.height, loading: "lazy", decoding: "async" })
        )
      ),
    }));

    if (instagram) {
      tiles.push({
        ratio: 1,
        node: el("li", { class: "gallery-item gallery-more" },
          el("a", { href: instagram.url, ...external },
            el("span", { html: icon("instagram") }).firstChild,
            el("strong", null, "More on Instagram"),
            el("span", null, instagram.handle || "Follow along")
          )
        ),
      });
    }

    // Each tile goes into the currently shortest column so the gallery reads left to right.
    function layout() {
      const count = galleryColumnCount();
      const columns = Array.from({ length: count }, () => el("ul", { class: "gallery-column" }));
      const heights = new Array(count).fill(0);
      tiles.forEach((tile) => {
        const shortest = heights.indexOf(Math.min(...heights));
        columns[shortest].append(tile.node);
        heights[shortest] += tile.ratio + 0.05; // + gap between tiles, as a fraction of column width
      });
      grid.replaceChildren(...columns);
    }

    layout();
    galleryBreakpoints.forEach((breakpoint) => breakpoint.query.addEventListener("change", layout));

    setupLightbox(photos, grid);
  }

  function setupLightbox(photos, grid) {
    const dialog = document.getElementById("lightbox");
    const image = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");
    const prev = dialog.querySelector("[data-lightbox-prev]");
    const next = dialog.querySelector("[data-lightbox-next]");
    let current = 0;
    let touchStartX = null;

    prev.hidden = next.hidden = photos.length < 2;

    function show(index) {
      current = (index + photos.length) % photos.length;
      const photo = photos[current];
      image.src = photo.src;
      image.alt = photo.alt;
      caption.textContent = photos.length > 1 ? photo.alt + " (" + (current + 1) + " / " + photos.length + ")" : photo.alt;
    }

    grid.addEventListener("click", (event) => {
      const button = event.target.closest(".gallery-button");
      if (!button) return;
      show(Number(button.dataset.index));
      dialog.showModal();
      document.body.classList.add("lightbox-open");
    });

    dialog.addEventListener("close", () => document.body.classList.remove("lightbox-open"));
    dialog.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close());
    prev.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target.classList.contains("lightbox-figure")) dialog.close();
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });

    dialog.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    dialog.addEventListener("touchend", (event) => {
      if (touchStartX == null || photos.length < 2) return;
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 50) show(current + (distance < 0 ? 1 : -1));
      touchStartX = null;
    });
  }

  /* Header and mobile nav */

  function setupHeader() {
    const header = document.querySelector("[data-header]");
    const toggle = header.querySelector("[data-nav-toggle]");

    function setOpen(open) {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", () => setOpen(!header.classList.contains("nav-open")));
    header.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  renderSocials();
  renderSpotify();
  renderShows();
  renderGallery();
  setupHeader();
  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
