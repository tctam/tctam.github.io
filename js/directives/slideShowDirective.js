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
            var slideShow = $(element);

            function VideoSlideShow(slideShow, items, detail, options) {
                this.slideShow = slideShow;
                this.items = items;
                this.detail = detail;
                this.collapse = false;
                if (!options) {
                    this.options = {
                        padding: 20,
                        width: 300,
                        height: 300,
                        playImageWidth: 50,
                        playImageHeight: 50
                    }
                } else {
                    this.options = options;
                }
            }

            VideoSlideShow.prototype.init = function () {
                $(this.slideShow).css({width: this.options.width, height: this.options.height});
                var items = this.detail.snowball.items;
                for (var i = 0; i < items.length; i++) {
                    var div = $('<div></div>');
                    div.css('position', 'relative');
                    div.css('width', this.options.width);
                    div.css('height', this.options.height);
                    var item = items[i];
                    var url = snowballService.getThumbnail(item.collaboration.url);
                    var image = $('<img>');
                    image.attr('width', this.options.width - 2 * this.options.padding);
                    image.attr('height', this.options.width - 2 * this.options.padding);
                    image.css('position', 'absolute');
                    image.css('top', this.options.padding);
                    image.css('left', this.options.padding);
                    image.css('border-radius', '3px');
                    image.css('box-shadow', '0px 10px 10px rgb(2,31,52)');

                    image.attr('src', url);
                    div.append(image);

                    var play = $('<img>')
                    play.attr('width', this.options.playImageWidth);
                    play.attr('height', this.options.playImageHeight);
                    play.attr('src', '../images/slideshow/play.png');

                    play.css({
                        'position': 'absolute',
                        'left': this.options.width / 2 - this.options.playImageWidth / 2,
                        'top': this.options.height / 2 - this.options.playImageHeight / 2,
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
                    div.append(play);

                    $(this.slideShow).append(div);
                }

                $(this.slideShow).slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    useCSS: true
                });

                var self = this;
                $(this.slideShow).on('click', function () {
                    if (!self.collapse) {
                        self.slideShow.css('transition', '-webkit-transform 400ms ease');
                        self.slideShow.css('transform', 'scale(0.8)');
                    } else {
                        self.slideShow.css('transition', '-webkit-transform 400ms ease');
                        self.slideShow.css('transform', 'scale(1)');
                    }
                    self.collapse = !self.collapse;
                })
            }

            VideoSlideShow.prototype.setPlayCallback = function (callback) {
                this.playCallback = callback;
            }

            scope.$watch('detail', function (newValue, oldValue) {
                if (newValue) {
                    var videoSlideShow = new VideoSlideShow(slideShow, newValue.snowball.items, newValue);
                    videoSlideShow.init();
                    videoSlideShow.setPlayCallback(function (data) {
                        scope.$apply(function () {
                            scope.onPlayClick(data);
                        })
                    })
                }
            });
        }
    }
}]);