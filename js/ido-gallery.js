'use srict'
console.log('ido-gallery');

var gProjs = [
    {
        id: "sokoban",
        name: "Sokoban",
        title: "Better push those boxes",
        desc: "lorem ipsum lorem ipsum lorem ipsum1",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "chess",
        name: "chess",
        title: "kill the king",
        desc: "lorem ipsum lorem ipsum lorem ipsum2",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "calcu",
        name: "calcu",
        title: "lats do math",
        desc: "lorem ipsum lorem ipsum lorem ipsum3",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "balloons",
        name: "balloons",
        title: "pop pop pop",
        desc: "lorem ipsum lorem ipsum lorem ipsum4",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "memoryLogos",
        name: "memoryLogos",
        title: "can you remember?",
        desc: "lorem ipsum lorem ipsum lorem ipsum4",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "minesweeper",
        name: "minesweeper",
        title: "boom!!!",
        desc: "lorem ipsum lorem ipsum lorem ipsum4",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    }
]

function initPage() {
    console.log('initPage function');
    //set the progs
    for (var i = 0; i < gProjs.length; i++) {
        //the pic
        var elProg = document.querySelector('.portfolio-item:nth-child(' + (i+1) + ') .img-fluid');
        console.log(elProg);
        var strHtml = '';
        strHtml += 'progs/' + gProjs[i].id + '/img/'+ gProjs[i].id+'.jpg'; 
        elProg.src = strHtml; 
        console.log(elProg);

        // the <h4>
        elProg = document.querySelector('.portfolio-item:nth-child(' + (i+1) + ') h4');
        console.log(elProg);
        strHtml = '';
        strHtml += gProjs[i].id;
        console.log(strHtml,'strhtml');
        
        elProg.innerText = strHtml; 
        console.log(elProg);

        // the <p>
        elProg = document.querySelector('.portfolio-item:nth-child(' + (i+1) + ') p');
        console.log(elProg);
        strHtml = '';
        strHtml += gProjs[i].title;
        console.log(strHtml,'strhtml');
        
        elProg.innerText = strHtml; 
        console.log(elProg);

        elProg = document.querySelector('.portfolio-modal');
        console.log(elProg, 'portfolioModal');
        strHtml = '';
        strHtml += gProjs[i].title;
        console.log(strHtml,'strhtml');
        // elProg.innerText = strHtml; 
        console.log(elProg);
    }
}

