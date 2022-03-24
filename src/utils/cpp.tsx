class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class PairPoints {
    pointA: Point;
    pointB: Point;
    distance: number;

    constructor(pointA: Point, pointB: Point, distance: number) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.distance = distance;
    }
}

function compareX(coordA: Point, coordB: Point) {
    return coordA.x - coordB.x;
}

function compareY(coordA: Point, coordB: Point) {
    return coordA.y - coordB.y;
}

function distance(coordA: Point, coordB: Point) {
    var xPower = (coordA.x - coordB.x) * (coordA.x - coordB.x);
    var yPower = (coordA.y - coordB.y) * (coordA.y - coordB.y);

    return Math.sqrt(xPower + yPower);
}

function bruteForce(arr: Array<Point>, n: number) {
    var result = new PairPoints(new Point(0, 0), new Point(0, 0), Number.MAX_VALUE);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            var mem = distance(arr[i], arr[j]);
            if (mem < result.distance) result.distance = mem; result.pointA = arr[i]; result.pointB = arr[j];
        }
    }

    return result;
}

// function minValue(x: number, y: number) {
//     return x < y ? x : y;
// }

function minValue(x: PairPoints, y: PairPoints) {
    return x.distance < y.distance ? x : y;
}

function stripClosest(arr: Array<Point>, size: number, d: PairPoints) {
    var min = d;

    arr.sort(compareY);

    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size && arr[j].y - arr[i].y < min.distance; ++j) {
            var mem = distance(arr[i], arr[j]);
            if (mem < min.distance) min.distance = mem; min.pointA = arr[i]; min.pointB = arr[j];
        }
    }

    return min;
}

// Precisa adaptar a função para passar o ponto do navio para buscar o menor entre os pontos das bombas.
function closestUtil(arr: Array<Point>, n: number) {
    if (n <= 3) return bruteForce(arr, n);

    var mid = Math.trunc(n / 2);
    var midCoord: Point = arr[mid];

    var leftSide = closestUtil(arr, mid);
    var rightSide = closestUtil(arr.slice(mid), n - mid);


    console.log('leftside:')
    console.log('pointA: ' + leftSide.pointA.x + ', ' + leftSide.pointA.y)
    console.log('pointB: ' + leftSide.pointB.x + ', ' + leftSide.pointB.y)
    console.log("distance: " + leftSide.distance)

    console.log('rightside:')
    console.log('pointA: ' + rightSide.pointA.x + ', ' + rightSide.pointA.y)
    console.log('pointB: ' + rightSide.pointB.x + ', ' + rightSide.pointB.y)
    console.log("distance: " + rightSide.distance)

    var d: PairPoints = minValue(leftSide, rightSide);

    var strip = [];
    let j = 0;
    for (let i = 0; i < n; i++) {
        var mem = Math.abs(arr[i].x - midCoord.x);
        if (mem < d.distance) {
            strip.push(arr[i]);
            j++;
        }
    }

    return minValue(d, stripClosest(strip, j, d));
}

// Precisar iterar para encontrar os menores pontos entre navios e bombas e retornar um vetor com esses pontos
function cpp(arr: Array<Point>, n: number) {
    arr.sort(compareX);

    return closestUtil(arr, n);
}

var P: Point[] = [new Point(2, 3), new Point(12, 30), new Point(40, 50), new Point(5, 1), new Point(12, 10), new Point(3, 4), new Point(3, 7)];
var PP = cpp(P, P.length)
console.log('resultado:')
console.log('pointA: ' + PP.pointA.x + ', ' + PP.pointA.y)
console.log('pointB: ' + PP.pointB.x + ', ' + PP.pointB.y)
console.log("distance: " + PP.distance)