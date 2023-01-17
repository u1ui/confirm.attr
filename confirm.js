

let resentConfirmed = false;

document.addEventListener('submit', async e=>{
    if (resentConfirmed) return;

    const form = e.target;
    const btn = e.submitter;

    let element = null;
    if (form.hasAttribute('u1-confirm')) element = form;
    if (btn && btn.hasAttribute('u1-confirm')) element = btn;

    if (element) {
        let msg = getMessage(element);
        e.preventDefault();
        e.stopImmediatePropagation();
        let {confirm} = await import('../dialog.js@3.2.0/dialog.js');
        let ok = await confirm(msg);
        if (ok) {
            resentConfirmed = true;
            form.requestSubmit(btn);
            resentConfirmed = false;
        }
    }

},true);

/* todo: button, link confirm?
document.addEventListener('click', async e=>{
    if (resentConfirmed) return;
    let element = e.target.closest('[u1-confirm]');
    if (!element) return;
    if (element.form || element.tagName === 'FORM') {
        console.log('handled by submit event');
        return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    let {confirm} = await import('../dialog.js@3.0.2/dialog.js');
    let msg = getMessage(element);
    let ok = await confirm(msg);
    if (ok) {
        resentConfirmed = true;
        element.click();
        resentConfirmed = false;
    }
},true);
*/

function getMessage(el) {
    return el.getAttribute('u1-confirm') || 'Are you sure?';
}
