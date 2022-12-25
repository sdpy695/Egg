
/* draggable element */



const eggs = document.querySelectorAll('.item');
var  isItGuessAlready = true;

var typeOfBadEgg = "heavy"


for (let i=0; i <eggs.length; i++){
    eggs[i].addEventListener('dragstart', dragStart);
}

function dragStart(e, egg) {
    console.log('dragstart')
    console.log('e.target.id', e.target.id)
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);

}


/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
    box.addEventListener('dragend', dragEnd);
    box.classList.add('droppable')
});


const cartons = document.querySelectorAll('.carton');
cartons.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
    box.addEventListener('dragend', dragEnd);
    box.classList.add('droppable')

});

document.querySelectorAll('guess-box').classList.add('droppable')

function dragEnd(e) {

    e.target.classList.remove('hide')
   
}

function dragEnter(e) {
   
    if (e.target.classList.contains('droppable')){
        e.target.classList.add('drag-over');
     
    }
   
    
    
}

function dragOver(e) {
    if (e.target.classList.contains('droppable')){
        e.preventDefault();
        // console.log('e.target.classList', e.target.classList)
        e.target.classList.add('drag-over');
    }
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
   
    e.target.classList.remove('drag-over');
  
    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    console.log(draggable, "draggable")
    // add it to the drop target

    e.target.appendChild(draggable);


    draggable.classList.remove('hide');

    console.log('dragdrop')
}

function clearscale() {
    console.log('left eggs ', (document.getElementById('scale-left').children))
    console.log('right eggs ', (document.getElementById('scale-right').children))
    document.getElementById('scaleimage').innerHTML = '<img style="width: 600px" src="assets/scale-balanced-cropped.png"/>'
    document.getElementById('scale-left').style.setProperty('transform', 'translateY(1px)');
    document.getElementById('scale-right').style.setProperty('transform', 'translateY(1px)');
    // for (let i = 0;  i< 12; i++){
    //         console.log('left eggs ', (document.getElementById('scale-left').children))
    //         console.log('returning ', document.getElementById('scale-left').children[0])
    //         // document.getElementById('mystery-carton').appendChild(document.getElementById('scale-left').firstChild)
    //         if(document.getElementById('scale-left').contains(document.getElementById('scale-left').children.namedItem("item"+i)))
    //         document.getElementById('mystery-carton').appendChild(document.getElementById('scale-left').children.namedItem("item"+i))
    //         document.getElementById('scale-left').removeChild( document.getElementById('scale-left').children.namedItem("item"+i))
    //     }
    
    while (document.getElementById('scale-left').children.item(0)){
        console.log('left eggs ', (document.getElementById('scale-left').children))
        console.log('returning ', document.getElementById('scale-left').children[0])
        console.log('egg1', document.getElementById('scale-left').firstChild)
        var leftegg = document.getElementById('scale-left').firstChild
       if (leftegg) {
        console.log('children', document.getElementById('scale-left').children)
        document.getElementById('scale-left').removeChild(leftegg)
        document.getElementById('mystery-carton').appendChild(leftegg)
        // for (let i = 0; i <12; i++) {
            console.log('leftegg' , leftegg)
            console.log('children', document.getElementById('scale-left').children)
        
       }
       
    // }
     }
  

    
    while (document.getElementById('scale-right').children.item(0)){
        console.log('right eggs ', (document.getElementById('scale-right').children))
        console.log('returning ', document.getElementById('scale-right').children[0])
        var rightegg = document.getElementById('scale-right').firstChild
        if (rightegg) {
            document.getElementById('scale-right').removeChild(rightegg)
            document.getElementById('mystery-carton').appendChild(rightegg)
            // for (let i = 0; i <12; i++) {
            
           }
        // document.getElementById('mystery-carton').appendChild(document.getElementById('scale-right').firstChild)
        // // for (let i = 0; i <12; i++) {
        
        // document.getElementById('scale-right').removeChild(document.getElementById('scale-right').firstChild)
        // // }
    }

}

