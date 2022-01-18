function glitchText() {
  glitchRef = document.getElementsByClassName('glitch')[0];

  for (i=0; i < 9; i++) {
    glitchRef.innerHTML += '<div class="line">wyspr.xyz</div>';
  }
}

function treeFill() {
  let links = new Map([
    ['ds3-level-calculator', './ds3calc/'],
    ['src',               'https://github.com/preprocessor/preprocessor.github.io']
  ]);//src needs to be the last one for the tree to work properly 🤪

  var treeRef = document.getElementsByClassName('tree')[0],
      symbol;

  for (let [name, link] of links) {

    if (name != "src") {
      symbol = '├─';
    } else {
      symbol = '└─';
    }

    treeRef.innerHTML += '<div class="treeItem">&nbsp;&nbsp;'+symbol+'<a href="'+link+'">'+name+'</a></div>';
  }
}

function init() {
  glitchText();
  treeFill();
}