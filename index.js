function glitchText() {
  for (i = 0; i < 9; i++) {
    items.glitchRef.innerHTML += '<div class="line">wyspr.xyz</div>';
  }
  return;
}

function treeFill() {
  var symbol;
  let links = new Map([
    ['ds-level-calculator', './dscalc/'],
    ['src',                  'https://github.com/preprocessor/preprocessor.github.io']
  ]);//src needs to be the last one for the tree to work properly 🤪

  for (let [name, link] of links) {
    if (name != 'src') {
      symbol = '├─';
    } else {
      symbol = '└─';
    }

    items.treeRef.innerHTML += '<div class="treeItem">&nbsp;&nbsp;'+symbol+'<a href="'+link+'">'+name+'</a></div>';
  }
  return;
}

async function openTerminal() {

  var titlebar     = document.getElementsByClassName('titleBar')[0],
      prompts      = document.getElementsByClassName('prompt'),
      activePrompt = prompts[1],
      message      = prompts[0].innerText;

  items.glitchRef.outerHTML = items.glitchRef.outerHTML.replace(/style=\"[^"]*" onclick=\"[^"]*"/, '')                       // removes ? cursor and onclick event from glitch text
  items.terminal.classList.add('opened');                                                                                    // open terminal

  await waitForMs(randInterval(1500,1700)).then(()                  => {titlebar.classList.add('revealed')});                // reveal titlebar
  await waitForMs(randInterval(100, 200)).then(()                   => {activePrompt.classList.add('blinking')});            // add cursor to prompt
  await waitForMs(randInterval(300, 400)).then(()                   => {typeSentence(message, activePrompt)});               // type some words
  await waitForMs(randInterval(250, 350)+message.length*75).then(() => {activePrompt.classList.replace('blinking', 'ran')}); // wait until message is finished (message.length*75) and remove the cursor
  await waitForMs(randInterval(100, 200)).then(()                   => {items.treeRef.style.opacity = 1});                   // reveal the tree
  await waitForMs(randInterval(100, 200)).then(()                   => {prompts[2].classList.add('blinking')});              // add cursor to next prompt

  return;
}

async function typeSentence(sentence, ref, delay = 75) {
  for (i = 0; i < sentence.length; i++) {
    ref.innerHTML += sentence.split("")[i];
    await waitForMs(delay);
  }
  return;
}

function waitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randInterval(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

var items = {};

function init() {
  items.glitchRef = document.getElementsByClassName('glitch')[0];
  items.treeRef   = document.getElementsByClassName('tree')[0];
  items.terminal  = document.getElementsByClassName('terminal')[0];
  glitchText();
  treeFill();
  return;
}