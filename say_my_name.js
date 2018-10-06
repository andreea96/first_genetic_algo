var parseArgv = require('minimist');
var desiredValue = parseArgv(process.argv.slice(2));
var desiredName = desiredValue.n;

var a  = 97;
var b = 123;
var individLength = desiredValue.n.length;
let NUMBER_OF_CHILDREN = 3;

var initialPopulation = [
   [97,110,100, 114,101,101,122],
   [110, 109,106,107,101,101,97],
   [120,115,114,114,101,101,97],
];//setup(10);
console.log(initialPopulation);


var found = false;

while(!found) {
    var parents = [];
    parents = function selection() {
        fitnesses = [];
        initialPopulation.forEach(function (name, key){
            var individFitness = getFitness(name);
            fitnesses.push ({
                individKey: key,
                fitnessScore: individFitness
            });
        });
        fitnesses.sort((a,b) => (a.fitnessScore < b.fitnessScore) ? 1 : (a.fitnessScore > b.fitnessScore) ? -1 : 0 );
        return [
            fitnesses[0],
            fitnesses[1]
            ];
    }();
    console.log(parents);
    initialPopulation = function crossover(parents) {
       var childrenPopulation = [];
       for(var i=0;i<NUMBER_OF_CHILDREN;i++)
       {
           console.log(i);
            childrenPopulation[i] = getChild(parents);
       }
       console.log("children population: ");
       console.log(childrenPopulation);
       return childrenPopulation;
    }(parents);
    // initialPopulation.forEach(function(individ){
    //   var name = implode("", String.fromCharCode(individ));
    //   console.log(name);
    // })
    console.log(getName(initialPopulation[0]));
    console.log(getName(initialPopulation[1]));
    console.log(getName(initialPopulation[2]));

    found=checkIfNameWasFound();
}
function getName(name) {
    var charName = "";
    name.forEach(function (letter) {
        charName += String.fromCharCode(letter);
    });
    return charName;
}
function checkIfNameWasFound() {

    var value = initialPopulation.every(function (name) {
        if(getName(name) === desiredName) {
            return true;
        }
    });

    return value!==undefined;

}
function getChild(parents) {
    var crossOverPoint = getRandomInt(1,desiredName.length);
    var i=0;
    console.log("Crossover point "+crossOverPoint);
    var child = [];
    do{
        child[i] = initialPopulation[parents[0].individKey][i];
        i++;
    }while(i!=crossOverPoint);
    do{
        child[i] = initialPopulation[parents[1].individKey][i];
        i++;
    }while(i!=desiredName.length)
    return child;
}


function getRandomInt(min,max) {
    return parseInt(Math.random()*(max-min)+min);
}


function setup(n){
    var i, initialPopulation = [];
    for(i=0;i<n;i++)
    {
        var element = [];
        var j;
        for(j=0; j<individLength;j++)
        {
            element.push(Math.floor(Math.random()*(b-a)+a));
        }
        initialPopulation.push(element);
    }

    return initialPopulation;
}

function getFitness(element) {
    var count = 0;
    element.forEach(function (letter, key) {
        count += (letter == desiredName.charCodeAt(key))?1:0;
    });

    return parseFloat(count*100/individLength).toFixed(2);
}

