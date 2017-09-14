module.exports = {
    compareVoteScore(firstPost , secondPost) {
        return secondPost.voteScore - firstPost.voteScore;
    },

    convertSecondsToDate(timeStamp) {
        let date = new Date(timeStamp);

        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;

        return [year, month, day].join('-');

    }
}