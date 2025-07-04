/*
 * Licensed under JNK 1.1 — an anti-capitalist, share-alike license.
 *
 * Freely remix, learn, rebuild — just don’t sell or lock it down.
 * Derivatives must stay free and link back to the source.
 *
 * Full license: https://dstwre.sh/license
 */


export function typeText(element, fullText, speed = 100, blinking = false, erase = false) {
  return new Promise((resolve) => {
    const eraseText = () => {
      return new Promise((eraseResolve) => {
        const currentText = element.textContent;
        let i = currentText.length;

        const eraseTimer = setInterval(() => {
          i--;
          element.textContent = currentText.slice(0, i);
          if (i <= 0) {
            clearInterval(eraseTimer);
            eraseResolve();
          }
        }, speed);
      });
    };

    const typeNewText = () => {
      element.textContent = "";
      let i = 0;
      const timer = setInterval(() => {
        i++;
        element.textContent = fullText.slice(0, i);
        if (i === fullText.length) {
          clearInterval(timer);

          if (blinking) {
            const slash = document.createElement("span");
            slash.className = "cursor chromatic";
            slash.textContent = "▌";
            slash.setAttribute("data-text", slash.textContent);
            element.appendChild(slash);

            const onEnter = (e) => {
              if (e.key === "Enter" || e.button === 0) {
                document.removeEventListener("keydown", onEnter);
                element.removeEventListener("click", onEnter); 
                slash.remove();
                resolve();
              }
            };
            document.addEventListener("keydown", onEnter);
            element.addEventListener("click", onEnter);  
            console.log(element);
            
          } else {
            resolve();
          }
        }
      }, speed);
    };

    if (erase) {
      eraseText().then(typeNewText);
    } else {
      typeNewText();
    }
  });
}

export function typeLine(text, targetEl, speed = 30) {
  return new Promise((resolve) => {
    const lineEl = document.createElement("div");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      lineEl.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
    targetEl.appendChild(lineEl);
  });
}

export async function typeLinesFromFile(
  url,
  targetEl,
  { charSpeed = 30, minDelay = 100, maxDelay = 400, instant = false } = {}
) {
  try {
    const resp = await fetch(url);
    const text = await resp.text();
    const lines = text.trim().split("\n");

    const bootStart = performance.now();

    for (let idx = 0; idx < lines.length; idx++) {
      const now = performance.now();
      const elapsed = (now - bootStart) / 1000;
      const timeStr = `[${elapsed.toFixed(6).padStart(10, " ")}]`;
      const lineWithTime = lines[idx].replace("[TIME]", timeStr);

      if (instant) {
        const lineEl = document.createElement("div");
        lineEl.innerHTML = lineWithTime;
        targetEl.appendChild(lineEl);
      } else {
        await typeLine(lineWithTime, targetEl, charSpeed);
      }
      targetEl.scrollTop = targetEl.scrollHeight;

      const delay =
        idx === 0 ? 2000 : Math.random() * (maxDelay - minDelay) + minDelay;
      await new Promise((r) => setTimeout(r, delay));
    }
  } catch (err) {
    console.error("Error loading file:", err);
  }
}
