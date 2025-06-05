window.addEventListener("DOMContentLoaded", () => {
  const span = document.getElementById("dstwre");
  const fullText = span.getAttribute("data-text") || "";
  span.textContent = "";
  span.setAttribute("data-text", "");
  setTimeout(() => {
    let index = 0;
    const typingSpeed = 100; // Millisekunden pro Buchstabe

    // 4. Interval für Typewriter‐Effekt
    const typer = setInterval(() => {
      index++;
      const currentSlice = fullText.slice(0, index);

      // a) sichtbarer Text
      span.textContent = currentSlice;
      // b) data-text aktualisieren (für die Pseudo‐Elemente)
      span.setAttribute("data-text", currentSlice);

      // 5. Wenn wir am Ende angekommen sind, Intervall stoppen und Slash einfügen
      if (index === fullText.length) {
        clearInterval(typer);
        setTimeout(() => {
          insertBlinkingSlash();
        }, typingSpeed * 2);
      }
    }, typingSpeed);

    // Funktion, die den blinkenden Slash innerhalb des selben Spans anhängt
    function insertBlinkingSlash() {
      const slash = document.createElement("span");
      slash.classList.add("cursor");
      slash.textContent = "/";
      slash.setAttribute("data-text", slash.textContent);
      // Hier: **innerhalb** von #typewriter ans Ende hängen
      span.appendChild(slash);
    }
  }, 420);
});
