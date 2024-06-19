var get = $.ajax({
  type: 'GET',
  url: 'http://localhost:3000/courses',
});

get.done(function (podaci) {
  $.each(podaci, function (i, podatak) {
    $('tbody').append(
      `<tr><td>${podatak.course}</td>
        <td>${podatak.starting_date}</td>
        <td>${podatak.duration}</td>
        <td>${podatak.price}</td>
        <td><button id="btn${podatak.id}Info" class="btn btn-outline-info btnDetailsColor" onclick="infoCourse(${podatak.id}, event)">View Details</button></td>
        <td><button id="btn${podatak.id}" class="btn btn-outline-success btnDetailsColor">Make Reservation</button></td></tr>
        `
    );
  });
  $('#table').dataTable();
});
get.fail(function (podaci) {
  alert(podaci.statusText);
});

function infoCourse(courseId) {
  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/courses/${courseId}`,
    success: function (course) {
      $('#modalDetails').modal('toggle');
      $('#modalLabel').text(course.course);
      $('#modalPrice').text(`${course.price}$`)
    },
  });
}

