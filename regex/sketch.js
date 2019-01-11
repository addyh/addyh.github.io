let regex;
let input;
let output;
let test;
let match;
let exec;
let _global;
let _case;
let flags;

function setup() {

  noCanvas();

  output = select('#output');
  test = select('#test');
  match = select('#match');
  exec = select('#exec');
  split = select('#split');
  replace = select('#replace');

  test.mousePressed(doTest);
  match.mousePressed(doMatch);
  exec.mousePressed(doExec);
  split.mousePressed(doSplit);
  replace.mousePressed(doReplace);

}

function loadVals(doingReplace) {
  _global = select('#global').checked();
  _case = select('#case').checked();
  flags = _global?'g':'';
  flags += _case?'':'i';
  regex = new RegExp(select('#regex').value(), flags);
  input = select('#input').value();

  if (doingReplace) {
    replacement = select('#replacement').value();
  } else {
  /*
    toggleReplacement(false);
    select('#replacement').value('');
  */
  }

}

function doTest() {
  loadVals();
  output.html(('<ul>'+regex.test(input)+'</ul>').toUpperCase());
}

function doMatch() {
  loadVals();
  let matches = input.match(regex);
  let result = '<ul>';

  if (matches && !(matches.length == 1 && matches[0] == '')) {
    for (let i = 0; i < matches.length; i++) {
      result += '<li>' + matches[i] + '</li>';
    }
  } else {
    result += 'NO MATCHES';
  }
  result += '</ul>';
  output.html(result);
}

function doExec() {
  loadVals();
  let res;
  let result = '';
  output.html(' ');

  if (_global) {
    while (res = regex.exec(input)) {
      output.html(output.html() + '<li>' + res + '</li>');
    }
    result = output.html();
  } else {
    result = '<li>' + regex.exec(input) + '</li>';
  }

  if (result == '' || result == ' ' || result == null) {
    result = 'NO RESULT';
  }

  output.html('<ul>' + result + '</ul>');
}

function doSplit() {
  loadVals();
  let reg = input.split(regex);
  let result = '';

  if (reg) {
    for (let i = 0; i < reg.length; i++) {
      result += '<li>' + reg[i] + '</li>';
    }
  } else {
    result = 'NO RESULT';
  }
  output.html('<ul>' + result + '</ul>');
}

/*
function toggleReplacement(show) {
  $('#show-replace').css('display', show?'block':'none');
}

function replacementShown() {
  return ($('#show-replace').css('display') == 'none'?false:true);
}
*/

function doReplace() {
  loadVals(true);
  output.html('<textarea id="replacement-textarea">' + input.replace(regex, replacement) + '</textarea>');
  
/*
  if (replacementShown()) {
    $('#show-replace').css('color', '');
    $('#show-replace').css('font-weight', '');
    $('#replacement').css('border-color', '');
<<<<<<< HEAD
    output.html('<ul>' + input.replace(regex, replacement) + '</ul>');
=======
    output.html('<textarea id="replacement-textarea">' + input.replace(regex, replacement) + '</textarea>');
>>>>>>> 0cf41855c410037103d3263b253569c9643b5028
  } else {
    toggleReplacement(true);
    $('#show-replace').css('color', 'red');
    $('#show-replace').css('font-weight', 'bold');
    $('#replacement').css('border-color', 'red');
  }
*/
}

function practice() {

  // How to declare
  let s   = ' ';
  let r   = / /;
  let rg  = / /g;

  // Another way to define
  let reg = new RegExp(' ', 'gi');

  // ======================================================================
  // Regex Functions:
  // ======================================================================
  // r.test(); - boolean, is the expression found?
  // r.exec(); - match multiple instances of a regex, and capture groups

  // ======================================================================
  // String Functions:
  // ======================================================================
  // s.match();
  // s.split();
  // s.replace();

  // ======================================================================
  // ----- test() ----- r.test(s) -----------------------------------------
  // ======================================================================
  r = /\d{3}/;
  r.test('hello');  // false
  r.test('123');    // true
  r.test('123abc'); // true

  r = /^\d{3}$/;
  r.test('123');    // true
  r.test('123abc'); // false

  // ======================================================================
  // ----- match() ----- s.match(r) ---------------------------------------
  // ======================================================================
  s = 'unicorns and rainbows and cupcakes';

  s.match(/[a-z]+/);   // ["unicorns"]
  s.match(/[a-z]+/g);  // ["unicorns", "and", "rainbows", "and", "cupcakes"]

  s = 'phone number 1: 111-2222 ... phone number 2: 444-5555';
  r  = /(\d{3})-\d{4}/;
  rg = /(\d{3})-\d{4}/g;

  s.match(r);               // 111-2222, 111       (not global)
  s.match(rg);              // 111-2222, 444-5555  (global)

  // ======================================================================
  // ----- exec() ----- r.exec(s) -----------------------------------------
  // ======================================================================
  r.exec(s);                // 111-2222, 111   (not global)
  r.exec(s);                // 111-2222, 111   (not global)
  r.exec(s);                // 111-2222, 111   (not global)

  rg.exec(s);               // 111-2222, 111   (global 1st)
  rg.exec(s);               // 444-5555, 444   (global 2nd)
  rg.exec(s);               // null            (global 3rd)

  // ======================================================================
  // ----- split() ----- s.split(r) ---------------------------------------
  // ======================================================================
  s = 'unicorns and rainbows, and cupcakes';
  s.split(/[,\s]+/); // ["unicorns", "and", "rainbows", "and", "cupcakes"]


  // ======================================================================
  // ----- replace() ----- s.replace(r, cb) -------------------------------
  // ======================================================================
  s = 'unicorns and rainbows and cupcakes';
  s.replace(/\w{8}/,  'kittens'); // "kittens and rainbows and cupcakes"
  s.replace(/\w{8}/g, 'kittens'); // "kittens and kittens and kittens"

  s = 'hello';
  s.replace(/(o)/, '$1-$1-$1$1$1'); // "hello-o-ooo"

  function replaceFunc(match, group1, group2) {
    if (match == 'unicorns') {
      return 'jellybeans';
    } else {
      return 'cats';
    }
    // Any javascript logic you wish
    // let match = arguments[0];
    // let group1 = arguments[1];
    // etc...
  }

  s = 'unicorns and rainbows and cupcakes';
  s.replace(/\w{8}/g, replaceFunc); // "jellybeans and cats and cats"
}