function whatsinscale() {
    var leftWeight = 0;
    var rightWeight = 0;
    console.log()
    const leftScale = document.getElementById('scale-left').children
    const rightScale = document.getElementById('scale-right').children
    
    for (let i = 0; i <leftScale.length; i++) {
        if(leftScale[i].id == "bad-egg"){
            if (typeOfBadEgg == "heavy"){leftWeight += 1.5; }
            else{leftWeight += 0.5; }
        }
        else{ 
            leftWeight += 1; 
        }
    } 

    for (let i = 0; i <rightScale.length; i++) {
        if(rightScale[i].id == "bad-egg"){
            if (typeOfBadEgg == "heavy"){rightWeight += 1.5; }
            else{rightWeight += 0.5; }
        }
        else{ 
            rightWeight += 1; 
        }
    } 

    var heavierSide = "neither" 
    if (rightWeight > leftWeight){
        heavierSide = "right"
        document.getElementById('scaleimage').innerHTML = '<img style="width: 600px" src="assets/scale-right.png"/>'
        document.getElementById('scale-right').style.setProperty('transform', 'translateY(110px)');
        document.getElementById('scale-left').style.setProperty('transform', 'translateY(14px)');
    }
    else if (leftWeight > rightWeight){
        heavierSide = "left"
        document.getElementById('scaleimage').innerHTML = '<img style="width: 600px" src="assets/scale-left.png"/>'
        document.getElementById('scale-left').style.setProperty('transform', 'translateY(110px)');
        document.getElementById('scale-right').style.setProperty('transform', 'translateY(14px)');
    }
    else {
        document.getElementById('scaleimage').innerHTML = '<img style="width: 600px" src="assets/scale-balanced-cropped.png"/>'
        document.getElementById('scale-left').style.setProperty('transform', 'translateY(1px)');
        document.getElementById('scale-right').style.setProperty('transform', 'translateY(1px)');
    }

    console.log(document.getElementById('scale-right').children)
    console.log('heavierSide',heavierSide)
    // document.getElementById('scale-verdict').innerHTML= heavierSide + " side is heavier";
    

    var m1 = document.getElementById('measure 1').innerHTML
    var m2 = document.getElementById('measure 2').innerHTML
    var m3 = document.getElementById('measure 3').innerHTML
   console.log('m1', m1)

   console.log('fc', document.getElementById('measure1scale').children[0]==undefined)
    if (document.getElementById('measure1scale').children[0]==undefined){

        
        for (let i =0; i<leftScale.length; i++){
            const newEgg = leftScale[i].cloneNode(true)
            newEgg.setAttribute("draggable", "false")
            // newEgg.style.setProperty("position", "absolute")
            newEgg.children[0].setAttribute("style", "width:20px")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            document.getElementById('measure1lefteggs').appendChild(newEgg)
        }
        // document.getElementById('measure 1').innerHTML+= " right: " 
        for (let i =0; i<rightScale.length; i++){
            const newEgg = rightScale[i].cloneNode(true)
            newEgg.setAttribute("draggable", "false")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            // newEgg.style.setProperty("position", "absolute")
            newEgg.children[0].setAttribute("style", "width:20px")
            document.getElementById('measure1righteggs').appendChild(newEgg)
        }
        const pic = document.getElementById('scaleimage').firstChild.cloneNode(true)

        pic.style.setProperty('width', "120px")
        document.getElementById('measure1scale').append(pic)

    
        if(heavierSide=='left'){
            document.getElementById('measure1lefteggs').style.setProperty('transform','translateY(20px)' )
        }
        if(heavierSide=='right'){
            document.getElementById('measure1righteggs').style.setProperty('transform','translateY(20px)' )
        }
        // document.getElementById('measure 1').innerHTML+= " heavy side:" + heavierSide 
    }
    else if (document.getElementById('measure2scale').children[0]==undefined){
        // document.getElementById('measure 2').innerHTML = "left: "
        // console.log('left ', leftScale) 
        // console.log('left ', rightScale) 
        // console.log('NEWEGG', leftScale.length)
        // for (let i =0; i<leftScale.length; i++){
        //     const newEgg = leftScale[i].cloneNode(true)
        //     newEgg.setAttribute("draggable", "false")
        //     newEgg.children[0].setAttribute("style", "width:40px")
        //     document.getElementById('measure 2').appendChild(newEgg)
        // }
        // document.getElementById('measure 2').innerHTML += " right: " 
        // for (let i =0; i<rightScale.length; i++){
        //     const newEgg = rightScale[i].cloneNode(true)
        //     newEgg.setAttribute("draggable", "false")
        //     newEgg.children[0].setAttribute("style", "width:40px")
        //     document.getElementById('measure 2').appendChild(newEgg)
        // }
        // document.getElementById('measure 2').innerHTML+= " heavy side:" +heavierSide 

        for (let i =0; i<leftScale.length; i++){
            const newEgg = leftScale[i].cloneNode(true)
            newEgg.setAttribute("draggable", "false")
            // newEgg.style.setProperty("position", "absolute")
            newEgg.children[0].setAttribute("style", "width:20px")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            document.getElementById('measure2lefteggs').appendChild(newEgg)
        }
        // document.getElementById('measure 1').innerHTML+= " right: " 
        for (let i =0; i<rightScale.length; i++){
            const newEgg = rightScale[i].cloneNode(true)
            newEgg.setAttribute("draggable", "false")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            // newEgg.style.setProperty("position", "absolute")
            newEgg.children[0].setAttribute("style", "width:20px")
            document.getElementById('measure2righteggs').appendChild(newEgg)
        }
        const pic = document.getElementById('scaleimage').firstChild.cloneNode(true)

        pic.style.setProperty('width', "120px")
        document.getElementById('measure2scale').append(pic)
        if(heavierSide=='left'){
            document.getElementById('measure2lefteggs').style.setProperty('transform','translateY(20px)' )
        }
        if(heavierSide=='right'){
            document.getElementById('measure2righteggs').style.setProperty('transform','translateY(20px)' )
        }
    }
    else if (document.getElementById('measure3scale').children[0]==undefined){
        // document.getElementById('measure 3').innerHTML = "left: "
        // console.log('left ', leftScale) 
        // console.log('left ', rightScale) 
        // for (let i =0; i<leftScale.length; i++){
        //     const newEgg = leftScale[i].cloneNode(true)
        //     newEgg.setAttribute("draggable", "false")
        //     newEgg.children[0].setAttribute("style", "width:40px")
        //     document.getElementById('measure 3').appendChild(newEgg)
        // }
        // document.getElementById('measure 3').innerHTML += " right: " 
        // for (let i =0; i<rightScale.length; i++){
        //     const newEgg = rightScale[i].cloneNode(true)
        //     newEgg.setAttribute("draggable", "false")
        //     newEgg.children[0].setAttribute("style", "width:40px")
        //     document.getElementById('measure 3').appendChild(newEgg)
        // }
        // document.getElementById('measure 3').innerHTML+= " heavy side:" + heavierSide

        for (let i =0; i<leftScale.length; i++){
            const newEgg = leftScale[i].cloneNode(true)
            newEgg.setAttribute("draggable", "false")
            // newEgg.style.setProperty("position", "absolute")
            newEgg.children[0].setAttribute("style", "width:20px")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            document.getElementById('measure3lefteggs').appendChild(newEgg)
        }
        // document.getElementById('measure 1').innerHTML+= " right: " 
        for (let i =0; i<rightScale.length; i++){
            const newEgg = rightScale[i].cloneNode(true)
            newEgg.setAttribute("draggable", "false")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            // newEgg.style.setProperty("position", "absolute")
            newEgg.children[0].setAttribute("style", "width:20px")
            document.getElementById('measure3righteggs').appendChild(newEgg)
        }
        const pic = document.getElementById('scaleimage').firstChild.cloneNode(true)

        pic.style.setProperty('width', "120px")
        document.getElementById('measure3scale').append(pic)
        if(heavierSide=='left'){
            document.getElementById('measure3lefteggs').style.setProperty('transform','translateY(20px)' )
        }
        if(heavierSide=='right'){
            document.getElementById('measure3righteggs').style.setProperty('transform','translateY(20px)' )
        }
    }
    else{ 
        alert("ERROR: You've already used the scale 3 times!")
    }
    
}

