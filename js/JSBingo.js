
var JSBingo = function () {
    var data = [];
    var dataAlreadyGotOut = [];

    this.loadData = function (file, callback) {
        if (file === "" || file === null || typeof (file) === "undefined")
            file = "data.json";

        $.getJSON(file, function (response) {
            data = response.data;
            callback();
        });

    };

    this.getDateTime = function () {
        var date = new Date();
        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
    };

    this.roll = function () {
        if (data === null || data.length === 0)
            throw new Error("Data is empty. Must load data first!");

        var index = Math.floor(Math.random() * data.length);

        var item = data.slice(index, index + 1);
        data.splice(index, 1);
        dataAlreadyGotOut.push(item);

        return item;
    };

    this.rollBack = function () {
        if (dataAlreadyGotOut.length === 0)
            throw new Error("No more items to rollback");

        var item = dataAlreadyGotOut.pop();        
        data.push(item);
        data.sort();

        return item;
    };

    this.getNumberOfItemsLeft = function () {
        return data !== null && typeof (data) === "object" ? data.length : -1;
    };

    this.getItemsLeft = function () {
        return data;
    };
};