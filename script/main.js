const panel = document.querySelector(".panel");
const panel_li = panel.querySelectorAll("li");
const panel_li_arr = Array.from(panel_li);
const len = panel_li.length;
const btnUp = document.querySelector(".btnUp");
const btnDown = document.querySelector(".btnDown");




function splitTxt(el) {
    const txt = el.textContent;
    /*
    textContent vs innerText
    textContent 요소의 모든 텍스트 컨텐트를 가져옵니다
    innerText 는 가져오긴 하는데 만약 요소가 css, js로 숨겨지거나 훼손되면
    가져오지 못합니다  
    예) h2태그가 있는데 span이 안에 있습니다.
    span을 display ; none 을 했을때 innerText는 span을 읽지 못합니다
    하지만 textContent는 가져옵니다
    */
    const fragment = document.createDocumentFragment();
    /*
    DocumentFragment : DOM(document등으로 생성되는 요소들)조작을 메모리상에서
    수행하는 메소드, 메모리에서만 DOM을 구성하고 실제로 DOM에 삽입하는건
    한번만 삽입합니다. 따라서 기존에 비해서 성능이 개선될수있습니다
    */
    let num = 0;
    for (let el of txt) {
        let span = document.createElement("span")
        span.style.transitionDelay = `${0.1 * num++}s`;
        span.textContent = el;
        fragment.appendChild(span)
    }
    el.innerHTML = ""
    el.appendChild(fragment);
}
