const panel = document.querySelector(".panel");
const panel_li = panel.querySelectorAll("li");
const panel_li_arr = Array.from(panel_li);
const len = panel_li.length;
const btnUp = document.querySelector(".btnUp");
const btnDown = document.querySelector(".btnDown");
const delay = 600;
panel_li.forEach((el) => { splitTxt(el.querySelector("h2")) });
//panel li에 반복을 돌면서
//각각의 li에 반복적으로 splitTxt함수를 적용합니다
//spliTxt함수의 인수로 반복을 돌고있는 panel li의 안에 h2태그를 찾아서
//인수로 넣습니다


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

    /*
    innerHTML : 요소의 내부 HTML을 조작하는 속성
    신뢰할 수 없는 데이터를 innerHTML에 직접 삽입하면 문제가 될 수 있습니다

    하지만 지금처럼 메모리상에서 만들고 HTML에 직접 삽입해야 할때는
    innerHTML을 대체할 다른 방법이 없습니다
    따라서 innerHTML을 사용하는 방법은 확실한 보안상태의 코드일때 사용하는 것이
    좋습니다.
    */
}

btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
function moveUp() {
    //on클래스가 붙은 대상을 panel에서 찾습니다
    const current_item = panel.querySelector(".on");
    const current_index = panel_li_arr.indexOf(current_item)
    //찾은 그 대상의 index를 구합니다. (indexOf) => panel_li_arr을 사용해햐 합니다
    let next_index = null;
    //다음 슬라이드 인덱스를 변수
    if (current_index !== len - 1) {
        next_index = current_index + 1
    } else {
        next_index = 0;
    }

    //if문으로 쓰면 좋은 것 1.가독성 2.확장성 3.유지보수성

    //3항연산자로 변환

    // current_index !== len - 1 ? next_index = current_index + 1 : next_index = 0;

    //조건문으로 넥스트인덱스가 어떤 값이 될지 (순환을 시켜주는 것)
    current_item.classList.remove("on");
    //현재 li에 on을 지웁니다
    current_item.classList.add("up")
    //그리고 on을 지운 현재 li에 up클래스를 붙여 위로 올라가는 효과를 가지도록 합니다
    panel_li[next_index].classList.add("down")
    //그리고 next_index에 해당하는 li에 down이라는 클래스를 붙입니다(일시적으로)

    //delay시간 뒤에 함수안의 내용을 실행합니다
    setTimeout(() => {
        panel_li[next_index].classList.remove("down");
        //down클래스를 지웁니다
        panel_li[next_index].classList.add("on");
        //동시에 on을 붙여서 before, after로 나누었던 li를 붙여지는 모션을 보여줍니다
        panel.querySelector(".up").classList.remove("up");
        //동시에 이전에 활성화 되었던 current_item에 붙인 up클래스를 지웁니다
    }, delay)
}
function moveDown() {

    const current_item = panel.querySelector(".on");
    const current_index = panel_li_arr.indexOf(current_item)

    let prev_index = null;

    if (current_index !== 0) {
        prev_index = current_index - 1
    } else {
        prev_index = len - 1;
    }

    current_item.classList.remove("on");
    current_item.classList.add("down")

    panel_li[prev_index].classList.add("up")

    setTimeout(() => {
        panel_li[prev_index].classList.remove("up");

        panel_li[prev_index].classList.add("on");

        panel.querySelector(".down").classList.remove("down");

    }, delay)
}
