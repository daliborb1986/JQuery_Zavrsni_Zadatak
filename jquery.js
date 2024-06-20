var get = $.ajax({
  type: 'GET',
  url: 'http://localhost:3000/courses',
});

get.done(function (podaci) {
  $.each(podaci, function (i, podatak) {
    $('#coursesBody').append(
      `<tr><td>${podatak.course}</td>
        <td>${podatak.starting_date}</td>
        <td>${podatak.duration}</td>
        <td>${podatak.price}</td>
        <td><button id="btn${podatak.id}Info" class="btn btn-outline-info btnDetailsColor" onclick="infoCourse(${podatak.id}, event)">View Details</button></td>
        <td><button id="btn${podatak.id}Reservation" class="btn btn-outline-success btnDetailsColor" onclick="reserveCourse(${podatak.id},event)">Make Reservation</button></td></tr>
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
      $('#modalPrice').text(`${course.price}$`);
    },
  });
}

function reserveCourse(id) {
  var getRequest = $.ajax({
    type: 'GET',
    url: `http://localhost:3000/courses/${id}`,
  });

  getRequest.done(function (course) {
    $('#selectedCourse').val(course.course);
    $('#price').val(course.price + '$');
    $('#modalUnosForma').modal('toggle');
    setValidationForm();
  });

  getRequest.fail(function (error) {
    alert('Failed to fetch course details');
  });
}
function setValidationForm() {
  var selectedCourse = $('#selectedCourse').val();
  var price = $('#price').val();
  $('#modalForm').trigger('reset');
  $('#selectedCourse').val(selectedCourse);
  $('#price').val(price);
  $('#modalForm').validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      surname: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
      },
      note: {
        required: true,
        minlength: 5,
      },
    },
    messages: {
      name: {
        required: 'Unesite vase ime',
        minlength: 'Ime mora imati najmanje 3 karaktera',
      },
      surname: {
        required: 'Unesite svoje prezime',
        minlength: 'Prezime mora imati najmanje 3 karaktera',
      },
      email: 'Unesite validan e-mail',
      note: {
        required: 'Unesite komentar',
        minlength: 'Komentar mora imati najmanje 5 karaktera',
      },
    },
  });
  $('#saveReservation').on('click', function (e) {
    e.preventDefault();
    if ($('#modalForm').valid()) {
      var reservationData = {
        name: $('#name').val(),
        surname: $('#surname').val(),
        email: $('#email').val(),
        course: $('#selectedCourse').val(),
        price: $('#price').val(),
        comment: $('#comment').val(),
      };
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/reservations',
        data: JSON.stringify(reservationData),
        contentType: 'application/json',
        success: function (response) {
          alert('Reservation successful');
          $('#modalUnosForma').modal('hide');
        },
        error: function (error) {
          alert('Failed to save reservation');
        },
      });
    }
  });
}
// /////druga tabla///////

var get = $.ajax({
  type: 'GET',
  url: 'http://localhost:3000/reservations',
});

get.done(function (podaci) {
  $.each(podaci, function (i, podatak) {
    $('#reservationsBody').append(
      `<tr><td>${podatak.name}</td>
        <td>${podatak.surname}</td>
        <td>${podatak.email}</td>
        <td>${podatak.course}</td>
        <td>${podatak.price}</td>
        <td>${podatak.comment}</td>
        <td><button id="btn${podatak.id}Info" class="btn btn-outline-info btnDetailsColor" onclick="infoCourse(${podatak.id}, event)">View Details</button></td>
        <td><button id="btn${podatak.id}Reservation" class="btn btn-outline-success btnDetailsColor" onclick="reserveCourse(${podatak.id},event)">Make Reservation</button></td></tr>
        `
    );
  });
  $('#table').dataTable();
});

get.fail(function (podaci) {
  alert(podaci.statusText);
});

$('#viewReservation').on('click', function () {
  $('#table_wrapper').toggleClass('d-none');
  $('#tableReservation').toggleClass('d-none');
  $('#viewReservation').text('Back to Courses');
});
