(() => {
  const { contacto, categorias, grupos, galeria, legales } = window.SITE;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Si se define una URL (p. ej. un flujo de Power Automate con disparador HTTP), el formulario envía ahí.
  // Si está vacía, abre el cliente de correo con el mensaje ya redactado.
  const FORM_ENDPOINT = "";

  /* ---------- Header y menú ---------- */
  const header = $("#header");
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeNav = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));

  // Resalta en el menú la sección visible
  const navLinks = $$('.nav a[href^="#"]:not(.btn)');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Misión / Visión ---------- */
  $$(".tab").forEach((tab) => tab.addEventListener("click", () => {
    $$(".tab").forEach((t) => { t.classList.toggle("is-active", t === tab); t.setAttribute("aria-selected", String(t === tab)); });
    $$(".tab-panel").forEach((p) => {
      const on = p.id === tab.getAttribute("aria-controls");
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
  }));

  /* ---------- Productos ---------- */
  const grid = $("#productGrid");
  const filters = $("#filters");

  filters.innerHTML = grupos
    .map((g, i) => `<button class="filter${i === 0 ? " is-active" : ""}" data-grupo="${g.id}" aria-pressed="${i === 0}">${esc(g.nombre)}</button>`)
    .join("");

  const renderProducts = (grupo) => {
    const list = grupo === "todos" ? categorias : categorias.filter((c) => c.grupo === grupo);
    grid.innerHTML = list.map((c, i) => `
      <button class="product" data-id="${c.id}" style="animation-delay:${i * 50}ms" aria-haspopup="dialog">
        <div class="product__img"><img src="${c.img}" alt="${esc(c.nombre)} San Mateo" loading="lazy"></div>
        <span class="product__count">${c.items.length} ${c.items.length === 1 ? "opción" : "opciones"}</span>
        <div class="product__body">
          <h3>${esc(c.nombre)}</h3>
          <p>${esc(c.desc)}</p>
          <span class="product__more">Ver presentaciones →</span>
        </div>
      </button>`).join("");
  };
  renderProducts("todos");

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", filters).forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", String(b === btn)); });
    renderProducts(btn.dataset.grupo);
  });

  /* ---------- Modal de producto ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  const openModal = (cat) => {
    lastFocus = document.activeElement;
    $("#modalImg").src = cat.img;
    $("#modalImg").alt = cat.nombre;
    $("#modalTitle").textContent = cat.nombre;
    $("#modalDesc").textContent = cat.desc;
    $("#modalItems").innerHTML = cat.items.map((i) => `<li>${esc(i)}</li>`).join("");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal__close", modal).focus();
  };
  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    lastFocus?.focus();
  };
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".product");
    if (card) openModal(categorias.find((c) => c.id === card.dataset.id));
  });
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });

  /* ---------- Galería + lightbox ---------- */
  const gGrid = $("#galleryGrid");
  gGrid.innerHTML = galeria.map((g, i) => `
    <button class="gallery__item${g.ancho ? " gallery__item--wide" : ""} reveal" data-i="${i}" aria-label="Ampliar: ${esc(g.alt)}">
      <img src="${g.img}" alt="${esc(g.alt)}" loading="lazy">
    </button>`).join("");

  const lb = $("#lightbox");
  const lbImg = $("#lightboxImg");
  let lbIndex = 0;
  const showLb = (i) => {
    lbIndex = (i + galeria.length) % galeria.length;
    lbImg.src = galeria[lbIndex].img;
    lbImg.alt = galeria[lbIndex].alt;
  };
  gGrid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery__item");
    if (!item) return;
    lastFocus = item;
    showLb(+item.dataset.i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lightbox__close", lb).focus();
  });
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; lastFocus?.focus(); };
  lb.addEventListener("click", (e) => {
    const act = e.target.closest("[data-lb]")?.dataset.lb;
    if (act === "prev") showLb(lbIndex - 1);
    else if (act === "next") showLb(lbIndex + 1);
    else if (act === "close" || e.target === lb) closeLb();
  });

  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") showLb(lbIndex - 1);
      if (e.key === "ArrowRight") showLb(lbIndex + 1);
    } else if (!modal.hidden && e.key === "Escape") closeModal();
  });

  /* ---------- Contacto ---------- */
  const tel = contacto.telefono;
  const icons = {
    phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    facebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8Z"/></svg>',
    instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    youtube: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z"/></svg>',
  };

  $("#contactList").innerHTML = `
    <li><span class="ico">${icons.phone}</span><div><small>Llámanos</small><a href="tel:+57${tel}">+57 ${tel.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}</a></div></li>
    <li><span class="ico">${icons.mail}</span><div><small>Correo</small><a href="mailto:${contacto.email}">${contacto.email}</a></div></li>
    <li><span class="ico">${icons.pin}</span><div><small>Ubicación</small><span>${esc(contacto.ciudad)}</span></div></li>`;

  $("#socials").innerHTML = ["facebook", "instagram", "youtube"]
    .filter((k) => contacto[k])
    .map((k) => `<a href="${contacto[k]}" target="_blank" rel="noopener" aria-label="${k}">${icons[k]}</a>`)
    .join("");

  $("#whatsapp").href = `https://wa.me/57${tel}?text=${encodeURIComponent("Hola, quiero información sobre los productos San Mateo.")}`;

  const form = $("#contactForm");
  const status = $("#formStatus");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form__status";
    let valid = true;
    $$("[required]", form).forEach((f) => {
      const bad = f.type === "checkbox" ? !f.checked : !f.value.trim() || (f.type === "email" && !f.checkValidity());
      f.classList.toggle("is-invalid", bad);
      if (bad) valid = false;
    });
    if (!valid) {
      status.textContent = "Revisa los campos marcados y acepta la política de datos.";
      status.classList.add("err");
      return;
    }
    const data = Object.fromEntries(new FormData(form));

    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
        status.textContent = "¡Gracias! Recibimos tu mensaje.";
        status.classList.add("ok");
        form.reset();
      } catch {
        status.textContent = "No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.";
        status.classList.add("err");
      }
      return;
    }

    const body = `Nombre: ${data.nombre} ${data.apellidos || ""}\nCorreo: ${data.email}\nCelular: ${data.telefono || "-"}\nMotivo: ${data.motivo}\n\n${data.mensaje}`;
    window.location.href = `mailto:${contacto.email}?subject=${encodeURIComponent("Web · " + data.motivo)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Abrimos tu correo con el mensaje listo para enviar.";
    status.classList.add("ok");
  });
  form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));

  /* ---------- Footer ---------- */
  $("#legalLinks").innerHTML = legales.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${esc(l.nombre)}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Contadores y animaciones al hacer scroll ---------- */
  $("#countCats").dataset.count = categorias.length;
  $("#countItems").dataset.count = categorias.reduce((n, c) => n + c.items.length, 0);

  const countUp = (el) => {
    const target = +el.dataset.count;
    if (!target) return;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (el.dataset.suffix || "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-visible");
      $$("[data-count]", e.target).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach((el) => io.observe(el));
})();
