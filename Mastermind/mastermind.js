function output(text) {
  let ele = document.getElementById('output');
  ele.innerHTML += text + '<br>';
}

function enter (input) {
  document.getElementById('input').value = ''
  if (window.input === true) {
    output(input.toUpperCase())
    if (input === "BBBB") {
      output("Program ended.")
      window.input = false
      window.location.reload();
    }
    else {
      window.input = false
      valid = calc(input, window.s)
      window.guess = scores[scores.length - 1]
      output('Guess: ' + window.guess)
      window.input = true
    }
  }
  return false;
}

function gen() {
  scores = [[0, 0]]
  for (var i = 0; i < window.s.length; i++) {
    window.guess = window.s[i]
    for (var j = 0; j < window.possible.length; j++) {
      score = calc(window.possible[j]).length
      if (score > scores[scores.length - 1][0]){
        scores.push([score, window.s[i]])
      }
    }
    scores.sort();
    window.scores = scores
  }

}

function calc(input, array) {
  result = []
  for (var i = 0; i < window.s.length; i++) {
    score = []
    equal = []
    compare = [window.guess[0], window.guess[1], window.guess[2], window.guess[3]]
    current = [window.s[i][0], window.s[i][1], window.s[i][2], window.s[i][3]]
    for (var j = 0; j < window.s[i].length; j++) {
      if (window.guess[j] === window.s[i][j]) {
        score.push("B")
        equal.push(j)
      }
    }
    for (var j = 0; j < equal.length; j++) {
      current.splice(equal[j] - j,1)
      compare.splice(equal[j] - j,1)
    }
    for (var j = 0; j < current.length; j++) {
      if (compare.includes(current[j]) === true) {
        score.push("W")
        current.splice(j,1)
      }
    }
    result.push([score, window.s[i], window.guess])
  }
  split = input.split('')
  matching = []
  for (var i = 0; i < result.length; i++) {
    if (result[i][0].equals(split) === true) {
      matching.push(result[i][1])
    }
  }
  return matching;
}

function setup() {
  window.possible = ["W","B","WW","WB","BB","WWW","WWB","WBB","BBB","WWWW","WWWWB","WWBB","WBBB","BBBB"]
  window.s = []
  first = 1
  second = 1
  third = 1
  fourth = 1
  for (var i = 0; i < 1296; i++) {
    window.s.push([first,second,third,fourth])
    if ([fourth,third,second].equals([6,6,6]) === true) {
      second = 1; third = 1; fourth = 0; first += 1
    }
    else if ([fourth,third].equals([6,6]) === true) {
      third = 1; fourth = 0; second += 1
    }
    else if (fourth === 6) {
      fourth = 0; third += 1
    }
    fourth += 1
  }
  output("Loading...")
  gen()
  output("Guess: 1,1,2,2")
  window.guess = [1, 1, 2, 2]
  window.input = true
}

if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
Array.prototype.equals = function (array) {
    if (!array)
        return false;
    if (this.length != array.length)
        return false;
    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
}
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
