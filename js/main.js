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

  // ページの表示
  class viewSet {
    constructor() {
      this.number = document.getElementById('number');
      this.lowersCheckbox = document.getElementById('lowers-checkbox');
      this.capitalsCheckbox = document.getElementById('capitals-checkbox');
      this.numbersCheckbox = document.getElementById('numbers-checkbox');
      this.noSymbol = document.getElementById('no-symbol');
      this.getSymbol = document.getElementById('get-symbol');
      this.count = document.getElementById('count');

      this.resetPage();

      this.info = new makingPassword(this);
      this.showPasswords();

      // 作成ボタンのイベントリスナー
      const making = document.getElementById('making');
      making.addEventListener('click', () => {
        if (!this.lowersCheckbox.checked && (!this.capitalsCheckbox.checked && !this.numbersCheckbox.checked) ) {
          alert('英小文字、英大文字、数字のいずれかにチェックを入れてください')
          this.resetPage();
        } else if (this.number.value > 24 || this.number.value < 8) {
          alert('文字数は８～２４文字を指定してください');
          this.resetPage();
        } else if (this.count.value > 100) {
          alert('作成できるパスワードは最大100個です')
          this.resetPage();
        } else {
          this.showPasswords();
        }
      });

      // リセットボタンのイベントリスナー
      const reset = document.getElementById('reset');
      reset.addEventListener('click', () => {
        this.resetPage();
        this.showPasswords();
      });

      // 記号なしラジオボタンのイベントリスナー
      this.noSymbol.addEventListener('change', () => {
        this.notSlectSymbol();
      });

      // 記号ありラジオボタンのイベントリスナー
      this.getSymbol.addEventListener('change', () => {
        this.getSelectSymbol()
      });

    }

    // チェックボックスの初期化
    resetPage() {
      this.number.value = 8;
      this.lowersCheckbox.checked = true;
      this.capitalsCheckbox.checked = true;
      this.numbersCheckbox.checked = true;
      this.noSymbol.checked = true;
      this.count.value = 10;
      this.notSlectSymbol();
    }

    // 記号なしの表示
    notSlectSymbol() {
      const symbols = document.getElementById('symbols');
      while (symbols.firstChild) {
        symbols.removeChild(symbols.firstChild);
      }
    }

    // 記号ありの表示
    getSelectSymbol() {
      this.notSlectSymbol();

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
    }

    // パスワードの表示
    showPasswords() {
      const passwords = document.getElementById('passwords');
      while (passwords.firstChild) {
        passwords.removeChild(passwords.firstChild);
      }
  
      const pwArray = this.info.makePasswordArray();    
      for (let i = 0; i < this.count.value; i++) {
        const password = document.createElement('div');
        const passwordWidth = 12 * this.number.value;
        password.style.width = `${passwordWidth}px`;
        password.textContent = pwArray[i];
        passwords.appendChild(password);
      }
    }

    getNumber() {
      return this.number;
    }

    getLowersCheckbox() {
      return this.lowersCheckbox;
    }

    getCapitalsCheckbox() {
      return this.capitalsCheckbox;
    }

    getNumbersCheckbox() {
      return this.numbersCheckbox;
    }

    getGetSymbol() {
      return this.getSymbol;
    }

    getCount() {
      return this.count;
    }
  }

  // パスワードの作成
  class makingPassword {
    constructor(info) {
      this.info = info;

      // this.showPassword();
      this.makePasswordArray();
    }

    // チェック項目の確認
    checkCheckbox() {
      const resultCheckbox = [];
      resultCheckbox.push(this.info.getLowersCheckbox().checked);
      resultCheckbox.push(this.info.getCapitalsCheckbox().checked);
      resultCheckbox.push(this.info.getNumbersCheckbox().checked);
      resultCheckbox.push(this.info.getGetSymbol().checked);
      return resultCheckbox;
    }

    // 選択された記号配列の作成
    makeSymbolsbox() {
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
    makeLetters(resultCheckbox) {
      let Letters = [];
      let i = 0;
      resultCheckbox.forEach((result) => {
        if (result === true) {
          if (i === 3) {
            Letters.push(this.makeSymbolsbox());
          } else {
            Letters.push(preLetters[i]);
          }
        }
        i+=1;
      });
      return Letters;
    }

    // パスワードの作成
    makePassword(makedLetters) {
      let Words = [...makedLetters];
      let temporary = '';
      let choice = '';
  
      for (let i = 0; i < this.info.getNumber().value; i++) {
        if (Words.length === 0) {
          Words = [...makedLetters];
        }
        temporary = Words.splice(Math.floor(Math.random() * Words.length), 1)[0];
        choice += temporary[Math.floor(Math.random() * temporary.length)];
      }
      return choice;
    }

    // パスワードを配列に格納
    makePasswordArray() {
      const pwArray = [];
      for  (let i = 0; i < this.info.getCount().value; i++) {
        const resultCheckbox = this.checkCheckbox();
        const makedLetters = this.makeLetters(resultCheckbox);
        const onePassword = this.makePassword(makedLetters);
        pwArray.push(onePassword);
      }
      return pwArray;
    }
  }

  new viewSet();
}