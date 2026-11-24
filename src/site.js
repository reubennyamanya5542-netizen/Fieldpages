const dialog = document.querySelector("[data-search-dialog]");
const searchButton = document.querySelector("[data-search-open]");
const closeButton = document.querySelector("[data-search-close]");
const input = document.querySelector("[data-search-input]");
const results = document.querySelector("[data-search-results]");
const indexNode = document.querySelector("[data-search-index]");

if (dialog && searchButton && input && results && indexNode) {
  let index = [];
  try {
    index = JSON.parse(indexNode.textContent || "[]");
  } catch {
    index = [];
  }

  const render = (query) => {
    const normalized = query.trim().toLowerCase();
    results.replaceChildren();
    if (!normalized) {
      const hint = document.createElement("p");
      hint.className = "search-empty";
      hint.textContent = "Try a topic, tool, or question—like budgeting, AI reviews, or remote work.";
      results.append(hint);
      return;
    }

    const matches = index.filter((item) =>
      `${item.title} ${item.description} ${item.topic}`.toLowerCase().includes(normalized)
    ).slice(0, 8);

    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "No exact match yet. Try a broader term or browse a field guide.";
      results.append(empty);
      return;
    }

    for (const item of matches) {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = item.href;
      const title = document.createElement("strong");
      title.textContent = item.title;
      const context = document.createElement("span");
      context.textContent = `${item.type} · ${item.topic}`;
      link.append(title, context);
      results.append(link);
    }
  };

  searchButton.addEventListener("click", () => {
    dialog.showModal();
    render("");
    window.setTimeout(() => input.focus(), 0);
  });

  closeButton?.addEventListener("click", () => dialog.close());
  input.addEventListener("input", () => render(input.value));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
