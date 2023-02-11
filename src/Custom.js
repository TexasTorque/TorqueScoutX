

export const averagePoints = (data, analysisGroup) => {
    let fields = analysisGroup.fields;

    let sum;
    let average;



    for (let i = 0; i < data.length; i++) { // iterating through reports
        for (let j = 0; j < data[i].reports.length; j++) {
            console.log(data[i].reports[j]);
        }



    }
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