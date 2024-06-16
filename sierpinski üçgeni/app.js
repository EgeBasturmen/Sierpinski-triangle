const INITIAL_SIZE = 200;  
const INITIAL_DEPTH = 0;
const MAX_DEPTH = 10;

class Triangle {
    constructor(parent,x,y,size) {
        this.parent=parent;
        this.x=x;
        this.y=y;
        this.size = size;
        this.createElement();
    }

    createElement() {
        const triangle =document.createElement('div');
        triangle.className='triangle';
        triangle.style.left=`${this.x}px`;
        triangle.style.top=`${this.y}px`;
        triangle.style.borderLeftWidth=`${this.size/2}px`;
        triangle.style.borderRightWidth=`${this.size/2}px`;
        triangle.style.borderBottomWidth=`${(this.size * Math.sqrt(3))/2}px`;
        this.parent.appendChild(triangle);
    }
}

class Sierpinski {
    constructor(parent,size,depth) {
        this.parent=parent;
        this.size=size;
        this.depth=depth;
        this.init();
    }
    init() {
        this.parent.innerHTML='';
        const x=0;
        const y=0;
        this.createTriangles(x,y,this.size,this.depth);
    }
    createTriangles(x, y,size,depth) {
        if (depth === 0) {
            new Triangle(this.parent, x-size/2, y-(size*Math.sqrt(3))/4,size);
            return;
        }
        for (let i=0;i<3;i++) {
            const newSize=size/2;
            const height=newSize*Math.sqrt(3)/2;
            let newX;
            let newY;
            if (i===0) {
                newX=x;
                newY=y-height/2;
            } 
            else if (i===1) {
                newX=x-newSize/2;
                newY=y+height/2; 
            } 
            else {
                newX=x+newSize / 2;
                newY=y+height / 2; 
            }
            this.createTriangles(newX, newY, newSize, depth - 1);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sierpinskiContainer=document.getElementById('sierpinski-container');
    const sierpinskiElement=document.getElementById('sierpinski');

    let depth=INITIAL_DEPTH;
    let sierpinski=new Sierpinski(sierpinskiElement,INITIAL_SIZE,depth);

    function adjustDepth(event) {
        if (event.deltaY<0 && depth<MAX_DEPTH) {
            depth++;
        } else if (event.deltaY>0 && depth>0) {
            depth--;
        }
        sierpinski=new Sierpinski(sierpinskiElement,INITIAL_SIZE,depth);
    }

    sierpinskiContainer.addEventListener('wheel',adjustDepth);
});
