// For header and side navigation active status
window.addEventListener("load", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.boundingClientRect.y <= 0) {
          // Remove side navigation active status
          document
            .querySelectorAll("span[data-target].active")
            .forEach((span) => span.classList.remove("active"));

          // Remove header nav active status
          document
            .querySelectorAll(".nav--item.active")
            .forEach((navItem) => navItem.classList.remove("active"));

          const elementId = entry.target.getAttribute("id");

          // Assign active status to target side nagivation item
          document
            .querySelector(`[data-target=${elementId}]`)
            ?.classList.add("active");

          // Assign active status to header nav item
          document
            .querySelector(`a[href="#${elementId}"]`)
            ?.classList.add("active");
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    }
  );

  document
    .querySelectorAll("section[id]")
    .forEach((section) => observer.observe(section));
});

// Autoscroll to target section
document.querySelectorAll("span[data-target]").forEach((span) =>
  span.addEventListener("click", (event) => {
    document
      .getElementById(`${event.target.getAttribute("data-target")}`)
      .scrollIntoView();
  })
);

// Show modal when clicked
document.querySelectorAll("button.onTriggerPlay").forEach((element) =>
  element.addEventListener("click", () => {
    document.querySelector("body").style.overflow = "hidden";
    document.getElementById("modal").style.display = "block";
  })
);

// Close modal when clicked outside
document.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");

  if (modal.contains(event.target)) {
    document.querySelector("body").style.overflow = "";
    const iframe = modal.querySelector("iframe");
    const src = iframe.src;

    iframe.src = "";
    iframe.src = src;

    modal.style.display = "none";
  }
});

const changeCarouselIndicatorState = (element) => {
  [...element.parentElement.children].forEach((item) =>
    item.classList.remove("active")
  );
  element.classList.add("active");
};

// Reset carousel view
window.addEventListener("load", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target.querySelector(".navigation__item");

          // Change the indicator status
          changeCarouselIndicatorState(element);

          // Scroll the item to view
          document.querySelector(element.getAttribute("href")).scrollIntoView();
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 1,
    }
  );

  document
    .querySelectorAll(".carousel")
    .forEach((carousel) => observer.observe(carousel));
});

// Set indicator status
document
  .querySelectorAll(".carousel--navigation > .navigation__item")
  .forEach((carouselIndicator) =>
    carouselIndicator.addEventListener("click", (event) => {
      changeCarouselIndicatorState(event.target);
    })
  );
