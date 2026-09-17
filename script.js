(() => {
  // A classe "js" habilita as animações .reveal (opacity 0 -> is-visible). Ela é adicionada
  // aqui, e não em script inline no head, para que uma falha de carga deste arquivo
  // não deixe a página inteira invisível.
  document.documentElement.classList.add("js");

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menuFocusSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let menuFocusTimer = 0;

  const getMenuFocusables = () => {
    const menuItems = menu ? Array.from(menu.querySelectorAll(menuFocusSelector)) : [];
    return [menuToggle, ...menuItems].filter((element) => element && element.getClientRects().length > 0);
  };

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    window.clearTimeout(menuFocusTimer);
    menuFocusTimer = 0;
    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.querySelector(".sr-only")?.replaceChildren("Abrir menu");
    if (restoreFocus) menuToggle?.focus();
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  menuToggle?.addEventListener("click", () => {
    window.clearTimeout(menuFocusTimer);
    menuFocusTimer = 0;
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector(".sr-only")?.replaceChildren(isOpen ? "Fechar menu" : "Abrir menu");
    if (isOpen) {
      menuFocusTimer = window.setTimeout(() => {
        menuFocusTimer = 0;
        if (body.classList.contains("menu-open")) {
          menu?.querySelector(menuFocusSelector)?.focus({ preventScroll: true });
        }
      }, 250);
    }
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && body.classList.contains("menu-open") && window.innerWidth <= 900) {
      const focusables = getMenuFocusables();
      const first = focusables[0];
      const firstMenuItem = focusables.find((element) => element !== menuToggle) || first;
      const last = focusables.at(-1);
      const current = document.activeElement;

      if (!focusables.includes(current)) {
        event.preventDefault();
        firstMenuItem?.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    if (event.key === "Escape" && body.classList.contains("menu-open")) {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && body.classList.contains("menu-open")) closeMenu();
  });

  // Explorador por contexto: tres personas, cinco recursos cada, com as telas reais do
  // aplicativo entregues pelo cliente. O estado inicial (Plantao / Whitebook IA) vem
  // assado no HTML; este bloco cuida da troca, do teclado e da transicao das imagens.
  const productExplorer = document.querySelector("[data-preview-explorer]");
  if (productExplorer) {
    const PERSONAS = [
      {
        id: "estudos",
        label: "Estudos e internato",
        avatar: "/assets/images/photos/avatars/estudos.webp",
        resources: [
        { id: "whitebook-ia", label: "Whitebook IA", icon: "whitebook-ia", screen: "whitebook-ia" },
        { id: "flashcards", label: "Flashcards", icon: "flashcards", screen: "flashcards" },
        { id: "quizzes", label: "Quizzes", icon: "quizzes", screen: "quizzes" },
        { id: "internato-na-pratica", label: "Internato na prática", icon: "livro-aberto", screen: "internato-na-pratica" },
        { id: "calculadoras-escores", label: "Calculadoras e escores", icon: "calculator", screen: "calculadoras-escores" },
        ],
      },
      {
        id: "plantao",
        label: "Plantão",
        avatar: "/assets/images/photos/avatars/plantao.webp",
        resources: [
        { id: "whitebook-ia", label: "Whitebook IA", icon: "whitebook-ia", screen: "whitebook-ia" },
        { id: "interacao-medicamentosa", label: "Interação medicamentosa", icon: "interacao-medicamentosa", screen: "interacao-medicamentosa" },
        { id: "gerenciador-plantao", label: "Gerenciador de plantão", icon: "gerenciador-plantao", screen: "gerenciador-plantao" },
        { id: "radar-wb", label: "Radar WB", icon: "radar", screen: "radar-wb" },
        { id: "calculadora-parkland", label: "Calculadora", icon: "calculator", screen: "calculadora-parkland" },
        ],
      },
      {
        id: "consultorio",
        label: "Consultório",
        avatar: "/assets/images/photos/avatars/consultorio.webp",
        resources: [
        { id: "whitebook-ia", label: "Whitebook IA", icon: "whitebook-ia", screen: "whitebook-ia" },
        { id: "calculadora-honorarios", label: "Cálculo de Honorários", icon: "honorarios", screen: "calculadora-honorarios" },
        { id: "bulario-medicamentos-novos", label: "Bulário — medicamentos novos", icon: "bulario", screen: "bulario-medicamentos-novos" },
        { id: "condutas-doencas-novas", label: "Condutas — doenças novas", icon: "estetoscopio", screen: "condutas-doencas-novas" },
        { id: "atlas-clinicos", label: "Atlas clínicos", icon: "coracao", screen: "atlas-clinicos" },
        ],
      },
    ];

    const personaTabs = productExplorer.querySelector(".preview-persona-tabs");
    const resourceTabs = productExplorer.querySelector(".preview-resource-tabs");
    const screenImg = productExplorer.querySelector("#preview-product-screen");
    const caption = productExplorer.querySelector("figcaption");
    const detailTitle = productExplorer.querySelector(".preview-resource-detail h3");
    const detailContext = productExplorer.querySelector(".preview-resource-context");
    const prevResource = productExplorer.querySelector(".preview-resource-prev");
    const nextResource = productExplorer.querySelector(".preview-resource-next");
    const personaButtons = Array.from(personaTabs.querySelectorAll("button"));

    let personaIndex = Math.max(0, PERSONAS.findIndex((p) => p.id === productExplorer.dataset.persona));
    let resourceIndex = 0;
    let resourceButtons = Array.from(resourceTabs.querySelectorAll("button"));
    let screenChange = 0;

    const screenPath = (persona, resource, width) =>
      `/assets/images/screens/${persona.id}/${resource.screen}-${width}.webp`;

    const icon = (name) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("aria-hidden", "true");
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", `/assets/icons/elsie.svg#${name}`);
      svg.append(use);
      return svg;
    };

    const moveFocus = (buttons, current, key, vertical) => {
      const forward = vertical ? "ArrowDown" : "ArrowRight";
      const backward = vertical ? "ArrowUp" : "ArrowLeft";
      let next = current;
      if (key === forward) next = (current + 1) % buttons.length;
      else if (key === backward) next = (current - 1 + buttons.length) % buttons.length;
      else if (key === "Home") next = 0;
      else if (key === "End") next = buttons.length - 1;
      else return false;
      buttons[next].focus();
      buttons[next].click();
      return true;
    };

    const setScreen = (persona, resource) => {
      const change = ++screenChange;
      const src = screenPath(persona, resource, 810);
      const srcset = `${src} 810w, ${screenPath(persona, resource, 1206)} 1206w`;
      const alt = `Tela do Whitebook — ${resource.label} — ${persona.label}`;
      screenImg.classList.add("is-changing");

      const preload = new Image();
      preload.src = src;
      preload.srcset = srcset;
      preload.sizes = "(max-width: 700px) 78vw, 390px";
      const apply = () => {
        if (change !== screenChange) return;
        screenImg.src = src;
        screenImg.srcset = srcset;
        screenImg.sizes = preload.sizes;
        screenImg.alt = alt;
        caption.textContent = alt;
        requestAnimationFrame(() => screenImg.classList.remove("is-changing"));
      };
      if (preload.complete) apply();
      else {
        preload.addEventListener("load", apply, { once: true });
        preload.addEventListener("error", apply, { once: true });
      }
    };

    const selectResource = (index, { focus = false } = {}) => {
      const persona = PERSONAS[personaIndex];
      resourceIndex = index;
      resourceButtons.forEach((button, buttonIndex) => {
        const selected = buttonIndex === index;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
      });
      const resource = persona.resources[index];
      detailTitle.textContent = resource.label;
      detailContext.textContent = persona.label;
      productExplorer.dataset.persona = persona.id;
      productExplorer.dataset.resource = resource.id;
      setScreen(persona, resource);
      if (focus) resourceButtons[index].focus();
    };

    const renderResources = () => {
      const persona = PERSONAS[personaIndex];
      resourceTabs.textContent = "";
      resourceButtons = persona.resources.map((resource, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", "preview-product-screen");
        button.setAttribute("aria-selected", "false");
        button.tabIndex = -1;
        button.append(icon(resource.icon));
        const text = document.createElement("span");
        text.textContent = resource.label;
        button.append(text);
        button.addEventListener("click", () => selectResource(index));
        resourceTabs.append(button);
        return button;
      });
      selectResource(0);
    };

    // Os botoes iniciais ja vem no HTML: so ligamos os ouvintes, sem redesenhar.
    resourceButtons.forEach((button, index) => {
      button.addEventListener("click", () => selectResource(index));
    });

    personaButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        personaIndex = index;
        resourceIndex = 0;
        personaButtons.forEach((candidate, candidateIndex) => {
          const selected = candidateIndex === index;
          candidate.setAttribute("aria-selected", String(selected));
          candidate.tabIndex = selected ? 0 : -1;
        });
        renderResources();
      });
    });

    personaTabs.addEventListener("keydown", (event) => {
      const current = personaButtons.indexOf(document.activeElement);
      if (current >= 0 && moveFocus(personaButtons, current, event.key, false)) event.preventDefault();
    });

    const compactResources = window.matchMedia("(max-width: 700px)");
    const syncResourceOrientation = () => {
      resourceTabs.setAttribute("aria-orientation", compactResources.matches ? "horizontal" : "vertical");
    };
    syncResourceOrientation();
    compactResources.addEventListener?.("change", syncResourceOrientation);

    resourceTabs.addEventListener("keydown", (event) => {
      const current = resourceButtons.indexOf(document.activeElement);
      if (current >= 0 && moveFocus(resourceButtons, current, event.key, !compactResources.matches)) {
        event.preventDefault();
      }
    });

    const stepResource = (delta) => {
      const total = resourceButtons.length;
      selectResource((resourceIndex + delta + total) % total, { focus: true });
    };

    prevResource.addEventListener("click", () => stepResource(-1));
    nextResource.addEventListener("click", () => stepResource(1));
  }

  const benefitsViewport = document.querySelector("[data-benefits-viewport]");
  const benefitsPrev = document.querySelector("[data-benefits-prev]");
  const benefitsNext = document.querySelector("[data-benefits-next]");

  const scrollBenefits = (direction) => {
    if (!benefitsViewport) return;
    const card = benefitsViewport.querySelector(".benefit-card");
    const gap = Number.parseFloat(getComputedStyle(benefitsViewport).columnGap || "16");
    const distance = (card?.getBoundingClientRect().width || 280) + gap;
    benefitsViewport.scrollBy({
      left: direction * distance,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  };

  benefitsPrev?.addEventListener("click", () => scrollBenefits(-1));
  benefitsNext?.addEventListener("click", () => scrollBenefits(1));
  benefitsViewport?.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollBenefits(event.key === "ArrowRight" ? 1 : -1);
  });

  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -7%", threshold: 0.08 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
})();

