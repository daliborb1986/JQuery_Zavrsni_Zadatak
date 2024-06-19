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
        <td><button id="btn${podatak.id}Reservation" class="btn btn-outline-success btnDetailsColor"onclick="reserveCourse(${podatak.id})">Make Reservation</button></td></tr>
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
}
