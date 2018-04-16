
$(document).ready(()=>{
    // xml to json converter
    let x2js = new X2JS();
    let resultsTable = $("#resultsTable");
    $("#inputForm").submit((event)=> {
        event.preventDefault();
        submitInput(event)
        // clear form field after submit
        $("#inputForm")[0].reset();
    });

    let addressResultTable = (data) => {
        // converting response of xml to json object
        let jsonResponse = x2js.xml_str2json(data).searchresults;
        let responseBody = $('#responseBody');
        let serverResponse = $('#serverResponse');
        serverResponse.text("");

        if(jsonResponse.message.code === "3" || jsonResponse.message.code === "4") {
            serverResponse.text("Server Error: " + jsonResponse.message.code + " " + jsonResponse.message.text) + " We apologize the server is currently unavailable."
        };

        if(jsonResponse.message.code === "0"){
            let resultsToAppend = "";
            let addressResult = jsonResponse.response.results.result.address
            let linksResult = jsonResponse.response.results.result.links
            let realEstateResult = jsonResponse.response.results.result.localRealEstate
            let zestimateResult = jsonResponse.response.results.result.zestimate
            
            // console.log(jsonResponse);
            // console.log(addressResult)
            // console.log(linksResult)
            // console.log(realEstateResult)
            // console.log(zestimateResult)

                let tableRow = "<tr>";
                let addressTableData = "<td>" + addressResult.street + "</td>" + "<td>" + addressResult.city + "</td>"
                + "<td>" + addressResult.state + "</td>" + "<td>" + addressResult.zipcode + "</td>" 
                + "<td>" + addressResult.latitude + "</td>" + "<td>" + addressResult.longitude + "</td>" + "<td>" + linksResult.comparables + "</td>" + "<td>" + zestimateResult.amount + "</td>";

                tableRow += addressTableData;
                tableRow += "</tr>";
                resultsToAppend = tableRow;

                responseBody.append(resultsToAppend);
                resultsTable.show();

        } else { 
            serverResponse.text("Server Error: " + jsonResponse.message.code + " " + jsonResponse.message.text + "," + " please check the address is correct.");
        }

    }

    let submitInput = (event) => {
        const address = $("#address").val();
        const city = $("#city").val();
        const state = $("#state").val();
        const zipCode= $("#zipcode").val();
        $.post("/homeSearch", {address, city, state, zipCode})
            .done((response)=> {
                addressResultTable(response.data);
            }).fail((error) => {
            let serverResponse = $('#serverResponse');
            serverResponse.text("Server Error: " + error.status+ " - " + error.statusText);
        });

    }

});
