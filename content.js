
const ratio = 1.691;

const sizes = {
    'Normal': {
        height: 604
    },
    'FullHD': {
        height: 842
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.choose){
        changeSize(request.choose);
        localStorage.setItem('EstacioFlashSize.size', request.choose);
    }
    else
    if(request.options){
        sendResponse({
            options: window.loaded === true ? Object.keys(sizes) : undefined,
            active: localStorage.getItem('EstacioFlashSize.size')
        });
    }
});

var frame = document.querySelector('#courseIframe');

(function(){
    if(frame){
        frame.onload = ((e) => {
            var currentSize = localStorage.getItem('EstacioFlashSize.size');

            changeSize(currentSize ? currentSize : 'Normal');

            window.loaded = true;
        });
    }
})(document);

function changeSize(size){
    if(frame){
        const flash = frame.contentDocument.querySelector('#centro > object');
        const container = frame.contentDocument.querySelector('#centro');
        const body = frame.contentDocument.querySelector('body');

        size = sizes[size];

        if(size){
            flash.style.width = (size.height * ratio)+'px';
            flash.style.height = size.height+'px';
            flash.style.margin = 'auto';   
            
            container.style.width = 'inherit';
            container.style.backgroundImage = 'none';
            container.style.display = 'flex';
            
            body.style.backgroundImage = 'none';
        }
    }
}