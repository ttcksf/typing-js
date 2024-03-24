let unTyped = '';
let typed = '';
let score = 0;
const unTypedField = document.getElementById('untyped');
const typedField = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

const textLists = [
  '<div class="text">',
  'querySelector(".text")',
  'const',
  'function calc()',
  'then',
  'async',
  'await',
  'npm start',
  'npm run dev',
  'nodemon server',
  'tsc -w',
  'manifest.json',
  'require("http")',
  '[]',
  '{}',
  'null',
  'undefined',
  'addEventListener',
  'click',
  '()=>{}',
  'listen("3000")',
  'import',
  'export default',
  'useState(false)',
  'useEffect(()=>{},[])',
  'value',
  'e.preventDefault()',
  'e.target.value',
  'onClick',
  'onChange',
];

const createText = () => {
  typed = '';
  typedField.textContent = typed;
  let random = Math.floor(Math.random() * textLists.length);
  unTyped = textLists[random];
  unTypedField.textContent = unTyped;
};

const keyPress = (e) => {
  if (e.key !== unTyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  score++;
  wrap.classList.remove('mistyped');
  typed += unTyped.substring(0, 1);
  unTyped = unTyped.substring(1);
  typedField.textContent = typed;
  unTypedField.textContent = unTyped;

  if (unTyped === '') {
    createText();
  }
};

const rankCheck = (score) => {
  return `あなたは${score}文字打てました！\n【OK】もう一度やる/【キャンセル】終了する`;
};

const gameOver = (id) => {
  clearInterval(id);
  const result = confirm(rankCheck(score));

  if (result == true) {
    window.location.reload();
  }
};

const timer = () => {
  let time = count.textContent;
  const id = setInterval(() => {
    time--;
    count.textContent = time;

    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

start.addEventListener('click', () => {
  timer();
  createText();
  start.style.display = 'none';
  document.addEventListener('keypress', keyPress);
});

unTypedField.textContent = `60秒以内に大文字小文字、半角スペースも含めて入力してください`;
