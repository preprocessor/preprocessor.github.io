function glitchText() {
  glitchRef = document.getElementsByClassName("glitch")[0];

  for (i=0; i < 9; i++) {
    glitchRef.innerHTML += "<div class='line'>wyspr.xyz</div>";
  }
}

function init() {
  glitchText();
}