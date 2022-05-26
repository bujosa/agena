d3.csv("titanic.csv", function (row, i) {
  return {
    name: row.Name,
    survived: row.Survived == 1 ? true : false,
    sex: row.Sex,
    age: +row.Age,
    fare: +row.Fare,
    key: i,
  };
}).then(makeChart);

function makeChart(titanicData) {
  // Sort titanic data by fare
  const points = titanicData;

  points.sort(function (a, b) {
    return a.fare - b.fare;
  });

  titanicData = points;

  new Chart("chart", {
    type: "line",
    data: {
      labels: [...titanicData.map((person) => person.fare)],
      datasets: [
        {
          label: "Suvirved",
          borderColor: "#3e95cd",
          backgroundColor: "#3e95cd",
          data: [
            ...titanicData.map(function (person) {
              if (person.survived) {
                return person.age;
              }
            }),
          ],
        },
        {
          label: "No suvirved",
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          data: [
            ...titanicData.map(function (person) {
              if (!person.survived) {
                return person.age;
              }
            }),
          ],
        },
      ],
    },
  });
}
