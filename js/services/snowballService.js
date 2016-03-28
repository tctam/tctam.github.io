/**
 * Created by tranchitam on 3/23/16.
 */

app.factory('snowballService', ['$http', '$q', function ($http, $q) {
    return {
        getImageUrl: function (id) {
            return 'http://media.snowballnow.com/image/upload/avatar/' + id + '.jpg';
        },
        getVideoUrl: function (url) {
            return 'http://res.cloudinary.com/snowballnow/video/upload/v1456314983/' + url + '.mp4';
        },
        getThumbnail: function (url) {
            return 'http://res.cloudinary.com/snowballnow/video/upload/v1456314983/' + url + '.jpg';
        },
        getPublicDetail: function () {
            return $http.get('http://api.snowballnow.com/api/snowballs/161/public_show').then(function (data) {
                return data.data;
            })
        },
        getDummyDetail: function () {
            var deferred = $q.defer();
            var data = {
                "snowball": {
                    "id": 362,
                    "title": "the only best ",
                    "description": "It's description of snowball 362.",
                    "liked_collaborations": [],
                    "in_review_collaborations": [],
                    "followed": false,
                    "number_of_views": 0,
                    "number_of_likes": 0,
                    "hash_tag_names": [
                        "the",
                        "of",
                        "oknowiknowthat"
                    ],
                    "allowed_collaboration_types": [
                        "video",
                        "audio",
                        "overlay",
                        "hashtag"
                    ],
                    "invite_only": false,
                    "max_video_length": 15.0,
                    "max_audio_length": 120.0,
                    "camera_orientation": "landscape",
                    "private": true,
                    "published?": true,
                    "ended?": false,
                    "created_at": "2016-03-22T06:34:48.000Z",
                    "updated_at": "2016-03-23T06:17:15.000Z",
                    "user": {
                        "id": 35,
                        "name": "Le Tai",
                        "skills": [
                            "Standup",
                            "Poet",
                            "Photographer"
                        ]
                    },
                    "items": [
                        {
                            "id": 506,
                            "collaboration": {
                                "id": 522,
                                "snowball_id": 362,
                                "item_id": 506,
                                "url": "ul1tlxd8m2pwdlgjbdsl",
                                "caption": "",
                                "created_at": "2016-03-22T06:34:48.000Z",
                                "location": "",
                                "type": null,
                                "user": {
                                    "id": 35,
                                    "name": "Le Tai",
                                    "skills": [
                                        "Standup",
                                        "Poet",
                                        "Photographer"
                                    ]
                                },
                                "title": "the only best",
                                "number_of_likes": 1,
                                "number_of_views": 1
                            }
                        },
                        {
                            "id": 546,
                            "collaboration": {
                                "id": 562,
                                "snowball_id": 362,
                                "item_id": 546,
                                "url": "xoi6kg8kq70wvpusoh24",
                                "caption": "",
                                "created_at": "2016-03-23T06:17:15.000Z",
                                "location": "",
                                "type": null,
                                "user": {
                                    "id": 35,
                                    "name": "Le Tai",
                                    "skills": [
                                        "Standup",
                                        "Poet",
                                        "Photographer"
                                    ]
                                },
                                "title": "the only best",
                                "number_of_likes": 10,
                                "number_of_views": 2
                            }
                        },
                        {
                            "id": 556,
                            "collaboration": {
                                "id": 562,
                                "snowball_id": 362,
                                "item_id": 546,
                                "url": "xoi6kg8kq70wvpusoh24",
                                "caption": "",
                                "created_at": "2016-03-23T06:17:15.000Z",
                                "location": "",
                                "type": null,
                                "user": {
                                    "id": 35,
                                    "name": "Le Tai",
                                    "skills": [
                                        "Standup",
                                        "Poet",
                                        "Photographer"
                                    ]
                                },
                                "title": "the only best",
                                "number_of_likes": 1,
                                "number_of_views": 9
                            }
                        },
                        {
                            "id": 596,
                            "collaboration": {
                                "id": 522,
                                "snowball_id": 362,
                                "item_id": 506,
                                "url": "ul1tlxd8m2pwdlgjbdsl",
                                "caption": "",
                                "created_at": "2016-03-22T06:34:48.000Z",
                                "location": "",
                                "type": null,
                                "user": {
                                    "id": 35,
                                    "name": "Le Tai",
                                    "skills": [
                                        "Standup",
                                        "Poet",
                                        "Photographer"
                                    ]
                                },
                                "title": "the only best",
                                "number_of_likes": 8,
                                "number_of_views": 2
                            }
                        }
                    ]
                }
            }
            deferred.resolve(data);
            return deferred.promise;
        }
    }
}]);