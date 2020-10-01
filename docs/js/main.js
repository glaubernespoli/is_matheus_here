//getting elements
let yes = document.getElementById('yes');
let no = document.getElementById('no');
let btn = document.getElementById('btn');
let card = document.querySelector('.card');

//script variables
let presenceBreakpoint = 0.7;
let fadeTimeMs = 500;
let delayTimeMs = 5000;

/**
 * Adds a click event listener to the button. Calls _.animate() with 'yes' 30% of the time and 'no' 70% of the time.
 */
btn.addEventListener('click', (e) => {
    e.preventDefault();
    _(Math.random() > presenceBreakpoint ? 'yes' : 'no').animate(fadeTimeMs, delayTimeMs);
});

/**
 * Our function that fades in and out. Constructor receives either an element or the id of the element.
 * @param {*} el the element
 */
function _(el) {
    if (!(this instanceof _)) {
        return new _(el);
    }
    this.el = document.getElementById(el);
}

/**
 * Function responsible for creating the animation (fade in and out). 
 * Disables the button to not double click, fades in for fadeMs miliseconds and waits for delayMs miliseconds before fading out.
 * @param {number} fadeMs the fading in miliseconds
 * @param {number} delayMs  the delay in miliseconds
 */
_.prototype.animate = async function animate(fadeMs, delayMs) {
    btn.classList.add('disabled');
    this.fade('in', fadeMs);
    await new Promise(resolve => setTimeout(resolve, delayMs));
    this.fade('out', fadeMs);
    btn.classList.remove('disabled');
}

/**
 * Fade function. Fades the current element, the page background and changes the header text color 
 * based on the type(in/out). BG and color are based on the element chosen (yes/no).
 * @param {string} type the fade type (in/out)
 * @param {number} ms duration of the fading in ms
 */
_.prototype.fade = async function fade(type, ms) {
    let isIn = type === 'in',
        opacity = isIn ? 0 : 1,
        interval = 50,
        duration = ms,
        gap = interval / duration,
        self = this,
        bg = self.el.id == 'yes' ? 'bg-success' : 'bg-danger',
        color = self.el.id == 'yes' ? 'color-success' : 'color-danger';
    if (isIn) {
        self.el.style.display = 'block';
        self.el.style.opacity = opacity;

        document.body.classList.replace('bg-dark', bg);
        card.classList.replace('text-light', color);

    } else {
        document.body.classList.replace(bg, 'bg-dark');
        card.classList.replace(color, 'text-light');
    }

    /**
     * Actual execution of the fading.
     */
    function func() {
        opacity = isIn ? opacity + gap : opacity - gap;
        self.el.style.opacity = opacity;

        if (opacity <= 0) self.el.style.display = 'none'
        if (opacity <= 0 || opacity >= 1) window.clearInterval(fading);
    }

    var fading = window.setInterval(func, interval);
}