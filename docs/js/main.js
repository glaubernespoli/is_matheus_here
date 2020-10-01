let yes = document.getElementById('yes');
let no = document.getElementById('no');
let btn = document.getElementById('btn');
// let card = document.querySelector('.card');

let style = getComputedStyle(document.body);

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let n = Math.random();
    console.log(n);
    _(n > 0.7 ? 'yes' : 'no').animate();
});


function _(el) {
    if (!(this instanceof _)) {
        return new _(el);
    }
    this.el = document.getElementById(el);
}

_.prototype.animate = async function animate() {
    btn.classList.add('disabled');
    this.fade('in', 500);
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.fade('out', 500);
    btn.classList.remove('disabled');
}

_.prototype.fade = async function fade(type, ms) {
    let isIn = type === 'in',
        opacity = isIn ? 0 : 1,
        interval = 50,
        duration = ms,
        gap = interval / duration,
        self = this,
        bg = self.el.id == 'yes' ? 'bg-success' : 'bg-danger',
        color = self.el.id == 'yes' ? 'text-success' : 'text-danger';

    if (isIn) {
        self.el.style.display = 'block';
        self.el.style.opacity = opacity;

        document.body.classList.replace('bg-dark', bg);
        // card.classList.replace('text-light', color);

    } else {
        document.body.classList.replace(bg, 'bg-dark');
        // card.classList.replace(color, 'text-light');
    }

    function func() {
        opacity = isIn ? opacity + gap : opacity - gap;
        self.el.style.opacity = opacity;

        if (opacity <= 0) self.el.style.display = 'none'
        if (opacity <= 0 || opacity >= 1) window.clearInterval(fading);
    }

    var fading = window.setInterval(func, interval);
}