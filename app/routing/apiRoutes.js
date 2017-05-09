var friendsData = require ('../data/friends.js');

module.exports = function(app){

 app.get("/api/friends", function(req, res) {
    res.json(friendsData)
});

 app.post("/api/survey", function(req, res) {
      friendsData.push(req.body);
      // res.json(friendsData)

//compatibility logic to compare the existing friends for the best match
    var varianceArray = [];
    var newFriendScores= req.body.scores;
    
    //loop through each exising friend to compare scores
    for (i=0;i<friendsData.length-1;i++) {
        var scores = friendsData[i].scores;

        //loop through each score for the friend in this position    
        var comparisonArray = [];
        for (j=0;j<scores.length;j++) {
            //compare the variance for each score compared to the new friend's score
            var comparison = Math.abs(scores[j] - newFriendScores[j]);
            comparisonArray.push(comparison);
        }
        
        //sum each value in the comparison array and push the total to the varianceArray
        var summed = eval(comparisonArray.join('+'));
        varianceArray.push(summed);
    }
    
    //loop through the varianceArray and determine which value is the lowest, therefore best match
        console.log("varianceArray: " + varianceArray);
        var bestMatch = varianceArray.indexOf(Math.min.apply(null, varianceArray));
        console.log("bestMatch: " + bestMatch);   
         
        res.json(bestMatch); 


});

};

