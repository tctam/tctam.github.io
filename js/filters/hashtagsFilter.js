/**
 * Created by tranchitam on 3/24/16.
 */

app.filter('hagtagsFilter', function () {
    return function (hagtags) {
        var result = '';
        if (hagtags) {
            for (var i = 0; i < hagtags.length; i++) {
                if (i > 0) {
                    result += ' ';
                }
                result += '#' + hagtags[i];
            }
        }
        return result;
    }
});