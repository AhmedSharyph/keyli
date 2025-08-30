// KeyliDropdown Library
class KeyliDropdown {
  constructor(wrapper, options) {
    this.wrapper = wrapper;
    this.input = wrapper.querySelector('input');
    this.list = document.createElement("ul");
    this.list.className = "options-list";
    document.body.appendChild(this.list);

    this.options = options;
    this.populateList();

    this.input.addEventListener("input", () => this.filterList());
    this.input.addEventListener("focus", () => this.showList());
    this.input.addEventListener("dblclick", () => this.reset());
    window.addEventListener("scroll", () => this.positionList());
    window.addEventListener("resize", () => this.positionList());
    document.addEventListener("click", e => {
      if (e.target !== this.input && !this.list.contains(e.target)) this.list.style.display="none";
    });
  }

  populateList() {
    this.list.innerHTML = "";
    this.options.forEach(opt => {
      const li = document.createElement("li");
      li.textContent = opt;
      li.addEventListener("click", () => { this.input.value = opt; this.list.style.display = "none"; });
      this.list.appendChild(li);
    });
  }

  positionList() {
    const rect = this.input.getBoundingClientRect();
    this.list.style.top = (rect.bottom + window.scrollY) + "px";
    this.list.style.left = (rect.left + window.scrollX) + "px";
    this.list.style.width = rect.width + "px";
  }

  filterList() {
    const filter = this.input.value.toLowerCase();
    let hasVisible = false;
    Array.from(this.list.children).forEach(li => {
      if (li.textContent.toLowerCase().includes(filter)) { li.style.display = "block"; hasVisible = true; }
      else li.style.display = "none";
    });
    if (hasVisible) { this.list.style.display = "block"; this.positionList(); }
    else this.list.style.display = "none";
  }

  showList() {
    this.list.style.display = "block";
    this.positionList();
  }

  reset() {
    this.input.value = "";
    this.populateList();
    this.list.style.display = "block";
    this.positionList();
  }
}

// Helper function
function createKeyliDropdown(wrapper, options) {
  return new KeyliDropdown(wrapper, options);
}
