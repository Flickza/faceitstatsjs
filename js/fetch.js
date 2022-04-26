import { API_KEY } from './config.js';


//get player ...'s stats
async function getData(uname) {
    var realUsername;

    var json = {};

    var search = await playerSearch(uname);
    //if no player was found. return "no player found"

    if (search.items.length == 0) {
        return "No player found.";
        //if players were found but none matched the search, return no player found

    } else if (search.items.filter(item => item.nickname.toLowerCase() == uname.toLowerCase()).length == 0) {
        return "No player found.";
    } else {

        //if player was found set the realusername to search result
        realUsername = search.items.filter(item => item.nickname.toLowerCase() == uname.toLowerCase())[0].nickname;
    }

    //set profile object of the player
    json.profile = await playerProfile(realUsername);

    //get player stats using player id from profile
    json.stats = await getStats(json.profile.player_id);

    //get player stats on all relevant maps
    json.maps = json.stats.segments.filter(item => item.mode == "5v5");

    //get last 20 matches played
    json.last20Matches = (await getLast20(json.profile.player_id)).items;

    //make an empty array for the players stats of the last 20 matches
    json.last20Stats = [];

    //fill array with the players individual stats of the last 20 matches
    json.last20Stats = await getLast20Stats(json.last20Matches, json.profile.player_id);
    return json;
};

//first make a player search to avoid search being case sensitive
function playerSearch(u) {
    return $.ajax
        ({
            type: "GET",
            url: `https://open.faceit.com/data/v4/search/players?nickname=${u}&offset=0&limit=10`,
            dataType: 'json',
            headers: {
                "Authorization": API_KEY
            },
            done: function (data) {
                return data;
            }
        });
}
//first ajax call to get player profile
function playerProfile(u) {
    return $.ajax
        ({
            type: "GET",
            url: `https://open.faceit.com/data/v4/players?nickname=${u}`,
            dataType: 'json',
            headers: {
                "Authorization": API_KEY
            },
            done: function (data) {
                return data;
            }
        });
}
//use player_id from first call to get player stats for csgo
function getStats(pid) {
    return $.ajax
        ({
            type: "GET",
            url: `https://open.faceit.com/data/v4/players/${pid}/stats/csgo`,
            dataType: 'json',
            headers: {
                "Authorization": API_KEY
            },
            done: function (data) {
                return data;
            }
        });
}
//get last 20 matches
function getLast20(pid) {
    return $.ajax
        ({
            type: "GET",
            url: `https://open.faceit.com/data/v4/players/${pid}/history?game=csgo&offset=0&limit=20`,
            dataType: 'json',
            headers: {
                "Authorization": API_KEY
            },
            done: function (data) {
                return data;
            }
        });
}

//get stats of last 20 matches
function getPlayerMatchStats(match_id) {
    return $.ajax
        ({
            type: "GET",
            url: `https://open.faceit.com/data/v4/matches/${match_id}/stats`,
            dataType: 'json',
            headers: {
                "Authorization": API_KEY
            },
            done: function (data) {
                return data;
            }
        });
}

async function getLast20Stats(arr, pid) {
    const results = []
    await arr.forEach(async function (m) {
        (await getPlayerMatchStats(m.match_id)).rounds[0].teams.forEach((team => {
            team.players.forEach(player => {
                if (player.player_id == pid) {
                    console.log(player.player_stats);
                    results.push(player.player_stats);
                }
            });
        }))
    });
    return results
}

export { getData };