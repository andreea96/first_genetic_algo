var parseArgv = require('minimist');
var desiredValue = parseArgv(process.argv.slice(2));
var desiredName = desiredValue.n;

var a  = 97;
var b = 123;
var individLength = desiredValue.n.length;


var initialPopulation = [
   [97,110,100, 99,100,100,123],
   [110, 109,106,107,101,101,101],
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
       
    }();

    found=true;
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

