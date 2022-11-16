(function() {
    // Create the connector object

    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
            { id: "poster_path", dataType: tableau.dataTypeEnum.string },
            { id: "popularity", dataType: tableau.dataTypeEnum.float },
            { id: "id", dataType: tableau.dataTypeEnum.int },
            { id: "backdrop_path", dataType: tableau.dataTypeEnum.string },
            { id: "vote_average", dataType: tableau.dataTypeEnum.float },
            { id: "overview", dataType: tableau.dataTypeEnum.string },
            { id: "first_air_date", dataType: tableau.dataTypeEnum.date },
            { id: "origin_country", dataType: tableau.dataTypeEnum.string },
            { id: "original_language", dataType: tableau.dataTypeEnum.string },
            { id: "vote_count", dataType: tableau.dataTypeEnum.int },
            { id: "name", dataType: tableau.dataTypeEnum.string },
            { id: "original_name", dataType: tableau.dataTypeEnum.string }
        ];

        var tableSchema = {
            id: "shows",
            alias: "Top Rated TV Shows",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://api.themoviedb.org/3/tv/popular?api_key=8922bff85ef645a09730d7c1836c3edf&page=1", function(data) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
            var  tableData = [];
          console.log(data)
            // Iterate over the JSON object
            for (var i = 0; i < data.length; i++) {
                tableData.push({
                    "poster_path":data[i]["poster_path"],  // metti in data la response al campo "data" --> put the response in data field
                    "popularity":data[i]["popularity"],
                    "id":data[i]["id"],
                    "backdrop_path":data[i]["backdrop_path"],
                    "vote_average":data[i]["vote_average"],
                    "overview":data[i]["overview"],
                    "first_air_date":data[i]["first_air_date"],
                    "origin_country":data[i]["origin_country"],
                    "original_language":data[i]["original_language"],
                    "vote_count":data[i]["vote_count"],
                    "name":data[i]["name"],
                    "original_name":data[i]["original_name"],
                });
            }
   console.log(tableData)
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "OpenPuglia"; // This will be the data source name in Tableau
            tableau.submit();                     // This sends the connector object to Tableau
        });
    });
})();