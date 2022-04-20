import { API_KEY } from './config.js';

//get player ...'s stats
var getPlayerData = (username) => {
    var json = new Object;
    json.profile = new Object;
    json.stats = new Object; 
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
        }
    });
    return json;
}

export var getPlayerData;