window.onscroll = function() {scrollFunction()};

window.addEventListener ? 
window.addEventListener("scroll",scrollFunction,false) : 
window.attachEvent && window.attachEvent("onscroll",scrollFunction); 

window.addEventListener ? 
window.addEventListener("load",generateEggWeights(),false) : 
window.attachEvent && window.attachEvent("onload",generateEggWeights()); 

function scrollFunction() {
    // console.log('scrollinG!')
    // console.log("T" , document.documentElement.scrollTop)
    // console.log("H", document.body.scrollTop)
    // if (document.documentElement.scrollTop > 50) {
    //     // document.getElementById("titletext").style.setProperty('padding-top', '30px')
    //     document.getElementById("titletext").style.setProperty('font-size', '20pt')
    //     document.getElementById("titletext").style.setProperty('position', 'auto')
    //     // document.getElementById("titletext").style.setProperty('width', '100%')
    //     document.getElementById('cartonrow').style.setProperty('margin-top', '300px')
    //     document.getElementById('intro').style.setProperty('font-size', '0px')
    //     document.getElementById('intro').style.setProperty('visibility', 'hidden')
    //     document.getElementById('scale-history').style.setProperty('margin-bottom', '60%')

    // } else {
    //     // document.getElementById("titletext").style.setProperty('padding-top', 'initial')
    //     document.getElementById("titletext").style.setProperty('font-size', '10vmax')
    //     document.getElementById("titletext").style.setProperty('position', 'auto')
    //     document.getElementById('cartonrow').style.setProperty('margin-top', '100px')
    //     document.getElementById('cartonrow').style.setProperty('margin-bottom', '200px')
    //     // document.getElementById("titletext").style.setProperty('width', 'initial')
    //     document.getElementById('intro').style.setProperty('font-size', 'initial')
    //     document.getElementById('intro').style.setProperty('visibility', 'visible')
    //     document.getElementById('scale-history').style.setProperty('margin-bottom', '5%')

    // }
}


   
// document.body.onload = () => {
//     console.log('load')
//     generateEggWeights()
// }

