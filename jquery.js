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
    submitHandler: function (form) {
      let reservationData = {
        name: $('#name').val(),
        surname: $('#surname').val(),
        email: $('#email').val(),
        course: $('#selectedCourse').val(),
        price: $('#price').val(),
        comment: $('#comment').val(),
      };
      let reservationId = $('#reservationId').val();
      let requestType = reservationId ? 'PUT' : 'POST';
      let requestUrl = `http://localhost:3000/reservations${
        reservationId ? '/' + reservationId : ''
      }`;
      $.ajax({
        type: requestType,
        url: requestUrl,
        data: JSON.stringify(reservationData),
        contentType: 'application/json',
        success: function (response) {
          alert('Reservation saved successfully');
          $('#modalUnosForma').modal('hide');
          loadReservations(); // Reload reservations to show updated data
        },
        error: function (error) {
          alert('Failed to save reservation');
        },
      });
    },
  });
}

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

// /////druga tabla///////

var getReservations = $.ajax({
  type: 'GET',
  url: 'http://localhost:3000/reservations',
});

getReservations.done(function (data) {
  $.each(data, function (i, reservation) {
    $('#reservationsBody').append(
      `<tr><td>${reservation.name}</td>
        <td>${reservation.surname}</td>
        <td>${reservation.email}</td>
        <td>${reservation.course}</td>
        <td>${reservation.price}</td>
        <td>${reservation.comment}</td>
        <td><button id="btn${reservation.id}Edit" class="btn btn-outline-warning btnDetailsColor" onclick="editReservation(${reservation.id})">Change Reservation</button></td>
        <td><button id="btn${reservation.id}Delete" class="btn btn-outline-danger btnDetailsColor btnDeleteReservation" onclick="deleteReservation(${reservation.id},event)">Delete Reservation</button></td></tr>
        `
    );
  });
  $('#tableReservation').dataTable();
});

getReservations.fail(function (data) {
  alert(data.statusText);
});

$('#viewReservation').on('click', function () {
  $('#table_wrapper').toggleClass('d-none');
  $('#secondTableContainer').toggleClass('d-none');
  $('#totalPriceContainer').toggleClass('d-none');
  $('#viewReservation').text(
    $('#table_wrapper').hasClass('d-none')
      ? 'Back to Courses'
      : 'View Reservations'
  );
  calculateTotalPrice();
});

function deleteReservation(podatak_id, event) {
  $.ajax({
    url: 'http:localhost:3000/reservations/' + podatak_id,
    type: 'DELETE',
    dataType: 'json',
    success: function () {
      $(event.target).parent().parent().remove();
      alert('Reservation deleted successfully');
    },
    error: function () {
      alert('Failed to delete reservation');
    },
  });
}
$('#tableReservation').on('click', '.btnDeleteReservation', function (event) {
  var reservationId = $(this).data('reservation-id');
  deleteReservation(reservationId, event);
});

function calculateTotalPrice() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/reservations',
    success: function (reservations) {
      let totalPrice = 0;

      // Iterate through reservations and sum up prices
      $.each(reservations, function(i, reservation){
       totalPrice += parseFloat(reservation.price)
        
      })
      $('#priceTotal').text('Total Price: ' + totalPrice + '$');
    },
    error: function () {
    alert('Failed to calculate price');
    },
  })
}


