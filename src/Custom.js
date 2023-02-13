

export const averagePoints = (data, analysisGroup) => {
    let reports;
    let teamSum;
    let teamAverage;
    let teamAverageObject;

    let retArray = [];
    for (let i = 0; i < data.length; i++) {
        // data[i] is a team with reports
        // data[i][Object.keys(data[i])[0]].reports
        teamAverageObject = {};

        reports = data[i][Object.keys(data[i])[0]].reports;

        teamSum = 0;
        for (let j = 0; j < reports.length; j++) {
            for (let k = 0; k < analysisGroup.fields.length; k++) {
                teamSum += reports[j][analysisGroup.fields[k]].points;
            }
            teamAverageObject.Team = reports[j].Team;
        }
        teamAverage = teamSum / reports.length;

        teamAverageObject[analysisGroup.name.replace(/\s/g, '').replaceAll('.', '')] = teamAverage;

        retArray.push(teamAverageObject);

    }

    console.log(retArray);


    // let fields = analysisGroup.fields;

    // let sum;
    // let average;



    // for (let i = 0; i < data.length; i++) { // iterating through reports
    //     for (let j = 0; j < data[i].reports.length; j++) {
    //         console.log(data[i].reports[j]);
    //     }



    // }
    // console.log(data);
    // console.log(analysisGroup);
};

export const avgPoints = (data, analysisGroup) => {
    let fields = analysisGroup.fields;



    for (let i = 0; i < data.length; i++) { // iterating through reports
        let sum = 0;
        let average = 0;
        for (let j = 0; j < fields.length; j++) { // iterating through fields
            sum += data[i][fields[j]].points;
        }
        average = sum / fields.length;
    }
};