function glitchText() {
  var glitchRef = document.getElementsByClassName('glitch')[0],
      message   = 'wyspr.xyz'

  for (i=0; i < 9; i++) {
    glitchRef.innerHTML += '<div class="line">' + message + '</div>';
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
    if (name != 'src') {
      symbol = '├─';
    } else {
      symbol = '└─';
    }

    treeRef.innerHTML += '<div class="treeItem">&nbsp;&nbsp;'+symbol+'<a href="'+link+'">'+name+'</a></div>';
  }
}

async function openTerminal() {

  var glitch       = document.getElementsByClassName('glitch')[0],
      terminal     = document.getElementsByClassName('terminal')[0],
      titlebar     = document.getElementsByClassName('titleBar')[0],
      tree         = document.getElementsByClassName('tree')[0],
      prompts      = document.getElementsByClassName('prompt'),
      activePrompt = prompts[1],
      message      = prompts[0].innerText;

  glitch.removeAttribute("onclick");
  glitch.style.cursor = 'unset'
  terminal.style = '';
  terminal.classList.add('opened');

  await waitForMs(1600);
  titlebar.classList.add('revealed')
  await waitForMs(156);
  activePrompt.classList.add('blinking')
  await waitForMs(364);
  await typeSentence(message, activePrompt);
  await waitForMs(300);

  activePrompt.classList.remove('blinking');
  activePrompt.classList.add('ran');
  await waitForMs(100);

  tree.style.opacity = 1;
  await waitForMs(100);

  prompts[2].classList.add('blinking');
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