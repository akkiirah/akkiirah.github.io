/*
 * Licensed under JNK 1.1 — an anti-capitalist, share-alike license.
 *
 * Freely remix, learn, rebuild — just don’t sell or lock it down.
 * Derivatives must stay free and link back to the source.
 *
 * Full license: https://dstwre.sh/license
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
