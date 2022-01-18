function glitchText() {
  glitchRef = document.getElementsByClassName('glitch')[0];

  for (i=0; i < 9; i++) {
    glitchRef.innerHTML += '<div class="line">wyspr.xyz</div>';
  }
}

function treeFill() {
  let links = new Map([
    ['ds3-level-calculator', './ds3calc/'],
    ['src',                  'https://github.com/preprocessor/preprocessor.github.io']
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

async function openTerminal() {
  document.getElementsByClassName('glitch')[0].removeAttribute("onclick");

  var terminal = document.getElementsByClassName('terminal')[0],
      prompt   = document.getElementsByClassName('prompt'),
      tree     = document.getElementsByClassName('tree')[0];

  terminal.style = '';
  terminal.classList.add('opened');

  await waitForMs(1600);
  await typeSentence("tree ~/xyz/pages", prompt[1]);
  await waitForMs(300);

  prompt[1].classList.remove('blinking');
  prompt[1].classList.add('ran');
  await waitForMs(100);

  tree.style.opacity = 1;
  await waitForMs(100);

  prompt[2].classList.add('blinking');
}

async function typeSentence(sentence, ref, delay = 75) {
  for (i=0; i < sentence.length; i++) {
    ref.innerHTML += sentence.split("")[i];
    await waitForMs(delay);
  }
  return;
}

function waitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function init() {
  glitchText();
  treeFill();
}