var get = $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/courses',
  });
  
  get.done(function (podaci) {
    $.each(podaci, function (i, podatak) {
      $('#tbody').append(
        `<tr><td>${podatak.course}</td>
        <td>${podatak.starting_date}</td>
        <td>${podatak.duration}</td>
        <td>${podatak.price}</td>
        <td><button id="'podatak.id + '" class="btn btn-outline-info btnDetailsColor">View Details</button></td>
        <td><button id="'podatak.id + '" class="btn btn-outline-success btnDetailsColor">Make Reservation</button></td></tr>
        `
      );
    });
    $('#table').dataTable();
  });
  get.fail(function (podaci) {
    alert(podaci.statusText);
  });
  