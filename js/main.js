'use strict';

{
  // パスワード生成用文字列
  const lowers = 'abcdefghijklmnopqrstuvwxyz';
  const capitals = lowers.toUpperCase();
  const numbers = '0123456';
  const symbolsVariety = [
    ['@', '@（アットマーク)'],
    ['+', '+（プラス）'],
    ['-', '-（ハイフン）'],
    ['?','?（クエスチョン）'],
    ['!','!（エクスクラメーション）'],
    ['%','%（パーセント）'],
    ['#','#（シャープ）'],
    ['&','&（アンド）'],
    ['/','/（スラッシュ）'],
    ['$','$（ドル）'],
  ];
  const preLetters = [
    lowers,
    capitals,
    numbers,
   ];

  //チェック項目
  const number = document.getElementById('number');
  const lowersCheckbox = document.getElementById('lowers-checkbox');
  const capitalsCheckbox = document.getElementById('capitals-checkbox');
  const numbersCheckbox = document.getElementById('numbers-checkbox');
  const noSymbol = document.getElementById('no-symbol');
  const getSymbol = document.getElementById('get-symbol');
  const count = document.getElementById('count');

  // 記号なしの表示
  function notSlectSymbol() {
    const symbols = document.getElementById('symbols');
    while (symbols.firstChild) {
      symbols.removeChild(symbols.firstChild);
    }
  }

  // 選択肢の初期化
  function resetPage() {
    number.value = 8;
    lowersCheckbox.checked = true;
    capitalsCheckbox.checked = true;
    numbersCheckbox.checked = true;
    noSymbol.checked = true;
    count.value = 10;
    notSlectSymbol();
  }
  
  // チェック項目の確認
  function checkCheckbox() {
    const resultCheckbox = [];
    resultCheckbox.push(lowersCheckbox.checked);
    resultCheckbox.push(capitalsCheckbox.checked);
    resultCheckbox.push(numbersCheckbox.checked);
    resultCheckbox.push(getSymbol.checked);
    return resultCheckbox;
  }

  // 選択された記号配列の作成
  function makeSymbolsbox() {
    let symbolBox = [];
    let product = '';
    let symbolNumber = 0;
    const symbolBoxes = document.querySelectorAll('.symbol-checkbox');
    symbolBoxes.forEach((box) => {
      if (box.checked) {
        symbolBox.push(symbolsVariety[symbolNumber][0]);
      }
      symbolNumber++;
    });

    for (let i = 0; i < symbolBox.length; i++) {
      product += symbolBox[i];
    }
    return product;
  }

  // パスワード生成用配列の作成
  function makeLetters(results) {
    let Letters = [];
    let i = 0;
    results.forEach((result) => {
      if (result === true) {
        if (i === 3) {
          Letters.push(makeSymbolsbox());
        } else {
          Letters.push(preLetters[i]);
        }
      }
      i+=1;
    });
    return Letters;
  }

  // パスワードの作成
  function makePassword(words) {
    let Words = [...words];
    let temporary = '';
    let choice = '';

    for (let i = 0; i < number.value; i++) {
      if (Words.length === 0) {
        Words = [...words];
      }
      temporary = Words.splice(Math.floor(Math.random() * Words.length), 1)[0];
      choice += temporary[Math.floor(Math.random() * temporary.length)];
    }
    return choice;
  }

  // パスワードの表示
  function showPassword() {
    const passwords = document.getElementById('passwords');
    while (passwords.firstChild) {
      passwords.removeChild(passwords.firstChild);
    }

    for (let i = 0; i < count.value; i++) {
      const resultCheckbox = checkCheckbox();
      const makedLetters = makeLetters(resultCheckbox);
      const password = document.createElement('div');
      const passwordWidth = 12 * number.value;
      password.style.width = `${passwordWidth}px`;
      password.textContent = makePassword(makedLetters);
      passwords.appendChild(password);
    }
  }

  // 記号なし・ありラジオボタンのイベントリスナー
  noSymbol.addEventListener('change', () => {
    notSlectSymbol();
  });

  getSymbol.addEventListener('change', () => {
    const symbols = document.getElementById('symbols');

    while (symbols.firstChild) {
      symbols.removeChild(symbols.firstChild);
    }

    for (let i = 0; i < symbolsVariety.length; i++) {
      const symbolOption = document.createElement('div');
      symbolOption.classList.add('symbol-option');
      const symbolCheckbox = document.createElement('input');
      symbolCheckbox.type = "checkbox";
      symbolCheckbox.classList.add('symbol-checkbox');
      symbolCheckbox.checked = true;
      const p = document.createElement('p');
      p.textContent = symbolsVariety[i][1];
  
      symbols.appendChild(symbolOption);
      symbolOption.appendChild(symbolCheckbox);
      symbolOption.appendChild(p);
    }
  });

  // 作成ボタンのイベントリスナー
  const making = document.getElementById('making');
  making.addEventListener('click', () => {
    if (!lowersCheckbox.checked && (!capitalsCheckbox.checked && !numbersCheckbox.checked) ) {
      alert('英小文字、英大文字、数字のいずれかにチェックを入れてください')
      resetPage();
    } else if (number.value > 24 || number.value < 8) {
      alert('文字数は８～２４文字を指定してください');
      resetPage();
    } else if (count.value > 100) {
      alert('作成できるパスワードは最大100個です')
      resetPage();
    } else {
      showPassword()
    }
  });

  // リセットボタンのイベントリスナー
  const reset = document.getElementById('reset');
  reset.addEventListener('click', () => {
    resetPage();
    showPassword();
  });

  showPassword();
}