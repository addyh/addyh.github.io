// scale size of the first square
var w = 10;

// position of the starting middle square
var x;
var y;
var h = w;
var num = 0;
var nfib = 0;

function draw() {
    createCanvas(windowWidth, windowHeight-5);
    background(180);
    strokeWeight(2);
    noFill();

    num = 0;
    nfib = 0;

    while (fibWidth(num+1)+w < windowWidth && fibHeight(num+1) < windowHeight) {
        num++;
    }

    var pos = findPos(num)
    x = pos.x+w;
    y = pos.y+h;

    push();
    drawSpiral(num);
    pop();
}

function fib(n) {
    return (n==0? 0:
            n==1||n==2? 1:
            fib(n-1) + fib(n-2));
}

function fibWidth(n) {
    return (n%2==0? fib(n+1)*w : fib(n+2)*w);
}

function fibHeight(n) {
    return (n%2==0? fib(n+2)*h : fib(n+1)*h);
}

function findPos(n) {
    for (var j = n; j >= 1; j--) {
        i = j; while (i>4) i-=4
        if (j==n) {
            eval('var pos = ['+(i==4?'0, 0':
                                i==3?'fibWidth(n), 0':
                                i==2?'fibWidth(n), fibHeight(n)':
                                i==1?'0, fibHeight(n)':']')+'];');
            x = pos[0];
            y = pos[1];
        }
        if (j==1) {
            y -= fib(j+1)*h;
        } else {
            var s = (i==1?'+-':
                    i==2?'--':
                    i==3?'-+':
                    i==4?'++':null);
            eval('x'+s[0]+'=(fib(j+1)*w);'
               + 'y'+s[1]+'=(fib(j+1)*h);');
        }
    }
    return {x:x, y:y};
}

// v3.0.1 (compacted version)
function drawSpiral(num) {
    for (var j = 0; j <= num; j++) {
      //console.log(nfib+2,fib(nfib+2));
        var i = j; while (i>4) i-=4;
        var n = fib(++nfib);
        var d = ");rect(0, 0, n*w, n*h);arc(";
        eval("translate("+(
        i==0?"x+w, y"+d+"0, n*h, 2*n*w, 2*n*h, 3*PI/2, TWO_PI)":
        i==1?"-n*w,0"+d+"n*w,n*h,2*n*w,2*n*h,PI,3*PI/2)":
        i==2?"0,fib(nfib-1)*h"+d+"n*w,0,2*n*w,2*n*h,PI/2,PI)":
        i==3?"fib(nfib-1)*w,-1*fib(nfib-2)*h"+d+"0,0,2*n*w,2*n*h,0,PI/2)":
        i==4?"-1*fib(nfib-2)*w,-n*h"+d+"0,n*h,2*n*w,2*n*h,3*PI/2,TWO_PI)":
        ")"));
    }
}

// v3.0
function drawSpiral_v3(num) {
    for (var j = 0; j <= num; j++) {
        var i = j; while (i>4) i-=4;
        var n = fib(++nfib);
        eval("translate(" +
                (i==0?"x+w,             y)":
                i==1?"-n*w,             0)":
                i==2?"0,                fib(nfib-1)*h)":
                i==3?"fib(nfib-1)*w,    -1*fib(nfib-2)*h)":
                i==4?"-1*fib(nfib-2)*w, -n*h)":")")
            + ";rect(0, 0, n*w, n*h);"
            + "arc(" +
                (i==0?"0,  n*h, 2*n*w, 2*n*h, 3*PI/2, TWO_PI)":
                i==1?"n*w, n*h, 2*n*w, 2*n*h, PI,     3*PI/2)":
                i==2?"n*w, 0,   2*n*w, 2*n*h, PI/2,   PI)":
                i==3?"0,   0,   2*n*w, 2*n*h, 0,      PI/2)":
                i==4?"0,   n*h, 2*n*w, 2*n*h, 3*PI/2, TWO_PI)":")")
        );
    }
}

// v2.0
function drawSpiral_v2(num) {

    var n = fib(++nfib)
    translate(x+w, y);
    rect(0, 0, n*w, n*h);
    arc(0, n*h, 2*n*w, 2*n*h, 3*PI/2, TWO_PI);

    for (var i = 0; i < num; i++) {

        n = fib(++nfib);
        translate(-n*w, 0)
        rect(0, 0, n*w, n*h);
        arc(n*w, n*h, 2*n*w, 2*n*h, PI, 3*PI/2);

        translate(0, n*h);
        n = fib(++nfib);
        rect(0, 0, n*w, n*h);
        arc(n*w, 0, 2*n*w, 2*n*h, PI/2, PI);

        translate(n*w, -1*fib(nfib-1)*h);
        n = fib(++nfib);
        rect(0, 0, n*w, n*h);
        arc(0, 0, 2*n*w, 2*n*h, 0, PI/2);

        n = fib(++nfib);
        translate(-1*fib(nfib-2)*w, -n*h);
        rect(0, 0, n*w, n*h);
        arc(0, n*h, 2*n*w, 2*n*h, 3*PI/2, TWO_PI);
    }
}

// v1.0
function drawSpiral_v1() {

    var n = fib(1)
    translate(x+w, y);
    rect(0, 0, n*w, n*h);
    arc(0, n*h, 2*n*w, 2*n*h, 3*PI/2, TWO_PI);

    n = fib(2)
    translate(-n*w, 0)
    rect(0, 0, n*w, n*h);
    arc(n*w, n*h, 2*n*w, 2*n*h, PI, 3*PI/2);

    translate(0, n*h);
    n = fib(3)
    rect(0, 0, n*w, n*h);
    arc(n*w, 0, 2*n*w, 2*n*h, PI/2, PI);

    translate(n*w, -1*fib(2)*h);
    n = fib(4)
    rect(0, 0, n*w, n*h);
    arc(0, 0, 2*n*w, 2*n*h, 0, PI/2);

    n = fib(5)
    translate(-1*fib(3)*w, -n*h);
    rect(0, 0, n*w, n*h);
    arc(0, n*h, 2*n*w, 2*n*h, 3*PI/2, TWO_PI);

    n = fib(6)
    translate(-n*w, 0);
    rect(0 ,0, n*w, n*h);
    arc(n*w, n*h, 2*n*w, 2*n*h, PI, 3*PI/2);

    translate(0, n*h);
    n = fib(7);
    rect(0, 0, n*w, n*h);
    arc(n*w, 0, 2*n*w, 2*n*h, PI/2, PI);

    translate(n*w, -1*fib(6)*h);
    n = fib(8);
    rect(0, 0, n*w, n*h);
    arc(0, 0, 2*n*w, 2*n*h, 0, PI/2);

    n = fib(9);
    translate(-1*fib(7)*w, -n*h);
    rect(0, 0, n*w, n*h);
    arc(0, n*h, 2*n*w, 2*n*h, 3*PI/2, TWO_PI);

    n = fib(10);
    translate(-n*w, 0);
    rect(0 ,0, n*w, n*h);
    arc(n*w, n*h, 2*n*w, 2*n*h, PI, 3*PI/2);
}
