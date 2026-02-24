(function(){

const css = (`
.make-circle {
  position: relative;
  text-align: center;
}
.make-circle .center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  margin: 0;
}
.make-circle .circle-kid {
  position: absolute;
  transform: translate(-50%,-50%);
  margin: 0;
}
.make-circle .circle-list {
  list-style-type: none;
  position: static;
  margin: 0;
  padding: 0;
}
`);
const sty = document.createElement('style');
sty.setAttribute('name','make-circle');
sty.innerHTML = css;
const head  = document.querySelector('head');
head.insertBefore(sty,head.firstChild);

document.querySelectorAll('.make-circle').forEach(el => {
  const r = Number(el.getAttribute('data-radius')) || 8;
  const s = Number(el.getAttribute('data-size')) || 2.5;
  const c = el.querySelector('.center') || el.firstElementChild;
  const sr = s*r;
  const cc = sr/2;
  
  const kids = [];
  for (let i = 0; i < el.children.length; i++) {
    if(el.children[i] === c) continue;
    kids.push(el.children[i]);
  }
  if (kids.length === 1
    && kids[0].firstElementChild.tagName === 'LI') {
    const list = kids[0];
    list.classList.add('circle-list');
    kids.shift();
    for(let i = 0; i < list.children.length; i++){
      kids.push(list.children[i])
    }
  }
  
  const d = 2*Math.PI / kids.length;
  
  const vecs = [];
  let th = 3*Math.PI / 2;
  for (let i = 0; i < kids.length; i++) {
    const x = r*Math.cos(th).toFixed(5);
    const y = r*Math.sin(th).toFixed(5);
    vecs.push([x,y])
    th += d;
  }
  
  el.style.setProperty('width',sr+'em');
  el.style.setProperty('height',sr+'em');
  
  c.classList.add('center');
  
  let i = 0;
  kids.forEach(k => {
    k.classList.add('circle-kid');
    k.style.setProperty('left',`${cc + vecs[i][0]}em`);
    k.style.setProperty('top',`${cc + vecs[i][1]}em`);
    ++i;
  });

});

})()