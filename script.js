d3.csv("https://gist.githubusercontent.com/gurmanbh/7f24b09ec9da582559c63869ead3d3a3/raw/d33b4387e7a4553ef28bce9c8f047a3adefa8d7c/oscars.csv").then((data) => {
  
  // put an array of years into the select dropdown
  let options = data.filter(function(movie){
    return movie['Winner'] == 1
  }).map(function(movie){
    return movie.Year
  })

  // take selected year in dropdown as input
  d3.select('#year')
    .selectAll('option.opt')
    .data(options)
    .enter()
    .append('option')
    .attr('class','opt')
    .attr('value',d=>d)
    .text(d=>d);

  // button-clicking events
  d3.select('button').on('click', function(){

    // display hidden .output classes
    d3.selectAll('.output').classed('hide', false)

    // from selected year, find winner object and nominations objects
    const year = d3.select('#year').node().value
    const winner = data.filter(d=>d.Year===year && d.Winner==1)
    const nominations = data.filter(d=>d.Year===year && d.Winner!=1)

    // insert noms names in HTML
    d3.selectAll('.nomination')
    .remove()
    
    d3.select('.noms')
    .selectAll('.nomination')
    .data(nominations)
    .enter()
    .append('p')
    .attr('class','nomination')
    .text(asdf=>asdf.Name);

    // insert winner name in HTML
    d3.select('.movie').text(winner[0].Name)
  })
})
