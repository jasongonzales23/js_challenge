function unlock(el){
    this.dragger = document.querySelector(el);
    this.draggerWidth = this.dragger.offsetWidth + 8; //add 8px to have it sit in the track nicer
    this.dragger.style.webkitTransitionProperty = '-webkit-transform';
    this.dragger.style.webkitTransform = 'translate3d(0px, 0, 0)';
    
    this.start = function(e){
        this.startDelta = e.touches ? e.touches[0].pageX : e.pageX;
        this.delta=0;
        this.containerWidth = this.dragger.parentNode.offsetWidth - this.draggerWidth;
        document.addEventListener('mousemove', this);
        document.addEventListener('mouseup', this);
        this.dragger.addEventListener('touchmove', this);
        this.dragger.addEventListener('touchend', this);
    };
    
    this.move = function(e){
        this.delta = (e.touches ? e.touches[0].pageX : e.pageX) - this.startDelta;
       
        if (this.delta < 0 ){ this.delta = 0;}
        if (this.delta > this.containerWidth){
            this.delta = this.containerWidth;
        }
        this.dragger.style.webkitTransitionDuration = '0ms';
        this.dragger.style.webkitTransform = 'translate3d(' + this.delta + 'px, 0, 0)';
    }
    
    this.end = function(e){
        if(this.delta === this.containerWidth){
            alert('success');
        }
        this.dragger.style.webkitTransitionDuration = '200ms';
        this.dragger.style.webkitTransform = 'translate3d(0px, 0, 0)';
        document.removeEventListener('mousemove', this);
        document.removeEventListener('mouseup', this);        
    }
    
    this.dragger.addEventListener('mousedown', this);
    this.dragger.addEventListener('touchstart', this);   
}

unlock.prototype = {
    handleEvent: function(e){
        switch(e.type) {
            case'mousedown':
                this.start(e);
                break;
            case'mousemove':
                this.move(e);
                break;
            case'mouseup':
                this.end(e);
                break;
            case'touchstart':
                this.start(e);
                break;
            case'touchmove':
                this.move(e);
                break;
            case'touchend':
                this.end(e);
                break;
        }
    }
};

var myUnlock = new unlock('#one');
//var myUnlock2 = new unlock('#two');
