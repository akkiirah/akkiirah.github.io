window.addEventListener("DOMContentLoaded", () => {
  const dstwreEl = document.getElementById("dstwre");
  const descEl = document.getElementById("desc");
  const bootOutput = document.getElementById("bootOutput");
  [dstwreEl, descEl].forEach((el) => {
    const text = el.innerText.trim();
    el.setAttribute("data-text", text);
    el.textContent = "";
  });
  typeLinesFromFile("/src/assets/boot.txt", bootOutput, 10, 50, 450, () => {
    function typewriter(
      element,
      speed = 100,
      callback = null,
      addSlash = false
    ) {
      const fullText = element.getAttribute("data-text") || "";
      element.textContent = "";

      let index = 0;
      const typer = setInterval(() => {
        index++;
        const currentSlice = fullText.slice(0, index);
        element.textContent = currentSlice;
        element.setAttribute("data-text", currentSlice);

        if (index === fullText.length) {
          clearInterval(typer);

          if (addSlash) {
            const slash = document.createElement("span");
            slash.classList.add("cursor", "chromatic");
            slash.textContent = "/";
            slash.setAttribute("data-text", slash.textContent);

            setTimeout(() => {
              element.appendChild(slash);
            }, speed * 2);
          }

          if (typeof callback === "function") {
            setTimeout(callback, speed * 2);
          }
        }
      }, speed);

      bootOutput.classList.add("finished");
    }

    typewriter(
      dstwreEl,
      100,
      () => {
        typewriter(descEl, 100, null, false);
      },
      true
    );
  });

  function typewriterLine(text, targetEl, speed = 30, doneCallback = null) {
    let index = 0;
    const lineEl = document.createElement("div");

    const interval = setInterval(() => {
      lineEl.textContent = text.slice(0, index + 1);
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        if (typeof doneCallback === "function") {
          doneCallback();
        }
      }
    }, speed);

    targetEl.appendChild(lineEl);
  }

  function typeLinesFromFile(
    url,
    targetEl,
    charSpeed = 30,
    minDelay = 100,
    maxDelay = 400,
    finalCallback = null
  ) {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const lines = text.trim().split("\n");
        let currentLine = 0;

        function typeNextLine() {
          if (currentLine >= lines.length) {
            if (typeof finalCallback === "function") {
              finalCallback();
            }
            return;
          }

          const line = lines[currentLine];
          typewriterLine(line, targetEl, charSpeed, () => {
            currentLine++;

            let randomDelay =
              Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

            if (currentLine == 1) {
              randomDelay = 2000;
            }

            setTimeout(typeNextLine, randomDelay);
          });
        }

        typeNextLine();
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Datei:", err);
      });
  }
});
