/**
 * Created by tranchitam on 3/24/16.
 */

app.filter('lastAccessFilter', function () {
    return function (time) {
        if (time) {
            var date = Date.parse(time);
            return moment(date).fromNow();
        } else {
            return '';
        }
    }
});