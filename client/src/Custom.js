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

    // reports = data[i][Object.keys(data[i])[0]].reports;
    reports = data[i][Object.keys(data[i])[0]].reports;

    teamSum = 0;
    for (let j = 0; j < reports.length; j++) {
      for (let k = 0; k < analysisGroup.fields.length; k++) {
        for (let e of reports[j].fields) {
          if (e.name === analysisGroup.fields[k]) {
            teamSum += e.points ? e.points : 0;
          }
        }
      }
      teamAverageObject.Team = reports[j].Team;
    }
    teamAverage = teamSum / reports.length;

    teamAverageObject[
      analysisGroup.name.replace(/\s/g, "").replaceAll(".", "")
    ] = teamAverage.toFixed(2).toString();

    retArray.push(teamAverageObject);
  }

  return retArray;

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

// export const avgPoints = (data, analysisGroup) => {
//   let fields = analysisGroup.fields;

//   for (let i = 0; i < data.length; i++) {
//     // iterating through reports
//     let sum = 0;
//     let average = 0;
//     for (let j = 0; j < fields.length; j++) {
//       // iterating through fields
//       sum += data[i][fields[j]].points;
//     }
//     average = sum / fields.length;
//   }
// };

export const averageValue = (data, analysisGroup) => {
  let reports;
  let teamSum;
  let teamAverage;
  let teamAverageObject;

  let retArray = [];
  for (let i = 0; i < data.length; i++) {
    // data[i] is a team with reports
    // data[i][Object.keys(data[i])[0]].reports
    teamAverageObject = {};

    // reports = data[i][Object.keys(data[i])[0]].reports;
    reports = data[i][Object.keys(data[i])[0]].reports;

    teamSum = 0;
    for (let j = 0; j < reports.length; j++) {
      for (let k = 0; k < analysisGroup.fields.length; k++) {
        for (let e of reports[j].fields) {
          if (e.name === analysisGroup.fields[k]) {
            teamSum += e.value ? e.value : 0;
          }
        }
      }
      teamAverageObject.Team = reports[j].Team;
    }
    teamAverage = teamSum / reports.length;

    teamAverageObject[
      analysisGroup.name.replace(/\s/g, "").replaceAll(".", "")
    ] = teamAverage.toFixed(2).toString();

    retArray.push(teamAverageObject);
  }

  return retArray;

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

export const booleanPercentage = (data, analysisGroup) => {
  let reports;
  let numTrue;
  let booleanPercentage;
  let teamAverageObject;

  let retArray = [];
  for (let i = 0; i < data.length; i++) {
    // data[i] is a team with reports
    // data[i][Object.keys(data[i])[0]].reports
    teamAverageObject = {};

    // reports = data[i][Object.keys(data[i])[0]].reports;
    reports = data[i][Object.keys(data[i])[0]].reports;

    numTrue = 0;
    for (let j = 0; j < reports.length; j++) {
      for (let k = 0; k < analysisGroup.fields.length; k++) {
        for (let e of reports[j].fields) {
          if (e.name === analysisGroup.fields[k]) {
            if (e.value) {
              numTrue++;
            }
          }
        }
      }
      teamAverageObject.Team = reports[j].Team;
    }
    booleanPercentage = numTrue / reports.length;

    teamAverageObject[
      analysisGroup.name.replace(/\s/g, "").replaceAll(".", "")
    ] = (booleanPercentage.toFixed(2) * 100).toString() + "%";

    retArray.push(teamAverageObject);
  }

  return retArray;
};
