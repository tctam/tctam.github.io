/**
 * Created by tranchitam on 3/26/16.
 */

app.directive('showVideoDirective', ['$sce', 'snowballService', function ($sce, snowballService) {
    return {
        restrict: 'ACE',
        templateUrl: '../partials/templates/video.html',
        link: function (scope, element, attrs) {
            function VideoPlayer(video, popup) {
                this.video = video;
                this.popup = popup;
            }

            VideoPlayer.prototype.play = function () {
                this.video.play();
            }

            VideoPlayer.prototype.pause = function () {
                this.video.pause();
            }

            VideoPlayer.prototype.stop = function () {
                this.video.pause();
                this.video.src = '';
            }

            VideoPlayer.prototype.hide = function () {
                $('body').css('overflow', 'auto').off('touchmove');
                this.popup.removeClass('show').addClass('hide');
            }

            VideoPlayer.prototype.show = function () {
                $('body').css('overflow', 'hidden').on('touchmove', function (e) {
                    e.preventDefault();
                });
                this.popup.removeClass('hide').addClass('show');
            }

            VideoPlayer.prototype.setUrl = function (url) {
                this.video.src = url;
            }

            VideoPlayer.prototype.addEndedEvent = function (callback) {
                this.video.onended = callback;
            }

            VideoPlayer.prototype.requestFullScreen = function () {
                if (this.video.requestFullscreen) {
                    this.video.requestFullscreen();
                } else if (this.video.msRequestFullscreen) {
                    this.video.msRequestFullscreen();
                } else if (this.video.mozRequestFullScreen) {
                    this.video.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    this.video.webkitRequestFullscreen();
                }
            }

            var video = $(element).find('video')[0];
            var popup = $(element).find('div');
            var videoPlayer;

            scope.$on('openVideo', function (event, item, detail) {
                videoPlayer = new VideoPlayer(video, popup);
                var items = detail.snowball.items;
                var currentIndex = items.indexOf(item);
                videoPlayer.addEndedEvent(function () {
                    if (currentIndex != -1) {
                        currentIndex++;
                        if (currentIndex == items.length) {
                            currentIndex = 0;
                        }
                        var nextItem = items[currentIndex];
                        videoPlayer.setUrl(snowballService.getVideoUrl(nextItem.collaboration.url));
                        videoPlayer.play();
                    }
                })

                videoPlayer.setUrl(snowballService.getVideoUrl(item.collaboration.url));
                videoPlayer.play();
                videoPlayer.show();
            });

            $(element).on('click', function (event) {
                if (videoPlayer) {
                    videoPlayer.stop();
                    videoPlayer.hide();
                }
            });
        }
    }
}]);