/* ==========================================================================
   Scripts da reforma pos-feedback (24-26/08/2026), promovidos da area /preview/
   em 26/08/2026. Todos autocontidos (IIFE); rodam depois dos blocos acima.
   ========================================================================== */

/* Acordeao de objetivos da jornada: um objetivo aberto por painel */
(function () {
  document.querySelectorAll("[data-objectives]").forEach((group) => {
    const items = Array.from(group.querySelectorAll(".objective"));
    group.querySelectorAll("[data-objective-toggle]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const target = toggle.closest(".objective");
        items.forEach((item) => {
          const open = item === target;
          item.classList.toggle("is-open", open);
          item.querySelector("[data-objective-toggle]")?.setAttribute("aria-expanded", String(open));
        });
      });
    });
  });
})();

/* Acordeao de ferramentas da jornada: uma ferramenta aberta por objetivo */
(function () {
  document.querySelectorAll("[data-tools]").forEach((group) => {
    const cards = Array.from(group.querySelectorAll(".tool-card"));
    group.querySelectorAll("[data-tool-toggle]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const target = toggle.closest(".tool-card");
        cards.forEach((card) => {
          const open = card === target;
          card.classList.toggle("is-open", open);
          card.querySelector("[data-tool-toggle]")?.setAttribute("aria-expanded", String(open));
        });
      });
    });
  });
})();