// window.addEventListener("load", (event) => {
//     console.log("page is fully loaded");
//   });

//   window.onload = (event) => {
//     console.log("page is fully loaded");
//   };


function generateEggWeights ()  {
    const badtype = Math.floor(Math.random() * 2);

    if (badtype > 0){
        typeOfBadEgg = "light"
    }
    console.log('typeofbadegg' , typeOfBadEgg)
    
    const eggs= document.querySelectorAll('.item')
    const badegg = Math.floor(Math.random() * 12);
    console.log("badd egg is " , eggs[badegg].id)
    eggs[badegg].id = "bad-egg"
    
}

function makeGuess () {
    console.log()
    if (document.getElementById('guess-box').children.length == 1){
        if (document.getElementById('guess-box').children[0].id == "bad-egg") {
            document.getElementById('guess-answer').innerHTML="CORRECT!"
            alert('CONGRATULATIONS, YOU FOUND THE BAD EGG. YOU LITTLE MASTERMIND, YOU!')
        }else {
            document.getElementById('guess-answer').innerHTML="INCORRECT!"
        }
    }else if (document.getElementById('guess-box').children.length > 1){
        document.getElementById('guess-answer').innerHTML="Error: too many eggs in guess box!"
    }else if (document.getElementById('guess-box').children.length < 1){
        document.getElementById('guess-answer').innerHTML="Error: put an egg in the guess box!"
    }

}

function guessTime () {
    console.log('guesstime',  document.getElementById('guess-box-box'))
    console.log(document.getElementById("scale").children)

    document.getElementById('guess-box-box').classList.toggle('active')
    // document.getElementById("scale-we-see").classList.toggle('active')
    
    if (isItGuessAlready){

        while (document.getElementById('scale-left').children.item(0)){
            var leftegg = document.getElementById('scale-left').firstChild
           if (leftegg) {
            document.getElementById('scale-left').removeChild(leftegg)
            document.getElementById('mystery-carton').appendChild(leftegg) 
        }
        
         }
      
    
        
        while (document.getElementById('scale-right').children.item(0)){
           
            var rightegg = document.getElementById('scale-right').firstChild
            if (rightegg) {
                document.getElementById('scale-right').removeChild(rightegg)
                document.getElementById('mystery-carton').appendChild(rightegg)
               
               }
          
        }
       
        document.getElementById("scale-left").style.setProperty('visibility', 'hidden')
        document.getElementById("scale-right").style.setProperty('visibility', 'hidden')
        document.getElementById("scaleimage").style.setProperty('visibility', 'hidden')
        isItGuessAlready = false;
    }else {
        console.log(document.getElementById('guess-box').children)
        while(document.getElementById('guess-box').children.length>0){
            console.log('child', document.getElementById('guess-box').children[0])
            document.getElementById("mystery-carton").appendChild(document.getElementById('guess-box').children[0])
            // document.getElementById('guess-box').removeChild(document.getElementById('guess-box').children[0])

        }
          
        
        document.getElementById("scale-left").style.setProperty('visibility', 'visible')
        document.getElementById("scale-right").style.setProperty('visibility', 'visible')
        document.getElementById("scaleimage").style.setProperty('visibility', 'visible')
        
        isItGuessAlready = true;
    }

   

}