/*
 * Licensed under JNK 1.1 - an Anti-Capitalist, Share-Alike, Post-Open-Source license.
 *
 * Learn from it, remix it, break it, rebuild it.
 * But don’t sell it. Don’t lock it up.
 *
 * If you change or build on this, release your version under the same license,
 * keep it free to access, and link back to where it came from.
 *
 * Full license text: https://dstwre.sh/license
 */

import { typeText, typeLinesFromFile } from "./typewriter.js";

window.addEventListener("DOMContentLoaded", async () => {
  const dstwreEl = document.createElement("span");
  dstwreEl.className = "chromatic";
  const dstwreTxt = " ./dstwre.sh";
  dstwreEl.setAttribute("data-text", dstwreTxt);
  dstwreEl.textContent = "";
  const bootOut = document.getElementById("bootOutput");

  await typeLinesFromFile("/src/assets/boot.txt", bootOut, {
    instant: true,
    minDelay: 30,
    maxDelay: 200,
  });

  bootOut.lastChild.appendChild(dstwreEl);

  await typeText(dstwreEl, dstwreTxt, 175, true);

  await typeLinesFromFile("/src/assets/header.txt", bootOut, {
    instant: true,
    charSpeed: 2,
    minDelay: 125,
    maxDelay: 125,
  });
  await typeLinesFromFile("/src/assets/init.txt", bootOut, {
    instant: true,
  });
});
