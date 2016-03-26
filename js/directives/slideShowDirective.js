/**
 * Created by tranchitam on 3/24/16.
 */

app.directive('slideShowDirective', ['snowballService', function (snowballService) {
    return {
        restrict: 'ACE',
        scope: {
            'onPlayClick': '&onPlayClick',
            'detail': '=detail'
        },
        link: function (scope, element, attrs) {
            function VideoSlideShow(slideShow, items, detail, options) {
                this.slideShow = slideShow;
                this.current = 0;
                this.collapse = false;

                if (!options) {
                    this.options = {
                        width: 300,
                        height: 300,
                        radius: 60,
                        deltaDrag: 30,
                        minimumDrag: 5
                    }
                } else {
                    this.options = options;
                }
                this.items = items;
                this.total = items.length;
                this.detail = detail;
            }

            VideoSlideShow.prototype.init = function () {
                this.slideShow.css({
                    'width': this.options.width,
                    'height': this.options.height,
                    '-webkit-perspective': this.options.width,
                    '-moz-perspective': this.options.width,
                    'perspective': this.options.width
                });

                this.container = $('<div></div>');
                this.container.css({
                    'width': this.options.width,
                    'height': this.options.height,
                    '-webkit-transform': 'translateZ(' + (this.options.width / 3) + 'px)',
                    '-webkit-transform-style': 'preserve-3d',
                    '-moz-transform': 'translateZ(' + (this.options.width / 3) + 'px)',
                    '-moz-transform-style': 'preserve-3d',
                    'transform': 'translateZ(' + (this.options.width / 3) + 'px)',
                    'transform-style': 'preserve-3d',
                });

                this.ul = $('<ul></ul>')
                this.ul.css({
                    'display': 'block',
                    'position': 'absolute',
                    'width': this.options.width,
                    '-webkit-transition': '-webkit-transform 500ms ease-in-out',
                    '-webkit-transform-style': 'preserve-3d',
                    '-moz-transition': '-moz-transform 500ms ease-in-out',
                    '-moz-transform-style': 'preserve-3d',
                    'transition': 'transform 500ms ease-in-out',
                    'transform-style': 'preserve-3d'
                });

                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    var li = $('<li></li>')
                    li.css({
                        'width': this.options.width,
                        'height': this.options.height,
                        'display': 'block',
                        'position': 'absolute',
                        '-webkit-transform': 'rotateY(' + (-i * this.options.radius) + 'deg) translateZ(' + (-this.options.width) + 'px)',
                        '-moz-transform': 'rotateY(' + (-i * this.options.radius) + 'deg) translateZ(' + (-this.options.width) + 'px)',
                        '-transform': 'rotateY(' + (-i * this.options.radius) + 'deg) translateZ(' + (-this.options.width) + 'px)'

                    });

                    var div = $('<div></div>');
                    div.css({
                        'color': '#fff',
                        'height': this.options.height,
                        'width': this.options.width,
                        'padding': 0,
                        'box-sizing': 'content-box',
                        'position': 'absolute',
                        '-webkit-perspective': this.options.width,
                        '-moz-perspective': this.options.width,
                        '-perspective': this.options.width,
                    });

                    var image = $('<img>')
                    image.attr('width', '100%');
                    image.attr('height', '100%');
                    image.attr('src', snowballService.getThumbnail(item.collaboration.url));
                    image.css({
                        '-webkit-transition': '-webkit-transform 500ms linear',
                        '-webkit-transform-style': 'preserve-3d',
                        '-moz-transition': '-moz-transform 500ms linear',
                        '-moz-transform-style': 'preserve-3d',
                        'transition': 'transform 500ms linear',
                        'transform-style': 'preserve-3d',
                        'box-shadow': '0px 10px 50px rgb(2,31,52)'
                    });

                    var play = $('<img>')
                    play.attr('width', '50');
                    play.attr('height', '50');
                    play.attr('src', '../images/slideshow/play.png');

                    play.css({
                        'position': 'absolute',
                        'left': this.options.width / 2 - 50 / 2,
                        'top': this.options.height / 2 - 50 / 2,
                        'z-index': '1000'
                    });

                    var self = this;
                    (function (item) {
                        play.on('mousedown', function (event) {
                            if (self.playCallback) {
                                self.playCallback({$item: item, $detail: self.detail});
                            }
                            event.preventDefault();

                        });
                    })(item);

                    div.append(image);
                    div.append(play);
                    li.append(div);
                    this.ul.append(li);
                }

                this.container.append(this.ul);
                this.slideShow.append(this.container);
                this.doStartAnimation();

                this.controls = {
                    mouseDown: false,
                    startDragOffset: {},
                    drag: false
                };

                this.enableTouch();
                this.registerMouseDown();
                this.registerMouseMove();
                this.registerMouseUp();
            }

            VideoSlideShow.prototype.registerPlayCallBack = function (callback) {
                this.playCallback = callback;
            }

            VideoSlideShow.prototype.swipeLeft = function () {
                var self = this;
                if (self.collapse) {
                    if (self.current < self.total - 1) {
                        self.current++;
                        $(self.slideShow).find('ul').css({
                            '-webkit-transform': 'rotateY(' + self.current * self.options.radius + 'deg)',
                            '-moz-transform': 'rotateY(' + self.current * self.options.radius + 'deg)',
                            'transform': 'rotateY(' + self.current * self.options.radius + 'deg)'
                        });
                    }
                }

            }

            VideoSlideShow.prototype.swipeRight = function () {
                var self = this;
                if (self.collapse) {
                    if (self.current > 0) {
                        self.current--;
                        $(self.slideShow).find('ul').css({
                            '-webkit-transform': 'rotateY(' + self.current * self.options.radius + 'deg)',
                            '-moz-transform': 'rotateY(' + self.current * self.options.radius + 'deg)',
                            'transform': 'rotateY(' + self.current * self.options.radius + 'deg)'
                        });
                    }
                }
            }

            VideoSlideShow.prototype.doStartAnimation = function () {
                (function (self) {
                    setTimeout(function () {
                        self.container.css({
                            '-webkit-transition': '-webkit-transform 0.5s ease',
                            '-webkit-transform-style': 'preserve-3d',
                            '-webkit-transform': 'translateZ(' + (self.options.width) + 'px)',
                            '-moz-transition': '-moz-transform 0.5s ease',
                            '-moz-transform': 'translateZ(' + (self.options.width) + 'px)',
                            'transition': 'transform 0.5s ease',
                            'transform-style': 'preserve-3d',
                            'transform': 'translateZ(' + (self.options.width) + 'px)'
                        });
                    }, 200);
                })(this);
            }

            VideoSlideShow.prototype.enableTouch = function () {
                var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
                var self = this;
                if (isTouchDevice) {
                    $(self.slideShow).on('swipeleft', function (evt) {
                        self.swipeLeft();
                    });
                    $(self.slideShow).on('swiperight', function (evt) {
                        self.swipeRight();
                    });
                }
            }

            VideoSlideShow.prototype.registerMouseDown = function () {
                var self = this;
                $(self.slideShow).on('mousedown', function (evt) {
                    var offsetX = (evt.offsetX || evt.pageX - $(evt.target).offset().left);
                    var offsetY = (evt.offsetY || evt.pageY - $(evt.target).offset().top);
                    self.controls.startDragOffset.x = offsetX;
                    self.controls.startDragOffset.y = offsetY;
                    self.controls.mouseDown = true;
                    evt.preventDefault();
                });
            }

            VideoSlideShow.prototype.registerMouseMove = function () {
                var self = this;
                $(self.slideShow).on('mousemove', function (evt) {
                    if (self.controls.mouseDown) {
                        var offsetX = (evt.offsetX || evt.pageX - $(evt.target).offset().left);
                        var offsetY = (evt.offsetY || evt.pageY - $(evt.target).offset().top);
                        if (Math.abs(offsetX - self.controls.startDragOffset.x) > self.options.minimumDrag) {
                            self.controls.drag = true;
                        }
                    }
                });
            }

            VideoSlideShow.prototype.registerMouseUp = function () {
                var self = this;
                $(self.slideShow).on('mouseup', function (evt) {
                    if (self.controls.mouseDown && self.controls.drag) {
                        if (self.collapse) {
                            var offsetX = (evt.offsetX || evt.pageX - $(evt.target).offset().left);
                            if (offsetX - self.controls.startDragOffset.x >= self.options.deltaDrag) {
                                self.swipeRight();
                            } else if (offsetX - self.controls.startDragOffset.x <= -self.options.deltaDrag) {
                                self.swipeLeft();
                            }
                        }

                    } else if (self.controls.mouseDown && !self.controls.drag) {
                        if (!self.collapse) {
                            $(self.slideShow).find(' > div').css({
                                '-webkit-transition': '-webkit-transform 0.5s ease',
                                '-webkit-transform-style': 'preserve-3d',
                                '-webkit-transform': 'translateZ(' + (self.options.width / 3) + 'px)',
                                '-moz-transition': '-moz-transform 0.5s ease',
                                '-moz-transform': 'translateZ(' + (self.options.width / 3) + 'px)',
                                '-moz-transform-style': 'preserve-3d',
                                'transition': 'transform 0.5s ease',
                                'transform-style': 'preserve-3d',
                                'transform': 'translateZ(' + (self.options.width / 3) + 'px)'
                            });
                        } else {
                            $(self.slideShow).find(' > div').css({
                                '-webkit-transition': '-webkit-transform 0.5s ease',
                                '-webkit-transform-style': 'preserve-3d',
                                '-webkit-transform': 'translateZ(' + (self.options.width) + 'px)',
                                '-moz-transition': '-moz-transform 0.5s ease',
                                '-moz-transform': 'translateZ(' + (self.options.width) + 'px)',
                                '-moz-transform-style': 'preserve-3d',
                                'transition': 'transform 0.5s ease',
                                'transform-style': 'preserve-3d',
                                'transform': 'translateZ(' + (self.options.width) + 'px)'
                            });
                        }
                        self.collapse = !self.collapse;
                    }
                    self.controls.mouseDown = false;
                    self.controls.drag = false;
                    evt.preventDefault();
                });
            }

            scope.$watch('detail', function (newValue, oldValue) {
                if (newValue) {
                    var items = newValue.snowball.items;
                    var slideShow = $(element);
                    var videoSlideShow = new VideoSlideShow(slideShow, items, newValue);
                    videoSlideShow.init();
                    videoSlideShow.registerPlayCallBack(function (data) {
                        scope.$apply(function () {
                            scope.onPlayClick(data);
                        });
                    })
                }
            });
        }
    }
}]);