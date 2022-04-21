import { API_KEY } from './config.js';

//get player ...'s stats
var getPlayerData = (username) => {
    var json = new Object;
    json.profile = new Object;
    json.stats = new Object;
    json.last20 = new Object;
    json.maps = new Array;
    //first ajax call to get player profile
    $.ajax
    ({
        type: "GET",
        async: false,
        url: `https://open.faceit.com/data/v4/players?nickname=${username}`,
        dataType: 'json',
        headers: {
            "Authorization": API_KEY
        },
        success: function (data) {
            json.profile = data;
        }
    });
    //use player_id from first call to get player stats for csgo
    $.ajax
    ({
        type: "GET",
        async: false,
        url: `https://open.faceit.com/data/v4/players/${json.profile.player_id}/stats/csgo`,
        dataType: 'json',
        headers: {
            "Authorization": API_KEY
        },
        success: function (data) {
            json.stats = data;
            data.segments.forEach(segment => {
                if (segment.mode == "5v5") {
                    json.maps.push(segment);
                }
            });
        }
    });
    $.ajax
    ({
        type: "GET",
        async: false,
        url: `https://open.faceit.com/data/v4/players/db82c678-6669-4ff9-a812-cf1ca64ebedd/history?game=csgo&offset=0&limit=20`,
        dataType: 'json',
        headers: {
            "Authorization": API_KEY
        },
        success: function (data) {
            json.history = data.items;
        }
    });
    return json;
}

export var getPlayerData;