/* Toggle mensal/anual dos planos (padrao da pagina de precos do Canva).
   Anual e o padrao; a troca alterna os blocos [data-price-anual]/[data-price-mensal]
   do card Premium (o Free e sempre R$ 0). Precos capturados de
   lp.whitebook.com.br/premium — na lista de validacao do cliente. */
(function () {
  document.querySelectorAll("[data-plans-toggle]").forEach((toggle) => {
    const buttons = Array.from(toggle.querySelectorAll("[data-billing]"));
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.billing;
        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        document.querySelectorAll("[data-price-anual]").forEach((el) => {
          el.hidden = mode !== "anual";
        });
        document.querySelectorAll("[data-price-mensal]").forEach((el) => {
          el.hidden = mode !== "mensal";
        });
      });
    });
  });
})();

/* Demo animada do WB Assist (Rodada 3 — feedback Fold 4, ref. livia.careintelligence.ai).
   Sem dependências: revela as mensagens
   pré-renderadas em sequência, com indicador de digitação, e reinicia em loop.
   Há duas molduras com o mesmo chat — notebook (desktop/tablet) e celular (mobile),
   alternadas por CSS — e cada uma anima por conta própria.
   prefers-reduced-motion: mostra a conversa completa, sem loop. */
(function () {
  const demo = document.querySelector("[data-ia-demo]");
  if (!demo) return;

  const chats = Array.from(demo.querySelectorAll("[data-ia-chat]"));
  if (!chats.length) return;

  // Tempo de leitura de cada passo antes do próximo (índice = passo recém-mostrado)
  const HOLD = [1600, 1500, 2200, 2400, 1400];
  const RESTART_AFTER = 6500;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setupChat(chat) {
    const steps = Array.from(chat.querySelectorAll("[data-ia-step]"));
    if (!steps.length) return;

    if (reduced) {
      steps.forEach((s) => {
        if (!s.classList.contains("ia-typing")) s.classList.add("is-shown");
      });
      return;
    }

    let timer = null;

    function run() {
      steps.forEach((s) => s.classList.remove("is-shown"));
      chat.scrollTop = 0;
      let i = 0;

      function next() {
        if (i >= steps.length) {
          timer = setTimeout(run, RESTART_AFTER);
          return;
        }
        const prev = steps[i - 1];
        if (prev && prev.classList.contains("ia-typing")) prev.classList.remove("is-shown");
        const el = steps[i];
        el.classList.add("is-shown");
        // Rola só o necessário para o passo recém-mostrado: os passos ainda ocultos
        // continuam ocupando espaço abaixo (opacity 0), então scrollHeight enganaria.
        const bottom = el.offsetTop + el.offsetHeight + 8;
        if (bottom > chat.clientHeight) chat.scrollTop = bottom - chat.clientHeight;
        i += 1;
        timer = setTimeout(next, HOLD[i - 1] || 1500);
      }

      timer = setTimeout(next, 500);
    }

    run();
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          io.disconnect();
          chats.forEach(setupChat);
        }
      });
    },
    { threshold: 0.35 }
  );

  // Observa só depois do load: durante o carregamento as imagens ainda não têm
  // altura e o observer chega a disparar com a seção fora da tela.
  if (document.readyState === "complete") {
    io.observe(demo);
  } else {
    window.addEventListener("load", () => io.observe(demo), { once: true });
  }
})();

/* Fase 0 (26/08/2026) — grupos do header (Para quem, Recursos): abrem por hover no
   desktop (CSS), por clique/toque em qualquer largura (aqui) e fecham com Escape,
   clique fora ou quando o foco sai do grupo. No menu movel viram acordeao. */
(function () {
  const groups = Array.from(document.querySelectorAll("[data-nav-group]"));
  if (!groups.length) return;

  const close = (group) => {
    group.classList.remove("is-open");
    group.querySelector("[data-nav-toggle]")?.setAttribute("aria-expanded", "false");
  };

  groups.forEach((group) => {
    const toggle = group.querySelector("[data-nav-toggle]");
    toggle?.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !group.classList.contains("is-open");
      groups.forEach(close);
      if (willOpen) {
        group.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
    group.addEventListener("focusout", (event) => {
      if (!group.contains(event.relatedTarget)) close(group);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-nav-group]")) groups.forEach(close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") groups.forEach(close);
  });
})();
